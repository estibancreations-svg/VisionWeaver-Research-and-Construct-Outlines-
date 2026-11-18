import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Folder, ArrowRight } from "lucide-react";
import { usePageView, type VWView } from "@/lib/vw-view-prefs";
import { PageHeader, Panel, Pill, StatBlock } from "@/components/shell/CommandShell";
import { useLiveProjects } from "@/lib/supabase-data";

export const Route = createFileRoute("/programs")({
  component: Programs,
});

const FILTERS = [
  "All Projects",
  "Active",
  "Planning",
  "Drafting",
  "Submitted",
  "Funded",
  "Archive",
] as const;

type Filter = (typeof FILTERS)[number];

function matchesFilter(
  p: { status?: string | null; stage?: string | null },
  filter: Filter,
): boolean {
  const hay = `${p.status ?? ""} ${p.stage ?? ""}`.toLowerCase();
  switch (filter) {
    case "All Projects":
      return true;
    case "Active":
      return hay.includes("active");
    case "Planning":
      return hay.includes("plan");
    case "Drafting":
      return hay.includes("draft");
    case "Submitted":
      return hay.includes("submit");
    case "Funded":
      return hay.includes("fund");
    case "Archive":
      return hay.includes("archiv");
    default:
      return true;
  }
}

function ViewSwitch({
  view,
  setView,
}: {
  view: VWView;
  setView: (v: VWView) => void;
}) {
  return (
    <div className="flex gap-1">
      {(["v1", "v2", "v3"] as VWView[]).map((v) => (
        <button
          key={v}
          onClick={() => setView(v)}
          className={
            view === v
              ? "rounded-md bg-[color:var(--neon-violet)] px-2 py-1 text-xs font-semibold text-white"
              : "rounded-md border px-2 py-1 text-xs text-muted-foreground"
          }
        >
          {v.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function Programs() {
  const [view, setView] = usePageView("programs", "v2");
  const [filter, setFilter] = useState<Filter>("All Projects");
  const { data: projects, loading, error } = useLiveProjects();
  const list = projects ?? [];
  const filtered = list.filter((p) => matchesFilter(p, filter));
  const activeCount = list.filter((p) =>
    (p.status ?? "").toLowerCase().includes("active"),
  ).length;
  const completedCount = list.filter((p) =>
    (p.status ?? "").toLowerCase().includes("complet"),
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <PageHeader
          title="Program & Project Workspace"
          description="Organize · Track · Collaborate · Deliver"
        />
        <ViewSwitch view={view} setView={setView} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatBlock label="Total Projects" value={String(list.length)} />
        <StatBlock label="Active" value={String(activeCount)} />
        <StatBlock label="Completed" value={String(completedCount)} />
        <StatBlock label="Success Rate" value="—" />
      </div>
      <p className="text-xs text-muted-foreground">
        Success Rate shows “—”: no outcome data exists in Supabase to compute
        it.
      </p>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={
              filter === f
                ? "rounded-lg bg-[color:var(--neon-violet)] px-3 py-1.5 text-xs font-semibold text-white"
                : "rounded-lg border px-3 py-1.5 text-xs text-muted-foreground"
            }
          >
            {f}
          </button>
        ))}
      </div>

      <Panel>
          <h2 className="mb-3 text-sm font-semibold">{`${filter} — ${filtered.length} project(s)`}</h2>
        {loading && (
          <p className="text-sm text-muted-foreground">Loading projects…</p>
        )}
        {error && (
          <p className="text-sm text-red-500">
            Could not load projects from Supabase.
          </p>
        )}
        {!loading && !error && filtered.length === 0 && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Folder className="h-4 w-4" />
            {list.length === 0
              ? "No projects in Supabase yet."
              : "No projects match this filter."}
          </p>
        )}
        {!loading && !error && filtered.length > 0 && view === "v1" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {filtered.map((p) => (
              <div key={p.id} className="rounded-lg border p-4">
                <Link
                  to="/projects"
                  className="flex items-center gap-2 text-sm font-semibold hover:underline"
                >
                  {p.name}
                  <ArrowRight className="h-3 w-3" />
                </Link>
                <p className="mt-1 text-xs text-muted-foreground">
                  {p.kind || "—"} · Stage: {p.stage || "—"}
                </p>
                <div className="mt-2">{p.status ? <Pill>{p.status}</Pill> : null}</div>
              </div>
            ))}
          </div>
        )}
        {!loading && !error && filtered.length > 0 && view !== "v1" && (
          <ul className="divide-y">
            {filtered.map((p) => (
              <li key={p.id} className="flex items-center gap-3 py-3">
                <Folder className="h-4 w-4 shrink-0 text-[color:var(--neon-violet)]" />
                <div className="min-w-0 flex-1">
                  <Link
                    to="/projects"
                    className="truncate text-sm font-medium hover:underline"
                  >
                    {p.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {p.kind || "—"} · Stage: {p.stage || "—"}
                  </p>
                </div>
                {p.status ? <Pill>{p.status}</Pill> : null}
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
