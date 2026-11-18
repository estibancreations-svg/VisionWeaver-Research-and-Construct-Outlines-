# New-account migration checklist (DRAFT — prepared 2026-10-22 ~20:35 CDT)

Prepared for the user's decision: move **everything at once** or **VisionWeaver first**.
Nothing here has been executed. Nothing changes until the user says go.

## Verified move inventory (old accounts, scanned 2026-10-22 tonight)

**Supabase (old): exactly 3 project refs**
1. `csxtrhwzswluismrayen` — standalone-crm-test — behind the T.H.E.L.M.A. CRM
2. `yqealeekngxooyoemfba` — shared ecosystem project — MASTER_CEO_DASHBOARD (VisionWeaver/THELMA migrations), VisionWeaver connections, Master-dashboard- .env.production, visionweaver-design-studio Vercel env
3. `azoqszhhmmkyqztubgem` — VisionWeaver-Prime only
- ⚠️ reunion-os has Supabase keys in its Vercel env but its repo holds only placeholders — its ref is NOT proven; it may be one of the three or a fourth project.

**Vercel (old): 11 projects**, all on default `*.vercel.app` domains, no custom domains.
- Wired to Supabase (env vars present): standalone-crm, visionweaver-design-studio, master-ceo-dashboard, reunion-os
- No env vars: visionweaver-prime, thelma-global-link-logistics
- ⚠️ visionweaver-design-studio's live deployment is PAUSED by the owner (Vercel serves 503) — resume needs the old-account owner, or the move happens first.

**Correct system target (VisionWeaver):** v3 UI in `MASTER_CEO_DASHBOARD` (`src/components/VisionWeaverWorkspace.tsx`); live home = Vercel project `master-ceo-dashboard`.

## Pre-move gate (either option)

- [ ] New Supabase PAT (uncapped, all scopes) entered on the secure page → verified by listing the new account's projects/organizations.
- [ ] Look at what's already in the NEW accounts (user created both; contents unknown until connected). Record: any existing Supabase projects? any Vercel imports?

## Option A — VisionWeaver first

1. [ ] In the new Supabase account, create (or confirm) the shared ecosystem project (successor to `yqealeekngxooyoemfba`).
2. [ ] Data move — BLOCKER: old Supabase is unreadable with the broken stored token. Two paths:
   - (a) User generates a fresh PAT on the OLD Supabase account → export schema + data from `yqealeekngxooyoemfba` → import into the new project; or
   - (b) Rebuild from repo migrations (MASTER_CEO_DASHBOARD carries the VisionWeaver/THELMA migrations) — schema only, no live data.
3. [ ] Disconnect old Vercel OAuth → reconnect while signed in as Seniorestibancreations@gmail.com.
4. [ ] Re-import `master-ceo-dashboard` GitHub repo into the new Vercel account; set env vars (new Supabase URL + anon/publishable keys); deploy; verify the v3 UI serves at its new address.
5. [ ] Prove it: run the authenticated-save test (known gap — the live app had never accepted an authenticated project save).
6. [ ] Keep the old-account project live as fallback until the new one is verified; then pause/delete old.

## Option B — all at once

All of Option A, plus, in the same window:
1. [ ] Create 3 Supabase projects in the new account (CRM, shared ecosystem, VisionWeaver-Prime). Resolve reunion-os's ref first — if it's a fourth, that's 4.
2. [ ] Same data-move blocker ×3 (fresh old-account PAT or rebuild from repo migrations; CRM has v2.1 migrations 09/10/11 on the c455752 branch).
3. [ ] Re-import all 11 GitHub repos to the new Vercel account; re-set env vars per project (4 Supabase-wired + 7 without); verify each deployment.
4. [ ] visionweaver-design-studio: decide whether to resume the paused old deployment first or move it fresh.

## Decisions still with the user

1. Move order: **VisionWeaver first (Option A)** or **all at once (Option B)**.
2. Data: fresh old-account PAT for a true export (Option a), or rebuild from repo migrations (Option b, schema only)?
3. Old-account teardown timing: keep old projects as fallback until new ones verified, or cut over cleanly?

## Unknowns preserved (not guessed)

- New Supabase account contents (projects?) — visible only after the new PAT lands.
- New Vercel account contents (projects/imports?) — visible only after reconnect as the senior account.
- reunion-os's Supabase ref — unproven.
- Whether the old Supabase account is still accessible to generate a fresh PAT.
