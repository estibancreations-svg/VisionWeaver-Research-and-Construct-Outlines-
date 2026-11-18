import Link from "next/link";
import type { Metadata } from "next";
import { getWorkspace } from "@/lib/session";
import { cleanSearch } from "@/lib/validation";
import { fullName, pageRange } from "@/lib/format";
import { Avatar, Badge, Empty, PageHead, Pager } from "@/components/ui";
import { IconPlus, IconSearch } from "@/components/icons";

export const metadata: Metadata = { title: "Contacts" };
const SIZE = 25;
const BAND_LABEL: Record<string, string> = { hot: "Hot", warm: "Warm", cold: "Cold" };

export default async function Contacts({
  params,
  searchParams,
}: {
  params: Promise<{ ws: string }>;
  searchParams: Promise<{ q?: string; page?: string; status?: string; archived?: string; sort?: string }>
}) {
  const { ws } = await params;
  const sp = await searchParams;
  const ctx = await getWorkspace(ws);
  const q = cleanSearch(sp.q);
  const page = Math.max(1, Number(sp.page) || 1);
  const archived = sp.archived === "1";
  const [from, to] = pageRange(page, SIZE);

  let query = ctx.supabase
    .from("contacts")
    .select("id, first_name, last_name, email, phone, status, score, score_band, companies(name)", { count: "exact" })
    .eq("workspace_id", ws)
    .range(from, to);
  query = sp.sort === "score" ? query.order("score", { ascending: false }) : query.order("created_at", { ascending: false });
  query = archived ? query.not("archived_at", "is", null) : query.is("archived_at", null);
  if (q) query = query.or(`first_name.ilike.%${q}%,last_name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%`);
  if (sp.status && ["lead", "qualified", "customer", "inactive"].includes(sp.status)) query = query.eq("status", sp.status);
  const { data, count, error } = await query;

  const href = (p: number) => {
    const u = new URLSearchParams();
    if (q) u.set("q", q);
    if (sp.status) u.set("status", sp.status);
    if (sp.sort) u.set("sort", sp.sort);
    if (archived) u.set("archived", "1");
    u.set("page", String(p));
    return `/w/${ws}/contacts?${u}`;
  };

  return (
    <div className="stack-lg">
      <PageHead
        eyebrow={ctx.ws.name}
        title="Contacts"
        actions={
          ctx.canWrite ? (
            <>
              <Link className="btn" href={`/w/${ws}/contacts/import`}>
                Import CSV
              </Link>
              <Link className="btn btn-primary" href={`/w/${ws}/contacts/new`}>
                <IconPlus /> Add contact
              </Link>
            </>
          ) : null
        }
      />
      <form className="row" role="search">
        <label className="search">
          <span className="sr-only">Search contacts</span>
          <IconSearch />
          <input className="input" name="q" defaultValue={q} placeholder="Name, email or phone" />
        </label>
        <label className="sr-only" htmlFor="status">
          Status
        </label>
        <select className="select" id="status" name="status" defaultValue={sp.status ?? ""} style={{ width: "auto" }}>
          <option value="">All statuses</option>
          <option value="lead">Lead</option>
          <option value="qualified">Qualified</option>
          <option value="customer">Customer</option>
          <option value="inactive">Inactive</option>
        </select>
        <label className="sr-only" htmlFor="sort">
          Sort
        </label>
        <select className="select" id="sort" name="sort" defaultValue={sp.sort ?? ""} style={{ width: "auto" }}>
          <option value="">Newest first</option>
          <option value="score">Highest score</option>
        </select>
        {archived ? <input type="hidden" name="archived" value="1" /> : null}
        <button className="btn" type="submit">
          Filter
        </button>
        <Link className="btn btn-ghost btn-sm" href={archived ? `/w/${ws}/contacts` : `/w/${ws}/contacts?archived=1`}>
          {archived ? "Show active" : "Show archived"}
        </Link>
      </form>

      {error ? (
        <p className="alert alert-error" role="alert">
          Couldn&apos;t load contacts.
        </p>
      ) : (data ?? []).length === 0 ? (
        <div className="card">
          <Empty title={q ? "No matches" : "No contacts yet"}>{q ? "Try another search." : "Add your first contact."}</Empty>
        </div>
      ) : (
        <>
          <ul className="list">
            {(data ?? []).map((c) => {
              const co = c.companies as unknown as { name: string } | null;
              return (
                <li key={c.id}>
                  <Link className="list-item" href={`/w/${ws}/contacts/${c.id}`}>
                    <Avatar name={fullName(c)} />
                    <div className="list-main">
                      <div className="list-title">{fullName(c)}</div>
                      <div className="list-sub">{[co?.name, c.email ?? c.phone].filter(Boolean).join(" · ") || "—"}</div>
                    </div>
                    <div className="list-end">
                      <span className="badge badge-plain">
                        {c.score} · {BAND_LABEL[c.score_band] ?? c.score_band}
                      </span>
                      <Badge value={c.status} />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Pager page={page} total={count ?? 0} size={SIZE} href={href} />
        </>
      )}
    </div>
  );
}
