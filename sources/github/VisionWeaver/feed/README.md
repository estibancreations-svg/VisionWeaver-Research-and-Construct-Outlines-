# VisionWeaver Feed — Conversation & Work Mapping

**Owner:** Steve Henry (Architect) · **Maintained by:** Jason (Muse)

This feed is the system of record for *what was done, what system did it, and when*.

## The standing rule (Steve, Oct 22 2026)

Every working conversation with Jason is uploaded to this feed, and every piece of
work is mapped here: the work, the system that performed it, and when it happened.
The rule applies from here forward, and retroactively to everything since the work
began (Oct 15 2026). A conversation that is not in this feed is not fully on the map.

## What lives here

- `MAPPING.md` — the master map. One entry per work item: date/time (America/Chicago),
  the work, the system that did it, the outcome, and a link to its conversation record.
- `conversations/` — the full verbatim conversation records, one file per conversation,
  named `<start-date>-to-<end-date>-<slug>.md`. Records are evidence: nothing in them
  is summarized, edited, or omitted. Interpretation lives in the mapping, never
  inside a record.

## Systems that appear in the mapping

- **VisionWeaver loop** — the production system: cast → voice → animate → assemble → publish-gate (`~/workspace/visionweaver/loop/`)
- **Runway (Gen-4.5)** — animation rendering, reached through the VisionWeaver loop / custom.runway connector
- **Voice service (designed voices)** — speech rendering (Grand, the Radio, the kids, narration)
- **Image generation** — character sheets, scene keyframes, artwork
- **Crossroads EDL assembler** — timeline assembly + caption burn, called by the loop
- **Zapier MCP** — YouTube uploads, Google Drive, Instagram for Business connections
- **instagram-cli** — direct Instagram publishing for @firesideclippings
- **Dropbox** — the hub: standing transfer route for products in and out
- **GitHub** — this feed and the project repositories
- **Muse (the platform)** — scheduling (crons), hooks, memory, this feed's upkeep
- **Jason (by hand)** — work Jason performed directly rather than through a system.
  Hand work is always labeled as hand work. It is never credited to a system.
- **Steve** — decisions, picks, approvals, and platform steps only he can do.

## Honesty rules for this feed

1. Provenance is stated exactly. If a system failed and a step was finished by hand,
   the map says so.
2. A settled fact is never re-listed as open. Corrections are appended and dated;
   the original entry stays visible so the record shows what changed and when.
3. Times are America/Chicago unless a source says otherwise.

---
*Feed created Oct 22 2026 at Steve's direction. First record: the Fireside /
VisionWeaver production thread, Oct 18–22 2026.*
