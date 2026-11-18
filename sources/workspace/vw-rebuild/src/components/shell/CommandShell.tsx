import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Cpu, ShieldCheck, GitBranch, Boxes, Sparkles, Home,
  Radar, ClipboardCheck, Layers, Film, Building2, Activity, GraduationCap,
  Library, Search, Command, Zap, ChevronRight, Rocket, Bot, Plug, Folder,
  Settings, Palette, Phone, UserRound, ListTodo, Menu, X, MessagesSquare,
  Bell, HelpCircle, Plus, Eye, BarChart3, Globe, CheckCircle2, Briefcase,
  Database, Server, FileText, TrendingUp, Users, Lock, DollarSign,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { usePlatform } from "@/components/platform/PlatformProvider";
import { UniversalLauncher } from "./UniversalLauncher";

// VisionWeaver Prime navigation — the exact order from the owner's
// screenshots (Home Dashboard, visionweaver-prime). The CEO Dashboard is
// added right after Home; the legacy system routes live under "System"
// so nothing already built becomes unreachable.
const nav: { section: string | null; items: { to: string; label: string; icon: any; hint?: string }[] }[] = [
  {
    section: null,
    items: [
      { to: "/", label: "Home", icon: Home },
      { to: "/ceo-dashboard", label: "CEO Dashboard", icon: LayoutDashboard, hint: "Enterprise" },
      { to: "/vision-builder", label: "Vision Builder", icon: Film },
      { to: "/strategic-planner", label: "Strategic Planner", icon: LayoutDashboard },
      { to: "/initiatives", label: "Initiatives", icon: GitBranch },
      { to: "/programs", label: "Programs & Projects", icon: Layers },
      { to: "/ai-co-pilot", label: "AI Co-Pilot", icon: Bot },
      { to: "/cmi", label: "CMI", icon: TrendingUp },
      { to: "/directors-guild", label: "Directors Guild", icon: ClipboardCheck },
      { to: "/teams", label: "Teams", icon: Users },
      { to: "/c-suite", label: "C-Suite", icon: ShieldCheck },
      { to: "/creative-studio", label: "Create & Produce", icon: Palette },
      { to: "/avatar-engineering", label: "Avatar Engineering", icon: Film },
      { to: "/worlds", label: "Worlds & Locations", icon: Building2 },
      { to: "/marketing", label: "Design & Commercial", icon: Rocket },
      { to: "/files", label: "Media Library", icon: Folder },
      { to: "/workflows", label: "Post Production", icon: GitBranch },
      { to: "/distribution", label: "Distribution & Growth", icon: TrendingUp },
      { to: "/health", label: "Quality & Audit", icon: Activity },
      { to: "/finance", label: "Finance & Accounting", icon: DollarSign },
      { to: "/it-security", label: "IT & Security", icon: Lock },
      { to: "/resources", label: "Resources", icon: Library },
      { to: "/assets", label: "Assets & Knowledge", icon: Sparkles },
      { to: "/reports", label: "Reports & Insights", icon: BarChart3 },
      { to: "/settings", label: "Settings", icon: Settings },
    ],
  },
  {
    section: "System",
    items: [
      { to: "/thelma", label: "T.H.E.L.M.A.", icon: Radar, hint: "Orchestration" },
      { to: "/systems", label: "System Registry", icon: Cpu },
      { to: "/runtimes", label: "Runtimes", icon: Zap, hint: "n8n" },
      { to: "/connectors", label: "Integrations / Connectors", icon: Plug },
      { to: "/telecommunications", label: "Telecommunications", icon: Phone },
      { to: "/assessment", label: "Personal Assessment", icon: UserRound },
      { to: "/training", label: "Training", icon: GraduationCap },
      { to: "/launcher", label: "Universal Launcher", icon: Rocket },
      { to: "/sessions", label: "Sessions", icon: MessagesSquare },
      { to: "/tasks", label: "Tasks", icon: ListTodo },
    ],
  },
];

export function CommandShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { state, storageError } = usePlatform();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="flex min-h-screen w-full text-foreground">
      {menuOpen && <div className="fixed inset-0 z-40 bg-background/80 md:hidden" onClick={() => setMenuOpen(false)} />}
      <aside className={`${menuOpen ? "flex" : "hidden"} fixed inset-y-0 left-0 z-50 w-[270px] md:sticky md:top-0 md:h-screen md:flex md:w-[270px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar`}>
        <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
          <div className="relative h-9 w-9 shrink-0 rounded-md bg-gradient-to-br from-[color:var(--neon-violet)] to-[#5b21b6] grid place-items-center">
            <span className="text-lg font-bold text-white">W</span>
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold truncate">VisionWeaver</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Create · Bring worlds to life</div>
            <Button size="icon" variant="ghost" className="absolute right-1 top-1 md:hidden" aria-label="Close navigation" onClick={() => setMenuOpen(false)}><X /></Button>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-3">
          {nav.map((group) => (
            <div key={group.section ?? "main"} className="px-3 pb-3">
              {group.section && (
                <div className="px-2 pb-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{group.section}</div>
              )}
              <ul className="space-y-0.5">
                {group.items.map((it) => {
                  const active = pathname === it.to || (it.to !== "/" && pathname.startsWith(it.to));
                  const Icon = it.icon;
                  return (
                    <li key={`${group.section ?? "main"}:${it.to}:${it.label}`}>
                      <Link
                        to={it.to}
                        onClick={() => setMenuOpen(false)}
                        className={`group flex items-center gap-2.5 rounded-md px-2 py-2 text-sm transition ${
                          active
                            ? "bg-[color:var(--neon-violet)] text-white font-medium"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                        }`}
                      >
                        <Icon className={`h-4 w-4 shrink-0 ${active ? "text-white" : "text-[color:var(--neon-violet)]"}`} />
                        <span className="truncate">{it.label}</span>
                        {it.hint && (
                          <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground">{it.hint}</span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        <div className="p-3 border-t border-sidebar-border space-y-2">
          <Link to="/teams" className="flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-sidebar-accent/60">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-rose-500 text-xs font-bold text-white">E</span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium">The Architect</span>
              <span className="block truncate text-[11px] text-muted-foreground">EstibanCreations · System Owner</span>
            </span>
          </Link>
          <Link to="/ai-co-pilot" className="flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-sidebar-accent/60">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[color:var(--neon-violet)]/60 bg-[color:var(--neon-violet)]/15 shadow-[0_0_12px_rgba(139,92,246,0.45)]">
              <Bot className="h-4 w-4 text-[color:var(--neon-violet)]" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium">THELMA AI</span>
              <span className="block truncate text-[11px] text-muted-foreground">Operations Lead</span>
            </span>
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar pathname={pathname} onMenu={() => setMenuOpen(true)} />
        <div className="border-b border-border px-4 md:px-8 py-2 text-[11px] text-muted-foreground">Live data · Supabase connected · EstibanCreationsPrime{storageError ? " · Browser storage unavailable" : ""}</div>
        <main className={`flex-1 min-w-0 px-4 md:px-8 ${state.settings.compact ? "py-3" : "py-6"}`}>{children}</main>
      </div>
    </div>
  );
}

function TopBar({ pathname, onMenu }: { pathname: string; onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/70 backdrop-blur">
      <div className="flex items-center gap-3 px-4 md:px-8 h-14">
        <Button size="icon" variant="ghost" className="md:hidden shrink-0" aria-label="Open navigation" onClick={onMenu}><Menu /></Button>
        <div className="mx-auto w-full max-w-xl">
          <Link
            to="/search"
            className="flex items-center gap-2 w-full rounded-md border border-border bg-card/60 px-3 py-1.5 text-sm text-muted-foreground hover:border-[color:var(--neon-violet)]/40 hover:text-foreground transition"
          >
            <Search className="h-4 w-4" />
            <span className="truncate">Search VisionWeaver (projects, avatars, locations, assets, teams, documents...)</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--neon-lime)]" />
            Live data
          </div>
          <Link to="/vision-builder" className="hidden sm:inline-flex items-center gap-1.5 rounded-md bg-[color:var(--neon-violet)] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90">
            <Plus className="h-4 w-4" /> Create
          </Link>
          <Link to="/settings" aria-label="Help" className="grid h-8 w-8 place-items-center rounded-md border border-border text-muted-foreground hover:text-foreground">
            <HelpCircle className="h-4 w-4" />
          </Link>
          <Link to="/directors-guild" aria-label="Notifications" className="relative grid h-8 w-8 place-items-center rounded-md border border-border text-muted-foreground hover:text-foreground">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </Link>
          <Link to="/settings" aria-label="Account" className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-rose-500 text-xs font-bold text-white">
            E
          </Link>
        </div>
      </div>
    </header>
  );
}

export function PageHeader({ eyebrow, title, description, subtitle, actions }: { eyebrow?: string; title: string; description?: string; subtitle?: string; actions?: ReactNode }) {
  const sub = description ?? subtitle;
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow && (
          <div className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground mb-1">{eyebrow}</div>
        )}
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          <span className="text-gradient">{title}</span>
        </h1>
        {sub && <p className="mt-1.5 text-sm text-muted-foreground max-w-3xl">{sub}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Panel({ children, className = "", title }: { children: ReactNode; className?: string; title?: string }) {
  return (
    <div className={`panel p-5 ${className}`}>
      {title && <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider">{title}</h2>}
      {children}
    </div>
  );
}

export function StatBlock({ label, value, hint, sub, tone = "cyan" }: { label: string; value: string | number; hint?: string; sub?: string; tone?: "cyan" | "violet" | "lime" | "amber" }) {
  const color = tone === "violet" ? "var(--neon-violet)" : tone === "lime" ? "var(--neon-lime)" : tone === "amber" ? "var(--neon-amber)" : "var(--neon-cyan)";
  const note = hint ?? sub;
  return (
    <div className="panel p-4">
      <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
      <div className="mt-1.5 text-2xl font-semibold" style={{ color }}>{value}</div>
      {note && <div className="mt-1 text-xs text-muted-foreground">{note}</div>}
    </div>
  );
}

export function Pill({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-widest ${className}`}>
      {children}
    </span>
  );
}

export function LauncherHint() {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <Rocket className="h-3.5 w-3.5 text-[color:var(--neon-violet)]" />
      Launch anything with the Universal Launcher — you never need to know which system owns the work.
    </div>
  );
}
