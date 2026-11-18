Original name: MainHub.tsx
Drive ID: 1zZAYgJNpUTqMQtR7-gy2Qw4rpvLqKlYZ
Parent folder: My Drive/MAF/Google AI Studio 1/t.h.e.l.m.a.-ai-core-&-modules (2)/components/modules/
Modified: 2026-01-31T10:56:50.000Z


import React, { useState, useEffect } from 'react';
import { TrendingUp, Activity, ShieldCheck, Shield, Cpu, Terminal, X, History, Truck, Crosshair, Ship, AlertTriangle, CheckCircle2, Info, ArrowRight, Zap, Layers, Smartphone, RefreshCw, Database, Orbit, Globe, Lock, Server, Users, Leaf, Plane, Plus } from 'lucide-react';
import { ModuleType, AgentType, SystemAlert } from '../../types';

interface MissionEvent {
    id: string;
    timestamp: string;
    persona: 'TRUCK' | 'DRONE' | 'SHIP' | 'MOBILE' | 'PROJECT_Z';
    event: string;
    agent: AgentType;
    status: 'COMPLETED' | 'IN_PROGRESS' | 'LOCKED' | 'ALERT';
}

interface MainHubProps {
  setActiveModule: (m: ModuleType) => void;
  autoRunDiagnostics?: boolean;
  onVocalize?: (text: string) => void;
  onLaunchWizard?: () => void;
}

const MainHub: React.FC<MainHubProps> = ({ setActiveModule, autoRunDiagnostics = false, onVocalize, onLaunchWizard }) => {
  const [revenue] = useState(1420592);
  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState(false);
  const [diagProgress, setDiagProgress] = useState(0);

  const [missionFeed, setMissionFeed] = useState<MissionEvent[]>([
    { id: '0', timestamp: 'NOW', persona: 'MOBILE', event: 'PROTOCOL 100: GLOBAL MESH FINALIZED.', agent: AgentType.THELMA, status: 'COMPLETED' },
    { id: '1', timestamp: '08:30', persona: 'MOBILE', event: 'T.H.E.L.M.A. Sync: Federation Handshake successful.', agent: AgentType.CORE, status: 'COMPLETED' },
    { id: '2', timestamp: '08:31', persona: 'TRUCK', event: 'Unit F-101 registered. GPS Lock Established.', agent: AgentType.LILY, status: 'COMPLETED' },
    { id: '3', timestamp: '08:32', persona: 'SHIP', event: 'Yara Birkeland G2 Mesh Ready.', agent: AgentType.HENRY, status: 'COMPLETED' },
    { id: '4', timestamp: '08:45', persona: 'PROJECT_Z', event: 'Zero-Point Field Coherence: 99.9%. Gravitic Uplink Stable.', agent: AgentType.HENRY, status: 'COMPLETED' },
    { id: '5', timestamp: '08:50', persona: 'TRUCK', event: 'F-101 TPMS CALIBRATION: IN PROGRESS.', agent: AgentType.HENRY, status: 'IN_PROGRESS' }
  ]);

  const systemsManifest = [
      { name: 'Identity Vault', ver: 'v4.0.0', status: 'SECURE', icon: Users },
      { name: 'Fleet Matrix', ver: 'v4.0.0', status: 'ACTIVE', icon: Truck },
      { name: 'Financial Core', ver: 'v4.0.0', status: 'LEDGERED', icon: Database },
      { name: 'Governance', ver: 'v4.0.0', status: 'ENFORCED', icon: Shield },
      { name: 'Neural Mesh', ver: 'v4.0.0', status: 'ONLINE', icon: Activity },
      { name: 'Net Zero', ver: 'v4.0.0', status: 'OPTIMAL', icon: Leaf },
      { name: 'Aviation', ver: 'v4.0.0', status: 'CLEAR', icon: Plane },
      { name: 'Maritime', ver: 'v4.0.0', status: 'SONAR_OK', icon: Ship },
  ];

  const runDiagnostics = () => {
    if(onVocalize) onVocalize("Initiating global system diagnostic sweep. Verify mesh coherence.");
    setIsRunningDiagnostics(true);
    setDiagProgress(0);
    const interval = setInterval(() => {
        setDiagProgress(prev => {
            if (prev >= 100) {
                clearInterval(interval);
                setTimeout(() => setIsRunningDiagnostics(false), 1000);
                setMissionFeed(prevFeed => [
                    { id: Date.now().toString(), timestamp: 'NOW', persona: 'MOBILE', event: 'v4.0.0 Global Mesh Diagnostics: 100% NOMINAL.', agent: AgentType.CORE, status: 'COMPLETED' },
                    ...prevFeed
                ]);
                if(onVocalize) onVocalize("Diagnostics complete. Federation Green.");
                return 100;
            }
            return prev + 5;
        });
    }, 100);
  };

  useEffect(() => {
      if (autoRunDiagnostics) runDiagnostics();
  }, [autoRunDiagnostics]);

  return (
    <div className="p-4 md:p-8 space-y-6 animate-fadeIn pb-12 max-w-[1600px] mx-auto">
      <div className="bg-slate-900 border border-blue-500/30 rounded-[3rem] p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none group-hover:bg-blue-600/20 transition-all duration-1000"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/30 cursor-pointer hover:scale-105 transition-transform" onClick={runDiagnostics}>
                    {isRunningDiagnostics ? <RefreshCw size={24} className="animate-spin" /> : <Cpu size={24}/>}
                </div>
                <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">T.H.E.L.M.A. AI Command Hub</h2>
                    {isRunningDiagnostics && (
                        <div className="mt-2 flex items-center gap-3">
                            <div className="w-32 h-1 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 transition-all" style={{ width: `${diagProgress}%` }}></div>
                            </div>
                            <span className="text-[8px] font-black text-blue-400 uppercase">Syncing Federation v4.0.0... {diagProgress}%</span>
                        </div>
                    )}
                </div>
            </div>
            <p className="text-slate-400 text-[10px] font-mono mt-1 uppercase tracking-[0.4em]">Jan 04, 2025 • Global Mesh Sync v4.0.0 • Architect Mode</p>
          </div>
          <div className="flex gap-4">
              {onLaunchWizard && (
                  <button onClick={onLaunchWizard} className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-2xl text-center border border-white/10 transition-all flex items-center gap-2 group">
                      <div className="p-1 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform"><Plus size={12} className="text-white"/></div>
                      <div>
                        <p className="text-[9px] font-black text-blue-300 uppercase tracking-widest mb-1">Deploy</p>
                        <p className="text-sm font-black text-white uppercase">Add Asset</p>
                      </div>
                  </button>
              )}
              <div className="bg-emerald-500/10 border border-emerald-500/20 px-6 py-3 rounded-2xl text-center">
                 <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Mesh Integrity</p>
                 <p className="text-sm font-black text-white uppercase">100% NOMINAL</p>
              </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Fleet Yield', val: `$${revenue.toLocaleString()}`, mod: ModuleType.ANALYTICS, icon: TrendingUp, color: 'blue' },
                    { label: 'Active Assets', val: '1,493', mod: ModuleType.FLEET, icon: Truck, color: 'orange' },
                    { label: 'Compliance', val: 'VERIFIED', mod: ModuleType.GOVERNANCE, icon: ShieldCheck, color: 'emerald' },
                    { label: 'Field Bids', val: '42 NEW', mod: ModuleType.DISPATCH, icon: Smartphone, color: 'blue' }
                ].map((stat, i) => (
                    <div key={i} onClick={() => setActiveModule(stat.mod)} className="cursor-pointer bg-white dark:bg-slate-900 p-7 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all hover:scale-105 active:scale-95 group">
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            <div className={`p-2 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all bg-slate-100 dark:bg-slate-800 text-slate-500`}>
                                <stat.icon size={20} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-black font-mono text-slate-900 dark:text-white uppercase tracking-tighter">{stat.val}</h3>
                    </div>
                ))}
            </div>

            {/* Federation Manifest */}
            <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-black text-slate-800 dark:text-white text-xs uppercase tracking-[0.2em] flex items-center gap-3">
                        <Server size={18} className="text-blue-500"/> Federation System Manifest
                    </h3>
                    <span className="bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-200 dark:border-emerald-800">
                        All Systems Green
                    </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {systemsManifest.map((sys, i) => (
                        <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 group hover:border-blue-400 transition-all">
                            <div className="p-2 bg-white dark:bg-slate-900 rounded-xl text-slate-400 group-hover:text-blue-500 shadow-sm">
                                <sys.icon size={16}/>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-900 dark:text-white uppercase tracking-tight">{sys.name}</p>
                                <p className="text-[8px] font-mono text-slate-400 uppercase">{sys.ver} • {sys.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-[400px]">
                <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950/30">
                    <h3 className="font-black text-slate-800 dark:text-white text-xs uppercase tracking-widest flex items-center gap-3"><History size={20} className="text-blue-600"/> Federation Event Stream</h3>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div><span className="text-[9px] font-black uppercase text-slate-400">Real-Time</span></div>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                    {missionFeed.map(evt => (
                        <div key={evt.id} className={`p-5 rounded-3xl border flex items-center justify-between transition-all cursor-pointer group ${evt.status === 'ALERT' ? 'bg-red-50 dark:bg-red-900/20 border-red-500 animate-pulse' : 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800/50 hover:border-blue-400'}`}>
                            <div className="flex items-center gap-5">
                                <div className="text-[10px] font-mono font-bold text-slate-400 w-16">{evt.timestamp}</div>
                                <div className={`p-3 rounded-2xl ${
                                    evt.persona === 'TRUCK' ? 'bg-blue-100 text-blue-600' : 
                                    evt.persona === 'MOBILE' ? 'bg-orange-100 text-orange-600' : 
                                    evt.persona === 'PROJECT_Z' ? 'bg-purple-100 text-purple-600' :
                                    'bg-emerald-100 text-emerald-600'
                                }`}>
                                  {evt.persona === 'TRUCK' ? <Truck size={18}/> : 
                                   evt.persona === 'DRONE' ? <Crosshair size={18}/> : 
                                   evt.persona === 'MOBILE' ? <Smartphone size={18}/> : 
                                   evt.persona === 'PROJECT_Z' ? <Orbit size={18}/> :
                                   <Ship size={18}/>}
                                </div>
                                <div><p className={`text-sm font-black uppercase tracking-tight ${evt.status === 'ALERT' ? 'text-red-600 dark:text-red-400' : 'text-slate-800 dark:text-white'}`}>{evt.event}</p><p className="text-[9px] font-black uppercase text-slate-400 tracking-tighter mt-1">Authorized Agent: {evt.agent}</p></div>
                            </div>
                            <div className="flex items-center gap-2">{evt.status === 'ALERT' ? <div className="bg-red-600 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase flex items-center gap-2">ACTION <ArrowRight size={12}/></div> : <CheckCircle2 size={20} className="text-emerald-500" />}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="space-y-6">
            <div className="bg-slate-900 rounded-[3rem] p-10 border border-slate-800 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[80px] rounded-full group-hover:bg-blue-600/10 transition-all"></div>
                <h3 className="text-white font-black uppercase tracking-widest text-[10px] mb-10 flex items-center gap-3"><Activity size={20} className="text-blue-500" /> Neural Matrix Health</h3>
                <div className="space-y-8 relative z-10">
                    {[{ label: 'Global Inference', value: '12ms', pct: 98 }, { label: 'Edge Latency', value: '1.8ms', pct: 100 }, { label: 'Audit Hash Rate', value: '9.2 TH/s', pct: 99 }].map((item, i) => (
                        <div key={i} className="space-y-3">
                            <div className="flex justify-between items-center"><span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{item.label}</span><span className="text-[10px] font-black text-blue-400 font-mono">{item.value}</span></div>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden"><div className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6] transition-all duration-1000" style={{ width: isRunningDiagnostics ? `${Math.min(100, item.pct + diagProgress/10)}%` : `${item.pct}%` }}></div></div>
                        </div>
                    ))}
                </div>
                <div className="mt-12 p-5 bg-blue-900/20 border border-blue-500/30 rounded-[2rem] relative z-10">
                   <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1 flex items-center gap-2"><Database size={12}/> Federation Ledger</p>
                   <p className="text-[10px] text-slate-300 leading-relaxed font-medium italic">v4.0.0 Data Integrity: VERIFIED.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MainHub;
