# VisionWeaver — Full Review + Build Plan
Date: 2026-10-17
Status: Reviewed, ready to build into VisionWeaver, then produce/post. No videos rendered yet.

## 1. Everything reviewed

### A. Hill-style reference (starting point)
- Video: https://youtu.be/eqC482PyMf8 — "Mindset Is Everything! | That Can Change Your Life Forever | Napoleon Hill Motivational"
- Format: ~50-min long-form, timestamped chapters, original script IN THE STYLE OF Hill, with disclaimer: not an official Hill speech, no affiliation/endorsement claimed.
- User goal: same format for OTHER speakers, NOT Hill's works.

### B. 11 public-domain speakers for Hill-style channels (separate track)
James Allen, Wallace D. Wattles, Orison Swett Marden, Charles F. Haanel, Ralph Waldo Emerson, Marcus Aurelius, Florence Scovel Shinn, Genevieve Behrend, Ella Wheeler Wilcox, Helen Keller, Elizabeth Towne.
- Why: same mindset/discipline/success lane, abundant works, public-domain in US, can quote/adapt.
- NOT started. No channels created. Do NOT merge into VisionWeaver without a decision — VisionWeaver format is 45-75 sec animated explainers, Hill format is 45-50 min motivational long-form. Keep as Track 2 unless user says merge.

### C. VisionWeaver Psychology Video Series — the main build (Track 1)
- ChatGPT share: https://chatgpt.com/s/t_6ad3b93772008191812b0a991e50e6d6 — titled "Psychology Video Series Draft"
  - Share showed only 1 assistant message, no user prompt, 4-author table, 3 empty bullets. Full 300 list NOT in share.
- Full catalog pasted in chat 2026-10-17: "Four more authors — 300 video ideas and directions", Version 1.0.02, Oct 7, 2026
  - 75 x 4 = 300 unique titles, 20 themed groups (5 per author)
  - James Clear JC-001–JC-075 (Atomic Habits) — habits, identity, routines
  - Carol Dweck CD-001–CD-075 (Mindset) — learning, feedback, growth
  - Viktor Frankl VF-001–VF-075 (Man's Search for Meaning) — meaning, connection, choices within limits
  - Dale Carnegie DC-001–DC-075 (How to Win Friends / How to Stop Worrying) — relationships, leadership, worry
  - Each entry: original title + explanation angle + animation direction + related concept + broad source anchor
  - Explicit: original author-inspired educational ideas, NOT 75 quotations per author, NOT abridgments. Related-concept labels are editorial.
  - Format: 45–75 sec explainer: situation → pattern → explanation → specific visual change → context → reflection
  - Avatars: original Avatars with established VisionWeaver reference + continuity workflow
  - Source-credit author inspiration separately from technical psychology evidence. Exact definitions / study claims / quotations need episode-level checking during scripting.
  - Supplements existing 152-topic catalog, does NOT replace it.
  - Production state: idea/direction drafts only. No provider renders, no publication.
  - 20 practical starting points = first idea in each themed group (5 per author):
    JC-001, JC-016, JC-031, JC-046, JC-061,
    CD-001, CD-016, CD-031, CD-046, CD-061,
    VF-001, VF-016, VF-031, VF-046, VF-061,
    DC-001, DC-016, DC-031, DC-046, DC-061

### D. Caution flags inside the catalog itself (must honor in scripting)
- Carnegie: several pages returned 403 on direct opening; anchors rely on indexed excerpts/listings; full chapter NOT obtained. Current training guidance is distinct from original prose.
- Frankl: Frankl Center page contains several authors — do NOT treat as list of Frankl quotations.
- Dweck: growth mindset ≠ effort alone, ≠ unlimited-ability promise. Adult workplace/family uses are editorial extensions, not direct study findings for every situation.
- Frankl scope: meaning is personal; do NOT prescribe it, romanticize suffering, or imply attitude removes coercion/illness/material barriers. Do NOT teach clinical logotherapy techniques.
- Carnegie scope: respectful communication does NOT require tolerating abuse or controlling another person.
- Clear scope: no claim habit system guarantees success or overrides resources.

### E. Other uploads (held, NOT VisionWeaver works)
1. Anthropic support transcript, Oct 6, 2026 — repeated payment/credit-add declines, 6 attempts, money taken then bounced back, generic support reply, no resolution shown. POTENTIAL BLOCKER: if production depends on Claude credits / paid AI, resolve billing before scaling renders.
2. Manus account-data export, Aug 14, 2026 — encrypted container, structure listed only, NOT opened/decrypted. Do NOT treat as source content.

### F. The "page in here"
User said: "I think there's a page in here as well."
Candidates found — need user to confirm which one they meant:
1. VisionWeaver Production Workflow Integration (Google Doc) — 40k-char report: "Advanced Cinematic Synthesis: Integrating VisionWeaver and Generative World Models" — VisionWeaver + Runway Gen-4.5 / Act-Two / GWM-1, hallucination-mitigation, narrative/temporal/spatial consistency, corpus includes Ember of Dreams / Erin O'Reilly Mysteries / Crossroads of Identity, etc.
2. VisionWeaver Hub (Drive folder) — contains VISIONWEAVER_GEM.md + "Master Prompt Single Clip"
3. visionweaver-command-dashboard.html (Drive, July 8, 2026) — dashboard page
4. ChatGPT shared page (above) + YouTube page (above)
5. GitHub: estibancreations-svg/VisionWeaver (private, updated Oct 15, 2026) + VisionWeaver-Prime (private, Oct 12) + Higgsfield-Integration-Layer (VisionWeaver bridge)
CORRECTION — scoped GitHub check 2026-10-17: the 300 catalog IS in estibancreations-svg/VisionWeaver at projects/education/psychology-series/FOUR-AUTHORS-300-VIDEO-IDEAS-v1.0.02.md (verified). NOT in VisionWeaver-Prime. Same folder also holds SETH-GODIN-NAPOLEON-HILL-RESEARCH-v1.0.03.md and GODIN-HILL-ONLINE-RESEARCH-ADDENDUM.md. The 152-topic catalog = helplessness + hope + 150 additional terms, remains intact. Original eight complete drafts remain the first production batch; Godin/Hill companion drafts add 48 scene plans. Live app has NOT accepted an authenticated project save; no paid rendering/publication claimed; existing pilot is a captioned schematic animatic with separate voiceover, not final character animation. The earlier global GitHub search returning 1400 unrelated hits was unscoped noise — disregard it.

## 2. Decision: Two tracks, one build order
- Track 1 (NOW): VisionWeaver 45–75 sec animated explainers — 300 ideas + 152 catalog = 452 total ideas.
- Track 2 (LATER, separate): Hill-style 45–50 min motivational channels — 11 PD speakers.
- Do NOT do fake-speech / "in the style of" for Clear/Dweck (living) or extensive quoting from Frankl/Carnegie (still copyrighted). VisionWeaver stays in original-adaptation mode.

## 3. Build into VisionWeaver — integration spec
1. Ingest: one structured record per idea: ID, author, theme group, original title, explanation angle, animation direction, related concept, source anchor, status=draft, continuity tags (avatar, setting, palette, props).
2. Dedupe vs 152 catalog: check title/angle overlap before producing; keep 300 as supplement.
3. Scripting: expand each 45–75 sec explainer from catalog row ONLY — do not invent quotations, study claims, or clinical techniques. Episode-level fact-check for any definition/study claim.
4. Avatar/continuity: use established VisionWeaver reference workflow; lock avatar + setting per series; log reference IDs per episode.
5. Production checklist per episode: script → voice → avatar/scene → animation per direction → captions → source-credit card (author inspiration vs psychology evidence, separate) → QC (no fake quote, no medical/clinical claim, no guarantee claim) → export → post copy + hashtags → publish log.
6. Posting: start Shorts/Reels/TikTok 45–75 sec. Long-form Hill-style is Track 2, not this pipeline.

## 4. First production batch — CORRECTED per repo
Per SETH-GODIN-NAPOLEON-HILL-RESEARCH-v1.0.03.md: the original eight complete drafts remain the first production batch. Godin/Hill companion drafts add 48 scene plans.
So: Batch 1 = original eight (from the 152-catalog / Godin-Hill work), NOT the 20 starters from the 300.
Then: 20 starters from the 300 are the NEXT wave (first idea per themed group):
Wave 2 (5): JC-001, CD-001, VF-001, DC-001, JC-016
Wave 3 (5): CD-016, VF-016, DC-016, JC-031, CD-031
Wave 4 (5): VF-031, DC-031, JC-046, CD-046, VF-046
Wave 5 (5): DC-046, JC-061, CD-061, VF-061, DC-061
Gate: do NOT scale past Batch 1 until Batch 1 passes QC + posting test + billing/provider check. Also confirm: live app has not yet accepted an authenticated project save — do not claim publication until that save succeeds.

## 5. Immediate next actions
- [ ] User confirms which "page" they meant (1–5 above, or another)
- [ ] Locate / confirm 152-topic catalog file
- [ ] Confirm VisionWeaver repo target (VisionWeaver vs VisionWeaver-Prime) for ingesting the 300
- [ ] Resolve Anthropic billing blocker if Claude is in the render/scripting path
- [ ] Build Batch 1 scripts (5 x 45–75 sec) — next step on approval
- [ ] Produce → QC → post Batch 1, then continue batches

## 6. What is NOT done yet
- No VisionWeaver ingestion committed to GitHub/Drive yet in this chat
- No scripts expanded beyond catalog rows
- No renders, no posts, no publications
- No Hill-style channels created
- Manus export not decrypted, Anthropic billing not resolved
