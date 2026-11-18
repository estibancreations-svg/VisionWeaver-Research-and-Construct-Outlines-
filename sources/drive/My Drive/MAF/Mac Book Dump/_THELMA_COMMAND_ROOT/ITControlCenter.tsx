Original name: ITControlCenter.tsx
Drive ID: 1I59EUDdjR338QQ4YbioSdOHGh-Q2O_j9
Parent folder: My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/
Modified: 2026-01-12T00:25:20.000Z

import React, { useState } from 'react';
import { Globe, FileCode, Power, Wifi, Download, ShieldAlert, Cpu } from 'lucide-react';
import { ApiKey } from '../../types';

const mockKeys: ApiKey[] = [
    { id: 'k_1', serviceName: 'Fleet Pod API', preview: 'sk_live...8x92', status: 'ACTIVE', created: '2024-01-02' }
];

const mockBlocks = [
    { id: 'BK-1092', hash: '0x8f2...a91', prev: '0x1d4...882', time: '10:42:01', events: 14 }
];

const ITControlCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'KEYS' | 'LEDGER' | 'MATRIX'>('KEYS');
  const [killSwitchArmed, setKillSwitchArmed] = useState(false);

  return (
    <div className="space-y-6 animate-fadeIn p-8">
      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden flex justify-between items-center border border-slate-800">
        <div className="relative z-10">
            <h2 className="text-3xl font-black tracking-tight mb-2 uppercase">IT Infrastructure Control</h2>
            <div className="flex items-center space-x-4 mt-4 text-blue-400">
                <div className="relative">
                  <Globe size={48} className="animate-spin-slow opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShieldAlert size={18} className="text-blue-500 animate-pulse" />
                  </div>
                </div>
                <div>
                  <span className="text-sm font-bold uppercase tracking-widest block">Global Threat Monitor</span>
                  <span className="text-[10px] text-slate-500 font-mono">STATUS: SCANNING SECTOR 7...</span>
                </div>
            </div>
        </div>
        <div className="flex gap-8 items-center z-10">
            <div className="text-right">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Quantum Decryption Est.</p>
                <p className="text-2xl font-black font-mono text-emerald-400">4y 212d 14h</p>
            </div>
            <button 
                onClick={() => setKillSwitchArmed(!killSwitchArmed)}
                className={`p-6 rounded-2xl border-4 transition-all shadow-2xl ${killSwitchArmed ? 'bg-red-600 border-red-800 animate-pulse scale-110' : 'bg-slate-800 border-slate-700 hover:border-red-500'}`}
                title="EMERGENCY KILL SWITCH"
            >
                <Power size={32} className="text-white"/>
            </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full"></div>
      </div>

      {killSwitchArmed && (
          <div className="bg-red-600 text-white p-4 rounded-xl text-center font-black tracking-widest animate-bounce shadow-2xl border border-red-400 uppercase text-xs">
              ⚠️ CRITICAL WARNING: KILL SWITCH ARMED. PROTOCOL 0 SEVERANCE READY. ⚠️
          </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
               <div className="flex border-b border-slate-200 bg-slate-50">
                   <button onClick={() => setActiveTab('KEYS')} className={`px-8 py-5 text-[10px] font-black uppercase tracking-widest ${activeTab === 'KEYS' ? 'text-blue-600 bg-white border-b-2 border-blue-600' : 'text-slate-400'}`}>API Registry</button>
                   <button onClick={() => setActiveTab('LEDGER')} className={`px-8 py-5 text-[10px] font-black uppercase tracking-widest ${activeTab === 'LEDGER' ? 'text-blue-600 bg-white border-b-2 border-blue-600' : 'text-slate-400'}`}>Blockchain Ledger</button>
                   <button onClick={() => setActiveTab('MATRIX')} className={`px-8 py-5 text-[10px] font-black uppercase tracking-widest ${activeTab === 'MATRIX' ? 'text-blue-600 bg-white border-b-2 border-blue-600' : 'text-slate-400'}`}>Access Matrix</button>
               </div>

               <div className="p-0">
                   {activeTab === 'KEYS' && (
                        <table className="w-full text-xs text-left">
                            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-tighter border-b border-slate-100">
                              <tr><th className="px-6 py-4">Service</th><th className="px-6 py-4">Preview</th><th className="px-6 py-4">Status</th></tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {mockKeys.map((k) => ( 
                                  <tr key={k.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-slate-800">{k.serviceName}</td>
                                    <td className="px-6 py-4 font-mono text-slate-400 tracking-tighter">{k.preview}</td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded font-black uppercase tracking-widest">{k.status}</span></td>
                                  </tr> 
                                ))}
                            </tbody>
                        </table>
                   )}
                   {activeTab === 'LEDGER' && (
                       <div className="p-8 space-y-4 bg-slate-50 min-h-[300px]">
                           {mockBlocks.map(b => (
                               <div key={b.id} className="flex items-center gap-6 p-4 bg-white rounded-xl border border-slate-200 font-mono text-xs shadow-sm">
                                   <div className="p-3 bg-blue-600 text-white rounded-lg shadow-md"><FileCode size={20}/></div>
                                   <div><span className="text-slate-400 font-bold uppercase block text-[8px] mb-1">Block ID</span> <span className="font-black text-slate-900">{b.id}</span></div>
                                   <div><span className="text-slate-400 font-bold uppercase block text-[8px] mb-1">Hash Fingerprint</span> <span className="text-blue-600 font-bold">{b.hash}</span></div>
                                   <div className="flex-1 text-right text-slate-400 font-bold uppercase text-[9px]">{b.time}</div>
                               </div>
                           ))}
                       </div>
                   )}
                   {activeTab === 'MATRIX' && (
                       <div className="p-12 text-center text-slate-400 text-sm font-bold uppercase tracking-widest">
                          <Cpu size={48} className="mx-auto mb-4 opacity-20" />
                          Role-Based Access Control Matrix Loaded.
                       </div>
                   )}
               </div>
           </div>
        </div>

        <div className="space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl">
                <h3 className="font-black uppercase tracking-widest text-[10px] flex items-center gap-2 mb-6"><Wifi size={18} className="text-blue-400"/> VPN Tunnel Status</h3>
                <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-bold uppercase"><span>HQ ➔ Cloud</span><span className="text-emerald-400">Encrypted (AES-256)</span></div>
                    <div className="flex justify-between text-[10px] font-bold uppercase"><span>Fleet ➔ Edge</span><span className="text-emerald-400">Encrypted (TLS 1.3)</span></div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-4 shadow-inner"><div className="bg-blue-500 h-full w-full animate-pulse"></div></div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-black uppercase tracking-widest text-[10px] text-slate-800 mb-4">Compliance & Certification</h3>
                <button className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-black uppercase tracking-widest py-3 rounded-xl text-[10px] hover:bg-slate-800 transition-all shadow-md">
                    <Download size={14}/> Generate Security Cert
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ITControlCenter;