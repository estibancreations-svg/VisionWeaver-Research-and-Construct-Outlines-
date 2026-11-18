# Production separation, backups, security follow-up (DRAFT runbook — Owner decisions required, no provisioning done)

## Current state (verified 2026-10-17)

- Public deployment still points at Supabase `standalone-crm-test` (ref csxtrhwzswluismrayen), populated with mock records (75 mock sub-accounts).
- No separate CRM production Supabase project found in connected account.
- Backup scripts exist (scripts/backup.sh, provision-client.sh, setup-test-run.sh) but NO completed restore-drill evidence found.
- Supabase Advisor warnings (from Oct 17 review, not re-verified in this pass): leaked-password protection DISABLED; several callable privileged DB functions requiring review. All listed public CRM tables have RLS enabled. Warnings are NOT proof of exploit.

## Decisions Owner must make (do NOT provision until answered)

1. Production Supabase project: create new project (name, region, plan — paid plan likely required for leaked-password protection + PITR/backups)? Who pays / which billing account?
2. Cutover model: Model B (one paid Supabase project per client = handbook PRIMARY) vs single prod project with 75 workspaces? Handbook says Model B is primary for real customer data. Confirm which model the first prod customer uses.
3. Mock data: prod project starts EMPTY (no mock seed). Confirm: no mock seed in prod, ever.
4. Backup schedule + retention: daily? PITR enabled? Where are backup artifacts stored, who can restore?
5. Restore drill: schedule first drill (restore to a throwaway project, verify login + one workspace + RLS still enforced), record date + evidence file. No drill = not done.

## Security follow-up checklist (assessment, not just toggling)

- [ ] Leaked-password protection: check Supabase Auth → Policies. If paid plan required, record plan decision. Enable + test with a known-leaked test password (do NOT use a real user password).
- [ ] Privileged functions: list every SECURITY DEFINER function + its GRANTs. For each: who can call (anon / authenticated / service_role), what authorization check inside the function, what negative test proves a non-authorized caller is denied. Handbook §3.3 already lists expected intentional functions (bootstrap_agency, create_workspace, my_workspace_role, my_default_theme, save_connections, remove_connection, set_paid_signin, signin_options, backup_release_codes with RLS on + no policies). Re-verify that list against LIVE schema — do not trust handbook alone.
- [ ] RLS: verify RLS enabled on ALL public tables in LIVE prod project after provisioning (not just test project). Record query + output.
- [ ] Service-role key: exists ONLY in Edge Functions. Verify no service-role key in Vercel env, Git, or browser bundle (CI secret-scan covers bundle).
- [ ] Secrets rotation: if any key was ever in a repo that was public (START_HERE notes repo was public Oct 14), rotate + record rotation date. Do NOT list key values.

## Restore-drill template (to fill after first drill)

- Date:
- Source backup (timestamp / method):
- Restore target (throwaway project ref):
- Checks: login works / one workspace visible / cross-workspace denied / RLS on / Edge Functions respond
- Result: PASS / FAIL + notes
- Evidence file:
