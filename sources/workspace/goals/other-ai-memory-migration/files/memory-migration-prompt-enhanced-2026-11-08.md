# Works Migration Prompt — Enhanced (v2)

You are helping me migrate my work history from one AI assistant to another. The first snapshot you gave was too light — only Identity. Now go deeper, using all of our past conversations and any works or projects I shared with you. I want the full inventory of my work, not a summary of me.

## How to do this

1. Inventory first: list every distinct project, body of work, system, and ongoing thread I shared with you, before you write a single bullet.
2. Check every source you can reach: past conversations, uploaded files, documents, spreadsheets, repos, connected apps, and anything I pasted or linked.
3. Verify each claim against the conversation or file it came from. If you cannot find the source, mark it (inferred) — never present a guess as a fact.
4. Keep works separate: do not merge two projects because they look similar, and do not drop a small work because it looks minor.
5. Self-check at the end: re-read your output against the inventory. Every work on the inventory must appear in the output, or be listed under "Could not verify" with why.

## OUTPUT RULES

- Output a single Markdown block using the section headers below. Omit any section you have nothing solid for — do not invent placeholders.
- Refer to me in the third person ("the user", "they") inside each bullet.
- One factual sentence per bullet. No transitions, no narrative.
- Mark anything you are uncertain about with "(inferred)" at the end of the bullet.
- Skip one-off statements unless they were clearly important.
- Skip sensitive information (health conditions, financial details, mental health, passwords, account numbers, ID numbers, keys, tax forms) unless I explicitly asked you to remember it. Never output secrets, keys, or ID numbers.
- Hard cap: 4000 words. Quality matters more than completeness.
- If the inventory does not fit the cap, split the output into one Markdown file per work, plus a single index file listing every work with its file name. Never split one work across two files.

## SECTIONS

## Works & projects — complete inventory

List every distinct project / body of work I have shared with you. For each: name, what it is, current state / goal, and any constraints I stated. Also include, where known: the key files or locations, what is done, what is still pending, who else is involved, and what is blocking it.

## Works by source

Group the works above by where they live / came from, if known (for example: GitHub, Google Drive, Docs, uploads, chat-only). Do not guess a location — mark it (inferred) if unsure. If a work lives in more than one place, say so.

## Decisions & holds

Decisions I made, holds / do-not-do instructions, and approvals I gave or withheld, that still affect the work. Include standing rules I set for how the work should be done, and anything I explicitly told you not to do, change, delete, merge, or restart.

## Working style & organization

How I asked you to work with me: separation of works, checklists, depth, review-before-action, anything I asked you to avoid. Include how I want results delivered (format, length, voice notes, verification) if I stated it.

## Could not verify

Works, facts, or decisions you believe exist but could not confirm from the conversations or files. One bullet each, saying what it is and why it could not be confirmed. Do not guess the missing detail.

## Anything else durable about the work

Anything important about the works that does not fit above and is unlikely to change in the next year.
