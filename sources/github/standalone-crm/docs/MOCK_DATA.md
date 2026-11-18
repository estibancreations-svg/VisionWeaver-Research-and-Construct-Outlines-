# Mock Data (Test Run)

All names, emails and phone numbers are invented. Emails use `@crm-demo.test` / `@example.com`.

| What | Count | Notes |
|---|---|---|
| Agency | 1 | "Demo Agency" — owners: seniorestibancreations@gmail.com (primary), estibancreations@gmail.com |
| Sub-accounts | **75** | Names like *Golden Bloom*, *Silver Roasters*; 10 industries; 5 accent colors |
| Sub-account logins | 75 | `client01@crm-demo.test` … `client75@crm-demo.test`, role **admin** of their own sub-account |
| Companies | 300 | 4 per sub-account |
| Contacts | 750 | 10 per sub-account (lead / qualified / customer / inactive) |
| Deals | 450 | 6 per sub-account across 5 stages; some won/lost |
| Tasks | 450 | 6 per sub-account; some overdue, some due today |
| Notes | 300 | 4 per sub-account |
| Audit rows | ~2,300 | Written automatically by triggers |

Counts were verified on the live project with SQL after seeding (75 / 75 / 750 / 300 / 450 / 450 / 300).

## Re-create or reset

- Easiest: `bash scripts/setup-test-run.sh` (loads the seed for you).
- Seed script: `supabase/seed/mock_75_subaccounts.sql` (stops safely if "Demo Agency" exists).
- Production projects use `supabase/seed/create_owner.sql` instead (owner + empty agency, no mock data).
- The test password is set at run time with `set_config('seed.demo_password', …)` and is never committed.
- To start over on a test project, delete the "Demo Agency" row (cascades to its sub-accounts) and the
  `@crm-demo.test` users in Supabase → Authentication, then re-run the seed.

## Sub-account → login map (first 10)

| # | Login | # | Login |
|---|---|---|---|
| 1 | client01@crm-demo.test | 6 | client06@crm-demo.test |
| 2 | client02@crm-demo.test | 7 | client07@crm-demo.test |
| 3 | client03@crm-demo.test | 8 | client08@crm-demo.test |
| 4 | client04@crm-demo.test | 9 | client09@crm-demo.test |
| 5 | client05@crm-demo.test | 10 | client10@crm-demo.test |

The pattern continues to `client75`. Each login opens exactly one sub-account (sorted by creation order).
