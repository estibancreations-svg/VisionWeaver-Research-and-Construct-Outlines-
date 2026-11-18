"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getWorkspace, type ActionState } from "@/lib/session";
import { firstIssue, formObject, uuid } from "@/lib/validation";
import { friendlyDbError } from "@/lib/functions";

/* Scoring rules + saved lists. Every write runs as the signed-in person; Row Level
   Security and the database functions are the guard. These checks only make the
   messages friendlier. */

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
function fail(e: unknown): ActionState {
  return { error: e instanceof Error ? e.message : "Something went wrong." };
}
function friendly(msg: string | undefined | null, fallback = "Couldn't save that. Please try again.") {
  return friendlyDbError(msg, fallback);
}
function isRedirect(e: unknown) {
  return Boolean(e && typeof e === "object" && "digest" in e && String((e as { digest: unknown }).digest).startsWith("NEXT_"));
}
const text = (max: number) => z.string().trim().min(1, "Please fill this in").max(max, `Must be ${max} characters or fewer`);

const STATUSES = ["lead", "qualified", "customer", "inactive"] as const;
const BANDS = ["hot", "warm", "cold"] as const;

const listSchema = z.object({
  name: text(80),
  tags: z.string().trim().max(300).default(""),
  tags_match: z.enum(["any", "all"]).default("any"),
  source: z.string().trim().max(80).default(""),
  min_score: z.string().trim().max(3).default(""),
  band: z.enum(["", ...BANDS]).default(""),
});

function filtersFrom(fd: FormData, parsed: z.infer<typeof listSchema>) {
  const status = fd.getAll("status").filter((v): v is string => typeof v === "string" && (STATUSES as readonly string[]).includes(v));
  const tags = parsed.tags
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 20);
  const minScore = parsed.min_score === "" ? null : Number(parsed.min_score);
  const filters: Record<string, unknown> = {};
  if (status.length) filters.status = status;
  if (tags.length) {
    filters.tags = tags;
    filters.tags_match = parsed.tags_match;
  }
  if (parsed.source) filters.source = parsed.source;
  if (minScore !== null && Number.isInteger(minScore) && minScore >= 0 && minScore <= 100) filters.min_score = minScore;
  if (parsed.band) filters.band = parsed.band;
  if (fd.get("has_open_deal") === "on") filters.has_open_deal = true;
  if (fd.get("has_company") === "on") filters.has_company = true;
  return filters;
}

/* ---------- Scoring rules ---------- */
export async function saveScoringRules(ws: string, _: ActionState, fd: FormData): Promise<ActionState> {
  try {
    const ctx = await writer(ws);
    const { data: rules, error: readError } = await ctx.supabase.from("scoring_rules").select("id").eq("workspace_id", ws);
    if (readError) return { error: friendly(readError.message) };
    for (const rule of rules ?? []) {
      const raw = fd.get(`points_${rule.id}`);
      const points = raw === null ? null : Number(raw);
      if (points === null || !Number.isInteger(points) || points < -100 || points > 100) {
        return { error: "Points must be whole numbers between -100 and 100." };
      }
      const { error } = await ctx.supabase
        .from("scoring_rules")
        .update({ points, active: fd.get(`active_${rule.id}`) === "on" })
        .eq("id", rule.id)
        .eq("workspace_id", ws);
      if (error) return { error: friendly(error.message) };
    }
    const { data: count, error: rpcError } = await ctx.supabase.rpc("recompute_workspace_scores", { p_workspace: ws });
    if (rpcError) return { error: friendly(rpcError.message) };
    revalidatePath(`/w/${ws}/scoring`);
    revalidatePath(`/w/${ws}/contacts`);
    revalidatePath(`/w/${ws}/lists`);
    return { ok: `Rules saved. Recalculated ${count ?? 0} contacts.` };
  } catch (e) {
    return fail(e);
  }
}

export async function recalculateScores(ws: string, _: ActionState, _fd: FormData): Promise<ActionState> {
  try {
    void _fd;
    const ctx = await writer(ws);
    const { data: count, error } = await ctx.supabase.rpc("recompute_workspace_scores", { p_workspace: ws });
    if (error) return { error: friendly(error.message) };
    revalidatePath(`/w/${ws}/scoring`);
    revalidatePath(`/w/${ws}/contacts`);
    revalidatePath(`/w/${ws}/lists`);
    return { ok: `Recalculated ${count ?? 0} contacts.` };
  } catch (e) {
    return fail(e);
  }
}

/* ---------- Lists ---------- */
export async function createList(ws: string, _: ActionState, fd: FormData): Promise<ActionState> {
  try {
    const ctx = await writer(ws);
    const p = listSchema.safeParse(formObject(fd));
    if (!p.success) return { error: firstIssue(p.error) };
    const { data, error } = await ctx.supabase
      .from("contact_lists")
      .insert({ workspace_id: ws, name: p.data.name, filters: filtersFrom(fd, p.data) })
      .select("id")
      .single();
    if (error) return { error: friendly(error.message) };
    revalidatePath(`/w/${ws}/lists`);
    redirect(`/w/${ws}/lists/${data.id}`);
  } catch (e) {
    if (isRedirect(e)) throw e;
    return fail(e);
  }
}

export async function updateList(ws: string, listId: string, _: ActionState, fd: FormData): Promise<ActionState> {
  try {
    const ctx = await writer(ws);
    const id = uuid.safeParse(listId);
    if (!id.success) return { error: "List not found." };
    const p = listSchema.safeParse(formObject(fd));
    if (!p.success) return { error: firstIssue(p.error) };
    const { error } = await ctx.supabase
      .from("contact_lists")
      .update({ name: p.data.name, filters: filtersFrom(fd, p.data) })
      .eq("id", id.data)
      .eq("workspace_id", ws);
    if (error) return { error: friendly(error.message) };
    revalidatePath(`/w/${ws}/lists`);
    revalidatePath(`/w/${ws}/lists/${id.data}`);
    return { ok: "List saved." };
  } catch (e) {
    return fail(e);
  }
}

export async function deleteList(ws: string, fd: FormData) {
  const ctx = await adminOf(ws);
  const id = uuid.safeParse(fd.get("id"));
  if (!id.success) redirect(`/w/${ws}/lists`);
  const { error } = await ctx.supabase.from("contact_lists").delete().eq("id", id.data).eq("workspace_id", ws);
  revalidatePath(`/w/${ws}/lists`);
  redirect(`/w/${ws}/lists${error ? "?r=" + encodeURIComponent(friendly(error.message)) : ""}`);
}
