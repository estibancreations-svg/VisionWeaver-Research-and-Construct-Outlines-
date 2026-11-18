Original name: AviationDashboard.tsx
Drive ID: 1SQoBK4RGcQmujPwvp3YFYKxWm5xNMID9
Parent folder: My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/copy-of-t.h.e.l.m.a.-ai-for-hackathon (2)/components/modules/
Modified: 2026-01-20T18:17:21.508Z

import React, { useState } from 'react';
import { Plane, Zap, Wind, Crosshair, PenTool, Upload, Battery, Activity, AlertTriangle, FileText, Settings, Play, Gauge, Radio } from 'lucide-react';
import { AviationAsset } from '../../types';

const mockAircraft: AviationAsset[] = [
    { 
        id: 'AP-X1', 
        callsign: 'AirPod One', 
        type: 'AIR_POD', 
        status: 'IN_FLIGHT', 
        altitude: '1,200 ft', 
        batteryLevel: 82, 
        coordinates: '34.05N, 118.24W',
        flightHours: 142.5,
        lastService: '2024-12-20',
        maintenanceLog: [
            { id: 'M-1', date: '2024-12-20', service: 'Rotor Balance', note: 'Nominal' }
        ]
    },
    { 
        id: 'DR-09', 
        callsign: 'Sentinel 9', 
        type: 'DRONE', 
        status: 'GROUNDED', 
        altitude: '0 ft', 
        batteryLevel: 100, 
        coordinates: 'Hangar B',
        flightHours: 45.2,
        lastService: '2025-01-02',
        maintenanceLog: [
            { id: 'M-2', date: '2025-01-02', service: 'Firmware Update v4.2', note: 'Security Patch Applied' }
        ]
    },
    { 
        id: 'AP-X2', 
        callsign: 'AirPod Two', 
        type: 'AIR_POD', 
        status: 'MAINTENANCE', 
        altitude: '0 ft', 
        batteryLevel: 15, 
        coordinates: 'Service Bay 4',
        flightHours: 310.8,
        lastService: '2024-11-15' 
    }
];

const AviationDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'OPS' | 'SIM' | 'HANGAR'>('OPS');
    const [selectedUnit, setSelectedUnit] = useState<AviationAsset | null>(null);

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Navigation Tabs */}
            <div className="flex space-x-4 bg-white p-2 rounded-xl shadow-sm border border-slate-200">
                <button onClick={() => setActiveTab('OPS')} className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'OPS' ? 'bg-sky-100 text-sky-700' : 'text-slate-500 hover:bg-slate-50'}`}>
                    <Radio size={16} /> <span>Live Operations</span>
                </button>
                <button onClick={() => setActiveTab('SIM')} className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'SIM' ? 'bg-purple-100 text-purple-700' : 'text-slate-500 hover:bg-slate-50'}`}>
                    <Crosshair size={16} /> <span>Simulation & Training</span>
                </button>
                <button onClick={() => setActiveTab('HANGAR')} className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'HANGAR' ? 'bg-orange-100 text-orange-700' : 'text-slate-500 hover:bg-slate-50'}`}>
                    <PenTool size={16} /> <span>The Hangar</span>
                </button>
            </div>

            {/* LIVE OPERATIONS */}
            {activeTab === 'OPS' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-sky-600 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
                            <h3 className="text-lg font-bold z-10 relative">Airspace Control</h3>
                            <p className="text-sky-100 text-sm z-10 relative">Monitoring 3 Active Units</p>
                            <Plane className="absolute -right-4 -bottom-4 text-sky-500 opacity-50" size={100} />
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-slate-500 text-sm font-bold uppercase">Battery Fleet Avg</span>
                                <Battery size={20} className="text-green-500" />
                            </div>
                            <p className="text-3xl font-bold text-slate-800">87%</p>
                        </div>
                         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-slate-500 text-sm font-bold uppercase">Wind Shear</span>
                                <Wind size={20} className="text-blue-500" />
                            </div>
                            <p className="text-3xl font-bold text-slate-800">12 kts <span className="text-xs text-slate-400 font-normal">NW</span></p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                            <h3 className="font-bold text-slate-800">Active Asset Telemetry</h3>
                        </div>
                        <table className="w-full text-sm text-left">
                            <thead className="bg-white text-slate-500 font-medium">
                                <tr>
                                    <th className="px-6 py-4">Unit / Callsign</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Altitude</th>
                                    <th className="px-6 py-4">Battery</th>
                                    <th className="px-6 py-4">Location</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {mockAircraft.map(ac => (
                                    <tr key={ac.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4 font-bold text-slate-700">{ac.callsign} <span className="text-slate-400 font-normal">({ac.id})</span></td>
                                        <td className="px-6 py-4"><span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold text-slate-600">{ac.type.replace('_', ' ')}</span></td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${ac.status === 'IN_FLIGHT' ? 'bg-green-100 text-green-700' : ac.status === 'MAINTENANCE' ? 'bg-red-100 text-red-700' : 'bg-slate-200 text-slate-600'}`}>
                                                {ac.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-slate-600">{ac.altitude}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                                    <div className={`h-full ${ac.batteryLevel < 20 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${ac.batteryLevel}%` }}></div>
                                                </div>
                                                <span className="text-xs">{ac.batteryLevel}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs text-slate-500">{ac.coordinates}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* SIMULATION */}
            {activeTab === 'SIM' && (
                <div className="space-y-6">
                    <div className="bg-purple-900 text-white p-8 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-bold mb-2">Aviation Simulation Deck</h2>
                        <p className="text-purple-200 max-w-2xl">
                            Test pilot responses and autonomous logic against variable outcomes. Run scenarios for Drones and Air Pods without risking physical assets.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Play size={18} className="text-purple-600"/> Available Scenarios</h3>
                            <div className="space-y-3">
                                {[
                                    { title: 'Sudden Microburst', difficulty: 'Hard', type: 'AIR_POD', outcome: 'Variable (80% Success)' },
                                    { title: 'Sensor Failure - Lidar', difficulty: 'Medium', type: 'DRONE', outcome: 'Variable (95% Return to Home)' },
                                    { title: 'Urban Canyon Nav', difficulty: 'Extreme', type: 'AIR_POD', outcome: 'Data Collection Only' },
                                ].map((sc, i) => (
                                    <div key={i} className="border border-slate-100 p-4 rounded-lg hover:border-purple-300 transition-colors cursor-pointer group">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold text-slate-800 group-hover:text-purple-700">{sc.title}</h4>
                                                <p className="text-xs text-slate-500 mt-1">Target: {sc.type.replace('_', ' ')} • Difficulty: {sc.difficulty}</p>
                                            </div>
                                            <button className="bg-slate-100 text-slate-600 p-2 rounded-full group-hover:bg-purple-600 group-hover:text-white transition-all"><Play size={16} /></button>
                                        </div>
                                        <div className="mt-3 pt-3 border-t border-slate-50 flex items-center gap-2 text-xs text-slate-400">
                                            <Activity size={12} />
                                            <span>Projected Outcome: {sc.outcome}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Gauge size={18} className="text-blue-600"/> Simulation Data & Analytics</h3>
                            <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 border-dashed text-slate-400">
                                <div className="text-center">
                                    <p className="font-medium">Select a scenario to view variations.</p>
                                    <p className="text-xs mt-2">Data includes: Battery drain, G-Force load, and Latency.</p>
                                </div>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div className="p-3 bg-slate-50 rounded-lg">
                                    <p className="text-xs text-slate-500">Success Rate</p>
                                    <p className="text-xl font-bold text-green-600">94.2%</p>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-lg">
                                    <p className="text-xs text-slate-500">Total Sim Hours</p>
                                    <p className="text-xl font-bold text-slate-800">1,240</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* HANGAR (Asset Management) */}
            {activeTab === 'HANGAR' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-slate-800">Fleet Maintenance & Config</h2>
                        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors">
                            <Upload size={16} /> Upload New Unit
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockAircraft.map(ac => (
                            <div key={ac.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-800">{ac.callsign}</h3>
                                        <p className="text-xs text-slate-500 font-mono">{ac.id}</p>
                                    </div>
                                    {ac.type === 'AIR_POD' ? <Zap size={24} className="text-yellow-500" /> : <Crosshair size={24} className="text-slate-400" />}
                                </div>
                                
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Flight Hours</span>
                                        <span className="font-mono text-slate-700">{ac.flightHours}h</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Last Service</span>
                                        <span className="font-mono text-slate-700">{ac.lastService}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Status</span>
                                        <span className={`font-bold text-xs px-2 py-0.5 rounded ${ac.status === 'MAINTENANCE' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>{ac.status}</span>
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 pt-4 flex gap-2">
                                    <button className="flex-1 bg-slate-50 text-slate-600 py-2 rounded text-xs font-bold hover:bg-slate-100 flex items-center justify-center gap-1">
                                        <FileText size={12} /> Logs
                                    </button>
                                    <button className="flex-1 bg-slate-50 text-slate-600 py-2 rounded text-xs font-bold hover:bg-slate-100 flex items-center justify-center gap-1">
                                        <Settings size={12} /> Mod
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AviationDashboard;