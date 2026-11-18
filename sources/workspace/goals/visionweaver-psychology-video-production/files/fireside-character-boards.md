# FIRESIDE CHATS — CHARACTER BOARDS

> **REJECTED 2026-11-05 — DO NOT USE.** The two board images in this document (Grand + Kids listeners, generated 2026-11-05) are rejected by the user: all-Caucasian casting, and regenerated instead of built from the already-created images. Standing rules now in MEMORY.md: his heritage is a blend of 11 different backgrounds and walks of life — every character must reflect that diversity, never all-Caucasian; and boards must be built FROM the already-created images as first created, never regenerated. The original Fireside images were searched 2026-11-05 (workspace, media library, Drive, GitHub, 2.0 HTML) and their files were not found in any reachable store — they exist only as names in the 2.0 app data. Awaiting his upload of grand-proof-01.png (and Kids/set stills) to rebuild correctly. Everything below is kept as the audit record only.

# FIRESIDE CHATS — CHARACTER BOARDS

**Project:** Fireside Chats (VisionWeaver factory line, pilot series)
**Built for:** Workflows First Attempt (Runway App Studio, one-screen Gen-4.5 clip generator)
**Style:** Photorealistic, cinematic. Warm firelight. This is NOT the First in Consciousness painterly style.
**Status:** DRAFT boards, 2026-11-05. Nothing here is locked until the Fireside type sheet is approved — the type sheet (2026-11-04) is still a draft awaiting his per-section keep / change / kill. Nothing here is rendered, recorded, or published as video.

> **Board-template rule (same rule as First in Consciousness, applies here too):**
> No new character, scene, room, or angle ships without a board, and boards are the single continuity source. When a later example batch arrives, its additions append to this template — locked boards are never rebuilt. A new version of a locked character is added as a new rung on that character's likeness ladder, never as a silent replacement.

## Accurate to Workflows First Attempt (the app as it really is)

- **Engine:** Gen-4.5, scene text + optional reference image.
- **Clip lengths:** 5 / 8 / 10 seconds. The app tops out at 10 — not 16.
- **Presets used for Fireside:** Cinematic Warm, Documentary Real. Animated exists in the app but is NOT a Fireside preset.
- **Reference image:** upload the locked Grand still as the reference image to pin his look. The app's reference upload is how Grand stays the same man every clip.
- **Audio:** v1 of the app is video-only. No audio wiring exists yet. Board audio notes (voice forward, fire crackle room tone) describe the finished clip, not the app today. Audio v2 (upload narration vs in-app text-to-voice) is still his open pick.
- **Sets:** Grand's Room + Radio Corner. Set boards and scene boards are the next pass — this delivery is characters only, as ordered.

## Standard header — shipped with every board

### Type 1 — Master JSON Payload (template)

```json
{
  "project": "Fireside Chats",
  "board_type": "character | environment | scene",
  "character_anchor": "ANCHOR NAME (e.g. GRAND, KIDS-LISTENERS)",
  "variant": "as locked on the board; never merge variants",
  "aspect_ratio": "16:9 for episode boards; 9:16 for Short covers; 1:1 for square cards",
  "style": "photorealistic, cinematic — never painterly, never illustrated",
  "color_science": "firelight golds, ember oranges, deep warm browns, soft amber shadows; no hue drift between boards",
  "dynamic_range": "soft highlights, readable shadow detail; faces never blown out or crushed",
  "lighting": "practical sources only — fireplace, lamps, radio glow; no flat studio light",
  "clip_lengths": "5 / 8 / 10 seconds (Gen-4.5 in Workflows First Attempt)",
  "preset": "Cinematic Warm or Documentary Real (Fireside only; Animated is not a Fireside preset)",
  "audio_routing": "voice forward when audio lands in v2; room tone and fire crackle only; no score over Grand's voice",
  "kinesic_callouts": ["per-character callouts from the spec sheet"],
  "transition_lock": "per scene, recorded in the shotdeck",
  "retention_check": "Should this image be referred to as [ANCHOR NAME]? Answer YES before saving any frame."
}
```

### Type 2 — Markdown System Directive (template)

- **Art logic:** photorealistic cinematic; same person, same design, only the angle changes between views.
- **Physics rendering:** cloth, hair, fire, and wood behave consistently with the spec sheet; nothing floats, clips, or changes material between views.
- **Kinesic detail:** micro-movement follows the per-character callouts on the spec sheet; expressions change, identity does not.
- **Continuity gate:** every frame is checked against the locked board image and the spec sheet before it passes to edit. Drift is regenerated, not shipped.

## How to read a ladder

Each character below has an **anchor name** (the locked identity every frame is checked against) and a **likeness ladder**: the locked version first, then board versions and correction callouts recorded during boarding. A callout is a fact about a board image, not a redesign — the locked look does not change because a board noted something.

**Retention question (asked before saving ANY frame):** "Should this image be referred to as [ANCHOR NAME]?" If the answer is not a clear yes, the frame is not saved.

---

## 1. GRAND, THE TELLER

**Anchor name:** GRAND
**Kind:** Elderly storyteller. **Locked sources:** locked photorealistic still `grand-proof-01.png` (in the VisionWeaver 2.0 media library — NOT a file reachable here, so this board was built from the written lock and must be checked against the still by eye). **Voice:** Homespun Basket (locked).

### Spec sheet (from the written lock only)
- **Face:** Weathered face, bright eyes, mid-story knowing smile. Same man, every time.
- **Pose:** Leaning forward in a worn leather armchair beside a crackling stone fireplace, hands gesturing as he speaks.
- **Setting:** Grand's Room — framed photos and old books on the walls.
- **Palette:** Firelight golds, ember oranges, deep warm browns, soft amber shadows.
- **Build:** Elderly, seated storyteller. A–F body-type letter: **TBD — not set for Fireside; do not guess.**
- **Wardrobe / hair (PROPOSED, not locked):** the board shows grey hair and a dark knit cardigan. Neither is in the written lock — both are board proposals pending his check against `grand-proof-01.png`.

### Board image
![Grand character board](sandbox://workspace/imagine_media/media-generation-fireside-grand-character-board-0-9afee20e-9371-47c3-975b-c6f7560efd1e.webp)
*File: `media-generation-fireside-grand-character-board-0-9afee20e-9371-47c3-975b-c6f7560efd1e.webp` — composite board: FRONT / SIDE / BACK turnaround seated by the fireplace, 6-view 360° head rotation (0° / 60° / 120° / 180° / 240° / 300°), 3-expression variation study (calm, eyes closed, listening; warm knowing smile; mid-story speaking, gesturing), detail panels (firelit face and bright eye, gesturing hands, leather armchair and fireplace glow).*

### Likeness ladder + correction callouts
- **Rung 1 — LOCKED (still `grand-proof-01.png`):** the anchor. Not reproduced in this board file — compare by eye.
- **Rung 2 — Board (this file):** matches the written lock on face, firelight, armchair, and fireplace. Callouts recorded, not redesigns: (a) the board header states "Age 72" — that age was invented by the board generator, it is NOT in the lock and is NOT locked; (b) the gesturing-hands detail shows a gold ring — not in the lock, treat as a board detail, not a new lock; (c) the eye detail shows redness from firelight reflection, not a change of eye colour.
- **Reference rule:** when generating clips in Workflows First Attempt, upload the locked Grand still as the reference image. This board does not replace the still.

### Kinesic callouts
- **Lean-forward gesture:** he leans in on the point of the story, hands open and gesturing; he settles back to listen.
- **Knowing smile:** the smile forms mid-story and holds a beat — it is the tell that the turn is coming.
- **Listening stillness:** when a listener speaks, Grand goes still, eyes on them, hands at rest.

---

## 2. FIRESIDE KIDS — THE TWO YOUNG LISTENERS

**Anchor name:** KIDS-LISTENERS
**Kind:** Two small children, listeners in the Fireside Kids strand. **Locked sources:** NONE — no names, no locked stills, no written descriptions exist in the record. This is a first-pass board, not a lock.

### Spec sheet (board-established only, NOT locked)
- **The pair:** A boy in a blue knit sweater and a girl in a mustard-yellow knit sweater with pigtails, sitting together on a rug.
- **Scene:** A kind elderly storyteller reads them a big picture book; fireplace glows warmly behind them; soft golden light, gentle and safe.
- **Palette:** Same Fireside firelight golds and warm browns.
- **Build:** Small children. A–F body-type letters: **TBD — not set; do not guess.**
- **Names:** NONE. Do not invent names. They are boarded as "the two young listeners" until he names them.

### Board image
![Fireside Kids listeners board](sandbox://workspace/imagine_media/media-generation-fireside-kids-listeners-board-0-bbbce71e-cfb0-44ed-9790-d10f7db63731.webp)
*File: `media-generation-fireside-kids-listeners-board-0-bbbce71e-cfb0-44ed-9790-d10f7db63731.webp` — composite board: FRONT / SIDE / BACK views of both children together on the rug, 3-expression variation study (listening intently, smiling, pointing at the picture book), detail panels (children's faces in firelight, the big picture book, storyteller and fireplace glow).*

### Likeness ladder + correction callouts
- **Rung 1 — Board (this file):** first pass. The same two children hold across every panel (same faces, same sweaters) — usable as the continuity reference until a lock exists.
- **Callouts recorded, not redesigns:** (a) no 360° rotation strip on this board — front/side/back plus expressions only; add a strip on the next pass if he wants one; (b) the bottom-right detail shows the storyteller in a brown cardigan and a different armchair than Grand's board — that panel does NOT match Grand's board and is not a new Grand lock; (c) the girl's small star earring appears in some panels only — board detail, not locked.
- **Two-board rule:** the children share ONE board because they have no individual locks. If he names them and locks each look, each gets their own board and ladder.

### Kinesic callouts
- **Listening intently:** both children face the storyteller, eyes on him or the book, bodies still.
- **Pointing at the book:** the pointing hand moves on a story beat, then returns to the lap — never fidgeting.
- **Shared glance:** the children check each other's reaction on a funny or scary beat, then look back at Grand.

---

## NOT Fireside characters (do not board as Fireside)

The VisionWeaver voice list holds other locked voices — Solemn Pillar (Steve, narration), Tender Cushion (Nannie), Wise Lighthouse (Wai Po), Husky Campfire (Papi), Abashed Blossom (Nadia). None of them is recorded as an on-screen Fireside Chats character. They are NOT boarded here. If he places any of them in Fireside, they get a board first — nothing ships without one.

---

## Board-template note (carried in every board file)

1. No new character, scene, room, or angle ships without a board. Boards are the single continuity source.
2. Every board ships with the Master JSON Payload + Markdown System Directive header above.
3. Every character board carries: turnaround (front/side/back), 360° strip, variation study, close details, spec sheet, body-type anchor, likeness ladder with correction callouts, and kinesic callouts.
4. Every environment board carries 4 panels (Wide Establishing / Medium Texture / Key Prop-Detail / Lighting Reference) plus multi-angle coverage and a floor plan / blocking diagram.
5. Every scene board carries numbered panels with time/beat position, VISUAL, VOICEOVER, ON-SCREEN TEXT, AUDIO, plus camera-work diagrams, lighting/mood notes, a shotdeck table with transition locks, and the retention question answered before any frame is saved.
6. Future example batches append to this template; locked boards are never rebuilt. New versions join the ladder as new rungs.
7. Nothing in this file is rendered, recorded, or published. It is a continuity document, not a finished video.

## Open decisions (his)

- [ ] Grand's wardrobe / hair / age — confirm against `grand-proof-01.png`, or correct the board
- [ ] Kids' names — name them, or keep them unnamed listeners
- [ ] Kids as one shared board, or a board each once their looks lock
- [ ] Fireside type sheet approval — locks these boards
- [ ] Audio v2 pick (upload narration vs in-app text-to-voice) — still open from 2026-11-04
- [ ] Next pass: Grand's Room + Radio Corner set boards, then Fireside scene boards
