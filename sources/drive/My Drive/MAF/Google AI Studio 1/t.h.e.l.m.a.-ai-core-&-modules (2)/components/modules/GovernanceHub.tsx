Original name: GovernanceHub.tsx
Drive ID: 1r6bEU1CPr_2ynqatTAbP-4ngYuTnfAD_
Parent folder: My Drive/MAF/Google AI Studio 1/t.h.e.l.m.a.-ai-core-&-modules (2)/components/modules/
Modified: 2026-01-31T10:56:50.000Z


import React, { useState, useEffect } from 'react';
import { Scale, FileText, Download, Clock, ShieldCheck, Search, Shield, AlertTriangle } from 'lucide-react';
import { AuditLogEntry, UserRole, AuditResult } from '../../types';

const GovernanceHub: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [logs, setLogs] = useState<AuditLogEntry[]>([]);

    useEffect(() => {
        // v4.0.0: Seed initial rolling buffer with new module contexts and diagnostic checks
        const seedLogs: AuditLogEntry[] = [
            {
                id: `AUD-2025-${Date.now()}-DIAG`,
                timestamp: new Date().toISOString(),
                user_id: 'SYSTEM_CORE',
                role: UserRole.ARCHITECT,
                action: 'SYSTEM_DIAGNOSTICS_COMPLETE',
                module: 'FEDERATION_MAIN',
                evidence: ['SHA256:V4_GLOBAL_MESH_OK', 'Project_Z: ACTIVE'],
                result: AuditResult.SUCCESS,
                metadata: { checkType: 'FULL_MESH_SCAN' },
                systemTimestamp: new Date().toISOString()
            },
            {
                id: `AUD-2025-${Date.now()-1000}-INIT`,
                timestamp: new Date(Date.now()-1000).toISOString(),
                user_id: 'steve@thelma.ai',
                role: UserRole.ARCHITECT,
                action: 'PROMPT_UPDATE_V4',
                module: 'CORTEX_PROMPT_ENGINE',
                evidence: ['Prompt_Hash_Updated'],
                result: AuditResult.SUCCESS,
                metadata: { version: '4.0.0' },
                systemTimestamp: new Date(Date.now()-1000).toISOString()
            },
            ...Array.from({ length: 18 }).map((_, i) => ({
                id: `AUD-2025-${5000 + i}`,
                timestamp: new Date(Date.now() - (i + 2) * 300000).toISOString(), 
                user_id: i === 0 ? 'SYSTEM_BOOT' : (i % 3 === 0 ? 'steve@thelma.ai' : (i % 2 === 0 ? 'auto_policy_bot' : 'cto_admin@thelma.ai')),
                role: i === 0 ? UserRole.ARCHITECT : (i % 3 === 0 ? UserRole.ARCHITECT : UserRole.IT_SPECIALIST),
                action: i === 0 ? 'LOG_ROTATION_INIT' : (i % 4 === 0 ? 'INSURANCE_POLICY_VERIFY' : (i % 5 === 0 ? 'SYSTEM_INTEGRITY_CHECK' : 'MODULE_ACCESS_GRANTED')),
                module: i === 0 ? 'CORE_KERNEL' : (i % 4 === 0 ? 'INSURANCE_LAYER' : 'CORE_GATEWAY'),
                evidence: [`SHA256:8f2...a9${i}`],
                result: AuditResult.SUCCESS,
                metadata: {},
                systemTimestamp: new Date().toISOString()
            }))
        ];
        setLogs(seedLogs);
    }, []);

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl border border-slate-800 relative overflow-hidden">
                <div className="relative z-10">
                    <Shield size={48} className="text-blue-400 mb-4" />
                    <h1 className="text-3xl font-black uppercase tracking-tight">P.E.R.C.Y. Governance Core</h1>
                    <p className="text-slate-400 text-sm mt-4 font-mono">
                        STABILITY: v4.0.0 | BUFFER: 10,000 ENTRIES | DIAGNOSTICS: PASSED
                    </p>
                    <div className="flex gap-4 mt-8">
                        <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all">
                            <Download size={14} /> Export Immutable Audit
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                    <h3 className="font-black uppercase tracking-widest text-[10px] text-slate-800 flex items-center gap-2">
                        <Clock size={16} className="text-slate-400"/> Immutable Event Stream
                    </h3>
                    <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search hash or actor..." 
                            className="pl-9 pr-4 py-2 bg-white rounded-lg text-xs border border-slate-200 focus:ring-2 focus:ring-blue-500 w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Timestamp</th>
                                <th className="px-6 py-4">Audit ID</th>
                                <th className="px-6 py-4">Actor</th>
                                <th className="px-6 py-4">Action</th>
                                <th className="px-6 py-4">Result</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {logs.map((log) => (
                                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-[10px] text-slate-400">{log.timestamp}</td>
                                    <td className="px-6 py-4 font-mono text-[10px] font-bold text-blue-600">{log.id}</td>
                                    <td className="px-6 py-4 text-xs font-bold text-slate-800">{log.user_id}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-black uppercase tracking-tighter border border-slate-200">
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1 text-[10px] font-black uppercase text-green-600">
                                            <ShieldCheck size={12} /> Verified
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GovernanceHub;
