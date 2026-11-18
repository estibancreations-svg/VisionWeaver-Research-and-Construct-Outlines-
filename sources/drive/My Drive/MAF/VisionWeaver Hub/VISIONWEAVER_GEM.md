Original name: VISIONWEAVER_GEM.md
Drive ID: 1qD08OfNg4Dzh7LuyLQ3Wf1F36mSoBkBa
Parent folder: My Drive/MAF/VisionWeaver Hub/
Modified: 2026-05-27T02:44:11.226Z

# VisionWeaver System Gem — Full-Stack AI Dashboard Architecture

A reusable, battle-tested blueprint for building AI-native dashboard applications with React + Express + PostgreSQL in a pnpm monorepo. This gem captures every pattern, decision, and implementation detail from the VisionWeaver cinematic operating system so any AI assistant or developer can reproduce, extend, or port it.

---

## What This Gem Covers

- Complete monorepo structure with contract-first API design
- Database schema patterns with Drizzle ORM
- OpenAPI-driven code generation (React Query hooks + Zod schemas)
- Express 5 route patterns with seed-on-first-read data
- Responsive React dashboard with mobile hamburger/Sheet navigation
- Feature toggle system with locked/unlocked states
- Multi-platform publishing configuration UI
- AI book generation pipeline
- Commercial department (ad scripts, avatars, brand assets)
- System health monitoring, audit logs, database explorer
- Help/documentation system with accordion FAQ

---

## Monorepo Structure

```
artifacts-monorepo/
├── artifacts/
│   ├── api-server/          # Express 5 API (port from env)
│   └── visionweaver/        # React + Vite frontend (port from env)
├── lib/
│   ├── api-spec/            # OpenAPI YAML + Orval config
│   ├── api-client-react/    # Generated React Query hooks
│   ├── api-zod/             # Generated Zod validation schemas
│   └── db/                  # Drizzle ORM schemas + connection
├── pnpm-workspace.yaml
└── tsconfig.base.json
```

**Rules:**
- `lib/*` packages are composite (emit declarations via `tsc --build`)
- `artifacts/*` are leaf packages (checked with `tsc --noEmit`, never import each other)
- Shared code goes in `lib/*` or `scripts/`
- All workspace packages use `@workspace/` prefix

---

## Stack & Versions

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 24 |
| Language | TypeScript 5.9 |
| Package Manager | pnpm (workspace catalogs) |
| Frontend | React 19 + Vite + Tailwind CSS v4 + shadcn/ui |
| Animation | Framer Motion |
| Routing | Wouter |
| Backend | Express 5 |
| Database | PostgreSQL + Drizzle ORM |
| Validation | Zod v4, drizzle-zod |
| API Codegen | Orval (from OpenAPI spec) |
| Build | esbuild (CJS bundle for server) |

---

## Critical Environment Setup

```bash
# Required env vars
DATABASE_URL=postgres://user:pass@host:5432/dbname
SESSION_SECRET=<auto-provided by platform>
PORT=<assigned by workflow>
BASE_PATH=<assigned by workflow>
```

**Do NOT hardcode ports.** The server binds to `process.env.PORT`. The frontend uses `import.meta.env.BASE_URL` for routing.

---

## Contract-First API Design

### The Order of Operations

1. **Edit `lib/api-spec/openapi.yaml`** — add endpoints + schemas
2. **Run codegen** — `pnpm --filter @workspace/api-spec run codegen`
3. **Run typecheck** — `pnpm run typecheck` (catches hook signature mismatches)
4. **Write backend routes** — use generated Zod schemas from `@workspace/api-zod`
5. **Write frontend** — use generated React Query hooks from `@workspace/api-client-react`

### Why This Order Matters

The generated hooks define the exact parameter shapes. A common mistake is assuming the mutation body key name. **Always check `lib/api-client-react/src/generated/api.ts`** after codegen to confirm whether the hook expects `data`, `body`, or a flattened object. In this system, mutations typically expect `{ key: string; data: BodyType }`.

---

## Database Schema Patterns

### Adding a New Table

1. Create schema file in `lib/db/src/schema/`
2. Export from `lib/db/src/schema/index.ts`
3. Push: `pnpm --filter @workspace/db run push`
4. Add OpenAPI schema definitions
5. Run codegen
6. Write routes
7. Write frontend

### Example: Feature Toggle Table

```typescript
// lib/db/src/schema/feature-toggles.ts
import { pgTable, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const featureTogglesTable = pgTable("feature_toggles", {
  key: text("key").primaryKey(),
  label: text("label").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  enabled: boolean("enabled").notNull().default(false),
  locked: boolean("locked").notNull().default(false),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
```

### Seed-on-First-Read Pattern

For tables that need default data but shouldn't be migrations:

```typescript
const DEFAULTS = [/* ... */];

async function seedIfEmpty() {
  const existing = await db.select().from(table);
  if (existing.length === 0) {
    await db.insert(table).values(DEFAULTS);
  }
}

router.get("/settings/toggles", async (req, res) => {
  await seedIfEmpty();
  const data = await db.select().from(table);
  res.json(data);
});
```

---

## Backend Route Patterns

### Route File Template

```typescript
import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, someTable } from "@workspace/db";

const router: IRouter = Router();

// GET list
router.get("/resources", async (req, res): Promise<void> => {
  const data = await db.select().from(someTable).orderBy(desc(someTable.createdAt));
  res.json(data);
});

// POST create
router.post("/resources", async (req, res): Promise<void> => {
  // Validate with Zod if needed
  const [created] = await db.insert(someTable).values(req.body).returning();
  res.status(201).json(created);
});

// PUT update
router.put("/resources/:id", async (req, res): Promise<void> => {
  const [updated] = await db.update(someTable).set(req.body).where(eq(someTable.id, req.params.id)).returning();
  res.json(updated);
});

export default router;
```

### Important Rules

- **Never use `console.log` on the server.** Use `req.log` in route handlers.
- Import routes into `artifacts/api-server/src/routes/index.ts`
- Avoid naming route files after Node built-in modules (e.g., `system.ts` conflicts with `import("system")` — use `systemRoutes.ts` instead)

---

## Frontend Patterns

### Generated Hook Usage

```typescript
import {
  useListFeatureToggles,
  useUpdateFeatureToggle,
  useGetSystemStatus,
  useGetDbStats,
  useGetAuditLog,
  useListBooks,
  useCreateBook,
  useListPublishingTargets,
  useUpdatePublishingTarget,
} from "@workspace/api-client-react";
```

**CRITICAL:** Mutation hooks expect `{ key: string; data: BodyType }` — not `{ key, featureToggleUpdate: { ... } }`. Always check the generated signature.

```typescript
// CORRECT
await updateToggle({ key, data: { enabled } });

// WRONG (will typecheck fail)
await updateToggle({ key, featureToggleUpdate: { enabled } });
```

### Responsive Sidebar with Mobile Sheet

```tsx
// Desktop: fixed sidebar (md:flex)
// Mobile: hamburger button opens Sheet slide-in

<aside className="hidden md:flex w-64 ..."> {/* Desktop nav */} </aside>

<div className="md:hidden fixed top-0 ... h-14"> {/* Mobile top bar */}
  <Sheet>
    <SheetTrigger><Menu /></SheetTrigger>
    <SheetContent side="left">{/* Same nav content */}</SheetContent>
  </Sheet>
</div>

// Main content offset for mobile top bar
<main className="... md:pt-0 pt-14">{children}</main>
```

### Navigation Groups

Organize sidebar into labeled groups for scannability:
- **Operations** — Command Center, Productions, Assets, Jobs
- **Creative** — Book Generator, Commercial
- **Distribution** — Publishing
- **System** — IT & Security, Database, API Keys, Credits, Help

### Status Color Mapping

```typescript
const STATUS_COLORS: Record<string, string> = {
  draft:        "text-muted-foreground border-border",
  generating:   "text-accent border-accent/30 bg-accent/10",
  outline_ready:"text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
  writing:      "text-primary border-primary/30 bg-primary/10",
  complete:     "text-green-400 border-green-400/30 bg-green-400/10",
  failed:       "text-red-400 border-red-400/30 bg-red-400/10",
};
```

### Framer Motion Patterns

```tsx
// Staggered list entrance
<motion.div
  initial={{ opacity: 0, x: -10 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: index * 0.07 }}
>

// Expand/collapse FAQ
<motion.div
  initial={{ height: 0, opacity: 0 }}
  animate={{ height: "auto", opacity: 1 }}
  exit={{ height: 0, opacity: 0 }}
>
```

---

## Feature Toggle System

### Design Decisions

- Toggles have a `locked` boolean. Locked toggles cannot be disabled (e.g., Product Placement Testing is core quality assurance).
- Toggles are grouped by `category` (production, pipeline, analytics).
- They seed automatically on first read — no migration needed.
- The dashboard shows active count: `3 / 10 Active`.

### Toggle Categories

| Category | Purpose |
|----------|---------|
| production | Features that modify how productions are built |
| pipeline | Features that run during the 6-stage pipeline |
| analytics | Features that pull data, score, or forecast |

---

## Multi-Platform Publishing System

### Platform Categories

| Category | Platforms |
|----------|-----------|
| books | Amazon KDP, Apple Books, Google Play Books, Alibaba |
| video | YouTube, TikTok |
| social | Instagram Reels, Facebook, X / Twitter |
| ai_store | ChatGPT Store, Claude Artifacts, Notion AI |

### Card States

- **Disabled** — gray border, opacity reduced
- **Enabled + Not Configured** — accent warning, "Needs setup" badge, "Configure" button
- **Enabled + Configured** — green success badge, "Ready to publish"

### Backend Data Model

```typescript
{
  platform: string;        // unique ID (kebab_case)
  label: string;          // human name
  category: string;       // video | books | social | ai_store
  enabled: boolean;
  configured: boolean;
  totalPublished: number;
  lastPublishedAt: string | null;
  credentialsJson: string | null;  // encrypted store
}
```

---

## Book Generator Pipeline

### Flow

1. **Create Project** — Title + Topic + Genre + Format + Target Platforms
2. **Generate Outline** — AI builds structured chapter outline (JSON with chapters array)
3. **Write Chapters** — (next stage) AI writes content chapter-by-chapter
4. **Export** — eBook, paperback, or audiobook format

### Outline JSON Structure

```json
{
  "title": "Topic Name",
  "genre": "non-fiction",
  "chapters": [
    { "number": 1, "title": "Introduction", "summary": "..." },
    { "number": 2, "title": "Foundation Concepts", "summary": "..." }
  ],
  "estimatedWordCount": 45000,
  "targetAudience": "..."
}
```

### UI Pattern

- Left panel: scrollable list of book projects with status badges
- Right panel: detail view with metadata cards, action buttons, and expandable outline viewer

---

## Commercial Department

### Three Tabs

1. **Ad Mockups** — Script generator with 6 formats, tone selector, brand input
2. **Avatars** — 6 personality presets (Executive, Creator, Expert, Narrator, Journalist, Influencer) + custom configuration
3. **Brand Assets** — Brand Book Generator, Campaign Scripter, Tagline Engine

### Ad Script Generator

- Inputs: Brand Name, Product, Audience, Key Message, Format, Tone
- Generates production-ready scripts with scene breakdowns, VO direction, and CTA
- Supports: Pre-Roll (15s), Mid-Roll (30s), Banner Script, Product Demo, Testimonial, Podcast Read

---

## System Monitoring Pages

### IT & Security
- Service health panel with 6 services and status badges (online / degraded / standby / idle)
- API key list with masked values and Active/Inactive badges
- Encryption notice panel
- Full audit log (last 50 events with timestamp, type, production reference)

### Database Explorer
- Live table statistics with row counts
- Visual progress bars relative to largest table
- Schema reference table (table name, primary key, purpose)
- Refresh button with loading state

---

## Help / Documentation System

- 8 accordion sections covering every feature
- Animated expand/collapse with Framer Motion
- Each item: Question + detailed Answer
- Sections: Quick Start, Pipeline, Files, Books, Publishing, Commercial, Toggles, Security

---

## Tailwind v4 Critical Gotchas

### Dark Mode

Tailwind v4 does **NOT** support `@apply dark:` variants. Dark mode must be enabled by adding `class="dark"` to the `<html>` element in `index.html`:

```html
<html lang="en" class="dark">
```

### Card Styling Pattern

```tsx
<Card className="bg-card/50 border-border">
  <CardContent className="p-4">
    {/* content */}
  </CardContent>
</Card>
```

Use `bg-card/50` for semi-transparent card backgrounds over the dark theme. Use `border-border` consistently.

---

## Common Commands

```bash
# Run development
pnpm --filter @workspace/api-server run dev
pnpm --filter @workspace/visionweaver run dev

# Typecheck (run this before committing)
pnpm run typecheck

# After OpenAPI changes
pnpm --filter @workspace/api-spec run codegen

# After DB schema changes
pnpm --filter @workspace/db run push

# Build all
pnpm run build
```

---

## API Endpoint Reference

### Existing Core Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/healthz` | Health check |
| GET | `/api/dashboard/stats` | Dashboard telemetry |
| GET | `/api/dashboard/activity` | Recent activity feed |
| GET | `/api/productions` | List productions |
| POST | `/api/productions` | Create production |
| GET | `/api/productions/:id` | Production detail |
| GET | `/api/files` | List uploaded files |
| POST | `/api/files` | Upload file |
| GET | `/api/jobs` | List pipeline jobs |
| GET | `/api/api-keys` | List API keys |
| POST | `/api/api-keys` | Save API key |
| DELETE | `/api/api-keys/:id` | Delete API key |
| GET | `/api/credits/balance` | Credit balance |
| GET | `/api/credits/events` | Credit history |

### New Endpoints (This Work Thread)

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/settings/toggles` | List feature toggles |
| PUT | `/api/settings/toggles/:key` | Update toggle |
| GET | `/api/system/status` | System health |
| GET | `/api/system/db-stats` | Table row counts |
| GET | `/api/system/audit-log` | Audit trail |
| GET | `/api/books` | List book projects |
| POST | `/api/books` | Create book project |
| GET | `/api/books/:id` | Book detail |
| POST | `/api/books/:id/generate` | Generate outline |
| GET | `/api/publishing/targets` | List platforms |
| PUT | `/api/publishing/targets/:platform` | Update platform |
| POST | `/api/publishing/publish` | Multi-platform publish |

---

## Database Table Reference

| Table | Purpose | Primary Key |
|-------|---------|-------------|
| productions | Core production records | id (serial) |
| jobs | Pipeline execution jobs | id (serial) |
| files | Uploaded assets | id (serial) |
| api_keys | Encrypted credentials | id (serial) |
| credits_balance | Credit ledger (single row) | id (serial) |
| credit_events | Transaction history | id (serial) |
| activity_feed | System events | id (serial) |
| feature_toggles | Feature flags | key (text) |
| book_projects | AI book generation | id (serial) |
| publishing_targets | Platform config | platform (text) |

---

## Mobile / Tablet Responsiveness Checklist

- [ ] Sidebar hidden on mobile (`hidden md:flex`), replaced by Sheet slide-in
- [ ] Top hamburger bar on mobile (`md:hidden fixed top-0 h-14`)
- [ ] Main content offset (`pt-14` on mobile, `md:pt-0` on desktop)
- [ ] Stat cards in 2-column grid on mobile (`grid-cols-2`), 4-column on desktop
- [ ] Platform cards stack vertically on mobile (`grid-cols-1`), 2-3 columns on desktop
- [ ] Tables have `overflow-x-auto` wrappers
- [ ] Font sizes scale down on mobile (`text-2xl md:text-3xl`)
- [ ] Button groups stack on mobile with `flex-col sm:flex-row`
- [ ] All spacing uses responsive modifiers (`p-4 md:p-8`, `gap-3 md:gap-6`)

---

## Extending This System

### Adding a New Page

1. Add route to `artifacts/api-server/src/routes/index.ts`
2. Write route file with seed data if needed
3. Add OpenAPI spec endpoints + schemas
4. Run codegen
5. Create page component in `artifacts/visionweaver/src/pages/`
6. Add route to `App.tsx`
7. Add nav item to `app-layout.tsx`
8. Typecheck and restart workflows

### Adding a New Feature Toggle

1. Add to `DEFAULT_TOGGLES` array in `settings.ts`
2. Toggle auto-seeds on first read
3. Frontend renders automatically via `useListFeatureToggles`

### Adding a New Publishing Platform

1. Add to `DEFAULT_PLATFORMS` in `publishing.ts`
2. Add icon emoji mapping in `PLATFORM_ICONS`
3. Platform auto-seeds on first read

---

## Security Patterns

- **API keys:** Stored encrypted. Masked (first 4 chars + asterisks) in all API responses.
- **No raw secrets in logs:** Pino logger redacts sensitive fields.
- **Toggle locking:** Core features cannot be disabled by users.
- **Audit trail:** Every production creation, job transition, file upload, and credit event is logged.

---

## Performance Notes

- Codegen runs in ~2 seconds
- DB push applies schema changes immediately
- Typecheck across all packages completes in ~10 seconds
- esbuild bundles the server in ~400ms
- React Query caches all GET requests with automatic background refetching

---

## Publishing This Project

When ready, use `suggest_deploy()` to make the app live. The deployment system handles TLS, health checks, and routing automatically.

---

*Generated from the VisionWeaver Mastered After Submission build thread. This gem is designed to be copy-pasted into any AI assistant context as a complete implementation reference.*
