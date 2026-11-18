# VisionWeaver pick-and-pull sheet — 2026-10-28

Built from the four per-system reports delivered 2026-10-28 (with verbatim audios).
Nothing here starts a rebuild. Mark your picks, and the rebuild stays unstarted
until you give the canonical-system decision.

Source reports:
- `files/system-reports/system-1-vw3-master-ceo-dashboard.md` — 25 pages
- `files/system-reports/system-2-visionweaver-2-0.md` — 16 sections
- `files/system-reports/system-3-director-studio.md` — stage pages, versions, OS boards
- `files/system-reports/system-4-visionweaver-prime.md` — 27 pages

## Decision 1 — Which system is the base? (pick ONE)

- [ ] **System 1 — vw3 in MASTER_CEO_DASHBOARD.** 25-page registry, live at
  master-ceo-dashboard.vercel.app. Limit that decides it: the UI only calls the
  backend for list and refresh — no create, save, render, or publish call — and
  it renders hardcoded fallback numbers when empty. Its edge-function backend
  does implement create/save/scene/asset calls the UI never uses.
- [ ] **System 2 — VisionWeaver 2.0.** 16 sections, localStorage-only, JSON
  export. Limit that decides it: no shared backend and no real save path — but
  it is the only build that already encodes your rules in its README.
- [ ] **System 3 — Director Studio v7/v8.** The only build with a real
  stage-gated pipeline — but built for one production only: Crossroads of
  Identity, Book 1, Episode 1. Gates that decide it: key frames approved before
  any video, and APPROVED required before anything goes public.
- [ ] **System 4 — VisionWeaver Prime.** 27 pages, the only UI with real
  Supabase workspace saves — but hardwired to the azoq project, frozen since
  2026-10-12, with its own prime_* schema, no render or publish path.

## Decision 2 — Which Supabase project and schema? (pick ONE)

- [ ] **yqeal** — holds the production tables and edge functions (production_log,
  social_post_queue, social_connections, and others).
- [ ] **azoq** — Prime's hardcoded target, with its own prime_* migrations;
  recorded elsewhere as having no tables as of 2026-09-29 — unverified live.
- [ ] **Neither yet** — inspect both live before choosing; do not write code
  first. The schema choice determines the backend.

## Decision 3 — Did the Oct 26 2.0 build supersede the Oct 22 ruling?

- [ ] Yes — 2.0 superseded vw3 as canonical; vw3 is archived as background.
- [ ] No — it was parallel work to be archived; the Oct 22 vw3 ruling stands.
- [ ] Undecided — keep both standing until the pick-and-pull below settles it.

## Pick-and-pull — pieces worth pulling, whatever the base is

From **2.0** (rules, not its storage):
- [ ] Cost stated before every run, ceiling enforced
- [ ] Publishing only on your APPROVED
- [ ] 7-check preflight + Provider Router cost ceiling (Create and Produce)
- [ ] Masters in the Dropbox hub with receipts; wrong files quarantined, never deleted
- [ ] QC and Edit Studio (edit on the spot) + Hold Queue
- [ ] Socials and Distribution — the canonical eight (YouTube, TikTok, Instagram,
  Facebook, X, Yahoo, Etsy, Amazon and KDP)
- [ ] Save Map and Storage (Dropbox hub of record, Drive Master Folder, retention rules)
- [ ] Plans and Tiers (Starter, Studio, Pro, Flagship) — the tier-based view sets
  you asked to keep from the original design

From **Director Studio** (gates and boards):
- [ ] Guild queue — departments bring finished work, nothing moves until you decide
- [ ] Shot bible (88 shots + inserts) + Locks and maps (camera, face, light, plates, props)
- [ ] Narration booth (25 cues, subtitle cards) + Sound and music (voice lock, sound kit)
- [ ] Credit ledger (every recorded spend + live balance)
- [ ] Rights and provenance — 8 safety checks per part before Gate 2
- [ ] THELMA AI, propose-only, with page tools
- [ ] Board lock chain: Character Detail Specifications Board → 360 View Board
  (32-view master, 16-view state) → Cast Board

From **Prime** (real saves and production pages):
- [ ] Real workspace saves (projects, records, activity log) to a Supabase project
- [ ] Initiatives Kanban (Intake, Planning, Progress, Review, Completed) with audit
- [ ] Media Library with versioning, provenance, rights, and reuse
- [ ] Distribution and Growth — approval-led publication
- [ ] Per-page V1/V2/V3 view selections (Settings)

From **vw3** (registry and backend):
- [ ] The 25-page registry itself, including the tier view sets (V1/V2/V3 per page)
- [ ] The edge-function backend calls it never wires up: create, save character,
  save scene, assets, continuity jobs, provider health checks
- [ ] Kill or label the fallback metrics (42 projects / 86% success) on day one

## Open picks already on file — still waiting on you

- [ ] Season 1 leads to confirm: Speech 2 Okta, Speech 3 Aelune, Speech 7 Okta,
  Speech 8 Okta (coordinator picks; outline named no lead). Speech 6 Aelune was explicit.
- [ ] Script approvals for Speeches 2–8 (only Speech 1 is approved).
- [ ] Speech 6 two lines — intentional or typos? Left exactly as written:
  hook "By 'too small, too old, too late' — define your terms." and story opening
  "with three verdicts, worn like a verdicts are worn".
- [ ] Board picks: Aelune wings keep/remove, body-type letters, transition locks,
  traveller name.
- [ ] "The Thousand-Year Wait" placement: Season 2 opener candidate (draft
  delivered 2026-10-27, not yet approved, packaged, thumbnailed, or recorded).

## Archive rule (your instruction, 2026-10-28)

Everything not picked above is archived for background and information — not
left standing as an alternative system. One canonical system, one save path,
then the rebuild outline from the directives document can proceed.
