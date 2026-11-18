# Feed limits — Runway workflow
Set 2026-11-09, by the user. Fresh feed starts in "Set feed limits and restart" (caa4dcd4-0703-4044-8cd0-bcf98a9bf96e).

## Previous feed, measured start to finish
- Feed: "Runway workflow setup steps" (bd146fab-333e-4e08-8a7a-a2ff2d6b3605)
- Span: Thursday Nov 5, 2026, 11:48 AM CST to Monday Nov 9, 2026, 1:05 PM CST — 4 days, about 1 hour
- Turns: 35 total turns (chat transcript, 20 + 15 pages)
- User messages: 23
- Assistant replies: 27 token-usage rows; 56 runtime messages (replies split across bubbles)
- Output tokens: 184,895
- Cumulative input tokens: 27,596,186 — this is re-reading the growing context on every turn, not unique words
- Context peak: 254,015 tokens before compaction
- Compactions: 2 — summarized down to 25,468 tokens after
- Files touched in the VisionWeaver goal folder Nov 5–9: 16 files
- Archive: "Fireside — Runway Archive, Pivot to Upload Testing (2026-11-09).md" committed to Google Drive, VisionWeaver Hub (file id 1k4oww6h0Tfle6Q-WUtHBEIJtu7fRVt4Z), 11,681 characters

Measurement notes, stated plainly:
- The stored message-body table was not usable for a character count (it returned only 2,061 characters for the whole feed, which is clearly incomplete), so no character total is claimed here.
- Token counts come from agent.agent_message_token_usage and agent.agent_compactions for that chat's root session.

## Where drift happened in that feed
1. River line invented — "the river that remembered its name" crossed in from First in Consciousness / Mid-River. No river story exists in Fireside.
2. Voice wrong — Mabel / Homespun Basket presented as the Grand voice. Mabel is a stock adult voice; Homespun Basket is not in the app. Settled route is recorded human narration only.
3. Reference image misdescribed — called a character lock. It is the opening frame.
4. Boards regenerated as all-Caucasian instead of pulling up the originals already created.
5. Claimed the river line was struck everywhere while the sheets still said type the lines and pick Mabel.
6. Clip 2 miss — model-invented grandmother face, wrong voice, unsynced mouth; built on anyway until he stopped it.

His worry is correct and on the record: this is not the first time, and the length of the feed is part of how it happened — context grew to 254k tokens, got compacted twice, and detail was lost in the summaries.

## The limit for the new feed — 3/4 of the previous feed
Warn and stop at whichever comes first:
- 26 total turns (35 × 0.75 = 26.25)
- 17 user messages (23 × 0.75 = 17.25)
- ~190,511 context tokens (254,015 × 0.75)
- 138,671 output tokens (184,895 × 0.75)
- 3 days in (4 days × 0.75)

At the warn point: I warn him in the feed, we stop adding work there, archive that feed, and start a fresh one. Do not push past it to finish one more step.

## How I will check it
- Turn count is the check I can do on every reply — count turns in this chat, warn at 26 total / 17 user messages.
- Context tokens are not shown to me as a live meter in-chat, so I will not invent a live number. The 190,511-token ceiling is the hard stop before any compaction in this feed; if a compaction is approaching, that is itself a warn-and-stop signal.
- This feed starts at turn 1 on Nov 9, 2026. That leaves 25 turns and 16 user messages before the warn point.
