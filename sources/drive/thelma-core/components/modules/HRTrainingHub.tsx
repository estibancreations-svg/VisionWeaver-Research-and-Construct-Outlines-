Original name: HRTrainingHub.tsx
Drive ID: 18-IaUOgG3KHZs8L7q6QYoE5Jm8pXoIhR
Parent folder: thelma-core/components/modules/
Modified: 2026-01-23T02:31:57.000Z


import React, { useState } from 'react';
import { GraduationCap, PlayCircle, Truck, Car, Plane, AlertTriangle, Shield, FileText, DollarSign, Users, Wifi, Droplet, ArrowLeft, Maximize2, Columns, CheckCircle, Activity, Info, Download, XCircle, RefreshCw, Send, FileCheck, AlertCircle, Eye, MicActivity } from 'lucide-react';
import { TrainingModule } from '../../types';

const trainingModules: TrainingModule[] = [
    { id: 'TM-01', title: 'Trucking Pro Dispatch', category: 'Transportation', status: 'Not Started', progress: 0, iconType: 'TRUCK', colorClass: 'bg-emerald-500' },
    { id: 'TM-03', title: 'Drone Operations', category: 'Aviation', status: 'Not Started', progress: 0, iconType: 'DRONE', colorClass: 'bg-sky-500' }
];

const renderIcon = (type: string, size: number = 24) => { return <GraduationCap size={size} />; };

const HRTrainingHub: React.FC = () => {
    const [view, setView] = useState<'HUB' | 'MODULE'>('HUB');
    const [activeModule, setActiveModule] = useState<TrainingModule | null>(null);
    const [simStatus, setSimStatus] = useState<'IDLE' | 'COMPLETE'>('IDLE');

    const handleLaunchModule = (module: TrainingModule) => { setActiveModule(module); setView('MODULE'); setSimStatus('IDLE'); };

    if (view === 'HUB') {
        return (
            <div className="min-h-screen bg-[#064e3b] text-white p-8 animate-fadeIn"> 
                <div className="text-center mb-10"><h1 className="text-4xl font-bold">L.I.L.Y. Training Hub</h1></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {trainingModules.map(module => (
                        <div key={module.id} onClick={() => handleLaunchModule(module)} className="bg-emerald-900/40 border border-emerald-700/30 rounded-xl p-6 cursor-pointer hover:bg-emerald-800/60 transition-all">
                            <h3 className="font-bold text-lg">{module.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col animate-slideUp">
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
                <button onClick={() => setView('HUB')} className="flex items-center gap-1 text-slate-500 font-bold text-sm"><ArrowLeft size={16} /> Hub</button>
                <h2 className="font-bold text-slate-900">{activeModule?.title}</h2>
            </div>
            
            <div className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-4xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><Activity size={18} className="text-blue-500"/> Simulation Review</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Eye Tracking */}
                        <div className="bg-slate-900 rounded-lg p-4 relative overflow-hidden h-48 group">
                            <div className="absolute top-2 left-2 z-10 flex items-center gap-2 text-white text-xs font-bold bg-black/50 px-2 py-1 rounded">
                                <Eye size={12} className="text-green-400"/> Eye Tracking Heatmap
                            </div>
                            <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=300&h=200')] bg-cover bg-center"></div>
                            <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-red-500/40 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                            <div className="absolute top-1/3 left-1/3 w-16 h-16 bg-yellow-500/30 rounded-full blur-lg"></div>
                        </div>

                        {/* Stress Voice Analysis */}
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-4 text-xs font-bold text-slate-600 uppercase">
                                <MicActivity size={14} className="text-orange-500"/> Vocal Stress Indicators
                            </div>
                            <div className="flex items-end gap-1 h-24 w-full">
                                {[20, 35, 45, 60, 80, 50, 40, 30, 25, 40, 55, 70, 90, 60, 40].map((h, i) => (
                                    <div key={i} className={`flex-1 rounded-t ${h > 75 ? 'bg-red-400' : 'bg-blue-300'}`} style={{height: `${h}%`}}></div>
                                ))}
                            </div>
                            <p className="text-xs text-slate-500 mt-2 text-center">Peak Stress Detected at 00:14 (Conflict Resolution)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HRTrainingHub;
