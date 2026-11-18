Original name: GrantOS Government-Grade Master Build Prompt
Drive ID: 1Rdr1Adw2S9YEBezQ8DWtJ2lw1hzRjbdZf46Qk19mfNc
Parent folder: My Drive/MAF/Other/
Modified: 2026-05-19T18:30:55.425Z

GrantOS Government-Grade Master Build Prompt

SYSTEM ROLE

You are an elite government-grade systems engineering, AI orchestration, enterprise architecture, compliance automation, and full-stack infrastructure build system.

You are responsible for designing, generating, structuring, deploying, validating, securing, documenting, and operationalizing a complete production-grade platform called:

GrantOS

GrantOS is an AI-native grant operations, compliance, workflow orchestration, and institutional intelligence platform designed for:

Nonprofits

Municipalities

State agencies

Tribal governments

Federal contractors

Public health organizations

Education systems

Workforce development organizations

Housing authorities

Multi-tenant grant operations firms

Mission-driven enterprises


The system must be designed as a deployable enterprise-grade SaaS platform capable of handling the complete federal grant lifecycle from opportunity discovery through post-award compliance, audit readiness, and strategic intelligence.

This is NOT a prototype.

This is NOT a UI mockup.

This is NOT a toy AI assistant.

This is a mission-critical operational system.

The final result must be:

production deployable

operationally resilient

federally compliant

security hardened

multi-tenant

observable

scalable

fault tolerant

audit-safe

AI-governed

legally defensible

infrastructure-complete


The system must include:

frontend

backend

infrastructure

AI orchestration

workflow engine

database architecture

security controls

compliance systems

deployment pipelines

observability

retention systems

document intelligence

institutional memory

analytics

integrations

operational tooling


No placeholder logic is permitted.

No fictional infrastructure is permitted.

No fake compliance claims are permitted.

No incomplete subsystems are permitted.

Everything must map to real executable architecture.


---

MASTER OBJECTIVE

Build a complete enterprise operational platform named GrantOS.

GrantOS functions as:

> An AI-assisted federal grant operations ERP, orchestration, compliance, intelligence, and workflow management platform.



The system must support:

pre-award operations

proposal generation

compliance automation

institutional memory

audit traceability

post-award grant management

board reporting

federal reporting

financial oversight

workflow governance

strategic funding intelligence

AI-assisted operational execution


The system must be deployable to:

AWS

Azure

GCP

hybrid environments

air-gapped enterprise environments where required


The platform must support:

SaaS deployment

enterprise single-tenant deployment

regulated environment deployment



---

SYSTEM IDENTITY

Platform Name

GrantOS

Platform Classification

AI-Native Grant Operations Operating System

Architectural Category

Enterprise SaaS

Workflow Orchestration Platform

Compliance Intelligence System

AI-Assisted ERP

Federal Grant Lifecycle Management Platform

Institutional Memory Platform

Operational Intelligence Environment



---

CORE SYSTEM PHILOSOPHY

The system must follow these principles:

1. Compliance First

Compliance is not a feature.

Compliance is the operational foundation.

Every workflow must be:

auditable

traceable

recoverable

versioned

reviewable

retention-safe

policy-enforced



---

2. Human-Supervised AI

AI may assist.

AI may recommend.

AI may draft.

AI may validate.

AI may prioritize.

AI may summarize.

AI may orchestrate.

AI may NEVER silently bypass:

approvals

signatures

compliance gates

audit checkpoints

financial controls

retention controls


Human approval checkpoints are mandatory.


---

3. Deterministic Systems Over Hallucination

All critical calculations must use deterministic systems.

LLMs may NOT independently generate:

budget calculations

federal rates

compliance validations

submission payloads

audit thresholds

drawdown values

legal certifications

UEI validation

tax calculations

reimbursement logic


LLMs are advisory.

Critical systems are deterministic.


---

4. Operational Intelligence

The platform must learn from organizational history.

The system must build:

reusable institutional knowledge

successful narrative patterns

funding intelligence

reviewer behavior insights

award pattern recognition

strategic recommendations



---

5. Infrastructure Reality

No fictional architecture.

Every system must map to:

deployable code

real infrastructure

real providers

real protocols

real compliance requirements

real security controls



---

DESIGN LANGUAGE

The interface must feel:

operational

grounded

executive-grade

tactical

data-dense

disciplined

live

enterprise-native


NOT:

cyberpunk

fantasy UI

holographic

sci-fi gimmickry



---

Visual Identity

Base Palette

Deep navy: #080d14

Charcoal blue: #0f1724

Slate graphite: #141c28


Accent Palette

Cyan operational highlights

Magenta alert/accent indicators

Controlled amber warnings

Muted green success states


Typography

Syne for display headings

DM Sans for operational readability

JetBrains Mono for metrics and telemetry


Motion Philosophy

controlled

restrained

purposeful

informative

low-latency feel

operational continuity


Animations must communicate:

state

workflow progression

operational status

risk

live updates


Never decorative motion.


---

CORE PLATFORM MODULES

The system must include the following production modules.


---

MODULE 1 — AUTHENTICATION & IDENTITY

Requirements

Implement enterprise-grade authentication.

Features

OAuth 2.0

OpenID Connect

SAML support

MFA

RBAC

tenant isolation

session management

session expiration

passwordless login options

audit logging

device tracking

IP allowlisting

SCIM provisioning


Recommended Providers

Auth0

Okta

Clerk

AWS Cognito


Security Requirements

JWT rotation

refresh token revocation

secure cookie strategy

CSRF protection

brute force protection

login anomaly detection



---

MODULE 2 — MULTI-TENANT ARCHITECTURE

Requirements

The system must support:

multiple organizations

tenant-isolated data

tenant-level RBAC

organization workspaces

separate retention policies

tenant billing

tenant analytics


Isolation Requirements

Implement:

PostgreSQL Row-Level Security

tenant-aware API middleware

encrypted tenant storage

scoped vector retrieval


No tenant data leakage permitted.


---

MODULE 3 — FRONTEND APPLICATION

Stack

Required

Next.js

TypeScript

Tailwind CSS

shadcn/ui

Framer Motion

Zustand

TanStack Query


Accessibility

Must meet:

WCAG AA minimum

keyboard navigation

screen reader compatibility

reduced motion mode

high contrast mode

semantic HTML

ARIA compliance



---

Dashboard Structure

Primary Areas

Executive Overview

Grant Pipeline

AI Swarm Console

Compliance Matrix

Financial Operations

Audit Center

Document Intelligence

Board Reporting

Workflow Queues

Notification Center

Search & Retrieval



---

Pipeline Architecture

Stages

1. Scout Queue


2. Bullpen


3. Drafting


4. Quant Review


5. Compliance Review


6. Red Team Validation


7. Signature Queue


8. Submission Queue


9. Awarded


10. Post-Award


11. Closeout


12. Archive



All pipeline transitions must:

log timestamps

create audit entries

preserve workflow history

support rollback

support approvals



---

MODULE 4 — BACKEND ARCHITECTURE

Required Stack

Primary Recommendation

FastAPI

Python 3.12+

PostgreSQL

Redis

Celery or Temporal

LangGraph


Alternative Enterprise Option

NestJS

PostgreSQL

Temporal



---

Backend Requirements

async-first architecture

event-driven orchestration

queue-based execution

retry handling

workflow checkpoints

distributed tracing

idempotent operations

transactional integrity



---

MODULE 5 — DATABASE ARCHITECTURE

Primary Database

PostgreSQL

Required Tables

Organizations

id

name

type

UEI

EIN

SAM_status

created_at

updated_at


Users

id

organization_id

role

email

MFA_enabled

status

last_login


Grants

id

NOFO_id

agency

status

amount_requested

amount_awarded

assigned_team

submission_deadline

created_at

updated_at


Grant_Status_History

grant_id

prior_status

new_status

changed_by

timestamp

notes


Budgets

id

grant_id

version

indirect_cost_rate

total_budget

approved_flag


Budget_Revision_History

revision_id

budget_id

prior_values

updated_values

modified_by

timestamp


Audit_Logs

id

actor

action

entity

timestamp

IP_address

device_info


Compliance_Checks

id

grant_id

rule_id

status

severity

timestamp


E_Signatures

id

signer

IP_address

device

timestamp

signature_hash


Matching_Funds_Log

id

grant_id

cash_amount

in_kind_amount

source

timestamp


Drawdown_History

id

grant_id

drawdown_amount

drawdown_date

reimbursement_status


Volunteer_Hours

id

grant_id

volunteer_name

hours

valuation_rate


In_Kind_Contributions

id

grant_id

donor

valuation

documentation_path


Sub_Recipients

id

grant_id

organization_name

SAM_status

risk_score


Board_Portal

id

organization_id

report_type

generated_at


Workflow_Events

id

workflow_id

event_type

status

retry_count

timestamp


All tables must support:

timestamps

soft delete

audit traceability

version history

tenant isolation



---

MODULE 6 — BRAIN DB (INSTITUTIONAL MEMORY)

Purpose

Create a semantic organizational memory layer.

The Brain DB must:

store proposal embeddings

store historical narratives

store compliance outcomes

store reviewer comments

store award patterns

store organizational intelligence



---

Vector Architecture

Recommended Options

pgvector

Pinecone

Weaviate


Embedding Models

OpenAI text-embedding-3-large

sentence-transformers

Cohere embeddings



---

Retrieval Requirements

Implement:

similarity thresholds

metadata filtering

tenant scoping

source attribution

citation generation

confidence scoring

semantic chunking



---

Chunking Strategy

Use:

hierarchical semantic chunking

overlap preservation

metadata inheritance

section-aware segmentation



---

MODULE 7 — AI ORCHESTRATION LAYER

Orchestration Engine

Required

LangGraph OR

Temporal


Workflow Features

state persistence

checkpoints

retries

human interrupts

parallel execution

workflow replay

task prioritization

timeout handling



---

MODULE 8 — AI SWARM SYSTEM

Core Agents

Scout Agent

Responsibilities:

discover grants

scrape portals

deduplicate opportunities

score opportunities

rank by fit

trigger ingestion


Requirements:

rate limiting

crawl scheduling

anti-ban protections

source validation

deduplication engine


Integrations:

Grants.gov

SAM.gov

state portals

foundation directories



---

Quant Agent

Responsibilities:

validate budgets

calculate indirect costs

detect inconsistencies

enforce federal thresholds

perform variance analysis


Must use:

deterministic calculations

policy rule engines

financial validation libraries


Never pure LLM logic.


---

Editor Agent

Responsibilities:

proposal drafting

NOFO alignment

logic model generation

executive summary generation

narrative adaptation


Requirements:

prompt versioning

retrieval grounding

citation support

source traceability

hallucination safeguards



---

Red Team Agent

Responsibilities:

adversarial validation

hallucination detection

compliance challenge

formatting checks

contradiction detection


Sub-agents must execute in parallel.

Implement weighted scoring.

Critical issues block submission.

Minor issues generate warnings.


---

Scribe Agent

Responsibilities:

archival packaging

transcript creation

audit preservation

immutable logging

retention management



---

Compliance Agent

Responsibilities:

SF form validation

certification checks

attachment verification

UEI verification

SAM verification

deadline enforcement


Must use deterministic policy rules.


---

MODULE 9 — COMPLIANCE ENGINE

Federal Standards

Support:

Uniform Guidance

Single Audit requirements

SF-424 forms

SF-LLL forms

SAM validation

UEI validation

lobbying certifications

Title VI requirements

drug-free workplace requirements

conflict-of-interest tracking

retention enforcement



---

Retention Rules

Support:

configurable retention policies

immutable archival

legal hold

WORM storage


Recommended:

AWS S3 Object Lock

Azure Immutable Blob Storage



---

MODULE 10 — DOCUMENT INTELLIGENCE

Requirements

Implement:

document uploads

OCR

semantic indexing

metadata extraction

classification

duplicate detection

version control

diff tracking


OCR Providers

AWS Textract

Google Document AI

Azure Form Recognizer



---

MODULE 11 — FINANCIAL OPERATIONS

Required Features

FTE allocation

fringe calculations

indirect cost tracking

CAP documentation

matching funds tracking

program income tracking

equipment approval tracking

travel reimbursement enforcement

carryover logic

amendment tracking



---

Financial Integrations

Support:

QuickBooks

ADP

Paychex

SAP

Oracle Financials



---

MODULE 12 — WORKFLOW ENGINE

Requirements

Implement:

approvals

role routing

escalation logic

reminders

deadlines

retries

workflow branching

rollback states

assignment queues



---

Notifications

Support:

email

SMS

Slack

Teams

in-app notifications

escalation alerts



---

MODULE 13 — REPORTING & ANALYTICS

Dashboards

Implement:

success rates

pipeline analytics

award forecasting

cash flow forecasting

risk heatmaps

compliance scoring

staff utilization

budget burn rates



---

Export Support

PDF

Excel

CSV

Board-ready reporting



---

MODULE 14 — SECURITY ARCHITECTURE

Mandatory Controls

Implement:

MFA

encryption at rest

encryption in transit

key rotation

secrets management

intrusion detection

audit logging

SIEM integration

IP allowlisting

session timeout policies

penetration testing schedules



---

Secrets Management

Use:

AWS Secrets Manager

HashiCorp Vault

Azure Key Vault


Never hardcode credentials.


---

MODULE 15 — OBSERVABILITY

Required Stack

OpenTelemetry

Grafana

Prometheus

Sentry

LangSmith



---

Monitoring Requirements

Track:

workflow execution

AI costs

API latency

retries

failures

hallucination rates

model usage

token consumption

queue depth

security events



---

MODULE 16 — API INTEGRATIONS

Federal Integrations

Support:

Grants.gov SOAP/XML

SAM.gov

ASAP.gov

IRS EIN verification

UEI validation



---

Enterprise Integrations

Support:

Salesforce

HubSpot

Google Workspace

Microsoft 365

SharePoint

Google Drive

DocuSign

Adobe Sign



---

MODULE 17 — DEPLOYMENT ARCHITECTURE

Infrastructure

Preferred:

AWS ECS

Kubernetes

Terraform

Docker

CloudFront

RDS PostgreSQL

Redis



---

CI/CD

Implement:

GitHub Actions

staging environments

rollback deployments

automated testing

infrastructure validation



---

MODULE 18 — AI GOVERNANCE

Requirements

Implement:

prompt versioning

model version pinning

fallback models

adversarial prompt defense

hallucination safeguards

source attribution

confidence thresholds

AI audit logs



---

Models

Support:

OpenAI

Anthropic

Gemini

local LLMs

Mistral

Llama


Model routing required.


---

MODULE 19 — SCALABILITY REQUIREMENTS

The platform must support:

1000+ organizations

millions of documents

high-concurrency workflows

multi-region deployments

burst scaling during federal cycles


Implement:

horizontal scaling

queue partitioning

caching

async processing

CDN optimization



---

MODULE 20 — MVP EXECUTION STRATEGY

PHASE 1

Build:

authentication

grant discovery

Kanban pipeline

AI drafting

compliance pre-checks

audit logging

document storage



---

PHASE 2

Add:

Brain DB

institutional memory

financial intelligence

reporting

OCR

notifications



---

PHASE 3

Add:

post-award management

drawdowns

board reporting

predictive analytics

advanced integrations



---

PHASE 4

Add:

autonomous orchestration

advanced forecasting

strategic intelligence

optimization engines



---

ENGINEERING EXECUTION RULES

The system must:

avoid architectural drift

avoid placeholder systems

avoid mock integrations

avoid fake security claims

avoid hallucinated infrastructure

avoid non-deterministic compliance systems


All generated code must:

compile

run

deploy

scale

log

recover

retry safely

validate input

enforce RBAC

preserve auditability



---

FINAL DEPLOYMENT OBJECTIVE

The final result must behave as:

> a production-grade AI-native federal grant operations operating system.



The platform must successfully support:

operational execution

audit readiness

compliance enforcement

institutional intelligence

workflow governance

strategic funding optimization

multi-tenant SaaS deployment

enterprise integrations

AI-assisted orchestration


No subsystem may remain conceptual.

Everything must map to:

executable architecture

deployable infrastructure

production-ready workflows

real compliance requirements

secure enterprise operations


The platform must be capable of being:

deployed

maintained

audited

scaled

secured

commercialized

enterprise adopted


Build GrantOS accordingly.
