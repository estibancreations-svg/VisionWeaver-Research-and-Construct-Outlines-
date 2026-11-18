# VisionWeaver — Runway / Fireside Archive
## From the pivot of the system to the individual upload testing

**Date:** 2026-11-09. **Author:** Victoria (Vickie), the user's right hand.
**Source:** side chat "Runway workflow setup steps" (Nov 5–7, 2026) and the Nov 3 build chat.
**Purpose:** everything done from the pivot of the system to the individual upload testing, in one place, so the next conversation starts from the right facts.

---

## 1. The pivot (2026-11-03)

- Runway App Studio launched 2026-10-26. Verified from Runway's own docs: a real no-code builder — plain-language description → hosted creative app wrapping Runway's image/video/audio models + Brand Kits + Workflows. It has **NO databases, NO auth, NO custom backends, NO external APIs**.
- The pivot: VisionWeaver's 33-page management system **cannot** live in Runway. Runway is the **media-PRODUCTION layer only**. Build WITH the tool's grain: a small kit of one-job apps + chained Workflows; the management system stays where it is. No fourth system, no restart.
- Factory line: **TYPE → PIECES → LINE → SCHEDULE → POST** (POST gated: channels must exist + his go per destination).
- Billing: the user reactivated Runway Pro himself 2026-11-03, $26.25 on card ending 9674 (confirmed his own charge; money-anomaly case closed). Plan: Pro, renews Dec 3, 2026; 38,800 workspace credits at the Nov 3 check.

## 2. The first build — Workflows First Attempt (2026-11-03)

- One-screen Gen-4.5 clip generator: scene description + optional reference image, clip length 5 / 8 / 10 seconds, 3 locked style presets (Cinematic Warm, Documentary Real, Animated), Download + Regenerate. Session saved and resumable via App Studio → Continue building.
- Original name "Runway's workflows first attempt" was rejected by Runway's usage-policy filter; minimally renamed.
- Build complete ~4:04 PM CST, all 6 steps done. Preview pane showed "No live preview" at check time.
- Corrections from the build: clip lengths are 5 / 8 / 10s (NOT 16s as first stated); the workspace has NO Brand Kit the app can see — the app picked a VisionWeaver look itself; the user wants hands-on control of look and settings.
- v1 is video-only — audio was never in the build description, NOT a platform limit.

## 3. Fireside Chats — the pilot series

- Type sheet DRAFT (2026-11-04): photorealistic cinematic; firelight golds, ember oranges, deep warm browns; practical-source lighting; slow camera; near-no music, room tone + fire crackle. 5 starter prompts built 2026-11-03. Still awaiting his keep / change / kill.
- The originals (user upload, 2026-11-05): 7 files, 6 household scenes (E uploaded twice). **"Grand" is the ROLE in each home, not one man** — the tellers are elders across households and backgrounds.
- Boards A–F built FROM the originals and verified by read-back. The two boards I generated from a written description were **REJECTED** (all-Caucasian casting; recreated instead of using the originals) — never use, never re-deliver.
- **Heritage rule (hard):** his heritage is a blend of 11 backgrounds and walks of life; every character and cast must reflect that diversity; **never an all-Caucasian character set again**; never default a face to Caucasian when a description leaves ethnicity open.
- **Originals-first rule:** pull up images already created and build boards FROM them as first created; never regenerate a locked character; fix in place, never recreate.
- Post destinations: YouTube @firesideClippings, Instagram @firesideclippings. **POST stays gated** — his go per destination.

## 4. The pilot run — Household A (2026-11-05)

- 6 clips, 46 seconds, story order: fire open 5s (Cinematic Warm), signature wide 10s, radio corner 8s (Documentary Real), teller close-up 8s, kids listening 10s, fire close 5s.
- Clip 1 (fire intro) done by him. Everything else pending.
- Households B–F run the same six-clip pattern after A proves the line.

## 5. Audio — decided, applied, then corrected

- Decision (2026-11-05): **BOTH options in one revision** — upload narration (mp3/wav) AND text-to-voice ("Grand's line" + voice picker). Upload wins if both are given.
- Revision **APPLIED 2026-11-06** — the app now has the Narration audio field, Grand's line, and the voice picker.
- Voice correction: the picker offers **Elias, Mabel, Kendrick only**. Homespun Basket (the VisionWeaver 2.0 library name) is NOT in the app.
- **Mabel withdrawn (2026-11-06/07):** Mabel is a stock adult voice; she cannot sound like a weathered grandmother. **SETTLED: recorded narration ONLY.** Grand's line stays empty; the voice picker stays unused. Upload the recorded mp3/wav in Narration audio.
- Placeholder timing tracks (sync-test only, **never ship**): clip2 7.1s, clip4 6.2s, clip5 7.2s.

## 6. The app-layout correction (2026-11-06) — what the app actually accepts

- Fields top to bottom: **Scene description → Reference image → Clip length → Style → Narration audio → Grand's line → Voice → Generate clip → Download.** Gen-4.5, 16:9 at 720p.
- **Reference image = the OPENING FRAME.** The clip opens on the exact image uploaded and animates from it. It is NOT a character lock. The scene description must say what happens FROM that frame.
- Limits: reference image PNG / JPG / WebP up to 16 MB; narration audio MP3 / WAV up to 20 MB.
- Download button: still opens a player window instead of saving (fix queued for the next revision; do not change now). Clips stay safe in Runway assets.

## 7. Clip 2 miss (2026-11-06) — the individual upload test that failed

- 10s signature generated (1280×720, HEVC + AAC). Face: model-invented Caucasian grandmother — NOT the A original (no bindi, no flowers, no shawl; different boys). Voice: Mabel, wrong. Mouth: unsynced (no Lip Sync pass run).
- Diagnosis: the still was NOT the opening frame on that run — either not uploaded or the app didn't take it.
- Verdict: do not build on it. Next step: **5s face-hold test** (A original uploaded, no voice) — check frame 1 and frame 5 for bindi, white flowers, blue sweater, cream shawl, same two boys. Any check fails → stop, don't generate talking clips.

## 8. Sync — settled route

- Gen-4.5 generates no embedded audio; the app lays audio under the clip but does NOT drive the mouth.
- Sync pass runs in **Runway Studio → Lip Sync**, on the finished clip, only for talking shots (Clips 2, 4, 5). Lip Sync up to 45s. Alternative: Act-Two (full performance from a recorded face, single-character, 30s max, on his Pro plan, also on the API).
- Sync is a separate pass; narration is words only, never presented as sync.

## 9. The river-line cross (2026-11-07) — the alarm

- The Clip 2 line "the river that remembered its name" was invented by me. **No river story exists in Fireside.** The river motif belongs to First in Consciousness ("You Are Not Behind — You Are Mid-River") and leaked across. The user caught it and called it an alarm.
- Struck from all 5 docs + the Clip 2 placeholder re-recorded with a neutral framing draft. Clip 2's line is **TBD pending his story**. Clip 4's line flagged invented, no story on file.
- Also owned in the same turn: my earlier claim that the river line was "struck everywhere" was wrong — the sheets still said type the lines and pick Mabel. Fixed in place and re-checked by grep (2026-11-07 16:30): the all-steps sheet and vocal card now say recorded narration ONLY; remaining Mabel mentions are "do NOT pick Mabel" warnings; remaining river mentions are strike notes.
- Standing rule (sealed worlds): name the series a line, motif, character, or premise belongs to before using it; **never invent a story, premise, or line for a series that has no script on file**; no Fireside script exists — all lines are drafts until he approves the wording or supplies the story.
- Clip 2 neutral framing draft (no story premise, approve or replace): "Come close, little ones. The fire is warm, the night is long, and I have a story for you."

## 10. Current state (2026-11-09) — settled vs open

**Settled:**
- App layout verified; reference image = opening frame; voice = recorded narration only; sync = Studio Lip Sync on Clips 2, 4, 5; download fix queued; post gated.
- Clip 2 miss recorded; face-hold test staged; vocal card corrected (Mabel withdrawn, river struck); stale vocal-card audio renamed SUPERSEDED.

**Open:**
- Face-hold test not yet run.
- Clip 2 line TBD — approve the framing draft, replace it, or give the story.
- Household B Clip 4 teller pick open (grandmother 4a or father 4b). B runs after A.
- B sheet, settlement sheet, paste sheet, and type sheet still carry Mabel wording — fix when B runs.
- Runway MCP not connected — connect link in the handoff; after connecting I can generate directly from here.
- Download-button fix queued for the next revision.
- Type sheet still DRAFT, awaiting his keep / change / kill.

## 11. File index (workspace paths)

- `workspace/goals/visionweaver-psychology-video-production/files/fireside-pilot-all-steps-2026-11-05.md` — master sheet (corrected, ON HOLD until the face test passes)
- `workspace/goals/visionweaver-psychology-video-production/files/fireside-household-a-vocal-card-2026-11-06.md` — corrected vocal card
- `workspace/goals/visionweaver-psychology-video-production/files/fireside-tomorrow-handoff-2026-11-06.md` — Saturday pickup sheet
- `workspace/goals/visionweaver-psychology-video-production/files/fireside-household-b-run-sheet-2026-11-05.md` — Household B (runs after A)
- `workspace/goals/visionweaver-psychology-video-production/files/fireside-pilot-run-sheet-2026-11-05.md` — SUPERSEDED
- `workspace/goals/visionweaver-psychology-video-production/files/fireside-text-to-voice-paste-2026-11-05.md` — APPLIED record
- `workspace/goals/visionweaver-psychology-video-production/files/fireside-audio-sync-settlement-2026-11-05.md`
- `workspace/goals/visionweaver-psychology-video-production/files/fireside-sync-explained-2026-11-05.md`
- `workspace/goals/visionweaver-psychology-video-production/files/fireside-households-alignment-2026-11-05.md`
- `workspace/goals/visionweaver-psychology-video-production/files/fireside-character-boards.md` — carries the REJECTED boards note
- `workspace/your_files/Fireside-Chats-Type-Sheet-DRAFT-2026-11-04.md`
- `workspace/your_files/Fireside-Audio-Revision-Specs-2026-11-04.md`
- `workspace/goals/visionweaver-psychology-video-production/files/VisionWeaver-Factory-Line-2026-11-03.md`
- `workspace/goals/visionweaver-psychology-video-production/files/fireside-audio/placeholder-clip2-line.mp3` (7.1s), `placeholder-clip4-line.mp3` (6.2s), `placeholder-clip5-line.mp3` (7.2s) — sync-test only
- `workspace/goals/visionweaver-psychology-video-production/files/SUPERSEDED-voice-fireside-vocal-card-2026-11-07-river-line-struck.mp3` — renamed, not deleted
- Originals: `workspace/user/files/` — 7 files, 6 household scenes (A–F; E duplicated)

## 12. Rules that now govern this work

- Heritage/diversity: every cast reflects his 11-background heritage; never all-Caucasian.
- Originals-first: build FROM what was already created; never regenerate a locked character; fix in place.
- Sealed worlds: a line, motif, or premise belongs to one series only; never invent a story for a series with no script on file.
- Recorded narration only for Grand's voice; Mabel (and Elias/Kendrick) are not the teller.
- Verify every correction in the actual file text before reporting it done; own a false completion claim in the same turn.
- One track at a time; do not mix projects. When he stops the line with a question, answer it in place before doing anything else.
