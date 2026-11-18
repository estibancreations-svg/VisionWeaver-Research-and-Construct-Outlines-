import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search,
  Plus,
  Upload,
  Library,
  Folder,
  FileText,
  Share2,
  Users,
  Star,
} from "lucide-react";
import { VWImage } from "@/components/vw/VWImage";
import { VWCard } from "@/components/vw/VWCard";
import { usePageView, type VWView } from "@/lib/vw-view-prefs";
import { Panel, Pill, PageHeader } from "@/components/shell/CommandShell";

export const Route = createFileRoute("/resources")({
  component: Resources,
});

const VIEW_TABS: { id: VWView; label: string }[] = [
  { id: "v1", label: "V1 Resource Library Grid" },
  { id: "v2", label: "V2 Advanced Search" },
  { id: "v3", label: "V3 Collections & Collaboration" },
];

const CATEGORY_TILES = [
  { name: "People & Characters", image: "/vw/feature_avatar-engineering.jpg" },
  { name: "Locations", image: "/vw/feature_worlds-locations.jpg" },
  { name: "Props & Objects", image: "/vw/feature_design-commercial.jpg" },
  { name: "Environments", image: "/vw/feature_worlds-locations.jpg" },
  { name: "Templates", image: "/vw/feature_create-produce.jpg" },
  { name: "Tools", image: "/vw/feature_resources.jpg" },
];

const FEATURED = [
  "Urban People",
  "World Locations",
  "Props & Objects",
  "Interior Sets",
  "Nature & Landscapes",
  "Vehicles & Transport",
  "Animals & Wildlife",
  "Food & Products",
];

const RESOURCE_CATEGORIES = [
  "Characters",
  "Locations",
  "Props & Objects",
  "Environments",
  "Vehicles",
  "Animals",
  "Food & Products",
  "Templates",
];

const TYPE_CHIPS = ["All Types", "Characters", "Locations", "Props", "Environments", "Templates", "Tools"];

const SAVED_SEARCHES = ["Chicago Locations", "Urban Characters", "Interior Sets", "Educational"];

const MY_COLLECTIONS = [
  { name: "Crossroads Ep 1", image: "/vw/feature_create-produce.jpg" },
  { name: "Children's Series", image: "/vw/feature_design-commercial.jpg" },
  { name: "Commercial Ads", image: "/vw/feature_distribution-growth.jpg" },
  { name: "World Locations", image: "/vw/feature_worlds-locations.jpg" },
];

const TEAM_COLLECTIONS = ["Characters", "Environments", "Props & Objects", "Templates"];

const COLLABORATORS = ["The Architect", "Editor", "Sound Designer", "AI Co-Pilot"];

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

function Resources() {
  const [view, setView] = usePageView("resources", "v2");

  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Resources" subtitle="All the assets, tools, templates, and references you need." />
      <ViewSwitcher view={view} setView={setView} />

      {view === "v1" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Resources</h1>
            <p className="mt-1 text-sm text-white/60">
              All the assets, tools, templates, and references you need.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Overview", "Asset Libraries", "Tools & Integrations", "Templates", "Marketplace"].map((t) => (
              <span key={t} className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
                {t}
              </span>
            ))}
          </div>

          <section>
            <h2 className="text-sm font-semibold">Browse by Category</h2>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {CATEGORY_TILES.map((c) => (
                <VWCard key={c.name} image={c.image} icon={Library} title={c.name} desc="Browse the library" to="/resources" />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-semibold">Featured Resources</h2>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {FEATURED.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setView("v2")}
                  className="overflow-hidden rounded-lg border border-white/10 bg-white/5 text-left hover:border-violet-400/50"
                >
                  <VWImage src="/vw/feature_resources.jpg" alt={f} className="aspect-[16/9] w-full" />
                  <div className="p-3">
                    <p className="text-sm font-semibold">{f}</p>
                    <p className="mt-0.5 text-xs text-violet-300">Browse →</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-semibold">Resource Categories</h2>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {RESOURCE_CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setView("v2")}
                  className="rounded-lg border border-white/10 bg-white/5 p-4 text-left text-sm hover:border-violet-400/50"
                >
                  {c}
                </button>
              ))}
            </div>
          </section>

          <Panel>
            <h2 className="text-sm font-semibold">Quick Actions</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" className="flex items-center gap-1.5 rounded-md bg-violet-500 px-3 py-2 text-xs font-semibold text-white">
                <Upload className="h-3.5 w-3.5" /> Upload Asset
              </button>
              <button type="button" onClick={() => setView("v2")} className="flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-xs">
                <Search className="h-3.5 w-3.5" /> Browse Library
              </button>
              <button type="button" className="flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-xs">
                <Plus className="h-3.5 w-3.5" /> Generate Assets
              </button>
              <button type="button" className="flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-xs">
                <Upload className="h-3.5 w-3.5" /> Import from URL
              </button>
              <button type="button" className="flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-xs">
                <FileText className="h-3.5 w-3.5" /> Create Template
              </button>
            </div>
          </Panel>
        </div>
      )}

      {view === "v2" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Resources</h1>
            <p className="mt-1 text-sm text-white/60">Search. Filter. Preview. Use.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Search", "Libraries", "Collections", "Templates", "Integrations", "Marketplace"].map((t) => (
              <span key={t} className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <input
              type="search"
              placeholder="Search resources…"
              aria-label="Search resources"
              className="min-w-0 flex-1 rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm"
            />
            <button type="button" className="flex items-center gap-1.5 rounded-md bg-violet-500 px-4 py-2 text-xs font-semibold text-white">
              <Search className="h-3.5 w-3.5" /> Search
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {TYPE_CHIPS.map((c) => (
              <span key={c} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs">
                {c}
              </span>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <Panel>
              <h2 className="text-sm font-semibold">Filters</h2>
              <div className="mt-3 space-y-3">
                {["Asset Type", "Style", "Country / Region", "Environment Type", "License Type", "File Type", "Date Added"].map((f) => (
                  <label key={f} className="block text-xs text-white/60">
                    {f}
                    <select className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-2 py-2 text-sm text-white">
                      <option>All</option>
                    </select>
                  </label>
                ))}
              </div>
              <button type="button" className="mt-4 rounded-md bg-violet-500 px-3 py-2 text-xs font-semibold text-white">
                Apply Filters
              </button>
            </Panel>

            <Panel className="lg:col-span-2">
              <h2 className="text-sm font-semibold">Results</h2>
              <p className="mt-3 text-sm text-white/50">
                No indexed assets in Supabase yet — connect an asset library to search.
              </p>
              <div className="mt-6">
                <h3 className="text-xs font-semibold tracking-widest text-white/50">SAVED SEARCHES</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {SAVED_SEARCHES.map((s) => (
                    <span key={s} className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs">
                      <Star className="h-3 w-3 text-amber-300" /> {s}
                    </span>
                  ))}
                </div>
              </div>
            </Panel>
          </div>
        </div>
      )}

      {view === "v3" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Resources</h1>
            <p className="mt-1 text-sm text-white/60">Organize. Collaborate. Build Collections.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Collections", "Tags", "Metadata", "Team Library", "Integrations", "Marketplace"].map((t) => (
              <span key={t} className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
                {t}
              </span>
            ))}
          </div>

          <section>
            <h2 className="text-sm font-semibold">My Collections</h2>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {MY_COLLECTIONS.map((c) => (
                <button key={c.name} type="button" className="overflow-hidden rounded-lg border border-white/10 bg-white/5 text-left hover:border-violet-400/50">
                  <VWImage src={c.image} alt={c.name} className="aspect-[16/9] w-full" />
                  <div className="flex items-center gap-2 p-3">
                    <Folder className="h-4 w-4 text-violet-300" />
                    <p className="text-sm font-semibold">{c.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-semibold">Team Collections</h2>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {TEAM_COLLECTIONS.map((c) => (
                <div key={c} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-4 text-sm">
                  <Users className="h-4 w-4 text-violet-300" /> {c}
                </div>
              ))}
            </div>
          </section>

          <Panel>
            <h2 className="text-sm font-semibold">Recent Assets</h2>
            <p className="mt-2 text-sm text-white/50">No recent assets in Supabase yet.</p>
          </Panel>

          <Panel>
            <h2 className="text-sm font-semibold">Asset Details</h2>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <VWImage src="/vw/feature_worlds-locations.jpg" alt="Chicago Downtown" className="aspect-[16/9] w-full rounded-lg" />
              <div>
                <p className="text-lg font-bold">Chicago Downtown</p>
                <p className="mt-1 flex flex-wrap gap-2 text-xs text-white/60">
                  <Pill>Location – Urban</Pill> <Pill>4K</Pill>
                </p>
                <p className="mt-2 flex flex-wrap gap-1.5 text-xs">
                  {["City", "USA", "Urban", "Street"].map((t) => (
                    <span key={t} className="rounded bg-white/10 px-2 py-0.5">{t}</span>
                  ))}
                </p>
                <p className="mt-3 text-sm text-white/70">
                  Modern Chicago downtown with realistic lighting, pedestrians, vehicles, and signage.
                  Ideal for urban scenes.
                </p>
                <div className="mt-4 flex gap-2">
                  <button type="button" className="rounded-md bg-violet-500 px-3 py-2 text-xs font-semibold text-white">Use Asset</button>
                  <button type="button" className="rounded-md border border-white/15 px-3 py-2 text-xs">Add to Collection</button>
                </div>
              </div>
            </div>
          </Panel>

          <Panel>
            <h2 className="text-sm font-semibold">Collaboration</h2>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {COLLABORATORS.map((c) => (
                <span key={c} className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs">
                  <Users className="h-3 w-3 text-violet-300" /> {c}
                </span>
              ))}
              <button type="button" className="flex items-center gap-1.5 rounded-full bg-violet-500 px-3 py-1.5 text-xs font-semibold text-white">
                <Share2 className="h-3 w-3" /> Share
              </button>
            </div>
          </Panel>
        </div>
      )}
    </div>
  );
}
