# Versions — Every Lineage, Every Build

Every version of the system: what it is, where it lives, dates, status, and what
superseded it. Commit ranges come from the per-repo `COMMITS.md` files under
`sources/github/` (default branch `main` only — branches were not enumerated).
"Frozen Oct 7, 2026" means the repo's last commit is the org-wide UI v1.2 sweep
("add view/theme settings and retire notebook styling").

Status key: **LIVE** = serving users now · **CANONICAL** = ruled the correct design
or record · **ACTIVE** = being worked · **STALE** = untouched, superseded, or
abandoned but preserved · **RETIRED** = explicitly retired by ruling or decision ·
**HISTORICAL** = reference only · **DRAFT** = proposed, unmerged.

---

## The main lineages

### A — vw3 (the design crown) — CANONICAL design

| Field | Value |
|---|---|
| Where | `estibancreations-svg/MASTER_CEO_DASHBOARD` — `src/components/VisionWeaverWorkspace.tsx` (+ `VisionWeaverSceneSetup.tsx`, `VisionWeaverAssemblyWatcher.tsx`), `docs/visionweaver/CANONICAL-V3-UI-REFERENCE-2026-10-08.md` |
| Dates | First commit 2026-07-28 → last commit 2026-11-12 ("Remove retired notepad theme + switcher"). 269 commits. |
| What | Single self-contained file (50,157 chars / 331 lines, styles embedded). 25 pages in 3 nav groups (Core 10, Create & Produce 8, Manage & Govern 7). Every page names 3 view variants (V1/V2/V3) — variants change subtitle text and a pill label only; one component renders per page. Canonical defaults match the Oct-08 reference doc exactly (LOCKED VISUAL TARGET). Dark navy/black shell, collapsible left nav, top search + Create + notifications, "The Architect / System Owner" account block, THELMA sidebar button (placeholder notice). |
| Data | Supabase client from `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` (ref injected at deploy, not in repo). One Edge Function call: `visionweaver-studio` (actions `list`, `refresh`). Auth via `useIdentity()`; live fetch only when signed in. All KPIs live-data-first with hardcoded fallbacks (e.g., 24 projects, 186 scenes, $286,420 revenue) — the UI can look fully populated with no backend. |
| Status | **CANONICAL design** per the owner's 2026-10-22 ruling. Release blocked on PR #64 (DO NOT MERGE until verified). Not "all the way live": Co-Pilot chat non-functional, substantial placeholder/demo content. |
| Superseded by | Nothing as a *design* — it is the crown. As a *runtime*, superseded by the C build / `csuite-command`. |
| PRs | #64 (DO NOT MERGE until verified), #63, #62 (owner's decision), #56, #55 — all open. |

### B — Repo 2.0 line (the engine) — STALE as an app, ACTIVE as the engine design

| Field | Value |
|---|---|
| Where | `estibancreations-svg/VisionWeaver` — `visionweaver-2.0/index.html` (31 KB single file) + `system/loop/` Python engine + `docs/` + `feed/` + `connections/` |
| Dates | First commit 2026-09-08 → last commit 2026-11-10 ("Commit the 2026-11-09 review package"). 192 commits. Key commits: `a87e505f` 2026-10-27 (2.0 unified rebuild); four Oct 30 "on Steve's order" commits (loop engine + 40 run manifests, v1 archive, feed records, README/ROADMAP). |
| What | Two taxonomies: the Oct-07 `ui-board-registry.ts` design lock (24 entries, 22 locked + 2 existing — a catalog, not runnable code) and the `visionweaver-2.0/index.html` single-file app (16 sections, Demo/Blank launches, 7-check preflight + Provider Router cost ceiling, localStorage per mode, JSON export). **Zero network calls**; sign-in is local email/password with Google/Apple/Microsoft buttons hard-disabled. Plus the Python loop engine (`run.py`, `stages.py`) with hard gates and 40 run-manifest receipts — genuine production-pipeline code. |
| Status | **STALE as an app** (local-only, not hosted — "Vercel deploy was refused, connector token lacked team write access"). **The engine design is ACTIVE** as layer B of the C/B/A target architecture. The 2.0 commit contradicts the Oct-22 vw3 ruling; the Nov 1 one-system decision resolved the contradiction by folding B's engine into C under A's crown. |
| Superseded by | The one-system build (C body + B engine + A crown), then `csuite-command`. |
| Unique assets | Loop engine + 40 run manifests; Voice Library / Hold Queue / Save Map & Storage / Plans & Tiers as first-class sections; feed/DECISIONS/ROADMAP records layer; v1 archive; quality-gate workflow. |

### C — Master fullstack build → csuite-command (the live system) — LIVE

| Field | Value |
|---|---|
| Where | `estibancreations-svg/csuite-command` (TanStack Start). Originated as "Estiban Command Nexus" in Lovable (different account), exported to GitHub 2026-11-10. Earlier incarnation: the "Master System Build Out Live" artifact (own server + database, 27 pages, built 2026-10-30). |
| Dates | Repo history from 2026-07-24 (template) → last commit 2026-11-12 (`0a6e630`, Phase A+C 51-file restructure). 51 commits. Live deploy from `a27dff3` (2026-11-10); UI rebuild verified 2026-11-10 19:35 CST (`c9063a6`); Phases A+C verified live 2026-11-11 22:07 CST. |
| What | The working system: 27 VisionWeaver pages + CEO Dashboard front door (post-Nov-11 restructure). Server-side sign-in/sign-out (verified in the artifact incarnation; the Vercel incarnation has **no auth — `/login` 404s** as of the Nov 11 QA). Live uptime ticker, real health checks, Demo/Blank modes, Directives D1–D16 under Settings, THELMA propose-only into the Directors Guild queue, Gate 2 (publish blocked unless APPROVED entered). |
| Status | **LIVE** at https://csuite-command.vercel.app. Navigation + live reads work; 90 dead controls, 19 placeholders, 1 broken write (Nov 11 inventory). Roster still the retired one. No auth. Search scans local seed records. See [SECTIONS-AND-SYSTEMS.md](SECTIONS-AND-SYSTEMS.md). |
| Superseded by | Nothing — this is the current live system. |
| Vercel | Project `csuite-command`, team `estibancreations101`, Pro plan. Old `master-system-buildout` project DELETED 2026-11-10 — do not repoint. |

### Prime — static front end — RETIRED (historical reference)

| Field | Value |
|---|---|
| Where | `estibancreations-svg/VisionWeaver-Prime` (static front end; `config.js` held the Supabase ref — M2, recovered). |
| Dates | First commit 2026-10-10 → last commit 2026-11-10 (trigger deploy). 52 commits. Preview checkpoint rendered navigation + 32-cell grid (Oct 8 reference / Oct 22 checkpoint). |
| What | Static front end with 13 Prime photos (sha256-verified in the Nov 10 rebuild; hero 9,146 B), complete auth in its archived form, 16-tile navigation image. |
| Status | **RETIRED** by the Nov 9 baseline: "Prime is historical reference. What was attempted against the 16-tile navigation image. Does not own canonical status." Vercel project `visionweaver-prime` still READY as a historical deployment. Prime assets in the live app are small/soft (open gap). |
| Superseded by | The C build / `csuite-command` (Nov 10 rebuild reused Prime's verified photos). |

### Director Studio 0.4.02 — WRONG VERSION — ARCHIVED

| Field | Value |
|---|---|
| Where | `~/workspace/visionweaver-archive/wrong-version-director-studio-ui-0.4.02/` (moved out of the working tree 2026-10-22). Also `VisionWeaver` repo `apps/director-studio/`. |
| Dates | Built before 2026-10-22; identified as wrong 2026-10-22. |
| What | A Director Studio UI build that is NOT the correct VisionWeaver system. |
| Status | **ARCHIVED — DO NOT USE.** Reusable multi-project pattern only. No deployment reference. |
| Superseded by | The Oct 22 canonical ruling (vw3). |

### VisionWeaver Command v6.0 — STALE, misnamed, PUBLIC — fate undecided

| Field | Value |
|---|---|
| Where | `estibancreations-svg/Master-dashboard-` (the whole repo). |
| Dates | First commit 2026-07-06 (earliest in the org). |
| What | A whole-repo "v6.0 console" build. Contains the literal STRATEGIC NOTEPAD component (`DashboardTab.tsx` — the only `FDF1AA`/`87CEEB` hits left in the org) and a committed `.env.production` (PUBLIC repo). |
| Status | **STALE.** Misnamed (it is not the Master Dashboard). Deliberately untouched: stripping the notepad component and rotating the committed env file wait on Decision 3 (recommendation: archive) and Decision 10. |
| Superseded by | The corrected architecture; fate = Decision 3 (open). |

---

## The CRM line

### standalone-crm v2.0 — LIVE (production) · v2.1 unmerged

| Field | Value |
|---|---|
| Where | `estibancreations-svg/standalone-crm` |
| Dates | First commit 2026-10-12 → last commit 2026-10-17. 32 commits. Prod = v2.0 `main` `609ca86` (Vercel READY). |
| What | T.H.E.L.M.A. CRM: 28-page system of record (messages, posts, campaigns queued — nothing sends yet; no live delivery, automations, forms, funnels, reviews flow, or voice AI). ThemePicker looks (Team look, Auto, Sculpted Paper, Professional Greyscale, Stealth). Uses Supabase `standalone-crm-test` (mock data, INACTIVE/paused project — do not touch). OPERATING_POLICY in effect. |
| Status | **v2.0 LIVE.** **PR #5 (v2.1) NOT merged — do not merge until he says OK.** Draft PR #6 (CI). GitHub App cannot create/update `.github/workflows/*.yml` (403). |
| GHL builds (unmerged) | **DRAFT PR #11** (delivery-first v4.1, 6 files: Resend + Twilio, delivery OFF by default) and **DRAFT PR #12** (scoring/lists v4.2, 9 files: 0–100 scores from 15 editable rules, self-updating smart lists). SQL suite UNRUN. ~$22–25 to start. Nothing charged/created. Awaiting his go. |

### THELMA-Global-Link-Logistics — BROKEN

| Field | Value |
|---|---|
| Where | `estibancreations-svg/THELMA-Global-Link-Logistics` |
| What | THELMA logistics build. **Broken: 2 missing files** (`Documentation.tsx`, `mobile_app_v1/App.tsx`). The approved restore source is a Drive zip — **the zip was not found in Drive**. |
| Status | **BROKEN.** Unresolved. |

### -THELMA-AI, DESIGN_STUDIO

| Repo | Status |
|---|---|
| `-THELMA-AI` | THELMA AI repo; frozen at the Oct 7, 2026 UI v1.2 sweep. STALE. |
| `DESIGN_STUDIO` | Reusable authoring module (avatar/scene authoring primitives). Notebook retirement enforced in tests. STALE as a standalone; primitives reusable per the Nov 9 baseline. |

---

## The documentation repo

### Master-System-Buildout — ACTIVE record, STALE as an app host

| Field | Value |
|---|---|
| Where | `estibancreations-svg/Master-System-Buildout` |
| Dates | First commit 2026-07-10 → last commit 2026-11-17. 298 commits (most in the org). |
| What | The documentation/spec repo: `07-DOCUMENTATION/` (projects incl. THE-ARC commercial production), REPOSITORY-MAP, VERCEL-ARCHIVE.md (the two stale projects archived + paused Nov 2). The two stale Vercel `master-system-buildout` projects were BLOCKED deploys of unrelated docs — never the VisionWeaver system; the Vercel project was DELETED Nov 10. |
| Status | **ACTIVE as the documentation record.** Not an app host. |

---

## The other Core Systems' repos

| Repo | What | Status |
|---|---|---|
| `OSIRIS` | The OSIRIS system repo. | Frozen Oct 7, 2026 (UI v1.2 sweep). STALE. No spec, no live app found. |
| *(no GrantOS repo)* | GrantOS exists only as Drive specs + `MAF/GrantOS Hub/`. | Specs only. No repo, no app. |
| *(no LandWeaver repo)* | Nothing found anywhere. | Never started (in the gathered record). |
| *(no CMGIO repo)* | CMGIO exists only as the Blueprint doc in Drive. | Blueprint only. No repo, no app. |

---

## Content / property repos (all frozen Oct 7, 2026 unless noted)

| Repo | What | Status |
|---|---|---|
| `The-Arc` | The Arc series property. | Frozen Oct 7, 2026. STALE. (The live app's Arc panel is gradient-only — no photo.) |
| `Crossroads-of-Identity` | Crossroads of Identity — the flagship pipeline property (D8). The only property registered in the Nov 9 spec. | Frozen Oct 7, 2026. STALE as a repo; the property is ACTIVE in the design. |
| `This-Is-Your-Life` | This Is Your Life series property. | Frozen Oct 7, 2026. STALE. |
| `52-Books-in-52-Weeks` | Book property. | Frozen Oct 7, 2026. STALE. |
| `content-that-builds` | Content property. | Frozen Oct 7, 2026. STALE. |
| `-Five-Stations-Learning-Serie` | Five Stations learning series (incl. `runway_prompts_v2/`). | Frozen Oct 7, 2026. STALE. One file unresolvable (broken/internal symlink — see [SOURCES.md](SOURCES.md)). |
| `Higgsfield-Integration-Layer` | Higgsfield integration layer. | Frozen Oct 7, 2026. STALE. (`.env.example` contained real-looking secret values — redacted in this hub.) |
| `reunion-os` | Reunion OS. | Frozen Oct 7, 2026. STALE. |
| `motive-next-deployment` | Motive deployment lineage (Netlify bundles; Drive roots Jan 2026). | Frozen Oct 7, 2026. STALE. |
| `Paypal_Portal` | PayPal portal. | Frozen Oct 7, 2026. STALE. |
| `Leadstack-Clone` | Leadstack clone (PR #6 merged Oct 17). | STALE (post-Oct-17 activity in the CRM track only). |
| `crm-tour-deck-build-temp` | Temporary CRM tour-deck build. | STALE / temp. |
| `-HisMajesty0225-CEO-Dashboard` | HisMajesty0225 CEO Dashboard (pre-archive lineage). | STALE. Deep content comparison + exhaustive sweep for HisMajesty0225 not done; nothing deleted/moved/merged. |
| `Archive-HisMajesty0225-Shenry60` | Archive of the Shenry60 account's repos. | ARCHIVE. Shenry60 account deletion is the owner's decision (GitHub settings, only after he's satisfied with the archive). |

## Bridge repo

| Repo | What | Status |
|---|---|---|
| `ChatGPT--EstibanCreations` | ChatGPT↔Muse bridge (owner-created 2026-11-17, PUBLIC). 6 commits, all 2026-11-17. 5 open issues (#1 novella series, #2 commerce, #3 revenue intelligence, #4 registry/automation, #5 visibility) + DRAFT PR #6 (workstream organization — for HIS review, DO NOT MERGE). `BRIDGE.md` committed by Muse 2026-11-17 (write access verified). | ACTIVE (bridge track, separate from the system build). |

---

## Version count reconciliation

- **27 repos live** under `estibancreations-svg` (verified twice, 2026-11-18). **26
  mirrored** in this hub; the destination repo itself is skipped.
- The original brief listed 25 known repos; the live list added `ChatGPT--EstibanCreations`
  (created Nov 17) and one more found by the live search. The per-repo
  `FILE-TREE.md` / `COMMITS.md` / `PULL-REQUESTS.md` / `ISSUES.md` files under
  `sources/github/<repo>/` are the authoritative per-repo record.
- **123 pull requests** (full bodies) and **13 issues** were gathered across all repos.
  PR counts per repo are in each repo's `PULL-REQUESTS.md` — do not re-derive them
  from heading counts.
- **Branches were NOT enumerated** (branch listing is approval-gated). All content is
  from each repo's default branch (`main`).
