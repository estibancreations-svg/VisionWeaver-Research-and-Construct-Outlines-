# VisionWeaver — Proof Job Run + SYSTEM.md Stale-Claims Audit

*Worker audit, Thu Oct 22 2026 evening CDT (run timestamps 2026-10-23T01:43Z UTC).
Production PAUSED throughout: nothing published/posted/uploaded, no credits spent.
Method: every claim checked against disk — job files in `loop/jobs/`, manifests in
`loop/runs/`, artifacts at their referenced paths. Per SYSTEM.md's own rule:
"if it isn't in the manifest, it didn't happen [through the loop]."*

---

## 1. Proof job — `fireside-ep01-looptest.json`

Pre-flight check (before running): all reuse prerequisites were already on disk —
`loop/runs/ep01-anim.mp4` (2,676,906 B, Oct 19), master
`~/workspace/your_files/fireside-video/ep01-looptest.mp4` (12,446,949 B, Oct 19),
look ref `~/workspace/your_files/fireside-images/ep01.png`, provided audio
`~/workspace/your_files/fireside-audio/ep01-on-the-bank-crisis-fdr-s-first-fireside--solemn-pillar.mp3`.
So the run was guaranteed idempotent / $0 before it was fired. No new animation was
requested or performed.

### Dry run
Command: `cd ~/workspace/visionweaver/loop && python3 run.py jobs/fireside-ep01-looptest.json --dry-run`
- Exit status: **0**
- Manifest: `loop/runs/fireside-ep01-looptest-20261023-014322.json` — status `complete`, `dry_run: true`, all 5 stages `ok`, animate credits 0.
- Caveat (minor, pre-existing): the dry run still (re)writes the publish packet file
  (`stage_publish` in `stages.py` ignores `dry_run` for the default YouTube-packet path).
  It stages a packet only — it does not upload anything.

### Real run
Command: `python3 run.py jobs/fireside-ep01-looptest.json`
- Exit status: **0**
- Manifest written: **`loop/runs/fireside-ep01-looptest-20261023-014327.json`** — status **`complete`**
- Per-stage results (all `ok`):

| Stage | Result | Artifacts produced / reused |
|---|---|---|
| cast | ok | The Radio resolved — voice `avocado_v2:vdc_5723` (solemn-pillar), look_ref `~/workspace/your_files/fireside-images/ep01.png` (exists) |
| voice | ok | Provided audio verified, reused: `~/workspace/your_files/fireside-audio/ep01-on-the-bank-crisis-fdr-s-first-fireside--solemn-pillar.mp3`. No TTS rendered. |
| animate | ok, **credits 0** | Shot `ep01-anim` **reused**: `loop/runs/ep01-anim.mp4`. No Runway call. |
| assemble | ok | Master **reused**: `/home/hatch/workspace/your_files/fireside-video/ep01-looptest.mp4` (mode `still`). No re-encode. |
| publish | ok | Packet (re)staged only: `loop/runs/fireside-ep01-looptest.publish.json` (file = the looptest master, privacy `private`, note "staged for Publisher; upload runs on APPROVED"). **Nothing uploaded/posted.** |

- **Total spend: 0 credits / $0** — as designed. ✅
- Verdict: SYSTEM.md's looptest claim is **TRUE and re-verified today** (previous
  receipts: `…-20261019-211743.json`, `…-20261021-043614.json`, `…-20261021-044549.json`,
  `…-20261021-185713.json`, all `complete`, all credits 0).

---

## 2. Claim-by-claim audit of SYSTEM.md

### A. "Jobs on the shelf" table (4 rows)

| # | SYSTEM.md claim | Verdict | Correct state + evidence |
|---|---|---|---|
| A1 | `fireside-ep01-looptest.json` — "Runs clean (all 5 stages), reuses its artifacts, 0 credits." | ✅ **TRUE** | Re-run Oct 22 CDT: exit 0, manifest `loop/runs/fireside-ep01-looptest-20261023-014327.json`, status `complete`, animate `reused: true`, credits 0, assemble `reused: true`, publish = packet only. See §1. |
| A2a | `fireside-ig-season.json` — "season finish (eps **11–28 + 30**)" | ❌ **WRONG / STALE** | Job file now covers **eps 11–30 inclusive (20 episodes, incl. ep29)**. Evidence: `loop/jobs/fireside-ig-season.json` — `masters[]` and `instagram.episodes[]` both list ep11…ep30 including `ep29.mp4`; job `notes`: "Ep 29 enabled Oct 21 2026: Steve picked V3 … no rebuild was needed." |
| A2b | ig-season — "First system run Oct 21: eps 11–12 posted, then Instagram's daily limit stopped the run at ep13 (**status: partial, by design**)" | ⚠️ **MISLEADING / RETROACTIVELY REWRITTEN** | The posting facts are right, the status label is not what that manifest says. First real run `loop/runs/fireside-ig-season-20261021-043744.json`: posted ep11 (media_fbid `18121991041946392`) + ep12 (`17938577556122399`), `rate_limited_at: ep13` (HTTP 429) — but its top-level `status` is **`complete`** (the truthfulness bug the Overnight Report §6 says was fixed in `run.py` afterwards). A `partial` status only appears in the **later** run `loop/runs/fireside-ig-season-20261021-205817.json` (Oct 21 20:58 UTC: posted [], skipped ep11/ep12, 429 at ep13 again). SYSTEM.md presents the corrected label as if it were the first run's recorded status. |
| A2c | ig-season — "Re-running resumes exactly where it stopped — finished episodes are skipped from the done-file" | ✅ **TRUE (mechanism verified, not re-run — publishing is paused)** | Done-file `~/workspace/fireside/ig-season-done.txt` = ep03,04,05,06,07,08,09,10,11,12 (10 lines; ep03–ep10 predate the loop, from earlier pushes). `stages.py::_ig_publish_season` skips any id in that file and appends on success. Dry-run receipt `loop/runs/fireside-ig-season-20261021-044549.json` shows `skipped_already_live: [ep11, ep12]`. Remaining to post = **eps 13–30 = 18 episodes**. ⚠️ Do NOT re-run this job under the production pause — a real run posts to Instagram. |
| A2d | ig-season — "**Ep 29 excluded — held for Steve's v2/v3 pick**" | ❌ **WRONG / STALE — settled question reported as open** | Steve picked **V3** (job file: "Steve picked V3, Oct 21 2026 15:52 CDT"; approval_basis in same file). Ep29 is **included** in the job, its staged master already matches v3, no rebuild needed. This is exactly the class of error in Steve's Oct 21 verification directive (a settled pick resurfacing as open — the same ep29 v2/v3 item). |
| A3a | `fireside-ep01-v3.json` — "**Gate-stops at characters-approved (Grand/Nadia/Theo/June/The Room character sheets not built yet)** — by design, **zero spend**" | ❌ **WRONG / STALE on every element** | See §3 below — sheets exist, cast is approved/open, the job passed cast+voice and animated 5 shots for **600 credits**, and its current loop state is **assemble FAILED**, not gate-stop. |
| A4 | `fireside-kids-ep01.json` — "Assembled (`kids-ep01.mp4`); YouTube upload held for Steve's go" | ✅ **TRUE in outcome, ⚠️ STALE in mechanism** | Master exists: `~/workspace/your_files/fireside-video/kids-ep01.mp4` (32 MB, Oct 19 21:16). Latest manifest `loop/runs/fireside-kids-ep01-20261019-211743.json`: status `staged`, cast/voice/animate/assemble `ok` (animate + assemble `reused: true`, credits 0), publish `gate-stop` at that time. No upload has happened and no kids publish packet exists in `loop/runs/`. **But** the job file now carries `approved_for_publish: true` (sync note stamped 2026-10-19T23:52:30Z, after that manifest) — so "held" is no longer the job's gate state. A re-run today would not gate-stop; it would stage a YouTube packet (the default publish stage never uploads directly — `stages.py::stage_publish`). The hold is now procedural (pause / Steve's word), not a flag in the file. |

### B. "Known limits" bullets (3)

| # | SYSTEM.md claim | Verdict | Evidence |
|---|---|---|---|
| B1 | **VisionWeaver Prime**: "18 integrations are **0/18 fully verified, 3 partial**; workspace setup unfinished" | ⚠️ **UNVERIFIABLE from disk in `visionweaver/` — consistent with its source doc, no ledger behind it** | The identical figures appear only in `OVERNIGHT-REPORT.md` §4 ("0 of 18 fully verified (3 partial)"). There is **no Prime verification ledger, manifest, or integration checklist anywhere under `~/workspace/visionweaver/`** (full file list checked; `library/` holds canon/inventory docs, none tracking Prime integrations). The claim may be right, but in this folder it is an assertion copied from the overnight report, not a back-traceable record. Per Steve's verification standard it should cite the Prime track's own evidence or be labelled unverified. (Not re-verified here — Prime verification is a separate track, per the bullet itself.) |
| B2 | **Crossroads Ep 1 Part 2**: batch "does not fire until all 15 keyframes exist"; Oct 19 handoff said 5/15 in Drive, Oct 21 Drive sweep found **zero** keyframe-named files; "~1,200-credit authorization stands unused" | ✅ **CONSISTENT with all docs/manifests checked (Drive not re-searched, per task instruction)** | `library/DRIVE-INVENTORY.md` lines 15–19, 444–448, 1172: 'Keyframes'/'keyframe'/'Keyframe'/'KEYFRAME' = **0 hits** in Drive filenames, repeated queries. `OVERNIGHT-REPORT.md` agrees (batch not fired). Loop side: **no Crossroads job file** in `loop/jobs/` and **no Crossroads manifest** in `loop/runs/` — no batch has run through the system, so no credits have been spent through it. Local disk corroborates incompleteness (not Drive, stated as such): `…/crossroads-of-identity-episode-1-production/files/keyframes/` holds only `test-closeup.png` + `test-closeup-720.png`; `files/part2-clips/` holds only `P2-S01_jayden-reads-contract.mp4` (1 of the Part 2 shots). Caveat carried in the inventory itself: keyframes could exist in Drive under descriptive non-"keyframe" names — "zero" means *zero identifiably named*, which is how SYSTEM.md words it. That wording is accurate. |
| B3 | **Assembler caption bug** (ffmpeg `-vf` + `-filter_complex` conflict) "**fixed upstream Oct 21 2026** — captions now burn in a second pass; **verified with a test build, pixel-checked**" | ⚠️ **FIX: TRUE in code. "Verified / pixel-checked": NO retained test artifact on disk — only a written claim; plus stronger indirect production evidence** | Fix is real in code: `~/workspace/goals/crossroads-of-identity-episode-1-production/files/assembler/assemble.py` lines 161–200 — comment "optional caption burn — MUST be a second pass: ffmpeg rejects -vf subtitles= alongside -filter_complex (fixed Oct 21 2026)", pass 1 writes `<output>.nocap.mp4` when captions exist, pass 2 runs `-vf subtitles='…'` and deletes the `.nocap`. File mtime Oct 21 04:36 UTC. **Test evidence:** the only record of the "test build / pixel check" is prose in `OVERNIGHT-REPORT.md` lines 20–25 ("2-shot captioned master, 3,623 bright text pixels in the caption window vs 0 without"). **No test master, frame grab, test manifest, or pixel-count output file was found** in the Crossroads production folder or `visionweaver/` (searched by name + by Oct 21 date) — the receipt was not kept, so the pixel claim is not back-traceable to bytes today. **Indirect production evidence the fix works:** the v3 EDL (`loop/jobs/fireside-ep01-v3-edl.json`, `captions` → `…/fireside-audio/ep01v3-captions.ass`) and a finished captioned master `…/fireside-video/ep01-v3.mp4` (see §3) plus its retained `ep01-v3.mp4.nocap.mp4` intermediate. Nuance: current `assemble.py` *deletes* `.nocap.mp4` after pass 2, yet the `.nocap` file still sits beside the v3 master — so that master's caption pass was not completed by this exact code path end-to-end inside the loop (consistent with §3: no loop manifest records a v3 assemble). |

---

## 3. Deep dive — the v3 row (A3), what actually happened Oct 21

SYSTEM.md (mtime Oct 21 04:46 UTC) was true when written — the gate-stop receipts are
`loop/runs/fireside-ep01-v3-20261020-193934.json` and `…-20261021-044549.json`
("gate characters-approved: not approved -> Grand, Nadia, Theo, June, The Room").
**Everything after that morning contradicts the current SYSTEM.md text:**

1. **Character sheets WERE built** — `~/workspace/goals/fireside-series-production/files/fireside-images/v3/`:
   `nadia-sheet.png` (Oct 21 18:55), `theo-sheet.png` (clean sheet, Oct 21 19:22; labelled v1 kept as `theo-sheet-labeled-v1.png`), `june-sheet.png` (Oct 21 18:56), `room-set.png` (Oct 21 18:56), plus scene stills `scene-gather/explain/listen-wide/listen-close/afterglow.jpg`.
   Grand's look: `…/fireside-images/v3-realistic/grand-proof-01.png` (job file look_ref; later locked Oct 22, copy `grand-LOCKED.png`).
2. **Cast gate OPEN** — `loop/jobs/fireside-ep01-v3.json`: all 6 characters `approved: true`,
   `cast_status: "APPROVED by Steve Oct 21 2026 — cast gate open"`.
3. **Voice rendered** — later manifests show voice `ok` with 20 files; on disk:
   `…/fireside-audio/ep01v3-*.mp3` ×20 (Grand ×10, Radio ×5 = full speech, Nadia ×2, June ×2, + provided ep01 file counted in manifests).
4. **Animate DID run and spend** — manifest `loop/runs/fireside-ep01-v3-20261021-143034.json`
   (Oct 21 19:30 UTC): animate `ok`, **credits 600** (5 shots × 120, 10 s each).
   Shots on disk in `loop/runs/`: `v3-ep01-gather.mp4`, `v3-ep01-explain.mp4`,
   `v3-ep01-listen-wide.mp4`, `v3-ep01-listen-close.mp4`, `v3-ep01-afterglow.mp4`
   (listen-wide + afterglow were re-animated Oct 21 21:17–21:22 after v1 drift versions
   were moved to `loop/runs/rejected/*.v1-drift`). An earlier attempt
   (`…-20261021-142523.json`) failed at animate: Runway rejected the 5.5 MB PNG data URI —
   fixed by switching shot images to `.jpg`.
   So "zero spend" is false for this job's history: **600 credits were spent Oct 21**
   (subsequent runs reused the clips at 0).
5. **Current loop state = assemble FAILED, not gate-stop** — last three loop manifests
   all `status: failed` at the assemble stage:
   `…-20261021-151030.json` and `…-20261021-151400.json` (assembler RuntimeError),
   `…-20261021-151437.json` (**TimeoutExpired — assembler timed out after 1,800 s**).
   This is the known Ep1 v3 assemble-timeout fault.
6. **A finished master exists — but NOT in any loop manifest**:
   `~/workspace/goals/fireside-series-production/files/fireside-video/ep01-v3.mp4`
   (431,315,150 B, duration 1,054.38 s ≈ 17:34, Oct 21 22:14) with
   `ep01-v3.mp4.timeline.txt` (105 EDL shots), `ep01-v3.mp4.concat.txt`,
   retained `ep01-v3.mp4.nocap.mp4` (461 MB intermediate), and a review page
   `ep01-v3-review.html` ("Nothing is published… staged for your review only").
   Job `approved_for_publish: false`, and no v3 manifest contains an assemble or
   publish stage success — by SYSTEM.md's own receipt rule, this master did not
   complete through the loop. Its provenance/timing (hours after the last failed
   manifest) needs a manifest or a note if SYSTEM.md is to claim it as a system output.

**Correct one-line state for the v3 row:** *Cast approved/locked Oct 21, sheets built,
voice rendered, 5 shots animated (600 credits, Oct 21), loop assemble failed/timed out
(last manifest `…-151437.json`); a 17:34 master `ep01-v3.mp4` exists on disk outside a
loop manifest; publish gate closed (`approved_for_publish: false`), nothing published.*

---

## 4. Summary — every wrong / stale claim in SYSTEM.md

1. **v3 row (A3) — wholly stale.** Gate-stop / sheets-not-built / zero-spend are all
   false. Correct state in §3. (Biggest error in the file.)
2. **IG-season ep29 (A2a + A2d) — stale + settled-as-open.** Job covers eps 11–30
   incl. ep29; Steve's V3 pick was made Oct 21. SYSTEM.md still says "11–28 + 30"
   and "Ep 29 excluded — held for Steve's v2/v3 pick."
3. **IG-season first-run status (A2b) — misleading.** First run's manifest says
   `complete`, not `partial`; `partial` belongs to the later Oct 21 20:58 UTC run.
4. **Kids row mechanism (A4) — stale.** Outcome true (assembled, not uploaded), but
   the job file now has `approved_for_publish: true`; the hold is no longer in the file.
5. **Caption "verified, pixel-checked" (B3) — unreceipted.** Fix is in code and works
   in production evidence, but the claimed test build left no artifact on disk; only
   the Overnight Report's prose (3,623 vs 0 pixels) asserts it.
6. **Prime bullet (B1) — unreceipted in this folder.** 0/18 + 3 partial traces only
   to Overnight Report prose; no verification ledger exists under `visionweaver/`.

**Claims verified TRUE:** looptest row (re-run today, §1); IG resume-from-done-file
mechanism + done-file state (ep03–ep12); Crossroads keyframe bullet (docs/manifests
consistent, Drive not re-searched per instruction); assembler second-pass fix in code;
kids master existence.

**Root cause:** SYSTEM.md was last written Oct 21 04:46 UTC (`SYSTEM.md` mtime) —
before Oct 21's daytime v3 production, the ep29 decision, and the second IG run.
Its footer says "Kept current by whoever runs the loop" — nobody updated it after
those runs. Recommended fix (not applied — audit only): rewrite the v3 and ig-season
rows per §3/A2, and either attach receipts for B1/B3 or downgrade their wording to
"reported, receipt not retained."

*No files other than this audit and the two proof-job manifests/packet (§1) were
created or changed. No job other than the proof job was run. The IG-season and v3
jobs were NOT run (they would post / spend respectively).*
