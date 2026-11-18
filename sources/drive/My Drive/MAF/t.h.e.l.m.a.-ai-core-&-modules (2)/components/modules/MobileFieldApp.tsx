Original name: MobileFieldApp.tsx
Drive ID: 1Ci_YmzM66YL7mtU78G8v9xPYk_aVj9FJ
Parent folder: My Drive/MAF/t.h.e.l.m.a.-ai-core-&-modules (2)/components/modules/
Modified: 2026-01-31T10:56:50.000Z


import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Smartphone, Fingerprint, MapPin, Navigation, AlertTriangle, ShieldCheck, Camera, Mic, Volume2, Info, 
  ArrowLeft, RefreshCw, Power, Zap, Clock, Bluetooth, SignalHigh, Wifi, Eye, Gauge, Thermometer, 
  Battery, Wind, ZoomIn, CheckCircle2, SlidersHorizontal, Brain, Truck, MessageSquare, ShieldAlert, 
  ScanLine, Maximize2, Share2, Radio, Ear, AlertOctagon, FileText, Landmark, Settings, Flame, Layers, 
  Check, Activity, Search, Hammer, Boxes, Droplets, HardHat, Crosshair, Sun, Moon, Database, Speaker
} from 'lucide-react';
import { DutyStatus, LoadTicket, ModuleType } from '../../types';

interface MobileFieldAppProps {
  onBack?: () => void;
  onVocalize?: (text: string) => void;
}

type FieldTab = 'NAV' | 'DATA' | 'CAM' | 'ELD' | 'LOADS' | 'SHOP';
type NightMode = 'DAY' | 'NIGHT' | 'TACTICAL';

const MobileFieldApp: React.FC<MobileFieldAppProps> = ({ onBack, onVocalize }) => {
  const [isLocked, setIsLocked] = useState(true);
  const [activeTab, setActiveTab] = useState<FieldTab>('NAV');
  const [nightMode, setNightMode] = useState<NightMode>('DAY');
  const [authProgress, setAuthProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAlerting, setIsAlerting] = useState(false);
  
  // Simulation Data (150 Sensor Data Points in Matrix)
  const [speed, setSpeed] = useState(62);
  const [battery, setBattery] = useState(88);
  const [isPttActive, setIsPttActive] = useState(false);
  const [showHud, setShowHud] = useState(true);

  const telemetryNodes = useMemo(() => {
    const categories = ['POWERTRAIN', 'HYDRAULIC', 'STRUCTURE', 'COMMS', 'CARGO', 'SAFETY', 'SENSORS', 'THERMAL'];
    const nodes: any[] = [];
    categories.forEach(cat => {
      for (let i = 1; i <= 20; i++) { // Increased density to 160 total nodes
        nodes.push({ id: `${cat}_${i}`, label: `${cat} Sensor ${i}`, value: Math.floor(Math.random() * 20 + 80), status: 'NOMINAL', category: cat });
      }
    });
    return nodes;
  }, []);

  const filteredNodes = telemetryNodes.filter(n => n.label.toLowerCase().includes(searchQuery.toLowerCase()));

  const startHandshake = () => {
    let prog = 0;
    const interval = setInterval(() => {
        prog += 10;
        setAuthProgress(prog);
        if (prog >= 100) {
            clearInterval(interval);
            setIsLocked(false);
            // v4.0.0 Copilot Greeting Protocol
            if (onVocalize) {
                onVocalize("Architect Signature Confirmed. Global Mesh v4.0 confirmed. Unit F-101 is en-route. Bridge height caution 14 foot 2 remains active.");
            }
        }
    }, 150);
  };

  useEffect(() => {
    if (!isLocked) {
      const interval = setInterval(() => {
        setSpeed(prev => Math.max(55, Math.min(75, prev + (Math.random() > 0.5 ? 1 : -1))));
        setBattery(prev => Math.max(1, prev - 0.01));
        
        // Randomly trigger Co-pilot Advisory Alert
        if (Math.random() > 0.95 && !isAlerting) {
            setIsAlerting(true);
            if (onVocalize) onVocalize("Advisory. Unit F-101 tyre pressure deviation in Axle 4. Glow indicator active.");
            setTimeout(() => setIsAlerting(false), 5000);
        }
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isLocked, isAlerting, onVocalize]);

  const renderNav = () => (
    <div className={`absolute inset-0 animate-fadeIn transition-all duration-700 ${nightMode === 'NIGHT' ? 'bg-slate-950' : nightMode === 'TACTICAL' ? 'bg-black' : 'bg-slate-900'}`}>
        <div className={`absolute inset-0 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i14!2i2625!3i6330!2m3!1e0!2sm!3i633215263!3m8!2sen!3sus!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0!23i4111425')] bg-cover ${nightMode === 'TACTICAL' ? 'grayscale invert opacity-20' : 'grayscale opacity-30'}`}></div>
        
        {showHud && (
            <div className="absolute inset-0 pointer-events-none z-10 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-blue-500/30">
                        <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2"><Activity size={10}/> Vector Stability</p>
                        <div className="flex gap-2 mt-1 font-mono text-[10px] text-white">
                            <span>P: +1.2°</span>
                            <span>R: -0.4°</span>
                        </div>
                    </div>
                    <div className="bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-emerald-500/30 text-right">
                        <p className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">Mesh Peer Density</p>
                        <p className="text-[10px] font-mono text-white">12 Nodes Detected</p>
                    </div>
                </div>
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20">
                    <Crosshair size={120} className="text-blue-500" strokeWidth={1} />
                </div>

                <div className="flex justify-between items-end pb-20">
                     <div className="space-y-1">
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">Current Path Optimization</p>
                        <p className="text-xl font-black text-white font-mono uppercase tracking-tighter">Bypass Exit 4</p>
                     </div>
                     <div className="text-right space-y-1">
                        <p className="text-[8px] font-black text-slate-500 uppercase">Headwind</p>
                        <p className="text-xl font-black text-orange-500 font-mono">22 MPH</p>
                     </div>
                </div>
            </div>
        )}

        <div className="absolute bottom-24 left-6 right-6 z-20">
            <button className={`w-full p-5 ${isAlerting ? 'bg-amber-500 border-yellow-400 text-white animate-pulse shadow-[0_0_40px_rgba(245,158,11,0.5)]' : nightMode === 'TACTICAL' ? 'bg-emerald-950 border-emerald-500 text-emerald-400' : 'bg-red-600 border-red-500 text-white'} rounded-[2rem] font-black uppercase text-[11px] tracking-[0.2em] shadow-2xl flex items-center justify-center gap-3 border-2 transition-all`}>
                <ShieldAlert size={20}/> {isAlerting ? 'Co-Pilot Advisory: Tyre Flux' : 'Broadcast Road Incident'}
            </button>
        </div>

        <div className="absolute right-6 top-1/4 flex flex-col gap-4 z-20">
            <button onClick={() => setNightMode(prev => prev === 'DAY' ? 'NIGHT' : prev === 'NIGHT' ? 'TACTICAL' : 'DAY')} className="w-12 h-12 rounded-full bg-slate-800/80 backdrop-blur border-2 border-slate-600 flex items-center justify-center text-white shadow-xl">
                {nightMode === 'DAY' ? <Sun size={20}/> : nightMode === 'NIGHT' ? <Moon size={20}/> : <Zap size={20} className="text-emerald-400"/>}
            </button>
            <button onClick={() => setShowHud(!showHud)} className={`w-12 h-12 rounded-full backdrop-blur border-2 flex items-center justify-center shadow-xl transition-all ${showHud ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-800/80 border-slate-600 text-slate-400'}`}>
                <Activity size={20} />
            </button>
            <button onClick={() => { if(onVocalize) onVocalize("Standby. Reciting federation report. Fleet efficiency nominal. 80 units reporting stable. No hazards within sector 4.") }} className="w-12 h-12 rounded-full bg-slate-800/80 backdrop-blur border-2 border-slate-600 flex items-center justify-center text-white shadow-xl">
                <Speaker size={20} />
            </button>
        </div>
    </div>
  );

  const renderData = () => (
    <div className={`absolute inset-0 p-6 pt-16 space-y-6 animate-fadeIn overflow-y-auto no-scrollbar ${nightMode === 'TACTICAL' ? 'bg-black text-emerald-400' : 'bg-slate-950 text-white'}`}>
        <div className="flex flex-col gap-4">
            <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                    type="text" 
                    placeholder="Search 160 Sensor Nodes..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase outline-none focus:border-blue-500"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-3xl border border-white/10">
                    <p className="text-[8px] font-black text-slate-500 uppercase mb-2">Chassis Health</p>
                    <div className="flex items-end gap-2">
                        <span className="text-2xl font-black font-mono">99.2%</span>
                        <span className="text-[9px] text-emerald-500 font-bold mb-1">STABLE</span>
                    </div>
                </div>
                <div className="p-4 bg-white/5 rounded-3xl border border-white/10">
                    <p className="text-[8px] font-black text-slate-500 uppercase mb-2">Relay Latency</p>
                    <div className="flex items-end gap-2">
                        <span className="text-2xl font-black font-mono">1.2ms</span>
                        <span className="text-[9px] text-blue-400 font-bold mb-1">0_HOP</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
            {filteredNodes.slice(0, 30).map(node => (
                <div key={node.id} className="p-4 bg-black/40 rounded-2xl border border-white/5 flex flex-col gap-2 group hover:border-blue-500 transition-all">
                    <div className="flex justify-between items-center">
                        <span className="text-[8px] font-black text-slate-500 truncate uppercase">{node.label}</span>
                        <span className="text-[9px] font-mono font-bold text-blue-400">{node.value}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${node.value > 90 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${node.value}%` }}></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

  return (
    <div className={`flex flex-col items-center justify-center min-h-[80vh] p-4 md:p-8 animate-fadeIn ${nightMode === 'TACTICAL' ? 'dark-tactical' : ''}`}>
      <div className={`w-full max-w-[360px] aspect-[9/19.5] rounded-[4rem] border-[10px] shadow-2xl overflow-hidden relative flex flex-col transition-all duration-700 
        ${isAlerting ? 'ring-8 ring-amber-500 ring-opacity-50 border-amber-600' : nightMode === 'TACTICAL' ? 'bg-black border-emerald-900/40 shadow-emerald-500/20' : 'bg-slate-950 border-slate-900 shadow-black/50'}`}>
        
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 rounded-b-2xl z-50 ${isAlerting ? 'bg-amber-600' : nightMode === 'TACTICAL' ? 'bg-emerald-950' : 'bg-slate-900'}`}></div>
        
        <div className="pt-8 px-6 flex justify-between items-center z-40 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
          <span className={`text-[10px] font-black font-mono ${nightMode === 'TACTICAL' ? 'text-emerald-400' : 'text-white'}`}>14:30</span>
          <div className="flex items-center gap-2">
            <Bluetooth size={10} className={nightMode === 'TACTICAL' ? 'text-emerald-400' : 'text-white'} />
            <SignalHigh size={10} className="text-emerald-400" />
            <Wifi size={10} className={nightMode === 'TACTICAL' ? 'text-emerald-400' : 'text-white'} />
            <div className={`w-6 h-3 border rounded-[3px] p-0.5 flex items-center ${nightMode === 'TACTICAL' ? 'border-emerald-500/50' : 'border-white/40'}`}>
                <div className={`h-full w-[85%] rounded-[1px] ${isAlerting ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
            </div>
          </div>
        </div>

        {isLocked ? (
          <div className={`flex-1 flex flex-col items-center justify-center p-8 space-y-12 animate-fadeIn relative ${nightMode === 'TACTICAL' ? 'bg-black' : 'bg-slate-900'}`}>
            <div className="text-center relative z-10">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl mx-auto mb-6 border-2 transition-all ${nightMode === 'TACTICAL' ? 'bg-emerald-950 border-emerald-500 text-emerald-400' : 'bg-blue-600 border-white/10 text-white'}`}>
                    <Zap size={40} className={authProgress > 0 ? 'animate-pulse' : ''} />
                </div>
                <h2 className={`font-black text-2xl uppercase tracking-tighter leading-none ${nightMode === 'TACTICAL' ? 'text-emerald-400' : 'text-white'}`}>PRIMAL RELAY</h2>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-3">Identity Co-Pilot Enabled</p>
            </div>

            <div className="w-full space-y-8 relative z-10">
                <button 
                  onMouseDown={startHandshake}
                  className={`w-full aspect-square max-w-[180px] mx-auto rounded-full border-4 flex flex-col items-center justify-center relative group active:scale-90 transition-all overflow-hidden ${nightMode === 'TACTICAL' ? 'border-emerald-900 bg-emerald-950/20' : 'border-slate-800 bg-blue-600/5'}`}
                >
                    <Fingerprint size={72} className={`mb-2 relative z-10 ${nightMode === 'TACTICAL' ? 'text-emerald-500' : 'text-blue-500'}`} />
                    <p className={`text-[9px] font-black uppercase tracking-widest relative z-10 ${nightMode === 'TACTICAL' ? 'text-emerald-400' : 'text-blue-400'}`}>Handshake Required</p>
                    {authProgress > 0 && (
                        <svg className="absolute inset-0 -rotate-90 w-full h-full p-2">
                            <circle 
                                cx="50%" cy="50%" r="48%" 
                                stroke="currentColor" strokeWidth="6" fill="transparent"
                                className={`${nightMode === 'TACTICAL' ? 'text-emerald-500' : 'text-blue-600'} transition-all duration-200`}
                                strokeDasharray="300"
                                strokeDashoffset={300 - (3 * authProgress)}
                            />
                        </svg>
                    )}
                </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col animate-fadeIn bg-black">
            <div className="flex-1 relative overflow-hidden">
                {activeTab === 'NAV' && renderNav()}
                {activeTab === 'DATA' && renderData()}
                {activeTab === 'SHOP' && <div className="p-8 text-slate-500 font-black uppercase text-xs">Shop Link Active</div>}
                {activeTab === 'ELD' && <div className="p-8 text-slate-500 font-black uppercase text-xs">ELD Stream Secured</div>}
                {activeTab === 'LOADS' && <div className="p-8 text-slate-500 font-black uppercase text-xs">Active Load: ORD-9921</div>}
            </div>

            <div className={`pt-4 pb-12 px-2 border-t space-y-6 shrink-0 z-50 transition-colors ${nightMode === 'TACTICAL' ? 'bg-black border-emerald-900/50' : 'bg-slate-900 border-white/10'}`}>
               <div className="flex justify-around items-center">
                    {[
                        { id: 'NAV', icon: Navigation, label: 'Nav' },
                        { id: 'DATA', icon: Activity, label: 'Omni' },
                        { id: 'SHOP', icon: Hammer, label: 'Shop' },
                        { id: 'LOADS', icon: FileText, label: 'Load' },
                    ].map(item => (
                        <button 
                            key={item.id} 
                            onClick={() => setActiveTab(item.id as FieldTab)} 
                            className={`flex flex-col items-center gap-1 transition-all flex-1 ${activeTab === item.id ? (nightMode === 'TACTICAL' ? 'text-emerald-400' : 'text-blue-500') : 'text-slate-600 hover:text-slate-300'}`}
                        >
                            <item.icon size={20}/>
                            <span className="text-[7px] font-black uppercase">{item.label}</span>
                        </button>
                    ))}
               </div>
            </div>
          </div>
        )}
        <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 rounded-full opacity-50 z-50 ${isAlerting ? 'bg-amber-500' : nightMode === 'TACTICAL' ? 'bg-emerald-900' : 'bg-slate-800'}`}></div>
      </div>

      <div className="mt-8 max-w-md text-center space-y-4 px-4">
          <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${isAlerting ? 'text-amber-500 animate-pulse' : nightMode === 'TACTICAL' ? 'text-emerald-500' : 'text-slate-400'}`}>
            Co-Pilot Prime v4.0.0
          </p>
          <button onClick={onBack} className="px-8 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase text-slate-500 tracking-widest hover:text-blue-600 transition-all">
              Disconnect Node
          </button>
      </div>
    </div>
  );
};

export default MobileFieldApp;
