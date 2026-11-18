# START HERE — T.H.E.L.M.A. CRM Complete (Version 2.0)

**T.H.E.L.M.A.** = **T**rusted **H**ub for **E**ngagement, **L**eads, **M**arketing & **A**utomation.
Owner and approver: **Sire** (seniorestibancreations@gmail.com). Formerly "Standalone CRM" (Version 1, retired).

You've been assigned to explain or deploy this system. This page tells you what to read, in what
order, and what "done" looks like. Think of it like the front desk of a building: it points you to
the right room before you start opening doors.

## 1. What this is (one paragraph)

One **agency** runs up to **75 client businesses** (sub-accounts) from one installable phone/desktop
web app. Each business is walled off from the others by the database itself. Version 2.0 adds plans
and suggested pricing, 3 business email addresses per client, an inbox with team chat, app
connectors, marketing with a compliance check, industry kits (bail bonds, insurance, financial),
websites, calendar, courses and community, invoices and Stripe payments, owner usage tracking, and the
**T.H.E.L.M.A. approval gate** — AI helpers can only *ask*; the Owner approves.

## 2. Read in this order

| # | File | Why |
|---|---|---|
| 1 | `START_HERE.md` (this file) | Orientation and the deploy checklist |
| 2 | `DEPLOYMENT_HANDBOOK.md` (the Deployment Manual) | The full manual; §12 is everything new in Version 2.0 |
| 3 | `docs/HOW_TO_GUIDE.md` | Plain-language walk-throughs for owners and clients (§13–22 are new) |
| 4 | `docs/thelma/THELMA_PROFILE_AND_DUTIES.md` | Who T.H.E.L.M.A. is, her duties and her limits |
| 5 | `docs/decisions/DECISION_LOG.md` | Every decision the Owner made, with dates — don't undo these without asking |
| 6 | `docs/research/` | Competitor review, pricing, provider facts, the bail-bond R&D plan |
| 7 | `docs/VERCEL_CLEANUP.md` | How to move everyone onto Version 2.0 and retire old web addresses |
| 8 | `docs/conversations/CONVERSATION_HISTORY.md` | How the system got here, in summary |
| — | `docs/archive/` | **Retired** Version 1 manuals. Read-only. Never deploy from them. |

## 3. Ground rules (non-negotiable)

1. **Layout and look are locked.** Only the color scheme can be changed by users.
2. **Never disable Row Level Security** or work around it. Cross-client data appearing = stop everything.
3. **Secrets never go in Git or in Vercel.** Keys live in the Supabase Vault or Edge Function secrets.
4. **People draft, request or approve; only Edge Functions send, publish, connect, charge or go live.**
5. **T.H.E.L.M.A.'s helpers never touch tables directly.** They use the signed `thelma-gateway`; only the Owner
   approves, with two-step sign-in on. See `docs/OPERATING_POLICY.md` for the single Leadstack delegated-write exception (internal CRUD only, delegated + scoped + AAL2 + audited; external effects always via approval queue).
6. **Payments stay off in the Owner's own copy.**
7. **No one else's code.** Public projects were studied for a feature list only.
8. **Prices are suggested** until the Owner signs off.

## 4. Deploy checklist (Version 2.0)

- [ ] Repository is **private** (it was public on Oct 14, 2026 — confirm in GitHub → Settings).
- [ ] Read Manual §12.9 and §7 (production model).
- [ ] Apply database migrations 01–08 (main includes through `20261014000008_v4_platform.sql`; run `scripts/setup-test-run.sh` / `scripts/provision-client.sh` — they apply them, deploy Edge Functions and run test suites). Version 2.1 adds migrations 09–11 (PR #5, NOT merged).
- [ ] Set Supabase Edge Function secret `THELMA_GATEWAY_SECRET` (32+ random characters). For a client
      copy that takes payments: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`.
- [x] Deploy on Vercel. **Version 2.0 production deployment `dpl_64gtDrsxgA1d72bV85Xq1y4CWqjZ` (main `609ca86`) is READY** (verified 2026-10-17). The old "has not yet passed the build gate" note is retired. CI (GitHub Actions) is still being activated — see `docs/CI_ACTIVATION_NOTE.md` and PR #6. Do not treat Vercel Ready alone as DB/RLS gate evidence.
- [ ] Both SQL suites end with "PASSED": `supabase/tests/rls_isolation.sql` (92 checks) and
      `supabase/tests/v4_features.sql` (54 checks).
- [ ] `/api/health` says `"status":"ok"`.
- [ ] Follow `docs/VERCEL_CLEANUP.md` so old web addresses point to Version 2.0 (Owner approves deletions).
- [ ] Regenerate `src/lib/database.types.ts` from the live schema.
- [ ] Owner walks through `docs/HOW_TO_GUIDE.md` §13–22 on a phone and on a computer.

## 5. Who to ask

Anything that changes pricing, deletes data or old deployments, turns on payments, or changes what
T.H.E.L.M.A. may do: **ask Sire first.**
