# C-Suite Command — Phase E BUTTON INVENTORY (code inventory at HEAD)

**Scope:** every interactive control in `estibancreations-svg/csuite-command` at HEAD commit `0a6e630` (post-restructure, 2026-11-11). Read-only: source fetched via GitHub MCP `get_file_contents` at that ref; nothing committed, nothing written to GitHub or Supabase. Every route file, every shell/platform component, and the data layer were read in full; controls were enumerated from the code (handlers, links, inputs, selects, tabs), not from screenshots.

**Companion docs:** the click-through QA report (`CSUITE_CLICK_THROUGH_QA_2026-11-11.md`, tested pre-restructure at commit `c9063a6` — old paths mapped to new `/visionweaver/*` paths in §10), the fix plan (`CSUITE_FIX_PLAN_ALL_BUTTONS_2026-11-11.md` §4), the Phase D draft (`CSUITE_TABLE_LIST_DRAFT_2026-11-11.md` — table + server-route names used in the "Needs" column), and the real plan (`CSUITE_FINDINGS_AND_REAL_PLAN_2026-11-11.md`, Phase E).

## Global findings (read this first — they explain most of the table)

1. **The only Supabase write in the entire codebase is `updateProjectStatus`** (`src/lib/supabase-data.ts` — a direct client `.update()` on `projects`). It runs as `anon`, which has SELECT-only grants, so it will fail under RLS; the Projects page shows an honest error when it does. There is no `src/routes/api/` directory, no `fetch()` call, and no other `.insert()/.update()/.delete()/.upsert()` anywhere.
2. **All "save" controls in the legacy/platform surfaces write to browser localStorage only.** `PlatformProvider` persists `PlatformState` to localStorage key `estiban-command-state-v1`. Every `dispatch()` (EntityWorkbench saves, Decisions actions, Launcher creates, CreationWorkspace edits, Runtime selection, Health acknowledge/resolve, Compact toggle) touches localStorage and never Supabase. Status for these: **LOCAL-ONLY**.
3. **Search never reads Supabase.** `searchEntities` (`src/lib/platform-model.ts`) scans the local seed state only. Empty query returns all **92** seed records (9 systems + 8 officers + 7 workspaces + 6 projects + 5 decisions + 9 agents + 3 sessions + 4 tasks + 3 memory + 2 files + 9 workflows + 19 connectors + 8 library = 92 — exact match to the QA report). "Crossroads" returns 0 because no seed record contains it; the Supabase projects are never searched. Results link to list pages only (no deep-linking, no detail pages exist except `/systems/$systemId`).
4. **V1/V2/V3 view switching is real on only 3 pages** (Worlds, Resources, Distribution — 3 distinct layouts each). On 5 pages it switches between only 2 distinct layouts (V1 vs V2/V3, or V2 vs V1/V3). On 8 pages the switch is highlight-only: the `view` variable is never read in the render, so the buttons persist a localStorage preference that nothing on the page uses. The VisionWeaver home and Health have no view switch at all. All preferences are localStorage-only (`vw:view:<page>`); `view_preferences` in Supabase is never read or written.
5. **No detail pages exist** except `/systems/$systemId` (seed data). Every "open this item" link in the app goes to a list page (`/projects`, `/c-suite`, `/visionweaver/files`, etc.).
6. **Pages that read NO live Supabase data at all:** AI Co-Pilot, Resources, Distribution, Finance, Health, C-Suite, Library, Training, THELMA, Runtimes, Systems, Systems detail, Workspaces, Decisions, Search, Notebook, Creative Studio, and all EntityWorkbench/SystemOperations pages. Pages that read live data: CEO Dashboard, VisionWeaver home, Vision Builder (records), Strategic Planner (initiatives), Initiatives, Programs (projects), CMI, Directors Guild, Teams (organizations), Assets (records), Avatar Engineering (records), Worlds (projects only), Settings (organizations), IT & Security, Reports, Projects.
7. **Hardcoded display values with no data source:** THELMA stats (41 / 184 / 212 / 41), CEO "System Uptime 99.9%", CEO Pending badge "3", Avatar profile "Marcus Reynolds", Worlds/Distribution/Resources featured lists and categories, C-Suite/Library/Training content (seed `command-data.ts`).

## Status definitions

| Status | Meaning |
|---|---|
| WORKING | Does its intended job fully (correct navigation, working filter/tab/input, working local download). |
| NAV-ONLY | Navigates, but to a generic/wrong target (list instead of detail, self-link, duplicate target, mislabeled icon). The click works; the destination is the gap. |
| PARTIAL | Does something visible but not the full intended job (a view switch with only 2 distinct layouts; a mode pill that only highlights). |
| PLACEHOLDER | A handler exists but only shows a "not wired / not connected" message. No action is performed. |
| DEAD | No handler at all (`<button>` with no `onClick`, uncontrolled input/select with no effect), or a control whose only effect is visual and unsaved. |
| LOCAL-ONLY | Works, but reads/writes browser localStorage only — never Supabase. Works as built; not "wired" per the plan. |
| BROKEN-WRITE | Handler calls Supabase directly as `anon`; will fail under RLS (honest error shown). Needs a server route. |

---

## Summary counts (470 inventory entries)

One entry = one control, or one repeated per-row/per-item pattern (noted with ×N). Fixed controls are counted individually.

| Status | Count | Where concentrated |
|---|---|---|
| WORKING | 266 | Sidebar/top-bar nav (41), Settings Visual Views rows (57), view switches on Worlds/Resources/Distribution, filters, tabs, search/filter inputs on Assets + EntityWorkbench, all list navigation that lands on the right page |
| NAV-ONLY | 34 | CEO C-Suite cards (10) + system cards (5), VW home Featured/Open Project (7), mislabeled top-bar icons (4), CEO Pending/View-Pending/New-Project links, search result links, Programs project links |
| PARTIAL | 23 | View switches with only 2 distinct layouts (15 buttons on 5 pages), Vision Builder mode pills + cards (8) |
| PLACEHOLDER | 19 | AI Co-Pilot Ask + chips (6), Directors Guild Approve/Request changes (2), Avatar actions (3), Settings color schemes (7), CEO Executive Command self-link (1) |
| DEAD | 90 | Highlight-only view switches (24 buttons on 8 pages), Resources dead buttons/inputs (27), Worlds dead buttons/inputs (16), Distribution dead buttons/inputs (15), CEO checkboxes (5), Finance/IT/Reports view switches (9, included in the 24) |
| LOCAL-ONLY | 37 | EntityWorkbench saves/actions (13), Decisions actions (5), CreationWorkspace writes (10), Runtimes (4), Launcher create (1), Health acknowledge/resolve (1), Compact toggle (1), Projects/Workspaces "start session" (2) |
| BROKEN-WRITE | 1 | Projects Pause/Resume |
| **TOTAL** | **470** | |

### Needs roll-up (a control can carry more than one need)

| Need | Count (entries) | Notes |
|---|---|---|
| Nothing — navigation/state only | ~300 | Includes all WORKING nav + tabs + filters + local-state controls. Some are LOCAL-ONLY by design and need a migration decision, not a table. |
| Phase D table + server route | ~45 | Guild Approve/Request (`records` + `guildApprove`/`guildRequestChanges`), Pause/Resume (`projects` + `projectPause`/`projectResume`), Decision Queue (`decisions` + `decisionSave`/`decisionDecide`), Notebook (`notes` + `noteSave`/`noteDelete`), Pending checkboxes (`pending_items` + `pendingToggle`), C-Suite/Teams (`team_members` + `teamMemberSave`), Training (`training_tracks` + `trackSave`), Library (`library_items` + `librarySave`), Avatar (`avatar_captures` + `avatarCaptureSave`), Worlds save (`saved_worlds` + `worldSave`), Distribution (`content_items` + `contentSave`/`contentPublish`, `analytics` + `analyticsRecord`), Finance (`finance_records` + `financeSave`/`financePost`), Agents config (`agents` + `agentConfigSave`), view prefs (`view_preferences` + `viewPreferenceSave`), New Project create form (`projects` + `projectCreate`) |
| Provider + key + spend (Decisions 5–6) | ~14 | Vision Builder 4 tools, AI Co-Pilot Ask + 6 agents, Avatar Generate Variations, Resources Generate Assets, Distribution AI Suggestions + AI Thumbnails |
| Owner decision (no code can decide it) | ~20 | Executive Command page content (Decision 1), 5 Core System links (Phase H — which systems exist), roster (Decision 4), V1/V2/V3 alternate layouts for 8 highlight-only + 5 two-layout pages, EntityWorkbench/legacy surfaces: migrate to Supabase or keep local, Health incidents source (no table proposed), hardcoded stats (keep/compute/remove), fix-plan controls absent from code (§10) |
| Detail pages (new routes, no table needed beyond existing) | ~12 patterns | Project, officer, track, library-item, location, asset, submission, initiative, decision, workspace, record detail — each needs a route + a server route for its actions |

---

## §1 — App shell (CommandShell, all non-CEO pages) + root (404 / error)

The shell renders the VisionWeaver sidebar + top bar on every page EXCEPT CEO pages (`/` and `/notebook*`, where `isCeoPage` hides both). `UniversalLauncher` is imported in CommandShell but never rendered there.

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| Sidebar nav, 25 main links (Home, ← CEO Dashboard, Vision Builder, Strategic Planner, Initiatives, Programs & Projects, AI Co-Pilot, CMI, Directors Guild, Teams, C-Suite, Create & Produce, Avatar Engineering, Worlds & Locations, Design & Commercial, Media Library, Post Production, Distribution & Growth, Quality & Audit, Finance & Accounting, IT & Security, Resources, Assets & Knowledge, Reports & Insights, Settings) | `<Link to>` each; `onClick` closes mobile menu; active-state via pathname | Working (QA §1: all nav links open real pages) | Same | Nothing |
| Sidebar nav, 10 System links (T.H.E.L.M.A., System Registry, Runtimes, Integrations/Connectors, Telecommunications, Personal Assessment, Training, Universal Launcher, Sessions, Tasks) | `<Link to>` each | Not click-tested (QA §9) | Same | Nothing |
| Sidebar footer: "The Architect / EstibanCreations · System Owner" | `<Link to="/visionweaver/teams">` | Not tested | Should open the signed-in user's profile/account once auth exists (Phase D) | Auth (Decision 7) — currently hardcoded identity, not a real user |
| Sidebar footer: "THELMA AI / Operations Lead" | `<Link to="/visionweaver/ai-co-pilot">` | Not tested | Same (opens AI Co-Pilot) | Nothing (label is aspirational; the target is the unconnected Co-Pilot — see §4) |
| Mobile menu open button (TopBar, md:hidden) | `onClick={() => setMenuOpen(true)}` | Not tested | Same | Nothing |
| Mobile menu close button (X, sidebar header) | `onClick={() => setMenuOpen(false)}` | Not tested | Same | Nothing |
| Mobile overlay click-to-close | `onClick={() => setMenuOpen(false)}` on backdrop div | Not tested | Same | Nothing |
| TopBar search box ("Search VisionWeaver…") | `<Link to="/search">` (a link styled as a search box, not an input) | Working as a link | Same, or a real inline search input | Nothing for the link; real inline search is a design decision |
| TopBar "+ Create" | `<Link to="/visionweaver/vision-builder">` | Working (QA: navigates to Vision Builder) | NAV-ONLY: labeled "Create" but opens Vision Builder, not a create dialog/form | Decision: keep as Vision Builder shortcut (relabel) or build a real Create flow (`projectCreate` route) |
| TopBar Help (?) | `<Link to="/visionweaver/settings">` | Not tested | NAV-ONLY: goes to Settings, not help | Decision: build a help/about destination or relabel |
| TopBar Bell (notifications, static red dot) | `<Link to="/visionweaver/directors-guild">` | Not tested | NAV-ONLY: goes to Directors Guild, not notifications; red dot is a static span, not a live count | Decision: build a notifications surface (needs a table — none proposed; UNKNOWN) or relabel/remove the dot |
| TopBar Avatar "E" (Account) | `<Link to="/visionweaver/settings">` | Working (QA §4: Account → settings) | NAV-ONLY: should open account/sign-in once auth exists | Auth (Decision 7) |
| 404 page: "Go home" | `<Link to="/">` | Working (QA §4: /login 404 shows Go home) | Same | Nothing |
| Error boundary: "Try again" | `onClick`: `router.invalidate(); reset();` | Not tested | Same | Nothing |
| Error boundary: "Go home" | `<a href="/">` | Not tested | Same | Nothing |

## §2 — CEO Dashboard (`/`, src/routes/index.tsx)

Data: live `projects`, `integration_inventory`, `release_gates`, `audit_events`. Pending items + notes + C-Suite roster are hardcoded arrays (`PENDING`, `NOTES`, `CSUITE`); "Core Systems" count = `integrations.length` (18), which is why the strip reads 18, not 6.

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| Top nav: Home | `<Link to="/">` (active state) | Working | Same | Nothing |
| Top nav: Notebook | `<Link to="/notebook">` | FIXED in Phase A+C (was `/assets`); verified live 22:07 | Same | Nothing |
| Top nav: Pending (badge "3", hardcoded) | `<Link to="/visionweaver/directors-guild">` | Not tested as nav | NAV-ONLY: should open a Pending page (`pending_items`) | Phase D `pending_items` + Phase G Pending page; badge should be a live count |
| Top nav: Executive Command | `<Link to="/">` (self-link — no Executive Command page exists) | Not tested | PLACEHOLDER: needs its own page | Decision 1 (page list) + Phase G build |
| Top nav: C-Suite | `<Link to="/c-suite">` | Working | Same | Nothing (roster content is Decision 4) |
| Top nav: System Portfolio | `<Link to="/systems">` | Not tested | Same (Phase G may build a dedicated page) | Decision 1 |
| Top nav: Resource Intelligence | `<Link to="/visionweaver/resources">` | Not tested | Same (or a dedicated CEO page per Decision 1) | Decision 1 |
| Top nav: Ecosystem Intelligence | `<Link to="/visionweaver/cmi">` | Not tested | Same (or dedicated page) | Decision 1 |
| Top nav: Financial Command | `<Link to="/visionweaver/finance">` | Not tested | Same (or dedicated page) | Decision 1 |
| Top nav: IT / Infrastructure | `<Link to="/visionweaver/it-security">` | Not tested | Same (or dedicated page) | Decision 1 |
| Top nav: Security Governance | `<Link to="/visionweaver/it-security">` (same target as IT) | Not tested | NAV-ONLY: duplicates IT target; needs its own page (`security_events`) | Decision 1 + `security_events` table + Phase G |
| Top nav: Quality Audit | `<Link to="/visionweaver/health">` | Working (QA: Recent Activity → health) | Same (or dedicated page) | Decision 1 |
| Top nav: Integration & Systems | `<Link to="/systems">` | Not tested | Same (or dedicated page) | Decision 1 |
| Pending Items: 5 checkboxes | Uncontrolled `<input type="checkbox">`, no `onChange`, no persistence | Working visually only (QA §1: checks/unchecks, restored) | DEAD as a feature: must save to `pending_items` | `pending_items` + `pendingToggle` route |
| Pending Items: "View All →" | `<Link to="/visionweaver/directors-guild">` | Not tested | NAV-ONLY: should open Pending page | Phase G Pending page |
| NOTE PAD: "Open Full Notes →" | `<Link to="/notebook">` | FIXED in Phase A+C (was `/assets`); verified live | Same | Nothing |
| C-Suite: 10 officer cards | Each `<Link to="/c-suite">` (same page, no officer detail) | Working as links (QA: C-Suite card → /c-suite) | NAV-ONLY: each should open that officer's detail | Officer detail page + `team_members` + Decision 4 (roster) |
| C-Suite: "Go to C-Suite →" | `<Link to="/c-suite">` | Working | Same | Nothing |
| Core Systems: VisionWeaver card | `<Link to="/visionweaver">` | Working (verified live 22:07) | Same | Nothing |
| Core Systems: GrantOS / LandWeaver / THELMA / CMGIO / OSIRIS cards (5) | Each `<Link to="/systems">` (generic registry) | Not tested | NAV-ONLY: each should open its own system | Phase H: which systems exist + where (Decision: owner) |
| Core Systems: "View All Systems →" | `<Link to="/systems">` | Not tested | Same | Nothing |
| Key Metrics: "View Details →" | `<Link to="/visionweaver/reports">` | Not tested | Same | Nothing |
| Recent Activity: "View All →" | `<Link to="/visionweaver/health">` | Working | Same | Nothing |
| Recent Activity items | Plain `<li>`, not clickable | Not tested | Should open the related item/event detail (or nothing — display-only is acceptable if decided) | Decision (detail pages) |
| Quick Actions: "New Project" | `<Link to="/projects">` (the list) | Working as a link; QA §2: does NOT open a create form | NAV-ONLY: should open a real Create Project form | `projectCreate` route + create form (Phase E step 8) |
| Quick Actions: "Open Notebook" | `<Link to="/notebook">` | FIXED in Phase A+C; verified live | Same | Nothing |
| Quick Actions: "View Pending" | `<Link to="/visionweaver/directors-guild">` | Not tested | NAV-ONLY: should open Pending page | Phase G Pending page |
| Quick Actions: "System Status" | `<Link to="/visionweaver/health">` | Not tested | Same | Nothing |

## §3 — Notebook (`/notebook`)

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| "← CEO Dashboard" back link | `<Link to="/">` | Verified live 22:07 | Same | Nothing |
| (No other controls exist — honest empty state only) | — | — | Create/edit/delete/search notes, per fix plan Phase 3 | `notes` table + `noteSave`/`noteDelete` routes + full page build (Phase G). Notebook SECTION stays, gold/dark, never the notepad-paper design. |

## §4 — VisionWeaver home (`/visionweaver`, src/routes/visionweaver/index.tsx)

No ViewSwitch on this page. The Settings Visual Views choice for "home" is stored but never read here (see §10: this is why QA's Home V3 test showed no change). Decision Queue reads browser-local `state.decisions` (seed + localStorage), not Supabase.

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| Hero: "Enter VisionWeaver" | `<Link to="/visionweaver/vision-builder">` | Working | Same | Nothing |
| Hero: "View live projects" | `<Link to="/projects">` | Working | Same | Nothing |
| 12 feature cards (Avatar, Worlds, Create, Design, Media, Post, Distribution, Quality, Teams, Finance, IT, Resources) | Each a `VWCard` = `<Link to>` its page | Working (QA §1: cards navigate) | Same | Nothing |
| Featured Projects: 6 project cards | Each `<Link to="/projects">` (the list, not the project) | Working as links; QA §2: no detail page | NAV-ONLY: each should open that project's detail page | Project detail route `/projects/:id` (or `/visionweaver/projects/:id`) |
| Featured Projects: "View All" | `<Link to="/projects">` | Working | Same | Nothing |
| Active Project: "Open Project" | `<Link to="/projects">` (the list) | Working as a link; QA §2: not a detail page | NAV-ONLY: should open the active project's detail | Project detail route |
| Production Pipeline: "View All" | `<Link to="/visionweaver/initiatives">` | Working | Same | Nothing |
| Production Pipeline stage rows | Plain `<li>`, not clickable | Not tested | Should filter/open the Initiatives board by stage (or stay display-only — decision) | Decision |
| System Status: "Open audit" | `<Link to="/visionweaver/health">` | Working | Same | Nothing |
| Recent Activity: "View All" | `<Link to="/visionweaver/health">` | Working | Same | Nothing |
| Recent Activity items | Plain `<li>`, not clickable | Not tested | Should open the related item/event (or stay display-only — decision) | Decision |
| Decision Queue: "Open queue" | `<Link to="/decisions">` | Working | Same | Nothing |
| Decision Queue items (up to 3 shown) | Plain `<li>`, NOT clickable | Dead (QA §2) | Should open the decision detail with Approve/Reject/Advance | `decisions` table + `decisionSave`/`decisionDecide` routes + detail view (Phase E step 4) |

**Controls in the fix-plan §4 inventory that do NOT exist in code at HEAD:** "+ New project" sub-bar button, "Show sample data" toggle, tour banner (Start tour / Not now), home search box. See §10.

## §5 — VisionWeaver pages (alphabetical by route)

### §5.1 AI Co-Pilot (`/visionweaver/ai-co-pilot`) — reads NO live data

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| ViewSwitch V1/V2/V3 | `onClick={() => setView(v)}` (localStorage). Layout: V1 = 3-col grid, V2/V3 = 2-col grid (V2 and V3 identical) | PARTIAL (QA: most switches highlight only) | 3 distinct layouts | Layout decision + build (Phase E step 6) |
| Ask input | Controlled input; typing clears the `asked` flag | Working (input accepts text) | Same, plus submit wiring | AI provider (Decision 6) |
| "Ask" button | `onClick={() => setAsked(true)}` — renders "AI Co-Pilot is not connected in this build." No AI call, no spinner, no error path | Dead as an action (QA §2: "nothing happened" — the message renders below the input; no AI response) | PLACEHOLDER: run the selected agent against the question via an AI API, show the result, log the run | `agents` table + `agentConfigSave` + AI provider/key/spend (Decision 6) + agent logic |
| 5 action chips (Research, Create, Analyze, Automate, Optimize) | `onClick` toggles `chip`; renders "“X” selected — agent actions are not wired in this build." | Dead (QA §2: pill only highlights + message) | PLACEHOLDER: select the agent + run it | Same as Ask |
| 6 agent cards (Research, Content, Video, Compliance, CMGIO, Quality Control) | Static `Panel`s, "Not configured" pill, NO buttons | Not clickable (QA: agents NOT CONFIGURED) | Each should open agent detail/config + a Run action | `agents` table + provider (Decision 6) |

### §5.2 Assets & Knowledge (`/visionweaver/assets`) — live `records`

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| ViewSwitch V1/V2/V3 | `onClick={() => setView(v)}`; `view` is NEVER read in the render | DEAD (highlight-only; preference persists, nothing changes) | 3 distinct layouts | Layout decision + build |
| 8 category tiles (Characters, Locations, Props & Objects, Environments, Templates, Documents, Reference Images, Audio & Voices) | `onClick` toggles `category` filter; list filters client-side | Working (not QA-tested) | Same | Nothing (filter works; note: list is capped at 12 rows, `filtered.slice(0, 12)`) |
| Search input ("Search assets…") | Controlled; filters `records` by name/kind/status client-side | Working (not QA-tested) | Same | Nothing |
| "clear" (category filter) | `onClick={() => setCategory(null)}` | Not tested | Same | Nothing |
| Asset rows (up to 12) | Plain `<li>`, not clickable | Not tested | Should open asset detail | Asset detail route + `records` (kind='asset' — no new table per Phase D draft) |

### §5.3 Avatar Engineering (`/visionweaver/avatar-engineering`) — live `records` (kind='avatar'); profile is hardcoded

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| ViewSwitch V1/V2/V3 | `onClick={() => setView(v)}`; `view` never read | DEAD (highlight-only) | 3 distinct layouts | Layout decision + build |
| 32 angle slots | Plain `<div>`s numbered 1–32, NO `onClick` | Not tested | Each should open capture/detail (upload/capture/approve per angle) | `avatar_captures` table + `avatarCaptureSave` route |
| "Generate Variations" | `onClick={notConnected}` → shows "Avatar capture is not connected in this build." | Not tested | PLACEHOLDER: generate avatar variations | Generation provider (Decision 5) + `avatar_captures` |
| "Save to Library" | Same `notConnected` message | Not tested | PLACEHOLDER: save the avatar/captures to the library | `avatar_captures` + `avatarCaptureSave` (+ `library_items` if library-bound — decision) |
| "Use in Scene" | Same `notConnected` message | Not tested | PLACEHOLDER: place the avatar in a scene/world | `saved_worlds` + scene tooling (Phase E/H decision) |
| Recent Avatars rows | Plain `<li>`, not clickable | Not tested | Should open avatar detail | Avatar detail route (`records` kind='avatar') |

### §5.4 CMI (`/visionweaver/cmi`) — live `projects` + `records`

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| ViewSwitch V1/V2/V3 | `onClick={() => setView(v)}`. Layout: V2 = 1-col, V1/V3 = 2-col (V1 and V3 identical) | PARTIAL | 3 distinct layouts | Layout decision + build |
| Top Content rows (5) | Plain `<li>`, not clickable | Not tested | Should open project/content detail | Project detail route |
| Recent Intelligence rows (6) | Plain `<li>`, not clickable | Not tested | Should open record detail | Record detail route |
| (Engagement Trends / Audience Demographics panels) | Honest empty states, no controls | — | Charts when data exists | `analytics` table + `analyticsRecord` (provider data — Phase H) |

### §5.5 Create & Produce (`/visionweaver/creative-studio`) — CreationWorkspace, browser-local

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| "Story Core" / "Parcel Core" buttons | `onClick={() => setSystem(...)}` — swaps `CreationWorkspace` systemId (visionweaver/landweaver) | Not tested | Same | Nothing |
| (All CreationWorkspace controls) | See §8 | Not tested | See §8 | See §8 |

### §5.6 Design & Commercial (`/visionweaver/marketing`) — SystemOperations for `cmgio`, browser-local

See §7 (SystemOperations). No page-specific controls.

### §5.7 Directors Guild (`/visionweaver/directors-guild`) — live `records` + `release_gates`

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| ViewSwitch V1/V2/V3 | `onClick={() => setView(v)}`; `view` never read | DEAD (highlight-only) | 3 distinct layouts | Layout decision + build |
| 5 filter buttons (All Submissions, Scripts, Storyboards, Images, Final Cut) | `onClick={() => setFilter(f)}`; filters client-side by kind/name substring | Working (not QA-tested) | Same | Nothing |
| "Approve" (per submission row, ×20) | `onClick={() => setNotice("Review actions are not wired to Supabase yet.")}` — message only, no write. Rendered on EVERY row regardless of status (including APPROVED rows) | UNTESTED (QA §3, would modify data); QA flagged Approve-on-APPROVED as suspicious — CONFIRMED in code | PLACEHOLDER: update `records.status` → `approved` via server route; button state must reflect status (hide/disable on APPROVED) | `guildApprove` route + `records` (existing table) + auth/role (Decision 7/8) |
| "Request changes" (per submission row, ×20) | Same `setNotice(...)` message only | UNTESTED (QA §3) | PLACEHOLDER: open a reason/comment dialog, then update `records.status` → `blocked` + note | `guildRequestChanges` route + dialog build |
| Submission rows | Plain `<li>` (name/kind/status only); row itself not clickable | Not tested | Should open submission detail | Submission detail route (`records`) |
| Release Gates rows | Plain `<li>`, not clickable | Not tested | Should open gate detail/evidence | Gate detail (existing `release_gates`; evidence_uri link) |

### §5.8 Distribution & Growth (`/visionweaver/distribution`) — reads NO live data; 3 genuinely distinct views

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| ViewSwitcher: Option 1 / Option 2 / Option 3 | `onClick={() => setView(...)}` — switches 3 distinct renders | Working (view switching verified in QA-era build) | Same | Nothing |
| V1 sub-tabs (Overview, Publish, Campaigns, Analytics, Audience, Monetization) | `<span>`, not interactive | Not tested | Should switch V1 sub-views (or be removed if V1 has no sub-views) | Decision + build |
| V1: "Publish Content" | `<Link to="/visionweaver/distribution">` (self-link) | Not tested | DEAD as an action: should open a publish flow | `content_items` + `contentSave`/`contentPublish` + publish flow build |
| V1: "Schedule Posts" | `<button>` with NO `onClick` | Not tested | DEAD: should open scheduling | `content_items` + `contentPublish` |
| V1: "Create Campaign" | `onClick={() => setView("v2")}` | Working (view jump) | Should open a campaign create form (view jump is a stand-in) | `content_items` + `contentSave` |
| V1: "Boost Content" | NO `onClick` | Not tested | DEAD: boost/promote flow | Provider/API (Phase H decision) + `content_items` |
| V1: "View Analytics" | `onClick={() => setView("v3")}` | Working (view jump) | Same | Nothing |
| V1: "Export Report" | NO `onClick` | Not tested | DEAD: export analytics report | `analytics` table + export build |
| V2 sub-tabs (Content Pipeline, Campaigns, Calendar, Analytics, Audience, Monetization) | `<span>`, not interactive | Not tested | Should switch V2 sub-views | Decision + build |
| V2: Search input ("Search content…") | Uncontrolled input, no state, no handler — typing does nothing | Not tested | DEAD: should filter content items | `content_items` + filter wiring |
| V2: "New Campaign" | NO `onClick` | Not tested | DEAD: campaign create form | `content_items` + `contentSave` |
| V2: Filter chips (All Content, All Platforms, All Statuses) | `<span>`, not interactive | Not tested | Should filter the pipeline | `content_items` + filter wiring |
| V2: Board/List toggle | `<span>`s, not interactive | Not tested | Should switch board/list layout | Layout build |
| V2: Kanban columns (Draft/Scheduled/Published/Performing, hardcoded 0) | Empty-state text only; no cards, no controls | Verified in Nov 11 check (all 0, honest empty state) | Pipeline cards from `content_items`, clickable → detail, drag or status actions | `content_items` + `contentSave`/`contentPublish` |
| V2 Quick Actions: "Add to Pipeline", "Bulk Schedule", "Create Campaign", "AI Suggestions", "Export Plan" (5) | ALL have NO `onClick` | Not tested | DEAD: see individual needs | `content_items` + routes; AI Suggestions needs AI provider (Decision 6) |
| V3 sub-tabs (Analytics, Audience, Content, Growth, Revenue, Reports) | `<span>`, not interactive | Not tested | Should switch V3 sub-views | Decision + build |
| V3: "Generate Analytics Report" | NO `onClick` | Not tested | DEAD: generate report from analytics | `analytics` table |
| V3: "Schedule Content" | NO `onClick` | Not tested | DEAD: scheduling | `content_items` + `contentPublish` |
| V3: "Create Campaign" | `onClick={() => setView("v2")}` | Working (view jump) | Should open campaign create form | `content_items` + `contentSave` |
| V3: "AI Thumbnails" | NO `onClick` | Not tested | DEAD: AI thumbnail generation | AI/image provider (Decisions 5–6) |
| V3: "Export Data" | NO `onClick` | Not tested | DEAD: export analytics data | `analytics` table + export build |

### §5.9 Finance & Accounting (`/visionweaver/finance`) — reads NO live data

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| ViewSwitch V1/V2/V3 | `onClick={() => setView(v)}`; `view` never read | DEAD (highlight-only) | 3 distinct layouts | Layout decision + build |
| "Open GrantOS →" | `<Link to="/grantos">` | Working | Same | Nothing |
| (No transaction/budget controls exist — honest empty states only) | — | — | Add/post transactions, budgets, invoices | `finance_records` + `financeSave`/`financePost` + full page build |

### §5.10 IT & Security (`/visionweaver/it-security`) — live `integration_inventory` + `audit_events`

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| ViewSwitch V1/V2/V3 | `onClick={() => setView(v)}`; `view` never read | DEAD (highlight-only) | 3 distinct layouts | Layout decision + build |
| Integration rows (×18, in two panels) | Plain `<li>`, not clickable | Not tested | Should open integration detail (status, verify action, evidence) | Integration detail + Phase H verification (probe_note/evidence_uri exist on the table) |
| Recent Activity rows | Plain `<li>`, not clickable | Not tested | Should open event detail (or stay display-only — decision) | Decision |

### §5.11 Initiatives (`/visionweaver/initiatives`) — live `initiatives`

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| ViewSwitch V1/V2/V3 | `onClick={() => setView(v)}`. Layout: V1 = list, V2/V3 = kanban board (V2 and V3 identical) | PARTIAL (QA: V2 highlighted, board identical — consistent: V2/V3 are the same board) | 3 distinct layouts | Layout decision + build |
| Initiative cards/rows (×12) | Plain `<li>`, not clickable | Not tested | Should open initiative detail (stage advance, edit) | Initiative detail route (`initiatives` table) + edit route (no route proposed in Phase D draft — UNKNOWN, needs a `initiativeSave`-style route or reuse of `projectUpdate` pattern; flag for Phase D) |

### §5.12 Media Library (`/visionweaver/files`) — EntityWorkbench, browser-local

See §7 (EntityWorkbench, kind="files"). The QA-tested "Open" dialog with editable fields is this component. Seed shows 2 file records (matches QA "2 records").

### §5.13 Post Production (`/visionweaver/workflows`) — EntityWorkbench, browser-local

See §7 (EntityWorkbench, kind="workflows"). 9 seed workflow templates.

### §5.14 Programs & Projects (`/visionweaver/programs`) — live `projects`

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| ViewSwitch V1/V2/V3 | `onClick={() => setView(v)}`. Layout: V1 = grid cards, V2/V3 = list (V2 and V3 identical) | PARTIAL | 3 distinct layouts | Layout decision + build |
| 7 filter buttons (All Projects, Active, Planning, Drafting, Submitted, Funded, Archive) | `onClick={() => setFilter(f)}`; filters client-side by status/stage substring | Working (not QA-tested) | Same | Nothing |
| Project name links (per project) | `<Link to="/projects">` (the list) | Working as links | NAV-ONLY: should open project detail | Project detail route |

### §5.15 Quality & Audit (`/visionweaver/health`) — browser-local seed state ONLY (no Supabase, no ViewSwitch)

Reads `state.incidents` (seed `healthSignals`, 7) and `state.audit` (local audit trail). "Sample Health %" is computed from seed `systems` health values.

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| "Acknowledge" / "Resolve" (per incident) | `onClick={() => dispatch({type:"incident",...})}` — advances status open → acknowledged → resolved; disabled when resolved; writes localStorage only | Not tested | LOCAL-ONLY: works locally. Intended: incidents should come from a real source | UNKNOWN: no table proposed in Phase D draft for incidents. Candidates: `security_events` (security incidents), `audit_events` (business trail), or a new table — owner/Phase D decision |
| Audit trail rows | Plain `<li>`, not clickable | Not tested | Should open event detail (or stay display-only — decision) | Decision. Note: this trail is LOCAL (browser), not the Supabase `audit_events` table — the two are different trails with the same name. |

### §5.16 Reports & Insights (`/visionweaver/reports`) — live `projects` + `page_registry`

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| ViewSwitch V1/V2/V3 | `onClick={() => setView(v)}`; `view` never read | DEAD (highlight-only) | 3 distinct layouts | Layout decision + build |
| Content Performance rows (projects) | Plain `<li>`, not clickable | Not tested | Should open project detail | Project detail route |
| Reports index: 27 page links (`<Link to={r.route}>` from `page_registry`) | Navigate to the route stored in Supabase; old paths work through the redirect stubs | Working via redirects (per Phase C report; individual routes NOT all verified — UNKNOWN) | Same, with registry routes updated to new paths | Supabase write to `page_registry` (Phase H per Phase C report) + verification of all 27 values |
| (No Generate/Export controls exist — honest empty states only) | — | — | Generate/export reports | `analytics` table + report build |

### §5.17 Resources (`/visionweaver/resources`) — reads NO live data; 3 genuinely distinct views; all content hardcoded

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| ViewSwitcher: V1 Resource Library Grid / V2 Advanced Search / V3 Collections & Collaboration | `onClick={() => setView(...)}` — switches 3 distinct renders | Working | Same | Nothing |
| V1 sub-tabs (Overview, Asset Libraries, Tools & Integrations, Templates, Marketplace) | `<span>`, not interactive | Not tested | Should switch V1 sub-views (or be removed) | Decision + build |
| V1: 6 category tiles | `VWCard` with `to="/visionweaver/resources"` (SELF-LINK — reloads the same page) | Not tested | DEAD as navigation: should filter/open the category | Category filtering against `records` (kind='asset') or `library_items` |
| V1: 8 Featured Resource buttons | `onClick={() => setView("v2")}` | Working (view jump) | Should open the featured resource/collection | Resource detail + live data (`records`/`library_items`) |
| V1: 8 Resource Category buttons | `onClick={() => setView("v2")}` | Working (view jump) | Should filter V2 by category | Filter wiring + live data |
| V1 Quick Actions: "Upload Asset" | `<button>` with NO `onClick` | Not tested | DEAD: upload flow | Upload handling + `records` (kind='asset') via server route (no upload route in Phase D draft — UNKNOWN) |
| V1 Quick Actions: "Browse Library" | `onClick={() => setView("v2")}` | Working (view jump) | Same | Nothing |
| V1 Quick Actions: "Generate Assets" | NO `onClick` | Not tested | DEAD: generation flow | Generation provider (Decision 5) |
| V1 Quick Actions: "Import from URL" | NO `onClick` | Not tested | DEAD: import flow | Import handling + server route (UNKNOWN — no route proposed) |
| V1 Quick Actions: "Create Template" | NO `onClick` | Not tested | DEAD: template creation | `library_items` or `records` + `librarySave`-style route |
| V2 sub-tabs (Search, Libraries, Collections, Templates, Integrations, Marketplace) | `<span>`, not interactive | Not tested | Should switch V2 sub-views | Decision + build |
| V2: Search input ("Search resources…") | Uncontrolled input, no state, no handler — typing does nothing | Not tested | DEAD: should search indexed assets | Live asset index (`records` kind='asset') + search wiring |
| V2: "Search" button | NO `onClick` | Not tested | DEAD: run the search | Same as search input |
| V2: 7 Type chips (All Types, Characters, Locations, Props, Environments, Templates, Tools) | `<span>`, not interactive | Not tested | Should filter by type | Filter wiring + live data |
| V2: 7 Filters selects (Asset Type, Style, Country/Region, Environment Type, License Type, File Type, Date Added) | Uncontrolled `<select>` with a single "All" option, no `onChange` | Not tested | DEAD: should filter results | Filter wiring + live data (fields don't exist on `records` — UNKNOWN: needs metadata design) |
| V2: "Apply Filters" | NO `onClick` | Not tested | DEAD: apply the filters | Same as filters |
| V2: Saved Searches (4) | `<span>`, not interactive | Not tested | Should run the saved search | Saved-search storage (UNKNOWN — no table proposed; localStorage or new table) |
| V3 sub-tabs (Collections, Tags, Metadata, Team Library, Integrations, Marketplace) | `<span>`, not interactive | Not tested | Should switch V3 sub-views | Decision + build |
| V3: 4 My Collection buttons | NO `onClick` | Not tested | DEAD: should open the collection | Collections model (UNKNOWN — no table proposed) |
| V3: Team Collections (4) | Plain `<div>`, not interactive | Not tested | Should open the team collection | Same as collections |
| V3: "Use Asset" (Chicago Downtown detail) | NO `onClick` | Not tested | DEAD: use the asset in a scene/project | Scene/project targeting (Phase E/H decision) |
| V3: "Add to Collection" | NO `onClick` | Not tested | DEAD: add to a collection | Collections model (UNKNOWN) |
| V3: "Share" | NO `onClick` | Not tested | DEAD: share/collaboration flow | Sharing model + auth (Decision 7) |

### §5.18 Settings (`/visionweaver/settings`) — live `organizations` (count only)

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| Page ViewSwitch V1/V2/V3 | `onClick={() => setView(v)}`; `view` never read in render | DEAD (highlight-only) | 3 distinct layouts, or remove the switch from Settings | Layout decision + build |
| 6 tabs (Global, Visual Views, Integrations, Security, Team, Notifications) | `onClick={() => setTab(t)}` — switches panels; Integrations/Security/Team/Notifications show "Not configured in this build." | Working (tabs switch) | Same; the 4 "Not configured" tabs need their builds | Integrations tab: `integration_inventory` + Phase H; Security tab: `security_events` + auth; Team tab: `team_members`; Notifications: UNKNOWN (no table proposed) |
| Visual Views: 19 page rows × V1/V2/V3 buttons (57 buttons) | `onClick={() => setView(v)}` per row — persists to localStorage (`vw:view:<page>`); choice is honored ONLY on pages that read `view` (see Global finding 4) | Working (QA §1: highlights + persists; QA's claim it logs to /health audit trail is WRONG — see §10) | Same, plus server persistence once auth exists | `view_preferences` + `viewPreferenceSave` route (Phase D) |
| Color Schemes: 7 swatch buttons (V1 Primary, V2 Option, Cyan, Purple, Magenta, Forest, Slate) | `onClick={() => setColorNote(true)}` — shows "Color schemes are display-only in this build." | Not tested | PLACEHOLDER: should actually switch the theme | Theme system build (decision: which schemes are real; must never include the deleted notepad design) |
| Global tab: "Compact work area" Switch | `onCheckedChange` → `dispatch({type:"settings",compact})` — localStorage; shell tightens padding | Working (QA §1: flips, browser-local) | LOCAL-ONLY: same, plus server persistence once auth exists | `view_preferences` or settings store (Phase D decision) |
| Global tab: "Export workspace" | `onClick` → downloads `estibancreations-workspace.json` (the localStorage state) | Working (QA §1: 39 KB download) | Same | Nothing |

### §5.19 Strategic Planner (`/visionweaver/strategic-planner`) — live `initiatives`

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| ViewSwitch V1/V2/V3 | `onClick={() => setView(v)}`; `view` never read | DEAD (highlight-only) | 3 distinct layouts | Layout decision + build |
| Plans rows (5 hardcoded: Enterprise Growth, Product Launch, Content Series, Marketing Campaign, Platform Expansion) | Plain `<li>`, not clickable; "Progress: —" | Not tested | Should open plan detail with real progress | Plan/progress model (UNKNOWN — no table proposed; may map to `initiatives`/`projects` — decision) |
| Live Initiatives rows (×12) | Plain `<li>`, not clickable | Not tested | Should open initiative detail | Initiative detail route (see §5.11 UNKNOWN) |

### §5.20 Teams & C-Suite (`/visionweaver/teams`) — live `organizations` (count only)

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| ViewSwitch V1/V2/V3 | `onClick={() => setView(v)}`; `view` never read | DEAD (highlight-only) | 3 distinct layouts | Layout decision + build |
| 5 tabs (Team Members, Roles & Access, Departments, Activity, Compensation) | `onClick={() => setTab(t)}` — switches panels; all but Team Members show honest "no data" states | Working (tabs switch) | Same, with live data per tab | `team_members` + `teamMemberSave`; Roles/Departments/Activity/Compensation need models (UNKNOWN — no tables proposed beyond `team_members`/`memberships`) |
| "Go to C-Suite" link | `<Link to="/c-suite">` | Working | Same | Nothing |
| Organizations rows | Plain `<li>`, not clickable | Not tested | Should open organization detail (or stay display-only — decision) | Decision |

### §5.21 Vision Builder (`/visionweaver/vision-builder`) — live `records` (Recent Creations only)

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| ViewSwitch V1/V2/V3 | `onClick={() => setView(v)}`. Layout: V2 = 2-col card grid, V1/V3 = 4-col grid (V1 and V3 identical) | PARTIAL | 3 distinct layouts | Layout decision + build |
| 4 mode pills (Text to Video, Image Generation, Scene Composer, Story Builder) | `onClick={() => setMode(...)}` — swaps the tagline under "WHAT IT DOES" only | Dead as tools (QA §2: highlight pills only) | PARTIAL: should open the tool for that mode (prompt input, settings, generate, result, save) | Generation provider + key + spend (Decision 5) — the biggest Phase E build; per-mode tool UIs |
| 4 large mode cards | `onClick={() => setMode(...)}` — same as pills | Dead (QA §2: clicking does nothing at all beyond highlight) | Same as pills: open the tool | Same as pills |
| Recent Creations rows (up to 6) | Plain `<li>`, not clickable | Not tested | Should open the creation/record detail | Record detail route |

### §5.22 Worlds & Locations (`/visionweaver/worlds`) — live `projects` (Related Projects only); all location content hardcoded; 3 genuinely distinct views

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| ViewSwitcher: V1 Cinematic Grid / V2 Interactive Map / V3 World Builder Studio | `onClick={() => setView(...)}` — switches 3 distinct renders | Working (QA §1: the ONE page where V1/V2/V3 fully work) | Same | Nothing |
| V1 sub-tab buttons: Overview, Location Library, Scene References, Import (4) | `onClick={() => setView("v1")}` — no-op when already on V1 (no visible change) | Not tested | DEAD from V1: should switch V1 sub-views or navigate | Decision + build (sub-view design) |
| V1 sub-tab buttons: World Builder, Environment Tools (2) | `onClick={() => setView("v3")}` | Working (QA: World Builder tab switches to builder view) | Same | Nothing |
| V1 sub-tab button: Map View | `onClick={() => setView("v2")}` | Working | Same | Nothing |
| V1: 6 Featured Location buttons (Chicago, Mumbai, Atlanta, Houston, Tampa, Savannah) | `onClick={() => setView("v2")}` — switches to the map view, which ALWAYS shows the Chicago pin; there is no per-location selection state | Working as view jumps (QA §1: clicking Chicago "selects Chicago on the map" — the code always shows Chicago; no location parameter is passed) | Should open that location's detail / select it on the map | Location detail route + `records` (kind='location', 5 rows exist) + selection state |
| V1: 8 Location Category buttons | `onClick={() => setView("v2")}` | Working (view jump) | Should filter the map/library by category | Filter wiring + `records` kind='location' |
| V1 Quick Actions: "Search Location" | `onClick={() => setView("v2")}` | Working (view jump) | Should focus/open location search | Search wiring + `records` kind='location' |
| V1 Quick Actions: "Build Custom World" | `onClick={() => setView("v3")}` | Working (view jump) | Should open the world builder (V3) | Same (works as a jump; V3 itself needs wiring — see below) |
| V1 Quick Actions: "Import Reference" | NO `onClick` | Not tested | DEAD: import a reference | Import handling + server route (UNKNOWN — no route proposed) |
| V1 Quick Actions: "Open in Scene" | NO `onClick` | Not tested | DEAD: open the world in a scene | Scene tooling (Phase E/H decision) |
| V1 Quick Actions: "Save to Library" | NO `onClick` | Not tested | DEAD: save the world to the library | `saved_worlds` + `worldSave` |
| V2: 4 Filters selects (Region, Environment Type, Time Period, Mood/Atmosphere) | Uncontrolled `<select>` with a single "All" option, no `onChange` | Not tested | DEAD: should filter the location list | Filter wiring + `records` kind='location' (fields don't exist — UNKNOWN: metadata design) |
| V2: 2 checkboxes (Real Locations, Custom/Created) | Uncontrolled, no handler — visual only | Not tested | DEAD: should filter the map/list | Same as filters |
| V2: "Search Locations" | NO `onClick` | Not tested | DEAD: run the location search | Search wiring + `records` kind='location' |
| V2: Popular Locations (6) | `<span>`, not interactive | Not tested | Should select/open the location | Location detail + selection state |
| V2: 8 World Building Tool buttons | `onClick={() => setView("v3")}` | Working (view jump) | Should open the specific builder tool in V3 | V3 tool builds (decision: which tools are real) |
| V2: Location Packs (2 panels) | Plain panels, no controls | Not tested | Should open the pack | Pack model (UNKNOWN — no table proposed) |
| V3: "Save World" | NO `onClick` | UNTESTED (QA §9, would modify data) | DEAD: save the world definition | `saved_worlds` + `worldSave` route |
| V3: "Preview in Scene" | NO `onClick` | UNTESTED (QA §9) | DEAD: render a scene preview | Generation/render provider (Decision 5) + scene tooling |
| V3: 8 sub-tabs (Overview, Environment, Architecture, Interiors, Population, Props & Assets, Scenes, Export) | `<span>`, not interactive | Not tested | Should switch V3 builder sections | Decision + build |
| V3: Asset Library tiles (7) | Plain `<div>`, not interactive | Not tested | Should select/add the asset to the world | Asset selection + `saved_worlds` data model |
| V3: Related Projects links (up to 3) | `<Link to="/projects">` (the list) | Working as links | NAV-ONLY: should open project detail | Project detail route |

## §6 — Shared component: EntityWorkbench (browser-local; renders on 7 pages)

Pages: `/agents` (Agent Operations), `/connectors` (Integrations & Connectors), `/memory` (Memory & Files), `/sessions` (Sessions), `/tasks` (Task Queue), `/visionweaver/files` (Files & Outputs), `/visionweaver/workflows` (Workflow Templates). Also embedded inside SystemOperations (§7) for its tasks/sessions/memory tabs. All state is the local `PlatformState` (seed + localStorage); nothing reads or writes Supabase. The `kind="library"` variant is defined in the component but never rendered by any route (dead path).

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| "New \<kind\>" button (header action) | `onClick={create}` — opens the dialog with a blank record (`crypto.randomUUID()`, first status for the kind) | Not tested | LOCAL-ONLY: works locally. Intended: create a real record | DECISION: migrate these entities to Supabase (no tables proposed in Phase D draft for agents/sessions/tasks/memory/files/workflows/connectors as entities — the draft's `agents` table is the AI Co-Pilot agent config, a different thing) or keep browser-local by design |
| Search input | Controlled; filters rows by name/detail/content substring, client-side | Working (not QA-tested) | Same | Nothing (local filter works) |
| Status filter `<select>` | Controlled; filters rows by status (kind-specific status lists) | Working (not QA-tested) | Same | Nothing |
| File import input (files pages ONLY) | `onChange`: reads a `.txt/.md/.json/.csv` file ≤1 MB, saves it as a local record via `save()`; rejects >1 MB with a toast | Not tested | LOCAL-ONLY: works locally | Decision (above) + upload route if migrated (UNKNOWN — no route proposed) |
| Row: "Open" button | `onClick={() => setSelected({...entity})}` — opens the edit dialog | Working (QA §1: Files "Open" opens detail dialog with editable fields) | LOCAL-ONLY: same, plus Supabase persistence if migrated | Decision (above) |
| Row: Pause/Resume (agents + sessions ONLY) | `onClick` → `save({...entity, status: toggled})` — local dispatch + toast | Not tested | LOCAL-ONLY: works locally | Decision (above) |
| Row: "Complete" (tasks ONLY, when status ≠ completed) | `onClick` → `save({...entity, status:'completed'})` — local dispatch | Not tested | LOCAL-ONLY: works locally | Decision (above) |
| Row: Download button (rows with content) | `onClick` → `downloadText(name, content)` — downloads the record's content as a text file | Not tested | Same | Nothing |
| Dialog form: Name input (required) | Controlled; edits `selected.name` | Working (QA: dialog has editable fields) | LOCAL-ONLY: same | Decision (above) |
| Dialog form: System `<select>` | Controlled; edits `selected.systemId` (options = 9 seed systems) | Working | Same | Nothing (local) |
| Dialog form: Status `<select>` | Controlled; edits `selected.status` (kind statuses + current status) | Working | Same | Nothing (local) |
| Dialog form: Workspace `<select>` | Controlled; edits `selected.workspaceId` (workspaces filtered by system) | Working | Same | Nothing (local) |
| Dialog form: Project `<select>` | Controlled; edits `selected.projectId` (seed projects filtered by system) | Working | Same | Nothing (local) |
| Dialog form: Summary textarea | Controlled; edits `selected.detail` | Working | Same | Nothing (local) |
| Dialog form: Content/evidence textarea | Controlled; edits `selected.content` | Working | Same | Nothing (local) |
| Dialog form: "Save record" (submit) | `onSubmit` → `save(selected)` → `dispatch({type:'entity',...})` → toast "Record saved." + dialog closes; validation errors surface as toasts | Working locally (QA closed the dialog WITHOUT saving, so the save path was not click-tested) | LOCAL-ONLY: works locally | Decision (above) |
| Dialog close (X / backdrop / Escape) | Radix Dialog `onOpenChange` → `setSelected(null)` | Working | Same | Nothing |

## §7 — Shared component: SystemOperations (browser-local; renders on 5 pages)

Pages: `/assessment` (Personal Assessment), `/grantos` (GrantOS), `/iam` (IAM Self Help), `/telecommunications` (Telecom), `/visionweaver/marketing` (CMGIO / Marketing). Each renders the seed system record + an EntityWorkbench for its tabs.

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| 4 tab buttons (tasks, sessions, memory, launch) | `onClick={() => setTab(t)}` — swaps the embedded panel | Not tested | Same | Nothing |
| "System record" button | `<Button asChild><Link to="/systems/$systemId" params={{systemId}}>` — opens the system detail page | Not tested | Same | Nothing |
| Launch tab: LauncherForm | See §8 | Not tested | See §8 | See §8 |
| Tasks/sessions/memory tabs: EntityWorkbench | See §6 (filtered to this `systemId`) | Not tested | See §6 | See §6 |

## §8 — Universal Launcher + LauncherForm (browser-local; dialog on /projects + /workspaces; full page at /launcher)

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| "Launch" trigger button (UniversalLauncher dialog) | Radix `DialogTrigger` — opens the dialog ("Universal Launcher", "Staged workflow intake · Architect authorization required") | Working (QA §1: opens the dialog) | Same | Nothing |
| Kind buttons: workspace / project / session (3) | `onClick={() => setKind(...)}` — toggles which kind is created | Working (not individually QA-tested) | Same | Nothing (local state) |
| Name input (required, max 120) | Controlled; submit is disabled until a non-blank name is entered | Working (QA §1: Create disabled until a name is entered) | Same | Nothing |
| Workflow template buttons (×9 seed workflows) | `onClick={() => setTemplate(w.id)}` — selects the template (check mark on selected) | Not tested | Same | Nothing (local state; templates are seed data) |
| "Create \<kind\>" submit | `onSubmit` → `dispatch({type:'launch',...})` → toast + dialog closes + `navigate()` to `/workspaces`, `/projects`, or `/sessions`. Writes localStorage ONLY (creates a local workspace/project/session + a governed intake task). Disabled when `!ready \|\| !name.trim()`. | UNTESTED as a write (QA §9: dialog opened, nothing created). The create path itself was never click-tested. | LOCAL-ONLY: works locally. Intended: create a REAL project/workspace/session | `projectCreate` route (projects) + workspace/session models (UNKNOWN — no tables proposed for workspaces/sessions) + auth/role. NOTE: the local create navigates to `/projects`, which shows SUPABASE projects — so a locally-created "project" will NOT appear there. That mismatch is a real UX bug to resolve in Phase E (either migrate creation to Supabase or stop navigating to the Supabase list). |

## §9 — Shared component: CreationWorkspace (browser-local; renders on /landweaver + /visionweaver/creative-studio)

Edits the seed "cores" (Story Core / Parcel Core) in localStorage. No Supabase reads or writes.

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| Output mode buttons (Story: Book/Audio/Video/Storyboard/Magazine/Marketing; Parcel: Listing/Property intelligence/Aerial storyboard/Brochure/Marketing) | `onClick={() => saveCore({mode}, ...)}` — local dispatch + version entry | Not tested | LOCAL-ONLY: works locally | Decision: migrate cores to Supabase (no table proposed — UNKNOWN) or keep local |
| Tabs: Assets / Core / History (3) | `onClick={() => setTab(t)}` — swaps panels | Not tested | Same | Nothing |
| "Export draft" | `onClick`: downloads the core as JSON + dispatches a local "files" entity + toast "Draft manifest exported and saved to Files." | Not tested | LOCAL-ONLY: works locally (download is real; the "saved to Files" is local-only) | Decision (above) |
| "Advance stage" | `onClick` → `saveCore({stage: stage+1}, ...)`; disabled at stage ≥ 4; at stage ≥ 4 shows the "Review gate" blocked notice | Not tested | LOCAL-ONLY: works locally | Decision (above) |
| "Add asset" | `onClick` → opens the asset editor with a blank asset | Not tested | LOCAL-ONLY: works locally | Decision (above) |
| Per-asset "Edit asset" | `onClick={() => setAsset({...a})}` — opens the editor with that asset | Not tested | LOCAL-ONLY: works locally | Decision (above) |
| Core form: Title input + Premise textarea + "Save Core" | `onSubmit` → `saveCore({title, premise}, ...)` + toast; local dispatch | Not tested | LOCAL-ONLY: works locally | Decision (above) |
| Asset editor: Name input, Type `<select>` (15 kinds), Content textarea, "Save asset", "Cancel" | Save: `onSubmit` → versioned save via `saveCore` + toast; Cancel: `setAsset(null)` | Not tested | LOCAL-ONLY: works locally | Decision (above) |
| Asset editor: "Previous asset versions" `<details>` | Native expand/collapse; shows prior content versions | Not tested | Same | Nothing |

## §10 — Top-level routes (unchanged by the restructure)

### §10.1 Projects (`/projects`) — live `projects`; the ONLY page with a Supabase write attempt

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| "Launch" (UniversalLauncher, header action) | Opens the Launcher dialog (see §8) | Working (QA §1) | Same | Nothing (dialog works; its create is LOCAL-ONLY — see §8) |
| Per-project "Pause" / "Resume" | `onClick={() => handleToggleStatus(p)}` → `updateProjectStatus(id, next)` (direct client `.update()` as `anon`) → on success, local `statusOverrides` update; on failure, honest amber error banner ("…may not have write access (RLS)"). Disabled while that row is busy. | UNTESTED (QA §3, would modify data). QA's prediction stands: `anon` has SELECT-only, so the write WILL fail until a server route exists. | BROKEN-WRITE: must call the `projectPause`/`projectResume` server route (service-role, server-side) with loading + success + honest-error states | `projectPause`/`projectResume` routes + auth/role (Decisions 7–8). This is the Phase D first-route verification candidate. |
| Per-project "Start review session" | `onClick` → `dispatch({type:'launch', name: "<project> review", workflowId:'wf-review', kind:'session'})` — local only, no navigation, no toast in this call path | Not tested | LOCAL-ONLY: creates a local session; user gets no visible confirmation on this page | Decision: migrate to Supabase sessions (no table proposed) or add feedback + navigation |
| Project cards | NOT clickable (no link, no detail) | Not tested | Should open project detail | Project detail route |

### §10.2 Universal Search (`/search`) — browser-local seed state ONLY

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| Search input (autofocus) | Controlled; `searchEntities(state, q)` filters the 92 seed records by name/detail substring | BROKEN as a product feature (QA §2: ANY typed query returns 0 for real Supabase names; empty query lists 92). The input + filter code work correctly — the DATA SOURCE is wrong (local seed, not Supabase). | Rebuild to query Supabase tables directly (projects, records, initiatives, team_members, library_items) with real filtering | Phase E step 1: search rebuild (no new table; read existing + Phase D tables) |
| Result rows (links) | Each `<Link to={destinations[r.kind]}>` — goes to the KIND's list page (`/projects`, `/systems`, …), never to the item | Dead as deep-linking (QA §2: result → list page only) | NAV-ONLY: each result must deep-link to the item's detail page | Detail routes (project, record, initiative, decision, workspace, officer, etc.) |

### §10.3 Decision Queue (`/decisions`) — browser-local seed state ONLY (seed: 5 decisions)

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| 5 filter buttons (pending, authorized, rejected, executed, all — with counts) | `onClick={() => setFilter(f)}` — filters client-side by `resolution` | Working (not QA-tested) | Same, against live data | `decisions` table |
| Per-decision notes textarea | Controlled local `notes` state (initialized from `d.note`) | Not tested | Same, with persistence | `decisions` + `decisionSave` |
| Per-decision "Save note" | `onClick` → `dispatch({type:'note',...})` — local only | Not tested | LOCAL-ONLY: should save to `decisions.decision_note` | `decisionSave` route |
| Per-decision "Advance" | `onClick` → `dispatch({type:'decision', command:'advance'})`; disabled when stage is ask/execute or resolution ≠ pending | Not tested | LOCAL-ONLY: should advance the Golden Path stage in Supabase | `decisionDecide`-style route (stage advance — no exact route proposed; flag for Phase D) |
| Per-decision "Authorize staged action" | `onClick` → `dispatch({type:'decision', command:'authorize', note})`; disabled unless stage is ask AND resolution is pending | Not tested | LOCAL-ONLY: should record authorization in Supabase | `decisionDecide` route (director role) |
| Per-decision "Reject" | `onClick` → `dispatch({type:'decision', command:'reject', note})`; disabled when executed/rejected or the note is blank | Not tested | LOCAL-ONLY: should record rejection in Supabase | `decisionDecide` route |
| Per-decision "Record staged execution" (only when authorized) | `onClick` → `dispatch({type:'decision', command:'execute'})` | Not tested | LOCAL-ONLY: should record execution in Supabase | `decisionDecide`-style route (execution — flag for Phase D) |
| Decision titles/rows | NOT links (no detail view; the card IS the detail) | Not tested | A dedicated decision detail route is optional — the card already shows everything; the gap is persistence, not navigation | `decisions` table |

### §10.4 C-Suite (`/c-suite`) — seed `officers` (8), NO live data, ZERO controls

8 officer cards (The Architect/CEO, Executive Synthesis/CEO AI, T.H.E.L.M.A., Operations/COO, Technology/CTO, Finance/CFO, Marketing/CMO, Security/CSO). Each card is a static `Panel` (role, name, pending pill, Focus, Authority, briefing). No links, no buttons, no clicks do anything. QA §2 confirmed: "Clicking an executive card does NOTHING." Needs: officer detail pages + `team_members` table + Decision 4 (roster — the seed roster differs from BOTH the SOR roster and the CEO Dashboard's 10-card roster; three rosters exist in the app, none matching).

### §10.5 Reference Library (`/library`) — seed `library` (8 entries), ZERO controls

8 static cards (kind, title, summary, tag pills). No links, no buttons. Needs: item detail pages + `library_items` table + `librarySave` route.

### §10.6 Training (`/training`) — hardcoded tracks + seed library, ZERO controls

6 track cards (THELMA Operator, VisionWeaver Operator, LandWeaver Producer, CMGIO Producer, IAM Operator, GrantOS Analyst) — static `Panel`s. "Recent Training Material" list — plain `<li>`s. QA §2 confirmed: "Clicking a track does NOTHING." Needs: track detail pages + `training_tracks` table + `trackSave` route (+ materials model — the materials list reads seed `library` kind='training').

### §10.7 T.H.E.L.M.A. (`/thelma`) — hardcoded display, ZERO controls

4 hardcoded StatBlocks (41 / 184 / 212 / 41), Golden Path steps, Standards & Memory list. No links, no buttons, no live data. Needs: decision — is this page display-only by design (then the numbers need real sources or honest "—" states), or should its items link to the underlying systems/standards? UNKNOWN.

### §10.8 Runtimes (`/runtimes`) — seed `runtimes` (4), browser-local

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| 4 runtime cards (Cloud, Self-Hosted, Air-Gapped, Local) | Each a `<Button>` wrapping a Panel; `onClick={() => dispatch({type:"runtime",id})}` — sets `selectedRuntime` in localStorage; active card gets a ring. Each card shows an "Unverified" pill and "Sample latency" text. | Not tested | LOCAL-ONLY: works as a staged preference. Intended: actually select the execution runtime | Decision: what "selecting a runtime" means once providers are connected (Phase H). The "Unverified" pills are honest. |

### §10.9 System Registry (`/systems`) + System Detail (`/systems/$systemId`) — seed `systems` (9)

The ONLY detail-page pattern in the app (loader + `notFound()` + detail view). All data is seed `command-data.ts`, not Supabase (`integration_inventory` is a different, live dataset — the registry does not read it).

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| Registry: 9 system cards | Each `<Link to="/systems/$systemId" params>` — opens the detail page | Working (not QA-tested) | Same | Nothing (navigation works; data source is seed — decision: keep seed registry or migrate to `integration_inventory`/a systems table — UNKNOWN, no table proposed) |
| Detail: "← Registry" back link | `<Link to="/systems">` | Not tested | Same | Nothing |
| Detail: Connected Systems links | Each `<Link to="/systems/$systemId">` — navigates between detail pages | Not tested | Same | Nothing |
| Detail: not-found "Back to registry" | `<Link to="/systems">` (rendered when the loader throws `notFound()`) | Not tested | Same | Nothing |

### §10.10 Workspaces (`/workspaces`) — browser-local seed state (7 workspaces)

| Control | Current behavior (code) | QA status | Intended action | Needs |
|---|---|---|---|---|
| "Launch" (UniversalLauncher, header action) | Opens the Launcher dialog (see §8) | Not tested | Same | Nothing |
| Per-workspace "Start workspace session" | `onClick` → `dispatch({type:'launch',...})` — local only, no navigation, no toast | Not tested | LOCAL-ONLY: same gap as Projects' session button | Decision (workspace/session models — no tables proposed) |
| Workspace cards | NOT clickable (no detail link) | Not tested | Should open workspace detail | Workspace detail route + model (UNKNOWN) |

### §10.11 Launcher page (`/launcher`) — LauncherForm only

See §8. No page-specific controls beyond the form.

### §10.12 Assessment / GrantOS / IAM / Telecommunications / Agents / Connectors / Memory / Sessions / Tasks

Thin wrappers over SystemOperations (§7) or EntityWorkbench (§6). No page-specific controls. See those sections.

## §11 — Redirect stubs (23, no controls — they exist so old bookmarks keep working)

Each stub is a `beforeLoad: () => { throw redirect({ to: "<new path>" }); }` with `component: () => null`. Verified pattern in all 23 files: `/ai-co-pilot`, `/assets`, `/avatar-engineering`, `/ceo-dashboard` (→ `/`), `/cmi`, `/creative-studio`, `/directors-guild`, `/distribution`, `/files`, `/finance`, `/health`, `/initiatives`, `/it-security`, `/marketing`, `/programs`, `/reports`, `/resources`, `/settings`, `/strategic-planner`, `/teams`, `/vision-builder`, `/workflows`, `/worlds` → their `/visionweaver/*` equivalents. Old-path navigation was verified live for `/worlds` and `/ceo-dashboard` (22:07 check); the other 21 stubs were NOT individually click-verified (same code pattern, but unverified — flag for Phase I TEST-ALL).

## §12 — Cross-check: code vs click-through QA (Nov 11) vs fix-plan §4

### 12a. Controls found in code but NOT in the QA report (QA did not click them — §9 gaps + untested pages)

- ALL of EntityWorkbench (§6, 7 pages), SystemOperations (§7, 5 pages), LauncherForm create flow (§8), CreationWorkspace (§9, 2 pages), Runtimes (§10.8), Systems registry/detail (§10.9), Workspaces session buttons (§10.10), Decisions actions (§10.3). QA §9 explicitly lists the legacy routes as not click-tested.
- ALL dead buttons on Resources (§5.17), Worlds (§5.22), Distribution (§5.8) — QA tested view switching on Worlds only; the action buttons on these three pages were never clicked.
- Settings color schemes (§5.18), Assets category tiles + search (§5.2), Programs filters (§5.14), Directors Guild filters (§5.7), Teams tabs (§5.20), Avatar actions (§5.3), CMI/Reports/Finance/IT-Security view switches, CEO top-nav links other than Notebook/C-Suite, sidebar System links, top-bar Help/Bell/Avatar links, 404/error-boundary controls.
- The QA report's "2 files" (Files page) = the 2 seed file entities; the QA "8 cards" expectation (from the fix-plan inventory) does not match the rebuilt page, which is an EntityWorkbench list, not 8 cards.

### 12b. QA-tested / fix-plan-listed controls NOT FOUND in code at HEAD (moved, renamed, or never built in the rebuild)

| Control (as listed in QA / fix plan §4) | Finding at HEAD |
|---|---|
| "Show sample data" toggle (fix plan §4, VW home) | NOT in code. The rebuilt home has no sample-data toggle. The platform state is seed + localStorage with no Demo/Blank switch in this app. |
| Tour banner: "Start tour", "+ New project", "Not now" (fix plan §4, VW home) | NOT in code. No tour exists in the rebuild. |
| "+ New project" sub-bar button (fix plan §4, VW home) | NOT in code. The rebuilt home has no sub-bar. ("+ Create" in the TopBar is the only create-labeled control, and it links to Vision Builder.) |
| Home search box (fix plan §4, VW home) | NOT in code on the home page. Search is the TopBar link → `/search`. |
| "Home V3" view toggle (QA §2: "Tested on Home (V3 selected — page looked identical)") | The home page has NO ViewSwitch and never reads the `home` view preference. The V3 choice was set in Settings → Visual Views, where it persists — but the home ignores it entirely. This fully explains the QA observation. |
| "Save World" / "Preview in Scene" (QA §9, untested) | FOUND in code (Worlds V3) — both have NO `onClick` (dead). QA correctly left them untested; code confirms they would have done nothing. |
| "Open Project" → detail (QA §2) | The link exists (right rail + Featured cards) but targets `/projects` (list). No detail page exists. Confirmed. |
| "View All" (Pipeline → /initiatives; Recent Activity → /health) | FOUND, with new paths `/visionweaver/initiatives` and `/visionweaver/health`. Confirmed working. |
| Legacy-route buttons (QA §9: /thelma, /systems, /agents, /workflows, /runtimes, /connectors, /memory, etc.) | FOUND and inventoried in §6–§10 above. Most are LOCAL-ONLY (EntityWorkbench/SystemOperations) or zero-control pages (THELMA). |

### 12c. QA statements corrected or refined by the code

1. **"V1/V2/V3 choice is logged in /health's audit trail as 'Display preference saved'" (QA §1) — WRONG.** The `Display preference saved` audit event is emitted by the `settings` dispatch action — i.e., the Compact toggle (`dispatch({type:"settings",compact})`), not the view preference. `setPageView` writes localStorage only and emits no audit event. The QA tester likely flipped the Compact toggle in the same session and attributed its audit entry to the view switch.
2. **"AI Co-Pilot Ask: NOTHING happened" (QA §2) — nuance.** Per code, Ask sets `asked=true` and renders the paragraph "AI Co-Pilot is not connected in this build." below the input. The QA report itself quotes that text, so the tester saw it. The accurate statement: Ask performs no AI action; it only reveals the honest not-connected message.
3. **"Search returns 0 for ANY typed query" (QA §2) — mechanism confirmed.** Search scans only the 92 local seed records. Any query matching a seed record WOULD return results (e.g., "Origin Cycle" — the seed project — should match). The QA queries ("Crossroads", "Avatar") match no seed record. The fix is the data source (rebuild on Supabase), not the filter logic, which is a correct substring match.
4. **"Approve still shows on APPROVED submissions" (QA §3) — CONFIRMED in code.** Both buttons render unconditionally on every row; no status check exists.
5. **"C-Suite page shows 8 officers, not 12" (QA §2) — CONFIRMED.** Seed `officers` = 8. Note the app now contains THREE different rosters: CEO Dashboard (10 hardcoded cards), `/c-suite` (8 seed officers), SOR (9 offices + Architect + THELMA as CIntO). None match. Decision 4 must pick one.
6. **"Pause/Resume writes would likely fail" (QA §3) — CONFIRMED as certain.** `updateProjectStatus` uses the anon client; anon has SELECT-only grants; the update will be rejected by RLS and the page will show its honest error banner. No server route exists to make it succeed.
7. **"Worlds — clicking Chicago selects Chicago on the map" (QA §1) — nuance.** The code has no selection state: every Featured button just switches to V2, and V2 always renders the Chicago pin. Clicking Mumbai shows the same Chicago pin. Location selection does not exist.
8. **"Counts disagreeing on 5 systems" (Nov 10 QA, carried into the fix plan) — the registry counts come from seed `systems` (agents/workflows fields), while the live counts come from Supabase.** The two datasets are unrelated; the "disagreement" is structural (seed vs live), not a display bug. Resolving it needs the decision in §10.9 (migrate the registry to live data or label it staged).

### 12d. Old → new route map for QA findings (post-restructure)

`/vision-builder` → `/visionweaver/vision-builder` · `/initiatives` → `/visionweaver/initiatives` · `/health` → `/visionweaver/health` · `/avatar-engineering` → `/visionweaver/avatar-engineering` · `/ceo-dashboard` → `/` · `/assets` → `/visionweaver/assets` · `/settings` → `/visionweaver/settings` · `/files` → `/visionweaver/files` · `/workflows` → `/visionweaver/workflows` · `/marketing` → `/visionweaver/marketing` · `/creative-studio` → `/visionweaver/creative-studio` · `/cmi`, `/directors-guild`, `/distribution`, `/finance`, `/it-security`, `/programs`, `/reports`, `/resources`, `/strategic-planner`, `/teams`, `/worlds`, `/ai-co-pilot` → `/visionweaver/<same>`. Unchanged: `/projects`, `/search`, `/decisions`, `/c-suite`, `/library`, `/training`, `/thelma`, `/systems`, `/systems/$systemId`, `/runtimes`, `/workspaces`, `/launcher`, `/agents`, `/connectors`, `/memory`, `/sessions`, `/tasks`, `/assessment`, `/grantos`, `/iam`, `/telecommunications`, `/landweaver`.

---

## §13 — Top 10 highest-priority dead/placeholder controls (by user visibility)

1. **Search — typed queries return 0; no deep-linking** (`/search`). The most visible broken feature; every real Supabase name fails. Needs: search rebuild on Supabase + detail routes. (Phase E step 1.)
2. **AI Co-Pilot Ask + 5 chips + 6 agent cards** (`/visionweaver/ai-co-pilot`). The page's entire purpose is dead. Needs: `agents` table + AI provider/key/spend (Decision 6). (Phase E step 7.)
3. **Vision Builder mode pills + cards — no tools open** (`/visionweaver/vision-builder`). The flagship creation surface. Needs: generation provider/key/spend (Decision 5) + 4 tool builds. (Phase E step 7.)
4. **Directors Guild Approve / Request changes** (`/visionweaver/directors-guild`, ×20 rows). The core review action; shows on APPROVED rows. Needs: `guildApprove`/`guildRequestChanges` routes + status-aware buttons. (Phase E step 3.)
5. **Projects Pause / Resume** (`/projects`). The only Supabase write attempt in the app — and it cannot succeed as built. Needs: `projectPause`/`projectResume` routes. First-route verification candidate. (Phase E step 3.)
6. **C-Suite officer cards — static** (`/c-suite`, 8 cards) **+ CEO C-Suite cards — no detail** (`/`, 10 cards). Two pages, three rosters, zero detail. Needs: Decision 4 (roster) + `team_members` + officer detail pages. (Phase E step 5.)
7. **Training tracks — static** (`/training`, 6 cards). Needs: `training_tracks` + track detail pages. (Phase E step 5.)
8. **Decision Queue items — not clickable** (VW home) **+ Decisions page is local-only** (`/decisions`). Needs: `decisions` table + `decisionSave`/`decisionDecide` + detail wiring. (Phase E step 4.)
9. **CEO Pending checkboxes — visual only, don't save** (`/`, 5 checkboxes) **+ no Pending page exists** (nav + quick actions point at Directors Guild). Needs: `pending_items` + `pendingToggle` + Phase G Pending page.
10. **Worlds Save World / Preview in Scene + Resources + Distribution dead action buttons** (Upload, Generate, Import, Create Template, Search, Apply Filters, Use Asset, Share, Publish, Schedule, Boost, Export, New Campaign, AI Suggestions, AI Thumbnails — ~30 dead buttons across 3 pages). Needs: tables + routes per §5.8/§5.17/§5.22 + providers for the AI/generation ones. (Phase E steps 6–7.)

**Honorable mentions (just below the top 10):** V1/V2/V3 highlight-only on 8 pages (24 buttons); "New Project" opening the list instead of a create form; Notebook having no controls at all (needs a full build, not a fix); Library cards static (8); Avatar actions + 32 slots (no capture flow); the Launcher's local-only create navigating to the Supabase-backed `/projects` list (created items won't appear there).

---

## §14 — UNKNOWNs and decisions needed (nothing here is guessed)

1. **EntityWorkbench / SystemOperations / Launcher / CreationWorkspace / Decisions / Health / Runtimes surfaces:** migrate to Supabase or keep browser-local by design? The Phase D draft proposes NO tables for workspaces, sessions, tasks, agents (as entities), connectors, memory, files, workflows, cores, or incidents. If migration is wanted, new tables + routes must be added to the Phase D list. If local-by-design, the UI must say so honestly (some pages already say "staged"; others don't).
2. **Health incidents source:** no table proposed. Candidates: `security_events`, `audit_events`, or a new `incidents` table. Also: the local audit trail on Health vs the Supabase `audit_events` table are two different trails sharing a name — decide which one Health shows.
3. **Initiative detail/edit:** no `initiativeSave`-style route in the Phase D draft. Decide whether initiatives get edit/stage-advance routes.
4. **Resources metadata:** the V2 filter selects (Style, Country/Region, License Type, etc.) name fields that don't exist on `records`. Decide the asset metadata model (jsonb `meta` on `records`? new columns? `library_items`?).
5. **Resources collections + saved searches + sharing:** no models proposed. Decide: localStorage-only, or new tables.
6. **Upload/import flows** (Resources Upload Asset / Import from URL, Worlds Import Reference): no upload route in the Phase D draft. Decide storage (Supabase Storage? external?) + route.
7. **Notifications (TopBar bell):** no table proposed. Decide: build a notifications surface or relabel/remove.
8. **Hardcoded stats:** THELMA (41/184/212/41), CEO uptime "99.9%", CEO Pending badge "3" — compute from real sources, or replace with honest "—" states? (The Pending badge and the release-gates-derived pending count disagree with each other.)
9. **Fix-plan §4 controls absent from code** (tour banner, "Show sample data", "+ New project" sub-bar, home search box): intentionally dropped in the rebuild, or missing? Owner call.
10. **Reports page registry:** all 27 `page_registry` route values were not individually verified against the post-restructure route tree. Verify in Phase I TEST-ALL (or when the registry is updated in Phase H).
11. **21 of 23 redirect stubs** were not individually click-verified (only `/worlds` and `/ceo-dashboard` were). Same code pattern, but verify in Phase I.
12. **"Display preference saved" audit event:** emitted by the Compact toggle only. If view-preference changes should also be audited, that's a new behavior to build (and a new audit event type — see Phase D draft Q8).
13. **The `kind="library"` EntityWorkbench variant** is dead code (never rendered). Decide: wire it to a page or remove it.
14. **Worlds location data:** `records` kind='location' has 5 rows, but Worlds reads only `projects` and hardcodes all location content. Decide whether Worlds should read the location records (and whether the 5 rows are the real location set).
15. **Three rosters:** CEO Dashboard (10), `/c-suite` (8 seed), SOR (9 + Architect + THELMA). Decision 4 picks one; the other two must be replaced, not left.

---

## Method note

Files read in full at ref `0a6e630` via GitHub MCP: all 72 route files (`src/routes/*` + `src/routes/visionweaver/*`), `src/components/shell/*` (3), `src/components/platform/*` (5), `src/components/vw/*` (2), `src/lib/supabase-data.ts`, `src/lib/vw-view-prefs.ts`, `src/lib/command-data.ts`, `src/lib/platform-model.ts`, `src/lib/route-meta.ts`, `src/lib/error-page.ts`. Greps run across the fetched tree: `onClick` (74 occurrences), `<Link`, `navigate(`, `.insert/.update/.delete/.upsert`, `fetch(`, `<select`, `<input`, `<details`, `view ===` per page (to determine which view switches actually branch layout), and seed-array counts. `src/components/ui/*` (Radix primitives) were not inventoried control-by-control — they are the shared primitives the pages compose; only their usage (Dialog, Switch, Button, Input, Select, Textarea) is recorded. `src/lib/vw-images.ts` (image data) and `src/routeTree.gen.ts` (generated) were not read — neither contains controls.

**— Button inventory, 2026-11-11. Read-only; nothing built, nothing committed. Prepared for Phase E execution.**
