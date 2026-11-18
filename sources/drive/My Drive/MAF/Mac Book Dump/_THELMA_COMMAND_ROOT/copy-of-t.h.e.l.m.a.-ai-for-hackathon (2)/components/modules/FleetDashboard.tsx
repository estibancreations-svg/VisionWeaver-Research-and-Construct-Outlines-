Original name: FleetDashboard.tsx
Drive ID: 1A1gdATp8WJM1NCbuDtqZuuyUodP5vKZX
Parent folder: My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/copy-of-t.h.e.l.m.a.-ai-for-hackathon (2)/components/modules/
Modified: 2026-01-20T18:17:17.854Z


import React, { useState } from 'react';
import { Truck, MapPin, Activity, AlertTriangle, Navigation, ChevronLeft, Folder, History, Wrench, UserCircle, ShieldCheck, FileText, Download, Briefcase, CheckCircle, Map, Globe, Key, ExternalLink } from 'lucide-react';
import { FleetVehicle, DriverProfile } from '../../types';

const mockVehicles: FleetVehicle[] = [
  { 
    id: '1', 
    unitNumber: 'F-101', 
    type: 'TRUCK', 
    status: 'ACTIVE', 
    driver: 'John Doe', 
    location: 'I-95 North, Mile 45', 
    fuelLevel: 78,
    vin: '1N4AL3AP1...2390',
    assignedDriverId: 'D-01',
    loads: [
        { id: 'L-101', origin: 'NY Port', destination: 'Chicago Hub', weight: '24,000 lbs', date: '2025-01-04' },
        { id: 'L-102', origin: 'Chicago Hub', destination: 'Denver Depot', weight: '18,500 lbs', date: '2024-12-28' }
    ],
    maintenanceLog: [
        { id: 'M-01', date: '2024-12-15', service: 'Full Brake Alignment', cost: '$1,200', advice: 'Monitor rear pad wear in 30 days.' },
        { id: 'M-02', date: '2024-11-02', service: 'Oil & Filter Change', cost: '$450', advice: 'Systems Nominal.' }
    ],
    documents: [
        { id: 'DOC-1', name: 'Registration_2025.pdf', type: 'LEGAL', date: '2024-11-01' },
        { id: 'DOC-2', name: 'Hazmat_Permit_B.pdf', type: 'COMPLIANCE', date: '2024-10-15' }
    ]
  },
  { id: '2', unitNumber: 'F-104', type: 'HEAVY', status: 'MAINTENANCE', driver: 'N/A', location: 'Depot A', fuelLevel: 12 },
  { id: '3', unitNumber: 'V-202', type: 'VAN', status: 'ACTIVE', driver: 'Jane Smith', location: 'Downtown Deliveries', fuelLevel: 45 },
  { id: '4', unitNumber: 'F-109', type: 'TRUCK', status: 'IDLE', driver: 'Mike Ross', location: 'Rest Stop B', fuelLevel: 90 },
];

const mockDrivers: DriverProfile[] = [
    { id: 'D-01', name: 'John Doe', licenseNumber: 'DL-92830-NY', endorsements: ['H', 'T', 'X'], lastTrainingDate: '2024-12-01', performanceScore: 98.4 }
];

const FleetDashboard: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<FleetVehicle | null>(null);
  const [showDriverCredentials, setShowDriverCredentials] = useState(false);

  const renderUnitDetail = (unit: FleetVehicle) => {
    const driver = mockDrivers.find(d => d.id === unit.assignedDriverId);

    return (
        <div className="space-y-6 animate-fadeIn">
            <button onClick={() => { setSelectedUnit(null); setShowDriverCredentials(false); }} className="flex items-center text-slate-500 hover:text-blue-600 transition-colors mb-4">
                <ChevronLeft size={18} /> <span className="text-sm font-bold">Back to Fleet Registry</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Unit Identity & Folders */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-4 bg-slate-900 text-white rounded-lg"><Truck size={32} /></div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">{unit.unitNumber}</h2>
                                <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">{unit.vin}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                             <div><p className="text-xs text-slate-400">Status</p><p className="text-sm font-bold text-green-600">{unit.status}</p></div>
                             <div><p className="text-xs text-slate-400">Fuel Level</p><p className="text-sm font-bold text-blue-600">{unit.fuelLevel}%</p></div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Folder size={18} className="text-blue-500"/> Digital Folders</h3>
                        <div className="space-y-2">
                            {unit.documents?.map(doc => (
                                <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer border border-transparent hover:border-blue-200 transition-all">
                                    <div className="flex items-center gap-3">
                                        <FileText size={16} className="text-slate-400"/>
                                        <div>
                                            <p className="text-xs font-bold text-slate-700">{doc.name}</p>
                                            <p className="text-[10px] text-slate-400">{doc.type} • {doc.date}</p>
                                        </div>
                                    </div>
                                    <Download size={14} className="text-slate-400"/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Center: Operations & History */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2"><History size={18} className="text-purple-500"/> Load & Trip History</h3>
                        </div>
                        <table className="w-full text-sm text-left">
                            <thead className="bg-white text-slate-500 font-medium">
                                <tr>
                                    <th className="px-5 py-3">Date</th>
                                    <th className="px-5 py-3">Route</th>
                                    <th className="px-5 py-3">Weight</th>
                                    <th className="px-5 py-3">ID</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {unit.loads?.map(load => (
                                    <tr key={load.id}>
                                        <td className="px-5 py-3 font-mono text-xs">{load.date}</td>
                                        <td className="px-5 py-3 font-medium text-slate-700">{load.origin} &rarr; {load.destination}</td>
                                        <td className="px-5 py-3 text-slate-500">{load.weight}</td>
                                        <td className="px-5 py-3 text-[10px] text-slate-400 font-mono">{load.id}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2"><Wrench size={18} className="text-orange-500"/> Compliance & Maintenance Advisory</h3>
                        </div>
                        <div className="p-5 space-y-4">
                            {unit.maintenanceLog?.map(log => (
                                <div key={log.id} className="p-4 bg-orange-50/50 rounded-xl border border-orange-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-slate-800">{log.service}</h4>
                                        <span className="text-[10px] font-mono bg-white px-2 py-1 rounded border border-orange-200 text-orange-700">{log.date}</span>
                                    </div>
                                    <p className="text-xs text-slate-600 leading-relaxed italic">" {log.advice} "</p>
                                    <div className="mt-2 text-right"><span className="text-xs font-bold text-slate-800">{log.cost}</span></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Assigned Driver Section */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><UserCircle size={18} className="text-slate-500"/> Assigned Operator</h3>
                        {driver ? (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 font-bold text-lg">{driver.name.charAt(0)}</div>
                                    <div>
                                        <p className="font-bold text-slate-800">{driver.name}</p>
                                        <p className="text-xs text-slate-500">Performance Score: <span className="text-green-600 font-bold">{driver.performanceScore}%</span></p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setShowDriverCredentials(!showDriverCredentials)}
                                    className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors"
                                >
                                    {showDriverCredentials ? 'Hide Credentials' : 'View Credentials'}
                                </button>
                            </div>
                        ) : <p className="text-sm text-slate-400">No driver assigned to this unit currently.</p>}

                        {showDriverCredentials && driver && (
                            <div className="mt-6 p-6 bg-slate-50 rounded-xl border border-slate-200 border-dashed animate-fadeIn">
                                <div className="flex items-center gap-2 mb-4 text-slate-800"><ShieldCheck size={18} className="text-green-500"/> <span className="font-bold">Trip Credential Profile</span></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><p className="text-xs text-slate-400">License</p><p className="text-sm font-mono text-slate-700">{driver.licenseNumber}</p></div>
                                    <div><p className="text-xs text-slate-400">Endorsements</p><p className="text-sm font-mono text-slate-700">{driver.endorsements.join(', ')}</p></div>
                                    <div><p className="text-xs text-slate-400">Last Training</p><p className="text-sm text-slate-700">{driver.lastTrainingDate}</p></div>
                                    <div><p className="text-xs text-slate-400">Verification Status</p><p className="text-xs font-bold text-green-600 flex items-center gap-1"><CheckCircle size={12}/> AI-Verified</p></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
  };

  if (selectedUnit) return renderUnitDetail(selectedUnit);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-medium text-slate-500">Active Units</h3><Truck size={18} className="text-blue-500" /></div>
          <p className="text-2xl font-bold text-slate-800">142</p>
          <span className="text-xs text-green-500 font-medium">+4% vs last week</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-medium text-slate-500">Maintenance</h3><Activity size={18} className="text-orange-500" /></div>
          <p className="text-2xl font-bold text-slate-800">8</p>
          <span className="text-xs text-slate-400">Low urgency</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-medium text-slate-500">Route Efficiency</h3><Navigation size={18} className="text-purple-500" /></div>
          <p className="text-2xl font-bold text-slate-800">94.2%</p>
          <span className="text-xs text-green-500">AI Optimized</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-medium text-slate-500">Critical Alerts</h3><AlertTriangle size={18} className="text-red-500" /></div>
          <p className="text-2xl font-bold text-slate-800">2</p>
          <span className="text-xs text-red-500">Immediate attention</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h2 className="font-semibold text-slate-800">Live Fleet Registry</h2>
            <button className="text-xs bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 px-3 py-1 rounded-md transition-colors flex items-center gap-1 font-bold">
              <Download size={14}/> Full Export
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-white text-slate-500 font-medium">
                <tr>
                  <th className="px-5 py-3">Unit</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Driver</th>
                  <th className="px-5 py-3">Location</th>
                  <th className="px-5 py-3">Fuel</th>
                  <th className="px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockVehicles.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3">
                        <button 
                            onClick={() => setSelectedUnit(v)}
                            className="font-bold text-blue-600 hover:underline flex items-center gap-2"
                        >
                            <Truck size={14}/> {v.unitNumber}
                        </button>
                    </td>
                    <td className="px-5 py-3 text-slate-500 text-xs">{v.type}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${v.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : v.status === 'MAINTENANCE' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'}`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-600 flex items-center gap-1"><Briefcase size={12} className="text-slate-400"/> {v.driver}</td>
                    <td className="px-5 py-3 text-slate-500 flex items-center"><MapPin size={12} className="mr-1" /> {v.location}</td>
                    <td className="px-5 py-3">
                      <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full ${v.fuelLevel < 20 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${v.fuelLevel}%` }} />
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <button onClick={() => setSelectedUnit(v)} className="text-blue-600 hover:text-blue-800 font-bold text-xs">View 360 &rarr;</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* ENHANCED MAP INTEGRATION */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-[600px] overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                <Map size={18} className="text-green-600" /> Live Tracking
            </h2>
            <div className="flex items-center gap-1 text-[10px] bg-white border border-slate-200 px-2 py-1 rounded">
                <Globe size={10} className="text-slate-400" />
                <span className="text-slate-500">Google Maps Platform</span>
            </div>
          </div>
          
          <div className="flex-1 bg-slate-100 relative overflow-hidden group">
             {/* Map Placeholder Visualization - Flat Background Only */}
             <div className="absolute inset-0 bg-[#e5e7eb] opacity-50"></div>
             
             {/* Simulated Map Elements */}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="w-full h-full relative">
                     {/* Roads */}
                     <div className="absolute top-0 left-1/2 w-2 h-full bg-white/60 transform -translate-x-1/2"></div>
                     <div className="absolute top-1/2 left-0 w-full h-2 bg-white/60 transform -translate-y-1/2"></div>
                     <div className="absolute top-0 left-0 w-full h-full border-[40px] border-slate-200/30 rounded-[100px]"></div>
                     
                     {/* Unit Pins */}
                     <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-pulse cursor-pointer pointer-events-auto hover:scale-125 transition-transform" title="F-101">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                     </div>
                     <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center cursor-pointer pointer-events-auto hover:scale-125 transition-transform" title="F-104 (Maintenance)">
                        <Wrench size={8} className="text-white" />
                     </div>
                 </div>
             </div>

             {/* API Key Connection Overlay */}
             <div className="absolute top-4 right-4 bg-white/95 backdrop-blur shadow-xl rounded-lg p-3 w-64 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700">Map API Connection</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="flex items-center space-x-2 bg-slate-100 p-2 rounded border border-slate-200 mb-2">
                    <Key size={12} className="text-slate-400" />
                    <code className="text-[10px] text-slate-600 font-mono">AIzaSy...8x92</code>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1.5 rounded transition-colors flex items-center justify-center gap-1">
                    <ExternalLink size={10} /> Google Cloud Console
                </button>
             </div>
          </div>
          
          <div className="p-3 bg-white border-t border-slate-100 flex justify-between items-center text-xs">
             <div className="flex gap-4 text-slate-500">
                 <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-600 rounded-full"></div> Active</span>
                 <span className="flex items-center gap-1"><div className="w-2 h-2 bg-orange-500 rounded-full"></div> Maintenance</span>
             </div>
             <span className="text-slate-400">Map Data © 2025 Google</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FleetDashboard;
