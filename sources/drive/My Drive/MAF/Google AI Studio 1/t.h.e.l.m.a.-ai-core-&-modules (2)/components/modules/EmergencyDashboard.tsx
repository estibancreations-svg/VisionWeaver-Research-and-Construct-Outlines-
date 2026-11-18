Original name: EmergencyDashboard.tsx
Drive ID: 1vmVQDNXQfHm3AO-bT0PqyPELZ3KIpX69
Parent folder: My Drive/MAF/Google AI Studio 1/t.h.e.l.m.a.-ai-core-&-modules (2)/components/modules/
Modified: 2026-01-31T10:56:50.000Z


import React, { useState, useEffect, useMemo } from 'react';
import { Siren, MapPin, Phone, Clock, ShieldAlert, Truck, Activity, Radio, CheckCircle, AlertTriangle, Users, Timer, Zap, Navigation, Shield, Heart, HeartPulse, ChevronRight, Search, Crosshair, ArrowLeft, X, Droplets, Flame, ShieldCheck, UserCheck, MessageSquare } from 'lucide-react';

interface EmergencyDashboardProps {
  onBack?: () => void;
}

interface Incident {
    id: string;
    type: 'MEDICAL' | 'FIRE' | 'HAZMAT' | 'SECURITY' | 'AV_CRASH';
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    location: string;
    status: 'NEW' | 'DISPATCHED' | 'ON_SCENE' | 'RESOLVED';
    timestamp: string;
    unitsAssigned: string[];
    startTime: number;
    coordinates: { x: number, y: number };
}

const mockIncidents: Incident[] = [
    { id: 'INC-901', type: 'HAZMAT', severity: 'CRITICAL', location: 'Hwy 401, Mile 82', status: 'ON_SCENE', timestamp: '10m ago', unitsAssigned: ['F-101', 'R-01'], startTime: Date.now() - 600000, coordinates: { x: 42, y: 38 } },
    { id: 'INC-902', type: 'MEDICAL', severity: 'HIGH', location: 'Distribution Hub B', status: 'DISPATCHED', timestamp: '25m ago', unitsAssigned: ['EMS-4'], startTime: Date.now() - 1500000, coordinates: { x: 70, y: 55 } },
    { id: 'INC-903', type: 'SECURITY', severity: 'MEDIUM', location: 'Gate 4 Perimeter', status: 'NEW', timestamp: '2m ago', unitsAssigned: [], startTime: Date.now() - 120000, coordinates: { x: 25, y: 80 } },
    { id: 'INC-904', type: 'AV_CRASH', severity: 'CRITICAL', location: 'Sector 7 Approach', status: 'NEW', timestamp: 'Just now', unitsAssigned: [], startTime: Date.now(), coordinates: { x: 55, y: 15 } }
];

const EmergencyDashboard: React.FC<EmergencyDashboardProps> = ({ onBack }) => {
    const [currentTime, setCurrentTime] = useState(Date.now());
    const [selectedIncident, setSelectedIncident] = useState<Incident | null>(mockIncidents[0]);
    const [dispatcherStress, setDispatcherStress] = useState(62);
    const [activeTab, setActiveTab] = useState<'MAP' | 'LOGS'>('MAP');
    const [triageMode, setTriageMode] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
            setDispatcherStress(prev => Math.max(40, Math.min(95, prev + (Math.random() > 0.5 ? 1.5 : -1))));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatDuration = (startTime: number) => {
        const diff = currentTime - startTime;
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleTriage = (incidentId: string) => {
        setTriageMode(true);
    };

    return (
        <div className="p-4 md:p-8 space-y-6 animate-fadeIn pb-12 flex flex-col h-screen overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <button onClick={onBack} className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-red-600 shadow-sm transition-all"><ArrowLeft size={20} /></button>
                    )}
                    <div>
                        <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Tier-1 Emergency Command</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-[10px] md:text-sm flex items-center gap-2 font-medium">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                            Priority Mesh v4.0.0 • Updates 61-90 Deployed
                        </p>
                    </div>
                </div>
                <div className="flex gap-2 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <button onClick={() => setActiveTab('MAP')} className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'MAP' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-500'}`}>Tactical Map</button>
                    <button onClick={() => setActiveTab('LOGS')} className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'LOGS' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-500'}`}>Incident Matrix</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
                {/* Main Viewport */}
                <div className="lg:col-span-3 bg-slate-900 rounded-[3rem] border border-red-500/20 shadow-2xl relative overflow-hidden flex flex-col transition-all">
                    {activeTab === 'MAP' ? (
                        <div className="flex-1 relative">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ef4444 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                            
                            {/* Animated Grid Dots */}
                            <div className="absolute inset-0 z-0">
                                {mockIncidents.map(inc => (
                                    <div 
                                        key={inc.id}
                                        onClick={() => setSelectedIncident(inc)}
                                        className={`absolute cursor-pointer group transition-all duration-1000`}
                                        style={{ top: `${inc.coordinates.y}%`, left: `${inc.coordinates.x}%` }}
                                    >
                                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${inc.severity === 'CRITICAL' ? 'bg-red-600/20 border-red-500 animate-pulse' : 'bg-orange-500/20 border-orange-500'}`}>
                                            <Siren size={16} className={inc.severity === 'CRITICAL' ? 'text-red-500' : 'text-orange-500'} />
                                        </div>
                                        <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 backdrop-blur px-2 py-1 rounded text-[8px] font-black uppercase text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                            {inc.id}: {inc.type}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Floating Map HUD */}
                            <div className="absolute top-10 left-10 p-6 bg-slate-900/90 backdrop-blur rounded-[2rem] border border-red-500/30 w-72 space-y-4 z-20">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-red-600 text-white rounded-2xl shadow-lg"><Crosshair size={24} /></div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Active Perimeter</p>
                                        <p className="text-sm font-black text-white uppercase leading-tight">Sector 7 Alpha</p>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                                    <span className="text-[9px] font-black uppercase text-slate-500">Unit Coverage</span>
                                    <span className="text-xs font-mono font-bold text-red-500">82% NOMINAL</span>
                                </div>
                                <button className="w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95">
                                    <Radio size={14}/> Open PTT Relay
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 overflow-y-auto no-scrollbar">
                            <table className="w-full text-left text-xs">
                                <thead className="sticky top-0 bg-slate-900 z-10 text-[9px] font-black uppercase tracking-widest text-slate-500 border-b border-white/5">
                                    <tr>
                                        <th className="px-8 py-5">Status</th>
                                        <th className="px-8 py-5">ID / Type</th>
                                        <th className="px-8 py-5">Location</th>
                                        <th className="px-8 py-5">Response Time</th>
                                        <th className="px-8 py-5 text-right">Command</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {mockIncidents.map(inc => (
                                        <tr key={inc.id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className={`w-2 h-2 rounded-full ${inc.status === 'NEW' ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <p className="font-black text-white uppercase tracking-tight">{inc.id}</p>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase">{inc.type}</p>
                                            </td>
                                            <td className="px-8 py-6 text-slate-300 font-bold uppercase flex items-center gap-2 mt-2"><MapPin size={12} className="text-red-500"/> {inc.location}</td>
                                            <td className="px-8 py-6 font-mono font-bold text-slate-400">{formatDuration(inc.startTime)}</td>
                                            <td className="px-8 py-6 text-right">
                                                <button onClick={() => handleTriage(inc.id)} className="px-4 py-2 bg-white/10 hover:bg-red-600 text-white rounded-lg text-[9px] font-black uppercase transition-all">Triage</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Right Sidebar Area */}
                <div className="space-y-6 overflow-y-auto no-scrollbar pb-6">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                        <div className="flex justify-between items-start mb-8">
                            <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2"><HeartPulse size={18} className="text-red-500" /> Dispatch Stress</h3>
                            <div className="px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 rounded text-[10px] font-mono font-black">{dispatcherStress}%</div>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div className={`h-full transition-all duration-1000 ${dispatcherStress > 80 ? 'bg-red-500' : 'bg-blue-600'}`} style={{ width: `${dispatcherStress}%` }}></div>
                        </div>
                        <p className="text-[9px] text-slate-500 font-bold uppercase mt-4 leading-relaxed">
                            [T.H.E.L.M.A.] Co-pilot mode enabled to offload resource allocation if stress exceeds 85%.
                        </p>
                    </div>

                    {selectedIncident && (
                        <div className="bg-slate-900 text-white p-8 rounded-[3rem] border border-red-500/30 shadow-2xl relative overflow-hidden group animate-slideInRight">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-[60px] rounded-full"></div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-center mb-6">
                                    <h4 className="text-xl font-black uppercase tracking-tighter">{selectedIncident.id}</h4>
                                    <span className="px-2 py-1 bg-red-600 text-white text-[8px] font-black uppercase rounded">{selectedIncident.severity}</span>
                                </div>
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                                        <Navigation size={20} className="text-blue-400"/>
                                        <div>
                                            <p className="text-[8px] text-slate-400 uppercase font-black tracking-widest">Target Vector</p>
                                            <p className="text-xs font-bold uppercase">{selectedIncident.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                                        <Users size={20} className="text-emerald-400"/>
                                        <div>
                                            <p className="text-[8px] text-slate-400 uppercase font-black tracking-widest">Units Assigned</p>
                                            <p className="text-xs font-bold uppercase">{selectedIncident.unitsAssigned.length > 0 ? selectedIncident.unitsAssigned.join(', ') : 'NONE_ASSIGNED'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="py-4 bg-red-600 hover:bg-red-500 rounded-2xl font-black uppercase text-[9px] tracking-widest shadow-lg transition-all active:scale-95">Assign Resource</button>
                                    <button className="py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-black uppercase text-[9px] tracking-widest border border-white/10 transition-all">Close Incident</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmergencyDashboard;
