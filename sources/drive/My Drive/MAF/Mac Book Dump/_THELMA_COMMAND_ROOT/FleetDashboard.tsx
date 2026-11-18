Original name: FleetDashboard.tsx
Drive ID: 16eWqyqtgl1V7MS9Jk4UhTspDHFQaSnAe
Parent folder: My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/
Modified: 2026-01-12T00:24:58.000Z

import React, { useState } from 'react';
import { Truck, MapPin, Activity, AlertTriangle, ChevronLeft, Video, Lock, Thermometer, Mic, Disc, Map as MapIcon, Zap, ThermometerSnowflake, SignalHigh } from 'lucide-react';
import { FleetVehicle } from '../../types';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const mockVehicles: FleetVehicle[] = [
  { 
    id: '1', 
    unitNumber: 'F-101', 
    type: 'TRUCK', 
    status: 'ACTIVE', 
    driver: 'Steve Henry (Architect)', 
    location: 'I-95 North, Mile 45', 
    fuelLevel: 78,
    tpms: { l1: 102, l2: 101, r1: 103, r2: 88 },
    fatigueLevel: 12
  },
  { id: '2', unitNumber: 'V-202', type: 'VAN', status: 'IDLE', driver: 'N/A', location: 'Central Depot', fuelLevel: 45 }
];

const fatigueHistory = [
  { time: '08:00', level: 10 },
  { time: '10:00', level: 15 },
  { time: '12:00', level: 25 },
  { time: '14:00', level: 35 },
  { time: '16:00', level: 55 }
];

const FleetDashboard: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<FleetVehicle | null>(null);
  const [showTheftMap, setShowTheftMap] = useState(true);
  const [isTalking, setIsTalking] = useState(false);

  return (
    <div className="p-8 space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Fleet Logistics Command</h1>
          <p className="text-slate-500 text-sm">Real-time Telemetry • H.E.N.R.Y. Active</p>
        </div>
        <div className="flex items-center gap-3">
           <div className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${isTalking ? 'bg-red-500 border-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse' : 'bg-white border-slate-200 text-slate-500'}`}>
              <SignalHigh size={16} className={isTalking ? 'animate-bounce' : ''} />
              <span className="text-xs font-black tracking-widest uppercase">{isTalking ? 'TRANSMITTING...' : 'CHANNEL IDLE'}</span>
           </div>
           <button 
              onMouseDown={() => setIsTalking(true)}
              onMouseUp={() => setIsTalking(false)}
              onMouseLeave={() => setIsTalking(false)}
              className={`p-3 rounded-full transition-all shadow-lg active:scale-95 ${isTalking ? 'bg-red-600 text-white shadow-red-500/50 scale-110' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
              title="Hold to Dispatch"
           >
              <Mic size={20} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-[500px] relative">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center z-10 relative">
              <h2 className="font-bold text-slate-800 flex items-center gap-2"><MapIcon size={18} className="text-emerald-600" /> Route Analysis</h2>
              <div className="flex gap-2">
                <button onClick={() => setShowTheftMap(!showTheftMap)} className={`px-2 py-1 rounded text-[10px] font-bold border ${showTheftMap ? 'bg-red-500/20 border-red-500 text-red-700' : 'bg-white text-slate-400 border-slate-200'}`}>THEFT ZONES</button>
              </div>
            </div>
            
            <div className="absolute inset-0 bg-slate-100 flex items-center justify-center opacity-50" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            {showTheftMap && (
              <div className="absolute top-1/3 left-1/2 w-48 h-48 bg-red-500/10 border border-red-500/30 rounded-full blur-2xl flex items-center justify-center animate-pulse">
                <span className="text-[10px] font-bold text-red-600 bg-white/80 px-2 rounded tracking-widest uppercase">High Theft Zone</span>
              </div>
            )}

            <div className="absolute top-[40%] left-[30%] cursor-pointer group" onClick={() => setSelectedUnit(mockVehicles[0])}>
              <div className="p-2 bg-emerald-600 rounded shadow-xl text-white animate-bounce transition-transform hover:scale-110">
                <Truck size={16} />
              </div>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded border border-slate-200 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                <p className="text-[10px] font-bold text-slate-800 tracking-widest uppercase">F-101: Active</p>
                <p className="text-[8px] text-slate-500 uppercase">Driver: Steve Henry</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Activity size={18} className="text-orange-500"/> Fatigue Monitoring</h3>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={fatigueHistory}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="time" hide />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Line type="monotone" dataKey="level" stroke="#f97316" strokeWidth={3} dot={{ r: 4, fill: '#f97316', strokeWidth: 2, stroke: '#fff' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Disc size={18} className="text-blue-500"/> Live TPMS</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="p-2 bg-slate-50 rounded border border-slate-100 text-center font-mono text-[10px] font-bold text-slate-600">L1: 102</div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-100 text-center font-mono text-[10px] font-bold text-slate-600">L2: 101</div>
                </div>
                <div className="space-y-2">
                  <div className="p-2 bg-slate-50 rounded border border-slate-100 text-center font-mono text-[10px] font-bold text-slate-600">R1: 103</div>
                  <div className="p-2 bg-red-50 rounded border border-red-200 text-center font-mono text-[10px] font-bold text-red-600 animate-pulse">R2: 88</div>
                </div>
              </div>
              <p className="text-[10px] text-red-500 font-bold mt-4 uppercase tracking-widest text-center">Alert: Low pressure detected R2</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Zap size={18} className="text-yellow-400"/> Energy Integration</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 uppercase tracking-widest">EV Charging Network</span>
                <span className="text-emerald-400 font-bold">STABLE</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                <ThermometerSnowflake size={20} className="text-blue-400" />
                <div>
                  <p className="text-xs font-bold text-slate-300">Cold Chain Integrity</p>
                  <p className="text-[10px] text-blue-400 font-mono">-18.2°C (Optimal)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Activity size={18} className="text-blue-600" /> Dispatch Intelligence</h3>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <p className="text-xs font-bold text-emerald-800 uppercase mb-2">Driver of the Month</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">SH</div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Steve Henry</p>
                  <p className="text-xs text-emerald-600">Safety Score: 99.8%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FleetDashboard;