# EC STORYWORKS — Autonomous Novella Production & Revenue OS

**Owner / final authority:** Estiban Creations (Architect)  
**Recorded:** 2026-11-17  
**Status:** Approved for documentation and planning; implementation and integrations unverified.  
**Source:** User-provided "Estiban Creations — Autonomous Novella Production & Revenue System" project blueprint.

## Mission

Build a semi-autonomous entertainment operation that researches, develops, produces, quality-checks, distributes, monetizes and learns from original serialized drama. Production is automated subject to budgets and approvals; revenues are measured as realized versus projected; final publication, sponsor, contract and account authority remains with the Architect.

## Platform placement

Proposed dedicated **VisionWeaver business module**, supervised by THELMA, executed through authorized EC Fabric jobs, and surfaced within the existing Estiban Creations control plane rather than a separate competing dashboard. This placement is a **recommendation pending final explicit architectural approval**, not a claim that integration exists.

### Logical architecture

- **Architect:** final decision and signed approvals.
- **THELMA:** supervisor, governance, checks, approvals, monitoring; no uncontrolled cross-system access.
- **EC Fabric:** authorized queues, jobs, retries, audit, recoverability; current integration unverified.
- **VisionWeaver:** media/character/scene/asset production foundation; adapter integration to be verified.
- **EC StoryWorks:** story, revenue, brand, scheduling and intelligence business module.
- **Supabase / Vercel:** proposed data/control plane and hosting; account state not yet confirmed.
- **7Art:** experimental short-drama generator, evaluated empirically.
- **Runway:** primary controlled cinematic production benchmark, evaluated empirically.
- **YouTube:** approved publishing and analytics via authorized API.
- **Amazon Associates / brands:** compliant commercial operations after account/contract verification.
- **Leadstack-Clone:** candidate existing CRM for prospect management, subject to interface verification.
- **n8n:** optional air-gap orchestration component, not required production dependency.

All external access must follow Zero-Trust least privilege, scoped credentials, logs, and explicit approval boundaries. Never put credentials, customer records, or private contract terms in this public repository.

## Nine departments

| Department | Responsibility |
|---|---|
| Market Intelligence | Demand research, competitive trends, genres |
| Revenue Intelligence | Opportunity and profitability scoring |
| Story Development | Original concepts, season bibles, scripts, episode hooks |
| Casting & Design | Avatar identity, wardrobe, locations, asset continuity |
| Production | Engine routing, generation, edits, costs |
| Quality Control | Continuity, audio, subtitles, brand/rights compliance |
| Distribution | Approval packages, YouTube upload/scheduling |
| Partnerships | Brand prospecting, placement, affiliates, contracts |
| Financial Intelligence | Earnings, forecasts, expense ledger, net profitability |

## Operational pipeline and gates

1. **Discover** — research sources, topics, audiences (automated).
2. **Opportunity score** — audience demand, retention potential, returning audience, brand/affiliate fit, cost and expected profitability (automated recommendation).
3. **Develop** — logline, outline, scripts, storyboard, character bible (automated draft).
4. **Creative approval** — premise, cast, style and first-season direction (Architect).
5. **Produce** — route shots with per-job budget caps (automated only where authorized).
6. **Inspect** — continuity, identity, text, audio, disclosure, copyrights, product claims (automated checks plus exception review).
7. **Preview and approve** — video, thumbnail, title, description, links and release date (Architect).
8. **Publish** — authorized approved release; log IDs, time, disclosures and assets (per explicit release approval).
9. **Measure and improve** — views, retention, actual earnings, cost, sponsor/affiliate results and actionable recommendations.

### Provisional routing

| Requirement | Initial candidate |
|---|---|
| 60–90 second vertical short drama | 7Art first |
| Fast character/set experiments | 7Art |
| Multi-episode identity consistency | Compare both |
| Cinematic hero shots/camera moves | Runway |
| Product ads or advanced sequences | Runway |
| Low-cost tests | 7Art or rights-verified contender |
| Final fixes | Runway, subject to comparative proof |

Record engine and model/version, prompt, source files, attempts, credits, cost, render time, output and pass/fail for **every asset**. Tool capabilities, terms and prices in the original brief are historical leads and must be reverified before costs, commitments or use.

## Authorization policy

| Level | Permitted | Authority |
|---|---|---|
| 1 | Research, analysis, recommendations | THELMA supervised |
| 2 | Drafts, scripts, concepts, previews | THELMA supervised |
| 3 | Generation under per-job ceilings | Architect-approved policy |
| 4 | Publish and sponsor commitments | Explicit Architect approval |
| 5 | Sign contracts, change accounts, financial commitments | Explicit Architect approval |

**Initial safe default:** per-production and per-publication Architect approval, and case-by-case spend proposals, until policy choices are confirmed.

**Mandatory stop:** exceeded cost cap; recurring failures; identity drift; failed rights/quality check; misleading sponsor depiction; invalid affiliate link; unapproved partner change; missing publish authority; inconsistent material revenue records. All overrides require audit, reason, authorization and traceability.

## Revenue operating model

**Milestones (targets, not forecasts):** $10,000 / $25,000 / $50,000 monthly.

- Ad earnings = monetized views / 1,000 × **actual applicable RPM**.
- Affiliate revenue = qualifying purchase-level commissions actually earned, less reversals/fees.
- Sponsorship earnings = contracted fees + approved earned bonuses; separately track collected cash and accounts receivable.
- Net operating profit = recognized earned revenue minus attributable production, services, distribution, payment and operating expenses.

Never substitute speculative RPM, commission rates or sponsorship terms for account data. Separate forecast, contracted, accrued, collected and refunded figures. Track targets/actuals, earnings per series/episode/channel/sponsor, clicks and qualifying orders, cost per usable minute, credit consumption, net profit, invoices and concentration risk.

Every episode gets a commercial brief **before** production: audience, retention, returning-viewer potential, natural brand fit, affiliate opportunities, estimated expense, potential revenue and go/no-go decision.

## Brand Partnership Manager

Maintain researched prospects, public contact channels, products, contracts, approved creative, disclosure obligations and campaign results. Initial categories: beverages, retail, beauty, fashion, technology, home/lifestyle.

Proposed sponsor tiers: Starter appearance; Featured demonstration; multi-episode Campaign; Presenting Sponsor. Rates must be backed by audience and conversion evidence.

Workflow: discover → qualify → proposal and mock placement → Architect approval → authorized outreach → follow-up and negotiation draft → Architect approval/signature → delivery verification and reporting.

Never claim an uncontracted endorsement or copy an unauthorized mark. Validate current platform, Amazon Associates and advertiser disclosure requirements before publication. The Amazon Associates declaration and prominent adjacent affiliate disclosures are expected where applicable; YouTube paid-promotion disclosures must also be checked.

## Operating cadence

- Daily: research trends; queue health; spend/credit utilization; channel reporting; prospect discovery.
- Twice weekly: review audience retention and content performance.
- Weekly: profitability report; production recommendations.
- Monthly: channel/series profitability and resource-allocation recommendations.
- Trigger review: breakout success; retention drops; sponsor reply; credit depletion; monetization eligibility; negative operating margin.

These are **desired application workflows**, not scheduled tasks currently created.

## 30-day implementation sequence (relative to kickoff)

- **Days 1–5:** Architecture verification; database schema; dashboard control center; adapter interface and approval design.
- **Days 6–10:** Punch Lab comparisons with 7Art, Runway and a verified free-tool candidate, including rights and cost measurement.
- **Days 11–15:** Original pilot development, continuity catalog, assets and release-review bundle.
- **Days 16–23:** Publish only with authorized access and approval; begin real YouTube measurements; affiliate pilot if authorized; sponsor deck.
- **Days 24–30:** Analyze unit economics; adjust router; review sponsor traction; next slate.

30 days is a validation plan, **not** a revenue or launch guarantee.

## Control center specification

Show actual versus target revenues, active series, production queue, pending approvals, costs, engine credits, quality failures, channel retention/engagement, affiliate analytics, sponsor CRM funnel, invoices, job/audit history, policy controls and prioritized next opportunities. Never present sample zeros as connected live data.

## Decisions and unknowns

- **Pending explicit choice:** nested VisionWeaver module versus independent platform (nested recommended).
- **Pending explicit choice:** approve all episodes versus approved-series automated generation under caps (all approvals as safe default).
- **Pending explicit choice:** per-episode spend proposal versus monthly cap (per-episode proposals as safe default).
- Verify current 7Art commercial licensing, real capabilities, subscriptions and APIs.
- Verify Runway workspace/API subscriptions, available models, usage rights and costs.
- Verify YouTube channel authorization and current Partner Program thresholds.
- Verify Amazon account/program access, reporting and disclosures.
- Verify live THELMA, EC Fabric, VisionWeaver, Supabase, Vercel and Leadstack-Clone integrations; do not report as built until tested.

**Milestone definition:** One operational, auditable screen where the Architect sees what is producing, earning, pending, failing and worth producing next.
