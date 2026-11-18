import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { VWImage } from "@/components/vw/VWImage";
import { PageHeader, Panel, StatBlock } from "@/components/shell/CommandShell";
import { usePageView, type VWView } from "@/lib/vw-view-prefs";

export const Route = createFileRoute("/finance")({ component: FinancePage });

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

function FinancePage() {
  const [view, setView] = usePageView("finance", "v1");

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <PageHeader title="Finance Command Center" subtitle="Track · Control · Grow · Maximize Value" />
        <ViewSwitch view={view} setView={setView} />
      </div>

      <VWImage src="/vw/feature_finance-accounting.jpg" alt="Finance & Accounting" className="h-44 w-full rounded-lg" />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatBlock label="Total Revenue" value="$—" sub="No finance data in Supabase yet." />
        <StatBlock label="Total Expenses" value="$—" sub="No finance data in Supabase yet." />
        <StatBlock label="Net Profit" value="$—" sub="No finance data in Supabase yet." />
        <StatBlock label="Cash Balance" value="$—" sub="No finance data in Supabase yet." />
      </div>

      <Panel title="Revenue vs Expenses">
        <p className="text-sm text-muted-foreground">No finance data in Supabase yet.</p>
      </Panel>

      <Panel title="Recent Transactions">
        <p className="text-sm text-muted-foreground">No transactions in Supabase yet.</p>
      </Panel>

      <Panel title="Grants">
        <p className="text-sm text-muted-foreground">
          Grant opportunities are tracked in the GrantOS workspace.
        </p>
        <Link to="/grantos" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-white underline">
          Open GrantOS <ArrowRight className="h-4 w-4" />
        </Link>
      </Panel>
    </div>
  );
}
