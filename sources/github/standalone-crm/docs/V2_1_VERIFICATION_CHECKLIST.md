# Version 2.1 — Verification against exact commit (DRAFT checklist, not a release approval)

PR: estibancreations-svg/standalone-crm #5
Head verified 2026-10-17: c455752f7042df3da4b6f7047cac29e7a924b83b
Branch: thelma-crm-v2.0
Base: main 609ca862d8242e1bf5e40ab4779256059af80e88 (v2.0 prod)
Preview: dpl_7N81tsMXdYfHyQ6ufT9bsa5K89tW READY (target null = preview)
Production: dpl_64gtDrsxgA1d72bV85Xq1y4CWqjZ = main 609ca86 READY (v2.0 still live)

## File-level checks (verified via GitHub read 2026-10-17)

- [x] package.json version 2.1.0 on PR branch (2.0.0 on main)
- [x] New dependency: qrcode ^1.5.4 + @types/qrcode (for Install-your-own-app QR)
- [x] Migrations on PR branch: 09_v2_1_hubs, 10_kits_catalog, 11_ai_suite — absent on main (main ends at 08)
- [x] New test: supabase/tests/v21_features.sql (62 kits, compliance, documents, expenses, IT support, conversations, Ask T.H.E.L.M.A. requests, agency logo, A/B isolation)
- [x] New function dir: supabase/functions/thelma-assist — present on PR branch
- [x] No package-lock.json on PR branch either (still missing — lockfile workflow must generate after CI activation)

## Still required BEFORE merge — do NOT call preview Ready = finished

- [ ] CI green on exact head c455752 (blocked: CI not yet active — needs .github/workflows/ files via manual add or App permission fix)
- [ ] DB suites on fresh Postgres: rls_isolation.sql (92) + v4_features.sql (54) + v21_features.sql (count in file; PR claims 48 checks — recount from file before claiming)
- [ ] Unit tests 16/16 on exact head (PR claim — re-run in CI, do not trust claim alone)
- [ ] Confirm migrations 09-11 already live in Supabase test project AND are additive-only (PR claims v2.0 keeps working — verify by hitting prod health + spot-check v2.0 screens after merge, before announcing)
- [ ] Confirm thelma-assist v2 deployed + ANTHROPIC_API_KEY present/absent state documented (AI answers start only when Owner adds key)
- [ ] Authenticated end-to-end spot-check on PREVIEW (not prod): Home dashboard, Ask T.H.E.L.M.A. read-only + "Ask her to do it" files pending request, documents, expenses, reports, dialer outcome saved, AI Suite limit enforcement
- [ ] Owner explicit OK (PR body: "Do not merge until Sire says OK. Target: Friday 8am Eastern") — target time needs re-confirmation; do not infer it
- [ ] Rollback plan: prod deployment dpl_64gt... is rollback candidate; record how to roll back frontend if v2.1 regresses (DB migrations are additive, frontend rollback = redeploy main)

## Known preview history note

- Intermediate v2.1 commit 3592655 preview dpl_CD6Uf32AMZaopHCVwsHfyAPn1cKd = ERROR. Latest head preview is READY. Do not cite the ERROR as current state, and do not hide it either — it shows preview had a failure mid-branch.
