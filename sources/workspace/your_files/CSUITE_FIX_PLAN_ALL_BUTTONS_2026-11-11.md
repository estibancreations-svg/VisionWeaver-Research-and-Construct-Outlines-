# FIXING THE SYSTEM — THE FULL PLAN
## Every button wired, every action built, the structure corrected, connected everywhere
### Written 2026-11-11, in response to the owner's direction: "All of them."

---

## §1 — THE SCREENSHOT: WHAT YOU ARE LOOKING AT, AND IS SUPABASE CONNECTED?

**What the screenshot is:** You are on **Vercel.com**, on the **Vercel Marketplace Supabase integration installation page**. Vercel is offering to install its Supabase integration into your Vercel account. That integration would auto-create (or link) a Supabase project and auto-inject environment variables into your Vercel projects.

**Is Supabase connected right now? YES — the app is connected. The integration is not installed, and you do not need it.**

Here is the distinction, plainly:

- **The APP is connected to Supabase.** The proof is the live data you see in the app: real projects (11–12), real initiatives (12), real records (20), real Directors Guild submissions (20), real files (2), real integration inventory (18), real audit events. That data comes from your Supabase project **azoqszhhmmkyqztubgem** ("MASTER_CEO_DASHBOARD"), via 4 environment variables that are already set in your Vercel project (all environments): `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`. The app's code reads those variables and queries Supabase directly. That connection is LIVE and WORKING. If it were not connected, the app would show "Live data unavailable" and all counts would be 0 — which is what it showed BEFORE the env vars were set and the database permissions were fixed on 2026-11-10.

- **The VERCEL MARKETPLACE INTEGRATION is not installed.** That is what the screenshot shows — the installation page, asking you to pick a plan. The integration is a SEPARATE convenience. It is NOT required for the app to connect to Supabase. The manual env vars already do the job.

**DO NOT INSTALL THE INTEGRATION. Here is why:**

1. **It costs money.** The Free Plan is UNAVAILABLE for you. The screenshot says, word for word: "Unavailable — The following members have reached their 2 project Free Plan limit: estibancreations@gmail.com. All active projects in Free Plan Organizations count towards this limit." You already have 2 active Supabase projects on the Free Plan (azoqszhhmmkyqztubgem and yqealeekngxooyoemfba). To install the integration, you would have to pick the **Pro Plan at $25/month** or the **Team Plan at $599/month**. There is also a warning at the top: "Upgrade your plan to support your selected configuration."

2. **It could BREAK your working connection.** Installing the integration would create a NEW Supabase project (or link one) and OVERWRITE the environment variables in your Vercel project. If it points to a different (new, empty) Supabase project, your app would suddenly show ZERO data — all 11 projects, 12 initiatives, 20 records would vanish from the app, because it would be reading from an empty database. Your real data would still exist in azoqszhhmmkyqztubgem, but the app would not be looking at it anymore. That is a real risk, and it is not worth taking for a convenience you do not need.

3. **It would not fix a single dead button.** The dead buttons are dead because the ACTION CODE was never written (see §3). The integration does not write code. It only manages env vars. Installing it would change nothing about what the buttons do.

**What to do with that page:** Close it. Do not pick a plan. Do not click Continue. Your Supabase connection is already working via the env vars. If you ever want the integration for convenience in the future, that is a separate decision — but it is not needed, it is not free for you, and it carries the overwrite risk above.

**One real Supabase limitation (not a connection problem, a permissions problem):** The app reads Supabase as the `anon` role (because there is no sign-in). `anon` has SELECT only — it can READ data, but it cannot WRITE (no INSERT, UPDATE, or DELETE). That means even after the action code is written, buttons that WRITE (Approve, Pause/Resume, Create, Save) cannot write directly from the browser as `anon`. They need a server-side route (a small backend function that uses the service-role key, which bypasses permissions, and is never exposed in client code). Building those server routes is part of the fix plan (§3, Phase 1). This is a design constraint, not a broken connection.

---

## §2 — THE ARCHITECTURE CORRECTION: CEO DASHBOARD FIRST, VISIONWEAVER INSIDE IT

**You are right. I built it backwards. Here is the correction.**

**What you said (and what is correct):** The system is the **MASTER CEO DASHBOARD** (the enterprise command center). **VisionWeaver is a LINKED SYSTEM WITHIN IT** — one of the 6 Core Systems. The CEO Dashboard has its OWN build out (its own pages, its own structure). You have not gotten to the CEO Dashboard's build out because you have been stuck in loops with me on the VisionWeaver part.

**What I built (backwards):** I made the **VisionWeaver dashboard the HOME page** (`/`). The app opens to VisionWeaver (hero banner, 12 cards, right rail). The CEO Dashboard is a secondary page (`/ceo-dashboard`) that you navigate TO from the VisionWeaver sidebar. That inverts the hierarchy. VisionWeaver is presented as the whole app, and the CEO Dashboard is presented as one page inside VisionWeaver. That is wrong.

**What it should be:**

```
MASTER CEO DASHBOARD (the front door — /)
│
├── Enterprise Overview (globe, stats)
├── Pending Items
├── Note Pad
├── C-Suite (10 officers)
├── Core Systems (6 linked systems) ← VisionWeaver is ONE of these
│   ├── VisionWeaver → enters the VisionWeaver subsystem
│   ├── GrantOS → (linked system)
│   ├── LandWeaver → (linked system)
│   ├── THELMA → (linked system)
│   ├── CMGIO → (linked system)
│   └── OSIRIS → (linked system)
├── Key Metrics
├── Recent Activity
├── Quick Actions
└── CEO Dashboard pages (13 nav items — see below)
    ├── Home (the CEO Dashboard itself)
    ├── Notebook
    ├── Pending
    ├── Executive Command
    ├── C-Suite
    ├── System Portfolio
    ├── Resource Intelligence
    ├── Ecosystem Intelligence
    ├── Financial Command
    ├── IT / Infrastructure
    ├── Security Governance
    ├── Quality Audit
    └── Integration & Systems

VISIONWEAVER (a linked system — /visionweaver/*)
│
├── Home Dashboard (the VisionWeaver home I built)
├── Vision Builder
├── Strategic Planner
├── Initiatives
├── Programs & Projects
├── AI Co-Pilot
├── CMI
├── Directors Guild
├── Teams & C-Suite
├── Assets & Knowledge
├── Resources
├── IT & Security
├── Finance & Accounting
├── Reports & Insights
├── Settings (incl. Visual Views)
├── Avatar Engineering
├── Worlds & Locations
├── Distribution & Growth
├── Create & Produce
├── Design & Commercial
├── Media Library
├── Post Production
└── Quality & Audit Center
```

**What fixing this means in practice:**

1. **The home page (`/`) becomes the CEO Master Dashboard** (the gold/dark "ESTIBAN CREATIONS ENTERPRISE" view from your screenshot 4). That is the front door. It shows the enterprise overview, pending items, note pad, C-Suite, core systems (with VisionWeaver as a clickable linked system), key metrics, recent activity, and quick actions.

2. **VisionWeaver moves to `/visionweaver/*`.** The entire VisionWeaver UI I built (the 19 pages, the sidebar, the hero, the 12 cards) becomes the VisionWeaver subsystem, entered by clicking "VisionWeaver" from the CEO Dashboard's Core Systems (or from a "Systems" nav). The VisionWeaver sidebar stays intact INSIDE the VisionWeaver subsystem. The CEO Dashboard has its OWN nav (the 13 icon items from screenshot 4).

3. **The CEO Dashboard gets its OWN build out.** The 13 nav items on the CEO Dashboard (Notebook, Pending, Executive Command, C-Suite, System Portfolio, Resource Intelligence, Ecosystem Intelligence, Financial Command, IT/Infrastructure, Security Governance, Quality Audit, Integration & Systems) each need their own page/view. Currently, only the CEO Dashboard landing page exists (`/ceo-dashboard`); its 13 nav items do not have pages. Building those 13 pages is part of the fix (Phase 3).

4. **The naming is corrected.** The app is the Master CEO Dashboard. VisionWeaver is a system within it. The Supabase project name ("MASTER_CEO_DASHBOARD") is correct for the data home — it holds the enterprise data (projects, initiatives, records, gates, integrations, audit events, organizations, page registry). The Vercel project name (csuite-command) is fine — it is the C-Suite Command system. The GitHub repo name (csuite-command) is fine. What changes is the APP STRUCTURE (CEO Dashboard first, VisionWeaver inside), not the project/repo names.

**What I need from you on the architecture:** The CEO Dashboard's build out — do you have the design/pages for the 13 CEO Dashboard nav items (beyond screenshot 4, which shows the landing page)? If you have screenshots, a doc, or a description of what each of the 13 pages should contain, send it. If you do not have it yet, I will build the 13 pages from the structure in screenshot 4 (each page with its own layout, wired to live data where a table exists, honest empty state where it does not) and you can correct me. Either way, tell me which you prefer: (a) you send the CEO Dashboard build out, or (b) I build it from screenshot 4 and you correct it.

---

## §3 — THE FULL FIX PLAN: WIRE EVERY BUTTON, WRITE ALL THE CODE

This is the complete plan to make the system actually work — every button, every action, every page, connected everywhere it is supposed to be. It is a LARGE build, not a quick fix. It is sequenced so each phase builds on the last. I will do it in order, verify each phase live in the browser before moving on, and report honestly at each step.

### PHASE 0 — Architecture restructure (CEO Dashboard first, VisionWeaver inside)

**What I will do:**
1. Move the current home page (VisionWeaver dashboard) from `/` to `/visionweaver` (and all 19 VisionWeaver pages under `/visionweaver/*`). Update all internal links, nav items, and redirects so nothing breaks. Add a redirect from `/` (old VisionWeaver home) to the new location for any bookmarked links.
2. Make `/` the CEO Master Dashboard (the gold/dark view). Build it as the front door: enterprise overview, pending items (with working checkboxes that save), note pad (with working notes that save), C-Suite (10 clickable officer cards that open officer detail), Core Systems (6 clickable system cards — VisionWeaver enters the VisionWeaver subsystem; the other 5 show their status and link to their systems when they exist, or show an honest "not yet linked" state), key metrics (live where a table exists, honest empty state where it does not), recent activity (live audit events), quick actions (working buttons).
3. Build the CEO Dashboard's own nav (the 13 icon items) as a top nav on the CEO Dashboard pages, separate from the VisionWeaver sidebar.
4. Verify: open `/` — see the CEO Dashboard. Click VisionWeaver — enter the VisionWeaver subsystem. Click back (a "CEO Dashboard" link in the VisionWeaver sidebar) — return to the CEO Dashboard. All 19 VisionWeaver pages still load at their new URLs. No broken links.

**What I need from you:** The CEO Dashboard build out (see §2) — send it, or tell me to build from screenshot 4.

### PHASE 1 — Foundation (data tables + auth + server routes + types)

**What I will do:**
1. **Create the missing Supabase tables** (in azoqszhhmmkyqztubgem). The tables that do not exist yet, and are needed for the buttons to work:
   - `decisions` — for the Decision Queue (so it reads live data, not browser localStorage, and items are clickable).
   - `finance_records` (or `transactions`) — for Finance & Accounting (revenue, expenses, transactions) and CEO Dashboard Key Metrics.
   - `analytics` (or `content_analytics`) — for Reports & Insights and Distribution & Growth (views, engagement, followers, revenue).
   - `team_members` — for Teams & C-Suite and CEO Dashboard C-Suite (officer/member roster, roles, permissions).
   - `assets` — for Resources and Assets & Knowledge (indexed assets, with search).
   - `agents` — for AI Co-Pilot (agent definitions, status, runs).
   - `avatar_captures` — for Avatar Engineering (32-angle captures, per avatar).
   - `saved_worlds` — for Worlds & Locations (saved worlds, scene references).
   - `security_events` — for IT & Security (threats, events).
   - `content_items` — for Distribution & Growth (pipeline items, campaigns, scheduled posts).
   - `notes` — for CEO Dashboard Note Pad and Notebook (notes that save).
   - `pending_items` — for CEO Dashboard Pending Items (items that save, with checkboxes).
   - `training_tracks` / `training_materials` — for Training (tracks that open, materials that open).
   - `library_items` — for Reference Library (cards that open).
   - Each table gets: RLS enabled, an `anon` SELECT policy + GRANT (for reads, matching the existing pattern), and `authenticated` policies for writes (once auth exists). NO table is created without your say-so on the list — I will show you the list and get your go before creating any table.
2. **Add sign-in/auth.** Build a real login page (`/login`) with email/password sign-in (via Supabase Auth). Add a sign-out. Protect the app so it requires sign-in (or, if you prefer it open, add sign-in as an option for writes). Once auth exists, the `anon` SELECT policies are reviewed (they stay for public reads, or are tightened if you want the app private — your call). The sidebar shows the real signed-in user, not a hardcoded identity.
3. **Build server-side API routes** (in the TanStack Start app, under `src/routes/api/*`). These routes use the service-role key (server-side only, never in client code, never in the repo — read from env vars) to perform WRITES: approve/reject a submission, pause/resume a project, create a project, save a note, check/uncheck a pending item, save a decision, etc. Each route validates the request, checks the user is signed in (and has the right role), performs the write, and returns the result. The browser buttons call these routes — they do NOT write directly to Supabase as `anon` (which would fail).
4. **Generate the real Supabase Database types** (`src/integrations/supabase/types.ts`) from the live schema, so `.from('projects')` etc. are type-known. This prevents the class of bug that caused the home page crash (a type error that `vite build` does not catch).
5. **Add `tsc` to the build** (or a type-check step) so type errors FAIL the build instead of shipping a runtime crash. (The home page crash shipped because `vite build` does not type-check.)

**What I need from you:**
- Go-ahead on the table list (I will show it to you first).
- Auth decision: email/password sign-in? Or OAuth (Google)? Or keep the app open and add sign-in only for writes? And: should the app be private (sign-in required to view) or public (sign-in required only to change things)?
- Confirm: server-side routes using the service-role key are approved (the key stays in Vercel env vars only, never in code).

### PHASE 2 — Wire every button (the actions, page by page)

**What I will do (every button, every page — this is the core of "all of them"):**

**Search (fix it completely):**
- Make search actually FILTER the live data by the typed query (projects, records, initiatives, assets, team members, etc.). Typing "Crossroads" returns Crossroads. Typing "Avatar" returns avatar-related items.
- Make each search result DEEP-LINK to the actual item (project detail, record detail, etc.), not just the list page. This requires the detail pages below.

**Detail pages (build them — so links have somewhere to go):**
- Project detail page (`/visionweaver/projects/:id`): full project view — summary, kind/stage/phase, rights state, next step, timeline, related records, related assets, actions (Pause/Resume, Edit, Delete — all via server routes).
- Officer detail page (`/c-suite/:id` or `/ceo-dashboard/c-suite/:id`): officer profile — role, responsibilities, contact, recent activity, actions.
- Training track detail page (`/training/:id`): track overview, materials list (each material opens), progress, actions.
- Library item detail page (`/library/:id`): item view, content, actions.
- Location detail page (`/visionweaver/worlds/:id`): location view, assets, scenes, actions (Save to Library, Use in Scene, etc.).
- Asset detail page (`/visionweaver/assets/:id`): asset view, metadata, preview, actions (Use, Add to Collection, etc.).
- Record/submission detail page (`/visionweaver/directors-guild/:id`): submission view, history, actions (Approve, Request changes, with a comment/reason field).

**Directors Guild — Approve / Request changes (wire them):**
- Approve button: calls the server route, updates the submission status to APPROVED in Supabase, shows a confirmation, updates the list. The button disappears (or becomes "Approved") once the submission is APPROVED — no more "Approve on an APPROVED submission."
- Request changes button: opens a dialog for a reason/comment, calls the server route, updates the status to REVISIONS, shows a confirmation.
- Both buttons show a loading state while the write is in progress, and an honest error if the write fails.

**Projects — Pause / Resume (wire them):**
- Pause button: calls the server route, updates the project status to PAUSED in Supabase, updates the UI. Resume does the reverse. Loading state + honest error on failure.

**Vision Builder — tools (build them):**
- This is the biggest single piece. The 4 modes (Text to Video, Image Generation, Scene Composer, Story Builder) each need a working tool. That means: an input form (prompt, settings), a call to a generation API, a progress/loading state, a result view (the generated video/image/scene/story), and Save to Library / Use in Project actions.
- **DECISION NEEDED:** Which generation provider? Runway (you have Runway Pro — the Runway API can generate video)? Or another provider for images (e.g., a text-to-image API)? Or both? And: API keys — I need the Runway API key (via the Secure Vault, never in chat) if we use Runway, and any other provider's key. And: billing — generation costs credits/money; confirm you approve generation spend (and any limit).
- If you do not want to wire a live generation API yet, the alternative is to build the tool UIs with a clear "Connect a provider to generate" state — but that is not "working," it is a placeholder. Tell me which you want: live generation (needs keys + spend approval) or tool UIs ready for a provider (honest placeholder).

**AI Co-Pilot — connect it:**
- Build the `agents` table (Phase 1), wire the Ask input to an AI API, implement the 6 agents (Research, Content, Video, Compliance, CMGIO, Quality Control) so each one actually runs (takes the input, calls the AI, returns a result, logs the run).
- **DECISION NEEDED:** Which AI provider? Anthropic (Claude API)? OpenAI? Another? And: API key (via Secure Vault, never in chat). And: spend approval + limit (AI calls cost money). The agents' logic (what each agent does, what prompt it uses) also needs your input — or I will draft it from the agent names/descriptions and you correct it.

**V1/V2/V3 view switching (make them real):**
- Implement the alternate layouts for EVERY page that has V1/V2/V3 (all 19 VisionWeaver pages + the CEO Dashboard pages if they have views). Currently only Worlds has three genuinely different views. Each page's V1/V2/V3 must actually change the layout (not just highlight the button). The layouts come from your screenshots (screenshot 8, the Complete Navigation Buildout, shows the locked layout for each page; the alternate views are described in screenshots 5, 6, 7 for Worlds, Resources, and Distribution). For pages where I do not have the alternate view designs, I will build sensible alternates from the locked layout and you correct them.

**C-Suite / Training / Library cards (make them open):**
- C-Suite executive cards → open the officer detail page (above).
- Training tracks → open the track detail page (above). Training materials → open the material.
- Library cards → open the item detail page (above).

**Decision Queue (wire it):**
- Build the `decisions` table (Phase 1). The Decision Queue reads live decisions (not localStorage). Each item is clickable → opens the decision detail (with Approve/Reject/Advance actions, via server routes). "OPEN QUEUE" → the full Decision Queue page (`/decisions`), with working filters and actions.

**CEO Dashboard Quick Actions (wire them):**
- "New Project" → opens a real Create Project form (name, kind, description, etc.), calls the server route, creates the project in Supabase, navigates to the new project detail page. (Currently it just links to /projects.)
- "Open Notebook" → opens the Notebook page (Phase 3) with working notes.
- "View Pending" → opens the Pending page (Phase 3) with working checkboxes.
- "System Status" → opens the System Status / Health page with live status.

**Fix mislabeled links:**
- "Open Full Notes" → opens the Notebook/Notes page (not /assets). Or relabel it to what it actually does.
- Any other link that goes to the wrong place → fix it to go to the right place.

**Vision Builder mode cards, Worlds Save/Preview, and every other button:**
- Every button on every page is clicked, verified, and wired. If a button has no sensible action, it is removed (not left dead). No dead buttons remain. The full button inventory is in §4.

**Verification (per page, before moving on):** For each page, I will click EVERY button/link/toggle on that page in the live browser and confirm it does what it should (navigates, opens a dialog, saves, updates, shows a result, or shows an honest error). No page is called done until every control on it is verified. This is the TEST-ALL standard you set.

**What I need from you:**
- Generation provider + API keys + spend approval (for Vision Builder tools) — OR tell me to build tool UIs as honest placeholders for now.
- AI provider + API key + spend approval (for AI Co-Pilot) — OR tell me to build the agent UIs as honest placeholders for now.
- Agent logic input (what each of the 6 agents should do) — OR tell me to draft it and you will correct it.
- Alternate view designs (for V1/V2/V3 on pages where I do not have them) — OR tell me to build sensible alternates and you will correct them.

### PHASE 3 — CEO Dashboard build out (its own 13 pages)

**What I will do:** Build the 13 CEO Dashboard pages, each with its own layout, wired to live data where a table exists, honest empty state where it does not, and every button wired (per Phase 2 standards):
1. **Home** — the CEO Dashboard landing page (the front door, Phase 0).
2. **Notebook** — working notes (create, edit, delete, search — via server routes, saved in the `notes` table).
3. **Pending** — working pending items (checkboxes that save, add/edit/delete items, priorities, due dates — via server routes, saved in the `pending_items` table).
4. **Executive Command** — executive overview, decisions awaiting the CEO, command actions.
5. **C-Suite** — the 10 officers (clickable → officer detail), org chart, roles/permissions.
6. **System Portfolio** — the 6 Core Systems (VisionWeaver, GrantOS, LandWeaver, THELMA, CMGIO, OSIRIS) with status, health, links to each system.
7. **Resource Intelligence** — resources overview, allocation, utilization.
8. **Ecosystem Intelligence** — ecosystem overview, partners, integrations, external systems.
9. **Financial Command** — finance overview (revenue, expenses, profit, cash — from the `finance_records` table), budgets, invoices.
10. **IT / Infrastructure** — infrastructure overview, deployments, databases, backups, health (from `integration_inventory` + live status).
11. **Security Governance** — security overview, threats, events (from `security_events` table), policies, access control.
12. **Quality Audit** — audit overview, QA checks, release gates (from `release_gates` table), evidence logs, certifications.
13. **Integration & Systems** — integrations list (from `integration_inventory`, 18 integrations), connection status, add/manage integrations.

**What I need from you:** The CEO Dashboard build out (see §2) — send it, or tell me to build from screenshot 4 and you will correct it.

### PHASE 4 — Connect everywhere (integrations + linked systems)

**What I will do:**
1. **Wire the 18 integrations** in `integration_inventory` — for each one, determine if it is a real integration (with an API/connection) or a placeholder. For real ones, build the connection (API client, auth, status check, data sync). For placeholders, mark them honestly as "Not connected" with a "Connect" action that explains what is needed.
2. **Link the 6 Core Systems** — VisionWeaver is built (this app). GrantOS, LandWeaver, THELMA, CMGIO, OSIRIS: are these separate apps/repos? Do they have URLs/APIs? For each one that exists, link it from the System Portfolio (clicking it opens that system). For each one that does not exist yet, show an honest "Not yet built" state. Tell me which of the 6 exist and where they live.
3. **Connect Runway** (for Vision Builder tools + the Fireside production line, if you want the app to trigger Runway generations) — needs the Runway API key + spend approval (see Phase 2).
4. **Connect any other external services** you name (Google Drive? Dropbox? Email? Calendar? Social platforms for Distribution?) — each needs its own connection (OAuth or API key) and your go-ahead.

**What I need from you:**
- Which of the 6 Core Systems exist, and where (URL/repo/API)?
- Which integrations (of the 18) are real, and what credentials/connections do they need?
- Which external services should the app connect to, and how (OAuth? API key?)?

### PHASE 5 — Final TEST-ALL + deployable + handoff

**What I will do:**
1. **Full TEST-ALL QA:** Click every button, every link, every toggle, on every page (CEO Dashboard + VisionWeaver + all detail pages), in the live browser. Verify every action works (navigates, saves, updates, generates, or shows an honest error). Verify every page loads. Verify sign-in/sign-out. Verify the app on mobile (it is responsive — check it). No page, no button is left untested.
2. **Fix everything found.** Any dead button, broken link, wrong navigation, or failed write is fixed and re-verified before I report done.
3. **Deployable:** Confirm the app deploys cleanly to Vercel (build passes, no type errors, no missing deps), the env vars are correct, and the production URL serves the working app. Confirm the deployment is the latest code.
4. **Handoff package:** An updated system package (like the one from 2026-11-10, but for the fully wired system) — every page, every button, every table, every route, every integration, with nothing left out — so you (or another system) can pick it up.

---

## §4 — BUTTON INVENTORY (every button/control, by page — all to be wired)

This is the inventory I will work through. If a button is not on this list, it does not exist (or I missed it — tell me). Every item below will be wired, verified, or removed (if it has no sensible action — with your say-so).

**CEO Dashboard (`/`):** 13 top nav items (Home, Notebook, Pending, Executive Command, C-Suite, System Portfolio, Resource Intelligence, Ecosystem Intelligence, Financial Command, IT/Infrastructure, Security Governance, Quality Audit, Integration & Systems) · Pending Items checkboxes (5) + "View All" · Note Pad bullets + "Open Full Notes" · C-Suite cards (10) + "Go to C-Suite" · Core Systems cards (6) + "View All Systems" · Key Metrics "View Details" · Recent Activity "View All" · Quick Actions (New Project, Open Notebook, View Pending, System Status).

**VisionWeaver Home (`/visionweaver`):** Search box · Live data chip · "+ Create" · Help (?) · Bell · Avatar · "+ New project" · "Show sample data" · Tour banner (Start tour, + New project, Not now) · Hero buttons (Enter VisionWeaver, View live projects) · 12 cards (each clickable) · Active Project "Open Project" · Production Pipeline "View All" · System Status items · Recent Activity "View All" · Decision Queue items + "OPEN QUEUE" · Featured Projects (6, each clickable) + "View All".

**Vision Builder:** 4 mode pills + 4 mode cards · Recent Creations items · (Tool inputs/buttons per mode — to be built in Phase 2).

**Strategic Planner:** Plan rows · Goal items · (Actions per goal — to be built).

**Initiatives:** Kanban cards (each clickable → detail) · Filter/status controls · "New Initiative" (if present).

**Programs & Projects:** Filter tabs · Project rows/cards (each clickable → detail) · "New Project" (if present) · Pause/Resume per project.

**AI Co-Pilot:** Ask input + Ask button · 6 agent cards · 5 action pills (Research, Create, Analyze, Automate, Optimize) · (Agent run/view buttons — to be built).

**CMI:** Trend/demographic controls · Top Content items (clickable) · Recent Intelligence items.

**Directors Guild:** Filter tabs · Submission rows (each clickable → detail) · Approve / Request changes per submission · Release gates items.

**Teams & C-Suite:** Tabs · Team member rows (clickable → detail) · "Add Member" · Roles/Departments controls.

**Assets & Knowledge:** 8 category tiles · Search box + filters · Asset items (clickable → detail) · Upload/Generate/Import buttons.

**Resources:** 3 view tabs (V1/V2/V3) · Search box + Search button · Type chips · Filters panel + Apply Filters · Result cards + "Use" buttons · Pagination · Saved Searches · (V3: Collections, Asset Details, Collaboration controls).

**IT & Security:** System Health controls · Security Status items · Threats list · Recent Activity · Infrastructure items (each clickable) · Integration items.

**Finance & Accounting:** 4 stat cards · Revenue vs Expenses controls · Recent Transactions items · (Add Transaction / Budget controls — to be built).

**Reports & Insights:** Stats controls · Performance Trend controls · Content Performance items · Report index items (clickable) · Generate/Export buttons.

**Settings:** Tabs (Global, Visual Views, Integrations, Security, Team, Notifications) · Visual Views V1/V2/V3 per page (19 pages) · Color Schemes · Compact toggle · Export workspace · Architect Authority controls · (Integration/Security/Team/Notification controls — to be built).

**Avatar Engineering:** Profile controls · 32 angle slots (each clickable → capture/detail) · "Generate Variations" · "Save to Library" · "Use in Scene" · (Voice/wardrobe/aging controls — to be built).

**Worlds & Locations:** 3 view tabs (V1/V2/V3) · 7 sub-tabs (Overview, Location Library, World Builder, Environment Tools, Scene References, Map View, Import) · Featured Locations (6, each clickable) · Category tiles · Recent Worlds items · Quick Actions (Search Location, Build Custom World, Import Reference, Open in Scene, Save to Library) · (V2: Map filters, Search Locations, World Building Tools, Location Packs) · (V3: World Settings, Save World, Preview in Scene, Environment Controls, Asset Library, Scene References, Save & Export).

**Distribution & Growth:** 3 option tabs (Option 1/2/3) · 6 sub-tabs (Overview/Publish/Campaigns/Analytics/Audience/Monetization, or Pipeline/Campaigns/Calendar/Analytics/Audience/Monetization, or Analytics/Audience/Content/Growth/Revenue/Reports) · Search + "+ New Campaign" · Filter chips + Board/Grid/List toggle · Pipeline cards (each clickable) · Campaign Timeline items · Quick Actions (Publish, Schedule, Create Campaign, Boost, View Analytics, Export, Add to Pipeline, Bulk Schedule, AI Suggestions, Export Plan, Generate Report, AI Thumbnails, Export Data).

**Create & Produce / Design & Commercial / Media Library / Post Production / Quality & Audit:** (These 5 pages are currently legacy routes — they will be rebuilt to the VisionWeaver layouts in Phase 2, and their buttons inventoried then.)

**Legacy routes (SYSTEM section):** T.H.E.L.M.A. Orchestration, System Registry, Runtimes, Connectors, Telecom, Assessment, Training, Launcher, Sessions, Tasks, Agents, Workflows, Workspaces, Memory, Files, Health, Search, C-Suite, Decisions, Library, Projects — every button/link on each of these pages is also in scope (wire, verify, or remove with your say-so).

---

## §5 — WHAT I NEED FROM YOU (to start, in order)

1. **The CEO Dashboard build out** — send it (screenshots/doc/description for the 13 pages), or tell me "build from screenshot 4 and I'll correct you."
2. **Table list go-ahead** — I will show you the table list (Phase 1) and get your go before creating any table. (You said "all of them" and "connected everywhere" — I read that as a go for the data layer, but I will still show you the list first because creating tables is a database write, and the standing rule is no writes without your say-so.)
3. **Auth decision** — email/password? OAuth (Google)? Keep the app open + sign-in only for writes? Private (sign-in to view) or public (sign-in to change)?
4. **Server routes go-ahead** — confirm I can build server-side API routes using the service-role key (key stays in Vercel env vars only, never in code).
5. **Generation provider + keys + spend** (for Vision Builder) — Runway? Another? API key via Secure Vault? Spend limit? Or honest placeholders for now?
6. **AI provider + key + spend** (for AI Co-Pilot) — Anthropic? OpenAI? Another? API key via Secure Vault? Spend limit? Or honest placeholders for now?
7. **The 6 Core Systems** — which exist, where do they live (URL/repo/API)?
8. **The 18 integrations** — which are real, what do they need?
9. **Your go** — say "go" and I start with Phase 0. I will report at each phase, verify live before moving on, and I will NOT call anything done until every button on it is clicked and verified.

---

## §6 — HONEST SCOPE NOTE

This is a **large build**. Wiring every button, building the missing tables, adding auth, building server routes, building the CEO Dashboard's 13 pages, restructuring the app, and connecting the integrations is **weeks of work, not hours** — even working in focused passes. I will not pretend otherwise. I will work in phases, verify each phase, and report honestly. If you want it faster, the lever is **scope** (which phases first) and **decisions** (the faster you answer the questions in §5, the faster I can build). I will not cut corners on verification — that is what got us into the loops. Every button will be clicked and verified before I call its page done.

**The loops stop here.** No more "done" without verification. No more rebuilding the same thing. The plan above is the whole job, in order, with nothing hidden. Tell me to go, and I will start with Phase 0.

**— Victoria (Vickie), 2026-11-11 21:20 CST**
