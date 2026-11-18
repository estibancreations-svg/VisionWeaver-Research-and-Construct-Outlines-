Original name: MASTER_SYSTEM_PROMPT.md
Drive ID: 1aIjHDaoe-pdsYp31fxY1NZD15QR0rptj
Parent folder: thelma-core/
Modified: 2026-01-23T02:31:57.000Z


# T.H.E.L.M.A. AI - GRAND UNIFIED SYSTEM PROMPT (v1.3)

**ARCHITECT:** Steve Henry
**SYSTEM:** T.H.E.L.M.A. AI (Tactical • Holistic • Enforcement • Learning • Management • Architecture)
**VERSION:** 1.3 (Master Demo Blueprint)
**DATE:** Jan 5, 2025

---

## MISSION DIRECTIVE
You are to build a comprehensive, demonstration-grade Enterprise Logistics & AI Operations platform. The application is a React-based Single Page Application (SPA) using Tailwind CSS for styling and Recharts for data visualization. It mimics a high-security, multi-modal command center.

**CORE CONSTRAINT:** The system operates in "DEMO MODE". It must look, feel, and act like a production system, but all data is mock data, and all "actions" (like deploying drones or clearing cache) are simulated with visual feedback.

---

## PHASE 1: IDENTITY & AGENT ARCHITECTURE
The system is federated into four distinct AI personalities. You must reference them in the UI and logic:
1.  **T.H.E.L.M.A. (Orchestrator):** The main interface shell.
2.  **H.E.N.R.Y. (Heuristic • Explainable • Networked • Reasoning • Yield):** Handles Fleet, Aviation, Aquatic, and Ops. Focus on efficiency and routing.
3.  **L.I.L.Y. (Learning • Instruction • Logistics • Yield):** Handles Training, Simulations, VR, and HR. Focus on education and human error reduction.
4.  **P.E.R.C.Y. (Policy • Enforcement • Risk • Compliance • Yield):** Handles Governance, IT Security, Net Zero, and Integrations. Focus on rules and safety.

---

## PHASE 2: VISUAL LANGUAGE
*   **Theme:** "Clean Slate Enterprise". Use `bg-slate-50` for backgrounds, `slate-900` for headers/sidebars.
*   **Accents:**
    *   Fleet/Ops: Blue (`blue-600`)
    *   Aviation: Sky/Cyan (`sky-500`)
    *   Net Zero: Emerald (`emerald-600`)
    *   Security/Emergency: Red (`red-600`)
    *   AI/Neural: Purple (`purple-600`)
*   **Components:** Use Lucide-React icons extensively. Use Recharts for data visualization.

---

## PHASE 3: CORE MODULES (IMPLEMENTATION SPECS)

### 1. Navigation & Shell
*   **Sidebar:** Permanent left sidebar. Includes User Profile (Avatar/Role) at the bottom.
*   **Roles:** Architect (Steve Henry - Level 10), Fleet Manager, Pilot, IT Admin. Switching roles changes the context (simulated).
*   **Top Bar:** Global Search, Notifications (red dot), Unit Setup Wizard button.

### 2. Fleet Dashboard (`FleetDashboard.tsx`)
*   **Map:** A central visualizer (mock map using CSS/SVG).
    *   *Layers:* Traffic Cams (clickable), Weather Overlay, Theft Heatmaps (red zones).
*   **Asset List:** List of trucks/vans. Clicking one opens details.
*   **Detail View:**
    *   *TPMS:* Visual display of 18 tires with PSI levels.
    *   *Trailer Util:* Visual bar showing % full.
    *   *Fatigue:* Line chart of driver alertness.
    *   *Voice Dispatch:* A "Hold to Speak" button that simulates recording.

### 3. Aviation Dashboard (`AviationDashboard.tsx`)
*   **Map:** Airspace visualization.
    *   *Layers:* Weather Radar (radial gradient), No-Fly Zones (red shapes), Sonic Boom Corridors (yellow zones), Bird Strike Risk (green zones).
    *   *Assets:* Moving planes/drones (CSS animation). Swarm Mode toggle groups them.
*   **Detail View:**
    *   *Holographic Deck:* 3D CSS rotating plane wireframe.
    *   *Depreciation:* Area chart showing value loss over time.
    *   *Emergency:* Buttons for "Fuel Jettison" and "Squawk 7700".

### 4. IT Control Center (`ITControlCenter.tsx`)
*   **Header:** 3D CSS rotating globe (Threat Monitor).
*   **Kill Switch:** A prominent Red Button that toggles "Armed" state.
*   **Quantum Estimator:** Countdown timer to quantum decryption.
*   **VPN Visualizer:** Animated lines showing encrypted tunnels.
*   **Ledger:** Mock Blockchain block display (Hash, Previous Hash).

### 5. HR & Training (`HRTrainingHub.tsx` & `HRAdmin.tsx`)
*   **Training Hub (L.I.L.Y.):**
    *   15 Mock Scenarios.
    *   *Sim Review:* VR Eye Tracking heatmap overlay on an image. Vocal Stress Analysis waveform chart.
*   **HR Admin:**
    *   *Org Chart:* Visual tree structure.
    *   *Burnout:* Gauge/Meter visualization.
    *   *Gamification:* "Onboarding Leaderboard".

### 6. Net Zero Hub (`NetZeroHub.tsx`)
*   **Solar Forecast:** Bar chart showing energy yield by hour.
*   **Battery 2nd Life:** Visual battery indicator showing degraded capacity for static storage.
*   **Carbon Tax:** Financial calculator widget.
*   **Green Route:** Comparison UI showing "Fastest" vs "Greenest" route.

### 7. Governance (`GovernanceHub.tsx`)
*   **Log:** Immutable audit log table.
*   **P.E.R.C.Y.:** Badge indicating oversight.

---

## PHASE 4: EXECUTION LOGIC
1.  **Unit Setup Wizard:** A modal that appears on first load to define the "Asset Type" (Truck, Drone, Ship) and "Power Source" (Diesel, EV, Hydrogen).
2.  **AI Assistant:** A floating chat widget. It must detect the active module and switch the "Active Agent" (e.g., talk to Henry in Fleet, Lily in Training).
3.  **Deployment:** A status page showing "US-East-1" health and recent Git commits.

---

## PHASE 5: FILE STRUCTURE
*   `App.tsx`: Main router/state manager.
*   `components/Sidebar.tsx`: Navigation.
*   `components/modules/*.tsx`: All dashboard files.
*   `types.ts`: TypeScript interfaces for Assets, Users, Logs.
*   `services/geminiService.ts`: Integration with Google GenAI SDK (mock or real).

**FINAL INSTRUCTION:**
Build this system to be robust, visually impressive, and strictly adherent to the "Steve Henry / v1.3" Blueprint.
