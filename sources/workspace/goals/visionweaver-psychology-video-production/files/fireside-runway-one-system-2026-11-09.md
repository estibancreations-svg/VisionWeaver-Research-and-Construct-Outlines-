# FIRESIDE — ONE SYSTEM, INSIDE RUNWAY ONLY
# Storyboard + Upscale + Sync + Final Cut — Household A

Date: 2026-11-09
User's call: stop troubleshooting outside Runway. Use what Runway already knows how to do.
Plan: Pro (2,250 credits/mo, 500GB assets, unlimited 4K upscaling listed). Runway MCP is NOT connected in Muse — status checked 2026-11-09 — so these steps run in your Runway account at app.runwayml.com, not through me.

## What "Storyboard" and "Upscale Studio" mean in Runway right now

Be straight about the names, because Runway renamed things:

- **Storyboard = three places that do the same job, pick one:**
  1. **Agent storyboard / multi-shot** — Agent plans the shots, makes a key frame per shot for approval, then turns each frame into a clip.
  2. **Story Panels Workflow (in Workflows)** — start from ONE reference image, generate story panels, panel upscaler extracts each panel to 2K / up to 4K, then a Gen-4.5 video node turns each panel into a clip.
  3. **Final Cut timeline (in Agent)** — this is where the storyboard order becomes the finished cut. Legacy Video Editor Projects were retired July 30, 2026. Timeline Studio / Final Cut in Agent replaces them.
  There is no old Gen-2 "Storyboard Animation" button to hunt for. If you see "Storyboard" in your view, it is one of the three above — tell me which label you see and I will lock the sheet to that exact screen.

- **Upscale Studio = Upscale to 4K, two ways:**
  1. **Upscale button beneath a finished generation** — in a generative session, after a clip finishes, click Upscale. The 4K version appears as a new generation next to the original.
  2. **Upscale App** — for an uploaded video up to 40 seconds, returns 3840x2160. Listed cost 2 credits per second, Standard and above. Pro lists unlimited 4K video upscaling.
  - Generative outputs start at 720p. Exporting in 4K from Final Cut / a Video Editor Project does NOT upscale non-4K footage — Runway help says this directly. You must upscale the clips FIRST, then assemble.
  - **Critical limit for Fireside:** the finished Household A cut is 46 seconds. That is OVER the Upscale App's 40-second limit. Do NOT try to upscale the finished 46s cut in one go. Upscale each clip individually (5, 8, 10s each), then assemble the upscaled clips.

- **Sync — one flag I have to own:**
  Runway help today documents **Act-Two** as the live performance / lip-sync route. One 2026 review states the standalone Lip Sync tool was retired May 27, 2026 in favour of Act-Two. I have NOT verified that retirement on Runway's own help page, so I will not claim Lip Sync is gone.
  - If you see **Lip Sync** in your account: it takes video + audio file. Upload the finished clip + your narration MP3.
  - If you see only **Act-Two**: it takes video + a driving performance VIDEO, not an audio file alone. You record your face performing the line on camera (3 to 30 seconds), upload that video, Act-Two moves the mouth, expression and head movement onto Grand.
  - Tell me which one you see and I will strike the other from the sheet. Do not run all three talking clips through a tool you have not seen yet.

## The pieces — upload ALL of these into ONE Runway session

One home: Runway Studio at app.runwayml.com → Agent → New timeline, name it: `Fireside Household A - 46s`
Everything below lives in that one session's Assets. Nothing lives only in the one-screen App Studio app.

| # | Piece | File / text | Where it goes in Runway |
|---|---|---|---|
| 1 | Household A original — opening frame | `D7E90216-AD55-438C-AD01-7A87C218D1CE-photo-930F4BE3-A626-4724-9127-765D83F0F9E8.jpg` — South Asian grandmother, grey bun, white flowers, bindi, blue sweater, cream shawl, green wingback, brick fireplace, radio + tea, 2 boys. PNG/JPG/WebP up to 16 MB. | Assets → Reference image. Use as the opening frame / @ reference for Clips 2–5. Do NOT regenerate her. |
| 2 | 6 scene prompts — the storyboard | Texts in Section 3 below, in story order | Agent storyboard / Story Panels Workflow inputs, one prompt per shot |
| 3 | 6 silent clips — picture only | Gen-4.5, 16:9, 720p, 5 / 8 / 10s, Cinematic Warm except Clip 3 Documentary Real. Made in Workflows First Attempt OR in Studio Gen-4.5 image-to-video — either way, they must land in this session's Assets. | Assets → Generations. Names in Section 3. |
| 4 | 3 narration files — words only | `fireside-a-clip-02-narration.mp3`, `fireside-a-clip-04-narration.mp3`, `fireside-a-clip-05-narration.mp3` — recorded human narration ONLY. MP3/WAV. Leave Grand's line empty, voice picker unused. No Mabel — rejected 2026-11-06, stock adult voice, not a weathered grandmother. | Assets → Audio. Attach to Clips 2, 4, 5 only. |
| 5 | 3 driving performance videos — ONLY if Act-Two is the route | Record your face on camera performing each line, 8–10s each, same framing, quiet room. File names: `fireside-a-clip-02-performance.mp4`, `04`, `05`. Audio is inside these videos. | Assets → Act-Two driving video input. Do NOT upload these if Lip Sync is the route. |
| 6 | The 46s assembly | Final Cut timeline in Agent | Final Cut — Clips 1–6 in order, audio tracks underneath |

No Fireside script exists on file. All lines below are DRAFTS until you approve the wording or supply the story. Clip 2 line is TBD pending your story. The river line is STRUCK — invented, crossed in from another series, no river story exists in Fireside. Do not use it.

## The sequence — in order, inside Runway only

### Step 1 — Open the one home (2 minutes)
1. Go to app.runwayml.com → click **Agent** in the left sidebar.
2. Click **New timeline** below the message box. This opens an empty Final Cut timeline with Agent chat alongside it.
3. Rename it: click the name top-left → Rename → `Fireside Household A - 46s`
4. Upload the Household A original to Assets first. This is the anchor for everything — storyboard, panels, and clips all reference this same file.

### Step 2 — Storyboard: lock the 6 shots before you generate (do not skip this)
In Agent chat, or in Story Panels Workflow, set the 6 shots in this order. One prompt per shot. Same original as reference on 2–5.

1. **Fire open — 5s — Cinematic Warm — no people, no audio**
   Paste: Macro shot of flames curling around burning logs, embers pulsing orange and red, sparks rising slowly into darkness. No people. Cinematic Warm.
   Reference: none. Output name: `fireside-a-clip-01-fire-open.mp4`
2. **Signature wide — 10s — Cinematic Warm — TALKING**
   Paste: A warm, firelit sitting room at night. An elderly grandmother in a green wingback armchair beside a crackling brick fireplace, leaning forward, hands gesturing as she speaks. A vintage radio and a cup of tea on a wooden side table, two small boys listening on a rug. Camera slowly pushes in from wide. Cinematic Warm.
   Reference: upload Household A original — clip opens on this still.
   Narration file: `fireside-a-clip-02-narration.mp3`
   Recording script — record it, do NOT type it: TBD — his story. Neutral framing draft only: "Come close, little ones. The fire is warm, the night is long, and I have a story for you."
   Output name: `fireside-a-clip-02-signature-wide.mp4`
3. **Radio Corner — 8s — Documentary Real — no talking**
   Paste: Camera drifts slowly across the room from the wide scene and settles on the vintage radio corner, old wooden radio glowing softly on a wooden side table, a cup of tea beside it, warm lamplight pooling on a Persian rug, dust motes drifting. Slow, unhurried movement. Documentary Real.
   Reference: upload Household A original — opens on this still, then drifts to the radio.
   Output name: `fireside-a-clip-03-radio-corner.mp4`
4. **Teller close-up — 8s — Cinematic Warm — TALKING**
   Paste: Camera slowly pushes in from the wide room to an extreme close-up of the grandmother's weathered face lit by firelight, eyes bright, mid-story, a knowing smile forming. Embers drifting soft in the dark behind her. Cinematic Warm.
   Reference: upload Household A original — opens wide on this still, then pushes in.
   Narration file: `fireside-a-clip-04-narration.mp3`
   Recording script — DRAFT, invented: "And that is when she understood. The thing she feared was only the dark, waiting to be lit."
   Output name: `fireside-a-clip-04-teller-closeup.mp4`
5. **Kids listening — 10s — Cinematic Warm — TALKING**
   Paste: A kind elderly grandmother in a green wingback armchair reading a big picture book to two small boys on a rug, brick fireplace glowing warmly behind them, soft golden light, gentle and safe. Cinematic Warm.
   Reference: upload Household A original.
   Narration file: `fireside-a-clip-05-narration.mp3`
   Recording script — DRAFT: "She opened the big picture book, and the two boys leaned in close, because this was the page where the journey began."
   Output name: `fireside-a-clip-05-kids-listening.mp4`
6. **Fire close — 5s — Cinematic Warm — no people, no audio**
   Paste: Macro shot of flames curling around burning logs, embers pulsing orange and red, sparks rising slowly into darkness. No people. Cinematic Warm.
   Reference: none. Output name: `fireside-a-clip-06-fire-close.mp4`

GATE — still in force from 2026-11-06: talking clips 2, 4, 5 do NOT run until the 5-second face-hold test passes. Test: upload the Household A original, no voice, 5 seconds, check frame 1 against frame 5. If the face drifts, stop and re-upload the same still. Do not build on the Clip 2 miss — model-invented grandmother face, wrong voice, unsynced mouth.

### Step 3 — Sync: in Studio, after the picture exists, talking clips only
Only Clips 2, 4, 5. Clips 1, 3, 6 need no sync.

**If Lip Sync is in your account:**
1. Open Lip Sync. Load the finished clip (02, then 04, then 05).
2. Load the narration MP3 for THAT clip — the same file from Step 2.
3. Generate, watch the mouth all the way through, export. The synced clip replaces the silent clip in Assets.

**If only Act-Two is in your account:**
1. Open Act-Two. Upload the finished character video (the silent clip).
2. Upload the driving performance video for THAT clip (your face performing the line, 3–30s).
3. Generate. Act-Two applies lip sync + facial expressions + head movement from your performance. The audio in the driving video becomes the clip audio.
4. Tip from Runway help: use Stylize Speech under Generate Audio tools if the voice needs shaping. Do not type a line and pick Mabel.
5. Act-Two is single-character only. Fireside A is single-teller, so this fits. For multi-character later, Runway says crop to one character at a time.

Do the sync BEFORE upscale. Upscaling a mouth that is already wrong just makes the wrong mouth sharper.

### Step 4 — Upscale: each clip alone, BEFORE assembly
1. For each finished clip (synced 02, 04, 05 first, then 01, 03, 06), click **Upscale** beneath the completed generation.
2. The 4K version appears as a new generation next to the original. Use the 4K version in the timeline.
3. Or use the Upscale App: upload one clip at a time (each is 5–10s, well under the 40s limit), returns 3840x2160.
4. Do NOT upscale the assembled 46s cut — it exceeds the 40s Upscale App limit, and Final Cut export in 4K will not upscale it for you.

### Step 5 — Final Cut: assemble all pieces in one timeline
1. In Agent → Final Cut timeline `Fireside Household A - 46s`, drag and drop the 6 upscaled clips onto the timeline in order 1 → 6.
   Or click **+** below the track header to add a new track and file, or **+** at the end of a track to add the next clip.
   Note: Images are not currently supported in the timeline — only video files. Your storyboard stills stay in Assets as reference; only the video clips go on the timeline.
2. Trim: drag the left or right edge of any clip to shorten it. Split: position the playhead, click Split or Cmd+B / Ctrl+B. Minimum trim about 0.1 seconds.
3. Audio: right-click a video clip → **Split audio** to move its audio to its own track so you can adjust it independently. Line up each narration track under its clip — Clip 2 audio under Clip 2 video, and so on. No audio on Clips 1, 3, 6.
4. Check the joins: Clip 1 fire → Clip 2 wide → Clip 3 radio → Clip 4 close-up → Clip 5 kids → Clip 6 fire. Total should read 46 seconds.
5. Export: click **Download** top-right of the timeline to export the finished video.

### Step 6 — Check and report back
Tell me clip by clip what landed, and which sync tool you saw — Lip Sync or Act-Two only. Anything that drifts from the opening still gets regenerated with the same still re-uploaded. Then Households B–F run the same pattern, each with its own original as the opening frame.

## What NOT to do in this one-system run
- Do not upload anything to There's An AI For That — it is a directory only, no upload, no generation.
- Do not use a TAAFT-found lip-sync tool for all three talking clips before testing one clip in Runway first.
- Do not type a line and pick Mabel / Elias / Kendrick in the App Studio app — recorded narration only for Household A.
- Do not upscale the 46s assembly in one go — 40s limit.
- Do not export in 4K from Final Cut expecting it to upscale — it will not.
- Do not regenerate Grand. Reuse the Household A original every time.

## Sources checked 2026-11-09
- Runway help: Can I generate videos in 4K? — generative outputs 720p, Upscale beneath generation, Upscale App up to 40s, export in 4K from Video Editor Project will not upscale.
- Runway help: Trimming and Assembling Clips in Studio — Final Cut tab in Agent, New timeline, drag and drop, Split, Split audio, Download to export. Images not supported in timeline.
- Runway help: Creating Multi-Character Dialogues with Act-Two — Act-Two single-character, under 30s, driving performance video + character video, Stylize Speech under Generate Audio.
- Runway Story Panels Workflow transcript — start from single reference image, panel upscaler to 2K/4K, Gen-4.5 video node.
- Runway MCP status checked: not_connected. Connect at the Runway connect link if you want Muse to run generations directly; until then, steps run in your Runway account.
