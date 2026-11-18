import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getWorkspace } from "@/lib/session";
import { relativeTime } from "@/lib/format";
import { CHANNEL_LABEL, type Channel } from "@/lib/plans";
import { PageHead } from "@/components/ui";
import { ActionForm, SubmitButton } from "@/components/forms";
import { Pill } from "@/components/tools";
import { retryMessage, sendMessage } from "../../tools-actions";

export const metadata: Metadata = { title: "Conversation" };

const STATUS: Record<string, string> = {
  sent: "Sent",
  queued: "Queued",
  needs_connection: "Waiting for connection",
  delivered: "Delivered",
  failed: "Failed",
  received: "Received",
};

export default async function Conversation({ params }: { params: Promise<{ ws: string; id: string }> }) {
  const { ws, id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const ctx = await getWorkspace(ws);
  const [{ data: conv }, { data: msgs }] = await Promise.all([
    ctx.supabase.from("conversations").select("id, kind, channel, subject, contact_id").eq("id", id).eq("workspace_id", ws).maybeSingle(),
    ctx.supabase.from("messages").select("id, direction, body, status, sender_id, created_at").eq("conversation_id", id).order("created_at").limit(300),
  ]);
  if (!conv) notFound();
  const senderIds = [...new Set((msgs ?? []).map((m) => m.sender_id).filter((v): v is string => Boolean(v)))];
  const { data: people } = senderIds.length
    ? await ctx.supabase.from("profiles").select("id, full_name, email").in("id", senderIds)
    : { data: [] as { id: string; full_name: string; email: string }[] };
  const who = new Map((people ?? []).map((p) => [p.id, p.full_name || p.email]));

  return (
    <div className="stack-lg" style={{ maxWidth: 820 }}>
      <PageHead eyebrow={CHANNEL_LABEL[conv.channel as Channel] ?? conv.channel} title={conv.subject} back={{ href: `/w/${ws}/inbox`, label: "Inbox" }} />
      <ol className="timeline">
        {(msgs ?? []).map((m) => (
          <li key={m.id} className="card stack" style={{ gap: 6 }}>
            <div className="spread">
              <strong>{m.direction === "inbound" ? "Customer" : (who.get(m.sender_id ?? "") ?? "Team")}</strong>
              <span className="faint">{relativeTime(m.created_at)}</span>
            </div>
            <p style={{ whiteSpace: "pre-wrap", margin: 0 }}>{m.body}</p>
            <div className="row" style={{ gap: 8, alignItems: "center" }}>
              {m.direction !== "internal" ? <Pill value={m.status === "needs_connection" ? "high" : "plain"} label={STATUS[m.status] ?? m.status} /> : null}
              {m.direction === "outbound" && m.status === "failed" && ctx.canWrite ? (
                <ActionForm action={retryMessage.bind(null, ws, conv.id, m.id)}>
                  <SubmitButton pendingText="Trying again…" className="btn btn-ghost">Try again</SubmitButton>
                </ActionForm>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
      {ctx.canWrite ? (
        <section className="card">
          <ActionForm action={sendMessage.bind(null, ws, conv.id)} resetOnSuccess>
            <div className="field">
              <label className="label" htmlFor="body">{conv.kind === "internal" ? "Message the team" : "Reply"}</label>
              <textarea className="textarea" id="body" name="body" rows={3} required maxLength={10000} />
            </div>
            <SubmitButton pendingText="Sending…">Send</SubmitButton>
          </ActionForm>
        </section>
      ) : null}
    </div>
  );
}
