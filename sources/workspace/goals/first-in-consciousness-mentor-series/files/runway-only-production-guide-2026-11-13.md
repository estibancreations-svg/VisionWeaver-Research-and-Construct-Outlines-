# First in Consciousness — Runway-Only Production Guide

**Date:** 2026-11-13
**Scope:** Runway only. No outside editing system. Web only (see Step 0 — the iOS app cannot run the full route).
**Starting point, as directed:** Images are created. Scripts are done. This guide does not rewrite scripts, redesign characters, or invent new lines.
**Source of truth for words:** The 8 production-package PDFs. Script pages are verbatim. Scene-map summaries are not substitutes for script pages.
**Source of truth for looks:** Locked portraits + episode heroes in the upload pack. Character/scene boards are continuity reference only — never animate a board grid.

**Work in this order, one episode at a time. Start with Speech 1.** Do not generate all 8 episodes at once. Finish Speech 1 through QC, learn what holds, then repeat the same steps for Speech 2, and so on.

---

## The whole route, in one list

1. Upload + organise (Assets)
2. Face-hold test — ONE cheap clip, checked before anything else
3. Picture — silent clips, scene by scene (Gen-4.5 / Turbo)
4. Words — narration in Runway, chunk by chunk (Generate Speech)
5. Talking faces — ONLY for close talking shots (Character Script to Video, or Act-Two if you record a performance)
6. Sound — music + bell + ambience, all in Runway
7. Upscale each approved clip BEFORE assembly
8. Assemble in Final Cut (Agent timeline) — picture + voice + music, in scene order
9. Text cards + QC + export (Download) — preview, verify, then publish

**Rule that governs everything:** Preview, verify, publish. Nothing publishes from an unverified render. If a face drifts, a line misreads, or a bell lands in the wrong place, fix that clip before you assemble. Do not assemble around a bad clip and hope the edit hides it.

---

## What Runway actually does here — verified 2026-11-13

Checked against Runway's own help articles on 2026-11-13. If what you see in Runway differs from this table, trust what Runway shows you in that moment (model picker, duration picker, credit cost shown before Generate) and stop before spending if a limit looks different.

| Step in this guide | Runway tool | Verified limit / cost |
|---|---|---|
| Picture | Gen-4.5 Image to Video (Tool / Apps) | Standard plan or higher. 12 credits/second. 2–10 seconds per clip. 720p. 24 or 25 fps. Image + motion prompt. |
| Picture (cheap tests) | Gen-4 Turbo (Tool) | 5 credits/second. 5 or 10 seconds only. 720p, 24 fps. Image required. Runway recommends testing in Turbo first. |
| Picture (older full) | Gen-4 (Tool) | 12 credits/second. 5 or 10 seconds only. 720p, 24 fps. Image required. Prompt limit 1,000 characters. |
| Talking (script + voice, no camera) | Character Script to Video (Apps) | Character image + typed script + voice, OR your own audio file. Produces synced performance video. Credit cost shown in the app — check it before Generate. No duration limit was stated on the help page checked; keep chunks at 30 seconds or less per the package rule. |
| Talking (your performance) | Act-Two / Performance Capture (Apps, Web only) | Standard plan or higher. 5 credits/second, 3-second minimum. Up to 30 seconds. ONE character per run. Driving performance video + character image or video. Gesture control only with a character image. Face must stay visible, waist-up at widest. |
| Words | Generate Speech (Tool > Audio) | Paste script, pick a voice, preview, Generate. Custom voices on Pro or higher. |
| Music / SFX | Agent (music, SFX, ambience) + SFX App | Music = standalone instrumental from a descriptive prompt. SFX App = sound effects from text descriptions. |
| Assembly | Final Cut timeline (Agent > New timeline) | Trim, split, move, split audio, per-track volume, Download to export. Images are NOT supported in the timeline — stills must first become video clips. |
| Upscale | Upscale under a generation / Upscale App | Generations start at 720p and can upscale to 4K. Upscale App accepts uploads up to 40 seconds. 4K upscale is Pro or higher per Runway's plan comparison. Upscale clips BEFORE assembly. |
| Longer scenes | Last-frame chaining | Runway's prompting guide: extract the last frame of a finished generation and use it as the image input for the next clip. That is how you cover a scene longer than 10 seconds. |

### Two corrections to older notes — read before you start

- **The standalone Lip Sync tool is gone.** Runway deprecated it on May 27, 2026, with Act-Two as its replacement. Do not look for a Lip Sync tool. If you want a face to talk, use Character Script to Video (script/voice route) or Act-Two (performance route). The old "Lip Sync up to 45 seconds" note no longer applies.
- **Final Cut has no documented text, caption, or transition controls** in the help articles checked. The documented controls are trim, split, move, split audio, volume per track, Detect Shots, and Download. This guide handles on-screen text with a Runway-only workaround (text cards as video clips — Step 8) and handles captions honestly in Step 8. Do not assume a text or fade button exists until you see it in your own Final Cut toolbar. If you are unsure, ask Agent in the Final Cut chat — Runway's own FAQ says Agent will tell you directly whether it can do a given edit.

### What "no outside systems" means for this guide

Every generation, voice, sound, upscale, and assembly step below happens inside Runway (web). The only steps outside Runway are: (a) you opening the production-package PDFs to read/paste the verbatim script, and (b) you uploading the finished Download to YouTube / Instagram, where that platform's own caption setting lives. No outside editor, no outside voice tool, no outside music library is used in the steps below.

---

## Step 0 — Before you spend a credit

Do this once, before Speech 1.

- [ ] **Use Runway on the web** at app.runwayml.com, on a computer browser if you can. Gen-4.5 is Web only. Act-Two is Web only. Apps are unavailable in the iOS app (mobile browser only, per Runway). The iOS app alone cannot run this route.
- [ ] **Check your plan and credit balance** in Runway before you generate. Note the number. Every generation below shows its credit cost before you press Generate — read it every time.
- [ ] **Set Agent to ask before generating** (recommended for Speech 1): In Agent settings (bottom right of the prompt panel), choose "Ask before generating media." Agent will then show its plan — model, prompt, estimated cost — and wait for your go-ahead. This stops surprise spending while you learn the route. You can switch it back later.
- [ ] **Lock your episode settings and do not change them mid-episode:**
  - Aspect: **16:9, 1280x720** for the main episode. (Shorts are cut separately — see Step 8.)
  - Frame rate: **24 fps** everywhere in the episode. Gen-4.5 lets you pick 24 or 25 in Advanced settings — pick 24 and stay there.
  - Model for finals: **Gen-4.5** for picture finals. **Gen-4 Turbo** for tests only.
- [ ] **Keep the production-package PDF for the episode open beside Runway.** You will paste script chunks from its script pages, word for word. Do not retype from memory. Do not paraphrase.
- [ ] **Keep the character board + scene board beside Runway** for Speech 1 (files listed in "What you already have" below). Before you save any frame, ask the retention question: *"Should this image be referred to as OKTA-N / OKTA-G / AELUNE?"* If the answer is not a clear yes, do not save it. Regenerate or re-prompt; do not ship drift.

### Credit math — plan Speech 1 before you press Generate

Gen-4.5 picture costs 12 credits per second. Turbo costs 5 credits per second. Act-Two costs 5 credits per second (3-second minimum).

Worked arithmetic only — your finished length will differ with pacing and pauses:

- 60 seconds of picture at Gen-4.5 = 720 credits. At Turbo = 300 credits.
- 3 minutes 13 seconds of words-only audio (Speech 1 guide read) needs at least 193 seconds of picture to cover it — 2,316 credits at Gen-4.5, 965 at Turbo — before retakes, voices, music, or upscale.
- A 6-minute finished episode needs 360 seconds of picture — 4,320 credits at Gen-4.5, 1,800 at Turbo — before retakes and audio.

That is why this guide says: **test in Turbo, final in Gen-4.5, one scene at a time, no bulk generation.** Count clips, not hopes. A 10-second Gen-4.5 clip is 120 credits. A 10-second Turbo clip is 50 credits. Write down each clip's cost as you go.

---

## Step 1 — Upload + organise in Runway Assets

### What you already have (verified on file)

**Locked portraits (continuity anchors):**
- Okta — locked portrait (`okta.webp`). Speech 1 scene boards use Variant N (non-glasses). Thumbnails split: Short cover = non-glasses, main thumbnail + Instagram card = round glasses (OKTA-G). Name which branch every frame belongs to before you save it. Do not merge branches.
- Aelune — locked portrait (`aelune.webp`). Wings decision still open (see "Decisions still needed" — do not lock wings in by accident).
- Sera'ath A2 "Canopy Matriarch in Bloom" + Mother Vess B1 "Opal River Mother" — kept, not Season 1 leads. Do not use them as leads in Speeches 1–8.

**One hero/cover image per speech** (first-frame candidates — see aspect warning below):
Speech 1 Okta hero, Speech 2 Okta hero, Speech 3 Aelune hero, Speech 4 Okta hero, Speech 5 Aelune cover, Speech 6 Aelune cover, Speech 7 Okta cover, Speech 8 Okta cover.

**Thumbnails + Short covers** for Speeches 2–8 (JPGs in each production-package folder) + Speech 1 posting pack. Posting art only — do not animate them.

**Boards (reference only):** Character Boards file + Speech 1 Scene Boards file (13 scenes, verbatim voiceover, camera, text, audio). Board images are grids with labels. Never upload a board grid as a Gen-4.5 input image.

**Guide narrations (NOT final voices):** 8 MP3s in `speech-audios/` (Speech 1: 3:13; Speech 2: 4:01; Speech 3: 2:58; Speech 4: 4:37; Speech 5: 3:17; Speech 6: 2:31; Speech 7: 2:54; Speech 8: 3:05), all in one guide voice. Use them to hear pacing only. Final voices are generated fresh in Runway in Step 4 — one distinct voice per character, per the packages.

**Upload pack prepared for this guide:** `runway-upload-pack-2026-11-13.zip` (same folder as this guide) — 4 locked portraits + 8 heroes/covers as JPGs, plus README. No board grids, no thumbnails, no other series' images.

### Do this in Runway

1. In Runway, open **Assets**. Upload the ZIP contents (or the individual JPGs) for Speech 1 first: Okta locked portrait + Speech 1 hero. Upload the rest when you reach those episodes — do not upload all 8 episodes' heroes into one pile with no names.
2. Name/organise so you can find a file by episode + scene later. Suggested naming in Runway (use whatever naming Runway lets you keep — favourites + session folders help):
   - `S1-OKTA-LOCKED`
   - `S1-HERO`
   - Clips you keep: `S1-S01-v1`, `S1-S02-v1`, and so on (S = scene). Favourite every keeper the moment you approve it.
3. **Aspect warning — check before every generation:** Most portraits/heroes are portrait-shaped (tall), not 16:9. When you pick 16:9 in Runway, Runway will prompt you to crop the image. Crop so the face stays centred and fully in frame, with eyes and mouth visible. Check the crop preview. A bad crop that cuts the face will ruin Act-Two and Character Script to Video later. If a portrait crops badly for a wide scene, use the Runway-only stills step in Step 3 (Gen-4 Image with References) to make a wide first frame from the locked portrait — do not stretch, and do not silently redesign the character.

### What does NOT exist as a per-scene still

Only Speech 1 has boarded scene visuals, and those boards are grids, not single stills. Speeches 2–8 have one hero each, not 12 stills each. That is normal for this route: you cover scenes by (a) animating the hero/locked image with different motion + camera prompts, (b) chaining last frames, and (c) where a scene needs a genuinely different framing (close on hands, wide establishing, prop close-up), making that one still inside Runway from the locked reference (Step 3). Do not claim a scene still exists when it does not. If you have per-scene stills saved elsewhere (Drive, uploads), upload those first and use them as first frames scene by scene — the steps below do not change.

---

## Step 2 — Face-hold test (do this first, once, before Speech 1)

**Purpose:** Prove the face holds in motion before you spend credits on 13 scenes. One cheap clip. Pass/fail. If it fails, fix the input/prompt — do not proceed to full scenes.

1. Go to **Tool** (left sidebar) > **Video** tab. Open the model dropdown (bottom) and select **Gen-4 Turbo**.
2. Upload **Speech 1 hero** (or Okta locked portrait) as the input image. This image is the first frame.
3. Prompt (motion only — do not re-describe the character):
   > `The camera holds static and close. Okta stays still, listening, with only a very slight head tilt and slow blink. Warm golden-hour light on the river behind her. Water moves slowly. No camera move.`
4. Settings: **16:9, 5 seconds, 24 fps**. Check the crop. Check the cost (25 credits for Turbo 5s). Press **Generate**.
5. Watch the full 5 seconds, twice. Pass only if ALL are true:
   - [ ] Same face, same shell-cloak, same staff/bell as the locked image — no drift, no new glasses (or glasses stay, if you used the OKTA-G branch — either way, no branch-switch mid-clip).
   - [ ] Eyes and mouth stay defined and in place. No melting, no extra face, no hands appearing from nowhere.
   - [ ] Motion is calm and river-paced. No sudden lurch, no rushed camera.
   - [ ] Background stays the river crossing — no new room, no new angle invented.
6. **If it passes:** Favourite it. Note the exact image + prompt + settings you used. That is your Speech 1 baseline. Proceed to Step 3.
7. **If it fails:** Do not generate 12 more clips hoping one works. Change ONE thing at a time and re-test in Turbo: (a) try the other Okta image (hero vs locked portrait), (b) shorten the prompt to one motion only, (c) try 5 seconds only (not 10), (d) re-check the crop. If the face still will not hold, stop and report what you saw (which image, which prompt, what drifted) before spending further — that report is what lets the next fix target the real cause.

---

## Step 3 — Picture: silent clips, scene by scene (Gen-4.5 / Turbo)

Gen-4 / Gen-4.5 clips are **silent picture only**. No dialogue, no music comes out of this step. Sound is added in Steps 4–6 and laid together in Step 8. Never present a silent clip as a finished talking scene.

### The click-path (same for every picture clip)

1. **Tool** (left sidebar) > **Video** tab.
2. Model dropdown (bottom): **Gen-4 Turbo** for a first test of a scene; **Gen-4.5** for the final version of that scene once the test holds. (Gen-4.5 is also in Apps View — search "Gen-4.5". Either entry is fine; settings are the same.)
3. Upload/drag the **first-frame image** for that scene (see the run sheet for Speech 1, and the per-episode hero for other speeches). The image is the first frame — composition, light, and style come from the image.
4. Write a **motion-only prompt**. Describe what moves, how the camera moves, and pacing. Do not re-describe what is already in the image. Keep it under 1,000 characters (Gen-4 limit). One clear motion per clip beats three motions rushed into 5 seconds.
5. Settings:
   - Aspect: **16:9 (1280x720)**. Check the crop every time.
   - Duration: **5 seconds** for a simple motion; **10 seconds** (Gen-4.5: any 2–10 seconds) when the prompt asks for sequential actions. For Gen-4/Turbo, only 5 or 10 exist — nothing in between.
   - FPS: **24** (Gen-4.5: Advanced settings).
   - Fixed seed: leave unchecked unless you are trying to repeat a motion you already liked — then paste that output's seed.
6. Read the credit cost shown. Press **Generate**.
7. Watch the whole clip. Check it against the locked image + board (retention question). **Favourite** keepers. Delete or ignore failures — do not let a failed clip into the timeline.
8. If a scene needs more than 10 seconds of picture: **chain it.** Take the last frame of the approved clip (Runway: **Use > Use Current Frame** on the last frame, or extract the last frame per the prompting guide) and use it as the input image for the next clip, with the next beat of motion. Name them `S1-S11-a`, `S1-S11-b`, and so on, in order. Never jump-cut to a fresh unrelated image mid-scene unless the scene map calls for a new shot.

### Motion rules from the packages (apply to every scene)

- **Visual change every 8–15 seconds** within each scene. A 30-second scene needs 2–4 distinct shots/beats, not one 10-second clip looped three times.
- **Hook (Scene 1) under 8 seconds.** Single shot, static, close, no branding opener. Generate it at 5 seconds and trim in Final Cut if needed — do not generate a 10-second hook and hope it feels short.
- **Pacing reset every 30–60 seconds.** A hold, a wide, a stillness beat. The scene maps mark these — honour them in picture, not just in voice.
- **Payoff at 70–85% of runtime.** You place this in Final Cut (Step 8) by ordering + trimming, not by generating the payoff clip longer.
- **Camera language:** Use the camera move the scene map names (static, slow push-in, gentle pan, tilt up, pull-back, rack focus, low water-level drift, steady single take, follow). Translate it into a motion prompt — see the Speech 1 prompt bank in the run sheet. Do not invent a flashy move the board did not call for.

### If a scene needs a still you do not have (Runway-only, References)

Only when the hero/locked image cannot frame the shot (e.g., close on the staff, wide establishing, prop close-up):

1. In Runway, use **Gen-4 Image with References**. Upload the locked portrait as a reference and reference it in your prompt with `@` (Runway's documented method: `@name` in the prompt keeps the character consistent). Describe the new framing in full sentences. Example pattern (adapt the framing, keep the character reference):
   > `@Okta, close on her wooden staff with rings and small brass bell, river water behind, warm golden-hour light, painterly fantasy illustration, same character as the reference.`
2. Generate ONE still. Check it against the locked portrait (retention question) before you animate it. If it drifts, regenerate with the reference again — do not animate a drifted still.
3. Animate that still with Gen-4.5 / Turbo as above. Save the still in Assets with the scene name so you can reuse the framing later.
4. **Never** generate a new character design from text alone when a locked portrait exists. References first, always. Locked boards are never rebuilt silently — a new still is a new frame for a named scene, not a new lock.

### Shorts picture — do not generate twice

The Short (45–60 seconds) reuses picture from the main episode. Do not generate a second set of clips for the Short. In Step 8 you build a second Final Cut timeline from the same approved clips, in Short order (hook + punch line + practice + bridge, per each package's Short beat sheet), and export it separately. For 9:16 Shorts, use Runway's **Expand Video / Edit Studio** to expand a finished clip's aspect ratio, or generate the Short's clips at 9:16 from the start if you know a clip is Short-only. Do not crop 16:9 finals by guessing — check the face stays centred in 9:16.

---

## Step 4 — Words: narration in Runway, chunk by chunk (Generate Speech)

Packages require: **one distinct cast voice per lead, no impression of any existing character; second voices distinct; narration in chunks of 30 seconds or less per scene; captions checked against the script** (captions handling is in Step 8).

### Pick and lock voices BEFORE you generate the episode

1. **Tool** > **Audio** (top of left panel). Model picker (next to Generate): pick a model with **Text to Speech** next to its name.
2. Preview voices (play button next to each voice name). Pick:
   - **Okta voice:** one voice, used for every Okta line in every Okta episode. Warm, unhurried, elder. Write down the exact voice name + model you picked.
   - **Aelune voice:** one voice, different from Okta, used for every Aelune line. Write it down.
   - **Second voices:** traveller (younger), student, parent, man, woman — one voice each, distinct from the lead. A second voice only speaks its own quoted lines (see run sheets). Do not let the lead voice read another character's lines in the final mix.
3. Do not add delivery tags (like `[whispers]`) into locked script text unless you have decided that tag is part of the delivery and noted it. Tags change delivery. The script words themselves do not change. If a model reads emotion from the script itself, let the words + pauses do the work first, and only add a tag if a re-listen proves a line needs it — then note the tag beside that chunk so a re-record can repeat it.
4. Custom/cloned voices (Pro or higher, 50 credits to create a custom voice) are optional. Do not clone a voice for Speech 1 unless you have decided you want a custom Okta/Aelune voice for the whole series. A preset voice, locked and reused, is the faster Runway-only route.

### Generate one chunk at a time

For each scene, in scene-map order:

1. Open the episode PDF to its **script pages**. Copy the exact lines for that scene — punctuation and pauses included. The run sheet for Speech 1 lists the exact voiceover per scene; for Speeches 2–8, copy from the PDF script pages (pages 2–5) following the scene map.
2. Paste **one scene's lines** into the Generate Speech text field. If a scene's lines would run over 30 seconds spoken, split that scene into two chunks at a sentence/pause boundary and name them `S01-chunk-a`, `S01-chunk-b`. Never paste a whole episode into one generation.
3. Select the locked voice for that speaker. Press **Generate**.
4. **Listen to the whole clip, against the script, word for word.** Check:
   - [ ] Every word present, in order. No added, dropped, swapped, or repeated words.
   - [ ] Names and key phrases pronounced acceptably ("Okta", "Aelune", "the Current", the aphorism). If a name mispronounces, regenerate that chunk — do not ship a misread name.
   - [ ] Pauses land where the script marks them (after questions, definitions, punch lines). If the read rushes a marked pause, regenerate or split the chunk so the pause can be placed in Final Cut by spacing clips.
   - [ ] No stray words, no read-aloud of headers/labels ("Hook", "Story", page numbers). If the generation speaks a label, your paste included it — re-paste words only and regenerate.
5. Name/save keepers by scene + chunk. Favourite them. A failed read is deleted/ignored, never assembled.
6. **Do not reuse the guide MP3s as final audio.** They are one guide voice for all 8 speeches. Finals need the locked cast voices above. Keep guide MP3s only as pacing reference.

### Pauses, bell, and silence are part of the script

- A marked pause is not dead air to cut. In Final Cut you will space voice clips so pauses breathe, and hold picture over the pause. Do not trim pauses out to "tighten" the episode.
- The brass bell (Okta episodes) sounds ONLY where the package says it sounds (Speech 1: Scene 1 open + Scene 13 bridge; other episodes per their scene maps). Do not add bell rings to other scenes. Bell audio itself is made in Step 6 — do not ask Generate Speech to make a bell.

---

## Step 5 — Talking faces: ONLY where the face must talk

**Default for this series: narration over picture.** Most lines are Okta/Aelune telling a story or teaching while picture shows the scene. Those scenes do NOT need lip movement. Lay the Step 4 voice over Step 3 picture in Final Cut (Step 8) and the episode works.

Use a talking-face pass ONLY when a shot meets ALL three tests:
1. The face is close, centred, and clearly visible (waist-up at widest, eyes + mouth defined).
2. The character is speaking directly in that shot (hook to viewer, direct question, punch line to camera).
3. A still/nodding face under that line would look wrong on a full watch.

If any test fails, stay with narration-over-picture for that shot. Do not sync every scene — it burns credits and risks face drift for no gain.

### Route A — Character Script to Video (no camera needed) — USE THIS FIRST

Best Runway-only route for close talking shots when you do not want to film yourself.

1. **Apps** (left sidebar; if you see App Studio, choose **Switch to classic Apps** at the bottom) > search **Character Script to Video**.
2. **Character:** Upload/select the locked portrait or hero for that lead. Character must be clearly visible and centred. Check the crop — face fully in frame.
3. **Script:** Choose **Text** mode. Type/paste the EXACT lines for that shot only (one chunk, 30 seconds or less worth of words). Choose the locked voice for that character (same voice name as Step 4 — if the app's voice list differs, preview and pick the closest match, and note the difference; do not silently switch voices mid-episode). OR choose **Audio** mode and upload the approved Step 4 chunk for that shot.
4. Press **Generate**. Watch the whole result. Pass only if: face holds (retention question), mouth movement matches the words closely enough to watch without distraction, no drift to a different face, no branch-switch (glasses/no-glasses).
5. If it fails, re-run with (a) a tighter crop on the face, (b) a shorter chunk, or (c) the other character image. Do not run the same failing input repeatedly.
6. Save keepers as `S1-S01-TALK-v1` and so on. These clips already carry voice — in Final Cut, do NOT also lay the Step 4 chunk under them (that would double the voice). Mute/omit the separate voice clip for any shot already voiced by Character Script to Video.

### Route B — Act-Two (you film a performance) — USE ONLY IF YOU WANT YOUR OWN ACTING ON THE CHARACTER

1. Record a **driving performance video** first: one person, face visible throughout, waist-up at widest, well-lit, no cuts, clean audio, steady volume, minimal background noise. Keep it **under 30 seconds** (Act-Two maximum; 3-second minimum). Start in a similar pose to the character image if you will use gesture control. Hands in frame at the start if gestures matter.
2. **Apps** > **Performance Capture with Act-Two**.
3. Upload (a) driving performance video, (b) character input: **image** (for gesture control + automatic environmental motion) OR **video** (keeps the original video's camera/environment motion; face/expressions only, no gesture control). For Speech 1, prefer the character **video** from Step 3 when you want to keep a specific camera move, and the character **image** when you want gesture control. Do not mix the two expectations.
4. Settings: **Gestures** (image inputs only) — on if you want body/pose transferred, off for face + environment only. **Facial Expressiveness** — start at default 3, then adjust (lower = less expressive, may hold consistency; higher = more expressive, may artifact).
5. Check the credit cost (5 credits/second). Press **Generate**. Watch fully. Same pass/fail as Route A, plus: performance timing feels river-paced, not rushed.
6. To change the voice after an Act-Two generation: **Use > Change Voice**, preview, select, Generate. Note: the new voice may match the original audio's accent.
7. **Multi-character shots:** Act-Two supports single-character inputs only. For a two-character shot, Runway's documented workaround is: record each character's dialogue separately (each under 30 seconds), generate a base video, crop/isolate each character, run Act-Two per character, and composite. That is advanced and credit-heavy. For Season 1, avoid it: cut between single-character shots (Okta close, then traveller close) instead of forcing both faces to talk in one frame. The scene maps already favour singles and two-shots where only one voice speaks — follow them.

### What NOT to do

- Do not look for standalone Lip Sync — deprecated May 27, 2026.
- Do not run Act-Two on a wide shot, a back view, a profile that hides the mouth, or a shot with cuts. It will fail the face test.
- Do not sync a shot just because you can. If the narration-over-picture version already watches well, ship that version.

---

## Step 6 — Sound: music + bell + ambience, all in Runway

Packages require: **music 9–12 dB under the voice** (voice forward, always); Okta's brass bell only at the marked points; ambience that never competes with silences.

Runway's Final Cut volume control is **per track** (click the track's left icon), not per-clip decibels. You will set the music track clearly lower than the voice track and check by ear on a full listen. Do not claim an exact dB number you did not measure — "clearly under, voice always intelligible" is the check that matters.

1. **Music — one track per episode, reused, not regenerated per scene:**
   - In **Agent**, ask for a standalone instrumental track from a descriptive prompt. Example pattern (adapt the mood words to the episode's setting, keep it instrumental and unhurried):
     > `A slow, warm, unhurried instrumental track for a river crossing at golden hour. No vocals, no drums driving the pace, no sudden swells. Gentle, spacious, river-paced.`
   - Listen fully. Reject anything with vocals, a driving beat, or swells that would fight the voice. Keep ONE approved track per episode. Name it `S1-MUSIC`.
   - If Agent offers multiple models, keep "Ask before generating" on and approve the plan/cost first.
2. **Bell — ONE asset, reused:**
   - In **Apps > SFX**, create a single small brass bell sound from a text description (e.g., `a small brass bell, one clear ring, warm, short decay, no echo tail`). Listen. Keep ONE approved bell file: `OKTA-BELL`.
   - Reuse that same file at every marked bell point. Do not generate a new bell per episode or per scene — the bell is an audio signature and must sound identical every time.
   - Speech 1 bell points: Scene 1 (open, once) + Scene 13 (bridge, once). Scene 4 staff close-up: bell is SILENT. Do not add a ring there.
3. **Ambience (only where the package calls for it):** Night Shelf episodes call for soft night ambience / room tone / kettle / distant night air; river episodes call for water. Generate ONE ambience bed per setting in Agent/SFX, keep it low, and never let it cover a scripted silence. If you cannot get a clean, low ambience that stays out of the way, ship voice + music only — silence is scripted and is better than noisy ambience.
4. **No other sound effects** unless the scene map names one. Do not decorate scenes with extra SFX. Every sound must be traceable to the package for that episode.

---

## Step 7 — Upscale each approved clip BEFORE assembly

1. For every keeper clip from Steps 3 + 5, use **Upscale / Upscale to 4K** beneath the completed generation. Iterate at 720p; upscale only keepers.
2. The Upscale App accepts uploaded videos up to 40 seconds — your clips are 2–30 seconds, so they fit. Do NOT wait to upscale the finished 6–12 minute timeline as one file and assume it will work the same way. Upscale clips first, assemble upscaled clips second.
3. After upscale, watch the clip once more (upscale can expose a drift you missed at 720p). If upscale exposes a failure, replace that clip and upscale its replacement — do not assemble a clip you would not ship at 720p.
4. Keep both versions in Assets until the episode exports cleanly. Name upscaled keepers clearly (e.g., `S1-S01-v1-4K`) so you do not accidentally assemble the 720p draft.

---

## Step 8 — Assemble in Final Cut: put it all together (Runway only)

This is the "put it all together" step. Everything before this made pieces. This step orders them, trims them, lays sound under/over them, and exports one finished video — all inside Runway.

### Open Final Cut

1. Click **Agent** in the left sidebar (or go to app.runwayml.com/agent).
2. Click the **New timeline** card below the message box. This opens an empty timeline with Agent chat alongside it. You can build manually, ask Agent to help, or both. For Speech 1, **build manually** the first time so you control scene order, pauses, and bell placement exactly. Use Agent help only for mechanical moves you have already decided (e.g., "put these clips in this order").
3. Name the timeline: click the name in the top left, select **...** next to the Agent session > **Rename**, type `S1 — You Are Not Behind — You Are Mid-River (MAIN)`, Rename again.

### Lay down tracks (keep them separate)

Use separate tracks so you can adjust sound independently:

- **Track 1 — Picture:** approved upscaled video clips, in scene order S1 → S13.
- **Track 2 — Voice:** Step 4 voice chunks (plus Character Script to Video / Act-Two clips' own audio where those clips already carry voice — see rule below).
- **Track 3 — Music:** the ONE approved music track, spanning the episode, volume lowered.
- **Track 4 — Bell / Ambience:** bell file placed ONLY at marked points; ambience bed if used, volume lowered.

Add clips by: **drag and drop** a video file directly onto the timeline, OR click **+** below the track header to add a new track + file, OR click **+** at the end of an existing track to add a new file to that track. You can also upload clips as references in Agent chat and ask Agent to assemble them — but check the resulting order yourself, clip by clip, before you export.

**Images are not supported in the timeline.** If you drag a still image in and it will not place, that is expected per Runway's docs. Stills must first become video clips (Step 3). This includes text cards — see "On-screen text" below.

### Order, trim, and place — in this sequence

1. **Picture first, in scene order.** Place S1, S2, … S13 left to right. No gaps unless a gap is a scripted pause held on picture (in that case, extend/hold the picture clip, do not leave black unless the Short open/close calls for True Black — see below).
2. **Trim each picture clip to its voice.** Drag the left/right edge to shorten. To split: position the playhead, click **Split** in the toolbar (or Cmd+B / Ctrl+B). Clips can trim to about 0.1 seconds. Trim picture to fit voice + pauses — never trim voice to fit a short picture clip by cutting words. If picture is too short for its voice chunk, add the next chained clip for that scene (Step 3 chaining) or extend with a held beat from the same scene. Never speed up voice to fit picture.
3. **Place voice clips** on Track 2, aligned to their scenes. For Character Script to Video / Act-Two clips that already carry voice: that clip's audio IS the voice for that shot. Do not double-lay the Step 4 chunk under it. If you need to move that audio independently, right-click the video clip > **Split audio** — the audio moves to its own track so you can adjust it separately.
4. **Space for pauses.** After questions, definitions, and punch lines, leave the pause the script marks. In practice: do not butt the next voice chunk hard against the previous one. Let picture hold, in silence except music/ambience, for the beat. Listen for rushed joins — if two lines collide, separate them.
5. **Place music** on Track 3. Click the track's left icon to adjust volume — volume applies to ALL clips in that track. Set music clearly under voice. Listen to the quietest voice line with music playing: every word must stay intelligible. If any word is masked, lower music further. Do not raise voice to fight music.
6. **Place the bell** on Track 4 ONLY at marked points (Speech 1: once at S1 open, once at S13 bridge). Listen for: one clear ring, no double-ring, no ring bleeding into the next line. If the bell file has a long tail, trim it.
7. **Check the payoff position.** Scene 12 (payoff) must sit at 70–85% of the finished runtime. Check it by time: (payoff start time ÷ total runtime) must be between 0.70 and 0.85. If it sits earlier, your early scenes are too compressed or your later scenes too long — adjust trims/pauses, do not move scenes out of order. If it sits later, trim holds/pauses before it. Do not ship a payoff at 50% or 95%.
8. **Check the hook.** Scene 1 must land under 8 seconds from the first frame to the end of the hook line. Time it in the timeline. No branding opener, no title card before the hook. The episode opens on Okta, mid-river light, hook line, bell once.
9. **Review in 2–3 minute segments** (Runway's own longer-video guidance). Watch S1–S4, then S5–S8, then S9–S13, checking continuity + flow in each segment, then watch the whole episode once straight through. Fix segment problems before the full watch.

### Transitions — what Final Cut does here

The help articles checked document **hard cuts** (clips placed adjacent, trimmed/split) — they do not document fade/dissolve/transition presets in Final Cut. The scene boards' transition locks (Linear Snap / Dot 0.5s / True Black instant) are PROPOSED and unconfirmed (see Decisions).

Runway-only handling:
- **Within the teaching:** use clean hard cuts between shots, timed to pauses/line ends. That matches "Linear Snap" in practice (continuous, no fancy transition drawing attention to itself).
- **True Black (Short open/close only):** make a 0.5–1 second black video clip inside Runway (generate a black frame still via Gen-4 Image, animate it as a 2-second Gen-4.5 clip with "no motion, black frame, hold still" — or trim a black portion if Runway offers one in your build) and place it at the Short's open/close in the Short timeline. Do not put black inside the main episode except where a scene map calls for it.
- **Dot 0.5s at the bridge (proposed):** no documented Dot transition control was found in Final Cut help. Do NOT promise it. Ship a clean cut + bell + pause at the bridge for Speech 1, and note the Dot as unconfirmed. If Agent in Final Cut chat says it can add a dot/dissolve transition in your build, test it on a copy of the timeline and watch it before you keep it — do not let an untested transition into the final export.

### On-screen text — Runway-only workaround (text cards as video clips)

On-screen text appears ONLY where the scene map lists it. Do not caption every line as text. The packages list 6 text moments for Speech 1 (see run sheet). Since Final Cut has no documented text-overlay control in the help checked, make each text moment a short video clip and place it in the timeline:

1. In Runway, generate a **text-card still** with Gen-4 Image: plain, readable, episode palette (gold/dark for CEO-adjacent work is NOT the palette here — use the episode's own warm golden-hour / night-shelf palette per the boards; Speech 1: warm gold on dark river tones). Text must read EXACTLY as listed in the run sheet, in capitals as listed. Check spelling letter by letter — generated text misspells often. Regenerate until the text is perfect. Do not ship a misspelled card.
2. Animate the still into a **2–5 second video clip** with Gen-4.5 / Turbo, prompt: `Hold still. No camera move. Text stays sharp and centred.` (A still card held as video is the point — no motion to blur the words.)
3. Place the text-card clip in the Picture track at the exact scene beat, OR — if you prefer text over picture — ask Agent in Final Cut chat whether your build supports layering a text-card clip over picture on a second video track. If layering is not available/clean in your build, place the card as its own beat (full-frame card, voice continues over it) and keep it brief (2–3 seconds). Do not cover a talking face with a card for the whole line.
4. Alternative that stays honest: if text cards look clunky on first test, ship Speech 1 WITHOUT burned-in text cards and rely on the spoken lines + platform captions (below), then revisit cards after you see the clean cut. A clean episode with no cards beats a clumsy episode with misspelled cards. The text moments are listed in the run sheet so you can add them later without re-recording anything.

**Speech 1 text moments (exact):** S1 `STOP MEASURING FROM THE BANK` · S5 `WHERE ARE YOUR FEET?` · S8 `NOBODY CROSSES FROM THE BANK` · S10 `MID-RIVER, NOT BEHIND` · S11 `ONE TASK. RIVER PACE.` · S12 `PEACE IS A PACE, NOT A PLACE` · S13 `NEXT — HURRY IS FEAR WITH ITS SHOES ON`. No text in S2, S3, S4, S6, S7, S9.

### Captions — honest handling

The packages say captions come from Whisper-class ASR, checked against the script. **No caption-generation control in Final Cut was found in the Runway help checked.** Do not claim Runway Final Cut will auto-caption your export.

Runway-only + publish handling:
- Export the finished video WITHOUT burned-in captions from Runway.
- At upload to YouTube / Instagram, turn ON that platform's captions/subtitles and **check the auto-captions against the script, word for word**, correcting names ("Okta", "Aelune", "the Current") and aphorisms before you publish. That check is the QC step the package requires — the platform is only the caption display, not an editing system in this route.
- If Runway Agent in your build offers captions/transcript for the timeline, test it on Speech 1 and check its output against the script before you rely on it. Do not ship unchecked auto-captions.

### Short cut — second timeline, same clips

1. In Agent, start a **second New timeline**. Name it `S1 — SHORT (45–60 sec)`.
2. Reuse approved clips only, in Short order per the package's Short beat sheet. Speech 1 Short uses: S1 hook + S10 punch line + S11 practice + S13 bridge. Total 45–60 seconds. Hook still under 8 seconds. True Black instant at open and close only (see above).
3. Voice: reuse the same voice chunks (trimmed to the Short beats). Do not re-record Short voice separately.
4. Music: same track, same low level. Bell: only if the Short beat sheet calls for it at the open/bridge — do not add extra rings.
5. Export separately. The Short is a separate file from the main episode. Do not export the main timeline and call a trimmed copy the Short without checking its runtime (45–60 seconds) and its beat order.

### Export + save

1. When the cut is ready, click **Download** (top-right of the timeline) to export the finished video. Watch the downloaded file fully, outside the timeline, before you call it done. Timeline playback can hide a join problem that the export reveals.
2. **Keep source clips in Runway Assets** until the export is verified and backed up. Do not delete session clips the moment you Download.
3. On iPad/mobile: if Download opens a player window instead of a save dialog, use that player's share/save control to save to Files/Photos, and verify the saved file plays fully. Keep the file safe in Runway Assets until the save is verified on the device you will upload from. (This save behaviour was flagged for the Runway App Studio download in Fireside work — the same caution applies here: verify the save, do not assume it.)
4. **Do not publish until QC passes** (below). Download is not publish. QC preview is a gate, per every package.

---

## QC checklist — every episode, before publish

Watch the exported file once straight through, with the script + scene map beside you. Every box must pass. If one fails, fix that clip/chunk in Runway and re-export — do not publish with a known fail.

- [ ] **Words:** Every script line present, in order, word for word. No added/dropped/repeated words. No headers/labels spoken. Names pronounced acceptably.
- [ ] **Voices:** Lead voice consistent throughout. Second voices distinct and only on their own lines. No voice-switch mid-episode. No double voice (Character Script to Video + laid voice on the same shot).
- [ ] **Faces:** Retention question passes on every shot. No drift, no branch-switch (glasses), no melting. Talking shots (if any) match words closely enough to watch.
- [ ] **Picture order:** Scenes in scene-map order. Visual change every 8–15 seconds. Hook under 8 seconds. Payoff at 70–85%. Bridge outro, no hard goodbye, no end-card branding block.
- [ ] **Sound:** Voice forward, music clearly under, every word intelligible. Bell ONLY at marked points, one ring each, correct scenes. No extra SFX. Pauses breathe; no lines colliding.
- [ ] **Text:** Only listed text moments appear, spelled exactly. No text on scenes marked "None". No misspelled cards.
- [ ] **Continuity:** Same setting throughout (Speech 1: river crossing, golden hour). No invented room/angle. Props consistent (staff rings + bell, pack, rock, sitting spot).
- [ ] **Runtime/format:** Main 6–12 minutes (words + pauses + visuals stretch the 2:31–4:37 words-only reads — do not pad with slow motion or loops to hit 6 minutes; let pacing + holds + visuals carry it, and ship the honest runtime the edit earns). Short 45–60 seconds, correct beat order. 16:9 main, correct Short aspect.
- [ ] **File:** Downloaded file plays fully, start to finish, on the device you will upload from. Source clips still in Runway Assets.

**Cost discipline:** Note total credits spent on the episode (picture + talking + voices + music/SFX + upscale). That number is your "cost per finished second" for planning Speeches 2–8. Do not start Speech 2 until Speech 1's cost is noted — otherwise you will not know how far the next month's credits reach.

---

## Run Sheet — Speech 1 (complete): "You Are Not Behind — You Are Mid-River"

**Lead:** Okta, Who Walks It All — Elder mode. **Second voice:** The traveller (younger voice).
**Setting:** A river crossing at golden hour. **Cosmology:** The Current.
**Format:** 6–12 min + 45–60 sec Short. **Short aphorism:** "Peace is a pace, not a place."
**Boards:** Character Boards (OKTA-N for these boards) + Speech 1 Scene Boards (13 scenes). Voiceover below is verbatim from the approved script as carried in the scene boards. On-screen text appears only where listed. Music 9–12 dB under voice throughout. Bell ONLY in S1 + S13.

**First frames for Speech 1:** Start from `S1-okta-hero.jpg` / Okta locked portrait (OKTA-N branch for boards). No per-scene stills exist — vary framing with motion/camera prompts + last-frame chaining, and make a new still via Gen-4 Image References only where the shot below names a distinct framing (staff close, water-level, wide). Traveller has no locked name/portrait yet — board her as "TRAVELLER" and keep her consistent by reusing the same traveller framing/reference across scenes; do not invent a name or a new locked look mid-episode.

| Scene | Voiceover (verbatim — paste exactly this) | On-screen text | Camera / Runway picture action |
|---|---|---|---|
| **S1 — Hook (<8s)** | Okta: "Stop measuring your life from the bank you left." | STOP MEASURING FROM THE BANK | Static, close, single shot on Okta, mid-river light behind. Gen-4.5/Turbo 5s. Motion prompt: `Hold static and close. Okta stays still. Only river water moves slowly behind her. No camera move.` Bell ONCE at open. Talking-face? Optional Route A for this hook only — test it; narration-over-picture also passes if the hold is calm. |
| **S2 — Arrival** | Okta: "She came to me at the crossing, this traveller, with her pack half undone and her breath gone. Not from the river. From the watching." | None | Slow push-in as traveller enters frame, pack loose, looking across then back. Motion: `The camera pushes in very slowly as the traveller walks into frame with a loose pack and looks across the river, then back. Unhurried.` Chain if voice runs over 10s. |
| **S3 — Comparison** | Traveller: "That one crossed in a morning. That one has already built a house on the far shore. I have been in this water — how long have I been in this water?" | None | Gentle pan following her gaze to far shore, then back to her feet. Traveller voice (younger, distinct). Motion: `The camera pans gently left to follow her gaze to the far shore, then pans slowly back down to her feet in the water.` |
| **S4 — Long walk** | Okta: "I have walked a long time. One ring on my staff for every hundred years, and the bell has heard this speech before — from kings, from children, from my own mouth, once, when I was young enough to hurry." | None | Close on staff (rings, bell), slow tilt up to Okta's face. **Bell SILENT in this scene.** Motion: `Close on the staff. The camera tilts up very slowly from the rings and bell to Okta's face as she walks. Bell does not ring.` Distinct framing — make a staff still via References if the hero cannot frame it. |
| **S5 — Test** | Okta: "So I did not answer her question. I asked her one. 'Where are your feet?'" | WHERE ARE YOUR FEET? | Settle and hold. Pause after the question. Motion: `Okta stops walking. The camera settles and holds still. The traveller looks down at her own feet. Hold through the pause.` |
| **S6 — Answer** | Traveller, then Okta: "'In the river,' she said, as if I were simple. 'And where does a crossing happen,' I said, 'from the bank — or from the feet?'" | None | Two-shot, river-paced drift sideways with current. Two voices in one chunk — generate as TWO chunks (traveller line, then Okta line) and place them in order in Final Cut. Motion: `Two-shot in the water. The camera drifts slowly sideways with the current. The traveller half-smiles.` |
| **S7 — Laugh** | Okta: "She laughed then, a wet, tired laugh. Because she knew. She had been standing in the middle of her own life, doing the bravest part of it, and calling it behind — because she was measuring from a shore she was no longer standing on." | None | Hold on the laugh. Let it breathe before the reframe. Motion: `Hold locked-off on the traveller laughing, shaking her head, looking at her feet in the water. No camera move. Let the moment breathe.` |
| **S8 — Reframe** | Okta: "Hear me. Nobody crosses from the bank. The bank is where the crossing was decided. It is not where it is done. The crossing is done here — in the cold part, in the slow part, in the part where the far shore looks no closer than it did yesterday." | NOBODY CROSSES FROM THE BANK | Slow pull-back to wide. Pacing reset. Motion: `The camera pulls back very slowly to a wide shot, bank behind them, river ahead. Both turn from the bank to face the crossing.` |
| **S9 — Comparison trick** | Okta: "Comparison is a trick of measurement. It takes your middle — your real, wet, working middle — and lays it against somebody else's far shore, and calls the distance failure. But their shore is not your measurement. It never was. You did not see their middle. You did not stand in their water." | None | Rack focus: far-shore house soft, then focus to traveller's middle (hands, pack, feet). Motion: `Hold the camera still. Focus racks slowly from the soft far-shore house back to the traveller's hands, pack, and feet in sharp mid-river detail. Camera does not travel.` |
| **S10 — Punch line** | Okta: "Mid-river, you are — not behind. Mid-river is not a falling-short. Mid-river is the address of everyone who ever crossed. The Current does not carry the ones who left. It carries the ones still standing in it." | MID-RIVER, NOT BEHIND | Low, slow, water-level. Long pause after punch line. Motion: `Low at water level. The camera drifts very slowly with the current past both pairs of feet. Golden light on the water. Hold after the line.` |
| **S11 — Practice** | Okta: "So today, one thing. One task — you choose it — done at river pace. No clock on it. No second task riding on its back. No measuring it against how fast it went for anyone else. Feet in the water, one task, whole attention, river pace. When the old voice says behind, you answer it with your feet: mid-river — and you keep standing in the doing. One task. That is all. The river does the rest, the way it has always done it: under you, around you, carrying what you cannot carry, for exactly as long as the crossing takes." | ONE TASK. RIVER PACE. | Steady, unhurried single take. No cuts that hurry her. Longest voice chunk — split into 2–3 chunks at sentence boundaries (each ≤30s) and chain 2–3 picture clips via last frames. Motion: `Steady locked-off shot. The traveller sets her pack down on a rock, chooses one thing, and begins it slowly by the river. No cuts.` |
| **S12 — Payoff (70–85%)** | Okta: "Peace is not the far shore. Peace was never waiting for you at the end of the crossing, holding a dry towel and a certificate. Peace is a pace. Not a place. And a pace can be chosen here — mid-river, mid-life, mid-everything — today." | PEACE IS A PACE, NOT A PLACE | Slowest camera. Hold after "Not a place." Light deepens; far shore dims, near shore stays warm. Motion: `Slowest camera of the episode, almost still. Both sit on the near shore as light deepens. Hold after 'Not a place.'` Verify 70–85% position in Final Cut. |
| **S13 — Bridge** | Traveller, then Okta: "But I will tell you what she asked me next, this traveller, drying her feet on my shore. She said: 'Then why does hurry feel so much like safety?' Ah. That — that is next week's teaching. Hurry has a reason, and the reason has a name. Walk at river pace until then." | NEXT — HURRY IS FEAR WITH ITS SHOES ON | Gentle follow as Okta walks out of frame. Bell ONCE at bridge. No hard goodbye, no end-card block. Motion: `Gentle follow as Okta stands and walks out of frame. The traveller dries her feet on the shore. Light holds.` |

**Speech 1 Short (45–60s, separate timeline):** S1 hook + S10 punch line + S11 practice + S13 bridge. True Black instant at open/close only. Same clips, same voices, trimmed to Short beats.

---

## Run Sheets — Speeches 2–8 (condensed)

**How to use these:** Same Steps 0–8 as Speech 1. Copy full verbatim script from each PDF's script pages (pages 2–5), chunked by that PDF's scene map (pages 7–8), ≤30 seconds per chunk. Scene summaries below are from the scene maps — they tell you what each scene pictures and which voice/text it carries. They are NOT the script. Do not paste a summary as narration.

**Leads at a glance (from the packages — coordinator picks except S6, which is explicit Aelune; confirm before you lock finals if you want them changed, otherwise produce as listed):**
Speech 2 Okta · Speech 3 Aelune · Speech 4 Okta · Speech 5 Aelune · Speech 6 Aelune · Speech 7 Okta · Speech 8 Okta.

### Speech 2 — "Hurry Is Fear With Its Shoes On" — Okta, Elder mode
Setting: Morning road, day after the crossing. Second voice: Traveller. Short aphorism: "Hurry is fear with its shoes on."
Hook (verbatim): "Name what you're actually afraid will happen if you slow down." (S1, single shot, bell rings, <8s, text: `Name the fear.`)
Scenes (summary): S1 Hook · S2 Morning promise, boots tied twice · S3 First rush, strap tangles · S4 Snap, cup drops · S5 Quarrel walks faster · S6 Fall, missed stone, ankle · S7 Okta arrives "at my own pace," bell once · S8 Walk it back, one rushed minute at a time · S9 Chain: fear → anger → hardness → suffering (four stones) · S10 Aphorism "Anger is fear with its shoes on" · S11–S12 Practice + bridge (see PDF). Bell: S1 + S7 per scene map — follow the PDF, do not copy Speech 1's bell pattern.

### Speech 3 — "Hold the Hand, Not the Riverbank" — Aelune, Guinan mode
Setting: Night Shelf observatory at night, lantern light, star charts. Second voice: Parent. Mode: listening, reflective, student decides. No bell named — Aelune episodes use night ambience (quiet room tone, kettle, distant night air), silences scripted.
Hook (verbatim): "Loving someone and needing them to never change are two different things." (S1, locked close, lantern flicker only.)
Scenes (summary): S1 Hook · S2 Parent climbs with ledger (book of calls) · S3 Child changed: city, work, beliefs, fewer calls · S4 Holding tighter, rope image · S5 Child pulls away, rope taut · S6 Tea + silence, Aelune listens · S7 Reflection "You miss the child who needed you every day" · S8 Question "Whose hand are you holding — today's, or yesterday's?" (unanswered) · S9 Reframe: possession freezes, compassion accompanies · S10–S12 Practice/payoff/bridge (see PDF).

### Speech 4 — "The Sitting of Failures" — Okta, Elder mode
Setting: Fireside sitting at dusk (high-pass story pictured as Okta tells it). Second voices: Travellers, heard briefly. Aphorism: "Failure is the curriculum."
Hook (verbatim): "Before I teach you about failure, let me sit with one of mine." (S1, single shot at fire, bell once, <8s.)
Scenes (summary): S1 Hook · S2 Rule: no student story until hers is done · S3 Promise: guide party through high pass before winter · S4 Signs: clouds, wind, birds quiet (three held beats) · S5 Pride dressed as promise, pressed on · S6 Storm, ridge, fall on ice (held plainly, never sensational) · S7 Dawn apology, without excuse · S8 Second wrong: carried shame, hid the story · S9 Old walker: "A teacher passes on mastery and folly — failure most of all" · S10 Reframe: failure is the curriculum · S11–S12 Practice/bridge (see PDF). Shadow side is the point here — do not soften the failure telling into a victory story.

### Speech 5 — "The Current Cannot Carry Half of You" — Aelune, Elder mode
Setting: Night Shelf observatory at night. Second voice: Student. Short aphorism: "Step in fully, or sit on the bank honestly."
Hook (verbatim): "'I'll try' is sometimes a promise — and sometimes an exit you built before you entered." (S1, single shot, lantern lit, <8s.)
Scenes (summary): S1 Hook · S2 List: twelve tries, earnest, unfinished · S3 Two bowls + vessel set out (demonstration before explanation) · S4 Half pour, cloudy, unsettled (wait in real time) · S5 Full pour, clears, holds light · S6 Confession (see PDF) · S7 Third door, not a door, stood a year · S8 Reframe: step in fully, or sit honestly; half-step is the dishonest position · S9 Current carries what is wholly in · S10–S12 Practice/bridge (see PDF). Vessel + two bowls must stay consistent props across S3–S5 + S8.

### Speech 6 — "Small Is Not a Measurement" — Aelune, Spock mode — ⚠️ RULING NEEDED BEFORE FINAL RECORDING
Setting: Night Shelf observatory at night. Second voice: Student. Mode: defines before she comforts. Short aphorism: "Appearance measures appearance."
**DO NOT silently fix the two lines below. They are verbatim in the package PDF and scene map. Rule them intentional or typos first, then record the ruled version — and if you change them, update the PDF record + re-read the audio so no stale version survives.**
- Hook as written: "By 'too small, too old, too late' — define your terms."
- Story opening as written: "with three verdicts, worn like a verdicts are worn."
Scenes (summary): S1 Hook (text: `Define your terms.`) · S2 Student's three verdicts · S3 No comfort first; three stones set out · S4 "Which is strong?" / "Strong for what?" (pebble, river stone, boulder) · S5 Definitions: Size / Strength / Worth (pause after each) · S6 Small lamp guides the night's charts · S7 Old chart most trusted · S8 Late moth pollinates · S9 Reframe: verdicts wearing a ruler's clothes · S10–S12 Practice ("Do the smallest version, today") + bridge to Speech 7 (see PDF). Punch lines, each with full pause: "Appearance measures appearance." / "Define, then decide." / "Evidence beats argument."

### Speech 7 — "How You Will Know" — Okta, Picard mode
Setting: Riverside path at dawn, fork in the road. Second voice: Man. Mode: deliberation, both sides argued fairly. Short aphorism: "Loud is not the same as true."
Hook (verbatim): "Before you decide, ask one question: is this fear speaking, or is this you?" (S1, single shot, <8s.)
Scenes (summary): S1 Hook · S2 Man arrives, decision that cannot wait · S3 Two roads, neither favoured · S4 Both sides argued passionately, both true; Okta does not choose for him · S5 Question + remembering · S6 Case for leaving (see PDF) · S7 Case for staying, fairly shown · S8 "Which voice is calm?" · S9 Calm test: wait, breathe, walk, sleep; bell sounds ONCE here · S10 Rule: no irreversible decision in first hour · S11–S12 Practice/bridge (see PDF). Bell point is S9 in this episode — follow this PDF, not Speech 1.

### Speech 8 — "Mourn the Person. Release the Season." — Okta, Guinan mode — Season 1 finale
Setting: Riverbank at twilight. Second voice: Woman. Mode: mostly listening, reflecting, reframing; never decides for the student. Short aphorism: "Mourn the person. Release the season."
Hook (verbatim): "Grief is not a problem to solve. It is a season to sit through — and seasons, by nature, end." (S1, single shot, <8s.)
Scenes (summary): S1 Hook · S2 Coat: mother's coat, three years in a closet · S3 Ashamed twice · S4 Listening, way river listens · S5 "What season?" question · S6 (see PDF) · S7 Thank it aloud: "Thank it for that season. The coat did its work." Bell sounds ONCE here · S8 Her decision: give coat onward, keep one button · S9 Reframe: mourning person vs releasing season are two different acts · S10 Love with somewhere to go · S11–S12 Close of Season 1 + bridge to Season 2 unlearning (see PDF). Finale tone: gentle, unhurried, no hard goodbye that closes the series.

**"The Thousand-Year Wait" (Okta, Elder) is NOT in this Season 1 production run.** It is a draft in chat only, proposed as a Season 2 opener candidate, not confirmed, not packaged, not thumbnailed. Do not produce it as part of Speeches 1–8. Season 2 opens with unlearning, per the Season 1 close. If you want it produced next, confirm it as the Season 2 opener first, then it gets its own package + boards + run sheet before any generation.

---

## Decisions still needed (do not guess these)

These do not block Speech 1 picture + voice, except where noted. They DO block locking later episodes / finals that depend on them. Decide them in the open, in this chat, and the guide + boards will be updated to match — no silent fixes.

1. **Speech 6 two phrasings** (above) — intentional or typos? Blocks Speech 6 final recording only.
2. **Aelune's wings** — Character Board added pale moth wings, not in the locked design. Keep wings as part of her design, or remove from all future boards/generations? Blocks Aelune finals (Speeches 3, 5, 6) from locking a single look. Until you rule, generate Aelune from the locked portrait (no wings added by prompt) and reject any generation that adds wings without your say-so.
3. **Traveller anchor** — No locked name or portrait. Keep her as "TRAVELLER" (unnamed, consistent framing/reference per episode) or name/lock her now? Blocks traveller-heavy finals from full continuity lock. Speech 1 can proceed with consistent framing + the same reference stills.
4. **Transition locks** — Shotdeck locks (Linear Snap within teaching, Dot 0.5s at bridge, True Black for Short open/close) are PROPOSED, not confirmed. Confirm, or re-pick. Final Cut handling in Step 8 ships clean cuts + bell + pause until you rule otherwise.
5. **Body-type letters (A–F)** — Descriptive builds are on every spec sheet; letters are TBD pending the batch-2 chart, which was not in this track's context. Confirm from the chart if you want letters on the boards. Does not block picture.
6. **Environment gaps (Speech 1 set)** — Dedicated Medium Texture panel + Key Prop/Detail panel missing from the environment board image; floor-plan camera markers A/B/C need drawing. Fix in a future board pass, not by silently regenerating the board. Does not block Speech 1 production from the boards as written.
7. **Lead confirmations (Speeches 2, 3, 7, 8)** — Packages list Okta/Aelune as above (coordinator picks; S6 Aelune explicit). Produce as listed unless you reassign a lead now. A lead change after voice generation wastes that voice work — decide before Step 4 for that episode.
8. **Voices** — No cast voices are locked yet (guide MP3s are one guide voice). Your Step 4 picks ARE the lock. Write down exact voice names + models the moment you pick them, and reuse them. A voice change mid-season must be a deliberate re-record, not drift.

---

## Sources — Runway help checked 2026-11-13

- Creating with Gen-4 Video — https://help.runwayml.com/hc/en-us/articles/37327109429011-Creating-with-Gen-4-Video
- Creating with Gen-4.5 — https://help.runwayml.com/hc/en-us/articles/46974685288467-Creating-with-Gen-4-5
- Performance Capture with Act-Two — https://help.runwayml.com/hc/en-us/articles/42311337895827-Performance-Capture-with-Act-Two
- Creating Multi-Character Dialogues with Act-Two — https://help.runwayml.com/hc/en-us/articles/41748090660499-Creating-Multi-Character-Dialogues-with-Act-Two
- Deprecated Standalone Tools (Lip Sync → Act-Two, May 27, 2026) — https://help.runwayml.com/hc/en-us/articles/40213860628371-Deprecated-Standalone-Tools
- Generating speech from text — https://help.runwayml.com/hc/en-us/articles/23859696734611-Generating-speech-from-text
- Character Script to Video — https://help.runwayml.com/hc/en-us/articles/51285026291219-Character-Script-to-Video
- Creating with Runway Agent — https://help.runwayml.com/hc/en-us/articles/51601639579667-Creating-with-Runway-Agent
- Trimming and Assembling Clips in Studio (Final Cut) — https://help.runwayml.com/hc/en-us/articles/52685547867667-Trimming-and-Assembling-Clips-in-Studio
- Creating with Apps (incl. Upscale up to 40s, SFX) — https://help.runwayml.com/hc/en-us/articles/45570040112531-Creating-with-Apps
- Can I generate videos in 4K? — https://help.runwayml.com/hc/en-us/articles/26115194070675-Can-I-generate-videos-in-4K
- How to create longer videos and films — https://help.runwayml.com/hc/en-us/articles/26871350018835-How-to-create-longer-videos-and-films
- Creating with Gen-4 Image / References — https://help.runwayml.com/hc/en-us/articles/37053594806419-Creating-with-Gen-4-Image

Series sources (on file, not web): 8 production-package PDFs + Speech 1 posting pack + Character Boards + Speech 1 Scene Boards, all under `workspace/goals/first-in-consciousness-mentor-series/files/`. If this guide and a package disagree on words, the package script pages win. If this guide and Runway's live UI disagree on a limit or cost, Runway's live UI wins — stop and check before spending.

---

*End of guide. Start with Step 0 + Step 2 (face-hold test). One episode, one scene, one verified clip at a time.*
