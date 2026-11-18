import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MapPin,
  Search,
  Plus,
  Eye,
  Upload,
  Image,
  Play,
  Star,
} from "lucide-react";
import { VWImage } from "@/components/vw/VWImage";
import { usePageView, type VWView } from "@/lib/vw-view-prefs";
import { Panel, Pill, PageHeader } from "@/components/shell/CommandShell";
import { useLiveProjects } from "@/lib/supabase-data";

export const Route = createFileRoute("/worlds")({
  component: Worlds,
});

const VIEW_TABS: { id: VWView; label: string }[] = [
  { id: "v1", label: "V1 Cinematic Grid" },
  { id: "v2", label: "V2 Interactive Map" },
  { id: "v3", label: "V3 World Builder Studio" },
];

const FEATURED = [
  { name: "Chicago", desc: "Modern Urban" },
  { name: "Mumbai", desc: "International" },
  { name: "Atlanta", desc: "Modern Urban" },
  { name: "Houston", desc: "Modern Urban" },
  { name: "Tampa", desc: "Coastal" },
  { name: "Savannah", desc: "Historic" },
];

const CATEGORIES = [
  "Cities",
  "Rural & Natural",
  "Historical",
  "Interior Sets",
  "Coastal & Islands",
  "International",
  "Fantasy Worlds",
  "Custom Builds",
];

const POPULAR = ["New York", "Los Angeles", "London", "Paris", "Tokyo", "Cape Town"];

const BUILD_TOOLS = [
  "Terrain & Landscape",
  "Architecture",
  "Weather & Lighting",
  "Population & Culture",
  "Ambient Sound",
  "Ecology & Wildlife",
  "Physics & Causality",
  "Save as Location Pack",
];

const ASSETS = ["Buildings", "Vehicles", "People", "Street Props", "Nature", "Interior", "Signage"];

const V3_TABS = [
  "Overview",
  "Environment",
  "Architecture",
  "Interiors",
  "Population",
  "Props & Assets",
  "Scenes",
  "Export",
];

function ViewSwitcher({
  view,
  setView,
}: {
  view: VWView;
  setView: (v: VWView) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {VIEW_TABS.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => setView(t.id)}
          className={`rounded-md border px-3 py-2 text-xs ${
            view === t.id
              ? "border-violet-400/60 bg-violet-400/10 text-violet-200"
              : "border-white/10 bg-white/5 text-white/70 hover:border-white/25"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function Worlds() {
  const [view, setView] = usePageView("worlds", "v1");
  const { data: projects } = useLiveProjects();
  const related = projects ? projects.slice(0, 3) : [];

  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Worlds & Locations" subtitle="Real Places. Imaginative Worlds. Infinite Possibilities." />
      <ViewSwitcher view={view} setView={setView} />

      {view === "v1" && (
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-xl">
            <VWImage src="/vw/feature_worlds-locations.jpg" alt="Worlds and locations" className="aspect-[16/6] w-full" />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-6">
              <h1 className="text-3xl font-bold text-white">Worlds &amp; Locations</h1>
              <p className="mt-1 text-sm text-white/80">
                Real Places. Imaginative Worlds. Infinite Possibilities.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setView("v1")} className="rounded-md bg-violet-500 px-3 py-2 text-xs font-semibold text-white">Overview</button>
            <button type="button" onClick={() => setView("v1")} className="rounded-md border border-white/15 px-3 py-2 text-xs">Location Library</button>
            <button type="button" onClick={() => setView("v3")} className="rounded-md border border-white/15 px-3 py-2 text-xs">World Builder</button>
            <button type="button" onClick={() => setView("v3")} className="rounded-md border border-white/15 px-3 py-2 text-xs">Environment Tools</button>
            <button type="button" onClick={() => setView("v1")} className="rounded-md border border-white/15 px-3 py-2 text-xs">Scene References</button>
            <button type="button" onClick={() => setView("v2")} className="rounded-md border border-white/15 px-3 py-2 text-xs">Map View</button>
            <button type="button" onClick={() => setView("v1")} className="rounded-md border border-white/15 px-3 py-2 text-xs">Import</button>
          </div>

          <section>
            <h2 className="text-sm font-semibold">Featured Locations</h2>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {FEATURED.map((loc) => (
                <button
                  key={loc.name}
                  type="button"
                  onClick={() => setView("v2")}
                  className="overflow-hidden rounded-lg border border-white/10 bg-white/5 text-left hover:border-violet-400/50"
                >
                  <VWImage src="/vw/feature_worlds-locations.jpg" alt={loc.name} className="aspect-[16/9] w-full" />
                  <div className="p-3">
                    <p className="flex items-center gap-1.5 text-sm font-semibold">
                      <MapPin className="h-4 w-4 text-violet-300" /> {loc.name}
                    </p>
                    <p className="mt-0.5 text-xs text-white/60">{loc.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-semibold">Location Categories</h2>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setView("v2")}
                  className="rounded-lg border border-white/10 bg-white/5 p-4 text-left hover:border-violet-400/50"
                >
                  <p className="text-sm font-semibold">{c}</p>
                  <p className="mt-1 text-xs text-violet-300">Browse →</p>
                </button>
              ))}
            </div>
          </section>

          <Panel>
            <h2 className="text-sm font-semibold">Recent Worlds</h2>
            <p className="mt-2 text-sm text-white/50">No saved worlds in Supabase yet.</p>
          </Panel>

          <Panel>
            <h2 className="text-sm font-semibold">Quick Actions</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" onClick={() => setView("v2")} className="flex items-center gap-1.5 rounded-md bg-violet-500 px-3 py-2 text-xs font-semibold text-white">
                <Search className="h-3.5 w-3.5" /> Search Location
              </button>
              <button type="button" onClick={() => setView("v3")} className="flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-xs">
                <Plus className="h-3.5 w-3.5" /> Build Custom World
              </button>
              <button type="button" className="flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-xs">
                <Upload className="h-3.5 w-3.5" /> Import Reference
              </button>
              <button type="button" className="flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-xs">
                <Eye className="h-3.5 w-3.5" /> Open in Scene
              </button>
              <button type="button" className="flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-xs">
                <Star className="h-3.5 w-3.5" /> Save to Library
              </button>
            </div>
          </Panel>
        </div>
      )}

      {view === "v2" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Explore. Build. Place. Connect.</h1>
            <p className="mt-1 text-sm text-white/60">Interactive map of worlds and locations.</p>
          </div>

          <Panel>
            <div className="relative overflow-hidden rounded-lg">
              <VWImage src="/vw/feature_worlds-locations.jpg" alt="Interactive world map" className="aspect-[16/7] w-full" />
              <div className="absolute left-[30%] top-[40%] flex items-center gap-1.5">
                <span className="relative flex h-4 w-4">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex h-4 w-4 rounded-full bg-red-500" />
                </span>
                <span className="rounded bg-black/70 px-2 py-1 text-xs font-semibold text-white">
                  Chicago, USA — Modern Urban
                </span>
              </div>
            </div>
          </Panel>

          <div className="grid gap-4 lg:grid-cols-3">
            <Panel className="lg:col-span-2">
              <h2 className="text-sm font-semibold">Filters</h2>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {["Region", "Environment Type", "Time Period", "Mood / Atmosphere"].map((f) => (
                  <label key={f} className="block text-xs text-white/60">
                    {f}
                    <select className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-2 py-2 text-sm text-white">
                      <option>All</option>
                    </select>
                  </label>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-4 text-xs">
                <label className="flex items-center gap-1.5"><input type="checkbox" defaultChecked className="accent-violet-400" /> Real Locations</label>
                <label className="flex items-center gap-1.5"><input type="checkbox" className="accent-violet-400" /> Custom / Created</label>
              </div>
              <button type="button" className="mt-4 flex items-center gap-1.5 rounded-md bg-violet-500 px-3 py-2 text-xs font-semibold text-white">
                <Search className="h-3.5 w-3.5" /> Search Locations
              </button>
              <p className="mt-2 text-[11px] text-white/50">Filters apply to the local list.</p>
            </Panel>

            <Panel>
              <h2 className="text-sm font-semibold">Popular Locations</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {POPULAR.map((p) => (
                  <span key={p} className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs">
                    <MapPin className="h-3 w-3 text-violet-300" /> {p}
                  </span>
                ))}
              </div>
            </Panel>
          </div>

          <section>
            <h2 className="text-sm font-semibold">World Building Tools</h2>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {BUILD_TOOLS.map((t) => (
                <button key={t} type="button" onClick={() => setView("v3")} className="rounded-lg border border-white/10 bg-white/5 p-4 text-left text-sm hover:border-violet-400/50">
                  {t}
                </button>
              ))}
            </div>
          </section>

          <Panel>
            <h2 className="text-sm font-semibold">Recent Map Activity</h2>
            <p className="mt-2 text-sm text-white/50">No map activity in Supabase yet.</p>
          </Panel>

          <section>
            <h2 className="text-sm font-semibold">Location Packs</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {["Chicago Urban Pack", "Mumbai Mega Pack"].map((pack) => (
                <Panel key={pack}>
                  <p className="text-sm font-semibold">{pack}</p>
                  <p className="mt-1 text-xs text-white/50">— assets</p>
                </Panel>
              ))}
            </div>
          </section>
        </div>
      )}

      {view === "v3" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Chicago – Downtown</h1>
            <p className="mt-1 flex flex-wrap gap-2 text-xs text-white/60">
              <Pill>Modern Urban</Pill> <Pill>Midwest USA</Pill> <Pill>High Detail</Pill>
            </p>
          </div>

          <VWImage src="/vw/feature_worlds-locations.jpg" alt="Chicago downtown world" className="aspect-[16/7] w-full rounded-xl" />

          <div className="grid gap-4 lg:grid-cols-2">
            <Panel>
              <h2 className="text-sm font-semibold">World Settings</h2>
              <dl className="mt-3 space-y-2 text-sm">
                {[
                  ["World Name", "Chicago – Downtown"],
                  ["Type", "Modern Urban"],
                  ["Time Period", "Present Day"],
                  ["Mood", "Cinematic"],
                  ["Lighting", "Golden Hour"],
                  ["Weather", "Clear"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-2 border-b border-white/5 pb-2">
                    <dt className="text-white/50">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 flex gap-2">
                <button type="button" className="rounded-md bg-violet-500 px-3 py-2 text-xs font-semibold text-white">Save World</button>
                <button type="button" className="flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-xs">
                  <Play className="h-3.5 w-3.5" /> Preview in Scene
                </button>
              </div>
            </Panel>

            <Panel>
              <h2 className="text-sm font-semibold">Environment Controls</h2>
              <div className="mt-3 space-y-3 text-sm">
                {[
                  ["Time of Day", "Golden Hour"],
                  ["Weather", "Clear"],
                  ["Season", "Autumn"],
                  ["Crowd Density", "70%"],
                  ["Traffic Density", "60%"],
                  ["Ambient Sound", "80%"],
                  ["Atmosphere", "City Haze"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-3">
                    <span className="text-white/60">{k}</span>
                    <span className="text-xs">{v}</span>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          <div className="flex flex-wrap gap-2">
            {V3_TABS.map((t) => (
              <span key={t} className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
                {t}
              </span>
            ))}
          </div>

          <section>
            <h2 className="text-sm font-semibold">Asset Library</h2>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
              {ASSETS.map((a) => (
                <div key={a} className="rounded-lg border border-white/10 bg-white/5 p-3 text-center text-xs">
                  <Image className="mx-auto mb-1.5 h-4 w-4 text-violet-300" />
                  {a}
                </div>
              ))}
            </div>
          </section>

          <Panel>
            <h2 className="text-sm font-semibold">Scene References</h2>
            <p className="mt-2 text-sm text-white/50">No scene references in Supabase yet.</p>
          </Panel>

          <Panel>
            <h2 className="text-sm font-semibold">Related Projects</h2>
            {related.length === 0 ? (
              <p className="mt-2 text-sm text-white/50">No projects in Supabase yet.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {related.map((p) => (
                  <li key={p.id}>
                    <Link to="/projects" className="flex items-center justify-between rounded-md bg-white/5 px-3 py-2 text-sm hover:border-violet-400/50">
                      <span>{p.name}</span>
                      <span className="text-xs text-white/50">{p.status ?? ""}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      )}
    </div>
  );
}
