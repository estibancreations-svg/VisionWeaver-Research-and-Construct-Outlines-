// Edge Function: delivery — sends queued Inbox email (Resend) and text (Twilio) messages,
// records provider receipts, takes in replies, and honors STOP / spam complaints.
//
//   POST { action: "deliver", message_id }            (signed-in member of that sub-account)
//        → { ok: true, status } — sends ONE queued or failed message.
//   POST { action: "drain", workspace_id, limit? }    (signed-in member; 25 max)
//        → { ok: true, sent, failed, results } — sends queued messages, oldest first.
//   POST /webhooks/twilio?agency=<uuid>              (Twilio status receipts + inbound texts)
//   POST /webhooks/resend?agency=<uuid>              (Resend delivery receipts + complaints)
//
// Only messages a signed-in member queued in the app UI are ever sent. Agent requests live
// in thelma_requests and are never read here; agent sending stays behind the T.H.E.L.M.A.
// approval queue (see docs/OPERATING_POLICY.md). Delivery stays OFF until the Owner turns
// it on (delivery_settings) — and always OFF in the Owner copy. Keys live in the
// Connections vault and reach this function only through the delivery_keys RPC.
//
// Vault contract (upload in Connections; never paste keys anywhere else):
//   Resend: provider "resend", secret { api_key }. Free tier: 3,000 emails/month, 100/day.
//   Twilio: provider "twilio", client_id = Account SID, secret { auth_token },
//           settings { message_service_sid } and/or { from_number }.
// Webhook secrets: RESEND_WEBHOOK_SECRET (function secret, from the Resend dashboard).
//   Twilio webhooks are signed with the vault auth token — no extra secret.
// Deploy with: supabase functions deploy delivery --no-verify-jwt   (it checks tokens/signatures itself)
// Webhook URLs (paste exactly, including ?agency=, in each provider dashboard):
//   Twilio status callback + inbound: <project>/functions/v1/delivery/webhooks/twilio?agency=<uuid>
//   Resend events:                    <project>/functions/v1/delivery/webhooks/resend?agency=<uuid>
//
// Cost notes: Resend's Free tier cap is enforced by Resend (over-cap sends fail plainly).
// Twilio charges per segment; the segment count is recorded in delivery_usage_log.
// Drain runs one at a time — do not run two drains for one sub-account at once.
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const STOP_WORDS = new Set(["STOP", "STOPALL", "UNSUBSCRIBE", "CANCEL", "END", "QUIT"]);
const START_WORDS = new Set(["START", "YES", "UNSTOP"]);
const GSM_EXTENDED = new Set(["^", "{", "}", "\\", "[", "~", "]", "|", "€"]);

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}
function plain(v: unknown, fallback: string): string {
  return typeof v === "string" && v.trim() ? v.slice(0, 500) : fallback;
}
async function hmacBase64(secret: Uint8Array, message: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", secret, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  let bin = "";
  for (const b of new Uint8Array(sig)) bin += String.fromCharCode(b);
  return btoa(bin);
}
function base64ToBytes(s: string): Uint8Array {
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

/** Normalize a phone number to E.164. US numbers without a country code get +1. */
function normalizePhone(raw: string): string | null {
  const cleaned = raw.replace(/[^\d+]/g, "");
  if (cleaned.startsWith("+")) return /^\+\d{7,15}$/.test(cleaned) ? cleaned : null;
  if (/^1\d{10}$/.test(cleaned)) return `+${cleaned}`;
  if (/^\d{10}$/.test(cleaned)) return `+1${cleaned}`;
  return null;
}
function digitsOnly(raw: string): string {
  return raw.replace(/\D/g, "");
}
/** Count SMS segments (GSM-7: 160/153 per segment; Unicode: 70/67). Used for the usage log only. */
function countSegments(body: string): number {
  let units = 0;
  let unicode = false;
  for (const ch of body) {
    const code = ch.codePointAt(0) ?? 0;
    if (code > 127 && ch !== "€") unicode = true;
    units += GSM_EXTENDED.has(ch) ? 2 : 1;
  }
  if (unicode) return Math.max(1, Math.ceil(units / (units <= 70 ? 70 : 67)));
  return Math.max(1, Math.ceil(units / (units <= 160 ? 160 : 153)));
}

type Conn = { provider: string; kind: string; client_id: string | null; settings: Record<string, unknown>; secrets: Record<string, string> };

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json(405, { error: "Method not allowed" });
  const url = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !anonKey || !serviceKey) return json(500, { error: "Function is not configured" });
  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });
  const reqUrl = new URL(req.url);

  async function keysFor(agencyId: string): Promise<Conn[]> {
    const { data, error } = await admin.rpc("delivery_keys", { p_agency: agencyId });
    if (error || !Array.isArray(data)) return [];
    return data as Conn[];
  }
  async function logUsage(row: Record<string, unknown>) {
    await admin.from("delivery_usage_log").insert(row);
  }
  async function failMessage(id: string, provider: string, error: string) {
    await admin.from("messages").update({ status: "failed", provider, provider_error: error.slice(0, 500) }).eq("id", id);
  }

  // ---- Twilio webhook: status receipts + inbound texts (signed with the vault auth token) ----
  if (reqUrl.pathname.endsWith("/webhooks/twilio")) {
    const agencyId = reqUrl.searchParams.get("agency") ?? "";
    if (!UUID.test(agencyId)) return json(400, { error: "agency is required" });
    const conns = await keysFor(agencyId);
    const tw = conns.find((c) => c.provider === "twilio");
    const token = tw?.secrets.auth_token ?? tw?.secrets.secret ?? "";
    if (!token) return json(500, { error: "Twilio is not connected yet" });
    const sig = req.headers.get("x-twilio-signature") ?? "";
    const raw = await req.text();
    const params = new URLSearchParams(raw);
    const sorted = [...params.entries()].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
    const signed = req.url + sorted.map(([k, v]) => k + v).join("");
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(token), { name: "HMAC", hash: "SHA-1" }, false, ["sign"]);
    const sigBytes = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signed)));
    let bin = "";
    for (const b of sigBytes) bin += String.fromCharCode(b);
    if (btoa(bin) !== sig) return json(400, { error: "Bad signature" });
    const sid = params.get("MessageSid") ?? params.get("SmsSid") ?? "";
    const status = (params.get("MessageStatus") ?? params.get("SmsStatus") ?? "").toLowerCase();
    const body = params.get("Body") ?? "";

    // Receipt for a message we sent: match by provider id, and only inside this agency.
    if (sid && status) {
      const { data: msg } = await admin.from("messages").select("id, workspace_id, channel").eq("provider_message_id", sid).maybeSingle();
      if (msg) {
        const { data: ws } = await admin.from("workspaces").select("agency_id").eq("id", msg.workspace_id).single();
        if (ws?.agency_id === agencyId) {
          if (status === "delivered") {
            await admin.from("messages").update({ status: "delivered", delivered_at: new Date().toISOString(), provider_error: null }).eq("id", msg.id);
            await logUsage({ agency_id: agencyId, workspace_id: msg.workspace_id, message_id: msg.id, channel: "sms", provider: "twilio", provider_message_id: sid, status: "delivered" });
          } else if (status === "failed" || status === "undelivered") {
            const code = params.get("ErrorCode") ?? "";
            await failMessage(msg.id, "twilio", code ? `Delivery failed (code ${code}).` : "Delivery failed.");
            await logUsage({ agency_id: agencyId, workspace_id: msg.workspace_id, message_id: msg.id, channel: "sms", provider: "twilio", provider_message_id: sid, status: "failed", detail: code ? `Error code ${code}` : null });
          }
          return json(200, { received: true });
        }
      }
    }

    // Inbound text from a customer. Unknown numbers are ignored: contacts are never
    // created automatically. STOP / START update the contact's opt-out flags.
    if (body && params.get("From")) {
      const fromDigits = digitsOnly(params.get("From") ?? "");
      const { data: workspaces } = await admin.from("workspaces").select("id").eq("agency_id", agencyId);
      const wsIds = (workspaces ?? []).map((w: { id: string }) => w.id);
      let contact: { id: string; workspace_id: string; first_name: string; last_name: string; phone: string | null } | null = null;
      if (wsIds.length) {
        const { data: contacts } = await admin.from("contacts").select("id, workspace_id, first_name, last_name, phone").in("workspace_id", wsIds).not("phone", "is", null).limit(500);
        contact = (contacts ?? []).find((c: { phone: string | null }) => {
          const d = digitsOnly(c.phone ?? "");
          return d && fromDigits && (d.endsWith(fromDigits.slice(-10)) || fromDigits.endsWith(d.slice(-10)));
        }) ?? null;
      }
      if (contact) {
        const word = body.trim().toUpperCase();
        if (STOP_WORDS.has(word)) {
          await admin.from("contacts").update({ sms_opted_out: true, sms_opted_out_at: new Date().toISOString() }).eq("id", contact.id);
          await logUsage({ agency_id: agencyId, workspace_id: contact.workspace_id, channel: "sms", provider: "twilio", provider_message_id: sid || null, status: "opt_out", detail: "STOP received" });
        } else if (START_WORDS.has(word)) {
          await admin.from("contacts").update({ sms_opted_out: false, sms_opted_out_at: null }).eq("id", contact.id);
        }
        let { data: conv } = await admin.from("conversations").select("id").eq("workspace_id", contact.workspace_id).eq("contact_id", contact.id).eq("channel", "sms").order("last_message_at", { ascending: false }).limit(1).maybeSingle();
        if (!conv) {
          const name = `${contact.first_name} ${contact.last_name}`.trim();
          const { data: created } = await admin.from("conversations").insert({ workspace_id: contact.workspace_id, kind: "contact", channel: "sms", contact_id: contact.id, subject: name ? `Texts with ${name}` : "Text conversation" }).select("id").single();
          conv = created;
        }
        if (conv) {
          const { data: inserted } = await admin.from("messages").insert({ workspace_id: contact.workspace_id, conversation_id: conv.id, channel: "sms", direction: "inbound", status: "received", sender_id: null, body: body.slice(0, 10000) }).select("id").single();
          await logUsage({ agency_id: agencyId, workspace_id: contact.workspace_id, message_id: inserted?.id ?? null, channel: "sms", provider: "twilio", provider_message_id: sid || null, status: "received" });
        }
      }
    }
    return json(200, { received: true });
  }

  // ---- Resend webhook: delivery receipts + spam complaints (Svix-signed) ----
  if (reqUrl.pathname.endsWith("/webhooks/resend")) {
    const agencyId = reqUrl.searchParams.get("agency") ?? "";
    if (!UUID.test(agencyId)) return json(400, { error: "agency is required" });
    const secret = Deno.env.get("RESEND_WEBHOOK_SECRET");
    if (!secret) return json(500, { error: "Webhook is not configured" });
    const svixId = req.headers.get("svix-id") ?? "";
    const svixTs = req.headers.get("svix-timestamp") ?? "";
    const svixSig = req.headers.get("svix-signature") ?? "";
    const t = Number(svixTs);
    if (!svixId || !t || Math.abs(Date.now() / 1000 - t) > 300) return json(400, { error: "Stale signature" });
    const raw = await req.text();
    const keyBytes = base64ToBytes(secret.replace(/^whsec_/, ""));
    const expected = await hmacBase64(keyBytes, `${svixId}.${svixTs}.${raw}`);
    const ok = svixSig.split(" ").some((part) => part.startsWith("v1,") && part.slice(3) === expected);
    if (!ok) return json(400, { error: "Bad signature" });
    let event: Record<string, any>;
    try {
      event = JSON.parse(raw);
    } catch {
      return json(400, { error: "Body must be JSON" });
    }
    const emailId = event?.data?.email_id;
    if (typeof emailId === "string") {
      const { data: msg } = await admin.from("messages").select("id, workspace_id, conversation_id").eq("provider_message_id", emailId).maybeSingle();
      if (msg) {
        const { data: ws } = await admin.from("workspaces").select("agency_id").eq("id", msg.workspace_id).single();
        if (ws?.agency_id === agencyId) {
          if (event.type === "email.delivered") {
            await admin.from("messages").update({ status: "delivered", delivered_at: new Date().toISOString(), provider_error: null }).eq("id", msg.id);
            await logUsage({ agency_id: agencyId, workspace_id: msg.workspace_id, message_id: msg.id, channel: "email", provider: "resend", provider_message_id: emailId, status: "delivered" });
          } else if (event.type === "email.bounced" || event.type === "email.failed") {
            const detail = plain(event?.data?.error?.message ?? event?.data?.bounce?.message, "Delivery failed.");
            await failMessage(msg.id, "resend", detail);
            await logUsage({ agency_id: agencyId, workspace_id: msg.workspace_id, message_id: msg.id, channel: "email", provider: "resend", provider_message_id: emailId, status: "failed", detail });
          } else if (event.type === "email.complained") {
            // A spam complaint opts the contact out of email. The message stays delivered.
            const { data: conv } = await admin.from("conversations").select("contact_id").eq("id", msg.conversation_id).maybeSingle();
            if (conv?.contact_id) {
              await admin.from("contacts").update({ email_opted_out: true, email_opted_out_at: new Date().toISOString() }).eq("id", conv.contact_id);
              await logUsage({ agency_id: agencyId, workspace_id: msg.workspace_id, message_id: msg.id, channel: "email", provider: "resend", provider_message_id: emailId, status: "opt_out", detail: "Spam complaint received" });
            }
          }
        }
      }
    }
    return json(200, { received: true });
  }

  // ---- Send actions (signed-in person in that sub-account) ----
  const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!token) return json(401, { error: "Sign in first" });
  const asUser = createClient(url, anonKey, { global: { headers: { Authorization: `Bearer ${token}` } }, auth: { persistSession: false } });
  const { data: who } = await asUser.auth.getUser(token);
  if (!who?.user) return json(401, { error: "Sign in first" });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: "Body must be JSON" });
  }
  if (body.action !== "deliver" && body.action !== "drain") return json(400, { error: "Unknown action" });

  /** Send one message. Returns the plain-words outcome; the message row carries the result. */
  async function deliverOne(messageId: string): Promise<{ status: string; error?: string }> {
    // RLS decides whether this person may see the message; the service role does the sending.
    const { data: msg } = await asUser.from("messages").select("id, workspace_id, conversation_id, channel, direction, body, status, sender_id, from_mailbox, attempts").eq("id", messageId).maybeSingle();
    if (!msg) return { status: "missing", error: "Message not found." };
    if (msg.direction !== "outbound" || !msg.sender_id) return { status: "refused", error: "Only messages queued in the app can be sent." };
    if (msg.status !== "queued" && msg.status !== "failed") return { status: msg.status };
    if (msg.channel !== "email" && msg.channel !== "sms") return { status: "refused", error: "That channel can't send yet." };
    const { data: conv } = await admin.from("conversations").select("kind, channel, contact_id, subject").eq("id", msg.conversation_id).single();
    if (!conv || conv.kind !== "contact" || !conv.contact_id) return { status: "refused", error: "That conversation has no contact." };
    const { data: contact } = await admin.from("contacts").select("id, email, phone, email_opted_out, sms_opted_out").eq("id", conv.contact_id).single();
    if (!contact) return { status: "refused", error: "That contact is gone." };
    const { data: ws } = await admin.from("workspaces").select("id, agency_id, name, email_domain, email_domain_status").eq("id", msg.workspace_id).single();
    if (!ws) return { status: "refused", error: "That sub-account is gone." };

    const optedOut = msg.channel === "email" ? contact.email_opted_out : contact.sms_opted_out;
    if (optedOut) {
      const err = msg.channel === "email" ? "This contact opted out of email." : "This contact opted out of texts.";
      await failMessage(msg.id, msg.channel === "email" ? "resend" : "twilio", err);
      return { status: "failed", error: err };
    }
    // Plan feature + verified domain, mirroring the queue trigger.
    const { data: agency } = await admin.from("agencies").select("plan").eq("id", ws.agency_id).single();
    const { data: plan } = await admin.from("plans").select("features").eq("id", agency?.plan ?? "").maybeSingle();
    const features: string[] = Array.isArray(plan?.features) ? plan.features : [];
    if (!features.includes(msg.channel)) {
      await admin.from("messages").update({ status: "needs_connection", provider_error: null }).eq("id", msg.id);
      return { status: "needs_connection", error: "Your plan does not include this yet." };
    }
    if (msg.channel === "email" && ws.email_domain_status !== "verified") {
      await admin.from("messages").update({ status: "needs_connection", provider_error: null }).eq("id", msg.id);
      return { status: "needs_connection", error: "Verify the email domain first." };
    }
    const { data: settings } = await admin.from("delivery_settings").select("mode, email_enabled, sms_enabled").eq("agency_id", ws.agency_id).maybeSingle();
    if (!settings || settings.mode === "off") return { status: "queued", error: "Delivery is switched off." };
    if (msg.channel === "email" && !settings.email_enabled) return { status: "queued", error: "Email delivery is switched off." };
    if (msg.channel === "sms" && !settings.sms_enabled) return { status: "queued", error: "Text delivery is switched off." };

    // Claim the message so a second caller does not send it twice.
    const { data: claimed } = await admin.from("messages").update({ attempts: (msg.attempts ?? 0) + 1 }).eq("id", msg.id).in("status", ["queued", "failed"]).select("id").maybeSingle();
    if (!claimed) {
      const { data: again } = await admin.from("messages").select("status").eq("id", msg.id).single();
      return { status: again?.status ?? msg.status };
    }

    const conns = await keysFor(ws.agency_id);
    if (msg.channel === "email") {
      const resend = conns.find((c) => c.provider === "resend");
      const apiKey = resend?.secrets.api_key ?? "";
      if (!apiKey) {
        await admin.from("messages").update({ status: "needs_connection", provider_error: null }).eq("id", msg.id);
        return { status: "needs_connection", error: "Connect Resend in Connections first." };
      }
      const to = (contact.email ?? "").trim();
      if (!to) {
        await failMessage(msg.id, "resend", "Add an email address for this contact.");
        return { status: "failed", error: "Add an email address for this contact." };
      }
      // From: the message's mailbox, else the sender's active mailbox, else the Owner
      // mailbox, else hello@domain. The domain is verified (checked above).
      let fromAddr = `hello@${ws.email_domain}`;
      let fromName = ws.name;
      let replyTo: string | undefined;
      const { data: boxes } = await admin.from("mailboxes").select("id, slot, local_part, display_name, assigned_user, status").eq("workspace_id", ws.id);
      const pick = (boxes ?? []).find((b: any) => b.id === msg.from_mailbox && b.status === "active")
        ?? (boxes ?? []).find((b: any) => b.assigned_user === msg.sender_id && b.status === "active")
        ?? (boxes ?? []).find((b: any) => b.slot === "owner" && b.status === "active")
        ?? (boxes ?? []).find((b: any) => b.status === "active");
      if (pick) {
        fromAddr = `${pick.local_part}@${ws.email_domain}`;
        fromName = pick.display_name;
        replyTo = fromAddr;
      }
      const subject = (conv.subject ?? "").trim() || `Message from ${ws.name}`;
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `msg-${msg.id}` },
        body: JSON.stringify({ from: `${fromName} <${fromAddr}>`, to: [to], subject, text: msg.body, ...(replyTo ? { reply_to: replyTo } : {}) }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok || typeof payload.id !== "string") {
        const err = plain(payload?.message, "Resend did not send the email.");
        await failMessage(msg.id, "resend", err);
        await logUsage({ agency_id: ws.agency_id, workspace_id: ws.id, message_id: msg.id, channel: "email", provider: "resend", status: "failed", detail: err });
        return { status: "failed", error: err };
      }
      await admin.from("messages").update({ status: "sent", provider: "resend", provider_message_id: payload.id, provider_error: null }).eq("id", msg.id);
      await logUsage({ agency_id: ws.agency_id, workspace_id: ws.id, message_id: msg.id, channel: "email", provider: "resend", provider_message_id: payload.id, status: "sent" });
      return { status: "sent" };
    }

    // SMS via Twilio.
    const tw = conns.find((c) => c.provider === "twilio");
    const sid = tw?.client_id ?? (typeof tw?.settings.account_sid === "string" ? tw.settings.account_sid : "") ?? "";
    const authToken = tw?.secrets.auth_token ?? tw?.secrets.secret ?? "";
    const msid = typeof tw?.settings.message_service_sid === "string" ? tw.settings.message_service_sid : "";
    const fromNumber = typeof tw?.settings.from_number === "string" ? tw.settings.from_number : "";
    if (!sid || !authToken || (!msid && !fromNumber)) {
      await admin.from("messages").update({ status: "needs_connection", provider_error: null }).eq("id", msg.id);
      return { status: "needs_connection", error: "Connect Twilio in Connections first." };
    }
    const to = normalizePhone(contact.phone ?? "");
    if (!to) {
      await failMessage(msg.id, "twilio", "Add a full phone number for this contact.");
      return { status: "failed", error: "Add a full phone number for this contact." };
    }
    if (msg.body.length > 1600) {
      await failMessage(msg.id, "twilio", "That text is too long to send.");
      return { status: "failed", error: "That text is too long to send." };
    }
    const form = new URLSearchParams({ To: to, Body: msg.body, StatusCallback: `${url}/functions/v1/delivery/webhooks/twilio?agency=${ws.agency_id}` });
    if (msid) form.set("MessagingServiceSid", msid);
    else form.set("From", fromNumber);
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: "POST",
      headers: { Authorization: `Basic ${btoa(`${sid}:${authToken}`)}`, "Content-Type": "application/x-www-form-urlencoded" },
      body: form,
    });
    const payload = await res.json().catch(() => ({}));
    if (!res.ok || typeof payload.sid !== "string") {
      const err = plain(payload?.message, "Twilio did not send the text.");
      await failMessage(msg.id, "twilio", err);
      await logUsage({ agency_id: ws.agency_id, workspace_id: ws.id, message_id: msg.id, channel: "sms", provider: "twilio", status: "failed", detail: err });
      return { status: "failed", error: err };
    }
    await admin.from("messages").update({ status: "sent", provider: "twilio", provider_message_id: payload.sid, provider_error: null }).eq("id", msg.id);
    await logUsage({ agency_id: ws.agency_id, workspace_id: ws.id, message_id: msg.id, channel: "sms", provider: "twilio", provider_message_id: payload.sid, status: "sent", segments: countSegments(msg.body) });
    return { status: "sent" };
  }

  if (body.action === "deliver") {
    const messageId = typeof body.message_id === "string" && UUID.test(body.message_id) ? body.message_id : null;
    if (!messageId) return json(400, { error: "message_id is required" });
    const result = await deliverOne(messageId);
    if (result.status === "missing") return json(404, { error: result.error });
    return json(200, { ok: true, status: result.status, ...(result.error ? { error: result.error } : {}) });
  }

  // Drain: queued messages only, oldest first. Failed messages wait for an explicit retry.
  const workspaceId = typeof body.workspace_id === "string" && UUID.test(body.workspace_id) ? body.workspace_id : null;
  if (!workspaceId) return json(400, { error: "workspace_id is required" });
  const { data: wsRow } = await asUser.from("workspaces").select("id").eq("id", workspaceId).maybeSingle();
  if (!wsRow) return json(404, { error: "Sub-account not found" });
  const limit = Math.min(Math.max(Number(body.limit) || 10, 1), 25);
  const { data: queued } = await admin.from("messages").select("id").eq("workspace_id", workspaceId).eq("status", "queued").eq("direction", "outbound").order("created_at", { ascending: true }).limit(limit);
  const results: { id: string; status: string }[] = [];
  let sent = 0;
  let failed = 0;
  for (const row of queued ?? []) {
    const r = await deliverOne(row.id);
    results.push({ id: row.id, status: r.status });
    if (r.status === "sent") sent++;
    else if (r.status === "failed") failed++;
  }
  return json(200, { ok: true, sent, failed, results });
});
