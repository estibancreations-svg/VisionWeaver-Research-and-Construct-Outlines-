-- Standalone CRM v4.0 — plans and tiers, professional mailboxes, unified inbox and internal chat,
-- app connectors, advertising and social planner (with compliance checks), new industry kits
-- (bail bonds, insurance, financial), websites, courses and community, appointments (Zoom and
-- FaceTime links), payments settings, T.H.E.L.M.A. approval gate, and owner usage/progress tracking.
-- Safe to apply on top of migrations 01–07. No data is removed.
--
-- Zero-trust rules carried forward:
--   * Row Level Security on every new table; access is decided in Postgres, never in the UI.
--   * Anything that leaves the system (sending, publishing, connecting, charging, going live)
--     can only be marked done by the service role (Edge Functions). Signed-in people can only
--     draft, request or approve.
--   * T.H.E.L.M.A. requests are written only by the signed gateway; only the Owner decides them.

-- ---------------------------------------------------------------------------
-- 1. Plans (tiers). Prices are SUGGESTED (about 30% under GoHighLevel's list prices) until
--    the Owner sets final pricing. The 'owner' plan is the Owner's own copy: no billing.
-- ---------------------------------------------------------------------------
create table public.plans (
  id text primary key check (id in ('owner', 'essentials', 'growth', 'pro')),
  name text not null,
  monthly_usd numeric(8,2) not null check (monthly_usd >= 0),
  annual_usd numeric(9,2) not null check (annual_usd >= 0),
  max_workspaces integer not null check (max_workspaces between 1 and 1000),
  included_mailboxes_per_ws integer not null default 3 check (included_mailboxes_per_ws between 0 and 50),
  websites_per_ws integer not null check (websites_per_ws between 0 and 50),
  websites_per_agency integer not null check (websites_per_agency between 0 and 1000),
  features text[] not null,
  billable boolean not null default true,
  suggested boolean not null default true,
  sort integer not null
);

insert into public.plans (id, name, monthly_usd, annual_usd, max_workspaces, websites_per_ws, websites_per_agency, features, billable, sort) values
  ('owner', 'Owner copy', 0, 0, 75, 1, 75,
   array['crm','email','internal_chat','calendar','templates','courses','community','social_planner','storage',
         'websites','ads','social_inbox','whatsapp','reviews','payments','sms','zoom','facetime','thelma_agents','api'],
   false, 0),
  ('essentials', 'Essentials', 67, 670, 3, 1, 3,
   array['crm','email','internal_chat','calendar','templates','courses','community','social_planner','storage','websites'],
   true, 1),
  ('growth', 'Growth', 207, 2070, 75, 1, 6,
   array['crm','email','internal_chat','calendar','templates','courses','community','social_planner','storage','websites',
         'ads','social_inbox','whatsapp','reviews','payments'],
   true, 2),
  ('pro', 'Pro', 347, 3470, 75, 2, 12,
   array['crm','email','internal_chat','calendar','templates','courses','community','social_planner','storage','websites',
         'ads','social_inbox','whatsapp','reviews','payments','sms','zoom','facetime','thelma_agents','api'],
   true, 3);

-- Suggested add-on prices (per month). Also suggested until the Owner sets pricing.
create table public.plan_addons (
  id text primary key,
  name text not null,
  monthly_usd numeric(8,2) not null check (monthly_usd >= 0),
  unit text not null,
  note text not null default '',
  sort integer not null
);
insert into public.plan_addons (id, name, monthly_usd, unit, note, sort) values
  ('extra_mailbox', 'Extra email address', 4, 'per address', 'Beyond the 3 included per sub-account (Owner, Admin, Accounting).', 1),
  ('extra_website', 'Extra website', 7, 'per website', 'Beyond the plan''s website allowance.', 2),
  ('whatsapp', 'WhatsApp line', 7, 'per sub-account', 'Plus WhatsApp/Meta message fees at cost.', 3),
  ('client_portal', 'Branded client portal', 34, 'per sub-account', 'Customer logins for invoices, bookings and courses.', 4),
  ('seo', 'SEO and listings', 55, 'per sub-account', 'Search visibility and directory listings.', 5),
  ('usage', 'Texts, calls, email sends and AI', 0, 'at cost + margin', 'Passed through from the provider; margin to be set.', 6);

alter table public.agencies
  add column if not exists plan text not null default 'owner' references public.plans(id),
  add column if not exists billing_status text not null default 'exempt'
    check (billing_status in ('exempt', 'trialing', 'active', 'past_due', 'canceled'));

alter table public.plans enable row level security;
alter table public.plan_addons enable row level security;
create policy "plans: everyone signed in reads" on public.plans for select to authenticated using (true);
create policy "plan_addons: everyone signed in reads" on public.plan_addons for select to authenticated using (true);
grant select on public.plans, public.plan_addons to authenticated;

-- Does this sub-account's plan include a feature?
create or replace function private.ws_has_feature(target_workspace uuid, f text)
returns boolean language sql stable security definer set search_path = '' as $$
  select coalesce((
    select f = any(p.features)
    from public.workspaces w
    join public.agencies a on a.id = w.agency_id
    join public.plans p on p.id = a.plan
    where w.id = target_workspace), false);
$$;
revoke all on function private.ws_has_feature(uuid, text) from public, anon;
grant execute on function private.ws_has_feature(uuid, text) to authenticated;

-- Plan + features for one sub-account (used by the app to show/hide paid tools).
create or replace function public.workspace_plan(p_workspace uuid)
returns table (plan_id text, plan_name text, features text[], websites_per_ws integer, websites_per_agency integer,
               included_mailboxes integer, billing_status text)
language sql stable security definer set search_path = '' as $$
  select p.id, p.name, p.features, p.websites_per_ws, p.websites_per_agency, p.included_mailboxes_per_ws, a.billing_status
  from public.workspaces w
  join public.agencies a on a.id = w.agency_id
  join public.plans p on p.id = a.plan
  where w.id = p_workspace and private.can_read_ws(p_workspace);
$$;
revoke all on function public.workspace_plan(uuid) from public, anon;
grant execute on function public.workspace_plan(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- 2. Industry kits: add bail bonds, insurance and financial services
-- ---------------------------------------------------------------------------
create or replace function private.template_ids()
returns text[] language sql immutable set search_path = '' as $$
  select array['general', 'restaurant', 'clinic', 'home_services', 'real_estate', 'professional',
               'retail', 'fitness', 'beauty', 'education', 'bail_bonds', 'insurance', 'financial'];
$$;
revoke all on function private.template_ids() from public, anon;
grant execute on function private.template_ids() to authenticated;

alter table public.workspaces drop constraint if exists workspaces_template_check;
alter table public.workspaces add constraint workspaces_template_check
  check (template = any (private.template_ids()));

create or replace function private.template_stages(t text)
returns text[] language sql immutable set search_path = '' as $$
  select case t
    when 'restaurant'    then array['Inquiry', 'Tasting or visit', 'Quote sent', 'Booked', 'Event done']
    when 'clinic'        then array['New inquiry', 'Consult booked', 'Treatment plan', 'Scheduled', 'Completed']
    when 'home_services' then array['New request', 'Estimate visit', 'Estimate sent', 'Job booked', 'Job complete']
    when 'real_estate'   then array['New lead', 'Showing', 'Offer', 'Under contract', 'Closed']
    when 'professional'  then array['Discovery', 'Proposal', 'Contract', 'Kickoff', 'Delivered']
    when 'retail'        then array['New lead', 'Interested', 'Quote', 'Order placed', 'Fulfilled']
    when 'fitness'       then array['Trial booked', 'Trial done', 'Offer', 'Signed up', 'Active member']
    when 'beauty'        then array['Inquiry', 'Consult', 'Booked', 'Visit done', 'Rebooked']
    when 'education'     then array['Inquiry', 'Info session', 'Application', 'Enrolled', 'Completed']
    when 'bail_bonds'    then array['New call', 'Booking info gathered', 'Co-signer and paperwork', 'Bond posted', 'Court dates tracked']
    when 'insurance'     then array['New lead', 'Needs review', 'Quote sent', 'Application', 'Policy bound']
    when 'financial'     then array['Inquiry', 'Discovery meeting', 'Plan presented', 'Paperwork', 'Account opened']
    else array['New lead', 'Contacted', 'Proposal', 'Negotiation', 'Closed']
  end;
$$;

create or replace function private.template_tags(t text)
returns text[] language sql immutable set search_path = '' as $$
  select case t
    when 'restaurant'    then array['catering', 'private event', 'regular', 'vip', 'allergy note']
    when 'clinic'        then array['new patient', 'returning', 'referral', 'follow-up', 'insurance']
    when 'home_services' then array['repair', 'install', 'maintenance plan', 'emergency', 'warranty']
    when 'real_estate'   then array['buyer', 'seller', 'first-time', 'investor', 'pre-approved']
    when 'professional'  then array['retainer', 'project', 'referral', 'decision maker', 'renewal']
    when 'retail'        then array['wholesale', 'repeat buyer', 'vip', 'online', 'in-store']
    when 'fitness'       then array['trial', 'personal training', 'class pack', 'member', 'lapsed']
    when 'beauty'        then array['new client', 'regular', 'color', 'bridal', 'product buyer']
    when 'education'     then array['parent', 'student', 'scholarship', 'alumni', 'follow-up']
    when 'bail_bonds'    then array['co-signer', 'defendant', 'spanish speaker', 'court date set', 'payment plan', 'referral']
    when 'insurance'     then array['auto', 'home', 'life', 'commercial', 'renewal due', 'referral']
    when 'financial'     then array['retirement', 'investment', 'loan', 'tax season', 'referral', 'review due']
    else array['vip', 'follow-up', 'referral', 'partner']
  end;
$$;

create or replace function public.create_workspace(
  p_agency uuid, p_name text, p_industry text default null, p_timezone text default 'America/Chicago',
  p_template text default 'general')
returns uuid language plpgsql security definer set search_path = '' as $$
declare
  uid uuid := (select auth.uid());
  ws uuid; pl uuid; base_slug text; final_slug text; n int := 1;
  tpl text := coalesce(nullif(p_template, ''), 'general');
  stages text[];
  probs int[] := array[10, 25, 50, 75, 100];
  i int;
begin
  if not private.is_agency_admin(p_agency) then
    raise exception 'Only agency owners/admins can create sub-accounts' using errcode = '42501';
  end if;
  if p_name is null or length(trim(p_name)) not between 1 and 120 then
    raise exception 'Sub-account name must be 1-120 characters' using errcode = '22023';
  end if;
  if not (tpl = any (private.template_ids())) then
    raise exception 'Unknown starter setup' using errcode = '22023';
  end if;
  base_slug := trim(both '-' from regexp_replace(lower(trim(p_name)), '[^a-z0-9]+', '-', 'g'));
  base_slug := left(coalesce(nullif(base_slug, ''), 'client'), 50);
  final_slug := base_slug;
  while exists (select 1 from public.workspaces where agency_id = p_agency and slug = final_slug) loop
    n := n + 1; final_slug := base_slug || '-' || n;
  end loop;

  insert into public.workspaces (agency_id, name, slug, industry, timezone, created_by, template, suggested_tags)
  values (p_agency, trim(p_name), final_slug, nullif(trim(coalesce(p_industry, '')), ''),
          coalesce(nullif(p_timezone, ''), 'America/Chicago'), uid, tpl, private.template_tags(tpl))
  returning id into ws;

  stages := private.template_stages(tpl);
  insert into public.pipelines (workspace_id, name, is_default) values (ws, 'Sales', true) returning id into pl;
  for i in 1..5 loop
    insert into public.pipeline_stages (workspace_id, pipeline_id, name, position, probability)
    values (ws, pl, stages[i], i - 1, probs[i]);
  end loop;

  insert into public.activities (workspace_id, entity_type, entity_id, actor_id, event_type, summary)
  values (ws, 'workspace', ws, uid, 'created', 'Sub-account created: ' || trim(p_name));
  return ws;
end $$;
revoke all on function public.create_workspace(uuid, text, text, text, text) from public, anon;
grant execute on function public.create_workspace(uuid, text, text, text, text) to authenticated;

-- Saved message, ad, social and script templates (installed from an industry kit or written by hand).
create table public.content_templates (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  kind text not null check (kind in ('email', 'sms', 'social', 'ad', 'script', 'website_outline', 'task')),
  name text not null check (length(trim(name)) between 1 and 120),
  body text not null check (length(trim(body)) between 1 and 6000),
  kit text check (kit is null or kit = any (private.template_ids())),
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, kind, name)
);
create index content_templates_ws_kind_idx on public.content_templates(workspace_id, kind);

-- ---------------------------------------------------------------------------
-- 3. Professional email: 3 addresses per sub-account (Owner, Admin, Accounting) under the
--    business's own domain. Extra addresses are allowed and billed. Sending/receiving is
--    switched on by the service role once a mail host is connected and the domain is verified.
-- ---------------------------------------------------------------------------
alter table public.workspaces
  add column if not exists email_domain text,
  add column if not exists email_domain_status text not null default 'not_set'
    check (email_domain_status in ('not_set', 'pending_dns', 'verified'));
alter table public.workspaces drop constraint if exists workspaces_email_domain_check;
alter table public.workspaces add constraint workspaces_email_domain_check
  check (email_domain is null or (length(email_domain) <= 190
         and email_domain ~ '^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)+$'));
revoke update on public.workspaces from authenticated;
grant update (name, industry, timezone, accent, archived_at, logo_path, brand_color, suggested_tags, email_domain)
  on public.workspaces to authenticated;

-- A changed domain must be checked again before mail can flow.
create or replace function private.reset_domain_status()
returns trigger language plpgsql set search_path = '' as $$
begin
  if new.email_domain is distinct from old.email_domain then
    new.email_domain := lower(nullif(trim(coalesce(new.email_domain, '')), ''));
    new.email_domain_status := case when new.email_domain is null then 'not_set' else 'pending_dns' end;
  end if;
  return new;
end $$;
create trigger workspaces_domain_status before update of email_domain on public.workspaces
  for each row execute function private.reset_domain_status();

create table public.mailboxes (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  slot text not null check (slot in ('owner', 'admin', 'accounting', 'extra')),
  local_part text not null check (local_part ~ '^[a-z0-9]([a-z0-9._-]{0,62}[a-z0-9])?$'),
  display_name text not null check (length(trim(display_name)) between 1 and 120),
  assigned_user uuid references auth.users(id) on delete set null,
  status text not null default 'reserved' check (status in ('reserved', 'active', 'suspended')),
  billable boolean generated always as (slot = 'extra') stored,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, local_part)
);
create unique index mailboxes_one_per_slot on public.mailboxes(workspace_id, slot) where slot <> 'extra';

create or replace function private.reserve_mailboxes()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.mailboxes (workspace_id, slot, local_part, display_name) values
    (new.id, 'owner', 'owner', left(new.name, 100) || ' — Owner'),
    (new.id, 'admin', 'admin', left(new.name, 100) || ' — Admin'),
    (new.id, 'accounting', 'accounting', left(new.name, 100) || ' — Accounting')
  on conflict do nothing;
  return new;
end $$;
create trigger workspaces_reserve_mailboxes after insert on public.workspaces
  for each row execute function private.reserve_mailboxes();
-- Existing sub-accounts get their three addresses too.
insert into public.mailboxes (workspace_id, slot, local_part, display_name)
select w.id, s.slot, s.slot, left(w.name, 100) || ' — ' || initcap(s.slot)
from public.workspaces w cross join (values ('owner'), ('admin'), ('accounting')) s(slot)
on conflict do nothing;

-- ---------------------------------------------------------------------------
-- 4. Unified inbox + internal chat
-- ---------------------------------------------------------------------------
create or replace function private.channel_feature(ch text)
returns text language sql immutable set search_path = '' as $$
  select case ch
    when 'internal' then 'internal_chat'
    when 'email' then 'email'
    when 'sms' then 'sms'
    when 'whatsapp' then 'whatsapp'
    when 'messenger' then 'social_inbox'
    when 'instagram' then 'social_inbox'
    when 'linkedin' then 'social_inbox'
    when 'webchat' then 'crm'
    when 'zoom' then 'zoom'
    when 'facetime' then 'facetime'
  end;
$$;
revoke all on function private.channel_feature(text) from public, anon;
grant execute on function private.channel_feature(text) to authenticated;

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  kind text not null check (kind in ('internal', 'contact')),
  channel text not null check (private.channel_feature(channel) is not null),
  contact_id uuid,
  subject text not null check (length(trim(subject)) between 1 and 160),
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  last_message_at timestamptz not null default now(),
  archived_at timestamptz,
  unique (workspace_id, id),
  check ((kind = 'internal') = (channel = 'internal')),
  check (kind = 'internal' or contact_id is not null),
  foreign key (workspace_id, contact_id) references public.contacts(workspace_id, id) on delete cascade
);
create index conversations_ws_last_idx on public.conversations(workspace_id, last_message_at desc) where archived_at is null;

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null,
  conversation_id uuid not null,
  channel text not null check (private.channel_feature(channel) is not null),
  direction text not null check (direction in ('internal', 'outbound', 'inbound')),
  body text not null check (length(trim(body)) between 1 and 10000),
  from_mailbox uuid references public.mailboxes(id) on delete set null,
  sender_id uuid references auth.users(id) on delete set null default auth.uid(),
  status text not null default 'queued'
    check (status in ('sent', 'queued', 'needs_connection', 'delivered', 'failed', 'received')),
  created_at timestamptz not null default now(),
  foreign key (workspace_id, conversation_id) references public.conversations(workspace_id, id) on delete cascade
);
create index messages_conv_created_idx on public.messages(conversation_id, created_at);
create index messages_ws_created_idx on public.messages(workspace_id, created_at desc);

-- Signed-in people can write internal notes and queue outbound messages; only the service role
-- records inbound messages or delivery results.
create or replace function private.prepare_message()
returns trigger language plpgsql security definer set search_path = '' as $$
declare conv record;
begin
  select kind, channel into conv from public.conversations
   where id = new.conversation_id and workspace_id = new.workspace_id;
  if conv.kind is null then
    raise exception 'Conversation not found' using errcode = '23503';
  end if;
  if (select auth.uid()) is not null then
    if conv.kind = 'internal' then
      new.direction := 'internal'; new.channel := 'internal'; new.status := 'sent';
    else
      new.direction := 'outbound'; new.channel := conv.channel;
      new.status := case
        when not private.ws_has_feature(new.workspace_id, private.channel_feature(new.channel)) then 'needs_connection'
        when new.channel = 'email' and not exists (
               select 1 from public.workspaces w where w.id = new.workspace_id and w.email_domain_status = 'verified')
             then 'needs_connection'
        else 'queued' end;
    end if;
    new.sender_id := (select auth.uid());
  end if;
  update public.conversations set last_message_at = now() where id = new.conversation_id;
  return new;
end $$;
create trigger messages_prepare before insert on public.messages
  for each row execute function private.prepare_message();

-- ---------------------------------------------------------------------------
-- 5. App connectors per sub-account (social, storage, calendars, ads, comms, payments).
--    People can only switch an app off or request it; 'connected' is set by the service role
--    after the provider's own sign-in. Keys never live in this table (they stay in the vault).
-- ---------------------------------------------------------------------------
create or replace function private.app_feature(app text)
returns text language sql immutable set search_path = '' as $$
  select case app
    when 'google_drive' then 'storage' when 'dropbox' then 'storage' when 'onedrive' then 'storage' when 'box' then 'storage'
    when 'google_calendar' then 'calendar' when 'outlook_calendar' then 'calendar' when 'outlook_mail' then 'email'
    when 'gmail' then 'email'
    when 'facebook' then 'social_planner' when 'instagram' then 'social_planner' when 'linkedin' then 'social_planner'
    when 'x' then 'social_planner' when 'tiktok' then 'social_planner' when 'youtube' then 'social_planner'
    when 'pinterest' then 'social_planner' when 'threads' then 'social_planner' when 'google_business' then 'social_planner'
    when 'google_ads' then 'ads' when 'meta_ads' then 'ads' when 'tiktok_ads' then 'ads' when 'linkedin_ads' then 'ads'
    when 'whatsapp' then 'whatsapp' when 'twilio_sms' then 'sms' when 'zoom' then 'zoom' when 'facetime' then 'facetime'
    when 'stripe' then 'payments'
  end;
$$;
revoke all on function private.app_feature(text) from public, anon;
grant execute on function private.app_feature(text) to authenticated;

create table public.workspace_apps (
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  app text not null check (private.app_feature(app) is not null),
  status text not null default 'off' check (status in ('off', 'requested', 'connected', 'error')),
  account_label text check (account_label is null or length(account_label) <= 120),
  status_note text check (status_note is null or length(status_note) <= 300),
  requested_by uuid references auth.users(id) on delete set null default auth.uid(),
  updated_at timestamptz not null default now(),
  primary key (workspace_id, app)
);

-- ---------------------------------------------------------------------------
-- 6. Advertising + social planner, with built-in compliance checks
-- ---------------------------------------------------------------------------
-- Phrases that are not allowed in ads/posts. Mirrored in src/lib/compliance.ts for instant
-- feedback; this function is the real guard.
create or replace function private.compliance_flags(kit text, body text)
returns text[] language sql immutable set search_path = '' as $$
  select array_remove(array[
    case when body ~* '\mguarantee(d|s)?\M' then 'Avoid promises like "guaranteed"' end,
    case when body ~* '(5|five)[- ]star reviews? (for|in exchange)|review (for|in exchange for) (a )?(discount|gift|prize)'
         then 'Never offer anything in exchange for reviews (FTC rule)' end,
    case when kit = 'bail_bonds' and body ~* 'get out (of jail )?free|out of jail free'
         then 'Bail bonds: no "get out free" claims' end,
    case when kit = 'bail_bonds' and body ~* '(legal advice|beat (the|your) (charge|case)s?|we are (lawyers|attorneys)|drop(ped)? (the|your) charges)'
         then 'Bail bonds: no legal advice or case-outcome claims' end,
    case when kit = 'insurance' and body ~* '(lowest|cheapest) (rate|price|premium)s?|free (insurance|coverage)|everyone (is )?approved'
         then 'Insurance: no lowest-rate, free-coverage or approve-everyone claims' end,
    case when kit = 'financial' and body ~* 'risk[- ]free|can''?t lose|double your money|no risk|sure thing'
         then 'Financial: no risk-free or sure-return claims' end
  ], null);
$$;
revoke all on function private.compliance_flags(text, text) from public, anon;
grant execute on function private.compliance_flags(text, text) to authenticated;

create table public.campaigns (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null check (length(trim(name)) between 1 and 120),
  channel text not null check (channel in ('google_ads', 'meta_ads', 'tiktok_ads', 'linkedin_ads', 'social', 'email', 'print', 'radio_tv', 'other')),
  objective text not null default 'leads' check (objective in ('leads', 'calls', 'bookings', 'awareness', 'traffic', 'reviews')),
  budget numeric(12,2) not null default 0 check (budget >= 0 and budget < 100000000),
  starts_on date,
  ends_on date,
  headline text check (headline is null or length(headline) <= 120),
  ad_text text check (ad_text is null or length(ad_text) <= 2000),
  utm_campaign text check (utm_campaign is null or utm_campaign ~ '^[a-z0-9_-]{1,60}$'),
  status text not null default 'draft' check (status in ('draft', 'approved', 'active', 'paused', 'ended')),
  compliance_flags text[] not null default '{}',
  approved_by uuid references auth.users(id) on delete set null,
  approved_at timestamptz,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, id),
  check (ends_on is null or starts_on is null or ends_on >= starts_on)
);

create table public.social_posts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  campaign_id uuid,
  platforms text[] not null check (cardinality(platforms) between 1 and 10
    and platforms <@ array['facebook','instagram','linkedin','x','tiktok','youtube','pinterest','threads','google_business']),
  body text not null check (length(trim(body)) between 1 and 3000),
  media_note text check (media_note is null or length(media_note) <= 500),
  scheduled_at timestamptz,
  status text not null default 'draft' check (status in ('draft', 'approved', 'scheduled', 'published', 'failed')),
  compliance_flags text[] not null default '{}',
  approved_by uuid references auth.users(id) on delete set null,
  approved_at timestamptz,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (workspace_id, campaign_id) references public.campaigns(workspace_id, id) on delete set null (campaign_id)
);
create index social_posts_ws_sched_idx on public.social_posts(workspace_id, scheduled_at);

-- Re-check compliance on every save; only sub-account admins can approve; nothing with a flag
-- can be approved; 'published'/'active' delivery states belong to the service role.
create or replace function private.marketing_guard()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  kit text;
  txt text;
  feature text := case when tg_table_name = 'campaigns' and (to_jsonb(new) ->> 'channel') <> 'social'
                       then 'ads' else 'social_planner' end;
begin
  select template into kit from public.workspaces where id = new.workspace_id;
  if tg_table_name = 'campaigns' then
    txt := concat_ws(' ', to_jsonb(new) ->> 'name', to_jsonb(new) ->> 'headline', to_jsonb(new) ->> 'ad_text');
  else
    txt := to_jsonb(new) ->> 'body';
  end if;
  new.compliance_flags := private.compliance_flags(kit, txt);
  new.updated_at := now();
  if (select auth.uid()) is null then
    return new;  -- service role (delivery results)
  end if;
  if not private.ws_has_feature(new.workspace_id, feature) then
    raise exception 'Your plan does not include this tool yet' using errcode = '42501';
  end if;
  if tg_op = 'INSERT' and new.status <> 'draft' then
    new.status := 'draft';
  end if;
  if tg_op = 'UPDATE' and new.status is distinct from old.status then
    if new.status in ('published', 'active', 'failed') then
      raise exception 'Only the delivery service can set that status' using errcode = '42501';
    end if;
    if new.status in ('approved', 'scheduled') then
      if not private.can_admin_ws(new.workspace_id) then
        raise exception 'Only a sub-account admin can approve' using errcode = '42501';
      end if;
      if cardinality(new.compliance_flags) > 0 then
        raise exception 'Fix the compliance flags before approving' using errcode = '22023';
      end if;
      new.approved_by := (select auth.uid());
      new.approved_at := now();
    end if;
  end if;
  -- Editing approved wording sends it back to draft.
  if tg_op = 'UPDATE' and old.status in ('approved', 'scheduled') and new.status = old.status
     and tg_table_name = 'social_posts' and (to_jsonb(new) ->> 'body') is distinct from (to_jsonb(old) ->> 'body') then
    new.status := 'draft'; new.approved_by := null; new.approved_at := null;
  end if;
  return new;
end $$;
create trigger campaigns_guard before insert or update on public.campaigns
  for each row execute function private.marketing_guard();
create trigger social_posts_guard before insert or update on public.social_posts
  for each row execute function private.marketing_guard();

-- Where each lead came from (ad attribution).
alter table public.contacts
  add column if not exists utm_source text check (utm_source is null or length(utm_source) <= 80),
  add column if not exists utm_medium text check (utm_medium is null or length(utm_medium) <= 80),
  add column if not exists utm_campaign text check (utm_campaign is null or length(utm_campaign) <= 80);

-- ---------------------------------------------------------------------------
-- 7. Websites: one per sub-account now (Owner copy and demo); plan limits at go-live
-- ---------------------------------------------------------------------------
create table public.websites (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null check (length(trim(name)) between 1 and 120),
  domain text check (domain is null or (length(domain) <= 190
         and domain ~ '^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)+$')),
  kit text check (kit is null or kit = any (private.template_ids())),
  outline text[] not null default '{}' check (cardinality(outline) <= 30),
  status text not null default 'planned' check (status in ('planned', 'draft', 'live')),
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function private.website_guard()
returns trigger language plpgsql security definer set search_path = '' as $$
declare per_ws int; per_agency int; ag uuid; used_ws int; used_ag int;
begin
  new.updated_at := now();
  if (select auth.uid()) is null then return new; end if;
  if tg_op = 'UPDATE' and new.status = 'live' and old.status <> 'live' then
    raise exception 'A site goes live through the publishing service' using errcode = '42501';
  end if;
  if tg_op = 'INSERT' then
    if new.status = 'live' then new.status := 'planned'; end if;
    select w.agency_id, p.websites_per_ws, p.websites_per_agency into ag, per_ws, per_agency
      from public.workspaces w join public.agencies a on a.id = w.agency_id join public.plans p on p.id = a.plan
     where w.id = new.workspace_id;
    perform 1 from public.agencies where id = ag for update;
    select count(*) into used_ws from public.websites where workspace_id = new.workspace_id;
    select count(*) into used_ag from public.websites s join public.workspaces w on w.id = s.workspace_id where w.agency_id = ag;
    if used_ws >= per_ws then
      raise exception 'Website limit reached for this sub-account (% of %)', used_ws, per_ws using errcode = 'P0001';
    end if;
    if used_ag >= per_agency then
      raise exception 'Website limit reached for this account (% of %)', used_ag, per_agency using errcode = 'P0001';
    end if;
  end if;
  return new;
end $$;
create trigger websites_guard before insert or update on public.websites
  for each row execute function private.website_guard();

-- ---------------------------------------------------------------------------
-- 8. Courses, lessons and community (training for teams and customers)
-- ---------------------------------------------------------------------------
create table public.courses (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  title text not null check (length(trim(title)) between 1 and 120),
  description text check (description is null or length(description) <= 2000),
  audience text not null default 'team' check (audience in ('team', 'customers')),
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, id)
);
create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null,
  course_id uuid not null,
  title text not null check (length(trim(title)) between 1 and 120),
  body text not null default '' check (length(body) <= 20000),
  video_url text check (video_url is null or (video_url ~ '^https://' and length(video_url) <= 500)),
  position integer not null default 0 check (position >= 0),
  created_at timestamptz not null default now(),
  foreign key (workspace_id, course_id) references public.courses(workspace_id, id) on delete cascade
);
create index lessons_course_idx on public.lessons(course_id, position);

create table public.community_posts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  author_id uuid references auth.users(id) on delete set null default auth.uid(),
  title text not null check (length(trim(title)) between 1 and 160),
  body text not null check (length(trim(body)) between 1 and 5000),
  pinned boolean not null default false,
  created_at timestamptz not null default now()
);
create index community_posts_ws_idx on public.community_posts(workspace_id, pinned desc, created_at desc);

-- Built-in "Learn the system" lessons: each person's own progress.
create table public.learning_progress (
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  lesson_key text not null check (lesson_key ~ '^[a-z0-9-]{1,60}$'),
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_key)
);

-- ---------------------------------------------------------------------------
-- 9. Appointments (calendar). Zoom and FaceTime appointments need the plan that includes them.
-- ---------------------------------------------------------------------------
create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  contact_id uuid,
  title text not null check (length(trim(title)) between 1 and 160),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  kind text not null default 'in_person' check (kind in ('in_person', 'phone', 'zoom', 'facetime', 'other')),
  location text check (location is null or length(location) <= 200),
  meeting_link text check (meeting_link is null or (meeting_link ~ '^https://' and length(meeting_link) <= 500)),
  notes text check (notes is null or length(notes) <= 2000),
  status text not null default 'scheduled' check (status in ('scheduled', 'done', 'cancelled', 'no_show')),
  assigned_to uuid references auth.users(id) on delete set null,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at > starts_at and ends_at - starts_at <= interval '24 hours'),
  foreign key (workspace_id, contact_id) references public.contacts(workspace_id, id) on delete set null (contact_id)
);
create index appointments_ws_start_idx on public.appointments(workspace_id, starts_at);

create or replace function private.appointment_guard()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  new.updated_at := now();
  if (select auth.uid()) is not null and new.kind in ('zoom', 'facetime')
     and not private.ws_has_feature(new.workspace_id, new.kind) then
    raise exception 'Zoom and FaceTime appointments are on the Pro plan' using errcode = '42501';
  end if;
  return new;
end $$;
create trigger appointments_guard before insert or update on public.appointments
  for each row execute function private.appointment_guard();

-- ---------------------------------------------------------------------------
-- 10. Payments: Stripe with card, Apple Pay, Google Pay, Link, bank (ACH) and Tap to Pay.
--     The Owner copy keeps payments OFF. Charges are created only by the payments Edge Function.
-- ---------------------------------------------------------------------------
create table public.payment_settings (
  agency_id uuid primary key references public.agencies(id) on delete cascade,
  mode text not null default 'off' check (mode in ('off', 'test', 'live')),
  methods text[] not null default array['card'] check (methods <@ array['card','apple_pay','google_pay','link','ach','tap_to_pay']),
  wallet_domain_registered boolean not null default false,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  contact_id uuid,
  number text not null check (number ~ '^[A-Z0-9-]{1,30}$'),
  description text not null check (length(trim(description)) between 1 and 500),
  amount numeric(12,2) not null check (amount > 0 and amount < 10000000),
  currency text not null default 'usd' check (currency in ('usd')),
  due_on date,
  status text not null default 'draft' check (status in ('draft', 'open', 'paid', 'void')),
  paid_at timestamptz,
  paid_method text check (paid_method is null or paid_method in ('card','apple_pay','google_pay','link','ach','tap_to_pay','cash','check')),
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, number),
  foreign key (workspace_id, contact_id) references public.contacts(workspace_id, id) on delete set null (contact_id)
);

create or replace function private.invoice_guard()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  new.updated_at := now();
  if (select auth.uid()) is null then return new; end if;
  if not private.ws_has_feature(new.workspace_id, 'payments') then
    raise exception 'Your plan does not include payments yet' using errcode = '42501';
  end if;
  if tg_op = 'INSERT' then
    new.status := 'draft'; new.paid_at := null; new.paid_method := null;
  elsif new.status is distinct from old.status and new.status = 'paid'
        and coalesce(new.paid_method, '') not in ('cash', 'check') then
    raise exception 'Card and wallet payments are marked paid by the payment service' using errcode = '42501';
  elsif old.status in ('paid', 'void') and new.status is distinct from old.status then
    raise exception 'Paid or void invoices cannot be reopened' using errcode = '22023';
  end if;
  if new.status = 'paid' and new.paid_at is null then new.paid_at := now(); end if;
  return new;
end $$;
create trigger invoices_guard before insert or update on public.invoices
  for each row execute function private.invoice_guard();

-- Only the Owner changes payment settings, and the Owner copy stays OFF.
create or replace function public.set_payment_settings(p_agency uuid, p_mode text, p_methods text[])
returns void language plpgsql security definer set search_path = '' as $$
declare pl text;
begin
  if not exists (select 1 from public.agency_members where agency_id = p_agency and user_id = (select auth.uid()) and role = 'owner')
     or not private.mfa_ok() then
    raise exception 'Only the Owner can change payment settings' using errcode = '42501';
  end if;
  select plan into pl from public.agencies where id = p_agency;
  if pl = 'owner' and p_mode <> 'off' then
    raise exception 'Payments stay off in the Owner copy' using errcode = '22023';
  end if;
  if p_mode not in ('off', 'test', 'live') or not (coalesce(p_methods, array['card']) <@ array['card','apple_pay','google_pay','link','ach','tap_to_pay']) then
    raise exception 'Some values aren''t valid' using errcode = '22023';
  end if;
  insert into public.payment_settings (agency_id, mode, methods, updated_by, updated_at)
  values (p_agency, p_mode, coalesce(p_methods, array['card']), (select auth.uid()), now())
  on conflict (agency_id) do update set mode = excluded.mode, methods = excluded.methods,
    updated_by = excluded.updated_by, updated_at = now();
end $$;
revoke all on function public.set_payment_settings(uuid, text, text[]) from public, anon;
grant execute on function public.set_payment_settings(uuid, text, text[]) to authenticated;

-- ---------------------------------------------------------------------------
-- 11. T.H.E.L.M.A. approval gate (air-gapped). Assistant bots, chat bots and outside agents
--     can only ASK. Requests arrive through the signed thelma-gateway Edge Function (service role).
--     Only the Owner, signed in with two-step, approves or rejects. Nothing is ever deleted.
-- ---------------------------------------------------------------------------
create table public.thelma_requests (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references public.agencies(id) on delete cascade,
  workspace_id uuid references public.workspaces(id) on delete set null,
  source text not null check (source in ('thelma', 'assistant_bot', 'chat_bot', 'agent', 'external_agent')),
  source_name text not null check (length(trim(source_name)) between 1 and 80),
  action text not null check (action ~ '^[a-z0-9_.-]{1,80}$'),
  summary text not null check (length(trim(summary)) between 1 and 500),
  details jsonb not null default '{}'::jsonb check (pg_column_size(details) <= 32768),
  risk text not null default 'medium' check (risk in ('low', 'medium', 'high')),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'expired', 'executed')),
  decided_by uuid references auth.users(id) on delete set null,
  decided_at timestamptz,
  decision_note text check (decision_note is null or length(decision_note) <= 500),
  expires_at timestamptz not null default now() + interval '7 days',
  created_at timestamptz not null default now()
);
create index thelma_requests_agency_idx on public.thelma_requests(agency_id, status, created_at desc);

create or replace function public.decide_thelma_request(p_id uuid, p_approve boolean, p_note text default null)
returns text language plpgsql security definer set search_path = '' as $$
declare r record;
begin
  select * into r from public.thelma_requests where id = p_id for update;
  if r.id is null then raise exception 'Request not found' using errcode = 'P0002'; end if;
  if not exists (select 1 from public.agency_members where agency_id = r.agency_id and user_id = (select auth.uid()) and role = 'owner')
     or not private.mfa_ok() then
    raise exception 'Only the Owner can decide T.H.E.L.M.A. requests' using errcode = '42501';
  end if;
  if r.status <> 'pending' then raise exception 'This request was already decided' using errcode = '22023'; end if;
  if r.expires_at < now() then
    update public.thelma_requests set status = 'expired' where id = p_id;
    return 'expired';
  end if;
  update public.thelma_requests
     set status = case when p_approve then 'approved' else 'rejected' end,
         decided_by = (select auth.uid()), decided_at = now(),
         decision_note = left(nullif(trim(coalesce(p_note, '')), ''), 500)
   where id = p_id;
  return case when p_approve then 'approved' else 'rejected' end;
end $$;
revoke all on function public.decide_thelma_request(uuid, boolean, text) from public, anon;
grant execute on function public.decide_thelma_request(uuid, boolean, text) to authenticated;

-- ---------------------------------------------------------------------------
-- 12. Owner tracking: every person's activity and every sub-account's setup progress
-- ---------------------------------------------------------------------------
create or replace function public.agency_people(p_agency uuid, p_days integer default 30)
returns table (user_id uuid, full_name text, email text, access text, last_active timestamptz, actions bigint, messages bigint)
language sql stable security invoker set search_path = '' as $$
  with people as (
    select am.user_id, 'Team · ' || am.role as access from public.agency_members am where am.agency_id = p_agency
    union all
    select wm.user_id, w.name || ' · ' || wm.role from public.workspace_members wm
      join public.workspaces w on w.id = wm.workspace_id where w.agency_id = p_agency
  ), grouped as (
    select p.user_id, string_agg(p.access, ', ' order by p.access) as access from people p group by p.user_id
  )
  select g.user_id, coalesce(pr.full_name, ''), coalesce(pr.email, ''), g.access,
    (select max(a.created_at) from public.activities a join public.workspaces w on w.id = a.workspace_id
      where a.actor_id = g.user_id and w.agency_id = p_agency),
    (select count(*) from public.activities a join public.workspaces w on w.id = a.workspace_id
      where a.actor_id = g.user_id and w.agency_id = p_agency and a.created_at > now() - make_interval(days => greatest(1, least(p_days, 365)))),
    (select count(*) from public.messages m join public.workspaces w on w.id = m.workspace_id
      where m.sender_id = g.user_id and w.agency_id = p_agency and m.created_at > now() - make_interval(days => greatest(1, least(p_days, 365))))
  from grouped g
  left join public.profiles pr on pr.id = g.user_id
  where private.is_agency_admin(p_agency)
  order by 5 desc nulls last;
$$;

create or replace function public.agency_progress(p_agency uuid)
returns table (workspace_id uuid, name text, template text, steps_done integer, steps_total integer,
               has_logo boolean, domain_verified boolean, has_contacts boolean, has_deals boolean,
               kit_installed boolean, website_planned boolean, has_team boolean, messages_30d bigint, posts_30d bigint)
language sql stable security invoker set search_path = '' as $$
  select w.id, w.name, w.template,
    (w.logo_path is not null)::int + (w.email_domain_status = 'verified')::int + x.c::int + x.d::int + x.k::int + x.s::int + x.t::int,
    7,
    w.logo_path is not null, w.email_domain_status = 'verified', x.c, x.d, x.k, x.s, x.t, x.m, x.p
  from public.workspaces w
  cross join lateral (select
    exists (select 1 from public.contacts c where c.workspace_id = w.id) as c,
    exists (select 1 from public.deals d where d.workspace_id = w.id) as d,
    exists (select 1 from public.content_templates t where t.workspace_id = w.id) as k,
    exists (select 1 from public.websites s where s.workspace_id = w.id) as s,
    exists (select 1 from public.workspace_members m where m.workspace_id = w.id) as t,
    (select count(*) from public.messages m where m.workspace_id = w.id and m.created_at > now() - interval '30 days') as m,
    (select count(*) from public.social_posts p where p.workspace_id = w.id and p.created_at > now() - interval '30 days') as p
  ) x
  where w.agency_id = p_agency and w.archived_at is null and private.is_agency_admin(p_agency)
  order by 4, w.name;
$$;
revoke all on function public.agency_people(uuid, integer), public.agency_progress(uuid) from public, anon;
grant execute on function public.agency_people(uuid, integer), public.agency_progress(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- 13. Row Level Security and grants for every new table
-- ---------------------------------------------------------------------------
alter table public.content_templates enable row level security;
alter table public.mailboxes enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.workspace_apps enable row level security;
alter table public.campaigns enable row level security;
alter table public.social_posts enable row level security;
alter table public.websites enable row level security;
alter table public.courses enable row level security;
alter table public.lessons enable row level security;
alter table public.community_posts enable row level security;
alter table public.learning_progress enable row level security;
alter table public.appointments enable row level security;
alter table public.payment_settings enable row level security;
alter table public.invoices enable row level security;
alter table public.thelma_requests enable row level security;

-- Standard sub-account records: read = anyone in the sub-account, write = member+, delete = admin.
do $$
declare t text;
begin
  foreach t in array array['content_templates','conversations','campaigns','social_posts','websites',
                           'courses','lessons','appointments','invoices'] loop
    execute format('create policy "%1$s: read" on public.%1$I for select to authenticated using (private.can_read_ws(workspace_id))', t);
    execute format('create policy "%1$s: insert" on public.%1$I for insert to authenticated with check (private.can_write_ws(workspace_id))', t);
    execute format('create policy "%1$s: update" on public.%1$I for update to authenticated using (private.can_write_ws(workspace_id)) with check (private.can_write_ws(workspace_id))', t);
    execute format('create policy "%1$s: delete" on public.%1$I for delete to authenticated using (private.can_admin_ws(workspace_id))', t);
  end loop;
end $$;

-- Mailboxes: everyone in the sub-account sees them; admins rename/assign and add or remove extras.
create policy "mailboxes: read" on public.mailboxes for select to authenticated using (private.can_read_ws(workspace_id));
create policy "mailboxes: admins add extras" on public.mailboxes for insert to authenticated
  with check (private.can_admin_ws(workspace_id) and slot = 'extra' and status = 'reserved');
create policy "mailboxes: admins update" on public.mailboxes for update to authenticated
  using (private.can_admin_ws(workspace_id)) with check (private.can_admin_ws(workspace_id));
create policy "mailboxes: admins remove extras" on public.mailboxes for delete to authenticated
  using (private.can_admin_ws(workspace_id) and slot = 'extra');

-- Messages: read in the sub-account; write internal notes / queue outbound (never inbound).
create policy "messages: read" on public.messages for select to authenticated using (private.can_read_ws(workspace_id));
create policy "messages: write" on public.messages for insert to authenticated
  with check (private.can_write_ws(workspace_id) and direction <> 'inbound');

-- App connectors: admins may switch off or request; never mark connected.
create policy "workspace_apps: read" on public.workspace_apps for select to authenticated using (private.can_read_ws(workspace_id));
create policy "workspace_apps: admins request" on public.workspace_apps for insert to authenticated
  with check (private.can_admin_ws(workspace_id) and status in ('off', 'requested')
              and private.ws_has_feature(workspace_id, private.app_feature(app)));
create policy "workspace_apps: admins change" on public.workspace_apps for update to authenticated
  using (private.can_admin_ws(workspace_id))
  with check (private.can_admin_ws(workspace_id) and status in ('off', 'requested')
              and private.ws_has_feature(workspace_id, private.app_feature(app)));

-- Community: everyone reads; members post; authors or admins remove.
create policy "community_posts: read" on public.community_posts for select to authenticated using (private.can_read_ws(workspace_id));
create policy "community_posts: post" on public.community_posts for insert to authenticated
  with check (private.can_write_ws(workspace_id) and author_id = (select auth.uid()));
create policy "community_posts: pin" on public.community_posts for update to authenticated
  using (private.can_admin_ws(workspace_id)) with check (private.can_admin_ws(workspace_id));
create policy "community_posts: remove" on public.community_posts for delete to authenticated
  using (author_id = (select auth.uid()) or private.can_admin_ws(workspace_id));

-- Learning progress: your own rows only.
create policy "learning_progress: own" on public.learning_progress for all to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

-- Payment settings: the agency team reads; changes go through set_payment_settings only.
create policy "payment_settings: team reads" on public.payment_settings for select to authenticated
  using (private.is_agency_admin(agency_id));

-- T.H.E.L.M.A. requests: Owner, agency admins and backup admin read; nobody writes directly.
create policy "thelma_requests: team admins read" on public.thelma_requests for select to authenticated
  using (private.is_agency_admin(agency_id));

grant select, insert, update, delete on public.content_templates, public.conversations, public.campaigns,
  public.social_posts, public.websites, public.courses, public.lessons, public.appointments, public.invoices,
  public.community_posts to authenticated;
grant select, insert, update, delete on public.mailboxes to authenticated;
revoke update on public.mailboxes from authenticated;
grant update (display_name, assigned_user) on public.mailboxes to authenticated;
grant select, insert on public.messages to authenticated;
grant select, insert, update on public.workspace_apps to authenticated;
revoke update on public.workspace_apps from authenticated;
grant update (status, account_label) on public.workspace_apps to authenticated;
grant select, insert, delete on public.learning_progress to authenticated;
grant select on public.payment_settings, public.thelma_requests to authenticated;
-- Delivery fields are never editable by people.
revoke update on public.websites from authenticated;
grant update (name, domain, kit, outline, status) on public.websites to authenticated;
revoke update on public.campaigns from authenticated;
grant update (name, channel, objective, budget, starts_on, ends_on, headline, ad_text, utm_campaign, status)
  on public.campaigns to authenticated;
revoke update on public.social_posts from authenticated;
grant update (campaign_id, platforms, body, media_note, scheduled_at, status) on public.social_posts to authenticated;
revoke update on public.invoices from authenticated;
grant update (contact_id, description, amount, due_on, status, paid_method) on public.invoices to authenticated;
revoke update on public.community_posts from authenticated;
grant update (pinned) on public.community_posts to authenticated;
