Original name: AdaptationLayer.tsx
Drive ID: 1Zhxaz2y5ATg4-OvrFwoaN4bpv8cZZ-C-
Parent folder: My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/copy-of-t.h.e.l.m.a.-ai-for-hackathon (2)/components/modules/
Modified: 2026-01-20T18:17:32.617Z

import React, { useState } from 'react';
import { Link, Server, Database, RefreshCw, CheckCircle, XCircle, Activity, Lock } from 'lucide-react';
import { LegacySystem } from '../../types';

const mockSystems: LegacySystem[] = [
    { id: 'LEG-01', name: 'SAP Enterprise ERP', type: 'ERP', connectionStatus: 'CONNECTED', lastSync: '1 min ago', dataPoints: 145000 },
    { id: 'LEG-02', name: 'Oracle Logistics Cloud', type: 'TELEMATICS', connectionStatus: 'SYNCING', lastSync: 'Running...', dataPoints: 4200 },
    { id: 'LEG-03', name: 'Geotab Legacy Fleet', type: 'TELEMATICS', connectionStatus: 'CONNECTED', lastSync: '5 mins ago', dataPoints: 8900 },
    { id: 'LEG-04', name: 'On-Premises HR SQL', type: 'HR', connectionStatus: 'ERROR', lastSync: '2 days ago', dataPoints: 0 },
];

const AdaptationLayer: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center">
                <div className="inline-flex p-4 rounded-full bg-blue-50 text-blue-600 mb-4">
                    <Link size={48} />
                </div>
                <h1 className="text-3xl font-bold text-slate-900">Adaptation Layer</h1>
                <p className="text-slate-500 max-w-2xl mx-auto mt-2">
                    "The Bridge to the Future." This module connects T.H.E.L.M.A. to your existing legacy infrastructure (ERP, TMS, Telematics), allowing for seamless data ingestion without ripping and replacing current systems.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                     <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Add New Connection</button>
                     <button className="bg-white border border-slate-300 text-slate-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-slate-50">View API Docs</button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <Server size={18} className="text-slate-400"/> Legacy System Connections
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Lock size={12} /> Encrypted Tunnel (TLS 1.3)
                    </div>
                </div>

                <div className="divide-y divide-slate-100">
                    {mockSystems.map(sys => (
                        <div key={sys.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                    sys.type === 'ERP' ? 'bg-purple-100 text-purple-600' :
                                    sys.type === 'TELEMATICS' ? 'bg-orange-100 text-orange-600' :
                                    'bg-slate-100 text-slate-600'
                                }`}>
                                    <Database size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">{sys.name}</h4>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                        <span className="bg-slate-200 px-1.5 rounded">{sys.type}</span>
                                        <span>•</span>
                                        <span className="font-mono">{sys.id}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="text-right">
                                    <p className="text-xs text-slate-400 uppercase tracking-wider">Data Points</p>
                                    <p className="font-mono font-medium text-slate-700">{sys.dataPoints.toLocaleString()}</p>
                                </div>
                                
                                <div className="text-right w-32">
                                    <p className="text-xs text-slate-400 uppercase tracking-wider">Last Sync</p>
                                    <p className="font-medium text-slate-700">{sys.lastSync}</p>
                                </div>

                                <div className="w-32 flex justify-end">
                                    {sys.connectionStatus === 'CONNECTED' && (
                                        <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                                            <CheckCircle size={14} /> Active
                                        </span>
                                    )}
                                    {sys.connectionStatus === 'SYNCING' && (
                                        <span className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full animate-pulse">
                                            <RefreshCw size={14} className="animate-spin" /> Syncing
                                        </span>
                                    )}
                                    {sys.connectionStatus === 'ERROR' && (
                                        <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-100 px-3 py-1 rounded-full">
                                            <XCircle size={14} /> Failed
                                        </span>
                                    )}
                                </div>

                                <button className="p-2 text-slate-400 hover:text-slate-600">
                                    <Activity size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdaptationLayer;