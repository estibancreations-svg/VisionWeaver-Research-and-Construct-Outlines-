import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Database, Download, ShieldCheck } from "lucide-react";
import { usePlatform, downloadText } from "@/components/platform/PlatformProvider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PageHeader, Panel } from "@/components/shell/CommandShell";
import { usePageView, VW_PAGE_VIEWS, type VWView } from "@/lib/vw-view-prefs";
import { useLiveOrganizations } from "@/lib/supabase-data";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

const TABS = ["Global", "Visual Views", "Integrations", "Security", "Team", "Notifications"] as const;

const COLOR_SCHEMES = [
  { name: "V1 Primary", swatch: "#7c3aed" },
  { name: "V2 Option", swatch: "#2563eb" },
  { name: "Cyan", swatch: "#06b6d4" },
  { name: "Purple", swatch: "#a855f7" },
  { name: "Magenta", swatch: "#d946ef" },
  { name: "Forest", swatch: "#16a34a" },
  { name: "Slate", swatch: "#64748b" },
] as const;

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

function ViewRow({ page, label, defaultView }: { page: string; label: string; defaultView: VWView }) {
  const [view, setView] = usePageView(page, defaultView);
  return (
    <tr className="border-t border-white/5">
      <td className="py-2 pr-2 text-sm font-medium">{label}</td>
      <td className="py-2 pr-2 text-xs text-muted-foreground">{defaultView.toUpperCase()}</td>
      <td className="py-2">
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
      </td>
    </tr>
  );
}

function SettingsPage() {
  const [view, setView] = usePageView("settings", "v2");
  const [tab, setTab] = useState<(typeof TABS)[number]>("Visual Views");
  const [colorNote, setColorNote] = useState(false);
  const { data: orgs, loading: orgLoading } = useLiveOrganizations();

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <PageHeader title="Settings" subtitle="Global · Visual Views · Integrations · Security · Team · Notifications" />
        <ViewSwitch view={view} setView={setView} />
      </div>

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

      {tab === "Visual Views" && (
        <div className="space-y-4">
          <Panel title="Visual Views">
            <p className="mb-3 text-sm text-muted-foreground">
              Pick the V1, V2, or V3 layout for each page. Your choice is saved in this browser.
            </p>
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="pb-2 pr-2 font-medium">Page</th>
                  <th className="pb-2 pr-2 font-medium">Default</th>
                  <th className="pb-2 font-medium">View</th>
                </tr>
              </thead>
              <tbody>
                {VW_PAGE_VIEWS.map((p) => (
                  <ViewRow key={p.page} page={p.page} label={p.label} defaultView={p.defaultView} />
                ))}
              </tbody>
            </table>
          </Panel>

          <Panel title="Color Schemes">
            <div className="flex flex-wrap gap-3">
              {COLOR_SCHEMES.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColorNote(true)}
                  className="flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-xs"
                  title={c.name}
                >
                  <span className="h-4 w-4 rounded-full" style={{ backgroundColor: c.swatch }} />
                  {c.name}
                </button>
              ))}
            </div>
            {colorNote && (
              <p className="mt-3 text-sm text-muted-foreground">
                Color schemes are display-only in this build.
              </p>
            )}
          </Panel>

          <Panel title="Live Data">
            <div className="flex items-center gap-2 text-sm">
              <Database className="h-4 w-4 text-muted-foreground" />
              <span>
                Supabase project ref: <span className="font-mono text-xs">azoqszhhmmkyqztubgem</span>
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {orgLoading
                ? "Loading organizations…"
                : `${orgs?.length ?? 0} organization${(orgs?.length ?? 0) === 1 ? "" : "s"} in Supabase.`}
            </p>
          </Panel>
        </div>
      )}

      {tab === "Global" && <GlobalTab />}

      {tab !== "Visual Views" && tab !== "Global" && (
        <Panel title={tab}>
          <p className="text-sm text-muted-foreground">Not configured in this build.</p>
        </Panel>
      )}
    </div>
  );
}

function GlobalTab() {
  const { state, dispatch, storageError } = usePlatform();
  return (
    <div className="space-y-4">
      <Panel title="Architect authority">
        <div className="flex items-center gap-2 font-semibold">
          <ShieldCheck className="h-4 w-4 text-[color:var(--neon-violet)]" /> Estibancreations
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Live data · Supabase connected. Deployment, provider changes, data migrations and destructive operations require explicit Architect approval.
        </p>
      </Panel>
      <Panel>
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="compact" className="text-sm font-medium">Compact work area</label>
          <Switch
            id="compact"
            checked={state.settings.compact}
            onCheckedChange={(compact) => dispatch({ type: "settings", compact })}
          />
        </div>
      </Panel>
      <Panel title="Workspace data">
        <p className="text-sm text-muted-foreground">
          {storageError
            ? "Storage unavailable: changes may not survive reload."
            : "Changes are saved on this browser only. No shared production records are modified."}
        </p>
        <Button
          variant="outline"
          className="mt-3"
          onClick={() => downloadText("estibancreations-workspace.json", JSON.stringify(state, null, 2), "application/json")}
        >
          <Download className="h-4 w-4" /> Export workspace
        </Button>
      </Panel>
    </div>
  );
}
