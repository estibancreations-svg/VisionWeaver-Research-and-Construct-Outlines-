# FINDINGS + REAL PLAN — CEO Dashboard Build Out, Repo Organization, Notebook Removal
## Every GitHub repo, every Drive folder, every saved file checked. Nothing built. Read-only.
### Written 2026-11-11, 21:41 CST. All three searches complete.

---

# PART ONE — FINDINGS

## §1 — THE "CURRENT BUILD PLAN": THERE IS NO SINGLE ONE

**You asked: "Are you reading the current build plan?" The honest answer: there is no single "current build plan" to read.** I searched all 25 GitHub repos (code search for "BUILD PLAN", "current build plan", `BUILD-PLAN` filename — 0 hits), all of Google Drive (name + full-text search), and the entire local workspace (all of `~/workspace/`, `~/memory/`, `~/workspace/user/`). No document anywhere serves as the unified current build plan — a single spec covering the CEO Dashboard pages, the design rules, the removals, and the architecture.

**What DOES exist (the governing record, in pieces):**

| Document | Where | Date | What it governs | What it does NOT cover |
|---|---|---|---|---|
| CSUITE_SYSTEM_OF_RECORD_v1_1.pdf | Local (`~/workspace/user/files/`) | Jul 13, 2026 (v1.1) | C-Suite officers + process. Self-declared "single source of truth for all C-Suite definitions. Any AI building on this system reads this file first." Defines the roster, the System View pattern, the Golden Path, a drift register. | No page/design spec. No CEO build-out. No notebook-removal mention. Cites a `.docx` build prompt (see below) that is not found anywhere. |
| MASTER-CEO-DASHBOARD-ENTERPRISE-BUILD-SPECIFICATION.md | GitHub `MASTER_CEO_DASHBOARD/docs/architecture/` | v1.0, verified Aug 15, 2026 | The CEO build out spec (see §2). 25 governed modules + 6 attached workspaces. | Describes the `MASTER_CEO_DASHBOARD` app, NOT `csuite-command`. Predates the Nov 10–11 rebuild. Does not name csuite-command or the corrected architecture. |
| CEO-DASHBOARD-PAGE-IMPLEMENTATION-MAP.md | GitHub `Master-System-Buildout/02-SYSTEM-SPECIFICATIONS/CEO-Dashboard/` | "Implementation baseline" (Aug–Oct 2026) | 17 page families + page-contract standard + acceptance criteria (see §2). | Does not list the 13-item nav from your screenshot. Does not include a Notebook family. |
| Oct 28 Master docs + Nov 1–2 replication kit | Local (`~/workspace/goals/...`, `~/workspace/replication-kit/`) | Oct 28 – Nov 2, 2026 | The VisionWeaver side: 27-page accounting, picks, 10 locked decisions, 33-page map, Demo/Blank contract. | Do not cover the CEO Dashboard's own pages. |
| CANONICAL-SYSTEM-2026-11-01 | Drive (VisionWeaver Hub) + local | Nov 1, 2026 | ONE-system decision (C body + B engine + A crown), data homes, platform realignment. | No page specs, no design rules, no notebook removal. |
| The 8 screenshots | Local (`~/workspace/user/files/`) | Nov 10, 2026 (your uploads) | The design reference the rebuild was built from. | Screenshot 4 (CEO Dashboard) contains the notebook elements + the retired officer roster — it is stale relative to your current intent on both points. |
| CEO_MASTER_DASHBOARD_THE_MASTER_BUILD_PROMPT_.docx | **NOT FOUND** (cited in SOR §0) | Unknown | Per the SOR: "EstibanCreations application (formerly AABOS + VisionWeaver), 14 unified tabs, plus 150-item improvement list." The CEO Dashboard shell source. | **Not on disk, not in Drive (searched), not in GitHub (searched).** Most likely in your ChatGPT folder (where the SOR PDF came from) or in a Drive location search did not index. **If you have it, send it — it is the missing primary source.** |

**Implication:** Because there is no unified plan, different sources contradict each other (see §5 roster, §6 page counts, §3 notebook). The REAL PLAN in Part Two reconciles them — but three contradictions need YOUR call (§10), because no document resolves them.

---

## §2 — THE CEO BUILD OUT SPEC: FOUND (two governing docs)

The CEO Dashboard build out spec EXISTS in GitHub. It was not lost. Here is what it says:

**Doc 1: Enterprise Build Specification** (`MASTER_CEO_DASHBOARD/docs/architecture/MASTER-CEO-DASHBOARD-ENTERPRISE-BUILD-SPECIFICATION.md`, 8,718 bytes, v1.0, "IMPLEMENTED BUILDER RELEASE / PROVIDER-GATED", last verified 2026-08-15). System ID SYS-CEO-001, schema MSB-SCHEMA-001.
- §1: The CEO Dashboard is "the governed executive command shell… presents normalized read models, decisions, queues, system health, evidence and ASK-based controls **without absorbing the business logic of attached systems**." (This is the rule the current repo layout violates — see §4.)
- §5: **25 governed modules + 6 attached workspaces** (VisionWeaver, LandWeaver, GrantOS, THELMA, CMGIO/MAP, EC Integration Fabric).
- §15 roadmap: "Completed: responsive dashboard, 25 module surfaces, six workspaces…" / "Externally gated: credential installation, provider certification, live THELMA routing, authenticated role/session/write tests…"
- **Caveat:** It describes the `MASTER_CEO_DASHBOARD` app, not `csuite-command`, and it predates the Nov 10–11 rebuild. The specs have not been updated to name csuite-command or the corrected architecture (CEO Dashboard as front door, VisionWeaver as linked subsystem).

**Doc 2: Page Implementation Map** (`Master-System-Buildout/02-SYSTEM-SPECIFICATIONS/CEO-Dashboard/CEO-DASHBOARD-PAGE-IMPLEMENTATION-MAP.md`, 7,563 bytes, "IMPLEMENTATION BASELINE"). Defines a **17-tab source registry** as 17 page families, each with decision/content/actions:
1. Executive Overview, 2. Executive Inbox/Briefings, 3. Approvals & Decisions, 4. C-Suite/Leadership, 5. Systems Portfolio, 6. Projects/Initiatives, 7. Financial Command, 8. Growth/Marketing, 9. Property/Land Intelligence, 10. Grants/Funding, 11. Operations, 12. Intelligence/Research, 13. Risk/Security/Compliance, 14. Quality Control, 15. Resource/Usage Command, 16. Audit/History, 17. Settings/Governance.
- Page-contract standard + acceptance criteria, including **#9: "no linked system has been collapsed into CEO Dashboard identity."** (Also violated by the current layout — see §4.)
- Source: "Repository-verified page sketches + Drive canonical recovery package"; mockup boards preserved in `MASTER_CEO_DASHBOARD/docs/architecture/` (including `615720B1-….png`, `IMG_0326.png`, `IMG_0328.png`).

**Supporting:** `MASTER_CEO_DASHBOARD/README.md` ("25 governed dashboard modules… VisionWeaver, LandWeaver, GrantOS, THELMA, CMGIO/MAP and EC Integration Fabric open as attached workspaces… Builder mode intentionally bypasses login… Protected browser writes and external provider execution remain disabled"); System Build Schema standard (`Master-System-Buildout/01-ARCHITECTURE/.../SYSTEM-BUILD-SCHEMA-STANDARD-v1.0.md`, 6,322 bytes).

**The gap (see §6):** Your screenshot-4 nav has 13 items. The spec map has 17 families. The `.docx` says 14 tabs. These do not match. The Notebook SECTION does not appear as a page family in the 17-tab map — the Notebook nav item in csuite-command comes from screenshot 4, not from these specs.

---

## §3 — THE NOTEBOOK: THE FULL STORY (why it keeps coming back, and the exact mechanism)

### The rule (corrected per your 21:37 CST clarification)

- **The SECTION called "Notebook" (a functional notes section/page) STAYS and IS BUILT IN.** It is built in the proper design language (VisionWeaver dark navy + purple; CEO Dashboard gold/dark) — modern SaaS, NOT yellow paper.
- **The VIEW DESIGN called "notebook" — the "Strategic Notepad" aesthetic — is TRASH, deleted permanently, never anywhere.** That aesthetic is: yellow paper background (#FDF1AA), blue ruled lines (#87CEEB, 2rem spacing), red vertical margin line (#FF7F7F, 20px from left), casual marker typography (Casual Marker / Comic Sans / Marker Felt). Never on Tab 1, never on the CEO Dashboard, never on any auth/email-entry page, nowhere, ever.

### The removal WAS documented — in GitHub, on October 7, 2026

The policy doc `UI-BOARD-STANDARD-v1.md` exists in **19 repos** and states, word for word:

> "Strategic Notepad / Legal Pad / notebook-paper styling is permanently retired and unavailable as a view, theme, fallback, or new generated option. Existing notebook concepts migrate to the owning system's current visual language."

The Oct 7 "UI v1.2" sweep wrote this rule into 19 repos in one pass (all with identical commit messages: "UI v1.2: add view/theme settings and retire notebook styling" / "UI v1.2… retire notebook styling"). Enforcement exists in code: `VisionWeaver/apps/director-studio/src/ui-board-registry.ts` sets `notebookThemeAllowed:false`; `DESIGN_STUDIO/tests/experience.test.mjs` asserts scheme `'notebook'` falls back to `'neon'`; `DESIGN_STUDIO/docs/UI_RUNTIME_0.4.02.md` states "The notebook theme is excluded."

### Why it kept coming back anyway (three causes)

1. **The policy was written into DOCS, but the live CODE was never stripped.** The same Oct 7 sweep that wrote the retirement rule into `MASTER_CEO_DASHBOARD/docs/` left the live notepad theme in `MASTER_CEO_DASHBOARD/src/` untouched, and left the full Strategic Notepad component in `Master-dashboard-/src/` untouched. The rule existed on paper; the code still had the look, switchable by the user.
2. **The old Drive specs still MANDATE the look.** The Aug 27 "CEO Dashboard Files Access Review" and Jul 28 "Accessing Shared Folders" docs (both in Drive, both predate the Oct 7 retirement) specify the Strategic Notepad aesthetic for Tab 1 with the exact hex values. Any AI (or person) reading those Drive specs without knowing about the Oct 7 retirement would build the yellow-paper look — because the specs say to. The Drive specs were never updated or marked superseded.
3. **I built from your screenshots, which contain the notebook elements.** Screenshot 4 (CEO Dashboard) has a "NOTE PAD" panel and a "Notebook" nav item. I had not read the Oct 7 policy docs (they are in GitHub repos I had not searched before tonight), and the notebook removal was not in my memory or any workspace file before tonight. So I rebuilt what the screenshot showed. That is my miss, and I own it. The removal lived in GitHub policy docs I had not read, not in any plan I could see.

### The email-entry mechanism (why you saw it on the email page) — FOUND

In `MASTER_CEO_DASHBOARD`:
- `src/theme.css` (lines 34–68) defines a full `html[data-theme="notepad"]` theme: yellow background (#f5e594), ruled lines, red margin, and overrides for the whole shell **including `.auth-screen` and `.auth-card`** (the login/email-entry screen).
- `src/components/SystemControls.tsx` (20 lines) is a theme switcher: `type Theme = 'dark' | 'notepad'`, persisted in `localStorage['ec-system-theme']`, with a button titled "Think mode" (NotebookPen icon) that sets `document.documentElement.dataset.theme='notepad'`.

**Mechanism:** If the notepad theme was ever selected (or persisted in the browser), it applies to the auth screen too — because the theme CSS covers `.auth-screen`/`.auth-card`. That is exactly why the email-entry page showed the notebook look. The fix is to DELETE the notepad theme from `theme.css` AND remove the `'notepad'` option from `SystemControls.tsx` (so it cannot be selected or persisted), in the `MASTER_CEO_DASHBOARD` repo. (The live `csuite-command` app does NOT have this theme — its NOTE PAD panel is gold/dark — so the email-entry sighting came from the `MASTER_CEO_DASHBOARD` app, not csuite-command.)

### Every live-design violation (to be stripped — see Plan Phase A)

| File | What |
|---|---|
| `MASTER_CEO_DASHBOARD/src/theme.css` (lines 34–68) | Full `data-theme="notepad"` theme, incl. auth screen. |
| `MASTER_CEO_DASHBOARD/src/components/SystemControls.tsx` (whole file) | Theme switcher offering `'notepad'`, persisted in localStorage. |
| `Master-dashboard-/src/components/DashboardTab.tsx` (~lines 87–126+) | Literal "📝 STRATEGIC NOTEPAD — DAILY COMMANDS" component: #FDF1AA, #87CEEB lines, #FF7F7F margin, Comic Sans/Marker Felt, `id="strategic-notepad"`. The ONLY `FDF1AA` and ONLY `87CEEB` hits in the entire org. |
| `Master-dashboard-/metadata.json` (line 3) | Names "Strategic Notepad Dashboard" as the first tab. |
| `Master-dashboard-/FORENSICS_RELAUNCH_PHD_MANIFEST.md` | Contains a "notepad" reference (forensics doc). |

### Mislabeled links (to be fixed — no yellow-paper styling, wrong targets)

| File | Issue |
|---|---|
| `csuite-command/src/routes/ceo-dashboard.tsx` (line 34) | Notebook nav item → `/assets` (Assets Library). Must go to a real Notebook section. |
| `csuite-command/src/routes/ceo-dashboard.tsx` (lines 186–195, 292) | "NOTE PAD" panel + "Open Full Notes →" → `/assets`; "Open Notebook" button → (target to verify). Panel is gold/dark (correct theme); the TARGETS are wrong. The hardcoded `NOTES` array (lines 56–63) is static — to be replaced by a real notes store. |

### What is CORRECT and must NOT be removed

- The 19 `UI-BOARD-STANDARD-v1.md` policy docs (they state the retirement — they ARE the rule).
- The enforcement code (`notebookThemeAllowed:false`, the DESIGN_STUDIO test, the "notebook theme is excluded" doc).
- Historical/inbox records in `Master-System-Buildout/00-CENTRAL-HUB/INBOX/` and VisionWeaver docs (records of what was, not live UI — leave alone).
- The Notebook SECTION (functional notes) — build it in proper design language. The fix plan doc's Notebook page + `notes` table are CORRECT.

---

## §4 — REPO ORGANIZATION: YOUR SUSPICION IS CONFIRMED

**You said: "I think it'd committed to the CEO Dashboard and it's how it's accessed but the linked VisionWeaver should be linked to its correct sections." You are right.** VisionWeaver work is sitting in the CEO Dashboard repo (and elsewhere), and the `VisionWeaver` repo itself does not hold the current VisionWeaver UI.

### Where VisionWeaver code actually lives

| Location | What is there |
|---|---|
| `MASTER_CEO_DASHBOARD/src/components/VisionWeaverWorkspace.tsx` (+ `VisionWeaverSceneSetup.tsx`, `VisionWeaverAssemblyWatcher.tsx`) | **The vw3 VisionWeaver UI runtime.** Mounted by `src/App.tsx` (line 59, `route.surface==='vision'`). 11 code-search hits for `VisionWeaverWorkspace`, 7 in this repo. |
| `MASTER_CEO_DASHBOARD/tests/` | 3 VisionWeaver tests (`visionweaver-books-cast-and-live-default`, `visionweaver-avatar-continuity-phase2`, `visionweaver-longform-continuity`). |
| `MASTER_CEO_DASHBOARD` open PRs | **4 VisionWeaver PRs:** #64 (canonical UI runtime stabilization, DO NOT MERGE), #62 (Book Pipeline, owner's decision), #56 (long-form controls), #55 (Stock production update). |
| `MASTER_CEO_DASHBOARD/docs/` | VisionWeaver docs/specs (`CANONICAL-V3-UI-REFERENCE`, longform release, 4 `VISIONWEAVER-*.md` architecture docs). |
| `Master-dashboard-` (whole repo) | **"VisionWeaver Command v6.0"** — a complete separate VisionWeaver console (React + Supabase + passwordless auth), in a repo NAMED "Master-dashboard-". Stale (Oct 7). Misnamed, confusing duplicate. |
| `csuite-command` (whole repo) | **The Nov 10–11 Prime-UI rebuild** — VisionWeaver home + 16 pages + CEO dashboard page. Live at csuite-command.vercel.app. None of this is in the `VisionWeaver` repo. |
| `VisionWeaver` (the repo itself) | Specs, docs, history, `visionweaver-2.0/index.html` (31KB single-file 2.0 app), loop engine, `apps/director-studio/` (wrong-version UI 0.4.02), review package. **NO vw3 runtime. NO csuite-command code.** The repo named VisionWeaver does not hold the current VisionWeaver UI. |
| `VisionWeaver-Prime` | Retired static front end + image assets. Correctly retired. |
| `DESIGN_STUDIO` | Design Studio runtime (related, separate system). |

**Reverse direction:** NO CEO code in the `VisionWeaver` repo (only 5 doc references). The misplacement is one-directional: VisionWeaver → CEO repo.

**This violates the project's own standards.** Enterprise Build Spec §1: the CEO shell presents attached systems "without absorbing the business logic of attached systems." Page-map criterion #9: "no linked system has been collapsed into CEO Dashboard identity." The vw3 runtime + tests + PRs inside `MASTER_CEO_DASHBOARD` violate both.

### All 25 repos (summary — full table in the GitHub investigation)

| Repo | What it is | Latest | Status |
|---|---|---|---|
| `MASTER_CEO_DASHBOARD` | The real CEO Dashboard app (Vite + React 19) | Nov 10 (trigger + docs only) | PUBLIC. Holds VisionWeaver runtime + live notepad theme. Last real code work predates Nov 10. |
| `csuite-command` | NEW canonical live system (TanStack Start) | Nov 11 (`c9063a6`) | Private. Structure backwards (see architecture correction). Has committed `.env` (see §7). |
| `VisionWeaver` | Specs/docs/history + 2.0 engine | Nov 10 (review package) | PUBLIC. No current UI runtime. |
| `VisionWeaver-Prime` | Retired static front end + images | Nov 10 (trigger + retired notice) | Private. Correctly retired. |
| `Master-System-Buildout` | Docs-only governance hub / system of record | Nov 10 (trigger) | PUBLIC. Correctly docs-only. No app code. |
| `Master-dashboard-` | STALE "VisionWeaver Command v6.0" (misnamed) | Oct 7 | PUBLIC. Worst notepad offender. Has committed `.env.production`. Needs owner decision: archive/rename/delete. |
| `THELMA-Global-Link-Logistics` | Logistics THELMA (hackathon) | Oct 7 | Private. STILL BROKEN (2 missing files — confirms earlier diagnosis). |
| `standalone-crm` | Standalone CRM (Next.js + Supabase) | Oct 17 | Private. PR #5 (v2.1, wait for Owner OK) + PR #6 (draft CI). Prod = v2.0. Correctly organized. |
| `DESIGN_STUDIO` | Design Studio runtime | Oct 8 | Private. Notebook retirement ENFORCED in tests. Clean. |
| `-HisMajesty0225-CEO-Dashboard` | Historical shell only | Oct 11 | Private. Correctly marked historical. |
| `OSIRIS`, `Higgsfield-Integration-Layer`, `-THELMA-AI`, `The-Arc`, `Crossroads-of-Identity`, `This-Is-Your-Life`, `52-Books-in-52-Weeks`, `content-that-builds`, `-Five-Stations-Learning-Serie`, `reunion-os`, `motive-next-deployment` | Docs/plans/content/placeholder repos | Oct 7 (all) | Private. Correctly scoped for their purposes. Frozen. |
| `Paypal_Portal` | PayPal portal app | Nov 1 | PUBLIC. Separate product. Confirm public intended. |
| `Leadstack-Clone` | Mirror of leadstack | Oct 17 | PUBLIC. Correctly labeled mirror. |
| `crm-tour-deck-build-temp` | Temporary build scripts | Oct 14 | Private. Description says "will be deleted." Owner decision: delete. |
| `Archive-HisMajesty0225-Shenry60` | Archive | Oct 17 | Private. Correctly scoped. |

### Currency

- **Only 4 repos touched since Nov 1:** `csuite-command` (Nov 11), `MASTER_CEO_DASHBOARD` + `VisionWeaver` + `VisionWeaver-Prime` + `Master-System-Buildout` (Nov 10, mostly doc/trigger commits).
- **21 of 25 repos frozen at Oct 7–17.** The Oct 7 sweep touched 13 repos in one pass (identical messages/timestamps).
- **The live system exists in only one repo.** All Nov 10–11 rebuild work exists ONLY in `csuite-command`. It has not been mirrored, referenced, or linked from `VisionWeaver`, `MASTER_CEO_DASHBOARD`, or `Master-System-Buildout`.
- **PR correction:** PRs #64, #63, #62 are on `MASTER_CEO_DASHBOARD`, NOT on `VisionWeaver` (prior context had this wrong). `VisionWeaver` has only 1 open PR (#1, docs). All three standing PR constraints (#64 DO NOT MERGE, #63 stands, #62 owner's decision) live in the CEO repo. `MASTER_CEO_DASHBOARD` has 9 open PRs total. `csuite-command` has 0 (all work lands directly on `main`).
- **Branches were NOT audited** (branch listing requires a write-permission call, which would trigger approval cards; the investigation was kept zero-click). A branch audit is needed before any move/retire work (see Plan Phase F).

---

## §5 — THE OFFICER ROSTER IS WRONG (DRIFT-003)

The System of Record (SOR) PDF — the self-declared "single source of truth for all C-Suite definitions" — defines the roster as: **CEO, CMGIO, COO, CFO, CIO/CTO (COMBINED, one office), Legal, HR, Sales, Customer Success; T.H.E.L.M.A. as CIntO (Chief Intelligence Officer); The Architect above all.**

The SOR **RETIRES**: "CMO," "CCO," "CRO," and separate "CIO"/"CTO" offices. It contains **DRIFT-003 (OPEN)**: "The dashboard Agent Hub displays the retired roster."

**The CEO dashboard I built shows the RETIRED roster:** 10 officers — CEO, CMGIO, CFO, CTO, COO, CIO, CCO, CHRO, CLO, CAO — including split CTO/CIO, plus CCO, CHRO, CLO, CAO. That is exactly the drift the SOR flags.

**Fix:** The C-Suite section must show the SOR roster (CEO, CMGIO, COO, CFO, CIO/CTO combined, Legal, HR, Sales, Customer Success, THELMA as CIntO, Architect above all) — NOT the 10-officer list from screenshot 4. Screenshot 4 is stale on this point too. The "CRO Master Dashboard" goal name also uses "CRO," a retired term — the goal should be renamed (or noted as historical). **This needs your confirmation** (§10, Decision 4) — because screenshot 4 (your design reference) shows the 10-officer list, and the SOR (your governance doc) says it is retired. One of them is current; the SOR claims to be the authority ("any AI building on this system reads this file first"), but you are the final authority.

---

## §6 — THE PAGE-COUNT GAP: 13 vs 14 vs 17

Three different sources give three different CEO Dashboard page/tab counts. They do not reconcile without your call:

| Source | Count | What it lists |
|---|---|---|
| Screenshot 4 (your design, Nov 10 upload) | **13** nav items | Home, Notebook, Pending, Executive Command, C-Suite, System Portfolio, Resource Intelligence, Ecosystem Intelligence, Financial Command, IT/Infrastructure, Security Governance, Quality Audit, Integration & Systems. |
| `.docx` build prompt (cited in SOR §0, NOT FOUND) | **14** unified tabs | Unknown (the .docx is not found). "14 unified tabs, plus 150-item improvement list." |
| Page Implementation Map (GitHub spec) | **17** page families | Executive Overview, Executive Inbox/Briefings, Approvals & Decisions, C-Suite/Leadership, Systems Portfolio, Projects/Initiatives, Financial Command, Growth/Marketing, Property/Land Intelligence, Grants/Funding, Operations, Intelligence/Research, Risk/Security/Compliance, Quality Control, Resource/Usage Command, Audit/History, Settings/Governance. |

**The 13-item nav does not map 1:1 to the 17 families.** Some 13-items have no 17-family equivalent (Notebook, Ecosystem Intelligence, Integration & Systems as named); some 17-families have no 13-item equivalent (Executive Inbox/Briefings, Property/Land Intelligence, Grants/Funding, Operations, Audit/History, Settings/Governance as named). The Notebook SECTION does not appear in the 17-tab map at all.

**What this means:** I cannot build the CEO Dashboard's pages from the specs alone, because the specs and your screenshot disagree on what the pages are. **You need to tell me which list is current** (§10, Decision 1): the 13 (screenshot), the 17 (spec map), the 14 (.docx — if you send it), or a merged list you define. My recommendation is in §10.

---

## §7 — SECURITY / HYGIENE FLAGS (observed, not acted on)

1. **`csuite-command/.env` committed at repo root.** The repo is private, but a `.env` in git history should be assumed exposed. Contents were NOT read (deliberate). **Recommend:** rotate anything that was in it, remove it from history, and add `.env` to `.gitignore` — per your call.
2. **`Master-dashboard-/.env.production` committed at repo root, and the repo is PUBLIC.** Same recommendation, higher urgency given public visibility. Contents were NOT read.
3. **6 PUBLIC repos:** `MASTER_CEO_DASHBOARD`, `VisionWeaver`, `Master-System-Buildout`, `Leadstack-Clone`, `Paypal_Portal`, `Master-dashboard-`. You made repos public during the Nov 10 deploy fight and have not flipped them back. A pre-public secrets scan was never confirmed done. **Recommend:** flip back to private (your action in GitHub settings) after the `.env` rotation/removal, and confirm `Paypal_Portal` public is intended.
4. **`Master-dashboard-` also contains `firebase-applet-config.json`, `firestore.rules`, and forensic/relaunch docs** — stale credentials/config risk if any keys are embedded (not verified; config contents beyond the noted greps were not read).
5. **Dead link in Drive:** shortcut "CEO-1" points to a folder that returns 404 (deleted or inaccessible). Harmless, but noted.

**I did NOT read any `.env` contents, credentials, or secrets.** I will not. Rotation/removal needs your go.

---

## §8 — WHAT WAS NOT FOUND / NOT CHECKED

- **The `.docx` build prompt** (`CEO_MASTER_DASHBOARD_THE_MASTER_BUILD_PROMPT_.docx`) — not in Drive, GitHub, or workspace. If you have it (likely ChatGPT folder), send it.
- **A CEO page-by-page build-out spec in Drive or workspace** — the Drive doc titled for it is EMPTY (1,024 B, no body). The ALTAIR doc (Jul 9) is a role/philosophy brief, not a page spec.
- **Branches** — not audited (would trigger approval cards; kept zero-click). Needed before move/retire work.
- **PR diffs** — titles/dates/status only; PR #64's contents not re-verified.
- **Whether the `MASTER_CEO_DASHBOARD` app still deploys/is live on Vercel** — not checked (browser/Vercel work was out of scope for the read-only GitHub task).
- **Full reads of large Drive docs** — ALTAIR (94KB, first ~45 lines), VISIONWEAVER_GEM.md (first 80 lines), and several others were partially read. Zip/pptx/pdf contents were not opened. A "not found" in Drive means "not found by Drive search + the reads done," not proof of nonexistence.
- **The email-entry page source** — the mechanism is found (theme switcher in `MASTER_CEO_DASHBOARD`), but the specific deployed email-entry page was not inspected in a browser. The fix (strip the theme + switcher) addresses the mechanism regardless of which deployment served it.

---

# PART TWO — THE REAL PLAN

## How this plan was built (so you know it is thought through)

I did not write this plan from memory. I built it from: (1) the three investigations above (25 repos, all of Drive, all local files), (2) the click-through QA (every button actually clicked, Nov 11), (3) the crash + image + RLS failures from Nov 10–11 (each one taught a specific lesson that is a pre-fix below), and (4) the governing docs (SOR, Enterprise Build Spec, Page Implementation Map). For every phase, I list what could go wrong (predicted issues) and what I will do BEFORE building to prevent it (pre-fixes). If a phase has a dependency on your decision, it says so — and it says what I can do without that decision, so nothing stalls.

**Order of work:** A → B → C → D → E → F → G → H → I. Each phase is verified live before the next starts. No phase is called done until its verification passes. Nothing is built until you say "go" (after reading this plan + answering the decisions in §10 that block Phase A/C/D — Decisions 3, 8, 9, 12; the rest can come as I reach them).

---

## PHASE A — Strip the notepad DESIGN + fix the mislabeled links (surgical, first)

**What I will do:**
1. In `MASTER_CEO_DASHBOARD`: delete the `html[data-theme="notepad"]` block (lines 34–68) from `src/theme.css`. Remove the `'notepad'` option from `src/components/SystemControls.tsx` (leave `'dark'` as the only theme; remove the NotebookPen "Think mode" button or repurpose it). Add a startup reset: if `localStorage['ec-system-theme']` is `'notepad'`, reset it to `'dark'` (so your browser does not keep requesting a deleted theme).
2. In `Master-dashboard-`: ONLY if you decide "strip + keep" (Decision 3). If you decide archive/delete, skip editing and do that instead (the component goes away with the repo). If stripping: delete the STRATEGIC NOTEPAD component from `DashboardTab.tsx`, remove the "Strategic Notepad Dashboard" tab name from `metadata.json`, and remove/annotate the forensics-manifest reference.
3. In `csuite-command`: fix the Notebook nav item (`ceo-dashboard.tsx` line 34) to go to the Notebook section (to be built in Phase G — for now, point it to a placeholder Notebook route that I will build, NOT to `/assets`). Fix "Open Full Notes →" and "Open Notebook" to go to the Notebook section. Keep the notes-display panel in gold/dark (correct theme). Replace the hardcoded `NOTES` array with a live read from the `notes` table once Phase D creates it (until then, keep the array but label it as the owner's screenshot items — do not present it as live data).
4. Grep the ENTIRE `csuite-command` + `MASTER_CEO_DASHBOARD` codebases for `#FDF1AA`, `#87CEEB`, `#FF7F7F`, `data-theme="notepad"`, `Strategic Notepad`, `strategic-notepad`, and `Comic Sans` / `Marker Felt` — and confirm ZERO hits in runnable code before committing. (Policy docs + historical records are excluded — they are the rule/records, not live UI.)

**Predicted issues + pre-fixes:**
- *Issue: Stripping the theme breaks the MASTER_CEO_DASHBOARD app's styling (other code depends on the theme variables).* **Pre-fix:** Read `theme.css` fully first. Map every variable the notepad block defines and every selector that references it. Remove ONLY the notepad block + switcher option. Keep all `dark` theme variables intact. Verify the app still builds (Vercel build or local `vite build`) and renders (browser check of the deployed MASTER_CEO_DASHBOARD app, if live) before calling it done.
- *Issue: Your browser has `'notepad'` persisted in localStorage, so it keeps requesting the deleted theme.* **Pre-fix:** The startup reset (step 1) handles this. I will also tell you to hard-refresh (or clear that one localStorage key) if you still see yellow after the fix.
- *Issue: Editing Master-dashboard- is wasted work if you decide to archive/delete it.* **Pre-fix:** Decision 3 comes FIRST (before I touch that repo). If archive/delete, I do not edit it at all.
- *Issue: The Notebook section does not exist yet, so the fixed links have nowhere to go.* **Pre-fix:** I will create a minimal Notebook route (gold/dark, "Notebook" heading, honest "notes load here once Phase D creates the table" state) in the same commit as the link fixes, so no link is dead. The full Notebook section (with live notes) is built in Phase G.

**Verification:** Grep = 0 hits in runnable code. Browser: open the MASTER_CEO_DASHBOARD app (if live) — no yellow-paper theme, no "Think mode" button, auth screen is dark. Open csuite-command `/ceo-dashboard` — Notebook nav goes to the Notebook route (not /assets), no yellow anywhere. Commit + deploy + re-verify.

**Needs from you:** Decision 3 (Master-dashboard- fate) + Decision 12 (GitHub Always Allow, so this does not cost you approval clicks). Nothing else blocks Phase A.

---

## PHASE B — Reconciliation (resolve the contradictions BEFORE building pages)

**What I will do:** Take your answers to Decisions 1 (page list), 4 (roster), and 2 (repo placement) from §10, and write a ONE-PAGE reconciliation record (a markdown file in the repo + in your files) that states, definitively: the CEO page list (names + order + which spec each comes from), the officer roster (names + roles, per SOR or per your override), and the repo-placement ruling (move vs. by-design). This record becomes the authority for Phases C–H. If sources conflict later, this record wins (until you override it).

**Predicted issues + pre-fixes:**
- *Issue: You do not answer all decisions at once, or want to decide as we go.* **Pre-fix:** I do not stall. Decision 1 + 4 block Phase G only; Decision 2 blocks Phase F only. I start Phases A + C + D immediately (they do not need those decisions). I ask each blocking decision when I reach its phase, with my recommendation + the options, so you can answer in one tap.
- *Issue: The .docx is never found, so the "14 tabs" count is unverified.* **Pre-fix:** Proceed without it. The reconciled list is defined by YOU (13, 17, or merged), not by the missing .docx. The .docx is noted as a gap in the record. If you find/send it later, I reconcile again (one revision, not a rebuild).
- *Issue: The reconciled list still has gaps (a page with no design, a family with no data).* **Pre-fix:** The record marks each page as: (a) has design + has data, (b) has design, no data (honest empty state), (c) no design (I will build a sensible layout from the spec family's decision/content/actions + VisionWeaver design levels, and you correct it), (d) no data + no design (build layout + honest empty state). No page is guessed silently — its status is in the record.

**Verification:** You read the one-page record and confirm it (or correct it). I do not build Phase G pages until you confirm the record.

**Needs from you:** Decisions 1, 2, 4 (can come when I reach Phase F/G, not necessarily now).

---

## PHASE C — Architecture restructure (CEO Dashboard = front door, VisionWeaver inside)

**What I will do (in `csuite-command`):**
1. Delete the 563-byte `/visionweaver` stub route (`src/routes/visionweaver.tsx`).
2. Move the VisionWeaver home + 19 pages from `/` + `/<page>` to `/visionweaver` + `/visionweaver/<page>`. (In TanStack Start, this means moving route files into `src/routes/visionweaver/` and updating the route tree.)
3. Make `/` the CEO Master Dashboard (move `ceo-dashboard.tsx` content to `index.tsx`, in gold/dark, with the reconciled roster + no notepad design + working Core Systems cards).
4. Build the CEO top nav (the reconciled page list) on CEO pages, and keep the VisionWeaver sidebar ONLY on VisionWeaver pages. Add exactly two cross-links: "← CEO Dashboard" in the VisionWeaver sidebar, and the "VisionWeaver" Core Systems card on the CEO Dashboard.
5. Add redirects: old `/` → `/visionweaver` (for bookmarks), old `/ceo-dashboard` → `/` (for bookmarks). Update EVERY internal link (grep for all `to=`, `href=`, `Link`, `navigate` — update in one pass).
6. Update the specs (Enterprise Build Spec + Page Map pointers) to name `csuite-command` and the corrected architecture (a doc update, not a code move — see Phase F for the full spec update).

**Predicted issues + pre-fixes:**
- *Issue: Moving routes breaks links/bookmarks (404s).* **Pre-fix:** Redirects (step 5) + full link grep (step 5) + click EVERY nav item + card after the move (verification). No link is left pointing to an old URL.
- *Issue: Two navs (CEO top nav + VisionWeaver sidebar) confuse users / conflict.* **Pre-fix:** Strict separation (step 4). CEO pages: top nav only, no sidebar. VisionWeaver pages: sidebar only, no CEO top nav. Exactly two cross-links. I will verify by screenshotting both a CEO page and a VisionWeaver page and confirming only one nav shows on each.
- *Issue: The route tree breaks (TanStack routeTree.gen.ts).* **Pre-fix:** TanStack auto-regenerates `routeTree.gen.ts` on build. I will verify the build passes (Vercel) and that every route loads (browser click-through). I will NOT hand-edit `routeTree.gen.ts`. If the build fails on routing, I fix the route files (not the generated file) and rebuild.
- *Issue: The home-page crash pattern repeats (a bad reference in the new index.tsx).* **Pre-fix:** The new `index.tsx` (CEO Dashboard) is built from the EXISTING, WORKING `ceo-dashboard.tsx` (which already renders) — not written from scratch. I will grep for `state.workspace` (the crash cause) and any other `state.<singular>` references in every moved file BEFORE committing. And Phase D adds `tsc` to the build (which would have caught the crash).
- *Issue: The CEO Dashboard content (Pending Items, Note Pad/Notebook display, C-Suite, Core Systems) is static/hardcoded.* **Pre-fix:** Phase C moves the STRUCTURE, not the data. The hardcoded items stay (labeled as your screenshot items) until Phase D (tables) + Phase G (wiring) make them live. I will NOT present them as live in Phase C. The verification for Phase C is STRUCTURE (right pages, right URLs, right navs, no 404s), not live data.

**Verification:** Browser: `/` = CEO Dashboard (gold/dark, correct roster, no notepad design). Click VisionWeaver card → `/visionweaver` = VisionWeaver home (all 19 pages load at new URLs). Click "← CEO Dashboard" → back to `/`. Every nav item + card clicked, no 404s. Vercel deployment Ready. Commit + deploy + re-verify.

**Needs from you:** Nothing (structure only; page list + roster from Phase B if answered, otherwise I use screenshot 4 + SOR roster with a flag that Phase B will confirm).

---

## PHASE D — Foundation (tables + auth + server routes + types + build check)

**What I will do:**
1. **List existing tables + policies FIRST** (via Supabase Management API). Show you the list + the proposed new tables (14: `decisions`, `finance_records`, `analytics`, `team_members`, `assets`, `agents`, `avatar_captures`, `saved_worlds`, `security_events`, `content_items`, `notes`, `pending_items`, `training_tracks`, `library_items` — with columns for each). Get your go (Decision 9) before creating ANY table.
2. **Create the tables** (with `IF NOT EXISTS`, RLS enabled, `anon` SELECT policy + GRANT matching the existing pattern, `authenticated` policies for writes). Additive only — do not touch existing tables/policies.
3. **Add auth:** Build `/login` (email/password via Supabase Auth) + sign-out + a real signed-in user display (replacing the hardcoded "The Architect"). Do NOT enforce sign-in on all routes until auth is verified working (see pre-fix). Add a password-reset flow (via Supabase Auth emails).
4. **Build server routes** (`src/routes/api/*`, TanStack Start server functions): one route per write type (approve/reject submission, pause/resume project, create project, save note, toggle pending item, save decision, etc.). Each route: validates input, checks the user is signed in (and has the right role), uses the service-role key (from env vars, server-only, never in client code), performs the write, returns the result + an honest error on failure.
5. **Generate real Supabase types** (`src/integrations/supabase/types.ts`) from the live schema. **Add `tsc --noEmit` to the build** (as a check step; if pre-existing errors block it, see pre-fix).
6. **Verify ONE server route end-to-end** (a test write via the browser, with your permission, on a test record — then delete/undo the test write) BEFORE wiring all buttons to server routes.

**Predicted issues + pre-fixes:**
- *Issue: Creating a table conflicts with an existing table/policy (name collision, policy error).* **Pre-fix:** List-first (step 1) + `IF NOT EXISTS` + additive policies. If a proposed table already exists (under a different name or with different columns), I report it and ask — I do not drop/alter an existing table without your explicit go.
- *Issue: Auth locks you out (misconfigured, or you forget the password).* **Pre-fix:** (a) Do not enforce sign-in until verified. (b) Test sign-in/sign-out with a test account FIRST, in the browser, before you use it. (c) Give you the recovery path in writing: Supabase Dashboard → Authentication → Users (reset password / disable email confirmation), and the code change to temporarily disable enforcement (one flag). (d) Your first account is created via Supabase Auth (you set the password via the Secure Vault flow — I never see it).
- *Issue: The service-role key leaks into client code/bundle.* **Pre-fix:** Server routes are server-only (TanStack Start server functions). I will grep the CLIENT bundle output for any import of the server module, and grep all client files for `service-role` / `SERVICE_ROLE` — zero hits in client code, or the build does not ship. The key is read from `process.env` (server) only, never `import.meta.env` (client).
- *Issue: `tsc` fails on pre-existing type errors (the empty Database type + others), blocking the build.* **Pre-fix:** Run `tsc --noEmit` FIRST, before adding it to the build. List all errors. Fix the ones in files I touch. For pre-existing errors in files I do not touch: if they are few, fix them; if they are many, add `tsc` as a non-blocking check first (report errors, do not fail the build), fix them in a follow-up, then enforce it. The build must never be blocked by a pre-existing error I did not introduce — but every error I introduce is fixed by me.
- *Issue: Server routes do not work (wrong pattern, env var missing, CORS, etc.), and I wire 20 buttons to a broken pattern.* **Pre-fix:** Verify ONE route end-to-end FIRST (step 6). If the pattern works, wire the rest. If it does not, fix the pattern once, re-verify, then wire. Never wire all buttons before verifying the pattern.
- *Issue: RLS blocks the server-route writes (the service-role key bypasses RLS, but if the route accidentally uses the anon key, writes fail).* **Pre-fix:** The server route uses the service-role key explicitly (not the publishable key). The end-to-end test (step 6) proves writes work. If a write fails with 42501 (permission denied), the route is using the wrong key — fix the key, not the policy.

**Verification:** Tables exist (Management API list). Auth: sign-in/sign-out works in the browser (test account). One server-route write succeeds end-to-end (verified in Supabase + in the UI). `tsc` passes (or the non-blocking report is clean for files I touched). No service-role key in client code (grep). Commit + deploy + re-verify.

**Needs from you:** Decision 9 (table list go), Decision 7 (auth method + private/public), Decision 8 (server routes + service-role key use). Decision 12 (GitHub Always Allow) to avoid approval clicks on the many commits in this phase.

---

## PHASE E — Wire every button (the actions, page by page)

**What I will do (in this order — highest visibility first):**
1. **Search:** Rebuild search to query Supabase tables directly (projects, records, initiatives, assets, team members). Fix filtering (typed query returns matches). Fix deep-linking (each result goes to the item's detail page).
2. **Detail pages:** Build project, officer, track, library-item, location, asset, and submission detail pages (see fix plan §3 for the list). Each shows the full record + working actions (via server routes).
3. **Directors Guild Approve / Request changes + Projects Pause/Resume:** Wire to server routes (Phase D). Fix the "Approve on APPROVED" bug (button state reflects status).
4. **Decision Queue:** Wire to the `decisions` table. Items clickable → decision detail with Approve/Reject/Advance (via server routes).
5. **C-Suite / Training / Library cards:** Make them open their detail pages.
6. **V1/V2/V3 view switching:** Implement alternate layouts for every page (Worlds is the model). Each switch visibly changes the layout.
7. **Vision Builder tools + AI Co-Pilot:** ONLY after Decisions 5–6 (providers + keys + spend). If placeholders, build honest "Connect a provider" states (not fake tools). If live, build the full tools (input → API → result → save).
8. **CEO Quick Actions + mislabeled links:** "New Project" opens a real create form. "Open Notebook" goes to Notebook. "View Pending" goes to Pending. "System Status" goes to Health. Fix every mislabeled link found in the click-through.
9. **Every other button:** Inventory from code (grep `onClick`/`button`) + live click-through, cross-checked. Every button is wired, verified, or removed (with your say-so if it has no sensible action).

**Predicted issues + pre-fixes:**
- *Issue: Search is built on the seed index (92 results), not Supabase — fixing filtering without fixing the source leaves stale data.* **Pre-fix:** Rebuild search from Supabase (step 1), do not patch the seed index. Verify with real queries ("Crossroads" → Crossroads, "Avatar" → avatar items) before calling it done.
- *Issue: Detail pages need stable IDs, but the data has no IDs or inconsistent IDs.* **Pre-fix:** Verify every table has a stable `id` (UUID) in Phase D. Use `/<section>/<id>` URLs. Test each detail page with a REAL id from the list (click the list item → detail loads). If a table lacks IDs, add them in Phase D (with your go).
- *Issue: Wiring Approve/Pause to server routes fails silently (button spins, nothing changes).* **Pre-fix:** Every wired button has: a loading state, a success confirmation (UI updates + toast/message), and an honest error state (if the write fails, show WHY — not a silent nothing). I will test each wired button by clicking it in the browser (with your permission for the data-changing ones, on a test record first) and confirming the Supabase row actually changed.
- *Issue: Vision Builder / AI Co-Pilot are built as fake tools (buttons that pretend to generate).* **Pre-fix:** NEVER fake a result. If no provider/key, the tool shows an honest "Connect a provider to generate" state with the setup steps. If live, the tool calls the real API and shows the real result (or a real error). No simulated generation, no placeholder images presented as generated.
- *Issue: V1/V2/V3 = 57 layouts (19 pages × 3) — too much to build distinctly.* **Pre-fix:** Prioritize. Worlds (done). Resources + Distribution (have specs for all 3). For the other pages: V1 = the locked layout (fully built); V2/V3 = layout VARIANTS (same data, different arrangement — e.g., grid vs. list vs. board), not wholly different designs. Each switch must VISIBLY change the layout (verified by screenshot comparison). Do not invent 3 unrelated designs per page.
- *Issue: The button inventory misses buttons (in dialogs, conditional renders, mobile-only).* **Pre-fix:** Two-source inventory (code grep + live click-through, cross-checked). Any button in code but not visible, or visible but not in code, is flagged and resolved. Dialogs are opened and their buttons clicked. Mobile viewport is checked (the app is responsive — verify buttons work on a narrow viewport too).
- *Issue: A wired button works for me (test account) but fails for you (different role/permissions).* **Pre-fix:** Test with YOUR role (once auth exists, test as the Architect/owner account, not just a test account). Server routes check role — if the role check is wrong, it fails for the wrong user. Verify the role logic with your account before calling it done.

**Verification (per page, before moving to the next page):** Click EVERY button/link/toggle on that page in the live browser. Confirm each one does what it should (navigates, opens, saves, updates, generates, or shows an honest error). No page is called done until every control on it is verified. This is your TEST-ALL standard. I will keep a per-page checklist and report it.

**Needs from you:** Decisions 5–6 (providers + keys + spend) for Vision Builder + AI Co-Pilot only. Everything else in Phase E needs no new decisions (it uses Phase D's foundation). Permission to test data-changing buttons on a test record (I will ask before the first test write, then proceed on the pattern).

---

## PHASE F — Repo organization (branches, placement, specs, security)

**What I will do:**
1. **Branch audit:** List all branches in all 25 repos (this needs a write-permission call — I will do it once, with your GitHub Always Allow grant, so it costs one approval or zero). Report stale branches. Delete ONLY the branches you explicitly list (never bulk-delete).
2. **Repo placement ruling (Decision 2):** If you rule "by design": document it (update the Enterprise Build Spec + `MASTER_CEO_DASHBOARD/README.md` + `Master-System-Buildout` REPOSITORY-MAP to state that VisionWeaver workspaces live in the CEO repo by design, with the runtime separation in csuite-command). If you rule "move": move vw3 (VisionWeaverWorkspace + SceneSetup + AssemblyWatcher + tests + docs) from `MASTER_CEO_DASHBOARD` to `VisionWeaver` via a documented export/import (pointer file in the old location, full history note, PR — not direct push — so you can review the move before it lands). Do NOT move PRs #64/#62/#56/#55 (they stay where they are; if the code moves, the PRs are closed with a pointer to the new location, with your go).
3. **Master-dashboard- (Decision 3):** Archive (add ARCHIVED notice, make private, remove from active lists) or delete (with your explicit confirmation + a backup export first) or strip + keep (Phase A step 2). My recommendation: archive.
4. **Spec updates:** Update the Enterprise Build Spec + Page Map + REPOSITORY-MAP to name `csuite-command`, the corrected architecture (CEO front door, VisionWeaver subsystem), the reconciled page list (Phase B), the SOR roster, and the notebook-design retirement (with a pointer to the policy doc). Mark the Drive specs (Jul–Aug) as SUPERSEDED in Drive (add a header note to the two Drive docs, or move them to an "Archive / Superseded" folder — with your go, since it changes Drive).
5. **`.env` rotation/removal (Decision 10):** In the SAFE order: (a) generate new keys, (b) set new keys in Vercel env vars, (c) redeploy + verify app works, (d) revoke old keys, (e) remove `.env` / `.env.production` from git history (via `git filter-repo` or BFG — rewrites history, needs your explicit go), (f) add `.env*` to `.gitignore` in both repos. Flip the 6 public repos to private (your action in GitHub settings, or I guide you — flipping is a settings change, not a code change).
6. **Link the live work:** Add a pointer in `VisionWeaver` + `MASTER_CEO_DASHBOARD` + `Master-System-Buildout` READMEs/docs noting that the current live system is `csuite-command` (with the URL + the Nov 11 architecture), so no one (including a future AI) looks in the wrong repo for the current work.

**Predicted issues + pre-fixes:**
- *Issue: Moving code loses history / breaks imports.* **Pre-fix:** Prefer ruling over moving (Decision 2 recommendation). If moving: use a PR (reviewable), preserve history via `git mv` where possible, add pointer files, and verify the destination repo builds after the move. Never copy-paste code between repos (loses history + risks divergence).
- *Issue: Branch deletion deletes work someone needs.* **Pre-fix:** Delete ONLY branches you explicitly list. Report first, delete after your go. Never bulk-delete.
- *Issue: `.env` rotation breaks the app (new keys not set, old keys revoked too soon).* **Pre-fix:** The safe order above (new → Vercel → verify → revoke). Never revoke before verifying the new keys work. If the app breaks after rotation, the fix is to re-set the env vars (I will keep the new key values ONLY in Vercel, never in a file/chat).
- *Issue: Flipping repos to private breaks Vercel deployments.* **Pre-fix:** Flip ONE repo first, verify its Vercel deployment still works (Vercel uses the GitHub App, which works with private repos — but verify anyway), then flip the rest. If a deployment breaks, flip it back and investigate before continuing.
- *Issue: Updating specs creates a new contradiction (the spec says one thing, the code says another).* **Pre-fix:** Spec updates are made AFTER the code is built (Phases C–E), so the spec describes what EXISTS, not what is planned. The spec update is a doc change that references the live code (commit SHAs, URLs), not a forward-looking promise.

**Verification:** Branch list reported + deletions confirmed by you. Placement ruling documented (or move PR merged by you). Master-dashboard- archived/deleted/stripped per your decision. Specs updated + Drive superseded notes added. `.env` files gone from history (verified by grep on a fresh clone). Repos private (verified in GitHub settings). Pointer files in place.

**Needs from you:** Decisions 2, 3, 10. Decision 12 (GitHub Always Allow) for the branch audit + doc commits.

---

## PHASE G — CEO Dashboard build out (the pages, per the reconciled list)

**What I will do:** Build the CEO Dashboard pages from the Phase B reconciled list. Each page: its own layout (from screenshot 4 + the spec map's decision/content/actions + VisionWeaver design levels), wired to live data where a table exists (Phase D), honest empty state where it does not, every button wired (Phase E standards), NO notepad design (grepped), SOR roster (if Decision 4 confirms). Pages (per the reconciled list — the exact list is decided in Phase B; the working list is the 13 from screenshot 4, including Notebook as a functional section in gold/dark):
- Home (the front door — built in Phase C, wired in Phase G) · Notebook (functional notes, gold/dark, live `notes` table, create/edit/delete/search) · Pending (live `pending_items` table, checkboxes that save) · Executive Command · C-Suite (SOR roster, clickable → officer detail) · System Portfolio (6 Core Systems, status, links) · Resource Intelligence · Ecosystem Intelligence · Financial Command (live `finance_records`) · IT/Infrastructure (live `integration_inventory` + status) · Security Governance (live `security_events`) · Quality Audit (live `release_gates`) · Integration & Systems (live `integration_inventory`, connection status).

**Predicted issues + pre-fixes:**
- *Issue: Building 13 pages without designs for each = guessing.* **Pre-fix:** Build ONE page, show you the layout, get your correction, then build the rest in that corrected style. Do not build all 13 then show you. The first page (Notebook or Pending — the simplest) is the style proof.
- *Issue: The Notebook section accidentally uses the notepad look (a developer habit, or a copied component).* **Pre-fix:** Code-review checklist for the Notebook page: grep for `#FDF1AA`, `#87CEEB`, `#FF7F7F`, `ruled`, `marker`, `Comic Sans` — zero hits or it does not ship. The Notebook page is built in gold/dark from the first line, not converted from a paper design.
- *Issue: The roster is built from screenshot 4 (wrong) instead of the SOR (right).* **Pre-fix:** Build the C-Suite section from the Phase B reconciled roster (which you confirmed). Flag the discrepancy in the handoff ("built per SOR, differs from screenshot 4 by design") so you see it was intentional.
- *Issue: Pages show fake/placeholder data presented as live.* **Pre-fix:** Every page shows EITHER live Supabase data (with the source table named in a comment/code) OR an honest empty state ("No [X] in Supabase yet"). No invented numbers, no seed data presented as live. The verification checklist for each page includes "data source verified."

**Verification:** Per-page checklist (layout matches reconciled design, every button clicked + verified, data source verified, no notepad design, roster correct). You review the first page before I build the rest.

**Needs from you:** Phase B confirmation (page list + roster). Review of the first page.

---

## PHASE H — Connect everywhere (integrations + linked systems)

**What I will do:**
1. **Audit the 18 integrations** in `integration_inventory`: for each, what is it, does it have an API, what credentials does it need, is it real or a placeholder. Report the audit. Build connections ONLY for the ones you approve, with credentials via Secure Vault (never in chat/files).
2. **Link the 6 Core Systems:** Verify each one exists (URL/repo/API). Link the ones that exist from System Portfolio. Show "Not yet built" (honest) for the ones that do not. Do not link to dead URLs.
3. **Connect external services** you name (Drive, Dropbox, email, calendar, social for Distribution) — each with its own connection (OAuth/API key) + your go.

**Predicted issues + pre-fixes:**
- *Issue: An integration has no API / needs credentials you do not have.* **Pre-fix:** The audit (step 1) finds this BEFORE building. Integrations without APIs/creds are marked "Not connectable yet — needs [X]" (honest), not faked.
- *Issue: A linked system URL is dead / wrong.* **Pre-fix:** Verify each URL loads (browser check) before linking. Dead URLs are not linked.
- *Issue: Connecting a service exposes data (OAuth scope too broad, API key with too many permissions).* **Pre-fix:** Least-privilege scopes only. I will show you the requested scope before connecting, and you approve it. Credentials via Secure Vault only.

**Verification:** Each connected integration shows live status + data (or an honest "connected, no data yet"). Each linked system opens (browser-verified). No dead links.

**Needs from you:** Which integrations/systems to connect + credentials (Secure Vault) + scope approvals.

---

## PHASE I — Final TEST-ALL + deployable + handoff

**What I will do:**
1. **Full TEST-ALL QA:** Click every button/link/toggle on every page (CEO + VisionWeaver + detail pages), in the live browser, on desktop + mobile viewport. Verify sign-in/sign-out. Verify every action (navigates, saves, updates, generates, or shows an honest error). This is the final sweep — Phases C–H already verified per-phase, so this catches cross-phase issues (a link broken by a later phase, a regression, etc.).
2. **Fix everything found.** Any dead button, broken link, wrong navigation, failed write, or regression is fixed + re-verified before I report done. No exceptions.
3. **Deployable check:** Confirm the build passes cleanly (`tsc` + `vite build`), env vars are correct, the production URL serves the working app, and the deployment is the latest code.
4. **Handoff package:** An updated system package (like the Nov 10 package, but for the fully wired system) — every page, every button, every table, every route, every integration, the reconciled record, the repo map — with nothing left out, so you (or another system) can pick it up.

**Predicted issues + pre-fixes:**
- *Issue: TEST-ALL finds many issues late (because per-phase verification missed cross-phase regressions).* **Pre-fix:** Per-phase verification (Phases C–H) already catches most issues. Phase I is a sweep, not the first test. If Phase I finds a regression, I fix it + re-run the affected phase's verification (not just the one button).
- *Issue: The "done" report overclaims.* **Pre-fix:** The handoff lists EXACTLY what was verified (page-by-page, button-by-button checklist) and what remains (if anything). No "fully working" claim unless every button is verified. If something is not verified, it is listed as not verified — plainly.

**Verification:** The checklist is complete. The build passes. The deployment is live + latest. The handoff package is delivered.

**Needs from you:** Nothing (except your review of the final handoff).

---

## §10 — DECISIONS NEEDED FROM YOU (numbered, with my recommendation)

Answer the ones that block the next phase; the rest can come as I reach them. For each, I give my recommendation — but you decide.

| # | Decision | Options | My recommendation | Blocks |
|---|---|---|---|---|
| 1 | **CEO page list** | (a) The 13 from screenshot 4. (b) The 17 from the spec map. (c) A merged list you define. (d) The 14 from the .docx (if you send it). | **(a) The 13** (your most recent design intent), PLUS Audit/History + Settings/Governance from the 17 (clearly needed, no 13-equivalent) = 15 pages. If you prefer exactly 13, say so. | Phase G (Phase B record) |
| 2 | **Repo placement** | (a) Rule it by design (document that VisionWeaver workspaces live in the CEO repo; runtime separation in csuite-command). (b) Move vw3 code to the `VisionWeaver` repo (via PR). | **(a) Rule by design.** Moving is risky (history, imports, PRs); documenting is safe, and the runtime structure already separates them. Only move if you want physical separation. | Phase F |
| 3 | **Master-dashboard- fate** | (a) Archive (notice + private). (b) Delete (after backup export). (c) Strip the notepad + keep. | **(a) Archive.** It is stale, misnamed, and the worst notepad offender. Keeping it live is confusing. Deleting is also fine if you confirm it is fully superseded. | Phase A (step 2) + Phase F |
| 4 | **Officer roster** | (a) SOR roster (CEO, CMGIO, COO, CFO, CIO/CTO combined, Legal, HR, Sales, Customer Success, THELMA as CIntO, Architect above all). (b) Screenshot-4 roster (10 officers incl. split CTO/CIO, CCO, CHRO, CLO, CAO). | **(a) SOR roster.** It is the self-declared authority, and DRIFT-003 flags the screenshot roster as retired. But you are the final authority — if screenshot 4 is current, say so and I build that. | Phase G (C-Suite) |
| 5 | **Generation provider (Vision Builder)** | (a) Runway API (you have Pro) for video + [image provider?] for images. (b) Another provider. (c) Honest placeholders for now (no live generation). | **(a) Runway API** for video (you already pay for Pro). For images, tell me the provider (or I recommend one after checking what you already use). Keys via Secure Vault. Spend limit: you set it. | Phase E (Vision Builder) |
| 6 | **AI provider (AI Co-Pilot)** | (a) Anthropic (Claude) API. (b) OpenAI. (c) Another. (d) Honest placeholders for now. | **(a) Anthropic** (consistent with this system) — but your call. Key via Secure Vault. Spend limit: you set it. Agent logic: I draft from the agent names/descriptions, you correct it. | Phase E (AI Co-Pilot) |
| 7 | **Auth** | (a) Email/password via Supabase Auth, sign-in required to CHANGE, public to VIEW. (b) Email/password, sign-in required to VIEW (private app). (c) OAuth (Google). (d) Keep open + sign-in only for writes (same as (a), essentially). | **(a)** Email/password, sign-in to change, public to view. (If you want it fully private, say (b).) | Phase D |
| 8 | **Server routes + service-role key** | (a) Yes, build server routes using the service-role key (key stays in Vercel env vars only, never in code). (b) No (then writes cannot work from the browser — buttons that write would need a different approach, which I would need to design with you). | **(a) Yes.** It is the only secure way to do writes. The key never leaves Vercel env vars. | Phase D |
| 9 | **Table list** | The 14 tables in Phase D (with columns — I will show you the full list + columns before creating any). | **Yes, after you review the list.** I will show it to you first. No table is created without your go on the list. | Phase D |
| 10 | **`.env` rotation/removal + flip repos private** | (a) Yes, in the safe order (Phase F step 5). (b) No / later. | **(a) Yes.** The `.env.production` in a PUBLIC repo is the urgent one. The safe order prevents breakage. | Phase F |
| 11 | **The `.docx` build prompt** | Send it if you have it (likely ChatGPT folder). If not, I proceed without it. | Send it if you can find it — it is the missing primary source (14 tabs + 150-item list). If not, the reconciled list (Decision 1) stands without it. | Phase B (if available) |
| 12 | **GitHub "Always Allow"** | On the next GitHub approval card, tap "Always Allow" once. | **Do this.** It is the fix for the 20-hours-of-approvals problem. One tap, durable grant, like Figma/Drive/Vercel already have. I cannot set it for you. | All build phases (avoids per-commit cards) |

**To start:** Say "go" + answer Decisions 3, 8, 9, 12 (the ones that block Phases A/D). Decisions 1, 2, 4 can come when I reach Phases B/F/G. Decisions 5–6 can come when I reach the Vision Builder / AI Co-Pilot parts of Phase E. Decision 7 can come with Phase D. Decision 10 can come with Phase F. Decision 11 whenever you find it (or never, if it is gone).

---

## §11 — WHAT "DONE" MEANS + THE COMMITMENT

**"Done" means (all of these, verified live):**
- The CEO Dashboard is the front door (`/`), VisionWeaver is a linked subsystem (`/visionweaver/*`), and the structure matches the reconciled record.
- Every button on every page does what it should (verified by clicking, page-by-page checklist).
- Every page shows live data or an honest empty state (no invented numbers, no seed presented as live).
- The notepad DESIGN appears nowhere (grepped: 0 hits in runnable code). The Notebook SECTION exists and works (in gold/dark).
- The officer roster matches the reconciled record (SOR or your override).
- Sign-in/sign-out works. Server-route writes work (verified in Supabase + UI).
- The build passes (`tsc` + `vite build`). The deployment is live + latest.
- The repos are organized per your ruling, the specs name csuite-command, the `.env` files are rotated/removed, and the repos are private (per your decisions).

**The commitment (no more loops):**
- No "done" without live verification. Every phase is verified in the browser before the next starts.
- No rebuilding the same thing. The reconciled record (Phase B) is the authority; if I build from it and you correct it, I correct the record AND the code, once.
- No guessing silently. Every gap, contradiction, and assumption is flagged to you with options + a recommendation, before I build on it.
- No dead buttons left. If a button cannot be wired (no provider, no data, no decision), it is removed (with your say-so) or shows an honest "not yet" state — never a dead click.
- You do not click approve for 20 hours. Decision 12 (one tap) fixes it. Until then, I batch commits to minimize cards.

**I have a REAL plan. It is thought through. The predicted issues above are the ones I can foresee from the failures we have already hit (crash, image corruption, RLS/GRANT, deploy fight, mislabeling, stale specs, approval fatigue). There will be issues I cannot predict — when they appear, I will flag them, fix them, and update this plan, before calling the phase done.**

**Tell me to go, and I start with Phase A.**

**— Victoria (Vickie), 2026-11-11 21:41 CST. Nothing built. Findings only. Awaiting your go.**
