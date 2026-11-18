Original name: AviationDashboard.tsx
Drive ID: 1zg-CHbve_h5Ol1KevZWgzY2mCTg55Pyq
Parent folder: thelma-core/components/modules/
Modified: 2026-01-23T02:31:57.000Z


import React, { useState, useEffect } from 'react';
import { Plane, Zap, Wind, Crosshair, PenTool, Upload, Battery, Activity, AlertTriangle, FileText, Settings, Play, Gauge, Radio, Map, Filter, X, CheckCircle, ChevronRight, Info, Plus, Save, Lightbulb, ArrowRight, Sparkles, CloudRain, AlertOctagon, Calendar, Cloud, Thermometer, User, Box, Layers, Hexagon, Rotate3D, Volume2, TrendingDown, Bird, Droplet } from 'lucide-react';
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
    { id: 'DR-09', callsign: 'Sentinel 9', type: 'DRONE', status: 'GROUNDED', altitude: '0 ft', batteryLevel: 100, coordinates: 'Hangar B', flightHours: 45.2, lastService: '2025-01-02' },
    { id: 'AP-X2', callsign: 'AirPod Two', type: 'AIR_POD', status: 'MAINTENANCE', altitude: '0 ft', batteryLevel: 15, coordinates: 'Service Bay 4', flightHours: 310.8, lastService: '2024-11-15' },
    { id: 'DR-12', callsign: 'Falcon Eye', type: 'DRONE', status: 'IN_FLIGHT', altitude: '450 ft', batteryLevel: 65, coordinates: '34.0488° N, 118.2510° W', flightHours: 12.5, lastService: '2025-01-01' }
];

const depreciationData = [
    { hours: 0, value: 100 },
    { hours: 100, value: 92 },
    { hours: 200, value: 85 },
    { hours: 300, value: 78 },
    { hours: 400, value: 72 },
    { hours: 500, value: 65 },
];

interface AirspaceEvent {
    id: string;
    type: 'TFR' | 'WEATHER' | 'NO_FLY' | 'BIRD_STRIKE' | 'SONIC_BOOM';
    label: string;
    top: number;
    left: number;
    width: number;
    height: number;
}

const AviationDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'OPS' | 'SIM' | 'HANGAR'>('OPS');
    const [assets, setAssets] = useState<AviationAsset[]>(initialAircraft);
    const [selectedAsset, setSelectedAsset] = useState<AviationAsset | null>(null);
    
    // Map Layers
    const [showWeatherRadar, setShowWeatherRadar] = useState(false);
    const [showNoFlyZones, setShowNoFlyZones] = useState(true);
    const [showBirdStrike, setShowBirdStrike] = useState(false);
    const [showSonicBoom, setShowSonicBoom] = useState(false);
    const [swarmMode, setSwarmMode] = useState(false);
    
    // Form state
    const [newService, setNewService] = useState('');
    const [newNote, setNewNote] = useState('');
    const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);

    // Dynamic Map Events
    const [airspaceEvents, setAirspaceEvents] = useState<AirspaceEvent[]>([
        { id: 'evt-1', type: 'TFR', label: 'NO FLY: VIP', top: 25, left: 25, width: 30, height: 30 },
        { id: 'evt-nf-1', type: 'NO_FLY', label: 'RESTRICTED GEOGRID', top: 60, left: 60, width: 20, height: 20 },
        { id: 'evt-bird-1', type: 'BIRD_STRIKE', label: 'MIGRATORY PATH', top: 10, left: 40, width: 40, height: 15 },
        { id: 'evt-boom-1', type: 'SONIC_BOOM', label: 'SUPERSONIC CORRIDOR', top: 40, left: 10, width: 20, height: 50 }
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setAssets(prevAssets => prevAssets.map(asset => {
                if (asset.status !== 'IN_FLIGHT') return asset;
                return {
                    ...asset,
                    altitude: `${Math.max(0, parseInt(asset.altitude.replace(/\D/g,'')) + (Math.random() * 40 - 20)).toLocaleString()} ft`,
                    batteryLevel: Math.max(0, asset.batteryLevel - (Math.random() > 0.8 ? 1 : 0))
                };
            }));
        }, 2000); 
        return () => clearInterval(interval);
    }, []);

    const renderAssetModal = () => {
        if (!selectedAsset) return null;
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fadeIn">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
                    <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg ${selectedAsset.type === 'AIR_POD' ? 'bg-blue-600' : 'bg-purple-600'}`}>{selectedAsset.type === 'AIR_POD' ? <Zap size={24} /> : <Crosshair size={24} />}</div>
                            <div><h2 className="text-xl font-bold">{selectedAsset.callsign}</h2><p className="text-slate-400 text-xs font-mono">{selectedAsset.id}</p></div>
                        </div>
                        <button onClick={() => setSelectedAsset(null)} className="text-slate-400 hover:text-white"><X size={24} /></button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            {/* Flight Deck */}
                            <div className="bg-black rounded-xl p-6 border border-slate-800 relative overflow-hidden h-64 flex items-center justify-center group">
                                <div className="absolute top-4 left-4 text-xs font-mono text-green-500 flex items-center gap-2"><Rotate3D size={14} /> Holographic Deck</div>
                                <div className="relative w-40 h-40 border-2 border-blue-500/30 rounded-full animate-spin-slow flex items-center justify-center" style={{transformStyle: 'preserve-3d', perspective: '1000px'}}>
                                    <div className="absolute inset-0 border border-blue-400/20 rounded-full" style={{transform: 'rotateX(60deg)'}}></div>
                                    <Plane size={48} className="text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                                </div>
                                {/* Passenger Comfort Index */}
                                <div className="absolute bottom-4 left-4">
                                    <p className="text-[10px] text-slate-500 uppercase">Pax Comfort</p>
                                    <div className="flex items-center gap-1"><Activity size={12} className="text-green-500"/><span className="text-green-400 font-mono text-sm">98/100</span></div>
                                </div>
                            </div>

                            {/* Emergency Actions */}
                            <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                                <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2 text-sm uppercase"><AlertTriangle size={16} /> Emergency Protocols</h4>
                                <div className="flex gap-2">
                                    <button className="flex-1 bg-red-100 text-red-700 py-2 rounded text-xs font-bold hover:bg-red-200 flex items-center justify-center gap-1 border border-red-200">
                                        <Droplet size={12} /> Fuel Jettison
                                    </button>
                                    <button className="flex-1 bg-red-100 text-red-700 py-2 rounded text-xs font-bold hover:bg-red-200 flex items-center justify-center gap-1 border border-red-200">
                                        <Volume2 size={12} /> Squawk 7700
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Asset Depreciation */}
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2 text-sm uppercase"><TrendingDown size={16} className="text-blue-500" /> Asset Value Depreciation</h4>
                                <div className="h-40">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={depreciationData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                            <XAxis dataKey="hours" hide/>
                                            <YAxis hide/>
                                            <Tooltip contentStyle={{borderRadius: '8px', fontSize: '12px'}}/>
                                            <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#eff6ff" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Logs */}
                            <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
                                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><FileText size={18} className="text-blue-500"/> Service History</h3>
                                <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                                    {selectedAsset.maintenanceLog?.map(log => (
                                        <div key={log.id} className="bg-white p-3 rounded border border-slate-100 shadow-sm text-sm">
                                            <div className="flex justify-between font-bold text-slate-700 mb-1"><span>{log.service}</span><span className="text-xs text-slate-400 font-normal">{log.date}</span></div>
                                            <p className="text-slate-600 text-xs">{log.note}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6 animate-fadeIn relative">
            {renderAssetModal()}
            <div className="flex space-x-4 bg-white p-2 rounded-xl shadow-sm border border-slate-200">
                <button onClick={() => setActiveTab('OPS')} className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'OPS' ? 'bg-sky-100 text-sky-700' : 'text-slate-500 hover:bg-slate-50'}`}><Radio size={16} /> <span>Live Operations</span></button>
                <button onClick={() => setActiveTab('SIM')} className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'SIM' ? 'bg-purple-100 text-purple-700' : 'text-slate-500 hover:bg-slate-50'}`}><Crosshair size={16} /> <span>Simulation</span></button>
                <button onClick={() => setActiveTab('HANGAR')} className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'HANGAR' ? 'bg-orange-100 text-orange-700' : 'text-slate-500 hover:bg-slate-50'}`}><PenTool size={16} /> <span>Hangar</span></button>
            </div>

            {activeTab === 'OPS' && (
                <div className="space-y-6">
                    <div className="bg-slate-900 rounded-xl p-6 relative overflow-hidden shadow-lg border border-slate-800 min-h-[550px]">
                        <div className="flex justify-between items-start relative z-10 mb-4">
                            <div><h3 className="text-white font-bold flex items-center gap-2"><Map size={18} className="text-sky-400"/> Sector 7 Airspace</h3></div>
                            <div className="flex items-center gap-2 flex-wrap justify-end">
                                 <button onClick={() => setSwarmMode(!swarmMode)} className={`px-2 py-1 rounded text-[10px] font-bold border ${swarmMode ? 'bg-purple-600 border-purple-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>Swarm</button>
                                 <button onClick={() => setShowNoFlyZones(!showNoFlyZones)} className={`px-2 py-1 rounded text-[10px] font-bold border ${showNoFlyZones ? 'bg-red-900/50 border-red-500 text-red-200' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>No-Fly</button>
                                 <button onClick={() => setShowWeatherRadar(!showWeatherRadar)} className={`px-2 py-1 rounded text-[10px] font-bold border ${showWeatherRadar ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>Radar</button>
                                 <button onClick={() => setShowBirdStrike(!showBirdStrike)} className={`px-2 py-1 rounded text-[10px] font-bold border ${showBirdStrike ? 'bg-green-600 border-green-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}><Bird size={12}/> Birds</button>
                                 <button onClick={() => setShowSonicBoom(!showSonicBoom)} className={`px-2 py-1 rounded text-[10px] font-bold border ${showSonicBoom ? 'bg-yellow-600 border-yellow-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}><Volume2 size={12}/> Sonic</button>
                            </div>
                        </div>

                        <div className="absolute inset-0 z-0" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
                        {showWeatherRadar && <div className="absolute inset-0 z-0 pointer-events-none opacity-30 animate-pulse" style={{background: 'radial-gradient(circle at 70% 30%, rgba(37, 99, 235, 0.5), transparent 60%)'}}></div>}

                        {airspaceEvents.map(evt => {
                            if (evt.type === 'NO_FLY' && !showNoFlyZones) return null;
                            if (evt.type === 'BIRD_STRIKE' && !showBirdStrike) return null;
                            if (evt.type === 'SONIC_BOOM' && !showSonicBoom) return null;
                            
                            let style = '';
                            if (evt.type === 'TFR') style = 'rounded-full bg-red-500/10 border-red-500/30';
                            if (evt.type === 'NO_FLY') style = 'bg-orange-500/10 border-orange-500/50 skew-x-12 border-dashed';
                            if (evt.type === 'BIRD_STRIKE') style = 'rounded-full bg-green-500/10 border-green-500/30';
                            if (evt.type === 'SONIC_BOOM') style = 'bg-yellow-500/5 border-l-4 border-yellow-500';

                            return (
                                <div key={evt.id} className={`absolute z-0 flex items-center justify-center border animate-pulse ${style}`} style={{top: `${evt.top}%`, left: `${evt.left}%`, width: `${evt.width}%`, height: `${evt.height}%`}}>
                                    <span className="text-[10px] font-bold text-white/50">{evt.label}</span>
                                </div>
                            );
                        })}

                        <div className="relative w-full h-full z-10 pointer-events-none">
                            {assets.filter(a => a.status === 'IN_FLIGHT').map((asset, index) => (
                                <div key={asset.id} className="absolute transition-all duration-[2000ms] ease-linear flex flex-col items-center group pointer-events-auto cursor-pointer" 
                                     style={{top: `${20 + (index * 30)}%`, left: `${20 + (index * 25)}%`, transform: swarmMode ? `translate(0px, 0px)` : `translate(${Math.random() * 20}px, ${Math.random() * 20}px)`}}
                                     onClick={() => setSelectedAsset(asset)}>
                                    <div className={`p-1.5 rounded-full shadow-lg ${swarmMode ? 'bg-purple-500' : 'bg-sky-500 animate-pulse'}`}><Plane size={14} className="text-white transform rotate-45" /></div>
                                    {/* Runway Incursion Warning simulated on one asset */}
                                    {index === 0 && <div className="absolute -top-6 bg-red-600 text-white text-[8px] px-1 rounded animate-bounce">RUNWAY INCURSION</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {activeTab !== 'OPS' && <div className="bg-slate-100 p-12 text-center rounded-xl border border-dashed border-slate-300 text-slate-400">Module View Placeholder</div>}
        </div>
    );
};

export default AviationDashboard;
