Original name: AgentHub.tsx
Drive ID: 1CGY_IBNJyqBf0srkQqDu_JrgIpcZXybf
Parent folder: My Drive/MAF/Google AI Studio 1/t.h.e.l.m.a.-ai-core-&-modules (2)/components/modules/
Modified: 2026-01-31T10:56:50.000Z


import React from 'react';
import { Brain, Cpu, Shield, GraduationCap, Activity, Zap, MessageSquare, Database, Network, ArrowLeft } from 'lucide-react';

interface AgentHubProps {
  onBack?: () => void;
}

const AgentHub: React.FC<AgentHubProps> = ({ onBack }) => {
    return (
        <div className="p-4 md:p-8 space-y-6 animate-fadeIn pb-12">
            <div className="flex items-center gap-4">
                {onBack && (
                    <button 
                        onClick={onBack}
                        className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-violet-600 transition-all shadow-sm shrink-0"
                    >
                        <ArrowLeft size={20} />
                    </button>
                )}
                <div>
                    <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cognitive Mesh v4.0.0</h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-bold">Federated Agent Handshake Matrix</p>
                </div>
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-2xl md:rounded-3xl shadow-lg relative overflow-hidden border border-slate-800">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Brain className="text-purple-400" size={32} />
                            <h1 className="text-xl md:text-3xl font-black uppercase tracking-tight">Neural Agent Hub</h1>
                        </div>
                        <p className="text-slate-300 max-w-2xl text-xs md:text-sm">
                            Real-time monitoring of the Federated AI Mesh. Manage cognitive load, token consumption, and inter-agent handshakes.
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-purple-300 uppercase tracking-widest font-black">Total System Load</p>
                        <p className="text-4xl font-black font-mono">42%</p>
                    </div>
                </div>
                <Network className="absolute right-[-20px] bottom-[-40px] opacity-10 text-white" size={200} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Agent status cards - using original content style */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                                <Activity size={24} />
                            </div>
                            <div>
                                <h3 className="font-black text-slate-800 dark:text-white uppercase text-xs">H.E.N.R.Y.</h3>
                                <p className="text-[10px] text-slate-500 uppercase font-bold">Ops & Reasoning</p>
                            </div>
                        </div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between text-[10px] font-black uppercase">
                            <span className="text-slate-500">Heuristic Depth</span>
                            <span className="font-mono text-slate-700 dark:text-slate-300">Level 4</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
                            <div className="bg-blue-600 h-full w-[65%] shadow-[0_0_10px_#3b82f6]"></div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg">
                                <GraduationCap size={24} />
                            </div>
                            <div>
                                <h3 className="font-black text-slate-800 dark:text-white uppercase text-xs">L.I.L.Y.</h3>
                                <p className="text-[10px] text-slate-500 uppercase font-bold">Training & Sim</p>
                            </div>
                        </div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between text-[10px] font-black uppercase">
                            <span className="text-slate-500">Learning Rate</span>
                            <span className="font-mono text-slate-700 dark:text-slate-300">0.94 alpha</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
                            <div className="bg-emerald-600 h-full w-[30%] shadow-[0_0_10px_#10b981]"></div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-slate-800 text-white rounded-lg">
                                <Shield size={24} />
                            </div>
                            <div>
                                <h3 className="font-black text-slate-800 dark:text-white uppercase text-xs">P.E.R.C.Y.</h3>
                                <p className="text-[10px] text-slate-500 uppercase font-bold">Governance & Risk</p>
                            </div>
                        </div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between text-[10px] font-black uppercase">
                            <span className="text-slate-500">Policy Checks</span>
                            <span className="font-mono text-slate-700 dark:text-slate-300">1,402 / min</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
                            <div className="bg-slate-800 dark:bg-slate-500 h-full w-[12%]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentHub;
