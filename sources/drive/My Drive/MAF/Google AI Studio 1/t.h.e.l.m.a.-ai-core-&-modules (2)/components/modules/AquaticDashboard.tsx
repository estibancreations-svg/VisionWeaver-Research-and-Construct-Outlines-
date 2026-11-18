Original name: AquaticDashboard.tsx
Drive ID: 1vYkBLQ6J9cn8ZWLOLNDFo3Ih92-hBQBQ
Parent folder: My Drive/MAF/Google AI Studio 1/t.h.e.l.m.a.-ai-core-&-modules (2)/components/modules/
Modified: 2026-01-31T10:56:50.000Z


import React, { useState, useEffect } from 'react';
import { Ship, Anchor, Wind, Navigation, Radio, Crosshair, Play, Activity, Droplets, Thermometer, ShieldCheck, Zap, Waves, SignalHigh, AlertTriangle, Target, Search, Network, ArrowLeft, Radar, Info } from 'lucide-react';
import { AquaticAsset } from '../../types';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Radar as RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

interface AquaticDashboardProps {
  onBack?: () => void;
}

// 2025 Era Maritime Assets with Breakdowns
const mockShips: AquaticAsset[] = [
    { 
        id: 'S-1', 
        name: 'YARA-BIRKELAND-G2', 
        type: 'AUTONOMOUS_CARGO', 
        status: 'AT_SEA', 
        coordinates: '34.05° N, 118.24° W', 
        fuelLevel: 68,
        description: "The successor to the world's first fully electric, autonomous container ship. Zero emissions. Utilizes GPS, Radar, Lidar, and AIS for uncrewed navigation.",
        specs: { "Capacity": "150 TEU", "Battery": "9 MWh", "Speed": "15 Knots", "Crew": "0 (Remote)" },
        // Fix: Add systemTimestamp to match AquaticAsset interface
        systemTimestamp: new Date().toISOString()
    },
    { 
        id: 'S-2', 
        name: 'SAILDRONE-SURVEYOR', 
        type: 'USV_MAPPING', 
        status: 'SURVEYING', 
        coordinates: 'Pacific Sector 4', 
        fuelLevel: 98,
        description: "Uncrewed Surface Vehicle (USV) powered mainly by wind and solar. Performs deep-ocean mapping and meteorological data collection autonomously for months.",
        specs: { "Length": "72 ft", "Power": "Wind + Solar", "Sensor": "Multibeam Sonar", "Endurance": "180 Days" },
        // Fix: Add systemTimestamp to match AquaticAsset interface
        systemTimestamp: new Date().toISOString()
    },
    { 
        id: 'S-3', 
        name: 'DEFENDER-MAM-X', 
        type: 'PATROL_DRONE', 
        status: 'DOCKED', 
        coordinates: 'Port LA, Berth 54', 
        fuelLevel: 100,
        description: "Medium Autonomous Maritime (MAM) vessel for port security. Equipped with non-lethal deterrents and 360-degree situational awareness cameras.",
        specs: { "Speed": "45 Knots", "Hull": "Carbon Comp", "Armament": "LRAD / Water Cannon", "AI": "Swarm Def" },
        // Fix: Add systemTimestamp to match AquaticAsset interface
        systemTimestamp: new Date().toISOString()
    },
    { 
        id: 'S-4', 
        name: 'ECO-AQUARIUS-HYBRID', 
        type: 'CARGO_SHIP', 
        status: 'AT_SEA', 
        coordinates: '25.7617° N, 80.1918° W', 
        fuelLevel: 42,
        description: "Hybrid bulk carrier utilizing rigid wing sails (Flettner rotors) to reduce fuel consumption by 30%. Dual-fuel LNG/Ammonia engines.",
        specs: { "DWT": "80,000 Tons", "Sails": "4x Rigid Wing", "Fuel": "LNG/Ammonia", "Efficiency": "+35%" },
        // Fix: Add systemTimestamp to match AquaticAsset interface
        systemTimestamp: new Date().toISOString()
    },
    { 
        id: 'S-5', 
        name: 'RR-SVITZER-HERMOD', 
        type: 'REMOTE_TUG', 
        status: 'ASSISTING', 
        coordinates: 'Rotterdam Port', 
        fuelLevel: 55,
        description: "Remotely operated commercial tugboat. Controlled by a shore-based captain using VR feed. Performs precision docking maneuvers.",
        specs: { "Bollard Pull": "70 Tons", "Control": "Remote Center", "Latency": "<150ms", "Safety": "Auto-Stop" },
        // Fix: Add systemTimestamp to match AquaticAsset interface
        systemTimestamp: new Date().toISOString()
    },
    { 
        id: 'S-6', 
        name: 'BLUEFIN-21-MKII', 
        type: 'AUV_SUB', 
        status: 'SUBMERGED', 
        coordinates: 'Unknown (Classified)', 
        fuelLevel: 80,
        description: "Autonomous Underwater Vehicle (AUV) for ultra-deep search and salvage. Modular payload bay allows for synthetic aperture sonar or chemical sniffing.",
        specs: { "Depth": "4,500m", "Endurance": "25 Hours", "Nav": "Inertial (INS)", "Comms": "Acoustic Modem" },
        // Fix: Add systemTimestamp to match AquaticAsset interface
        systemTimestamp: new Date().toISOString()
    }
];

const sonarData = [
  { subject: 'Depth', A: 85, fullMark: 100 },
  { subject: 'Acoustic', A: 72, fullMark: 100 },
  { subject: 'Thermal', A: 94, fullMark: 100 },
  { subject: 'Current', A: 65, fullMark: 100 },
  { subject: 'Flora', A: 40, fullMark: 100 }
];

const AquaticDashboard: React.FC<AquaticDashboardProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<'OPS' | 'COMMAND'>('OPS');
    const [selectedShip, setSelectedShip] = useState<AquaticAsset>(mockShips[0]);
    const [swarmPulse, setSwarmPulse] = useState(0);
    const [hullStress, setHullStress] = useState({ bow: 42, stern: 18, port: 12, starboard: 14 });
    const [trim, setTrim] = useState({ pitch: 1.2, roll: -0.5 });

    useEffect(() => {
        const interval = setInterval(() => {
            setHullStress(prev => ({
                bow: Math.max(10, Math.min(100, prev.bow + (Math.random() > 0.5 ? 2 : -1.5))),
                stern: Math.max(10, Math.min(100, prev.stern + (Math.random() > 0.5 ? 0.5 : -0.5))),
                port: Math.max(5, Math.min(100, prev.port + (Math.random() > 0.5 ? 1 : -1))),
                starboard: Math.max(5, Math.min(100, prev.starboard + (Math.random() > 0.5 ? 1 : -1))),
            }));
            setTrim(prev => ({
                pitch: prev.pitch + (Math.random() > 0.5 ? 0.1 : -0.1),
                roll: prev.roll + (Math.random() > 0.5 ? 0.05 : -0.05)
            }));
            setSwarmPulse(prev => (prev + 1) % 360);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-4 md:p-8 space-y-6 animate-fadeIn pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                  {onBack && (
                    <button 
                      onClick={onBack}
                      className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-cyan-600 transition-all shadow-sm shrink-0"
                    >
                      <ArrowLeft size={20} />
                    </button>
                  )}
                  <div>
                      <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Maritime Intelligence Hub • v4.0.0</h1>
                      <p className="text-slate-500 dark:text-slate-400 text-[10px] md:text-sm flex items-center gap-2 font-medium">
                          <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
                          Jan 04, 2025 • Sonar Link ACTIVE
                      </p>
                  </div>
                </div>
                <div className="flex gap-2 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm w-full md:w-auto">
                    <button onClick={() => setActiveTab('OPS')} className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'OPS' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Fleet Ops</button>
                    <button onClick={() => setActiveTab('COMMAND')} className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'COMMAND' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Command Deck</button>
                </div>
            </div>

            {activeTab === 'OPS' ? (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    
                    {/* Maritime Asset List */}
                    <div className="lg:col-span-1 space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 sticky top-0 bg-slate-50 dark:bg-slate-950 py-2 z-10">Maritime Asset Matrix</h3>
                        {mockShips.map((ship) => (
                             <div 
                                key={ship.id}
                                onClick={() => setSelectedShip(ship)}
                                className={`p-4 rounded-xl border cursor-pointer transition-all group ${selectedShip.id === ship.id ? 'bg-white dark:bg-slate-900 border-cyan-500 shadow-lg ring-1 ring-cyan-500/20' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-cyan-300 opacity-70 hover:opacity-100'}`}
                             >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className={`p-1.5 rounded-lg ${selectedShip.id === ship.id ? 'bg-cyan-100 text-cyan-600' : 'bg-slate-100 text-slate-500'}`}>
                                            {ship.type.includes('SUB') ? <Radar size={14}/> : <Ship size={14}/>}
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-tight truncate max-w-[100px] ${selectedShip.id === ship.id ? 'text-cyan-700 dark:text-cyan-400' : 'text-slate-700 dark:text-slate-300'}`}>{ship.name}</span>
                                    </div>
                                    <span className={`w-1.5 h-1.5 rounded-full ${ship.status === 'SUBMERGED' ? 'bg-blue-600' : ship.status === 'AT_SEA' ? 'bg-emerald-500 animate-pulse' : 'bg-yellow-500'}`}></span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="text-[9px] text-slate-400 font-medium">{ship.type}</div>
                                    <div className="text-[9px] font-mono text-cyan-600 dark:text-cyan-400 font-bold">{ship.fuelLevel}% FUEL</div>
                                </div>
                             </div>
                        ))}
                    </div>

                    <div className="lg:col-span-3 space-y-6">
                        <div className="bg-slate-950 rounded-3xl border border-slate-800 h-[400px] md:h-[600px] relative overflow-hidden group shadow-2xl">
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#0891b2 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                            
                            <div className="absolute inset-0 z-10">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-cyan-500/10 rounded-full animate-pulse"></div>
                                {[...Array(8)].map((_, i) => (
                                    <div 
                                        key={i}
                                        className="absolute w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_#06b6d4]"
                                        style={{
                                            top: `${50 + 30 * Math.sin((swarmPulse + i * 45) * Math.PI / 180)}%`,
                                            left: `${50 + 30 * Math.cos((swarmPulse + i * 45) * Math.PI / 180)}%`
                                        }}
                                    ></div>
                                ))}
                            </div>

                            <div className="absolute top-8 left-8 z-30 pointer-events-none">
                                <h3 className="text-cyan-400 font-black text-[11px] uppercase tracking-[0.3em] flex items-center gap-3 mb-2">
                                    <Network size={16} /> Sub-Surface Swarm Hub
                                </h3>
                            </div>

                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 group cursor-pointer transition-all duration-1000" style={{ 
                                top: `${50 + (mockShips.indexOf(selectedShip) * 5)}%` 
                            }}>
                                <div className="p-5 bg-cyan-700 rounded-[40px] shadow-[0_0_50px_rgba(6,182,212,0.3)] text-white border-2 border-cyan-400 transition-transform group-hover:scale-110 relative">
                                    <Ship size={36} />
                                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/50 backdrop-blur px-2 py-1 rounded text-[8px] font-black uppercase text-cyan-400">
                                        {selectedShip.name}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tech Breakdown Panel */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors relative overflow-hidden flex flex-col">
                           <h3 className="font-black text-slate-800 dark:text-white text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2">
                               <Info size={18} className="text-cyan-500"/> Vessel Schematics
                           </h3>
                           <div className="relative z-10 flex-1">
                               <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium mb-4">
                                   {selectedShip.description || "Retrieving classified schematic..."}
                                </p>
                                {selectedShip.specs && (
                                   <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                       {Object.entries(selectedShip.specs).map(([key, val], i) => (
                                           <div key={i} className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg border border-slate-100 dark:border-slate-700">
                                               <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{key}</p>
                                               <p className="text-[10px] font-bold text-slate-800 dark:text-white">{val}</p>
                                           </div>
                                       ))}
                                   </div>
                                )}
                           </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
                            <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-[0.2em] text-[12px] mb-8 flex items-center gap-2"><Zap size={20} className="text-cyan-500"/> Hull Structural Integrity Matrix</h3>
                            <div className="flex flex-col md:flex-row gap-12 items-center">
                                <div className="relative w-full max-w-[200px] aspect-[1/3] bg-slate-900 rounded-[80px_80px_40px_40px] border border-slate-700 flex flex-col justify-between p-8 group">
                                    <div className="absolute top-6 -left-12 text-right"><p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">BOW_STRESS</p><p className={`text-sm font-black font-mono ${hullStress.bow > 70 ? 'text-red-500 animate-bounce' : 'text-slate-900 dark:text-white'}`}>{Math.round(hullStress.bow)}%</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AquaticDashboard;
