import { usePlatform } from "@/components/platform/PlatformProvider";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Panel, Pill } from "@/components/shell/CommandShell";
import { VWImage } from "@/components/vw/VWImage";
import { VWCard } from "@/components/vw/VWCard";
import {
  useLiveProjects,
  useLiveInitiatives,
  useLiveRecords,
  useLiveReleaseGates,
  useLiveIntegrations,
  useLiveAuditEvents,
  useLiveOrganizations,
} from "@/lib/supabase-data";
import {
  ShieldCheck, ClipboardCheck, Activity, ArrowRight,
  Film, Building2, Palette, Rocket, Folder, GitBranch,
  TrendingUp, Users, Lock, Library, Clock, Play, Sparkles,
  CheckCircle2, MapPin, Eye,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "VisionWeaver · EstibanCreations" },
      { name: "description", content: "Story. People. Places. Possibilities. Create videos, images, books, and immersive worlds with consistent avatars, real locations, and production-ready tools." },
      { property: "og:title", content: "VisionWeaver · EstibanCreations" },
      { property: "og:description", content: "Story. People. Places. Possibilities. Create videos, images, books, and immersive worlds with consistent avatars, real locations, and production-ready tools." },
    ],
  }),
  component: VisionWeaverHome,
});

// The 12 VisionWeaver feature cards, in the order from the owner's
// VisionWeaver Prime home screenshot. Each card's photo is the real
// VisionWeaver Prime asset (public/vw/feature_*.jpg).
const featureCards = [
  { label: "Avatar Engineering", desc: "Create, manage, and maintain consistent characters with 32-angle views, voice, wardrobe, aging, injuries, and scene-specific states.", to: "/avatar-engineering", icon: Film, image: "/vw/feature_avatar-engineering.jpg" },
  { label: "Worlds & Locations", desc: "Global place library, real-world locations, historical settings, environment building, and scene continuity.", to: "/worlds", icon: Building2, image: "/vw/feature_worlds-locations.jpg" },
  { label: "Create & Produce", desc: "Script, storyboard, animate, edit, sound, and deliver. Turn ideas into finished videos, images, and books.", to: "/creative-studio", icon: Palette, image: "/vw/feature_create-produce.jpg" },
  { label: "Design & Commercial", desc: "Commercial Creativity Station, 2,000+ templates, product locking, brand ads, storyboards, and multi-platform output.", to: "/marketing", icon: Rocket, image: "/vw/feature_design-commercial.jpg" },
  { label: "Media Library", desc: "Your assets, templates, stock, audio, and references in one place. Search, filter, and reuse across projects.", to: "/files", icon: Folder, image: "/vw/feature_media-library.jpg" },
  { label: "Post Production", desc: "Advanced editing, effects, color, audio, AI tools, and final render management.", to: "/workflows", icon: GitBranch, image: "/vw/feature_post-production.jpg" },
  { label: "Distribution & Growth", desc: "Publish, schedule, track performance, engage audiences, and optimize across platforms.", to: "/distribution", icon: TrendingUp, image: "/vw/feature_distribution-growth.jpg" },
  { label: "Quality & Audit Center", desc: "The Auditor, V.E.R.I.T.A.S., QA checks, rights verification, evidence logs, and release certification.", to: "/health", icon: ShieldCheck, image: "/vw/feature_quality-audit.jpg" },
  { label: "Teams & C-Suite", desc: "People, roles, Directors Guild, departments, permissions, and organizational structure.", to: "/teams", icon: Users, image: "/vw/feature_teams.jpg" },
  { label: "Finance & Accounting", desc: "Budgets, costs, revenue, subscriptions, provider usage, invoices, and financial reports.", to: "/finance", icon: ClipboardCheck, image: "/vw/feature_finance-accounting.jpg" },
  { label: "IT & Security Operations", desc: "Infrastructure, integrations, databases, deployments, backups, access control, and system health.", to: "/it-security", icon: Lock, image: "/vw/feature_it-security.jpg" },
  { label: "Resources & Knowledge", desc: "Canon, scripts, books, research, source references, templates, and documentation.", to: "/resources", icon: Library, image: "/vw/feature_resources.jpg" },
];

// Decorative photos for the Featured Projects row. Projects in Supabase
// have no photo field, so these are backdrops, not project artwork.
const featuredPhotos = [
  "/vw/feature_worlds-locations.jpg",
  "/vw/feature_design-commercial.jpg",
  "/vw/feature_create-produce.jpg",
  "/vw/feature_avatar-engineering.jpg",
  "/vw/feature_media-library.jpg",
  "/vw/feature_resources.jpg",
];

const heroChecklist = ["Avatars", "Locations", "Scenes", "Storytelling", "Commercials", "Publishing", "Monetization"];

function VisionWeaverHome() {
  const projects = useLiveProjects();
  const initiatives = useLiveInitiatives();
  const records = useLiveRecords();
  const gates = useLiveReleaseGates();
  const integrations = useLiveIntegrations();
  const audit = useLiveAuditEvents();
  const orgs = useLiveOrganizations();
  const { state } = usePlatform();
  const decisions = state.workspace.decisions ?? [];

  const activeProject =
    projects.data.find((p) => (p.status ?? "").toLowerCase() === "active") ?? projects.data[0] ?? null;

  // Production pipeline: live initiatives grouped by their real stage.
  const stageCounts = new Map<string, number>();
  for (const it of initiatives.data) {
    const stage = (it.stage ?? "Unspecified").trim() || "Unspecified";
    stageCounts.set(stage, (stageCounts.get(stage) ?? 0) + 1);
  }
  const pipelineStages = [...stageCounts.entries()].sort((a, b) => b[1] - a[1]);

  const gatesImplemented = gates.data.filter((g) => (g.status ?? "").toLowerCase() === "implemented" || (g.status ?? "").toLowerCase() === "passed").length;
  const integrationsVerified = integrations.data.filter((i) => (i.prime_status ?? "").toLowerCase().includes("verif")).length;
  const recentEvents = audit.data.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* --- Hero banner (VisionWeaver Prime) --- */}
      <section className="relative overflow-hidden rounded-xl border border-border">
        <VWImage src="/vw/hero_director.jpg" alt="VisionWeaver — a director at work" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e1a]/95 via-[#0a0e1a]/70 to-[#0a0e1a]/20" />
        <div className="relative flex flex-wrap items-center justify-between gap-6 px-6 py-10 md:px-10 md:py-14">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-gradient-to-br from-[color:var(--neon-violet)] to-[#5b21b6] text-xl font-bold text-white">W</span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">VisionWeaver</h1>
            </div>
            <p className="mt-3 text-xl md:text-2xl font-semibold text-white">Story. People. Places. Possibilities.</p>
            <p className="mt-2 text-sm leading-relaxed text-white/80">
              Create videos, images, books, and immersive worlds with consistent avatars, real locations, and production-ready tools.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link to="/vision-builder" className="inline-flex items-center gap-1.5 rounded-md bg-[color:var(--neon-violet)] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <Film className="h-4 w-4" /> Enter VisionWeaver
              </Link>
              <Link to="/projects" className="inline-flex items-center gap-1.5 rounded-md border border-white/30 px-4 py-2 text-sm font-medium text-white hover:bg-white/10">
                View live projects
              </Link>
            </div>
          </div>
          <ul className="space-y-1.5 text-sm text-white/90">
            {heroChecklist.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --- Live counts --- */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Live Projects" value={projects.loading ? "…" : String(projects.data.length)} />
        <Stat label="Initiatives" value={initiatives.loading ? "…" : String(initiatives.data.length)} />
        <Stat label="Records" value={records.loading ? "…" : String(records.data.length)} />
        <Stat label="Release Gates" value={gates.loading ? "…" : `${gatesImplemented} / ${gates.data.length}`} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        {/* --- Main column: 12 feature cards + Featured Projects --- */}
        <div className="space-y-6 min-w-0">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((c) => (
              <VWCard key={c.label} image={c.image} icon={c.icon} title={c.label} desc={c.desc} to={c.to} />
            ))}
          </div>

          <Panel>
            <SectionTitle icon={Sparkles} title="Featured Projects" href="/projects" cta="View All" />
            {projects.loading ? (
              <p className="mt-3 text-sm text-muted-foreground">Loading live projects…</p>
            ) : projects.error ? (
              <p className="mt-3 text-sm text-[color:var(--neon-amber)]">Could not load projects from Supabase. {projects.error}</p>
            ) : projects.data.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">No projects in Supabase yet.</p>
            ) : (
              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                {projects.data.slice(0, 6).map((p, i) => (
                  <Link key={p.id} to="/projects" className="group block overflow-hidden rounded-lg border border-border/70 hover:border-[color:var(--neon-violet)]/50 transition">
                    <VWImage src={featuredPhotos[i % featuredPhotos.length]} alt={p.name} className="aspect-[16/10] w-full" />
                    <div className="p-3">
                      <div className="truncate text-sm font-medium group-hover:text-[color:var(--neon-violet)]">{p.name}</div>
                      <div className="mt-0.5 truncate text-xs text-muted-foreground">
                        {[p.kind, p.stage].filter(Boolean).join(" · ") || "—"}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Panel>
        </div>

        {/* --- Right rail --- */}
        <div className="space-y-4">
          <Panel>
            <SectionTitle icon={Play} title="Active Project" href="/projects" cta="Open Project" />
            {projects.loading ? (
              <p className="mt-3 text-sm text-muted-foreground">Loading…</p>
            ) : activeProject ? (
              <div className="mt-3">
                <div className="text-base font-semibold">{activeProject.name}</div>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {activeProject.kind && <Pill className="border-border text-muted-foreground">{activeProject.kind}</Pill>}
                  {activeProject.status && <Pill className="border-[color:var(--neon-lime)]/40 text-[color:var(--neon-lime)] bg-[color:var(--neon-lime)]/10">{activeProject.status}</Pill>}
                  {activeProject.stage && <Pill className="border-[color:var(--neon-violet)]/40 text-[color:var(--neon-violet)] bg-[color:var(--neon-violet)]/10">{activeProject.stage}</Pill>}
                </div>
                {activeProject.summary && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{activeProject.summary}</p>
                )}
                {activeProject.next_step && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    <span className="uppercase tracking-widest text-[10px]">Next step · </span>
                    {activeProject.next_step}
                  </p>
                )}
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">No active project in Supabase yet.</p>
            )}
          </Panel>

          <Panel>
            <SectionTitle icon={GitBranch} title="Production Pipeline" href="/initiatives" cta="View All" />
            {initiatives.loading ? (
              <p className="mt-3 text-sm text-muted-foreground">Loading initiatives…</p>
            ) : pipelineStages.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">No initiatives in Supabase yet.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {pipelineStages.map(([stage, count]) => (
                  <li key={stage} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[color:var(--neon-violet)]" />
                      {stage}
                    </span>
                    <span className="font-medium">{count}</span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel>
            <SectionTitle icon={Activity} title="System Status" href="/health" cta="Open audit" />
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center gap-2 font-medium text-emerald-400">
                <CheckCircle2 className="h-4 w-4" /> All Systems Operational
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Release gates</span>
                <span>{gates.loading ? "…" : `${gatesImplemented} of ${gates.data.length} implemented`}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Integrations verified</span>
                <span>{integrations.loading ? "…" : `${integrationsVerified} of ${integrations.data.length}`}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Organizations</span>
                <span>{orgs.loading ? "…" : String(orgs.data.length)}</span>
              </div>
              {integrations.data.length > 0 && integrationsVerified === 0 && (
                <p className="text-xs text-[color:var(--neon-amber)]">
                  All {integrations.data.length} integrations are currently unverified in Supabase — no provider is confirmed live.
                </p>
              )}
            </div>
          </Panel>

          <Panel>
            <SectionTitle icon={Clock} title="Recent Activity" href="/health" cta="View All" />
            {audit.loading ? (
              <p className="mt-3 text-sm text-muted-foreground">Loading…</p>
            ) : recentEvents.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">No audit events in Supabase yet.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {recentEvents.map((e) => (
                  <li key={e.event_id} className="rounded-md border border-border/70 px-2.5 py-2">
                    <div className="text-sm">{e.event_type}</div>
                    <div className="text-xs text-muted-foreground">
                      {e.occurred_at ? new Date(e.occurred_at).toLocaleString() : "—"}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel>
            <SectionTitle icon={ClipboardCheck} title="Decision Queue" href="/decisions" cta="Open queue" />
            {decisions.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">
                No decisions awaiting review. Decisions are saved in this browser workspace.
              </p>
            ) : (
              <ul className="mt-3 divide-y divide-border/60">
                {decisions.slice(0, 3).map((d) => (
                  <li key={d.id} className="py-2.5">
                    <div className="text-sm font-medium truncate">{d.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{d.summary}</div>
                    <div className="mt-1 flex gap-1.5">
                      <Pill className="border-[color:var(--neon-violet)]/40 text-[color:var(--neon-violet)] bg-[color:var(--neon-violet)]/10">Stage · {d.stage}</Pill>
                      <Pill className="border-border text-muted-foreground">{d.urgency}</Pill>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="panel p-4">
      <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
      <div className="mt-1.5 text-2xl font-semibold text-[color:var(--neon-violet)]">{value}</div>
    </div>
  );
}

function SectionTitle({ icon: Icon, title, href, cta }: { icon: any; title: string; href: string; cta: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-[color:var(--neon-violet)]" />
        <h2 className="text-sm font-semibold uppercase tracking-wider">{title}</h2>
      </div>
      <Link to={href} className="inline-flex items-center gap-1 text-[11px] uppercase tracking-widest text-muted-foreground hover:text-[color:var(--neon-violet)]">
        {cta} <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
