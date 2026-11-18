# System 3 — Director Studio, the director control surface in the VisionWeaver repository

What this system is: a control surface in the repository estibancreations-svg/VisionWeaver, folder apps/director-studio, version 7 in its README dated 30 September 2026, with version 8 parts in its source files and a version 8.1 frames fix dated 3 October 2026. Its stated production is one production only: Crossroads of Identity, Book 1 Convergence, Episode 1, The News. Its stated job is the place where Sire, the director, makes every decision in the pipeline, from the books and locks through pictures, motion, sound, the edit, delivery, and publishing. Departments bring finished work to the Directors Guild queue, and nothing moves until Sire decides. Two gates never move: key frames are approved before any video is made, and the word APPROVED is required before anything goes public. The build reads the episode's production records straight from the repository, so the page always matches them. The file index.html is a build output and is not committed; running build.py makes it. The live copy is published as a Claude artifact. Opened as a plain file, the page still works and saves to that browser only.

## Pages, by stage, and what Sire does there

Run of show, no stage number: see every part across 8 stages, what is waiting, credits, and activity.

Guild queue, no stage number: approve or send back department work with a note, and add items.

Books and script, stage 1: 7 books, script versions, and part stories.

Locks and maps, stage 2: camera maps, face locks, light locks, plates, and props.

Shot bible, stage 2: every shot's plate, pin, lens, move, framing, face, light, and sound, with status and notes.

Pictures, stage 3: Gate 1 — approve or redo part 2 key frames, plus memorial stills.

Motion, stage 4: build a job card for the Studio bot with a live credit estimate.

Narration booth, stage 5: teleprompter paced in words per minute, timer, and subtitle cards.

Sound and music, stage 5: voice lock, part 1 sound kit, and what part 2 still needs.

Edit, stage 6: playable multi-track timelines, where clicking any block gives CapCut steps.

Deliver, stage 7: files ready per part.

Publish and social, stage 8: release calendar, packet builder, Gate 2, and platform rules.

Cast and avatars, stage 2: 18 cast records covering lock record, Localized Avatar plus Historical Space profile, 360 board check, calibration ladder, reference photos, voice locks, and pause gates.

THELMA AI, no stage number: assistant with page tools to open pages, search, read shots and characters, read Supabase, run checks, propose to the Guild queue, and note Claude. Propose-only. It has an on and off switch, a guide bar, read-aloud, and thinking depth.

Claude uplink, no stage number: inbox between Sire and Claude, Claude's desk, and a Wake Claude now control that starts a Claude session that answers and never publishes.

Settings, no stage number: appearance with 5 themes, 5 accents, text size, spacing, menu, and motion; system and access; connections with per-connector on and off; output and transfer covering download, Drive, email, and print; THELMA; uplink; data and backup and restore.

Live connections, no stage number: one-click live check of Runway, Supabase, Zapier, and GitHub, plus one-time bot setup steps.

Database, no stage number: studio data inspector plus Supabase table browser and read-only SELECT console.

Rights and provenance, no stage number: 8 safety checks per part before Gate 2.

Activity log, no stage number: filter and download every change.

Uploads and files, no stage number: filename matching checks off cues and deliverables, and files stored in the studio.

Credit ledger, no stage number: every recorded spend and the live balance.

## Built-from records stated in the README

Shot bible, 88 shots plus S05b and S03b inserts, built from the part 1 and 2 lock sheet and the part 3, part 4, and part 5 shot tables. Narration booth, 25 cues with subtitle cards, built from the narration cue sheet version 1. Camera maps built from each part's camera maps file. Captions built from the part 1 captions file.

## Capabilities of the live copy, as its README states them

Database: shared saved data covering studio state, including part 2 picks, narration, deliverables, setup, shot status and notes, release calendar, settings, avatars, rights, live, and Claude desk; queue data for the Guild queue; a main activity log; uplink data for Claude uplink threads; and stored uploads. Private per person: user preferences covering THELMA chat and email recipients. Claude reads and writes it directly.

User profile: shows who approved what, and stores ids only, never names.

Sample: THELMA AI chat with page tools and one-click caption drafts, using the viewer's Claude usage.

Downloads: saves the edit list, captions, job card, publish packet, reading script, and shot list as files.

Assets: stores uploaded pictures, video, PDFs, and text at 20 megabytes each, and character reference photos. Audio stays on the device.

MCP: the viewer's own connector logins, covering Runway plan and credit display; Supabase SQL execution plus table listing, read-only and SELECT-guarded; Zapier action inspection; GitHub file contents; Google Drive file creation for output sent to Drive, a new file each time; and Claude Code Remote trigger firing for uplink wake-up. This capability makes the page private-only.

## Source layout stated in the README

Page shell with top bar, search, stage menu, THELMA drawer, and command palette. Design tokens and light plus dark themes. Production records covering parts, faces, lights, plates, frames, stills, audio, cues, ledger, and connections. System facts, connector catalog, cast registry, voice locks, avatar framework, QC ladder, rights, THELMA rules, and page guides. Saved-data layer with database or browser fallback, appearance, helpers, derived status, and stage menu. Settings with 7 tabs, Cast and avatars, Database, Claude uplink, Activity log, Rights and provenance, and output and transfer. THELMA AI with chat plus page tools plus read-aloud, guide bar, and command palette. Run of show, Guild queue, Books and script, Locks and maps, Shot bible, Pictures, and Motion views. Narration booth, Sound, Edit timelines covering the part 1 edit list and part 2 draft, Deliver, Publish, Setup, Uploads, and Ledger views. Version 8 projects, stage boards, Decide by swipe, onboarding, and tour. Version 8 execute file: THELMA's Yes and No action cards, ask first, then do it. Version 8.1 frames file: part 2 frames and their batch card stay in step, and Approve cannot un-approve. Styles for projects, Decide, onboarding, action cards, and frames progress line. Downloads, search, caption drafts, live check, rendering, and events. A build script that stitches the above with the records into index.html. History holding earlier UI rounds from version 1 mockups through version 3, kept for reference.

## Version history stated in the README

Version 1, 28 September 2026: first mockups, director approval plus operator dashboard.

Version 2, 29 September 2026: director control suite with lock sheets, face and light locks, and stills queue.

Version 3, 29 September 2026: fixed the nav click bug, with right sidebar panels. It had made-up credit and location figures, corrected in version 4.

Version 4, 29 September 2026: rebuilt from the repository records, with the full pipeline, edit timeline, sound, delivery, publishing, and uploads. Real credits, 36,738.

Version 5, 29 September 2026: shared saved data, Guild queue, shot bible for all 5 parts, camera maps, narration booth, part 2 draft timeline, release calendar, caption drafting, setup and connections, search, and Ask the studio.

Version 6, 29 September 2026: live connection check, with Runway credits, Supabase registry and log, Zapier apps, GitHub repo, and top-bar credits updating from the live answer. Supabase ec_connectors registry applied, 46 connectors, 12 active.

Version 7, 30 September 2026: THELMA AI with canon rules from MASTER_CEO_DASHBOARD, page tools, propose-only, on and off, guide bar, and read-aloud; Cast and avatars with Five Stations lock record, 360 check, calibration ladder, Localized Avatar plus Historical Space profile, and photos; Settings hub with themes including Think legal pad, accents, text size, density, system and access, connections, output and transfer to Drive, email, and print, and backup and restore; Database browser; Claude uplink with wake-up task; Rights and provenance; Activity log; command palette; and real file storage.

Versions 7.2 through 8, 30 September 2026: uplink send-and-wake repair, THELMA chat redesign, transport, conversation log, projects, onboarding, Decide, and execute.

Version 8.1, 3 October 2026: the part 2 key frames queue card can no longer be approved by itself; it follows the 15 frames. Decide shows frames first with a progress line. Approve on an approved frame no longer un-approves it.

## Operating layer added 6 October 2026, as its README states it

VisionWeaver OS: command board spanning Avatar Engineering, Worlds and Locations, production, Design and Commercial, Teams and C-Suite, Finance, Memory and Data, IT and Security, and Quality and Audit.

Design and Commercial: preserves the 2,000-template Commercial Creativity Station and adds explicit Product Design, Product Placement, and Placement Mapping control surfaces. Dedicated product-design and placement runtime automation remains a later implementation layer; the board does not claim otherwise.

History, Memory, and Data: routes to the existing activity log, Supabase read-only database browser, files, backup and restore, and provenance surfaces.

IT and Security: distinguishes runtime-checked connections from recorded, available, degraded, not-connected, and export-only integrations. API secret values are never rendered; only canonical secret names and approved secret-store locations are shown.

Architect menu: links VisionWeaver upward to the main CEO Dashboard and to the real GitHub and Supabase administration surfaces.

THELMA context: the operating map is injected into the Studio assistant context so she can reason across Avatar State, World and Location State, commercial and product work, finance, memory, infrastructure, and independent quality without pretending unverified integrations are live.

Existing production gates, project records, Cast and Avatar workflows, Design Studio, Commercial Creativity Station, database, Claude uplink, rights and provenance, and activity history remain in place.

## Character board workflow stated in the README

The Cast and avatars page must treat the board stack as a production lock chain. Character Detail Specifications Board: canonical physical and performance detail source. 360 View Board: 32-view master by default, and 16-view state board for clothing-only or limited non-identity changes. A Cast Board: multi-character scene board that calls the active state for each character.

That is the full page list for Director Studio.
