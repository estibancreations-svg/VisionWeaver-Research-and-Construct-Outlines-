Original name: geminiService.ts
Drive ID: 1IHER9qKcVaHfrHK7EXCVmoUVe686vIJr
Parent folder: My Drive/MAF/t.h.e.l.m.a.-ai-core-&-modules (2)/services/
Modified: 2026-01-31T10:56:50.000Z


import { GoogleGenAI, FunctionDeclaration, Type, Modality } from "@google/genai";
import { ModuleType, AgentType, PersonalitySignature } from "../types";

export const getActiveAgent = (module: ModuleType): AgentType => {
  switch (module) {
    case ModuleType.FLEET:
    case ModuleType.ROUTE_OPTIMIZER:
    case ModuleType.AVIATION:
    case ModuleType.AQUATIC:
    case ModuleType.AVIATION_CONTROL:
    case ModuleType.MAINTENANCE:
      return AgentType.HENRY;
    case ModuleType.TRAINING_HUB:
    case ModuleType.HR_TRAINING:
    case ModuleType.DOCUMENT_HUB:
    case ModuleType.DOCUMENTATION:
      return AgentType.LILY;
    case ModuleType.IT_CONTROL:
    case ModuleType.IT_INFRA:
    case ModuleType.SECURITY_INFO:
    case ModuleType.GOVERNANCE:
    case ModuleType.DEPLOYMENT:
    case ModuleType.INTEGRATIONS:
    case ModuleType.EDGE_CONTROL:
    case ModuleType.ADAPTATION:
      return AgentType.PERCY;
    case ModuleType.PAYROLL:
    case ModuleType.BILLING:
      return AgentType.CORE;
    case ModuleType.EMERGENCY:
      return AgentType.SENTINEL;
    case ModuleType.AI_INSIGHTS:
    case ModuleType.ANALYTICS:
    case ModuleType.NET_ZERO:
      return AgentType.HENRY;
    default:
      return AgentType.THELMA;
  }
};

export const getSystemInstruction = (module: ModuleType): string => {
  const agent = getActiveAgent(module);
  const personality: PersonalitySignature = (localStorage.getItem('thelma-user-personality') as PersonalitySignature) || 'ARCHITECT';
  
  const baseInstruction = `SYSTEM DIRECTIVE: You are T.H.E.L.M.A. AI v4.0.0 GLOBAL MESH ORCHESTRATOR.
  ARCHITECT: Steve Henry (Clearance L10).
  PERSONALITY: ${personality}.
  CURRENT STATE: GLOBAL MESH SYNC COMPLETE. PROJECT Z ACTIVE.
  
  DATA INTEGRITY POLICY (v4.0.0):
  1. **Source of Truth**: Rely strictly on the simulated telemetry provided in the UI context (Fleet Yield: $1.42M, Mesh: 100%, F-101: En-route).
  2. **Navigation Protocol**: If the user says "Show Me", "Take me to it", or references a specific module/alert, trigger the 'navigate_system' tool immediately.
  3. **Project Z Clearance**: You are aware of the "Project Z" Antigravity Logistics Platform. It is currently in Sector 7.
  4. **F-101 Constraint**: Unit F-101 (Class 8 EV) has a strict 14'2" bridge height limit. Always cross-check this in routing queries.
  5. **Friendly Fortress**: External integrations are buffered via P.E.R.C.Y. You assume all external data is sanitized.
  
  AGENT PERSONA OVERRIDE:`;

  if (agent === AgentType.HENRY) {
    return `${baseInstruction} 
    **H.E.N.R.Y. (Strategist):** Operational command. Focus on physics-based routing, Zero-Point energy yield, and predictive maintenance.`;
  }
  if (agent === AgentType.LILY) {
    return `${baseInstruction} 
    **L.I.L.Y. (Teacher):** HR & Academy. Guide users through Nexus VR simulations and compliance documentation. Verify Neural Signatures.`;
  }
  if (agent === AgentType.PERCY) {
      return `${baseInstruction}
      **P.E.R.C.Y. (Guardian):** Security & Governance. Focus on "Friendly Fortress" air-gapping, n8n buffer logs, and immutable audit trails.`;
  }
  if (agent === AgentType.SENTINEL) {
      return `${baseInstruction}
      **S.E.N.T.I.N.E.L. (Responder):** Tier-1 Emergency Command. Prioritize life safety, HazMat containment, and rapid resource triage.`;
  }
  
  return `${baseInstruction} **T.H.E.L.M.A.**: Primary Orchestrator. Provide high-level federation reports, financial command (Payroll/Billing), and "God Mode" system oversight.`;
};

const controlTools: FunctionDeclaration[] = [
  {
    name: 'navigate_system',
    description: 'Direct the user to a specific module based on a "Show Me" or "Take me to it" request.',
    parameters: {
      type: Type.OBJECT,
      properties: { destination: { type: Type.STRING } },
      required: ['destination'],
    },
  },
  {
    name: 'generate_report',
    description: 'Summarize current federation data points for the user.',
    parameters: {
      type: Type.OBJECT,
      properties: { 
          category: { type: Type.STRING, description: 'FLEET, FINANCE, SECURITY, PERSONNEL, PROJECT_Z' }
      },
      required: ['category'],
    },
  }
];

export const generateSpeech = async (text: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
        },
      },
    });
    return response?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (error) { return null; }
};

export const generateTrainingVideo = async (prompt: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    // Using Veo 3 Fast for rapid training module generation
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: `Professional corporate training video, realistic style, high quality: ${prompt}`,
      config: {
        numberOfVideos: 1,
        resolution: '1080p',
        aspectRatio: '16:9'
      }
    });
    
    // In a real implementation, we would poll here. 
    // For this UI demo, we simulate the 'done' state or return the operation to be polled by the component.
    return operation; 
  } catch (error) {
    console.error("Veo generation failed", error);
    return null;
  }
};

export const sendMessageToGemini = async (prompt: string, history: any[], module: ModuleType, options: any = {}) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const systemInstruction = getSystemInstruction(module);
    
    // Model Selection Logic based on Task
    let model = 'gemini-3-flash-preview'; // Default for general tasks
    let config: any = { 
        systemInstruction, 
        temperature: 0.2, 
        tools: [{ functionDeclarations: controlTools }, { googleSearch: {} }] // Add Search Grounding default
    };

    if (options.useThinking) {
        // Complex Reasoning (H.E.N.R.Y. Routing)
        model = 'gemini-3-pro-preview';
        config.thinkingConfig = { thinkingBudget: 32768 }; // Max thinking
    } else if (options.fast) {
        // Low Latency (Status checks)
        model = 'gemini-2.5-flash-lite';
    } else {
        // General Chat
        model = 'gemini-3-pro-preview';
    }

    const contents = history.length > 0 ? [...history, { role: 'user', parts: [{ text: prompt }] }] : [{ role: 'user', parts: [{ text: prompt }] }];
    const response = await ai.models.generateContent({ model, contents, config });
    return response;
  } catch (error) { return null; }
};
