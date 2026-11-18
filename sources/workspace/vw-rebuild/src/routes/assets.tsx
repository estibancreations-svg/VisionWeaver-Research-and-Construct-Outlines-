import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, User, MapPin, Package, Globe, LayoutTemplate, FileText, Image, Music } from "lucide-react";
import { VWImage } from "@/components/vw/VWImage";
import { PageHeader, Panel } from "@/components/shell/CommandShell";
import { usePageView, type VWView } from "@/lib/vw-view-prefs";
import { useLiveRecords } from "@/lib/supabase-data";

export const Route = createFileRoute("/assets")({ component: AssetsPage });

const CATEGORIES = [
  { label: "Characters", kind: "character", image: "/vw/feature_avatar-engineering.jpg", icon: User },
  { label: "Locations", kind: "location", image: "/vw/feature_worlds-locations.jpg", icon: MapPin },
  { label: "Props & Objects", kind: "prop", image: "/vw/feature_resources.jpg", icon: Package },
  { label: "Environments", kind: "environment", image: "/vw/feature_worlds-locations.jpg", icon: Globe },
  { label: "Templates", kind: "template", image: "/vw/feature_design-commercial.jpg", icon: LayoutTemplate },
  { label: "Documents", kind: "document", image: "/vw/feature_resources.jpg", icon: FileText },
  { label: "Reference Images", kind: "reference", image: "/vw/feature_media-library.jpg", icon: Image },
  { label: "Audio & Voices", kind: "audio", image: "/vw/feature_post-production.jpg", icon: Music },
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

function AssetsPage() {
  const [view, setView] = usePageView("assets", "v2");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const { data: records, loading, error } = useLiveRecords();

  const filtered = useMemo(() => {
    const list = records ?? [];
    const q = query.trim().toLowerCase();
    return list.filter((r) => {
      if (category && !(r.kind ?? "").toLowerCase().includes(category)) return false;
      if (q && !`${r.name ?? ""} ${r.kind ?? ""} ${r.status ?? ""}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [records, query, category]);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <PageHeader title="Assets Library" subtitle="Search · Organize · Preview · Use" />
        <ViewSwitch view={view} setView={setView} />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {CATEGORIES.map((c) => (
          <button
            key={c.label}
            onClick={() => setCategory(category === c.kind ? null : c.kind)}
            className={`panel overflow-hidden p-0 text-left transition hover:border-[color:var(--neon-violet)]/50 ${category === c.kind ? "border-[color:var(--neon-violet)]" : ""}`}
          >
            <VWImage src={c.image} alt={c.label} className="aspect-[16/9] w-full" />
            <div className="flex items-center gap-2 p-3">
              <c.icon className="h-4 w-4 shrink-0 text-[color:var(--neon-violet)]" />
              <span className="text-sm font-semibold">{c.label}</span>
            </div>
          </button>
        ))}
      </div>

      <Panel title="Asset List">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search assets…"
            className="w-full rounded-md border border-white/10 bg-transparent py-2 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        {category && (
          <p className="mt-2 text-xs text-muted-foreground">
            Filtering by “{category}” —{" "}
            <button onClick={() => setCategory(null)} className="underline">
              clear
            </button>
          </p>
        )}
        <div className="mt-4">
          {loading && <p className="text-sm text-muted-foreground">Loading assets…</p>}
          {error && <p className="text-sm text-muted-foreground">Could not load assets.</p>}
          {!loading && !error && filtered.length === 0 && (
            <p className="text-sm text-muted-foreground">No assets in Supabase yet.</p>
          )}
          {!loading && !error && filtered.length > 0 && (
            <ul className="divide-y divide-white/5">
              {filtered.slice(0, 12).map((r) => (
                <li key={r.id} className="flex items-center gap-3 py-2 text-sm">
                  <span className="font-medium">{r.name}</span>
                  <span className="text-muted-foreground">{r.kind}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{r.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Panel>
    </div>
  );
}
