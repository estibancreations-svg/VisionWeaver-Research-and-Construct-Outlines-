Original name: IAM_BUILDOUT_BLUEPRINT.md
Drive ID: 18JpXc-vD8i76CgUFdobmK5uLSvPQQLFO
Parent folder: My Drive/MAF/Other/
Modified: 2026-05-07T16:01:43.699Z

# I AM — Drop-and-Build Blueprint
**Product by ONE TRIBE · Version 3.1 · Confidential**
*A self-contained, AI-aligned, stage-gated build specification. Paste this into any AI coding system and follow the stages in order. Do not skip stages.*

---

---

# PAGE 1 OF 3 — ARCHITECTURE, DATABASE & MEMORY

---

## 1.1 WHAT THIS PRODUCT IS

**I AM** is a holistic, gamified, wraparound life-coaching application. It guides one player through 9 thematic life-assessment sections called Nodes. Each Node contains 25–28 questions delivered one at a time by an AI avatar that reads each prompt aloud. On completion of a Node, an AI coach generates a truth-mirror reflection. When all 9 Nodes are complete, the player captures a photo that becomes their illuminated avatar — the face of who they've already become.

**Company:** ONE TRIBE  
**App name:** I AM  
**User model:** single-player, no login required on mobile/web MVP. Multi-user with auth in Phase 3.  
**Data privacy rule:** no answer data is ever stored server-side except transiently (for AI reflection generation, then discarded). All persistent state lives on-device or in a user-owned cloud sync layer.

---

## 1.2 TECHNOLOGY STACK

### Frontend (web)
| Layer | Choice | Notes |
|---|---|---|
| Framework | React 18 + TypeScript | Strict mode |
| Build tool | Vite 7 | `vite build && vite preview` in dev |
| Styling | Tailwind CSS v4 + custom CSS vars | Dark-first; per-node color tokens |
| Routing | Wouter | Lightweight, no React Router dep |
| State | React Context + useReducer | No Redux; state is co-located with localStorage |
| Voice | Web Speech API (SpeechSynthesis) | On-device; no API key |
| Animations | CSS keyframes + framer-motion optional | Particles are SVG |
| Component lib | Radix UI primitives + shadcn/ui wrappers | Full a11y |
| Data fetching | TanStack React Query | For coach API calls only |

### Backend (API server)
| Layer | Choice | Notes |
|---|---|---|
| Runtime | Node.js 22 (ESM) | |
| Framework | Express 5 | |
| Validation | Zod | Schema-first |
| Logging | pino | JSON structured logs; use `req.log`, never `console.log` |
| AI model | Anthropic claude-sonnet-4-6 | Via proxy; no direct key needed on Replit |
| Spec | OpenAPI 3.1 → Zod + React Query codegen | Single source of truth |

### Phase 3+ (persistence)
| Layer | Choice |
|---|---|
| Database | PostgreSQL (via Drizzle ORM) |
| Auth | Clerk (email + social) |
| File storage | S3-compatible object storage (Replit App Storage or AWS) |
| Realtime | SSE or WebSockets for coach streaming |

---

## 1.3 STORAGE ARCHITECTURE — ALL PHASES

### Phase 1–2: localStorage (current)

**Build key:** `onetribe_v3_1`  
**Prior reserved keys:** `onetribe_v3`, `onetribe_v2` (migration detection only)

```typescript
// Full state schema (TypeScript)
interface AppState {
  buildKey: string;                        // "onetribe_v3_1"
  displayName: string | null;             // player-chosen name
  futureSelfImage: string | null;         // base64 dataURL of camera capture
  nodes: Record<NodeId, NodeState>;
}

interface NodeState {
  answers: Record<string, AnswerValue>;   // questionId → answer
  completedAt: string | null;             // ISO timestamp
  reflection: CoachReflection | null;
  secondNatureDone: boolean;
  secondNatureDoneAt: string | null;
}

type AnswerValue = string | number | string[] | "Yes" | "No" | null;

interface CoachReflection {
  reflection: string;     // 4–5 sentence direct truth-mirror
  pattern: string;        // one sentence
  blindSpot: string;      // one sentence
  unlocked: string;       // one sentence
  generatedAt: string;    // ISO timestamp
}
```

**Key files:**
- `src/lib/storage.ts` — read/write, export JSON, import JSON, reset, version migration
- `src/hooks/use-onetribe.tsx` — Context provider; all state mutations go through here
- `src/lib/voice.ts` — voice preferences stored under `onetribe_v3_1_voice`

### Phase 3: PostgreSQL schema (drop into Drizzle migrations)

```sql
-- users
CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id    TEXT UNIQUE NOT NULL,
  email       TEXT NOT NULL,
  display_name TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- sessions (each app load)
CREATE TABLE sessions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  build_key   TEXT NOT NULL DEFAULT 'onetribe_v3_1',
  started_at  TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- node_answers
CREATE TABLE node_answers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  UUID REFERENCES sessions(id) ON DELETE CASCADE,
  node_id     TEXT NOT NULL,       -- 'seed', 'sanctum', etc.
  question_id TEXT NOT NULL,
  answer_json JSONB NOT NULL,       -- serialized AnswerValue
  answered_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (session_id, node_id, question_id)
);

-- node_reflections
CREATE TABLE node_reflections (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id      UUID REFERENCES sessions(id) ON DELETE CASCADE,
  node_id         TEXT NOT NULL,
  reflection      TEXT NOT NULL,
  pattern         TEXT,
  blind_spot      TEXT,
  unlocked        TEXT,
  model_used      TEXT DEFAULT 'claude-sonnet-4-6',
  generated_at    TIMESTAMPTZ DEFAULT now(),
  UNIQUE (session_id, node_id)
);

-- second_nature
CREATE TABLE second_nature_completions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  UUID REFERENCES sessions(id) ON DELETE CASCADE,
  node_id     TEXT NOT NULL,
  marked_done_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (session_id, node_id)
);

-- future_self_captures
CREATE TABLE future_self_captures (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  UUID REFERENCES sessions(id) ON DELETE CASCADE,
  storage_key TEXT NOT NULL,     -- path in object storage; never inline base64
  captured_at TIMESTAMPTZ DEFAULT now()
);

-- xp_events (audit trail)
CREATE TABLE xp_events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  UUID REFERENCES sessions(id) ON DELETE CASCADE,
  node_id     TEXT NOT NULL,
  xp_earned   INT NOT NULL,
  event_type  TEXT NOT NULL,    -- 'node_complete', 'second_nature'
  occurred_at TIMESTAMPTZ DEFAULT now()
);
```

### Memory model for the AI coach

The coach receives a **scoped memory payload** on each reflection request. No raw answer dump. The schema is:

```typescript
interface CoachPayload {
  nodeId: string;
  nodeName: string;
  nodePurpose: string;
  answers: { question: string; answer: string }[];   // first 12 non-skipped answers
  footprintSignals: string[];                         // cross-node pattern strings
  priorReflections?: { nodeId: string; pattern: string }[];  // Phase 3: prior node patterns
}
```

**Phase 3 addition — rolling memory:** the server fetches the player's prior node `pattern` strings and appends them to `priorReflections`. This gives the coach continuity across the session without exposing raw answer data to the AI.

---

---

# PAGE 2 OF 3 — STAGED BUILDOUT ROADMAP

---

## STAGE 0 — PREREQUISITES (Day 0, ~2 hours)

**Objective:** A blank monorepo with correct tooling, routing proxy, and CI baseline.

**Directives:**
1. Create a `pnpm` workspace monorepo with packages: `artifacts/web`, `artifacts/api-server`, `lib/api-spec`, `lib/api-zod`, `lib/api-client-react`.
2. Configure a reverse proxy: all paths under `/api` → api-server; `/` → web.
3. Set up TypeScript strict mode across all packages with shared `tsconfig.base.json`.
4. Configure Vite with `host: "0.0.0.0"`, `strictPort: true`, reads `PORT` env var.
5. Configure Express with pino logger, CORS, Zod validation middleware, and a `/api/healthz` GET endpoint returning `{ status: "ok", version: "3.1.0" }`.
6. Add OpenAPI spec at `lib/api-spec/openapi.yaml` with at minimum the health endpoint. Run codegen.
7. Add a `pnpm -w run typecheck` root script. It must pass clean before Stage 1 begins.

**Done when:** `curl localhost:80/api/healthz` returns 200 and `pnpm typecheck` is green.

---

## STAGE 1 — DATA & CONTENT LAYER (Days 1–2, ~8 hours)

**Objective:** All 9 Nodes, 244 questions, XP engine, and localStorage persistence — no UI yet.

**Directives:**
1. Define `src/data/nodes.ts` — array of 9 `NodeMeta` objects with fields: `id`, `index`, `name`, `tagline`, `purpose`, `glyph` (emoji), `colorVar` (CSS var token), `xp`, `secondNature` (string).
2. Define `src/data/questions.ts` — one array per Node, total ≥ 244 questions. Each question: `{ id, type, prompt, helper?, options?, min?, max?, minLabel?, maxLabel?, footprint? }`. Types: `text | longtext | yesno | select | multiselect | scale`.
3. Define `src/lib/storage.ts`:
   - `BUILD_VERSION = "3.1.0"`, `CURRENT_BUILD_KEY = "onetribe_v3_1"`.
   - `loadState()`, `saveState()`, `exportJson()`, `importJson()`, `reset()`, `listBuildKeys()`.
   - Export/import must round-trip cleanly (parse → validate → write).
4. Define `src/lib/xp.ts` — pure function `computeXp(state) → XpStatus` where `XpStatus = { totalXp, percent, tier, completedNodes, unlockedNodes, nextNode }`. Tier thresholds: 0 = Pre-Seed, 1–499 = Bachelors of Self, 500–899 = Masters of Self, 900–1000 = PhD of Self. Nodes unlock sequentially (completing node N unlocks node N+1).
5. Define `src/data/footprint.ts` — `computeFootprint(state) → FootprintSignal[]`. At minimum 4 signals: Calm vs. Consequence Gap, Body-Finance Alignment, Memory vs. Execution Delta, Community Depth vs. Digital Dependency. Each signal: `{ title, diagnosis, severity: "green" | "yellow" | "red" }`.
6. Define `src/hooks/use-onetribe.tsx` — Context + provider exposing: `state`, `xp`, `footprint`, `setAnswer`, `completeNode`, `markSecondNature`, `setDisplayName`, `setFutureSelfImage`, `setReflection`, `exportJson`, `importJson`, `reset`.
7. Write unit tests for `computeXp` and `computeFootprint` with at least 4 test cases each.

**Done when:** unit tests pass and `computeXp` correctly returns PhD tier after seeding 900+ XP.

---

## STAGE 2 — CORE UI FLOW (Days 3–5, ~16 hours)

**Objective:** Full player journey in the browser — no AI coach yet. Pixel-perfect dark holographic design.

**Directives:**

### Design tokens (index.css)
- Dark background: `hsl(225 20% 6%)`. All component glass: `hsl(225 15% 12% / 0.7)`, `backdrop-filter: blur(16px)`.
- Per-node CSS color vars: `--seed`, `--sanctum`, `--mirror`, `--forge`, `--ledger`, `--academy`, `--bridge`, `--vault`, `--tribe`.
- `@keyframes ai-pulse { 0%,100% { transform: scale(1) } 50% { transform: scale(1.04) } }`.

### Components to build (in order)
| Component | File | Key behavior |
|---|---|---|
| `XpBar` | `components/xp-bar.tsx` | Horizontal bar, 4 labeled ticks (Pre-Seed, Bachelors, Masters, PhD), animated width transition |
| `AvatarParticles` | `components/avatar-particles.tsx` | SVG, 9 × 18 particles orbiting silhouette, per-node color, intensity driven by completion |
| `PuzzleBoard` | `components/puzzle-board.tsx` | 3 × 3 grid of 9 pieces; completed = node color glow; locked = dim; each tile links to node |
| `AvatarAssistant` | `components/assistant-avatar.tsx` | Small AI face avatar, node-tinted, pulses while speaking, "Read aloud" toggle (SpeechSynthesis), Repeat button |
| `IntakeForm` | `components/intake-form.tsx` | **One question at a time.** Shows `AvatarAssistant`. Avatar auto-reads prompt if voice on. Submit → next question. After last submit → `CompletionScreen`. `CompletionScreen` has "Return to home" + "Continue to reflection" buttons. Back button traverses history. |
| `CoachCard` | `components/coach-card.tsx` | Triggers reflection fetch on mount. Shows loading → pattern / blind spot / reflection / unlocked. Regenerate button. |
| `SecondNatureCard` | `components/second-nature.tsx` | Shows node's `secondNature` string. "Mark done" button (disabled once done). |
| `FootprintTab` | `components/footprint-tab.tsx` | Renders all `FootprintSignal` cards with severity color coding. |
| `CameraReveal` | `components/camera-reveal.tsx` | Modal. getUserMedia → canvas capture → base64 → `setFutureSelfImage`. Shows only when XP ≥ 100%. |
| `BuildFooter` | `components/build-footer.tsx` | `I AM · by ONE TRIBE · Build {VERSION}`. |

### Pages
| Page | Route | Key behavior |
|---|---|---|
| `DashboardPage` | `/` | Header: "I AM" large / "by ONE TRIBE" small. Avatar (particles). Player name input. XP bar + stats. Tabs: Puzzle / Footprint / Manual. "Continue" CTA to next unlocked node. Camera reveal button at 100%. |
| `NodePage` | `/node/:nodeId` | Node header card. IntakeForm (pre-coach). After completion → CoachCard + SecondNatureCard + navigation buttons ("Return to home" / "Move to next section: {name}"). |
| `ManualPage` | `/manual` | Full in-app guide. Data export / import / reset controls. |

### Navigation rules
- Nodes unlock sequentially. Attempting to navigate to a locked node redirects to `/`.
- All routing uses `BASE_URL` prefix (Vite env var) for portability.
- `wouter` handles client-side routing; no server-side SSR required.

**Done when:** A user can answer all 25 Seed questions one at a time, reach the CompletionScreen, navigate to CoachCard (loading state shows), and return to dashboard with XP updated.

---

## STAGE 3 — AI COACH + VOICE (Days 6–7, ~10 hours)

**Objective:** Live Anthropic-backed reflections and fully functional voice avatar.

**Directives:**

### Coach API
1. Add `POST /api/coach/reflect` to OpenAPI spec and run codegen.
2. Request body (Zod schema): `{ nodeId: string, nodeName: string, nodePurpose: string, answers: { question: string, answer: string }[], footprintSignals: string[] }`.
3. Response body: `{ reflection: string, pattern: string, blindSpot: string, unlocked: string }`.
4. Server-side handler in `routes/coach.ts`: build system prompt (see Page 3 §3.3), call Anthropic, parse JSON response, return 400 if parse fails, return 500 with safe message on model error. Never log answer content.
5. `src/lib/coach.ts` on the frontend: `requestCoachReflection(payload) → Promise<CoachReflection>`. Uses the generated React Query hook.

### Coach system prompt rules (enforced by prompt — see Page 3)
- NEVER diagnose. NEVER use: ADHD, depression, anxiety disorder, bipolar, autism, borderline.
- NEVER flatter. No "great work," "I'm proud of you," "you're doing amazing."
- ALWAYS be direct. Name what the answers actually say.
- ALWAYS deliver: one pattern sentence, one blind spot sentence, 4–5 reflection sentences, one unlocked sentence.
- Max 800 tokens output. JSON only.

### Voice layer
1. `src/lib/voice.ts`: `speak(text, opts)`, `cancelSpeech()`, `isVoiceSupported()`, `loadVoicePrefs()`, `saveVoicePrefs()`.
2. Voice prefs persist in `localStorage` under `onetribe_v3_1_voice`.
3. `AvatarAssistant` auto-reads new prompt when `prefs.enabled === true` and `speakKey` changes.
4. "Repeat" button re-reads the current prompt.
5. Avatar SVG mouth path animates open when speaking.
6. Add "Hear your reflection" button to `CoachCard` — speaks the full `reflection` text.

**Done when:** Toggling "Read aloud" on the first question causes the avatar to speak it aloud, and after section completion the coach reflection loads and reads on demand.

---

## STAGE 4 — POLISH & COMPLETION LOOP (Days 8–9, ~8 hours)

**Objective:** End-to-end player journey from Pre-Seed to PhD of Self and camera reveal.

**Directives:**
1. All 9 Nodes wired: content in `questions.ts`, all NodeMeta populated with `secondNature` actions.
2. Footprint signals compute correctly from cross-node answers (uses `footprint` field on questions).
3. Camera reveal:
   - Button appears only when `xp.percent >= 100 && !state.futureSelfImage`.
   - On capture, image stored as base64 in `state.futureSelfImage`.
   - `AvatarParticles` renders the captured photo inside the silhouette clip-path.
4. XP display: total shown as `N / 1000`. PhD tier triggers a glow animation on the avatar ring.
5. Export format: `i_am_v3_1_YYYY-MM-DD.json`. Import validates build key before loading.
6. Reset confirmation dialog before wiping. Dialog text: "Reset everything? This wipes the current build's answers, reflections, and capture."
7. Accessibility: all interactive elements have aria-labels. Avatar assistant has `aria-live="polite"` for speaking state.
8. Mobile: all tap targets ≥ 44px. Intake form scrolls into view on question advance.

**Done when:** A fresh player can complete all 9 Nodes, see XP hit 1000, capture their face, and their avatar displays the photo.

---

## STAGE 5 — DATABASE MIGRATION & AUTH (Phase 3, Weeks 2–4)

**Objective:** Add user accounts, cloud sync, and server-side memory.

**Directives:**
1. Add Clerk auth. Wrap app in `<ClerkProvider>`. Gate node access behind `useUser()`.
2. Run the Phase 3 PostgreSQL schema from Page 1 §1.3 via Drizzle migrations.
3. Add sync layer: on answer submit, call `PATCH /api/session/answer` to persist server-side. localStorage remains the primary read source; server is the durable backup.
4. Add `GET /api/session/restore` — returns full state JSON for logged-in user. On first load, merge server state into localStorage (server wins for completed nodes, client wins for in-progress answers).
5. Add `priorReflections` to coach payload: query the last 8 completed node `pattern` strings for this user and append to the coach payload (see Page 1 §1.3 memory model).
6. Add streaming: `POST /api/coach/reflect/stream` — SSE endpoint that streams the coach response token-by-token. CoachCard shows text as it arrives.
7. Move `futureSelfImage` from base64 localStorage to object storage. On capture, POST to `/api/capture`, server stores in bucket, returns `storage_key`. Show CDN URL in avatar.
8. Add `GET /api/report` — returns aggregated JSON of all reflections, footprint signals, second-nature completions, and XP history. Used by the "My Full Report" button on dashboard.

**Done when:** A logged-in user can log out and back in and find their progress fully restored.

---

---

# PAGE 3 OF 3 — AI ASSISTANT SYSTEM PROMPT & DROP-AND-BUILD INSTRUCTION

---

## 3.1 DROP-AND-BUILD INSTRUCTION

**Copy this entire document into a chat with any capable AI coding assistant (Claude, GPT-4o, Gemini 1.5 Pro, or equivalent). Then say:**

> "You are the senior engineer for I AM by ONE TRIBE. Follow this blueprint exactly. Begin with Stage 0. Do not proceed to the next stage until all acceptance criteria for the current stage are met and `pnpm typecheck` passes clean. Ask me before making any architectural decision not covered by this document. When in doubt, follow the most explicit directive. Start now."

The AI should:
- Create all files listed in order.
- Run `pnpm typecheck` after each stage.
- Never skip ahead.
- Never introduce dependencies not specified.
- Never store raw answer content in server logs.

**If starting in Replit:** Create a pnpm workspace. Use `PORT` env var everywhere. Set `strictPort: true` in Vite. Register each service in `artifact.toml` with correct `localPort` and `paths`.

**If starting in a local environment:** Use Node.js 22 LTS. Postgres via Docker Compose. `.env.local` for `ANTHROPIC_API_KEY` and `DATABASE_URL`. Never commit secrets.

---

## 3.2 AI CODING ASSISTANT — PERSISTENT CONTEXT PROMPT

**This is the context block to paste at the start of every new session with an AI coding assistant working on I AM.**

```
SYSTEM CONTEXT — I AM by ONE TRIBE

You are the senior engineer on I AM, a holistic gamified life-coaching app.
The current production build is v3.1.0.

ARCHITECTURE:
- Monorepo: pnpm workspaces. packages: artifacts/web (React+Vite), artifacts/api-server (Express+pino), lib/api-spec (OpenAPI), lib/api-zod (codegen), lib/api-client-react (codegen).
- Routing: reverse proxy. /api → api-server:8080. / → web:22295. No port calls in app code; use relative URLs.
- State: localStorage key onetribe_v3_1. All reads/writes via src/lib/storage.ts. No raw localStorage calls outside that file.
- AI: Anthropic claude-sonnet-4-6 via POST /api/coach/reflect. Coach is a truth-mirror — no diagnosis, no flattery.
- Voice: Web Speech API (SpeechSynthesis). Prefs in localStorage key onetribe_v3_1_voice. All on-device.
- TypeScript: strict mode. Run pnpm -w run typecheck before any commit.

CONSTRAINTS:
1. Never use console.log in server code. Use req.log (pino) in handlers; logger singleton elsewhere.
2. Never store answer content in server logs or databases (Phase 1-2). In Phase 3, store in node_answers table only.
3. Never add clinical labels (ADHD, depression, bipolar, anxiety disorder, autism, borderline) anywhere in prompts, questions, or UI.
4. Never diagnose. Never flatter. The coach is direct and warm, not affirming.
5. All new questions go in src/data/questions.ts. The intake form picks them up automatically.
6. All new footprint signals go in src/data/footprint.ts computeFootprint().
7. Use import.meta.env.BASE_URL for all SPA-constructed URLs.
8. Do not add React Router. Routing is wouter only.
9. Do not modify artifact.toml or .replit directly. Use the artifact skill/callback.
10. pnpm typecheck must pass before any PR or deployment.

CURRENT BUILD STATE:
- 9 Nodes implemented: Seed (80xp), Inner Sanctum (100), Mirror (120), Forge (100), Ledger (120), Academy (150), Bridge (130), Vault (100), Tribe (100). Total: 1000xp.
- 244 questions implemented.
- One question at a time in intake. AvatarAssistant reads aloud via SpeechSynthesis.
- POST /api/coach/reflect returns {reflection, pattern, blindSpot, unlocked}.
- localStorage onetribe_v3_1 stores full state. Export/import/reset in Manual page.
- Camera reveal unlocks at 100% completion.

NEXT WORK (Stage 5 targets):
- Clerk auth
- Drizzle + PostgreSQL schema (see blueprint Page 1 §1.3)
- Server-side rolling memory in coach payload
- Streaming coach reflection via SSE
- Object storage for future-self captures
- Full report API

When I ask you to build something, implement it fully. Do not leave TODOs or placeholder logic. Typecheck after every file you write.
```

---

## 3.3 COACH AI SYSTEM PROMPT (server-side, verbatim)

**File:** `artifacts/api-server/src/routes/coach.ts` — `SYSTEM_PROMPT` constant.

```
You are the I AM coach — a truth-mirror, not a therapist.

Your only job is to reflect what the player's answers actually say. You do not diagnose. You do not give advice. You do not flatter. You do not add disclaimers. You are not a cheerleader. You are a mirror.

ABSOLUTE RULES — violation of any of these is a system failure:
1. NEVER use any clinical or diagnostic label: ADHD, depression, anxiety disorder, bipolar disorder, borderline personality disorder, autism spectrum, OCD, PTSD, or any DSM/ICD term.
2. NEVER say "great job," "I'm proud of you," "you're doing amazing," "well done," or any equivalent flattery.
3. NEVER say "please consult a professional," "seek help," or any liability disclaimer.
4. NEVER make up information not supported by the answers provided.
5. NEVER exceed 800 tokens.
6. ALWAYS respond in valid JSON with exactly these four keys: reflection, pattern, blindSpot, unlocked.

OUTPUT FORMAT (JSON only, no markdown, no explanation):
{
  "reflection": "4 to 5 sentences. Direct. Warm. Specific to this player's answers. Names what is actually true.",
  "pattern": "One sentence naming the most significant behavioral or psychological pattern in the answers.",
  "blindSpot": "One sentence naming what the player cannot see about themselves from these answers.",
  "unlocked": "One sentence declaring what completing this node has surfaced or made available to the player."
}

TONE: You write like a trusted peer who has read everything and refuses to pretend they didn't. You are not cold. You are not clinical. You are clear. You do not soften truth that needs to land.

SCOPE: You see only the answers for this one node and the cross-node footprint signals provided. You do not speculate beyond the evidence. If an answer is ambiguous, name the ambiguity rather than resolving it in the player's favor.
```

---

## 3.4 FOOTPRINT SIGNAL GENERATION PROMPT (server-side, Phase 3)

When generating cross-node analysis in Phase 3, the server computes these signals by querying cross-node answers and passing them to the AI:

```
You are analyzing a player's cross-node answers to identify behavioral alignment patterns.

Compute exactly 4 signals. For each, provide:
- title: short label (5 words max)
- diagnosis: one sentence explaining the pattern
- severity: "green" (aligned), "yellow" (watch), or "red" (don't look away)

Signals to compute:
1. Calm vs. Consequence Gap — do self-reported calm levels match the accountability rigor the player sets?
2. Body-Finance Alignment — does physical discipline generalize to financial discipline or are they inverse?
3. Memory vs. Execution Delta — does the player start significantly more than they finish?
4. Community Depth vs. Digital Dependency — is screen time substituting for a real person?

Use only the answer data provided. No inference beyond the evidence. Return JSON array only.
```

---

## 3.5 ROADMAP SUMMARY CALENDAR

| Stage | Duration | Deliverable |
|---|---|---|
| Stage 0 | Day 0 (2h) | Blank monorepo, proxy, healthz, typecheck green |
| Stage 1 | Days 1–2 (8h) | All 244 questions, XP engine, localStorage, footprint — no UI |
| Stage 2 | Days 3–5 (16h) | Full UI flow, all components, all pages, one-question intake |
| Stage 3 | Days 6–7 (10h) | Coach API, voice avatar, "hear reflection" feature |
| Stage 4 | Days 8–9 (8h) | All 9 nodes complete, camera reveal, export/import, accessibility |
| Stage 5 | Weeks 2–4 | Clerk auth, PostgreSQL, server memory, streaming, object storage |
| **MVP** | **Day 9** | **Single-player, localStorage, AI coach, voice avatar — launch** |
| **v4.0** | **Week 4** | **Multi-user, cloud sync, streaming coach, full report** |

---

## 3.6 ENVIRONMENT VARIABLES REFERENCE

| Variable | Stage | Source | Description |
|---|---|---|---|
| `PORT` | 0+ | Workflow/system | Service port (web: 22295, api: 8080) |
| `BASE_PATH` | 0+ | Workflow/system | URL prefix for the SPA |
| `NODE_ENV` | 0+ | Workflow/system | `development` or `production` |
| `ANTHROPIC_API_KEY` | 3 (local) | `.env.local` / secret manager | Not needed on Replit (proxy provides) |
| `AI_INTEGRATIONS_ANTHROPIC_BASE_URL` | 3 (Replit) | Replit AI Integrations | Proxy base URL |
| `AI_INTEGRATIONS_ANTHROPIC_API_KEY` | 3 (Replit) | Replit AI Integrations | Proxy key |
| `DATABASE_URL` | 5 | Secret manager | PostgreSQL connection string |
| `CLERK_SECRET_KEY` | 5 | Secret manager | Clerk server-side key |
| `CLERK_PUBLISHABLE_KEY` | 5 | Secret manager | Clerk frontend key |
| `STORAGE_BUCKET` | 5 | Secret manager | Object storage bucket name |
| `STORAGE_ACCESS_KEY` | 5 | Secret manager | Object storage credentials |
| `STORAGE_SECRET_KEY` | 5 | Secret manager | Object storage credentials |
| `REPLIT_DOMAINS` | prod | Replit auto-inject | Comma-separated production domains |

---

*End of Blueprint · I AM by ONE TRIBE · v3.1 · Drop-and-build*
