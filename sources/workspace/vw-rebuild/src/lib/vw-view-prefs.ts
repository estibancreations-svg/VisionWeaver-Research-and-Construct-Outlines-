import { useCallback, useState } from "react";

// Per-page Visual View preference (V1 / V2 / V3), stored in the browser.
// The owner picks a page's view in Settings -> Visual Views; the page
// remembers it here. No server data, no seed — just the owner's pick.
export type VWView = "v1" | "v2" | "v3";

export function getPageView(page: string, fallback: VWView): VWView {
  try {
    const v = localStorage.getItem(`vw:view:${page}`);
    if (v === "v1" || v === "v2" || v === "v3") return v;
  } catch {
    // storage unavailable — fall through to the default
  }
  return fallback;
}

export function setPageView(page: string, view: VWView): void {
  try {
    localStorage.setItem(`vw:view:${page}`, view);
  } catch {
    // storage unavailable — the view just won't persist
  }
}

export function usePageView(
  page: string,
  fallback: VWView,
): [VWView, (v: VWView) => void] {
  const [view, setViewState] = useState<VWView>(() => getPageView(page, fallback));
  const setView = useCallback(
    (v: VWView) => {
      setPageView(page, v);
      setViewState(v);
    },
    [page],
  );
  return [view, setView];
}

// The 16 VisionWeaver pages and their locked default views, from the
// Complete Navigation Buildout (screenshot 8). V1 = OPTION 1,
// V2 = OPTION 2 (SELECTED), V3 = OPTION 3.
export const VW_PAGE_VIEWS: { page: string; label: string; defaultView: VWView }[] = [
  { page: "home", label: "Home Dashboard", defaultView: "v1" },
  { page: "vision-builder", label: "Vision Builder", defaultView: "v1" },
  { page: "strategic-planner", label: "Strategic Planner", defaultView: "v1" },
  { page: "initiatives", label: "Initiatives", defaultView: "v2" },
  { page: "programs", label: "Programs & Projects", defaultView: "v2" },
  { page: "ai-co-pilot", label: "AI Co-Pilot", defaultView: "v2" },
  { page: "cmi", label: "CMI", defaultView: "v1" },
  { page: "directors-guild", label: "Directors Guild", defaultView: "v2" },
  { page: "teams", label: "Teams & C-Suite", defaultView: "v1" },
  { page: "assets", label: "Assets & Knowledge", defaultView: "v2" },
  { page: "resources", label: "Resources", defaultView: "v2" },
  { page: "it-security", label: "IT & Security", defaultView: "v2" },
  { page: "finance", label: "Finance & Accounting", defaultView: "v1" },
  { page: "reports", label: "Reports & Insights", defaultView: "v1" },
  { page: "settings", label: "Settings", defaultView: "v2" },
  { page: "avatar-engineering", label: "Avatar Engineering", defaultView: "v2" },
  { page: "worlds", label: "Worlds & Locations", defaultView: "v1" },
  { page: "distribution", label: "Distribution & Growth", defaultView: "v2" },
  { page: "ceo-dashboard", label: "CEO Master Dashboard", defaultView: "v1" },
];
