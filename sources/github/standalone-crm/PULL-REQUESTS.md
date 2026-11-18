# Pull requests — estibancreations-svg/standalone-crm

Source: list_pull_requests state=all, retrieved 2026-11-18 (read-only). Total: 12.

## PR #1: v3: team roles, first-launch owner setup, sign-in methods, looks, branding, CSV import

- State: closed; merged
- Author: estibancreations-svg
- Head: v3 → Base: main
- Created: 2026-10-13T17:12:32Z | Updated: 2026-10-13T17:12:38Z | Closed: 2026-10-13T17:12:38Z | Merged: 2026-10-13T17:12:38Z
- Body:

Standalone CRM v3.

- First-launch Owner (Admin 1) setup page protected by a one-time setup code
- Temporary passwords must be changed at first sign-in (/welcome), then sign-in methods are offered
- Google / Apple / Microsoft / GitHub / phone sign-in (identity only; buttons appear when each provider is switched on), two-step codes
- Agency team: Owner, Admins, Assistants (one Owner per agency)
- Looks: Sculpted Paper, Professional Greyscale (marble), Stealth, Auto
- Client logos, brand colors, suggested tags, 10 industry starter setups
- Tappable owner numbers, cross-client due list, jump-to-client, History filters, CSV import
- In-app confirm dialogs, friendly errors, Privacy + Terms, Vercel Analytics + Speed Insights
- Edge Functions: manage-logins (team), account, setup-owner; migration 06; RLS suite now 55 checks
- update-all-clients.sh

Preview build of the full app code passed lint, typecheck, unit tests and next build.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_01HJKoQxrQCaq7b3A25Gkgr5

---

## PR #2: v3.1: owner setup by email link, hand-off, required two-step, connections vault, T.H.E.L.M.A. AI Fail Safe

- State: closed; merged
- Author: estibancreations-svg
- Head: v3-1 → Base: main
- Created: 2026-10-13T20:53:06Z | Updated: 2026-10-13T20:53:27Z | Closed: 2026-10-13T20:53:27Z | Merged: 2026-10-13T20:53:27Z
- Body:

## What's in v3.1

- **Owner setup by email link** – the installer sets the Executive Owner email; `/setup` emails that address a one-time sign-in link (setup code kept as a spare way in).
- **Walk-through** (`/welcome`): accept ownership → hand off to a new Owner email (or keep) → password → **two-step (required for Owner, admins, backup admin)** → sign-in options, connections file, look.
- **Hand-off** (`handoff` Edge Function + `complete_handoff`): the new Owner proves the mailbox, accepts, and the old Owner becomes a **visible backup admin**. Always exactly one Owner.
- **T.H.E.L.M.A. AI Fail Safe**: the backup admin can only be removed or changed with a one-time release code they create from their own account (only a SHA-256 fingerprint is stored).
- **Connections vault**: upload JSON / TXT / Markdown listing each site + access point (OAuth, API key, MCP). Keys go to Supabase Vault, are shown only as `••••last4`, and are destroyed on removal. Website passwords are refused.
- **Sign-in options**: Google, Microsoft, GitHub, Vercel (custom provider) and email are free; Apple and phone are built in but stay off until an administrator activates them.
- **Looks**: Owner sets the team look; everyone can switch (Paper, Professional Greyscale, Stealth, Auto).
- Database: two-step is enforced in RLS helpers once a factor is verified (aal2). Isolation suite: 92 checks pass locally.

Edge Functions `setup-owner`, `handoff`, `connections`, `account`, `manage-logins` and migrations v3_1_a–g are already live on Supabase.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_014nF6s6SnZBCUKeTSE1f6qR

---

## PR #3: v3.1 docs: handbook, how-to guide, integrations, verification report, hand-off browser test

- State: closed; merged
- Author: estibancreations-svg
- Head: v3-1-docs → Base: main
- Created: 2026-10-14T06:08:23Z | Updated: 2026-10-14T06:08:29Z | Closed: 2026-10-14T06:08:29Z | Merged: 2026-10-14T06:08:29Z
- Body:

Docs-only update for v3.1 (no app code changes):

- `DEPLOYMENT_HANDBOOK.md` v3.1 — owner setup by email link, walk-through, hand-off, T.H.E.L.M.A. AI Fail Safe, required two-step, connections vault, provider key steps, updated product boundary.
- `docs/` — how-to guide, integrations, design system, build blueprint, AI hand-off prompt and verification report (92/92 isolation, 25/25 live end-to-end).
- `tests/e2e/v31-handoff.mjs` — the browser test used for the 25 live checks (synthetic accounts only; password from env).

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_014nF6s6SnZBCUKeTSE1f6qR

---

## PR #4: T.H.E.L.M.A. CRM Complete — Version 2.0 / 2.1

- State: closed; merged
- Author: estibancreations-svg
- Head: thelma-crm-v2.0 → Base: main
- Created: 2026-10-15T04:04:24Z | Updated: 2026-10-15T10:54:42Z | Closed: 2026-10-15T04:45:00Z | Merged: 2026-10-15T04:45:00Z
- Body:

Version 2.0 of the CRM (formerly Standalone CRM). **Do not merge until the Vercel preview build passes and the Owner approves.**

## What's in it
- Database migration `20261014000008_v4_platform.sql`: plans/tiers (suggested prices), 3 business mailboxes per sub-account, inbox and team chat, app connections (request-only), marketing with compliance checks, industry kits (bail bonds, insurance, financial), websites with limits, courses/communities, Zoom/FaceTime appointments, payment settings and invoices, and the T.H.E.L.M.A. request queue (Owner + two-step approval only).
- Edge Functions: `thelma-gateway` (signed requests only) and `payments` (Stripe checkout and webhook).
- New screens for sub-accounts and the agency; layout unchanged; app renamed to T.H.E.L.M.A. CRM Complete.
- Docs: Deployment Manual (Version 2.0), START_HERE, how-to guide, T.H.E.L.M.A. profile and duties, research, decision log, conversation summaries; v3.1 docs archived as RETIRED.

## Tested
- SQL: 92/92 existing isolation checks + 54/54 new checks (local Postgres).
- Unit tests 13/13; Edge Functions typecheck.
- **Not yet verified:** `next build` (packages could not be installed locally). This preview build is the first real build check.

## Before merging
1. Vercel preview build passes.
2. Apply the migration to the live Supabase project and deploy the two new functions (see `DEPLOYMENT_HANDBOOK.md` §12).
3. Owner approval. Old Vercel deployments are removed only after approval (`docs/VERCEL_CLEANUP.md`).

No secrets or passwords are in this change.

## Version 2.1 (Oct 15, 2026)

Functions only. Layout and colors unchanged.

- Home dashboard and app grid; the logo always goes Home
- **Ask T.H.E.L.M.A.** side tab on every screen, with Talk and Read to me. She is read-only; "Ask her to do it" files a pending request for the Owner
- Communications (All / Mine / Unassigned / Starred), Social, Calendar, Reports
- Money & accounting with expenses, receipts and a spreadsheet download
- Documents, scans and photos (private storage per business)
- Training, Systems & manual (sort by newest / version / all), IT & support with live screen-share sessions, Setup calculator
- Install-your-own-app with QR code and a branded manifest per business; company logo
- **62 custom business kits**, plus a catalog of **751 businesses** mapped to them (`docs/research/BUSINESS_CATALOG.*`)
- Landing page explains what T.H.E.L.M.A. stands for
- **Dialer** (keypad, call a contact, save the outcome) and **AI Suite** (AI on/off and a monthly limit per business, with usage)

**Live database:** upgrades 09, 10 and 11 applied and checked. `thelma-assist` function deployed. Preview build Ready.
**Tests:** unit 16/16; database v2.1 feature suite 48 checks passing locally (RLS isolation and v4 suites still pass).
**Do not merge until Sire says OK.** Target: Friday 8am Eastern.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_012AnuYozViFVPSeZ2Wxq7nQ

---
_Generated by [Claude Code](https://claude.ai/code/session_012AnuYozViFVPSeZ2Wxq7nQ)_


---
_Generated by [Claude Code](https://claude.ai/code)_

---

## PR #5: T.H.E.L.M.A. CRM Complete — Version 2.1 (wait for Owner OK)

- State: open
- Author: estibancreations-svg
- Head: thelma-crm-v2.0 → Base: main
- Created: 2026-10-15T10:55:15Z | Updated: 2026-10-15T10:56:39Z | Closed: None | Merged: None
- Body:

## T.H.E.L.M.A. CRM Complete — Version 2.1

Functions only. Layout and colors are unchanged. Production runs Version 2.0 (PR #4). This brings 2.1 to production.

**Do not merge until Sire says OK.** Target: Friday 8am Eastern.

### What's new
- **Home dashboard** and app grid. The logo always goes Home, and sign-in lands there.
- **Ask T.H.E.L.M.A.** side tab on every screen, clearly labeled, with Talk and Read to me. She is read-only; "Ask her to do it" files a pending request for the Owner.
- **Communications** (All / Mine / Unassigned / Starred), **Social**, **Calendar**, **Reports**.
- **Money & accounting**: expenses, receipts, monthly profit, spreadsheet download.
- **Documents, scans and photos**, stored privately per business; one-tap "Scan a business card".
- **Dialer**: keypad and contact search; calls go through the device; the outcome is saved on the contact.
- **AI Suite**: the Owner turns AI on or off per business, sets a monthly limit and sees usage. Enforced in the database.
- **Training**, **Systems & manual** (sort by newest / version / all), **IT & support** with live screen-share sessions, **Setup calculator**.
- **Install your own app** (QR code, branded per business) and the company logo.
- **62 custom business kits**, plus a catalog of **751 businesses** mapped to them (`docs/research/BUSINESS_CATALOG.*`).
- Landing page explains what T.H.E.L.M.A. stands for.

### Checks
- Live database: upgrades 09, 10, 11 applied and verified. They only add, so Version 2.0 keeps working.
- `thelma-assist` Edge Function deployed (v2). AI answers start when the Owner adds `ANTHROPIC_API_KEY` in Supabase secrets.
- Unit tests 16/16. Database feature suite 48 checks; RLS isolation and v4 suites pass.
- Vercel preview build: Ready (lint, type check, tests, build).

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_012AnuYozViFVPSeZ2Wxq7nQ

---
_Generated by [Claude Code](https://claude.ai/code/session_012AnuYozViFVPSeZ2Wxq7nQ)_

---

## PR #6: Activate CRM CI + lockfile (needs manual workflow files)

- State: open (draft)
- Author: estibancreations-svg
- Head: chore/activate-ci-lockfile → Base: main
- Created: 2026-10-17T20:58:37Z | Updated: 2026-10-17T20:59:18Z | Closed: None | Merged: None
- Body:

## What this PR does

- Adds `docs/CI_ACTIVATION_NOTE.md` documenting the CI blocker found 2026-10-17.
- Does NOT yet contain `.github/workflows/ci.yml` or `.github/workflows/lockfile.yml` — see blocker below.

## Blocker: workflow permission

The Muse GitHub App cannot create files under `.github/workflows/` via API (403 `Resource not accessible by integration`). This matches the existing `ci/README.md` note that the automated connection could not create workflow files.

To finish this PR, the Owner (or someone with workflow permission) must add the two files by hand in the GitHub web UI, on this branch:

1. Add file → Create new file → `.github/workflows/ci.yml` — paste contents of `ci/github-workflows/ci.yml` (verbatim, verified 2026-10-17).
2. Repeat for `.github/workflows/lockfile.yml` from `ci/github-workflows/lockfile.yml`.

Alternatively, grant the Muse GitHub App `workflow` permission in the App installation settings, then ask Muse to push the two files.

## After merge

- `lockfile.yml` runs on push to `main` when `package.json` changes and generates `package-lock.json` (first run), so later installs use `npm ci`.
- `ci.yml` runs on PRs + pushes to `main`: lint, typecheck, unit tests, build, secret-scan, plus migrations + RLS isolation on Postgres 17.
- Do NOT merge PR #5 (v2.1) until this CI is green on its head or the Owner explicitly waives it.

## Verified 2026-10-17

- Production deployment `dpl_64gtDrsxgA1d72bV85Xq1y4CWqjZ` = main `609ca86` (v2.0), READY.
- PR #5 head `c455752` preview `dpl_7N81tsMXdYfHyQ6ufT9bsa5K89tW` = READY. PR #5 NOT merged in this PR.
- No `package-lock.json` in either repo (verified via root listing).


---

## PR #7: Docs: operating policy + v2.1 verification + prod runbook (drafts, no behavior change)

- State: closed; merged
- Author: estibancreations-svg
- Head: docs/fixup-docs-policy → Base: main
- Created: 2026-10-17T21:18:09Z | Updated: 2026-10-17T21:21:29Z | Closed: 2026-10-17T21:21:29Z | Merged: 2026-10-17T21:21:29Z
- Body:

## What this PR does (docs only, no code/behavior change)

- docs/OPERATING_POLICY.md — one rule reconciling T.H.E.L.M.A. gateway vs Leadstack delegated writes. Default = thelma-gateway + Owner approval. Leadstack direct writes only for internal CRUD, delegated + scoped + AAL2-gated + audited. External send/publish/charge/connect/go-live/delete ALWAYS via approval queue.
- docs/V2_1_VERIFICATION_CHECKLIST.md — verification of PR #5 head c455752 (migrations 09-11, v21_features.sql, thelma-assist present) + still-required checks before merge. NOT a release approval.
- docs/DOCS_REFRESH_NOTES.md — staged corrections: START_HERE stale build claim, VERIFICATION_REPORT v3.1-only, Leadstack checklist stale, DOCX/ZIP outdated, handbook scaffolding honesty.
- docs/PRODUCTION_BACKUP_SECURITY_RUNBOOK.md — prod separation decisions, backup/restore-drill template, security follow-up checklist (leaked-password, privileged functions, RLS).

## Status

DRAFTS. Policy is NOT in effect until Sire approves. No merge of PR #5 in this PR. No provisioning done.

## Verified 2026-10-17

- Prod v2.0 main 609ca86 READY; PR #5 head c455752 preview READY.
- No lockfiles in either repo; CI activation is PR #6 (blocked on workflow permission).


---

## PR #8: Docs: fix START_HERE stale claim + verification addendum

- State: closed; merged
- Author: estibancreations-svg
- Head: fix/stale-docs-direct → Base: main
- Created: 2026-10-17T21:30:45Z | Updated: 2026-10-17T21:31:45Z | Closed: 2026-10-17T21:31:45Z | Merged: 2026-10-17T21:31:45Z
- Body:

Direct fixes (follow-up to merged PR #7):

- START_HERE.md: retire stale 'v2.0 has not yet passed the build gate' — prod dpl_64gt... READY on main 609ca86. Clarify migrations 01-08 in main, 09-11 in PR #5 (not merged). Point ground rule 5 at OPERATING_POLICY.md.
- VERIFICATION_REPORT.md: append 2026-10-17 addendum (v2.0 prod, v2.1 not merged/not certified, CI inactive, no lockfiles, DOCX/ZIP outdated, policy in effect).

Docs only. No code change. No PR #5 merge in this PR.

---

## PR #9: Docs: mark OPERATING_POLICY approved + in effect

- State: closed; merged
- Author: estibancreations-svg
- Head: fix/policy-approved → Base: main
- Created: 2026-10-17T21:32:47Z | Updated: 2026-10-17T21:42:17Z | Closed: 2026-10-17T21:42:17Z | Merged: 2026-10-17T21:42:17Z
- Body:

Follow-up to merged policy PRs: change status from DRAFT to APPROVED + IN EFFECT 2026-10-17 per Owner approval in chat. Docs only.

---

## PR #10: Docs: correct verification addendum — policy NOT yet in effect

- State: closed
- Author: estibancreations-svg
- Head: fix/verification-wording → Base: main
- Created: 2026-10-17T21:41:30Z | Updated: 2026-10-17T21:52:58Z | Closed: 2026-10-17T21:52:58Z | Merged: None
- Body:

Fixes the ahead-of-itself line in PR #8's addendum that said the policy 'is now in effect'.

Truth: Owner said Approved in chat, but OPERATING_POLICY.md on main still says DRAFT and PR #9 is OPEN, NOT merged (merge declined). Do not treat as in effect until PR #9 or equivalent merges.

Docs only. Does NOT retry the declined PR #9 merge. Leaves PR #9 open for an explicit decision.

---

## PR #11: Delivery v4.1: Inbox email (Resend) + text (Twilio) — code only, not deployed

- State: open (draft)
- Author: estibancreations-svg
- Head: delivery/email-sms-v41 → Base: main
- Created: 2026-11-13T21:48:54Z | Updated: 2026-11-13T21:49:36Z | Closed: None | Merged: None
- Body:

Code only — nothing is deployed, no keys were added, nothing was spent. Delivery stays OFF until the Owner switches it on.

## What this builds
Inbox email (Resend, Free tier to start) and text (Twilio, pay-as-you-go) delivery for messages a signed-in member queues in the app. Resend + Twilio are the cheapest verified working start; the worker's provider clients swap without touching the queue (Postmark/SendGrid/SES later are new clients only).

- `supabase/migrations/20261113000012_delivery_email_sms.sql` — contact opt-outs, message provider columns, `delivery_settings` (Owner-only switch, mirrors `payment_settings`, Owner copy stays OFF), service-role-only `delivery_keys` RPC (Resend/Twilio vault keys only), append-only `delivery_usage_log`. No trigger changes: `prepare_message` already leaves service-role inserts alone. Migration 12 sorts after v2.1's 09–11 and depends on main 01–08 objects only.
- `supabase/functions/delivery/index.ts` — worker following the `payments` function pattern: self-checked tokens/signatures, `--no-verify-jwt`. Actions `deliver` / `drain` (queued only, 25 max, serial). Twilio webhook (HMAC-SHA1 with vault token): status receipts + inbound texts + STOP/START. Resend webhook (Svix): receipts + spam complaints opt the contact out. Pre-send checks: member-queued only, plan feature, verified domain (email), delivery switch, opt-outs. Agent requests (`thelma_requests`) are never read — agent sending stays behind the approval queue per OPERATING_POLICY.
- `src/app/w/[ws]/tools-actions.ts` — send/reply kicks the worker (failures stay queued, never break the queue action); new `retryMessage` action for failed messages.
- `src/app/w/[ws]/inbox/[id]/page.tsx` — "Try again" button on failed outbound messages. The only UI addition.
- `supabase/config.toml` — `[functions.delivery]`, `verify_jwt = false` (mirrors payments).
- `supabase/tests/delivery_features.sql` — SQL suite in the v4_features style (one transaction + rollback): switch, keys RPC denial, usage-log isolation, opt-outs.

## Verified before this PR
- Worker + tools-actions TypeScript parse clean (type-strip check). SQL brace/paren balanced. Diffs of the 3 modified files reviewed against main `2be8547`.
- NOT verified: SQL has not run against a database; the function has not deployed; no live send has happened. See below.

## Still needed before any real send (TEST-ALL)
1. Run `supabase/tests/delivery_features.sql` in the test project.
2. Deploy: `supabase functions deploy delivery --no-verify-jwt`; set `RESEND_WEBHOOK_SECRET`.
3. Owner uploads Resend (`api_key`) + Twilio (Account SID, `auth_token`, `message_service_sid` and/or `from_number`) in Connections; Twilio 10DLC registration is the long-lead item (1–3 weeks).
4. Paste webhook URLs exactly (including `?agency=`) in Resend + Twilio dashboards.
5. Test sends to the Owner's own email/phone; check pills, receipts, STOP/START, and isolation (agency B sees nothing).
6. Owner switches delivery on (`delivery_settings`, test then live). Do not merge until the Owner says OK.

## Known follow-ups (not in this PR)
- Connections UI does not collect a Twilio `from_number` field; upload JSON `settings` can carry it, or a Messaging Service SID reuses the existing auth setup.
- No scheduled drain/cron is wired; `drain` is manual for now.
- Inbound texts from unknown numbers are ignored (contacts are never auto-created).
- Email opens/clicks are not recorded in v4.1.


---

## PR #12: Scoring + lists v4.2: live lead scores and saved segments — code only, not deployed

- State: open (draft)
- Author: estibancreations-svg
- Head: scoring/lists-v42 → Base: main
- Created: 2026-11-14T21:21:17Z | Updated: 2026-11-14T21:21:22Z | Closed: None | Merged: None
- Body:

Code only — nothing is deployed, no providers, no keys, no spend. Independent of PR #11 (delivery); both branch from main 2be8547 and touch different files. Migration 13 sorts after delivery's 12 and depends on main 01–08 objects only.

## What this builds
Every contact carries a live score (0–100) from signals already in the database, and saved lists (smart segments) gather contacts by score, status, tags and deal activity.

- `supabase/migrations/20261114000013_scoring_lists.sql`
  - `contacts.score`, `score_band` (hot 70+ / warm 40–69 / cold < 40), `score_updated_at`.
  - `scoring_rules`: one row per signal per sub-account — signal, label, points (-100..100), active. 15 default rules seeded for every sub-account (new via trigger, existing via backfill). Signals: profile completeness, status, replies, recent replies, open/won/high-probability deals, done appointments/tasks, 90-day inactivity (-15). Signals stack; total capped at 0–100.
  - `contact_lists`: name + filters JSON (status, tags any/all, source, min_score, band, has_open_deal, has_company). Unknown keys ignored on read; archived contacts never appear.
  - One signal-evaluation function (`private.score_signals`) feeds the score value, the breakdown, and the triggers — no copied logic.
  - Triggers recompute only the affected contact on contact/deal/message/appointment/task changes. The contacts trigger watches signal columns only, so a score write never re-fires it.
  - History guard: `private.log_activity` is replaced with its migration-02 body plus ONE skip guard — score-only contact updates write no History rows. Every other event is unchanged (the suite asserts both).
  - Backfill scores every existing contact once.
  - RLS mirrors the other CRM record tables (members read, writers change, admins delete).
- `src/app/w/[ws]/scoring-actions.ts` — save rules + recalculate, create/edit/delete lists. Writes run as the signed-in person; RLS + the database functions are the guard.
- `src/app/w/[ws]/lists/page.tsx` + `lists/[id]/page.tsx` — list index + create form; member view (via `list_contacts`, paged) + edit filters + admin-only delete.
- `src/app/w/[ws]/scoring/page.tsx` — rule editor (points + on/off) + recalculate-all.
- Contacts page: score chip + band on every row, "Highest score" sort. Contact detail: score card with the matched-signal breakdown + link to the rules. Layout: Lists in the nav.
- `supabase/tests/scoring_lists_features.sql` — suite in the v4_features style (one transaction + rollback): rule seeding, the full score walk (profile → qualified → reply → deal → won → appointment/task = 95), rule deactivation, stale-contact floor, every list filter, isolation, member-delete denial, the History guard, whole-workspace recalculation.

## Verified before this PR
- All 7 TS/TSX files pass a Bun syntax check. SQL brace/paren balanced. Diffs of the 3 modified files reviewed against main.
- NOT verified: SQL has not run against a database; pages have not rendered; no live click-through. See below.

## Still needed before this is live (TEST-ALL)
1. Run `supabase/tests/scoring_lists_features.sql` in the test project.
2. Apply migration 13 in the test project; confirm the 15 rules seed and existing contacts get scores.
3. Click through: Contacts list (chips + sort), contact detail (breakdown), Scoring (edit a rule, recalculate), Lists (create, filter, edit, delete), cross-sub-account isolation.
4. Do not merge until the Owner says OK.

## Deliberate v1 limits (follow-ups, not bugs)
- No plan gating: scoring + lists are available on every plan. Gating (e.g. Growth+) is the Owner's call — add feature keys when decided.
- Lists are smart (computed) only; no hand-maintained/static lists yet.
- No email/SMS opt-out list filters — those columns live in the unmerged delivery migration (PR #11). Add once delivery merges.
- No scheduled or bulk score decay beyond the 90-day signal.


---

