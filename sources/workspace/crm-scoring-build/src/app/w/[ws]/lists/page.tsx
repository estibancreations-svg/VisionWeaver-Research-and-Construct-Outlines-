import Link from "next/link";
import type { Metadata } from "next";
import { getWorkspace } from "@/lib/session";
import { Avatar, Empty, PageHead } from "@/components/ui";
import { ActionForm, SubmitButton } from "@/components/forms";
import { createList } from "../scoring-actions";

export const metadata: Metadata = { title: "Lists" };

type Filters = {
  status?: string[];
  tags?: string[];
  tags_match?: string;
  source?: string;
  min_score?: number;
  band?: string;
  has_open_deal?: boolean;
  has_company?: boolean;
};

const STATUS_LABEL: Record<string, string> = { lead: "Lead", qualified: "Qualified", customer: "Customer", inactive: "Inactive" };
const BAND_LABEL: Record<string, string> = { hot: "Hot", warm: "Warm", cold: "Cold" };

function summary(f: Filters): string {
  const parts: string[] = [];
  if (f.status?.length) parts.push(f.status.map((s) => STATUS_LABEL[s] ?? s).join(", "));
  if (f.tags?.length) parts.push(`tags ${f.tags_match === "all" ? "all of" : "any of"}: ${f.tags.join(", ")}`);
  if (f.source) parts.push(`source: ${f.source}`);
  if (typeof f.min_score === "number") parts.push(`score ${f.min_score}+`);
  if (f.band) parts.push(BAND_LABEL[f.band] ?? f.band);
  if (f.has_open_deal) parts.push("has an open deal");
  if (f.has_company) parts.push("linked to a company");
  return parts.join(" · ") || "Everyone";
}

export default async function Lists({ params }: { params: Promise<{ ws: string }> }) {
  const { ws } = await params;
  const ctx = await getWorkspace(ws);
  const { data: lists } = await ctx.supabase.from("contact_lists").select("id, name, filters, created_at").eq("workspace_id", ws).order("created_at", { ascending: false });

  return (
    <div className="stack-lg">
      <PageHead
        eyebrow={ctx.ws.name}
        title="Lists"
        actions={
          <Link className="btn" href={`/w/${ws}/scoring`}>
            Scoring rules
          </Link>
        }
      />
      <p className="faint" style={{ margin: 0 }}>
        Lists gather themselves. Set the filters once, and the members stay current as contacts, deals, and messages change.
      </p>

      {(lists ?? []).length === 0 ? (
        <div className="card">
          <Empty title="No lists yet">Save your first list below.</Empty>
        </div>
      ) : (
        <ul className="list">
          {(lists ?? []).map((l) => (
            <li key={l.id}>
              <Link className="list-item" href={`/w/${ws}/lists/${l.id}`}>
                <Avatar name={l.name} />
                <div className="list-main">
                  <div className="list-title">{l.name}</div>
                  <div className="list-sub">{summary((l.filters ?? {}) as Filters)}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {ctx.canWrite ? (
        <section className="card stack">
          <h2>New list</h2>
          <ActionForm action={createList.bind(null, ws)} resetOnSuccess>
            <div className="field">
              <label className="label" htmlFor="name">Name</label>
              <input className="input" id="name" name="name" required maxLength={80} placeholder="Hot leads" />
            </div>
            <div className="field">
              <span className="label">Status</span>
              <div className="row" style={{ gap: 12 }}>
                {(["lead", "qualified", "customer", "inactive"] as const).map((s) => (
                  <label key={s}>
                    <input type="checkbox" name="status" value={s} /> {STATUS_LABEL[s]}
                  </label>
                ))}
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="tags">Tags (comma separated)</label>
              <input className="input" id="tags" name="tags" maxLength={300} placeholder="vip, sms" />
            </div>
            <div className="field">
              <label className="label" htmlFor="tags_match">Tags must match</label>
              <select className="select" id="tags_match" name="tags_match" defaultValue="any" style={{ width: "auto" }}>
                <option value="any">Any of them</option>
                <option value="all">All of them</option>
              </select>
            </div>
            <div className="field">
              <label className="label" htmlFor="source">Source</label>
              <input className="input" id="source" name="source" maxLength={80} placeholder="website" />
            </div>
            <div className="field">
              <label className="label" htmlFor="min_score">Minimum score</label>
              <input className="input" id="min_score" name="min_score" type="number" min={0} max={100} placeholder="0" style={{ width: 120 }} />
            </div>
            <div className="field">
              <label className="label" htmlFor="band">Band</label>
              <select className="select" id="band" name="band" defaultValue="" style={{ width: "auto" }}>
                <option value="">Any band</option>
                <option value="hot">Hot (70+)</option>
                <option value="warm">Warm (40–69)</option>
                <option value="cold">Cold (under 40)</option>
              </select>
            </div>
            <div className="field">
              <label>
                <input type="checkbox" name="has_open_deal" /> Has an open deal
              </label>
            </div>
            <div className="field">
              <label>
                <input type="checkbox" name="has_company" /> Linked to a company
              </label>
            </div>
            <SubmitButton pendingText="Saving…">Save list</SubmitButton>
          </ActionForm>
        </section>
      ) : null}
    </div>
  );
}
