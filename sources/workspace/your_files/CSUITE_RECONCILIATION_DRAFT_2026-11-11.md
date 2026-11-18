# PHASE B — RECONCILIATION RECORD (DRAFT)

## ⚠️ DRAFT — PENDING OWNER CONFIRMATION — NOTHING IN THIS DOCUMENT IS DECIDED ⚠️

**Every section below is the ASSISTANT'S RECOMMENDATION, not a decided fact.** Nothing in this record becomes authority until the owner reads it and confirms it (or corrects it). When confirmed, this record becomes the single authority for Phases C–H: the CEO page list, the officer roster, and the repo-placement ruling. If sources conflict later, the confirmed record wins until the owner overrides it.

- **Written:** 2026-11-11, evening CST. Read-only preparation; no commits, no GitHub writes, no Supabase changes.
- **Sources:** `CSUITE_FINDINGS_AND_REAL_PLAN_2026-11-11.md` (Part One findings + Part Two Phase B + §10 Decisions 1, 2, 4); `CSUITE_TABLE_LIST_DRAFT_2026-11-11.md` (existing vs. proposed tables, read live 2026-11-11 evening CST); System of Record PDF v1.1 (roster authority); screenshot 4 (13-item nav); Page Implementation Map (17 families); Enterprise Build Spec.
- **Status of the live app today:** Phases A + C are done and verified live (CEO Dashboard at `/`, VisionWeaver at `/visionweaver/*`, Notebook at `/notebook`, redirects working). The live CEO top nav today is a subset placeholder, NOT this 15-page list. Phase G builds the nav + pages from this record once it is confirmed.
- **The missing `.docx`:** the SOR cites `CEO_MASTER_DASHBOARD_THE_MASTER_BUILD_PROMPT_.docx` ("14 unified tabs, plus 150-item improvement list"). It was not found in GitHub, Drive, or workspace. The "14" count is therefore unverified. This record proceeds without it. If the owner finds/sends it, this record gets ONE revision (reconcile again — not a rebuild).

---

## §1 — DECISION 1: THE CEO PAGE LIST — RECOMMENDATION = 15 PAGES

### ⚠️ DRAFT — PENDING OWNER CONFIRMATION ⚠️

**Recommendation:** the 13 pages from screenshot 4 (the owner's most recent design intent), in screenshot-4 order, PLUS the two spec-map families that are clearly needed and have no 13-item equivalent — Audit/History and Settings/Governance — appended in spec-map order. Total: **15 pages.**

| # | Page | Source | 17-map family / families it carries |
|---|---|---|---|
| 1 | Home | Screenshot 4 | Executive Overview (direct) |
| 2 | Notebook | Screenshot 4 | — (no 17-map family; see §4) |
| 3 | Pending | Screenshot 4 | Approvals & Decisions (shared with #4 — the approvals queue half) |
| 4 | Executive Command | Screenshot 4 | Approvals & Decisions (the Decision Queue half) + Executive Inbox/Briefings (merged in as a Briefings section) + Operations (merged in as an oversight section; detail lives in the THELMA linked system) |
| 5 | C-Suite | Screenshot 4 | C-Suite/Leadership (direct) |
| 6 | System Portfolio | Screenshot 4 | Systems Portfolio (direct) |
| 7 | Resource Intelligence | Screenshot 4 | Resource/Usage Command (direct, renamed) + Property/Land Intelligence (merged in as a LandWeaver summary section; detail lives in the LandWeaver linked system) |
| 8 | Ecosystem Intelligence | Screenshot 4 | Intelligence/Research (merged in) + Growth/Marketing (merged in) |
| 9 | Financial Command | Screenshot 4 | Financial Command (direct) + Grants/Funding (merged in as a funding section; grant detail lives in the GrantOS linked system) |
| 10 | IT/Infrastructure | Screenshot 4 | — (no 17-map family as named; closest are Systems Portfolio + Resource/Usage Command) |
| 11 | Security Governance | Screenshot 4 | Risk/Security/Compliance (direct, renamed) |
| 12 | Quality Audit | Screenshot 4 | Quality Control (direct, renamed) |
| 13 | Integration & Systems | Screenshot 4 | — (no 17-map family as named; the `integration_inventory` table is its data source) |
| 14 | Audit/History | Spec map (family 16) | Audit/History (direct) |
| 15 | Settings/Governance | Spec map (family 17) | Settings/Governance (direct) |

### How the 17 spec-map families map onto the 15 (all 17 covered; none dropped)

- **Direct 1:1 (9 families):** Executive Overview → Home; C-Suite/Leadership → C-Suite; Systems Portfolio → System Portfolio; Financial Command → Financial Command; Risk/Security/Compliance → Security Governance; Quality Control → Quality Audit; Resource/Usage Command → Resource Intelligence; Audit/History → Audit/History; Settings/Governance → Settings/Governance.
- **Split across two pages (1 family):** Approvals & Decisions → Pending (the approvals queue, fed by the proposed `pending_items` table) + Executive Command (the Decision Queue, fed by the proposed `decisions` table). The split follows the two tables; one family, two surfaces.
- **Merged in as a section of a 15-page (6 families):** Executive Inbox/Briefings → Executive Command (Briefings section); Growth/Marketing → Ecosystem Intelligence; Property/Land Intelligence → Resource Intelligence (LandWeaver summary); Grants/Funding → Financial Command (funding section); Operations → Executive Command (oversight section); Intelligence/Research → Ecosystem Intelligence. These six have no standalone page because the 13-item nav — the owner's most recent design intent — has no item for them, and each one is naturally a section of the page it merges into. Merged is not lost: the content is built as a named section of the merged-into page, and this record names where it lives so nothing silently disappears.
- **Covered via Home panels + linked system, no standalone CEO page (1 family):** Projects/Initiatives → the Home page's Active Project + Production Pipeline panels (fed by the existing `projects` and `initiatives` tables) + the VisionWeaver linked system (`/visionweaver/programs`), where project detail lives. This follows the architecture rule: the CEO shell presents attached systems without absorbing their business logic. A standalone CEO Projects page would duplicate VisionWeaver's Programs & Projects.
- **Screenshot-4 pages with no 17-map family (4):** Notebook (the functional notes section — see §4); IT/Infrastructure (fed by the existing `integration_inventory` table); Integration & Systems (also fed by `integration_inventory`; the distinction between pages 10 and 13 is: IT/Infrastructure = infrastructure health/status, Integration & Systems = connection status per integration — if the owner considers them one page, say so and they merge); Ecosystem Intelligence (the 13-nav's name for the external-intelligence surface; it absorbs Growth/Marketing + Intelligence/Research above).

### The alternatives (one paragraph each, so the choice is visible)

- **13-only (screenshot 4 exactly):** Build only the 13 nav items, nothing more. What is lost: Audit/History (the append-only `audit_events` trail would have no CEO page to live on — it would stay visible only inside other pages or not at all) and Settings/Governance (page/view governance, including the Visual Views registry, would have no CEO home — it would stay inside VisionWeaver's Settings only). What is gained: the smallest build, exactly matching the screenshot. The six merged families above would still merge the same way; the only difference from the recommendation is the absence of pages 14–15.
- **17-only (spec map exactly):** Build the 17 families as 17 pages, in spec-map order. What is lost: the Notebook section (it does not exist in the 17-map at all — it would need to be added as an 18th page or dropped, and dropping it contradicts the owner's explicit instruction that the section stays); the screenshot-4 names the owner designed with (Ecosystem Intelligence, Integration & Systems, IT/Infrastructure as named); and the 13-nav structure itself. What is gained: exact spec compliance and a standalone page for each of the six merged families (Inbox/Briefings, Projects/Initiatives, Growth/Marketing, Property/Land Intelligence, Grants/Funding, Operations, Intelligence/Research would each get their own page instead of merging). This is the largest build and the furthest from the owner's most recent design.

---

## §2 — DECISION 4: THE OFFICER ROSTER — RECOMMENDATION = SOR ROSTER

### ⚠️ DRAFT — PENDING OWNER CONFIRMATION ⚠️

**Recommendation:** the System of Record (SOR) roster. The SOR (v1.1, Jul 13, 2026) declares itself "the single source of truth for all C-Suite definitions" and states "any AI building on this system reads this file first." Its drift register contains **DRIFT-003 (OPEN): "The dashboard Agent Hub displays the retired roster."** The roster currently built in the live app is the retired one. The SOR roster is the recommendation; the owner is the final authority — if screenshot 4 is current, say so and that roster is built instead.

### Side-by-side

| SOR roster (RECOMMENDED) | Screenshot-4 roster (currently built) | Difference |
|---|---|---|
| CEO | CEO | Same |
| CMGIO | CMGIO | Same |
| COO | COO | Same |
| CFO | CFO | Same |
| **CIO/CTO — combined, one office** | CTO **and** CIO (two separate offices) | **MERGED.** SOR retires separate "CIO"/"CTO" offices. One combined office replaces the two cards. |
| Legal | CLO (Chief Legal Officer) | **RENAMED / RESCOPED.** The legal office is shown as "Legal," not as a CLO officer card. |
| HR | CHRO (Chief HR Officer) | **RENAMED / RESCOPED.** The people office is shown as "HR," not as a CHRO officer card. |
| Sales | — (no Sales office) | **ADDED.** Sales is a SOR office with no screenshot-4 equivalent. New card. |
| Customer Success | — (no Customer Success office) | **ADDED.** Customer Success is a SOR office with no screenshot-4 equivalent. New card. |
| THELMA as CIntO (Chief Intelligence Officer) | — (THELMA appears only as "Operations Lead" in the sidebar footer, not as an officer) | **ADDED as an officer.** THELMA sits in the roster as CIntO. |
| The Architect (above all) | "The Architect / EstibanCreations / System Owner" (sidebar footer identity) | **Same role, different placement.** The Architect is above the roster, not an officer card. |
| — | CCO | **RETIRED.** SOR explicitly retires "CCO." Card removed. |
| — | CAO | **NOT IN SOR ROSTER.** CAO does not appear in the SOR roster list. Card removed unless the owner says otherwise. (This record does not invent where CAO duties go — owner's call if CAO functions must be preserved somewhere.) |

**Also retired by the SOR (in neither list, noted for completeness):** "CMO" and "CRO" are retired terms. Neither appears in the screenshot-4 roster. The goal named "CRO Master Dashboard" uses a retired term — rename it (or note it as historical) when the roster is settled; that rename is a label change, not a build change.

### Where the roster lives in data

The proposed `team_members` table (Phase D draft §4.4) holds the directory: name, title, `role_label`, bio, photo URI, email, `user_id` link, sort order, status. It is the **public directory** — distinct from `memberships` (access control: who may sign in, with what role). The table shape does not depend on this roster decision; the table can be created before the roster is settled, and **seeded with whichever roster the owner confirms**. No officer is seeded until Decision 4 is answered. Until then, the live C-Suite section keeps showing the retired 10-officer roster (unchanged by Phases A + C, deliberately — see the Phase A+C verification report).

---

## §3 — DECISION 2: REPO PLACEMENT — RECOMMENDATION = RULE IT BY DESIGN

### ⚠️ DRAFT — PENDING OWNER CONFIRMATION ⚠️

**The ruling (recommendation):** the VisionWeaver workspaces hosted in the `MASTER_CEO_DASHBOARD` repo — the vw3 runtime (`src/components/VisionWeaverWorkspace.tsx`, `VisionWeaverSceneSetup.tsx`, `VisionWeaverAssemblyWatcher.tsx`), the 3 VisionWeaver tests in `tests/`, the 4 VisionWeaver docs in `docs/`, and the 4 open VisionWeaver PRs (#64, #62, #56, #55) — **remain in that repo by documented design.** The CEO shell hosts attached workspaces' surfaces; the live enforcement of the separation principle is the runtime structure in `csuite-command` (`/` = CEO Dashboard, `/visionweaver/*` = VisionWeaver subsystem, exactly two cross-links, nav separation verified live). The `MASTER_CEO_DASHBOARD` copy is the historical/canonical vw3 host; the `VisionWeaver` repo holds specs, docs, history, the 2.0 engine, and `apps/director-studio/`; the live system is `csuite-command`. This ruling resolves the apparent violation of Enterprise Build Spec §1 ("without absorbing the business logic of attached systems") and page-map acceptance criterion #9 ("no linked system has been collapsed into CEO Dashboard identity") by distinguishing *hosting a workspace surface* (what the CEO repo does) from *absorbing business logic* (what the live `csuite-command` structure does not do). The principle stands for the live system; the CEO repo's hosting is grandfathered and documented, not hidden.

**Documentation to be updated (Phase F, after this record is confirmed — doc edits only, no code moves):**
1. Enterprise Build Spec (`MASTER_CEO_DASHBOARD/docs/architecture/MASTER-CEO-DASHBOARD-ENTERPRISE-BUILD-SPECIFICATION.md`) — add the placement ruling + name `csuite-command` and the corrected architecture (CEO front door, VisionWeaver subsystem).
2. `MASTER_CEO_DASHBOARD/README.md` — state the ruling + point to `csuite-command` as the live system.
3. REPOSITORY-MAP (`Master-System-Buildout`) — record the ruling + the live-system pointer.
4. Pointer notes in the `VisionWeaver` and `Master-System-Buildout` READMEs/docs — "the current live system is `csuite-command` (URL + Nov 11 architecture)" — so no one, including a future AI, looks in the wrong repo for the current work.

**What this ruling does NOT do:** it moves no code, closes no PRs, and changes no standing PR constraint. PR #64 stays DO NOT MERGE until verified; PR #63 stands; PR #62 stays the owner's decision. The branch audit (Phase F) still happens before any move/retire work elsewhere. The `Master-dashboard-` repo (the misnamed "VisionWeaver Command v6.0") is NOT covered by this ruling — its fate is Decision 3 (recommendation: archive), decided separately.

**The move alternative (one paragraph):** move the vw3 runtime (3 components + 3 tests + docs) from `MASTER_CEO_DASHBOARD` to the `VisionWeaver` repo via a documented export/import — pointer file in the old location, full history note, delivered as a PR (not a direct push) so the owner reviews the move before it lands; PRs #64/#62/#56/#55 stay where they are and are closed with pointers only with the owner's go. Risks: history loss if done by copy-paste (mitigated by `git mv` where possible + pointer files), import breakage in the CEO app (mitigated by verifying the destination repo builds after the move), and PR divergence (the 4 open PRs target the CEO repo). Choose this only if the owner wants physical separation of the code, not just documented separation. The recommendation is the ruling above because the runtime structure already separates the systems, and moving is risk without live benefit.

---

## §4 — THE NOTEBOOK: SECTION IN, VIEW DESIGN OUT (STATED PLAINLY)

### ⚠️ DRAFT — PENDING OWNER CONFIRMATION (of the page list; the notebook rule itself is the owner's standing instruction, not a draft) ⚠️

- **The Notebook SECTION is page 2 of the 15-page list.** It is a functional notes section/page: create, edit, delete, search notes, backed by the proposed `notes` table (Phase D draft §4.11). It is built in the CEO gold/dark design language. The CEO home's "NOTE PAD" panel surfaces Notebook content in gold/dark — the display function stays.
- **The notebook VIEW DESIGN is banned everywhere, permanently.** The "Strategic Notepad" aesthetic — yellow paper background (#FDF1AA), blue ruled lines (#87CEEB, 2rem), red vertical margin line (#FF7F7F, 20px), casual marker typography (Comic Sans / Marker Felt / Casual Marker) — is never used anywhere: not on Tab 1, not on the CEO Dashboard, not on the Notebook page itself, not on any auth/email-entry page, nowhere, ever. Authority: the owner's clarification (2026-11-11 21:37 CST) + the `UI-BOARD-STANDARD-v1.md` policy (19 repos, Oct 7, 2026): "Strategic Notepad / Legal Pad / notebook-paper styling is permanently retired and unavailable as a view, theme, fallback, or new generated option."
- **Phase A verification (done, 2026-11-11):** the notepad theme block was removed from `MASTER_CEO_DASHBOARD/src/theme.css`, the `'notepad'` option and "Think mode" button were removed from `SystemControls.tsx` (with a startup reset forcing `localStorage['ec-system-theme']` to `'dark'`), and the Notebook links in `csuite-command` were fixed to `/notebook`. Grep verification across both repos' runnable code for all 8 forbidden patterns (`#FDF1AA`, `#87CEEB`, `#FF7F7F`, `data-theme="notepad"`, `Strategic Notepad`, `strategic-notepad`, `Comic Sans`, `Marker Felt`): **zero hits in runnable code.** The single `Strategic Notepad` hit is the `UI-BOARD-STANDARD-v1.md` policy doc itself — the rule, explicitly excluded. Live browser verification (22:06–22:07 CST) confirmed no yellow-paper styling on `/`, `/visionweaver`, or `/notebook`.
- **Honest exception, stated plainly:** `Master-dashboard-` still contains the literal STRATEGIC NOTEPAD component (`DashboardTab.tsx`, the only `FDF1AA`/`87CEEB` hits in the org). It was deliberately NOT stripped — its fate is Decision 3 (recommendation: archive). If the owner chooses "strip + keep" instead, the component is removed then. Until Decision 3, that repo is untouched and the exception stands.

---

## §5 — PER-PAGE STATUS (ALL 15 PAGES)

### ⚠️ DRAFT — PENDING OWNER CONFIRMATION ⚠️

**Status key (from Phase B):** (a) has design + has data · (b) has design, no data (honest empty state) · (c) no design — build from the spec family's decision/content/actions + VisionWeaver design levels (has data) · (d) no data + no design (build layout + honest empty state).

**How "design" was judged (honestly):** screenshot 4 is a full-screen design of the Home/CEO Dashboard ONLY. The other 12 screenshot-4 items have **nav presence only** — their names appear in the 13-icon top nav; no page design for them exists in any screenshot. The spec map gives each family decision/content/actions (a functional spec, not a visual design). A page counts as "has design" only if a visual page design exists. Only Home qualifies.

**How "data" was judged:** a page "has data" only if a table EXISTS TODAY with rows feeding it (per the Phase D draft's live read, 2026-11-11 evening CST). A PROPOSED table (Phase D draft, not yet created) does NOT count — it is listed in the "Phase D unlocks" column so the path from (d) → live is visible. Static/hardcoded content (the `NOTES` array, the 6-system list, the officer cards) does NOT count as data.

| # | Page | Design? | Data today? (existing table + rows) | Status | Phase D unlocks (proposed table) |
|---|---|---|---|---|---|
| 1 | Home | **YES** — screenshot 4, full-screen design | **YES** — `projects` (11), `initiatives` (12), `records` (20), `release_gates` (13), `integration_inventory` (18), `audit_events` (6) | **(a)** | `decisions` (Decision Queue goes live), `pending_items` (Pending panel goes live), `notes` (NOTE PAD panel goes live) |
| 2 | Notebook | NO — nav name only (+ a minimal Phase A placeholder route, not a design) | NO — `notes` table does not exist; the `NOTES` array is static | **(d)** | `notes` — create/edit/delete/search go live |
| 3 | Pending | NO — nav name only (the Home Pending panel is a display panel, not a page design) | NO — `pending_items` does not exist | **(d)** | `pending_items` — checkboxes that save |
| 4 | Executive Command | NO — nav name only | NO — no table for Decision Queue / briefings / operations oversight (`audit_events` is adjacent only) | **(d)** | `decisions` (Decision Queue); briefings/operations sections need owner input on what feeds them |
| 5 | C-Suite | NO — nav name only (the Home C-Suite panel shows the RETIRED roster, not a page design) | NO — `team_members` does not exist (`memberships`, 1 row, is access control, not the directory) | **(d)** | `team_members` — seeded with the confirmed roster (Decision 4); cards open officer detail |
| 6 | System Portfolio | NO — nav name only | NO — no systems table; the 6 Core Systems list is static (`integration_inventory` is adjacent only) | **(d)** | No table proposed for the 6-system list itself — the list stays curated content unless the owner asks for a systems table; status/links verified in Phase H |
| 7 | Resource Intelligence | NO — nav name only | NO — no resource/usage table today | **(d)** | `analytics` (metric snapshots feed resource panels) |
| 8 | Ecosystem Intelligence | NO — nav name only | NO — no ecosystem table today | **(d)** | `analytics` (metric snapshots); external-intel sources are a Phase H question |
| 9 | Financial Command | NO — nav name only | NO — finance is an honest empty state today | **(d)** | `finance_records` — the ledger the page reads |
| 10 | IT/Infrastructure | NO — nav name only | **YES** — `integration_inventory` (18 rows, `prime_status` verified/partial/not-verified) | **(c)** | Nothing required; Phase H verifies each integration's live status |
| 11 | Security Governance | NO — nav name only | NO — `security_events` does not exist (`audit_events` is the business trail, deliberately separate) | **(d)** | `security_events` — append-only, no anon access, the one table the public can never read |
| 12 | Quality Audit | NO — nav name only | **YES** — `release_gates` (13 rows, 0/13 implemented) | **(c)** | Nothing required |
| 13 | Integration & Systems | NO — nav name only | **YES** — `integration_inventory` (18 rows) | **(c)** | Nothing required; Phase H verifies connections |
| 14 | Audit/History | NO — not in screenshot 4 at all; spec-map family only (decision/content/actions defined) | **YES** — `audit_events` (6 rows, append-only) | **(c)** | Q8 (audit vocabulary extension) affects what new events can be logged, not this page's read path |
| 15 | Settings/Governance | NO — not in screenshot 4 at all; spec-map family only (decision/content/actions defined) | **YES** — `page_registry` (27 rows) + `view_preferences` (0 rows, structure exists) + `memberships` (1 row) | **(c)** | Nothing required; view persistence for signed-in users lands with auth (Phase D) |

### Status counts

| Status | Count | Pages |
|---|---|---|
| (a) design + data | **1** | Home |
| (b) design, no data | **0** | — (no page has a visual design without data; Home is the only designed page and it has data) |
| (c) no design, has data | **5** | IT/Infrastructure, Quality Audit, Integration & Systems, Audit/History, Settings/Governance |
| (d) no data + no design | **9** | Notebook, Pending, Executive Command, C-Suite, System Portfolio, Resource Intelligence, Ecosystem Intelligence, Financial Command, Security Governance |
| **Total** | **15** | |

**The honest read:** the design gap is bigger than the data gap. 14 of 15 pages have no visual page design — Phase G builds each layout from the spec family's decision/content/actions + the VisionWeaver design levels, one page at a time, with the owner reviewing the first page before the rest are built (per Phase G's pre-fix). The data gap closes substantially when Phase D runs: 8 of the 9 (d) pages get their table from the Phase D draft (Notebook, Pending, Executive Command, C-Suite, Resource Intelligence, Ecosystem Intelligence, Financial Command, Security Governance), with System Portfolio the exception, whose list stays curated. Pages are never shipped with invented numbers or seed data presented as live: until a table exists and holds real rows, the page shows an honest empty state.

---

## §6 — WHAT HAPPENS WHEN THE OWNER CONFIRMS THIS RECORD

### ⚠️ DRAFT — PENDING OWNER CONFIRMATION ⚠️

1. The owner confirms (or corrects) the 15-page list (§1), the SOR roster (§2), and the by-design ruling (§3) — in one message, or one decision at a time. Corrections are applied to this record AND to the code, once — no rebuilding the same thing.
2. This record (as confirmed) becomes the authority for Phases C–H. Phase G builds the pages from §5's statuses. Phase F applies the §3 ruling to the three docs + pointer notes.
3. Decisions still open after this record: Decision 3 (Master-dashboard- fate), Decisions 5–6 (generation + AI providers/keys/spend), Decision 7 (auth), Decision 8 (server routes), Decision 9 (table-list approval — the Phase D draft), Decision 10 (`.env` rotation + repos private), Decision 11 (the `.docx`, if found). This record does not decide any of them.
4. If the `.docx` is found later, this record gets one revision against it — the 14-tab list is compared, differences are flagged to the owner, and the record is updated only on his say-so.

**— Draft prepared 2026-11-11, evening CST. Read-only; nothing committed, nothing created, no tables, no policies, no GitHub writes. Awaiting the owner's confirmation.**
