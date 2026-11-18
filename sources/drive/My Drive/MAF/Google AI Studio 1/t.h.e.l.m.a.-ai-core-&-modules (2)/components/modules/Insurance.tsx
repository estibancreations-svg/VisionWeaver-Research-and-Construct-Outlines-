Original name: Insurance.tsx
Drive ID: 1o327fkWxzYuJWykrMnHJAqAEl_3NTzpG
Parent folder: My Drive/MAF/Google AI Studio 1/t.h.e.l.m.a.-ai-core-&-modules (2)/components/modules/
Modified: 2026-01-31T10:56:50.000Z


import React, { useState } from 'react';
import { Shield, FileText, AlertTriangle, CheckCircle, TrendingUp, DollarSign, Activity, ArrowLeft, Umbrella, Siren, Briefcase, ChevronRight, PieChart, RefreshCw, Clock } from 'lucide-react';

interface InsuranceProps {
  onBack?: () => void;
}

const mockPolicies = [
    { id: 'POL-930', type: 'GENERAL_STASIS_LIABILITY', provider: 'Almost Legal Agency', coverage: '$25,000,000', premium: '$12,500/mo', status: 'SYNC_REQUIRED', renewal: '45 Days', critical: true },
    { id: 'POL-9921-A', type: 'FLEET_LIABILITY', provider: 'Almost Legal Agency', coverage: '$10,000,000', premium: '$42,000/mo', status: 'ACTIVE', renewal: '2026-12-01' },
    { id: 'POL-8812-B', type: 'DRONE_HULL', provider: 'SkyGuard Underwriters', coverage: '$2,500,000', premium: '$8,500/mo', status: 'ACTIVE', renewal: '2026-06-15' },
    { id: 'POL-1102-D', type: 'CYBER_RANSOM', provider: 'P.E.R.C.Y. Reassurance', coverage: '$50,000,000', premium: '$1,200/mo', status: 'ACTIVE', renewal: '2027-01-01' }
];

const mockClaims = [
    { id: 'CLM-2026-001', asset: 'F-104 (Hydro)', incident: 'Fender bender at Dock 4', date: '2026-01-10', status: 'ADJUSTER_REVIEW', amount: '$1,200' },
    { id: 'CLM-2025-992', asset: 'AP-X6 (Drone)', incident: 'Rotor failure / Hard landing', date: '2025-12-22', status: 'APPROVED', amount: '$4,500' }
];

const Insurance: React.FC<InsuranceProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'CLAIMS' | 'RISK'>('OVERVIEW');
    const [isSyncing, setIsSyncing] = useState(false);

    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => setIsSyncing(false), 2000);
    };

    return (
        <div className="p-4 md:p-8 space-y-6 animate-fadeIn pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <button onClick={onBack} className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-blue-600 shadow-sm transition-all"><ArrowLeft size={20} /></button>
                    )}
                    <div>
                        <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Risk & Liability Shield</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-[10px] md:text-sm flex items-center gap-2 font-medium">
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                            v4.0.0 Risk Mesh • Policy Sync: ACTIVE
                        </p>
                    </div>
                </div>
                <div className="flex gap-2 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm w-full md:w-auto">
                    <button onClick={() => setActiveTab('OVERVIEW')} className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'OVERVIEW' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Policies</button>
                    <button onClick={() => setActiveTab('CLAIMS')} className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'CLAIMS' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Claims Matrix</button>
                    <button onClick={() => setActiveTab('RISK')} className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'RISK' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Risk Map</button>
                </div>
            </div>

            {activeTab === 'OVERVIEW' && (
                <div className="space-y-6 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-orange-600 text-white p-6 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] rounded-full"></div>
                            <div className="relative z-10">
                                <p className="text-[10px] font-black uppercase tracking-widest text-orange-200 mb-1">Critical Renewal Notice</p>
                                <h3 className="text-2xl font-black font-mono">POL-930</h3>
                                <div className="flex items-center gap-2 mt-4">
                                    <Clock size={16}/>
                                    <span className="text-xs font-black uppercase tracking-widest">45 Days Remaining</span>
                                </div>
                                <button onClick={handleSync} className="mt-6 w-full py-3 bg-white text-orange-600 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg active:scale-95 flex items-center justify-center gap-2">
                                    {isSyncing ? <RefreshCw className="animate-spin" size={14}/> : <CheckCircle size={14}/>} {isSyncing ? 'Syncing...' : 'Perform Manual Sync'}
                                </button>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Coverage Value</p>
                            <h3 className="text-3xl font-black font-mono text-slate-800 dark:text-white">$87.5M</h3>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Monthly Premium</p>
                            <h3 className="text-3xl font-black font-mono text-slate-800 dark:text-white">$76,600</h3>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
                        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950/30">
                            <h3 className="font-black text-slate-800 dark:text-white text-xs uppercase tracking-widest flex items-center gap-3">
                                <Briefcase size={20} className="text-blue-500"/> Federation Policy Ledger
                            </h3>
                        </div>
                        <div className="overflow-x-auto no-scrollbar">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 font-black uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                                    <tr>
                                        <th className="px-8 py-4">Policy ID / Type</th>
                                        <th className="px-8 py-4">Provider</th>
                                        <th className="px-8 py-4">Coverage</th>
                                        <th className="px-8 py-4 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {mockPolicies.map(pol => (
                                        <tr key={pol.id} className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${pol.id === 'POL-930' ? 'bg-orange-50/30 dark:bg-orange-900/5' : ''}`}>
                                            <td className="px-8 py-6">
                                                <div className="font-black text-slate-900 dark:text-white uppercase tracking-tight">{pol.type.replace('_', ' ')}</div>
                                                <div className="text-[10px] font-mono text-slate-400 mt-1">{pol.id}</div>
                                            </td>
                                            <td className="px-8 py-6 text-slate-600 dark:text-slate-300 font-bold uppercase">{pol.provider}</td>
                                            <td className="px-8 py-6 font-mono font-black text-slate-800 dark:text-white">{pol.coverage}</td>
                                            <td className="px-8 py-6 text-right">
                                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                                    pol.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-600 border-emerald-200' : 
                                                    pol.status === 'SYNC_REQUIRED' ? 'bg-orange-100 text-orange-600 border-orange-200 animate-pulse' :
                                                    'bg-yellow-100 text-yellow-600 border-yellow-200'
                                                }`}>
                                                    {pol.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Insurance;
