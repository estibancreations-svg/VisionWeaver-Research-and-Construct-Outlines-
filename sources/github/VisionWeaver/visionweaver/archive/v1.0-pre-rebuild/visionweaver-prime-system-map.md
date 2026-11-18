# VisionWeaver Prime — The System Map

**What this is:** every page, button, field, and action in the live VisionWeaver Prime
system — what it is supposed to do, what it actually does when used, and what the code
says — mapped Oct 23 2026 at Steve's direction after he found the site "looks awesome"
but "isn't doing anything" when clicked.

**The system mapped:** VisionWeaver Prime, Vercel project `visionweaver-prime`,
live at **https://visionweaver-prime.vercel.app** (last deployed Oct 12 2026).
Spec source: the Prime contracts (`routes.json`, `page-registry.json`,
`integration-inventory.json`) from the Oct 20 handoff package. Code source: the
`estibancreations-svg/VisionWeaver-Prime` repo. Live source: a full click-through
audit of the deployed site, signed out, in Sample mode, Oct 23 2026.

---

## The verdict in one paragraph

Prime is **a working records application wearing a production platform's interface**.
The frame is real: all 27 routes exist, navigation works everywhere, the sign-in
system is genuinely built, and a narrow Supabase back end (5 tables) really stores
projects, initiatives, and records. But the production engine the interface promises
**does not exist**: across the whole system there is no generation of anything, no
file upload (there is no file-input element anywhere in the code or the live app),
no publishing, no payments, and no agent execution — the site's own inventory says
**0 of 18 integrations fully verified, 3 partial** (Supabase, Vercel, GitHub).
Most pages are display surfaces or run on one generic records mechanism. The reason
clicks feel dead is structural: the deployed default is Live mode, where signed-out
or workspace-less visits collapse every data surface to empty states while the
sample layout still renders around them — finished to the eyes, empty under the hand.

## The three doors (read this first)

| Address | What happens |
|---|---|
| `visionweaver-prime.vercel.app` | **The real public door.** Loads the app, no Vercel login. This is the address to share. |
| Per-deployment URLs (`visionweaver-prime-<hash>-….vercel.app`) | Walled behind Vercel's SSO login — normal for raw deployments, useless for subscribers. |
| `estibancreations101.vercel.app` (the address in the Oct screenshots) | **404 — "deployment could not be found."** Anyone holding this link thinks the product doesn't exist. |

## How the app is actually reached

- The spec's canonical paths (`/app/home`, `/app/vision-builder`, …) **return 404**.
  The live app routes by **hash** (`/#home`, `/#vision-builder`, …) through the sidebar.
- The spec's login route `/auth` **returns 404**. Sign-in is a dialog on the home page.
- Every page carries three layouts (V1/V2/V3 "Visual views"); the choice persists
  per page in the browser. A Sample/Live data toggle switches between sample
  figures and signed-out live empty states. Both work.

---

## The 27 routes — intended vs actual

Verdict key — **REAL**: does its job with live or genuinely functional behavior ·
**PARTIAL**: some real function; its core production actions error or are blocked ·
**STUBBED**: controls exist; every action answers "not connected / needs the backend" ·
**DISPLAY**: presents information; no working controls beyond view switching.

| # | Route (live hash) | Supposed to do | What the audit found | Verdict |
|---|---|---|---|---|
| 1 | Home — `#home` | Command dashboard over all projects | Navigation cards all work; System Status runs a real Supabase probe ("Reachable · RLS enforced"); all figures sample in Sample mode, empty states in Live mode | REAL (shell) |
| 2 | Vision Builder — `#vision-builder` | Turn a prompt into a production | Intake form works; drafts save in the browser and persist; model picker disabled ("No provider connected"); Text-to-Video, Image Generation, Submit-for-approval all error — no provider adapter | PARTIAL |
| 3 | Strategic Planner — `#strategic-planner` | Roadmaps, scenarios, goals | Three polished views; zero interactive elements; all static sample data | DISPLAY |
| 4 | Initiatives — `#initiatives` | Track initiative pipeline | A genuinely working kanban: add initiatives, move cards between stages, audit trail updates; in Live mode backed by the real database | REAL |
| 5 | Programs & Projects — `#programs-projects` | Portfolio command over programs/projects | V1 type-filter tabs are DEAD (highlight, don't filter); project tiles aren't buttons; tables/Gantt static (Live mode does read real projects per the code) | DISPLAY (dead filters) |
| 6 | AI Co-Pilot — `#ai-co-pilot` | THELMA and agents working for you | Prompt box accepts text; Send answers "THELMA and the agent runtime are not connected. Nothing was sent." Agent Run buttons error the same way; marketplace is inert by design | STUBBED |
| 7 | CMI — `#cmi` | Market intelligence | Charts/tables only; no controls; static sample data | DISPLAY |
| 8 | Directors Guild — `#directors-guild` | Review & decision queue, publish gate | Status filter WORKS; publish-gate preview WORKS (type APPROVED → unlock → "Nothing was published"); the submit form is static text ("departments add these in the backend") | PARTIAL |
| 9 | Teams — `#teams` | Org, authority, handoffs | Display only; its V2 table is duplicated verbatim on the C-Suite page; invitations need backend + sign-in | DISPLAY |
| 10 | C-Suite — `#c-suite` | Executive team & agent operations | Display only; all four executives "Not connected"; page header shows "09" — Teams' number, duplicated | DISPLAY |
| 11 | Create & Produce — `#create-produce` | Launch creation (Book/Commercial/Film/Image/Series/Clip) | Launcher WORKS; "Run preflight" is a real diagnostic — it blocks generation with 7 of 7 checks failed, each with its reason; the provider workbench lists all 7 adapter methods "Not implemented" | PARTIAL (honest gate) |
| 12 | Book Creation — `#book-creation` | Write and publish books | Chapter editor WORKS locally (autosave, live word count); "Adapt to episode" and "Cover and edits" error — need the backend | PARTIAL |
| 13 | Avatar Engineering — `#avatar-engineering` | Build and approve avatars | Workflow tabs only swap a description line; Generate Variations / Save to Library / Use in Scene all error; the 360 coverage switcher (16/32/64) works; the 64 board is "BLOCKED — not built" | PARTIAL |
| 14 | Worlds & Locations — `#worlds-locations` | Location packs & world building | Pack filter tabs DEAD; map is a labeled schematic ("positions are placeholders, not geodata"); all static | DISPLAY (dead filters) |
| 15 | Design Studio — `#design-studio` | Design tools workspace | All 7 tool "Open" buttons ERROR ("…needs the Prime backend"); right pane permanently "No design open" | STUBBED |
| 16 | Design & Commercial — `#design-commercial` | Commercial storyboard studio | Storyboard slot editor WORKS locally (fields save, completion counter updates, V1 mirrors edits); "Generate scene image" errors — no provider | PARTIAL |
| 17 | Scene Production — `#scene-production` | Shot lists, timelines, continuity | Display only; preflight locks all ✕ "No provider is connected" | DISPLAY |
| 18 | Media Library — `#media-library` | Hold, search, and organize all media | **Search box DEAD** (typing filters nothing); type tabs DEAD; **no upload control exists anywhere on the page** — media cannot be added at all; V1 counts show "—" even in Sample mode | DISPLAY (core function absent) |
| 19 | Post Production — `#post-production` | Edit, finish, export masters | Display only; the Export panel lists masters "Not rendered" — and there is **no export/download button** | DISPLAY |
| 20 | Distribution & Growth — `#distribution-growth` | Connect platforms, publish, grow | YouTube/TikTok/Instagram/Facebook all "Not connected"; Connect buttons error — no authorization flow even starts | STUBBED |
| 21 | Quality & Audit — `#quality-audit` | Verification chain & release gates | Display only — but it's the app's own honest status board: of its 13 release gates, **7 are UNIMPLEMENTED** by its own count | DISPLAY |
| 22 | Finance & Accounting — `#finance-accounting` | Budgets, spend, revenue | Static sample figures ($286,420 revenue etc.); every real field is "—"; "Stripe and commerce are not verified for Prime" | DISPLAY |
| 23 | IT & Security — `#it-security` | Integrations & security posture | The 18-integration inventory (0 verified, 3 partial) plus real read-only probes in code; V2 has a **rendering bug** printing "Verified0.0005555555555555556%"; policies "specified, not enforced" | PARTIAL (with bug) |
| 24 | Resources — `#resources` | Resource & template hub | Filter tabs DEAD; category cards inert; counts duplicate the Assets page's numbers | DISPLAY (dead filters) |
| 25 | Assets & Knowledge — `#assets-knowledge` | Asset library | Filter tabs DEAD; no search box despite the page's "Search · Organize · Preview · Use" subtitle | DISPLAY (dead filters) |
| 26 | Reports & Insights — `#reports-insights` | Executive reporting | Static sample KPIs; its own provenance panel admits "Prime has no data source yet"; **no report download/export anywhere** | DISPLAY |
| 27 | Settings — `#settings` | Control the system | The most functional page: view radios + Open buttons WORK (they re-layout every page), data-mode buttons work, notification preferences save (browser-only), view-selections JSON export + Copy works; Team/Security panels mostly static; nothing reaches a backend | REAL (local scope) |

**Scoreboard: REAL 3 · PARTIAL 7 · STUBBED 3 · DISPLAY 14 — and 0 routes that can
generate, receive an upload, publish, or take a payment.**

## Site-wide defects (all verified live)

1. **Documented routes 404.** `/app/*` and `/auth` — the paths in the build's own
   contracts — return Vercel 404s. Only hash routing works.
2. **The shared address is dead.** `estibancreations101.vercel.app` → DEPLOYMENT_NOT_FOUND.
3. **Dead filters/search on 5 pages** (Programs & Projects, Worlds & Locations,
   Media Library, Resources, Assets & Knowledge): controls highlight but never filter.
   The Quality page's own gate #4 claims "no inert actions" as CODED — contradicted.
4. **No deposit spaces exist.** Nothing anywhere accepts an upload or attachment —
   no file input in the code, none in the live app. Media Library, the page whose
   job is holding media, has no way to receive any.
5. **No exits exist.** No download/export of anything a user makes (the one working
   "export" copies a settings JSON). Post Production shows an Export panel with no
   export button.
6. **The percentage bug.** IT & Security V2 prints `Verified0.0005555555555555556%`.
7. **Inconsistent sample data.** Initiatives V1 counts (26 items) ≠ its V2 board
   (10 cards); Resources and Assets & Knowledge show identical asset counts;
   C-Suite wears Teams' page number "09".
8. **Social sign-in is decorative.** Google/Apple/Microsoft buttons render with
   "single sign-on is not turned on yet."
9. **The THELMA diagnostic that isn't.** On the Quality page, the "THELMA diagnostic"
   action writes audit-log rows claiming a dispatch was queued — no diagnostic runs.

## What genuinely works (verified end-to-end in the live audit)

Hash routing and every sidebar/menu navigation · global page search · the
Sample/Live toggle with correct signed-out empty states · V1/V2/V3 view switching
with per-page persistence · per-page review notes that save and persist · the
12-step system tour · notifications and account dialogs · the Create menu ·
Vision Builder intake drafts (persist across sessions) · the Initiatives kanban
(add/move/audit trail) · the Book chapter editor (autosave + word count) · the
Commercial storyboard editor · Create & Produce preflight (blocks with reasons) ·
Directors Guild filtering and the publish-gate preview · the Avatar 360 switcher ·
Settings' view control, data mode, and preference toggles. **Every one of these is
browser-side or records-side. Nothing that needs a server-side provider, THELMA,
money, or publishing works — those paths are stubbed, most of them honestly labeled.**

## The fresh-account (blank slate) test

**Status: NOT RUN.** The test account (`estibancreations+vwtest@gmail.com`) required
a password set by Steve through the secure vault card; the card was not submitted,
so no account was created and no credential was ever entered. What the code
establishes about that path, for the record: sign-up itself is fully implemented
(Supabase Auth — password, magic link, reset, confirmation handling). After
sign-up, **workspace creation is manual, not automatic**: a setup step creates the
organization + architect membership, and starter-data import is a separate explicit
action — so a brand-new subscriber lands in an **empty Live-mode app** (the exact
"looks finished, does nothing" state) until they complete setup. One repair layer
exists for an architect with an empty workspace.

## Why your clicks did nothing — the three causes

1. **Live mode is the deployed default.** Signed out or without a workspace, data
   surfaces collapse to "No records / Sign in to load" while the full sample layout
   still renders — a finished-looking shell over empty rooms.
2. **Many controls are local-demo controls.** Sample boards, slots, drafts, and
   notes respond inside the browser only; their effects never reach a server.
3. **The domain actions are absent or inert by design.** Generate, Ask THELMA,
   Publish, Upload, Connect, Pay — each is either missing or answers with an honest
   "not connected" message. The interface was built first; the engines were not.

## What realigning takes (dependency order)

1. **Fix the doors** — point every shared link at `visionweaver-prime.vercel.app`;
   make the documented `/app/*` and `/auth` paths resolve (rewrites to the hash
   app or real routes), so the system's own contracts stop 404ing.
2. **Give a new account a floor** — automatic workspace creation on sign-up (or a
   guided setup that completes), so a subscriber never lands in the empty-shell state.
3. **One engine, end to end** — connect ONE provider path (Runway) through ONE
   route (Create & Produce → Scene Production) with real upload, real storage
   (Supabase Storage), and the audit ledger — prove a single generated artifact
   travels intake → generation → library → export. Every other route's stub can
   then be wired to the same spine.
4. **The deposit spaces** — file upload into Media Library / Assets (Supabase
   Storage + records), which unblocks Avatar Engineering and Worlds.
5. **The exits** — rendered-master export/download in Post Production and report
   export in Reports & Insights.
6. **THELMA for real** — the agent runtime behind AI Co-Pilot, replacing the
   labeled panels; until then the page's honesty is its only function.
7. **Sweep the small stuff** — the percentage bug, the dead filters/search (wire
   them or remove them — the Quality gate already claims no inert actions),
   consistent sample data, the duplicated page number.
8. **Commerce last** — Stripe verification, once something exists worth charging for.

## Provenance of this map

- **Intended function:** Prime contracts in the Oct 20 2026 handoff package
  (`contracts/routes.json`, `page-registry.json`, `integration-inventory.json`).
- **Live behavior:** full click-through audit of the deployed site, Oct 23 2026
  (all 27 routes, Sample mode, signed out; destructive controls deliberately not
  exercised; the fresh-account walk not run — see above).
- **Code truth:** VisionWeaver-Prime repo source map (companion analysis,
  `hidden_files/prime-repo-source-map.md` in the goal workspace).
- **Deployment facts:** Vercel connector reads, Oct 23 2026 (project
  `visionweaver-prime`, latest production deployment Oct 12 2026).

*Mapped by Jason (Muse) at Steve's direction, Oct 23 2026. Nothing on the live
site was changed by this audit; test entries created during it are prefixed VWTEST
and live in the browser-side sample data / local drafts.*
