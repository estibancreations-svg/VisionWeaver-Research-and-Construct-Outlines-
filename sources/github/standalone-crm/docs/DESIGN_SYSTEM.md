# Design System — "Sculpted Paper"

Inspired by the reference image: a layered paper-relief face in soft cool grays, a mustard chair,
a walnut herringbone floor and a black-and-white gingham cushion.

## Color tokens (light)

| Token | Hex | Used for |
|---|---|---|
| `--paper` | `#E6E5E9` | App background |
| `--paper-raised` | `#F1F0F3` | Cards, buttons, tiles |
| `--paper-sunk` | `#DCDBE0` | Pressed wells, bars |
| `--paper-edge` | `#CFCDD5` | Dividers |
| `--ink` | `#2F2E35` | Main text |
| `--ink-soft` | `#66646F` | Secondary text |
| `--ink-faint` | `#8F8D98` | Hints |
| `--mustard` | `#C39437` | Primary buttons, active tab, progress |
| `--mustard-deep` | `#9C7426` | Hover/gradient end, icons |
| `--mustard-wash` | `#F2E5C4` | Avatars, soft highlights |
| `--walnut` | `#5D4535` | Eyebrow labels, warm accents |
| `--check-a / --check-b` | `#2C2B30 / #F6F5F7` | Gingham strip |
| Status | ok `#4F6F49` · warn `#9A6A12` · danger `#9E3D32` · info `#44607A` | Badges, alerts |
| Sub-account accents | mustard `#C39437` · walnut `#7A5A45` · slate `#5E6B7C` · sage `#6F8467` · clay `#B06C4F` | Tile edge stripe, avatars |

Dark mode swaps to charcoal paper (`#232227`) with brighter mustard (`#D6A84A`).

## The four looks (v3) and the team look (v3.1)

| Look | Inspired by | Paper / raised | Ink | Accent |
|---|---|---|---|---|
| **Sculpted Paper** (default) | Layered paper face, mustard chair, walnut floor | `#E6E5E9` / `#F1F0F3` | `#2F2E35` | mustard `#C39437` |
| **Professional Greyscale** (`marble`) | White marble floor with graphite veins | `#ECECEA` / `#F7F7F5` | `#222225` | graphite `#3A3A3E` |
| **Stealth** | Black-and-white cat in a knit balaclava, one amber eye | `#141416` / `#1D1D20` | `#ECE8E2` | amber `#C9A650` |
| **Auto** | Sculpted Paper by day, Stealth at night (follows the device) | — | — | — |

Each person picks a look under **Account → Look**, or **Team look** to follow the one the Owner sets
(`agencies.default_theme`, default Sculpted Paper). The choice is saved to the profile and a cookie
so pages render without a flash.

## Depth (the "sculpted" look)

- Raised: `9px 9px 22px rgba(84,80,98,.20), -7px -7px 18px rgba(255,255,255,.92)`
- Small raised: `5px 5px 12px …, -4px -4px 10px …`
- Pressed (inputs, wells): matching **inset** shadows
- Layered card: a second "paper sheet" offset behind the card (`.card.layered`)
- Flowing strands art: `public/strands.svg` (hero cards and page background)

## Type

- Display: **Fraunces Variable** (soft, sculptural serif) — headings, numbers
- Body: **Manrope Variable** — UI text, 16 px minimum on inputs
- Radius: 26 px cards, 18 px lists, 15 px buttons, 999 px badges

## Components

Buttons (primary gold, default paper, ghost, danger, small), inputs/selects/textarea (pressed),
stat tiles, sub-account tiles with accent stripe, list rows, badges by status, pipeline columns +
deal cards, progress bars, alerts, empty states, bottom tab bar (mobile), sidebar (desktop).
Source of truth: `src/app/globals.css`. The Figma file mirrors these tokens.


## Figma file
https://www.figma.com/design/kv3r9nGw6cETcM95M5gaXk — page *Design System* (color + spacing variables, effect and text styles, Button/Badge/Stat Tile/Input/Sub-account Tile/Deal Card/Tab Item components) and page *Mobile Screens* (Sign in, Agency, Overview, Deals board at 390×844). The Figma Starter plan allows one variable mode, so only light mode is in Figma; dark values live in `src/app/globals.css`.
