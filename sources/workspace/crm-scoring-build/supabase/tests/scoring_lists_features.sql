-- v4.2 scoring + lists suite. Runs in ONE transaction and ends with ROLLBACK.
-- Covers: default rules, live score updates from every signal source, rule edits,
-- list filters, isolation, RLS, and the History guard for score-only updates.
begin;

insert into auth.users (id, email, raw_user_meta_data) values
  ('00000000-0000-4000-e000-00000000000a', 's-owner-a@test.invalid',  '{"full_name":"Owner A"}'),
  ('00000000-0000-4000-e000-00000000000b', 's-owner-b@test.invalid',  '{"full_name":"Owner B"}'),
  ('00000000-0000-4000-e000-00000000000c', 's-member-c@test.invalid', '{"full_name":"Member C"}');

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
select pg_temp.act('00000000-0000-4000-e000-00000000000a');
insert into t_ids values ('agA', public.bootstrap_agency('Scoring Agency A'));
insert into t_ids values ('A1', public.create_workspace(pg_temp.id('agA'), 'Scoring Co', null, 'America/Chicago', 'financial'));
select pg_temp.act('00000000-0000-4000-e000-00000000000b');
insert into t_ids values ('agB', public.bootstrap_agency('Scoring Agency B'));
insert into t_ids values ('B1', public.create_workspace(pg_temp.id('agB'), 'Other Scoring Co', null, 'America/Chicago', 'financial'));
select pg_temp.service();
insert into public.workspace_members (workspace_id, user_id, role) values
  (pg_temp.id('A1'), '00000000-0000-4000-e000-00000000000c', 'member');
with x as (insert into public.companies (workspace_id, name) values (pg_temp.id('A1'), 'Acme Co') returning id)
insert into t_ids select 'coA1', id from x;
with x as (insert into public.pipelines (workspace_id, name, is_default) values (pg_temp.id('A1'), 'Sales', true) returning id)
insert into t_ids select 'pipeA1', id from x;
insert into public.pipeline_stages (workspace_id, pipeline_id, name, position, probability) values
  (pg_temp.id('A1'), pg_temp.id('pipeA1'), 'New', 0, 10),
  (pg_temp.id('A1'), pg_temp.id('pipeA1'), 'Negotiating', 1, 80);
insert into t_ids values ('stageHi', (select id from public.pipeline_stages where pipeline_id = pg_temp.id('pipeA1') and probability = 80));

-- ===== Default rules =====
select pg_temp.expect_count('15 default rules seeded per sub-account',
  format('select 1 from public.scoring_rules where workspace_id = %L', pg_temp.id('A1')), 15);
select pg_temp.expect_count('B has its own 15 rules',
  format('select 1 from public.scoring_rules where workspace_id = %L', pg_temp.id('B1')), 15);

-- ===== Score walk: profile → qualified → reply → deal → won =====
select pg_temp.act('00000000-0000-4000-e000-00000000000c');
with x as (insert into public.contacts (workspace_id, first_name) values (pg_temp.id('A1'), 'Rosa') returning id)
insert into t_ids select 'cA1', id from x;
select pg_temp.expect_value('a bare contact scores 0 and cold',
  format('select score::text || '':'' || score_band from public.contacts where id = %L', pg_temp.id('cA1')), '0:cold');
update public.contacts set email = 'rosa@test.invalid', phone = '+15125550142', company_id = pg_temp.id('coA1') where id = pg_temp.id('cA1');
select pg_temp.expect_value('email + phone + company = 15',
  format('select score from public.contacts where id = %L', pg_temp.id('cA1')), '15');
update public.contacts set status = 'qualified' where id = pg_temp.id('cA1');
select pg_temp.expect_value('qualified adds 15 = 30',
  format('select score from public.contacts where id = %L', pg_temp.id('cA1')), '30');
select pg_temp.service();
with x as (insert into public.conversations (workspace_id, kind, channel, contact_id, subject)
  values (pg_temp.id('A1'), 'contact', 'sms', pg_temp.id('cA1'), 'Hello') returning id)
insert into t_ids select 'convS', id from x;
insert into public.messages (workspace_id, conversation_id, channel, direction, status, body)
  values (pg_temp.id('A1'), pg_temp.id('convS'), 'sms', 'inbound', 'received', 'Yes, tell me more');
select pg_temp.expect_value('a reply adds 20 + 10 recent = 60 warm',
  format('select score::text || '':'' || score_band from public.contacts where id = %L', pg_temp.id('cA1')), '60:warm');
select pg_temp.act('00000000-0000-4000-e000-00000000000c');
with x as (insert into public.deals (workspace_id, pipeline_id, stage_id, contact_id, title, amount)
  values (pg_temp.id('A1'), pg_temp.id('pipeA1'), pg_temp.id('stageHi'), pg_temp.id('cA1'), 'Big deal', 5000) returning id)
insert into t_ids select 'dealA1', id from x;
select pg_temp.expect_value('open deal at 80% adds 15 + 10 = 85 hot',
  format('select score::text || '':'' || score_band from public.contacts where id = %L', pg_temp.id('cA1')), '85:hot');
update public.deals set status = 'won' where id = pg_temp.id('dealA1');
select pg_temp.expect_value('won deal: open + high-probability off, won on = 80 hot',
  format('select score from public.contacts where id = %L', pg_temp.id('cA1')), '80');
select pg_temp.service();
insert into public.appointments (workspace_id, contact_id, title, starts_at, ends_at, status)
  values (pg_temp.id('A1'), pg_temp.id('cA1'), 'Call', now() - interval '1 day', now() - interval '23 hours', 'done');
insert into public.tasks (workspace_id, contact_id, title, status)
  values (pg_temp.id('A1'), pg_temp.id('cA1'), 'Send papers', 'done');
select pg_temp.expect_value('done appointment + done task = 95',
  format('select score from public.contacts where id = %L', pg_temp.id('cA1')), '95');
select pg_temp.expect_value('breakdown shows the won-deal signal matched at 20',
  format('select points::text || '':'' || matched::text from public.contact_score_breakdown(%L) where signal = ''deal_won''', pg_temp.id('cA1')), '20:true');

-- ===== Rule edits change scores =====
update public.scoring_rules set active = false where workspace_id = pg_temp.id('A1') and signal = 'replied';
select public.recompute_contact_score(pg_temp.id('cA1'));
select pg_temp.expect_value('deactivating the reply rule drops 20 = 75',
  format('select score from public.contacts where id = %L', pg_temp.id('cA1')), '75');
update public.scoring_rules set active = true where workspace_id = pg_temp.id('A1') and signal = 'replied';
select public.recompute_contact_score(pg_temp.id('cA1'));
select pg_temp.expect_value('reactivating restores 95',
  format('select score from public.contacts where id = %L', pg_temp.id('cA1')), '95');

-- ===== Stale contacts decay, floored at 0 =====
select pg_temp.act('00000000-0000-4000-e000-00000000000c');
with x as (insert into public.contacts (workspace_id, first_name) values (pg_temp.id('A1'), 'Old') returning id)
insert into t_ids select 'cOld', id from x;
select pg_temp.service();
update public.contacts set created_at = now() - interval '100 days' where id = pg_temp.id('cOld');
select public.recompute_contact_score(pg_temp.id('cOld'));
select pg_temp.expect_value('a 100-day-old untouched contact floors at 0',
  format('select score::text || '':'' || score_band from public.contacts where id = %L', pg_temp.id('cOld')), '0:cold');

-- ===== Lists =====
select pg_temp.act('00000000-0000-4000-e000-00000000000c');
update public.contacts set tags = array['vip', 'sms'], source = 'website' where id = pg_temp.id('cA1');
with x as (insert into public.contact_lists (workspace_id, name, filters)
  values (pg_temp.id('A1'), 'Hot leads', '{"band": "hot"}'::jsonb) returning id)
insert into t_ids select 'listHot', id from x;
with x as (insert into public.contact_lists (workspace_id, name, filters)
  values (pg_temp.id('A1'), 'VIP any', '{"tags": ["vip", "missing"], "tags_match": "any"}'::jsonb) returning id)
insert into t_ids select 'listAny', id from x;
with x as (insert into public.contact_lists (workspace_id, name, filters)
  values (pg_temp.id('A1'), 'VIP all', '{"tags": ["vip", "missing"], "tags_match": "all"}'::jsonb) returning id)
insert into t_ids select 'listAll', id from x;
with x as (insert into public.contact_lists (workspace_id, name, filters)
  values (pg_temp.id('A1'), 'Qualified 90+', '{"status": ["qualified"], "min_score": 90}'::jsonb) returning id)
insert into t_ids select 'listQ90', id from x;
select pg_temp.expect_count('hot list holds Rosa only',
  format('select 1 from public.list_contacts(%L)', pg_temp.id('listHot')), 1);
select pg_temp.expect_count('tags any-match finds Rosa',
  format('select 1 from public.list_contacts(%L)', pg_temp.id('listAny')), 1);
select pg_temp.expect_count('tags all-match finds nobody',
  format('select 1 from public.list_contacts(%L)', pg_temp.id('listAll')), 0);
select pg_temp.expect_count('qualified + 90 holds Rosa',
  format('select 1 from public.list_contacts(%L)', pg_temp.id('listQ90')), 1);
select pg_temp.expect_denied('a member cannot delete a list',
  format('delete from public.contact_lists where id = %L', pg_temp.id('listHot')));
select pg_temp.expect_denied('a member cannot delete a rule',
  format('delete from public.scoring_rules where workspace_id = %L', pg_temp.id('A1')));

-- ===== Isolation =====
select pg_temp.act('00000000-0000-4000-e000-00000000000b');
select pg_temp.expect_count('B sees no A lists', 'select 1 from public.contact_lists', 0);
select pg_temp.expect_count('B gets no members from an A list',
  format('select 1 from public.list_contacts(%L)', pg_temp.id('listHot')), 0);
select pg_temp.expect_count('B gets no breakdown for an A contact',
  format('select 1 from public.contact_score_breakdown(%L)', pg_temp.id('cA1')), 0);
select pg_temp.expect_denied('B cannot recalculate A scores',
  format('select public.recompute_workspace_scores(%L)', pg_temp.id('A1')));

-- ===== History guard: score-only updates write no History rows =====
select pg_temp.service();
create temp table t_act_before (n bigint);
insert into t_act_before select count(*) from public.activities where entity_id = pg_temp.id('cA1');
select public.recompute_contact_score(pg_temp.id('cA1'));
select pg_temp.expect_count('recalculate writes no new History rows',
  format('select 1 from public.activities where entity_id = %L', pg_temp.id('cA1')),
  (select n from t_act_before));
select pg_temp.act('00000000-0000-4000-e000-00000000000c');
update public.contacts set first_name = 'Rosa Maria' where id = pg_temp.id('cA1');
select pg_temp.expect_count('a name edit still writes one History row',
  format('select 1 from public.activities where entity_id = %L', pg_temp.id('cA1')),
  (select n from t_act_before) + 1);

-- ===== Whole-workspace recalculation =====
select pg_temp.expect_value('recalculate counts every contact in the sub-account',
  format('select public.recompute_workspace_scores(%L)::text', pg_temp.id('A1')), '2');

select pg_temp.service();
select 'ALL SCORING + LISTS TESTS PASSED' as result;
rollback;
