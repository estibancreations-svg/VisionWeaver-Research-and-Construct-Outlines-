Original name: AgentHub.tsx
Drive ID: 1J4xrBqK39omvSW-nw2wRMv7ruUYmV45w
Parent folder: My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/
Modified: 2026-01-12T00:14:35.000Z


import React from 'react';
import { Brain, Cpu, Shield, GraduationCap, Activity, Zap, MessageSquare, Database, Network } from 'lucide-react';

const AgentHub: React.FC = () => {
    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 text-white p-8 rounded-xl shadow-lg relative overflow-hidden">
                <div className="relative z-10 flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Brain className="text-purple-400" size={32} />
                            <h1 className="text-3xl font-bold">Neural Agent Orchestration</h1>
                        </div>
                        <p className="text-slate-300 max-w-2xl">
                            Real-time monitoring of the Federated AI Mesh. Manage cognitive load, token consumption, and inter-agent handshakes between H.E.N.R.Y., L.I.L.Y., and P.E.R.C.Y.
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-purple-300 uppercase tracking-widest">Total System Load</p>
                        <p className="text-4xl font-bold font-mono">42%</p>
                    </div>
                </div>
                <Network className="absolute right-[-20px] bottom-[-40px] opacity-10 text-white" size={200} />
            </div>

            {/* Agent Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* HENRY */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                                <Activity size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">H.E.N.R.Y.</h3>
                                <p className="text-xs text-slate-500">Ops & Reasoning</p>
                            </div>
                        </div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Heuristic Depth</span>
                            <span className="font-mono text-slate-700 font-bold">Level 4</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Active Contexts</span>
                            <span className="font-mono text-slate-700">Fleet, Aviation</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
                            <div className="bg-blue-600 h-full w-[65%]"></div>
                        </div>
                        <p className="text-[10px] text-slate-400 text-right mt-1">Cognitive Load: 65%</p>
                    </div>
                </div>

                {/* LILY */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
                                <GraduationCap size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">L.I.L.Y.</h3>
                                <p className="text-xs text-slate-500">Training & Sim</p>
                            </div>
                        </div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Simulations Active</span>
                            <span className="font-mono text-slate-700 font-bold">12</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Learning Rate</span>
                            <span className="font-mono text-slate-700">0.94 alpha</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
                            <div className="bg-emerald-600 h-full w-[30%]"></div>
                        </div>
                        <p className="text-[10px] text-slate-400 text-right mt-1">Cognitive Load: 30%</p>
                    </div>
                </div>

                {/* PERCY */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-slate-800 text-white rounded-lg">
                                <Shield size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">P.E.R.C.Y.</h3>
                                <p className="text-xs text-slate-500">Governance & Risk</p>
                            </div>
                        </div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Policy Checks/min</span>
                            <span className="font-mono text-slate-700 font-bold">1,402</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Firewall Status</span>
                            <span className="font-mono text-green-600 font-bold">Active</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
                            <div className="bg-slate-800 h-full w-[12%]"></div>
                        </div>
                        <p className="text-[10px] text-slate-400 text-right mt-1">Cognitive Load: 12%</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Zap size={18} className="text-yellow-500"/> Neural Processing Stream
                    </h3>
                    <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-green-400 h-64 overflow-y-auto space-y-2">
                        <p><span className="text-slate-500">[10:04:22]</span> <span className="text-blue-400">HENRY:</span> Detecting anomaly in F-104 fuel consumption rate.</p>
                        <p><span className="text-slate-500">[10:04:23]</span> <span className="text-blue-400">HENRY:</span> Cross-referencing with Route 4 gradient data.</p>
                        <p><span className="text-slate-500">[10:04:24]</span> <span className="text-purple-400">PERCY:</span> Validating maintenance logs for F-104. No recent engine service found.</p>
                        <p><span className="text-slate-500">[10:04:25]</span> <span className="text-blue-400">HENRY:</span> Hypothesis: Fuel injector degradation. Probability: 88%.</p>
                        <p><span className="text-slate-500">[10:04:25]</span> <span className="text-blue-400">HENRY:</span> Recommending schedule for Maintenance Bay 2.</p>
                        <p><span className="text-slate-500">[10:05:01]</span> <span className="text-emerald-400">LILY:</span> Updating training module "Fuel Efficiency" with new data.</p>
                        <p><span className="text-slate-500">[10:05:15]</span> <span className="text-slate-400">SYS:</span> Token budget nominal. Usage: 14k/1M.</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Database size={18} className="text-slate-500"/> Knowledge Graph Statistics
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-lg">
                            <p className="text-xs text-slate-500 uppercase">Vector Embeddings</p>
                            <p className="text-2xl font-bold text-slate-800">14.2M</p>
                            <p className="text-[10px] text-green-600 flex items-center gap-1">+2.4k today</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg">
                            <p className="text-xs text-slate-500 uppercase">RAG Retrievals</p>
                            <p className="text-2xl font-bold text-slate-800">8,921</p>
                            <p className="text-[10px] text-slate-400">Last 24h</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg">
                            <p className="text-xs text-slate-500 uppercase">Conversation Turns</p>
                            <p className="text-2xl font-bold text-slate-800">432</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg">
                            <p className="text-xs text-slate-500 uppercase">Avg Latency</p>
                            <p className="text-2xl font-bold text-slate-800">420ms</p>
                            <p className="text-[10px] text-green-600">Optimal</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentHub;
