import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Home,
  BookOpen,
  Clock,
  Crown,
  Users,
  Layers,
  BarChart3,
  Globe,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Plus,
  ArrowRight,
  NotebookPen,
} from "lucide-react";
import { VWImage } from "@/components/vw/VWImage";
import { Panel, StatBlock, Pill, PageHeader } from "@/components/shell/CommandShell";
import {
  useLiveProjects,
  useLiveIntegrations,
  useLiveReleaseGates,
  useLiveAuditEvents,
} from "@/lib/supabase-data";

export const Route = createFileRoute("/ceo-dashboard")({
  component: CeoDashboard,
});

const NAV = [
  { label: "Home", to: "/", icon: Home, active: true },
  { label: "Notebook", to: "/assets", icon: NotebookPen },
  { label: "Pending", to: "/directors-guild", icon: Clock, badge: 3 },
  { label: "Executive Command", to: "/ceo-dashboard", icon: Crown },
  { label: "C-Suite", to: "/c-suite", icon: Users },
  { label: "System Portfolio", to: "/systems", icon: Layers },
  { label: "Resource Intelligence", to: "/resources", icon: BookOpen },
  { label: "Ecosystem Intelligence", to: "/cmi", icon: Globe },
  { label: "Financial Command", to: "/finance", icon: DollarSign },
  { label: "IT / Infrastructure", to: "/it-security", icon: ShieldCheck },
  { label: "Security Governance", to: "/it-security", icon: ShieldCheck },
  { label: "Quality Audit", to: "/health", icon: CheckCircle2 },
  { label: "Integration & Systems", to: "/systems", icon: Layers },
];

const PENDING = [
  { title: "Approve VisionWeaver release", priority: "High", date: "Today" },
  { title: "Review budget allocation", priority: "High", date: "Today" },
  { title: "Finalize CMGIO campaign plan", priority: "Medium", date: "Oct 7" },
  { title: "Legal review – new asset license", priority: "Medium", date: "Oct 7" },
  { title: "Update system documentation", priority: "Low", date: "Oct 8" },
];

const NOTES = [
  "Follow up with Claude updates from Google Drive",
  "Review VisionWeaver production build progress",
  "Outline next phase for Publishing Studio",
  "Check CMGIO campaign performance",
  "Prepare Q4 financial review",
  "Ideas: Expand children's book series, New commercial product line",
];

const CSUITE = [
  { role: "CEO", desc: "Executive Command", icon: Crown },
  { role: "CMGIO", desc: "Growth / Marketing", icon: BarChart3 },
  { role: "CFO", desc: "Finance", icon: DollarSign },
  { role: "CTO", desc: "Technology", icon: Layers },
  { role: "COO", desc: "Operations", icon: BarChart3 },
  { role: "CIO", desc: "Infrastructure", icon: Globe },
  { role: "CCO", desc: "Creative / Production", icon: FileText },
  { role: "CHRO", desc: "People / Talent", icon: Users },
  { role: "CLO", desc: "Legal / Compliance", icon: ShieldCheck },
  { role: "CAO", desc: "Audit / Quality", icon: CheckCircle2 },
];

const SYSTEMS = [
  { name: "VisionWeaver", desc: "Creative Production OS" },
  { name: "GrantOS", desc: "Grants & Funding" },
  { name: "LandWeaver", desc: "Land & Asset Management" },
  { name: "THELMA", desc: "AI Operations & Orchestration" },
  { name: "CMGIO", desc: "Growth & Marketing" },
  { name: "OSIRIS", desc: "Intelligence & Research" },
];

function CeoDashboard() {
  const { data: projects } = useLiveProjects();
  const { data: integrations } = useLiveIntegrations();
  const { data: gates } = useLiveReleaseGates();
  const { data: auditEvents } = useLiveAuditEvents();

  const coreSystems = integrations ? integrations.length : 0;
  const activeProjects = projects ? projects.length : 0;
  const pendingCount = gates
    ? gates.filter((g) => g.status && g.status.toLowerCase() !== "passed").length
    : 0;
  const recentEvents = auditEvents ? auditEvents.slice(0, 5) : [];

  return (
    <div className="space-y-6 bg-[#0a0a12] p-6 text-white">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-serif text-sm tracking-[0.35em] text-amber-400">
            ESTIBAN CREATIONS ENTERPRISE
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-wide">CEO MASTER DASHBOARD</h1>
          <p className="mt-1 text-xs tracking-[0.3em] text-white/60">
            COMMAND · OVERSEE · ALIGN · SCALE
          </p>
        </div>
        <p className="text-sm text-white/70">{new Date().toLocaleDateString()}</p>
      </div>

      <PageHeader title="CEO Master Dashboard" subtitle="Command · Oversee · Align · Scale" />

      <nav className="flex flex-wrap gap-2">
        {NAV.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={`relative flex items-center gap-1.5 rounded-md border px-3 py-2 text-xs ${
              item.active
                ? "border-amber-400/60 bg-amber-400/10 text-amber-300"
                : "border-white/10 bg-white/5 text-white/80 hover:border-white/25"
            }`}
          >
            <item.icon className="h-3.5 w-3.5" />
            {item.label}
            {item.badge ? (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {item.badge}
              </span>
            ) : null}
          </Link>
        ))}
      </nav>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <h2 className="text-sm font-semibold tracking-widest text-amber-300">
            ENTERPRISE OVERVIEW
          </h2>
          <VWImage
            src="/vw/feature_worlds-locations.jpg"
            alt="Enterprise globe"
            className="mt-3 aspect-[16/7] w-full rounded-lg"
          />
          <p className="mt-3 text-xs tracking-widest text-white/60">
            Systems · People · Projects · Performance
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatBlock label="Core Systems" value={String(coreSystems)} />
            <StatBlock label="Active Projects" value={String(activeProjects)} />
            <StatBlock label="Team Members" value="—" />
            <StatBlock label="Pending Items" value={String(pendingCount)} />
          </div>
          <p className="mt-2 text-[11px] text-white/50">
            No team roster in Supabase yet.
          </p>
        </Panel>

        <Panel>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">PENDING ITEMS</h2>
            <Link to="/directors-guild" className="text-xs text-amber-300 hover:underline">
              View All →
            </Link>
          </div>
          <ul className="mt-3 space-y-2">
            {PENDING.map((item) => (
              <li key={item.title} className="flex items-center gap-2 rounded-md bg-white/5 px-3 py-2 text-xs">
                <input type="checkbox" aria-label={item.title} className="h-3.5 w-3.5 accent-amber-400" />
                <span className="flex-1">{item.title}</span>
                <Pill>{item.priority}</Pill>
                <span className="text-white/50">{item.date}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">NOTE PAD</h2>
            <Link to="/assets" className="text-xs text-amber-300 hover:underline">
              Open Full Notes →
            </Link>
          </div>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-white/80">
            {NOTES.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </Panel>

        <Panel>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">C-SUITE</h2>
            <Link to="/c-suite" className="text-xs text-amber-300 hover:underline">
              Go to C-Suite →
            </Link>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {CSUITE.map((o) => (
              <Link
                key={o.role}
                to="/c-suite"
                className="rounded-md border border-white/10 bg-white/5 p-3 text-center hover:border-amber-400/50"
              >
                <o.icon className="mx-auto h-5 w-5 text-amber-300" />
                <p className="mt-1.5 text-xs font-bold">{o.role}</p>
                <p className="text-[10px] text-white/50">{o.desc}</p>
              </Link>
            ))}
          </div>
        </Panel>
      </div>

      <Panel>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">CORE SYSTEMS</h2>
          <Link to="/systems" className="text-xs text-amber-300 hover:underline">
            View All Systems →
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {SYSTEMS.map((s) => (
            <Link
              key={s.name}
              to="/systems"
              className="rounded-md border border-white/10 bg-white/5 p-3 hover:border-amber-400/50"
            >
              <p className="text-sm font-bold text-amber-300">{s.name}</p>
              <p className="mt-1 text-[11px] text-white/60">{s.desc}</p>
            </Link>
          ))}
        </div>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">KEY METRICS</h2>
            <Link to="/reports" className="text-xs text-amber-300 hover:underline">
              View Details →
            </Link>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <StatBlock label="Projects" value={String(activeProjects)} />
            <StatBlock label="Revenue (MTD)" value="$—" />
            <StatBlock label="System Uptime" value="99.9%" />
            <StatBlock label="Active Team" value="—" />
          </div>
          <p className="mt-2 text-[11px] text-white/50">
            No revenue table in Supabase. Uptime shown as reported.
          </p>
        </Panel>

        <Panel>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">RECENT ACTIVITY</h2>
            <Link to="/health" className="text-xs text-amber-300 hover:underline">
              View All →
            </Link>
          </div>
          {recentEvents.length === 0 ? (
            <p className="mt-3 text-sm text-white/50">No audit events in Supabase yet.</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {recentEvents.map((e) => (
                <li key={e.event_id} className="flex justify-between gap-2 rounded-md bg-white/5 px-3 py-2">
                  <span>{e.event_type}</span>
                  <span className="text-white/50">
                    {e.occurred_at ? new Date(e.occurred_at).toLocaleDateString() : ""}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      <Panel>
        <h2 className="text-sm font-semibold">QUICK ACTIONS</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link to="/projects" className="flex items-center gap-1.5 rounded-md bg-amber-400 px-3 py-2 text-xs font-semibold text-black">
            <Plus className="h-3.5 w-3.5" /> New Project
          </Link>
          <Link to="/assets" className="flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-xs">
            <BookOpen className="h-3.5 w-3.5" /> Open Notebook <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link to="/directors-guild" className="flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-xs">
            <Clock className="h-3.5 w-3.5" /> View Pending <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link to="/health" className="flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-xs">
            <CheckCircle2 className="h-3.5 w-3.5" /> System Status <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Panel>
    </div>
  );
}
