Original name: SecurityInfo.tsx
Drive ID: 1pAo8L_LPCtA2fmq_Xq_Il0wL9FZAHgy4
Parent folder: My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/
Modified: 2026-01-12T00:25:30.000Z


import React from 'react';
import { Shield, Lock, FileText, CheckCircle, Globe, Server, AlertTriangle } from 'lucide-react';

const SecurityInfo: React.FC = () => {
    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 text-white p-8 rounded-xl shadow-lg flex justify-between items-center relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <Shield className="text-green-400" size={32} />
                        <h1 className="text-3xl font-bold">Security Posture</h1>
                    </div>
                    <p className="text-slate-300">
                        System Integrity: <span className="text-green-400 font-bold">SECURE</span> • Encryption: <span className="font-mono">AES-256-GCM</span>
                    </p>
                </div>
                <div className="text-right z-10">
                     <p className="text-xs text-slate-400 uppercase tracking-widest">Compliance Status</p>
                     <p className="text-2xl font-bold">SOC 2 Type II</p>
                </div>
                 <Lock className="absolute right-[-20px] bottom-[-40px] opacity-10 text-white" size={200} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Globe size={18} className="text-blue-500"/> Network Security</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle size={16} className="text-green-500" /> TLS 1.3 Enforcement</li>
                        <li className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle size={16} className="text-green-500" /> DDoS Protection (L7)</li>
                        <li className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle size={16} className="text-green-500" /> VPC Peering Active</li>
                    </ul>
                </div>
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Server size={18} className="text-purple-500"/> Infrastructure</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle size={16} className="text-green-500" /> Immutable Backups</li>
                        <li className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle size={16} className="text-green-500" /> Container Scanning</li>
                        <li className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle size={16} className="text-green-500" /> Zero Trust Access</li>
                    </ul>
                </div>
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><FileText size={18} className="text-orange-500"/> Compliance</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle size={16} className="text-green-500" /> GDPR Ready</li>
                        <li className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle size={16} className="text-green-500" /> CCPA Compliant</li>
                        <li className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle size={16} className="text-green-500" /> ISO 27001 Certified</li>
                    </ul>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4">Active Threat Intelligence Feed</h3>
                <div className="space-y-2">
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between">
                         <div className="flex items-center gap-2">
                             <Shield size={16} className="text-green-500" />
                             <span className="text-sm font-medium text-slate-700">Global IP Blocklist Updated</span>
                         </div>
                         <span className="text-xs text-slate-400">10 mins ago</span>
                    </div>
                     <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between">
                         <div className="flex items-center gap-2">
                             <AlertTriangle size={16} className="text-yellow-500" />
                             <span className="text-sm font-medium text-slate-700">Heuristic Anomaly Detected (Port 8080) - Mitigated</span>
                         </div>
                         <span className="text-xs text-slate-400">2 hours ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecurityInfo;
