# C-Suite Command System — Complete Package

## Fully mapped, wired, and established — as of November 10, 2026

**Purpose:** This is the complete system package for the C-Suite Command Center / Master CEO Dashboard / VisionWeaver system. It maps every part, wires every connection, and states exactly what is established and what is still open. It is written so another AI (Claude) can pick it up and continue the work without re-discovering anything.

**Honest status up front:** The system is **mapped and the live app is deployed and navigable**, but it is **not yet fully wired and not yet fully established**. The live app runs on seed/demo data because its database (Supabase) is not connected yet, there is no sign-in, and Gate 0 is still open. Everything below says what IS done and what is NOT done, with no overclaiming. Do not treat this package as a claim that the system is "fully working" — treat it as the complete, verified record of where it stands and exactly what closes the remaining gaps.

---

## 1. What this system is

A CEO command system with three layers:

- **C — Fullstack Master (the application body).** The live app. Built in Lovable as "Estiban Command Nexus", exported to GitHub as `csuite-command`, deployed on Vercel as `csuite-command`. This is the NEW canonical live system.
- **B — VisionWeaver 2.0 (the production engine / data truth).** The single-file HTML production engine (16 sections, Demo/Blank modes) that holds the real work (projects, worlds, media, queue, voices, books). It is the working app for production.
- **A — vw3 (the visual design crown).** The visual design system in `MASTER_CEO_DASHBOARD`, the canonical design reference.

**Prime is retired.** VisionWeaver-Prime is historical reference only (see §4). Director Studio 0.4.02 is an archived wrong version — do not use it.

**Directives D1–D25** govern the build (one track at a time; hold-then-go; IP originality; script spine; character/environment continuity; free-first routing; C/B/A architecture; Supabase-only storage; append-only forensic QC; pre-run cost ledger; prediction gate ≤2 passes; roles for 30–50 users; no new front end until Phases 1–4; teaching ladder; lifelike/motion standard). The full D1–D25 text is in the review package (Report 1, committed to the VisionWeaver repo, `docs/reviews-2026-11-09/01-canonical-build-specification-2026-11-09.md`).

---

## 2. Canonical live system — csuite-command

This is the live system. Everything now points here.

| Item | Value |
|---|---|
| **Production URL** | https://csuite-command.vercel.app |
| **GitHub repo** | `estibancreations-svg/csuite-command` (PRIVATE, main) |
| **Latest commit** | `a27dff34525ba6aa07f263dc9ccb0f52c902d94d` — "Fix @radix-ui/react-tooltip to ^1.4.1" (2026-11-10 14:01 UTC) |
| **Vercel project** | `csuite-command` (team `estibancreations101`, Pro) |
| **Vercel project URL** | https://vercel.com/estibancreations101/csuite-command |
| **Live deployment** | `3i3cAguBLG4GSwDgqxdRHF5em5fb` — READY, 36s build, 2026-11-10 08:02 CST, no errors (2 warnings) |
| **Framework** | TanStack Start (React 19, Vite 8, Tailwind 4) |
| **Source** | Lovable project "Estiban Command Nexus" (id `1f7199cb-bb6e-4abe-ab95-87b1d2661570`, https://lovable.dev/projects/1f7199cb-bb6e-4abe-ab95-87b1d2661570, published estiban-command-nexus.lovable.app) — exported to GitHub 2026-11-10 |
| **App shell** | Dark cyberpunk theme, HighLevel-style left nav. Routes: CEO overview, C-Suite, Decision Queue/Golden Path, T.H.E.L.M.A., System Registry, VisionWeaver 2.2.6, LandWeaver, Workspaces, Projects, Runtimes, Health & Audit, Training, Reference Library, Universal Search. Fed from typed seed model `src/lib/command-data.ts`, ready to swap to Supabase. |

**Fix history that got it live (all owner-authored commits, all approved):**
- `b926437` — Added `@supabase/supabase-js ^2.119.0` (was missing; caused the Lovable typecheck errors).
- `77f150a` — Updated TanStack (react-start 1.169.5, react-router 1.170.46, router-plugin 1.169.0) to clear Vercel CVE-2026-102989 deploy block.
- `ba26bab` — Removed stale `bun.lock` (still pinned react-start 1.168.26; Vercel resolves from the lockfile, so package.json alone was not enough).
- `a27dff3` — Fixed `@radix-ui/react-tooltip` to `^1.4.1` (2.2.6 does not exist on npm; blocked `npm install`). Verified locally first with `npm install --package-lock-only` (all deps resolve).

**Retired:** The old Vercel project `master-system-buildout` (docs-only repo, no app code, Error deployment) was **DELETED 2026-11-10 08:07 CST** at the owner's explicit instruction. `master-system-buildout-lzaa` (Ready, docs repo) was NOT touched.

---

## 3. Architecture map (C / B / A)

| Layer | What it is | Repo / location | Status |
|---|---|---|---|
| **C — Fullstack Master** | The live app (csuite-command). Application body. | `estibancreations-svg/csuite-command` → Vercel `csuite-command` | **LIVE** (Ready 2026-11-10) |
| **B — VisionWeaver 2.0** | Production engine / data truth. Single HTML, 16 sections, Demo/Blank modes. Holds the real work. | `estibancreations-svg/VisionWeaver` (2.0 file) | Working locally; Demo mode is the approved sample set. Sign-in: local email/password only (Google/Apple/Microsoft buttons DISABLED; real OAuth needs Supabase first). Version 1 LIVE LOOP stays RUNNING. |
| **A — vw3** | Visual design crown. | `estibancreations-svg/MASTER_CEO_DASHBOARD` | Design reference; live Vercel home fingerprint-verified. PR #64 (canonical UI runtime stabilization) stays **DO NOT MERGE** until verified. PR #63 (CEO dashboard as primary live home) stands. |
| **Prime (retired)** | Historical reference only. Static site. | `estibancreations-svg/VisionWeaver-Prime` | **RETIRED** 2026-11-09 (`PRIME-RETIRED-2026-11-09.md`). Do not build on it. Vercel `visionweaver-prime` is Ready but is a historical deployment. |

**Storage truth: Supabase-only (D19).** No other database is authoritative.

**Demo real-work inventory to protect (from the Nov 2 tracking map):** 5 projects, 3 worlds, 4 media items, 6 queue cards, 6 locked voices, 7 books.

---

## 4. Repositories (verified latest commits, 2026-11-10)

| Repo | Latest commit (main) | What it holds |
|---|---|---|
| `estibancreations-svg/csuite-command` | `a27dff34525b` (2026-11-10 14:01 UTC) — "Fix @radix-ui/react-tooltip to ^1.4.1" | **C app (live).** TanStack Start fullstack app. PRIVATE. |
| `estibancreations-svg/MASTER_CEO_DASHBOARD` | `2e2cf9b8edb4` (2026-11-10 07:23 UTC) — "Trigger fresh production deploy" | **A (vw3) + C/B/A app-schema.** 20 tables, 27-page registry. Review advice committed (`docs/reviews-2026-11-09/04-review-advice-2026-11-09.md`). |
| `estibancreations-svg/VisionWeaver` | `5a651794dde5` (2026-11-10 05:37 UTC) — "Commit the 2026-11-09 review package" | **B (2.0 engine) + review package.** `docs/reviews-2026-11-09/` (6 files: Report 1 spec D1–D25, Report 2 findings, final consolidated review, review advice, Gate 0 status, retirement notice). |
| `estibancreations-svg/VisionWeaver-Prime` | `8302cf28a722` (2026-11-10 07:23 UTC) — "Trigger fresh production deploy" | **Prime (RETIRED).** `PRIME-RETIRED-2026-11-09.md`. Historical reference only. |
| `estibancreations-svg/THELMA-Global-Link-Logistics` | (failing) | T.H.E.L.M.A. app. **Build bug:** `App.tsx` imports `./components/modules/Documentation` which does not exist in the repo (never committed), and `mobile_app_v1/index.ts` imports `./App` which does not exist in `mobile_app_v1/`. See §10. |
| `estibancreations-svg/Master-System-Buildout` | (docs/spec only) | **Docs/spec repo only — NO app code.** No `package.json` or `vite.config` anywhere. Its Vercel project was deleted 2026-11-10. Do not use it as an app source. |
| `estibancreations-svg/standalone-crm` / others | — | T.H.E.L.M.A. CRM v2.0 (prod, Vercel READY), Leadstack-Clone, Paypal_Portal, Master-dashboard-, and others. CRM PR #5 v2.1 NOT merged — do not merge until owner says OK. |

**All repos were made Public during the deploy fight (2026-11-10). The owner has not yet flipped them back to private.** That is still open.

**GitHub accounts:** Vercel + GitHub stay OLD (`estibancreations-svg`, `estibancreations@gmail.com`, team slug `estibancreations101`). The "Senior" GitHub account (`seniorestibancreations-3358`) is ON HOLD and is in NO connected system. Do NOT add it (or anyone) to the Vercel team — the owner declined the $20/month add. Vercel checks the **commit author**, not who clicks Redeploy; owner-authored commits (estibancreations-svg) deploy with the existing team.

---

## 5. Deployments — Vercel scoreboard (2026-11-10)

Team: `estibancreations101` (Pro). Vercel connector is **403-blocked** ("Not authorized: Trying to access resource under scope estibancreations101") — use the **browser** for all Vercel work; do not rely on the connector.

**10 of 11 projects Ready.** The only one not Ready is `thelma-global-link-logistics` (Error, build bug — see §10).

| Project | Status | Production URL |
|---|---|---|
| **csuite-command** | **Ready** (2026-11-10, deployment `3i3cAguB`, 36s) | https://csuite-command.vercel.app |
| master-system-buildout-lzaa | Ready | https://master-system-buildout-lzaa.vercel.app |
| master-ceo-dashboard | Ready | https://master-ceo-dashboard.vercel.app |
| estibancreations-ceo-dashboard | Ready | https://estibancreations-ceo-dashboard.vercel.app |
| standalone-crm-preview | Ready (first production deploy) | https://standalone-crm-preview.vercel.app |
| visionweaver-prime | Ready (historical) | https://visionweaver-prime.vercel.app |
| standalone-crm | Ready | (standalone-crm) |
| visionweaver-design-studio | Ready | https://visionweaver-design-studio.vercel.app |
| reunion-os | Ready | (reunion-os) |
| master-dashboard | Ready | (master-dashboard) |
| thelma-global-link-logistics | **Error** (build bug) | — |

**Deleted 2026-11-10:** `master-system-buildout` (old, docs-only, Error, no production deployment). Confirmed gone (project URL returns 404).

---

## 6. Data model & Supabase

**Supabase projects (verified):**
- **Data home (production data):** `yqealeekngxooyoemfba` ("Supabase · Master Dashboard") — 153 public tables, real data.
- **App-schema (Master app-schema):** `azoqszhhmmkyqztubgem` ("Supabase · MASTER_CEO_DASHBOARD") — 20 tables, 27-page registry. This is the ref recovered as **M2** from the Prime repo `config.js`.
- `standalone-crm-test` — INACTIVE/paused. Do not touch.

**Supabase connector:** custom.supabase, OLD-account PAT VALID via Management API (200). The owner chose OLD-account reconnect 2026-10-30 (Senior account ON HOLD). MCP 403s were NEVER a token problem: Supabase's Cloudflare edge (Error 1010, `browser_signature_banned`) blocks this environment's client — do not retry or spoof. Vercel reads (11 projects) + Supabase Management API reads (200) work. **No writes or table creates without the owner's say-so.**

**Full `vw_` PostgreSQL schema** is drafted in Report 1 (committed to the VisionWeaver repo, `docs/reviews-2026-11-09/01-canonical-build-specification-2026-11-09.md`, §7). It is NOT yet applied — applying it is Phase 1, after Gate 0 closes.

**M2 (recovered):** Supabase ref `azoqszhhmmkyqztubgem` from Prime `config.js`. The file holds only the publishable key (frontend-safe, RLS-limited). No service-role key belongs in a repo.

**M3 (MISSING — the wiring gap):** The C app's env file (`.env` / `.env.local`) does not exist in the workspace or in git (the VisionWeaver repo's quality gate forbids tracking `.env*` files). The C app's README says the Supabase data home is a "verified reference — NOT wired"; wiring is a separate owner-credential step. The app's `client.ts` throws at runtime only (via lazy Proxy) if the vars are missing — not needed for the build itself. **Required Vercel env vars for runtime (once the build passes):** `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`. Values are owner-credential steps — from the Lovable project's `.env` / Supabase dashboard. The service-role key must never go in the repo or chat logs.

---

## 7. Wiring — how everything connects

| Connection | Status | Notes |
|---|---|---|
| GitHub → Vercel (csuite-command) | **Wired** | Vercel project `csuite-command` imports `estibancreations-svg/csuite-command` main. Auto-deploys on push to main. |
| GitHub → Vercel (MASTER_CEO_DASHBOARD) | **Wired** | Both Master projects connect to `estibancreations-svg/Master-System-Buildout` (GitHub App "Vercel Legacy", production branch main). Note: this repo is docs/spec only. |
| Lovable → GitHub (csuite-command) | **Wired (export)** | Lovable "Estiban Command Nexus" exported to `estibancreations-svg/csuite-command` (29 commits, latest `cd94526` at export; now at `a27dff3`). Lovable account is a DIFFERENT account ("EstibanCreations", estibancreations@gmail.com) than the connected Lovable account (stevenhenry80@gmail.com, "Steven's Lovable", 1 project "Outline Builder Pro"). The Lovable connector CANNOT reach Estiban Command Nexus; the browser can (owner signed in). Lovable free plan: **0 free build credits left today** (2026-11-10). |
| Supabase → csuite-command (runtime) | **NOT WIRED (M3)** | Env vars not set in Vercel. App runs on seed data (`src/lib/command-data.ts`) until wired. See §6. |
| Supabase → VisionWeaver 2.0 | **Intended, not wired** | 2.0 sign-in is local email/password only. Real OAuth needs Supabase connection first. |
| Supabase Management API (reads) | **Working** | Reads (200) work. No writes without owner say-so. |
| Vercel connector (Muse) | **Blocked (403)** | Use the browser for Vercel work. |
| Runway | **Connected (owner's account)** | Runway Pro, $26.25 on card 9674, renews Dec 3, 2026. Media-PRODUCTION layer only (not the management system). Workflows First Attempt app is live in his Runway account. Runway MCP connector is NOT connected (connect link: https://agent.meta.ai/connectors/connect/runway_mcp). |
| GitHub App | **Limited** | Cannot create repos (403). Writes only to repos it is installed on. Cannot create/update `.github/workflows/*.yml` (403). |

**Env vars needed for csuite-command runtime (M3):** `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`. Set in Vercel → project Settings → Environment Variables, then redeploy. Values come from the Supabase dashboard / Lovable project's `.env` (owner-credential step).

---

## 8. App map — csuite-command routes & features

Full QA pass 2026-11-10 08:13–08:17 CST (read-only, deployment `3i3cAguB`). All 27 left-nav routes and all 9 System Registry detail pages were tested. **No page went blank, no page errored, no broken image.** The app is fully navigable on seed/demo data.

**Working routes (27):** `/` (CEO Command Center), `/c-suite`, `/decisions` (Decision Queue / Golden Path), `/thelma`, `/grantos`, `/marketing`, `/telecommunications`, `/iam`, `/assessment`, `/systems` (Registry, 9 systems), `/systems/visionweaver`, `/systems/landweaver`, `/systems/grantos`, `/systems/thelma`, `/systems/cmgio`, `/systems/telecom`, `/systems/iam`, `/systems/assessment`, `/systems/training`, `/visionweaver`, `/landweaver`, `/launcher`, `/sessions`, `/agents`, `/tasks`, `/workflows`, `/workspaces`, `/projects`, `/runtimes`, `/connectors`, `/memory`, `/files`, `/creative-studio`, `/settings`, `/health`, `/training`, `/library`, `/search`.

**Key facts from the QA:**
- CEO home: Decisions pending 3, Runway 24.5 mo, 5 decisions in review, 3 ready to advance, 12 blocked; T.H.E.L.M.A. status 92%; VisionWeaver 96%, LandWeaver 92%.
- System Registry: 9 systems (VisionWeaver 96%, LandWeaver 92%, AI Mastery 88%, T.H.E.L.M.A. 84%, GrantOS 78%, Personal Assessment 74%, CMGIO 69%, IAM 62%, Telecommunications 57%). All 9 detail pages work; connected-system links work.
- Search: "92 results indexed"; typing "Ridgeview" filters to 4 results.
- Settings Export works: a 39 KB workspace export file downloaded successfully.
- 404 handling works: /login and /golden-path render a clean in-app "Unknown route" 404 with a working "Go home" link.
- Every page carries "Staged workspace · Sample records · Saved on this browser · External systems unverified".
- All 19 connectors and all 4 runtimes are UNVERIFIED (sample latencies). Empty in seed: Telecommunications, IAM Self Help, Personal Assessment work queues (0 records), GrantOS memory (0 records), Decision Queue "authorized" filter (0).

**Full per-page QA checklist:** see the QA report file `csuite-command-qa-report-2026-11-10.md` (in the goal files dir, and included in the zip if provided).

---

## 9. Current state — what works, what is broken, what is missing

### Working
- The live app deploys and renders (Ready, no errors). All 27 routes + 9 detail pages load. Search, filters, tabs, dialogs (opened/closed without saving), and Settings Export all work. 404 handling works.

### Broken (2, verified in QA)
1. **Agent/workflow counts disagree** between system overview pages and the Registry/detail pages, under the same labels. VisionWeaver: overview 5 agents / 3 workflows vs detail 14 / 22. LandWeaver: 1 / 4 vs 9 / 14. Marketing: 1 / 1 vs 8 / 17. GrantOS: 4 / 1 vs 6 / 11. Telecommunications: 4 / 2 vs 3 / 5. (T.H.E.L.M.A. 18/41, IAM 4/9, Personal Assessment 2/4 matched.)
2. **Universal Search results do not deep-link.** The Ridgeview (project) result opens /projects (the list), not the Ridgeview project itself. Other result types link to their section index the same way.

### Missing (7)
1. **No sign-in / authentication at all.** No login gate, no sign-in button or route, no Google/Apple/Microsoft SSO, no account/profile area — the whole app is open to anyone with the URL. (/login is a 404.)
2. **Training:** the 6 tracks and 5 recent materials have no link or button — no module, drill, or lesson can be opened.
3. **Reference Library:** the 8 cards have no link or button — no document can be opened or read.
4. **C-Suite:** the 12 executive cards have no link or button — no executive detail page exists.
5. **Workspaces/Projects:** workspace cards show doc/file counts but have no link to open contents; projects have no detail page.
6. **Settings:** only a Compact toggle and Export workspace exist — no profile, no authentication/Supabase connection settings, no notifications, appearance, or workspace preferences.
7. **No live data.** All connectors/runtimes UNVERIFIED; some work queues empty in seed — expected given the unconnected database.

### Not tested (read-only QA — not broken, just untested)
Decision Queue Authorize/Advance/Reject; Tasks Complete; Agents/Projects Pause/Resume; Health Acknowledge; any Save/Create/Start-session button (Launcher Create, New task, New file, New workflow, Start workspace session, Start review session); runtime-card selection; Settings Compact toggle; Memory/Files Download buttons (except Settings Export, which was tested and worked). These change data, so they were deliberately not clicked.

---

## 10. Gaps — Gate 0 (M1–M10) and what closes them

Gate 0 is **NOT closed**. Phase 1 has not started. No database writes have been made.

| Gap | Status | What closes it |
|---|---|---|
| **M1** — Drive file (Fireside archive) | **HAVE** | "Fireside — Runway Archive, Pivot to Upload Testing (2026-11-09).md", Drive file id `1k4oww6h0Tfle6Q-WUtHBEIJtu7fRVt4Z`, in VisionWeaver Hub folder `19qjRX0v7RS585hNgjZ2_OSKroYQEGbD2`. |
| **M2** — Prime config.js | **RECOVERED** | Supabase ref `azoqszhhmmkyqztubgem` (from Prime repo `config.js`). |
| **M3** — C env file / Supabase wiring | **MISSING** | Owner supplies the Supabase env values (or connects Supabase in Vercel/Lovable). Set the 4 env vars in §6/§7, then redeploy. Service-role key never in the repo. |
| **M4** — BOY-001 RAIN v02 bundle | **PARTIAL** | In the VisionWeaver repo: Character ID `f4ef5fec-d0ad-4d71-a25a-cc6614eade7b`, project ID `0d03dfb3-494d-4c8d-8cf6-2c53343cf065`, completed generation ID `3b49444e-85de-4fe8-b7b1-31e36fc10c56`, Phase 2 activation evidence `docs/evidence/PHASE-2-AVATAR-ACTIVATION-2026-10-08.md`, corrected master board task. Coverage set **QC_PENDING, 0/32 completed slots**. The assembled bundle (per-cell manifest, hashes, save/reload trace, provider receipt, QC decision) is NOT built — needs the live Supabase export. |
| **M5** — C/B/A commit + deployment SHAs | **OBSERVED, canonical confirmation still the owner's** | Latest commits verified 2026-11-10 (see §4). Deployment SHAs: csuite-command `3i3cAguB` (Ready). Owner confirms the canonical SHAs. |
| **M6** — Migration definitions | Open | Not verified in this pass. |
| **M7** — Runway adapter evidence | Open | Not verified in this pass. |
| **M8** — THELMA propose-only | Open | Not verified in this pass. |
| **M9** — `ww_review_decisions` + `social_post_queue` exports | Open | Not verified in this pass. |
| **M10** — Agent-name confirmation (H.E.N.R.Y., L.I.L.Y., P.E.R.C.Y.) | Open | Not verified in this pass. |

**When M3 + M4 + M5-confirmation land, Gate 0 closes → Phase 1:** verify Supabase ref `azoqszhhmmkyqztubgem` live, apply the `vw_` schema via migration, register existing properties, seed the open-decisions register. M6–M10 follow as their gates open.

**thelma-global-link-logistics build bug (separate, still open):** Repo `estibancreations-svg/THELMA-Global-Link-Logistics`. Failing deployment `ECQex8VFLxNFrhLWi8ys9pD3abJx` (commit f9146c2, Oct 7): Vite/Rollup "Could not resolve './components/modules/Documentation' from 'App.tsx'". `components/modules/` has 30 files; `Documentation.tsx` is absent (no commit history at all — never in this repo). Second blocker: `mobile_app_v1/index.ts` imports `App from './App'`, but `mobile_app_v1/` has no `App.tsx`. **Approved restore source:** Google Drive zip `COPY-of-T.H.E.L.M.A.-AI-POST-GEMINI-3-HACKATHON-SUBMISSION-main.zip` (833,904 bytes, created 2026-07-07, owner estibancreations@gmail.com, folder path under "The Tub" → "Documents"). **NOT FOUND:** Drive search by name/size found similar THELMA zips but none matching that name or the 833,904-byte size. May be renamed/moved/in an unsurfaced folder. **Fix (restore, do NOT fabricate):** locate the zip → extract `components/modules/Documentation.tsx` + `mobile_app_v1/App.tsx` → verify the default-export/onBack contract → commit owner-authored to main → run the full Quality Gate → verify Vercel goes Ready. **Fallback if the zip cannot be found:** rewriting the component from the app's own evidence is a REBUILD, not a restore — needs the owner's explicit call (repo docs forbid placeholders).

**Repos private-again (open):** All GitHub repos were made Public during the deploy fight. The owner has not yet flipped them back to private. (Owner's action in GitHub settings.)

---

## 11. How to continue (for Claude / the owner)

**If you are Claude picking this up, start here:**
1. Read this package in full. Do not re-discover the repos, deployments, or Supabase refs — they are verified above (2026-11-10).
2. **Do not claim the system is "fully working."** It is live and navigable on seed data, with 2 verified broken items and 7 missing items (§9), and Gate 0 is open (§10).
3. **Do not build, spend, deploy, merge, or change anything on a hold.** The owner works in hold-then-go bursts. Fix in place; never recreate what is already built. Never regenerate a character or board that already exists — reuse the originals.
4. **Do not add users.** Never add `seniorestibancreations-3358` or anyone to the Vercel team. The $20/month add was declined and stays declined.
5. **Vercel work goes through the browser** (the connector is 403). GitHub work goes through the GitHub MCP/CLI. Supabase reads work via the Management API; no writes without the owner's say-so.
6. **Next concrete steps, in order:**
   a. **Wire Supabase (M3):** get the 4 env vars (§6) from the owner (or the Lovable project's `.env` / Supabase dashboard), set them in Vercel → `csuite-command` → Settings → Environment Variables, redeploy, verify the app reads live data.
   b. **Fix the 2 broken QA items** (§9): reconcile the agent/workflow counts (overview vs detail) and make Universal Search deep-link to the actual item.
   c. **Close the 7 missing items** (§9), starting with sign-in/auth (the app is currently open to anyone with the URL).
   d. **Close Gate 0:** M3 (above) + M4 (BOY-001 bundle export) + M5 canonical confirmation → Phase 1 (apply `vw_` schema, register properties, seed open-decisions register).
   e. **thelma fix:** keep hunting Drive for the 833,904-byte zip (or get the owner's call on the rebuild route).
   f. **Repos private-again:** owner flips the Public repos back to private in GitHub settings.
7. **Standing rules (owner's own words):** Heritage/diversity — every character and cast must reflect his blend of 11 backgrounds; never all-Caucasian; never default a face to Caucasian. Originals-first — never recreate; pull up what was already created and build from it. Sealed worlds — never carry a motif, line, or premise across series; never invent a story, premise, or line for a series with no script on file. Verify every correction in the actual file text before reporting it done. Double- and triple-check before handing work back. One track at a time; do not mix projects/chats.

**Key links:**
- Live app: https://csuite-command.vercel.app
- Vercel project: https://vercel.com/estibancreations101/csuite-command
- GitHub repo: https://github.com/estibancreations-svg/csuite-command
- Lovable project: https://lovable.dev/projects/1f7199cb-bb6e-4abe-ab95-87b1d2661570
- QA report: `csuite-command-qa-report-2026-11-10.md` (included in the zip if provided)
- Review package (D1–D25, schema, Gate 0): VisionWeaver repo `docs/reviews-2026-11-09/` (6 files)

---

*Package compiled 2026-11-10 by Victoria (Muse) from verified live state: GitHub commits, Vercel deployments (browser-verified), and a read-only QA pass on the live app. No database writes were made. Where a fact could not be verified, it is marked open rather than asserted.*
