import { createFileRoute } from "@tanstack/react-router";
import { GitBranch } from "lucide-react";
import { VWImage } from "@/components/vw/VWImage";
import { usePageView, type VWView } from "@/lib/vw-view-prefs";
import { PageHeader, Panel, Pill, StatBlock } from "@/components/shell/CommandShell";
import { useLiveInitiatives } from "@/lib/supabase-data";

export const Route = createFileRoute("/initiatives")({
  component: Initiatives,
});

const COLUMNS = [
  "Ideation",
  "In Planning",
  "In Progress",
  "Review",
  "Completed",
] as const;

type Column = (typeof COLUMNS)[number];

function stageOf(item: {
  stage?: string | null;
  status?: string | null;
}): Column {
  const s = `${item.stage ?? ""} ${item.status ?? ""}`.toLowerCase();
  if (s.includes("complet") || s.includes("done")) return "Completed";
  if (s.includes("review")) return "Review";
  if (
    s.includes("progress") ||
    s.includes("doing") ||
    s.includes("active") ||
    s.includes("development")
  )
    return "In Progress";
  if (s.includes("plan")) return "In Planning";
  return "Ideation";
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

function Initiatives() {
  const [view, setView] = usePageView("initiatives", "v2");
  const { data: initiatives, loading, error } = useLiveInitiatives();
  const list = initiatives ?? [];
  const grouped: Record<Column, typeof list> = {
    Ideation: [],
    "In Planning": [],
    "In Progress": [],
    Review: [],
    Completed: [],
  };
  list.forEach((i) => {
    grouped[stageOf(i)].push(i);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <PageHeader title="Initiative Pipeline" description="Ideate · Plan · Ship" />
        <ViewSwitch view={view} setView={setView} />
      </div>

      <VWImage
        src="/vw/feature_worlds-locations.jpg"
        alt="Initiative pipeline"
        className="h-32 w-full rounded-xl"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatBlock label="Total Initiatives" value={String(list.length)} />
        <StatBlock label="In Progress" value={String(grouped["In Progress"].length)} />
        <StatBlock label="Completed" value={String(grouped["Completed"].length)} />
      </div>

      {loading && (
        <p className="text-sm text-muted-foreground">Loading initiatives…</p>
      )}
      {error && (
        <p className="text-sm text-red-500">
          Could not load initiatives from Supabase.
        </p>
      )}
      {!loading && !error && list.length === 0 && (
        <Panel>
          <h2 className="mb-3 text-sm font-semibold">Initiative Pipeline</h2>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <GitBranch className="h-4 w-4" />
            No initiatives in Supabase yet.
          </p>
        </Panel>
      )}

      {!loading && !error && list.length > 0 && view === "v1" && (
        <Panel>
          <h2 className="mb-3 text-sm font-semibold">All Initiatives</h2>
          <ul className="divide-y">
            {list.map((i) => (
              <li key={i.id} className="flex items-center gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{i.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Stage: {stageOf(i)}
                  </p>
                </div>
                {i.status ? <Pill>{i.status}</Pill> : null}
              </li>
            ))}
          </ul>
        </Panel>
      )}

      {!loading && !error && list.length > 0 && view !== "v1" && (
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
          {COLUMNS.map((col) => (
            <Panel key={col}>
              <h2 className="mb-3 text-sm font-semibold">{`${col} (${grouped[col].length})`}</h2>
              {grouped[col].length === 0 ? (
                <p className="text-xs text-muted-foreground">Empty.</p>
              ) : (
                <ul className="space-y-2">
                  {grouped[col].map((i) => (
                    <li
                      key={i.id}
                      className="rounded-lg border p-3"
                    >
                      <p className="text-sm font-medium leading-snug">
                        {i.title}
                      </p>
                      {i.status ? (
                        <div className="mt-2">
                          <Pill>{i.status}</Pill>
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              )}
            </Panel>
          ))}
        </div>
      )}
    </div>
  );
}
