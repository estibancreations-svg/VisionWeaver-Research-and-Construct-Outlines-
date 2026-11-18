# Commit history — estibancreations-svg/csuite-command

Source: default branch, retrieved 2026-11-18 via list_commits (read-only). Total commits retrieved: 51. No API cap hit: pagination ran until a short page.

## 0a6e630fbaa96cb18676d015d42322e647befd8c

- Date: 2026-11-12T04:04:24Z
- Author: Estiban Creations
- Message:

```
Phase A+C: CEO Dashboard becomes the front door (/); VisionWeaver moves under /visionweaver/*; Notebook section live at /notebook; old routes redirect
```

## b0e53f0c923bca974e96a47e5116dc4b46147bf6

- Date: 2026-11-12T04:04:03Z
- Author: Estiban Creations
- Message:

```
Delete VisionWeaver stub route (replaced by /visionweaver/* layout in Phase C restructure)
```

## c9063a66ccb1d74541032f41f9692318855e8ceb

- Date: 2026-11-11T01:33:24Z
- Author: Estiban Creations
- Message:

```
Fix Featured Projects photo mapping: match backdrop by project name (Pepsi/Golden Corral -> design-commercial, Crossroads -> create-produce, Localized Avatar -> avatar-engineering, Psychology/Decor -> resources, Season One/Episode -> create-produce); no fitting Prime photo -> clean gradient (no more index rotation mismatches)
```

## 15c4357c2e6d28b7aaf18b4b2d34d88e920bb25f

- Date: 2026-11-11T01:33:07Z
- Author: Estiban Creations
- Message:

```
Fix VWImage fallback: never render an <img> for a missing/corrupt src (no 404, no broken-image icon, no alt text) — clean gradient only; block img (not absolute) and no hardcoded relative, so the hero absolute slot no longer collapses to zero height
```

## 597a95d236c6354b7e4840245b765a56a8c1ecb7

- Date: 2026-11-11T01:32:58Z
- Author: Estiban Creations
- Message:

```
Re-embed all 13 VisionWeaver Prime photos from clean sources (sha256-verified vs Prime manifest): restore hero_director (true 428x206), feature_worlds-locations, feature_media-library, feature_post-production, feature_teams, and replace corrupt create-produce + distribution-growth bytes; add hasVWImage()
```

## 5b707da1c748cef6daf062fbe1053acf57e8628b

- Date: 2026-11-11T01:22:08Z
- Author: Estiban Creations
- Message:

```
Remove 4 corrupt embedded JPEG data URIs (truncated/invalid); those slots fall back to the VWImage gradient
```

## bd336df9a3ff255ed8ae930b97cd040af3d575d7

- Date: 2026-11-11T01:21:56Z
- Author: Estiban Creations
- Message:

```
Fix home page crash: state.workspace does not exist (use state.decisions)
```

## eef594ecca575ca4fbff277a7c7dd4b406221228

- Date: 2026-11-11T01:13:17Z
- Author: Estiban Creations
- Message:

```
Restore Compact toggle, Export workspace, and Architect authority to Settings (Global tab) alongside Visual Views
```

## 04e074d52c9b27609152904b24c5835cd4cff1af

- Date: 2026-11-11T01:12:17Z
- Author: Estiban Creations
- Message:

```
Fix CEO dashboard Quality Audit link to /health (no /quality route exists)
```

## 25f186d5a3e9613d30f4fbd612c730c4b6502dcb

- Date: 2026-11-11T01:10:25Z
- Author: Estiban Creations
- Message:

```
Embed VisionWeaver Prime image assets as data URIs (13 real Prime photos) and resolve /vw/ paths through them
```

## f90b9448f65f11fc7fa554200e292d2e86ca857b

- Date: 2026-11-11T01:10:06Z
- Author: Estiban Creations
- Message:

```
Remove mis-encoded hero image (was base64 text, not a JPEG); images will be embedded as data URIs instead
```

## 8941f5398d1929b01f113605f0ce9c7e5d4f8cb0

- Date: 2026-11-11T01:09:36Z
- Author: Estiban Creations
- Message:

```
Add VisionWeaver Prime hero image (director at desk, city skyline)
```

## 808dcaa1cbb530a317ad9fa951b4d8b65143e908

- Date: 2026-11-11T01:08:41Z
- Author: Estiban Creations
- Message:

```
Rebuild UI to VisionWeaver Prime (vw3): shell, home, CEO dashboard, Worlds, Resources, Distribution, and the 16 navigation pages with Visual Views
```

## 22cc069423e2fee32c7c7abbfac7588bb4d07ac5

- Date: 2026-11-10T22:43:37Z
- Author: Estiban Creations
- Message:

```
Wire Projects page to live Supabase projects table (11 real projects): replaces localStorage seed list; Pause/Resume writes status back to Supabase; honest loading/error/empty states
```

## 75714b3f31383b274de0eed99eca810ff561fb97

- Date: 2026-11-10T22:43:03Z
- Author: Estiban Creations
- Message:

```
Restyle + rewire home to VisionWeaver (vw3): hero banner, 12 content cards, right rail (Active Project / System Status / Recent Activity) — all reading live Supabase (projects, initiatives, records, release_gates, integration_inventory, audit_events, organizations)
```

## e5a543cdd472e6a00a510592f3cc2e42b68f9152

- Date: 2026-11-10T22:40:40Z
- Author: Estiban Creations
- Message:

```
Add live Supabase data layer (src/lib/supabase-data.ts): queries the real azoqszhhmmkyqztubgem tables (projects, initiatives, page_registry, release_gates, records, integration_inventory, audit_events, organizations, memberships); honest empty states, no seed data
```

## a8a8294a8d97be61a2c8d85566088551eb83492c

- Date: 2026-11-10T22:39:31Z
- Author: Estiban Creations
- Message:

```
Restyle shell to VisionWeaver (vw3): VisionWeaver nav, brand, and live-data banner (replaces cyberpunk CEO Command Center nav and staged/sample banner)
```

## df617268959b0af83115820a88f903923d2fe678

- Date: 2026-11-10T22:38:28Z
- Author: Estiban Creations
- Message:

```
Restyle theme to VisionWeaver (vw3): dark navy + purple/violet primary accent (replaces cyberpunk cyan)
```

## a27dff34525ba6aa07f263dc9ccb0f52c902d94d

- Date: 2026-11-10T14:01:22Z
- Author: Estiban Creations
- Message:

```
Fix @radix-ui/react-tooltip to ^1.4.1 (2.2.6 does not exist on npm; blocks npm install)
```

## ba26bab92a9c224e3afc163b54bd19dcc01b6e27

- Date: 2026-11-10T13:56:26Z
- Author: Estiban Creations
- Message:

```
Remove stale bun.lock (still pins @tanstack/react-start 1.168.26) so Vercel installs fresh from package.json with the updated TanStack versions
```

## 77f150a6e0ab5842502a7b2ad885b01e616acd40

- Date: 2026-11-10T13:52:38Z
- Author: Estiban Creations
- Message:

```
Update TanStack packages (react-start 1.169.5, react-router 1.170.46, router-plugin 1.169.0) to clear Vercel CVE-2026-102989 deploy block
```

## b92643793ae767eace413d6bd7efa4b494496ae5

- Date: 2026-11-10T13:38:33Z
- Author: Estiban Creations
- Message:

```
Add @supabase/supabase-js dependency (fixes Supabase client typecheck errors)
```

## cd945264a6cefd3048727c5bf5504d04daed3435

- Date: 2026-11-10T08:45:54Z
- Author: Lovable
- Message:

```
Add project README
```

## ed19884f8f8f10ee39486d42e6b12329a198ba29

- Date: 2026-11-10T08:27:35Z
- Author: gpt-engineer-app[bot]
- Message:

```
Built Command Center shell

Co-authored-by: estibancreations-svg <293702436+estibancreations-svg@users.noreply.github.com>
```

## a8720316b03f8941f628fb6382b2033befb0bf2d

- Date: 2026-11-10T08:23:02Z
- Author: gpt-engineer-app[bot]
- Message:

```
Work in progress
```

## 1b8e1994f0dad1a1dfb7c0ffc7010e0bbc6ca5c3

- Date: 2026-07-25T03:20:25Z
- Author: gpt-engineer-app[bot]
- Message:

```
Update site info for publish

Edited UI in Lovable
```

## 4859d994deec49705c65e8fe49de59dddc820a75

- Date: 2026-07-25T03:18:05Z
- Author: gpt-engineer-app[bot]
- Message:

```
Built full Command Center shell

X-Lovable-Edit-ID: edt-aaf577cc-b8a1-4b3e-b171-8b148b77a686
```

## b3e6c635afa604abe521594a3944564093791b71

- Date: 2026-07-25T03:17:57Z
- Author: gpt-engineer-app[bot]
- Message:

```
Changes
```

## ec085698df7a9647860d0924059f1dc2e9f8defe

- Date: 2026-07-25T03:17:50Z
- Author: gpt-engineer-app[bot]
- Message:

```
Changes
```

## ec88f6cc51b1dc851a07e8d9794ca03e985abeb6

- Date: 2026-07-25T03:17:34Z
- Author: gpt-engineer-app[bot]
- Message:

```
Changes
```

## 30f2f07398ca57702d2865682e0089c5e1368193

- Date: 2026-07-25T03:17:24Z
- Author: gpt-engineer-app[bot]
- Message:

```
Changes
```

## 42e78d4387835a8b4a995c2eda2a82ecb64fb588

- Date: 2026-07-25T03:17:14Z
- Author: gpt-engineer-app[bot]
- Message:

```
Changes
```

## 173d25e122feb72b2b3ce98aa69a9e45cd590903

- Date: 2026-07-25T03:17:02Z
- Author: gpt-engineer-app[bot]
- Message:

```
Changes
```

## fd8046c22e7ab9c6836eede4e98195888372b538

- Date: 2026-07-25T03:16:50Z
- Author: gpt-engineer-app[bot]
- Message:

```
Changes
```

## 4d534ca8bca1e5c7d4c3dc11f78e17fcc4fc5bdc

- Date: 2026-07-25T03:16:38Z
- Author: gpt-engineer-app[bot]
- Message:

```
Changes
```

## c3b1e267170eee378987652004f4930db1a786e2

- Date: 2026-07-25T03:16:25Z
- Author: gpt-engineer-app[bot]
- Message:

```
Changes
```

## 82edf997ae19a1a94a83503fc9b68750ca42e2bc

- Date: 2026-07-25T03:16:11Z
- Author: gpt-engineer-app[bot]
- Message:

```
Changes
```

## 2f7cf7aa506c577aa577eca8968f852eb9e5eb1f

- Date: 2026-07-25T03:15:54Z
- Author: gpt-engineer-app[bot]
- Message:

```
Changes
```

## 44312f66adad114c8df19f4b6327134ce7268bc2

- Date: 2026-07-25T03:15:44Z
- Author: gpt-engineer-app[bot]
- Message:

```
Changes
```

## 1404f9e5c5c517ae58a755137a3a32dfb2131b1a

- Date: 2026-07-25T03:15:31Z
- Author: gpt-engineer-app[bot]
- Message:

```
Changes
```

## f7631472f7bc7f1db73c47a6b2e557b43f0698e7

- Date: 2026-07-25T03:15:13Z
- Author: gpt-engineer-app[bot]
- Message:

```
Changes
```

## da9a4c61c5a7188a28013e4183737eecd7dea11d

- Date: 2026-07-25T03:15:00Z
- Author: gpt-engineer-app[bot]
- Message:

```
Changes
```

## 71fa24bc3ce2d474177211952f2a1f96e6007be0

- Date: 2026-07-25T03:14:45Z
- Author: gpt-engineer-app[bot]
- Message:

```
Changes
```

## 786a3e6670281a0a0e4279c9e907cf5bd38e75a0

- Date: 2026-07-25T03:14:29Z
- Author: gpt-engineer-app[bot]
- Message:

```
Changes
```

## f287252ff07f2d24a35e5045836ccbbfbc12f0a2

- Date: 2026-07-25T03:11:48Z
- Author: gpt-engineer-app[bot]
- Message:

```
Changes
```

## 7a512fb588e7053be10095cb10cf8294f18f5f18

- Date: 2026-07-25T03:11:03Z
- Author: gpt-engineer-app[bot]
- Message:

```
Changes
```

## 46554e4bf57dab8ceb16958bff5b833cba4b2b15

- Date: 2026-07-25T03:10:55Z
- Author: gpt-engineer-app[bot]
- Message:

```
Changes
```

## 6b3530a402bf4db38f5f84afa41786059f82f221

- Date: 2026-07-25T03:10:39Z
- Author: gpt-engineer-app[bot]
- Message:

```
Changes
```

## 8fb69b1de578bc2ad1838aadc837ed8075f9f737

- Date: 2026-07-25T03:10:04Z
- Author: gpt-engineer-app[bot]
- Message:

```
Changes
```

## 550fdd0b5b59d0b0489c1863eebf26b019cbc149

- Date: 2026-07-25T03:08:34Z
- Author: gpt-engineer-app[bot]
- Message:

```
Changes
```

## fd856fd91e2d6c9afb7b22058eba2e6f35655b78

- Date: 2026-07-24T18:13:17Z
- Author: Lovable
- Message:

```
template: tanstack_start_ts_current-dbbe0d48c360
```

