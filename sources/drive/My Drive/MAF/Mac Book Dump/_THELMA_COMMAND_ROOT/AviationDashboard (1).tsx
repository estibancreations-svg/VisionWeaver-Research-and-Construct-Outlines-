Original name: AviationDashboard (1).tsx
Drive ID: 1EfgWVmZizNTNVASHdy4ikppGjvJRlBQ2
Parent folder: My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/
Modified: 2026-01-12T00:24:37.000Z

import React, { useState } from 'react';
import { Plane, Zap, Activity, AlertTriangle, FileText, Map as MapIcon, X, Rotate3D, TrendingDown, Shield, Bird } from 'lucide-react';
import { AviationAsset } from '../../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const initialAircraft: AviationAsset[] = [
  { 
    id: 'AP-X1', 
    callsign: 'AirPod One', 
    type: 'AIR_POD', 
    status: 'IN_FLIGHT', 
    altitude: '1,200 ft', 
    batteryLevel: 82, 
    coordinates: '34.0522° N, 118.2437° W',
    flightHours: 142.5,
    lastService: '2024-12-20',
    maintenanceLog: [
      { id: 'M-1', date: '2024-12-20', service: 'Rotor Balance', note: 'Nominal. Vibration within tolerance.', recommendedAction: 'Schedule re-calibration in 50 hours.' }
    ]
  },
  { 
    id: 'DR-09', 
    callsign: 'Sentinel 9', 
    type: 'DRONE', 
    status: 'GROUNDED', 
    altitude: '0 ft', 
    batteryLevel: 100, 
    coordinates: 'Hangar B', 
    flightHours: 45.2, 
    lastService: '2025-01-02', 
    maintenanceLog: [] 
  }
];

const depreciationData = [
  { hours: 0, value: 100 },
  { hours: 100, value: 92 },
  { hours: 200, value: 85 },
  { hours: 300, value: 78 },
  { hours: 400, value: 72 },
  { hours: 500, value: 65 }
];

const AviationDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'OPS' | 'HANGAR'>('OPS');
  const [assets] = useState<AviationAsset[]>(initialAircraft);
  const [selectedAsset, setSelectedAsset] = useState<AviationAsset | null>(null);
  const [showRadar, setShowRadar] = useState(true);
  const [showNoFly, setShowNoFly] = useState(true);
  const [showBirdRisk, setShowBirdRisk] = useState(false);

  return (
    <div className="p-8 space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Aviation Control Deck</h1>
          <p className="text-slate-500 text-sm">H.E.N.R.Y. Monitoring Active • Sector 7</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setActiveTab('OPS')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'OPS' ? 'bg-sky-600 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-200'}`}>Ops</button>
          <button onClick={() => setActiveTab('HANGAR')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'HANGAR' ? 'bg-sky-600 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-200'}`}>Hangar</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 rounded-2xl p-6 h-[500px] relative overflow-hidden border border-slate-800 shadow-2xl">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            <div className="relative z-10 flex justify-between">
              <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-bold uppercase tracking-widest">
                <MapIcon size={14} /> Live Airspace
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowRadar(!showRadar)} className={`px-2 py-1 rounded text-[10px] font-bold border ${showRadar ? 'bg-sky-500/20 border-sky-500 text-sky-200' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>RADAR</button>
                <button onClick={() => setShowNoFly(!showNoFly)} className={`px-2 py-1 rounded text-[10px] font-bold border ${showNoFly ? 'bg-red-500/20 border-red-500 text-red-200' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>NO-FLY</button>
                <button onClick={() => setShowBirdRisk(!showBirdRisk)} className={`px-2 py-1 rounded text-[10px] font-bold border ${showBirdRisk ? 'bg-orange-500/20 border-orange-500 text-orange-200' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>BIRD-RISK</button>
              </div>
            </div>

            {showRadar && <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 border border-sky-500/20 rounded-full animate-spin-slow pointer-events-none" style={{ background: 'conic-gradient(from 0deg, rgba(59, 130, 246, 0.1) 0deg, transparent 60deg)' }}></div>}
            
            {showBirdRisk && (
                <div className="absolute bottom-1/4 right-1/3 p-2 animate-pulse pointer-events-none">
                    <Bird size={24} className="text-orange-400 opacity-60" />
                    <span className="text-[9px] text-orange-400 uppercase font-bold tracking-wider">Migratory Path</span>
                </div>
            )}

            <div className="absolute top-[30%] left-[40%] cursor-pointer group pointer-events-auto" onClick={() => setSelectedAsset(assets[0])}>
              <div className="p-2 bg-sky-500 rounded-full text-white shadow-lg shadow-sky-500/50 animate-pulse transition-transform hover:scale-125">
                <Plane size={16} className="rotate-45" />
              </div>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-slate-800/80 backdrop-blur px-2 py-1 rounded border border-slate-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-[10px] font-bold text-white tracking-widest">AIRPOD-X1</p>
                <p className="text-[8px] text-sky-400 font-mono">ALT: 1,200FT</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><TrendingDown size={18} className="text-blue-500" /> Strategic Value Recovery</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={depreciationData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="hours" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 h-64 flex flex-col items-center justify-center relative group">
            <div className="absolute top-4 left-4 text-[10px] font-mono text-sky-400/50 flex items-center gap-2"><Rotate3D size={12} /> Holographic Wireframe</div>
            <div className="relative w-32 h-32 border border-sky-500/20 rounded-full animate-spin-slow flex items-center justify-center">
              <Plane size={48} className="text-sky-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
            </div>
            <p className="mt-4 text-xs font-bold text-sky-400 tracking-widest opacity-50 uppercase">Rendering Alpha v1.2</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Activity size={18} className="text-blue-600" /> Strategic Insights</h3>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-xs font-bold text-blue-800 uppercase mb-1 flex items-center gap-1"><Shield size={12}/> H.E.N.R.Y. Advisory</p>
                <p className="text-xs text-blue-600 leading-relaxed">Crosswinds in Sector 4 projected to increase by 12% at 14:00. Recommend shifting AirPod-X1 to route delta.</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl border border-orange-100">
                <p className="text-xs font-bold text-orange-800 uppercase mb-1 flex items-center gap-1"><AlertTriangle size={12}/> Maintenance Alert</p>
                <p className="text-xs text-orange-600 leading-relaxed">Sentinel 9 rotor vibration outside 0.2mm tolerance. Maintenance required before next flight.</p>
              </div>
              <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                <p className="text-xs font-bold text-red-800 uppercase mb-1 flex items-center gap-1"><Bird size={12}/> Environmental Hazard</p>
                <p className="text-xs text-red-600 leading-relaxed">Migratory bird pattern detected near approach vector 3. Recommend +500ft altitude correction.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4" onClick={() => setSelectedAsset(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fadeIn" onClick={e => e.stopPropagation()}>
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-sky-600 rounded-lg"><Zap size={24} /></div>
                <div>
                  <h2 className="text-xl font-bold">{selectedAsset.callsign}</h2>
                  <p className="text-slate-400 text-xs font-mono">{selectedAsset.id}</p>
                </div>
              </div>
              <button onClick={() => setSelectedAsset(null)} className="text-slate-400 hover:text-white"><X size={24} /></button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Status</p>
                  <p className="text-sm font-bold text-green-600">{selectedAsset.status}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Battery</p>
                  <p className="text-sm font-bold text-sky-600">{selectedAsset.batteryLevel}%</p>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2 text-xs uppercase"><FileText size={14}/> Maintenance History</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {selectedAsset.maintenanceLog?.map(log => (
                    <div key={log.id} className="p-3 border border-slate-100 rounded-lg hover:border-sky-200 transition-colors">
                      <div className="flex justify-between font-bold text-xs text-slate-700 mb-1">
                        <span>{log.service}</span>
                        <span className="text-slate-400">{log.date}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed">{log.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AviationDashboard;