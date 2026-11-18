-- Tenant-isolation test suite for the Standalone CRM.
-- Runs in ONE transaction and ends with ROLLBACK, so it leaves no data behind.
-- Any failed expectation raises an exception and stops the run.
--
-- Actors
--   Owner A  -> agency A with sub-accounts A1 and A2
--   Client C -> login for A1 only (role: member)
--   Viewer V -> login for A1 only (role: viewer)
--   Owner B  -> agency B with sub-account B1
--   Assistant S -> agency A team member (role: assistant)
--   Backup G    -> agency A backup admin;  New Owner H -> takes over agency A by hand-off
begin;

insert into auth.users (id, email, raw_user_meta_data) values
  ('00000000-0000-4000-a000-00000000000a', 'rls-owner-a@test.invalid',  '{"full_name":"Owner A"}'),
  ('00000000-0000-4000-a000-00000000000b', 'rls-owner-b@test.invalid',  '{"full_name":"Owner B"}'),
  ('00000000-0000-4000-a000-00000000000c', 'rls-client-c@test.invalid', '{"full_name":"Client C"}'),
  ('00000000-0000-4000-a000-00000000000d', 'rls-viewer-v@test.invalid', '{"full_name":"Viewer V"}'),
  ('00000000-0000-4000-a000-00000000000e', 'rls-assistant-s@test.invalid', '{"full_name":"Assistant S"}');

create temp table t_ids (k text primary key, v uuid);
grant all on t_ids to authenticated, anon;

create function pg_temp.act(uid text) returns void language plpgsql as $$
begin
  perform set_config('request.jwt.claims', json_build_object('sub', uid, 'role', 'authenticated')::text, true);
  execute 'set local role authenticated';
end $$;

create function pg_temp.id(key text) returns uuid language sql as $$ select v from t_ids where k = key $$;

create function pg_temp.expect_denied(label text, stmt text) returns void language plpgsql as $$
declare n bigint;
begin
  begin
    execute stmt;
    get diagnostics n = row_count;
  exception when others then
    raise notice 'PASS (blocked by error) %: %', label, sqlerrm;
    return;
  end;
  if n > 0 then
    raise exception 'FAIL %: statement affected % row(s) but should have been denied', label, n;
  end if;
  raise notice 'PASS (0 rows) %', label;
end $$;

create function pg_temp.expect_count(label text, q text, expected bigint) returns void language plpgsql as $$
declare got bigint;
begin
  execute 'select count(*) from (' || q || ') s' into got;
  if got <> expected then
    raise exception 'FAIL %: expected % row(s), got %', label, expected, got;
  end if;
  raise notice 'PASS %: % row(s)', label, got;
end $$;


-- ===== Owner A builds an agency with two sub-accounts =====
select pg_temp.act('00000000-0000-4000-a000-00000000000a');
insert into t_ids values ('agA', public.bootstrap_agency('Agency A'));
insert into t_ids values ('A1', public.create_workspace(pg_temp.id('agA'), 'Client A1'));
insert into t_ids values ('A2', public.create_workspace(pg_temp.id('agA'), 'Client A2'));
with x as (insert into public.contacts (workspace_id, first_name, email)
  values (pg_temp.id('A1'), 'Alice', 'alice@a1.test') returning id)
insert into t_ids select 'cA1', id from x;
with x as (insert into public.contacts (workspace_id, first_name) values (pg_temp.id('A2'), 'Andy') returning id)
insert into t_ids select 'cA2', id from x;
select pg_temp.expect_count('A sees own 2 sub-accounts', 'select 1 from public.workspaces', 2);
select pg_temp.expect_count('A sees contacts in A1+A2', 'select 1 from public.contacts', 2);
select pg_temp.expect_count('audit rows written by trigger', 'select 1 from public.activities where entity_type = ''contact''', 2);

-- ===== Owner B builds a separate agency =====
reset role;
select pg_temp.act('00000000-0000-4000-a000-00000000000b');
insert into t_ids values ('agB', public.bootstrap_agency('Agency B'));
insert into t_ids values ('B1', public.create_workspace(pg_temp.id('agB'), 'Client B1'));
with x as (insert into public.contacts (workspace_id, first_name) values (pg_temp.id('B1'), 'Bob') returning id)
insert into t_ids select 'cB1', id from x;
insert into t_ids select 'plB1', id from public.pipelines where workspace_id = pg_temp.id('B1');
insert into t_ids select 'stB1', id from public.pipeline_stages where workspace_id = pg_temp.id('B1') and position = 0;

-- ===== Logins C (member) and V (viewer) are added to A1 (simulates the Edge Function / service role) =====
reset role;
insert into public.workspace_members (workspace_id, user_id, role) values
  (pg_temp.id('A1'), '00000000-0000-4000-a000-00000000000c', 'member'),
  (pg_temp.id('A1'), '00000000-0000-4000-a000-00000000000d', 'viewer');

-- ===== Owner B cannot see or touch agency A =====
select pg_temp.act('00000000-0000-4000-a000-00000000000b');
select pg_temp.expect_count('B sees only B1', 'select 1 from public.workspaces', 1);
select pg_temp.expect_count('B sees no A contacts', 'select 1 from public.contacts where workspace_id <> ''' || pg_temp.id('B1') || '''', 0);
select pg_temp.expect_count('B sees no A agency', 'select 1 from public.agencies where id = ''' || pg_temp.id('agA') || '''', 0);
select pg_temp.expect_count('B sees no A activity', 'select 1 from public.activities where workspace_id = ''' || pg_temp.id('A1') || '''', 0);
select pg_temp.expect_count('B sees no A profiles', 'select 1 from public.profiles where id = ''00000000-0000-4000-a000-00000000000a''', 0);
select pg_temp.expect_denied('B inserts contact into A1',
  format('insert into public.contacts (workspace_id, first_name) values (%L, %L)', pg_temp.id('A1'), 'Mallory'));
select pg_temp.expect_denied('B updates A1 contact',
  format('update public.contacts set first_name = %L where id = %L', 'Hacked', pg_temp.id('cA1')));
select pg_temp.expect_denied('B deletes A1 contact',
  format('delete from public.contacts where id = %L', pg_temp.id('cA1')));
select pg_temp.expect_denied('B renames sub-account A1',
  format('update public.workspaces set name = %L where id = %L', 'Hacked', pg_temp.id('A1')));
select pg_temp.expect_denied('B creates sub-account in agency A',
  format('select public.create_workspace(%L, %L)', pg_temp.id('agA'), 'Sneaky'));
select pg_temp.expect_denied('B deletes sub-account A1 (optional RPC)',
  format('select case when to_regprocedure(''public.delete_workspace(uuid,text)'') is null then null else 1 end; select public.delete_workspace(%L, %L)', pg_temp.id('A1'), 'Client A1'));
select pg_temp.expect_denied('B links own deal to A1 contact (cross-tenant FK)',
  format('insert into public.deals (workspace_id, pipeline_id, stage_id, contact_id, title) values (%L, %L, %L, %L, %L)',
    pg_temp.id('B1'), pg_temp.id('plB1'), pg_temp.id('stB1'), pg_temp.id('cA1'), 'Cross link'));
select pg_temp.expect_denied('B moves own contact into A1',
  format('update public.contacts set workspace_id = %L where id = %L', pg_temp.id('A1'), pg_temp.id('cB1')));
select pg_temp.expect_denied('B adds self to A1 membership',
  format('insert into public.workspace_members (workspace_id, user_id, role) values (%L, %L, %L)',
    pg_temp.id('A1'), '00000000-0000-4000-a000-00000000000b', 'admin'));
select pg_temp.expect_denied('B writes to audit log',
  format('insert into public.activities (workspace_id, entity_type, event_type, summary) values (%L, %L, %L, %L)',
    pg_temp.id('A1'), 'contact', 'fake', 'fake'));

-- ===== Client C (member of A1) is confined to A1 =====
reset role;
select pg_temp.act('00000000-0000-4000-a000-00000000000c');
select pg_temp.expect_count('C sees only A1', 'select 1 from public.workspaces', 1);
select pg_temp.expect_count('C sees only A1 contacts', 'select 1 from public.contacts', 1);
select pg_temp.expect_count('C cannot see agency', 'select 1 from public.agencies', 0);
select pg_temp.expect_count('C cannot see agency_overview of A2',
  format('select 1 from public.agency_overview(%L) where workspace_id = %L', pg_temp.id('agA'), pg_temp.id('A2')), 0);
insert into public.contacts (workspace_id, first_name) values (pg_temp.id('A1'), 'Carla');
select pg_temp.expect_count('C can create in A1', 'select 1 from public.contacts', 2);
select pg_temp.expect_denied('C inserts into A2',
  format('insert into public.contacts (workspace_id, first_name) values (%L, %L)', pg_temp.id('A2'), 'Nope'));
select pg_temp.expect_denied('C updates A2 contact',
  format('update public.contacts set last_name = %L where id = %L', 'x', pg_temp.id('cA2')));
select pg_temp.expect_denied('C (member) hard-deletes A1 contact',
  format('delete from public.contacts where id = %L', pg_temp.id('cA1')));
select pg_temp.expect_denied('C promotes self to admin',
  format('update public.workspace_members set role = %L where user_id = %L', 'admin', '00000000-0000-4000-a000-00000000000c'));
select pg_temp.expect_denied('C creates an agency',
  format('select public.bootstrap_agency(%L)', 'Rogue agency'));
select pg_temp.expect_denied('C rewrites audit history',
  'update public.activities set summary = ''rewritten''');
select pg_temp.expect_denied('C deletes audit history',
  'delete from public.activities');

-- ===== Viewer V is read-only in A1 =====
reset role;
select pg_temp.act('00000000-0000-4000-a000-00000000000d');
select pg_temp.expect_count('V reads A1 contacts', 'select 1 from public.contacts', 2);
select pg_temp.expect_denied('V inserts contact',
  format('insert into public.contacts (workspace_id, first_name) values (%L, %L)', pg_temp.id('A1'), 'Nope'));
select pg_temp.expect_denied('V updates contact',
  format('update public.contacts set first_name = %L where id = %L', 'Nope', pg_temp.id('cA1')));

-- ===== Assistant S (agency A team, role assistant) works in every A sub-account as a member =====
reset role;
insert into public.agency_members (agency_id, user_id, role) values (pg_temp.id('agA'), '00000000-0000-4000-a000-00000000000e', 'assistant');
select pg_temp.act('00000000-0000-4000-a000-00000000000e');
select pg_temp.expect_count('S sees both A sub-accounts', 'select 1 from public.workspaces', 2);
select pg_temp.expect_count('S sees agency A', 'select 1 from public.agencies', 1);
select pg_temp.expect_count('S role is member', format('select 1 where public.my_workspace_role(%L) = ''member''', pg_temp.id('A2')), 1);
insert into public.contacts (workspace_id, first_name) values (pg_temp.id('A2'), 'Sam');
select pg_temp.expect_denied('S creates a sub-account',
  format('select public.create_workspace(%L, %L)', pg_temp.id('agA'), 'Nope'));
select pg_temp.expect_denied('S renames agency A',
  format('update public.agencies set name = %L where id = %L', 'Hacked', pg_temp.id('agA')));
select pg_temp.expect_denied('S hard-deletes a contact',
  format('delete from public.contacts where id = %L', pg_temp.id('cA2')));
select pg_temp.expect_denied('S renames sub-account A1',
  format('update public.workspaces set name = %L where id = %L', 'Hacked', pg_temp.id('A1')));
select pg_temp.expect_count('S sees nothing of agency B', format('select 1 from public.workspaces where id = %L', pg_temp.id('B1')), 0);
select pg_temp.expect_denied('S promotes self to admin',
  format('update public.agency_members set role = %L where user_id = %L', 'admin', '00000000-0000-4000-a000-00000000000e'));

-- ===== Anonymous visitors get nothing =====
reset role;
select set_config('request.jwt.claims', '', true);
set local role anon;
select pg_temp.expect_denied('anon reads contacts', 'select * from public.contacts');
select pg_temp.expect_denied('anon calls create_workspace',
  format('select public.create_workspace(%L, %L)', pg_temp.id('agA'), 'anon'));

-- ===== 75 sub-account cap =====
reset role;
update public.agencies set max_workspaces = 3 where id = pg_temp.id('agA');
select pg_temp.act('00000000-0000-4000-a000-00000000000a');
insert into t_ids values ('A3', public.create_workspace(pg_temp.id('agA'), 'Client A3', null, 'America/Chicago', 'real_estate'));
select pg_temp.expect_count('real-estate starter stages', format('select 1 from public.pipeline_stages where workspace_id = %L and position = 1 and name = ''Showing''', pg_temp.id('A3')), 1);
select pg_temp.expect_count('real-estate starter tags', format('select 1 from public.workspaces where id = %L and ''buyer'' = any(suggested_tags)', pg_temp.id('A3')), 1);
select pg_temp.expect_denied('unknown starter setup',
  format('select public.create_workspace(%L, %L, null, %L, %L)', pg_temp.id('agA'), 'Bad', 'America/Chicago', 'casino'));
select pg_temp.expect_denied('cap blocks sub-account #4',
  format('select public.create_workspace(%L, %L)', pg_temp.id('agA'), 'Client A4'));

-- ===== Archive hides nothing from RLS but blocks nothing either; owner can archive =====
update public.workspaces set archived_at = now() where id = pg_temp.id('A2');
select pg_temp.expect_count('owner archived A2', format('select 1 from public.workspaces where id = %L and archived_at is not null', pg_temp.id('A2')), 1);

-- ===== Won deals get a closed date; owner numbers load =====
insert into t_ids select 'plA1', id from public.pipelines where workspace_id = pg_temp.id('A1');
insert into t_ids select 'stA1', id from public.pipeline_stages where workspace_id = pg_temp.id('A1') and position = 4;
with x as (insert into public.deals (workspace_id, pipeline_id, stage_id, title, amount)
  values (pg_temp.id('A1'), pg_temp.id('plA1'), pg_temp.id('stA1'), 'Big win', 1200) returning id)
insert into t_ids select 'dA1', id from x;
update public.deals set status = 'won' where id = pg_temp.id('dA1');
select pg_temp.expect_count('won deal has closed_at', format('select 1 from public.deals where id = %L and closed_at is not null', pg_temp.id('dA1')), 1);
select pg_temp.expect_count('won this month shows', format('select 1 from public.agency_overview(%L) where workspace_id = %L and won_month = 1200', pg_temp.id('agA'), pg_temp.id('A1')), 1);
insert into public.tasks (workspace_id, title, due_at) values (pg_temp.id('A1'), 'Overdue call', now() - interval '3 days');
select pg_temp.expect_count('cross-client due list', format('select 1 from public.agency_due_tasks(%L) where overdue', pg_temp.id('agA')), 1);

-- ===== CSV import: duplicates and blanks skipped; other sub-accounts and viewers blocked =====
reset role;
select pg_temp.act('00000000-0000-4000-a000-00000000000c');
select pg_temp.expect_count('C imports 1 of 3 rows',
  format('select 1 from public.import_contacts(%L, %L::jsonb) where inserted = 1 and skipped = 2', pg_temp.id('A1'),
    '[{"first_name":"Ivy","email":"ivy@a1.test","tags":["csv"]},{"first_name":"Al","email":"ALICE@a1.test"},{"first_name":"","email":"x@a1.test"}]'), 1);
select pg_temp.expect_denied('C imports into A2',
  format('select * from public.import_contacts(%L, %L::jsonb)', pg_temp.id('A2'), '[{"first_name":"Nope"}]'));
reset role;
select pg_temp.act('00000000-0000-4000-a000-00000000000d');
select pg_temp.expect_denied('V (viewer) imports',
  format('select * from public.import_contacts(%L, %L::jsonb)', pg_temp.id('A1'), '[{"first_name":"Nope"}]'));

-- ===== v3.1: backup admin, required two-step, connections vault, hand-off, sign-in switches =====
reset role;
insert into auth.users (id, email, raw_user_meta_data) values
  ('00000000-0000-4000-a000-00000000000f', 'rls-backup-g@test.invalid', '{"full_name":"Backup G"}'),
  ('00000000-0000-4000-a000-000000000010', 'rls-newowner-h@test.invalid', '{"full_name":"New Owner H"}');
insert into public.agency_members (agency_id, user_id, role)
  values (pg_temp.id('agA'), '00000000-0000-4000-a000-00000000000f', 'backup');

create function pg_temp.act2(uid text) returns void language plpgsql as $$
begin
  perform set_config('request.jwt.claims', json_build_object('sub', uid, 'role', 'authenticated', 'aal', 'aal2')::text, true);
  execute 'set local role authenticated';
end $$;

select pg_temp.act('00000000-0000-4000-a000-00000000000f');
select pg_temp.expect_count('backup admin opens every A sub-account', 'select 1 from public.workspaces', 3);
select pg_temp.expect_count('backup admin has full agency access in A1',
  format('select 1 from (select public.my_workspace_role(%L) r) x where r = ''agency''', pg_temp.id('A1')), 1);
select pg_temp.expect_count('backup admin sees nothing of agency B', format('select 1 from public.workspaces where id = %L', pg_temp.id('B1')), 0);

-- Owner A turns on two-step: a session without the code (aal1) loses access; with the code (aal2) it returns.
reset role;
insert into auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at)
  values (gen_random_uuid(), '00000000-0000-4000-a000-00000000000a', 'rls-test', 'totp', 'verified', now(), now());
select pg_temp.act('00000000-0000-4000-a000-00000000000a');
select pg_temp.expect_count('owner without two-step code sees no sub-accounts', 'select 1 from public.workspaces', 0);
select pg_temp.expect_count('owner without two-step code reads no contacts', 'select 1 from public.contacts', 0);
select pg_temp.expect_denied('owner without two-step code creates a sub-account',
  format('select public.create_workspace(%L, %L)', pg_temp.id('agA'), 'No code'));
reset role;
select pg_temp.act2('00000000-0000-4000-a000-00000000000a');
select pg_temp.expect_count('owner with two-step code sees sub-accounts again', 'select 1 from public.workspaces', 3);

-- Connections vault
select pg_temp.expect_count('owner saves 2 connections',
  format('select 1 from (select public.save_connections(%L, %L::jsonb) n) x where n = 2', pg_temp.id('agA'),
    '[{"name":"Google sign-in","kind":"oauth","provider":"google","client_id":"abc.apps.googleusercontent.com","secrets":{"client_secret":"GOCSPX-supersecret-1234"}},
      {"name":"Reporting API","kind":"api_key","provider":"other","site":"https://api.example.com","secrets":{"api_key":"[secret value withheld]"}}]'), 1);
select pg_temp.expect_count('owner sees only masked hints',
  'select 1 from public.agency_connections where secret_hints ->> ''client_secret'' = ''••••1234''', 1);
select pg_temp.expect_count('no plain key in the visible table',
  'select 1 from public.agency_connections where secret_hints::text like ''%supersecret%'' or settings::text like ''%supersecret%''', 0);
select pg_temp.expect_denied('owner reads the vault directly', 'select * from vault.decrypted_secrets');
select pg_temp.expect_denied('owner reads raw secret refs', 'select * from private.connection_secrets');
select pg_temp.expect_denied('owner calls the service-only key reader',
  format('select public.connections_for_apply(%L)', pg_temp.id('agA')));
select pg_temp.expect_denied('owner completes a hand-off directly',
  format('select public.complete_handoff(%L, %L)', gen_random_uuid(), '00000000-0000-4000-a000-000000000010'));
select pg_temp.expect_denied('owner writes the connections table directly',
  format('insert into public.agency_connections (agency_id, name, kind, provider) values (%L, %L, %L, %L)', pg_temp.id('agA'), 'x', 'oauth', 'google'));
select pg_temp.expect_count('owner switches Apple on', format('select 1 from (select public.set_paid_signin(%L, %L, true)) x', pg_temp.id('agA'), 'apple'), 1);
reset role;
insert into t_ids select 'connA', id from public.agency_connections where name = 'Reporting API';
select pg_temp.act('00000000-0000-4000-a000-00000000000e');
select pg_temp.expect_count('assistant sees no connections', 'select 1 from public.agency_connections', 0);
select pg_temp.expect_denied('assistant saves a connection',
  format('select public.save_connections(%L, %L::jsonb)', pg_temp.id('agA'), '[{"name":"x","kind":"api_key","provider":"other"}]'));
select pg_temp.expect_denied('assistant switches phone sign-in on',
  format('select public.set_paid_signin(%L, %L, true)', pg_temp.id('agA'), 'phone'));
reset role;
select pg_temp.act('00000000-0000-4000-a000-00000000000b');
select pg_temp.expect_count('owner B sees none of A''s connections', 'select 1 from public.agency_connections', 0);
select pg_temp.expect_denied('owner B deletes A''s connection',
  format('select public.remove_connection(%L)', pg_temp.id('connA')));
reset role;
select pg_temp.act('00000000-0000-4000-a000-00000000000c');
select pg_temp.expect_denied('client login saves a connection',
  format('select public.save_connections(%L, %L::jsonb)', pg_temp.id('agA'), '[{"name":"x","kind":"api_key","provider":"other"}]'));
select pg_temp.expect_count('client login gets the team look', 'select 1 from (select public.my_default_theme() t) x where t = ''paper''', 1);
reset role;
select set_config('request.jwt.claims', '', true);
set local role anon;
select pg_temp.expect_count('login page reads sign-in switches (Apple on)', 'select 1 from (select public.signin_options() o) x where (o ->> ''apple'')::boolean', 1);
select pg_temp.expect_denied('anon reads connections', 'select * from public.agency_connections');
select pg_temp.expect_denied('anon saves a connection',
  format('select public.save_connections(%L, %L::jsonb)', pg_temp.id('agA'), '[{"name":"x","kind":"api_key","provider":"other"}]'));

-- Service role (here: the test superuser) reads keys for the Edge Function, and deleting a connection destroys its keys.
reset role;
select pg_temp.expect_count('service role reads the decrypted key',
  format('select 1 from jsonb_array_elements(public.connections_for_apply(%L)) e where e -> ''secrets'' ->> ''client_secret'' = ''GOCSPX-supersecret-1234''', pg_temp.id('agA')), 1);
select pg_temp.act2('00000000-0000-4000-a000-00000000000a');
select public.remove_connection((select id from public.agency_connections where name = 'Google sign-in'));
reset role;
select pg_temp.expect_count('removed connection''s key is destroyed in the vault', 'select 1 from vault.secrets where secret = ''GOCSPX-supersecret-1234''', 0);
select pg_temp.expect_count('removed connection gives no keys to the service role',
  format('select 1 from jsonb_array_elements(public.connections_for_apply(%L)) e where e ->> ''name'' = ''Google sign-in''', pg_temp.id('agA')), 0);

-- Hand-off: H becomes Owner, A steps back to backup admin, still exactly one Owner.
insert into public.agency_handoffs (agency_id, from_user, to_user, to_email)
  values (pg_temp.id('agA'), '00000000-0000-4000-a000-00000000000a', '00000000-0000-4000-a000-000000000010', 'rls-newowner-h@test.invalid');
select pg_temp.expect_denied('hand-off cannot be accepted by the wrong person',
  format('select public.complete_handoff(%L, %L)', (select id from public.agency_handoffs where status = 'pending'), '00000000-0000-4000-a000-00000000000c'));
select public.complete_handoff((select id from public.agency_handoffs where status = 'pending'), '00000000-0000-4000-a000-000000000010');
select pg_temp.expect_count('new owner is Owner', format('select 1 from public.agency_members where agency_id = %L and user_id = %L and role = ''owner''', pg_temp.id('agA'), '00000000-0000-4000-a000-000000000010'), 1);
select pg_temp.expect_count('old owner is backup admin', format('select 1 from public.agency_members where agency_id = %L and user_id = %L and role = ''backup''', pg_temp.id('agA'), '00000000-0000-4000-a000-00000000000a'), 1);
select pg_temp.expect_count('exactly one Owner after hand-off', format('select 1 from public.agency_members where agency_id = %L and role = ''owner''', pg_temp.id('agA')), 1);
select pg_temp.expect_denied('hand-off cannot be accepted twice',
  format('select public.complete_handoff(%L, %L)', (select id from public.agency_handoffs limit 1), '00000000-0000-4000-a000-000000000010'));
select pg_temp.act('00000000-0000-4000-a000-000000000010');
select pg_temp.expect_count('new owner opens every A sub-account', 'select 1 from public.workspaces', 3);

-- T.H.E.L.M.A. AI Fail Safe: release codes are invisible to every signed-in person, even the Owner.
select pg_temp.expect_denied('owner reads release codes', 'select * from public.backup_release_codes');
select pg_temp.expect_denied('owner removes the backup admin directly',
  format('delete from public.agency_members where user_id = %L', '00000000-0000-4000-a000-00000000000a'));

reset role;
select 'ALL RLS ISOLATION TESTS PASSED' as result;
rollback;
