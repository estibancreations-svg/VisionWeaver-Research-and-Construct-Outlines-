import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Server, AlertTriangle } from "lucide-react";
import { VWImage } from "@/components/vw/VWImage";
import { PageHeader, Panel, Pill } from "@/components/shell/CommandShell";
import { usePageView, type VWView } from "@/lib/vw-view-prefs";
import { useLiveIntegrations, useLiveAuditEvents } from "@/lib/supabase-data";

export const Route = createFileRoute("/it-security")({ component: ItSecurityPage });

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

function ItSecurityPage() {
  const [view, setView] = usePageView("it-security", "v2");
  const { data: integrations, loading: intLoading, error: intError } = useLiveIntegrations();
  const { data: auditEvents, loading: auditLoading, error: auditError } = useLiveAuditEvents();

  const total = integrations?.length ?? 0;
  const verified = (integrations ?? []).filter(
    (i) => (i.prime_status ?? "").toLowerCase() === "verified",
  ).length;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <PageHeader title="Security & Infrastructure" subtitle="Monitor · Protect · Control · Compliance" />
        <ViewSwitch view={view} setView={setView} />
      </div>

      <VWImage src="/vw/feature_it-security.jpg" alt="IT & Security" className="h-44 w-full rounded-lg" />

      <div className="grid gap-4 md:grid-cols-2">
        <Panel title="System Health">
          {intLoading && <p className="text-sm text-muted-foreground">Loading integrations…</p>}
          {intError && <p className="text-sm text-muted-foreground">Could not load integrations.</p>}
          {!intLoading && !intError && total === 0 && (
            <p className="text-sm text-muted-foreground">No integrations in Supabase yet.</p>
          )}
          {!intLoading && !intError && total > 0 && (
            <>
              <p className="text-sm">
                <span className="font-semibold">{verified}</span>
                <span className="text-muted-foreground"> of {total} verified</span>
              </p>
              <ul className="mt-3 space-y-2">
                {integrations!.map((i) => (
                  <li key={i.provider} className="flex items-center gap-2 text-sm">
                    <Server className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span>{i.provider}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{i.prime_status}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Panel>

        <Panel title="Security Status">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">No security events table in Supabase.</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Security status cannot be verified until a security events table is connected.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-muted-foreground" />
            <span className="text-2xl font-semibold">—</span>
            <span className="text-sm text-muted-foreground">Active threats — no threat feed connected.</span>
          </div>
        </Panel>
      </div>

      <Panel title="Recent Activity">
        {auditLoading && <p className="text-sm text-muted-foreground">Loading activity…</p>}
        {auditError && <p className="text-sm text-muted-foreground">Could not load activity.</p>}
        {!auditLoading && !auditError && (!auditEvents || auditEvents.length === 0) && (
          <p className="text-sm text-muted-foreground">No audit events in Supabase yet.</p>
        )}
        {!auditLoading && !auditError && auditEvents && auditEvents.length > 0 && (
          <ul className="divide-y divide-white/5">
            {auditEvents.slice(0, 5).map((e) => (
              <li key={e.event_id} className="flex items-center gap-3 py-2 text-sm">
                <span className="font-medium">{e.event_type}</span>
                <span className="ml-auto text-xs text-muted-foreground">{e.occurred_at}</span>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title="Infrastructure">
        {intLoading && <p className="text-sm text-muted-foreground">Loading infrastructure…</p>}
        {intError && <p className="text-sm text-muted-foreground">Could not load infrastructure.</p>}
        {!intLoading && !intError && total === 0 && (
          <p className="text-sm text-muted-foreground">No infrastructure rows in Supabase yet.</p>
        )}
        {!intLoading && !intError && total > 0 && (
          <ul className="space-y-2">
            {integrations!.map((i) => (
              <li key={i.provider} className="flex items-center gap-2 text-sm">
                <Server className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span>{i.provider}</span>
                <Pill>{i.prime_status}</Pill>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
