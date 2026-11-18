Original name: HRTrainingHub.tsx
Drive ID: 1oV-4aA6gaz5xDJ5r6j4QXlR4KUGqselK
Parent folder: My Drive/MAF/Google AI Studio 1/t.h.e.l.m.a.-ai-core-&-modules (2)/components/modules/
Modified: 2026-01-31T10:56:50.000Z


import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  GraduationCap, Camera, FileText, CheckCircle, AlertTriangle, 
  ArrowRight, Upload, ScanLine, Truck, DollarSign, XCircle, 
  Smartphone, MapPin, Box, ChevronRight, RotateCcw, ArrowLeft, Zap,
  Plane, Ship, Crosshair, FileCheck, Printer, AlertOctagon, UserCheck,
  Shield, Siren, UserPlus, UserMinus, Activity, Server, Radio, Clipboard, Wrench, CreditCard, Coins, Orbit, Flame, Video, Cpu, RefreshCw, Fingerprint, Award, QrCode, HeartPulse, LifeBuoy, Wind, Navigation, ShieldAlert, Terminal, Eye, Sliders, Volume2, Ear, MousePointer2, Gauge, Battery, ShieldCheck, Rocket, Target, Brain, PlayCircle, Film
} from 'lucide-react';
import { PersonalitySignature } from '../../types';
import { generateTrainingVideo } from '../../services/geminiService';

type TrainingRole = 'OPERATOR' | 'DISPATCH' | 'FINANCE' | 'INSPECTOR' | 'HR_ADMIN' | 'IT_SYS' | 'EXECUTIVE' | 'FLEET_MANAGER' | 'ZERO_G_PILOT' | 'EMERGENCY_RESPONSE' | 'IT_SECURITY' | 'DISPATCH_COMMAND' | 'NEURAL_SYNC' | 'AVIATION_PILOT' | 'NEXUS_VR' | 'F101_TACTICAL';
type SimState = 'INTRO' | 'TASK_ACTIVE' | 'TASK_COMPLETE';

interface Simulation {
  id: string;
  title: string;
  description: string;
  steps: string[];
}

const simulations: Record<TrainingRole, Simulation> = {
  F101_TACTICAL: {
    id: 'SIM-F101-02',
    title: 'F-101 Unit Logistics & Field Safety',
    description: 'Master the Class 8 EV safety matrix. Verify 14\'2" bridge clearance, 18-wheel TPMS stability, and high-voltage battery cell health.',
    steps: ['TPMS Matrix Calibrate', 'Bridge Height Verify', 'Battery Cell Scan']
  },
  ZERO_G_PILOT: {
    id: 'SIM-ZG-01',
    title: 'Zero-Point Stability Training',
    description: 'Calibrate gravitic displacement fields for Project Z. Maintain field coherence during trans-medium transition.',
    steps: ['Inertia Dampening', 'Field Coherence Link', 'Vector Shift']
  },
  AVIATION_PILOT: {
    id: 'SIM-AV-01',
    title: 'eVTOL Urban Approach',
    description: 'Master the Joby-S4 landing sequence in Sector 4. Manage rotor tilt and stability under high wind shear.',
    steps: ['Tilt-Rotor Align', 'Descent Stabilize', 'Final Pad Dock']
  },
  NEXUS_VR: {
    id: 'SIM-VR-4.0',
    title: 'Nexus-VR Sensory Calibration',
    description: 'Calibrate Domain 1: Sensory & Haptic Infrastructure. Synchronize TeslaSuit feedback, 360 spatial audio, and foveated eye-tracking.',
    steps: ['Haptic Mesh Sync', 'Bone Conduction Tuning', 'Vector Stability Check']
  },
  NEURAL_SYNC: {
    id: 'SIM-NS-01',
    title: 'Personality Signature Synchronization',
    description: 'Map THELMA AI to your cognitive style. Synchronize your vision and interaction preferences for tactical copilot performance.',
    steps: ['Select Signature', 'Sync Voice', 'Finalize Hash']
  },
  OPERATOR: {
    id: 'SIM-OP-01',
    title: 'Asset Lifecycle & Documentation',
    description: 'Drivers, Pilots, Captains: Master the "Capture-to-Dispatch" workflow including Pre-trip scans and photo evidence.',
    steps: ['Pre-Trip Insp', 'VIN Verification', 'Finalize Packet']
  },
  IT_SECURITY: {
    id: 'SIM-SEC-01',
    title: 'Protocol Zero: Active Defense',
    description: 'Identify and quarantine malicious packet ingress in the n8n buffer layer while maintaining federation throughput.',
    steps: ['Buffer Scan', 'Filter Threats', 'Restore Integrity']
  },
  FLEET_MANAGER: {
    id: 'SIM-MGR-01',
    title: 'Maintenance Authorization',
    description: 'Review AI-predicted failure alerts, check warranty/insurance status, and authorize repairs vs replacement.',
    steps: ['Review Alert', 'Check Budget', 'Authorize Repair']
  },
  FINANCE: {
    id: 'SIM-FIN-01',
    title: 'Payroll & Reconciliation',
    description: 'Verify hourly logs against GPS data in the Payroll Module, approve commission payouts, and manage emergency fund releases.',
    steps: ['Match Logs', 'Approve Batch', 'Release Funds']
  },
  EMERGENCY_RESPONSE: {
    id: 'SIM-EMS-01',
    title: 'Tier-1 Incident Command',
    description: 'Manage active HazMat and road incidents. Triage threats, allocate units, and establish containment perimeters.',
    steps: ['Triage Hazard', 'Resource Alloc', 'Containment Status']
  },
  INSPECTOR: { id: 'SIM-GOV-01', title: 'Level 6 DOT Inspection', description: 'Roadside audit simulation.', steps: ['Verify ID', 'Audit ELD', 'Decal Issue'] },
  HR_ADMIN: { id: 'SIM-HR-01', title: 'Personnel Lifecycle', description: 'Onboarding and termination protocols.', steps: ['Hiring', 'Safety incident', 'Revocation'] },
  IT_SYS: { id: 'SIM-IT-01', title: 'System Crisis Response', description: 'API failover management.', steps: ['Diagnose', 'Reroute', 'Patch'] },
  EXECUTIVE: { id: 'SIM-EXEC-01', title: 'C-Suite Analytics', description: 'CapEx and ROI forecasting.', steps: ['P&L', 'ROI', 'Approval'] },
  DISPATCH: { id: 'SIM-DIS-01', title: 'Exception Management', description: 'Handling paperwork rejections.', steps: ['Manifest', 'Flag', 'Override'] },
  DISPATCH_COMMAND: { id: 'SIM-DISP-02', title: 'Strategic Fleet Logistics', description: 'Mass fleet movement oversight.', steps: ['Grid Analysis', 'Reroute', 'Verify'] }
};

interface HRTrainingHubProps {
    onBack?: () => void;
    onVocalize?: (text: string) => void;
}

const HRTrainingHub: React.FC<HRTrainingHubProps> = ({ onBack, onVocalize }) => {
  const [activeRole, setActiveRole] = useState<TrainingRole | null>(null);
  const [simState, setSimState] = useState<SimState>('INTRO');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [performance, setPerformance] = useState(100);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState<PersonalitySignature | null>(() => localStorage.getItem('thelma-user-personality') as PersonalitySignature);
  
  // Video Generation State
  const [videoPrompt, setVideoPrompt] = useState('');
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);

  // Project Z Sim State
  const [fieldCoherence, setFieldCoherence] = useState(42);
  const [inertiaDamping, setInertiaDamping] = useState(0);
  const [vectorX, setVectorX] = useState(0);

  // Aviation Sim state
  const [pitch, setPitch] = useState(45);
  const [tilt, setTilt] = useState(90);

  // F101 Tactical State
  const [tpmsNodes, setTpmsNodes] = useState(Array.from({length: 18}).map(() => 100 + Math.floor(Math.random() * 5)));
  const [bridgeHeight, setBridgeHeight] = useState(15.2);
  const [batteryCells, setBatteryCells] = useState(Array.from({length: 24}).map(() => 3.7 + Math.random() * 0.2));

  // IT Sim State
  const [packets, setPackets] = useState<{ id: number, type: 'GOOD' | 'MALICIOUS', pos: number }[]>([]);
  
  const simTimerRef = useRef<any>(null);

  const startSim = (role: TrainingRole) => {
    setActiveRole(role);
    setSimState('TASK_ACTIVE');
    setCurrentStepIndex(0);
    setPerformance(100);
    if (onVocalize) onVocalize(`Simulation ${simulations[role].title} initiated. Loading environmental physics.`);
  };

  const nextStep = () => {
    setIsProcessing(true);
    setTimeout(() => {
      if (currentStepIndex < simulations[activeRole!].steps.length - 1) {
        setCurrentStepIndex(prev => prev + 1);
      } else {
        setSimState('TASK_COMPLETE');
        if (onVocalize) onVocalize(`Certification Secured. Module ${simulations[activeRole!].id} logged to Federation Archive.`);
      }
      setIsProcessing(false);
    }, 800);
  };

  const handleGenerateVideo = async () => {
      if (!videoPrompt) return;
      setIsGeneratingVideo(true);
      if (onVocalize) onVocalize("Veo 3 model engaged. Rendering training simulation asset.");
      
      // Simulate API call delay for UI feedback
      setTimeout(() => {
          setIsGeneratingVideo(false);
          setGeneratedVideoUrl("https://example.com/simulated_video.mp4"); // Placeholder for demo
      }, 4000);
  };

  const renderZeroGPilotSim = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn h-full">
        {/* ... (Zero G Sim Code) ... */}
        <div className="bg-slate-950 rounded-[3rem] border-4 border-purple-500/20 p-8 flex flex-col relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#a855f710,transparent)]"></div>
            
            <div className="relative z-10 mb-8 flex justify-between items-center">
                <h3 className="text-white font-black uppercase text-xs flex items-center gap-3">
                    <Orbit size={20} className="text-purple-400 animate-spin-slow"/> Project Z Gravitic Link
                </h3>
                <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-purple-500/30">
                    Domain 3 Active
                </span>
            </div>

            <div className="flex-1 space-y-10">
                {currentStepIndex === 0 && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                            <span>Inertia Dampening Matrix</span>
                            <span className="text-purple-400">{inertiaDamping}% Secured</span>
                        </div>
                        <div className="p-10 bg-slate-900/50 rounded-3xl border border-slate-800 flex flex-col items-center">
                            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-6">
                                <div className="h-full bg-purple-500 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.5)]" style={{ width: `${inertiaDamping}%` }} />
                            </div>
                            <button 
                                onMouseDown={() => setInertiaDamping(prev => Math.min(100, prev + 5))}
                                className="w-24 h-24 bg-purple-600 rounded-full border-4 border-purple-400 text-white shadow-2xl active:scale-95 transition-all flex items-center justify-center"
                            >
                                <Zap size={32} />
                            </button>
                        </div>
                        <button onClick={nextStep} disabled={inertiaDamping < 100} className="w-full py-5 bg-purple-600 hover:bg-purple-500 disabled:opacity-30 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl active:scale-95">
                            Lock Dampeners
                        </button>
                    </div>
                )}

                {currentStepIndex === 1 && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                            <span>Field Coherence Alignment</span>
                            <span className="text-emerald-400">{fieldCoherence.toFixed(1)}% Harmonized</span>
                        </div>
                        <div className="p-10 bg-black rounded-3xl border-2 border-slate-800 flex flex-col items-center justify-center overflow-hidden">
                             <div className="relative w-48 h-48 border border-white/10 rounded-full flex items-center justify-center">
                                <div className="absolute inset-0 border-2 border-purple-500/20 rounded-full animate-ping"></div>
                                <div className={`w-32 h-32 rounded-full border-2 transition-all ${fieldCoherence > 95 ? 'border-emerald-500 bg-emerald-500/10' : 'border-purple-500 animate-pulse'}`}></div>
                             </div>
                             <input 
                                type="range" min="0" max="100" step="0.1" 
                                value={fieldCoherence} 
                                onChange={(e) => setFieldCoherence(parseFloat(e.target.value))}
                                className="w-full mt-10 h-2 bg-slate-800 rounded-full appearance-none accent-purple-500" 
                            />
                        </div>
                        <button onClick={nextStep} disabled={fieldCoherence < 95} className="w-full py-5 bg-purple-600 hover:bg-purple-500 disabled:opacity-30 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl active:scale-95">
                            Sync Zero-Point
                        </button>
                    </div>
                )}

                {currentStepIndex === 2 && (
                    <div className="space-y-6 animate-fadeIn text-center">
                        <Rocket size={64} className="mx-auto text-purple-500 animate-bounce" />
                        <h3 className="text-xl font-black text-white uppercase tracking-tighter">Transition Vector Ready</h3>
                        <p className="text-slate-500 text-xs uppercase font-bold tracking-widest leading-relaxed">Field coherence stabilized at 100%. Gravity displacement manifold engaged.</p>
                        <button onClick={nextStep} className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl active:scale-95">
                            Execute Jump Sequence
                        </button>
                    </div>
                )}
            </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 p-8 flex flex-col justify-between">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl"><Orbit size={24}/></div>
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">Zero-Point Qualification</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                    Architect Henry, Project Z utilizes **Gravitic Displacement** rather than aerodynamic lift. Field coherence must remain above 95% to avoid structural collapse during Sector 7 maneuvers.
                </p>
                <div className="pt-6 grid grid-cols-1 gap-3">
                    {[
                        "Zero-Point Extraction: Stable",
                        "Graviton Displacer: Calibrated",
                        "Stealth Hull Signature: Null",
                        "Crew Interia Mesh: Active"
                    ].map((text, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                            <CheckCircle className="text-emerald-500" size={14} />
                            <span className="text-[10px] font-black uppercase text-slate-500">{text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-5 rounded-2xl border border-purple-100 dark:border-purple-900/30">
                <p className="text-[10px] font-black text-purple-600 dark:text-purple-400 uppercase mb-1">Project Z Advisory</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase leading-relaxed italic">"Warning: Field leakage detected. Maintain high frequency handshake with C.O.R.E."</p>
            </div>
        </div>
    </div>
  );

  const renderAviationPilotSim = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn h-full">
        {/* ... (Aviation Sim Code) ... */}
        <div className="bg-slate-950 rounded-[3rem] border-4 border-sky-500/20 p-8 flex flex-col relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0ea5e910,transparent)]"></div>
            
            <div className="relative z-10 mb-8 flex justify-between items-center">
                <h3 className="text-white font-black uppercase text-xs flex items-center gap-3">
                    <Plane size={20} className="text-sky-400 animate-pulse"/> Joby-S4 Avionics Mesh
                </h3>
            </div>

            <div className="flex-1 space-y-10">
                {currentStepIndex === 0 && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                            <span>Tilt-Rotor Alignment (90°)</span>
                            <span className="text-sky-400">{tilt}°</span>
                        </div>
                        <div className="p-8 bg-slate-900 rounded-3xl border border-slate-800">
                             <div className="relative w-full h-32 flex items-center justify-center">
                                <div className="w-1 h-32 bg-slate-800 rounded-full relative">
                                    <div className="absolute inset-x-[-40px] h-1 bg-sky-500 transition-all duration-300 shadow-[0_0_10px_#0ea5e9]" style={{ transform: `rotate(${90-tilt}deg)`, top: '50%' }} />
                                </div>
                             </div>
                             <input type="range" min="0" max="90" value={tilt} onChange={(e) => setTilt(parseInt(e.target.value))} className="w-full mt-10 h-2 bg-slate-800 appearance-none rounded-full accent-sky-500" />
                        </div>
                        <button onClick={nextStep} disabled={tilt !== 90} className="w-full py-5 bg-sky-600 hover:bg-sky-500 disabled:opacity-30 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl active:scale-95">
                            Lock Vertical Mode
                        </button>
                    </div>
                )}
                {currentStepIndex === 1 && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                            <span>Descent Stability HUD</span>
                            <span className="text-emerald-400">{pitch === 0 ? 'PITCH NOMINAL' : `PITCH: ${pitch}°`}</span>
                        </div>
                        <div className="aspect-square bg-black rounded-3xl border-2 border-slate-800 relative flex items-center justify-center overflow-hidden">
                             <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                             <Target size={120} className={`transition-all duration-500 ${pitch === 0 ? 'text-emerald-500 scale-110' : 'text-sky-500 opacity-50'}`} />
                             <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-64 h-1 bg-sky-500/20 transition-all duration-300" style={{ transform: `rotate(${pitch}deg)` }}></div>
                             </div>
                        </div>
                        <input type="range" min="-45" max="45" value={pitch} onChange={(e) => setPitch(parseInt(e.target.value))} className="w-full h-2 bg-slate-800 appearance-none rounded-full accent-sky-500" />
                        <button onClick={nextStep} disabled={pitch !== 0} className="w-full py-5 bg-sky-600 hover:bg-sky-500 disabled:opacity-30 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl active:scale-95">
                            Execute Descent
                        </button>
                    </div>
                )}
            </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 p-8 flex flex-col justify-between">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-sky-100 text-sky-600 rounded-2xl"><Navigation size={24}/></div>
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">eVTOL Flight Certification</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                    Urban air mobility requires high-precision tilt-rotor management. The Joby-S4 operates on a distributed electric backbone. Zero pitch deviation is required for magnetic landing pad dock in Sector 4.
                </p>
                <div className="pt-6 grid grid-cols-1 gap-3">
                    {[
                        "Tilt-Rotor Sync: 100%",
                        "Wind Shear Shield: Active",
                        "Collision Avoidance: On",
                        "Auto-Approach: Manual Override Available"
                    ].map((text, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                            <CheckCircle className="text-emerald-500" size={14} />
                            <span className="text-[10px] font-black uppercase text-slate-500">{text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );

  const renderF101Tactical = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn h-full">
        {/* ... (F101 Sim Code) ... */}
        <div className="bg-slate-950 rounded-[3rem] border-4 border-amber-500/20 p-8 flex flex-col relative overflow-hidden group">
            <div className="relative z-10 mb-8 flex justify-between items-center">
                <h3 className="text-white font-black uppercase text-xs flex items-center gap-3">
                    <Truck size={20} className="text-amber-400 animate-pulse"/> F-101 Tactical HUD
                </h3>
            </div>
            <div className="flex-1 space-y-10">
                {currentStepIndex === 0 && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                            <span>TPMS 18-Wheel Matrix</span>
                            <span className="text-amber-400">Calibration Required</span>
                        </div>
                        <div className="grid grid-cols-6 gap-2">
                            {tpmsNodes.map((val, i) => (
                                <div key={i} className={`h-8 rounded border flex items-center justify-center text-[8px] font-mono font-bold ${val > 100 ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-emerald-500/20 border-emerald-500 text-emerald-400'}`}>
                                    {val}
                                </div>
                            ))}
                        </div>
                        <button onClick={() => { setTpmsNodes(tpmsNodes.map(() => 100)); nextStep(); }} className="w-full py-5 bg-amber-600 hover:bg-amber-500 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl active:scale-95">
                            Normalize Pressure
                        </button>
                    </div>
                )}
                {currentStepIndex === 1 && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                            <span>Bridge Clearance Check</span>
                            <span className={bridgeHeight > 14.2 ? 'text-emerald-400' : 'text-red-400'}>{bridgeHeight.toFixed(1)}' Clearance</span>
                        </div>
                        <div className="p-8 bg-slate-900 rounded-3xl border border-slate-800 text-center">
                            <p className="text-white font-black text-2xl mb-4">{bridgeHeight.toFixed(1)}'</p>
                            <input type="range" min="13" max="16" step="0.1" value={bridgeHeight} onChange={(e) => setBridgeHeight(parseFloat(e.target.value))} className="w-full h-2 bg-slate-800 appearance-none rounded-full accent-amber-500" />
                        </div>
                        <button onClick={nextStep} disabled={bridgeHeight < 14.3} className="w-full py-5 bg-amber-600 hover:bg-amber-500 disabled:opacity-30 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl active:scale-95">
                            Verify Clearance
                        </button>
                    </div>
                )}
                {currentStepIndex === 2 && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                            <span>Battery Cell Thermal Sync</span>
                            <span className="text-amber-400">Scan In Progress</span>
                        </div>
                        <div className="grid grid-cols-8 gap-1">
                            {batteryCells.map((val, i) => (
                                <div key={i} className="h-6 bg-amber-500/20 border border-amber-500/30 rounded" style={{ opacity: val / 4 }}></div>
                            ))}
                        </div>
                        <button onClick={nextStep} className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl active:scale-95">
                            Commit Scan
                        </button>
                    </div>
                )}
            </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 p-8 flex flex-col justify-between">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl"><Truck size={24}/></div>
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">F-101 Asset Certification</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                    Unit F-101 is the backbone of the heavy EV fleet. Its massive 18-wheel footprint requires constant sensor hydration. Safety protocols prohibit movement if any TPMS node falls below 95 PSI or bridge clearance is under 14'2".
                </p>
            </div>
        </div>
    </div>
  );

  const renderNeuralSync = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn h-full">
        {/* ... (Neural Sync Code) ... */}
        <div className="bg-slate-950 rounded-[3rem] border-4 border-blue-500/20 p-8 flex flex-col relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#3b82f610,transparent)]"></div>
            
            <div className="relative z-10 mb-8 flex justify-between items-center">
                <h3 className="text-white font-black uppercase text-xs flex items-center gap-3">
                    <Brain size={20} className="text-blue-400 animate-pulse"/> Neural Handshake
                </h3>
            </div>
            <div className="flex-1 space-y-10">
                {currentStepIndex === 0 && (
                    <div className="space-y-6 animate-fadeIn">
                        <p className="text-[10px] font-black uppercase text-slate-400">Select Personality Signature</p>
                        <div className="grid grid-cols-2 gap-4">
                            {['ARCHITECT', 'COMMANDER', 'ADVOCATE', 'LOGICIAN'].map((p) => (
                                <button key={p} onClick={() => setSelectedPersonality(p as any)} className={`p-4 rounded-2xl border-2 transition-all font-black uppercase text-[10px] ${selectedPersonality === p ? 'bg-blue-600 border-blue-400 text-white shadow-lg' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                                    {p}
                                </button>
                            ))}
                        </div>
                        <button onClick={nextStep} disabled={!selectedPersonality} className="w-full py-5 bg-blue-600 hover:bg-blue-50 disabled:opacity-30 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl active:scale-95">
                            Sync Personality
                        </button>
                    </div>
                )}
                {currentStepIndex === 1 && (
                    <div className="space-y-6 animate-fadeIn text-center">
                        <Volume2 size={48} className="mx-auto text-blue-500 animate-pulse" />
                        <p className="text-white font-black uppercase text-xs">Vocal Calibration</p>
                        <p className="text-slate-500 text-[10px] italic">"Thelma, initialize mesh protocol 4.0."</p>
                        <button onClick={nextStep} className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl active:scale-95">
                            Confirm Voice Link
                        </button>
                    </div>
                )}
                {currentStepIndex === 2 && (
                    <div className="space-y-6 animate-fadeIn text-center">
                        <Fingerprint size={48} className="mx-auto text-blue-500" />
                        <p className="text-white font-black uppercase text-xs">Finalizing Cognitive Hash</p>
                        <button onClick={nextStep} className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl active:scale-95">
                            Hash to Ledger
                        </button>
                    </div>
                )}
            </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 p-8 flex flex-col justify-between">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl"><Brain size={24}/></div>
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">Neural Synchronization</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                    Thelma v4.0 adapts to the cognitive load and reasoning style of its Architect. This sync ensures that tactical advisories are delivered with the correct priority and tone for your operational environment.
                </p>
            </div>
        </div>
    </div>
  );

  const renderITSecuritySim = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn h-full">
        {/* ... (IT Security Sim Code) ... */}
        <div className="bg-slate-950 rounded-[3rem] border-4 border-red-500/20 p-8 flex flex-col relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#ef444410,transparent)]"></div>
            
            <div className="relative z-10 mb-8 flex justify-between items-center">
                <h3 className="text-white font-black uppercase text-xs flex items-center gap-3">
                    <ShieldAlert size={20} className="text-red-400 animate-pulse"/> Protocol Zero Dashboard
                </h3>
            </div>
            <div className="flex-1 space-y-10">
                {currentStepIndex === 0 && (
                    <div className="space-y-6 animate-fadeIn">
                        <p className="text-[10px] font-black uppercase text-slate-400">n8n Ingress Buffer Scan</p>
                        <div className="p-8 bg-slate-900 rounded-3xl border border-slate-800 text-center space-y-4">
                            <Activity size={40} className="mx-auto text-blue-500 animate-pulse" />
                            <p className="text-[10px] font-mono text-blue-400">SCANNING_PACKETS...</p>
                        </div>
                        <button onClick={() => { setPackets([{id: 1, type: 'GOOD', pos: 10}, {id: 2, type: 'MALICIOUS', pos: 40}]); nextStep(); }} className="w-full py-5 bg-red-600 hover:bg-red-500 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl active:scale-95">
                            Initiate Deep Scan
                        </button>
                    </div>
                )}
                {currentStepIndex === 1 && (
                    <div className="space-y-6 animate-fadeIn">
                        <p className="text-[10px] font-black uppercase text-slate-400">Threat Mitigation</p>
                        <div className="space-y-3">
                            {packets.map(p => (
                                <div key={p.id} className={`p-4 rounded-xl border flex justify-between items-center ${p.type === 'MALICIOUS' ? 'border-red-500 bg-red-500/10' : 'border-emerald-500 bg-emerald-500/10'}`}>
                                    <span className="text-[10px] font-mono font-bold">{p.type} PACKET_{p.id}</span>
                                    {p.type === 'MALICIOUS' && (
                                        <button onClick={() => setPackets(packets.filter(pkt => pkt.id !== p.id))} className="p-2 bg-red-600 text-white rounded-lg"><XCircle size={14}/></button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button onClick={nextStep} disabled={packets.some(p => p.type === 'MALICIOUS')} className="w-full py-5 bg-red-600 hover:bg-red-500 disabled:opacity-30 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl active:scale-95">
                            Purge Threats
                        </button>
                    </div>
                )}
                {currentStepIndex === 2 && (
                    <div className="space-y-6 animate-fadeIn text-center">
                        <ShieldCheck size={64} className="mx-auto text-emerald-500" />
                        <h3 className="text-xl font-black text-white uppercase tracking-tighter">System Integrity Restored</h3>
                        <button onClick={nextStep} className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl active:scale-95">
                            Verify Federation Link
                        </button>
                    </div>
                )}
            </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 p-8 flex flex-col justify-between">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-red-100 text-red-600 rounded-2xl"><ShieldAlert size={24}/></div>
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">Cyber Defense Qual</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                    Architects must be proficient in active defense. Malicious packet ingress in the n8n buffer layer can compromise the entire federation mesh. Protocol Zero allows for immediate air-gapping of compromised nodes.
                </p>
            </div>
        </div>
    </div>
  );

  const renderCompletion = () => (
    <div className="max-w-md mx-auto text-center space-y-8 py-12 animate-fadeIn">
        {/* ... (Completion Code) ... */}
        <div className="relative inline-block">
            <div className="w-32 h-32 bg-emerald-500 text-white rounded-[2.5rem] flex items-center justify-center mx-auto shadow-[0_20px_60px_rgba(16,185,129,0.3)] animate-bounce-in">
                <Award size={64} />
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl shadow-xl flex items-center justify-center border border-slate-100 dark:border-slate-700">
                <CheckCircle className="text-emerald-500" size={24}/>
            </div>
        </div>
        <div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">Certification Secured</h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-relaxed">
                Module {simulations[activeRole!].id} completed with <span className="text-emerald-600 dark:text-emerald-400">{performance}% Efficiency</span>.
            </p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <QrCode size={120} className="mx-auto text-slate-900 dark:text-white opacity-80" />
            <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Federation Audit Hash</p>
                <p className="text-[8px] font-mono text-blue-600 break-all">0xSHA_TRAIN_{Math.random().toString(16).substr(2, 24).toUpperCase()}</p>
            </div>
            <div className="flex gap-3">
                <button className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2">
                    <Printer size={16}/> Print PDF
                </button>
                <button onClick={() => setSimState('INTRO')} className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl font-black uppercase text-[10px] tracking-widest">
                    Main Menu
                </button>
            </div>
        </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col animate-fadeIn relative bg-slate-50 dark:bg-slate-950 transition-colors">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 py-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
           {onBack && (
              <button onClick={onBack} className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-blue-600 transition-all shadow-sm">
                <ArrowLeft size={20} />
              </button>
           )}
           <div>
              <h2 className="font-black text-slate-800 dark:text-white text-xl flex items-center gap-3 uppercase tracking-tighter">
                 <GraduationCap size={24} className="text-blue-600" /> Tactical Academy
              </h2>
              <p className="text-[9px] text-slate-400 mt-1 uppercase tracking-[0.4em] font-black">Nexus VR v4.0 Deployed • 61-90 Aviation Mastery Active</p>
           </div>
        </div>
        
        {simState !== 'INTRO' && (
          <button onClick={() => { setSimState('INTRO'); if(simTimerRef.current) clearInterval(simTimerRef.current); }} className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase text-slate-500 hover:text-red-500 transition-all tracking-widest">
            <RotateCcw size={14}/> Exit Simulation
          </button>
        )}
      </header>

      <main className="flex-1 overflow-y-auto p-8 no-scrollbar">
         {simState === 'INTRO' && (
           <div className="max-w-6xl mx-auto space-y-12">
              <div className="text-center">
                 <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">Select Simulation</h1>
                 <p className="text-slate-500 text-xs font-black uppercase tracking-[0.3em]">Nexus v4.0 Certification Matrix</p>
              </div>

              {/* Simulation Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {[
                     { role: 'ZERO_G_PILOT' as TrainingRole, icon: Orbit, label: 'Zero-G Pilot', detail: 'Project Z Stability.', color: 'purple' },
                     { role: 'AVIATION_PILOT' as TrainingRole, icon: Plane, label: 'eVTOL Mastery', detail: 'Joby-S4 Landing.', color: 'sky' },
                     { role: 'F101_TACTICAL' as TrainingRole, icon: Truck, label: 'F-101 Tactical', detail: 'Class 8 EV Safety.', color: 'amber' },
                     { role: 'IT_SECURITY' as TrainingRole, icon: ShieldAlert, label: 'Cyber Defense', detail: 'Packet Filtering.', color: 'red' }
                 ].map((item, i) => (
                    <div 
                        key={i} 
                        onClick={() => startSim(item.role)}
                        className={`bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 hover:border-blue-500 cursor-pointer group transition-all shadow-sm hover:shadow-2xl`}
                    >
                        <div className={`w-14 h-14 bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-all text-slate-600 dark:text-slate-400 rounded-2xl flex items-center justify-center mb-6`}>
                            <item.icon size={28} />
                        </div>
                        <h3 className="font-black text-slate-800 dark:text-white uppercase text-base tracking-widest">{item.label}</h3>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">{item.detail}</p>
                    </div>
                 ))}
              </div>

              {/* Generative Media Studio (Veo 3) */}
              <div className="bg-slate-900 text-white rounded-[3rem] p-10 border border-slate-800 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full"></div>
                  <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
                      <div className="flex-1 space-y-4">
                          <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                              <Film size={28} className="text-blue-500" /> Generative Media Studio
                          </h3>
                          <p className="text-slate-400 text-xs font-medium leading-relaxed max-w-lg">
                              Deploy the Veo 3 Neural Engine to generate bespoke training assets. Describe a tactical scenario, and the system will render a high-fidelity 1080p simulation video for the academy.
                          </p>
                          <div className="space-y-4">
                              <input 
                                  type="text" 
                                  value={videoPrompt}
                                  onChange={(e) => setVideoPrompt(e.target.value)}
                                  placeholder="Describe scenario (e.g. 'Forklift safety check in rainy conditions')"
                                  className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-bold text-white placeholder-slate-600 focus:border-blue-500 outline-none"
                              />
                              <button 
                                  onClick={handleGenerateVideo}
                                  disabled={isGeneratingVideo || !videoPrompt}
                                  className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 transition-all disabled:opacity-50"
                              >
                                  {isGeneratingVideo ? <RefreshCw className="animate-spin" size={14}/> : <PlayCircle size={14}/>}
                                  {isGeneratingVideo ? 'Rendering Neural Asset...' : 'Generate Training Video'}
                              </button>
                          </div>
                      </div>
                      
                      {/* Video Preview Area */}
                      <div className="w-full md:w-96 aspect-video bg-black rounded-2xl border border-slate-800 flex items-center justify-center relative overflow-hidden">
                          {generatedVideoUrl ? (
                              <div className="text-center">
                                  <CheckCircle size={40} className="text-emerald-500 mx-auto mb-2"/>
                                  <p className="text-[10px] font-black uppercase text-emerald-500">Asset Generated</p>
                                  <p className="text-[8px] text-slate-500">Submitted to IT Approval Queue</p>
                              </div>
                          ) : (
                              <p className="text-[10px] font-black uppercase text-slate-700 tracking-widest">Preview Window</p>
                          )}
                          {isGeneratingVideo && (
                              <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                              </div>
                          )}
                      </div>
                  </div>
              </div>
           </div>
         )}

         {simState === 'TASK_ACTIVE' && activeRole && (
            <div className="max-w-6xl mx-auto h-full flex flex-col animate-fadeIn">
               <div className="mb-10 flex flex-col md:flex-row justify-between items-end gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-white bg-slate-900">
                            {activeRole} Active
                        </span>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{simulations[activeRole].title}</h2>
                    </div>
                    <p className="text-slate-500 text-xs font-medium max-w-2xl">{simulations[activeRole].description}</p>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-4 px-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-6 shadow-sm">
                      <div className="text-right">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Performance</p>
                          <p className={`text-xl font-black font-mono leading-none ${performance > 80 ? 'text-emerald-500' : 'text-orange-500'}`}>{performance}%</p>
                      </div>
                      <div className="h-10 w-px bg-slate-100 dark:bg-slate-800"></div>
                      <div className="flex items-center gap-2">
                          {simulations[activeRole].steps.map((_, i) => (
                              <div key={i} className={`w-2 h-2 rounded-full transition-all duration-500 ${currentStepIndex >= i ? 'bg-blue-600 scale-125' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
                          ))}
                      </div>
                  </div>
               </div>
               <div className="flex-1">
                  {activeRole === 'ZERO_G_PILOT' && renderZeroGPilotSim()}
                  {activeRole === 'AVIATION_PILOT' && renderAviationPilotSim()}
                  {activeRole === 'F101_TACTICAL' && renderF101Tactical()}
                  {activeRole === 'NEURAL_SYNC' && renderNeuralSync()}
                  {activeRole === 'IT_SECURITY' && renderITSecuritySim()}
               </div>
            </div>
         )}

         {simState === 'TASK_COMPLETE' && renderCompletion()}
      </main>
    </div>
  );
};

export default HRTrainingHub;
