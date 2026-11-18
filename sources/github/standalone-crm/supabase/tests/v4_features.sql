-- v4.0 feature + isolation suite. Runs in ONE transaction and ends with ROLLBACK.
-- Covers: plans/feature gates, mailboxes, inbox, app connectors, compliance-checked marketing,
-- website limits, Zoom/FaceTime gates, payments (Owner copy stays off), T.H.E.L.M.A. approvals,
-- owner tracking, and that agency B can never see agency A.
begin;

insert into auth.users (id, email, raw_user_meta_data) values
  ('00000000-0000-4000-b000-00000000000a', 'v4-owner-a@test.invalid',  '{"full_name":"Owner A"}'),
  ('00000000-0000-4000-b000-00000000000b', 'v4-owner-b@test.invalid',  '{"full_name":"Owner B"}'),
  ('00000000-0000-4000-b000-00000000000c', 'v4-member-c@test.invalid', '{"full_name":"Member C"}'),
  ('00000000-0000-4000-b000-00000000000d', 'v4-admin-d@test.invalid',  '{"full_name":"Sub Admin D"}'),
  ('00000000-0000-4000-b000-00000000000e', 'v4-agencyadmin-e@test.invalid', '{"full_name":"Agency Admin E"}');

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

-- ===== Owner A: agency with a bail-bonds sub-account and an insurance sub-account =====
select pg_temp.act('00000000-0000-4000-b000-00000000000a');
insert into t_ids values ('agA', public.bootstrap_agency('V4 Agency A'));
insert into t_ids values ('A1', public.create_workspace(pg_temp.id('agA'), 'Lone Star Bail', null, 'America/Chicago', 'bail_bonds'));
insert into t_ids values ('A2', public.create_workspace(pg_temp.id('agA'), 'Plains Insurance', null, 'America/Chicago', 'insurance'));
select pg_temp.expect_count('bail-bonds kit installs its 5 pipeline steps',
  format('select 1 from public.pipeline_stages where workspace_id = %L and name in (''New call'',''Bond posted'',''Court dates tracked'',''Booking info gathered'',''Co-signer and paperwork'')', pg_temp.id('A1')), 5);
select pg_temp.expect_count('every sub-account gets Owner, Admin and Accounting addresses',
  format('select 1 from public.mailboxes where workspace_id in (%L, %L)', pg_temp.id('A1'), pg_temp.id('A2')), 6);
select pg_temp.expect_value('Owner copy plan includes texting', format('select (select plan_id from public.workspace_plan(%L))', pg_temp.id('A1')), 'owner');
with x as (insert into public.contacts (workspace_id, first_name, email) values (pg_temp.id('A1'), 'Rosa', 'rosa@test.invalid') returning id)
insert into t_ids select 'cA1', id from x;

-- ===== Owner B: a separate agency =====
select pg_temp.act('00000000-0000-4000-b000-00000000000b');
insert into t_ids values ('agB', public.bootstrap_agency('V4 Agency B'));
insert into t_ids values ('B1', public.create_workspace(pg_temp.id('agB'), 'Other Co', null, 'America/Chicago', 'financial'));

-- ===== Logins: C = member of A1, D = sub-account admin of A1, E = agency admin of A =====
select pg_temp.service();
insert into public.workspace_members (workspace_id, user_id, role) values
  (pg_temp.id('A1'), '00000000-0000-4000-b000-00000000000c', 'member'),
  (pg_temp.id('A1'), '00000000-0000-4000-b000-00000000000d', 'admin');
insert into public.agency_members (agency_id, user_id, role) values
  (pg_temp.id('agA'), '00000000-0000-4000-b000-00000000000e', 'admin');

-- ===== Mailboxes =====
select pg_temp.act('00000000-0000-4000-b000-00000000000c');
select pg_temp.expect_count('member sees the 3 A1 addresses only', 'select 1 from public.mailboxes', 3);
select pg_temp.expect_denied('member cannot add an extra address',
  format('insert into public.mailboxes (workspace_id, slot, local_part, display_name) values (%L, ''extra'', ''sales'', ''Sales'')', pg_temp.id('A1')));
select pg_temp.expect_denied('member cannot activate an address', 'update public.mailboxes set status = ''active''');
select pg_temp.act('00000000-0000-4000-b000-00000000000d');
insert into public.mailboxes (workspace_id, slot, local_part, display_name) values (pg_temp.id('A1'), 'extra', 'sales', 'Sales');
select pg_temp.expect_count('extra address is flagged billable', 'select 1 from public.mailboxes where billable', 1);
select pg_temp.expect_denied('admin cannot add a second Owner address',
  format('insert into public.mailboxes (workspace_id, slot, local_part, display_name) values (%L, ''owner'', ''boss'', ''Boss'')', pg_temp.id('A1')));
select pg_temp.expect_denied('admin cannot remove an included address', 'delete from public.mailboxes where slot = ''accounting''');
update public.workspaces set email_domain = 'LoneStarBail.com' where id = pg_temp.id('A1');
select pg_temp.expect_value('new domain is lower-cased and waits for DNS',
  format('select email_domain || '':'' || email_domain_status from public.workspaces where id = %L', pg_temp.id('A1')), 'lonestarbail.com:pending_dns');

-- ===== Inbox =====
select pg_temp.act('00000000-0000-4000-b000-00000000000c');
with x as (insert into public.conversations (workspace_id, kind, channel, subject) values (pg_temp.id('A1'), 'internal', 'internal', 'Team') returning id)
insert into t_ids select 'convI', id from x;
insert into public.messages (workspace_id, conversation_id, channel, direction, body) values (pg_temp.id('A1'), pg_temp.id('convI'), 'internal', 'internal', 'Hello team');
select pg_temp.expect_value('internal chat is delivered at once', 'select status from public.messages where body = ''Hello team''', 'sent');
with x as (insert into public.conversations (workspace_id, kind, channel, contact_id, subject)
  values (pg_temp.id('A1'), 'contact', 'email', pg_temp.id('cA1'), 'Bond paperwork') returning id)
insert into t_ids select 'convE', id from x;
insert into public.messages (workspace_id, conversation_id, channel, direction, body)
  values (pg_temp.id('A1'), pg_temp.id('convE'), 'email', 'inbound', 'Fake inbound');
select pg_temp.expect_value('a person cannot record an inbound message (forced outbound)',
  format('select direction from public.messages where conversation_id = %L and body = ''Fake inbound''', pg_temp.id('convE')), 'outbound');
select pg_temp.expect_value('email waits until the domain is verified',
  format('select status from public.messages where conversation_id = %L and body = ''Fake inbound''', pg_temp.id('convE')), 'needs_connection');
select pg_temp.expect_denied('member cannot mark a message delivered', 'update public.messages set status = ''delivered''');
select pg_temp.service();
update public.workspaces set email_domain_status = 'verified' where id = pg_temp.id('A1');
select pg_temp.act('00000000-0000-4000-b000-00000000000c');
insert into public.messages (workspace_id, conversation_id, channel, direction, body) values (pg_temp.id('A1'), pg_temp.id('convE'), 'email', 'outbound', 'Second try');
select pg_temp.expect_value('after verification, email is queued for the mail host',
  format('select status from public.messages where conversation_id = %L and body = ''Second try''', pg_temp.id('convE')), 'queued');

-- ===== App connectors =====
select pg_temp.expect_denied('member cannot request an app',
  format('insert into public.workspace_apps (workspace_id, app, status) values (%L, ''dropbox'', ''requested'')', pg_temp.id('A1')));
select pg_temp.act('00000000-0000-4000-b000-00000000000d');
insert into public.workspace_apps (workspace_id, app, status) values (pg_temp.id('A1'), 'dropbox', 'requested');
select pg_temp.expect_denied('admin cannot mark an app connected',
  format('update public.workspace_apps set status = ''connected'' where workspace_id = %L', pg_temp.id('A1')));
select pg_temp.expect_denied('unknown apps are refused',
  format('insert into public.workspace_apps (workspace_id, app, status) values (%L, ''myspace'', ''requested'')', pg_temp.id('A1')));

-- ===== Advertising + social planner with compliance =====
select pg_temp.act('00000000-0000-4000-b000-00000000000c');
with x as (insert into public.social_posts (workspace_id, platforms, body)
  values (pg_temp.id('A1'), array['facebook','instagram'], 'Guaranteed release in 1 hour — get out of jail free!') returning id)
insert into t_ids select 'postBad', id from x;
select pg_temp.expect_count('bail-bonds post is flagged twice or more',
  format('select 1 from public.social_posts where id = %L and cardinality(compliance_flags) >= 2', pg_temp.id('postBad')), 1);
with x as (insert into public.social_posts (workspace_id, platforms, body, status)
  values (pg_temp.id('A1'), array['facebook'], 'Open 24/7. Call us — se habla español.', 'published') returning id)
insert into t_ids select 'postOk', id from x;
select pg_temp.expect_value('new posts always start as drafts', format('select status from public.social_posts where id = %L', pg_temp.id('postOk')), 'draft');
select pg_temp.expect_denied('member cannot approve', format('update public.social_posts set status = ''approved'' where id = %L', pg_temp.id('postOk')));
select pg_temp.act('00000000-0000-4000-b000-00000000000d');
select pg_temp.expect_denied('flagged post cannot be approved', format('update public.social_posts set status = ''approved'' where id = %L', pg_temp.id('postBad')));
update public.social_posts set status = 'approved' where id = pg_temp.id('postOk');
select pg_temp.expect_value('clean post approved by admin', format('select status from public.social_posts where id = %L', pg_temp.id('postOk')), 'approved');
select pg_temp.expect_denied('admin cannot mark published', format('update public.social_posts set status = ''published'' where id = %L', pg_temp.id('postOk')));
update public.social_posts set body = 'Open 24/7. Call us now.' where id = pg_temp.id('postOk');
select pg_temp.expect_value('editing approved wording sends it back to draft', format('select status from public.social_posts where id = %L', pg_temp.id('postOk')), 'draft');
select pg_temp.expect_denied('A1 admin cannot write into A2',
  format('insert into public.campaigns (workspace_id, name, channel) values (%L, ''x'', ''email'')', pg_temp.id('A2')));
select pg_temp.act('00000000-0000-4000-b000-00000000000a');
insert into public.campaigns (workspace_id, name, channel, ad_text) values (pg_temp.id('A2'), 'Spring auto', 'google_ads', 'Lowest rates guaranteed');
select pg_temp.expect_count('insurance ad is flagged', 'select 1 from public.campaigns where cardinality(compliance_flags) >= 2', 1);
select pg_temp.act('00000000-0000-4000-b000-00000000000d');

-- ===== Websites: one per sub-account in the Owner copy =====
insert into public.websites (workspace_id, name, status) values (pg_temp.id('A1'), 'Main site', 'live');
select pg_temp.expect_value('a new site cannot start live', format('select status from public.websites where workspace_id = %L', pg_temp.id('A1')), 'planned');
select pg_temp.expect_denied('second site in the same sub-account is refused',
  format('insert into public.websites (workspace_id, name) values (%L, ''Second'')', pg_temp.id('A1')));
select pg_temp.expect_denied('a person cannot publish a site', 'update public.websites set status = ''live''');

-- ===== T.H.E.L.M.A. approvals =====
select pg_temp.service();
with x as (insert into public.thelma_requests (agency_id, workspace_id, source, source_name, action, summary, risk)
  values (pg_temp.id('agA'), pg_temp.id('A1'), 'external_agent', 'Review watcher', 'reviews.reply', 'Reply to a new Google review', 'low') returning id)
insert into t_ids select 'tr1', id from x;
select pg_temp.act('00000000-0000-4000-b000-00000000000c');
select pg_temp.expect_count('sub-account logins cannot see T.H.E.L.M.A. requests', 'select 1 from public.thelma_requests', 0);
select pg_temp.expect_denied('nobody writes requests directly',
  format('insert into public.thelma_requests (agency_id, source, source_name, action, summary) values (%L, ''agent'', ''x'', ''a'', ''b'')', pg_temp.id('agA')));
select pg_temp.act('00000000-0000-4000-b000-00000000000e');
select pg_temp.expect_count('agency admin can read the request queue', 'select 1 from public.thelma_requests', 1);
select pg_temp.expect_denied('agency admin cannot approve (Owner only)', format('select public.decide_thelma_request(%L, true)', pg_temp.id('tr1')));
select pg_temp.act('00000000-0000-4000-b000-00000000000b');
select pg_temp.expect_denied('another agency''s Owner cannot approve', format('select public.decide_thelma_request(%L, true)', pg_temp.id('tr1')));
select pg_temp.act('00000000-0000-4000-b000-00000000000a');
select pg_temp.expect_value('Owner approves', format('select public.decide_thelma_request(%L, true, ''ok'')', pg_temp.id('tr1')), 'approved');
select pg_temp.expect_denied('a request cannot be decided twice', format('select public.decide_thelma_request(%L, false)', pg_temp.id('tr1')));

-- ===== Payments: the Owner copy stays off =====
select pg_temp.expect_denied('Owner copy cannot turn payments on',
  format('select public.set_payment_settings(%L, ''test'', array[''card'',''apple_pay''])', pg_temp.id('agA')));
select public.set_payment_settings(pg_temp.id('agA'), 'off', array['card']);
select pg_temp.act('00000000-0000-4000-b000-00000000000e');
select pg_temp.expect_denied('agency admin cannot change payment settings',
  format('select public.set_payment_settings(%L, ''off'', array[''card''])', pg_temp.id('agA')));

-- ===== Plan gates: switch agency A to Essentials (done by the billing service) =====
select pg_temp.service();
update public.agencies set plan = 'essentials', billing_status = 'trialing' where id = pg_temp.id('agA');
select pg_temp.act('00000000-0000-4000-b000-00000000000c');
select pg_temp.expect_denied('Essentials cannot book Zoom appointments',
  format('insert into public.appointments (workspace_id, title, starts_at, ends_at, kind) values (%L, ''Call'', now(), now() + interval ''1 hour'', ''zoom'')', pg_temp.id('A1')));
insert into public.appointments (workspace_id, title, starts_at, ends_at, kind) values (pg_temp.id('A1'), 'Office visit', now(), now() + interval '1 hour', 'in_person');
select pg_temp.expect_denied('Essentials cannot create invoices',
  format('insert into public.invoices (workspace_id, number, description, amount) values (%L, ''INV-1'', ''Premium'', 100)', pg_temp.id('A1')));
select pg_temp.expect_denied('Essentials cannot create ad campaigns',
  format('insert into public.campaigns (workspace_id, name, channel) values (%L, ''Ads'', ''meta_ads'')', pg_temp.id('A1')));
insert into public.messages (workspace_id, conversation_id, channel, direction, body) values (pg_temp.id('A1'), pg_temp.id('convE'), 'email', 'outbound', 'Third');
with x as (insert into public.conversations (workspace_id, kind, channel, contact_id, subject)
  values (pg_temp.id('A1'), 'contact', 'sms', pg_temp.id('cA1'), 'Text') returning id)
insert into t_ids select 'convS', id from x;
insert into public.messages (workspace_id, conversation_id, channel, direction, body) values (pg_temp.id('A1'), pg_temp.id('convS'), 'sms', 'outbound', 'Hi');
select pg_temp.expect_value('texting waits for the higher tier', format('select status from public.messages where conversation_id = %L', pg_temp.id('convS')), 'needs_connection');

-- ===== Learning progress is private to each person =====
insert into public.learning_progress (lesson_key) values ('welcome');
select pg_temp.act('00000000-0000-4000-b000-00000000000d');
select pg_temp.expect_count('others cannot see my lesson progress', 'select 1 from public.learning_progress', 0);

-- ===== Owner tracking =====
select pg_temp.act('00000000-0000-4000-b000-00000000000a');
select pg_temp.expect_count('Owner sees progress for both sub-accounts', format('select 1 from public.agency_progress(%L)', pg_temp.id('agA')), 2);
select pg_temp.expect_count('Owner sees every person (owner, admin, 2 logins)', format('select 1 from public.agency_people(%L)', pg_temp.id('agA')), 4);
select pg_temp.act('00000000-0000-4000-b000-00000000000c');
select pg_temp.expect_count('a member gets no owner tracking', format('select 1 from public.agency_people(%L)', pg_temp.id('agA')), 0);

-- ===== Agency B sees nothing of agency A =====
select pg_temp.act('00000000-0000-4000-b000-00000000000b');
select pg_temp.expect_count('B: no A mailboxes', format('select 1 from public.mailboxes where workspace_id = %L', pg_temp.id('A1')), 0);
select pg_temp.expect_count('B: no A messages', 'select 1 from public.messages', 0);
select pg_temp.expect_count('B: no A posts or campaigns', 'select 1 from public.social_posts union all select 1 from public.campaigns', 0);
select pg_temp.expect_count('B: no A websites, apps or appointments',
  'select 1 from public.websites union all select 1 from public.workspace_apps union all select 1 from public.appointments', 0);
select pg_temp.expect_count('B: no A T.H.E.L.M.A. requests', 'select 1 from public.thelma_requests', 0);
select pg_temp.expect_denied('B cannot write into A1',
  format('insert into public.content_templates (workspace_id, kind, name, body) values (%L, ''sms'', ''x'', ''y'')', pg_temp.id('A1')));
select pg_temp.expect_count('B: progress of A is empty', format('select 1 from public.agency_progress(%L)', pg_temp.id('agA')), 0);

select pg_temp.service();
select 'ALL V4 FEATURE TESTS PASSED' as result;
rollback;
