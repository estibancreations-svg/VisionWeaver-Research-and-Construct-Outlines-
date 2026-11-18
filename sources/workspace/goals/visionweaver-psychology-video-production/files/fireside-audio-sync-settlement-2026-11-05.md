# Fireside — audio + sync settlement sheet

> **CORRECTED 2026-11-06 against the app's actual layout:** the voice picker offers Elias, Mabel, Kendrick — Homespun Basket is NOT in the app. The reference image is the clip's opening frame, not a character lock — the clip opens on the uploaded still. Steps now follow the app's field order; see the all-steps sheet.
>
> **CORRECTED 2026-11-08 — audio pick SETTLED:** recorded narration only. The text-to-voice route (pick Mabel) was withdrawn 2026-11-07 — Mabel is a stock adult voice, not a weathered grandmother. Do not type a line and pick a voice; leave Grand's line empty and the voice picker unused, and upload the recorded mp3/wav in Narration audio.

**Date:** 2026-11-05. **Decision:** PAUSED per his tap — settle audio and sync first. Nothing generates until the audio pick is made.
**App:** Workflows First Attempt (Runway App Studio). **Pilot:** Household A (brick-fireplace grandmother).

## 1. Audio — the pick (his tap decides)

Both revision texts are ready to paste, from the 2026-11-04 specs. Either way, audio is a layer, not a rebuild — the clip generator stays exactly as built.

### Option A — upload narration (his audio file)

> Revise this app to add a narration track. Add an optional audio-upload field (mp3 or wav) on the clip screen, above Generate. If the user uploads narration audio, lay it under the generated clip and export the combined video with audio. If no audio is uploaded, export video-only as today. Keep everything else exactly the same: 5/8/10-second lengths, the three locked style presets, reference-image upload, Download and Regenerate. Do not change the look or layout beyond adding the upload field.

### Option B — in-app text-to-voice (Grand's voice, no recording needed)

> Revise this app to add a narration track via text-to-voice. Add two controls on the clip screen, above Generate: a text field labeled "Grand's line" and a voice picker. When the user types a line and picks a voice, generate the clip and render the line in that voice under the clip, then export the combined video with audio. If the text field is empty, export video-only as today. Keep everything else exactly the same: 5/8/10-second lengths, the three locked style presets, reference-image upload, Download and Regenerate. Do not change the look or layout beyond the two new controls.

**Voice for text-to-voice:** WITHDRAWN 2026-11-08 — do not pick Mabel (rejected 2026-11-06, stock adult voice). Recorded narration only. Homespun Basket is the VisionWeaver 2.0 library name and is NOT in this app.

## 2. Sync — the settled route

**Finding (checked 2026-11-05):** Runway's Lip Sync and Act-Two live in Runway Studio (Generate section), and Act-Two is also on Runway's API. Nothing found says App Studio lets you drop a lip-sync step inside a one-screen app — so that is **not** claimed. The settled route is: the app makes the picture and lays the words under it, then the sync pass runs in Runway Studio after, on the finished clip.

**How it works:** generate the character clip in Gen-4.5, record or generate the dialogue separately, then use Lip Sync to marry them. Gen-4.5 does not generate embedded audio itself — a Gen-4.5 clip "can go straight into Runway's generative audio tools for voice, sound effects and music" after it is made.

**The two tools (both on his Pro plan):**
- **Lip Sync (audio-driven):** the narration audio alone drives the mouth. Supports multiple faces, clips up to 45 seconds. Simplest fit for Fireside.
- **Act-Two (performance-driven):** record your own face on camera and map the whole performance onto the character. "Act-Two is available on Pro and Max plans." Single-character inputs — for two speakers in one frame, drive one face at a time and composite. Dialogues under 30 seconds total per run.

**Scope — what actually needs sync:** only the shots where her face is talking on camera — Clip 2 (signature wide) and Clip 4 (close-up), and Clip 5 (kids) if she reads aloud. The fire clips and the radio corner need none. Note: a narrated format, where a narrator tells the story while the characters act, skips lip sync entirely.

## 3. The words — draft lines for the three talking clips (DRAFT, not locked)

No Fireside script or cue sheet exists on file — these are drafts for his approval or replacement. Word counts fit the clip lengths (~150 words per minute).

- **Clip 2 — signature wide (10s): TBD — his story.** Neutral framing draft, no story premise: "Come close, little ones. The fire is warm, the night is long, and I have a story for you."
- **Clip 4 — close-up (8s, 18 words): DRAFT — invented, no story on file.** "And that is when she understood. The thing she feared was only the dark, waiting to be lit."
- **Clip 5 — kids listening (10s, 22 words):** "She opened the big picture book, and the two boys leaned in close, because this was the page where the journey began."

## 4. What is settled vs open

- [x] Paused — no more picture generation until audio + sync are settled
- [x] Sync route — Studio step after the app (App Studio block unconfirmed, not claimed)
- [x] Sync scope — face-forward talking shots only
- [x] Draft lines written for the three talking clips
- [x] **Audio pick — SETTLED 2026-11-07/08: recorded narration only** (text-to-voice / pick-Mabel route withdrawn)
- [] Lines approved or replaced by him (or the Ep 1 script, if he has it)
- [] Revision pasted into App Studio (only after the audio pick)
- [] Download-button fix — queued for the next revision, do not change now
