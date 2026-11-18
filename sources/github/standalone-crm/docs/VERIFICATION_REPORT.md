# Verification Report — v3.1

**Date:** October 13, 2026 · **Deployed commit:** `bdb035656ecd17fd80466e98e3e7408a9a6560f8`
(production deployment `dpl_FMr919e3uuxYafBhMQSY8woFWeq6`, state READY) · PR #2

## 1. Build gate (Vercel, every deploy)

`npm run vercel-build` = `npm run verify` (ESLint ✔ · `tsc --noEmit` ✔ · Vitest ✔) → `next build` ✔.
33 unit tests in 5 files: connections-file parser (JSON, Markdown, text; refuses website
passwords), CSV export safety, CSV import, formatting helpers, form validation.

## 2. Database isolation suite (`supabase/tests/rls_isolation.sql`) — 92 / 92

Ran on local PostgreSQL 16 with a Supabase stand-in (auth, two-step factors, Vault) inside one
rolled-back transaction. On top of the v2/v3 checks (agencies can't see or touch each other, client
logins stay in their own sub-account, viewers read only, assistants can't manage, history can't be
rewritten, the 75 cap holds, CSV import is scoped), v3.1 adds:

- Backup admin opens every sub-account of **its** agency only.
- An owner with two-step on **loses all access** without the code (aal1) and gets it back with it (aal2).
- Connections: only masked hints are visible; nobody signed in can read Vault, the secret table or the
  service-only key reader, or write the table directly; assistants, other agencies, client logins and
  signed-out visitors are all denied; removing a connection destroys its key.
- Hand-off: the wrong person can't accept; the swap leaves exactly one Owner; it can't be accepted twice.
- Fail safe: release codes are unreadable even by the Owner; the backup admin can't be deleted directly.

Live project: RLS is on for all 16 public tables. All v3.1 migrations (a–g) and 5 Edge Functions are live.

## 3. Live end-to-end, v3.1 — 25 / 25 passed

Real Chromium (Vercel Sandbox) against https://standalone-crm-nine.vercel.app with two synthetic
logins (`e2e-*@e2e-crm.test`) and a test agency:

1. Setup page is locked once an agency exists
2. Login page offers "Email me a sign-in link"
3. Paid options (Apple, phone) are hidden
4. `/auth/session` rejects other websites (403)
5. First sign-in starts with the hand-off step
6. Hand-off saved (email not sent — no SMTP yet, as expected)
7. Two-step is required next
8. The CRM stays locked until two-step is on
9. Installer turned on two-step (real TOTP code)
10. Connections file saved (2 kept)
11. Website password refused with a reason
12. Keys show only the last 4 characters
13. Full keys never reach the page
14. Team page shows the pending hand-off
15. New Owner is asked to accept
16. Then must choose a password
17. Then two-step is required
18. New Owner turned on two-step
19. Team shows the new Owner and the backup admin
20. Owner sees the fail-safe notice
21. A wrong release code is refused
22. Installer must enter the two-step code at sign-in
23. Installer is now backup admin with the fail-safe card
24. Release code created and shown once
25. The right release code removes the backup admin

Cleanup: the test keys were overwritten in Vault, both test logins were locked with scrambled
passwords and the test agency was renamed "(test, disabled)". The final delete was cancelled, so
those rows remain until deleted by hand.

## 4. Earlier live smoke (v2.1, client isolation) — 26 / 26

See `tests/e2e/live-smoke.mjs`.

## 5. Security notes

- Advisor shows only the intentional notes listed in handbook §3.3, plus "leaked password protection" off.
- Only the publishable key is in Vercel; the service-role key exists only in Edge Functions.
- Response headers: X-Frame-Options DENY, nosniff, strict referrer, permissions policy, HSTS.


---

## Addendum — v2.0 / v2.1 / CI (2026-10-17, verified)

- **v2.0 prod:** main `609ca86`, Vercel deployment `dpl_64gtDrsxgA1d72bV85Xq1y4CWqjZ` READY. `/api/health` ok per Oct 17 review (re-verify at release time).
- **v2.1:** PR #5 head `c455752`, preview `dpl_7N81tsMXdYfHyQ6ufT9bsa5K89tW` READY, NOT merged, NOT production-certified. No fresh authenticated end-to-end run on 2026-10-17. See `docs/V2_1_VERIFICATION_CHECKLIST.md` for the full pre-merge gate.
- **CI:** inactive until PR #6 lands (workflow files in `ci/` are not executed by GitHub). Vercel verify runs lint/typecheck/tests before build, but the DB/isolation gate is not automatically protecting every change until CI lands. GitHub App 403 on `.github/workflows/` — manual web-UI add or permission fix required.
- **Lockfiles:** none in `standalone-crm` or `Leadstack-Clone` as of 2026-10-17. `lockfile.yml` will generate `package-lock.json` on first run after CI activation.
- **DOCX / ZIP from earlier chat:** explicitly OUTDATED deployment references — use this repo + this report instead.
- **Operating policy:** `docs/OPERATING_POLICY.md` is now in effect (Owner-approved 2026-10-17). Default = thelma-gateway + Owner approval; Leadstack direct writes only internal CRUD under delegation/scope/AAL2/audit.
