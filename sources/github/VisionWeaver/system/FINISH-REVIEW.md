# VisionWeaver — Finish Review

**Date:** Oct 22, 2026 (runs timestamped Oct 23 UTC)
**Steve's order:** he was told VisionWeaver was finished but had not checked it
himself — review it, update issues, fix them, make sure it is actually
finished and ready to deploy, then run the Completion Gate questions and
bring the product back completed.
**Discipline held throughout:** production PAUSED — nothing published,
posted, or uploaded; **$0 / 0 credits spent in this review**; no Crossroads
Part 2 batch; every fix made **inside the system** (loop / assembler code),
never a hand script doing the system's work. Worker evidence files:
`hidden_review/diag-assemble.md`, `hidden_review/audit-proof-and-stale.md`,
`hidden_review/prime-track.md`.

---

## Verdict up front

- **The loop (the production engine): FINISHED and verified.** The one real
  defect — the assemble stage that made long episodes unproducible — is
  fixed in-system and proven with a full end-to-end system run, frame-grab
  verification, and idempotency re-runs. Every claim in `SYSTEM.md` now
  matches manifests and disk.
- **Fireside Ep1 v3 master: produced BY the system** (previously it existed
  only as a hand-finished file with no receipt). Staged, publish gate
  closed, awaiting Steve's word — by design, not by defect.
- **VisionWeaver Prime: NOT deploy-ready** — a separate surface with its
  own blockers (§5). Nobody should deploy Prime as a production product
  on the current record.
- **Crossroads Part 2:** not a system defect — its keyframes are not
  identifiably in Drive, so the batch correctly does not fire (§6).

---

## 1. Issues found (with evidence)

### I-1. Assemble stage could not finish a long episode — THE defect
Oct 21, Fireside Ep1 v3: cast/voice/animate all ok, then assemble died —
`TimeoutExpired … after 1800 seconds` (manifest
`runs/fireside-ep01-v3-20261021-151437.json`). Root cause, measured, not
guessed (full workup in `hidden_review/diag-assemble.md`):

- `assemble.py` ran **two sequential full-length re-encodes** (`-preset
  medium`, crf 20): pass 1 build + pass 2 caption burn, of a 17 min 34 s
  programme (105 EDL shots from 5 clips; 19 audio events). Benchmarked on
  this VM at 0.22–0.81× realtime (pass 1) and 0.70× (pass 2): a total of
  **~47 min best case, ~1 h 55 m under Oct 21's load — against a 1,800 s
  budget. The timeout was unavoidable; it was not a hang.**
- The 30-min cap killed the assembler but **orphaned its ffmpeg**, which
  kept writing the output for **58 minutes after the run was manifested
  as failed**; a later assembler launch then wrote the same outputs
  concurrently. No process-group kill, no locking.
- Crossroads assemble had **no reuse check** — every invocation re-ran
  the full multi-hour encode even when a finished master existed.
- The assembler buffered all ffmpeg output (`capture_output`), so a
  ~90-minute pass had **zero progress visibility** and left no receipt.
- The finished Oct 21 master that does exist (`ep01-v3.mp4`, 22:14Z) was
  finished **outside the loop** — its `.nocap.mp4` intermediate and
  concat list were never cleaned up (the assembler's own code deletes
  both), and **no loop manifest records a successful v3 assemble**. By
  the system's own rule — *if it isn't in the manifest, it didn't
  happen* — the system had never assembled this episode.

### I-2. SYSTEM.md materially stale — 6 claims wrong or unreceipted
`SYSTEM.md` was last written Oct 21 04:46 UTC and never updated after that
day's production (claim-by-claim audit: `hidden_review/audit-proof-and-stale.md`):

1. **v3 row wholly stale:** "gate-stops, sheets not built yet, zero spend"
   — all false. Sheets were built Oct 21, cast approved, voice rendered,
   5 shots animated for **600 credits**, and the loop state was assemble
   FAILED.
2. **Ep29 reported open after Steve settled it:** the doc said "eps
   11–28 + 30" and "Ep 29 excluded — held for Steve's v2/v3 pick." Steve
   picked **V3 on Oct 21**; the job covers eps 11–30 inclusive. (Exactly
   the settled-question-resurfacing error Steve flagged Oct 20–21.)
3. **IG-season first-run status mislabelled:** the first run's manifest
   says `complete` (the bug fixed later that day), not `partial` as the
   doc claimed; `partial` belongs to the later Oct 21 run.
4. **Kids row mechanism stale:** the job file now carries
   `approved_for_publish: true`; the upload hold is procedural (pause /
   Steve's word), not a flag.
5. **Caption "verified, pixel-checked" unreceipted:** the Oct 21 fix was
   real in code, but no test artifact, frame grab, or pixel output was
   retained anywhere — the claim traced only to prose.
6. **Prime figures unreceipted in this folder:** "0/18, 3 partial" traced
   only to the Overnight Report's prose; no ledger existed here.

### I-3. Dry runs silently rewrote the publish packet
`stage_publish` ignored `dry_run` on the default path — a dry run
re-staged `runs/<job>.publish.json` on disk. Staging only (never an
upload), but a dry run must not touch state. Found in the audit.

### I-4. Latent timeout traps
`still`-mode ffmpeg calls ran under the 300 s default cap; the post-failure
crossroads timeout (7,200 s) was an unprincipled guess that barely covered
the *old* encode time and would have normalised a ~2 h stage.

### Verified NOT issues
- Proof job claim was true and re-verified (§3).
- IG resume-from-done-file mechanism works; done-file = eps 03–12.
- Crossroads keyframe position is accurate as worded (zero *identifiably
  named* in Drive; batch never fired; authorization unused).

---

## 2. Fixes made — all inside the system

| # | File | Fix |
|---|---|---|
| F-1 | `goals/crossroads-of-identity-episode-1-production/files/assembler/assemble.py` | **Captions burn inside the single pass** — the `subtitles` filter is now the last node of the existing `-filter_complex` graph (`[v]subtitles=…[vout]`). The Oct 21 belief that captions "must" be a second pass was wrong: only `-vf` beside `-filter_complex` is illegal; a node *inside* the graph is legal. **The entire second full-length re-encode and the 461 MB `.nocap` intermediate are gone.** |
| F-2 | same | **Encode preset `medium` → `veryfast`** (same crf 20). Medium measured 0.22–0.81× realtime on this 2-vCPU VM — unusable for programme-length masters. |
| F-3 | same | **`run()` observability + timeout:** long encodes stream ffmpeg output to `<output>.ffmpeg.log` (progress visible mid-run; the log is a retained receipt); explicit timeout handling added. |
| F-4 | `visionweaver/loop/stages.py` | **`sh()` kills the whole process group on timeout** (`start_new_session` + `killpg`). The orphaned-ffmpeg failure mode is closed. |
| F-5 | same | **Crossroads assemble is idempotent:** a finished master newer than its EDL that probes as valid video is reused (mirrors `still` mode); `assembly.force: true` rebuilds. |
| F-6 | same | **Stage timeout set from measurement:** crossroads 3,600 s (measured full-episode encode after F-1/F-2: 8 m 25 s); `still`-mode ffmpeg calls get an explicit 1,800 s. |
| F-7 | same | **Dry runs no longer write the publish packet** (fixes I-3). |
| F-8 | `visionweaver/loop/jobs/fireside-ep01-v3.json` | Assembly note corrected (single-pass captions, Oct 22 fix) — no parameters changed. |
| F-9 | `visionweaver/SYSTEM.md` | Rewritten to match manifests/disk: v3 row, IG-season row (eps 11–30, ep29 V3 **settled**), kids mechanism, Prime bullet with sources, new assembler truth (§4). |

**Preservation, not deletion:** before the proof run, the Oct 21
hand-finished master was copied to
`fireside-video/ep01-v3-20261021-handfinished.mp4` (byte-size identical,
431,315,150 B). Nothing of Steve's was destroyed to make the system prove
itself.

---

## 3. Verification runs (receipts)

1. **Assembler proof segment (pre-check):** a 120.5 s slice of the real
   Ep1 v3 EDL through the fixed assembler — **61.5 s wall (≈2× realtime)**,
   captions in-graph. Frame at t=100 s frame-checked: Grand explaining,
   Nadia/June/Theo + radio present, burned caption *"cash for that. So
   bank after bank"* — the same line the Oct 21 master carries at t=100 s.
2. **THE proof — full Ep1 v3 through the loop:**
   `python3 run.py jobs/fireside-ep01-v3.json` → **exit 0, 8 m 25 s total**
   (was: timeout death at 30 min; ~2 h hand-finished).
   Manifest **`runs/fireside-ep01-v3-20261023-015339.json`**:
   cast ok · voice ok (20 files verified) · animate ok (**all 5 shots
   reused, 0 credits**) · assemble ok (**fresh encode**) · publish
   **gate-stop** (`approved_for_publish: false` — nothing published).
   Status: `staged` — truthful. New master:
   `fireside-video/ep01-v3.mp4`, 1,054.375 s, 1280×720 @ 30 fps,
   H.264 + AAC, with `ep01-v3.mp4.ffmpeg.log` retained. No `.nocap`
   intermediate produced.
3. **Frame-grab verification of the system-built master** (grabs in
   `hidden_review/frames/`, 5 timestamps viewed): t=15 s gather; t=100 s
   explain with burned caption; t=400 s listen beat — whole cast around
   the glowing radio, gold caption of the speech text (*"them into cash,
   except at panic prices"*); t=800 s listen-close; t=1030 s afterglow —
   June asleep against Grand's chair, caption of Grand's closing line.
   Characters consistent across every beat; captions present and correct.
4. **Idempotency re-run:** same job again → **0.16 s**, assemble
   `reused: true`, status `staged` (manifest
   `runs/fireside-ep01-v3-20261023-020222.json`). No re-encode, no spend.
5. **Proof job regression (post-fix code):**
   `fireside-ep01-looptest` real run → `complete`, all 5 stages ok,
   **0 credits**, master reused, packet staged only (audit worker's run:
   manifest `…-20261023-014327.json`; repeated after the fixes with the
   same result).
6. **Dry-run honesty regression:** looptest `--dry-run` → publish packet
   file mtime **unchanged** (F-7 works).
7. **Spend ledger for the whole review: 0 credits, $0.** The only spend
   in this job's history remains Oct 21's 600 credits, now recorded
   truthfully in `SYSTEM.md`.

---

## 4. Corrected system state (what's true tonight)

- **Loop:** cast → voice → animate → assemble → publish, both gates hard,
  manifests truthful (`complete` / `partial` / `staged` / `gate-stop`),
  all stages idempotent, timeouts measured, no orphan processes, dry
  runs side-effect-free on the default path.
- **Fireside Ep1 v3:** system-assembled master on disk + manifest receipt;
  publish gate closed. Content note (not a defect): the master carries
  the illustrated v3 cast; the main-line photorealistic reset (Steve,
  Oct 22) is a production direction for future episodes.
- **Fireside IG season:** eps 1–12 live; **eps 13–30 (18) remain**; job
  covers ep29 (V3, settled). Job must not be run under the pause.
- **Fireside Kids Ep1:** assembled, never uploaded; hold is procedural.
- **Crossroads Part 2:** waiting on keyframes that are not identifiably
  in Drive; the ~1,200-credit authorization stands unused.

---

## 5. VisionWeaver Prime — separate track, NOT deploy-ready

Assessment only; no changes made (full workup:
`hidden_review/prime-track.md`; sources: the Oct 9 handoff package in
`~/workspace/user/files/` + Oct 20 drop intake of the Oct 10 deploy
session — local docs only, no live system was inspected in this review).

**What Prime is:** a complete, integrity-verified **specification +
offline review prototype** (90 files; `verify_package.py` PASS re-run
Oct 22), plus an Oct 10 **deployed shell** — private repo, dedicated
Vercel project, dedicated Supabase (3 migrations, 10 tables, RLS
everywhere, anon blocked, advisor clean), 27 pages / 18 integrations /
13 gates seeded, email+password sign-in working.

**Why it is not deploy-ready, on Prime's own acceptance gates:**
0/18 integrations fully verified (package: 18/18 `NOT VERIFIED`; live:
0 fully, 3 partial — **not named in any local source, and not invented
here**); AI providers and THELMA AI not verified; THELMA's signed
diagnostic/ACK/evidence unproven; workspace contains no active project,
pipeline, or activity (no real workflow has ever run in it); security
specified-not-enforced above the DB layer (RBAC, audit ledger, restore
drill, threat monitoring); branch protection/required checks unset;
visual certification for 27 routes undone (board covers 16 primaries);
Book/Avatar 16/32/64 contracts unenforced in runtime; rights/provenance/
spend approval not server-side; mock/sandbox provider test sequence not
run; CI/CD 8-step release matrix unevidenced; Architect signoff +
production/rollback evidence missing; migration/cutover + repo notices
not performed. A live rendering bug is also on record (verified % shows
`0.0005555555555555556%`). **Blockers B1–B14, each source-tied, are in
`hidden_review/prime-track.md` §4.** Prime's own documents say it plainly:
*"NOT a connected production deployment."*

---

## 6. Completion Gate (Steve's protocol, Oct 20 2026, 23:44 CDT)

### Pass 1
1. **Is this what Steven requested — scope and function?** Yes: review the
   system he hadn't checked, fix what was broken, finish it, and answer
   these questions on the record. No publishing, no spend — honoured.
2. **Best work / stake my name on it?** Not yet. The diagnosis proved the
   loop could not do its central job (assemble a full episode), and
   `SYSTEM.md` — the document Steve would check against — contained a
   settled question reported as open. A name does not go on that.
3. **150× improvement — done, not named:** the assemble path rebuilt
   (single-pass in-graph captions, measured preset, process-group kill,
   reuse, observability log, measured timeouts) — a stage that *could
   not complete at all* now completes a full episode in **8 m 25 s**
   and re-runs in **0.16 s**; dry-run state-touching fixed; every stale
   claim corrected with receipts retained this time (manifests, ffmpeg
   log, frame grabs on disk — the Oct 21 pixel-check claim had kept
   none).

### Pass 2
1. **Scope and function?** Yes — and the scope boundary is stated
   honestly: "VisionWeaver" is two surfaces. The loop is finished; Prime
   is not, and §5 refuses to blur that.
2. **Best work?** Nearly. Re-checked: the proof master is the system's
   own output (fresh encode in the manifest, not the reuse path); the
   hand-finished original is preserved, not silently replaced; the
   `.nocap` leftover and the preserved copy are declared in `SYSTEM.md`
   rather than tidied away unrecorded.
3. **Improvement — done:** the gate's own Pass-1 wording was re-verified
   against bytes (manifest fields, file sizes, frame contents at five
   timestamps); the one number I could not receipt — which 3 Prime
   integrations are "partial" — is reported as *not named in any local
   source* instead of being filled in.

### Pass 3
1. **Scope and function?** Yes.
2. **Best work — and I will stake my name on it, within this scope:**
   the VisionWeaver **loop** is finished and deploy-ready as Steve's
   production engine: every stage proven end-to-end on real work, gates
   holding under a paused-production regime, receipts truthful and
   retained, documentation matching the manifests line for line. I do
   **not** stake that claim on Prime (not deploy-ready, §5) or on
   publishing anything (never attempted, by his order).
3. **Improvement:** the accuracy pass itself — every figure in this
   review traces to a manifest, a file, a benchmark, or a frame grab
   produced in this review. Gate closes here, per protocol.

---

## 7. Honest remainder

### Steve's taps (his decisions / actions only — nothing here is workmanship)
1. **Ep1 v3 master** — watch it; approve or send back. (Illustrated cast —
   the kids'-lane banking vs main-line photoreal decisions are his,
   Oct 22 direction.)
2. **Production pause** — the IG season resume (eps 13–30), the kids Ep1
   upload, and any v3 publishing happen only when he lifts the pause and
   sets the publish flags. The system will not do it on its own.
3. **Prime** — decide whether Prime gets its own build track (B1–B14,
   starting with branch protection and one verified integration), or
   stays a spec + shell. It cannot be "finished" by declaration.
4. **Crossroads Part 2 keyframes** — 15 keyframes are not identifiably in
   Drive. If they exist under other names, point at the folder; the
   batch fires when all 15 exist. The credit authorization is untouched.
5. **Cleanup (optional):** the 461 MB Oct 21 `.nocap.mp4` intermediate in
   `fireside-video/` is dead weight — delete on his word, not before.

### Still open (system-side, no Steve action needed)
- None for the loop's correctness. Two declared limits remain by design:
  encode speed is VM-bound (a full episode is ~8.5 min, acceptable and
  receipted), and Prime's verification ledger does not exist yet — it is
  created when/if Steve opens the Prime track (item 3 above).

---

*Prepared by the VisionWeaver finish-review coordinator, Oct 22 2026.
Evidence: `hidden_review/` (diagnosis, audit, Prime track, frame grabs) +
manifests cited inline. Nothing was published, posted, uploaded, or spent
in this review.*
