Original name: OLD — PRIVATE — Standalone CRM Owner Guide v1 (superseded by v3.1)
Drive ID: 1pjt903DSvQeWVQt8jYd5wX7HclCsB6QFalzkCyZuqjM
Parent folder: _no-parent/
Modified: 2026-10-14T13:20:58.263Z

# PRIVATE — Standalone CRM Owner Guide
Keep this file private. Do not share the folder publicly. It holds the test password.
## Open the app
- Live app: https://standalone-crm-nine.vercel.app (also https://standalone-crm-estibancreations101.vercel.app)
- On iPhone: Safari → Share → Add to Home Screen. On Android: Chrome → ⋮ → Install app.
## Test logins (mock data only)
| Who | Email | Password |
| You (agency owner — sees all 75) | estibancreations@gmail.com | Sculpt-xsGNBS4W-75 |
| Client sub-accounts (each sees only its own) | client01@crm-demo.test … client75@crm-demo.test | Sculpt-xsGNBS4W-75 |


Example: client01 = Golden Bloom, client02 = Silver Roasters.

Change your own password after your first sign-in: Account → Change password. To change a client's password: open that client → More (Settings) → Reset a password.
## Links
- GitHub (code, private): https://github.com/estibancreations-svg/standalone-crm
- Vercel project: standalone-crm (team Estibancreations)
- Supabase project: standalone-crm-test (ref csxtrhwzswluismrayen) — https://supabase.com/dashboard/project/csxtrhwzswluismrayen
- Figma designs: https://www.figma.com/design/kv3r9nGw6cETcM95M5gaXk
## 3 things left for you (5 minutes each)
- Supabase → Authentication → URL Configuration: Site URL = https://standalone-crm-nine.vercel.app ; Redirect URLs = https://standalone-crm-nine.vercel.app/auth/confirm and http://localhost:3000/auth/confirm. (Needed for "forgot password" emails.)
- GitHub: move the two files in ci/github-workflows/ into .github/workflows/ to turn on automatic checks.
- Before real data: move to a paid Supabase plan with backups (Model B in the handbook).
## Note
"Master Dashboard" Supabase project was paused (not deleted) to free a free-plan slot. To bring it back: Supabase dashboard → Master Dashboard → Restore project (you may need to pause another project or upgrade to Pro first).

The full handbook is in this folder and in the GitHub repo (DEPLOYMENT_HANDBOOK.md).
