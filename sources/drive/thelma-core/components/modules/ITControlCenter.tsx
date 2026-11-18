Original name: ITControlCenter.tsx
Drive ID: 1KzEGBcDurt5J0VVHPKU2s1eWXv1GXD1b
Parent folder: thelma-core/components/modules/
Modified: 2026-01-23T03:29:08.000Z


import React, { useState } from 'react';
import { Shield, Key, Lock, Eye, Cpu, Terminal, RefreshCw, Server, Globe, Database, Grid, Link, FileCode, Power, Clock, Download, Wifi } from 'lucide-react';
import { ApiKey, MasterAccessCodeLog } from '../../types';

const mockKeys: ApiKey[] = [ { id: 'k_1', serviceName: 'Fleet Pod API', preview: 'sk_live...8x92', status: 'ACTIVE', created: '2024-01-02' } ];
const mockBlocks = [ { id: 'BK-1092', hash: '0x8f2...a91', prev: '0x1d4...882', time: '10:42:01', events: 14 } ];

const ITControlCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'KEYS' | 'LEDGER' | 'MATRIX'>('KEYS');
  const [killSwitchArmed, setKillSwitchArmed] = useState(false);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden flex justify-between items-center">
        <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-1">IT Infrastructure Control</h2>
            <div className="flex items-center space-x-4 mt-2 text-blue-400">
                <Globe size={18} className="animate-spin-slow" />
                <span className="text-sm font-medium">Global Threat Monitor Active</span>
            </div>
        </div>
        <div className="flex gap-4 items-center z-10">
            <div className="text-right">
                <p className="text-[10px] text-slate-400 uppercase">Quantum Decryption Est.</p>
                <p className="text-xl font-mono text-green-400">4y 212d 14h</p>
            </div>
            <button 
                onClick={() => setKillSwitchArmed(!killSwitchArmed)}
                className={`p-4 rounded-full border-4 transition-all ${killSwitchArmed ? 'bg-red-600 border-red-800 animate-pulse' : 'bg-slate-800 border-slate-700 hover:border-red-500'}`}
                title="EMERGENCY KILL SWITCH"
            >
                <Power size={24} className="text-white"/>
            </button>
        </div>
      </div>

      {killSwitchArmed && (
          <div className="bg-red-600 text-white p-4 rounded-xl text-center font-bold animate-bounce shadow-xl">
              ⚠️ WARNING: KILL SWITCH ARMED. CLICK AGAIN TO SEVER ALL EXTERNAL CONNECTIONS.
          </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
               <div className="flex border-b border-slate-200">
                   <button onClick={() => setActiveTab('KEYS')} className={`px-6 py-4 text-sm font-medium ${activeTab === 'KEYS' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>API Keys</button>
                   <button onClick={() => setActiveTab('LEDGER')} className={`px-6 py-4 text-sm font-medium ${activeTab === 'LEDGER' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>Blockchain Ledger</button>
                   <button onClick={() => setActiveTab('MATRIX')} className={`px-6 py-4 text-sm font-medium ${activeTab === 'MATRIX' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>Access Matrix</button>
               </div>

               <div className="p-0">
                   {activeTab === 'KEYS' && (
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium"><tr><th className="px-5 py-3">Service</th><th className="px-5 py-3">Key</th><th className="px-5 py-3">Status</th></tr></thead>
                            <tbody className="divide-y divide-slate-100">
                                {mockKeys.map((k) => ( <tr key={k.id}><td className="px-5 py-3 font-medium">{k.serviceName}</td><td className="px-5 py-3 font-mono text-xs">{k.preview}</td><td className="px-5 py-3 text-green-600 font-bold">{k.status}</td></tr> ))}
                            </tbody>
                        </table>
                   )}
                   {activeTab === 'LEDGER' && (
                       <div className="p-6 space-y-4">
                           {mockBlocks.map(b => (
                               <div key={b.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs">
                                   <div className="p-2 bg-blue-100 text-blue-600 rounded"><FileCode size={16}/></div>
                                   <div><span className="text-slate-400">Block:</span> <span className="font-bold text-slate-700">{b.id}</span></div>
                                   <div><span className="text-slate-400">Hash:</span> <span className="text-blue-600">{b.hash}</span></div>
                                   <div className="flex-1 text-right text-slate-400">{b.time}</div>
                               </div>
                           ))}
                       </div>
                   )}
                   {activeTab === 'MATRIX' && (
                       <div className="p-6 text-center text-slate-500 text-sm">Role-Based Access Control Matrix Loaded.</div>
                   )}
               </div>
           </div>
        </div>

        <div className="space-y-6">
            {/* VPN Visualizer */}
            <div className="bg-slate-800 text-white rounded-xl p-5 border border-slate-700">
                <h3 className="font-bold flex items-center gap-2 mb-4"><Wifi size={18} className="text-blue-400"/> VPN Tunnel Status</h3>
                <div className="space-y-3">
                    <div className="flex justify-between text-xs"><span>HQ &lt;-&gt; Cloud</span><span className="text-green-400">Encrypted (AES-256)</span></div>
                    <div className="flex justify-between text-xs"><span>Fleet &lt;-&gt; Edge</span><span className="text-green-400">Encrypted (TLS 1.3)</span></div>
                    <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden mt-2"><div className="bg-blue-500 h-full w-full animate-pulse"></div></div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-2">Compliance</h3>
                <button className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-lg text-xs transition-colors">
                    <Download size={14}/> Generate Security Cert
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ITControlCenter;
