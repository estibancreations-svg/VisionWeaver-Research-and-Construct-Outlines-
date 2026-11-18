# CI workflow files (move these into place once)

The automated build connection could not create files inside `.github/workflows/`
(GitHub requires a special "workflow" permission for that). Move them by hand once:

1. On GitHub, open this repository → **Add file → Create new file**.
2. Name it `.github/workflows/ci.yml` and paste the contents of `ci/github-workflows/ci.yml`. Commit.
3. Repeat for `.github/workflows/lockfile.yml` using `ci/github-workflows/lockfile.yml`.

`ci.yml` runs on every push: lint, typecheck, unit tests, production build, a secret-key scan of the
browser bundle, and the database migration + tenant-isolation (RLS) test suite on a fresh Postgres 17.

`lockfile.yml` creates `package-lock.json` the first time so later installs use exact versions (`npm ci`).

Until these are in place, every Vercel deployment still runs `npm run verify` (lint + typecheck + unit
tests) before building, so a failing check blocks the deploy.
