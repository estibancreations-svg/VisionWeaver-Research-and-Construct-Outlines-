# Estiban Command Nexus

Build the EstibanCreations CEO Command Center as the unified operating environment for the Architect. This is the complete system shell, not a simple dashboard. Build a production-quality full-stack TypeScript application with a dark cyberpunk executive command-center aesthetic and a HighLevel-style left navigation structure. The application must be modular and designed to grow into the complete enterprise operating system.

Core architecture:
- CEO Command Center as the top-level operating environment.
- C-Suite System of Record as the governance source of truth.
- CEO AI executive synthesis and decision preparation.
- T.H.E.L.M.A. as orchestration, verification, memory, standards, and operational control layer.
- Systems registry for VisionWeaver, LandWeaver, GrantOS, CMGIO/Marketing, Telecommunications, IAM Self Help, Personal Assessment, AI Mastery/Training, and additional systems.
- Universal Workspaces, Projects, Sessions, Agents, Tasks, Decisions, Approvals, Memory, Files, Connectors, Workflows, Runtimes, Audit, Health, Training, and Reference Library as first-class platform concepts.
- Golden Path authorization flow: Ingest → Verify → Think → Check → ASK → Execute only after Architect authorization.
- n8n runtime selector with multiple runtime modes represented: Cloud, Self-Hosted, Air-Gapped, Local/Sandbox. The selector must not bypass governance.
- VisionWeaver 2.2.6 as a connected media/narrative production system using an asset-first Story Core concept: persistent projects, stories, characters, character history, reference assets, environments, style bibles, storyboards, scenes, audio, voice identities, production specs, renders, distribution, marketing assets, templates, and version history. Support generalized creation pipelines that can render into books, audio, video, storyboards, magazines, marketing kits, and distribution adapters.
- LandWeaver must inherit the generalized creation pipeline pattern for property intelligence, visual development, listing production, marketing, and related creation workflows.
- System Registry should expose purpose, owner officer, version, status, health, connected systems, agents, workspaces, workflows, integrations, documentation, training, roadmap, and open issues.
- Workspace model must support documents, files, images, videos, notes, sketches, bookmarks, memory gems, projects, agents, sessions, templates, and outputs.
- Universal Launcher for creating projects and starting workflows without requiring the user to know which system owns the work.
- Universal Search across systems, workspaces, projects, sessions, agents, decisions, files, outputs, and memory.
- Decision/Approval Queue for actions requiring Architect authorization.
- System Health and Audit with workflow failures, runtime health, usage/cost placeholders, integration issues, drift, incidents, and pending migrations.
- Training, reference materials, creative library, sketches/doodles, pre-created media, and memory gems as accessible workspace areas.

Build the initial application with a polished functional shell and realistic seeded data for the C-Suite, systems registry, active work, decisions, health, and VisionWeaver/LandWeaver creation pipelines. Use clear domain entities and a clean component architecture so the backend can be wired to Supabase and external connectors without rewriting the UI. Make the command center feel like opening a future operating system: one place to see the enterprise, launch work, continue projects, access systems, review decisions, and return to the executive view.

Do not create a superficial mockup. Build the actual application foundation with navigation, routing, reusable components, data models, state management, responsive layout, and functional interactions. Prioritize a working platform shell that can be expanded system-by-system.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://csuite-command.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1f7199cb-bb6e-4abe-ab95-87b1d2661570).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
