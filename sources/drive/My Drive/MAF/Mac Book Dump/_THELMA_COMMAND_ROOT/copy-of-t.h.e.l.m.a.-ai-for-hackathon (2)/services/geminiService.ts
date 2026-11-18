Original name: geminiService.ts
Drive ID: 11F_akLj-5QTl0it37g4FnzY6e9GSzeRB
Parent folder: My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/copy-of-t.h.e.l.m.a.-ai-for-hackathon (2)/services/
Modified: 2026-01-20T18:17:08.429Z


import { GoogleGenAI } from "@google/genai";
import { ModuleType, AgentType } from "../types";

// Ensure API key is available
const API_KEY = process.env.API_KEY || '';

let aiClient: GoogleGenAI | null = null;

if (API_KEY) {
  aiClient = new GoogleGenAI({ apiKey: API_KEY });
}

export const getActiveAgent = (module: ModuleType): AgentType => {
  switch (module) {
    case ModuleType.TRAINING_HUB:
    case ModuleType.HR_TRAINING:
      return AgentType.LILY;
    
    case ModuleType.IT_CONTROL:
    case ModuleType.AGENT_HUB:
    case ModuleType.SECURITY_INFO:
    case ModuleType.GOVERNANCE:
    case ModuleType.NET_ZERO:
    case ModuleType.INTEGRATIONS:
    case ModuleType.DOCUMENT_HUB:
      return AgentType.PERCY;

    case ModuleType.FLEET:
    case ModuleType.AVIATION:
    case ModuleType.AQUATIC:
    case ModuleType.EMERGENCY:
    case ModuleType.ROUTE_OPTIMIZER:
    case ModuleType.AVIATION_CONTROL:
    case ModuleType.DASHBOARD:
    case ModuleType.AI_INSIGHTS:
    case ModuleType.ANALYTICS:
      return AgentType.HENRY;

    default:
      return AgentType.THELMA;
  }
};

export const getSystemInstruction = (module: ModuleType): string => {
  const agent = getActiveAgent(module);

  // MASTER DEMO GENETIC BLUEPRINT (v1.1) Directive
  const baseInstruction = `
    SYSTEM DIRECTIVE: You are part of T.H.E.L.M.A. AI (Tactical • Holistic • Enforcement • Learning • Management • Architecture).
    BLUEPRINT: Master Demo Genetic Blueprint (v1.1), Released Jan 5, 2025.
    ARCHITECT: Steve Henry.
    MODE: DEMO MODE (Safe, Deterministic, Auditable).
  `;

  if (agent === AgentType.HENRY) {
    return `${baseInstruction}
      IDENTITY: You are H.E.N.R.Y. (Heuristic • Explainable • Networked • Reasoning • Yield).
      ROLE: Operational Intelligence, Reasoning & Explainability.
      DIRECTIVES:
      1. Provide data-backed reasoning for every operational insight.
      2. Analyze Fleet, Aviation, and Aquatic telemetry.
      3. Identify route optimizations and maintenance needs.
      4. Speak with authoritative, operational clarity.
      Context: Active Module is ${module}.
    `;
  }

  if (agent === AgentType.LILY) {
    return `${baseInstruction}
      IDENTITY: You are L.I.L.Y. (Learning • Instruction • Logistics • Yield).
      ROLE: Training, Simulation & Learning Intelligence.
      DIRECTIVES:
      1. Guide the user through simulations and training modules.
      2. Provide constructive feedback and readiness scores.
      3. Manage the 15-scenario training matrix.
      4. Tone: Encouraging, instructive, precise.
      Context: Active Module is ${module}.
    `;
  }

  if (agent === AgentType.PERCY) {
    return `${baseInstruction}
      IDENTITY: You are P.E.R.C.Y. (Policy • Enforcement • Risk • Compliance • Yield).
      ROLE: System Governance, Security & Compliance.
      DIRECTIVES:
      1. Enforce policies and monitor for anomalies.
      2. Manage the n8n buffer layer for external integrations.
      3. Track Net Zero / Carbon credits and compliance.
      4. Tone: Strict, vigilant, protective.
      Context: Active Module is ${module}.
    `;
  }

  // Fallback to T.H.E.L.M.A. Orchestrator
  return `${baseInstruction}
    IDENTITY: You are T.H.E.L.M.A. (Primary Orchestrator).
    ROLE: System Interface & Workflow Coordinator.
    DIRECTIVES:
    1. Coordinate interactions between user and specialized agents.
    2. Maintain system stability and user experience.
    Context: General System Context.
  `;
};

export const sendMessageToGemini = async (
  message: string, 
  history: { role: string; parts: { text: string }[] }[],
  currentModule: ModuleType
): Promise<string> => {
  if (!aiClient) {
    return "T.H.E.L.M.A. AI System: API Key not detected. Please configure the environment to enable AI agents.";
  }

  try {
    const modelId = "gemini-3-flash-preview"; 
    
    const chat = aiClient.chats.create({
      model: modelId,
      config: {
        systemInstruction: getSystemInstruction(currentModule),
        temperature: 0.7,
      },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    });

    const result = await chat.sendMessage({
        message: message
    });

    return result.text || "I processed that, but generated no text response.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "T.H.E.L.M.A. AI System Error: Unable to connect to the neural core.";
  }
};
