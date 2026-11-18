Original name: Maintenance.tsx
Drive ID: 1kiwCPn7rgCizbGTjCAHaEwXrGuVUnHug
Parent folder: My Drive/MAF/t.h.e.l.m.a.-ai-core-&-modules (2)/components/modules/
Modified: 2026-01-31T10:56:50.000Z


import React, { useState, useEffect } from 'react';
import { Wrench, AlertTriangle, CheckCircle2, Truck, ClipboardList, Shield, ArrowRight, ArrowLeft, History, FileText, Activity, Sliders, Zap, Camera, Eye, X, Smartphone, Radio, Mic, Phone, CheckSquare, RotateCcw, Clock, RefreshCw, Layers, Database } from 'lucide-react';
import { MaintenanceRecord } from '../../types';

interface MaintenanceProps {
  onBack?: () => void;
}

const mockUnits = [
    { 
        id: 'F-101', 
        name: 'Tesla Semi G2', 
        status: 'URGENT', 
        health: 82, 
        photos: [
            { url: 'https://images.unsplash.com/photo-1591768793355-74d7c2d29355?auto=format&fit=crop&q=80&w=800', label: 'WHEEL_CORE_L4', timestamp: '2025-01-05 14:20' },
            { url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800', label: 'BRAKE_HYDRAULIC_PADS', timestamp: '2025-01-05 14:21' }
        ] 
    },
    { id: 'F-102', name: 'Rivian EDV', status: 'OK', health: 98, photos: [] },
    { 
        id: 'F-104', 
        name: 'F-750 Hydro', 
        status: 'WARNING', 
        health: 89, 
        photos: [
            { url: 'https://images.unsplash.com/photo-1519003300449-424ad040507b?auto=format&fit=crop&q=80&w=800', label: 'HYDROGEN_TANK_VALVE', timestamp: '2025-01-06 09:12' }
        ] 
    },
];

const mockInventory = [
    { name: 'WHEEL_CORE_L4', stock: 12, bin: 'A-42', leadTime: '2h' },
    { name: 'BRAKE_HYDRAULIC_PADS', stock: 4, bin: 'B-12', leadTime: '6h' },
    { name: 'HYDROGEN_VALVE_S1', stock: 0, bin: 'C-01', leadTime: '48h' }
];

const Maintenance: React.FC<MaintenanceProps> = ({ onBack }) => {
    const [selectedUnitId, setSelectedUnitId] = useState(mockUnits[0].id);
    const [showPhotoOverlay, setShowPhotoOverlay] = useState<{url: string, label: string} | null>(null);
    const [showInventory, setShowInventory] = useState(false);
    const [sensitivity, setSensitivity] = useState(75);
    const [isTransmitting, setIsTransmitting] = useState(false);
    const [isRewinding, setIsRewinding] = useState(false);
    
    const selectedUnit = mockUnits.find(u => u.id === selectedUnitId);

    const handleRewind = () => {
        setIsRewinding(true);
        setTimeout(() => setIsRewinding(false), 2500);
    };

    return (
        <div className="p-4 md:p-8 space-y-6 animate-fadeIn pb-12 flex flex-col h-full bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden">
            {/* Inventory Modal */}
            {showInventory && (
                <div className="fixed inset-0 z-[500] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950/50">
                            <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-widest text-lg flex items-center gap-3"><Database size={24} className="text-orange-500"/> Hangar Parts Matrix</h3>
                            <button onClick={() => setShowInventory(false)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><X size={24}/></button>
                        </div>
                        <div className="p-8 space-y-4">
                            {mockInventory.map((item, i) => (
                                <div key={i} className="p-5 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 flex items-center justify-between transition-all hover:border-orange-400">
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Part ID</p>
                                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase">{item.name}</p>
                                    </div>
                                    <div className="text-right flex items-center gap-8">
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-slate-400">Stock</p>
                                            <p className={`text-sm font-black ${item.stock > 0 ? 'text-emerald-500' : 'text-red-500'}`}>{item.stock} Units</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-slate-400">Bin</p>
                                            <p className="text-sm font-mono font-bold text-slate-600 dark:text-slate-300">{item.bin}</p>
                                        </div>
                                        <button disabled={item.stock === 0} className="px-4 py-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest disabled:opacity-30">Pull</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Full Screen Inspection Viewer */}
            {showPhotoOverlay && (
                <div className="fixed inset-0 z-[500] bg-slate-950/98 backdrop-blur-2xl flex flex-col items-center justify-center p-8 animate-fadeIn">
                    <button onClick={() => setShowPhotoOverlay(null)} className="absolute top-8 right-8 p-5 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all shadow-2xl border border-white/5"><X size={32}/></button>
                    <div className="relative group max-w-4xl w-full">
                        <img src={showPhotoOverlay.url} className="w-full h-auto rounded-[3rem] shadow-[0_0_100px_rgba(59,130,246,0.2)] border-4 border-white/10" alt="Inspection" />
                        <div className="absolute top-10 left-10 p-6 bg-slate-900/80 backdrop-blur rounded-[2rem] border border-blue-500/30 text-white animate-slideInRight">
                            <p className="text-blue-400 font-black text-[10px] uppercase tracking-[0.3em] mb-2">Neural Scan Layer</p>
                            <h3 className="text-2xl font-black uppercase tracking-tight">{showPhotoOverlay.label}</h3>
                            <p className="text-slate-400 text-xs mt-2 font-mono italic">Condition: DEGRADED (82% Stability)</p>
                        </div>
                    </div>
                    <div className="mt-12 text-center space-y-4">
                        <h2 className="text-white font-black text-3xl uppercase tracking-tighter">Diagnostic Review</h2>
                        <div className="flex gap-4 justify-center pt-6">
                            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl flex items-center gap-2"><CheckCircle2 size={18}/> Authorize Repair</button>
                            <button onClick={() => setShowInventory(true)} className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black uppercase tracking-widest text-xs border border-white/10 flex items-center gap-2"><Layers size={18}/> Check Parts Matrix</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <button onClick={onBack} className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-orange-600 shadow-sm transition-all"><ArrowLeft size={20} /></button>
                    )}
                    <div>
                        <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">T.H.E.L.M.A. Maintenance Core</h1>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                            <Wrench size={12} className="text-orange-500"/> Predictive Ops • v4.0.0 Handshake
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="px-4 border-r border-slate-100 dark:border-slate-800">
                        <p className="text-[8px] font-black text-slate-400 uppercase mb-1">AI Sensitivity</p>
                        <input 
                            type="range" 
                            min="0" max="100" 
                            value={sensitivity} 
                            onChange={(e) => setSensitivity(parseInt(e.target.value))}
                            className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none accent-orange-500"
                        />
                    </div>
                    <div className="px-4 flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${sensitivity > 80 ? 'bg-red-50 animate-pulse' : 'bg-emerald-500'}`}></div>
                        <span className="text-[10px] font-black uppercase text-slate-700 dark:text-slate-300">Mesh Stability: {sensitivity}%</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0 overflow-hidden">
                <div className="lg:col-span-1 space-y-4 overflow-y-auto no-scrollbar pr-1">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 px-2"><Truck size={14}/> Active Asset Queue</h3>
                    {mockUnits.map(unit => (
                        <div key={unit.id} onClick={() => setSelectedUnitId(unit.id)} className={`p-6 rounded-[2.5rem] border cursor-pointer transition-all duration-300 relative group ${selectedUnitId === unit.id ? 'bg-slate-900 text-white border-slate-800 shadow-2xl scale-[1.02]' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-orange-400 opacity-70 hover:opacity-100'}`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-2xl ${selectedUnitId === unit.id ? 'bg-orange-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:text-orange-500'} transition-colors`}>
                                        <Truck size={20}/>
                                    </div>
                                    <div>
                                        <p className="text-base font-black uppercase tracking-tight leading-none mb-1">{unit.id}</p>
                                        <p className="text-[10px] font-bold opacity-60 uppercase">{unit.name}</p>
                                    </div>
                                </div>
                                {unit.status === 'URGENT' && <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>}
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[8px] font-black uppercase tracking-widest">
                                    <span className="opacity-50">Health Matrix</span>
                                    <span className={unit.health < 85 ? 'text-red-400' : 'text-emerald-400'}>{unit.health}%</span>
                                </div>
                                <div className="w-full bg-slate-700/20 h-1.5 rounded-full overflow-hidden">
                                    <div className={`h-full transition-all duration-1000 ${unit.health < 85 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${unit.health}%` }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-3 flex flex-col gap-6 overflow-y-auto no-scrollbar">
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm p-8 transition-colors">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                            <h3 className="font-black text-slate-800 dark:text-white uppercase text-xs tracking-[0.2em] flex items-center gap-3">
                                <Camera size={20} className="text-blue-500"/> Field Inspection Feed
                            </h3>
                            <div className="flex gap-2">
                                <button onClick={handleRewind} className="flex items-center gap-2 bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg active:scale-95">
                                    {isRewinding ? <RefreshCw className="animate-spin" size={16}/> : <RotateCcw size={16}/>} Telemetry Rewind (120s)
                                </button>
                                <button onClick={() => setShowInventory(true)} className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-700 transition-all shadow-lg active:scale-95">
                                    <Layers size={16}/> Parts Matrix
                                </button>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {selectedUnit?.photos.map((p, i) => (
                                <div key={i} onClick={() => setShowPhotoOverlay(p)} className="relative aspect-video rounded-[2rem] overflow-hidden group cursor-pointer border-2 border-slate-100 dark:border-slate-800 shadow-md hover:border-blue-500 transition-all">
                                    <img src={p.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Inspected Section" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Eye className="text-white" size={32}/>
                                    </div>
                                    <div className="absolute bottom-4 left-4 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-[9px] text-white font-black uppercase tracking-widest border border-white/10">
                                        {p.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
                             <div className="flex justify-between items-center mb-6">
                                <h4 className="font-black text-slate-400 uppercase text-[10px] tracking-widest flex items-center gap-2">
                                    <Activity size={16}/> {isRewinding ? 'Forensic Rewind (T-120s)' : 'Neural Telemetry Stream'}
                                </h4>
                                <span className={`text-[9px] font-mono font-black ${isRewinding ? 'text-blue-500' : 'text-emerald-500'} animate-pulse`}>
                                    {isRewinding ? 'BUFFERING HISTORY...' : 'CONNECTION STABLE'}
                                </span>
                             </div>
                             <div className="bg-slate-50 dark:bg-slate-950/50 rounded-3xl p-8 font-mono text-[11px] text-slate-500 space-y-3 border border-slate-100 dark:border-slate-800 max-h-48 overflow-y-auto no-scrollbar">
                                {isRewinding ? (
                                    <>
                                        <p className="text-blue-400 font-bold">[T-120s] HARMONIC BASELINE: 31.2 Hz (STABLE)</p>
                                        <p className="text-blue-400 font-bold">[T-90s] OIL TEMP: 182°F (NOMINAL)</p>
                                        <p className="text-blue-400 font-bold">[T-60s] BRAKE ACTUATION: 14.2 PSI (EXPECTED)</p>
                                        <p className="text-orange-400 font-bold">[T-30s] ANOMALY DETECTED: AXLE VIBRATION SPIKE (44.5 Hz)</p>
                                        <p className="text-orange-500 font-bold">[T-15s] PREDICTIVE ALERT GEN: 82% CERTAINTY OF FAILURE</p>
                                        <p className="text-red-500 font-black animate-pulse">[T-0s] ALARM TRIGGERED: BRAKE_HYDRAULIC_PADS</p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-blue-500 opacity-70">[14:30:12] SYSTEM: INITIALIZING UNIT {selectedUnitId} DIAGNOSTIC MESH...</p>
                                        <p className="text-slate-400">[14:30:15] TPMS: CALIBRATION SUCCESSFUL (WHEEL 1-18 NOMINAL)</p>
                                        <p className="text-slate-400">[14:30:18] CORE: DRIVE TRAIN HARMONICS VERIFIED (32.4 Hz)</p>
                                        <p className="text-orange-500 font-bold">[14:30:20] ALERT: SURFACE DEGRADATION DETECTED L-AXLE 4</p>
                                        <p className="text-emerald-500 font-black">[14:30:22] T.H.E.L.M.A.: OVERALL HEALTH {selectedUnit?.health}% - ADVISORY ISSUED</p>
                                        <p className="text-slate-600">[14:30:45] SYSTEM: PENDING ARCHITECT SIGN-OFF ON CLAIM #CLM-882</p>
                                    </>
                                )}
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Maintenance;
