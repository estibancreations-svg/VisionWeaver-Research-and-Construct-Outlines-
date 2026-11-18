# First-Run Walkthrough — Master System Build Out Live

Do this end-to-end on any new replica before handing it over. (~15 minutes.)

## 1. Sign in (2 min)
- Open the app. Create an account, then sign out and sign back in.
- Confirm: sign-out ends the session server-side (you land on the sign-in
  screen, and the old session is dead).
- Read the sign-in screen's separation statement: local accounts live in this
  app's own database — separate from Supabase and Vercel.

## 2. The ticker (1 min)
- After sign-in, find the monitor strip. The uptime ticker counts from YOUR
  sign-in time. Wait a minute — it should read ~00:01:00, not a canned number.

## 3. Health checks (2 min)
- Open IT & Security (or the monitor page). Run the health checks.
- Expect: backend LIVE, Vercel projects LIVE. If Vercel deployments shows
  DEGRADED with a 403 reason, that is CORRECT behavior — honest, not broken.

## 4. Tour the pages (3 min)
- Walk all 33 pages via nav (Core 10 → Create/Production 10 → Govern 7 →
  folded-in 6). In Demo, every figure says Sample. In Blank, zero figures.

## 5. THELMA proposal → Guild approval (4 min)
- Open the THELMA drawer (AI Co-Pilot). Propose something small.
- Open Directors Guild → queue. Your proposal sits at PENDING.
- Approve it. Confirm it flips to APPROVED and stays approved after reload.

## 6. The publish gate (2 min)
- Try to publish through Gate 2 WITHOUT typing APPROVED → must BLOCK, and
  the attempt is recorded.
- Type the word APPROVED → must RECORD the approval.

## 7. Make something real (1 min)
- Characters / Cast: create a character, set status Locked.
- Worlds: save a world. Hold Queue: create a card, advance Cast → Voice.
- Save Map & Storage: export the workspace JSON. Confirm your rows survived.

## 8. Sign out
- Sign out. Done. If any step above failed, the replica is not ready —
  see ROADMAP.md "Known issue" (auth) before anything else.
