# Deployment Master Prompt — DEMO system

Build this fullstack web app EXACTLY as specified. Do not reinterpret the
design. Every behavior below was verified on the reference build; reproduce
it, then prove each claim in the running app before reporting it works.

## Identity
"Master System Build Out Live" — the one canonical VisionWeaver working
system (C body + B engine/pages, A design crown). Dark 16-panel VisionWeaver
shell: deep navy cinematic surfaces, violet active states, photo-card heroes,
human faces where panels show people. No version tags on page heroes.

## The 33 pages
Core 10: Home, Vision Builder, Strategic Planner, Initiatives,
Programs & Projects, AI Co-Pilot, CMI, Directors Guild, Teams, C-Suite.
Create/Production 10: Create & Produce, Book Creation, Avatar Engineering,
Worlds & Locations, Design Studio, Design & Commercial, Scene & Production,
Media Library, Post Production, Distribution & Growth.
Govern 7: Quality & Audit, Finance & Accounting, IT & Security, Resources,
Assets & Knowledge, Reports & Insights, Settings.
Folded in 6: Characters / Cast (bundle builder with lock chain), Voice
Library (locked voices + candidates), Hold Queue (Cast → Voice → Animate →
Assemble → Publish), Loop Engine & Run Manifests (Python engine stages +
three hard gates + manifest registry), Save Map & Storage (Dropbox hub /
Drive Master Folder map + workspace JSON export), Plans & Tiers
(Starter/Studio/Pro/Flagship with saved working-tier pick).

## Demo sample-data contract
- Full sample set. EVERY figure labeled **Sample**. Demo cast labeled SAMPLE.
- Home: pipeline counts, featured projects, module cards — all Sample.
- Blank toggle exists; Demo is the default with the sample set loaded.

## Directives
16 Directives D1–D16, versioned master copy under Settings → Directives.

## Auth (server-side)
Signup, sign-in, sign-out with server sessions. Sign-out ends the session
server-side and returns to the sign-in screen. Sign-in screen states: local
accounts live in this app's own database — separate from Supabase and Vercel.

## Monitor: ticker + health checks
- Uptime ticker counts from the real sign-in time, re-synced by 15s
  heartbeats against the server-recorded monitor start.
- Health checks run REAL reads: backend (DB roundtrip), Vercel projects,
  Vercel deployments. Report LIVE or DEGRADED with reason + timestamp.
  NEVER paint green: a failed check (e.g. a scope 403) shows DEGRADED with
  the verbatim reason.
- No static "Online" dots. No fabricated activity entries.

## THELMA (propose-only) + gates
- THELMA drawer: propose only. Proposals land in the Directors Guild queue;
  approvals (PENDING → APPROVED) persist. Nothing publishes without approval.
- Gate 2: blocks any publish unless the literal word APPROVED is entered;
  record the attempt either way.

## Database + actions
Tables: users, sessions, projects, worlds, characters, proposals,
gate_decisions, hold_items, loop_runs, health_checks, monitor_sessions,
activity_log, app_settings.
Actions: signup, sign-in, sign-out, getState, createCharacter,
setCharacterStatus, createHoldItem, advanceHoldItem, registerLoopRun
(+ the remaining page actions you derive — keep every action server-side,
every write persisted, every read fresh).

## Visual Views
Settings → Visual Views offers V1/V2/V3 per page. Picking one must GENUINELY
recompose the page layout (verified: Worlds V1/V2/V3). A recorded pick that
only changes badge text is a defect.

## Acceptance
Drive every page live: sign up, watch the ticker, save a world, create and
lock a character, file a THELMA proposal and approve it in the Guild queue,
advance a hold card through all five stages, register a loop manifest,
attempt a publish without APPROVED (must block), then with it (must record),
export the workspace JSON, switch to Blank (zero Sample labels), sign out.
Zero console errors, zero broken assets, mobile no-overflow.
