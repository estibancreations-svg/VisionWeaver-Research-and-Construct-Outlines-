# Narration, both ways — paste this into App Studio

> **APPLIED 2026-11-06** — the app now has the narration audio upload, Grand's line, and the voice picker. Nothing left to paste. **Correction:** the voice picker offers Elias, Mabel, Kendrick — Homespun Basket is NOT in the app.
>
> **CORRECTED 2026-11-08 — text-to-voice route WITHDRAWN:** do not type a line and pick Mabel (rejected 2026-11-06 — stock adult voice, not a weathered grandmother). Recorded narration only: leave Grand's line empty and the voice picker unused; upload the recorded mp3/wav in Narration audio.

**Date:** 2026-11-05, applied 2026-11-06. **Decision:** BOTH audio options in one revision — upload narration AND text-to-voice.
**Voice for text-to-voice:** WITHDRAWN 2026-11-08 — do not type a line and pick Mabel. Recorded narration only.

## What was pasted (record)

> Revise this app to add a narration track with two options. Add an optional audio-upload field (mp3 or wav) on the clip screen, above Generate, and add two more controls in the same place: a text field labeled "Grand's line" and a voice picker. If the user uploads narration audio, lay it under the generated clip and export the combined video with audio. If no audio is uploaded but a line is typed and a voice is picked, generate the clip and render the line in that voice under the clip, then export the combined video with audio. If neither audio nor a line is given, export video-only as today. Keep everything else exactly the same: 5/8/10-second lengths, the three locked style presets, reference-image upload, Download and Regenerate. Do not change the look or layout beyond adding these controls.

## How it decides

- Upload narration → the upload is used.
- No upload, but a line typed + voice picked → the line is spoken in that voice.
- Neither → video-only, as today.
- Upload wins if both are somehow given.

## The lines to type (DRAFT — his approval or replacement)

Voice: **recorded narration only** (upload the recorded mp3/wav in Narration audio; leave Grand's line empty and the voice picker unused). The lines below are the recording script, not text-to-voice input.

- **Clip 2 — signature wide (10s): TBD — his story.** Neutral framing draft, no story premise: "Come close, little ones. The fire is warm, the night is long, and I have a story for you."
- **Clip 4 — close-up (8s): DRAFT — invented, no story on file.** "And that is when she understood. The thing she feared was only the dark, waiting to be lit."
- **Clip 5 — kids listening (10s):** "She opened the big picture book, and the two boys leaned in close, because this was the page where the journey began."

Leave "Grand's line" empty (and upload nothing) for Clip 1 (fire open), Clip 3 (radio corner), and Clip 6 (fire close) — no talking in those.

## What this revision does NOT do

- **Download button:** untouched. The fix (native save dialog instead of opening a player window) is still queued for the next revision. Do not change now.
- **Sync step:** not part of this revision. Lip sync runs in Runway Studio after, on the finished clip — only for the talking shots (Clips 2, 4, and 5 if she reads aloud).
- **Anything else:** no rebuild, no restyle, no preset or length changes.

## App-layout correction (2026-11-06)

The reference image is the clip's **opening frame**, not a character lock — the clip opens on the uploaded still and the scene description says what happens from that frame. Steps now follow the app's field order: Scene → Reference image → Length → Style → Narration audio → Grand's line → Voice → Generate → Download. See the all-steps sheet.
