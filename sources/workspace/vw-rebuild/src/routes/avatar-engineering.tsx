import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Save, Clapperboard } from "lucide-react";
import { VWImage } from "@/components/vw/VWImage";
import { PageHeader, Panel, Pill } from "@/components/shell/CommandShell";
import { usePageView, type VWView } from "@/lib/vw-view-prefs";
import { useLiveRecords } from "@/lib/supabase-data";

export const Route = createFileRoute("/avatar-engineering")({ component: AvatarEngineeringPage });

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

const PROFILE: { label: string; value: string }[] = [
  { label: "Name", value: "Marcus Reynolds" },
  { label: "Age", value: "47" },
  { label: "Heritage", value: "African-American" },
  { label: "Height", value: "6'2\"" },
  { label: "Weight", value: "215 lbs" },
  { label: "Build", value: "Athletic" },
  { label: "Voice", value: "Deep / Baritone" },
];

function AvatarEngineeringPage() {
  const [view, setView] = usePageView("avatar-engineering", "v2");
  const [actionNote, setActionNote] = useState(false);
  const { data: records, loading, error } = useLiveRecords();

  const avatars = (records ?? []).filter((r) => (r.kind ?? "").toLowerCase() === "avatar");

  const notConnected = () => setActionNote(true);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <PageHeader title="Avatar State Studio" subtitle="Design · Animate · Deploy" />
        <ViewSwitch view={view} setView={setView} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Panel title="Avatar Profile">
          <VWImage src="/vw/feature_avatar-engineering.jpg" alt="Marcus Reynolds — avatar" className="aspect-[16/9] w-full rounded-md" />
          <dl className="mt-4 space-y-2">
            {PROFILE.map((row) => (
              <div key={row.label} className="flex items-center gap-3 text-sm">
                <dt className="w-20 shrink-0 text-muted-foreground">{row.label}</dt>
                <dd className="font-medium">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Panel>

        <Panel title="32-Angle Views">
          <p className="text-sm text-muted-foreground">32-angle views — capture to fill.</p>
          <div className="mt-3 grid grid-cols-8 gap-2">
            {Array.from({ length: 32 }, (_, i) => (
              <div
                key={i + 1}
                className="flex aspect-square items-center justify-center rounded-md border border-white/10 bg-white/5 text-xs text-muted-foreground"
              >
                {i + 1}
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">No angle captures in Supabase yet.</p>
        </Panel>
      </div>

      <Panel title="Actions">
        <div className="flex flex-wrap gap-2">
          <button onClick={notConnected} className="inline-flex items-center gap-2 rounded-md bg-white/15 px-3 py-2 text-sm font-medium">
            <Sparkles className="h-4 w-4" /> Generate Variations
          </button>
          <button onClick={notConnected} className="inline-flex items-center gap-2 rounded-md bg-white/15 px-3 py-2 text-sm font-medium">
            <Save className="h-4 w-4" /> Save to Library
          </button>
          <button onClick={notConnected} className="inline-flex items-center gap-2 rounded-md bg-white/15 px-3 py-2 text-sm font-medium">
            <Clapperboard className="h-4 w-4" /> Use in Scene
          </button>
        </div>
        {actionNote && (
          <p className="mt-3 text-sm text-muted-foreground">Avatar capture is not connected in this build.</p>
        )}
      </Panel>

      <Panel title="Recent Avatars">
        {loading && <p className="text-sm text-muted-foreground">Loading avatars…</p>}
        {error && <p className="text-sm text-muted-foreground">Could not load avatars.</p>}
        {!loading && !error && avatars.length === 0 && (
          <p className="text-sm text-muted-foreground">No avatars in Supabase yet.</p>
        )}
        {!loading && !error && avatars.length > 0 && (
          <ul className="divide-y divide-white/5">
            {avatars.map((a) => (
              <li key={a.id} className="flex items-center gap-3 py-2 text-sm">
                <span className="font-medium">{a.name}</span>
                <span className="text-muted-foreground">{a.kind}</span>
                <span className="ml-auto text-xs text-muted-foreground">{a.status}</span>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <div className="flex gap-2">
        <Pill>Design</Pill>
        <Pill>Animate</Pill>
        <Pill>Deploy</Pill>
      </div>
    </div>
  );
}
