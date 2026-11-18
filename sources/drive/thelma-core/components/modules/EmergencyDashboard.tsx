Original name: EmergencyDashboard.tsx
Drive ID: 1FeNMDowUxyH4Ee6a0ZnjX4sKwUqG-sAA
Parent folder: thelma-core/components/modules/
Modified: 2026-01-23T02:31:57.000Z


import React, { useState, useEffect } from 'react';
import { Siren, MapPin, Phone, Clock, ShieldAlert, Truck, Activity, Radio, CheckCircle, AlertTriangle, Users, Timer } from 'lucide-react';

interface Incident {
    id: string;
    type: 'MEDICAL' | 'FIRE' | 'HAZMAT' | 'SECURITY';
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    location: string;
    status: 'NEW' | 'DISPATCHED' | 'ON_SCENE' | 'RESOLVED';
    timestamp: string;
    unitsAssigned: string[];
    startTime: number; // For the timer
}

const mockIncidents: Incident[] = [
    { id: 'INC-901', type: 'HAZMAT', severity: 'CRITICAL', location: 'Hwy 401, Mile 82', status: 'ON_SCENE', timestamp: '10m ago', unitsAssigned: ['F-104', 'R-01'], startTime: Date.now() - 600000 },
    { id: 'INC-902', type: 'MEDICAL', severity: 'HIGH', location: 'Distribution Hub B', status: 'DISPATCHED', timestamp: '25m ago', unitsAssigned: ['EMS-4'], startTime: Date.now() - 1500000 },
    { id: 'INC-903', type: 'SECURITY', severity: 'MEDIUM', location: 'Gate 4 Perimeter', status: 'NEW', timestamp: '2m ago', unitsAssigned: [], startTime: Date.now() - 120000 },
];

const EmergencyDashboard: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(Date.now());

    // Timer Tick
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatDuration = (startTime: number) => {
        const diff = currentTime - startTime;
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Status Header */}
            <div className="bg-red-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden border border-red-800">
                <div className="relative z-10 flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Siren className="animate-pulse text-red-400" size={32} />
                            <h1 className="text-2xl font-bold">Emergency Dispatch Command</h1>
                        </div>
                        <p className="text-red-200">Active Monitoring • Priority Channel Open</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-red-300 uppercase tracking-widest">Active Incidents</p>
                        <p className="text-4xl font-bold">{mockIncidents.filter(i => i.status !== 'RESOLVED').length}</p>
                    </div>
                </div>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#f87171 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Quick Stats */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-red-100 text-red-600 rounded-lg"><Activity size={24}/></div>
                    <div><p className="text-xs text-slate-500 font-bold uppercase">Avg Response Time</p><p className="text-xl font-bold text-slate-800">4m 12s</p></div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Users size={24}/></div>
                    <div><p className="text-xs text-slate-500 font-bold uppercase">Available Units</p><p className="text-xl font-bold text-slate-800">8/12</p></div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-orange-100 text-orange-600 rounded-lg"><Radio size={24}/></div>
                    <div><p className="text-xs text-slate-500 font-bold uppercase">Network Status</p><p className="text-xl font-bold text-slate-800">Secure</p></div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Incident Feed */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2"><ShieldAlert size={18} className="text-red-500"/> Incident Feed</h3>
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded font-bold animate-pulse">LIVE</span>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {mockIncidents.map(inc => (
                                <div key={inc.id} className="p-6 hover:bg-slate-50 transition-colors border-l-4 border-transparent hover:border-red-500">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-3">
                                            <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase ${
                                                inc.severity === 'CRITICAL' ? 'bg-red-600 text-white' : 
                                                inc.severity === 'HIGH' ? 'bg-orange-500 text-white' : 
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {inc.severity}
                                            </span>
                                            <h4 className="font-bold text-slate-800">{inc.type} Alert</h4>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-mono font-bold bg-slate-100 px-2 py-1 rounded">
                                            <Timer size={12} className={inc.status === 'NEW' ? 'text-red-500 animate-pulse' : 'text-slate-500'} />
                                            <span className={inc.status === 'NEW' ? 'text-red-600' : 'text-slate-700'}>
                                                {formatDuration(inc.startTime)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="ml-0 md:ml-2">
                                        <p className="text-sm text-slate-600 mb-3 flex items-center gap-2"><MapPin size={14} className="text-slate-400"/> {inc.location}</p>
                                        <div className="flex items-center gap-4 text-xs">
                                            <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-slate-600">
                                                <Truck size={12} /> Units: {inc.unitsAssigned.length > 0 ? inc.unitsAssigned.join(', ') : 'PENDING'}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                Status: 
                                                <span className={`font-bold ${
                                                    inc.status === 'ON_SCENE' ? 'text-green-600' : 
                                                    inc.status === 'NEW' ? 'text-red-600' : 'text-blue-600'
                                                }`}>{inc.status.replace('_', ' ')}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {inc.status === 'NEW' && (
                                        <div className="mt-4 flex gap-2">
                                            <button className="bg-red-600 text-white px-4 py-2 rounded text-xs font-bold hover:bg-red-700 transition-colors">DISPATCH NEAREST</button>
                                            <button className="bg-white border border-slate-300 text-slate-600 px-4 py-2 rounded text-xs font-bold hover:bg-slate-50">IGNORE (FALSE ALARM)</button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Resource Map Placeholder */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 h-fit">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><MapPin size={18} className="text-slate-500"/> Tactical Map</h3>
                    <div className="bg-slate-100 rounded-lg h-64 w-full flex items-center justify-center relative overflow-hidden group cursor-pointer border border-slate-200">
                        <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '10px 10px'}}></div>
                        <div className="text-center z-10">
                             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                                <Siren className="text-red-500" size={24} />
                             </div>
                             <p className="text-xs font-bold text-slate-500">Live Incident Tracking</p>
                        </div>
                        {/* Mock Pins */}
                        <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-red-500 rounded-full border border-white animate-ping"></div>
                        <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-red-500 rounded-full border border-white"></div>
                        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-blue-500 rounded-full border border-white"></div>
                    </div>
                    <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Hazmat Teams</span>
                            <span className="font-bold text-slate-800">2 Active</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Medical Units</span>
                            <span className="font-bold text-slate-800">4 Active</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Police Liaison</span>
                            <span className="font-bold text-green-600">Connected</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergencyDashboard;
