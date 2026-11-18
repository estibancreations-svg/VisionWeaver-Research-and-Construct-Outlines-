import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { VWImage } from "@/components/vw/VWImage";
import { PageHeader, Panel, StatBlock } from "@/components/shell/CommandShell";
import { usePageView, type VWView } from "@/lib/vw-view-prefs";
import { useLiveProjects, useLivePageRegistry } from "@/lib/supabase-data";

export const Route = createFileRoute("/reports")({ component: ReportsPage });

function ViewSwitch({ view, setView }: { view: VWView; setView: (v: VWView) => void }) {
  return (
    <div className="flex gap-1">
      {(["v1", "v2", "v3"] as VWView[]).map((v) => (
        <button
          key={v}
          onClick={() => setView(v)}
          className={`rounded px-2 py-1 text-xs font-medium ${view === v ? "bg-white/15 text-white" : "text-muted-foreground hover:text-white"}`}
        >
          {v.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function ReportsPage() {
  const [view, setView] = usePageView("reports", "v1");
  const { data: projects, loading: projLoading, error: projError } = useLiveProjects();
  const { data: registry, loading: regLoading, error: regError } = useLivePageRegistry();

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <PageHeader title="Intelligence & Reporting" subtitle="Track · Performance · Insights · Growth" />
        <ViewSwitch view={view} setView={setView} />
      </div>

      <VWImage src="/vw/feature_distribution-growth.jpg" alt="Reports & Insights" className="h-44 w-full rounded-lg" />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatBlock label="Total Views" value="—" sub="No analytics in Supabase yet." />
        <StatBlock label="Engagement Rate" value="—" sub="No analytics in Supabase yet." />
        <StatBlock label="New Followers" value="—" sub="No analytics in Supabase yet." />
        <StatBlock label="Revenue" value="—" sub="No analytics in Supabase yet." />
      </div>

      <Panel title="Performance Trend">
        <p className="text-sm text-muted-foreground">No analytics in Supabase yet.</p>
      </Panel>

      <Panel title="Content Performance">
        {projLoading && <p className="text-sm text-muted-foreground">Loading projects…</p>}
        {projError && <p className="text-sm text-muted-foreground">Could not load projects.</p>}
        {!projLoading && !projError && (!projects || projects.length === 0) && (
          <p className="text-sm text-muted-foreground">No projects in Supabase yet.</p>
        )}
        {!projLoading && !projError && projects && projects.length > 0 && (
          <ul className="divide-y divide-white/5">
            {projects.map((p) => (
              <li key={p.id} className="flex items-center gap-3 py-2 text-sm">
                <span className="font-medium">{p.name}</span>
                <span className="ml-auto text-xs text-muted-foreground">{p.status}</span>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title="Reports">
        {regLoading && <p className="text-sm text-muted-foreground">Loading report index…</p>}
        {regError && <p className="text-sm text-muted-foreground">Could not load the page registry.</p>}
        {!regLoading && !regError && (!registry || registry.length === 0) && (
          <p className="text-sm text-muted-foreground">No pages in the registry yet.</p>
        )}
        {!regLoading && !regError && registry && registry.length > 0 && (
          <ul className="divide-y divide-white/5">
            {registry.map((r) => (
              <li key={r.route ?? r.label} className="flex items-center gap-2 py-2 text-sm">
                <span className="font-medium">{r.label}</span>
                <Link to={r.route} className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-white">
                  {r.route} <ArrowRight className="h-3 w-3" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
