# Sections and Systems — Designed vs. Exists vs. Missing

Every system and every section: what it should do (per the owner's designs), what
exists now, and what's missing. Status is as of the last verification in the record
(November 11, 2026 click-through QA + Phase E button inventory for the live app;
November 9 baseline for the VisionWeaver pages). Statuses are the record's, not new
judgments — nothing was re-tested to build this hub.

---

## 1. The 6 Core Systems (enterprise level)

| System | Designed behavior | Exists now | Missing |
|---|---|---|---|
| **VisionWeaver** | Full creative production system (§3). | Live at `/visionweaver/*` in `csuite-command`; vw3 design; 2.0 engine code. | Actions on most controls; data wiring to the production home; stage chain; prediction/QC/cost systems. |
| **GrantOS** | Grants + funding: discovery, applications, pipeline; Grants/Funding family merged into CEO Financial Command as a funding section. | Specs + Drive hub only. | Everything — no repo, no app, no tables. |
| **LandWeaver** | Property/land intelligence; Property/Land Intelligence family merged into CEO Resource Intelligence as a summary section. | Nothing found in any source. | Everything. |
| **THELMA** | AI assistant + intelligence federation (CIntO); CRM system of record; propose-only orchestration with human approval gates. | CRM v2.0 live (28 pages); federation specified; command-root code in Drive; THELMA drawer → Guild queue verified in the C artifact build. | Propose-only implementation in the live Vercel app (M8); agent-name confirmation (M10); delivery (PR #11 unmerged); scoring/lists (PR #12 unmerged). |
| **CMGIO** | CMGIO office system. | Blueprint doc in Drive only. | Everything — no repo, no app. |
| **OSIRIS** | OSIRIS system. | One frozen repo. | Everything — no spec, no app. |

---

## 2. CEO Master Dashboard — the 15 pages (DRAFT recommendation)

From the Phase B reconciliation draft (2026-11-11 22:14 CST) — **DRAFT, awaiting the
owner's confirmation**. Status key: **(a)** has design + has data · **(b)** has
design, no data · **(c)** no design, has data · **(d)** no data + no design.
"Design" means a visual page design exists (only Home qualifies — screenshot 4 is a
full-screen design of Home only; the other 12 nav items have nav presence only).
"Data" means a table EXISTS TODAY with rows feeding the page (per the Phase D draft's
live read, 2026-11-11 evening CST). Proposed tables do not count.

| # | Page | Spec-map family/families | Status | Data today | Phase D unlocks |
|---|---|---|---|---|---|
| 1 | **Home** | Executive Overview | **(a)** | `projects` (11), `initiatives` (12), `records` (20), `release_gates` (13), `integration_inventory` (18), `audit_events` (6) | `decisions`, `pending_items`, `notes` (Decision Queue / Pending / NOTE PAD panels go live) |
| 2 | **Notebook** | — (functional notes section; no 17-map family) | **(d)** | None — `notes` table doesn't exist; `NOTES` array is static | `notes` — create/edit/delete/search |
| 3 | **Pending** | Approvals & Decisions (approvals-queue half) | **(d)** | None | `pending_items` — checkboxes that save |
| 4 | **Executive Command** | Approvals & Decisions (Decision Queue half) + Executive Inbox/Briefings + Operations (merged sections) | **(d)** | None (`audit_events` adjacent only) | `decisions`; briefings/operations feeds need owner input |
| 5 | **C-Suite** | C-Suite/Leadership | **(d)** | None — `team_members` doesn't exist (`memberships`, 1 row, is access control) | `team_members`, seeded with the confirmed roster (Decision 4) |
| 6 | **System Portfolio** | Systems Portfolio | **(d)** | None — 6-system list is static | None proposed — list stays curated unless owner asks for a systems table |
| 7 | **Resource Intelligence** | Resource/Usage Command + Property/Land Intelligence (LandWeaver summary) | **(d)** | None | `analytics` (metric snapshots) |
| 8 | **Ecosystem Intelligence** | Intelligence/Research + Growth/Marketing (merged) | **(d)** | None | `analytics`; external-intel sources are a Phase H question |
| 9 | **Financial Command** | Financial Command + Grants/Funding (funding section) | **(d)** | None — honest empty state | `finance_records` — the ledger |
| 10 | **IT/Infrastructure** | — (closest: Systems Portfolio + Resource/Usage Command) | **(c)** | `integration_inventory` (18 rows, `prime_status` verified/partial/not-verified) | Nothing required; Phase H verifies live status |
| 11 | **Security Governance** | Risk/Security/Compliance | **(d)** | None — `security_events` doesn't exist | `security_events` — append-only, no anon access, the one table the public can never read |
| 12 | **Quality Audit** | Quality Control | **(c)** | `release_gates` (13 rows, 0/13 implemented) | Nothing required |
| 13 | **Integration & Systems** | — (data: `integration_inventory`) | **(c)** | `integration_inventory` (18 rows) | Nothing required; Phase H verifies connections |
| 14 | **Audit/History** | Audit/History | **(c)** | `audit_events` (6 rows, append-only) | Q8 (audit vocabulary extension) affects new events, not the read path |
| 15 | **Settings/Governance** | Settings/Governance | **(c)** | `page_registry` (27 rows) + `view_preferences` (0 rows, structure exists) + `memberships` (1 row) | View persistence for signed-in users lands with auth (Phase D) |

**Counts:** (a) 1 · (b) 0 · (c) 5 · (d) 9. The design gap is bigger than the data gap:
14 of 15 pages have no visual page design. The live CEO top nav today is a subset
placeholder, not this 15-page list. Pages are never shipped with invented numbers or
seed data presented as live.

**Notebook (page 2) — stated plainly:** the SECTION is built (create/edit/delete/
search notes, CEO gold/dark design language, backed by the proposed `notes` table;
the Home "NOTE PAD" panel surfaces Notebook content). The VIEW DESIGN is banned
everywhere, permanently (see [SYSTEM-DESIGN.md](SYSTEM-DESIGN.md) §8).

---

## 3. VisionWeaver — the 27 pages (Canonical Spec §6)

Each page: function, data owner, gate. "Gate" is the spec's build gate (Gate 1 =
Avatar State acceptance support; Gate 2 = integration/security; Gate 4 = World State;
Deferred = specified but sequenced later). "Live state" is from the Nov 11
click-through QA where that page was exercised; pages not exercised are marked
"not QA'd live."

### Core (10)

| # | Page | Designed behavior (spec) | Gate | Live state (Nov 11 QA) |
|---|---|---|---|---|
| 01 | Home Dashboard | Landing, featured projects, active project, pipeline, connection health, recent activity. Reads `vw_projects`, `vw_health_view`, `vw_audit_events` tail. Health renders unverified until storage verified. | Gate 2 | Navigation + live reads work (CEO Home). Connection-health honesty fix outstanding. |
| 02 | Vision Builder | Prompt-to-project intake; model selection; references; approval. Intake creates no project row until a track sheet + open-decisions list exist. Model selection reads `vw_models`, shows cost first. | Deferred (Gate 4) | **Modes dead.** |
| 03 | Strategic Planner | Objectives, milestones, dependencies, cost. A milestone can't complete without a linked verified artifact. Cost derived from `vw_cost_ledger`. | Deferred | Not QA'd live. |
| 04 | Initiatives | Kanban (Intake → Planning → Progress → Review → Completed); every column move writes an immutable audit event. | Deferred | Not QA'd live. |
| 05 | Programs and Projects | Portfolio, episodes, tasks, production stage, asset lineage, permissions. Owns `vw_projects`, `vw_episodes`. Only registered projects appear. | Gate 1 | Projects Pause/Resume **untested** (would modify data; anon SELECT-only, writes fail). |
| 06 | AI Co-Pilot | Orchestrate THELMA, research, content, video, compliance, CMGIO, quality agents; human approval blocking. No agent action without a role-scoped grant. | Gate 2 | **Ask dead.** THELMA not connected in the live app. |
| 07 | CMI | Creative + market intelligence; signals; opportunity. Every trend row carries a source URL + observed-at. | Deferred | Not QA'd live. |
| 08 | Directors Guild | Submissions, keyframe approval, revision queue, publishing authorization (hard gate). Owns `vw_approvals`, `ww_review_decisions`. | Gate 2 | Approve/Request-changes **untested** (would modify data). |
| 09 | Teams | People, membership, invitations, tasks. Roles read from the record (D22). Built for 30–50 seats from day one. | Gate 2 | Not QA'd live. |
| 10 | C-Suite | Executive agents (THELMA, CMGIO); delegation as a grant with scope + expiry. | Gate 2 | **Cards dead** (C-Suite cards do nothing). Retired roster displayed (DRIFT-003). |

### Production (10)

| # | Page | Designed behavior (spec) | Gate | Live state (Nov 11 QA) |
|---|---|---|---|---|
| 11 | Create and Produce | Start a book/commercial/film/image/series/clip; lock references; run preflight. Preflight is blocking; no generation without a prediction record (D17). | Gate 1 | Preflight does not exist. Not QA'd live. |
| 12 | Book Creation | Series canon, manuscripts, chapter-to-episode, adaptation, cover, edits, publication. Canon is a single versioned, approver-stamped record. | Deferred | Not QA'd live. |
| 13 | Avatar Engineering | Cast Board, Character Detail, 360 View Board; 32/16/64 profiles. Variants boarded separately; 32-view master needs per-cell manifest; 16-view clothing-only; 64-slot blocked on camera-height calibration. NO_DIALOGUE for BOY-001 RAIN v02. | Gate 1 (primary) | Continuity Gate grid renders (SHOT 02 gating states); bundle acceptance blocked on M4. |
| 14 | Worlds and Locations | Location packs, geospatial anchors, time/place evidence, weather, acoustics, offscreen state, rights. Four-panel set board + floor plan + angle list required before reuse. | Gate 4 | Worlds is the **only real V1/V2/V3 switch** of the three tested (Worlds/Resources/Distribution). |
| 15 | Design Studio | Avatar/scene design, catalogue, performance, effects, licensing, store, history, safe publishing. Rights row required before publishable. | Deferred | Not QA'd live. |
| 16 | Design and Commercial | Brief, script, brand/product lock, 30-second storyboard, variants, approvals. Placement registry + disclosure + clean-frame QC before publish. | Deferred | Placement registry not built (the Pepsi Zero end-card failure is the proof). |
| 17 | Scene and Production | Shot list, storyboard, maps, camera/face/light locks, clip continuation, stitching, sound, generation. D17 gate is the blocking door; ≤2 pass ceiling. | Gate 1 | Not QA'd live. |
| 18 | Media Library | Versioned assets, reference packs, provenance, rights, reuse. No asset row without provenance + rights records. | Gate 1 | Not QA'd live. |
| 19 | Post Production | Timeline, audio, color, effects, captions, stitch, export 16:9 / 9:16. Captions checked against script as a `vw_qc_notes` row. | Deferred | Not QA'd live. |
| 20 | Distribution and Growth | YouTube/TikTok/Instagram/Facebook publication; repurposing; insights. Publish is a gate (approval id, thumbnail verification, channel record). Wired to `social_post_queue` once M9 lands. | Deferred | Distribution V1/V2/V3 switch **not real** (presentation-only). |

### Governance (7)

| # | Page | Designed behavior (spec) | Gate | Live state (Nov 11 QA) |
|---|---|---|---|---|
| 21 | Quality and Audit | Auditor, VERITAS, QCA, rights, immutable evidence, THELMA acknowledgment. Append-only `vw_qc_notes` + `vw_audit_events`. Duration alone is never QC. | Gate 1 (primary) | Release-gate pipeline renders static states. |
| 22 | Finance and Accounting | Budgets, cost/credit ledger, invoices, revenue, subscriptions, provider spend, approvals. No Runway run without a cost row + ceiling check. | Gate 2 | Hardcoded figures in vw3 lineage; honest empty state in CEO Financial Command. Ledger doesn't exist. |
| 23 | IT and Security | Provider inventory, RBAC, zero-trust, backups, logs, health, incidents. Connection status from a verified check. Credential failure = incident row. | Gate 2 | Infra rows hardcoded "Online" in vw3 lineage. |
| 24 | Resources | Training, tutorials, workflows, templates, guides, licensed sources. Content tagged by teaching tier 1–5 (D24). | Deferred (curriculum host) | **Training tracks dead.** Resources V1/V2/V3 switch **not real**. |
| 25 | Assets and Knowledge | Canon, scripts, approved references, knowledge base, asset rights, source evidence. Knowledge entries carry a source; canon entries carry version + approver. | Deferred | Search **dead**: any typed query → 0 results; scans 92 local seed records, never Supabase. |
| 26 | Reports and Insights | Metrics, provenance, filters, export, scheduled reporting. Metrics derive from the record only; no rows = "unavailable," not zero. | Gate 2 | Not QA'd live. |
| 27 | Settings | Per-page V1/V2/V3 selections, theme, provider connections, roles, notifications, permissions. View mode per-page per-user; Advanced Administration Owner-only. Directives D1–D25 live here (versioned master copy). | Gate 1 (owner-only section) | Per-page view picker presentation-only in vw3 lineage. No auth, so no role enforcement in the live app. |

### Folded in from B (6 more pages in the 33-page one-system statement)

| Page | Designed behavior | Exists now |
|---|---|---|
| Characters / Cast | Bundle builder with lock chain. | 2.0 section (B). No standalone page in A/C (covered in Avatar Engineering). |
| Voice Library | Locked voices + candidates. | 2.0 section (B). In-page step in C, not a page. |
| Hold Queue | Cast → Voice → Animate → Assemble → Publish. | 2.0 section (B). Review queue lives in Directors Guild in C; no standalone page. |
| Loop Engine & Run Manifests | Engine stages + hard gates + manifest registry. | Python engine + 40 manifests (B). Not in A/C. |
| Save Map & Storage | Dropbox hub / Drive map + workspace JSON export. | 2.0 section (B). In-page step in C. Dropbox not connected. |
| Plans & Tiers | Starter / Studio / Pro / Flagship. | 2.0 section (B). In-page step in C. |

---

## 4. T.H.E.L.M.A. CRM — 28 pages

The CRM is the system of record for contacts, messages, posts, and campaigns. Live:
standalone-crm v2.0 (`main` `609ca86`, Vercel READY). The 28-page list is the audit
baseline (CRM fix-up audit vs. the live 28-page list, Oct 27 correction). Per-page
detail lives in `sources/github/standalone-crm/` and the CRM build dirs under
`sources/workspace/`.

**Designed behavior:** full CRM — contacts, pipelines, messages (email + text),
posts, campaigns, automations, forms, funnels, reviews, voice AI, lead scoring,
smart lists — with THELMA propose-only orchestration and human approval gates.

**Exists now:** messages, posts, and campaigns wait **queued** — nothing sends. No
live delivery, no automations, no forms, no funnels, no reviews flow, no voice AI.
Lead scoring is built as code (DRAFT PR #12, unmerged). Delivery is built as code
(DRAFT PR #11, unmerged, delivery OFF by default).

**Missing:** everything in the GHL delivery-first + scoring/lists builds (merge,
deploy, keys, SQL, 10DLC registration) — see [LEFT-BEHIND.md](LEFT-BEHIND.md).
Account page → "Look" card → ThemePicker works (whole-page switcher + lighter
shadows/cards) per the Oct 27 fix-up. Complaint on record: "thick/heavy, cumbersome,
parts missing."

---

## 5. Content production sections

| Section | Designed behavior | Exists now | Missing |
|---|---|---|---|
| **Fireside Chats** | 6 households A–F; Storyboard → clips → sync → upscale → assemble; recorded human narration only for Household A; post to YouTube/Instagram @firesideClippings (gated per destination). | Originals + boards built FROM originals; Household A pilot run sheet (6 clips, 46s); Runway App Studio build "Workflows First Attempt" complete. | Face-hold test (staged, not run); Clip 2 rejected (do not build on); download-button fix queued; sync + audio settle. |
| **First in Consciousness** | Mentor series, original characters only; Season 1 = origin + 8 speeches; Runway-only production. | Season 1 complete (scripts + audios); leads locked; production guide + upload pack delivered. | Speech 6 two lines (owner ruling needed); lead confirmations; board picks; face-hold test first. |
| **Crossroads of Identity** | Flagship pipeline per D8. | Registered property; repo; shot bible/pipeline docs. | Pipeline implementation (gates, prediction, QC, cost). |
| **Psychology catalog** | 300 ideas (JC/CD/VF/DC × 75). | Idea catalogs in the record. | Registration with packages linked (Phase 1). |
| **Runway App Studio / Factory Line** | Plain-language description → hosted media-production app; TYPE → PIECES → LINE → SCHEDULE → POST. | "Workflows First Attempt" complete (Gen-4.5 clip generator, 5/8/10s, 3 presets). | Thumbnail + voiceover apps (next); channels must exist + owner go per destination. |
| **Book pipeline** | Book Creation → adaptation → publication (KDP lane in 2.0). | KDP lane in 2.0 Books section; book specs in Drive. | Decisions pending (PR #62, Console wallet credit, TEST 4 gate). |

---

## 6. Cross-cutting sections

| Section | Designed behavior | Exists now | Missing |
|---|---|---|---|
| **Search** | Searches the production record (Supabase). | Scans 92 local seed records; any typed query → 0 results. | Supabase-backed search. |
| **Auth / sign-in** | Email/password; sign-in to change, public to view; role enforcement (D22). | None in the live Vercel app (`/login` 404s). Server-side sessions verified only in the artifact incarnation of C. | Auth plan (Phase D draft) + implementation — Decision 7 open. |
| **Server routes** | 25 server routes (Phase D draft). | 1 Supabase write in the codebase (`updateProjectStatus` — will fail under RLS). | 25 routes — Decision 8 open. |
| **Health / monitoring** | Real checks; honest DEGRADED states; uptime ticker. | Real checks in the C artifact build. Hardcoded "Online" in vw3 lineage. | Verified checks in the live Vercel app. |
| **Audit trail** | Append-only `audit_events` (6 rows) + `vw_audit_events` (specified). | `audit_events` table exists with rows; Audit/History page is status (c). | Vocabulary extension (Q8); `vw_` tables unapplied. |
