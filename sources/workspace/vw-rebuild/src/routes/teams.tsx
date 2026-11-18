import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Users, ShieldCheck, Building2, Activity, DollarSign } from "lucide-react";
import { VWImage } from "@/components/vw/VWImage";
import { PageHeader, Panel, Pill } from "@/components/shell/CommandShell";
import { usePageView, type VWView } from "@/lib/vw-view-prefs";
import { useLiveOrganizations } from "@/lib/supabase-data";

export const Route = createFileRoute("/teams")({ component: TeamsPage });

const TABS = ["Team Members", "Roles & Access", "Departments", "Activity", "Compensation"] as const;

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

function TeamsPage() {
  const [view, setView] = usePageView("teams", "v1");
  const [tab, setTab] = useState<(typeof TABS)[number]>("Team Members");
  const { data: orgs, loading, error } = useLiveOrganizations();

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <PageHeader title="Organization Command" subtitle="People · Roles · Permissions · Collaboration" />
        <ViewSwitch view={view} setView={setView} />
      </div>

      <VWImage src="/vw/feature_teams.jpg" alt="Teams" className="h-44 w-full rounded-lg" />

      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-3 py-1 text-xs font-medium ${tab === t ? "bg-white/15 text-white" : "text-muted-foreground hover:text-white"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Team Members" && (
        <div className="space-y-4">
          <Panel title="Team Directory">
            <p className="text-sm text-muted-foreground">No team roster in Supabase yet.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Team members are managed in the C-Suite page.{" "}
              <Link to="/c-suite" className="text-white underline">
                Go to C-Suite
              </Link>
            </p>
          </Panel>

          <Panel title="Organizations">
            {loading && <p className="text-sm text-muted-foreground">Loading organizations…</p>}
            {error && <p className="text-sm text-muted-foreground">Could not load organizations.</p>}
            {!loading && !error && (!orgs || orgs.length === 0) && (
              <p className="text-sm text-muted-foreground">No organizations in Supabase yet.</p>
            )}
            {!loading && !error && orgs && orgs.length > 0 && (
              <ul className="space-y-2">
                {orgs.map((org) => (
                  <li key={org.id} className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span>{org.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      )}

      {tab === "Roles & Access" && (
        <Panel title="Roles & Access">
          <p className="text-sm text-muted-foreground">No roles table in Supabase yet.</p>
        </Panel>
      )}

      {tab === "Departments" && (
        <Panel title="Departments">
          <p className="text-sm text-muted-foreground">No departments in Supabase yet.</p>
        </Panel>
      )}

      {tab === "Activity" && (
        <Panel title="Activity">
          <p className="text-sm text-muted-foreground">No team activity in Supabase yet.</p>
        </Panel>
      )}

      {tab === "Compensation" && (
        <Panel title="Compensation">
          <p className="text-sm text-muted-foreground">No compensation data in Supabase yet.</p>
        </Panel>
      )}

      <div className="flex gap-2">
        <Pill>
          <Users className="h-3 w-3" /> Teams
        </Pill>
        <Pill>
          <ShieldCheck className="h-3 w-3" /> Roles &amp; Access
        </Pill>
        <Pill>
          <Activity className="h-3 w-3" /> Activity
        </Pill>
        <Pill>
          <DollarSign className="h-3 w-3" /> Compensation
        </Pill>
      </div>
    </div>
  );
}
