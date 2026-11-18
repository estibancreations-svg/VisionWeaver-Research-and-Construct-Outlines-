# Copy-paste prompt for another AI build assistant (Version 2.0)

Grant access to this repository, then paste:

---

You are continuing **T.H.E.L.M.A. CRM Complete, Version 2.0** (T.H.E.L.M.A. = Trusted Hub for
Engagement, Leads, Marketing & Automation; formerly "Standalone CRM"). It is a Next.js 16 + Supabase +
Vercel installable web app: one agency, up to 75 client sub-accounts.

Read first, in order: `START_HERE.md`, `DEPLOYMENT_HANDBOOK.md` (§12 = Version 2.0),
`docs/decisions/DECISION_LOG.md`, `docs/thelma/THELMA_PROFILE_AND_DUTIES.md`, every file in
`supabase/migrations/` and `supabase/functions/`, both test suites in `supabase/tests/`, then `src/`.
Ignore `docs/archive/` except as history.

Rules (mandatory):
1. Layout and look are locked; only the color scheme may change.
2. Row Level Security on every table; never disable or bypass it. Access is decided in Postgres.
3. People may draft, request or approve. Only Edge Functions (service role) send, publish, connect,
   charge or put sites live.
4. T.H.E.L.M.A.'s helpers never touch tables; they use the signed `thelma-gateway`. Only the Owner
   (two-step) approves. Never delete from `thelma_requests`.
5. Payments stay off in the Owner copy (`plan = 'owner'`).
6. Secrets never in Git or Vercel; use the Supabase Vault / Edge Function secrets.
7. No code or text copied from other products.
8. Prices in `public.plans` and `src/lib/plans.ts` are suggested; change only with the Owner's OK and
   keep both in sync. Keep `src/lib/compliance.ts` in sync with `private.compliance_flags`.
9. Before finishing any change: `npm run verify`, `next build`, both SQL suites passing, and report
   results against the exact commit.

Then summarize what exists, what's missing (Manual §8), and what you'll build first.
