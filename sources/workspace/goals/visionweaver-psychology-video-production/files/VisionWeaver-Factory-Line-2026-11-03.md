# VisionWeaver Factory Line — design 2026-11-03

## The model

TYPE → PIECES → LINE → SCHEDULE → POST.

- **TYPE:** one locked type sheet per series — look, feel, voice, pacing, fitted to the subject matter.
- **PIECES:** small one-job Runway apps, each configured from a type sheet (clip generator, thumbnail maker, voiceover).
- **LINE:** episode intake → batch build → QC → library.
- **SCHEDULE:** Muse runs the line on a clock (the sealed piece).
- **POST:** gated — only to channels that exist, only on his go per destination.

## Series type sheet (template)

- Series / episode
- Subject matter in one line
- LOOK: visual style, palette, lighting, camera language; locked reference stills
- FEEL: tone, mood, pacing
- VOICE: narration voice, music direction
- Recurring sets / characters
- Prompt template (the master clip-prompt pattern)
- Output specs: clip lengths (5/8/10s), thumbnail size, formats
- Placement / brand notes

## Starter registry

- **Fireside Chats — PILOT.** Photorealistic; Grand's Room + Radio Corner sets; Grand the teller; warm firelit. World bible + master clip-prompt template already exist (Drive); 5 starter prompts built 2026-11-03.
- **Crossroads of Identity.** Book 1, Episode 1 "The News." Type sheet to write.
- **This Is Your Life.** His episode "See and Feel" ("This is your life episode 1 scenes" doc, Drive, 2026-05). Its type differs from Crossroads — separate sheet.

## Line stages

1. **Type lock** — he approves the type sheet.
2. **Episode intake** — his script / scenes in.
3. **Batch build** — pieces generate per the type sheet.
4. **QC** — his test-all standard: everything checked before it ships.
5. **Library** — finished media lands in the CEO dashboard / VisionWeaver assets, labeled by series + type.
6. **Schedule** — cron runs the line on days + times he sets.
7. **Post** — manual-gated until channels exist and he approves destinations.

## The sealed piece (schedule sketch)

- Batch windows on his chosen days + times (nightly or a few times weekly).
- Each run: pull due episodes → build via pieces → QC report → stage to library → hold for post approval.
- Posting stays manual-gated: no channel, no post; no approval, no post.

## Open decisions (his)

- [ ] Pilot = Fireside Chats?
- [ ] Batch cadence (nightly? twice weekly? which days?)
- [ ] Post destinations (channels to create first)
