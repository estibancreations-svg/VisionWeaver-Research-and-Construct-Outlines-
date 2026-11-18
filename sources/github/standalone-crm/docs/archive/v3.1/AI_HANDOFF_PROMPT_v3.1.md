> **RETIRED — kept for the record only. Do not deploy from this file.** Current system: T.H.E.L.M.A. CRM Complete, Version 2.0 — see `/START_HERE.md`.

# Copy-paste prompt for another AI build assistant (v3.1)

Attach the build-kit ZIP (or grant access to the GitHub repo) and `DEPLOYMENT_HANDBOOK.md`, then paste:

---

You are continuing the **Standalone CRM** — a Next.js 16 + Supabase + Vercel installable mobile web
app with an agency → up to 75 sub-accounts model. Read `DEPLOYMENT_HANDBOOK.md`,
`docs/INTEGRATIONS.md`, every migration in `supabase/migrations/`, every Edge Function in
`supabase/functions/`, `supabase/tests/rls_isolation.sql` and `src/` before acting.

Rules (mandatory):
1. Product boundary: client records live only in this CRM's Supabase database. Outside sign-in
   (Google, Microsoft, GitHub, Vercel, Apple, phone) is for proving identity only. Other tools' keys
   in the connections vault are **stored only** — no external CRMs, marketing email/SMS, payments,
   webhooks or AI agents may read or write CRM data. Figma/Drive are for design/docs only.
2. Never disable RLS. Never put a service-role/secret key in Vercel, browser code, Git, logs or chat.
   Never ask the owner to paste credentials into chat. Keys go through the Connections upload or the
   Git-ignored `scripts/auth.env`.
3. Before creating anything billable (Supabase Pro, Apple Developer, Twilio, paid SMTP), show current
   pricing and get explicit approval. Apple and phone sign-in stay off until an administrator activates them.
4. Keep the installer as a **visible** backup admin protected by the T.H.E.L.M.A. AI Fail Safe. Never
   add a way to remove the backup admin without their release code.
5. Two-step sign-in stays required for the Owner, agency admins and the backup admin.
6. Do not modify the owner's other projects (e.g., "Master Dashboard", "MASTER_CEO_DASHBOARD").
7. Use only synthetic data in test environments.

Task — choose the model the owner asks for:
- **Test run (Model A):** one Supabase project + one Vercel project (3 env vars), then
  `bash scripts/setup-test-run.sh`. Confirm `/api/health`, run the isolation suite (92 checks) and
  the browser tests in `tests/e2e/`.
- **Production (Model B, primary):** per client, a paid Supabase project + Vercel project/domain, then
  `bash scripts/provision-client.sh` → answer `link` and give the Executive Owner email. Add an email
  sender, enable backups (PITR or `scripts/backup.sh`), and verify the walk-through end to end.

Report back: live URL, repo + commit SHA, Vercel deployment status, Supabase project ref(s) only,
test results (unit, isolation, end-to-end counts), env var names configured, backup notes, and
remaining limitations. Do not call anything "live" until the checks pass against the exact deployed commit.

---
