# T.H.E.L.M.A. CRM Complete — Version 2.0

**T.H.E.L.M.A.** = Trusted Hub for Engagement, Leads, Marketing & Automation. Formerly "Standalone CRM"
(Version 1, retired — see `docs/archive/`). **Assigned to deploy this? Start with `START_HERE.md`.**

A self-contained CRM where **one agency runs up to 75 client sub-accounts**, each with its own
section and its own logins (v3.1: owner email-link setup, hand-off, T.H.E.L.M.A. AI Fail Safe,
required two-step, encrypted connections vault). **Version 2.0** adds plans and suggested pricing,
3 business email addresses per sub-account, a unified inbox with team chat, app connectors,
advertising and social planning with a compliance check, industry kits (bail bonds, insurance,
financial first), websites, calendar, courses and community, invoices and Stripe payments, the
T.H.E.L.M.A. approval gate and owner usage tracking — see `DEPLOYMENT_HANDBOOK.md` §12. It installs on a phone like an app (PWA) and runs on
**Next.js 16 + Supabase + Vercel**, styled in the "Sculpted Paper" palette (soft gray paper,
mustard gold, walnut brown).

| | |
|---|---|
| Live test run | https://standalone-crm-estibancreations101.vercel.app |
| Owner | seniorestibancreations@gmail.com |
| Health check | https://standalone-crm-nine.vercel.app/api/health |
| Figma | https://www.figma.com/design/kv3r9nGw6cETcM95M5gaXk |
| Supabase | project `standalone-crm-test` (ref `csxtrhwzswluismrayen`) |
| Vercel | project `standalone-crm` (team Estibancreations) |

All client data in the test run is **mock data**. Passwords are never stored in this repo.

## Start here
0. `START_HERE.md` — reading order and the Version 2.0 deploy checklist.
1. `DEPLOYMENT_HANDBOOK.md` — the full rebuild/deploy guide (Model A shared test run, Model B
   separate paid Supabase project per client = **primary for production**).
2. `docs/HOW_TO_GUIDE.md` — plain-language guide for owners and clients.
3. `docs/AI_HANDOFF_PROMPT.md` — paste-ready instructions for any AI build assistant.
4. `docs/INTEGRATIONS.md`, `docs/MOCK_DATA.md`, `docs/DESIGN_SYSTEM.md`,
   `docs/VERIFICATION_REPORT.md`, `docs/BUILD_BLUEPRINT.md`.

## Set it up (out of the box)
```bash
bash scripts/setup-test-run.sh     # Model A: test run with 75 mock sub-accounts
bash scripts/provision-client.sh   # Model B: one real client per paid Supabase project
bash scripts/backup.sh             # backups
```
Full steps: `DEPLOYMENT_HANDBOOK.md` §4–7.

## Local development
```bash
cp .env.example .env.local   # fill in URL + publishable key (never the service-role key)
npm install
npm run dev
npm run verify               # lint + typecheck + tests
```

## Layout
- `src/` — app (agency area, `w/[ws]` sub-account area, auth, PWA)
- `supabase/migrations` — schema, RLS, RPCs (01–04 required, 05 optional, 06 = v3, 07 = v3.1, 08 = Version 2.0)
- `supabase/functions/` — `manage-logins`, `account`, `setup-owner`, `handoff`, `connections`, `thelma-gateway`, `payments` (the only code that holds the service-role key)
- `supabase/templates` — sign-in link, reset and email-change emails
- `supabase/seed` — 75 mock sub-accounts · `supabase/tests` — RLS isolation suite + Version 2.0 feature suite
- `ci/` — GitHub Actions templates (move to `.github/workflows/` to enable)
