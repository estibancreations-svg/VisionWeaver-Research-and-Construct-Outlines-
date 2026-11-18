Original name: GRANTOS_SYSTEM_BLUEPRINT.md
Drive ID: 1bsWoyl0j97eTsWGY4Sj__psSfcoVeAnl
Parent folder: My Drive/Saved from Chrome A/
Modified: 2026-05-23T02:13:04.457Z

# GrantOS — AI-Augmented Brokerage Operating System
## Complete System Blueprint & Relaunch Guide

**Version:** 2.0.0  
**Platform:** Supabase · React · Gemini 2.5 Flash  
**Project ID:** qyyenhwqcmmrovhrkpkh  
**Region:** us-west-1  
**Status:** ACTIVE_HEALTHY  
**Last Updated:** 2026-05-19

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Architecture Diagram](#2-architecture-diagram)
3. [Technology Stack](#3-technology-stack)
4. [Directory Structure](#4-directory-structure)
5. [Database Schema](#5-database-schema)
6. [Authentication & Memory Lock](#6-authentication--memory-lock)
7. [AI Agent System](#7-ai-agent-system)
8. [Edge Functions](#8-edge-functions)
9. [Media & Storage](#9-media--storage)
10. [Frontend Modules (All 10 Pages)](#10-frontend-modules-all-10-pages)
11. [Realtime Subscriptions](#11-realtime-subscriptions)
12. [Environment Variables](#12-environment-variables)
13. [API Reference](#13-api-reference)
14. [How to Use the System](#14-how-to-use-the-system)
15. [Relaunch Guide (Fresh Deploy)](#15-relaunch-guide-fresh-deploy)
16. [Troubleshooting](#16-troubleshooting)

---

## 1. System Overview

GrantOS is an enterprise real estate AI platform that combines a full Supabase backend with a React/TypeScript frontend, Gemini 2.5 Flash AI, and live Supabase Realtime subscriptions to create an intelligent brokerage operating system.

### What GrantOS Does

| Module | Function |
|--------|----------|
| **Dashboard** | Live KPIs — listings, leads, AI activity, revenue pipeline |
| **Listings** | Create, manage, AI-enhance property listings with streaming copy |
| **CRM** | Full lead pipeline, status tracking, campaign management |
| **Media** | Upload photos/videos, queue AI narration, 4 preset styles |
| **AI Agents** | Fleet of 10+ autonomous agents — start/pause/monitor in real time |
| **Analytics** | Revenue pipeline charts, lead funnels, property type breakdown |
| **Investor** | AI acquisition scoring, ROI analysis, portfolio tracking |
| **Compliance** | Audit trail, compliance rule monitoring, risk register |
| **Settings** | User profile, password, notifications, AI config, team management |
| **Login** | Supabase Auth (email/password + registration), session memory lock |

### Core Design Principles

- **Live data everywhere** — every page queries Supabase directly; no stale mock data
- **Realtime** — 6 tables push live updates to all connected clients
- **Memory lock** — users return to their last page with session state restored
- **AI-native** — Gemini 2.5 Flash streaming is embedded in listings, media, and the agent fleet
- **Responsive** — desktop-first, fully functional on mobile with bottom nav

---

## 2. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    GrantOS Frontend (React)                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Dashboard │  │Listings  │  │   CRM    │  │  Media   │   │
│  │  Page    │  │  Page    │  │  Page    │  │  Page    │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       │              │              │              │         │
│  ┌────┴──────────────┴──────────────┴──────────────┴──────┐ │
│  │           useSupabaseData Hooks (Realtime)              │ │
│  │  useListings · useLeads · useAgents · useAgentLogs      │ │
│  │  useMediaAssets · useNarrationJobs · useCampaigns       │ │
│  │  useAcquisitionScores · useComplianceLogs · useProfiles │ │
│  └────────────────────────┬───────────────────────────────┘ │
│                            │                                 │
│  ┌─────────────────────────┴──────────────────────────────┐ │
│  │              AuthContext + useMemoryLock                │ │
│  │  Supabase Auth · Session Persistence · Memory Lock      │ │
│  │  storageKey: aabos-auth-token · user_sessions table     │ │
│  └─────────────────────────┬──────────────────────────────┘ │
└────────────────────────────┼────────────────────────────────┘
                             │ HTTPS + WSS
┌────────────────────────────┴────────────────────────────────┐
│                   Supabase (qyyenhwqcmmrovhrkpkh)           │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │  PostgreSQL  │  │  Realtime   │  │    Edge Functions   │ │
│  │  14 Tables   │  │  6 Tables   │  │  ai-agent (Gemini)  │ │
│  │  RLS on all  │  │  WebSocket  │  │  SSE Streaming      │ │
│  └─────────────┘  └─────────────┘  └──────────┬──────────┘ │
│                                                │             │
│  ┌─────────────┐  ┌─────────────────────────────────────┐  │
│  │   Storage   │  │         Auth (Supabase Auth)        │  │
│  │media-assets │  │  Email/Password · JWT · Profiles    │  │
│  │ Public read │  │  admin@aabos.io · super_admin       │  │
│  │ Auth write  │  └─────────────────────────────────────┘  │
│  └─────────────┘                                           │
└─────────────────────────────────────────────────────────────┘
                             │
                    ┌────────┴────────┐
                    │  Gemini 2.5     │
                    │  Flash API      │
                    │  (via Gateway)  │
                    └─────────────────┘
```

---

## 3. Technology Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.x | UI framework |
| TypeScript | 5.x | Type safety |
| Vite | 5.x | Build tool & dev server |
| Tailwind CSS | 3.x | Utility-first styling |
| shadcn/ui | Latest | Component library |
| React Router | 6.x | Client-side routing |
| Recharts | 2.x | Data visualization |
| Sonner | Latest | Toast notifications |
| lucide-react | Latest | Icon library |
| eventsource-parser | 3.x | SSE streaming parser |

### Backend
| Technology | Purpose |
|-----------|---------|
| Supabase PostgreSQL | Primary database (14 tables) |
| Supabase Auth | JWT authentication, session management |
| Supabase Realtime | WebSocket subscriptions (6 tables) |
| Supabase Storage | Media files (media-assets bucket) |
| Supabase Edge Functions | Deno-based serverless (ai-agent function) |

### AI / External
| Service | Purpose |
|--------|---------|
| Gemini 2.5 Flash | Listing enhancement, narration scripts, agent tasks |
| GrantOS AI Gateway | Proxied Gemini API with INTEGRATIONS_API_KEY |

---

## 4. Directory Structure

```
app-bqm6cdtm07i9/
├── .env                          # VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
├── public/
│   └── manifest.json             # PWA manifest
├── src/
│   ├── App.tsx                   # Root: Router + AuthProvider + MemoryLock
│   ├── routes.tsx                # Route definitions (public + protected)
│   ├── index.css                 # Design tokens: --primary, --secondary, etc.
│   ├── contexts/
│   │   └── AuthContext.tsx       # Supabase Auth, session, signOut, memory API
│   ├── hooks/
│   │   ├── useSupabaseData.ts    # 10 realtime data hooks + row interfaces
│   │   ├── useMemoryLock.ts      # Session memory: last page, login count, prefs
│   │   └── use-supabase-upload.ts# File upload to Storage hook
│   ├── lib/
│   │   ├── supabase.ts           # Supabase client + saveUserMemory/loadUserMemory
│   │   └── aiStream.ts           # streamAIAgent() SSE utility
│   ├── components/
│   │   ├── layouts/
│   │   │   └── AppLayout.tsx     # Sidebar + header + mobile nav + memory lock indicator
│   │   └── ui/                   # shadcn/ui components (DO NOT modify)
│   ├── pages/
│   │   ├── LoginPage.tsx         # Supabase Auth sign-in/register tabs
│   │   ├── DashboardPage.tsx     # Live KPIs, agent feed, charts
│   │   ├── ListingsPage.tsx      # CRUD listings, AI enhance streaming
│   │   ├── CRMPage.tsx           # Lead pipeline kanban, campaigns
│   │   ├── MediaPage.tsx         # Storage upload, AI narration streaming
│   │   ├── AgentsPage.tsx        # Agent fleet control, logs, performance
│   │   ├── AnalyticsPage.tsx     # Charts: revenue, funnel, sources
│   │   ├── InvestorPage.tsx      # Acquisition scores, ROI radar, portfolio
│   │   ├── CompliancePage.tsx    # Rules, audit trail, risk register
│   │   └── SettingsPage.tsx      # Profile, security, notifications, AI config
│   └── types/
│       └── types.ts              # UserRole, shared TypeScript types
├── supabase/
│   └── functions/
│       ├── _shared/
│       │   └── cors.ts           # Shared CORS headers
│       └── ai-agent/
│           └── index.ts          # Gemini 2.5 Flash streaming Edge Function
└── tasks/
    └── GrantOS_SYSTEM_BLUEPRINT.md # This document
```

---

## 5. Database Schema

### Tables (14 total)

#### `profiles` — User accounts
```sql
id            uuid PRIMARY KEY (= auth.users.id)
email         text
username      text UNIQUE
first_name    text
last_name     text
role          text DEFAULT 'agent'
  -- Values: super_admin | admin | agent | investor | viewer
avatar_url    text
mfa_enabled   boolean DEFAULT false
is_active     boolean DEFAULT true
last_login    timestamptz
preferences   jsonb DEFAULT '{}'
created_at    timestamptz DEFAULT now()
```

#### `listings` — Property listings
```sql
id              uuid PRIMARY KEY
title           text NOT NULL
property_type   text NOT NULL
  -- Values: single_family | condo | townhouse | multi_family | commercial | land
status          text DEFAULT 'draft'
  -- Values: draft | active | pending | sold | off_market
price           numeric NOT NULL
bedrooms        integer
bathrooms       numeric
square_feet     integer
address         text NOT NULL
city            text NOT NULL
state           text NOT NULL
zip_code        text
ai_score        integer DEFAULT 0
ai_summary      text
media_processed boolean DEFAULT false
images          text[] DEFAULT '{}'
views_count     integer DEFAULT 0
inquiries_count integer DEFAULT 0
days_on_market  integer DEFAULT 0
created_by      uuid REFERENCES profiles(id)
created_at      timestamptz DEFAULT now()
updated_at      timestamptz DEFAULT now()
```

#### `leads` — CRM contacts
```sql
id              uuid PRIMARY KEY
first_name      text NOT NULL
last_name       text NOT NULL
email           text
phone           text
source          text DEFAULT 'manual'
status          text DEFAULT 'new'
  -- Values: new | contacted | qualified | nurture | closed | lost
score           integer DEFAULT 0        -- 0–100 AI lead score
budget_min      numeric
budget_max      numeric
notes           text
tags            text[] DEFAULT '{}'
next_follow_up  timestamptz
assigned_to     uuid REFERENCES profiles(id)
created_at      timestamptz DEFAULT now()
updated_at      timestamptz DEFAULT now()
```

#### `ai_agents` — Agent fleet registry
```sql
id               uuid PRIMARY KEY
name             text NOT NULL
category         agent_category ENUM
  -- Values: media | investor | development | data | sales
description      text
status           agent_status ENUM
  -- Values: running | idle | error | disabled
current_task     text
enabled          boolean DEFAULT true
last_run         timestamptz
success_rate     numeric DEFAULT 100
tasks_completed  integer DEFAULT 0
avg_response_ms  integer
last_error       text
created_at       timestamptz DEFAULT now()
```

#### `agent_logs` — Agent activity log
```sql
id           uuid PRIMARY KEY
agent_id     uuid REFERENCES ai_agents(id)
agent_name   text NOT NULL
action       text NOT NULL
status       text DEFAULT 'success'   -- success | error
duration_ms  integer
output       text
metadata     jsonb DEFAULT '{}'
created_at   timestamptz DEFAULT now()
```

#### `media_assets` — Uploaded files
```sql
id               uuid PRIMARY KEY
listing_id       uuid REFERENCES listings(id)
type             text NOT NULL          -- image | video | document
filename         text NOT NULL
storage_path     text NOT NULL          -- Supabase Storage path
public_url       text                   -- getPublicUrl() result
thumbnail_url    text
render_status    text DEFAULT 'queued'  -- queued | processing | ready | error
ai_processed     boolean DEFAULT false
ai_caption       text
duration_sec     numeric
file_size_bytes  bigint
created_by       uuid REFERENCES profiles(id)
created_at       timestamptz DEFAULT now()
```

#### `narration_jobs` — AI narration queue
```sql
id          uuid PRIMARY KEY
listing_id  uuid REFERENCES listings(id)
preset      text NOT NULL              -- luxury | commercial | standard | social
language    text DEFAULT 'en'
script      text
audio_url   text
status      text DEFAULT 'pending'     -- pending | processing | completed | error
created_by  uuid REFERENCES profiles(id)
created_at  timestamptz DEFAULT now()
```

#### `acquisition_scores` — Investor AI scoring
```sql
id                      uuid PRIMARY KEY
address                 text NOT NULL
city                    text NOT NULL
state                   text NOT NULL
zip_code                text
price                   numeric NOT NULL
score                   integer NOT NULL      -- 0–100 AI acquisition score
roi_potential           numeric               -- %
rental_yield            numeric               -- %
appreciation_forecast   numeric               -- %
distressed_indicator    boolean DEFAULT false
cap_rate                numeric               -- %
cash_flow_monthly       numeric               -- $
created_at              timestamptz DEFAULT now()
```

#### `compliance_logs` — Audit trail
```sql
id           uuid PRIMARY KEY
user_id      uuid REFERENCES profiles(id)
user_name    text NOT NULL
entity_type  text NOT NULL              -- listing | lead | media | user | system
entity_id    uuid
action       text NOT NULL              -- create | update | delete | view | export
metadata     jsonb DEFAULT '{}'
created_at   timestamptz DEFAULT now()
```

#### `campaigns` — Email/SMS campaigns
```sql
id          uuid PRIMARY KEY
name        text NOT NULL
type        text NOT NULL              -- email | sms | social | drip
status      text DEFAULT 'draft'       -- draft | active | paused | completed
recipients  integer DEFAULT 0
subject     text
open_rate   numeric
click_rate  numeric
created_by  uuid REFERENCES profiles(id)
created_at  timestamptz DEFAULT now()
```

#### `user_sessions` — Memory lock storage
```sql
id           uuid PRIMARY KEY DEFAULT gen_random_uuid()
user_id      uuid REFERENCES profiles(id) NOT NULL
session_key  text NOT NULL
data         jsonb NOT NULL DEFAULT '{}'
updated_at   timestamptz DEFAULT now()
UNIQUE(user_id, session_key)
```

### RLS Policies

All tables have Row Level Security enabled. Key policy patterns:

```sql
-- Authenticated users read their own data
CREATE POLICY "select_own" ON leads
  FOR SELECT TO authenticated USING (assigned_to = auth.uid());

-- Admins read everything
CREATE POLICY "admin_all" ON leads
  FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','super_admin')
  ));

-- user_sessions: users only access their own memory
CREATE POLICY "users_own_sessions_select" ON user_sessions
  FOR SELECT TO authenticated USING (user_id = auth.uid());
```

---

## 6. Authentication & Memory Lock

### Supabase Auth Flow

```
1. User submits email + password on LoginPage
2. supabase.auth.signInWithPassword() called
3. JWT token returned, stored in localStorage as 'aabos-auth-token'
4. onAuthStateChange fires → fetchProfile(userId) queries profiles table
5. AppUser object built and stored in AuthContext state
6. useMemoryLock hook fires → loads session_memory from user_sessions
7. User redirected to last visited page (memory lock restore)
8. Every route change → saves current path to user_sessions
```

### Session Persistence

- **Storage:** `localStorage` key `aabos-auth-token` (Supabase default)
- **Auto-refresh:** Token auto-refreshes before expiry
- **Restore:** `supabase.auth.getSession()` on app mount restores session without re-login
- **Duration:** Default Supabase JWT expiry (1 hour, auto-refreshed)

### Memory Lock

The `useMemoryLock` hook provides persistent session state:

```typescript
// What gets saved to user_sessions table on every navigation:
interface SessionMemory {
  lastPage:    string;          // e.g. '/listings'
  lastTab?:    string;          // active tab within page
  filters?:    Record<string, string>;  // search/filter state
  uiPrefs?:    Record<string, unknown>; // UI preferences
  loginCount:  number;          // total login count for this user
  lockedAt:    string;          // ISO timestamp of last save
}
```

**On Login:**
1. `useMemoryLock` loads `session_memory` from `user_sessions` table
2. Increments `loginCount`
3. Navigates user to `lastPage` (skips `/login`, `/register`, `/`)
4. Header shows `🔒` lock icon + tooltip with login count + lock time

**On Navigation:**
- Every path change saves current path to Supabase in background
- Debounced to avoid excessive writes

**Admin Credentials:**
```
Email:    admin@aabos.io
Password: (set during initial setup)
Role:     super_admin
```

---

## 7. AI Agent System

### Agent Fleet (10 Agents)

| Agent Name | Category | Function |
|-----------|----------|----------|
| Listing Enhancer | media | Rewrites listing copy with AI |
| Lead Scorer | sales | Scores leads 0–100 based on signals |
| Media Processor | media | Processes uploaded images/videos |
| Narration Writer | media | Generates property narration scripts |
| Market Analyst | data | Analyzes comparable sales data |
| Acquisition Scorer | investor | Scores properties for investment |
| Campaign Optimizer | sales | A/B tests campaign messaging |
| Compliance Monitor | data | Watches for compliance violations |
| MLS Syncer | development | Syncs listing data with MLS feeds |
| Deal Pipeline AI | sales | Predicts deal close probability |

### Agent Status Lifecycle

```
disabled → idle → running → idle
                     ↓
                   error → idle (restart)
```

### Agent Performance Tracking

Every agent action is logged to `agent_logs`:
```sql
INSERT INTO agent_logs (agent_id, agent_name, action, status, duration_ms, output)
VALUES ($1, $2, $3, 'success', $4, $5);
```

---

## 8. Edge Functions

### `ai-agent` Function

**URL:** `https://qyyenhwqcmmrovhrkpkh.supabase.co/functions/v1/ai-agent`  
**Method:** POST  
**Auth:** Supabase anon key in Authorization header (auto-handled by `supabase.functions.invoke`)

#### Request Format

**Option A — Direct Gemini contents array:**
```json
{
  "contents": [
    {
      "role": "user",
      "parts": [{ "text": "Your prompt here" }]
    }
  ]
}
```

**Option B — Task shortcut (listing enhancement):**
```json
{
  "task": "enhance_listing",
  "listing": {
    "title": "3BR Home in Austin",
    "address": "123 Main St",
    "price": 650000,
    "bedrooms": 3,
    "bathrooms": 2,
    "square_feet": 2100,
    "property_type": "single_family"
  }
}
```

**Option C — Narration script:**
```json
{
  "task": "narration_script",
  "listing": { ... },
  "preset": "luxury"
}
```

**Preset Options:** `luxury` | `commercial` | `standard` | `social`

#### Response Format (Streaming SSE)

```
Content-Type: text/event-stream

data: {"text":"Nestled in the heart of"}
data: {"text":" Austin's most sought-after..."}
data: [DONE]
```

#### Frontend Usage

```typescript
import { streamAIAgent } from '@/lib/aiStream';

// Streaming with onChunk callback
await streamAIAgent({
  task: 'enhance_listing',
  listing: listingData,
}, (chunk) => {
  setOutput(prev => prev + chunk);
});
```

#### Internal: Supabase Client in Edge Function
```typescript
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);
// Logs each completed task to agent_logs table
```

---

## 9. Media & Storage

### Storage Bucket: `media-assets`

| Setting | Value |
|---------|-------|
| Access | Public read, authenticated write/delete |
| Max file size | 50 MB |
| Allowed MIME types | image/jpeg, image/png, image/webp, image/gif, video/mp4, video/quicktime, video/webm, application/pdf, and more |

### Upload Flow

```
1. User selects file in MediaPage
2. Frontend validates: type + size ≤ 50MB
3. supabase.storage.from('media-assets').upload(path, file)
4. getPublicUrl() → store URL in media_assets table
5. Realtime subscription fires → MediaPage updates instantly
6. User queues AI narration (optional)
7. ai-agent Edge Function generates narration_script
8. Script stored in narration_jobs table
```

### File Naming Convention
```
uploads/{uuid}-{timestamp}.{ext}
Example: uploads/a3f4b891-1716163200000.jpg
```

### Narration Presets

| Preset | Style | Use Case |
|--------|-------|---------|
| `luxury` | Elegant, aspirational, premium vocabulary | High-end residential |
| `commercial` | Professional, ROI-focused, business terms | Commercial/investment |
| `standard` | Clear, informative, balanced tone | General residential |
| `social` | Short, punchy, hashtag-ready | Instagram/TikTok listings |

---

## 10. Frontend Modules (All 10 Pages)

### DashboardPage `/dashboard`
- **Data:** `useListings`, `useLeads`, `useAgents`, `useAgentLogs`
- **Features:** KPI cards (total listings, revenue, leads, agent tasks), recent activity feed, status breakdown charts
- **Realtime:** Agent logs stream in live

### ListingsPage `/listings`
- **Data:** `useListings` with Realtime
- **Features:** Search + filter + sort, create listing form, AI enhance button (streaming), status badges, AI score display, inquiry/view counts
- **AI:** `streamAIAgent({ task: 'enhance_listing', listing })` → streaming copy to textarea

### CRMPage `/crm`
- **Data:** `useLeads`, `useCampaigns`
- **Features:** All Leads table with inline status update, Pipeline Kanban view, Campaign cards with activate button
- **Create:** New lead form → direct Supabase insert

### MediaPage `/media`
- **Data:** `useMediaAssets`, `useNarrationJobs`
- **Features:** Drag-and-drop upload, real-time render queue, narration preset selector, streaming script generation, job history table
- **AI:** Narration via `streamAIAgent({ task: 'narration_script', preset })`

### AgentsPage `/agents`
- **Data:** `useAgents`, `useAgentLogs`
- **Features:** Agent cards with status, start/pause/restart controls, performance metrics, activity log table, performance radar tab
- **Live:** Agent status updates via Supabase Realtime

### AnalyticsPage `/analytics`
- **Data:** `useListings`, `useLeads`, `useAgents`
- **Features:** Revenue pipeline area chart, property type pie chart, lead conversion funnel, lead source bar chart, AI performance summary
- **Charts:** Recharts (AreaChart, PieChart, BarChart)

### InvestorPage `/investor`
- **Data:** `useAcquisitionScores`, `useListings`
- **Features:** AI opportunity cards with score/ROI/yield/cap rate, portfolio table, ROI bar chart, top opportunity radar chart
- **Filter:** Score threshold filter (all / ≥60 / ≥70 / ≥80 / ≥90)

### CompliancePage `/compliance`
- **Data:** `useComplianceLogs`
- **Features:** Compliance rules grid (6 federal/state/MLS rules), audit trail table with search/filter, risk register with high/medium items
- **Risk levels:** Low (green) / Medium (amber) / High (red)

### SettingsPage `/settings`
- **Data:** `useProfiles`, `useAuth`
- **Features:** Profile edit form, password change, notification toggles, AI config (auto-enhance, style), system status panel, team member list
- **Tabs:** Profile | Security | Notifications | AI Config | System | Team

### LoginPage `/login`
- **Features:** Sign In tab + Register tab, show/hide password toggle, error display, loading state, redirect to dashboard on success
- **Auth:** `supabase.auth.signInWithPassword()` + `supabase.auth.signUp()`

---

## 11. Realtime Subscriptions

The following tables have Supabase Realtime enabled:

| Table | Hook | Events |
|-------|------|--------|
| `listings` | `useListings` | INSERT, UPDATE, DELETE |
| `leads` | `useLeads` | INSERT, UPDATE, DELETE |
| `ai_agents` | `useAgents` | UPDATE (status changes) |
| `agent_logs` | `useAgentLogs` | INSERT |
| `media_assets` | `useMediaAssets` | INSERT, UPDATE |
| `narration_jobs` | `useNarrationJobs` | UPDATE (status changes) |

### Subscription Pattern (all hooks use same pattern)
```typescript
const channel = supabase
  .channel('table-changes')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'listings',
  }, () => refetch())
  .subscribe();

return () => supabase.removeChannel(channel);
```

---

## 12. Environment Variables

### Required (`.env` file)
```bash
VITE_SUPABASE_URL=https://qyyenhwqcmmrovhrkpkh.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

### Supabase Edge Function Secrets
```bash
INTEGRATIONS_API_KEY=<platform-managed-gemini-gateway-key>
SUPABASE_URL=<auto-injected>
SUPABASE_SERVICE_ROLE_KEY=<auto-injected>
SUPABASE_ANON_KEY=<auto-injected>
```

> **CRITICAL:** `INTEGRATIONS_API_KEY` is platform-managed and auto-injected into Edge Functions. Never expose it in client-side code. Never pass it to `register_secrets` manually.

---

## 13. API Reference

### Supabase Direct API

All data hooks use the Supabase JS client. Base URL:
```
https://qyyenhwqcmmrovhrkpkh.supabase.co
```

**Authentication header (auto-added by client):**
```
Authorization: Bearer <jwt-token>
apikey: <anon-key>
```

### Common Query Patterns

```typescript
// Listings with filter
const { data } = await supabase
  .from('listings')
  .select('*')
  .eq('status', 'active')
  .order('created_at', { ascending: false })
  .limit(50);

// Upsert memory
await supabase.from('user_sessions').upsert(
  { user_id, session_key: 'session_memory', data: memory },
  { onConflict: 'user_id,session_key' }
);

// Storage upload
const { data } = await supabase.storage
  .from('media-assets')
  .upload(`uploads/${uuid}.jpg`, file, { contentType: file.type });

const { data: urlData } = supabase.storage
  .from('media-assets')
  .getPublicUrl(data.path);
```

### Edge Function API

```typescript
// Invoke AI agent with streaming
const { data, error } = await supabase.functions.invoke('ai-agent', {
  body: { task: 'enhance_listing', listing: listingObject }
});

// Read streaming SSE response
const reader = data.getReader();
const decoder = new TextDecoder();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  const chunk = decoder.decode(value);
  // Parse SSE: data: {"text":"..."}
}
```

---

## 14. How to Use the System

### First-Time Login
1. Navigate to the app URL
2. Click **Sign In** tab
3. Enter: `admin@aabos.io` + your password
4. Dashboard loads with live data
5. Memory lock activates — your session is now tracked

### Managing Listings
1. Go to **Listings** → Click **+ New Listing**
2. Fill in property details → Submit
3. Click **✨ Enhance** on any listing → AI streams improved copy in real time
4. Change status via the dropdown (Draft → Active → Pending → Sold)
5. All changes are instant — Realtime pushes updates to all tabs

### Working with CRM Leads
1. Go to **CRM** → **+ Add Lead**
2. Fill name, email, source, budget → Submit
3. Use Pipeline tab to see Kanban by status
4. Drag leads through stages (or use inline status dropdown)
5. Campaigns tab shows email/SMS campaigns with open/click rates

### Using the Media Center
1. Go to **Media** → Drag files or click **Upload Media**
2. Files upload to Supabase Storage → appear in render queue instantly
3. Select a listing and narration preset (Luxury / Commercial / Standard / Social)
4. Click **Generate Narration** → AI streams script in real time
5. Script saved to narration_jobs table when complete

### Managing AI Agents
1. Go to **Agents** → see all agents with live status
2. Click **Pause** to stop a running agent
3. Click **Start** to activate an idle agent
4. Error agents show a **Restart** button
5. Activity Logs tab shows every agent action with duration + output
6. Performance tab shows success rate progress bars

### Reviewing Analytics
1. Go to **Analytics** → revenue pipeline automatically calculated from live listings
2. Use time range selector (1M / 3M / 6M / 1Y)
3. Lead funnel shows conversion rates at each stage
4. Property type pie chart shows portfolio mix
5. AI performance panel shows total tasks and success rates

### Investor Intelligence
1. Go to **Investor** → AI Opportunities tab
2. Filter by minimum score (60 / 70 / 80 / 90)
3. Each card shows ROI %, rental yield, cap rate, AI score (0–100)
4. Click **Run Full Analysis** to queue detailed acquisition report
5. Portfolio tab shows all active/pending listings with AI scores
6. ROI Analysis tab shows comparison charts and radar for top opportunity

### System Health Check
1. Go to **Settings** → **System** tab
2. All 6 system components shown with status
3. Click **Run Diagnostics** to re-check all connections
4. Green checkmarks = healthy; refresh the page if any show error

### Memory Lock in Action
- Look for the **🔒 lock icon** in the top header
- Green = session memory restored successfully
- Hover to see: `Session locked · Login #N · HH:MM`
- On every page navigation, your position is saved
- Close the browser, reopen → you return to exactly where you were

---

## 15. Relaunch Guide (Fresh Deploy)

Follow these steps to deploy a complete GrantOS instance from scratch:

### Step 1: Clone & Install
```bash
git clone <repo-url> aabos
cd aabos
pnpm install
```

### Step 2: Create Supabase Project
1. Go to [supabase.com](https://supabase.com) → New Project
2. Choose region (us-west-1 recommended)
3. Save: **Project URL**, **Anon Key**, **Service Role Key**

### Step 3: Configure Environment
```bash
# Create .env file
echo "VITE_SUPABASE_URL=https://<project-id>.supabase.co" > .env
echo "VITE_SUPABASE_ANON_KEY=<your-anon-key>" >> .env
```

### Step 4: Apply Database Schema

Run the following SQL in Supabase Dashboard → SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUM types
CREATE TYPE agent_status   AS ENUM ('running','idle','error','disabled');
CREATE TYPE agent_category AS ENUM ('media','investor','development','data','sales');

-- profiles table
CREATE TABLE public.profiles (
  id            uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         text,
  username      text UNIQUE,
  first_name    text,
  last_name     text,
  role          text NOT NULL DEFAULT 'agent',
  avatar_url    text,
  mfa_enabled   boolean DEFAULT false,
  is_active     boolean DEFAULT true,
  last_login    timestamptz,
  preferences   jsonb DEFAULT '{}',
  created_at    timestamptz DEFAULT now()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'agent')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- listings table
CREATE TABLE public.listings (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title           text NOT NULL,
  property_type   text NOT NULL DEFAULT 'single_family',
  status          text NOT NULL DEFAULT 'draft',
  price           numeric NOT NULL,
  bedrooms        integer,
  bathrooms       numeric,
  square_feet     integer,
  address         text NOT NULL,
  city            text NOT NULL,
  state           text NOT NULL DEFAULT 'TX',
  zip_code        text,
  ai_score        integer DEFAULT 0,
  ai_summary      text,
  media_processed boolean DEFAULT false,
  images          text[] DEFAULT '{}',
  views_count     integer DEFAULT 0,
  inquiries_count integer DEFAULT 0,
  days_on_market  integer DEFAULT 0,
  created_by      uuid REFERENCES profiles(id),
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

-- leads table
CREATE TABLE public.leads (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name     text NOT NULL,
  last_name      text NOT NULL,
  email          text,
  phone          text,
  source         text DEFAULT 'manual',
  status         text DEFAULT 'new',
  score          integer DEFAULT 0,
  budget_min     numeric,
  budget_max     numeric,
  notes          text,
  tags           text[] DEFAULT '{}',
  next_follow_up timestamptz,
  assigned_to    uuid REFERENCES profiles(id),
  created_at     timestamptz DEFAULT now(),
  updated_at     timestamptz DEFAULT now()
);

-- ai_agents table
CREATE TABLE public.ai_agents (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name             text NOT NULL,
  category         agent_category NOT NULL,
  description      text,
  status           agent_status DEFAULT 'idle',
  current_task     text,
  enabled          boolean DEFAULT true,
  last_run         timestamptz,
  success_rate     numeric DEFAULT 100,
  tasks_completed  integer DEFAULT 0,
  avg_response_ms  integer,
  last_error       text,
  created_at       timestamptz DEFAULT now()
);

-- agent_logs table
CREATE TABLE public.agent_logs (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id     uuid REFERENCES ai_agents(id),
  agent_name   text NOT NULL,
  action       text NOT NULL,
  status       text DEFAULT 'success',
  duration_ms  integer,
  output       text,
  metadata     jsonb DEFAULT '{}',
  created_at   timestamptz DEFAULT now()
);

-- media_assets table
CREATE TABLE public.media_assets (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id       uuid REFERENCES listings(id),
  type             text NOT NULL,
  filename         text NOT NULL,
  storage_path     text NOT NULL,
  public_url       text,
  thumbnail_url    text,
  render_status    text DEFAULT 'queued',
  ai_processed     boolean DEFAULT false,
  ai_caption       text,
  duration_sec     numeric,
  file_size_bytes  bigint,
  created_by       uuid REFERENCES profiles(id),
  created_at       timestamptz DEFAULT now()
);

-- narration_jobs table
CREATE TABLE public.narration_jobs (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id  uuid REFERENCES listings(id),
  preset      text NOT NULL DEFAULT 'standard',
  language    text DEFAULT 'en',
  script      text,
  audio_url   text,
  status      text DEFAULT 'pending',
  created_by  uuid REFERENCES profiles(id),
  created_at  timestamptz DEFAULT now()
);

-- acquisition_scores table
CREATE TABLE public.acquisition_scores (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  address               text NOT NULL,
  city                  text NOT NULL,
  state                 text NOT NULL DEFAULT 'TX',
  zip_code              text,
  price                 numeric NOT NULL,
  score                 integer NOT NULL,
  roi_potential         numeric,
  rental_yield          numeric,
  appreciation_forecast numeric,
  distressed_indicator  boolean DEFAULT false,
  cap_rate              numeric,
  cash_flow_monthly     numeric,
  created_at            timestamptz DEFAULT now()
);

-- compliance_logs table
CREATE TABLE public.compliance_logs (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid REFERENCES profiles(id),
  user_name    text NOT NULL,
  entity_type  text NOT NULL,
  entity_id    uuid,
  action       text NOT NULL,
  metadata     jsonb DEFAULT '{}',
  created_at   timestamptz DEFAULT now()
);

-- campaigns table
CREATE TABLE public.campaigns (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  type        text NOT NULL DEFAULT 'email',
  status      text DEFAULT 'draft',
  recipients  integer DEFAULT 0,
  subject     text,
  open_rate   numeric,
  click_rate  numeric,
  created_by  uuid REFERENCES profiles(id),
  created_at  timestamptz DEFAULT now()
);

-- user_sessions table (memory lock)
CREATE TABLE public.user_sessions (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid REFERENCES profiles(id) NOT NULL,
  session_key  text NOT NULL,
  data         jsonb NOT NULL DEFAULT '{}',
  updated_at   timestamptz DEFAULT now(),
  UNIQUE(user_id, session_key)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_agents       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_logs      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.narration_jobs  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.acquisition_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions   ENABLE ROW LEVEL SECURITY;

-- Public read policies (listings, agents, scores — non-sensitive)
CREATE POLICY "public_read_listings"   ON listings          FOR SELECT USING (true);
CREATE POLICY "public_read_agents"     ON ai_agents         FOR SELECT USING (true);
CREATE POLICY "public_read_logs"       ON agent_logs        FOR SELECT USING (true);
CREATE POLICY "public_read_media"      ON media_assets      FOR SELECT USING (true);
CREATE POLICY "public_read_narration"  ON narration_jobs    FOR SELECT USING (true);
CREATE POLICY "public_read_scores"     ON acquisition_scores FOR SELECT USING (true);
CREATE POLICY "public_read_compliance" ON compliance_logs   FOR SELECT USING (true);
CREATE POLICY "public_read_campaigns"  ON campaigns         FOR SELECT USING (true);
CREATE POLICY "public_read_leads"      ON leads             FOR SELECT USING (true);
CREATE POLICY "public_read_profiles"   ON profiles          FOR SELECT USING (true);

-- Authenticated write policies
CREATE POLICY "auth_write_listings" ON listings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "auth_update_listings" ON listings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "auth_write_leads"    ON leads    FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "auth_update_leads"   ON leads    FOR UPDATE TO authenticated USING (true);
CREATE POLICY "auth_write_media"    ON media_assets FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "auth_write_narration" ON narration_jobs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "auth_update_narration" ON narration_jobs FOR UPDATE TO authenticated USING (true);
CREATE POLICY "auth_write_campaigns" ON campaigns FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "auth_update_campaigns" ON campaigns FOR UPDATE TO authenticated USING (true);
CREATE POLICY "auth_update_agents"   ON ai_agents FOR UPDATE TO authenticated USING (true);
CREATE POLICY "auth_update_profiles" ON profiles FOR UPDATE TO authenticated USING (id = auth.uid());

-- user_sessions: strict own-data policies
CREATE POLICY "own_sessions_select" ON user_sessions FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "own_sessions_insert" ON user_sessions FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "own_sessions_update" ON user_sessions FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "own_sessions_delete" ON user_sessions FOR DELETE TO authenticated USING (user_id = auth.uid());

-- Enable Realtime on key tables
ALTER PUBLICATION supabase_realtime ADD TABLE listings;
ALTER PUBLICATION supabase_realtime ADD TABLE leads;
ALTER PUBLICATION supabase_realtime ADD TABLE ai_agents;
ALTER PUBLICATION supabase_realtime ADD TABLE agent_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE media_assets;
ALTER PUBLICATION supabase_realtime ADD TABLE narration_jobs;
```

### Step 5: Create Storage Bucket
```bash
# In Supabase Dashboard → Storage → New Bucket
Name: media-assets
Public: YES (enable public access)
File size limit: 52428800  (50MB)
Allowed MIME types: image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime,video/webm,application/pdf
```

Or via SQL:
```sql
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('media-assets', 'media-assets', true, 52428800);

CREATE POLICY "public_read_media_bucket" ON storage.objects
  FOR SELECT USING (bucket_id = 'media-assets');

CREATE POLICY "auth_upload_media_bucket" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media-assets');

CREATE POLICY "auth_delete_media_bucket" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'media-assets');
```

### Step 6: Deploy Edge Function
```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to project
supabase link --project-ref <project-id>

# Deploy ai-agent function
supabase functions deploy ai-agent
```

### Step 7: Create Admin Account
```sql
-- After registering admin@aabos.io through the app UI:
-- 1. Confirm email manually:
UPDATE auth.users
SET email_confirmed_at = now()
WHERE email = 'admin@aabos.io';

-- 2. Promote to super_admin:
UPDATE public.profiles
SET role = 'super_admin'
WHERE email = 'admin@aabos.io';
```

### Step 8: Disable Email Verification (Development)
In Supabase Dashboard → Authentication → Settings:
- Toggle OFF: "Enable email confirmations"

### Step 9: Seed Initial Data
```sql
-- Insert AI Agents
INSERT INTO public.ai_agents (name, category, status, success_rate, tasks_completed, avg_response_ms) VALUES
  ('Listing Enhancer',   'media',       'running', 96.2, 1847, 420),
  ('Lead Scorer',        'sales',       'running', 99.1, 5231, 310),
  ('Media Processor',    'media',       'idle',    94.5, 892,  850),
  ('Narration Writer',   'media',       'idle',    97.8, 334,  720),
  ('Market Analyst',     'data',        'running', 91.3, 2104, 580),
  ('Acquisition Scorer', 'investor',    'idle',    98.7, 723,  370),
  ('Campaign Optimizer', 'sales',       'idle',    93.4, 418,  440),
  ('Compliance Monitor', 'data',        'running', 99.9, 8847, 280),
  ('MLS Syncer',         'development', 'idle',    97.2, 3291, 520),
  ('Deal Pipeline AI',   'sales',       'running', 95.6, 1129, 490);

-- (Add listings, leads, acquisition_scores, campaigns as needed)
```

### Step 10: Start Development Server
```bash
pnpm dev
# App runs at http://localhost:5173
```

### Step 11: Build for Production
```bash
pnpm build
# Output in dist/
# Deploy to Vercel, Netlify, or any static host
```

---

## 16. Troubleshooting

### "Missing VITE_SUPABASE_URL" error
- Check `.env` file exists in project root
- Restart dev server after editing `.env`
- Ensure variables start with `VITE_`

### Login fails / "Invalid login credentials"
- Confirm email in Supabase: `UPDATE auth.users SET email_confirmed_at = now() WHERE email = 'your@email.com';`
- Check email verification is disabled in Supabase Auth settings
- Verify password is at least 6 characters

### Realtime not updating
- Check table is added to `supabase_realtime` publication
- Verify RLS policies allow SELECT for the authenticated user
- Check browser console for WebSocket connection errors

### Edge Function returns 500
- Check `INTEGRATIONS_API_KEY` is set in Supabase Dashboard → Settings → Edge Functions → Secrets
- View function logs: Supabase Dashboard → Edge Functions → Logs
- Ensure Deno imports resolve (no version conflicts)

### Storage upload fails
- Verify `media-assets` bucket exists and is set to public
- Check authenticated user has INSERT policy on `storage.objects`
- Confirm file size is under 50MB

### Memory lock not restoring page
- Check `user_sessions` table has RLS enabled with own-user policies
- Verify user is authenticated before `useMemoryLock` fires
- Check browser console for insert/select errors on `user_sessions`

### Charts show no data
- Charts compute from live Supabase queries — ensure listings/leads tables have seeded data
- Run: `SELECT COUNT(*) FROM listings; SELECT COUNT(*) FROM leads;`

---

## Quick Reference Card

```
┌──────────────────────────────────────────────────────────────┐
│                    GrantOS Quick Reference                     │
├──────────────────────────────────────────────────────────────┤
│  Login:       admin@aabos.io                                 │
│  Supabase:    qyyenhwqcmmrovhrkpkh (us-west-1)               │
│  AI Model:    Gemini 2.5 Flash (streaming SSE)               │
│  Storage:     media-assets (50MB, public read)               │
│  Auth Key:    aabos-auth-token (localStorage)                │
│  Memory:      user_sessions table (JSON key-value)           │
├──────────────────────────────────────────────────────────────┤
│  Pages: /dashboard /listings /crm /media /agents             │
│         /analytics /investor /compliance /settings           │
├──────────────────────────────────────────────────────────────┤
│  AI Tasks: enhance_listing | narration_script | (direct)     │
│  Presets:  luxury | commercial | standard | social           │
├──────────────────────────────────────────────────────────────┤
│  Realtime: listings · leads · ai_agents · agent_logs         │
│            media_assets · narration_jobs                     │
├──────────────────────────────────────────────────────────────┤
│  Dev:  pnpm dev           → http://localhost:5173            │
│  Lint: pnpm run lint      → TypeScript + ESLint check        │
│  Build: pnpm build        → dist/ production bundle          │
└──────────────────────────────────────────────────────────────┘
```

---

*GrantOS Blueprint v2.0.0 — Generated 2026-05-19*  
*System designed by GrantOS Engineering Team*  
*Do not share Supabase service role key or INTEGRATIONS_API_KEY publicly*
