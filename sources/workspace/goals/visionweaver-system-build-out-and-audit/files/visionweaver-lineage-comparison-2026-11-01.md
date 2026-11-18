# VisionWeaver Lineage Comparison — 2026-11-01

**Purpose:** One aligned map of what's where across the three VisionWeaver system lineages, so a single canonical system can be picked. Read-only research; nothing was pushed, merged, or changed.

- **Lineage A — "vw3"**: `estibancreations-svg/MASTER_CEO_DASHBOARD`, `src/components/VisionWeaverWorkspace.tsx` + `docs/visionweaver/CANONICAL-V3-UI-REFERENCE-2026-10-08.md`. Ruled the correct VisionWeaver on 2026-10-22. 25 pages.
- **Lineage B — "repo 2.0 line"**: `estibancreations-svg/VisionWeaver`. Two taxonomies: the Oct-07 `ui-board-registry.ts` design lock (24 entries, 22 locked + 2 existing) and the `visionweaver-2.0/index.html` single-file app (16 sections, commit `a87e505f` 2026-10-27). Plus a Python loop engine and docs/records layer.
- **Lineage C — "fullstack build"**: Master System Build Out Live (artifact slug `master-system-build-out-live`), built 2026-10-30. Own server + database. 27 pages.

**Legend:** ✅ present · ❌ absent · ◐ partial — with a one-line note per cell.

## Aligned table (union of all pages/sections/features)

| # | Page / Feature | A — vw3 | B — repo 2.0 line | C — fullstack build |
|---|---|---|---|---|
| 1 | Homepage | ✅ Home (V1 default; 3 named views, presentation-only) | ✅ Registry "VisionWeaver Home" (existing) + 2.0 Home section | ✅ Home, Demo/Blank |
| 2 | Vision Builder | ✅ V1 "Creative Command Canvas" + 2 alternates | ✅ Registry V1 locked | ✅ V1/V2/V3 genuinely recompose |
| 3 | Strategic Planner | ✅ V1 "Strategic Command Center" + 2 alternates | ✅ Registry V1 locked | ✅ present |
| 4 | Initiatives | ✅ V2 "Initiative Pipeline" + 2 alternates | ✅ Registry V2 locked | ✅ present |
| 5 | Programs & Projects | ✅ V2 "Program & Project Workspace" + 2 alternates | ✅ Registry V2 locked + 2.0 "Projects" section | ✅ present |
| 6 | AI Co-Pilot | ✅ V2 "Agent Workflow"; 6 agent cards; chat bar non-functional | ✅ Registry V2 locked | ✅ present, orchestration data |
| 7 | CMI | ✅ V1 "Creative & Market Intelligence" + 2 alternates | ✅ Registry V1 locked | ✅ present |
| 8 | Directors Guild | ✅ V2 "Review & Decision Queue" (In Review/Approved/Revision/Pending) | ✅ Registry V2 locked | ✅ present, queue with approvals |
| 9 | Teams | ✅ "Teams" V1 (C-Suite is a separate page) | ✅ Registry "Teams & C-Suite" V1 (single entry) | ✅ "Teams" (C-Suite separate) |
| 10 | C-Suite | ✅ separate page, V1 | ◐ folded into "Teams & C-Suite" entry | ✅ separate page |
| 11 | Create & Produce | ❌ absent | ✅ 2.0 section: intake + 7-check preflight + Provider Router cost ceiling | ✅ present |
| 12 | Book Creation | ✅ V1 | ✅ Registry "existing" + 2.0 Books section with KDP lane | ✅ present |
| 13 | Avatar Engineering | ✅ V2: hero + binding states + Continuity Gate grid (SHOT 02 gating) | ✅ Registry V2 locked (generic view names: Approved Option 1/2/3) | ✅ present |
| 14 | Worlds & Locations | ✅ V2 "Interactive Map" + 2 alternates | ✅ Registry V2 locked + 2.0 Worlds section | ✅ V1/V2/V3 genuinely recompose (verified) |
| 15 | Characters / Cast | ❌ no page (character data read, not a nav page) | ✅ 2.0 "Characters" section | ❌ no page (covered in Avatar Engineering) |
| 16 | Design Studio | ✅ V2 "Design Workspace" + 2 alternates | ✅ Registry V2 locked | ✅ present |
| 17 | Design & Commercial | ✅ V1 "Campaign Command Grid" + 2 alternates | ✅ Registry V1 locked | ✅ present |
| 18 | Scene & Production | ✅ V1 "Production Workspace" + 2 alternates | ✅ Registry V1 locked | ✅ present |
| 19 | Media Library | ❌ absent | ✅ 2.0 section | ✅ present |
| 20 | Post Production | ✅ V1 "Edit & Finish Desk" + 2 alternates | ✅ Registry V1 locked | ✅ present |
| 21 | Distribution & Growth | ✅ V2 "Content Pipeline" + 2 alternates | ✅ Registry V2 locked + 2.0 "Socials & Distribution" (8 platforms) | ✅ present |
| 22 | Quality & Audit | ✅ V1 "Quality Command Center" (static gate states) | ✅ Registry V1 locked + 2.0 "QC & Edit Studio" | ✅ present |
| 23 | Finance & Accounting | ✅ V1 (hardcoded figures) | ✅ Registry V1 locked | ✅ present |
| 24 | IT & Security | ✅ V2 (infra rows hardcoded "Online") | ✅ Registry V2 locked + 2.0 "Connections — MCP/API" section | ✅ present, real health checks, honest states |
| 25 | Resources | ✅ V2 "Advanced Search & Filter" + 2 alternates | ✅ Registry V2 locked | ✅ present |
| 26 | Assets & Knowledge | ✅ V2 "Advanced Search & Filter" + 2 alternates | ✅ Registry V2 locked | ✅ present |
| 27 | Reports & Insights | ✅ V2 "Interactive Intelligence" + 2 alternates | ✅ Registry V2 locked + 2.0 "KPI & Reports" | ✅ present |
| 28 | Settings | ✅ V2 "Visual & System Control"; per-page view picker (presentation-only) | ✅ Registry V2 locked + 2.0 Settings (sign-in unchanged) | ✅ present; Directives live here |
| 29 | Hold Queue | ❌ absent | ✅ 2.0 dedicated section | ◐ review queue lives in Directors Guild; no standalone Hold Queue page |
| 30 | Voice Library | ❌ absent | ✅ 2.0 dedicated section | ◐ exists as in-page step, not a page |
| 31 | Save Map & Storage | ❌ absent | ✅ 2.0 dedicated section (Dropbox hub of record, Drive Master Folder) | ◐ exists as in-page step, not a page |
| 32 | Plans & Tiers | ❌ absent | ✅ 2.0 dedicated section (Starter/Studio/Pro/Flagship) | ◐ exists as in-page step, not a page |
| 33 | Directives D1–D16 | ❌ absent | ❌ absent (feed/DECISIONS.md exists, not the 16 Directives) | ✅ Settings → Directives, embedded as data |
| 34 | THELMA | ◐ sidebar button fires placeholder notice only | ◐ `thelma-ai` Edge Function listed in connections docs; app wiring unconfirmed | ✅ drawer → Guild queue, proposals + approvals verified |
| 35 | Login / logout (auth) | ✅ `useIdentity()` auth context; live fetch gated on sign-in | ◐ 2.0: local email/password only, OAuth buttons hard-disabled; archived Prime had complete auth | ✅ server-side sessions; sign-in/out verified |
| 36 | Demo / Blank modes | ◐ no explicit modes; hardcoded fallback numbers render when signed out (looks like demo) | ✅ 2.0 launches Blank or Demo, localStorage per mode | ✅ Demo/Blank toggle; Blank verified clean of figures |
| 37 | Live ticker / health monitoring | ❌ "Online" dots are hardcoded | ❌ connection statuses are declared text | ✅ uptime ticker + real checks (backend LIVE, Vercel projects LIVE, deployments DEGRADED stated honestly) |
| 38 | Production loop engine | ❌ absent | ✅ Python pipeline (`run.py`, `stages.py`), hard gates, 40 run manifests | ❌ absent |

## Per-lineage detail

### Lineage A — vw3 (`MASTER_CEO_DASHBOARD`)
- Single self-contained file (50,157 chars / 331 lines, styles embedded). 25 pages in 3 nav groups (Core 10, Create & Produce 8, Manage & Govern 7). Every page names 3 view variants; variants change subtitle text and a pill label only — one component renders per page. Canonical defaults match the Oct-08 reference doc exactly (status: LOCKED VISUAL TARGET).
- Shell: dark navy/black "creative-production OS", collapsible left nav, top search + Create + notifications, "The Architect / System Owner" account block, THELMA sidebar button (placeholder notice).
- Data: Supabase client from `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` (project ref injected at deploy, not in repo). One Edge Function call: `visionweaver-studio` (actions `list`, `refresh`) returning projects, generations, assets, characters, avatar_bindings, continuity_jobs, continuity_capsules. Auth via `useIdentity()`; live fetch only when signed in. All KPIs are live-data-first with hardcoded fallbacks (e.g., 24 projects, 186 scenes, $286,420 revenue) — the UI can look fully populated with no backend.
- Notable page content: Avatar Engineering continuity gates (SHOT 02 BLOCKED unless dissection=PASSED, QC=PASS, capsule=LOCKED); Directors Guild review queue; Quality & Audit release-gate pipeline (static states); IT & Security infra panel (Supabase/Vercel/Runway/GitHub/Provider APIs all hardcoded "Online") + static security checklist; Settings per-page V1/V2/V3 picker with explicit "presentation only" note.
- PR #64 "VisionWeaver canonical UI runtime stabilization — release validation": **OPEN, not merged**, branch `fix/production-stabilization-2026-10-08` → `main`, marked **DO NOT MERGE until verified** (exact-SHA quality gate, screenshot comparisons, auth + Supabase runtime checks, metric truthfulness). "Vercel preview build READY is not functional acceptance."
- Verdict: complete UI shell + thin data layer (auth + one Edge Function), substantial placeholder/demo content, Co-Pilot chat non-functional, release blocked on PR #64. Not "all the way live."

### Lineage B — repo 2.0 line (`VisionWeaver`)
- **ui-board-registry.ts** (SHA c9a9e67b): "canonical Architect lock 2026-10-07", `UI_REVIEW_STATUS="NAVIGATION BUILDOUT COMPLETE"`. 24 entries: 22 locked with primary + alternate views, 2 "existing" (Book Creation, VisionWeaver Home). Global locks: persistent sidebar + collapse, top command bar, visualViews + colorSchemes in Settings. A design-lock catalog, not runnable code.
- **Commit `a87e505f`** (2026-10-27, "VisionWeaver 2.0 — unified rebuild"): introduced exactly the `visionweaver-2.0/` directory — `index.html` (31,210 chars) + `README.md`. Single-file interactive app, 16 sections, Blank/Demo launches, 7-check preflight + Provider Router, localStorage per mode, JSON export. **Zero network calls**; sign-in is local email/password with Google/Apple/Microsoft buttons hard-disabled. This is the commit that contradicts the Oct-22 vw3 ruling.
- **Four Oct 30 commits** (~11:02–11:18 CDT, all "on Steve's order"): `dfbe0c810d` loop engine (`system/SYSTEM.md`, `system/loop/run.py`, `stages.py`, 40 run manifests); `06f4c66b18b` v1 archive docs; `c9ffa7b1e8` feed records (`feed/DECISIONS.md`, `MAPPING.md`, thread records); `f469a82b3f` README + ROADMAP (HEAD).
- **Data wiring (docs, not the app):** `connections/README.md` (2026-09-29) names Supabase yqealeekngxooyoemfba (production_log, social_post_queue, social_connections, oauth_flow_state, vw_review_decisions, ec_connectors) and azoqszhhmmkyqztubgem ("reserved"); 10 deployed Edge Functions incl. `thelma-ai`, `visionweaver-studio`, `visionweaver-orchestrator`. The 2.0 app itself calls none of this. No `vercel.json`; README: "Not hosted — Vercel deploy was refused (connector token lacked team write access)."
- Unique assets: Python production loop engine with hard gates (characters-approved, approved-for-publish, IG 429 full-stop) and 40 run-manifest receipts; feed/DECISIONS/MAPPING records layer; v1 archive; quality-gate workflow.
- Verdict: documentation + records system wrapped around two real working artifacts — the local-only 2.0 front-end and the genuine loop-engine pipeline code. Not live in any connected sense.

### Lineage C — fullstack build (Master System Build Out Live)
- 27 pages = Lineage A's 25 + Create & Produce + Media Library (absorbed from B's 2.0 taxonomy). Dark 16-panel shell. Demo/Blank modes. 16 Directives D1–D16 under Settings → Directives, embedded as data (the only lineage with the Directives as a system feature).
- Real server + database: server-side sign-in/sign-out (verified), uptime ticker verified against server clock (00:11:29), real health checks — backend LIVE, Vercel projects LIVE (11 projects), Vercel deployments DEGRADED (estibancreations101 scope 403, stated honestly, not painted green).
- Worlds V1/V2/V3 genuinely recompose the page (verified); THELMA drawer → Guild queue with persisted approvals (verified); Gate 2 blocks publish without "APPROVED" (verified); Blank verified clean of sample figures.
- **Headline limitation:** runs on its own local database — NOT wired to the Supabase data home (yqealeekngxooyoemfba). The artifact runtime offers no credential channel to the user's Supabase project; wiring waits on explicit go. Data home shown as verified reference only.
- Nothing external touched: no GitHub push, no Vercel deployment, no Supabase write.

## Key differences

1. **Data wiring:** A talks to Supabase auth + one Edge Function, with hardcoded fallbacks that make it *look* live with no backend. B's 2.0 app makes zero network calls (fully local); the repo docs reference both Supabase projects and 10 Edge Functions, but the app calls none. C has a real server + database with verified internal reads/writes, but is NOT wired to the Supabase data home.
2. **Auth:** A has a real auth context gating live fetches. B's 2.0 is local email/password only (OAuth disabled). C has verified server-side sessions and sign-out.
3. **Demo/Blank:** invented by B (2.0 launches), fully implemented and verified in C, only mimicked in A via fallback numbers.
4. **Directives D1–D16:** only exist as a system feature in C. Absent in A and B.
5. **Status honesty:** A and B hardcode "Online"/declared statuses. C runs real checks and reports DEGRADED honestly (Vercel deployments 403).
6. **View variants (V1/V2/V3):** A and B's registry name three views per page; A's are presentation-only (subtitle/pill), B's registry is a design lock, not code. C genuinely recomposes layouts on switch (verified for Worlds).
7. **Taxonomy:** A = 25 pages. B = 24 registry entries vs 16 app sections (two different taxonomies — the 2.0 rebuild never implemented the full locked board). C = 27 pages (A's 25 + Create & Produce + Media Library).
8. **Unique to each:** B alone has the Python loop engine + 40 run manifests (real production receipts), Voice Library / Hold Queue / Save Map & Storage / Plans & Tiers as first-class sections, and the feed/DECISIONS/ROADMAP records layer. A alone is the ruled-canonical visual target with a production Vercel route and the open PR #64 stabilization gate. C alone is actually runnable end-to-end (server, DB, auth, monitoring).

## What could not be verified (and why)

- Commit `a87e505f` diff stats: `get_commit` is not a reviewed read tool; scope inferred from path history (the `visionweaver-2.0/` directory's history contains only that commit).
- B's "14/14 render tests passed" claim: code structure supports it; tests were not executed.
- A's live Supabase project ref: injected via Vercel env vars, not visible in the repo; whether the deployed `master-ceo-dashboard` route currently serves vw3 with live data was not checked (no live browser in this task).
- C's 27 pages: the 11 outline pages share one verified generic renderer; not every page was individually opened in the probe (per the build record).
- PR #64 details came from `list_pull_requests` only (`get_pull_request` is not advertised by the GitHub MCP server here).

## Bottom line for the canonical pick

- Pick **A** if the ruled-correct visual system + its Vercel route is the foundation, accepting that PR #64's quality gate is still open and much content is placeholder.
- Pick **B** if the 2.0 app's production features (preflight, Provider Router, Hold Queue, Voice Library, loop engine receipts) matter most, accepting it is local-only with no backend, no hosting, and it contradicts the Oct-22 ruling.
- Pick **C** if a working, monitored, end-to-end-runnable system is the priority, accepting it runs on its own database and the Supabase data-home wiring is still to come.
- Cross-lineage gaps no single lineage covers alone: Directives D1–D16 (only C), the loop engine (only B), the ruled-canonical visual lock + PR #64 gate (only A), Voice Library/Hold Queue/Save Map/Plans & Tiers as full pages (only B), real health monitoring (only C).
