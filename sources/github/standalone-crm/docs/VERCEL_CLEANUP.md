# Moving everyone onto Version 2.0 (Vercel)

Goal: after Version 2.0 is live, every person who opens the app — by bookmark, home-screen icon or old
link — lands on Version 2.0, and old Version 1 builds can't be opened by the public.

Analogy: when a store moves, you put the new sign on the main door, lock the old side doors, and
only then clear out the old rooms. You don't tear down the old building until the new one is open.

## What exists today (checked October 14, 2026)

| Item | Value |
|---|---|
| Vercel project | `standalone-crm` (team **Estibancreations**, `prj_HCnnZkLkHHMfxFvBmq9aQGgcgO07`) |
| Production web address | `standalone-crm-nine.vercel.app` (the only domain on the project) |
| Team web address | `standalone-crm-estibancreations101.vercel.app` (follows production automatically) |
| Current production build | v3.1 docs commit `ff6209a` (deployment `dpl_BMbQbpgvJRz2YirxZ3w3qzDL7q1g`) |
| Older builds | About 20 earlier deployments (v3, v3.1 branches, some failed or cancelled). Each has its own long `standalone-…-estibancreations101.vercel.app` address. |

Vercel builds **every branch**. The Version 2.0 branch therefore gets a **preview build** — that is
the first real lint/typecheck/test/build check for Version 2.0.

## Order of operations

1. **Database first.** Apply migration 08 to the Supabase project (Manual §12.9). The Version 2.0 app
   expects the new tables; Version 1 keeps working on the new database, so this step is safe to do first.
2. **Preview build passes.** Open the pull request's Vercel preview, fix anything it reports, and click
   through `docs/HOW_TO_GUIDE.md` §13–22 on the preview address.
3. **Merge to `main`.** Vercel promotes it to production; `standalone-crm-nine.vercel.app` and the team
   address now serve Version 2.0.
4. **Phones refresh themselves.** Version 2.0 renamed the offline cache (`thelma-crm-shell-v2`), so
   installed home-screen apps drop the old cached screens on their next visit.
5. **Lock the old doors (Owner approves).** Vercel → project → Settings → **Deployment Protection** →
   turn on protection for preview and older deployments, so old build addresses need a Vercel login.
6. **Clear out old builds (Owner approves, optional).** After Version 2.0 has run cleanly for a few
   days, delete old deployments in Vercel → Deployments. **Keep the last v3.1 production build until
   then** — it is the one-click rollback if Version 2.0 has a problem. Deleting is permanent.
7. **Optional new address.** If you want a name that matches the product (for example
   `thelma-crm.vercel.app` or a custom domain), add it under Settings → Domains and update
   `NEXT_PUBLIC_APP_URL`, the Supabase Site URL and redirect URLs, and every sign-in app's callback.

## Sign-in addresses to update if the web address changes

- Vercel env var `NEXT_PUBLIC_APP_URL`
- Supabase → Authentication → URL Configuration (Site URL + redirect URLs)
- Google / Microsoft / GitHub / Vercel sign-in apps (callback stays `https://<project-ref>.supabase.co/auth/v1/callback`; only the allowed origins change)
- Stripe webhook endpoint (if payments are on): `https://<project-ref>.supabase.co/functions/v1/payments`
