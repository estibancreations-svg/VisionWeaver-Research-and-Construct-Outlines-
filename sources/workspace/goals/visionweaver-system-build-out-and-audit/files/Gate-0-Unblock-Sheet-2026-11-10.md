# Gate 0 — Unblock Sheet

Prepared: 2026-11-10 (Tuesday afternoon, Chicago time), after your 10:45 AM message
"I’m at stand still right now" and the Gate 0 answer that followed it.
**Updated 4:29 PM Chicago, 2026-11-10: M3 is now DONE — see below — and
you have already said "Fix it" on the next step, so it is in progress.
The version of this sheet prepared earlier today that still listed M3 as
your step is superseded.**

This is the *how*, not the *what* again. The full record is already in your
hands as `CSUITE_SYSTEM_PACKAGE_2026-11-10.md` (delivered 10:40 AM today).
Nothing below builds, deploys, spends, or changes anything. It is a checklist
only — one item is left for you (M5, after the fix lands), Gate 0 closes,
Phase 1 starts.

## Checklist

- [x] **M3 — Supabase wired in Vercel (DONE 4:18–4:24 PM Chicago today).**
  All four env vars are set in Vercel → project `csuite-command` →
  Settings → Environment Variables, for all environments:
  `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_URL`,
  `SUPABASE_SERVICE_ROLE_KEY` (service key stored as a secret).
  Values came from the Supabase dashboard, project
  `azoqszhhmmkyqztubgem` (Settings → API). Redeploy done: new production
  deployment `2G9hdS4rMZcUqp5yoqFtUi5qGUpx`, READY 4:24 PM Chicago,
  15-second build, same commit `a27dff3`.
  **What M3 did NOT do:** the live app still shows the staged/sample
  banner — "Staged workspace · Sample records · Saved on this browser ·
  External systems unverified" — and still serves its built-in seed data
  (`src/lib/command-data.ts`). Setting the vars was necessary but not
  sufficient: the app code has to be changed to actually call Supabase
  instead of the seed model. That swap is the next step, below.
- [ ] **Next step — restyle + swap the app to live Supabase reads
  (IN PROGRESS — no action from you).**
  At 4:29 PM Chicago today you re-attached your design preference
  (8 screenshots) and said "Fix it": restyle `csuite-command` to match
  the VisionWeaver (vw3) design — dark navy, purple/violet accent,
  hero banner "VisionWeaver — Story. People. Places. Possibilities.",
  the full left nav and right rail — AND wire the data to live
  Supabase. A subagent is doing that work now in
  `estibancreations-svg/csuite-command`: restyle plus replacing the
  seed model (`src/lib/command-data.ts`) with reads from Supabase
  project `azoqszhhmmkyqztubgem` (the 20-table app schema), then a
  Vercel redeploy. The package already notes the seed model is "ready
  to swap to Supabase" (§4) and that `@supabase/supabase-js` is
  installed — but no table-by-table mapping has been verified yet, and
  no database writes are part of this step. The Vercel payment-failed
  banner was already flagged to you in chat today — it did not block
  saving the vars or the redeploy, but it is still worth checking
  before the account is shut down.
- [ ] **M5 — Confirm the canonical SHAs (one line — but wait for the
  fix commit first).**
  The three commits verified 2026-11-10 in the package are:
  - `csuite-command` — `a27dff3` (2026-11-10 14:01 UTC), live deployment
    now `2G9hdS4rMZcUqp5yoqFtUi5qGUpx` (redeployed 4:24 PM Chicago)
  - `MASTER_CEO_DASHBOARD` — `2e2cf9b` (2026-11-10 07:23 UTC)
  - `VisionWeaver` — `5a65179` (2026-11-10 05:37 UTC)
  - Hold the answer until the restyle + live-data fix lands: that fix
    will create a new `csuite-command` commit, and M5 should confirm
    that new commit, not `a27dff3`. Then answer: "Yes, those three are
    canonical" — or name the one that isn't.
- [ ] **M4 — BOY-001 bundle (no action from you until the live-data
  swap is verified).**
  Already on file: Character ID `f4ef5fec-d0ad-4d71-a25a-cc6614eade7b`,
  project ID `0d03dfb3-494d-4c8d-8cf6-2c53343cf065`, generation ID
  `3b49444e-85de-4fe8-b7b1-31e36fc10c56`. Still missing: the assembled
  bundle (per-cell manifest, hashes, save/reload trace, provider
  receipt, QC decision). Coverage set is QC_PENDING, 0/32 slots.
  It needs a live Supabase export once the app is actually reading
  live data — that export is a Phase 1 step, not something to chase today.

## What happens after

Live-data swap verified + M4 exported + M5 confirmed → Gate 0 closes →
Phase 1 starts: verify Supabase ref `azoqszhhmmkyqztubgem` live, apply the
`vw_` schema, register existing properties, seed the open-decisions register.

## What was checked, what was not

- Var names, SHAs, IDs, and the Vercel click path are taken from the
  delivered system package (`CSUITE_SYSTEM_PACKAGE_2026-11-10.md`,
  §§4, 6, 7, 10) — the package and its two sections agree on the four
  var names. The package (§4) also states the app is "fed from typed
  seed model `src/lib/command-data.ts`, ready to swap to Supabase."
- M3 completion and the redeploy were verified in the side chat this
  afternoon: all four vars set in Vercel, new deployment
  `2G9hdS4rMZcUqp5yoqFtUi5qGUpx` READY 4:24 PM Chicago — and the live
  app still shows the staged/sample banner, verified at 4:27 PM Chicago.
- Not verified: which Supabase tables map to which app pages (that
  mapping is the swap work itself), or any deployment after
  `2G9hdS4rMZcUqp5yoqFtUi5qGUpx`. Nothing was built, deployed, or
  written to any database to prepare this sheet. No keys are recorded
  in this sheet.
- Not in this sheet on purpose: housing (paused at your word today),
  the USF Spring/Fall term question (already asked today, awaiting your
  answer — Fall 2027 record not overwritten), and the MM card
  (re-apply Dec 1, reminder already set for that morning).
