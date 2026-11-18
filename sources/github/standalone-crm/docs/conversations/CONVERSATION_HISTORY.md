# How the system got here — conversation summaries

Summaries only. Raw chat transcripts are not stored in this repository because they contain test
passwords, personal details and keys-in-progress. The originals stay in Sire's Claude account.

## 1. "Multi-client mobile app system" (Oct 12–14, 2026) — Version 1 builds

- Built the Standalone CRM v1 → v2.1: one agency, 75 mock sub-accounts, row-level security, one-command setup.
- Reviewed four uploaded prompt-pack PDFs for ideas; kept Supabase + Vercel; set aside avatar/video ideas.
- Added (v3): looks, team roles, client branding, 10 starter setups, owner numbers, due list, CSV import, outside sign-in.
- Added (v3.1): owner setup by email link, walk-through, hand-off, required two-step, encrypted
  connections vault, Sign in with Vercel, and the **T.H.E.L.M.A. AI Fail Safe**.
- Results: PRs #2 and #3 merged; 92/92 isolation tests; 25/25 live end-to-end checks; Handbook v3.1.

## 2. "Supabase tokens and multi-company setup" (Oct 14, 2026)

- Prepared the sign-in connections file (Google, Microsoft, GitHub + Supabase access token), with the
  rule that real keys are pasted only on Sire's own computer.
- Proposed putting HER (T.H.E.L.M.A.) in every system, a Settings → IT checklist, a model picker for
  outside AI, and **Sealed vs Gated** modes. Awaiting Sire's choice.

## 3. This build session (Oct 14, 2026) — Version 2.0

1. Gap check against public GoHighLevel/Leadstack-style repositories (feature list only) and Sire's Drive.
2. Read the Oct 11 R&D plan (bail-bond SEO + draft-first email agent).
3. Sire listed requirements: T.H.E.L.M.A. gate, email for everyone, 3 addresses per sub-account,
   higher tier for text/FaceTime/Zoom, connectors, owner usage view, locked layout, ads and templates,
   industry kits, websites, courses and communities, payments.
4. Reviewed an unsigned "GoHighLevel Master Blueprint" (used as a checklist only) and GoHighLevel's
   official pricing and homepage.
5. Sire approved the full plan; Claude chose tiers and suggested prices; payments: Stripe, Apple Pay,
   Google Pay, Tap to Pay.
6. Built Version 2.0 (internal "v4.0"): migration 08, 2 Edge Functions, 12 pages, kits, tests
   (54 + 13 new; 92 existing still pass), Manual §12, Drive summary doc.
7. Sire chose the name **T.H.E.L.M.A. CRM Complete — Version 2.0**, the home repository, archiving of
   old versions, T.H.E.L.M.A.'s profile and duties, and Master CEO Dashboard linking.

See `docs/decisions/DECISION_LOG.md` for each decision with its date.
