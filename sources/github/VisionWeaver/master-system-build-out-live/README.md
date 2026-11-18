# Master System Build Out Live — Replication Kit

## What this is
The one canonical VisionWeaver working system: a fullstack web app in the dark
16-panel VisionWeaver shell (violet active states, photo-card heroes), 33 pages,
Demo and Blank modes, server-side auth, a live uptime ticker, real health
checks, and the THELMA AI assistant wired propose-only into the Directors
Guild approval queue.

This kit lets the owner replicate the system exactly for different users, in
both Demo and Blank, from the master build prompts in `PROMPTS/`.

## The one-system decision (2026-11-01, owner)
Three lineages were compared page-by-page
(`visionweaver-lineage-comparison-2026-11-01.md`):
- **A — vw3** (`MASTER_CEO_DASHBOARD` repo): the Oct 22 ruled design crown.
  25 pages, real Supabase auth context, live Vercel route, PR #64 open.
- **B — repo 2.0 line** (`VisionWeaver` repo): the engine. Python loop engine +
  40 run manifests, Voice Library / Hold Queue / Save Map / Plans & Tiers as
  full pages, inventor of Demo/Blank. Zero network calls, local-only auth.
- **C — Master fullstack build**: the body. 27 pages, real sign-in, real
  ticker, honest health checks, verified Demo/Blank, D1–D16, working THELMA.
  Own local database, NOT the Supabase data home.

Decision: **C as the body, B's engine and missing pages folded in, under A's
design crown.** Canonical record: `CANONICAL-SYSTEM.md` on the VisionWeaver
repo `main` branch (+ copy in the Drive VisionWeaver Hub folder).

## The 33-page map
**Core 10:** Home · Vision Builder · Strategic Planner · Initiatives ·
Programs & Projects · AI Co-Pilot · CMI · Directors Guild · Teams · C-Suite

**Create / Production 10:** Create & Produce · Book Creation · Avatar
Engineering · Worlds & Locations · Design Studio · Design & Commercial ·
Scene & Production · Media Library · Post Production · Distribution & Growth

**Govern 7:** Quality & Audit · Finance & Accounting · IT & Security ·
Resources · Assets & Knowledge · Reports & Insights · Settings

**Folded in from B (6):** Characters / Cast (bundle builder with lock chain) ·
Voice Library (locked voices + candidates) · Hold Queue (Cast → Voice →
Animate → Assemble → Publish) · Loop Engine & Run Manifests (Python engine
stages + three hard gates + manifest registry) · Save Map & Storage (Dropbox
hub / Drive Master Folder map + workspace JSON export) · Plans & Tiers
(Starter / Studio / Pro / Flagship, saved working-tier pick)

## Demo vs Blank
- **Demo:** full sample set. Every figure is labeled **Sample**. Demo cast
  members labeled SAMPLE (e.g. Grand, Marcus, Secretary).
- **Blank:** zero figures, no demo data. Same 33 pages, same structure, same
  gates — nothing sample leaks in.

## Architecture (verified)
- Fullstack: own server + database. Server tables: users, sessions, projects,
  worlds, characters, proposals, gate_decisions, hold_items, loop_runs,
  health_checks, monitor_sessions, activity_log, app_settings.
- Server actions include: signup, sign-in, sign-out, getState, createCharacter,
  setCharacterStatus, createHoldItem, advanceHoldItem, registerLoopRun.
  (20 actions total on the build; the 11 not named here are INFERRED/unknown.)
- 16 Directives D1–D16: versioned master copy under Settings → Directives.
- Health checks run real reads (backend, Vercel projects, Vercel deployments)
  and report **DEGRADED** honestly — never painted green.

## Data home (verified reference — NOT wired)
- Supabase **"Master Dashboard"**: production data home, 153 tables.
- Supabase **"MASTER_CEO_DASHBOARD"**: app-schema holder — page_registry
  (27 pages), projects, release_gates, initiatives.
- Wiring the app to the data home is a separate owner-credential step. The app
  states this on its own sign-in screen and footer.

## How to launch a replica
1. Read `DECISIONS.md`, `DATABASE.md`, `CONNECTIONS.md`, `AI-ASSISTANT.md`.
2. Feed `PROMPTS/deployment-master-prompt-demo.md` (or `-blank.md`) to the
   builder verbatim as the build request.
3. Verify against `TUTORIALS/walkthrough.md` end-to-end before handing over.

## Known issue (user-reported 2026-11-02, RESOLVED same day)
The owner reported that sign-up and sign-in both failed on the live build.
Root cause: the app's own database held zero accounts, so sign-in necessarily
failed with "Email or password did not match" — and the sign-in copy never said
accounts are local to the app. Fixed and verified end-to-end (signup → signin →
browser sign-in → signed-in shell → sign-out → UI create-account). Operator
note: create the account on the Create account tab FIRST; Supabase/Google
passwords do not work here. Verify auth end-to-end on every replica before
delivery. See `ROADMAP.md`.
