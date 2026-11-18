Original name: GovernanceHub.tsx
Drive ID: 1uwLeFAK5bDd3DAXNK4i7g-C_61T4UeYu
Parent folder: My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/
Modified: 2026-01-12T00:25:05.000Z


import React, { useState } from 'react';
import { Scale, FileText, Download, Clock, ShieldCheck, Search, Shield } from 'lucide-react';
import { MasterAccessCodeLog } from '../../types';

const mockLogs: MasterAccessCodeLog[] = [
    { id: 'log_new', codeId: 'SYS-UPDATE', accessLevel: 10, createdBy: 'Steve Henry', usageCount: 1, timestamp: '2025-01-05 16:45:00', action: 'TRAINING_HUB_V2_DEPLOY' },
    { id: 'log_00', codeId: 'SYS-AUTO', accessLevel: 10, createdBy: 'SYSTEM', usageCount: 1, timestamp: '2025-01-05 15:30:00', action: 'SYSTEM_INTEGRITY_CHECK' },
    { id: 'log_0', codeId: 'MAC-AUTH', accessLevel: 10, createdBy: 'Steve Henry', usageCount: 1, timestamp: '2025-01-05 14:00:00', action: 'SYSTEM_REVIEW_FULL_PASS' },
    { id: 'log_1', codeId: 'MAC-99', accessLevel: 6, createdBy: 'CTO_Admin', usageCount: 42, timestamp: '2025-01-04 02:15:00', action: 'SYSTEM_OVERRIDE' },
    { id: 'log_2', codeId: 'MAC-99', accessLevel: 6, createdBy: 'CTO_Admin', usageCount: 43, timestamp: '2025-01-04 02:16:30', action: 'DB_DROP_TABLE_PREVENTED' },
    { id: 'log_3', codeId: 'MAC-04', accessLevel: 4, createdBy: 'HR_Director', usageCount: 5, timestamp: '2025-01-04 09:00:00', action: 'PAYROLL_UNLOCK' },
    { id: 'log_4', codeId: 'MAC-01', accessLevel: 6, createdBy: 'CEO', usageCount: 1, timestamp: '2025-01-04 10:30:00', action: 'DEMO_MODE_INIT' },
];

const GovernanceHub: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="space-y-6">
            <div className="bg-slate-900 text-white p-8 rounded-xl shadow-lg border border-slate-700 text-center relative overflow-hidden">
                <div className="relative z-10">
                    <Shield size={48} className="mx-auto text-blue-400 mb-4" />
                    <h1 className="text-3xl font-bold">P.E.R.C.Y. Governance Core</h1>
                    <p className="text-slate-300 max-w-2xl mx-auto mt-2">
                        Policy • Enforcement • Risk • Compliance • Yield
                    </p>
                    <p className="text-slate-400 text-sm mt-4">
                        Immutable ledger of all high-privilege actions. In Demo Mode, these logs are reset per session but represent the legal defensibility layer of the production system.
                    </p>
                    <div className="flex justify-center space-x-4 mt-8">
                        <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                            <Download size={18} />
                            <span>Export Full Audit (PDF)</span>
                        </button>
                        <button className="flex items-center space-x-2 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors">
                            <FileText size={18} />
                            <span>Export CSV</span>
                        </button>
                    </div>
                </div>
                <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <Clock size={18} className="text-slate-400"/> Immutable Event Stream
                    </h3>
                    <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search logs..." 
                            className="pl-9 pr-4 py-2 bg-slate-50 rounded-lg text-sm border-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-medium">
                        <tr>
                            <th className="px-6 py-4">Timestamp</th>
                            <th className="px-6 py-4">Actor</th>
                            <th className="px-6 py-4">Action Type</th>
                            <th className="px-6 py-4">Clearance</th>
                            <th className="px-6 py-4">Validation</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {mockLogs.filter(l => l.action.toLowerCase().includes(searchTerm.toLowerCase())).map((log) => (
                            <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 font-mono text-slate-500">{log.timestamp}</td>
                                <td className="px-6 py-4 font-medium text-slate-900">{log.createdBy}</td>
                                <td className="px-6 py-4">
                                    <span className={`bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-mono border border-slate-200 ${log.action.includes('SYSTEM') ? 'text-green-600 bg-green-50 border-green-200' : ''}`}>
                                        {log.action}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-500">Level {log.accessLevel}</td>
                                <td className="px-6 py-4 text-green-600 flex items-center gap-1">
                                    <ShieldCheck size={14} /> Verified
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GovernanceHub;
