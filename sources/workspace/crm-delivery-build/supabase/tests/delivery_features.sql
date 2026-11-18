-- v4.1 delivery suite. Runs in ONE transaction and ends with ROLLBACK.
-- Covers: the Owner's delivery switch (Owner copy stays off), the vault keys RPC
-- (service role only), the append-only usage log, opt-out defaults, and that
-- agency B can never see agency A's delivery rows.
begin;

insert into auth.users (id, email, raw_user_meta_data) values
  ('00000000-0000-4000-d000-00000000000a', 'd-owner-a@test.invalid',  '{"full_name":"Owner A"}'),
  ('00000000-0000-4000-d000-00000000000b', 'd-owner-b@test.invalid',  '{"full_name":"Owner B"}'),
  ('00000000-0000-4000-d000-00000000000c', 'd-member-c@test.invalid', '{"full_name":"Member C"}');

create temp table t_ids (k text primary key, v uuid);
grant all on t_ids to authenticated, anon;

create function pg_temp.act(uid text) returns void language plpgsql as $$
begin
  perform set_config('request.jwt.claims', json_build_object('sub', uid, 'role', 'authenticated')::text, true);
  execute 'set local role authenticated';
end $$;
create function pg_temp.service() returns void language plpgsql as $$
begin
  execute 'reset role';
  perform set_config('request.jwt.claims', '', true);
end $$;
create function pg_temp.id(key text) returns uuid language sql as $$ select v from t_ids where k = key $$;
create function pg_temp.expect_denied(label text, stmt text) returns void language plpgsql as $$
declare n bigint;
begin
  begin
    execute stmt;
    get diagnostics n = row_count;
  exception when others then
    raise notice 'PASS (blocked) %: %', label, sqlerrm;
    return;
  end;
  if n > 0 then raise exception 'FAIL %: affected % row(s) but should have been denied', label, n; end if;
  raise notice 'PASS (0 rows) %', label;
end $$;
create function pg_temp.expect_count(label text, q text, expected bigint) returns void language plpgsql as $$
declare got bigint;
begin
  execute 'select count(*) from (' || q || ') s' into got;
  if got <> expected then raise exception 'FAIL %: expected % row(s), got %', label, expected, got; end if;
  raise notice 'PASS %: % row(s)', label, got;
end $$;
create function pg_temp.expect_value(label text, q text, expected text) returns void language plpgsql as $$
declare got text;
begin
  execute q into got;
  if got is distinct from expected then raise exception 'FAIL %: expected %, got %', label, expected, got; end if;
  raise notice 'PASS %: %', label, got;
end $$;

-- ===== Setup: two agencies, one sub-account each, C = member of A1 =====
select pg_temp.act('00000000-0000-4000-d000-00000000000a');
insert into t_ids values ('agA', public.bootstrap_agency('Delivery Agency A'));
insert into t_ids values ('A1', public.create_workspace(pg_temp.id('agA'), 'Delivery Co', null, 'America/Chicago', 'financial'));
select pg_temp.act('00000000-0000-4000-d000-00000000000b');
insert into t_ids values ('agB', public.bootstrap_agency('Delivery Agency B'));
insert into t_ids values ('B1', public.create_workspace(pg_temp.id('agB'), 'Other Delivery Co', null, 'America/Chicago', 'financial'));
select pg_temp.service();
insert into public.workspace_members (workspace_id, user_id, role) values
  (pg_temp.id('A1'), '00000000-0000-4000-d000-00000000000c', 'member');
with x as (insert into public.contacts (workspace_id, first_name, email, phone)
  values (pg_temp.id('A1'), 'Rosa', 'rosa@test.invalid', '+15125550142') returning id)
insert into t_ids select 'cA1', id from x;

-- ===== Opt-outs default off, and only the service role flips them from webhooks =====
select pg_temp.expect_value('new contact has not opted out',
  format('select email_opted_out::text || '':'' || sms_opted_out::text from public.contacts where id = %L', pg_temp.id('cA1')), 'false:false');
select pg_temp.service();
update public.contacts set sms_opted_out = true, sms_opted_out_at = now() where id = pg_temp.id('cA1');
select pg_temp.expect_value('STOP flips the text opt-out',
  format('select sms_opted_out::text from public.contacts where id = %L', pg_temp.id('cA1')), 'true');
update public.contacts set sms_opted_out = false, sms_opted_out_at = null where id = pg_temp.id('cA1');

-- ===== The Owner's switch =====
select pg_temp.act('00000000-0000-4000-d000-00000000000c');
select pg_temp.expect_count('a member sees no delivery settings', 'select 1 from public.delivery_settings', 0);
select pg_temp.expect_denied('a member cannot change delivery settings',
  format('select public.set_delivery_settings(%L, ''test'', true, true)', pg_temp.id('agA')));
select pg_temp.act('00000000-0000-4000-d000-00000000000a');
select pg_temp.expect_denied('the Owner copy stays off',
  format('select public.set_delivery_settings(%L, ''test'', true, true)', pg_temp.id('agA')));
select pg_temp.service();
update public.agencies set plan = 'growth' where id = pg_temp.id('agA');
select pg_temp.act('00000000-0000-4000-d000-00000000000a');
select public.set_delivery_settings(pg_temp.id('agA'), 'test', true, true);
select pg_temp.expect_value('a Growth agency can switch delivery to test',
  format('select mode from public.delivery_settings where agency_id = %L', pg_temp.id('agA')), 'test');
select pg_temp.act('00000000-0000-4000-d000-00000000000b');
select pg_temp.expect_denied('another agency cannot change these settings',
  format('select public.set_delivery_settings(%L, ''live'', true, true)', pg_temp.id('agA')));
select pg_temp.expect_count('B sees no A delivery settings', 'select 1 from public.delivery_settings', 0);

-- ===== Delivery keys: service role only =====
select pg_temp.act('00000000-0000-4000-d000-00000000000a');
select pg_temp.expect_denied('even the Owner cannot read delivery keys directly',
  format('select public.delivery_keys(%L)', pg_temp.id('agA')));
select pg_temp.service();
select pg_temp.expect_value('the service role reads delivery keys (none saved yet)',
  format('select public.delivery_keys(%L)::text', pg_temp.id('agA')), '[]');

-- ===== Usage log: append-only, agency-isolated =====
select pg_temp.act('00000000-0000-4000-d000-00000000000a');
select pg_temp.expect_denied('nobody in the app can write the usage log',
  format('insert into public.delivery_usage_log (agency_id, workspace_id, channel, provider, status) values (%L, %L, ''sms'', ''twilio'', ''sent'')', pg_temp.id('agA'), pg_temp.id('A1')));
select pg_temp.service();
insert into public.delivery_usage_log (agency_id, workspace_id, channel, provider, status, segments)
  values (pg_temp.id('agA'), pg_temp.id('A1'), 'sms', 'twilio', 'sent', 1);
select pg_temp.act('00000000-0000-4000-d000-00000000000a');
select pg_temp.expect_count('the Owner reads the agency usage log', 'select 1 from public.delivery_usage_log', 1);
select pg_temp.act('00000000-0000-4000-d000-00000000000b');
select pg_temp.expect_count('B sees no A usage rows', 'select 1 from public.delivery_usage_log', 0);

-- ===== Message delivery columns =====
select pg_temp.act('00000000-0000-4000-d000-00000000000c');
with x as (insert into public.conversations (workspace_id, kind, channel, contact_id, subject)
  values (pg_temp.id('A1'), 'contact', 'sms', pg_temp.id('cA1'), 'Hello') returning id)
insert into t_ids select 'convS', id from x;
insert into public.messages (workspace_id, conversation_id, channel, direction, body)
  values (pg_temp.id('A1'), pg_temp.id('convS'), 'sms', 'outbound', 'Test text');
select pg_temp.expect_value('a queued text starts with no provider result',
  format('select coalesce(provider, ''none'') || '':'' || attempts::text || '':'' || status from public.messages where conversation_id = %L', pg_temp.id('convS')), 'none:0:queued');
select pg_temp.service();
select pg_temp.expect_denied('unknown providers are refused',
  format('insert into public.messages (workspace_id, conversation_id, channel, direction, body, provider) values (%L, %L, ''sms'', ''outbound'', ''Bad provider'', ''smoke'')', pg_temp.id('A1'), pg_temp.id('convS')));
update public.messages set status = 'delivered', provider = 'twilio', provider_message_id = 'SMtest', delivered_at = now()
  where conversation_id = pg_temp.id('convS');
select pg_temp.expect_value('the service role records the delivery result',
  format('select status || '':'' || provider from public.messages where conversation_id = %L', pg_temp.id('convS')), 'delivered:twilio');

select pg_temp.service();
select 'ALL DELIVERY TESTS PASSED' as result;
rollback;
