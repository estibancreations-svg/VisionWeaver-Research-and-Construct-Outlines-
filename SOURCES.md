# Sources — Everything Consulted, Withheld, and Left Local

Every source consulted to build this hub, what was withheld and why, what could not
be resolved, and the complete list of binary files that remain staged locally because
the push route carries UTF-8 text only.

**Gathering rule (owner, 2026-11-18):** full content, everything as it is, no
summarizing. The one exception: literal secret values (API keys, tokens, passwords,
connection strings, `.env` contents) and OTP codes were never copied. Where a source
file contained one, only the value was replaced with `[secret value withheld]` and
the rest kept intact. Nothing else was redacted.

**Gathering-only:** no source was modified. No writes to any existing repo, no Drive
edits, no email actions, no Supabase writes, no Vercel changes, no merges, deletes,
or renames anywhere. The only writes were new files in this repo.

---

## 1. GitHub — 26 repos mirrored

- **Live list verified twice (2026-11-18):** 27 repos under `estibancreations-svg`.
  **26 mirrored**; the destination repo itself was skipped.
- **Copied verbatim:** 1,090 files (~6.2 MiB). **Inventoried in trees:** 1,901 files.
  **Commits:** 1,194. **Pull requests:** 123 (full bodies). **Issues:** 13.
- **Per-repo record:** every mirrored repo has `FILE-TREE.md`, `COMMITS.md`,
  `PULL-REQUESTS.md`, and `ISSUES.md` under `sources/github/<repo>/`, plus the copied
  file contents at their original paths.
- **Branches were NOT enumerated** (branch listing is approval-gated). All content is
  from each repo's default branch (`main`).
- **Read-only** via the GitHub connector (`/opt/hatch/bin/github`). The `gh` CLI is
  not authenticated and was not used. No PATs/tokens from chat were used.

### Repos mirrored (26)

`-Five-Stations-Learning-Serie`, `-HisMajesty0225-CEO-Dashboard`, `-THELMA-AI`,
`52-Books-in-52-Weeks`, `Archive-HisMajesty0225-Shenry60`, `ChatGPT--EstibanCreations`,
`content-that-builds`, `crm-tour-deck-build-temp`, `Crossroads-of-Identity`,
`csuite-command`, `DESIGN_STUDIO`, `Higgsfield-Integration-Layer`, `Leadstack-Clone`,
`Master-dashboard-`, `Master-System-Buildout`, `MASTER_CEO_DASHBOARD`,
`motive-next-deployment`, `OSIRIS`, `Paypal_Portal`, `reunion-os`, `standalone-crm`,
`The-Arc`, `THELMA-Global-Link-Logistics`, `This-Is-Your-Life`, `VisionWeaver`,
`VisionWeaver-Prime`.

### GitHub redactions (27, across 9 files — secret values / OTP only, values never recorded)

26 by the GitHub worker + 1 found by the coordinator's final secret scan (the Firebase
config below).

| Repo / file | Kind | Count |
|---|---|---|
| `Higgsfield-Integration-Layer` / `.env.example` | secret values in an example file (real-looking, not placeholders) | 4 |
| `Higgsfield-Integration-Layer` / `PULL-REQUESTS.md` | secret value in a PR body | 1 |
| `Master-dashboard-` / `src/firebase.ts` | secret value | 1 |
| `Master-System-Buildout` / `07-DOCUMENTATION/Projects/THE-ARC/04-COMMERCIAL-PRODUCTION/12-TRAILER-REVIEW-ASSEMBLY-v1.md` | JWTs | 3 |
| `reunion-os` / `apps/web/.env.example` | connection-string credentials | 2 |
| `standalone-crm` / `scripts/local-supabase-shim.sql` | credential assignment | 1 |
| `standalone-crm` / `supabase/config.toml` | credential assignments | 5 |
| `VisionWeaver` / `connections/.env.example` | secret values in an example file | 9 |
| `Master-dashboard-` / `firebase-applet-config.json` | Firebase web API key value (found by the coordinator's final scan; config fields otherwise intact) | 1 |

A post-pass grep found zero unredacted tokens/JWTs/keys/credentialed strings in the
mirrored GitHub content.

### GitHub files withheld entirely (contents never read or copied)

| Repo / file | Reason |
|---|---|
| `csuite-command` / `.env` | Secret-bearing env file. Path noted in `FILE-TREE.md` as withheld. |
| `Master-dashboard-` / `.env.production` | Secret-bearing env file (PUBLIC repo). Path noted in `FILE-TREE.md` as withheld. |

### GitHub unresolvable (1)

| File | Problem |
|---|---|
| `-Five-Stations-Learning-Serie` / `projects/creative-ip/five-stations/runway_prompts_v2/02_all_episodes.txt` | Connector reports a broken/internal symlink; re-fetch after all shards finished returned the same error. Path + size remain in that repo's `FILE-TREE.md`, marked COPY FAILED. No content could be retrieved. |

---

## 2. Google Drive — 1,323 items included

- **Enumerated:** 2,003 items (382 folders, 1,621 files) in the connected account.
  **Included:** 1,323 (223 folders + 1,100 files). **Excluded as out of scope:** 680
  (old school/personal/legal/health/financial bulk, `node_modules`/`.git` internals).
- **Staged:** 1,088 files (~140 MB) under `sources/drive/`, preserving Drive folder
  structure. Each copied text file starts with a 4-line header (original name, Drive
  ID, parent folder path, modified date). Binary image copies carry no header; the
  worker manifest is their record.
- **Extraction:** 45 Google Docs → full text; 8 spreadsheets → all tabs as tables; 20
  PDFs → full text (all 20 yielded text); 28 applet bundles → listings; 33 prompt
  files → full text or listings; docx/pptx/xlsx/rtf → full text; zips → contents
  listings. No image-only PDFs, no unreadable bundles.
- **Scope rules:** blanket-include paths (`MAF/VisionWeaver Hub/`, `MAF/GrantOS Hub/`,
  `MAF/THELMA_MEMORY_BASE/`, `MAF/Google AI Studio 1/2/`, `MAF/Master Book Audio Video
  Dump/`, `thelma-core/`, `_00_THELMA_AI_SUITE/`, `OpenClaw/`, `Opal/`, `Gemini
  Images/`, `Cinematic_Vault/Productions/VisionWeaver_Anthology/`, the 4 Legacy TYL
  roots, `Movies/CapCut/VisionWeaver_Sync_Stage/`, plus any path containing
  `_THELMA_COMMAND_ROOT/`, `t.h.e.l.m.a.-ai-core-&-modules (2)/`, or `COPY of
  T.H.E.L.M.A. Ai/`); keyword-only elsewhere (system keywords; bare words like
  build/system/code/design were deliberately NOT keywords). 45 Docs + 8 spreadsheets
  explicitly included by ID; 14 orphan files under `_no-parent/`; the CEO-1 shortcut
  record; 2 git-ref artifacts.
- **Heavy duplication preserved as-is** across Dump / `_THELMA_COMMAND_ROOT` / UPLOADS
  FOR DEV — not deduped, per the owner's direction.
- **Raw downloads (230 MB) and the extraction cache were deleted after the run**
  because they held unredacted originals. The staged copies are the redacted record.

### Drive redactions (46, across 11 files — values never quoted)

44 by the Drive worker + 2 found by the coordinator's final secret scan (the OpenAI
project keys in `B v.md` and the Anime Creating Agent doc). 24 GitHub tokens, 16
Google API keys, 3 JWTs, 1 `x-api-key` value, 2 OpenAI project keys. Files:

| Staged file | Drive ID | Kinds |
|---|---|---|
| `My Drive/Gemini Images- Stevenhenry80/4QaiaNPf86Dt` | `1ih_3nBnIXuFFLm61byHVxt59GGsLu4U5` | 7 Google API keys |
| `My Drive/Gemini Images- Stevenhenry80/fkwD2toTytpC` | `1bNz9s1bKGR2V-qb2ODruiBOSL3gCXdn5` | 7 Google API keys |
| `My Drive/MAF/B v.md` | `12cJY5qGm3dNmlrplpAaXp0IRx_JTiRdRBeEWkCZlIJI` | 1 GitHub token, 1 x-api-key, 2 JWTs, 1 OpenAI project key (coordinator scan) |
| `My Drive/MAF/Other/Anime Creating Agent with List of Characters.md` | `1Ymp-k4akRBDBB2e1yvZdHFrNCnCY3ndsQaOVhM7f0NE` | 1 OpenAI project key, labeled "API Key for this project" (coordinator scan) |
| `My Drive/MAF/Google AI Studio 1/review system and analyze code - run entire system check and ensure code is working correctly.prompt.md` | `1DIU28PctiUBioDIOcyRbq_lyXyoIXzQA` | 3 GitHub tokens, 1 JWT |
| `My Drive/MAF/Google AI Studio 1/t.h.e.l.m.a.-ai-core-&-modules (2)/components/modules/ITControlCenter.tsx` | `1eQ4-VS8z8QWGOFXT5Xc8oUtXrS4V2FOh` | 1 GitHub token |
| `My Drive/MAF/Google AI Studio 2/Copy of i can't back the files up again. Put the GitHub Ph WHATEVER back the way it was when it synched.prompt.md` | `1fdGMr1mtGe3BWZc8mVUKiFULQx3mzpa9` | 5 GitHub tokens |
| `My Drive/MAF/Google AI Studio 2/In current view endless scrolling doesn’t properly work. Review all pages and ensure every butto.prompt.md` | `14pauay0KSJOcBptHXB4Sa_5zUEGlGKwS` | 7 (Google API key + GitHub tokens; per-line table in the worker manifest) |
| `My Drive/MAF/Google AI Studio 2/In current view endless scrolling doesn’t properly work. Review all pages and ensure every butto.prompt__1vY2aMQQ.md` | `1vY2aMQQ4Jn8j2gy-NYGJN7Mv1E2m4uKb` | 1 Google API key, 6 GitHub tokens |
| `My Drive/MAF/Google AI Studio 2/Review the information for further system updates. Be sure to update code and foies on all acces.prompt.md` | `1BiseVDjUh05nZ6Yf7ENT4H4VYyLfecBO` | 1 GitHub token |
| `My Drive/MAF/t.h.e.l.m.a.-ai-core-&-modules (2)/components/modules/ITControlCenter.tsx` | `1_mDRf1Ghn9a1WtcQ30oes4hhsCC-kpQ6` | 1 GitHub token |

Re-scan after redaction: clean. The coordinator's final scan (all 2,629 staged text
files, 2026-11-18) additionally triaged and deliberately KEPT: 1 simulated token in
clearly-marked demo code; 2 template `postgres://user:<placeholder>@host` connection
strings (placeholder words verified); 4 owner-masked `ghp_xxxx…` placeholders in
`placeholder=` fields; 1 `AIza` substring inside a longer base64 blob (not a
standalone key); 2 `T3BlbkFJ` substrings inside base64 media blobs in the archived
Director Studio build (no `sk-` prefix anywhere in that file). Final marker total:
77 `[secret value withheld]` occurrences (75 in staged source files + 2 in this hub's
own prose). Deliberately NOT redacted (kept verbatim):
`process.env.*` code references; placeholder/template values; template DATABASE_URL
strings with placeholder hosts; demo/sample passwords in generated demo code;
API-key preview fragments (partial by design; the full value beside each was
redacted).

### Drive unresolvable / not found

| Item | Finding |
|---|---|
| CEO-1 shortcut (`15qkbNDKglUAb3drEPToaCf5XotiX6Y6v`, `Desktop/ Final DUPM/`, 2026-07-23) | Target folder `1qRrku83FZMraiNVSMW6zMaHOTRcfCUkN` returns 404. Dead link; no content recoverable. |
| C-Suite System of Record PDF v1.1 | NOT FOUND in Drive. Zero name hits for "System of Record" / "C-Suite". (Local copy is in this hub as a binary — see §6.) |
| `CEO_MASTER_DASHBOARD_THE_MASTER_BUILD_PROMPT_.docx` | NOT FOUND anywhere (Drive, GitHub, workspace). |
| LandWeaver / OSIRIS | Zero fulltext hits each; no files found. |
| "Modified" / Becoming Her folder | NOT FOUND in the connected account. (Out of scope as non-system material in any case.) |
| "Strategic Notepad" standalone spec | Only 6 fulltext hits; no standalone spec mandating the look. |
| "Master CEO Dashboard - Page Designs & Chat Inventory" doc (`1papWSOMw2l6j4ZM6iftQDgnUMQhCqZ2RKrWaWsxkKhY`) | Near-empty: 35 chars of body text. Recorded as such. |
| "Claude" doc (`13j-9GJPhEH7ROA5pU6o_dSzVWzp6nE5g-g4rRBC4b00`) | Near-empty: 35 chars. Recorded as such. |
| Two Word lock files (`~$cumentCard.docx`, 162 bytes each) | Extraction failed (not valid docx/zip). Owner-lock artifacts containing no document content. IDs `1xFyeTm2Hf14WNwhYlLxFo1RdwAu4egWI`, `1sIkRUoS-KRdqmplAbOr9NFLqKJRIVqzN`. |
| USF Letter of Intent Google Doc (`1CetuMg-HNUsJD94q_7hJbRV_rUaZY9Hr6xCCa571NOE`) | 403 in the connected account. Out of scope (USF, not system). Excluded. |
| THELMA-Global-Link-Logistics restore zip | Not found (see [LEFT-BEHIND.md](LEFT-BEHIND.md)). |

---

## 3. Email — 4 system-related emails in full

- **Mailbox:** one connected mailbox (`stevenhenry80@gmail.com`). 60+ searches.
- **Copied in full** (headers + bodies) to `sources/email/`:

| Date | Subject | From → To | Notes |
|---|---|---|---|
| 2026-07-14 | "Video of prompt" | Steven Henry → Christian Frazier | Screen recording after a crash lost a page. Video attachment (7.8 MB) NOT downloaded. |
| 2026-09-08 | Runway announcement | Runway | Product announcement. |
| 2026-10-14 | "Access" | (standalone CRM proof-of-concept login) | Password value redacted (2 occurrences); everything else intact, including app URL and username line. |
| 2026-11-17 | Runway Dev announcement | Runway | Product announcement. |

- **Zero transactional mail** from Supabase, Vercel, GitHub, Lovable, Resend, or
  Twilio. Zero hits for VisionWeaver / THELMA / GrantOS / LandWeaver / CMGIO /
  OSIRIS as subjects.
- **Attachments NOT downloaded** (follow-up decision for the owner): the 7.8 MB
  screen-recording video + 4 attachments on the Frazier thread. They are not in this
  hub. If the owner wants them gathered, that is a separate pull.
- Non-system personal mail (bank notices, OTPs, personal correspondence) is out of
  scope because it isn't about the system — none of it is in this hub, and no OTP
  code was copied anywhere.

## 4. Local workspace — 641 files copied byte-for-byte

- **601 files** copied byte-for-byte, `cmp`-verified 601/601 identical (~150 MiB), **0
  redactions** (secret scan clean), 833 skips documented. Plus **40 hidden-files
  texts** copied by the coordinator from `goals/*/hidden_files/` (THELMA CRM drafts,
  Supabase migration checklist draft, directives draft 2026-10-27, audio-build
  scripts describing the 4 systems). Skipped from hidden files: `.mp3` narrations,
  relationship-book-series draft, Destiny/Full Sail voice files (non-system). No
  check-log/watermark bookkeeping files were present.
- **Sections:** `user/files/` 28 · `your_files/` 45 · `goals/` 364 · `vw-rebuild/` 37
  · `imagine_media/` 68 · `visionweaver-archive/` 2 · CRM build dirs + speech1 boards
  34 · workspace root 4 · `user/media_library/` 19.
- **Judgments recorded:** 14 unrelated GOAL.mds skipped; 4 root files copied;
  `hidden_files/` initially excluded by literal scope, then 40 substantive texts
  added by the coordinator; mini-PC goal treated as mixed; media library 19 copied /
  8 skipped after viewing.
- **One copied image** (Vercel Marketplace photo) visibly contains an account email —
  copied whole (email addresses are outside the secret-value carve-out). It is a
  binary and remains local-only (see §6).

## 5. Memory — 40 files, 1,572 entries verbatim

- **33 daily notes** (2026-10-16 → 2026-11-18; no 2026-11-15 file exists) + `MEMORY.md`
  + **6 goal files** (the 4 named in the brief + `visionweaver-move-to-new-supabase-and-vercel-accounts`
  + `supabase-uncapped-connection`).
- **1,572 system-related entries** copied verbatim by line-range script, mechanically
  verified 0-mismatch. **592 purely personal entries skipped. 0 redactions.**
- Two daily files had zero system entries (2026-10-26, 2026-10-31) — preserved as
  header + no-entries notes.
- Outputs: `sources/memory/` (40 files). The chronological index lives in the worker
  manifest (local only, not pushed).

## 6. Binary files left local (push route carries UTF-8 text only)

The snapshot-push route used for this repo accepts UTF-8 text files only — no
binaries, symlinks, deletions, or modes. The binary files below were gathered and
staged locally but **could not be pushed by that route**. They are listed here in
full (path + size) so nothing is silently missing. The owner can add any of them via
**GitHub web upload** (repo → Add file → Upload files) if wanted; large files over
100 MB cannot be pushed to GitHub by any route and would need Git LFS or splitting.

| Path | Size (bytes) |
|---|---:|
| `sources/drive/My Drive/Gemini Images- Stevenhenry80/25F042B6-82F8-44ED-A0BC-49C601C6A801.png` | 40854 |
| `sources/drive/My Drive/Gemini Images- Stevenhenry80/A3138FBE-A89E-4611-AFD6-730BF2095880.png` | 46847 |
| `sources/drive/My Drive/MAF/Google AI Studio 1/Image July 09, 2025 - 8_55AM.png` | 2752445 |
| `sources/drive/My Drive/MAF/Google AI Studio 1/Image July 09, 2025 - 8_55AM__1cGN2l9a.png` | 1406387 |
| `sources/drive/My Drive/MAF/Google AI Studio 1/Image July 09, 2025 - 8_55AM__1qSThu1K.png` | 1984423 |
| `sources/drive/My Drive/MAF/Google AI Studio 2/Copy of Screenshot 2026-01-28 at 2.26.33 PM.png` | 932957 |
| `sources/drive/My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/n8n_uplink.py` | 27 |
| `sources/drive/My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/n8n_uplink__1l3iKLMo.py` | 27 |
| `sources/drive/My Drive/MAF/Master Book Audio Video Dump/IMG_0561.jpg` | 309155 |
| `sources/drive/My Drive/MAF/Master Book Audio Video Dump/IMG_0562.jpg` | 310974 |
| `sources/drive/My Drive/MAF/Master Book Audio Video Dump/IMG_0563.jpg` | 285770 |
| `sources/drive/My Drive/MAF/Master Book Audio Video Dump/IMG_0564.jpg` | 336596 |
| `sources/drive/My Drive/MAF/Master Book Audio Video Dump/IMG_0565.jpg` | 382857 |
| `sources/drive/My Drive/MAF/Master Book Audio Video Dump/IMG_0566.jpg` | 260172 |
| `sources/drive/My Drive/MAF/Master Book Audio Video Dump/IMG_0568.jpg` | 359991 |
| `sources/drive/My Drive/MAF/Master Book Audio Video Dump/IMG_0569.jpg` | 318336 |
| `sources/drive/My Drive/MAF/Master Book Audio Video Dump/IMG_0570.jpg` | 329254 |
| `sources/drive/My Drive/MAF/THELMA_MEMORY_BASE/n8n_uplink.py` | 27 |
| `sources/drive/My Drive/Saved from Chrome B/Scene_Builder___CONFIGURATION_LAYOUT_1_THE_PASSING__GRIEF_PROTOCOL_Purpose_To_render_suffocat.png` | 1531295 |
| `sources/drive/_00_THELMA_AI_SUITE/Gemini_Generated_Image_238wve238wve238w.png` | 7999717 |
| `sources/drive/_00_THELMA_AI_SUITE/Gemini_Generated_Image_b6a9gbb6a9gbb6a9 (1).png` | 7211519 |
| `sources/drive/_00_THELMA_AI_SUITE/Gemini_Generated_Image_h6dt4ch6dt4ch6dt.png` | 7756411 |
| `sources/drive/_00_THELMA_AI_SUITE/Gemini_Generated_Image_nx5e4inx5e4inx5e.png` | 6887745 |
| `sources/drive/_00_THELMA_AI_SUITE/IMG_0561.jpg` | 309155 |
| `sources/drive/_00_THELMA_AI_SUITE/IMG_0562.jpg` | 310974 |
| `sources/drive/_00_THELMA_AI_SUITE/IMG_0563.jpg` | 285770 |
| `sources/drive/_00_THELMA_AI_SUITE/IMG_0564.jpg` | 336596 |
| `sources/drive/_00_THELMA_AI_SUITE/IMG_0565.jpg` | 382857 |
| `sources/drive/_00_THELMA_AI_SUITE/IMG_0566.jpg` | 260172 |
| `sources/drive/_00_THELMA_AI_SUITE/IMG_0568.jpg` | 359991 |
| `sources/drive/_00_THELMA_AI_SUITE/IMG_0569.jpg` | 318336 |
| `sources/drive/_00_THELMA_AI_SUITE/IMG_0570.jpg` | 329254 |
| `sources/drive/_00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Screenshot 2026-01-08 at 5.38.54 PM.png` | 630468 |
| `sources/drive/_00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Screenshot 2026-01-08 at 5.39.01 PM.png` | 500019 |
| `sources/drive/_00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Screenshot 2026-01-08 at 5.39.33 PM.png` | 561427 |
| `sources/drive/_00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Screenshot 2026-01-08 at 5.39.40 PM.png` | 430754 |
| `sources/drive/_00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Screenshot 2026-01-08 at 5.39.46 PM.png` | 527684 |
| `sources/drive/_00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Screenshot 2026-01-08 at 5.40.06 PM.png` | 768914 |
| `sources/drive/_00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Screenshot 2026-01-08 at 5.40.12 PM.png` | 436113 |
| `sources/drive/_00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Screenshot 2026-01-08 at 5.40.21 PM.png` | 484088 |
| `sources/drive/_00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Screenshot 2026-01-08 at 5.40.28 PM.png` | 530166 |
| `sources/drive/_00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Screenshot 2026-01-08 at 5.40.34 PM.png` | 439545 |
| `sources/drive/_00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Screenshot 2026-01-08 at 5.40.58 PM.png` | 443344 |
| `sources/drive/_00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Screenshot 2026-01-08 at 5.41.10 PM.png` | 382689 |
| `sources/drive/_00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/T.H.E.L.M.A. Logistics System` | 1588972 |
| `sources/drive/_00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/T.H.E.L.M.A._AI_Logistics_logo.png` | 1588972 |
| `sources/workspace/Archive-HisMajesty0225-Shenry60.zip` | 50112 |
| `sources/workspace/first-in-consciousness-speech1-boards/media-generation-speech1-environment-set-board-0-434107f2-9ba6-4b63-9f71-ad5612301318.webp` | 728124 |
| `sources/workspace/first-in-consciousness-speech1-boards/media-generation-speech1-scene-board-1-7-0-4da00103-660e-4975-b2c0-0a93e13c2117.webp` | 753100 |
| `sources/workspace/first-in-consciousness-speech1-boards/media-generation-speech1-scene-board-8-13-0-4e2dfe6d-3af3-4979-8b04-5448669b1836.webp` | 826084 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-1-posting-pack/.src/media/instagram-quote.jpg` | 270387 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-1-posting-pack/.src/media/instagram-quote.webp` | 565252 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-1-posting-pack/.src/media/okta-hero.jpg` | 250253 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-1-posting-pack/.src/media/okta-ref.jpg` | 253315 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-1-posting-pack/.src/media/short-cover.jpg` | 300948 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-1-posting-pack/.src/media/short-cover.webp` | 613684 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-1-posting-pack/.src/media/thumbnail-main.jpg` | 263079 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-1-posting-pack/.src/media/thumbnail-main.webp` | 550952 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-1-posting-pack/.src/validate/page-1.png` | 743699 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-1-posting-pack/.src/validate/page-2.png` | 301141 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-1-posting-pack/.src/validate/page-3.png` | 680207 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-1-posting-pack/.src/validate/page-4.png` | 728264 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-1-posting-pack/.src/validate/page-5.png` | 266557 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-1-posting-pack/.src/validate/page-6.png` | 301629 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-1-posting-pack/.src/validate/page-7.png` | 280673 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-1-posting-pack/first-in-consciousness-speech-1-posting-pack.pdf` | 1005336 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-1-production-package/.src/media/okta-hero.jpg` | 250253 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-1-production-package/.src/media/okta-small.jpg` | 138133 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-1-production-package/.src/validate/page-1.png` | 754562 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-1-production-package/.src/validate/page-2.png` | 185783 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-1-production-package/.src/validate/page-3.png` | 160146 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-1-production-package/.src/validate/page-4.png` | 185711 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-1-production-package/.src/validate/page-5.png` | 286111 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-1-production-package/.src/validate/page-6.png` | 256690 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-1-production-package/.src/validate/page-7.png` | 314560 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-1-production-package/.src/validate/page-8.png` | 268874 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-1-production-package/first-in-consciousness-speech-1-production-package.pdf` | 437621 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-2-production-package/.src/media/media-generation-speech2-okta-hero-0-c928efce-90df-4cfb-9805-eac1aadae8fc.jpg` | 455059 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-2-production-package/.src/media/media-generation-speech2-okta-hero-0-c928efce-90df-4cfb-9805-eac1aadae8fc.webp` | 719650 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-2-production-package/.src/media/media-generation-speech2-short-cover-0-2ceccae8-3173-43b1-a1ed-e1dcf8aa5b69.jpg` | 359178 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-2-production-package/.src/media/media-generation-speech2-short-cover-0-2ceccae8-3173-43b1-a1ed-e1dcf8aa5b69.webp` | 665156 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-2-production-package/.src/media/media-generation-speech2-thumbnail-main-0-922bb7c0-2ead-430c-9d52-e5c577161b31.jpg` | 319888 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-2-production-package/.src/media/media-generation-speech2-thumbnail-main-0-922bb7c0-2ead-430c-9d52-e5c577161b31.webp` | 490628 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-2-production-package/.src/media/speech2-short-cover.jpg` | 247506 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-2-production-package/.src/media/speech2-thumbnail-main.jpg` | 161336 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-2-production-package/.src/validate/page-1.png` | 771312 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-2-production-package/.src/validate/page-2.png` | 156183 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-2-production-package/.src/validate/page-3.png` | 141618 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-2-production-package/.src/validate/page-4.png` | 173668 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-2-production-package/.src/validate/page-5.png` | 128863 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-2-production-package/.src/validate/page-6.png` | 286142 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-2-production-package/.src/validate/page-7.png` | 218151 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-2-production-package/.src/validate/page-8.png` | 229778 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-2-production-package/.src/validate/page-9.png` | 485341 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-2-production-package/first-in-consciousness-speech-2-production-package.pdf` | 1290753 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-2-production-package/speech2-short-cover.jpg` | 247506 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-2-production-package/speech2-thumbnail-main.jpg` | 161336 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-3-production-package/.src/media/media-generation-speech3-aelune-hero-0-023a4b5a-0bca-42e3-a179-c4d6ec13fe46.webp` | 487506 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-3-production-package/.src/media/media-generation-speech3-short-cover-0-170b4536-4d9a-4846-9e9f-9191991d9be8.webp` | 564344 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-3-production-package/.src/media/media-generation-speech3-thumbnail-main-0-56c2ccbe-22e5-4003-8974-4d3bb1099082.webp` | 525262 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-3-production-package/.src/media/speech3-aelune-hero.jpg` | 452837 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-3-production-package/.src/media/speech3-short-cover.jpg` | 516078 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-3-production-package/.src/media/speech3-thumbnail-main.jpg` | 443905 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-3-production-package/.src/validate/page-1.png` | 619783 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-3-production-package/.src/validate/page-2.png` | 198362 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-3-production-package/.src/validate/page-3.png` | 155753 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-3-production-package/.src/validate/page-4.png` | 169112 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-3-production-package/.src/validate/page-5.png` | 193284 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-3-production-package/.src/validate/page-6.png` | 270301 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-3-production-package/.src/validate/page-7.png` | 251349 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-3-production-package/.src/validate/page-8.png` | 311103 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-3-production-package/.src/validate/page-9.png` | 454505 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-3-production-package/first-in-consciousness-speech-3-production-package.pdf` | 1570735 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-3-production-package/speech3-short-cover.jpg` | 516078 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-3-production-package/speech3-thumbnail-main.jpg` | 443905 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-4-production-package/.src/media/media-generation-speech4-okta-hero-0-fd45e45b-3185-4958-a4fc-046588b33940.webp` | 502618 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-4-production-package/.src/media/media-generation-speech4-short-cover-0-d8f5d3d3-7337-4e4d-a1cf-7afdf3c0115e.webp` | 575540 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-4-production-package/.src/media/media-generation-speech4-thumbnail-main-0-098e3581-971a-4835-b972-5046ec1404e6.webp` | 547108 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-4-production-package/.src/media/speech4-okta-hero.jpg` | 415084 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-4-production-package/.src/media/speech4-short-cover.jpg` | 470408 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-4-production-package/.src/media/speech4-thumbnail-main.jpg` | 485531 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-4-production-package/.src/validate/page-1.png` | 501956 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-4-production-package/.src/validate/page-2.png` | 156315 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-4-production-package/.src/validate/page-3.png` | 187263 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-4-production-package/.src/validate/page-4.png` | 123551 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-4-production-package/.src/validate/page-5.png` | 166926 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-4-production-package/.src/validate/page-6.png` | 298544 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-4-production-package/.src/validate/page-7.png` | 239297 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-4-production-package/.src/validate/page-8.png` | 283155 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-4-production-package/.src/validate/page-9.png` | 434029 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-4-production-package/first-in-consciousness-speech-4-production-package.pdf` | 1524757 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-4-production-package/speech4-short-cover.jpg` | 518355 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-4-production-package/speech4-thumbnail-main.jpg` | 534993 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-5-production-package/.src/media/aelune-cover.jpg` | 555788 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-5-production-package/.src/media/media-generation-aelune-cover-0-2d272c2a-0dd8-4ca1-a44b-e12801e5184f.webp` | 646346 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-5-production-package/.src/media/media-generation-speech5-short-cover-0-f41fc26b-0160-4b9b-9dab-13b43d50c9c6.webp` | 444286 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-5-production-package/.src/media/media-generation-speech5-thumbnail-main-0-d7f3238c-0700-401b-8e88-2a9431c30e6d.webp` | 442312 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-5-production-package/.src/media/thumb-main.jpg` | 428946 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-5-production-package/.src/media/thumb-short.jpg` | 418444 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-5-production-package/.src/validate/page-1.png` | 790843 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-5-production-package/.src/validate/page-2.png` | 175025 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-5-production-package/.src/validate/page-3.png` | 129836 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-5-production-package/.src/validate/page-4.png` | 131756 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-5-production-package/.src/validate/page-5.png` | 184657 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-5-production-package/.src/validate/page-6.png` | 329660 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-5-production-package/.src/validate/page-7.png` | 240694 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-5-production-package/.src/validate/page-8.png` | 260428 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-5-production-package/.src/validate/page-9.png` | 616660 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-5-production-package/first-in-consciousness-speech-5-production-package.pdf` | 1546558 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-5-production-package/speech5-short-cover.jpg` | 418444 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-5-production-package/speech5-thumbnail-main.jpg` | 428946 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-6-production-package/.src/media/aelune-cover.jpg` | 508405 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-6-production-package/.src/media/media-generation-aelune-cover-0-ce191a4b-5581-4716-9b50-bd93cd6f0b79.webp` | 640382 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-6-production-package/.src/media/media-generation-speech6-short-cover-0-7b475a95-b3e3-4245-aad6-021b6fa4f2d8.webp` | 627554 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-6-production-package/.src/media/media-generation-speech6-thumbnail-main-0-5143fef7-42b1-4fd9-b797-527b763e9fee.webp` | 502602 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-6-production-package/.src/media/speech6-short-cover.jpg` | 465935 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-6-production-package/.src/media/speech6-thumbnail-main.jpg` | 435481 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-6-production-package/.src/validate/page-1.png` | 796463 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-6-production-package/.src/validate/page-2.png` | 181463 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-6-production-package/.src/validate/page-3.png` | 142045 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-6-production-package/.src/validate/page-4.png` | 112819 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-6-production-package/.src/validate/page-5.png` | 177375 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-6-production-package/.src/validate/page-6.png` | 311656 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-6-production-package/.src/validate/page-7.png` | 245165 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-6-production-package/.src/validate/page-8.png` | 272421 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-6-production-package/.src/validate/page-9.png` | 579939 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-6-production-package/first-in-consciousness-speech-6-production-package.pdf` | 1552296 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-6-production-package/speech6-short-cover.jpg` | 465935 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-6-production-package/speech6-thumbnail-main.jpg` | 435481 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-7-production-package/.src/media/media-generation-okta-cover-0-11e47408-9e84-4ed3-ad16-fb980839e903.webp` | 764826 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-7-production-package/.src/media/media-generation-speech7-short-cover-0-1705c1a6-6867-4f2c-90a4-fde314f99625.webp` | 627898 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-7-production-package/.src/media/media-generation-speech7-thumbnail-main-0-d62cdfe9-5e3c-472a-a2c7-044f85c6e2c4.webp` | 689538 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-7-production-package/.src/media/okta-cover.jpg` | 588737 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-7-production-package/.src/media/speech7-short-cover.jpg` | 548811 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-7-production-package/.src/media/speech7-thumbnail-main.jpg` | 553043 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-7-production-package/.src/validate/page-1.png` | 658763 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-7-production-package/.src/validate/page-2.png` | 182925 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-7-production-package/.src/validate/page-3.png` | 157408 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-7-production-package/.src/validate/page-4.png` | 104951 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-7-production-package/.src/validate/page-5.png` | 167293 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-7-production-package/.src/validate/page-6.png` | 320918 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-7-production-package/.src/validate/page-7.png` | 248176 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-7-production-package/.src/validate/page-8.png` | 254680 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-7-production-package/.src/validate/page-9.png` | 576179 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-7-production-package/first-in-consciousness-speech-7-production-package.pdf` | 1833926 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-7-production-package/speech7-short-cover.jpg` | 548811 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-7-production-package/speech7-thumbnail-main.jpg` | 553043 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-8-production-package/.src/media/media-generation-speech8-okta-cover-0-6d7dadaa-fb6c-44d8-a80a-93f0e354e556.webp` | 477178 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-8-production-package/.src/media/media-generation-speech8-short-cover-0-9c038e90-4f12-4a76-ac4c-361c135957c1.webp` | 508756 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-8-production-package/.src/media/media-generation-speech8-thumbnail-main-0-b766ad06-e8e1-4fc5-a9b7-521f53e39cf4.webp` | 608222 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-8-production-package/.src/media/okta-cover.jpg` | 427473 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-8-production-package/.src/media/speech8-short-cover.jpg` | 455911 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-8-production-package/.src/media/speech8-thumbnail-main.jpg` | 496479 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-8-production-package/.src/validate/page-1.png` | 635453 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-8-production-package/.src/validate/page-2.png` | 174972 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-8-production-package/.src/validate/page-3.png` | 145338 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-8-production-package/.src/validate/page-4.png` | 122735 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-8-production-package/.src/validate/page-5.png` | 185003 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-8-production-package/.src/validate/page-6.png` | 342839 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-8-production-package/.src/validate/page-7.png` | 261084 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-8-production-package/.src/validate/page-8.png` | 290779 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-8-production-package/.src/validate/page-9.png` | 485558 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-8-production-package/first-in-consciousness-speech-8-production-package.pdf` | 1523907 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-8-production-package/speech8-short-cover.jpg` | 455911 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/first-in-consciousness-speech-8-production-package/speech8-thumbnail-main.jpg` | 496479 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/runway-upload-pack-2026-11-13.zip` | 6824461 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/runway-upload-pack-2026-11-13/01-okta-locked-portrait.jpg` | 631310 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/runway-upload-pack-2026-11-13/02-aelune-locked-portrait.jpg` | 507092 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/runway-upload-pack-2026-11-13/03-seraath-a2-locked.jpg` | 686900 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/runway-upload-pack-2026-11-13/04-vess-b1-locked.jpg` | 647199 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/runway-upload-pack-2026-11-13/S1-okta-hero.jpg` | 344839 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/runway-upload-pack-2026-11-13/S2-okta-hero.jpg` | 631093 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/runway-upload-pack-2026-11-13/S3-aelune-hero.jpg` | 514783 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/runway-upload-pack-2026-11-13/S4-okta-hero.jpg` | 470332 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/runway-upload-pack-2026-11-13/S5-aelune-cover.jpg` | 632168 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/runway-upload-pack-2026-11-13/S6-aelune-cover.jpg` | 636377 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/runway-upload-pack-2026-11-13/S7-okta-cover.jpg` | 669972 |
| `sources/workspace/goals/first-in-consciousness-mentor-series/files/runway-upload-pack-2026-11-13/S8-okta-cover.jpg` | 485556 |
| `sources/workspace/goals/t-h-e-l-m-a-crm-complete-leadstack-fix-up/files/delivery-v41-code-2026-11-13.zip` | 21825 |
| `sources/workspace/goals/t-h-e-l-m-a-crm-complete-leadstack-fix-up/files/media-generation-thelma-crm-ui-dashboard-0-9b8e6e9b-25f6-4e9f-8672-e893c8fa0ab8.webp` | 364570 |
| `sources/workspace/goals/t-h-e-l-m-a-crm-complete-leadstack-fix-up/files/media-generation-thelma-leadstack-systems-overv-0-13c62952-953f-4759-be45-7111484336cd.webp` | 420810 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/CSUITE_SYSTEM_PACKAGE_2026-11-10.zip` | 17880 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/master-advice.paths` | 55 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/prime-retired.paths` | 28 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/reviews-2026-11-09.paths` | 365 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-directives-and-system-review/.src/validate/page-01.png` | 233347 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-directives-and-system-review/.src/validate/page-02.png` | 237523 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-directives-and-system-review/.src/validate/page-03.png` | 191143 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-directives-and-system-review/.src/validate/page-04.png` | 249906 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-directives-and-system-review/.src/validate/page-05.png` | 222691 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-directives-and-system-review/.src/validate/page-06.png` | 281008 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-directives-and-system-review/.src/validate/page-07.png` | 218389 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-directives-and-system-review/.src/validate/page-08.png` | 290020 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-directives-and-system-review/.src/validate/page-09.png` | 276008 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-directives-and-system-review/.src/validate/page-10.png` | 269008 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-directives-and-system-review/.src/validate/page-11.png` | 301085 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-directives-and-system-review/.src/validate/page-12.png` | 312272 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-directives-and-system-review/.src/validate/page-13.png` | 331858 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-directives-and-system-review/.src/validate/page-14.png` | 230672 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-directives-and-system-review/.src/validate/page-15.png` | 325994 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-directives-and-system-review/.src/validate/page-16.png` | 279207 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-directives-and-system-review/.src/validate/page-17.png` | 270980 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-directives-and-system-review/visionweaver-directives-and-system-review.pdf` | 216366 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-page-images/board/01-home-dashboard-v1.png` | 149373 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-page-images/board/02-vision-builder-v1.png` | 150667 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-page-images/board/03-strategic-planner-v1.png` | 122005 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-page-images/board/04-initiatives-v2.png` | 162151 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-page-images/board/05-programs-projects-v2.png` | 134974 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-page-images/board/06-ai-co-pilot-v2.png` | 136119 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-page-images/board/07-cmi-v1.png` | 130772 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-page-images/board/08-directors-guild-v2.png` | 137549 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-page-images/board/09-teams-c-suite-v1.png` | 131925 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-page-images/board/10-assets-knowledge-v2.png` | 153306 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-page-images/board/11-resources-v2.png` | 155777 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-page-images/board/12-it-security-v2.png` | 131044 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-page-images/board/13-finance-accounting-v1.png` | 136665 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-page-images/board/14-reports-insights-v2.png` | 146613 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-page-images/board/15-settings-v2.png` | 142557 |
| `sources/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-page-images/board/16-avatar-engineering-v2.png` | 142557 |
| `sources/workspace/imagine_media/media-generation-aelune-character-board-0-b5badf24-e11d-4f4b-a5fc-594c3ae6a6f7.webp` | 749070 |
| `sources/workspace/imagine_media/media-generation-fireside-grand-character-board-0-9afee20e-9371-47c3-975b-c6f7560efd1e.webp` | 591660 |
| `sources/workspace/imagine_media/media-generation-fireside-household-a-board-0-d0259516-6be3-44a0-83f5-9cf60b01ccb3.webp` | 510132 |
| `sources/workspace/imagine_media/media-generation-fireside-household-b-board-0-268c40d5-4abb-4186-9d51-b9290fed1577.webp` | 561698 |
| `sources/workspace/imagine_media/media-generation-fireside-household-c-board-0-17c7f874-ab7a-418b-9dbe-e628b63fd955.webp` | 557870 |
| `sources/workspace/imagine_media/media-generation-fireside-household-d-board-0-3234d762-32ca-4234-bfa4-2e9270148204.webp` | 565734 |
| `sources/workspace/imagine_media/media-generation-fireside-household-e-board-0-d17d8e7a-7453-4c4a-a1f9-0f1289c0ff74.webp` | 506568 |
| `sources/workspace/imagine_media/media-generation-fireside-household-f-board-0-fee7d889-3d38-4d37-972d-c15cb295566f.webp` | 706200 |
| `sources/workspace/imagine_media/media-generation-fireside-kids-listeners-board-0-bbbce71e-cfb0-44ed-9790-d10f7db63731.webp` | 620120 |
| `sources/workspace/imagine_media/media-generation-okta-character-board-variant-g-0-dde36de7-db99-486a-987f-bb54edf049a5.webp` | 838892 |
| `sources/workspace/imagine_media/media-generation-okta-character-board-variant-n-0-7de30c96-0e7e-4fb9-9083-6bc1cb92b3c6.webp` | 891362 |
| `sources/workspace/imagine_media/media-generation-seraath-character-board-0-8d283a0a-017c-418f-9b95-f2083404c1f7.webp` | 845312 |
| `sources/workspace/imagine_media/media-generation-seraath-rework-ember-root-0-a595963b-a7dd-43f5-8a6f-c5b2dfbdead0.webp` | 881442 |
| `sources/workspace/imagine_media/media-generation-seraath-rework-silver-canopy-0-bfc2ee4c-3a1d-42b1-af05-2a070ed0682b.webp` | 630766 |
| `sources/workspace/imagine_media/media-generation-speech1-instagram-quote-0-f8c9301d-1963-439e-a49a-91d65c4d579d.webp` | 565252 |
| `sources/workspace/imagine_media/media-generation-speech1-thumbnail-main-0-90e68a60-3095-4aec-adfc-7673e543fa87.webp` | 550952 |
| `sources/workspace/imagine_media/media-generation-speech2-short-cover-0-bbbb8596-afed-4e48-904e-add34fa8398b.webp` | 519034 |
| `sources/workspace/imagine_media/media-generation-speech2-thumbnail-main-0-57b89597-69ed-4733-b156-53d4dacb5ecb.webp` | 528466 |
| `sources/workspace/imagine_media/media-generation-speech3-short-cover-0-e230a484-fd87-4701-8a08-9af589e465b1.webp` | 481240 |
| `sources/workspace/imagine_media/media-generation-speech3-thumbnail-main-0-d8c0ccb9-6b03-4a80-a992-783000582cd7.webp` | 654676 |
| `sources/workspace/imagine_media/media-generation-speech4-short-cover-0-b76761a0-9e5a-4b51-8185-01e2d9d4cb26.webp` | 555286 |
| `sources/workspace/imagine_media/media-generation-speech4-thumbnail-main-0-674674b3-2c48-4f99-9a9c-0471594b6cf2.webp` | 521472 |
| `sources/workspace/imagine_media/media-generation-speech5-short-cover-0-36d77f67-9c84-4439-8da4-cb2841d6510d.webp` | 465608 |
| `sources/workspace/imagine_media/media-generation-speech5-thumbnail-main-0-8ea9076b-6ea2-42fc-b147-bdb58ef8dba3.webp` | 638586 |
| `sources/workspace/imagine_media/media-generation-speech6-short-cover-0-5e523464-d4d0-489f-81fd-9ecab4e07c0f.webp` | 408346 |
| `sources/workspace/imagine_media/media-generation-speech6-thumbnail-main-0-1d5de865-295e-47d5-919d-6a0b7589c7d7.webp` | 572518 |
| `sources/workspace/imagine_media/media-generation-speech7-short-cover-0-6dfd9caf-2a14-4fae-9ab4-2aaf49b156ef.webp` | 545176 |
| `sources/workspace/imagine_media/media-generation-speech7-thumbnail-main-0-b34cb562-35be-461f-bec1-3b07c9009826.webp` | 585162 |
| `sources/workspace/imagine_media/media-generation-speech8-short-cover-0-9c57ac27-fc82-4649-9358-0a93b88fe92b.webp` | 485404 |
| `sources/workspace/imagine_media/media-generation-speech8-thumbnail-main-0-7e6c0c61-ab96-42ad-9eb3-163524e1a6d3.webp` | 527056 |
| `sources/workspace/imagine_media/media-generation-vess-character-board-0-b9da4dd1-255b-44ce-ac1e-0ee4c3aadc95.webp` | 714048 |
| `sources/workspace/imagine_media/media-generation-vess-rework-opal-river-0-b46a86f5-4456-494e-b091-85b303f11144.webp` | 650310 |
| `sources/workspace/imagine_media/media-generation-vess-rework-pearl-moss-0-cf2526b9-c034-4b4b-b278-1e00eb67a723.webp` | 474626 |
| `sources/workspace/user/files/069D8B16-3D26-47B5-9F14-AD7D5582A0C8-photo-10563CAC-279B-4DC8-A372-577C68C1144B.jpg` | 228784 |
| `sources/workspace/user/files/2A4ABECC-0E3E-40A0-864E-8A9F7CBE681F-photo-74E4B3BB-A8A8-4FEF-830B-521D2D5D2878.jpg` | 400378 |
| `sources/workspace/user/files/32436597-1494-42D0-985E-C2794213B53D-photo-DE3BCEF0-7DF5-40B8-9138-4AE6974D8B60.jpg` | 230928 |
| `sources/workspace/user/files/3E0E8302-A52C-4F25-8642-9CE2CC06C603-photo-432239E7-D2A8-4B12-BFFC-4D762A0133E3.jpg` | 473968 |
| `sources/workspace/user/files/3F4D4499-7E51-4418-A2AA-7ECBD95B504D-photo-33608F4E-8793-494C-84B7-3745B197A802.jpg` | 391924 |
| `sources/workspace/user/files/55913C73-7C25-4E68-A496-697DA8C944BC-photo-7FC3BAB2-9A07-468D-A797-A84892EA1982.jpg` | 490483 |
| `sources/workspace/user/files/635FF253-AAF6-4A10-8494-03E9A77ED15D-photo-AFD80E4B-605B-44D9-A9CD-25725B450F36.jpg` | 523576 |
| `sources/workspace/user/files/755DFA35-34B5-440C-8E82-858176FA3998-photo-1E3BA0BC-2158-49DE-8C44-E8FF4527CC46.jpg` | 233868 |
| `sources/workspace/user/files/7849B3B5-7A5D-4245-8A39-0E850823A3D8-photo-B0754E10-9F45-446F-8865-54768FAABCFB.jpg` | 414584 |
| `sources/workspace/user/files/9BBB7211-7752-4D71-AC4B-A3F5557DB7D6-photo-BD4B1ED3-4331-4278-B23D-8EE9051D2451.jpg` | 444808 |
| `sources/workspace/user/files/A7319F7D-18FE-44B0-A537-58D350329DE5-photo-295DBE07-3F3C-457C-9C41-10A4B22F053F.jpg` | 228784 |
| `sources/workspace/user/files/AEB32609-B6F2-407D-AD1D-73BEFD490883-photo-DDC1E8D4-A691-4837-9304-812AE9CA1E96.jpg` | 603687 |
| `sources/workspace/user/files/B055105E-9D4F-427D-AA30-E89F111F403A-photo-C2B863B5-09AA-48D6-85BF-8482306811F1.jpg` | 478340 |
| `sources/workspace/user/files/B37C2AB0-082D-4C07-9CE9-A5B1F7B0D02F-photo-74E7BEC5-AFBF-4A30-B5A8-2DFE4FAA4DDA.jpg` | 275150 |
| `sources/workspace/user/files/CSUITE_SYSTEM_OF_RECORD_v1_1.pdf` | 129932 |
| `sources/workspace/user/files/D7E90216-AD55-438C-AD01-7A87C218D1CE-photo-930F4BE3-A626-4724-9127-765D83F0F9E8.jpg` | 230232 |
| `sources/workspace/user/files/DEB84EF4-0274-4A44-9033-35E75D4E9DEF-photo-04506E19-4041-4BCE-B87F-2E2678E22923.jpg` | 190965 |
| `sources/workspace/user/files/E1C52D29-D69C-4DCE-AAF9-5CAC569BA9AB-photo-0FA2B391-15F6-4839-8DB8-A7D9985F914E.jpg` | 200043 |
| `sources/workspace/user/files/EA1DF4A7-63C6-4930-A68A-40A5900E7E42-photo-34D1A9A9-301D-4304-B3E0-BE68CF1F0C48.jpg` | 471033 |
| `sources/workspace/user/files/VisionWeaver_Prime.zip` | 1601352 |
| `sources/workspace/user/files/Works_Migration_Record_Enhanced_v2_ChatGPT_2026-11-08.docx` | 14723 |
| `sources/workspace/user/media_library/image/03/030b817ea35289b2ca35fcf2ab525fa357d29461474d43d0dbd43eb2a302c883.jpg` | 363169 |
| `sources/workspace/user/media_library/image/10/102749ca8b82aed7b4688ac3973ec34cd115ca12718fdcf0b08e13f543d10bbc.jpg` | 648347 |
| `sources/workspace/user/media_library/image/1072309E-D69E-4FB3-9ADA-415BF69C8FEB.png` | 2562254 |
| `sources/workspace/user/media_library/image/15/15560470cd98a168233a1af422f5941775afca131c62b7dd4caf2d07a8ee2e4a.jpg` | 330576 |
| `sources/workspace/user/media_library/image/22/229790c1033b80fc56bdaef40d2153c2d6957bd324f47d6267174ca86405a96e.jpg` | 634858 |
| `sources/workspace/user/media_library/image/2c/2c8ec504cbdd3a1343efadecb471e1a5d201d2c9a3b5caa314f46c70108fb20a.jpg` | 645187 |
| `sources/workspace/user/media_library/image/7c/7cd143c9cc49d2da201d8b56dc9ca4d57d4f03b789eec8b158374dd5b6e04ca8.jpg` | 274511 |
| `sources/workspace/user/media_library/image/93/939267cae641593d3e58276dca1524b34f9cc8da141914efd8ef9463d39bd391.jpg` | 433459 |
| `sources/workspace/user/media_library/image/a2/a284e0109667c1d429c4aadf3a934784807f1443e3a904a7537019692134ffe9.jpg` | 79043 |
| `sources/workspace/user/media_library/image/a9/a93500377b846047a6374b8833f4a0db4ce27fbfa8e1cfe921baa67a27d46a5d.jpg` | 67454 |
| `sources/workspace/user/media_library/image/e0/e04f23532169c8652c3a8bc8065cfe258d0a40b16d2e2046232233977471551d.jpg` | 411554 |
| `sources/workspace/user/media_library/image/e5/e5c9de4a95437ea9560a8d4461234a537ee6dd45e85af97e17d0763bd3e5a04c.jpg` | 56266 |
| `sources/workspace/user/media_library/image/e9/e97b8279b11f9173b4a206e4e33f70fab0efdcf2d951f8215b72dd1c85586e6c.jpg` | 493094 |
| `sources/workspace/user/media_library/image/ed/ed6a3d1e0aa74ab4a2fd59b8c364c60fb7ee0bb7975882dab5dbbba8e53d1b2c.jpg` | 455968 |
| `sources/workspace/user/media_library/image/photo-2.jpg` | 632610 |
| `sources/workspace/user/media_library/image/photo.jpg` | 539124 |
| `sources/workspace/user/media_library/image/photo_1.jpg` | 632610 |
| `sources/workspace/user/media_library/image/photo_2.jpg` | 648097 |
| `sources/workspace/user/media_library/image/photo_3.jpg` | 619507 |
| `sources/workspace/vw-rebuild/public/vw/feature_avatar-engineering.jpg` | 3520 |
| `sources/workspace/vw-rebuild/public/vw/feature_create-produce.jpg` | 4584 |
| `sources/workspace/vw-rebuild/public/vw/feature_design-commercial.jpg` | 4125 |
| `sources/workspace/vw-rebuild/public/vw/feature_distribution-growth.jpg` | 4194 |
| `sources/workspace/vw-rebuild/public/vw/feature_finance-accounting.jpg` | 2845 |
| `sources/workspace/vw-rebuild/public/vw/feature_it-security.jpg` | 2794 |
| `sources/workspace/vw-rebuild/public/vw/feature_media-library.jpg` | 5022 |
| `sources/workspace/vw-rebuild/public/vw/feature_post-production.jpg` | 4395 |
| `sources/workspace/vw-rebuild/public/vw/feature_quality-audit.jpg` | 3818 |
| `sources/workspace/vw-rebuild/public/vw/feature_resources.jpg` | 3211 |
| `sources/workspace/vw-rebuild/public/vw/feature_teams.jpg` | 3849 |
| `sources/workspace/vw-rebuild/public/vw/feature_worlds-locations.jpg` | 28074 |
| `sources/workspace/vw-rebuild/public/vw/hero_director.jpg` | 3241 |
| `sources/workspace/your_files/CSUITE_SYSTEM_PACKAGE_UPDATED_2026-11-10.zip` | 3449909 |

**Total: 346 files.**


## 7. What was NOT consulted

- **Vercel** (no read of deployments/logs beyond what the memory record already
  states; the Vercel connector returns 403 on team scope — browser work only).
- **Supabase** (no live reads; the record states the data homes, tables, and row
  counts as verified Nov 10–11. No writes — standing rule).
- **Lovable / Figma** (no live reads; the record states the Lovable export and the
  Figma check from Nov 10).
- **Other mailboxes** (only one mailbox is connected).
- **Other Drive accounts** (only one account is connected).
- **Non-default Git branches** (not enumerated — approval-gated).
- **The destination repo's own prior state** (verified empty before the first push;
  there was no prior content to consult).

## 8. Worker manifests (local only, not pushed)

The five worker reports and manifests live locally at
`~/workspace/visionweaver-research-hub/_worker-reports/` (excluded from all push
manifests by design — they are process records, not hub content). They contain the
full per-file accounting: GitHub per-file list + redaction table, Drive 2,134-line
manifest (folder list, included files, redactions, unresolvable, excluded appendix),
email manifest, workspace manifest (1,613 lines, §5 judgments), memory manifest
(733 lines, chronological index from line 226).
