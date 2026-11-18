Original name: IntegrationsBuffer.tsx
Drive ID: 1bd_Ny0znGNkHdrAsJvwaYueeFYxZy_Bo
Parent folder: My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/copy-of-t.h.e.l.m.a.-ai-for-hackathon (2)/components/modules/
Modified: 2026-01-20T18:17:30.266Z


import React from 'react';
import { Workflow, Globe, Shield, Activity, Fuel, FileText, PauseCircle, PlayCircle, AlertCircle } from 'lucide-react';
import { N8nWorkflow } from '../../types';

const mockWorkflows: N8nWorkflow[] = [
  { id: 'WF-01', name: 'Insurance Claims Sync', status: 'ACTIVE', lastRun: '2 mins ago', trigger: 'WEBHOOK', nodes: 14, connectorType: 'INSURANCE' },
  { id: 'WF-02', name: 'EMS Dispatch Handshake', status: 'PAUSED', lastRun: '1 hour ago', trigger: 'EVENT', nodes: 8, connectorType: 'EMS' },
  { id: 'WF-03', name: 'Fuel Consumption Reporting', status: 'ACTIVE', lastRun: '30 secs ago', trigger: 'SCHEDULE', nodes: 6, connectorType: 'FUEL' },
  { id: 'WF-04', name: 'DOT Compliance Check', status: 'ERROR', lastRun: 'Yesterday', trigger: 'SCHEDULE', nodes: 22, connectorType: 'REGULATORY' },
];

const IntegrationsBuffer: React.FC = () => {
  return (
    <div className="space-y-6">
       {/* Hero Section */}
       <div className="bg-orange-600 rounded-xl p-8 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
                <Workflow size={32} />
                <h1 className="text-3xl font-bold">n8n Workforce Layer</h1>
            </div>
            <p className="text-orange-100 max-w-xl">
              Managed by P.E.R.C.Y. Governance. This layer handles secure data exchange with third-party systems (Insurance, EMS, Fuel), ensuring T.H.E.L.M.A. remains isolated from direct external dependencies.
            </p>
          </div>
          <Workflow className="absolute right-8 bottom-[-20px] opacity-20" size={160} />
       </div>

       {/* Connection Status */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
             <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Shield size={24} /></div>
             <div>
                <p className="text-xs text-slate-500 font-bold uppercase">Insurance</p>
                <p className="font-bold text-slate-800">Connected</p>
             </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
             <div className="p-3 bg-red-100 text-red-600 rounded-lg"><Activity size={24} /></div>
             <div>
                <p className="text-xs text-slate-500 font-bold uppercase">Local EMS</p>
                <p className="font-bold text-slate-800">Standby</p>
             </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
             <div className="p-3 bg-green-100 text-green-600 rounded-lg"><Fuel size={24} /></div>
             <div>
                <p className="text-xs text-slate-500 font-bold uppercase">Fuel Systems</p>
                <p className="font-bold text-slate-800">Streaming</p>
             </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
             <div className="p-3 bg-slate-100 text-slate-600 rounded-lg"><FileText size={24} /></div>
             <div>
                <p className="text-xs text-slate-500 font-bold uppercase">Regulatory</p>
                <p className="font-bold text-slate-800">Pending</p>
             </div>
          </div>
       </div>

       {/* Workflow Visualizer */}
       <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
             <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Globe size={16} className="text-slate-400"/> Active Pipelines (P.E.R.C.Y. Oversight)
             </h3>
             <button className="text-xs bg-slate-200 text-slate-600 px-3 py-1 rounded font-medium">Refresh Nodes</button>
          </div>
          
          <div className="grid grid-cols-1 divide-y divide-slate-100">
             {mockWorkflows.map(wf => (
                <div key={wf.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                   <div className="flex items-center space-x-4">
                      <div className={`w-2 h-12 rounded-full ${
                        wf.status === 'ACTIVE' ? 'bg-green-500' :
                        wf.status === 'PAUSED' ? 'bg-orange-400' : 'bg-red-500'
                      }`}></div>
                      <div>
                         <h4 className="font-bold text-slate-800 text-sm">{wf.name}</h4>
                         <div className="flex items-center space-x-3 mt-1">
                            <span className="text-xs text-slate-400 font-mono bg-slate-100 px-1 rounded">{wf.id}</span>
                            <span className="text-xs text-slate-400 flex items-center gap-1"><Workflow size={10} /> {wf.nodes} Nodes</span>
                            <span className="text-xs text-slate-400">{wf.trigger}</span>
                         </div>
                      </div>
                   </div>

                   <div className="flex items-center space-x-6">
                      <div className="text-right">
                         <p className="text-xs text-slate-400">Last Run</p>
                         <p className="text-sm font-medium text-slate-700">{wf.lastRun}</p>
                      </div>
                      
                      <div className="flex space-x-2">
                         {wf.status === 'ACTIVE' && <button className="text-slate-400 hover:text-orange-500"><PauseCircle size={20} /></button>}
                         {wf.status === 'PAUSED' && <button className="text-slate-400 hover:text-green-500"><PlayCircle size={20} /></button>}
                         {wf.status === 'ERROR' && <button className="text-red-400 hover:text-red-600"><AlertCircle size={20} /></button>}
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>

       {/* API Key Placeholder */}
       <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 text-center">
          <p className="text-slate-400 text-sm mb-4">Secure Gateway Access Token</p>
          <div className="inline-flex items-center bg-black/30 border border-slate-600 rounded-lg px-4 py-3 font-mono text-green-400 text-sm mb-4">
             n8n_live_sk_8293...x992
          </div>
          <p className="text-xs text-slate-500">
             This token is generated for the current session demonstration and does not provide access to live production environments.
          </p>
       </div>
    </div>
  );
};

export default IntegrationsBuffer;
