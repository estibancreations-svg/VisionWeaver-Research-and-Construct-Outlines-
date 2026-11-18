# VisionWeaver — The System

*One entry point, one pipeline, one set of gates. Everything Steve's systems
produce runs through here — nothing is rendered, assembled, or published by
hand from chat. (Standing directive, Steve, Oct 20 2026, 23:34 CDT.)*

## Run it

```sh
cd ~/workspace/visionweaver/loop
python3 run.py jobs/<job>.json            # full run
python3 run.py jobs/<job>.json --dry-run  # plumbing check, zero spend
```

A job is one JSON file in `loop/jobs/`. Every run writes a manifest to
`loop/runs/<job>-<timestamp>.json` — stages, artifacts, task ids, spend.
The manifest is the receipt; if it isn't in the manifest, it didn't happen.
Run status is truthful by construction: `complete` only when every stage
finished, `partial` when a stage stopped early (e.g. a platform limit),
`staged` when the publish gate held, `gate-stop` when a gate refused.

## The pipeline

| Stage | What it does | Tool |
|---|---|---|
| cast | Resolves each character's lock: voice from the locked library + look ref must exist on disk | job file |
| voice | Verifies provided audio, or renders TTS cues | `/opt/hatch/bin/tts` (locked voice library only) |
| animate | Image-to-video per shot, idempotent (existing clips are reused, never re-rendered) | Runway Gen-4.5 via `custom.runway` connector — 60 credits per 5s shot |
| assemble | `still` (cover + audio) · `crossroads` (EDL multi-shot via the Crossroads assembler — single encode, captions burn inside the filter graph; finished masters newer than their EDL are reused, never re-encoded) · `prebuilt` (verify finished masters exist) | ffmpeg + `assemble.py` |
| publish | Default: stages an upload packet (`runs/<job>.publish.json`) for the Publisher (Zapier → YouTube). Job with `publish_target: "instagram"`: executes the season run directly via instagram-cli | instagram-cli / packet |

## The gates (hard stops — they do not bend)

1. **characters-approved** — every character in a job must carry
   `approved: true` (look + voice locked) before anything renders.
2. **approved-for-publish** — the publish stage only executes when the job
   carries `approved_for_publish: true`. Without it the loop stages
   everything and stops. Nothing posts, ever, without this flag.
3. **Instagram 429 = full stop** — a daily-publish-limit response halts all
   Instagram calls for the run; progress is recorded in the shared
   done-file (`~/workspace/fireside/ig-season-done.txt`) so a resume never
   double-posts.

## The face of the system

The **Hold Queue** (`visionweaver-hold-queue`) is Steve's review surface:
job cards, questions before the preview, Run / Approve / Upload, cost per
stage. The loop is the engine behind it. Chat produces specs, casts, and
job files only.

## Jobs on the shelf

| Job | State |
|---|---|
| `fireside-ep01-looptest.json` | The end-to-end proof job. Runs clean (all 5 stages), reuses its artifacts, 0 credits. Re-verified Oct 22 2026 — manifest `runs/fireside-ep01-looptest-20261023-014327.json`, status `complete`. |
| `fireside-ig-season.json` | Fireside Instagram season finish, **eps 11–30 inclusive** through the publish stage. Ep 29 is INCLUDED: Steve picked **V3** on Oct 21 2026 (15:52 CDT), its staged master already matches v3, no rebuild — that question is settled, not open. First system run Oct 21 posted eps 11–12, then Instagram's daily limit stopped it at ep13 (that run's manifest records status `complete` — the truthfulness bug fixed later that day; a later Oct 21 run records `partial` correctly). Done-file holds eps 03–12; **remaining: eps 13–30 (18 episodes)**. Re-running resumes exactly where it stopped — finished episodes are skipped from the done-file. ⚠️ **Do NOT run while production is paused — a real run posts to Instagram.** |
| `fireside-ep01-v3.json` | Fireside Format v3 proof episode. Cast approved/locked Oct 21 (all 6 characters; sheets built: Grand, Nadia, Theo, June, The Room), voice rendered (20 files), 5 shots animated Oct 21 (**600 credits spent that day**; every later run reuses them at 0). The Oct 21 loop assemble **failed** — two full `-preset medium` re-encodes needed ~47 min–1 h 55 m against a 1,800 s timeout (see Known limits). **Fixed Oct 22 2026**: the system assembled the master end-to-end in 8 m 25 s — manifest `runs/fireside-ep01-v3-20261023-015339.json`, status `staged` (publish gate closed, `approved_for_publish: false`, nothing published). Master: `ep01-v3.mp4` (17:34, captions frame-verified). Re-runs reuse the master. The Oct 21 hand-finished master is preserved as `ep01-v3-20261021-handfinished.mp4`; its 461 MB `.nocap.mp4` intermediate still sits in the same folder (cleanup = Steve's call). Cast note: this master's cast is the illustrated v3 set (banked for the kids' lane Oct 22); the photorealistic main-line reset is a production decision, not part of this job's state. |
| `fireside-kids-ep01.json` | Fireside Kids Ep 1. Assembled (`kids-ep01.mp4` exists); never uploaded. Note the mechanism changed Oct 19: the job file now carries `approved_for_publish: true`, so the hold is **procedural** (production pause / Steve's word), not a flag in the file — a re-run would stage a YouTube packet (the default publish stage never uploads directly). |

## Known limits (truthful state, Oct 22 2026)

- **VisionWeaver Prime** (the deployed web product) is a **separate surface
  and is NOT deploy-ready**. Per its own handoff package, all 18 integrations
  are `NOT VERIFIED` (package `tests/verify_package.py` PASS re-run Oct 22);
  per the Oct 20 drop intake of the live site: **0/18 fully verified, 3
  partial (not named in any local source)**, workspace setup unfinished (no
  active project/pipeline/activity), security specified-not-enforced above
  the database layer, branch protection unset. The full blocker list
  (B1–B14) is in `FINISH-REVIEW.md` §5. The loop in this folder is the
  working production engine; Prime verification is its own track.
- Crossroads Ep 1 Part 2 animation batch does **not** fire until all 15
  keyframes exist. The Oct 19 handoff said 5/15 in Drive, but the Oct 21
  Drive sweep found **zero** keyframe-named files — the keyframes are not
  identifiably in Drive. The ~1,200-credit authorization stands unused.
- **Assembler captions:** the Oct 21 two-pass approach (a workaround for
  ffmpeg rejecting `-vf subtitles=` beside `-filter_complex`) was itself
  the root cause of the Oct 21 Ep1 v3 assemble timeout — two full-length
  `-preset medium` re-encodes (~47 min–1 h 55 m measured) against an
  1,800 s stage timeout; the timeout also orphaned an ffmpeg that kept
  writing for 58 minutes after the run was declared failed. **Fixed
  Oct 22 2026, in the system:** captions now burn as a node *inside* the
  filter graph in a single `veryfast` encode (`assemble.py`); the loop
  kills the whole process group on any timeout (`stages.py`); crossroads
  assemble reuses finished masters; stage timeout is 3,600 s against a
  measured full-episode encode of 8 m 25 s. Receipts: manifest
  `runs/fireside-ep01-v3-20261023-015339.json`, the master's
  `ep01-v3.mp4.ffmpeg.log`, and frame grabs in
  `hidden_review/frames/` (captions + cast verified at 5 timestamps).

*Kept current by whoever runs the loop. If this file and the manifests
disagree, the manifests win.*
