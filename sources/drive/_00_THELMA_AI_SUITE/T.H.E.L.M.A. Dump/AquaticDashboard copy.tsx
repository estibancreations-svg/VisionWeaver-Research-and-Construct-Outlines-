Original name: AquaticDashboard copy.tsx
Drive ID: 12-fX-cm7L628NTDtqRB3mwScNaNFz26M
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/
Modified: 2026-01-12T00:17:32.000Z

import React, { useState } from 'react';
import { Ship, Anchor, Wind, Navigation, Radio, Crosshair, Play, Activity } from 'lucide-react';
import { AquaticAsset } from '../../types';

const mockShips: AquaticAsset[] = [
    { id: 'S-1', name: 'SS T.H.E.L.M.A. Titan', type: 'CARGO_SHIP', status: 'AT_SEA', coordinates: '34.0522° N, 118.2437° W', fuelLevel: 68 },
    { id: 'S-2', name: 'Coastal Defender', type: 'PATROL_BOAT', status: 'DOCKED', coordinates: 'Port of LA, Berth 54', fuelLevel: 92 },
    { id: 'S-3', name: 'Hercules Tug', type: 'TUG', status: 'MAINTENANCE', coordinates: 'Drydock B', fuelLevel: 15 }
];

const AquaticDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'OPS' | 'SIM' | 'DRYDOCK'>('OPS');

    return (
        <div className="space-y-6 animate-fadeIn">
             <div className="flex space-x-4 bg-white p-2 rounded-xl shadow-sm border border-slate-200">
                <button onClick={() => setActiveTab('OPS')} className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'OPS' ? 'bg-cyan-100 text-cyan-700' : 'text-slate-500 hover:bg-slate-50'}`}>
                    <Radio size={16} /> <span>Live Operations</span>
                </button>
                <button onClick={() => setActiveTab('SIM')} className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'SIM' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'}`}>
                    <Crosshair size={16} /> <span>Simulation Deck</span>
                </button>
                <button onClick={() => setActiveTab('DRYDOCK')} className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'DRYDOCK' ? 'bg-slate-200 text-slate-800' : 'text-slate-500 hover:bg-slate-50'}`}>
                    <Anchor size={16} /> <span>Drydock & Mods</span>
                </button>
            </div>

            {activeTab === 'OPS' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium text-slate-500">Vessels at Sea</h3>
                                <Ship size={18} className="text-cyan-600" />
                            </div>
                            <p className="text-2xl font-bold text-slate-800">12</p>
                            <span className="text-xs text-green-500 font-medium">All systems nominal</span>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium text-slate-500">Port Capacity</h3>
                                <Anchor size={18} className="text-slate-600" />
                            </div>
                            <p className="text-2xl font-bold text-slate-800">85%</p>
                            <span className="text-xs text-orange-500">High congestion warning</span>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium text-slate-500">Weather Alert</h3>
                                <Wind size={18} className="text-blue-400" />
                            </div>
                            <p className="text-lg font-bold text-slate-800">Gale Force 7</p>
                            <span className="text-xs text-slate-400">Sector 4 Affected</span>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium text-slate-500">Fuel Efficiency</h3>
                                <Navigation size={18} className="text-green-500" />
                            </div>
                            <p className="text-2xl font-bold text-slate-800">92.4%</p>
                            <span className="text-xs text-green-500">+1.2% this voyage</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-5 border-b border-slate-100">
                            <h2 className="font-semibold text-slate-800">Active Fleet Registry</h2>
                        </div>
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium">
                                <tr>
                                    <th className="px-5 py-3">Vessel Name</th>
                                    <th className="px-5 py-3">Type</th>
                                    <th className="px-5 py-3">Status</th>
                                    <th className="px-5 py-3">Coordinates</th>
                                    <th className="px-5 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {mockShips.map((ship) => (
                                    <tr key={ship.id}>
                                        <td className="px-5 py-3 font-medium text-slate-700">{ship.name}</td>
                                        <td className="px-5 py-3 text-slate-500 text-xs">{ship.type.replace('_', ' ')}</td>
                                        <td className="px-5 py-3">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                                                ship.status === 'AT_SEA' ? 'bg-cyan-100 text-cyan-700' :
                                                ship.status === 'DOCKED' ? 'bg-slate-100 text-slate-600' :
                                                'bg-orange-100 text-orange-700'
                                            }`}>
                                                {ship.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-slate-500 font-mono text-xs">{ship.coordinates}</td>
                                        <td className="px-5 py-3">
                                            <button className="text-cyan-600 hover:text-cyan-800 font-medium text-xs">Track</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'SIM' && (
                <div className="space-y-6">
                    <div className="bg-indigo-900 text-white p-8 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-bold mb-2">Aquatic Simulation Deck</h2>
                        <p className="text-indigo-200 max-w-2xl">
                            Run high-fidelity fluid dynamics simulations. Test hull integrity against rogue waves and optimize cargo load distribution.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Play size={18} className="text-indigo-600"/> Maritime Scenarios</h3>
                            <div className="space-y-3">
                                {[
                                    { title: 'Rogue Wave Impact', difficulty: 'Extreme', outcome: 'Structural Stress Test' },
                                    { title: 'Port Entry - High Wind', difficulty: 'Hard', outcome: 'Tug Assist Required' },
                                    { title: 'Iceberg Avoidance', difficulty: 'Medium', outcome: 'Course Correction Delta' }
                                ].map((sc, i) => (
                                    <div key={i} className="border border-slate-100 p-4 rounded-lg hover:border-indigo-300 transition-colors cursor-pointer group">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold text-slate-800 group-hover:text-indigo-700">{sc.title}</h4>
                                                <p className="text-xs text-slate-500 mt-1">Difficulty: {sc.difficulty}</p>
                                            </div>
                                            <button className="bg-slate-100 text-slate-600 p-2 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-all"><Play size={16} /></button>
                                        </div>
                                        <div className="mt-3 pt-3 border-t border-slate-50 flex items-center gap-2 text-xs text-slate-400">
                                            <Activity size={12} />
                                            <span>Outcome Focus: {sc.outcome}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                             <h3 className="font-bold text-slate-800 mb-4">Outcome Variations</h3>
                             <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 border-dashed text-center h-64 flex flex-col items-center justify-center">
                                <Radio size={32} className="text-slate-300 mb-2"/>
                                <p className="text-slate-500 font-medium">Simulation Idle</p>
                                <p className="text-xs text-slate-400 mt-1">Select a scenario to generate variable data sets.</p>
                             </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AquaticDashboard;