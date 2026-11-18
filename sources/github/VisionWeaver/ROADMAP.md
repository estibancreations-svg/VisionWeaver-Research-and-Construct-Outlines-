# ROADMAP — VisionWeaver

The state of all the work: what's done (with commit references), what's in
progress, and what was missed or comes next. Statuses follow Steve's
verification standard: a settled item is never listed as open; an unverified
item is never listed as done.

Last updated: **October 30, 2026** (the audit + commit day).

---

## Done

- **VisionWeaver 2.0 — built and verified** (Oct 26–27 2026). Unified
  single-file rebuild: Blank + Demo launches, 16 sections incl. Socials
  (canonical 8), KPI & Reports on one data object, Connections (10 systems,
  honest statuses), Save Map, Plans & Tiers, Settings with the v1 sign-in
  replicated exactly. 14/14 render tests passed in both modes at build.
  — commit `a87e505f` — [`visionweaver-2.0/`](visionweaver-2.0/)
- **Feed opened** (Oct 22 2026): charter + master mapping + the first
  conversation record. — commit `956554ea` — [`feed/`](feed/)
- **The production system (the loop) — built, proven, finish-reviewed**
  (Oct 20–23 2026). Cast → voice → animate → assemble → publish with two hard
  gates; assembler caption bug fixed upstream; `crossroads` wiring fixed;
  `prebuilt` mode; Instagram season logic in the publish stage; test job ran
  clean end to end twice at zero credits. Finish review (Oct 22): the loop is
  finished/verified/deploy-ready within its proven scope.
  — commit `dfbe0c81` — [`system/`](system/)
- **v1 archived in-repo** (Oct 30 2026): archive index, Prime system map,
  door-fix plan, issues register, flagship 150× outline — the 2.0 README's
  archive pointer resolves again. (Full 287 MB snapshot stays in the
  workspace / Dropbox hub.) — commit `06f4c66b` —
  [`visionweaver/archive/v1.0-pre-rebuild/`](visionweaver/archive/v1.0-pre-rebuild/)
- **Standing directives recorded** (Oct 20–30 2026): everything through
  VisionWeaver; small decisions delegated; the Completion Gate; the
  verification standard; "give me the windows"; the photorealistic design
  standard; Grand locked; the feed rule; the delivery protocol.
  — [`feed/DECISIONS.md`](feed/DECISIONS.md)
- **Feed completed to date** (Oct 30 2026): Fireside/VisionWeaver thread
  record refreshed (the repo copy was stale), Prime live-audit record,
  Library/system-thread record (Oct 20–30, summary), mapping updated.
  Remaining backfill is named under *Next* — it is owed, not hidden.
  — [`feed/MAPPING.md`](feed/MAPPING.md)
- **Fireside v1 season publishing through the system**: Instagram reels
  eps 1–12 live via the loop's publish stage (Oct 20–21); ad-hoc script
  retired. YouTube eps 1–11 private (Zapier, earlier push).
- **Grand LOCKED** (Oct 22 2026): photorealistic Runway gen4_image still —
  the reference for all future Grand work (Steve: "She perfect."). The
  Explain-beat check piece followed the lock → one-piece → full-run pattern.
- **Prime fully audited** (Oct 23 2026): all 27 routes mapped against actual
  behavior; the verdict and the realign order are on the record.
  — [audit record](feed/conversations/2026-10-23-visionweaver-prime-audit.md)

## In progress

- **Fireside season finish**: IG reels eps 13–28 + 29 + 30 remain queued in
  the loop's season job (18 episodes). The job resumes exactly at ep13;
  Instagram's daily publish limit (429) is the only brake — it stopped the
  Oct 21 runs cleanly, no duplicates. Needs a run order in an open window.
- **Fireside Ep1 v3 — realistic rebuild**: format v3 is locked (Gather →
  Explanation → entire speech → Afterglow); Grand is locked photorealistic;
  the kids (Nadia, Theo, June) and The Room need their photorealistic builds
  at the same standard, then the full run with credits — Steve's workflow is
  lock → one piece → his check → full run. Camera discipline for the run:
  locked-off framing where the wide composition must hold (the check piece
  drifted in).

## Next — the missed work

In the order the audits established:

1. **Prime realign** (from the Oct 23 map, dependency order):
   (1) fix the doors — route rewrites so `/app/*` and `/auth` land in the app
   instead of 404ing, plus the social-buttons decision;
   (2) automatic workspace creation on sign-up (today a new subscriber lands
   in the empty Live-mode shell);
   (3) one engine end to end (Runway via Create & Produce, with real
   upload/storage/audit ledger);
   (4) deposit (upload) spaces; (5) exits (download/export);
   (6) THELMA for real; (7) small-stuff sweep; (8) commerce last.
2. **Prime integrations**: 0 of 18 fully verified (3 partial: Supabase,
   Vercel, GitHub). The verified count rises only by testing each one — it is
   never rounded up.
3. **Prime workspace setup completion** — flagged incomplete in the Oct 21
   overnight record; still open.
4. **VisionWeaver 2.0 hosting**: the Oct 26 Vercel deploy was refused (the
   connector token lacked team write access) and no live 2.0 URL exists.
   Fix: grant/fix the Vercel access, deploy 2.0, and wire its data beyond
   browser localStorage when Steve calls for it.
5. **Crossroads Ep1 Part 2 keyframes**: the overnight Drive sweep found zero
   files with "keyframe" in the name; the earlier "5/15 present" figure could
   not be confirmed. If they exist, they sit under descriptive names inside
   the series folders. Once located/supplied and all 15 are in hand, the
   standing ≈1,200-credit animation authorization can fire. Until then the
   batch stays unfired by design.
6. **Ep1 v3 assemble-stage reliability**: the loop's assembler timed out at
   the 1800s cap on the long v3 timeline (Oct 21). Same-day mitigation:
   the loop's assemble timeout was raised to 7200s and pre-caption masters
   survived every run; the root-cause fix (segmented assembly for long
   episodes) belongs with the realistic rebuild in *In progress*.
7. **Feed backfill remainder**: the Oct 22 rule spans Oct 15 → today. Still
   owed (never staged as records): the main-chat threads (including the
   VisionWeaver 2.0 build, Oct 26–27), the CEO Dashboard chat, the
   drop-section chat, the C-Suite work, the Crossroads production
   conversations, GrantOS, and the PayPal AI Hackathon setup chat
   (Oct 27–28). Added conversation by conversation.
8. **Fresh-account walk** (Prime): never run — it needs Steve to set the
   +vwtest test-account password through the secure capture page (his step
   only; stood down Oct 23, not chased).

## Held — by Steve's decision

- **Hold Queue source — NOT in this repo.** Its push came up for approval on
  Oct 30 2026 and Steve declined it; he confirmed the same day that the
  decline covered the Hold Queue only. It is recorded here so the decision is
  visible — the source stays in the workspace, and it is not pushed,
  re-staged, or re-asked.
