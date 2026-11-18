Original name: TeamSetup.tsx
Drive ID: 1p2rVG4rs4bdRiEPAjnWGlFSY7ZPmCZhd
Parent folder: My Drive/MAF/Google AI Studio 1/t.h.e.l.m.a.-ai-core-&-modules (2)/components/modules/
Modified: 2026-01-31T10:56:50.000Z


import React, { useState } from 'react';
import { Users, UserPlus, Shield, Mail, Briefcase, MoreHorizontal, ChevronRight, Lock, Eye, Activity, GraduationCap, Zap, CheckCircle, Fingerprint, Network, ArrowLeft, FileText, AlertTriangle, Phone, Hash, Upload, Check, XCircle, Camera, RefreshCw, CreditCard as CardIcon, ShieldCheck } from 'lucide-react';
import { UserRole, PersonnelProfile } from '../../types';

interface TeamSetupProps {
  onBack?: () => void;
}

const mockPersonnel: PersonnelProfile[] = [
    { 
        id: 'BEE-001', 
        fullName: 'Steven Henry', 
        role: UserRole.ARCHITECT, 
        email: 'steve@thelma.ai', 
        phone: '+1 (555) 019-9922',
        status: 'ACTIVE',
        identity: { 
            ssn_ein: '***-**-8821', 
            type: 'W2_EMPLOYEE', 
            dob: '1985-04-12', 
            licenseNumber: 'CDL-A-9921200', 
            licenseExpiry: '2028-04-12',
            licenseClass: 'CLASS-A COMMERCIAL',
            licenseImageUploaded: true
        },
        financial: {
            payrollActivated: true,
            cardType: 'VISA DEBIT',
            cardLastFour: '8821',
            payoutFrequency: 'INSTANT'
        },
        dotCompliance: {
            lastReset: '2025-01-05 22:00',
            totalDriveTimeToday: 282,
            totalDutyTimeToday: 340,
            logs: []
        },
        insurance: { provider: 'Almost Legal Agency', policyNumber: 'AL-CORP-992', coverageType: 'COMPANY_FLEET', expiry: '2026-01-01', status: 'VALID' },
        ledgerId: 'LEDGER-SH-001',
        systemTimestamp: new Date().toISOString()
    }
];

const TeamSetup: React.FC<TeamSetupProps> = ({ onBack }) => {
    const [selectedProfile, setSelectedProfile] = useState<PersonnelProfile | null>(null);
    const [viewMode, setViewMode] = useState<'LIST' | 'DETAIL'>('LIST');
    const [detailTab, setDetailTab] = useState<'IDENTITY' | 'FINANCE' | 'COMPLIANCE'>('IDENTITY');
    const [isSyncing, setIsSyncing] = useState(false);

    const handleProfileSelect = (profile: PersonnelProfile) => {
        setSelectedProfile(profile);
        setViewMode('DETAIL');
    };

    const runInsuranceSync = () => {
        setIsSyncing(true);
        setTimeout(() => setIsSyncing(false), 2000);
    };

    return (
        <div className="p-4 md:p-8 space-y-6 animate-fadeIn pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <button onClick={onBack} className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-purple-600 transition-all shadow-sm shrink-0">
                            <ArrowLeft size={20} />
                        </button>
                    )}
                    <div>
                        <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">The Hive: Identity Vault</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-[10px] md:text-sm flex items-center gap-2 font-medium uppercase tracking-widest">
                            Federation Personnel Management • v4.0.0
                        </p>
                    </div>
                </div>
                {viewMode === 'DETAIL' && (
                    <div className="flex gap-2">
                        <button onClick={runInsuranceSync} className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg active:scale-95">
                            {isSyncing ? <RefreshCw className="animate-spin" size={14}/> : <ShieldCheck size={14}/>}
                            Insurance Sync
                        </button>
                        <button onClick={() => setViewMode('LIST')} className="px-6 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">Back to Matrix</button>
                    </div>
                )}
            </div>

            {viewMode === 'LIST' ? (
                <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-[600px] transition-colors">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                        <h3 className="font-black text-slate-800 dark:text-white text-[11px] uppercase tracking-widest flex items-center gap-3">
                            <Users size={18} className="text-purple-500"/> Personnel Registry
                        </h3>
                        <button className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-700 transition-all shadow-md">
                            <UserPlus size={14} /> New Enrollment
                        </button>
                    </div>
                    <div className="flex-1 overflow-x-auto no-scrollbar">
                        <table className="w-full text-left min-w-[700px]">
                            <thead className="bg-slate-50 dark:bg-slate-900/30 text-[9px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-100 dark:border-slate-800">
                                <tr>
                                    <th className="px-6 py-4">Identity</th>
                                    <th className="px-6 py-4">Financial Status</th>
                                    <th className="px-6 py-4">Compliance Status</th>
                                    <th className="px-6 py-4">Insurance</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                                {mockPersonnel.map(person => (
                                    <tr key={person.id} onClick={() => handleProfileSelect(person)} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center font-black text-white text-xs border border-slate-700">{person.fullName.split(' ').map(n => n[0]).join('')}</div>
                                                <div>
                                                    <p className="font-black text-slate-800 dark:text-white uppercase tracking-tight">{person.fullName}</p>
                                                    <p className="text-[9px] text-slate-400 font-mono tracking-tighter">{person.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {person.financial.payrollActivated ? <Zap size={14} className="text-blue-500 fill-blue-500"/> : <XCircle size={14} className="text-slate-400"/>}
                                                <span className="text-[10px] font-bold uppercase text-slate-600 dark:text-slate-300">Payroll {person.financial.payrollActivated ? 'Active' : 'Locked'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-emerald-500 font-black uppercase text-[10px]">
                                                <Check size={14}/> 10h Reset OK
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded text-[8px] font-black uppercase border border-blue-100 dark:border-blue-800">
                                                {person.insurance.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right"><ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform inline" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col md:flex-row h-auto md:h-[650px] transition-colors">
                    <div className="w-full md:w-80 bg-slate-50 dark:bg-slate-950/50 border-r border-slate-100 dark:border-slate-800 p-8 flex flex-col">
                        <div className="flex flex-col items-center mb-8 text-center">
                            <div className="w-24 h-24 rounded-[32px] bg-purple-600 flex items-center justify-center text-3xl font-black text-white shadow-xl shadow-purple-500/20 mb-6">{selectedProfile?.fullName.split(' ').map(n => n[0]).join('')}</div>
                            <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{selectedProfile?.fullName}</h2>
                            <p className="text-[10px] text-slate-400 font-black uppercase mt-2">{selectedProfile?.role}</p>
                        </div>
                        <div className="space-y-2">
                            <button onClick={() => setDetailTab('IDENTITY')} className={`w-full text-left px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${detailTab === 'IDENTITY' ? 'bg-white dark:bg-slate-900 shadow-md text-purple-600' : 'text-slate-500 hover:bg-white/50'}`}>Identity Vault</button>
                            <button onClick={() => setDetailTab('FINANCE')} className={`w-full text-left px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${detailTab === 'FINANCE' ? 'bg-white dark:bg-slate-900 shadow-md text-purple-600' : 'text-slate-500 hover:bg-white/50'}`}>Financial Matrix</button>
                            <button onClick={() => setDetailTab('COMPLIANCE')} className={`w-full text-left px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${detailTab === 'COMPLIANCE' ? 'bg-white dark:bg-slate-900 shadow-md text-purple-600' : 'text-slate-500 hover:bg-white/50'}`}>Regulatory Lock</button>
                        </div>
                    </div>

                    <div className="flex-1 p-10 overflow-y-auto no-scrollbar">
                        {detailTab === 'IDENTITY' && selectedProfile && (
                            <div className="space-y-10 animate-fadeIn">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2">Encrypted Identity</h3>
                                        <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl space-y-4 border border-slate-100 dark:border-slate-700">
                                            <div className="flex justify-between items-center">
                                                <p className="text-[10px] font-black text-slate-400 uppercase">Profile Hash</p>
                                                <p className="text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300">0xSHA_BEE_001_8F</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Commercial License</p>
                                                <p className="text-lg font-black text-slate-900 dark:text-white uppercase">{selectedProfile.identity.licenseNumber}</p>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase">{selectedProfile.identity.licenseClass}</p>
                                            </div>
                                            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                                                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Insurance Sync Policy</p>
                                                <p className="text-sm font-bold text-blue-600 uppercase">{selectedProfile.insurance.policyNumber}</p>
                                                <p className="text-[9px] text-slate-500 italic mt-1">Status: {selectedProfile.insurance.status} (Valid until {selectedProfile.insurance.expiry})</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2">Field Documentation</h3>
                                        <button className="w-full aspect-video rounded-3xl border-4 border-dashed border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-all group">
                                            <Camera size={32} className="group-hover:scale-110 transition-transform" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Update CDL Image Scan</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {detailTab === 'FINANCE' && selectedProfile && (
                            <div className="space-y-10 animate-fadeIn">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2">Funding Source</h3>
                                        <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-950 rounded-[32px] text-white space-y-12 relative overflow-hidden shadow-2xl">
                                            <div className="flex justify-between items-start relative z-10">
                                                <CardIcon size={40} className="text-slate-500 opacity-50" />
                                                <Zap size={24} className="text-blue-500 fill-blue-500" />
                                            </div>
                                            <div className="space-y-1 relative z-10">
                                                <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black">Activation Card</p>
                                                <p className="text-2xl font-mono tracking-widest font-black uppercase">**** **** **** {selectedProfile.financial.cardLastFour}</p>
                                            </div>
                                            <div className="flex justify-between items-end relative z-10">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{selectedProfile.fullName}</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{selectedProfile.financial.cardType}</p>
                                            </div>
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[60px] rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2">Payout Activation</h3>
                                        <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] font-black uppercase text-slate-400">Payroll Engine</span>
                                                <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">ACTIVATED</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] font-black uppercase text-slate-400">Speed</span>
                                                <span className="text-xs font-black text-blue-500 uppercase tracking-widest">{selectedProfile.financial.payoutFrequency}</span>
                                            </div>
                                            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                                                <p className="text-[9px] text-slate-500 font-medium leading-relaxed uppercase">Purchases from linked source are automatically ingested for instant audit reconciliation.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {detailTab === 'COMPLIANCE' && selectedProfile && (
                            <div className="space-y-8 animate-fadeIn">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2">Internal Verification Engine</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-6 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                                        <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Mandatory Time Off</p>
                                        <div className="w-24 h-24 rounded-full border-4 border-emerald-500 mx-auto flex items-center justify-center">
                                            <Check className="text-emerald-500" size={40} />
                                        </div>
                                        <p className="text-sm font-black text-slate-800 dark:text-white mt-4 uppercase">10h Reset Completed</p>
                                        <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">Resumed: {selectedProfile.dotCompliance.lastReset}</p>
                                    </div>
                                    <div className="p-6 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                                         <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Neural Signatures</h4>
                                         {[
                                             { event: 'Biometric Handshake', status: 'SUCCESS', ts: '08:42' },
                                             { event: 'Pre-Trip Checklist', status: 'VERIFIED', ts: '09:00' },
                                             { event: 'Identity Pulse Scan', status: 'SUCCESS', ts: '09:05' }
                                         ].map((log, i) => (
                                             <div key={i} className="flex justify-between items-center text-[10px]">
                                                 <span className="font-bold text-slate-700 dark:text-slate-300 uppercase">{log.event}</span>
                                                 <div className="flex gap-2 items-center">
                                                     <span className="font-mono text-slate-400">{log.ts}</span>
                                                     <span className="text-emerald-500 font-black uppercase">{log.status}</span>
                                                 </div>
                                             </div>
                                         ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamSetup;
