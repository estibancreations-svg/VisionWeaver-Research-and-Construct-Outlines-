-- v4.2 scoring + lists: every contact carries a live score (0–100) from signals already
-- in the database, and saved lists (smart segments) gather contacts by score, status,
-- tags and deal activity. No providers, no keys, no spend.
--
-- Scores stay transparent: each workspace has scoring rules (signal → points) the team
-- can edit, scores are capped at 0–100, and the contact page shows exactly which
-- signals matched. Bands: hot 70+, warm 40–69, cold under 40. Signals stack.
-- Lists are computed fresh on every view — never stale, never hand-maintained.
--
-- No trigger changes to existing tables' behavior except one guard: score-only contact
-- updates no longer write History rows (see the log_activity replacement below).

-- ---------------------------------------------------------------------------
-- 1. Score columns on the contact.
-- ---------------------------------------------------------------------------
alter table public.contacts
  add column if not exists score integer not null default 0 check (score between 0 and 100),
  add column if not exists score_band text not null default 'cold' check (score_band in ('hot', 'warm', 'cold')),
  add column if not exists score_updated_at timestamptz;

-- ---------------------------------------------------------------------------
-- 2. Scoring rules: one row per signal per sub-account. Points may be negative.
-- ---------------------------------------------------------------------------
create table public.scoring_rules (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  signal text not null check (signal in ('has_email', 'has_phone', 'has_company', 'has_title',
    'status_qualified', 'status_customer', 'status_inactive', 'replied', 'recent_reply',
    'open_deal', 'deal_won', 'high_probability', 'appointment_done', 'task_done', 'no_activity_90d')),
  label text not null check (length(trim(label)) between 1 and 80),
  points integer not null default 0 check (points between -100 and 100),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, signal)
);
create index if not exists scoring_rules_ws_idx on public.scoring_rules (workspace_id);

-- ---------------------------------------------------------------------------
-- 3. Saved lists. Filters are plain JSON; unknown keys are ignored when read:
--    { status: [...], tags: [...], tags_match: "any"|"all", source: "...",
--      min_score: 0-100, band: "hot"|"warm"|"cold", has_open_deal: bool, has_company: bool }
-- ---------------------------------------------------------------------------
create table public.contact_lists (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null check (length(trim(name)) between 1 and 80),
  filters jsonb not null default '{}'::jsonb check (jsonb_typeof(filters) = 'object' and length(filters::text) <= 2000),
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, name)
);
create index if not exists contact_lists_ws_idx on public.contact_lists (workspace_id);

-- Same access as the other CRM record tables: members read, writers change, admins delete.
alter table public.scoring_rules enable row level security;
alter table public.contact_lists enable row level security;
do $$
declare t text;
begin
  foreach t in array array['scoring_rules','contact_lists'] loop
    execute format('create policy "%1$s: read" on public.%1$I for select to authenticated using (private.can_read_ws(workspace_id))', t);
    execute format('create policy "%1$s: insert" on public.%1$I for insert to authenticated with check (private.can_write_ws(workspace_id))', t);
    execute format('create policy "%1$s: update" on public.%1$I for update to authenticated using (private.can_write_ws(workspace_id)) with check (private.can_write_ws(workspace_id))', t);
    execute format('create policy "%1$s: delete" on public.%1$I for delete to authenticated using (private.can_admin_ws(workspace_id))', t);
  end loop;
end $$;
grant select, insert, update, delete on public.scoring_rules, public.contact_lists to authenticated;
create trigger scoring_rules_touch before update on public.scoring_rules
  for each row execute function private.touch_updated_at();
create trigger contact_lists_touch before update on public.contact_lists
  for each row execute function private.touch_updated_at();

-- ---------------------------------------------------------------------------
-- 4. Default rules, seeded for every sub-account (new and existing).
-- ---------------------------------------------------------------------------
create or replace function private.seed_scoring_rules()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.scoring_rules (workspace_id, signal, label, points) values
    (new.id, 'has_email', 'Has an email address', 5),
    (new.id, 'has_phone', 'Has a phone number', 5),
    (new.id, 'has_company', 'Linked to a company', 5),
    (new.id, 'has_title', 'Has a job title', 5),
    (new.id, 'status_qualified', 'Marked qualified', 15),
    (new.id, 'status_customer', 'Is a customer', 20),
    (new.id, 'status_inactive', 'Marked inactive', -20),
    (new.id, 'replied', 'Replied to a message', 20),
    (new.id, 'recent_reply', 'Replied in the last 30 days', 10),
    (new.id, 'open_deal', 'Has an open deal', 15),
    (new.id, 'deal_won', 'Won a deal', 20),
    (new.id, 'high_probability', 'Deal at 70% or higher', 10),
    (new.id, 'appointment_done', 'Completed an appointment', 10),
    (new.id, 'task_done', 'Completed a task', 5),
    (new.id, 'no_activity_90d', 'No activity in 90 days', -15)
  on conflict (workspace_id, signal) do nothing;
  return new;
end $$;
create trigger workspaces_seed_scoring_rules after insert on public.workspaces
  for each row execute function private.seed_scoring_rules();
insert into public.scoring_rules (workspace_id, signal, label, points)
select w.id, r.signal, r.label, r.points from public.workspaces w
cross join (values
  ('has_email', 'Has an email address', 5),
  ('has_phone', 'Has a phone number', 5),
  ('has_company', 'Linked to a company', 5),
  ('has_title', 'Has a job title', 5),
  ('status_qualified', 'Marked qualified', 15),
  ('status_customer', 'Is a customer', 20),
  ('status_inactive', 'Marked inactive', -20),
  ('replied', 'Replied to a message', 20),
  ('recent_reply', 'Replied in the last 30 days', 10),
  ('open_deal', 'Has an open deal', 15),
  ('deal_won', 'Won a deal', 20),
  ('high_probability', 'Deal at 70% or higher', 10),
  ('appointment_done', 'Completed an appointment', 10),
  ('task_done', 'Completed a task', 5),
  ('no_activity_90d', 'No activity in 90 days', -15)
) r(signal, label, points)
on conflict (workspace_id, signal) do nothing;

-- ---------------------------------------------------------------------------
-- 5. Signal evaluation: one row per signal, matched or not. Every score read
--    (value, breakdown, triggers) goes through this one function — no copies.
-- ---------------------------------------------------------------------------
create or replace function private.score_signals(p_workspace uuid, p_contact uuid)
returns table (signal text, matched boolean)
language sql stable security definer set search_path = '' as $$
  with c as (
    select * from public.contacts where id = p_contact and workspace_id = p_workspace
  ),
  flags as (
    select
      (c.email is not null) as has_email,
      (c.phone is not null) as has_phone,
      (c.company_id is not null) as has_company,
      (c.title is not null and btrim(c.title) <> '') as has_title,
      (c.status = 'qualified') as status_qualified,
      (c.status = 'customer') as status_customer,
      (c.status = 'inactive') as status_inactive,
      exists (select 1 from public.messages m join public.conversations cv on cv.id = m.conversation_id
              where cv.contact_id = p_contact and cv.workspace_id = p_workspace and m.direction = 'inbound') as replied,
      exists (select 1 from public.messages m join public.conversations cv on cv.id = m.conversation_id
              where cv.contact_id = p_contact and cv.workspace_id = p_workspace and m.direction = 'inbound'
                and m.created_at >= now() - interval '30 days') as recent_reply,
      exists (select 1 from public.deals d where d.contact_id = p_contact and d.workspace_id = p_workspace
              and d.status = 'open' and d.archived_at is null) as open_deal,
      exists (select 1 from public.deals d where d.contact_id = p_contact and d.workspace_id = p_workspace
              and d.status = 'won' and d.archived_at is null) as deal_won,
      exists (select 1 from public.deals d join public.pipeline_stages s on s.id = d.stage_id
              where d.contact_id = p_contact and d.workspace_id = p_workspace and d.status = 'open'
                and d.archived_at is null and s.probability >= 70) as high_probability,
      exists (select 1 from public.appointments a where a.contact_id = p_contact and a.workspace_id = p_workspace
              and a.status = 'done') as appointment_done,
      exists (select 1 from public.tasks t where t.contact_id = p_contact and t.workspace_id = p_workspace
              and t.status = 'done' and t.archived_at is null) as task_done,
      (not exists (select 1 from public.conversations cv where cv.contact_id = p_contact and cv.workspace_id = p_workspace
                   and cv.last_message_at >= now() - interval '90 days')
       and not exists (select 1 from public.deals d where d.contact_id = p_contact and d.workspace_id = p_workspace
                       and d.status = 'open' and d.archived_at is null)
       and c.created_at < now() - interval '90 days') as no_activity_90d
    from c
  )
  select 'has_email', has_email from flags union all
  select 'has_phone', has_phone from flags union all
  select 'has_company', has_company from flags union all
  select 'has_title', has_title from flags union all
  select 'status_qualified', status_qualified from flags union all
  select 'status_customer', status_customer from flags union all
  select 'status_inactive', status_inactive from flags union all
  select 'replied', replied from flags union all
  select 'recent_reply', recent_reply from flags union all
  select 'open_deal', open_deal from flags union all
  select 'deal_won', deal_won from flags union all
  select 'high_probability', high_probability from flags union all
  select 'appointment_done', appointment_done from flags union all
  select 'task_done', task_done from flags union all
  select 'no_activity_90d', no_activity_90d from flags;
$$;
revoke all on function private.score_signals(uuid, uuid) from public, anon;
grant execute on function private.score_signals(uuid, uuid) to authenticated;

create or replace function private.contact_score_value(p_workspace uuid, p_contact uuid)
returns integer language sql stable security definer set search_path = '' as $$
  select least(100, greatest(0, coalesce((
    select sum(r.points) from public.scoring_rules r
    join private.score_signals(p_workspace, p_contact) s on s.signal = r.signal
    where r.workspace_id = p_workspace and r.active and s.matched
  ), 0)));
$$;
revoke all on function private.contact_score_value(uuid, uuid) from public, anon;
grant execute on function private.contact_score_value(uuid, uuid) to authenticated;

-- Recompute one contact's stored score + band. Score-only updates do not write
-- History rows (see the log_activity guard below) and do not re-fire the refresh
-- trigger (it watches only the signal columns).
create or replace function public.recompute_contact_score(p_contact uuid)
returns void language plpgsql security definer set search_path = '' as $$
declare v_ws uuid; v_score integer;
begin
  select workspace_id into v_ws from public.contacts where id = p_contact;
  if v_ws is null then return; end if;
  v_score := private.contact_score_value(v_ws, p_contact);
  update public.contacts set score = v_score,
    score_band = case when v_score >= 70 then 'hot' when v_score >= 40 then 'warm' else 'cold' end,
    score_updated_at = now()
  where id = p_contact;
end $$;

-- Recompute every contact in a sub-account (after rule edits, or on demand).
create or replace function public.recompute_workspace_scores(p_workspace uuid)
returns integer language plpgsql security definer set search_path = '' as $$
declare c record; n integer := 0;
begin
  if not private.can_write_ws(p_workspace) then
    raise exception 'Your login can view this sub-account but not change it.' using errcode = '42501';
  end if;
  for c in select id from public.contacts where workspace_id = p_workspace loop
    perform public.recompute_contact_score(c.id);
    n := n + 1;
  end loop;
  return n;
end $$;

-- Why this score? Active rules with their matched state, biggest points first.
create or replace function public.contact_score_breakdown(p_contact uuid)
returns table (signal text, label text, points integer, matched boolean)
language sql stable security definer set search_path = '' as $$
  select r.signal, r.label, r.points, coalesce(s.matched, false)
  from public.contacts c
  join public.scoring_rules r on r.workspace_id = c.workspace_id
  left join private.score_signals(c.workspace_id, c.id) s on s.signal = r.signal
  where c.id = p_contact and r.active and private.can_read_ws(c.workspace_id)
  order by r.points desc, r.signal;
$$;

-- A list's members, computed fresh: archived contacts never appear.
create or replace function public.list_contacts(p_list uuid)
returns setof public.contacts language plpgsql stable security definer set search_path = '' as $$
declare
  v_ws uuid; f jsonb;
  v_status text[]; v_tags text[]; v_tags_match text; v_source text; v_min integer; v_band text;
  v_open boolean := false; v_company boolean := false;
begin
  select workspace_id, filters into v_ws, f from public.contact_lists where id = p_list;
  if v_ws is null or not private.can_read_ws(v_ws) then return; end if;
  if jsonb_typeof(f) <> 'object' then f := '{}'::jsonb; end if;
  if jsonb_typeof(f -> 'status') = 'array' then
    select array_agg(x) into v_status from jsonb_array_elements_text(f -> 'status') x
     where x in ('lead', 'qualified', 'customer', 'inactive');
  end if;
  if jsonb_typeof(f -> 'tags') = 'array' then
    select array_agg(x) into v_tags from jsonb_array_elements_text(f -> 'tags') x where x <> '';
  end if;
  v_tags_match := case when f ->> 'tags_match' = 'all' then 'all' else 'any' end;
  v_source := nullif(f ->> 'source', '');
  v_min := case when (f ->> 'min_score') ~ '^[0-9]+$' then least((f ->> 'min_score')::integer, 100) else null end;
  v_band := case when f ->> 'band' in ('hot', 'warm', 'cold') then f ->> 'band' else null end;
  v_open := coalesce((f ->> 'has_open_deal') = 'true', false);
  v_company := coalesce((f ->> 'has_company') = 'true', false);
  return query
    select c.* from public.contacts c
    where c.workspace_id = v_ws and c.archived_at is null
      and (v_status is null or c.status = any(v_status))
      and (v_tags is null or case when v_tags_match = 'all' then c.tags @> v_tags else c.tags && v_tags end)
      and (v_source is null or c.source = v_source)
      and (v_min is null or c.score >= v_min)
      and (v_band is null or c.score_band = v_band)
      and (not v_open or exists (select 1 from public.deals d where d.contact_id = c.id and d.workspace_id = v_ws
                                 and d.status = 'open' and d.archived_at is null))
      and (not v_company or c.company_id is not null)
    order by c.score desc, c.created_at desc;
end $$;

revoke all on function public.recompute_contact_score(uuid), public.recompute_workspace_scores(uuid),
  public.contact_score_breakdown(uuid), public.list_contacts(uuid) from public, anon;
grant execute on function public.recompute_contact_score(uuid), public.recompute_workspace_scores(uuid),
  public.contact_score_breakdown(uuid), public.list_contacts(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- 6. Keep scores live. Each trigger recomputes only the affected contact.
--    The contacts trigger watches signal columns only, so a score write never
--    re-fires it.
-- ---------------------------------------------------------------------------
create or replace function private.refresh_contact_score()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  perform public.recompute_contact_score(new.id);
  return null;
end $$;
create trigger contacts_score_refresh after insert or update of email, phone, company_id, title, status
  on public.contacts for each row execute function private.refresh_contact_score();

create or replace function private.refresh_deal_contact_score()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if tg_op <> 'DELETE' and new.contact_id is not null then perform public.recompute_contact_score(new.contact_id); end if;
  if tg_op <> 'INSERT' and old.contact_id is not null and (tg_op = 'DELETE' or old.contact_id is distinct from new.contact_id) then
    perform public.recompute_contact_score(old.contact_id);
  end if;
  return null;
end $$;
create trigger deals_score_refresh after insert or update of contact_id, stage_id, status, archived_at or delete
  on public.deals for each row execute function private.refresh_deal_contact_score();

create or replace function private.refresh_message_contact_score()
returns trigger language plpgsql security definer set search_path = '' as $$
declare v_contact uuid;
begin
  if tg_op = 'DELETE' then
    select contact_id into v_contact from public.conversations where id = old.conversation_id;
  else
    select contact_id into v_contact from public.conversations where id = new.conversation_id;
  end if;
  if v_contact is not null then perform public.recompute_contact_score(v_contact); end if;
  return null;
end $$;
create trigger messages_score_refresh after insert or delete
  on public.messages for each row execute function private.refresh_message_contact_score();

create or replace function private.refresh_linked_contact_score()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if tg_op <> 'DELETE' and new.contact_id is not null then perform public.recompute_contact_score(new.contact_id); end if;
  if tg_op <> 'INSERT' and old.contact_id is not null and (tg_op = 'DELETE' or old.contact_id is distinct from new.contact_id) then
    perform public.recompute_contact_score(old.contact_id);
  end if;
  return null;
end $$;
create trigger appointments_score_refresh after insert or update of contact_id, status or delete
  on public.appointments for each row execute function private.refresh_linked_contact_score();
create trigger tasks_score_refresh after insert or update of contact_id, status or delete
  on public.tasks for each row execute function private.refresh_linked_contact_score();

-- Backfill: score every existing contact once, with the default rules.
do $$
declare c record;
begin
  for c in select id from public.contacts loop
    perform public.recompute_contact_score(c.id);
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- 7. History guard: score-only contact updates are system bookkeeping, not
--    activity. This is the migration-02 log_activity body unchanged except for
--    the skip guard below — every other event still writes its History row.
-- ---------------------------------------------------------------------------
create or replace function private.log_activity()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  ent text := tg_argv[0];
  r jsonb;
  o jsonb := '{}'::jsonb;
  label text;
  evt text;
begin
  if tg_op = 'DELETE' then r := to_jsonb(old); else r := to_jsonb(new); end if;
  if tg_op = 'UPDATE' then o := to_jsonb(old); end if;

  -- Skip the audit row when only the score columns (and updated_at) changed.
  if tg_op = 'UPDATE' and ent = 'contact'
     and (o - 'score' - 'score_band' - 'score_updated_at' - 'updated_at')
       = (r - 'score' - 'score_band' - 'score_updated_at' - 'updated_at') then
    return null;
  end if;

  label := case ent
    when 'contact' then trim(coalesce(r->>'first_name', '') || ' ' || coalesce(r->>'last_name', ''))
    when 'company' then r->>'name'
    when 'note' then left(r->>'body', 60)
    else r->>'title'
  end;

  evt := case
    when tg_op = 'INSERT' then 'created'
    when tg_op = 'DELETE' then 'deleted'
    when (o->>'archived_at') is null and (r->>'archived_at') is not null then 'archived'
    when (o->>'archived_at') is not null and (r->>'archived_at') is null then 'restored'
    when ent = 'deal' and (o->>'stage_id') is distinct from (r->>'stage_id') then 'stage_changed'
    when ent in ('deal','task') and (o->>'status') is distinct from (r->>'status') then 'status_' || (r->>'status')
    else 'updated'
  end;

  -- Skip the audit row when the parent sub-account itself is being deleted (cascade).
  if tg_op = 'DELETE' and not exists (select 1 from public.workspaces w where w.id = (r->>'workspace_id')::uuid) then
    return null;
  end if;

  insert into public.activities (workspace_id, entity_type, entity_id, actor_id, event_type, summary)
  values ((r->>'workspace_id')::uuid, ent,
          case when tg_op = 'DELETE' then null else (r->>'id')::uuid end,
          (select auth.uid()), evt,
          initcap(ent) || ' ' || replace(evt, '_', ' ') || ': ' || coalesce(label, ''));
  return null;
end $$;
