# Fireside sync — how the talking and the avatars get synced

**Date:** 2026-11-05. **Status:** the run is PAUSED pending his decision — see the choice at the end of the chat reply.

## The problem (stated plainly)

Workflows First Attempt v1 makes silent Gen-4.5 clips. Gen-4.5 does not generate embedded audio itself — a Gen-4.5 clip "can go straight into Runway's generative audio tools for voice, sound effects and music" after it is made. So no talking can be synced in the first pass, because there is no audio in the first pass. The "audio v2" step I had framed as narration-only was incomplete: it is narration **plus** a lip-sync step.

## How sync actually works (Runway's documented workflow)

1. **Picture pass** — generate the character clip in Gen-4.5. This is what the boards lock: the same face, every clip.
2. **Words pass** — record or generate the dialogue separately (the audio pick still open: upload narration vs in-app text-to-voice).
3. **Sync pass** — marry them. Runway's Lip Sync tool "takes uploaded audio — a voiceover, dialogue recording, or generated speech — and animates the mouth movements in an existing video clip to match it. It supports multiple faces in the same frame and handles clips up to 45 seconds." The documented workflow is: "generate a character clip in Gen-4.5, record or generate the dialogue separately in a dedicated audio tool, then use Lip Sync to marry them together."

## The two sync tools on his Pro plan

- **Lip Sync (audio-driven):** the narration audio alone drives the mouth. Simplest fit for Fireside — an elder telling a story, one voice, face mostly front-on.
- **Act-Two (performance-driven):** record your own facial expressions, head movements, body gestures on camera and map that performance onto the character. "Act-Two is available on Pro and Max plans." Fuller than lip sync alone — head tilts, eyebrows, pauses — but it needs a recorded performance, not just audio.
- **Limits that matter for us:** Act-Two "currently supports single-character inputs" — for two speakers in one frame, drive one face at a time and composite. Dialogues under 30 seconds total per Act-Two run. Our clips are 5 / 8 / 10 seconds, so they fit. Lip Sync handles clips up to 45 seconds.

## What this means for the pilot run

- Clips with talking (signature wide, teller close-up, kids listening) need the sync pass after the audio exists. Clips with no talking (fire open, fire close, radio corner) need no sync.
- The picture clips are **not wasted** — they are the sync pass's input. Generating picture first, then syncing, is Runway's own documented order.
- **Open check:** whether the sync step can live inside the App Studio app or must run in Runway Studio after the app makes the clip. That check is still to do, before any revision is written.

## The choice in front of him

- **Keep making picture clips, sync after** — finish the 6-clip Household A run as picture, then do audio + sync as the second pass.
- **Pause and settle audio + sync first** — decide the narration (upload vs text-to-voice) and confirm the sync route before generating more picture.
