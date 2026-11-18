import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck, FileText } from "lucide-react";
import { usePageView, type VWView } from "@/lib/vw-view-prefs";
import { PageHeader, Panel, Pill } from "@/components/shell/CommandShell";
import { useLiveRecords, useLiveReleaseGates } from "@/lib/supabase-data";

export const Route = createFileRoute("/directors-guild")({
  component: DirectorsGuild,
});

const FILTERS = [
  "All Submissions",
  "Scripts",
  "Storyboards",
  "Images",
  "Final Cut",
] as const;

type Filter = (typeof FILTERS)[number];

function matchesFilter(
  r: { kind?: string | null; name?: string | null },
  filter: Filter,
): boolean {
  const hay = `${r.kind ?? ""} ${r.name ?? ""}`.toLowerCase();
  switch (filter) {
    case "All Submissions":
      return true;
    case "Scripts":
      return hay.includes("script");
    case "Storyboards":
      return hay.includes("storyboard");
    case "Images":
      return hay.includes("image");
    case "Final Cut":
      return hay.includes("final") || hay.includes("cut");
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

function DirectorsGuild() {
  const [view, setView] = usePageView("directors-guild", "v2");
  const [filter, setFilter] = useState<Filter>("All Submissions");
  const [notice, setNotice] = useState<string | null>(null);
  const {
    data: records,
    loading: recordsLoading,
    error: recordsError,
  } = useLiveRecords();
  const {
    data: gates,
    loading: gatesLoading,
    error: gatesError,
  } = useLiveReleaseGates();
  const list = records ?? [];
  const filtered = list.filter((r) => matchesFilter(r, filter));
  const gateList = gates ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <PageHeader
          title="Review & Decision Queue"
          description="Submit · Review · Approve · Track"
        />
        <ViewSwitch view={view} setView={setView} />
      </div>

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
          <h2 className="mb-3 text-sm font-semibold">{`${filter} — ${filtered.length} item(s)`}</h2>
        {recordsLoading && (
          <p className="text-sm text-muted-foreground">Loading records…</p>
        )}
        {recordsError && (
          <p className="text-sm text-red-500">
            Could not load records from Supabase.
          </p>
        )}
        {!recordsLoading && !recordsError && filtered.length === 0 && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" />
            {list.length === 0
              ? "No records in Supabase yet."
              : "No records match this filter."}
          </p>
        )}
        {!recordsLoading && !recordsError && filtered.length > 0 && (
          <ul className="divide-y">
            {filtered.map((r) => (
              <li
                key={r.id}
                className="flex flex-wrap items-center gap-3 py-3"
              >
                <ClipboardCheck className="h-4 w-4 shrink-0 text-[color:var(--neon-violet)]" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.kind}</p>
                </div>
                {r.status ? <Pill>{r.status}</Pill> : null}
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setNotice(
                        "Review actions are not wired to Supabase yet.",
                      )
                    }
                    className="rounded-lg bg-[color:var(--neon-violet)] px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      setNotice(
                        "Review actions are not wired to Supabase yet.",
                      )
                    }
                    className="rounded-lg border px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    Request changes
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {notice && (
          <p className="mt-3 rounded-lg border px-3 py-2 text-sm text-muted-foreground">
            {notice}
          </p>
        )}
      </Panel>

      <Panel>
          <h2 className="mb-3 text-sm font-semibold">Release Gates</h2>
        {gatesLoading && (
          <p className="text-sm text-muted-foreground">Loading gates…</p>
        )}
        {gatesError && (
          <p className="text-sm text-red-500">
            Could not load release gates from Supabase.
          </p>
        )}
        {!gatesLoading && !gatesError && gateList.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No release gates in Supabase yet.
          </p>
        )}
        {!gatesLoading && !gatesError && gateList.length > 0 && (
          <ul className="divide-y">
            {gateList.map((g) => (
              <li key={g.id} className="flex items-center gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{g.gate}</p>
                </div>
                {g.status ? <Pill>{g.status}</Pill> : null}
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
