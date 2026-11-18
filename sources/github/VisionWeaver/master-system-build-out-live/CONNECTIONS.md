# Connections — Master System Build Out Live

What connects where, and the credential steps. The app must show true
connection states only — see DECISIONS.md §6.

## Supabase — data home (verified reference, NOT wired)
- **"Master Dashboard"**: production data home, **153 tables**, real data
  (verified via Management API 2026-10-30/11-01; ACTIVE_HEALTHY).
- **"MASTER_CEO_DASHBOARD"**: app-schema holder — page_registry (27 pages),
  projects, release_gates, initiatives, organizations.
- Wiring is a **separate owner-credential step** (INFERRED mechanism: owner
  pastes the Supabase project URL + API key into the app's Connections page;
  the app then reads/writes directly). No Supabase writes without the owner's
  explicit word. Until wired, the app must state the separation on its
  sign-in screen and footer.
- Builder note (verified 2026-10-30): Supabase's MCP endpoint is unusable from
  automated environments (Cloudflare Error 1010, browser_signature_banned);
  the Management API (`api.supabase.com`) with a Personal Access Token is the
  working route. Project API keys do not work for the Management API.

## Vercel — health monitoring (wired, read-only)
- The artifact declares read methods on the Vercel connector (deployments,
  projects) for the live ticker/monitor.
- Verified behavior: projects read LIVE (11 projects); deployments read
  returns the `estibancreations101` scope 403 → monitor reports DEGRADED with
  the verbatim reason. Re-authenticating that scope happens inside Vercel
  itself, not in the app.
- The Vercel projects `master-system-buildout` and `-lzaa` are **stale
  BLOCKED deploys of unrelated docs** (another repo) — not the system.
  Pause/remove only on the owner's explicit call.

## Google Drive / Dropbox — Save Map (mapped, not synced)
- The Save Map & Storage page holds the Dropbox hub / Drive Master Folder map
  verbatim from the 2.0 line, plus a real workspace JSON export.
- Drive: VisionWeaver Hub folder holds the canonical record copy.
- Dropbox: connector not connected as of 2026-11-01 — needs the owner's
  sign-in before realignment.

## GitHub — canonical record (wired)
- `CANONICAL-SYSTEM.md` committed to VisionWeaver repo `main` (2026-11-01),
  declaring the one system (C body + B engine/pages, A design crown).
- The 40 historical loop-engine run manifests live in the VisionWeaver repo;
  their row-by-row import is the pending GitHub step.
