Original name: AiInsights copy.tsx
Drive ID: 1evUKSBhsDvjQobge8qDfZygtWbpYU_qh
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/
Modified: 2026-01-12T00:14:08.000Z

import React from 'react';
import { Brain, Activity, Shield, GraduationCap, Zap, TrendingUp, GitMerge, FileText, Cpu, Network, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const predictiveData = [
  { time: '08:00', actual: 82, predicted: 80 },
  { time: '10:00', actual: 85, predicted: 86 },
  { time: '12:00', actual: 78, predicted: 85 },
  { time: '14:00', actual: 90, predicted: 92 },
  { time: '16:00', actual: 95, predicted: 94 },
  { time: '18:00', actual: 88, predicted: 89 }
];

const AiInsights: React.FC = () => {
    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 text-white p-8 rounded-xl shadow-lg relative overflow-hidden border border-slate-700">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Brain className="text-purple-400" size={32} />
                            <h1 className="text-3xl font-bold">Neural Operations Center</h1>
                        </div>
                        <p className="text-slate-300 max-w-2xl">
                            Real-time introspection of the Federated AI Mesh. Monitor agent reasoning, predictive accuracy, and inter-agent collaboration events.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/20 text-center">
                            <p className="text-xs text-slate-400 uppercase tracking-wider">System Trust Score</p>
                            <p className="text-2xl font-bold text-green-400">99.8%</p>
                        </div>
                        <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/20 text-center">
                            <p className="text-xs text-slate-400 uppercase tracking-wider">Active Threads</p>
                            <p className="text-2xl font-bold text-blue-400">14</p>
                        </div>
                    </div>
                </div>
                <Network className="absolute right-[-20px] bottom-[-40px] opacity-10 text-white" size={200} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Cpu size={64} className="text-slate-800" />
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-slate-800 text-white rounded-lg flex items-center justify-center shadow-md">
                            <Brain size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">T.H.E.L.M.A.</h3>
                            <p className="text-[10px] text-slate-500 uppercase">Orchestrator</p>
                        </div>
                    </div>
                    <div className="space-y-2 mt-4">
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Interface Latency</span>
                            <span className="font-mono font-bold text-slate-700">12ms</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">User Context</span>
                            <span className="font-bold text-green-600">Active</span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 italic">
                            "Routing user intent to H.E.N.R.Y. for Fleet analysis."
                        </div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Activity size={64} className="text-blue-600" />
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                            <Activity size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">H.E.N.R.Y.</h3>
                            <p className="text-[10px] text-slate-500 uppercase">Ops & Reasoning</p>
                        </div>
                    </div>
                    <div className="space-y-2 mt-4">
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Telemetry Stream</span>
                            <span className="font-mono font-bold text-blue-600">4.2 GB/s</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Optimization</span>
                            <span className="font-bold text-slate-700">Level 4</span>
                        </div>
                         <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 italic">
                            "Analyzing Route 5 gradient for EV range efficiency."
                        </div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <GraduationCap size={64} className="text-emerald-600" />
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                            <GraduationCap size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">L.I.L.Y.</h3>
                            <p className="text-[10px] text-slate-500 uppercase">Training Core</p>
                        </div>
                    </div>
                    <div className="space-y-2 mt-4">
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Active Sims</span>
                            <span className="font-mono font-bold text-emerald-600">8</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Human Feedback</span>
                            <span className="font-bold text-slate-700">Positive</span>
                        </div>
                         <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 italic">
                            "Calibrating 'Rogue Wave' difficulty based on user scores."
                        </div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Shield size={64} className="text-indigo-600" />
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                            <Shield size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">P.E.R.C.Y.</h3>
                            <p className="text-[10px] text-slate-500 uppercase">Governance</p>
                        </div>
                    </div>
                    <div className="space-y-2 mt-4">
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Policy Audit</span>
                            <span className="font-mono font-bold text-indigo-600">Continuous</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Threat Level</span>
                            <span className="font-bold text-green-600">Low</span>
                        </div>
                         <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 italic">
                            "Flagging API Key K_3 usage spike for review."
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <TrendingUp size={18} className="text-blue-500"/> Predictive Operational Yield
                            </h3>
                            <p className="text-xs text-slate-500">AI Forecast vs Real-time Actuals (Fleet Efficiency)</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs">
                             <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Predicted</span>
                             <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Actual</span>
                        </div>
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={predictiveData}>
                                <defs>
                                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[60, 100]} />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Area type="monotone" dataKey="predicted" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorPred)" />
                                <Area type="monotone" dataKey="actual" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorActual)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100 flex items-start gap-3">
                        <Zap size={16} className="text-blue-600 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-sm font-bold text-blue-800">Insight: Efficiency Deviation Detected</p>
                            <p className="text-xs text-blue-600 mt-1">
                                Actual efficiency dropped below prediction at 12:00 due to unexpected congestion in Sector 4. H.E.N.R.Y. has automatically updated routing weights for tomorrow.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-slate-100 bg-slate-50">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <GitMerge size={18} className="text-slate-500"/> Neural Operations Mesh
                        </h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {[
                            { time: '14:02:15', agent: 'HENRY', action: 'Route Optimization', target: 'Fleet 104', status: 'COMPLETE' },
                            { time: '14:02:45', agent: 'PERCY', action: 'Policy Check', target: 'Compliance DB', status: 'VERIFIED' },
                            { time: '14:03:10', agent: 'LILY', action: 'Scenario Gen', target: 'Sim_99', status: 'PROCESSING' },
                            { time: '14:03:55', agent: 'HENRY', action: 'Telemetry Sync', target: 'Aviation Pods', status: 'COMPLETE' },
                            { time: '14:04:20', agent: 'THELMA', action: 'User Intent', target: 'UI Layer', status: 'ROUTED' }
                        ].map((op, i) => (
                            <div key={i} className="flex items-start gap-3 text-xs">
                                <div className="min-w-[50px] font-mono text-slate-400">{op.time}</div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className={`font-bold ${
                                            op.agent === 'HENRY' ? 'text-blue-600' : 
                                            op.agent === 'PERCY' ? 'text-indigo-600' :
                                            op.agent === 'LILY' ? 'text-emerald-600' : 'text-slate-800'
                                        }`}>{op.agent}</span>
                                        <span className="text-slate-600">{op.action}</span>
                                    </div>
                                    <div className="text-slate-400 mt-0.5 flex items-center gap-1">
                                        Target: {op.target}
                                        {op.status === 'PROCESSING' && <RefreshCw size={10} className="animate-spin text-blue-500"/>}
                                    </div>
                                </div>
                                <div className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
                                    op.status === 'COMPLETE' || op.status === 'VERIFIED' ? 'bg-green-100 text-green-700' : 
                                    op.status === 'PROCESSING' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                                }`}>{op.status}</div>
                            </div>
                        ))}
                    </div>
                    <div className="p-3 border-t border-slate-100 bg-slate-50 text-center">
                        <button className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1">
                            <FileText size={12}/> View Full Agent Logs
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiInsights;