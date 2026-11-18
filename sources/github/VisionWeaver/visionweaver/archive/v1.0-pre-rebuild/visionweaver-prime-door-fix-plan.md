# VisionWeaver Prime — Door-fix plan (step 1 of the realign order)

Prepared Saturday, Oct 24 2026, from the Oct 23 live audit. No live site change
has been made. This is step 1 only — it does not touch accounts, engines,
uploads, publishing, or payments. Those stay later in the realign order.

## The three defects (all from the Oct 23 audit)

1. **Dead shared address.** `estibancreations101.vercel.app` — the address in the
   October screenshots — returns DEPLOYMENT_NOT_FOUND. Anyone holding it thinks
   the product does not exist.
2. **Documented routes 404.** The build's own contracts point at `/app/*` and
   `/auth`. Both return Vercel 404s. Sign-in actually lives in a dialog on the
   home page, and the app itself uses hash routing.
3. **Social sign-in is decorative.** Google / Apple / Microsoft buttons render
   with "single sign-on is not turned on yet."

## The one good door

`visionweaver-prime.vercel.app` — public, loads the app, no Vercel login.
Every shared link should point here until the route fix lands.

## Fix steps, in order

1. **Inventory where the dead address lives** — screenshots, docs, feed records,
   and any post/share copy that still carries `estibancreations101.vercel.app`.
   Swap each to `visionweaver-prime.vercel.app`. (Scope unknown until the
   inventory runs; that inventory is the first work, not a guess.)
2. **Make `/app/*` and `/auth` resolve** — Vercel rewrites to the hash app, or
   real routes, so the system's own contracts stop 404ing. Verify by opening
   both paths fresh (signed out) and confirming they land in the app, not a 404.
3. **Social buttons — one decision, then one fix:**
   - (a) Turn social sign-in on for real, or
   - (b) Remove the buttons / their labels until it is on.
   Leaving them rendered-but-dead is the current defect; either (a) or (b)
   closes it.

## Verification before this step is called done

- Dead address opened → no longer the first thing a holder of the old link sees
  (replaced everywhere the inventory found it).
- `/auth` and a sample `/app/*` path opened signed-out → app, not 404.
- Social buttons either work or are gone — nothing rendered that claims a
  sign-in method that is not turned on.
- Re-check: nothing else on the live site changed (no accounts, engines, or
  content touched).

## Cost and gates

- No render spend, no publishing, no account creation. Code/config work only.
- The fresh-account walk (the +vwtest test account) is still a separate,
  optional step — it is NOT needed for the door fix, and it is NOT a blocker
  for it.
- Next realign step after doors: give a new account a floor (automatic
  workspace creation on sign-up), then one Runway engine end to end.

## Verified-ready alongside this (checked Oct 24, ~9:46 AM Chicago)

- Fireside Ep1 photorealistic master still intact: 17:05 (1,025.4s), 270 MB,
  `goals/fireside-series-production/files/fireside-video/ep01-v3-realistic.mp4`.
  Its publish gate still waits on Steve's QC — unchanged, not re-asked here.
- Audit feed record still staged:
  `workspace/github-feed-staging/feed/conversations/2026-10-23-visionweaver-prime-audit.md`.
  Its push tap was already messaged to Steve on Oct 24 ~2:58 AM — not re-asked here.
- Calendar for Oct 24–31 could not be checked: the device calendar cache
  returned coverage unavailable / 0 events, which proves nothing about his week.
