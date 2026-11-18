# System Design — How He Designed It to Work

This document states the system's design **as the owner designed it**, from the
governing records: the C-Suite System of Record v1.1 (July 13, 2026), the Enterprise
Build Spec v1.0 (SYS-CEO-001), the Page Implementation Map, the Canonical Build
Specification (November 9, 2026, Directives D1–D25), the one-system statement
(November 2, 2026), and the November 11 findings/reconciliation drafts. Where the
design and the built reality differ, both are stated. Full source texts live under
`sources/` — see [OUTLINES-AND-SPECS.md](OUTLINES-AND-SPECS.md).

**Status note:** the November 11 reconciliation record (15-page list, SOR roster,
repo-placement ruling) is a DRAFT awaiting the owner's confirmation. It is reported
here as a draft recommendation, not a decided fact.

---

## 1. The enterprise and the front door

**Estiban Creations Enterprise.** The Architect (the owner, "System Owner") sits above
all officers and systems. The CEO Master Dashboard (gold/dark design language) is the
**primary front door** at `/` — the executive command surface from which the whole
enterprise is seen and steered.

**Corrected architecture (owner ruling, 2026-11-11 21:20 CST):** the CEO Dashboard is
the shell; **VisionWeaver is one of 6 Core Systems** linked within it, at
`/visionweaver/*`. The CEO shell presents attached systems without absorbing their
business logic (Enterprise Build Spec §1; Page Implementation Map acceptance
criterion #9: "no linked system has been collapsed into CEO Dashboard identity").
The live enforcement is the runtime structure in `csuite-command`: `/` = CEO
Dashboard, `/visionweaver/*` = VisionWeaver subsystem, exactly two cross-links, nav
separation verified live 2026-11-11 22:07 CST.

### The 6 Core Systems

| # | System | Designed role | What exists (2026-11-18) |
|---|---|---|---|
| 1 | **VisionWeaver** | Creative production system: projects, characters, worlds, scripts, renders, approvals, distribution (27 pages). | Live as `/visionweaver/*` in `csuite-command`; vw3 canonical design in `MASTER_CEO_DASHBOARD`; 2.0 engine in `VisionWeaver` repo. See §5. |
| 2 | **GrantOS** | Grants and funding: grant discovery, applications, funding pipeline. | Specs + Drive hub (`MAF/GrantOS Hub/`) only. No live app found. |
| 3 | **LandWeaver** | Property and land intelligence. | Nothing found — zero Drive hits, no repo, no spec in the gathered materials. |
| 4 | **THELMA** | The AI assistant / intelligence federation; also the CRM system of record (T.H.E.L.M.A. CRM v2.0). | CRM live (standalone-crm v2.0); federation specified in the SOR; command-root code in Drive; propose-only wiring partial. See §4. |
| 5 | **CMGIO** | The CMGIO office system (marketing/growth/intelligence office). | Blueprint document only (CMGIO Blueprint in Drive). No live app found. |
| 6 | **OSIRIS** | The OSIRIS system. | One repo (`OSIRIS`), frozen at the Oct 7, 2026 UI v1.2 sweep. No live app, no spec found. |

---

## 2. The System of Record (v1.1, July 13, 2026)

The SOR declares itself "the single source of truth for all C-Suite definitions" and
states that "any AI building on this system reads this file first." Its structures:

### 2.1 GIVEN vs REQUESTED

The SOR separates what is **GIVEN** (already decided/built — the foundation) from what
is **REQUESTED** (to be built — the 8 officer System Views, the federation wiring, the
enterprise circuit). The registry is the SOR's completeness ledger: every requested
item is tracked to built-or-open. As of the November 11 findings, the requested items
are largely still open.

### 2.2 THE PATTERN — the 7-part System View

Every officer/system is described in the same 7-part pattern (the SOR's "System View"):
identity/role, department, agents, integrations, decisions owned, content/actions, and
gates. The Page Implementation Map applies the same discipline to pages: each of the
17 page families carries a decision, content, and actions definition.

### 2.3 The Golden Path — deny by default

The execution doctrine, in order:

```
Ingest → Verify (V.E.R.I.T.A.S.) → Think → Check → ASK → Execute on authorization
```

- **Deny by default.** Nothing executes without authorization.
- **V.E.R.I.T.A.S.** is the verification step: every ingested item is verified before
  it is thought about, checked, or acted on.
- **ASK** is a hard gate: the system asks the owner before executing. This is the same
  doctrine restated in the Directives as hold-then-go (D2) and approval gates (D12),
  and in the CRM as propose-only THELMA (proposals land in the Directors Guild queue;
  nothing publishes without approval; Gate 2 blocks publish unless the word APPROVED
  is entered).

### 2.4 The THELMA federation

THELMA is not one agent — it is a federation of named agents under THELMA as Chief
Intelligence Officer (CIntO):

| Agent | Role (per SOR) |
|---|---|
| **H.E.N.R.Y.** | (Federation member; exact remit per SOR System Views.) |
| **P.E.R.C.Y.** | (Federation member; exact remit per SOR System Views.) |
| **L.I.L.Y.** | (Federation member; exact remit per SOR System Views.) |
| **C.O.R.E.** | Core coordination. |
| **V.E.R.I.T.A.S.** | Verification — the Verify step of the Golden Path. |

**Open question (M10):** whether H.E.N.R.Y., L.I.L.Y., and P.E.R.C.Y. are real agents
or names only — confirmation is still outstanding. The Canonical Build Specification
registers agents only from the system of record (THELMA, CMGIO, Auditor, VERITAS, QCA
+ scoped specialists) until M10 closes.

### 2.5 The 8 requested-officer System Views

The SOR specifies 8 officer offices, each with a department, agents, and integrations:

| Office | Notes |
|---|---|
| **CEO** | Chief Executive. |
| **CMGIO** | Chief Marketing/Growth/Intelligence Officer (per SOR). |
| **COO** | Chief Operating Officer. |
| **CFO** | Chief Financial Officer. |
| **CIO/CTO — combined, one office** | The SOR retires separate "CIO"/"CTO" offices and merges them into one combined office. |
| **Legal** | Shown as "Legal," not as a CLO officer card. |
| **HR** | Shown as "HR," not as a CHRO officer card. |
| **Sales** | SOR office with no screenshot-4 equivalent. |
| **Customer Success** | SOR office with no screenshot-4 equivalent. |
| **THELMA as CIntO** | THELMA sits in the roster as Chief Intelligence Officer. |

Retired by the SOR: "CCO," "CMO," "CRO." The screenshot-4 roster (currently built in
the live app) is the **retired 10-officer roster** — CTO and CIO as two offices, CLO,
CHRO, CCO, CAO, no Sales, no Customer Success, THELMA only as "Operations Lead" in
the sidebar footer. **DRIFT-003 (OPEN)** records exactly this: "The dashboard Agent
Hub displays the retired roster." The reconciliation draft recommends building the
SOR roster; the decision (Decision 4) is the owner's and is still open.

### 2.6 The enterprise circuit

The SOR describes the enterprise as a circuit: the CEO Dashboard (front door) →
officer System Views → the 6 Core Systems → the THELMA federation → integrations →
back to the Dashboard as verified, audited results. The circuit is the design; the
built reality (November 11) is a front door with live reads on some panels, dead
actions on most controls, and no write path — see
[SECTIONS-AND-SYSTEMS.md](SECTIONS-AND-SYSTEMS.md).

### 2.7 Anti-drift protocol + drift register

The SOR's anti-drift protocol: any deviation between the built system and the SOR is
registered as DRIFT, investigated, and resolved by changing the build (not the SOR)
unless the owner overrides the SOR. Register state:

| Drift | State |
|---|---|
| DRIFT-001 | Resolved. |
| DRIFT-002 | Resolved. |
| **DRIFT-003** | **OPEN** — retired roster displayed. |
| DRIFT-004 | Resolved. |

### 2.8 Standby item (NOT actioned)

The SOR carries a standby item — **face scan + fingerprint verification** — which is
**not yet actioned and must not be built until a deploy order**. Recorded here so it
is not lost and not built early.

### 2.9 Language law and quality rubric

The SOR's language law governs naming across the system (retired terms stay retired;
officer titles follow the SOR roster). The quality rubric scores builds against the
SOR before anything is called done — the same instinct restated as the owner's
TEST-ALL standard (test every page, section, button, login to logout; report
everything working AND broken).

---

## 3. The CEO Dashboard design

### 3.1 The 25 governed modules + 6 attached workspaces

The Enterprise Build Spec v1.0 (SYS-CEO-001, verified 2026-08-15) governs 25 modules
with 6 attached workspaces. The spec is the CEO-side counterpart to the VisionWeaver
27-page spec: modules are governed (owned, gated, audited); attached workspaces are
linked systems whose business logic the CEO shell must not absorb.

### 3.2 The 17 page families — and the 13/14/17 question

Three counts exist in the record, and they conflict:

| Count | Source | What it is |
|---|---|---|
| **17** | Page Implementation Map | 17 page families, each with decision/content/actions + acceptance criteria. |
| **13** | Screenshot 4 (owner's most recent design intent) | 13-item top nav: Home, Notebook, Pending, Executive Command, C-Suite, System Portfolio, Resource Intelligence, Ecosystem Intelligence, Financial Command, IT/Infrastructure, Security Governance, Quality Audit, Integration & Systems. |
| **14** | SOR citation of the missing `.docx` | "14 unified tabs, plus 150-item improvement list" — **unverified**, because the `.docx` was never found. |

**Draft recommendation (Phase B reconciliation, awaiting owner confirmation): 15
pages** — the 13 screenshot-4 pages in screenshot order, plus Audit/History and
Settings/Governance (the two spec-map families with no 13-item equivalent). All 17
families are covered: 9 direct 1:1, 1 split across two pages (Approvals & Decisions →
Pending + Executive Command), 6 merged as named sections, 1 covered via Home panels +
the VisionWeaver linked system (Projects/Initiatives). See
[SECTIONS-AND-SYSTEMS.md](SECTIONS-AND-SYSTEMS.md) §2 for the full mapping and
per-page status.

### 3.3 Launch + accessibility intent

- **One front door.** The owner opens the CEO Dashboard and sees the whole enterprise:
  active project, production pipeline, pending items, decisions, C-Suite, systems,
  resources, finance, integrations, audit — with drill-in to each Core System.
- **Sign-in to change, public to view (Phase D draft auth plan, proposed, not
  built).** The public can read; changing anything requires signing in. The one
  exception: the proposed `security_events` table has no anonymous access at all.
- **Roles for scale (D22).** Roles modeled now for 30–50 users and agents: Owner,
  Creator, Reviewer, Auditor, Executive, Counsel, Publisher, Agent. Permissions live
  in the record (`vw_roles`), not in UI copy. Every action is attributed to a role
  and identity.
- **Honest states.** A connection renders from a verified check, never from a stored
  boolean. A metric with no rows shows "unavailable," not zero. Empty states are
  honest, never invented numbers or seed data presented as live. (This is the design;
  the November 11 QA found hardcoded "Online" dots and fallback numbers in the vw3
  lineage — the C lineage was built to the honest standard.)

---

## 4. The Directives D1–D25 (locked, November 9, 2026)

The Directives are the system's specification, locked in the Canonical Build
Specification. One-line summaries (full wordings in
`sources/workspace/goals/visionweaver-system-build-out-and-audit/files/reviews-2026-11-09/01-canonical-build-specification-2026-11-09.md`):

| # | Directive | Rule |
|---|---|---|
| D1 | One track at a time | One project per track; named goal, named lead; cross-track is explicit links, never merges. |
| D2 | Hold-then-go | Hold means proposal only. Nothing built/rendered/posted/moved/spent without an explicit go per step. |
| D3 | Originality lock (IP) | Original characters/lines/titles/tags only. Banned franchise terms scanned before any publish. |
| D4 | Script spine | Hook <8s → story → reframe → practice → payoff (70–85%). Script is source; words do not change. |
| D5 | Character continuity | Every character carries a board (turnaround, 360° strip, spec sheet, anchor name, likeness ladder…). No board = no scene. |
| D6 | Environment standard | Every room: four panels + multi-angle coverage + floor plan. No scene from an unboarded room. |
| D7 | Prompt standard | Every board carries a Type 1 Master JSON Payload + a Type 2 Markdown System Directive. |
| D8 | Crossroads production standard | Pipeline order Avatar → Worlds → Books → Locks → Cast → Shot bible → Pictures → Motion → Narration → Sound → Edit → Deliver → Publish; pacing + caption + budget rules. |
| D9 | Delivery format | Print first, then verbatim audio right after. Short voice notes (<1 min), one pass, essentials. |
| D10 | Funding gate | Billing on hold until funding. No paid render/tool/work on assumption. Free-only until explicit go. |
| D11 | Weekly engine + posting | One 6–12 min teaching + one 45–60s Short per week; every episode ships a full posting package. |
| D12 | Approval gates + required returns | Stage chain outline → script → approval → package → thumbnails → boards → guide audio → gated render → QC → publish. Each stage returns a named artifact. |
| D13 | Balance rule | Shadow side shown with cost accounting and redemption visible. |
| D14 | Origin + cosmology | Grounded in the measured record (13.8B years…); epic feel only, no borrowed lore. |
| D15 | No-assumption rule | Never assume an outcome. Every unconfirmed item marked unconfirmed; corrections propagate everywhere. |
| D16 | Version truth | Canonical = C/B/A intended architecture (Nov 9 baseline). Fingerprint-check any build against the locked navigation board. |
| D17 | Pre-production prediction gate | No scene enters generation without a prediction record (angles, weather, acoustics, lighting, movement, token range, time, pass ceiling ≤2). |
| D18 | Forensic QC note | Every QC check produces an append-only note (what/against what/method/result/checker/timestamp). Duration alone is never QC. |
| D19 | Storage truth lock | Production record lives in the verified Supabase project. UI state, localStorage, and chat are never truth. |
| D20 | Chain-of-custody + correction propagation | Every approved artifact carries provenance; corrections create new versions; history is never overwritten. |
| D21 | Free-first, Runway-at-quality routing | Design/writing/boards free-first; real generation/finishing through Runway (Gen-4.5 / Act-Two / Aleph 2.0). Cost stated before every run. |
| D22 | Scale-ready roles + permissions | Roles for 30–50 users/agents; permissions matrix in the record; every action attributed. |
| D23 | No new front end | No new UI lineage until Phases 1–4 are built and verified. Existing pages completed, not replaced. |
| D24 | Teaching ladder embedded | Five tiers (7th grade → PhD/forensic) embedded in Resources, Assets & Knowledge, Quality & Audit. |
| D25 | Lifelike + motion standard | Renders lifelike and close to human; movement tracked at every dot; prediction completed before production. |

Directives D1–D16 predate the lock (they lived under Settings → Directives in the C
build as the versioned master copy, embedded as data in AI Co-Pilot orchestration,
THELMA context, pipeline stage gates, and read-only mirrors). The November 9 lock
expanded them to D1–D25.

---

## 5. The VisionWeaver target architecture — C/B/A

The November 9 baseline declares the intended architecture (not yet verified as a
runtime):

| Layer | Component | Owns | Does not own |
|---|---|---|---|
| **C** | Fullstack Master build | Application body, runtime shell, routing, page mount, auth session, workspace shell. | Data truth (B owns). |
| **B** | VisionWeaver 2.0 | Production engine, data truth: Supabase schema, stage chain, prediction records, QC notes, cost ledger, audit. | Visual presentation (A owns). |
| **A** | vw3 | Approved visual design crown: layout language, nav structure, visual view modes (V1/V2/V3), page composition. | Runtime logic (C owns). |

- **Prime:** historical reference only (what was attempted against the 16-tile
  navigation image). Retired from canonical status.
- **Director Studio 0.4.02:** archived wrong-version. Reusable multi-project pattern
  only.
- **DESIGN_STUDIO:** reusable authoring module (avatar/scene authoring primitives).

**The three truths that must be written down before code (Canonical Spec §5.2):**
(1) canonical repo + commit for C, B, A — exact SHAs; (2) canonical Supabase project
ref — one string, verified from file, not memory; (3) canonical deployment — one
Vercel project, deployed SHA, health route, rollback path. Nothing is called "the
system" until those three are recorded together and fingerprint-matched against the
locked navigation board. (This is M5 — still awaiting the owner's confirmation.)

### 5.1 The 27-page VisionWeaver specification

Core 10: Home Dashboard · Vision Builder · Strategic Planner · Initiatives ·
Programs and Projects · AI Co-Pilot · CMI · Directors Guild · Teams · C-Suite.
Production 10: Create and Produce · Book Creation · Avatar Engineering · Worlds and
Locations · Design Studio · Design and Commercial · Scene and Production · Media
Library · Post Production · Distribution and Growth. Governance 7: Quality and
Audit · Finance and Accounting · IT and Security · Resources · Assets and Knowledge ·
Reports and Insights · Settings. Each page has a data owner and a gate; see
[SECTIONS-AND-SYSTEMS.md](SECTIONS-AND-SYSTEMS.md) §3. The one-system statement
(Nov 2) counts **33 pages**: the 27 plus 6 folded in from B (Characters/Cast, Voice
Library, Hold Queue, Loop Engine & Run Manifests, Save Map & Storage, Plans & Tiers).

### 5.2 The stage chain (D12 made real)

Outline → Script draft → Script approval → Production package → Thumbnails → Boards →
Guide audio → Render → QC preview → Publish. Each arrow is a gate; a stage that
cannot produce its named return did not happen. Render requires package + boards +
prediction record + cost row + funding go, all four. Publish is a gate, not a button.

### 5.3 The data schema (`vw_` namespace)

Minimum viable schema under D19–D22: `vw_roles`, `vw_projects`, `vw_episodes`,
`vw_scripts` (immutable once approved), `vw_decisions`, `vw_boards` (versions
immutable; locked boards never edited), `vw_coverage_sets` (32/16/64 profiles),
`vw_prediction_records`, `vw_qc_notes` (append-only, 10 check types),
`vw_cost_ledger`, `vw_audit_events` (append-only), `vw_assets`, `vw_provenance`,
`vw_teaching_tiers`. RLS deny-by-default, grant by role. **The schema is specified,
not applied** — applying it via migration is Phase 1 work, gated on Gate 0.

### 5.4 Projects, programs, pipelines

Registered properties (per the spec, only Crossroads of Identity registered at the
time of writing; the rest to be registered with packages linked, not copied):

- **Crossroads of Identity** — the flagship production pipeline (D8 standard).
- **This Is Your Life** — series property (Legacy TYL roots in Drive, Apr 2026).
- **The Arc** — series property (commercial production docs in Master-System-Buildout).
- **Psychology catalog** — 300 ideas (75 each: James Clear, Carol Dweck, Viktor
  Frankl, Dale Carnegie series).
- **First in Consciousness** — mentor series, Season 1 complete (origin "The
  Becoming"; 8 speeches; leads Aelune + Okta).
- **Fireside Chats** — 6 households A–F; pilot Household A, 6 clips, 46s.
- **52 Books in 52 Weeks** — book property.
- **Red Balloon / BOY-001** — the Avatar State acceptance case: 32-view master,
  16-view clothing-only, 64-slot frozen until camera-height calibration; NO_DIALOGUE
  for BOY-001 RAIN v02; existing footage preserved, never regenerated; Shot 02 HOLD.

---

## 6. Data homes

| Project ref | Role | Contents (as verified) |
|---|---|---|
| `azoqszhhmmkyqztubgem` | **Master app-schema** (the app's schema holder) | 20 tables, including `page_registry` (27 rows), `projects` (11), `initiatives` (12), `records` (20), `release_gates` (13), `integration_inventory` (18), `audit_events` (6), `memberships` (1), `view_preferences` (0 rows, structure exists). Sole Owner: the OLD account (`estibancreations@gmail.com`). |
| `yqealeekngxooyoemfba` | **Production data home** | 153 public tables, verified healthy. Holds `production_log`, `social_post_queue`, `social_connections`, `oauth_flow_state`, `ww_review_decisions`, `ec_connectors`, and the production record. |

- **November 10 RLS+GRANT fix:** anon SELECT policies + GRANTs on 9 tables in the
  app-schema project, so the live app reads as public. This is anonymous read access,
  never presented as "secure."
- **The app does not read or write the production data home today** (Nov 2 statement;
  still true at the Nov 11 QA — search scans local seed records, never Supabase).
  Wiring it in waits on the owner's credential step and Gate 0.
- **No writes or table creates without the owner's say-so** (standing rule). The
  Phase D draft proposes 13 new tables + 1 deliberate non-creation; zero have been
  created.
- **`standalone-crm-test` is INACTIVE/paused** — do not touch. The CRM's production
  data lives in the standalone-crm project's own Supabase wiring (mock data in the
  test project per the operating policy).
- **Supabase access reality:** the Management API works; the MCP endpoint is blocked
  by Supabase's Cloudflare edge (Error 1010, browser signature) in this environment —
  never a token problem, never to be retried or spoofed.

---

## 7. Providers

| Provider | Role | State |
|---|---|---|
| **Supabase** | Data homes + auth + Edge Functions (10 deployed incl. `thelma-ai`, `visionweaver-studio`, `visionweaver-orchestrator`). | Live, OLD account. Vercel Marketplace integration: DO NOT INSTALL. |
| **Vercel** | Hosting. Team slug `estibancreations101`, Pro plan. | Live project: `csuite-command` → https://csuite-command.vercel.app. Old `master-system-buildout` project DELETED 2026-11-10 — do not repoint. |
| **Runway** | Generation + finishing (D21 routing: Gen-4.5 photoreal, Act-Two performance capture, Aleph 2.0 multi-shot consistency/edits). Runway App Studio hosts media-production apps (no databases/auth/backends). | Runway Pro, reactivated by the owner. First App Studio build "Workflows First Attempt" complete 2026-11-03. No provider adapter evidence in the system (M7 open). |
| **Lovable** | Builder of "Estiban Command Nexus" (the C app's origin). | Out of free credits 2026-11-10; export-to-GitHub completed. Lovable is the builder, not the runtime. |
| **GitHub** | Source of truth for code + docs (27 repos under `estibancreations-svg`). | GitHub App cannot create repos; writes only to repos it is installed on; no durable "allow" grant — writes are stacked/batched. 6 repos public; committed `.env` files unrotated (Decision 10 open). |
| **Google Drive** | Design/spec/prompt corpus + VisionWeaver Hub + dumps. | Harvested in full into `sources/drive/`. |
| **Resend + Twilio** | Proposed CRM delivery providers (GHL delivery-first build). | Nothing charged, nothing created; draft PRs #11/#12 unmerged; SQL unrun. |

---

## 8. Design languages

| Surface | Language |
|---|---|
| **VisionWeaver** | Dark navy + purple. Dark "creative-production OS" shell, collapsible left nav, top command bar. 16-panel / 16-tile navigation board. |
| **CEO Master Dashboard** | Gold/dark. ESTIBAN CREATIONS ENTERPRISE. Screenshot 4 is the full-screen Home design; the other 12 nav items have nav presence only (no page designs exist). |
| **CRM (T.H.E.L.M.A.)** | In-place design system; ThemePicker looks (Team look, Auto, Sculpted Paper, Professional Greyscale, Stealth) — whole-page switcher. Keep the live design as-is; add pages and updates only. |
| **BANNED EVERYWHERE** | The notebook view design — "Strategic Notepad": yellow paper `#FDF1AA`, blue ruled lines `#87CEEB`, red margin `#FF7F7F`, marker typography (Comic Sans / Marker Felt / Casual Marker). Deleted permanently 2026-11-11; the Oct 7, 2026 `UI-BOARD-STANDARD-v1.md` policy (19 repos) already retired it on paper. The Notebook SECTION uses proper design language, never this look. One honest exception stands: `Master-dashboard-` still contains the literal STRATEGIC NOTEPAD component, deliberately untouched pending Decision 3 (archive recommendation). |

---

## 9. What "done" means (from the record)

- **TEST-ALL standard (owner, 2026-10-30):** test the entire system exhaustively —
  every page, section, button, login to logout; verify everything present belongs
  there; report everything working AND broken; outline what's missing. Going live =
  "all the way live," not static.
- **"Done" definition (Nov 11 findings):** a page is done when its design exists, its
  data exists in a real table with real rows, its actions execute against the record
  (not local state), and it passes a live browser check. By that definition, 1 of 15
  CEO pages (Home) qualified on Nov 11 — and Home's own Decision Queue, Pending, and
  NOTE PAD panels still read static content.
- **D16 fingerprint rule:** no build is called "the system" without a fingerprint
  match against the locked navigation board + the three recorded truths (SHAs, ref,
  deployment).
