import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Bot,
  ClipboardCheck,
  FileText,
  Search,
  ShieldCheck,
  Video,
} from "lucide-react";
import { usePageView, type VWView } from "@/lib/vw-view-prefs";
import { PageHeader, Panel, Pill } from "@/components/shell/CommandShell";

export const Route = createFileRoute("/ai-co-pilot")({
  component: AiCoPilot,
});

const AGENTS: { name: string; icon: any; desc: string }[] = [
  {
    name: "Research Agent",
    icon: Search,
    desc: "Gathers sources and background on a topic before creation starts.",
  },
  {
    name: "Content Agent",
    icon: FileText,
    desc: "Drafts scripts, outlines, and written content from a brief.",
  },
  {
    name: "Video Agent",
    icon: Video,
    desc: "Plans shots and sequences for video production.",
  },
  {
    name: "Compliance Agent",
    icon: ShieldCheck,
    desc: "Checks content against policy, rights, and brand rules.",
  },
  {
    name: "CMGIO Agent",
    icon: Bot,
    desc: "Coordinates cross-system operations and handoffs.",
  },
  {
    name: "Quality Control",
    icon: ClipboardCheck,
    desc: "Reviews output against the quality bar before release.",
  },
];

const CHIPS = ["Research", "Create", "Analyze", "Automate", "Optimize"];

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

function AiCoPilot() {
  const [view, setView] = usePageView("ai-co-pilot", "v2");
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState(false);
  const [chip, setChip] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <PageHeader
          title="Agent Workflow Center"
          description="Multi-Agent Orchestration – Automate · Validate · Scale"
        />
        <ViewSwitch view={view} setView={setView} />
      </div>

      <Panel>
          <h2 className="mb-3 text-sm font-semibold">Ask the AI Co-Pilot</h2>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              setAsked(false);
            }}
            placeholder="Ask the AI Co-Pilot anything…"
            className="flex-1 rounded-lg border bg-transparent px-3 py-2 text-sm outline-none"
          />
          <button
            onClick={() => setAsked(true)}
            className="rounded-lg bg-[color:var(--neon-violet)] px-4 py-2 text-sm font-semibold text-white"
          >
            Ask
          </button>
        </div>
        {asked && (
          <p className="mt-3 text-sm text-muted-foreground">
            AI Co-Pilot is not connected in this build.
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          {CHIPS.map((c) => (
            <button
              key={c}
              onClick={() => setChip(chip === c ? null : c)}
              className={
                chip === c
                  ? "rounded-full bg-[color:var(--neon-violet)] px-3 py-1 text-xs font-semibold text-white"
                  : "rounded-full border px-3 py-1 text-xs text-muted-foreground"
              }
            >
              {c}
            </button>
          ))}
        </div>
        {chip && (
          <p className="mt-3 text-xs text-muted-foreground">
            “{chip}” selected — agent actions are not wired in this build.
          </p>
        )}
      </Panel>

      <div
        className={
          view === "v1"
            ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            : "grid gap-4 sm:grid-cols-2"
        }
      >
        {AGENTS.map((a) => (
          <Panel key={a.name}>
            <h2 className="mb-3 text-sm font-semibold">{a.name}</h2>
            <div className="flex items-start gap-3">
              <a.icon className="h-5 w-5 shrink-0 text-[color:var(--neon-violet)]" />
              <div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {a.desc}
                </p>
                <div className="mt-3">
                  <Pill>Not configured</Pill>
                </div>
              </div>
            </div>
          </Panel>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Agent status is honest: no agent table exists in Supabase, so no agent
        is shown as running.
      </p>
    </div>
  );
}
