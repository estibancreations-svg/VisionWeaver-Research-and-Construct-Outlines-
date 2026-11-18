Original name: GRANTOS_Live_Integration_Guide.md
Drive ID: 1lvfIJt-sXOibjtndQDmtuqXNS0MqI9gr
Parent folder: My Drive/Saved from Chrome A/
Modified: 2026-05-23T02:12:44.702Z

# GrantOS Live Integration Guide

## Overview
GrantOS is built as a frontend React application with mock data. To make it process live data, you need to connect three backend layers:
1. **Database & Auth** — Supabase (PostgreSQL + Auth)
2. **AI Processing** — Edge Functions calling LLM APIs
3. **Real-time Sync** — Supabase Realtime + WebSockets

---

## 1. Connect Supabase Backend

### Step 1: Create Supabase Project
- Go to [supabase.com](https://supabase.com) and create a new project
- Copy the **Project URL** and **Anon Key** from Project Settings → API

### Step 2: Install Supabase Client
```bash
cd /workspace/app-bqm6cdtm07i9
npm install @supabase/supabase-js
```

### Step 3: Create Supabase Client
Create `/src/lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

Add to `.env`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Step 4: Database Schema
Run this SQL in Supabase SQL Editor:

```sql
-- Users & Roles (extends Supabase Auth)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  role text default 'agent' check (role in ('admin','broker','agent','investor','viewer')),
  department text,
  created_at timestamptz default now()
);

-- Listings
create table public.listings (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  address text,
  price numeric,
  beds int,
  baths numeric,
  sqft int,
  status text default 'active' check (status in ('active','pending','sold','off_market')),
  agent_id uuid references public.profiles(id),
  ai_score int default 0,
  created_at timestamptz default now()
);

-- Leads / Contacts
create table public.leads (
  id uuid default gen_random_uuid() primary key,
  first_name text,
  last_name text,
  email text,
  phone text,
  status text default 'new' check (status in ('new','contacted','qualified','proposal','closed','lost')),
  source text,
  score int default 0,
  assigned_to uuid references public.profiles(id),
  created_at timestamptz default now()
);

-- Agent Logs
create table public.agent_logs (
  id uuid default gen_random_uuid() primary key,
  agent_name text,
  status text,
  action text,
  duration_ms int,
  created_at timestamptz default now()
);

-- Media Queue
create table public.media_queue (
  id uuid default gen_random_uuid() primary key,
  type text check (type in ('image','video','tour')),
  listing_id uuid references public.listings(id),
  status text default 'queued' check (status in ('queued','processing','completed','failed')),
  url text,
  created_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.leads enable row level security;
alter table public.agent_logs enable row level security;
alter table public.media_queue enable row level security;

-- RLS Policies (example: users see their own data + admin sees all)
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Admin full access" on public.listings for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
```

### Step 5: Replace Mock Data with Live Queries

Example for ListingsPage — replace static `mockListings` with:
```typescript
import { supabase } from '@/lib/supabase';

const { data: listings, error } = await supabase
  .from('listings')
  .select('*')
  .order('created_at', { ascending: false });
```

Use React Query or `useEffect` + state for data fetching.

---

## 2. Make AI Agents Process Live Data

### Architecture
Frontend → Supabase Edge Function → LLM API → Response saved to DB → Frontend subscribes to changes

### Step 1: Create Edge Function
```bash
npx supabase functions new ai-agent
```

Create `/supabase/functions/ai-agent/index.ts`:
```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (req) => {
  const { prompt, agentType } = await req.json();

  // Call Gemini/LLM via platform gateway
  const response = await fetch('https://api.example.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${Deno.env.get('LLM_API_KEY')}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'gemini-2.5-flash', messages: [{ role: 'user', content: prompt }] })
  });

  const result = await response.json();

  // Save log to Supabase
  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  await supabase.from('agent_logs').insert({
    agent_name: agentType,
    status: 'completed',
    action: result.choices[0].message.content,
    duration_ms: 0
  });

  return new Response(JSON.stringify(result), { headers: { 'Content-Type': 'application/json' }});
});
```

### Step 2: Call from Frontend
```typescript
const { data, error } = await supabase.functions.invoke('ai-agent', {
  body: { prompt: 'Analyze listing: 3BR house in Austin', agentType: 'listing-enhancer' }
});
```

---

## 3. Enable Real-Time Updates

### Subscribe to Database Changes
```typescript
useEffect(() => {
  const channel = supabase
    .channel('realtime-listings')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'listings' }, (payload) => {
      // Update local state when DB changes
      console.log('Listing updated:', payload);
    })
    .subscribe();

  return () => { supabase.removeChannel(channel); };
}, []);
```

Enable Realtime in Supabase Dashboard → Database → Replication → Turn on Realtime for each table.

---

## 4. Authentication Hookup

The AuthContext already supports mock login. Replace with Supabase Auth:

```typescript
// In AuthContext.tsx
import { supabase } from '@/lib/supabase';

// Replace mock login with:
const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  setUser(data.user);
};

// Listen for auth state changes
useEffect(() => {
  supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
  });
}, []);
```

---

## 5. Quick Checklist to Go Live

| Step | Status |
|------|--------|
| Supabase project created | ☐ |
| Database tables created (run SQL above) | ☐ |
| Environment variables set | ☐ |
| Supabase client integrated | ☐ |
| Mock data replaced with live queries | ☐ |
| Auth connected to Supabase | ☐ |
| Edge Function for AI processing deployed | ☐ |
| Realtime subscriptions added | ☐ |
| RLS policies configured for security | ☐ |
| Deploy updated app | ☐ |

---

## 6. Estimated Timeline

- **Backend setup (Supabase + schema):** 2–4 hours
- **Replace mock data with live queries:** 4–6 hours
- **Auth integration:** 2–3 hours
- **AI Edge Functions:** 3–5 hours
- **Realtime + polish:** 2–3 hours
- **Total: ~1–2 days of focused work**

---

## Next Actions

1. Run the SQL schema in your Supabase SQL Editor
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to your `.env`
3. Replace one page (e.g., Listings) with live queries as a proof-of-concept
4. Test login with Supabase Auth
5. Deploy the Edge Function for AI processing
