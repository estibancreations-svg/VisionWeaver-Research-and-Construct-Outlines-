import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Clapperboard, Image, Layers, Sparkles, Video } from "lucide-react";
import { VWImage } from "@/components/vw/VWImage";
import { usePageView, type VWView } from "@/lib/vw-view-prefs";
import { PageHeader, Panel, Pill } from "@/components/shell/CommandShell";
import { useLiveRecords } from "@/lib/supabase-data";

export const Route = createFileRoute("/vision-builder")({
  component: VisionBuilder,
});

type Mode = "text-to-video" | "image" | "scene" | "story";

const MODES: { id: Mode; label: string; icon: any; desc: string }[] = [
  {
    id: "text-to-video",
    label: "Text to Video",
    icon: Video,
    desc: "Describe a scene in words and turn it into a moving clip.",
  },
  {
    id: "image",
    label: "Image Generation",
    icon: Image,
    desc: "Generate stills, posters, and key art from a prompt.",
  },
  {
    id: "scene",
    label: "Scene Composer",
    icon: Layers,
    desc: "Compose shots, blocking, and camera moves into a scene.",
  },
  {
    id: "story",
    label: "Story Builder",
    icon: BookOpen,
    desc: "Outline beats and chapters, then grow them into a full story.",
  },
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

function VisionBuilder() {
  const [view, setView] = usePageView("vision-builder", "v1");
  const [mode, setMode] = useState<Mode>("text-to-video");
  const { data: records, loading, error } = useLiveRecords();
  const activeMode = MODES.find((m) => m.id === mode) ?? MODES[0];
  const recent = (records ?? []).slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <PageHeader
          title="Create Without Limits"
          description="Videos · Images · Books · Movies"
        />
        <ViewSwitch view={view} setView={setView} />
      </div>

      <VWImage
        src="/vw/feature_create-produce.jpg"
        alt="Create and produce"
        className="h-52 w-full rounded-xl"
      />

      <Panel>
          <h2 className="mb-3 text-sm font-semibold">Creation Modes</h2>
        <div className="flex flex-wrap gap-2">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={
                mode === m.id
                  ? "rounded-lg bg-[color:var(--neon-violet)] px-4 py-2 text-sm font-semibold text-white"
                  : "rounded-lg border px-4 py-2 text-sm text-muted-foreground"
              }
            >
              {m.label}
            </button>
          ))}
        </div>
        <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
          <activeMode.icon className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--neon-violet)]" />
          <span>
            <span className="font-semibold text-foreground">
              {activeMode.label} —{" "}
            </span>
            {activeMode.desc}
          </span>
        </p>
      </Panel>

      <div
        className={
          view === "v2"
            ? "grid gap-4 sm:grid-cols-2"
            : "grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        }
      >
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className="panel p-4 text-left transition hover:border-[color:var(--neon-violet)]/50"
          >
            <m.icon className="h-5 w-5 text-[color:var(--neon-violet)]" />
            <h3 className="mt-3 text-sm font-semibold">{m.label}</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {m.desc}
            </p>
          </button>
        ))}
      </div>

      <Panel>
          <h2 className="mb-3 text-sm font-semibold">Recent Creations</h2>
        {loading && (
          <p className="text-sm text-muted-foreground">Loading records…</p>
        )}
        {error && (
          <p className="text-sm text-red-500">
            Could not load records from Supabase.
          </p>
        )}
        {!loading && !error && recent.length === 0 && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clapperboard className="h-4 w-4" />
            No records in Supabase yet.
          </p>
        )}
        {!loading && !error && recent.length > 0 && (
          <ul className="divide-y">
            {recent.map((r) => (
              <li key={r.id} className="flex items-center gap-3 py-3">
                <Sparkles className="h-4 w-4 shrink-0 text-[color:var(--neon-violet)]" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.kind}</p>
                </div>
                {r.status ? <Pill>{r.status}</Pill> : null}
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
