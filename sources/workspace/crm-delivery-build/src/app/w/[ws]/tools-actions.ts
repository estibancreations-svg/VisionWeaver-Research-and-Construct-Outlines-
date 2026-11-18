"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getWorkspace, type ActionState } from "@/lib/session";
import { firstIssue, formObject, uuid } from "@/lib/validation";
import { friendlyDbError, functionError } from "@/lib/functions";
import { toIsoOrNull } from "@/lib/format";
import { kitFor } from "@/lib/industry-kits";
import { CHANNELS, SOCIAL_PLATFORMS, APPS } from "@/lib/plans";
import { LESSONS } from "@/lib/learn";

/* v4.0 tools: mail, inbox, apps, templates, marketing, website, calendar, learning, payments.
   Every write runs as the signed-in person; Row Level Security and the v4 triggers are the guard.
   These checks only make the messages friendlier. */

/** Messages written by the v4 database guards are already plain words — show them as-is. */
const PLAIN = [
  /Your plan does not include[^.]*/,
  /Only a sub-account admin can approve/,
  /Fix the compliance flags before approving/,
  /Only the delivery service can set that status/,
  /Website limit reached[^)]*\)/,
  /A site goes live through the publishing service/,
  /Zoom and FaceTime appointments are on the Pro plan/,
  /Card and wallet payments are marked paid by the payment service/,
  /Paid or void invoices cannot be reopened/,
];
function friendly(msg: string | undefined | null, fallback = "Couldn't save that. Please try again.") {
  for (const re of PLAIN) {
    const m = (msg ?? "").match(re);
    if (m) return m[0] + ".";
  }
  return friendlyDbError(msg, fallback);
}
function fail(e: unknown): ActionState {
  return { error: e instanceof Error ? e.message : "Something went wrong." };
}
function isRedirect(e: unknown) {
  return Boolean(e && typeof e === "object" && "digest" in e && String((e as { digest: unknown }).digest).startsWith("NEXT_"));
}
async function writer(ws: string) {
  const ctx = await getWorkspace(ws);
  if (!ctx.canWrite) throw new Error("Your login can view this sub-account but not change it.");
  return ctx;
}
async function adminOf(ws: string) {
  const ctx = await getWorkspace(ws);
  if (!ctx.canAdmin) throw new Error("Only a sub-account admin can do that.");
  return ctx;
}
const text = (max: number) => z.string().trim().min(1, "Please fill this in").max(max, `Must be ${max} characters or fewer`);
const optText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : null));
const domainRe = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)+$/;

/* ---------- Mail ---------- */
export async function saveEmailDomain(ws: string, _: ActionState, fd: FormData): Promise<ActionState> {
  try {
    const ctx = await adminOf(ws);
    const raw = String(fd.get("email_domain") ?? "").trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "");
    if (raw && !domainRe.test(raw)) return { error: "Enter a domain like yourbusiness.com" };
    const { error } = await ctx.supabase.from("workspaces").update({ email_domain: raw || null }).eq("id", ws);
    if (error) return { error: friendly(error.message) };
    revalidatePath(`/w/${ws}/mail`);
    return { ok: raw ? "Domain saved. Your installer adds the DNS records next." : "Domain removed." };
  } catch (e) {
    return fail(e);
  }
}

export async function addMailbox(ws: string, _: ActionState, fd: FormData): Promise<ActionState> {
  try {
    const ctx = await adminOf(ws);
    const p = z
      .object({
        local_part: z.string().trim().toLowerCase().regex(/^[a-z0-9]([a-z0-9._-]{0,62}[a-z0-9])?$/, "Use letters, numbers, dots or dashes"),
        display_name: text(120),
      })
      .safeParse(formObject(fd));
    if (!p.success) return { error: firstIssue(p.error) };
    const { error } = await ctx.supabase.from("mailboxes").insert({ ...p.data, workspace_id: ws, slot: "extra", status: "reserved" });
    if (error) return { error: friendly(error.message) };
    revalidatePath(`/w/${ws}/mail`);
    return { ok: "Extra address reserved. It is billed as an add-on." };
  } catch (e) {
    return fail(e);
  }
}

export async function renameMailbox(ws: string, _: ActionState, fd: FormData): Promise<ActionState> {
  try {
    const ctx = await adminOf(ws);
    const id = uuid.safeParse(fd.get("id"));
    const name = text(120).safeParse(fd.get("display_name"));
    if (!id.success || !name.success) return { error: "Enter a display name." };
    const { error } = await ctx.supabase.from("mailboxes").update({ display_name: name.data }).eq("id", id.data).eq("workspace_id", ws);
    if (error) return { error: friendly(error.message) };
    revalidatePath(`/w/${ws}/mail`);
    return { ok: "Saved." };
  } catch (e) {
    return fail(e);
  }
}

export async function removeMailbox(ws: string, fd: FormData) {
  const ctx = await adminOf(ws);
  const id = uuid.safeParse(fd.get("id"));
  if (id.success) await ctx.supabase.from("mailboxes").delete().eq("id", id.data).eq("workspace_id", ws).eq("slot", "extra");
  revalidatePath(`/w/${ws}/mail`);
}

/* ---------- Inbox ---------- */
/** Ask the delivery worker to send one queued message. Failures stay queued; the
    Inbox pill and Retry control show them. Never fails the queue action itself. */
async function kickDelivery(
  invoke: (name: string, body: Record<string, unknown>) => Promise<unknown>,
  messageId: string,
) {
  try {
    await invoke("delivery", { action: "deliver", message_id: messageId });
  } catch {
    // The message stays queued; Retry or the next drain sends it.
  }
}

export async function startConversation(ws: string, _: ActionState, fd: FormData): Promise<ActionState> {
  try {
    const ctx = await writer(ws);
    const p = z
      .object({
        channel: z.enum(CHANNELS),
        contact_id: z.string().optional(),
        subject: text(160),
        body: text(10000),
      })
      .safeParse(formObject(fd));
    if (!p.success) return { error: firstIssue(p.error) };
    const internal = p.data.channel === "internal";
    const contact = internal ? null : uuid.safeParse(p.data.contact_id);
    if (!internal && !contact?.success) return { error: "Pick the contact for this conversation." };
    const { data: conv, error } = await ctx.supabase
      .from("conversations")
      .insert({
        workspace_id: ws,
        kind: internal ? "internal" : "contact",
        channel: p.data.channel,
        contact_id: internal ? null : contact!.data!,
        subject: p.data.subject,
      })
      .select("id")
      .single();
    if (error) return { error: friendly(error.message) };
    const { data: msg, error: mErr } = await ctx.supabase
      .from("messages")
      .insert({ workspace_id: ws, conversation_id: conv.id, channel: p.data.channel, direction: internal ? "internal" : "outbound", body: p.data.body })
      .select("id")
      .single();
    if (mErr) return { error: friendly(mErr.message) };
    if (!internal && msg) {
      await kickDelivery((name, b) => ctx.supabase.functions.invoke(name, { body: b }), msg.id);
    }
    revalidatePath(`/w/${ws}/inbox`);
    redirect(`/w/${ws}/inbox/${conv.id}`);
  } catch (e) {
    if (isRedirect(e)) throw e;
    return fail(e);
  }
}

export async function sendMessage(ws: string, conversationId: string, _: ActionState, fd: FormData): Promise<ActionState> {
  try {
    const ctx = await writer(ws);
    const body = text(10000).safeParse(fd.get("body"));
    if (!body.success) return { error: "Write a message first." };
    const { data: conv } = await ctx.supabase.from("conversations").select("channel, kind").eq("id", conversationId).eq("workspace_id", ws).maybeSingle();
    if (!conv) return { error: "Conversation not found." };
    const { data: msg, error } = await ctx.supabase
      .from("messages")
      .insert({
        workspace_id: ws,
        conversation_id: conversationId,
        channel: conv.channel,
        direction: conv.kind === "internal" ? "internal" : "outbound",
        body: body.data,
      })
      .select("id")
      .single();
    if (error) return { error: friendly(error.message) };
    if (conv.kind !== "internal" && msg) {
      await kickDelivery((name, b) => ctx.supabase.functions.invoke(name, { body: b }), msg.id);
    }
    revalidatePath(`/w/${ws}/inbox/${conversationId}`);
    return { ok: conv.kind === "internal" ? "Sent." : "Queued." };
  } catch (e) {
    return fail(e);
  }
}

/* ---------- Delivery retry ---------- */
/** Try a failed message again. Only the delivery worker sends; this just asks it to. */
export async function retryMessage(ws: string, conversationId: string, messageId: string, _: ActionState, fd: FormData): Promise<ActionState> {
  try {
    void fd;
    const ctx = await writer(ws);
    const { data: msg } = await ctx.supabase.from("messages").select("id, status, direction").eq("id", messageId).eq("conversation_id", conversationId).eq("workspace_id", ws).maybeSingle();
    if (!msg) return { error: "Message not found." };
    if (msg.direction !== "outbound" || (msg.status !== "failed" && msg.status !== "queued")) {
      return { error: "That message doesn't need sending again." };
    }
    const { data, error } = await ctx.supabase.functions.invoke("delivery", { body: { action: "deliver", message_id: messageId } });
    if (error) return { error: await functionError(error, "Couldn't send that again. Please try again.") };
    if (data?.error) return { error: String(data.error) };
    revalidatePath(`/w/${ws}/inbox/${conversationId}`);
    return { ok: "Sending again." };
  } catch (e) {
    return fail(e);
  }
}

/* ---------- Apps ---------- */
export async function setAppStatus(ws: string, fd: FormData) {
  const ctx = await adminOf(ws);
  const app = String(fd.get("app") ?? "");
  const status = fd.get("status") === "requested" ? "requested" : "off";
  if (!APPS.some((a) => a.id === app)) redirect(`/w/${ws}/apps`);
  const { error } = await ctx.supabase.from("workspace_apps").upsert({ workspace_id: ws, app, status }, { onConflict: "workspace_id,app" });
  revalidatePath(`/w/${ws}/apps`);
  redirect(`/w/${ws}/apps${error ? "?r=" + encodeURIComponent(friendly(error.message)) : "?r=saved"}`);
}

/* ---------- Templates ---------- */
export async function installKit(ws: string, _: ActionState, fd: FormData): Promise<ActionState> {
  try {
    const ctx = await writer(ws);
    void fd;
    const kit = kitFor(ctx.ws.template);
    const rows = kit.items.map((it) => ({ workspace_id: ws, kind: it.kind, name: it.name, body: it.body, kit: ctx.ws.template }));
    const { error } = await ctx.supabase.from("content_templates").upsert(rows, { onConflict: "workspace_id,kind,name", ignoreDuplicates: true });
    if (error) return { error: friendly(error.message) };
    revalidatePath(`/w/${ws}/templates`);
    return { ok: `Kit installed: ${rows.length} templates ready to edit.` };
  } catch (e) {
    return fail(e);
  }
}

const templateSchema = z.object({
  kind: z.enum(["email", "sms", "social", "ad", "script", "website_outline", "task"]),
  name: text(120),
  body: text(6000),
});
export async function saveTemplate(ws: string, id: string | null, _: ActionState, fd: FormData): Promise<ActionState> {
  try {
    const ctx = await writer(ws);
    const p = templateSchema.safeParse(formObject(fd));
    if (!p.success) return { error: firstIssue(p.error) };
    const { error } = id
      ? await ctx.supabase.from("content_templates").update({ ...p.data, updated_at: new Date().toISOString() }).eq("id", id).eq("workspace_id", ws)
      : await ctx.supabase.from("content_templates").insert({ ...p.data, workspace_id: ws });
    if (error) return { error: friendly(error.message) };
    revalidatePath(`/w/${ws}/templates`);
    return { ok: "Template saved." };
  } catch (e) {
    return fail(e);
  }
}

export async function deleteTemplate(ws: string, fd: FormData) {
  const ctx = await adminOf(ws);
  const id = uuid.safeParse(fd.get("id"));
  if (id.success) await ctx.supabase.from("content_templates").delete().eq("id", id.data).eq("workspace_id", ws);
  revalidatePath(`/w/${ws}/templates`);
}

/* ---------- Marketing ---------- */
export async function savePost(ws: string, _: ActionState, fd: FormData): Promise<ActionState> {
  try {
    const ctx = await writer(ws);
    const platforms = fd.getAll("platforms").map(String).filter((p): p is (typeof SOCIAL_PLATFORMS)[number] => (SOCIAL_PLATFORMS as readonly string[]).includes(p));
    if (platforms.length === 0) return { error: "Pick at least one platform." };
    const p = z.object({ body: text(3000), media_note: optText(500), scheduled_at: z.string().optional() }).safeParse(formObject(fd));
    if (!p.success) return { error: firstIssue(p.error) };
    const { data, error } = await ctx.supabase
      .from("social_posts")
      .insert({ workspace_id: ws, platforms, body: p.data.body, media_note: p.data.media_note, scheduled_at: toIsoOrNull(p.data.scheduled_at ?? null) })
      .select("compliance_flags")
      .single();
    if (error) return { error: friendly(error.message) };
    revalidatePath(`/w/${ws}/marketing`);
    const flags = (data?.compliance_flags ?? []) as string[];
    return flags.length ? { error: `Saved as a draft, but fix before approval: ${flags.join("; ")}.` } : { ok: "Post saved as a draft. An admin can approve it." };
  } catch (e) {
    return fail(e);
  }
}

export async function setPostStatus(ws: string, fd: FormData) {
  const ctx = await writer(ws);
  const id = uuid.safeParse(fd.get("id"));
  const status = z.enum(["draft", "approved", "scheduled"]).safeParse(fd.get("status"));
  let msg = "saved";
  if (id.success && status.success) {
    const { error } = await ctx.supabase.from("social_posts").update({ status: status.data }).eq("id", id.data).eq("workspace_id", ws);
    if (error) msg = friendly(error.message);
  }
  revalidatePath(`/w/${ws}/marketing`);
  redirect(`/w/${ws}/marketing?r=${encodeURIComponent(msg)}`);
}

export async function saveCampaign(ws: string, _: ActionState, fd: FormData): Promise<ActionState> {
  try {
    const ctx = await writer(ws);
    const p = z
      .object({
        name: text(120),
        channel: z.enum(["google_ads", "meta_ads", "tiktok_ads", "linkedin_ads", "social", "email", "print", "radio_tv", "other"]),
        objective: z.enum(["leads", "calls", "bookings", "awareness", "traffic", "reviews"]),
        budget: z.coerce.number().min(0).max(99999999).default(0),
        starts_on: optText(10),
        ends_on: optText(10),
        headline: optText(120),
        ad_text: optText(2000),
        utm_campaign: z
          .string()
          .trim()
          .toLowerCase()
          .optional()
          .transform((v) => (v ? v.replace(/[^a-z0-9_-]+/g, "-").slice(0, 60) : null)),
      })
      .safeParse(formObject(fd));
    if (!p.success) return { error: firstIssue(p.error) };
    const { data, error } = await ctx.supabase.from("campaigns").insert({ ...p.data, workspace_id: ws }).select("compliance_flags").single();
    if (error) return { error: friendly(error.message) };
    revalidatePath(`/w/${ws}/marketing`);
    const flags = (data?.compliance_flags ?? []) as string[];
    return flags.length ? { error: `Saved as a draft, but fix before approval: ${flags.join("; ")}.` } : { ok: "Campaign saved as a draft." };
  } catch (e) {
    return fail(e);
  }
}

export async function setCampaignStatus(ws: string, fd: FormData) {
  const ctx = await writer(ws);
  const id = uuid.safeParse(fd.get("id"));
  const status = z.enum(["draft", "approved", "paused", "ended"]).safeParse(fd.get("status"));
  let msg = "saved";
  if (id.success && status.success) {
    const { error } = await ctx.supabase.from("campaigns").update({ status: status.data }).eq("id", id.data).eq("workspace_id", ws);
    if (error) msg = friendly(error.message);
  }
  revalidatePath(`/w/${ws}/marketing`);
  redirect(`/w/${ws}/marketing?r=${encodeURIComponent(msg)}`);
}

/* ---------- Website ---------- */
export async function saveWebsite(ws: string, id: string | null, _: ActionState, fd: FormData): Promise<ActionState> {
  try {
    const ctx = await writer(ws);
    const p = z
      .object({ name: text(120), domain: optText(190), outline: z.string().max(3000).optional(), status: z.enum(["planned", "draft"]).default("planned") })
      .safeParse(formObject(fd));
    if (!p.success) return { error: firstIssue(p.error) };
    const domain = p.data.domain?.toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "") || null;
    if (domain && !domainRe.test(domain)) return { error: "Enter a domain like yourbusiness.com" };
    const outline = (p.data.outline ?? "")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .slice(0, 30);
    const row = { name: p.data.name, domain, outline, status: p.data.status, kit: ctx.ws.template };
    const { error } = id
      ? await ctx.supabase.from("websites").update(row).eq("id", id).eq("workspace_id", ws)
      : await ctx.supabase.from("websites").insert({ ...row, workspace_id: ws });
    if (error) return { error: friendly(error.message) };
    revalidatePath(`/w/${ws}/website`);
    return { ok: "Website plan saved." };
  } catch (e) {
    return fail(e);
  }
}

/* ---------- Calendar ---------- */
export async function saveAppointment(ws: string, _: ActionState, fd: FormData): Promise<ActionState> {
  try {
    const ctx = await writer(ws);
    const p = z
      .object({
        title: text(160),
        starts_at: z.string().min(1, "Pick a start time"),
        minutes: z.coerce.number().int().min(5).max(1440).default(30),
        kind: z.enum(["in_person", "phone", "zoom", "facetime", "other"]),
        location: optText(200),
        meeting_link: optText(500),
        contact_id: z.string().optional(),
        notes: optText(2000),
      })
      .safeParse(formObject(fd));
    if (!p.success) return { error: firstIssue(p.error) };
    const start = toIsoOrNull(p.data.starts_at);
    if (!start) return { error: "Pick a valid start time." };
    if (p.data.meeting_link && !p.data.meeting_link.startsWith("https://")) return { error: "Meeting links must start with https://" };
    const contact = p.data.contact_id ? uuid.safeParse(p.data.contact_id) : null;
    const { error } = await ctx.supabase.from("appointments").insert({
      workspace_id: ws,
      title: p.data.title,
      starts_at: start,
      ends_at: new Date(new Date(start).getTime() + p.data.minutes * 60000).toISOString(),
      kind: p.data.kind,
      location: p.data.location,
      meeting_link: p.data.meeting_link,
      notes: p.data.notes,
      contact_id: contact?.success ? contact.data : null,
    });
    if (error) return { error: friendly(error.message) };
    revalidatePath(`/w/${ws}/calendar`);
    return { ok: "Appointment booked." };
  } catch (e) {
    return fail(e);
  }
}

export async function setAppointmentStatus(ws: string, fd: FormData) {
  const ctx = await writer(ws);
  const id = uuid.safeParse(fd.get("id"));
  const status = z.enum(["scheduled", "done", "cancelled", "no_show"]).safeParse(fd.get("status"));
  if (id.success && status.success) await ctx.supabase.from("appointments").update({ status: status.data }).eq("id", id.data).eq("workspace_id", ws);
  revalidatePath(`/w/${ws}/calendar`);
}

/* ---------- Learn: courses, lessons, community, built-in lessons ---------- */
export async function saveCourse(ws: string, _: ActionState, fd: FormData): Promise<ActionState> {
  try {
    const ctx = await writer(ws);
    const p = z.object({ title: text(120), description: optText(2000), audience: z.enum(["team", "customers"]) }).safeParse(formObject(fd));
    if (!p.success) return { error: firstIssue(p.error) };
    const { error } = await ctx.supabase.from("courses").insert({ ...p.data, workspace_id: ws });
    if (error) return { error: friendly(error.message) };
    revalidatePath(`/w/${ws}/learn`);
    return { ok: "Course created." };
  } catch (e) {
    return fail(e);
  }
}

export async function saveLesson(ws: string, courseId: string, _: ActionState, fd: FormData): Promise<ActionState> {
  try {
    const ctx = await writer(ws);
    const p = z.object({ title: text(120), body: z.string().max(20000).default(""), video_url: optText(500) }).safeParse(formObject(fd));
    if (!p.success) return { error: firstIssue(p.error) };
    if (p.data.video_url && !p.data.video_url.startsWith("https://")) return { error: "Video links must start with https://" };
    const { count } = await ctx.supabase.from("lessons").select("id", { count: "exact", head: true }).eq("course_id", courseId);
    const { error } = await ctx.supabase.from("lessons").insert({ ...p.data, workspace_id: ws, course_id: courseId, position: count ?? 0 });
    if (error) return { error: friendly(error.message) };
    revalidatePath(`/w/${ws}/learn`);
    return { ok: "Lesson added." };
  } catch (e) {
    return fail(e);
  }
}

export async function setCourseStatus(ws: string, fd: FormData) {
  const ctx = await writer(ws);
  const id = uuid.safeParse(fd.get("id"));
  const status = z.enum(["draft", "published"]).safeParse(fd.get("status"));
  if (id.success && status.success) await ctx.supabase.from("courses").update({ status: status.data }).eq("id", id.data).eq("workspace_id", ws);
  revalidatePath(`/w/${ws}/learn`);
}

export async function postCommunity(ws: string, _: ActionState, fd: FormData): Promise<ActionState> {
  try {
    const ctx = await writer(ws);
    const p = z.object({ title: text(160), body: text(5000) }).safeParse(formObject(fd));
    if (!p.success) return { error: firstIssue(p.error) };
    const { error } = await ctx.supabase.from("community_posts").insert({ ...p.data, workspace_id: ws, author_id: ctx.userId });
    if (error) return { error: friendly(error.message) };
    revalidatePath(`/w/${ws}/learn`);
    return { ok: "Posted." };
  } catch (e) {
    return fail(e);
  }
}

export async function removeCommunityPost(ws: string, fd: FormData) {
  const ctx = await getWorkspace(ws);
  const id = uuid.safeParse(fd.get("id"));
  if (id.success) await ctx.supabase.from("community_posts").delete().eq("id", id.data).eq("workspace_id", ws);
  revalidatePath(`/w/${ws}/learn`);
}

export async function toggleLesson(ws: string, fd: FormData) {
  const ctx = await getWorkspace(ws);
  const key = String(fd.get("key") ?? "");
  if (!LESSONS.some((l) => l.key === key)) return;
  if (fd.get("done") === "1") await ctx.supabase.from("learning_progress").delete().eq("user_id", ctx.userId).eq("lesson_key", key);
  else await ctx.supabase.from("learning_progress").insert({ lesson_key: key });
  revalidatePath(`/w/${ws}/learn`);
}

/* ---------- Payments (invoices) ---------- */
export async function saveInvoice(ws: string, _: ActionState, fd: FormData): Promise<ActionState> {
  try {
    const ctx = await writer(ws);
    const p = z
      .object({
        number: z.string().trim().toUpperCase().regex(/^[A-Z0-9-]{1,30}$/, "Use letters, numbers and dashes"),
        description: text(500),
        amount: z.coerce.number().positive("Enter an amount").max(9999999),
        due_on: optText(10),
        contact_id: z.string().optional(),
      })
      .safeParse(formObject(fd));
    if (!p.success) return { error: firstIssue(p.error) };
    const contact = p.data.contact_id ? uuid.safeParse(p.data.contact_id) : null;
    const { error } = await ctx.supabase.from("invoices").insert({
      workspace_id: ws,
      number: p.data.number,
      description: p.data.description,
      amount: p.data.amount,
      due_on: p.data.due_on,
      contact_id: contact?.success ? contact.data : null,
    });
    if (error) return { error: friendly(error.message) };
    revalidatePath(`/w/${ws}/payments`);
    return { ok: "Invoice saved as a draft." };
  } catch (e) {
    return fail(e);
  }
}

export async function setInvoiceStatus(ws: string, fd: FormData) {
  const ctx = await writer(ws);
  const id = uuid.safeParse(fd.get("id"));
  const status = z.enum(["open", "void", "paid"]).safeParse(fd.get("status"));
  const method = z.enum(["cash", "check"]).safeParse(fd.get("paid_method"));
  let msg = "saved";
  if (id.success && status.success) {
    const { error } = await ctx.supabase
      .from("invoices")
      .update({ status: status.data, ...(status.data === "paid" ? { paid_method: method.success ? method.data : "cash" } : {}) })
      .eq("id", id.data)
      .eq("workspace_id", ws);
    if (error) msg = friendly(error.message);
  }
  revalidatePath(`/w/${ws}/payments`);
  redirect(`/w/${ws}/payments?r=${encodeURIComponent(msg)}`);
}

export async function payInvoice(ws: string, fd: FormData) {
  const ctx = await writer(ws);
  const id = uuid.safeParse(fd.get("id"));
  const origin = process.env.NEXT_PUBLIC_APP_URL ?? "";
  if (!id.success) redirect(`/w/${ws}/payments`);
  const { data, error } = await ctx.supabase.functions.invoke("payments", {
    body: { action: "checkout", invoice_id: id.data, return_url: `${origin}/w/${ws}/payments` },
  });
  if (error || !data?.url) {
    const msg = error ? await functionError(error, "Payments aren't switched on yet.") : "Payments aren't switched on yet.";
    redirect(`/w/${ws}/payments?r=${encodeURIComponent(msg)}`);
  }
  redirect(data.url as string);
}
