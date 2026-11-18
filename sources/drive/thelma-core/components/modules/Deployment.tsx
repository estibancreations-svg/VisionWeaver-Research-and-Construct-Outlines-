Original name: Deployment.tsx
Drive ID: 1Ex6VmGUyUaYjlbT4F8dcH0cvJVQAoiT4
Parent folder: thelma-core/components/modules/
Modified: 2026-01-23T02:31:57.000Z


import React from 'react';
import { GitBranch, Box, CheckCircle, Server, Terminal, UploadCloud } from 'lucide-react';

const Deployment: React.FC = () => {
    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-8 rounded-xl shadow-lg flex justify-between items-center relative overflow-hidden">
                <div className="relative z-10">
                     <h1 className="text-3xl font-bold mb-2">Deployment Status</h1>
                     <div className="flex items-center gap-4 text-sm">
                         <span className="flex items-center gap-1 text-green-400 font-mono"><CheckCircle size={14}/> Production: Healthy</span>
                         <span className="flex items-center gap-1 text-slate-300 font-mono"><GitBranch size={14}/> Branch: main</span>
                         <span className="flex items-center gap-1 text-slate-300 font-mono"><Box size={14}/> v1.1.42-stable</span>
                     </div>
                </div>
                <UploadCloud className="absolute right-8 bottom-[-20px] opacity-10" size={160} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Server size={18} className="text-blue-600"/> Environment Health</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-green-50 border border-green-100 rounded-lg">
                            <div>
                                <p className="font-bold text-slate-700 text-sm">US-East-1 (Primary)</p>
                                <p className="text-xs text-slate-500">Latency: 24ms</p>
                            </div>
                            <span className="text-green-600 font-bold text-xs bg-green-100 px-2 py-1 rounded">ONLINE</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 border border-green-100 rounded-lg">
                            <div>
                                <p className="font-bold text-slate-700 text-sm">EU-West-2 (Failover)</p>
                                <p className="text-xs text-slate-500">Latency: 88ms</p>
                            </div>
                            <span className="text-green-600 font-bold text-xs bg-green-100 px-2 py-1 rounded">STANDBY</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-100 rounded-lg">
                            <div>
                                <p className="font-bold text-slate-700 text-sm">Staging / QA</p>
                                <p className="text-xs text-slate-500">v1.2.0-beta</p>
                            </div>
                            <span className="text-blue-600 font-bold text-xs bg-blue-100 px-2 py-1 rounded">DEPLOYING</span>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-800">
                    <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Terminal size={18} className="text-green-400"/> Recent Commits</h3>
                    <div className="space-y-3 font-mono text-xs">
                        <div className="border-l-2 border-blue-500 pl-3">
                            <p className="text-blue-300">feat: Net Zero calculation logic optimization</p>
                            <p className="text-slate-500">Steve Henry • 2 hours ago • <span className="text-slate-400">#a1b2c3</span></p>
                        </div>
                        <div className="border-l-2 border-purple-500 pl-3">
                            <p className="text-purple-300">fix: P.E.R.C.Y. governance log filtering</p>
                            <p className="text-slate-500">Steve Henry • 5 hours ago • <span className="text-slate-400">#d4e5f6</span></p>
                        </div>
                        <div className="border-l-2 border-slate-600 pl-3">
                            <p className="text-slate-300">chore: Update dependency versions</p>
                            <p className="text-slate-500">Automated Bot • 1 day ago • <span className="text-slate-400">#987654</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Deployment;
