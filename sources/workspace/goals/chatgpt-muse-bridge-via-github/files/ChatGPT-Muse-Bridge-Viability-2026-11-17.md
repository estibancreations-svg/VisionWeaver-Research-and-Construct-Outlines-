# ChatGPT ↔ Muse bridge — viability + setup plan
Date: November 17, 2026 | Status: viability checked, repo decision pending

## Verdict

- **Direct MCP connection INTO ChatGPT: NOT VIABLE.** ChatGPT exposes no MCP server and no API for its own conversation history. MCP runs the other direction: ChatGPT (paid plans, Developer Mode on) can call *external* MCP servers. Verified by web search Nov 17, 2026: ChatGPT's custom connectors call outside MCP servers; no ChatGPT-side MCP server for an external agent exists.
- **GitHub as the shared bridge: VIABLE.** GitHub is connected and authenticated (verified Nov 17, 10:59 AM CST, MCP endpoint live). Both systems work from the same repo: Muse via the GitHub connector; ChatGPT via its GitHub connector/MCP (plan-dependent) or via files he places.
- **ChatGPT export + shared links: VIABLE, already proven.** Export (ChatGPT Settings → Data Controls → Export) gives the full archive; shared conversation links can be read directly (as with the Becoming HER workup link). Memory Gems already holds 29 ChatGPT gems imported this way (Nov 9, 2026).
- **Scraping chatgpt.com / unofficial automation: NOT COMPLIANT.** Will not do it. No passwords, no session reuse, no unofficial APIs.

## How work flows

1. ChatGPT side produces work → it lands in the bridge repo (his upload/paste, or ChatGPT's GitHub connector if his plan has it).
2. Muse checks the repo on a schedule → works the queue → commits results back → updates the Space.
3. Muse side produces work → commits to the repo → he opens it in ChatGPT via the repo connector or file download.
4. Memory Gems stays the vault for imported knowledge. The new Space is the active-work board. No duplication between them.

## The trigger, honestly

- **No instant push:** GitHub webhooks cannot reach this environment, so there is no live push notification. The trigger is a **scheduled check** (cron) that reads the bridge repo for new/changed files in the queue folder and new commits.
- On finding work: I do it, commit results back, and report in the Space and in chat.
- Frequency is his call: every 2 hours, twice daily, or once daily (asked after the repo choice).
- Each GitHub write asks his approval on a fresh card. Writes are batched to keep cards few (standing rule).

## Repo decision (asked Nov 17)

- **Option A — NEW private repo.** HE creates it (empty, private) in estibancreations-svg and installs the Muse GitHub App on it. I cannot create repos: verified GitHub 403 twice (Oct 16–17, 2026, "Resource not accessible by integration"). The tool list shows `create_repository`, but the App is refused when it runs. After he creates it, I verify access and set up the queue folders.
- **Option B — EXISTING repo.** He names it. I verify the App is installed on it and read/write access works before any work lands there.
- Proposed queue layout: `/inbox/` (new work for Muse, one folder per job with a brief + files), `/in-progress/`, `/done/` (finished work + report), `/shared/` (reference files both systems use).

## The Space (queued on the repo decision)

Private fullstack Space, no public link: bridge status (last check, repo, what's new), work queue (pending / in progress / done), transfer log, methods (export / shared-link / upload steps), and a link to Memory Gems for the vault.

## Open question — ChatGPT's side

- Which ChatGPT plan? The GitHub connector / MCP custom connectors need a paid plan with Developer Mode on. If his plan lacks it, the ChatGPT→repo leg is his manual upload/paste or shared links — still fine, just not automatic. Ask him whether he wants the ChatGPT-side connector setup walked through.

## Compliance rules (standing)

- Only his own material: exports he requests, links he shares, files he uploads, repos he owns.
- No scraping, no credential sharing, no unofficial APIs, no third-party data.
- Nothing published, merged, or deployed without his go. Work products land as drafts/branches first.

## Started Nov 17

- GitHub connection verified live (status: connected, authenticated, MCP protocol 2025-03-26).
- Brief written; Space build + scheduled checks queued on the repo decision.

## Update — 2026-11-17 11:42 AM CST: repo verified, bridge file committed, Space live

- **Repo:** `estibancreations-svg/ChatGPT--EstibanCreations` (supplied by the user 11:12 AM CST; created by him 9:41 AM CST, PUBLIC, branch `main`). It was already structured, not empty: root README (hub index + public-repo safety rule), `storyworks/` (Operating Blueprint + UPDATES.md decision log), `punch-lab/` (benchmark framework), 5 open issues (#1–#5), and draft PR #6 (workstream organization, awaiting his review — do not merge).
- **Repo decision: settled.** The proposed `/inbox/` queue layout was dropped — the repo already has its own standard (GitHub Issues as the queue + dated `UPDATES.md` entries). The bridge works within that standard.
- **Write access verified:** `BRIDGE.md` committed 11:42 AM CST (commit `88bd7d84`, his approval). It documents the queue, the scheduled-check trigger, the public-repo safety rule, authority, and the handoff format. His existing files were not touched.
- **Space live:** `ChatGPT-EstibanCreations` (slug `chatgpt-estibancreations`), v1, private. Daily silent snapshot refresh ~8–10 AM Chicago. Work queue + private notes built in.
- **Still pending:** work-trigger check frequency (asked: every 2 hours / twice a day / once a day). The Space's daily refresh only updates its snapshot; the work trigger is a separate scheduled check that does the work and reports.
- **Visibility:** the repo is public and the decision is already tracked as Issue #5. Nothing sensitive goes in it.
