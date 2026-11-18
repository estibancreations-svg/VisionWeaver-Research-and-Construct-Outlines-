import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "T.H.E.L.M.A. CRM Complete",
    short_name: "THELMA CRM",
    description: "Run every client sub-account from one private CRM.",
    start_url: "/home",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#e6e5e9",
    theme_color: "#e6e5e9",
    categories: ["business", "productivity"],
    icons: [
      { src: "/pwa-icon/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/pwa-icon/512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/pwa-icon/maskable", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/icons/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
    shortcuts: [
      { name: "Sub-accounts", url: "/home", icons: [{ src: "/pwa-icon/192", sizes: "192x192" }] },
    ],
  };
}
