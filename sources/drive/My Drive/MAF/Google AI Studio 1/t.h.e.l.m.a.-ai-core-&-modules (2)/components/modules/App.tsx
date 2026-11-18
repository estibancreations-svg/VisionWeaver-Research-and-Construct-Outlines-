Original name: App.tsx
Drive ID: 1_AA1F8jOGX85oZJpfAzyrG2zIPc-MFsN
Parent folder: My Drive/MAF/Google AI Studio 1/t.h.e.l.m.a.-ai-core-&-modules (2)/components/modules/
Modified: 2026-01-31T10:56:50.000Z


import React, { useState, useEffect, useCallback, useRef } from 'react';
import Sidebar from './components/Sidebar';
import AiAssistant from './components/AiAssistant';
import MainHub from './components/modules/MainHub';
import FleetDashboard from './components/modules/FleetDashboard';
import AviationDashboard from './components/modules/AviationDashboard';
import ITControlCenter from './components/modules/ITControlCenter';
import AquaticDashboard from './components/modules/AquaticDashboard';
import EmergencyDashboard from './components/modules/EmergencyDashboard';
import HRTrainingHub from './components/modules/HRTrainingHub';
import HRAdmin from './components/modules/HRAdmin';
import IntegrationsBuffer from './components/modules/IntegrationsBuffer';
import GovernanceHub from './components/modules/GovernanceHub';
import NetZeroHub from './components/modules/NetZeroHub';
import AdaptationLayer from './components/modules/AdaptationLayer';
import AgentHub from './components/modules/AgentHub';
import AiInsights from './components/modules/AiInsights';
import TeamSetup from './components/modules/TeamSetup';
import Billing from './components/modules/Billing';
import Settings from './components/modules/Settings';
import SecurityInfo from './components/modules/SecurityInfo';
import Documentation from './components/modules/Documentation';
import Deployment from './components/modules/Deployment';
import UnitSetupWizard from './components/UnitSetupWizard';
import QuantumEdgeCenter from './components/modules/QuantumEdgeCenter';
import Payroll from './components/modules/Payroll';
import Communications from './components/modules/Communications';
import Maintenance from './components/modules/Maintenance';
import Insurance from './components/modules/Insurance';
import DispatchHub from './components/modules/DispatchHub';
import MobileFieldApp from './components/modules/MobileFieldApp';
import { TacticalErrorBoundary } from './components/ErrorBoundary';
import { ModuleType, User, UserRole, SystemMode, AlertLevel, SystemAlert } from './types';
import { Bell, Cpu, ShieldCheck, Activity, Check, Zap, Github, X, Terminal, Menu, Moon, Sun, RefreshCw, Power, Search, ChevronRight, Hash, Truck, DollarSign, GraduationCap, Users, Clock, Fingerprint, Lock, ShieldAlert, Key, CheckCircle, Smartphone, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [isSpinningUp, setIsSpinningUp] = useState(true);
  const [spinUpStep, setSpinUpStep] = useState(0);
  const [isLocked, setIsLocked] = useState(true);
  const [authStep, setAuthStep] = useState<'IDLE' | 'SCANNING' | 'SUCCESS'>('IDLE');
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.DASHBOARD);
  const [navHistory, setNavHistory] = useState<ModuleType[]>([]);
  const [systemMode, setSystemMode] = useState<SystemMode>('NORMAL');

  const [isAiOpen, setIsAiOpen] = useState(false);
  const [alertLevel, setAlertLevel] = useState<AlertLevel>('IDLE');
  const [activeAlert, setActiveAlert] = useState<SystemAlert | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('thelma-dark-mode') === 'true');
  const [voiceSettings, setVoiceSettings] = useState(() => {
    const saved = localStorage.getItem('thelma-voice-settings');
    return saved ? JSON.parse(saved) : { enabled: true, volume: 1.0, rate: 1.1 };
  });

  const [hasGreeted, setHasGreeted] = useState(false);
  const [showUnitWizard, setShowUnitWizard] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastCommit, setLastCommit] = useState('MESH-SYNC-4.0.0');
  const [triggerDiagnostics, setTriggerDiagnostics] = useState(false);

  const [currentUser] = useState<User>({
    email: 'steve@thelma.ai',
    fullName: 'Steve Henry',
    role: UserRole.ARCHITECT,
    department: 'Architecture',
    clearanceLevel: 10
  });

  const bootSteps = [
    { label: "T.H.E.L.M.A. v4.0.0 FINAL INIT...", icon: <Power size={16} className="text-blue-500" /> },
    { label: "NEURAL SIGNATURE HANDSHAKE READY", icon: <Fingerprint size={16} className="text-orange-400" /> },
    { label: "NEXUS-VR HAPTIC MESH CALIBRATING", icon: <Zap size={16} className="text-emerald-400" /> },
    { label: "PROJECT Z GRAVITIC LINK: STABLE", icon: <Activity size={16} className="text-purple-400" /> },
    { label: "GLOBAL MESH SYNCHRONIZATION COMPLETE", icon: <Check size={16} className="text-blue-400" /> }
  ];

  const vocalize = useCallback((text: string) => {
    if (voiceSettings.enabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = voiceSettings.volume;
      utterance.rate = voiceSettings.rate;
      utterance.pitch = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  }, [voiceSettings]);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  useEffect(() => {
    if (isSpinningUp) {
      const interval = setInterval(() => {
        setSpinUpStep(prev => {
          if (prev >= bootSteps.length - 1) {
            clearInterval(interval);
            setTimeout(() => setIsSpinningUp(false), 800);
            return prev;
          }
          return prev + 1;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isSpinningUp]);

  const handleModuleChange = (m: ModuleType) => {
    if (m !== activeModule) {
      setNavHistory(prev => [...prev, activeModule]);
      setActiveModule(m);
    }
    setSidebarOpen(false);
  };

  const handleBack = useCallback(() => {
    if (navHistory.length > 0) {
      const newStack = [...navHistory];
      const prev = newStack.pop();
      if (prev) {
        setNavHistory(newStack);
        setActiveModule(prev);
      }
    } else {
      setActiveModule(ModuleType.DASHBOARD);
    }
  }, [navHistory]);

  const handleGlobalCommand = (cmd: string, params?: any) => {
    if (cmd === 'NAVIGATE' && params) {
        handleModuleChange(params as ModuleType);
    }
    if (cmd === 'TAKE_ME_TO_ALERT' && activeAlert) {
        handleModuleChange(activeAlert.module);
        setAlertLevel('IDLE');
        setActiveAlert(null);
    }
  };

  const verifyLogin = () => {
      setAuthStep('SCANNING');
      // Sequential Greeting Flow: Welcome -> Reports -> Alerts
      setTimeout(() => {
          setAuthStep('SUCCESS');
          setTimeout(() => {
              setIsLocked(false);
              if (!hasGreeted) {
                  setHasGreeted(true);
                  const greeting = `Welcome back, Architect Steve Henry. Neural mesh is stabilized. Main Federation Report: Fleet revenue yield is at 1 point 42 million. Net Zero credits have reached optimal thresholds. Active alert detected: Unit F-101 is reporting a tyre stability anomaly in Sector 4. I have highlighted the tactical advisory. Nexus-VR Domain 1 is online.`;
                  vocalize(greeting);
                  setIsAiOpen(true);
                  setAlertLevel('WARNING');
                  setActiveAlert({
                    id: 'ALRT-F101-TYRE',
                    type: 'TELEMETRY',
                    severity: 'WARNING',
                    message: 'Unit F-101 tyre pressure anomaly detected in Sector 4.',
                    module: ModuleType.MAINTENANCE,
                    timestamp: new Date().toLocaleTimeString()
                  });
              }
          }, 1000);
      }, 1500);
  };

  const renderModule = () => {
    const commonProps = { onBack: handleBack, onVocalize: vocalize };
    const moduleMap: Record<ModuleType, React.ReactNode> = {
      [ModuleType.DASHBOARD]: <MainHub setActiveModule={handleModuleChange} autoRunDiagnostics={triggerDiagnostics} />,
      [ModuleType.DISPATCH]: <DispatchHub {...commonProps} />,
      [ModuleType.AI_INSIGHTS]: <AiInsights onBack={handleBack} />,
      [ModuleType.TRAINING_HUB]: <HRTrainingHub {...commonProps} />,
      [ModuleType.AGENT_HUB]: <AgentHub onBack={handleBack} />,
      [ModuleType.IT_CONTROL]: <ITControlCenter onBack={handleBack} />,
      [ModuleType.HR_ADMIN]: <HRAdmin />,
      [ModuleType.ROUTE_OPTIMIZER]: <FleetDashboard onBack={handleBack} />,
      [ModuleType.AVIATION_CONTROL]: <AviationDashboard onBack={handleBack} />,
      [ModuleType.DOCUMENT_HUB]: <Documentation onBack={handleBack} />,
      [ModuleType.ANALYTICS]: <NetZeroHub onBack={handleBack} />,
      [ModuleType.TEAM_SETUP]: <TeamSetup onBack={handleBack} />,
      [ModuleType.BILLING]: <Billing onBack={handleBack} />,
      [ModuleType.SETTINGS]: <Settings darkMode={darkMode} setDarkMode={setDarkMode} voiceSettings={voiceSettings} setVoiceSettings={setVoiceSettings} onVocalize={vocalize} setActiveModule={handleModuleChange} onBack={handleBack} systemMode={systemMode} />,
      [ModuleType.SECURITY_INFO]: <SecurityInfo onBack={handleBack} />,
      [ModuleType.DOCUMENTATION]: <Documentation onBack={handleBack} />,
      [ModuleType.DEPLOYMENT]: <Deployment />,
      [ModuleType.FLEET]: <FleetDashboard onBack={handleBack} />,
      [ModuleType.AVIATION]: <AviationDashboard onBack={handleBack} />,
      [ModuleType.AQUATIC]: <AquaticDashboard onBack={handleBack} />,
      [ModuleType.EMERGENCY]: <EmergencyDashboard onBack={handleBack} />,
      [ModuleType.HR_TRAINING]: <HRTrainingHub {...commonProps} />,
      [ModuleType.IT_INFRA]: <ITControlCenter onBack={handleBack} />,
      [ModuleType.INTEGRATIONS]: <IntegrationsBuffer onBack={handleBack} />,
      [ModuleType.GOVERNANCE]: <GovernanceHub />,
      [ModuleType.NET_ZERO]: <NetZeroHub onBack={handleBack} />,
      [ModuleType.ADAPTATION]: <AdaptationLayer />,
      [ModuleType.EDGE_CONTROL]: <QuantumEdgeCenter onBack={handleBack} />,
      [ModuleType.PAYROLL]: <Payroll onBack={handleBack} />,
      [ModuleType.COMMUNICATIONS]: <Communications onBack={handleBack} />,
      [ModuleType.MAINTENANCE]: <Maintenance onBack={handleBack} />,
      [ModuleType.INSURANCE]: <Insurance onBack={handleBack} />,
      [ModuleType.FIELD_RELAY]: <MobileFieldApp {...commonProps} />
    };

    return (
      <TacticalErrorBoundary module={activeModule}>
        {moduleMap[activeModule] || <MainHub setActiveModule={handleModuleChange} />}
      </TacticalErrorBoundary>
    );
  };

  if (isSpinningUp) {
    return (
      <div className="h-screen bg-slate-950 flex flex-col items-center justify-center text-white font-mono p-4">
        <Cpu size={56} className="text-blue-600 animate-pulse mb-8" />
        <h1 className="text-4xl font-black tracking-[0.2em] mb-2 text-blue-400 uppercase">T.H.E.L.M.A. AI</h1>
        <p className="text-slate-500 text-[10px] uppercase tracking-[0.5em] mb-12">v4.0.0 • NEXUS VR ENGINE</p>
        <div className="w-80 space-y-4">
            {bootSteps.map((step, idx) => (
                <div key={idx} className={`flex items-center gap-3 text-xs transition-opacity duration-500 ${idx <= spinUpStep ? 'opacity-100' : 'opacity-0'}`}>
                    {step.icon}
                    <span className={idx === spinUpStep ? 'text-blue-500 font-bold' : 'text-slate-500'}>{step.label}</span>
                </div>
            ))}
        </div>
      </div>
    );
  }

  if (isLocked) {
      return (
          <div className="h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
              <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-[40px] p-10 text-center shadow-2xl space-y-8 animate-fadeIn">
                  <div className="p-4 bg-slate-800 rounded-full w-20 h-20 mx-auto flex items-center justify-center text-blue-500 border border-slate-700 shadow-xl">
                      <Lock size={40} className={authStep === 'SCANNING' ? 'animate-pulse' : ''} />
                  </div>
                  <div>
                      <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Co-Pilot Prime Identity</h2>
                      <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mt-2">Architect Signature Required</p>
                  </div>
                  <div className="space-y-4 pt-6">
                       {authStep === 'IDLE' && (
                           <button onClick={verifyLogin} className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black uppercase tracking-widest text-xs shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3">
                               <Fingerprint size={20} /> Handshake Signature
                           </button>
                       )}
                       {authStep === 'SCANNING' && (
                           <div className="space-y-4 animate-pulse">
                               <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                                   <div className="h-full bg-blue-500 w-1/2 animate-[progress_1s_infinite]"></div>
                               </div>
                               <p className="text-[10px] font-black text-blue-400 uppercase">Synchronizing Mesh...</p>
                           </div>
                       )}
                       {authStep === 'SUCCESS' && (
                           <div className="p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-2xl animate-bounce text-emerald-400 font-black uppercase text-xs">
                               Identity Verified
                           </div>
                       )}
                  </div>
              </div>
          </div>
      );
  }

  return (
    <div className={`app-container font-sans ${darkMode ? 'dark' : ''} transition-all duration-700 h-screen w-screen flex flex-col overflow-hidden 
      ${alertLevel === 'WARNING' ? 'warning-glow' : ''}
    `}>
      <header className="header-area bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 py-6 flex items-center justify-between shrink-0 h-16 transition-colors shadow-sm">
         <div className="flex items-center text-slate-400 text-sm">
           <button onClick={() => setSidebarOpen(!sidebarOpen)} className="xl:hidden p-2 mr-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
             <Menu size={24} />
           </button>
           <span className="mr-2 font-black tracking-widest text-slate-900 dark:text-white uppercase cursor-pointer" onClick={() => handleModuleChange(ModuleType.DASHBOARD)}>T.H.E.L.M.A.</span>
           <span className="mx-2 text-slate-300 dark:text-slate-700 hidden sm:inline">/</span>
           <span className="font-bold text-blue-600 dark:text-blue-400 uppercase tracking-tighter hidden sm:inline">{activeModule.replace('_', ' ')}</span>
         </div>

         <div className="flex items-center space-x-4">
            {activeAlert && (
              <div className="hidden lg:flex items-center gap-2 bg-amber-500 text-white px-4 py-1.5 rounded-full shadow-lg group relative">
                <AlertTriangle size={14} className="animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest cursor-pointer" onClick={() => setIsAiOpen(true)}>Active advisory alert</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); setActiveAlert(null); setAlertLevel('IDLE'); }} 
                  className="ml-2 p-0.5 hover:bg-black/20 rounded transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            )}
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 text-slate-500 hover:text-blue-500 transition-colors rounded-lg">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="relative p-2 text-slate-500 hover:text-blue-500 cursor-pointer" onClick={() => setShowNotifications(true)}>
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full border-2 border-white dark:border-slate-900"></span>
            </div>
         </div>
      </header>

      {showNotifications && (
        <>
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[110]" onClick={() => setShowNotifications(false)}></div>
            <div className="fixed inset-y-0 right-0 w-80 lg:w-96 bg-white dark:bg-slate-900 shadow-2xl z-[120] border-l border-slate-200 dark:border-slate-800 animate-slideInRight">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center gap-3">
                    <Terminal size={18} className="text-blue-600" />
                    <h3 className="font-black text-xs uppercase tracking-widest text-slate-800 dark:text-white">Orchestration Logs</h3>
                </div>
                <button 
                    onClick={() => setShowNotifications(false)} 
                    className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-all"
                >
                    <X size={20}/>
                </button>
              </div>
              <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-160px)] no-scrollbar">
                <div className="p-5 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/20">
                   <p className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-400 mb-1">Nexus-VR Link</p>
                   <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                       Domain 1 Sensory Mesh initialized. Haptic suit sync at 100%. Bone conduction audio calibrated for 24kHz.
                   </p>
                </div>
                <div className="p-5 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/20">
                   <p className="text-[10px] font-black uppercase text-blue-700 dark:text-blue-400 mb-1">Sensor Update</p>
                   <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">300+ sensory nodes synchronized. H.E.N.R.Y. reports nominal throughput.</p>
                </div>
              </div>
            </div>
        </>
      )}

      <div className="flex flex-1 overflow-hidden relative">
        <div className={`sidebar-area fixed lg:static inset-y-0 left-0 z-[150] lg:z-50 transition-transform duration-300 ease-in-out transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            <Sidebar activeModule={activeModule} setActiveModule={handleModuleChange} currentUser={currentUser} onClose={() => setSidebarOpen(false)} />
        </div>
        <main className="main-area flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 transition-colors flex flex-col min-w-0">
            {renderModule()}
        </main>
      </div>

      <AiAssistant 
        currentModule={activeModule} 
        isOpen={isAiOpen}
        setIsOpen={setIsAiOpen}
        alertLevel={alertLevel}
        activeAlert={activeAlert}
        onDismissAlert={() => { setAlertLevel('IDLE'); setActiveAlert(null); }}
        onCommand={handleGlobalCommand} 
      />
      
      {showUnitWizard && (
        <UnitSetupWizard onClose={() => setShowUnitWizard(false)} onComplete={() => setShowUnitWizard(false)} />
      )}
    </div>
  );
};

export default App;
