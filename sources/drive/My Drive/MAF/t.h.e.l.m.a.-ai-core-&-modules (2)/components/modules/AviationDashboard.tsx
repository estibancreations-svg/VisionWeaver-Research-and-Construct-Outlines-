Original name: AviationDashboard.tsx
Drive ID: 1SNPaxmde2Ehwaz2cuIx72QDPJyQZU606
Parent folder: My Drive/MAF/t.h.e.l.m.a.-ai-core-&-modules (2)/components/modules/
Modified: 2026-01-31T10:56:50.000Z


import React, { useState, useEffect } from 'react';
import { Plane, Zap, Activity, AlertTriangle, FileText, Map as MapIcon, X, Rotate3D, TrendingDown, Shield, Bird, Wind, Navigation, Battery, Thermometer, Wrench, CheckCircle, ShieldAlert, RefreshCw, ArrowLeft, Crosshair, Package, Info, Orbit, Rocket, Hammer, Layers, Cpu, Eye, EyeOff } from 'lucide-react';
import { AviationAsset } from '../../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Radar as RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, RadarChart as RadarGraph } from 'recharts';

interface AviationDashboardProps {
  onBack?: () => void;
}

const initialAircraft: AviationAsset[] = [
  { 
    id: 'AP-X1', 
    callsign: 'JOBY-S4-EVTOL', 
    type: 'AIR_TAXI', 
    status: 'IN_FLIGHT', 
    altitude: '1,200 ft', 
    batteryLevel: 82, 
    coordinates: '34.0522° N, 118.2437° W',
    flightHours: 142.5,
    lastService: '2025-12-20',
    maintenanceLog: [{ id: 'M-1', date: '2025-12-20', service: 'Rotor Balance', note: 'Nominal.' }],
    description: "Five-seat eVTOL aircraft with six tilt-rotors. Designed for quiet urban air mobility.",
    specs: { "Max Speed": "200 mph", "Range": "150 miles", "Propulsion": "Electric", "Noise": "< 65 dBA" },
    systemTimestamp: new Date().toISOString()
  },
  { 
    id: 'AG-PROTO-01', 
    callsign: 'CLASSIFIED_PROJECT_Z', 
    type: 'ANTIGRAV', 
    status: 'TESTING', 
    altitude: '45,000 ft', 
    batteryLevel: 99, 
    coordinates: '51.1789° N, 115.5708° W',
    flightHours: 12.0,
    lastService: '2026-01-14',
    maintenanceLog: [],
    description: "Experimental logistics platform utilizing Zero-Point Energy. Non-aerodynamic propulsion.",
    specs: { "Propulsion": "Gravitic", "Payload": "MASSIVE", "Signature": "NULL", "Range": "GLOBAL" },
    systemTimestamp: new Date().toISOString()
  },
  { 
    id: 'AG-PROTO-02', 
    callsign: 'PROJECT_Z_MKII', 
    type: 'ANTIGRAV', 
    status: 'PRODUCTION', 
    altitude: '0 ft', 
    batteryLevel: 0, 
    coordinates: 'Foundry Sector 9',
    flightHours: 0,
    lastService: 'N/A',
    maintenanceLog: [],
    description: "Next-gen heavy lift graviton platform. Currently in Carbon-Weave Hull Assembly stage.",
    specs: { "Status": "Assembly", "Completion": "42%", "Core": "In-Sync", "Target": "Q3 2026" },
    systemTimestamp: new Date().toISOString()
  }
];

const AviationDashboard: React.FC<AviationDashboardProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'OPS' | 'HANGAR' | 'SPECIAL_PROJECTS'>('OPS');
  const [selectedAsset, setSelectedAsset] = useState<AviationAsset>(initialAircraft[0]);
  const [spectralMode, setSpectralMode] = useState(false);
  const [windSpeed, setWindSpeed] = useState(12);
  const [productionStep, setProductionStep] = useState(2);
  const [coreAlignment, setCoreAlignment] = useState(45);

  const filteredAssets = activeTab === 'SPECIAL_PROJECTS' ? initialAircraft.filter(a => a.type === 'ANTIGRAV') : initialAircraft.filter(a => a.type !== 'ANTIGRAV');

  return (
    <div className="p-4 md:p-8 space-y-6 animate-fadeIn pb-12 h-screen flex flex-col overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
        <div className="flex items-center gap-4">
          {onBack && (
            <button onClick={onBack} className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-sky-600 shadow-sm shrink-0"><ArrowLeft size={20} /></button>
          )}
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Aviation Command Node</h1>
            <p className="text-slate-500 dark:text-slate-400 text-[10px] md:text-sm flex items-center gap-2 font-medium uppercase tracking-widest">
               <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></span> Airspace Mastery v4.0 • Domain 3
            </p>
          </div>
        </div>
        <div className="flex gap-2 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm w-full md:w-auto">
          <button onClick={() => setActiveTab('OPS')} className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'OPS' ? 'bg-sky-600 text-white shadow-lg' : 'text-slate-500'}`}>Airspace Ops</button>
          <button onClick={() => setActiveTab('SPECIAL_PROJECTS')} className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'SPECIAL_PROJECTS' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-500'}`}>Special Projects</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
          {/* List Column */}
          <div className="lg:col-span-1 space-y-4 overflow-y-auto no-scrollbar pr-1">
             <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 px-2">{activeTab === 'SPECIAL_PROJECTS' ? 'Project Z Assets' : 'Fleet Aviation'}</h3>
             {filteredAssets.map((craft) => (
                 <div 
                    key={craft.id}
                    onClick={() => setSelectedAsset(craft)}
                    className={`p-6 rounded-[2.5rem] border cursor-pointer transition-all duration-300 group ${selectedAsset.id === craft.id ? 'bg-slate-900 text-white border-slate-800 shadow-2xl scale-[1.02]' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-sky-500'}`}
                 >
                    <div className="flex justify-between items-start mb-4">
                       <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-2xl ${selectedAsset.id === craft.id ? 'bg-sky-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'} transition-colors`}>
                             {craft.type === 'ANTIGRAV' ? <Orbit size={24}/> : <Plane size={24}/>}
                          </div>
                          <div>
                            <p className="text-base font-black uppercase tracking-tight leading-none mb-1">{craft.callsign}</p>
                            <p className="text-[10px] font-bold opacity-60 uppercase">{craft.type}</p>
                          </div>
                       </div>
                       <span className={`w-2 h-2 rounded-full ${craft.status.includes('FLIGHT') || craft.status.includes('TESTING') ? 'bg-emerald-500 animate-pulse' : 'bg-orange-500'}`}></span>
                    </div>
                    <div className="flex justify-between items-end mt-6">
                        <div className="text-[9px] font-black uppercase tracking-widest opacity-40">ALT: {craft.altitude}</div>
                        <div className="flex items-center gap-2">
                            <Battery size={14} className={craft.batteryLevel < 30 ? 'text-red-500' : 'text-emerald-500'} />
                            <span className="text-[11px] font-mono font-bold">{craft.batteryLevel}%</span>
                        </div>
                    </div>
                 </div>
             ))}
          </div>

          {/* Main Console Area */}
          <div className="lg:col-span-3 flex flex-col gap-6 overflow-hidden">
            <div className={`flex-1 rounded-[3rem] border shadow-2xl relative overflow-hidden transition-all duration-1000 ${spectralMode ? 'bg-indigo-950 border-purple-500/50' : 'bg-slate-950 border-slate-800'}`}>
                {/* Radar visualization */}
                <div className="absolute inset-0 z-0">
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border rounded-full transition-all duration-1000 ${spectralMode ? 'border-purple-500/20' : 'border-sky-500/10'}`}></div>
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border rounded-full transition-all duration-1000 ${spectralMode ? 'border-purple-500/20' : 'border-sky-500/10'}`}></div>
                    {/* Sweep Effect */}
                    <div className={`absolute top-1/2 left-1/2 w-[1200px] h-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full animate-spin-slow pointer-events-none`} 
                         style={{ background: `conic-gradient(from 0deg, ${spectralMode ? 'rgba(168, 85, 247, 0.1)' : 'rgba(56, 189, 248, 0.1)'} 0deg, transparent 40deg)` }}></div>
                </div>

                {/* Controls Overlay */}
                <div className="absolute top-10 left-10 z-20 pointer-events-none">
                   <h3 className={`font-black text-[12px] uppercase tracking-[0.3em] flex items-center gap-3 mb-2 ${spectralMode ? 'text-purple-400' : 'text-sky-400'}`}>
                     {spectralMode ? <Orbit size={20} className="animate-spin-slow"/> : <Activity size={20}/>} {spectralMode ? 'Spectral Inversion Matrix' : 'Global Airspace Alpha'}
                   </h3>
                   <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Sector 7 • Real-time Telemetry Enabled</p>
                </div>

                <div className="absolute top-10 right-10 z-20 flex gap-4">
                    <button 
                        onClick={() => setSpectralMode(!spectralMode)}
                        className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all flex items-center gap-3 shadow-xl ${spectralMode ? 'bg-purple-600 border-purple-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'}`}
                    >
                        {spectralMode ? <Eye size={16}/> : <EyeOff size={16}/>} Spectral Link
                    </button>
                </div>

                {/* Antigrav Foundry Visual for AG-PROTO-02 */}
                {activeTab === 'SPECIAL_PROJECTS' && selectedAsset.status === 'PRODUCTION' && (
                    <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm z-10 flex items-center justify-center p-12">
                        <div className="max-w-2xl w-full bg-slate-900 border-2 border-purple-500/30 rounded-[3rem] p-10 space-y-10 animate-fadeIn text-center">
                            <div className="flex justify-between items-start">
                                <div className="text-left">
                                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Project Z Foundry</h2>
                                    <p className="text-purple-400 text-[10px] font-black uppercase mt-2">Zero-Point Core Alignment Required</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-mono font-bold text-slate-500">ASSEMBLY: MK-II</p>
                                    <p className="text-3xl font-black text-white">42%</p>
                                </div>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                    <span>Core Sync Phase</span>
                                    <span className="text-purple-400">{coreAlignment}° Offset</span>
                                </div>
                                <div className="relative h-24 bg-slate-800 rounded-full flex items-center px-4">
                                    <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-12 bg-white/20"></div>
                                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full blur-md animate-pulse"></div>
                                    <input 
                                        type="range" min="0" max="90" step="1" 
                                        value={coreAlignment} 
                                        onChange={(e) => setCoreAlignment(parseInt(e.target.value))}
                                        className="w-full h-2 bg-transparent appearance-none cursor-pointer accent-purple-500 relative z-20" 
                                    />
                                </div>
                            </div>

                            <button disabled={coreAlignment !== 0} className="w-full py-5 bg-purple-600 hover:bg-purple-500 disabled:opacity-30 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-2xl transition-all">
                                Commit Core Alignment
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 shrink-0">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-colors flex flex-col">
                  <h3 className="font-black text-slate-800 dark:text-white text-[10px] uppercase tracking-widest mb-6 flex items-center gap-2"><Info size={18} className="text-sky-500"/> Tactical Manifest</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{selectedAsset.description}</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                  <h3 className="font-black text-slate-800 dark:text-white text-[10px] uppercase tracking-widest mb-6 flex items-center gap-2"><Activity size={18} className="text-emerald-500"/> Fleet Availability</h3>
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800 text-center flex-1">
                        <p className="text-[8px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">In Air</p>
                        <p className="text-xl font-black text-slate-900 dark:text-white">12</p>
                    </div>
                    <div className="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-2xl border border-sky-100 dark:border-sky-800 text-center flex-1">
                        <p className="text-[8px] font-black text-sky-600 dark:text-sky-400 uppercase tracking-widest mb-1">On Ground</p>
                        <p className="text-xl font-black text-slate-900 dark:text-white">4</p>
                    </div>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default AviationDashboard;
