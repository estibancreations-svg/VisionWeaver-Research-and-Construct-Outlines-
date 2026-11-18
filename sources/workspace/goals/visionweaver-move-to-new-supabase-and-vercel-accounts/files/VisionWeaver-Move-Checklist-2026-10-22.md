# VisionWeaver Move — Old Accounts to New Accounts

**Decided:** 2026-10-22, Sire — move VisionWeaver first, before everything else.
**From:** old Vercel + old Supabase (estibancreations@gmail.com side)
**To:** new Vercel + new Supabase (Seniorestibancreations@gmail.com)
**Status:** Nothing moved, created, or disconnected yet. This checklist is the plan, in order.
**Code does not move:** no new GitHub account was created. The repos stay where they are (estibancreations-svg). Only hosting (Vercel) and backend (Supabase) move.

---

## What moves — the verified inventory

### Vercel, old account, 2 VisionWeaver projects
- [x] **visionweaver-design-studio** — the Director Studio site, canonical v3 UI, host 0.4.02. Address: visionweaver-design-studio.vercel.app. Framework: none listed. Node 24.x. Currently **PAUSED by the owner** on the old account (503, checked 2026-10-22).
  - Env keys (names only): SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, APP_ORIGIN
  - SUPABASE_URL points at yqealeekngxooyoemfba
- [x] **visionweaver-prime** — the Prime app. Address: visionweaver-prime.vercel.app. Framework: none listed. Node 24.x.
  - **No env vars in Vercel.** Its Supabase target (azoqszhhmmkyqztubgem) is baked into the repo: vercel.json Content-Security-Policy connect-src, plus the 2026-10-11 handoff doc. Build: `node scripts/build.mjs`, output `dist`, clean URLs on.

### Supabase, old account, 2 of the 3 projects touch VisionWeaver
- [x] **yqealeekngxooyoemfba** — labeled "Master Dashboard" in VisionWeaver's own wiring diagram (connections/README.md, 2026-09-29). This is where VisionWeaver's live backend sits, shared with the ecosystem:
  - Tables: production_log (2 rows), social_post_queue, social_connections, oauth_flow_state, vw_review_decisions, ec_connectors
  - Edge Functions deployed (10): oauth-callback, visionweaver-orchestrator, visionweaver-studio, dashboard-data, ec-fabric-dispatcher, thelma-ai, ecosystem-watch, resource-intelligence, gemini-connection-test, sync-world-signals
  - Schema history also lives in code: migrations in MASTER_CEO_DASHBOARD (VisionWeaver multimodal, THELMA alerts, ecosystem schedules), engine checkpoint v2.02 / Supabase revision 25 / health contract 7.02 (2026-10-02), Phase 2 Avatar State applied live 2026-10-08
  - **Shared, not VisionWeaver-only.** The CEO Dashboard also reads this project. Moving VisionWeaver out means extracting VisionWeaver's part, not taking the whole project away from the Dashboard.
- [x] **azoqszhhmmkyqztubgem** — labeled "MASTER_CEO_DASHBOARD" in the same wiring diagram: live, **no tables yet, reserved** as of 2026-09-29. VisionWeaver Prime connects to it. Its current state must be re-checked before moving, because the diagram is a month old.
- [x] **Does NOT move in this phase:** csxtrhwzswluismrayen (standalone-crm-test, the THELMA CRM project). It stays on the old account until the CRM's own turn.

### GitHub repos involved (stay in place, get pointer updates only)
- [x] VisionWeaver — Director Studio source, connections/ wiring diagram and env examples point at yqeal
- [x] VisionWeaver-Prime — Prime source; vercel.json points at azoq
- [x] DESIGN_STUDIO — related design build; its docs/tests reference Supabase
- [x] MASTER_CEO_DASHBOARD — holds yqeal migrations; it is NOT moving in this phase, so its pointers to yqeal must not be edited for VisionWeaver's move

---

## The move, in order

### Phase 1 — Get working old-side Supabase access (nothing moves without this)
- [ ] Create a Personal Access Token in the **old** Supabase account (account picture, Account Preferences, Access Tokens, all scopes)
- [ ] Enter it on the secure page Muse sends (replaces the broken stored token), never in chat
- [ ] Verify: list projects shows all three refs; list tables and Edge Functions in yqeal and azoq and record what is actually there today (the wiring diagram is from 2026-09-29)
- [ ] Export from yqeal: schema, the VisionWeaver tables' data, the VisionWeaver Edge Functions (visionweaver-orchestrator, visionweaver-studio, plus shared ones VisionWeaver depends on), auth settings, any storage buckets
- [ ] Export from azoq: confirm whether it is still empty/reserved; if anything is there, export it too
- [ ] Snapshot the exports into the VisionWeaver repo or Drive, so the move does not depend on the old account staying open

### Phase 2 — Build the new Supabase (Senior account)
- [ ] **Only after Phase 1 exports are done:** swap Muse's Supabase token to the **new** account PAT (the connector holds one token at a time — swapping early cuts off the old side)
- [ ] Create the new VisionWeaver project in the Senior account (name and region: Sire's call, see decisions below)
- [ ] Apply the schema (migrations from code plus the exported schema), create the VisionWeaver tables
- [ ] Load the exported data (production_log, vw_review_decisions, social queues/connections, oauth state, avatar state records)
- [ ] Deploy the VisionWeaver Edge Functions; record their new URLs
- [ ] Decide Prime: recreate the azoq-side project in the Senior account, or fold Prime into the new VisionWeaver project (see decisions)
- [ ] Set Auth URL Configuration in the new project: Site URL and redirects will use the new Vercel addresses from Phase 3

### Phase 3 — Build the new Vercel (Senior account)
- [ ] Old Vercel stays connected in Muse until this phase — its settings are already fully recorded in the scan, so nothing is lost at swap time
- [ ] Signed in as Senior in the browser: create project visionweaver-design-studio from the VisionWeaver repo, and visionweaver-prime from the VisionWeaver-Prime repo
- [ ] Prime build settings: build command `node scripts/build.mjs`, output `dist`
- [ ] Set env vars on the new projects to the **new** Supabase URL and publishable keys (never the old ones)
- [ ] Update code pointers, in the repos: Prime's vercel.json connect-src to the new project ref; VisionWeaver connections/ env examples and wiring diagram to the new refs; do not touch MASTER_CEO_DASHBOARD's pointers to yqeal

### Phase 4 — Cutover and verify
- [ ] Deploy both new Vercel projects
- [ ] Verify the Studio: page loads, sign-in works, production records and review decisions read and save against the **new** Supabase, visionweaver-orchestrator and visionweaver-studio functions respond
- [ ] Verify Prime: loads and reaches the new Supabase with no CSP or connection errors
- [ ] Keep the old side untouched as the fallback. Old Vercel projects and old Supabase projects are **not** deleted in this move — deletion, if ever, is Sire's separate explicit call

### Phase 5 — Reconnect Muse to the new accounts, last
- [ ] Vercel: disconnect the old account, connect the Senior account; verify the signed-in email reads Seniorestibancreations@gmail.com and the project list shows the two new projects
- [ ] Supabase: verify Muse's stored token is the Senior one (done in Phase 2) by listing projects on the new account
- [ ] Update memory and the CRO Master Dashboard registry notes with the new addresses and refs

---

## Decisions needed from Sire

1. **Fresh start or carry the data over?** Recommendation: carry it. The VisionWeaver data is small (production_log was 2 rows; review decisions, queues, avatar state), and carrying it keeps the Studio's production records alive. Fresh start is faster but orphans those records.
2. **Splitting shared yqeal:** extract only VisionWeaver's tables/functions into the new project (recommended — the CEO Dashboard keeps using yqeal untouched), or clone the whole project and prune later?
3. **Prime's backend:** its own new project (mirror of azoq), or folded into the new VisionWeaver project?
4. **New project names and region** in the Senior Supabase account, and whether the new Vercel projects keep the same names (the .vercel.app addresses will differ if the names are taken on the new account).

## Immediate next step

Phase 1, first box: the old account's Supabase Personal Access Token. Without it, Supabase's insides stay unseen and no export can happen. Say the word and Muse sends the secure page for it.
