# C-Suite Command — Full System Check (QA Report)

**App:** https://csuite-command.vercel.app
**Date:** Tuesday, November 10, 2026, 08:13–08:17 CST
**Deployment tested:** 3i3cAguBLG4GSwDgqxdRHF5em5fb (commit a27dff3, READY)
**Method:** Read-only browser pass. All 27 left-nav routes, all 9 System Registry detail pages, Universal Search, the Launch dialog, system-page search/filters, and edit dialogs (opened and closed WITHOUT saving). No data was created, edited, deleted, or submitted. No sign-in code was requested or entered.

## Overall verdict

No page went blank, no page errored, and no visible or console error or broken image was seen on any in-app route. The app is fully navigable on seed/demo data. One data-inconsistency bug affects 5 systems, search results do not deep-link, and Training / Reference Library / C-Suite cards have no way to open their items (see Broken and Missing below).

**Seed-data context (not bugs):** Every page carries "Staged workspace · Sample records · Saved on this browser · External systems unverified". All 19 connectors and all 4 runtimes are UNVERIFIED, with sample latencies (e.g. n8n Self-Hosted 21 ms). Empty in seed: Telecommunications, IAM Self Help and Personal Assessment work queues (0 records), GrantOS memory (0 records), Decision Queue "authorized" filter (0).

## Auth / login

**Working — but no login gate exists.** The app opens straight to the CEO home page with no sign-in button, no account menu, and no Google/Apple/Microsoft buttons anywhere in the nav, top bar, or Settings. Probing /login returns a clean in-app 404 ("Unknown route", with a working "Go home" link). No authenticator/code step was encountered. This is a missing-auth finding, not a crash.

## Per-page checklist

| Page | Status | Notes |
|---|---|---|
| / (CEO Command Center) | Working | Decisions pending 3, Runway 24.5 mo, 5 decisions in review, 3 ready to advance, 12 blocked; C-Suite signals; Golden Path; T.H.E.L.M.A. status 92%; C-Suite, Today, C-Suite Health, Open Workspace sections; 7 Workspaces, VisionWeaver 96%, LandWeaver 92%. Top search link and Launch button work. |
| /c-suite | Working | 12 executive cards (CEO, CEO AI – Chief of Staff, THELMA, CTO, COO, CMO, CFO, CEO – Integration, CEO Quality & Learning, CEO – Security, IAM – Identity, CEO Legal), each with title, emails, SMS, priorities, signals, resume. Cards are not clickable (see Missing). |
| /decisions (Decision Queue / Golden Path) | Working | 5 decisions (Agne Sol 2: The Friðr, Whispered in the Dark, Ridgeview Parcel – Settlement + 2 more). Tabs Open 5 / Needs verification 2 / Authorized 0 / All 5 switch correctly. Authorize/Advance/Reject buttons present; Advance disabled on some stage-gated cards. Authorize/Advance/Reject NOT clicked (would change data). |
| /thelma (T.H.E.L.M.A.) | Working | 18 agents, 41 workflows, 3 pipelines, 2 signals unresolved; stages Ingest/Verify/Think/Check/ASK/Execute, 6 verification gates, lifecycle rules, Heartbeat check monitoring, guarded launch. No action buttons on page. |
| /grantos | Working | 1 task (TRK-CLAUDE-001), tabs tasks/sessions/memory/launch work; sessions tab 1 session, memory tab 0 records. |
| /marketing (CMGIO / Marketing) | Working | 1 task (Review Q4 Fleet content calendar); search box tested: typing "Fleet" → 0 records, "No matching records." Status filter present. |
| /telecommunications | Working | 0 records in work queue (seed-empty). 1 agent, 2 projects, 1 workflow in the action bar. |
| /iam | Working | 0 records. Roadmap: Roles & delegation, Project IAM, Access registry. |
| /assessment | Working | 0 records. Roadmap: T-Score profiler, Readiness checklist. |
| /systems (System Registry) | Working | 9 systems with readiness: VisionWeaver 96%, LandWeaver 92%, AI Mastery 88%, T.H.E.L.M.A. 84%, GrantOS 78%, Personal Assessment 74%, CMGIO 69%, IAM 62%, Telecommunications 57%. Search box present. All 9 cards open their detail page. |
| /systems/visionweaver, /systems/landweaver, /systems/grantos, /systems/thelma, /systems/cmgio, /systems/telecom, /systems/iam, /systems/assessment, /systems/training | Working | Each renders owner, capability list, readiness, agents/workflows/projects counts, integrations and connected systems; connected-system links work (e.g. VisionWeaver → LandWeaver at /systems/landweaver). Correct slugs are /systems/telecom (not /systems/telecommunications) and /systems/training (not /systems/ai-mastery); guessed URLs for those two return "System not found" — those are not app links, so not counted as broken. |
| /visionweaver | Working | 7 assets (Agne Sol 2: The Friðr, Whispered in the Dark, Oak Learning Loop, Beacon, QTN 101, Suspended in the Dark, Wolfpack). Tabs: Active 7 / Core etc. — Core tab opens Title/premise/draft form; Audio tab switches correctly. Cover image was briefly "pending" on first load, then decoded — transient, not a broken image. Save/Export NOT clicked. |
| /landweaver | Working | 4 assets (Ridgeview, Supervisor's House, Mars Residence, Gibraltar Rocks), 9 stages; Advance button correctly disabled ("Block — Pending verification"). |
| /launcher (Universal Launcher) | Working | Modes Project/Workspace/Session switch correctly; project template list (9 templates), workspace types, session runtimes render; Create button correctly disabled until Name is filled. No item created. |
| /sessions | Working | 3 records. Opened "workshop: [def]" — edit dialog opened with ID, session type, subject and session status, closed with Close without saving. Launch button (top bar) also tested: dialog opens with 9 project templates, Create disabled until Name, closed without creating. |
| /agents (Agent Operations) | Working | 9 records (VW-Director READY, SEC-Runner BLOCKED, plus roles in status dropdown). Opened VW-Director — dialog with ID, role, sort order, status, closed with Close without saving. |
| /tasks | Working | 4 records. Opened "Create system radio catalog" — dialog opened, closed without saving. Complete buttons NOT clicked. |
| /workflows | Working | 9 workflow records (GrantOS OS, FIREBALL, VisionWeaver QC, Dirac Sea 10, LandWeaver Parcel, THELMA: Process Notes, Vortex Parse, Santiago Black Priority, Wiki of Winds). Create new workflow / New workflow buttons present, not submitted. |
| /workspaces | Working | 7 cards (JMK Integration 65 docs / 21 files, Golden Path 30/12, THELMA Control 6/9, Command Center 20/5, CMGIO 20/5, LandWeaver 15/13, Research Library 12/6). "Start workspace session" buttons present, NOT clicked (would create a session). |
| /projects | Working | 6 cards (Container Checklist, Ridgeview Parcel – Settlement, Agne Sol 2, Field Guide and track at Test Phase 8, Beacon – Future Part 2, Suspended in the Dark). Pause/Resume/Start review session buttons present, NOT clicked. |
| /runtimes | Working | 4 runtime cards (Self-Hosted ACTIVE SELECTED, Cline, Cloud, Docker), all UNVERIFIED with sample latencies. Card selection NOT clicked (would change staged preference). |
| /connectors (Integrations / Connectors) | Working | 19 records, all UNVERIFIED. Opened "n8n" — dialog with ID, connector kind, status, closed with Close without saving. |
| /memory | Working | 3 records (Golden Path invariants CANONICAL, Mara Non-Canon invariants DRAFT, SC-Neal Color Theory CANONICAL). Opened first item — dialog opened, closed without saving. Download buttons present, not downloaded. |
| /files (Files & Outputs) | Working | 2 records (VisionWeaver spec v1.3.1 [approved], LandWeaver spec v1.1.0 [approved]) with Download/Export/Open buttons; Import file and New file buttons present. |
| /creative-studio | Working | Story Core (Agne Sol 2, images decode) and Parcel Core (Ridgeview) tabs both switch correctly; content duplicates /visionweaver and /landweaver. |
| /settings | Working, but very sparse | Export workspace button TESTED and works: a 39 KB workspace export file downloaded successfully. Compact toggle present, NOT toggled. (See Missing.) |
| /health (Health & Audit) | Working | System Health 84% Sample; 1 critical, 3 warnings, 1 migration pending, 7 signals, 2 audit entries (incl. "Creation Core saved 11/10/2026, 8:13:57 AM" and "Staged workspace initialized"). System Health 84% / Agent Health 91% / Integration Health 72%. Acknowledge buttons NOT clicked. |
| /training | Working as a display page | 6 tracks (Skills Progression 6 modules, CCO Onboarding 5, Domain Bootcamps 4, Integration Skills 3, Failure Inoculation 8, Communication 2) and 5 recent materials, all static. Items not openable (see Missing). |
| /library (Reference Library) | Working as a display page | 8 cards (VisionWeaver, LandWeaver, THELMA, GrantOS, Skills, Training, Deployment, QTN) with counts and dates, no links. Items not openable (see Missing). |
| /search (Universal Search) | Working | "92 results indexed". Typed "Ridgeview" → filtered to 4 results (Project Ridgeview Parcel – Settlement, Workspace Golden Path, Memory Golden Path invariants, File LandWeaver spec v1.1.0). Section filters and nav-bar search present. BUT clicking the Ridgeview project result goes to /projects (the list), not to the specific project — see Broken #2. |
| 404 handling | Working | /login and /golden-path both render a clean in-app "Unknown route" 404 with a working "Go home" link and full navigation. "Golden Path" is only a label for /decisions, not a route. |

## Broken items (verified)

1. **Agent/workflow counts disagree between system overview pages and the Registry/detail pages, under the same labels.** VisionWeaver: overview /visionweaver says 5 agents / 3 workflows vs Registry/detail 14 / 22. LandWeaver: overview /landweaver 1 agent / 4 workflows vs detail 9 / 14. Marketing: overview 1 agent / 1 workflow vs detail 8 / 17. GrantOS: overview 4 agents / 1 workflow vs detail 6 / 11. Telecommunications: overview 4 agents / 2 workflows vs detail 3 / 5. (T.H.E.L.M.A. 18/41, IAM 4/9 and Personal Assessment 2/4 matched, so the mismatch is not universal.)
2. **Universal Search results do not deep-link.** The Ridgeview (project) result opens /projects, the section list, not the Ridgeview project itself. Other result types link to their section index the same way.

## Missing items (present as labels/cards, no functioning destination or control)

1. **No sign-in / authentication at all.** No login gate, no sign-in button or route, no Google/Apple/Microsoft SSO buttons, no account/profile area — the whole app is open to anyone with the URL. (/login is a 404.)
2. **Training:** the 6 training tracks and 5 recent materials have no link or button — no module, drill, or lesson can be opened.
3. **Reference Library:** the 8 library cards have no link or button — no document can be opened or read.
4. **C-Suite:** the 12 executive cards have no link or button — no executive detail page exists.
5. **Workspaces/Projects:** workspace cards show doc/file counts but have no link to open the workspace contents; projects have no detail page (confirmed by search landing on the list, not the project).
6. **Settings:** only a Compact toggle and Export workspace exist — no profile, no authentication/Supabase connection settings, no notifications, appearance, or workspace preferences, despite the app advertising a Supabase-backed system that is "not connected yet".
7. **No live data behind the displays.** All connectors/runtimes UNVERIFIED, and the Telecommunications, IAM and Personal Assessment work queues are empty in seed data — expected given the unconnected database, recorded here as missing content rather than as a bug.

## Not tested (deliberately, per read-only instruction — not broken)

Decision Queue Authorize/Advance/Reject; Tasks Complete; Agents/Projects Pause/Resume; Health Acknowledge; any Save/Create/Start-session button (Launcher Create, New task, New file, New workflow, Start workspace session, Start review session); runtime-card selection; Settings Compact toggle; Memory/Files Download buttons (except Settings Export, which was tested and worked).

No changes were made to the app: every dialog opened was closed with Close without saving, and no form was submitted.
