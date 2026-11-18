Original name: App.tsx
Drive ID: 1BuibGmlgzQd9nTzVQVxzVVelOOom27fE
Parent folder: My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/copy-of-t.h.e.l.m.a.-ai-for-hackathon (2)/
Modified: 2026-01-20T18:16:53.158Z


import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import AiAssistant from './components/AiAssistant';
import MainHub from './components/modules/MainHub';
import FleetDashboard from './components/modules/FleetDashboard';
import AviationDashboard from './components/modules/AviationDashboard';
import ITControlCenter from './components/modules/ITControlCenter';
import AquaticDashboard from './components/modules/AquaticDashboard';
import EmergencyDashboard from './components/modules/EmergencyDashboard';
import HRTrainingHub from './components/modules/HRTrainingHub';
import IntegrationsBuffer from './components/modules/IntegrationsBuffer';
import GovernanceHub from './components/modules/GovernanceHub';
import NetZeroHub from './components/modules/NetZeroHub';
import AdaptationLayer from './components/modules/AdaptationLayer';
import UnitSetupWizard from './components/UnitSetupWizard';
import { ModuleType, User, UserRole, UnitConfiguration, SecurityAlert } from './types';
import { Bell, Search, ChevronDown, UserCircle, Cpu, ShieldAlert, Clock, X } from 'lucide-react';

// --- REVERT MARK: JAN 4 2025 - SESSION RESTORE POINT ---

const App: React.FC = () => {
  // --- SAVE TRIGGER: AUTO-SAVE ENABLED ---
  // Check session storage to skip spin-up on refresh
  const [isSpinningUp, setIsSpinningUp] = useState(() => {
    return !sessionStorage.getItem('thelma_session_started');
  });
  
  const [spinUpStep, setSpinUpStep] = useState(0);

  // Load saved state or default (Auto-Save Restore)
  const [activeModule, setActiveModule] = useState<ModuleType>(() => {
    return (localStorage.getItem('thelma_active_module') as ModuleType) || ModuleType.DASHBOARD;
  });

  const [showUnitWizard, setShowUnitWizard] = useState(false);
  const [activeUnitConfig, setActiveUnitConfig] = useState<UnitConfiguration | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  // Initialize as ARCHITECT for full Demo Authority, recovering from storage if available
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const savedRole = localStorage.getItem('thelma_user_role') as UserRole;
    const baseUser = {
      email: 'steve@thelma.ai',
      fullName: 'Steve Henry',
      role: savedRole || UserRole.ARCHITECT,
      department: 'Architecture',
      clearanceLevel: 10
    };
    return baseUser;
  });

  const mockNotifications: SecurityAlert[] = [
    { id: '1', severity: 'HIGH', type: 'ANOMALY', message: 'Unauthorized IP Attempt: 185.22.1.40', timestamp: '10m ago', status: 'NEW' },
    { id: '2', severity: 'MEDIUM', type: 'POLICY', message: 'Unit F-104 Maintenance Overdue', timestamp: '1h ago', status: 'NEW' },
    { id: '3', severity: 'LOW', type: 'ANOMALY', message: 'API Key k_1 Usage Spike', timestamp: '2h ago', status: 'NEW' }
  ];

  // Auto-Save Effect: Persist Active Module
  useEffect(() => {
    localStorage.setItem('thelma_active_module', activeModule);
  }, [activeModule]);

  // Auto-Save Effect: Persist User Role
  useEffect(() => {
    localStorage.setItem('thelma_user_role', currentUser.role);
  }, [currentUser.role]);

  useEffect(() => {
    if (isSpinningUp) {
      const steps = [
        "Initializing T.H.E.L.M.A. AI v1.1...",
        "Authenticating Architect: Steve Henry...",
        "Setting MASTER DEMO GENETIC BLUEPRINT...",
        "Activating H.E.N.R.Y. & L.I.L.Y. Cores...",
        "Establishing P.E.R.C.Y. Governance...",
        "System Locked - Jan 5 2025."
      ];
      const interval = setInterval(() => {
        setSpinUpStep(prev => {
          if (prev >= steps.length - 1) {
            clearInterval(interval);
            setTimeout(() => {
                setIsSpinningUp(false);
                sessionStorage.setItem('thelma_session_started', 'true');
            }, 800);
            return prev;
          }
          return prev + 1;
        });
      }, 600);
      return () => clearInterval(interval);
    }
  }, [isSpinningUp]);

  const handleRoleChange = (role: UserRole) => {
    let newName = 'Steve Henry';
    let dept = 'Operations';
    let level = 3;
    switch (role) {
      case UserRole.ARCHITECT: newName = 'Steve Henry'; dept = 'Architecture'; level = 10; break;
      case UserRole.CEO: newName = 'Steve Henry'; dept = 'Executive'; level = 6; break;
      case UserRole.CTO: newName = 'Steve Henry'; dept = 'Architecture'; level = 6; break;
      case UserRole.FLEET_MANAGER: newName = 'Marcus Cole'; dept = 'Fleet'; level = 4; break;
      case UserRole.TRAINING_DIRECTOR: newName = 'Sarah Connor'; dept = 'HR'; level = 5; break;
      default: break;
    }
    setCurrentUser({ ...currentUser, role, fullName: newName, department: dept, clearanceLevel: level });
  };

  const renderModule = () => {
    switch (activeModule) {
      case ModuleType.DASHBOARD: return <MainHub onViewManual={() => setActiveModule(ModuleType.TRAINING_HUB)} />;
      case ModuleType.AI_INSIGHTS: return <MainHub />;
      case ModuleType.TRAINING_HUB: return <HRTrainingHub />;
      case ModuleType.AGENT_HUB: return <ITControlCenter />;
      case ModuleType.IT_CONTROL: return <ITControlCenter />;
      case ModuleType.HR_ADMIN: return <HRTrainingHub />;
      case ModuleType.ROUTE_OPTIMIZER: return <FleetDashboard />;
      case ModuleType.AVIATION_CONTROL: return <AviationDashboard />;
      case ModuleType.DOCUMENT_HUB: return <GovernanceHub />;
      case ModuleType.ANALYTICS: return <NetZeroHub />;
      
      // Legacy Mappings
      case ModuleType.FLEET: return <FleetDashboard />;
      case ModuleType.AVIATION: return <AviationDashboard />;
      case ModuleType.AQUATIC: return <AquaticDashboard />;
      case ModuleType.EMERGENCY: return <EmergencyDashboard />;
      case ModuleType.HR_TRAINING: return <HRTrainingHub />;
      case ModuleType.IT_INFRA: return <ITControlCenter />;
      case ModuleType.INTEGRATIONS: return <IntegrationsBuffer />;
      case ModuleType.GOVERNANCE: return <GovernanceHub />;
      case ModuleType.NET_ZERO: return <NetZeroHub />;
      case ModuleType.ADAPTATION: return <AdaptationLayer />;
      
      default: return <div className="p-8 text-center text-slate-400">Module Access Restricted or Under Development in Demo Mode.</div>;
    }
  };

  if (isSpinningUp) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white font-mono z-[100]">
        <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-8 animate-pulse shadow-2xl shadow-blue-500/50">
           <Cpu size={40} />
        </div>
        <h1 className="text-3xl font-bold tracking-widest mb-4">T.H.E.L.M.A. AI</h1>
        <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${(spinUpStep / 5) * 100}%` }}></div>
        </div>
        <div className="h-8 text-blue-400 text-sm">{["Initializing Blueprint...", "Authenticating Architect...", "Loading Net Zero...", "Activating Agents...", "Locking Governance...", "Ready"][spinUpStep] || "Loading..."}</div>
        <div className="fixed bottom-8 text-xs text-slate-500 uppercase tracking-widest">Master Demo Genetic Blueprint v1.1 • Architect: Steve Henry</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans animate-fadeIn">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} currentUser={currentUser} />
      <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
           <div className="flex items-center text-slate-400 text-sm">
             <span className="mr-2 font-bold tracking-wide text-slate-900 uppercase">T.H.E.L.M.A. AI</span>
             <span className="mx-2 text-slate-300">/</span>
             <span className="font-medium text-slate-800">{activeModule.replace('_', ' ')}</span>
           </div>
           <div className="flex items-center space-x-6">
              <div className="relative group">
                <button className="flex items-center space-x-2 text-xs font-medium text-slate-600 hover:text-blue-600 transition-colors bg-slate-100 px-3 py-1.5 rounded-full">
                  <UserCircle size={14} />
                  <span>Context: {currentUser.role}</span>
                  <ChevronDown size={12} />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 shadow-xl rounded-lg overflow-hidden hidden group-hover:block z-50">
                   {[UserRole.ARCHITECT, UserRole.CEO, UserRole.CTO, UserRole.FLEET_MANAGER, UserRole.TRAINING_DIRECTOR].map(r => (
                     <button key={r} onClick={() => handleRoleChange(r)} className="w-full text-left px-4 py-2 text-xs hover:bg-slate-50 text-slate-700">{r}</button>
                   ))}
                </div>
              </div>
              <button onClick={() => setShowUnitWizard(true)} className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full font-medium hover:bg-emerald-100 transition-colors">
                {activeUnitConfig ? activeUnitConfig.name : '+ Define Unit Blueprint'}
              </button>
              <div className="h-6 w-px bg-slate-200"></div>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Global Search..." 
                    className="pl-10 pr-4 py-2 bg-slate-100 rounded-full text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 transition-all" 
                />
              </div>
              <div className="relative">
                <button 
                    onClick={() => setShowNotifications(!showNotifications)} 
                    className={`relative text-slate-500 hover:text-slate-800 transition-colors p-1 ${showNotifications ? 'text-blue-600' : ''}`}
                >
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-3 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 z-[100] overflow-hidden animate-slideUp">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                      <h3 className="font-bold text-slate-800 flex items-center gap-2"><ShieldAlert size={16} className="text-red-500"/> System Notifications</h3>
                      <button onClick={() => setShowNotifications(false)}><X size={16}/></button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {mockNotifications.map(n => (
                        <div key={n.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer group">
                          <div className="flex justify-between items-start mb-1">
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${n.severity === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>{n.type}</span>
                            <span className="text-[10px] text-slate-400 flex items-center gap-1"><Clock size={10}/>{n.timestamp}</span>
                          </div>
                          <p className="text-sm text-slate-700 font-medium group-hover:text-blue-600 transition-colors">{n.message}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-slate-50 text-center border-t border-slate-100">
                      <button className="text-xs text-blue-600 font-bold hover:underline">Mark all as read</button>
                    </div>
                  </div>
                )}
              </div>
           </div>
        </header>
        <main className="flex-1 overflow-y-auto relative">
           <div className="h-full">{renderModule()}</div>
        </main>
      </div>
      <AiAssistant currentModule={activeModule} />
      {showUnitWizard && (
        <UnitSetupWizard onClose={() => setShowUnitWizard(false)} onComplete={(config) => { setActiveUnitConfig(config); setShowUnitWizard(false); }} />
      )}
    </div>
  );
};

export default App;
