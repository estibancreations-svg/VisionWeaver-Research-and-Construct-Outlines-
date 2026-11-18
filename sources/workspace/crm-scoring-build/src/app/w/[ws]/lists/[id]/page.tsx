import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getWorkspace } from "@/lib/session";
import { fullName, pageRange } from "@/lib/format";
import { Avatar, Badge, Empty, PageHead, Pager } from "@/components/ui";
import { ActionForm, SubmitButton } from "@/components/forms";
import { deleteList, updateList } from "../../scoring-actions";

export const metadata: Metadata = { title: "List" };
const SIZE = 25;

const STATUS_LABEL: Record<string, string> = { lead: "Lead", qualified: "Qualified", customer: "Customer", inactive: "Inactive" };
const BAND_LABEL: Record<string, string> = { hot: "Hot", warm: "Warm", cold: "Cold" };

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

export default async function ListDetail({
  params,
  searchParams,
}: {
  params: Promise<{ ws: string; id: string }>;
  searchParams: Promise<{ page?: string; r?: string }>;
}) {
  const { ws, id } = await params;
  const sp = await searchParams;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const ctx = await getWorkspace(ws);
  const page = Math.max(1, Number(sp.page) || 1);
  const [from, to] = pageRange(page, SIZE);
  const { data: list } = await ctx.supabase.from("contact_lists").select("id, name, filters").eq("id", id).eq("workspace_id", ws).maybeSingle();
  if (!list) notFound();
  const f = (list.filters ?? {}) as Filters;
  const { data: members, count, error } = await ctx.supabase.rpc("list_contacts", { p_list: id }, { count: "exact" }).range(from, to);
  const href = (p: number) => `/w/${ws}/lists/${id}?page=${p}`;

  return (
    <div className="stack-lg">
      <PageHead eyebrow="List" title={list.name} back={{ href: `/w/${ws}/lists`, label: "Lists" }} />
      {sp.r ? (
        <p className="alert alert-error" role="alert">
          {sp.r}
        </p>
      ) : null}
      {error ? (
        <p className="alert alert-error" role="alert">
          Couldn&apos;t load members.
        </p>
      ) : (members ?? []).length === 0 ? (
        <div className="card">
          <Empty title="Nobody matches yet">Loosen the filters, or add contacts that fit.</Empty>
        </div>
      ) : (
        <>
          <ul className="list">
            {(members ?? []).map((c: any) => (
              <li key={c.id}>
                <Link className="list-item" href={`/w/${ws}/contacts/${c.id}`}>
                  <Avatar name={fullName(c)} />
                  <div className="list-main">
                    <div className="list-title">{fullName(c)}</div>
                    <div className="list-sub">{[c.email ?? c.phone].filter(Boolean).join(" · ") || "—"}</div>
                  </div>
                  <div className="list-end">
                    <span className="badge badge-plain">
                      {c.score} · {BAND_LABEL[c.score_band] ?? c.score_band}
                    </span>
                    <Badge value={c.status} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <Pager page={page} total={count ?? 0} size={SIZE} href={href} />
        </>
      )}

      {ctx.canWrite ? (
        <section className="card stack">
          <h2>Edit filters</h2>
          <ActionForm action={updateList.bind(null, ws, id)}>
            <div className="field">
              <label className="label" htmlFor="name">Name</label>
              <input className="input" id="name" name="name" required maxLength={80} defaultValue={list.name} />
            </div>
            <div className="field">
              <span className="label">Status</span>
              <div className="row" style={{ gap: 12 }}>
                {(["lead", "qualified", "customer", "inactive"] as const).map((s) => (
                  <label key={s}>
                    <input type="checkbox" name="status" value={s} defaultChecked={(f.status ?? []).includes(s)} /> {STATUS_LABEL[s]}
                  </label>
                ))}
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="tags">Tags (comma separated)</label>
              <input className="input" id="tags" name="tags" maxLength={300} defaultValue={(f.tags ?? []).join(", ")} />
            </div>
            <div className="field">
              <label className="label" htmlFor="tags_match">Tags must match</label>
              <select className="select" id="tags_match" name="tags_match" defaultValue={f.tags_match ?? "any"} style={{ width: "auto" }}>
                <option value="any">Any of them</option>
                <option value="all">All of them</option>
              </select>
            </div>
            <div className="field">
              <label className="label" htmlFor="source">Source</label>
              <input className="input" id="source" name="source" maxLength={80} defaultValue={f.source ?? ""} />
            </div>
            <div className="field">
              <label className="label" htmlFor="min_score">Minimum score</label>
              <input className="input" id="min_score" name="min_score" type="number" min={0} max={100} defaultValue={f.min_score ?? ""} style={{ width: 120 }} />
            </div>
            <div className="field">
              <label className="label" htmlFor="band">Band</label>
              <select className="select" id="band" name="band" defaultValue={f.band ?? ""} style={{ width: "auto" }}>
                <option value="">Any band</option>
                <option value="hot">Hot (70+)</option>
                <option value="warm">Warm (40–69)</option>
                <option value="cold">Cold (under 40)</option>
              </select>
            </div>
            <div className="field">
              <label>
                <input type="checkbox" name="has_open_deal" defaultChecked={f.has_open_deal === true} /> Has an open deal
              </label>
            </div>
            <div className="field">
              <label>
                <input type="checkbox" name="has_company" defaultChecked={f.has_company === true} /> Linked to a company
              </label>
            </div>
            <SubmitButton pendingText="Saving…">Save list</SubmitButton>
          </ActionForm>
          {ctx.canAdmin ? (
            <form action={deleteList.bind(null, ws)}>
              <input type="hidden" name="id" value={id} />
              <SubmitButton className="btn btn-ghost btn-sm btn-danger" pendingText="…" confirmText={`Delete the list "${list.name}"? The contacts stay.`} confirmLabel="Delete">
                Delete list
              </SubmitButton>
            </form>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
