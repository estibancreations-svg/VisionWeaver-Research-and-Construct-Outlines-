import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Plus,
  Search,
  BarChart3,
  TrendingUp,
  Download,
  Upload,
  Calendar,
  Play,
  Grid,
  List,
  Eye,
} from "lucide-react";
import { usePageView, type VWView } from "@/lib/vw-view-prefs";
import { Panel, StatBlock, Pill, PageHeader } from "@/components/shell/CommandShell";

export const Route = createFileRoute("/distribution")({
  component: Distribution,
});

const VIEW_TABS: { id: VWView; label: string }[] = [
  { id: "v1", label: "Option 1 Dashboard Overview" },
  { id: "v2", label: "Option 2 Content Pipeline (Selected)" },
  { id: "v3", label: "Option 3 Analytics & Growth" },
];

const KANBAN = ["Draft", "Scheduled", "Published", "Performing"];

const EMPTY_NOTE = "No analytics in Supabase yet.";

function ViewSwitcher({
  view,
  setView,
}: {
  view: VWView;
  setView: (v: VWView) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {VIEW_TABS.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => setView(t.id)}
          className={`rounded-md border px-3 py-2 text-xs ${
            view === t.id
              ? "border-violet-400/60 bg-violet-400/10 text-violet-200"
              : "border-white/10 bg-white/5 text-white/70 hover:border-white/25"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function EmptyPanel({ title }: { title: string }) {
  return (
    <Panel>
      <h2 className="text-sm font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-white/50">{EMPTY_NOTE}</p>
    </Panel>
  );
}

function Distribution() {
  const [view, setView] = usePageView("distribution", "v2");

  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Distribution & Growth" subtitle="Publish. Promote. Engage. Grow." />
      <ViewSwitcher view={view} setView={setView} />

      {view === "v1" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Distribution &amp; Growth</h1>
            <p className="mt-1 text-sm text-white/60">Publish. Promote. Engage. Grow.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Overview", "Publish", "Campaigns", "Analytics", "Audience", "Monetization"].map((t) => (
              <span key={t} className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
                {t}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatBlock label="Total Reach" value="—" />
            <StatBlock label="Engagement" value="—" />
            <StatBlock label="New Followers" value="—" />
            <StatBlock label="Conversions" value="—" />
          </div>
          <p className="text-[11px] text-white/50">{EMPTY_NOTE}</p>

          <div className="grid gap-4 lg:grid-cols-2">
            <EmptyPanel title="Performance Overview" />
            <EmptyPanel title="Top Performing Content" />
          </div>

          <EmptyPanel title="Platform Distribution" />

          <Panel>
            <h2 className="text-sm font-semibold">Quick Actions</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link to="/distribution" className="flex items-center gap-1.5 rounded-md bg-violet-500 px-3 py-2 text-xs font-semibold text-white">
                <Upload className="h-3.5 w-3.5" /> Publish Content
              </Link>
              <button type="button" className="flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-xs">
                <Calendar className="h-3.5 w-3.5" /> Schedule Posts
              </button>
              <button type="button" onClick={() => setView("v2")} className="flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-xs">
                <Plus className="h-3.5 w-3.5" /> Create Campaign
              </button>
              <button type="button" className="flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-xs">
                <TrendingUp className="h-3.5 w-3.5" /> Boost Content
              </button>
              <button type="button" onClick={() => setView("v3")} className="flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-xs">
                <BarChart3 className="h-3.5 w-3.5" /> View Analytics
              </button>
              <button type="button" className="flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-xs">
                <Download className="h-3.5 w-3.5" /> Export Report
              </button>
            </div>
          </Panel>
        </div>
      )}

      {view === "v2" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Distribution &amp; Growth</h1>
            <p className="mt-1 text-sm text-white/60">Content Pipeline &amp; Campaign Management</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Content Pipeline", "Campaigns", "Calendar", "Analytics", "Audience", "Monetization"].map((t) => (
              <span key={t} className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="search"
                placeholder="Search content…"
                aria-label="Search content"
                className="w-full rounded-md border border-white/15 bg-white/5 py-2 pl-9 pr-3 text-sm"
              />
            </div>
            <button type="button" className="flex items-center gap-1.5 rounded-md bg-violet-500 px-3 py-2 text-xs font-semibold text-white">
              <Plus className="h-3.5 w-3.5" /> New Campaign
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {["All Content", "All Platforms", "All Statuses"].map((c) => (
              <span key={c} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs">
                {c}
              </span>
            ))}
            <span className="ml-auto flex gap-1">
              <span className="flex items-center gap-1 rounded-md border border-white/15 px-2 py-1.5 text-xs"><Grid className="h-3.5 w-3.5" /> Board</span>
              <span className="flex items-center gap-1 rounded-md border border-white/15 px-2 py-1.5 text-xs"><List className="h-3.5 w-3.5" /> List</span>
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {KANBAN.map((col) => (
              <Panel key={col}>
                <h2 className="flex items-center justify-between text-sm font-semibold">
                  {col}
                  <Pill>0</Pill>
                </h2>
                <p className="mt-3 rounded-md border border-dashed border-white/15 bg-white/[0.02] px-3 py-6 text-center text-xs text-white/50">
                  No content items in Supabase yet.
                </p>
              </Panel>
            ))}
          </div>

          <Panel>
            <h2 className="text-sm font-semibold">Campaign Timeline</h2>
            <p className="mt-2 text-sm text-white/50">No campaigns in Supabase yet.</p>
          </Panel>

          <Panel>
            <h2 className="text-sm font-semibold">Quick Actions</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" className="flex items-center gap-1.5 rounded-md bg-violet-500 px-3 py-2 text-xs font-semibold text-white">
                <Plus className="h-3.5 w-3.5" /> Add to Pipeline
              </button>
              <button type="button" className="flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-xs">
                <Calendar className="h-3.5 w-3.5" /> Bulk Schedule
              </button>
              <button type="button" className="flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-xs">
                <Play className="h-3.5 w-3.5" /> Create Campaign
              </button>
              <button type="button" className="flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-xs">
                <Eye className="h-3.5 w-3.5" /> AI Suggestions
              </button>
              <button type="button" className="flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-xs">
                <Download className="h-3.5 w-3.5" /> Export Plan
              </button>
            </div>
          </Panel>
        </div>
      )}

      {view === "v3" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Distribution &amp; Growth</h1>
            <p className="mt-1 text-sm text-white/60">Analytics &amp; Growth Intelligence</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Analytics", "Audience", "Content", "Growth", "Revenue", "Reports"].map((t) => (
              <span key={t} className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
                {t}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatBlock label="Total Views" value="—" />
            <StatBlock label="Engagement Rate" value="—" />
            <StatBlock label="New Followers" value="—" />
            <StatBlock label="Revenue" value="—" />
          </div>
          <p className="text-[11px] text-white/50">{EMPTY_NOTE}</p>

          <div className="grid gap-4 lg:grid-cols-2">
            <EmptyPanel title="Audience Demographics" />
            <EmptyPanel title="Audience Growth" />
            <EmptyPanel title="Platform Performance" />
            <EmptyPanel title="Top Content" />
            <EmptyPanel title="Audience Interests" />
            <EmptyPanel title="Traffic Sources" />
          </div>

          <Panel>
            <h2 className="text-sm font-semibold">Quick Actions</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" className="flex items-center gap-1.5 rounded-md bg-violet-500 px-3 py-2 text-xs font-semibold text-white">
                <BarChart3 className="h-3.5 w-3.5" /> Generate Analytics Report
              </button>
              <button type="button" className="flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-xs">
                <Calendar className="h-3.5 w-3.5" /> Schedule Content
              </button>
              <button type="button" onClick={() => setView("v2")} className="flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-xs">
                <Plus className="h-3.5 w-3.5" /> Create Campaign
              </button>
              <button type="button" className="flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-xs">
                <Eye className="h-3.5 w-3.5" /> AI Thumbnails
              </button>
              <button type="button" className="flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-xs">
                <Download className="h-3.5 w-3.5" /> Export Data
              </button>
            </div>
          </Panel>
        </div>
      )}
    </div>
  );
}
