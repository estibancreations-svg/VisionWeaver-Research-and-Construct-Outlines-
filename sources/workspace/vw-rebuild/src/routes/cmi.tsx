import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, FileText, TrendingUp, Users } from "lucide-react";
import { VWImage } from "@/components/vw/VWImage";
import { usePageView, type VWView } from "@/lib/vw-view-prefs";
import { PageHeader, Panel, Pill } from "@/components/shell/CommandShell";
import { useLiveProjects, useLiveRecords } from "@/lib/supabase-data";

export const Route = createFileRoute("/cmi")({
  component: Cmi,
});

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

function Cmi() {
  const [view, setView] = usePageView("cmi", "v1");
  const {
    data: projects,
    loading: projectsLoading,
    error: projectsError,
  } = useLiveProjects();
  const {
    data: records,
    loading: recordsLoading,
    error: recordsError,
  } = useLiveRecords();
  const topContent = (projects ?? []).slice(0, 5);
  const recent = (records ?? []).slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <PageHeader
          title="Creative & Market Intelligence"
          description="Trends · Audience Insights · Opportunities"
        />
        <ViewSwitch view={view} setView={setView} />
      </div>

      <VWImage
        src="/vw/feature_distribution-growth.jpg"
        alt="Distribution and growth"
        className="h-52 w-full rounded-xl"
      />

      <div
        className={
          view === "v2"
            ? "grid gap-4 lg:grid-cols-1"
            : "grid gap-4 lg:grid-cols-2"
        }
      >
        <Panel>
          <h2 className="mb-3 text-sm font-semibold">Engagement Trends</h2>
          <p className="flex items-start gap-2 text-sm text-muted-foreground">
            <TrendingUp className="mt-0.5 h-4 w-4 shrink-0" />
            No engagement data in Supabase yet — no analytics table is
            connected, so no trend chart is shown.
          </p>
        </Panel>

        <Panel>
          <h2 className="mb-3 text-sm font-semibold">Audience Demographics</h2>
          <p className="flex items-start gap-2 text-sm text-muted-foreground">
            <Users className="mt-0.5 h-4 w-4 shrink-0" />
            No audience data in Supabase yet — no demographics table is
            connected, so no breakdown is shown.
          </p>
        </Panel>
      </div>

      <Panel>
          <h2 className="mb-3 text-sm font-semibold">Top Content</h2>
        {projectsLoading && (
          <p className="text-sm text-muted-foreground">Loading projects…</p>
        )}
        {projectsError && (
          <p className="text-sm text-red-500">
            Could not load projects from Supabase.
          </p>
        )}
        {!projectsLoading && !projectsError && topContent.length === 0 && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <BarChart3 className="h-4 w-4" />
            No projects in Supabase yet.
          </p>
        )}
        {!projectsLoading && !projectsError && topContent.length > 0 && (
          <ol className="divide-y">
            {topContent.map((p, idx) => (
              <li key={p.id} className="flex items-center gap-3 py-3">
                <span className="w-6 shrink-0 text-sm font-bold text-[color:var(--neon-violet)]">
                  {idx + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.kind || "—"} · Stage: {p.stage || "—"}
                  </p>
                </div>
                {p.status ? <Pill>{p.status}</Pill> : null}
              </li>
            ))}
          </ol>
        )}
        <p className="mt-2 text-xs text-muted-foreground">
          Ranked by recency from live Supabase projects — no engagement
          metrics exist to rank by performance.
        </p>
      </Panel>

      <Panel>
          <h2 className="mb-3 text-sm font-semibold">Recent Intelligence</h2>
        {recordsLoading && (
          <p className="text-sm text-muted-foreground">Loading records…</p>
        )}
        {recordsError && (
          <p className="text-sm text-red-500">
            Could not load records from Supabase.
          </p>
        )}
        {!recordsLoading && !recordsError && recent.length === 0 && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" />
            No records in Supabase yet.
          </p>
        )}
        {!recordsLoading && !recordsError && recent.length > 0 && (
          <ul className="divide-y">
            {recent.map((r) => (
              <li key={r.id} className="flex items-center gap-3 py-3">
                <FileText className="h-4 w-4 shrink-0 text-[color:var(--neon-violet)]" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.kind}</p>
                </div>
                {r.status ? <Pill>{r.status}</Pill> : null}
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
