Original name: FleetDashboard.tsx
Drive ID: 1QuKBjUQ2FBqAoEAbJDDS8WZf7OnxRYLS
Parent folder: My Drive/MAF/Google AI Studio 1/t.h.e.l.m.a.-ai-core-&-modules (2)/components/modules/
Modified: 2026-01-31T10:56:50.000Z


import React, { useState, useEffect } from 'react';
import { 
  Truck, Activity, Battery, Cpu, Info, Navigation, Check, SignalHigh, Mic, 
  Map as MapIcon, Layers, Globe, Satellite, Zap, Users, Sliders, ArrowLeft, 
  Power, Bluetooth, ShieldCheck, Clock, MapPin, CheckCircle2, AlertTriangle, 
  ExternalLink, ChevronRight, BarChart3, Wind, X, Camera, FileText, History, 
  Timer, Moon, Bed, Coffee, Smartphone, Droplets, Gauge, Crosshair, DollarSign, 
  Receipt as ReceiptIcon, Plus, Eye, Share2, Wifi, Brain, Target, Sparkles, 
  MessageSquareQuote, RefreshCw, ToggleLeft, ToggleRight, FileSearch, ShieldAlert,
  Fingerprint, ScanSearch
} from 'lucide-react';
import { FleetVehicle, DutyStatus, DOTLogEntry, Receipt, ModuleType } from '../../types';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { sendMessageToGemini } from '../../services/geminiService';

interface FleetDashboardProps {
  onBack?: () => void;
  onVocalize?: (text: string) => void;
}

// Enhanced mock data with VINs
const mockVehicles: (FleetVehicle & { vin?: string, verified?: boolean })[] = [
    { id: 'F-101', name: 'Tesla Semi G2', type: 'CLASS-8', status: 'ENROUTE', fuelLevel: 82, mileage: 12450, lastService: '2025-12-15', vin: '7SAR123X...9921', verified: true },
    { id: 'F-105', name: 'Rivian Prime V1', type: 'EDV-700', status: 'CHARGING', fuelLevel: 14, mileage: 4200, lastService: '2026-01-02', vin: '5RI105V...4402', verified: false },
    { id: 'F-109', name: 'Freightliner eM2', type: 'BOX-TRUCK', status: 'STANDBY', fuelLevel: 98, mileage: 890, lastService: '2026-01-05', vin: '1FL992M...8812', verified: true },
    { id: 'F-212', name: 'Kenworth T680E', type: 'HYDROGEN', status: 'ENROUTE', fuelLevel: 65, mileage: 24500, lastService: '2025-11-20', vin: '3KW680E...1102', verified: false },
    { 
        id: 'T-900', 
        name: 'Tesla Semi "CyberHauler"', 
        type: 'HEAVY_EV', 
        status: 'ACTIVE', 
        driver: 'Sarah Connor',
        location: 'I-5 South, Mile 120',
        fuelLevel: 88, 
        mileage: 4500, 
        lastService: '2026-01-12',
        vin: '7SAR900C...0001',
        verified: true,
        specs: { "Range": "500 mi", "Payload": "82k lbs", "Torque": "Vectoring", "Autopilot": "Enhanced" }
    }
];

const mockDOTLogs: DOTLogEntry[] = [
    { id: 'LOG-001', timestamp: '08:00 AM', status: DutyStatus.ENROUTE, location: 'San Francisco, CA', notes: 'Pre-trip inspection complete.' },
    { id: 'LOG-002', timestamp: '12:30 PM', status: DutyStatus.STOPPED, location: 'Fresno, CA', notes: '30 min mandatory break.' },
];

const FleetDashboard: React.FC<FleetDashboardProps> = ({ onBack, onVocalize }) => {
  const [activeTab, setActiveTab] = useState<'MAP' | 'MATRIX' | 'ELD' | 'EXPENSES'>('MAP');
  const [selectedUnit, setSelectedUnit] = useState(mockVehicles[0]);
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [verifyingVin, setVerifyingVin] = useState<string | null>(null);
  
  // Phase 2: Optimization & Constraint States
  const [optWeights, setOptWeights] = useState({ cost: 50, speed: 70, eco: 30 });
  const [constraints, setConstraints] = useState({ hos: true, bridge: true, battery: true, traffic: false });
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);
  const [isReSolving, setIsReSolving] = useState(false);

  // Map Layer States
  const [mapLayers, setMapLayers] = useState({ traffic: true, radar: false, geofence: false });

  const toggleConstraint = (key: keyof typeof constraints) => {
      setConstraints(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGlobalReSolve = () => {
      setIsReSolving(true);
      if(onVocalize) onVocalize("Re-calculating global mesh. Applying quantum constraints.");
      setTimeout(() => {
          setIsReSolving(false);
          setAiExplanation(null);
      }, 1500);
  };

  const verifyVin = (id: string) => {
      setVerifyingVin(id);
      setTimeout(() => {
          setVehicles(prev => prev.map(v => v.id === id ? { ...v, verified: true } : v));
          setVerifyingVin(null);
      }, 2500);
  };

  const handleExplainRoute = async () => {
      setIsExplaining(true);
      if(onVocalize) onVocalize("Analyzing routing logic with H.E.N.R.Y. Core.");
      try {
          const prompt = `Perform a tactical audit of the current route for Unit ${selectedUnit.id}. 
          Current Optimization Weights: Cost ${optWeights.cost}%, Speed ${optWeights.speed}%, Eco ${optWeights.eco}%. 
          Active Constraints: ${Object.entries(constraints).filter(([_,v]) => v).map(([k]) => k.toUpperCase()).join(', ')}.
          Explain why this specific neural sequence was chosen over alternative paths. Keep the tone tactical, professional, and dense with operational logic.`;
          
          // Using Thinking Mode via Gemini 3 Pro
          const result = await sendMessageToGemini(prompt, [], ModuleType.ROUTE_OPTIMIZER, { useThinking: true });
          if (result) {
              setAiExplanation(result.text || "Neural logic verified. The Clean Path remains optimal.");
              if(onVocalize) onVocalize("Route analysis complete. Tactical advisory displayed.");
          }
      } catch (err) {
          setAiExplanation("Error retrieving reasoning from H.E.N.R.Y. Core. Please verify mesh link.");
      }
      setIsExplaining(false);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 animate-fadeIn pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          {onBack && (
            <button onClick={onBack} className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-blue-600 transition-all shadow-sm">
              <ArrowLeft size={20} />
            </button>
          )}
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Fleet Intelligence • v4.0.0 Global Mesh</h1>
            <p className="text-slate-500 dark:text-slate-400 text-[10px] md:text-sm flex items-center gap-2 font-medium">
               <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
               H.E.N.R.Y. Optimization Link: ACTIVE
            </p>
          </div>
        </div>
        <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl overflow-x-auto max-w-full no-scrollbar">
             {['MAP', 'MATRIX', 'ELD', 'EXPENSES'].map((tab) => (
                 <button 
                    key={tab}
                    onClick={() => setActiveTab(tab as any)} 
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-white dark:bg-slate-900 shadow-md text-blue-600' : 'text-slate-500'}`}
                >
                    {tab} View
                </button>
             ))}
        </div>
      </div>

      {activeTab === 'MAP' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden h-[650px] relative group transition-colors">
                  <div className="absolute inset-0 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i12!2i656!3i1582!2m3!1e0!2sm!3i633215263!3m8!2sen!3sus!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0!23i4111425')] bg-cover grayscale opacity-40"></div>
                  <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

                  {/* Map Controls */}
                  <div className="absolute top-8 right-8 flex flex-col gap-2 z-20">
                      <button onClick={() => setMapLayers(prev => ({...prev, traffic: !prev.traffic}))} className={`p-3 rounded-xl backdrop-blur-md border transition-all flex items-center gap-2 ${mapLayers.traffic ? 'bg-slate-900/80 border-slate-700 text-white shadow-lg' : 'bg-white/80 border-slate-200 text-slate-500'}`}>
                          <SignalHigh size={16} className={mapLayers.traffic ? 'text-green-400' : ''} /><span className="text-[10px] font-black uppercase tracking-widest">Traffic</span>
                      </button>
                      <button onClick={() => setMapLayers(prev => ({...prev, radar: !prev.radar}))} className={`p-3 rounded-xl backdrop-blur-md border transition-all flex items-center gap-2 ${mapLayers.radar ? 'bg-slate-900/80 border-slate-700 text-white shadow-lg' : 'bg-white/80 border-slate-200 text-slate-500'}`}>
                          <Wifi size={16} className={mapLayers.radar ? 'text-blue-400' : ''} /><span className="text-[10px] font-black uppercase tracking-widest">Radar</span>
                      </button>
                  </div>
                  
                  {/* Floating Route Intelligence */}
                  <div className="absolute top-8 left-8 p-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-[32px] shadow-2xl border border-slate-200 dark:border-slate-700 w-80 space-y-4 z-10">
                      <div className="flex items-center gap-3">
                          <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg"><Navigation size={24} /></div>
                          <div><p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Neural Optimization</p><p className="text-sm font-black text-slate-800 dark:text-white uppercase leading-tight">Sector 4 Clean Path</p></div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                           <div className="flex justify-between items-center mb-2"><span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Mesh Confidence</span><span className="text-[10px] font-mono font-bold text-emerald-500">94.2%</span></div>
                           <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden"><div className="bg-blue-600 h-full w-[94%] shadow-[0_0_10px_#3b82f6]"></div></div>
                      </div>

                      {aiExplanation && (
                          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 animate-fadeIn overflow-hidden">
                              <div className="flex justify-between items-start mb-2">
                                  <p className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-2"><Sparkles size={10}/> Tactical Briefing</p>
                                  <button onClick={() => setAiExplanation(null)} className="text-slate-400 hover:text-red-500"><X size={10}/></button>
                              </div>
                              <p className="text-[10px] text-slate-600 dark:text-slate-300 font-medium italic leading-relaxed max-h-32 overflow-y-auto no-scrollbar">"{aiExplanation}"</p>
                          </div>
                      )}

                      <button onClick={handleExplainRoute} disabled={isExplaining} className="w-full py-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all">
                          {isExplaining ? <RefreshCw className="animate-spin" size={14}/> : <Brain size={14}/>} {isExplaining ? 'Thinking...' : 'Explain Route Logic'}
                      </button>
                  </div>

                  {/* Marker Animation */}
                  <div className="absolute top-[45%] left-[35%] animate-pulse">
                      <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center border border-blue-500/50">
                          <div className="w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-white"><Truck size={14}/></div>
                      </div>
                  </div>
              </div>

              {/* Neural Controls Sidebar Area */}
              <div className="space-y-6">
                  {/* Neural Weighting Panel */}
                  <div className="bg-slate-900 text-white p-7 rounded-[40px] border border-slate-800 shadow-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[60px] rounded-full"></div>
                      <h3 className="text-[10px] font-black uppercase text-slate-400 mb-8 tracking-[0.2em] flex items-center gap-3 relative z-10"><Sliders size={18} className="text-blue-500" /> Neural Weighting</h3>
                      <div className="space-y-8 relative z-10">
                          {[
                              { label: 'Cost Optimization', val: optWeights.cost, key: 'cost', color: 'accent-blue-500' },
                              { label: 'Speed Requirement', val: optWeights.speed, key: 'speed', color: 'accent-emerald-500' },
                              { label: 'Net-Zero (Eco)', val: optWeights.eco, key: 'eco', color: 'accent-purple-500' }
                          ].map(weight => (
                              <div key={weight.key} className="space-y-3">
                                  <div className="flex justify-between text-[9px] font-black uppercase text-slate-500 tracking-widest">
                                      <span>{weight.label}</span>
                                      <span className="text-white font-mono">{weight.val}%</span>
                                  </div>
                                  <input 
                                      type="range" 
                                      min="0" max="100"
                                      value={weight.val} 
                                      onChange={e => setOptWeights({...optWeights, [weight.key]: parseInt(e.target.value)})} 
                                      className={`w-full h-1 bg-slate-800 rounded-full appearance-none cursor-pointer ${weight.color}`} 
                                  />
                              </div>
                          ))}
                      </div>
                      <button 
                        onClick={handleGlobalReSolve}
                        disabled={isReSolving}
                        className="w-full mt-10 py-5 bg-blue-600 hover:bg-blue-500 rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-900/50 flex items-center justify-center gap-3 active:scale-95"
                      >
                          {isReSolving ? <RefreshCw className="animate-spin" size={16}/> : <Zap size={16}/>}
                          {isReSolving ? 'Re-Routing Mesh...' : 'Commit Global Re-Solve'}
                      </button>
                  </div>

                  {/* Constraint Matrix Panel */}
                  <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                      <h3 className="text-[10px] font-black uppercase text-slate-400 mb-6 tracking-[0.2em] flex items-center gap-3"><ShieldCheck size={18} className="text-emerald-500" /> Constraint Matrix</h3>
                      <div className="space-y-3">
                          {[
                              { label: 'HOS Rest Window', key: 'hos', icon: Clock },
                              { label: 'Bridge Clearance', key: 'bridge', icon: MapPin },
                              { label: 'Battery Capacity', key: 'battery', icon: Battery },
                              { label: 'Traffic Density', key: 'traffic', icon: SignalHigh }
                          ].map(item => (
                              <button 
                                key={item.key} 
                                onClick={() => toggleConstraint(item.key as any)}
                                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all group ${
                                    constraints[item.key as keyof typeof constraints] 
                                    ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400' 
                                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 text-slate-400'
                                }`}
                              >
                                  <div className="flex items-center gap-3">
                                      <item.icon size={16} className={constraints[item.key as keyof typeof constraints] ? 'text-emerald-500' : 'text-slate-400'} />
                                      <span className="text-[10px] font-black uppercase tracking-tight">{item.label}</span>
                                  </div>
                                  <div className="transition-transform group-active:scale-90">
                                      {constraints[item.key as keyof typeof constraints] ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                                  </div>
                              </button>
                          ))}
                      </div>
                      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                          <p className="text-[9px] text-blue-600 dark:text-blue-400 font-bold leading-relaxed uppercase">
                              [Guardian] All selected constraints are being enforced by the n8n buffer layer.
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {activeTab === 'MATRIX' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
              {vehicles.map(unit => (
                  <div key={unit.id} className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500 transition-all group flex flex-col justify-between">
                      <div className="relative">
                          <div className="flex justify-between items-start mb-8">
                              <div className={`p-4 rounded-3xl group-hover:scale-110 transition-transform ${unit.status === 'ENROUTE' || unit.status === 'ACTIVE' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                                  <Truck size={24}/>
                              </div>
                              <div className="text-right">
                                  <p className="text-xl font-black text-slate-900 dark:text-white uppercase leading-none">{unit.id}</p>
                                  <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest">{unit.type}</p>
                              </div>
                          </div>

                          {/* VIN VERIFICATION LAYER */}
                          <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                               <div className="flex justify-between items-center mb-2">
                                   <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Chassis Registry (VIN)</span>
                                   {unit.verified ? (
                                       <span className="flex items-center gap-1 text-[8px] font-black text-emerald-500 uppercase"><CheckCircle2 size={10}/> Authenticated</span>
                                   ) : (
                                       <span className="flex items-center gap-1 text-[8px] font-black text-orange-500 uppercase"><ShieldAlert size={10}/> Unverified</span>
                                   )}
                               </div>
                               <p className="font-mono text-xs font-bold text-slate-800 dark:text-slate-300 tracking-tighter mb-4">{unit.vin || 'NULL_REFERENCE'}</p>
                               {!unit.verified && (
                                   <button 
                                        onClick={() => verifyVin(unit.id)}
                                        disabled={verifyingVin === unit.id}
                                        className="w-full py-2 bg-blue-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                                   >
                                       {verifyingVin === unit.id ? <RefreshCw size={12} className="animate-spin" /> : <ScanSearch size={12} />}
                                       {verifyingVin === unit.id ? 'Neural Scour...' : 'Verify Asset VIN'}
                                   </button>
                               )}
                          </div>

                          <div className="space-y-6">
                              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                  <span className="text-slate-400">Mesh Status</span>
                                  <span className={unit.status === 'ENROUTE' || unit.status === 'ACTIVE' ? 'text-emerald-500' : 'text-blue-500'}>{unit.status}</span>
                              </div>
                              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                  <span className="text-slate-400">Energy Level</span>
                                  <span className="text-slate-900 dark:text-white font-mono">{unit.fuelLevel}%</span>
                              </div>
                              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                  <div className={`h-full transition-all duration-1000 ${unit.fuelLevel < 20 ? 'bg-red-500' : 'bg-blue-600'}`} style={{ width: `${unit.fuelLevel}%` }}></div>
                              </div>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      )}

      {activeTab === 'ELD' && (
          <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-fadeIn h-[600px] flex flex-col">
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950/50">
                  <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-widest text-xs flex items-center gap-3"><Clock size={20} className="text-blue-500"/> Electronic Logging Device (HOS)</h3>
                  <button className="px-6 py-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg active:scale-95">Download ELD Data</button>
              </div>
              <div className="flex-1 overflow-y-auto no-scrollbar">
                  <table className="w-full text-left">
                      <thead className="sticky top-0 bg-slate-50 dark:bg-slate-900 text-slate-500 font-black uppercase tracking-widest text-[9px] border-b border-slate-100 dark:border-slate-800">
                          <tr><th className="px-8 py-5">Timestamp</th><th className="px-8 py-5">Duty Status</th><th className="px-8 py-5">Location Mesh</th><th className="px-8 py-5">Tactical Annotation</th></tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                          {mockDOTLogs.map(log => (
                              <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                  <td className="px-8 py-6 font-mono font-bold text-slate-500">{log.timestamp}</td>
                                  <td className="px-8 py-6"><span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${log.status === DutyStatus.ENROUTE ? 'bg-blue-100 text-blue-600 border-blue-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>{log.status}</span></td>
                                  <td className="px-8 py-6 text-slate-600 dark:text-slate-400 font-bold flex items-center gap-2 uppercase"><MapPin size={14} className="text-blue-500"/> {log.location}</td>
                                  <td className="px-8 py-6 text-slate-400 italic font-medium">{log.notes}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
      )}

      {activeTab === 'EXPENSES' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-[600px]">
                  <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950/50">
                      <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-widest text-xs flex items-center gap-3"><ReceiptIcon size={20} className="text-emerald-500"/> Operational Expense Log</h3>
                  </div>
                  <div className="flex-1 overflow-y-auto no-scrollbar">
                      <table className="w-full text-left">
                          <thead className="sticky top-0 bg-slate-50 dark:bg-slate-900 text-slate-500 font-black uppercase tracking-widest text-[9px] border-b border-slate-100 dark:border-slate-800">
                              <tr><th className="px-8 py-5">Transaction Data</th><th className="px-8 py-5">Categorization</th><th className="px-8 py-5">Amt ($)</th><th className="px-8 py-5 text-right">Audit</th></tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                  <td className="px-8 py-6 font-mono text-slate-400">2026-01-15 14:30</td>
                                  <td className="px-8 py-6 font-black text-slate-800 dark:text-white uppercase tracking-tight">FUEL/ENERGY</td>
                                  <td className="px-8 py-6 font-mono font-black text-slate-900 dark:text-white">$145.50</td>
                                  <td className="px-8 py-6 text-right"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded text-[8px] font-black uppercase tracking-widest">Verified</span></td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
              <div className="space-y-6">
                  <div className="bg-slate-900 text-white p-10 rounded-[40px] border border-slate-800 shadow-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-10 flex items-center gap-3"><DollarSign size={20} className="text-emerald-500" /> Operational Burn</h3>
                      <div className="space-y-2 relative z-10">
                          <p className="text-4xl font-black font-mono tracking-tighter">$14,205.50</p>
                          <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">30-Day Trailing Total</p>
                      </div>
                      <div className="mt-12 pt-8 border-t border-white/5 space-y-4 relative z-10">
                          <div className="flex justify-between items-center text-[10px] font-black uppercase">
                              <span className="text-slate-500">Fuel Matrix</span>
                              <span className="text-white">$8,420.00</span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] font-black uppercase">
                              <span className="text-slate-500">Maintenance</span>
                              <span className="text-white">$5,785.50</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default FleetDashboard;
