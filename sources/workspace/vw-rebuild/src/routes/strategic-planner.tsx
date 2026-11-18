import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Compass } from "lucide-react";
import { VWImage } from "@/components/vw/VWImage";
import { usePageView, type VWView } from "@/lib/vw-view-prefs";
import { PageHeader, Panel, Pill, StatBlock } from "@/components/shell/CommandShell";
import { useLiveInitiatives } from "@/lib/supabase-data";

export const Route = createFileRoute("/strategic-planner")({
  component: StrategicPlanner,
});

const PLANS = [
  "Enterprise Growth",
  "Product Launch",
  "Content Series",
  "Marketing Campaign",
  "Platform Expansion",
];

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

function StrategicPlanner() {
  const [view, setView] = usePageView("strategic-planner", "v1");
  const { data: initiatives, loading, error } = useLiveInitiatives();
  const list = initiatives ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <PageHeader
          title="Strategic Command Center"
          description="Plan · Align · Execute · Measure"
        />
        <ViewSwitch view={view} setView={setView} />
      </div>

      <VWImage
        src="/vw/hero_director.jpg"
        alt="Strategic command center"
        className="h-52 w-full rounded-xl"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatBlock label="Active Goals" value={String(list.length)} />
        <StatBlock label="On Track" value="—" />
        <StatBlock label="At Risk" value="—" />
        <StatBlock label="Completed" value="—" />
      </div>
      <p className="text-xs text-muted-foreground">
        Active Goals is the live initiatives count from Supabase. On Track, At
        Risk, and Completed show “—” because no status-breakdown table exists
        in Supabase.
      </p>

      <Panel>
          <h2 className="mb-3 text-sm font-semibold">Plans</h2>
        <ul className="divide-y">
          {PLANS.map((plan) => (
            <li key={plan} className="flex items-center gap-4 py-3">
              <Compass className="h-4 w-4 shrink-0 text-[color:var(--neon-violet)]" />
              <span className="flex-1 text-sm font-medium">{plan}</span>
              <span className="text-xs text-muted-foreground">
                Progress: —
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-muted-foreground">
          Progress is shown as “—”: no plan-progress data exists in Supabase,
          so no percentages are shown.
        </p>
      </Panel>

      <Panel>
          <h2 className="mb-3 text-sm font-semibold">{`Live Initiatives — ${list.length} in Supabase`}</h2>
        {loading && (
          <p className="text-sm text-muted-foreground">Loading initiatives…</p>
        )}
        {error && (
          <p className="text-sm text-red-500">
            Could not load initiatives from Supabase.
          </p>
        )}
        {!loading && !error && list.length === 0 && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <BarChart3 className="h-4 w-4" />
            No initiatives in Supabase yet.
          </p>
        )}
        {!loading && !error && list.length > 0 && (
          <ul className="divide-y">
            {list.map((i) => (
              <li key={i.id} className="flex items-center gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{i.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Stage: {i.stage || "—"}
                  </p>
                </div>
                {i.status ? <Pill>{i.status}</Pill> : null}
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
