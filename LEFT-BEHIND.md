# Left Behind — Dropped, Retired, Unfinished, Never Started

Everything left out, dropped, retired, unfinished, or never started, with evidence
and dates. **This is a record of standing, not a work order.** Nothing here authorizes
building, merging, deleting, or changing anything — the hub is gathering-only, and
every item below waits on the owner's explicit go (or is permanently retired by his
ruling).

---

## 1. Permanently retired (by owner ruling or locked spec)

| Item | Retired | Evidence |
|---|---|---|
| **Notebook VIEW DESIGN ("Strategic Notepad")** — yellow paper `#FDF1AA`, blue ruled lines `#87CEEB`, red margin `#FF7F7F`, marker typography | Oct 7, 2026 (policy, 19 repos) + Nov 11, 2026 21:37 CST (owner clarification: "trash, deleted permanently, never anywhere") | `UI-BOARD-STANDARD-v1.md`; reconciliation draft §4. Phase A stripped it from runnable code in `MASTER_CEO_DASHBOARD` + `csuite-command` (grep: zero hits). **One honest exception stands:** `Master-dashboard-` still contains the literal component, untouched pending Decision 3. |
| **Prime as canonical** | Nov 9, 2026 (baseline) | Canonical Spec §5: "Prime is historical reference." |
| **Director Studio 0.4.02 as reference** | Oct 22, 2026 (ruling) + Nov 9, 2026 (spec §12) | Wrong version; archived. Reusable multi-project pattern only. |
| **VisionWeaver 2.0's localStorage-only mode** | Nov 9, 2026 (spec §12) | Storage truth is Supabase-only (D19). |
| **`Access-Control-Allow-Origin: *` pattern** | Nov 9, 2026 (spec §12) | Retired. |
| **Service-role key in client-side use** | Nov 9, 2026 (spec §12) | Retired from client-side use (source line cut off mid-sentence; handling retired). |
| **Retired roster terms: "CCO," "CMO," "CRO"** | Jul 13, 2026 (SOR) | SOR retires the terms. The goal named "CRO Master Dashboard" uses a retired term — rename (or note as historical) when the roster settles. |
| **Separate "CIO" / "CTO" offices** | Jul 13, 2026 (SOR) | Merged into one combined CIO/CTO office. The live app still shows them separately (DRIFT-003, open). |
| **Pre-Nov-11 architecture** (VisionWeaver as shell, CEO Dashboard inside) | Nov 11, 2026 21:20 CST (owner correction) | Reversed by Phases A+C. The old structure persists throughout older gathered materials as history. |
| **The old `master-system-buildout` Vercel project** | Nov 10, 2026 | DELETED. Do not repoint. |
| **Clip 2 (Fireside)** | Nov 6, 2026 | MISS — rejected. Do not build on it. |

## 2. Gate 0 — foundation items (M1–M10)

From the Canonical Spec §2 + Gate-0 Checklist (Nov 10), updated with the Nov 10
evening memory log. Gate 0 closes when M1–M5 are provided and verified; it is still
open.

| Item | What | Status (2026-11-18) | Blocks |
|---|---|---|---|
| M1 | Drive file `1k4oww6h0Tfle6Q-WUtHBEIJtu7fRVt4Z` (Fireside archive) | **HAVE** | — |
| M2 | Prime `config.js` (Supabase ref) | **RECOVERED** — ref `azoqszhhmmkyqztubgem` | — |
| M3 | C env file / Supabase wiring (4 env values) | **PROVIDED** Nov 10 evening (3 vars saved + service-role key saved as 4th; redeploy verified, app still on seed data until the RLS+GRANT fix) | — (was missing at the Nov 10 checklist writing) |
| M4 | **BOY-001 RAIN v02 bundle** (character detail, appearance state, coverage set, cast board, 360 board, 0/32 manifest, hashes, save/reload trace, provider receipt, QC decision, NO_DIALOGUE state, continuity gate state, audit correlation) | **STILL MISSING** — partial only (character/project/generation IDs + Phase 2 activation evidence in the VisionWeaver repo). Coverage set QC_PENDING, 0/32 slots. Needs a live Supabase export. | Shot 02 authorization; World State start; Gate 1 Avatar State acceptance. |
| M5 | C/B/A commit + deployment SHAs | **OBSERVED, NEEDS OWNER CONFIRMATION** — C `a27dff34525b` / Vercel `csuite-command` deployment `3i3cAguB` READY; A `2e2cf9b8edb4` / `master-ceo-dashboard` READY; B `5a651794dde5` (2.0 file, local); Prime `8302cf28a722` READY (historical). Observed Nov 10; confirmation still outstanding. (Note: live HEADs have since advanced — `csuite-command` `0a6e630`, `MASTER_CEO_DASHBOARD` Nov 12 notepad-strip commit.) | Promotion of any consolidated deployment to "canonical." |
| M6 | Migration definitions | **OPEN** | Any Supabase migration (D19); isolated rebuild proof. |
| M7 | Provider adapter evidence (Runway adapter code, account/secret ownership, request/receipt pattern) | **OPEN** | Any real paid run (D21). |
| M8 | THELMA propose-only implementation | **OPEN** | Agent orchestration claims. (Propose-only verified only in the C artifact build, not the live Vercel app.) |
| M9 | `ww_review_decisions` + `social_post_queue` exports | **OPEN** | Distribution page + Directors Guild integration. |
| M10 | Agent names confirmation (H.E.N.R.Y., L.I.L.Y., P.E.R.C.Y. — real or not?) | **OPEN** | Final agent registry. |

## 3. The 12 decisions (Nov 11 findings §10) — mostly unanswered

| # | Decision | Recommendation (draft) | Status |
|---|---|---|---|
| 1 | CEO page list | 15 pages (13 + Audit/History + Settings/Governance) | **OPEN** — bundled options offered Nov 11, 22:11 CST; no tap recorded. |
| 2 | Repo placement (vw3 workspaces in `MASTER_CEO_DASHBOARD`) | Rule it by design (grandfathered + documented) | **OPEN** (in the reconciliation draft). |
| 3 | `Master-dashboard-` fate | Archive | **OPEN**. |
| 4 | Officer roster | SOR roster | **OPEN**. Live app still shows the retired roster. |
| 5 | Generation provider | (In findings §10) | **OPEN**. |
| 6 | AI provider | (In findings §10) | **OPEN**. |
| 7 | Auth | Email/password; sign-in to change, public to view | **OPEN**. No auth exists in the live app. |
| 8 | Server routes | 25 routes (Phase D draft) | **OPEN**. 0 built. |
| 9 | Table list | 13 new tables + 1 deliberate non-creation (Phase D draft) | **OPEN**. 0 created. |
| 10 | `.env` rotation + flip repos private | Rotate + privatize | **OPEN**. 6 public repos; committed `.env` files unrotated. |
| 11 | The missing `.docx` | Find/send it; one reconciliation revision if found | **OPEN** — still not found anywhere. |
| 12 | GitHub Always Allow | — | **SUPERSEDED** — no durable grant exists; stacking instruction stands (closed Nov 11, 22:00 CST). |

Plus, from the reconciliation draft §6: Q8 (audit vocabulary extension) affects what
new events can be logged. And from the Nov 9 spec §13: Speech 2/3/7/8 leads, Speech 6
two lines, board picks (Aelune wings, body-type letters, transition locks, traveller
name), "The Thousand-Year Wait" placement — all owner-owned, all open.

## 4. Phase D/E gaps — current standing (Nov 11)

Stated as the record stands, not as work orders:

- **13 proposed tables, 0 created:** `decisions`, `pending_items`, `notes`,
  `team_members`, `analytics`, `finance_records`, `security_events`, + 6 more in the
  Phase D draft. 1 deliberate non-creation: `assets` (`records` kind=`'asset'`
  already covers it).
- **Auth: none.** `/login` 404s. No role enforcement. The auth plan (Phase D draft)
  is proposed, not built.
- **Server routes: 0 of 25 built.** The only Supabase write in the codebase
  (`updateProjectStatus`) will fail under RLS.
- **90 dead controls, 19 placeholders** (Phase E inventory, 470 controls total).
  Dead includes: AI Co-Pilot Ask, search, C-Suite cards, Training tracks, Vision
  Builder modes, Decision Queue items, most V1/V2/V3 switches.
- **Search** scans 92 local seed records, never Supabase. Any typed query → 0 results.
- **3 different rosters exist, none matching** (SOR roster, screenshot-4 roster,
  live-app roster). 15 UNKNOWNs flagged in the inventory.
- **Untested (would modify data):** Directors Guild Approve/Request-changes, Projects
  Pause/Resume — untestable under anon SELECT-only.
- **Image gaps:** The Arc gradient-only (no photo); Golden Corral reuses Pepsi burger
  image; Décor bookshelf image odd; Prime assets small/soft.
- **"Payment failed" banner** visible on the live app (never blocked deploys).

## 5. Unmerged / undeployed work

| Work | State | Constraint |
|---|---|---|
| MASTER_CEO_DASHBOARD PR #64 | Open | **DO NOT MERGE until verified** (exact-SHA quality gate, screenshot comparisons, auth + Supabase runtime checks, metric truthfulness). |
| MASTER_CEO_DASHBOARD PR #63 | Open | Stands (per reconciliation draft). |
| MASTER_CEO_DASHBOARD PR #62 | Open | Owner's decision. Book Pipeline decisions pending on it. |
| MASTER_CEO_DASHBOARD PR #56, #55 | Open | Standing constraints; see `PULL-REQUESTS.md`. |
| standalone-crm PR #5 (v2.1) | Open, unmerged | **Do not merge until he says OK.** |
| standalone-crm PR #6 (draft CI) | Draft | GitHub App cannot create/update workflow files (403). |
| standalone-crm PR #11 (GHL delivery v4.1) | DRAFT | Unmerged. SQL unrun. Nothing charged/created. |
| standalone-crm PR #12 (GHL scoring/lists v4.2) | DRAFT | Unmerged. Tests written, not run against a database. No plan gating in v1. |
| ChatGPT bridge PR #6 | DRAFT | For HIS review. DO NOT MERGE. |
| GHL deploy + keys steps | Guide delivered Nov 14 | Nothing charged/created. 10DLC start-early (10–15 days). Project choice open (`standalone-crm-test` stays paused). |
| Vercel Marketplace Supabase integration | — | **DO NOT INSTALL.** |

## 6. Broken / missing pieces

| Item | Evidence | Date |
|---|---|---|
| THELMA-Global-Link-Logistics: 2 missing files (`Documentation.tsx`, `mobile_app_v1/App.tsx`) | Repo + Nov 10 diagnosis (file never existed; restore source is a Drive zip) | Nov 10, 2026 |
| Restore zip for THELMA build | **Not found in Drive** | Nov 10, 2026 |
| The `.docx` (14 tabs + 150-item list) | Not found in Drive, GitHub, or workspace, including the Nov 18 harvest | Searched through Nov 18, 2026 |
| SOR PDF v1.1 in Drive | Not found (local copy only) | Nov 18, 2026 |
| CEO-1 shortcut target | 404 — dead link, no content recoverable | Jul 23, 2026 → Nov 18, 2026 |
| One GitHub file (Five Stations `runway_prompts_v2/02_all_episodes.txt`) | Broken/internal symlink; connector cannot read it | Nov 18, 2026 |
| LandWeaver: anything | Zero hits everywhere | Through Nov 18, 2026 |
| OSIRIS: any spec or app | Frozen repo only | Through Nov 18, 2026 |
| GrantOS / CMGIO: any live app | Specs/blueprint only | Through Nov 18, 2026 |
| Fireside face-hold test (5s) | Staged, not run | Nov 6–7, 2026 |
| Fireside download-button fix | Queued — "do NOT change now" | Nov 5, 2026 |
| Dropbox connection | Not connected — needs owner's sign-in to realign | Nov 2, 2026 |
| Supabase wiring of the app to the production data home | App runs on its own DB / seed data; wiring waits on owner's credential step | Nov 2 → Nov 11, 2026 |
| `vw_` schema | Specified, never applied (no migration) | Nov 9, 2026 |
| Prediction records / QC notes system / cost ledger / placement registry | Specified, never built | Nov 9, 2026 |
| Runway provider adapter | No evidence (M7) | Nov 9, 2026 |
| 64-slot coverage | Frozen until camera-height calibration | Nov 9, 2026 |
| Shot 02 | HOLD until Avatar State passes (M4) | Nov 9, 2026 |
| Red Balloon Continuity Capsule | Inputs required only after Avatar State acceptance | Nov 9, 2026 |
| World State | Behind Avatar State | Nov 9, 2026 |
| "Master CEO Dashboard - Page Designs & Chat Inventory" doc | Near-empty (35 chars) | In Drive |
| Email attachments (7.8 MB screen-recording video + 4 Frazier attachments) | Not downloaded — follow-up decision for the owner | Nov 18, 2026 |
| Book Pipeline decisions | Pending (PR #62, Console wallet credit, TEST 4 gate) | Nov 9, 2026 |

## 7. Security follow-ups (observed, not acted on)

- `csuite-command/.env` committed (private repo) — contents withheld from this hub,
  never read. Rotation = Decision 10, open.
- `Master-dashboard-/.env.production` committed (**PUBLIC** repo) — contents withheld
  from this hub, never read. Rotation = Decision 10, open.
- **6 public repos** (flag delivered Nov 10, ~20:34 CST). Flip-to-private = Decision
  10, open. Pre-public secrets scan never confirmed.
- W-9/W-8BEN PDFs in `Steven_Henry_AI_System_Brain` history; identity protection
  (IRS Form 14039, credit freeze, monitoring); key rotation — pending the owner's go
  since Oct 17–18, 2026.
- Nov 10 RLS+GRANT fix = anon reads as public. Never present as "secure."

## 8. Never started (in the gathered record)

- LandWeaver (no trace anywhere).
- OSIRIS beyond a frozen repo.
- GrantOS / CMGIO beyond specs.
- Phase 1 (schema migration + environment verification + property registration +
  open-decisions register) — gated on Gate 0.
- Phases 2–5 of the Nov 9 build sequence (stage chain, boards-as-data, cost ledger +
  placement registry, governed render + publish).
- Phases F–I of the Nov 11 real plan (doc updates + pointer notes, page builds,
  integration verification, TEST-ALL + handoff) — Phase G builds wait on the
  reconciliation draft's confirmation.
- The standby item (face scan + fingerprint verification) — deliberately NOT started;
  do not build until a deploy order.
- Vercel Marketplace Supabase integration — deliberately NOT installed.
- Thumbnail + voiceover Runway apps (next after Workflows First Attempt).
