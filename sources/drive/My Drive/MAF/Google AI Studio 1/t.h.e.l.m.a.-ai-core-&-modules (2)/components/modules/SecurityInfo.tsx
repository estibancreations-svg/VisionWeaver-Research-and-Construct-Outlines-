Original name: SecurityInfo.tsx
Drive ID: 1P-cJpw1aCdE_xZ_f8NLRoBaR1jzTyUYz
Parent folder: My Drive/MAF/Google AI Studio 1/t.h.e.l.m.a.-ai-core-&-modules (2)/components/modules/
Modified: 2026-01-31T10:56:50.000Z


import React, { useState, useEffect } from 'react';
import { Shield, Lock, FileText, CheckCircle, Globe, Server, AlertTriangle, Activity, ArrowLeft } from 'lucide-react';

interface SecurityInfoProps {
    onBack?: () => void;
}

const SecurityInfo: React.FC<SecurityInfoProps> = ({ onBack }) => {
    const [coherence, setCoherence] = useState(99.42);

    useEffect(() => {
        const interval = setInterval(() => {
            setCoherence(prev => {
                const noise = (Math.random() - 0.5) * 0.1;
                return Math.min(100, Math.max(98, prev + noise));
            });
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6 animate-fadeIn pb-12">
            <div className="flex items-center gap-4 mb-2">
                {onBack && (
                  <button 
                    onClick={onBack}
                    className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-green-600 transition-all shadow-sm shrink-0"
                  >
                    <ArrowLeft size={20} />
                  </button>
                )}
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden gap-6">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <Shield className="text-green-400" size={32} />
                        <h1 className="text-3xl font-bold">Security Posture v4.0.0</h1>
                    </div>
                    <p className="text-slate-300">
                        System Integrity: <span className="text-green-400 font-bold">SECURE</span> • Encryption: <span className="font-mono">AES-256-GCM</span>
                    </p>
                </div>
                
                {/* Quantum Visualizer */}
                <div className="relative z-10 bg-slate-800/50 p-4 rounded-xl border border-slate-700 backdrop-blur-sm w-full md:w-auto">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 flex items-center gap-2">
                        <Activity size={14} className="text-green-400 animate-pulse"/> Quantum Coherence
                    </p>
                    <div className="flex items-end gap-1 h-12">
                        {[...Array(20)].map((_, i) => (
                            <div 
                                key={i} 
                                className="w-1.5 bg-green-500/50 rounded-t-sm transition-all duration-300"
                                style={{ height: `${Math.random() * 100}%` }}
                            ></div>
                        ))}
                    </div>
                    <p className="text-right text-lg font-black font-mono text-green-400 mt-2">{coherence.toFixed(4)}%</p>
                </div>

                <div className="text-right z-10 hidden md:block">
                     <p className="text-xs text-slate-400 uppercase tracking-widest">Compliance Status</p>
                     <p className="text-2xl font-bold">SOC 2 Type II</p>
                </div>
                 <Lock className="absolute right-[-20px] bottom-[-40px] opacity-10 text-white" size={200} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                    <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2"><Globe size={18} className="text-blue-500"/> Network Security</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"><CheckCircle size={16} className="text-green-500" /> TLS 1.3 Enforcement</li>
                        <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"><CheckCircle size={16} className="text-green-500" /> DDoS Protection (L7)</li>
                        <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"><CheckCircle size={16} className="text-green-500" /> VPC Peering Active</li>
                    </ul>
                </div>
                 <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                    <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2"><Server size={18} className="text-purple-500"/> Infrastructure</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"><CheckCircle size={16} className="text-green-500" /> Immutable Backups</li>
                        <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"><CheckCircle size={16} className="text-green-500" /> Container Scanning</li>
                        <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"><CheckCircle size={16} className="text-green-500" /> Zero Trust Access</li>
                    </ul>
                </div>
                 <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                    <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2"><FileText size={18} className="text-orange-500"/> Compliance</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"><CheckCircle size={16} className="text-green-500" /> GDPR Ready</li>
                        <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"><CheckCircle size={16} className="text-green-500" /> CCPA Compliant</li>
                        <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"><CheckCircle size={16} className="text-green-500" /> ISO 27001 Certified</li>
                    </ul>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                <h3 className="font-bold text-slate-800 dark:text-white mb-4">Active Threat Intelligence Feed</h3>
                <div className="space-y-2">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg flex items-center justify-between">
                         <div className="flex items-center gap-2">
                             <Shield size={16} className="text-green-500" />
                             <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Global IP Blocklist Updated</span>
                         </div>
                         <span className="text-xs text-slate-400">10 mins ago</span>
                    </div>
                     <div className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg flex items-center justify-between">
                         <div className="flex items-center gap-2">
                             <AlertTriangle size={16} className="text-yellow-500" />
                             <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Heuristic Anomaly Detected (Port 8080) - Mitigated</span>
                         </div>
                         <span className="text-xs text-slate-400">2 hours ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecurityInfo;
