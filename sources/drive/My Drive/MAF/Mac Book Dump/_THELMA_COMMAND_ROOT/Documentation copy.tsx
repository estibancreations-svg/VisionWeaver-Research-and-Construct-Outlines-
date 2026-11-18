Original name: Documentation copy.tsx
Drive ID: 1-eFZzQuIi3L-vMX6C0N6U1VrAGeIt65h
Parent folder: My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/
Modified: 2026-01-12T00:24:49.000Z


import React from 'react';
import { Book, FileText, Download, ExternalLink, Code } from 'lucide-react';

const Documentation: React.FC = () => {
    return (
        <div className="space-y-6 animate-fadeIn">
             <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center">
                <div className="inline-flex p-4 rounded-full bg-blue-50 text-blue-600 mb-4">
                    <Book size={48} />
                </div>
                <h1 className="text-3xl font-bold text-slate-900">Knowledge Base</h1>
                <p className="text-slate-500 max-w-2xl mx-auto mt-2">
                    Official documentation for T.H.E.L.M.A. AI v1.1. Access blueprints, API references, and operational manuals.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors group cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-slate-100 rounded-lg text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                            <FileText size={24} />
                        </div>
                        <ExternalLink size={16} className="text-slate-300 group-hover:text-blue-400"/>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 mb-2">Operational Manual v1.1</h3>
                    <p className="text-sm text-slate-500 mb-4">Comprehensive guide for Fleet Managers and Dispatchers. Covers H.E.N.R.Y. interactions and emergency protocols.</p>
                    <button className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline"><Download size={14}/> Download PDF (12MB)</button>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors group cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-slate-100 rounded-lg text-slate-600 group-hover:bg-purple-100 group-hover:text-purple-600 transition-colors">
                            <Code size={24} />
                        </div>
                        <ExternalLink size={16} className="text-slate-300 group-hover:text-purple-400"/>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 mb-2">API Reference (Swagger)</h3>
                    <p className="text-sm text-slate-500 mb-4">Technical documentation for integrating with the Adaptation Layer and n8n Workforce Layer.</p>
                     <button className="text-purple-600 text-sm font-bold flex items-center gap-1 hover:underline">View Documentation &rarr;</button>
                </div>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
                <h3 className="font-bold mb-4">System Changelog</h3>
                <div className="space-y-4 font-mono text-sm">
                    <div className="border-l-2 border-green-500 pl-4">
                        <p className="text-green-400 font-bold">v1.1 - Current Release (Jan 5, 2025)</p>
                        <ul className="text-slate-400 list-disc list-inside mt-1">
                            <li>Implemented Federated Agent Architecture (Henry, Lily, Percy)</li>
                            <li>Added Net Zero Carbon Governance Module</li>
                            <li>Enhanced VR Training Workspace</li>
                        </ul>
                    </div>
                    <div className="border-l-2 border-slate-700 pl-4">
                        <p className="text-slate-300 font-bold">v1.0 - Alpha (Dec 2024)</p>
                        <ul className="text-slate-500 list-disc list-inside mt-1">
                            <li>Initial Fleet Telemetry Integration</li>
                            <li>Basic Routing Engine</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Documentation;
