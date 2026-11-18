Original name: FleetDashboard.tsx
Drive ID: 1QsHiYng4KLxp0ezrfDGrZ7dpCjwqm8S7
Parent folder: thelma-core/components/modules/
Modified: 2026-01-23T02:31:57.000Z


import React, { useState } from 'react';
import { Truck, MapPin, Activity, AlertTriangle, Navigation, ChevronLeft, Folder, History, Wrench, UserCircle, ShieldCheck, FileText, Download, Briefcase, CheckCircle, Map, Globe, Key, ExternalLink, Gauge, AlertOctagon, Zap, Trophy, Star, Thermometer, Video, DollarSign, Mic, Disc, Lock } from 'lucide-react';
import { FleetVehicle, DriverProfile } from '../../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, CartesianGrid } from 'recharts';

const mockVehicles: FleetVehicle[] = [
  { id: '1', unitNumber: 'F-101', type: 'TRUCK', status: 'ACTIVE', driver: 'John Doe', location: 'I-95 North, Mile 45', fuelLevel: 78, vin: '1N4AL3AP1...2390', assignedDriverId: 'D-01', loads: [ { id: 'L-101', origin: 'NY', destination: 'CHI', weight: '24k', date: '2025-01-04' } ] },
  { id: '2', unitNumber: 'F-104', type: 'HEAVY', status: 'MAINTENANCE', driver: 'N/A', location: 'Depot A', fuelLevel: 12 },
  { id: '3', unitNumber: 'V-202', type: 'VAN', status: 'ACTIVE', driver: 'Jane Smith', location: 'Downtown', fuelLevel: 45, assignedDriverId: 'D-02' },
];

const mockDrivers: (DriverProfile & { safetyMetrics: any[], fatigueData: any[] })[] = [
    { id: 'D-01', name: 'John Doe', licenseNumber: 'DL-92830-NY', endorsements: ['H', 'T', 'X'], lastTrainingDate: '2024-12-01', performanceScore: 98.4, safetyMetrics: [ { category: 'Braking', score: 95 } ], fatigueData: [ { time: '8am', level: 10 }, { time: '12pm', level: 25 }, { time: '4pm', level: 60 } ] }
];

const FleetDashboard: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<FleetVehicle | null>(null);
  const [showChargers, setShowChargers] = useState(false);
  const [showTrafficCams, setShowTrafficCams] = useState(false);
  const [showFuelPrices, setShowFuelPrices] = useState(false);
  const [showTheftMap, setShowTheftMap] = useState(false);
  const [showWeatherOverlay, setShowWeatherOverlay] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const renderUnitDetail = (unit: FleetVehicle) => {
    const driver = mockDrivers.find(d => d.id === unit.assignedDriverId);
    return (
        <div className="space-y-6 animate-fadeIn">
            <button onClick={() => { setSelectedUnit(null); }} className="flex items-center text-slate-500 hover:text-blue-600 transition-colors mb-4"><ChevronLeft size={18} /> <span className="text-sm font-bold">Back to Registry</span></button>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900 mb-1">{unit.unitNumber}</h2>
                        <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 mt-2">
                             <div><p className="text-xs text-slate-400">Status</p><p className="text-sm font-bold text-green-600">{unit.status}</p></div>
                             <div><p className="text-xs text-slate-400">Fuel</p><p className="text-sm font-bold text-blue-600">{unit.fuelLevel}%</p></div>
                        </div>
                    </div>
                    {/* TPMS WIDGET */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Disc size={18} className="text-slate-500"/> TPMS (Live PSI)</h3>
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="space-y-2">
                                <div className="h-8 bg-slate-100 rounded border border-slate-200 flex items-center justify-center text-xs font-mono font-bold text-slate-600">L1: 102</div>
                                <div className="h-8 bg-slate-100 rounded border border-slate-200 flex items-center justify-center text-xs font-mono font-bold text-slate-600">L2: 101</div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-8 bg-slate-100 rounded border border-slate-200 flex items-center justify-center text-xs font-mono font-bold text-slate-600">R1: 103</div>
                                <div className="h-8 bg-red-100 rounded border border-red-200 flex items-center justify-center text-xs font-mono font-bold text-red-600 animate-pulse">R2: 88</div>
                            </div>
                        </div>
                    </div>
                    {/* Trailer Utilization */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4 text-sm">Trailer Utilization (Floor)</h3>
                        <div className="h-32 bg-slate-100 rounded border border-slate-200 relative overflow-hidden">
                            <div className="absolute top-0 left-0 bottom-0 bg-blue-500/20 w-[85%] border-r-2 border-blue-500 flex items-center justify-center text-blue-700 font-bold text-xs">85% FULL</div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2 space-y-6">
                    {/* Driver & Fatigue */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Activity size={18} className="text-orange-500"/> Driver Wellness</h3>
                        {driver ? (
                            <div className="h-40">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={driver.fatigueData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="time" hide />
                                        <YAxis hide domain={[0, 100]} />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="level" stroke="#f97316" strokeWidth={3} dot={{r:3}} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        ) : <p>No Driver</p>}
                    </div>
                </div>
            </div>
        </div>
    );
  };

  if (selectedUnit) return renderUnitDetail(selectedUnit);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-[600px] overflow-hidden relative">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 z-10">
                    <h2 className="font-semibold text-slate-800 flex items-center gap-2"><Map size={18} className="text-green-600" /> Live Tracking</h2>
                    <div className="flex items-center gap-2 flex-wrap">
                        <button onClick={() => setShowTrafficCams(!showTrafficCams)} className={`text-[10px] px-2 py-1 rounded border font-bold flex items-center gap-1 ${showTrafficCams ? 'bg-blue-100 text-blue-700' : 'bg-white'}`}><Video size={10} /> Cams</button>
                        <button onClick={() => setShowTheftMap(!showTheftMap)} className={`text-[10px] px-2 py-1 rounded border font-bold flex items-center gap-1 ${showTheftMap ? 'bg-red-100 text-red-700 border-red-200' : 'bg-white'}`}><Lock size={10} /> Theft Zones</button>
                        <button onClick={() => setShowWeatherOverlay(!showWeatherOverlay)} className={`text-[10px] px-2 py-1 rounded border font-bold flex items-center gap-1 ${showWeatherOverlay ? 'bg-purple-100 text-purple-700' : 'bg-white'}`}><Thermometer size={10} /> Weather</button>
                        <button 
                            onMouseDown={() => setIsRecording(true)} 
                            onMouseUp={() => setIsRecording(false)}
                            className={`text-[10px] px-3 py-1 rounded border font-bold flex items-center gap-1 transition-all ${isRecording ? 'bg-red-600 text-white scale-105' : 'bg-slate-800 text-white'}`}
                        >
                            <Mic size={10} /> {isRecording ? 'Listening...' : 'Voice Dispatch'}
                        </button>
                    </div>
                </div>
                
                <div className="flex-1 bg-slate-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#e5e7eb] opacity-50" style={{backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <svg className="absolute inset-0 w-full h-full"><path d="M 200 0 V 600" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="6" fill="none" /></svg>
                        
                        {/* Theft Zone Layer */}
                        {showTheftMap && (
                            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500/20 border border-red-500/50 rounded-full blur-xl flex items-center justify-center">
                                <span className="text-[10px] font-bold text-red-700 bg-white/80 px-1 rounded">HIGH RISK AREA</span>
                            </div>
                        )}

                        {/* Weather Overlay */}
                        {showWeatherOverlay && (
                            <div className="absolute inset-0 bg-blue-500/10 pointer-events-none" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")'}}></div>
                        )}

                        <div className="absolute top-[60%] left-[53%] w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg pointer-events-auto cursor-pointer" onClick={() => setSelectedUnit(mockVehicles[0])}></div>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="space-y-6">
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <h3 className="font-bold text-slate-800 mb-4">Parking Predictor</h3>
                 <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                     <span className="text-sm text-slate-600">Pilot Flying J (Exit 42)</span>
                     <span className="text-green-600 font-bold text-xs bg-green-100 px-2 py-1 rounded">High Availability</span>
                 </div>
                 <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100 mt-2">
                     <span className="text-sm text-slate-600">Love's Travel Stop</span>
                     <span className="text-red-600 font-bold text-xs bg-red-100 px-2 py-1 rounded">Full</span>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default FleetDashboard;
