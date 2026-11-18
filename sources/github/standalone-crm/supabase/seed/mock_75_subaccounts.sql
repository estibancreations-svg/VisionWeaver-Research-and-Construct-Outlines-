-- MOCK DATA ONLY — 75 fictional client sub-accounts for a test run.
-- Every business, person, email and phone number below is invented.
--
-- Before running, set three session values (never commit real values):
--   select set_config('seed.owner_email',   'seniorestibancreations@gmail.com', false);
--   select set_config('seed.owner_name',    'Agency Owner',    false);
--   select set_config('seed.demo_password', '<test password>', false);
-- Creates:
--   * 1 agency ("Demo Agency") owned by seed.owner_email (created if missing)
--   * 75 sub-accounts, each with a default pipeline, 4 companies, 10 contacts,
--     6 deals, 6 tasks and 4 notes
--   * 75 sub-account logins: client01@crm-demo.test ... client75@crm-demo.test
--     (role "admin" of their own sub-account only), all using seed.demo_password
-- Safe to re-run: stops if the demo agency already exists.

do $$
declare
  v_owner_email text := current_setting('seed.owner_email');
  v_owner_name  text := current_setting('seed.owner_name', true);
  v_pass        text := current_setting('seed.demo_password');
  v_owner uuid;
  v_agency uuid;
  v_ws uuid;
  v_pl uuid;
  v_login uuid;
  v_tmp uuid;
  v_email text;
  v_companies uuid[];
  v_contacts uuid[];
  v_deals uuid[];
  v_stages uuid[];
  i int; j int;

  adj  text[] := array['Golden','Silver','Northside','Riverbend','Summit','Harbor','Cedar','Maple','Bright','Lakeshore',
                       'Bluebird','Ironwood','Sunrise','Copper','Velvet','Prairie','Oakline','Willow','Granite','Crescent',
                       'Evergreen','Magnolia','Highland','Coral','Juniper'];
  noun text[] := array['Bloom','Craft','Table','Studio','Works','Wellness','Motors','Roasters','Fitness','Bakery',
                       'Dental','Realty','Salon','Landscaping','Tutoring','Plumbing','Events','Apparel','Kitchen','Clinic',
                       'Print Shop','Pet Care','Cleaning','Media','Law Office'];
  inds text[] := array['Retail','Hospitality','Health & Wellness','Home Services','Professional Services','Automotive',
                       'Food & Beverage','Education','Real Estate','Creative'];
  firsts text[] := array['Maya','Jordan','Elena','Marcus','Priya','Andre','Lena','Tariq','Sofia','Darnell','Grace','Mateo',
                         'Aisha','Owen','Keiko','Luis','Nadia','Caleb','Imani','Ravi','Hana','Diego','Zoe','Malik'];
  lasts  text[] := array['Brooks','Reyes','Nguyen','Carter','Patel','Okafor','Kim','Lopez','Bennett','Hayes','Morales','Singh',
                         'Turner','Ward','Ellis','Foster','Santos','Price','Diaz','Coleman','Ito','Rivera','Shaw','Grant'];
  co_words text[] := array['Partners','Group','Supply','Collective','Co.','Associates','Holdings','Labs'];
  statuses text[] := array['lead','qualified','customer','inactive'];
  sources text[] := array['Referral','Website','Walk-in','Event','Social','Repeat client'];
  deal_words text[] := array['Starter package','Monthly retainer','Spring promotion','Annual contract','Custom order',
                             'Consultation bundle','Event booking','Upgrade plan'];
  task_words text[] := array['Call back about quote','Send proposal','Confirm appointment','Follow up on invoice',
                             'Prepare onboarding packet','Check in after delivery','Schedule review meeting','Update pricing sheet'];
  note_words text[] := array['Prefers text updates in the afternoon.','Interested in the premium tier next quarter.',
                             'Asked for a referral discount.','Budget approved; waiting on final sign-off.',
                             'Met at the community expo.','Wants a follow-up demo for their partner.'];
  pr text[] := array['low','normal','high','urgent'];
  ts text[] := array['open','in_progress','done','open','open','in_progress'];
begin
  if exists (select 1 from public.agencies where name = 'Demo Agency') then
    raise notice 'Demo Agency already exists — skipping seed.';
    return;
  end if;

  -- Agency owner login (reuse if it already exists).
  select id into v_owner from auth.users where lower(email) = lower(v_owner_email);
  if v_owner is null then
    v_owner := gen_random_uuid();
    insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
      raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
      confirmation_token, email_change, email_change_token_new, recovery_token)
    values ('00000000-0000-0000-0000-000000000000', v_owner, 'authenticated', 'authenticated', lower(v_owner_email),
      extensions.crypt(v_pass, extensions.gen_salt('bf')), now(),
      '{"provider":"email","providers":["email"],"must_change_password":true}', jsonb_build_object('full_name', coalesce(v_owner_name, 'Agency Owner')),
      now(), now(), '', '', '', '');
    insert into auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
    values (v_owner::text, v_owner,
      jsonb_build_object('sub', v_owner::text, 'email', lower(v_owner_email), 'email_verified', true),
      'email', now(), now(), now());
  end if;

  -- Act as the owner so the normal RPCs (and their checks) are used.
  perform set_config('request.jwt.claims', json_build_object('sub', v_owner, 'role', 'authenticated')::text, true);

  insert into public.agencies (name, created_by) values ('Demo Agency', v_owner) returning id into v_agency;
  insert into public.agency_members (agency_id, user_id, role) values (v_agency, v_owner, 'owner');

  for i in 1..75 loop
    v_ws := public.create_workspace(
      v_agency,
      adj[((i - 1) % 25) + 1] || ' ' || noun[(((i - 1) * 7 + (i - 1) / 25) % 25) + 1],
      inds[((i - 1) % 10) + 1],
      'America/Chicago',
      (array['retail','restaurant','clinic','home_services','professional','general','restaurant','education','real_estate','professional'])[((i - 1) % 10) + 1]);
    update public.workspaces
       set accent = (array['mustard','walnut','slate','sage','clay'])[((i - 1) % 5) + 1]
     where id = v_ws;

    select id into v_pl from public.pipelines where workspace_id = v_ws and is_default;
    select array_agg(id order by position) into v_stages from public.pipeline_stages where pipeline_id = v_pl;

    -- Sub-account login: clientNN@crm-demo.test (admin of this sub-account only)
    v_login := gen_random_uuid();
    v_email := 'client' || lpad(i::text, 2, '0') || '@crm-demo.test';
    insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
      raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
      confirmation_token, email_change, email_change_token_new, recovery_token)
    values ('00000000-0000-0000-0000-000000000000', v_login, 'authenticated', 'authenticated', v_email,
      extensions.crypt(v_pass, extensions.gen_salt('bf')), now(),
      '{"provider":"email","providers":["email"]}',
      jsonb_build_object('full_name', firsts[((i - 1) % 24) + 1] || ' ' || lasts[((i + 5) % 24) + 1]),
      now(), now(), '', '', '', '');
    insert into auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
    values (v_login::text, v_login,
      jsonb_build_object('sub', v_login::text, 'email', v_email, 'email_verified', true),
      'email', now(), now(), now());
    insert into public.workspace_members (workspace_id, user_id, role) values (v_ws, v_login, 'admin');

    -- Companies
    v_companies := '{}';
    for j in 1..4 loop
      insert into public.companies (workspace_id, name, industry, city, phone, created_by)
          values (v_ws,
            lasts[((i * 3 + j) % 24) + 1] || ' ' || co_words[((i + j) % 8) + 1],
            inds[((i + j) % 10) + 1],
            (array['Chicago','Dallas','Atlanta','Houston','Memphis','St. Louis','Austin','Nashville'])[((i + j) % 8) + 1],
            '555-01' || lpad(((i * 4 + j) % 100)::text, 2, '0'),
            v_owner)
          returning id into v_tmp;
      v_companies := v_companies || v_tmp;
    end loop;

    -- Contacts
    v_contacts := '{}';
    for j in 1..10 loop
      insert into public.contacts (workspace_id, company_id, first_name, last_name, email, phone, title,
                                       source, status, tags, created_by, created_at)
          values (v_ws,
            case when j <= 8 then v_companies[((j - 1) % 4) + 1] end,
            firsts[((i + j * 5) % 24) + 1],
            lasts[((i * 2 + j) % 24) + 1],
            lower(firsts[((i + j * 5) % 24) + 1]) || '.' || lower(lasts[((i * 2 + j) % 24) + 1]) || j || '@example.com',
            '555-02' || lpad(((i + j * 9) % 100)::text, 2, '0'),
            (array['Owner','Manager','Director','Coordinator','Buyer'])[((i + j) % 5) + 1],
            sources[((i + j) % 6) + 1],
            statuses[((i + j) % 4) + 1],
            case when j % 3 = 0 then array['vip'] when j % 4 = 0 then array['follow-up'] else '{}' end,
            v_owner,
            now() - ((i + j * 3) % 60) * interval '1 day')
          returning id into v_tmp;
      v_contacts := v_contacts || v_tmp;
    end loop;

    -- Deals
    v_deals := '{}';
    for j in 1..6 loop
      insert into public.deals (workspace_id, pipeline_id, stage_id, contact_id, company_id, title, amount,
                                    expected_close_date, status, next_action, created_by)
          values (v_ws, v_pl, v_stages[((i + j) % 5) + 1], v_contacts[j], v_companies[((j - 1) % 4) + 1],
            deal_words[((i + j) % 8) + 1],
            (500 + ((i * 37 + j * 113) % 48) * 250)::numeric,
            current_date + ((i + j * 11) % 75) - 10,
            case when j = 5 and i % 2 = 0 then 'won' when j = 6 and i % 3 = 0 then 'lost' else 'open' end,
            task_words[((i + j + 2) % 8) + 1],
            v_owner)
          returning id into v_tmp;
      v_deals := v_deals || v_tmp;
    end loop;

    -- Tasks
    for j in 1..6 loop
      insert into public.tasks (workspace_id, contact_id, deal_id, title, due_at, status, priority, created_by)
      values (v_ws, v_contacts[j + 1], case when j <= 4 then v_deals[j] end,
        task_words[((i + j) % 8) + 1],
        date_trunc('day', now()) + ((i + j * 2) % 14 - 3) * interval '1 day' + interval '15 hours',
        ts[j], pr[((i + j) % 4) + 1], v_owner);
    end loop;

    -- Notes
    for j in 1..4 loop
      insert into public.notes (workspace_id, contact_id, deal_id, body, created_by)
      values (v_ws, v_contacts[j], case when j % 2 = 0 then v_deals[j] end,
        note_words[((i + j) % 6) + 1], v_owner);
    end loop;
  end loop;

  raise notice 'Seeded Demo Agency with 75 sub-accounts and 75 sub-account logins.';
end $$;
