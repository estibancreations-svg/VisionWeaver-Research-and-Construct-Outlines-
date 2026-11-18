# Gate 0 — What It Is and What Closes It

**Date:** November 10, 2026

## What Gate 0 is

Gate 0 is the **entry gate**. It is the check that says: *we have all the foundation pieces in hand before we start building Phase 1.*

It closes when five items — **M1 through M5** — are provided and verified. The rule (from the 2026-11-09 review, Report 2) is: **no code / deploy / modify until M1–M5 are provided; then Phase 1 starts** (schema migration + environment verification).

Once Gate 0 closes, Phase 1 starts:
- Verify the Supabase connection live (ref `azoqszhhmmkyqztubgem`).
- Apply the `vw_` schema via migration.
- Register existing properties.
- Seed the open-decisions register.

## Status: 2 done, 3 open

| Item | What it is | Status |
|---|---|---|
| **M1** | Drive file — Fireside archive | **HAVE** — "Fireside — Runway Archive, Pivot to Upload Testing (2026-11-09).md", Drive file id `1k4oww6h0Tfle6Q-WUtHBEIJtu7fRVt4Z`, in VisionWeaver Hub folder `19qjRX0v7RS585hNgjZ2_OSKroYQEGbD2`. |
| **M2** | Prime config.js — Supabase ref | **RECOVERED** — Supabase ref `azoqszhhmmkyqztubgem` (from Prime repo `config.js`). |
| **M3** | C env file / Supabase wiring | **MISSING** — see below. |
| **M4** | BOY-001 RAIN v02 bundle | **PARTIAL** — see below. |
| **M5** | C/B/A commit + deployment SHAs | **OBSERVED — needs your confirmation** — see below. |

## What is needed to close Gate 0

### M3 — Supabase connection for the live app (MISSING)

**What it is:** The four environment values the live app (csuite-command) needs to read live data from Supabase instead of sample/seed data.

**What you need to give me:**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

**Where they come from:** The Lovable project's `.env` file, or the Supabase dashboard for project `azoqszhhmmkyqztubgem`. (The service-role key must never go in the repo or chat logs — it goes straight into Vercel → `csuite-command` → Settings → Environment Variables.)

**What I will do once I have them:** Set the 4 vars in Vercel, redeploy, and verify the app reads live data.

### M4 — BOY-001 RAIN v02 bundle (PARTIAL)

**What it is:** The assembled BOY-001 character bundle — per-cell manifest, hashes, save/reload trace, provider receipt, and QC decision.

**What we already have (in the VisionWeaver repo):**
- Character ID `f4ef5fec-d0ad-4d71-a25a-cc6614eade7b`
- Project ID `0d03dfb3-494d-4c8d-8cf6-2c53343cf065`
- Completed generation ID `3b49444e-85de-4fe8-b7b1-31e36fc10c56`
- Phase 2 activation evidence `docs/evidence/PHASE-2-AVATAR-ACTIVATION-2026-10-08.md`
- Corrected master board task

**What is still needed:** The assembled bundle itself, which needs a **live Supabase export**. Coverage set is **QC_PENDING, 0/32 completed slots**. The bundle cannot be assembled until the Supabase data is exported live.

### M5 — Confirm the canonical C/B/A commits and deployments (NEEDS YOUR CONFIRMATION)

**What it is:** Your confirmation that the commits and deployments we have are the canonical ones for each layer.

**What I observed (verified 2026-11-10):**

| Layer | Repo | Latest commit (main) | Deployment |
|---|---|---|---|
| **C — Fullstack Master (live app)** | `estibancreations-svg/csuite-command` | `a27dff34525b` — "Fix @radix-ui/react-tooltip to ^1.4.1" (2026-11-10 14:01 UTC) | Vercel `csuite-command`, deployment `3i3cAguB`, **READY**, https://csuite-command.vercel.app |
| **A — vw3 (design crown)** | `estibancreations-svg/MASTER_CEO_DASHBOARD` | `2e2cf9b8edb4` — "Trigger fresh production deploy" (2026-11-10 07:23 UTC) | Vercel `master-ceo-dashboard`, **READY**, https://master-ceo-dashboard.vercel.app |
| **B — VisionWeaver 2.0 (engine)** | `estibancreations-svg/VisionWeaver` | `5a651794dde5` — "Commit the 2026-11-09 review package" (2026-11-10 05:37 UTC) | (2.0 file, local) |
| **Prime (retired)** | `estibancreations-svg/VisionWeaver-Prime` | `8302cf28a722` — "Trigger fresh production deploy" (2026-11-10 07:23 UTC) | Vercel `visionweaver-prime`, **READY** (historical) |

**What you need to do:** Confirm "yes, these are the canonical ones" — or tell me which different SHAs are canonical.

## The short version

**To close Gate 0, you need to give me three things:**
1. **M3** — The 4 Supabase env values (from Lovable `.env` or Supabase dashboard).
2. **M4** — The BOY-001 bundle export (needs a live Supabase export).
3. **M5** — "Yes, those commits/deployments are the canonical ones" (or the correct ones).

Once those three land, Gate 0 closes and Phase 1 starts. Nothing else is blocking Gate 0 — M1 and M2 are already done.
