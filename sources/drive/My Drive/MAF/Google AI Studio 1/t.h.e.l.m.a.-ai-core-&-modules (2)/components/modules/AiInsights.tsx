Original name: AiInsights.tsx
Drive ID: 1opaLht7RQ-3LB23R7dCohPgreeHkCE6Y
Parent folder: My Drive/MAF/Google AI Studio 1/t.h.e.l.m.a.-ai-core-&-modules (2)/components/modules/
Modified: 2026-01-31T10:56:50.000Z


import React from 'react';
import { Brain, Activity, Shield, GraduationCap, Zap, TrendingUp, GitMerge, FileText, Cpu, Network, RefreshCw, ArrowLeft } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface AiInsightsProps {
  onBack?: () => void;
}

const predictiveData = [
  { time: '08:00', actual: 82, predicted: 80 },
  { time: '10:00', actual: 85, predicted: 86 },
  { time: '12:00', actual: 78, predicted: 85 },
  { time: '14:00', actual: 90, predicted: 92 },
  { time: '16:00', actual: 95, predicted: 94 },
  { time: '18:00', actual: 88, predicted: 89 }
];

const AiInsights: React.FC<AiInsightsProps> = ({ onBack }) => {
    return (
        <div className="p-4 md:p-8 space-y-6 animate-fadeIn pb-12">
            <div className="flex items-center gap-4 mb-2">
                {onBack && (
                  <button 
                    onClick={onBack}
                    className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-violet-600 transition-all shadow-sm shrink-0"
                  >
                    <ArrowLeft size={20} />
                  </button>
                )}
                <div>
                  <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Neural Operations Center</h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-bold">v4.0.0 Cognitive Mesh • Inference Active</p>
                </div>
            </div>

            <div className="bg-slate-900 text-white p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-xl relative overflow-hidden border border-slate-700">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Brain className="text-purple-400" size={32} />
                            <h1 className="text-xl md:text-3xl font-black uppercase tracking-tight">Neural Operations Center</h1>
                        </div>
                        <p className="text-slate-300 max-w-2xl text-xs md:text-sm">
                            Real-time introspection of the Federated AI Mesh. Monitor agent reasoning, predictive accuracy, and inter-agent collaboration events.
                        </p>
                    </div>
                </div>
                <Network className="absolute right-[-20px] bottom-[-40px] opacity-10 text-white" size={200} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { id: 'THELMA', name: 'Orchestrator', icon: Brain, color: 'text-white', bg: 'bg-slate-800' },
                  { id: 'HENRY', name: 'Ops Reasoning', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-100' },
                  { id: 'LILY', name: 'Training Core', icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-100' },
                  { id: 'PERCY', name: 'Governance', icon: Shield, color: 'text-indigo-600', bg: 'bg-indigo-100' }
                ].map((agent) => (
                  <div key={agent.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:scale-[1.02]">
                    <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 ${agent.bg} ${agent.color} rounded-lg flex items-center justify-center shadow-sm`}>
                            <agent.icon size={20} />
                        </div>
                        <div>
                            <h3 className="font-black text-slate-800 dark:text-white uppercase text-xs tracking-tight">{agent.id}</h3>
                            <p className="text-[9px] text-slate-500 uppercase font-bold">{agent.name}</p>
                        </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="font-black text-slate-800 dark:text-white uppercase text-[10px] tracking-widest flex items-center gap-2">
                            <TrendingUp size={18} className="text-blue-500"/> Predictive Operational Yield
                        </h3>
                    </div>
                </div>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={predictiveData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.1} />
                            <XAxis dataKey="time" hide />
                            <YAxis hide domain={[60, 100]} />
                            <Tooltip />
                            <Area type="monotone" dataKey="predicted" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.05} />
                            <Area type="monotone" dataKey="actual" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.05} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AiInsights;
