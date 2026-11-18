Original name: DispatchHub.tsx
Drive ID: 1FQSGh3lUZwoIBG8WEwlkOoqDLj_jsFsI
Parent folder: My Drive/MAF/t.h.e.l.m.a.-ai-core-&-modules (2)/components/modules/
Modified: 2026-01-31T10:56:50.000Z


import React, { useState } from 'react';
import { 
    Truck, Plane, Ship, MapPin, Search, Filter, ArrowLeft, RefreshCw, Layers, DollarSign, Users, Zap, CheckCircle2, AlertTriangle, Clock, ChevronRight, Package, UserCheck, X, Check, ShieldCheck, Printer, FileText, Share2
} from 'lucide-react';
import { DispatchOrder, Bid, ModuleType } from '../../types';

interface DispatchHubProps {
    onBack?: () => void;
}

const mockOrders: DispatchOrder[] = [
    { id: 'ORD-9921', client: 'TechGlobal Inc', origin: 'San Francisco, CA', destination: 'Austin, TX', priority: 'STANDARD', domain: 'LAND', status: 'IN_TRANSIT', payload: 'Server Racks (12u)', assignedAssetId: 'F-101', value: 45000, eta: '14:00', bids: [] },
    { id: 'ORD-9922', client: 'BioMed Central', origin: 'Boston, MA', destination: 'New York, NY', priority: 'CRITICAL', domain: 'AIR', status: 'PENDING', payload: 'Organ Transplant Box', value: 150000, bids: [{ id: 'b1', driverName: 'Marcus Cole', driverId: 'BEE-102', amount: 1200, timestamp: '14:30', status: 'PENDING' }] },
    { id: 'ORD-9923', client: 'Pacific Retail', origin: 'Shanghai, CN', destination: 'Long Beach, CA', priority: 'STANDARD', domain: 'SEA', status: 'ASSIGNED', payload: 'Consumer Electronics (40ft)', assignedAssetId: 'S-4', value: 85000, eta: '4 Days', bids: [] },
    { id: 'ORD-9924', client: 'AutoParts Direct', origin: 'Detroit, MI', destination: 'Chicago, IL', priority: 'EXPEDITED', domain: 'LAND', status: 'PENDING', payload: 'Transmission Units', value: 12000, bids: [] },
];

const DispatchHub: React.FC<DispatchHubProps> = ({ onBack }) => {
    const [orders, setOrders] = useState<DispatchOrder[]>(mockOrders);
    const [selectedOrder, setSelectedOrder] = useState<DispatchOrder | null>(null);
    const [bidAmount, setBidAmount] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isGeneratingBOL, setIsGeneratingBOL] = useState(false);

    const submitBid = () => {
        if (!selectedOrder || !bidAmount) return;
        setIsProcessing(true);
        setTimeout(() => {
            const newBid: Bid = { 
                id: `BID-${Date.now()}`,
                driverName: 'Steve Henry (You)', 
                driverId: 'BEE-001',
                amount: parseFloat(bidAmount), 
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: 'PENDING'
            };
            setOrders(prev => prev.map(o => o.id === selectedOrder.id ? { ...o, bids: [...(o.bids || []), newBid] } : o));
            setSelectedOrder(prev => prev ? { ...prev, bids: [...(prev.bids || []), newBid] } : null);
            setIsProcessing(false);
            setBidAmount('');
        }, 1200);
    };

    const finalizeDispatch = (bid: Bid) => {
        if (!selectedOrder) return;
        setIsProcessing(true);
        setTimeout(() => {
            setOrders(prev => prev.map(o => o.id === selectedOrder.id ? { 
                ...o, 
                status: 'ASSIGNED', 
                assignedAssetId: bid.driverId === 'BEE-001' ? 'T-900' : 'F-102'
            } : o));
            setSelectedOrder(prev => prev ? { ...prev, status: 'ASSIGNED', assignedAssetId: bid.driverId === 'BEE-001' ? 'T-900' : 'F-102' } : null);
            setIsProcessing(false);
        }, 1500);
    };

    const generateBOL = () => {
        setIsGeneratingBOL(true);
        setTimeout(() => {
            setIsGeneratingBOL(false);
            alert(`BOL Generated for ${selectedOrder?.id}. Sent to Federation Cloud Drive.`);
        }, 2000);
    };

    return (
        <div className="p-4 md:p-8 space-y-6 animate-fadeIn pb-12 flex flex-col h-full bg-slate-50 dark:bg-slate-950 transition-colors">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <button onClick={onBack} className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-blue-600 shadow-sm transition-all"><ArrowLeft size={20} /></button>
                    )}
                    <div>
                        <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">T.H.E.L.M.A. Load Board</h1>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                            <Layers size={12} className="text-blue-500"/> Real-Time Logistics Mesh • v4.0.0 Active
                        </p>
                    </div>
                </div>
                <div className="bg-blue-600 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-lg shadow-blue-500/20">
                    <DollarSign size={18} />
                    <div className="text-left leading-none">
                        <p className="text-[8px] font-black uppercase text-blue-200">Revenue Yield</p>
                        <p className="text-base font-black font-mono">$1.42M</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0 overflow-hidden">
                <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden transition-colors">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50 dark:bg-slate-950/50">
                        <div className="relative w-full max-w-sm">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Search manifests, origins, destinations..." 
                                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[10px] font-black uppercase text-slate-600 dark:text-slate-300"><Filter size={14}/> Domain</button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[10px] font-black uppercase text-slate-600 dark:text-slate-300"><RefreshCw size={14}/> Sync</button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto no-scrollbar">
                        <table className="w-full text-left">
                            <thead className="sticky top-0 bg-white dark:bg-slate-900 z-10 text-[9px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-100 dark:border-slate-800">
                                <tr>
                                    <th className="px-6 py-4">Load Identification</th>
                                    <th className="px-6 py-4">Status & Domain</th>
                                    <th className="px-6 py-4">Current Bids</th>
                                    <th className="px-6 py-4">Est. Value</th>
                                    <th className="px-6 py-4 text-right">Field Unit</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs">
                                {orders.map(order => (
                                    <tr key={order.id} onClick={() => setSelectedOrder(order)} className={`group cursor-pointer border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${selectedOrder?.id === order.id ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl group-hover:bg-blue-100 transition-colors">
                                                    {order.domain === 'LAND' ? <Truck size={20}/> : order.domain === 'AIR' ? <Plane size={20}/> : <Ship size={20}/>}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900 dark:text-white uppercase tracking-tight">{order.id}</p>
                                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{order.client}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                                                    order.status === 'PENDING' ? 'bg-orange-100 text-orange-600' : 
                                                    order.status === 'ASSIGNED' ? 'bg-blue-100 text-blue-600' :
                                                    'bg-emerald-100 text-emerald-600'
                                                }`}>{order.status}</span>
                                                <p className="text-[9px] text-slate-400 uppercase font-black flex items-center gap-1"><MapPin size={10}/> {order.origin.split(',')[0]}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1 font-mono font-bold text-blue-600">
                                                <Users size={12}/> {order.bids?.length || 0} active
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-mono font-black text-slate-800 dark:text-white">${order.value.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right">
                                            {order.assignedAssetId ? (
                                                <span className="bg-slate-900 text-white px-3 py-1 rounded-lg font-mono text-[10px]">{order.assignedAssetId}</span>
                                            ) : (
                                                <span className="text-slate-300 font-black uppercase text-[10px]">Unassigned</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="lg:col-span-1 h-full flex flex-col">
                    {selectedOrder ? (
                        <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden animate-slideInRight flex flex-col h-full transition-colors">
                            <div className="p-8 bg-slate-900 text-white shrink-0 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full group-hover:bg-blue-500/20 transition-all"></div>
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <h3 className="text-2xl font-black uppercase tracking-tighter">{selectedOrder.id}</h3>
                                        <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={20}/></button>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white/10 rounded-xl"><Package size={18} className="text-blue-400"/></div>
                                            <div>
                                                <p className="text-[10px] text-slate-400 uppercase font-black">Manifest Payload</p>
                                                <p className="text-sm font-bold uppercase">{selectedOrder.payload}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex flex-col items-center gap-1 pt-1">
                                            <div className="w-3 h-3 rounded-full border-2 border-blue-500"></div>
                                            <div className="w-0.5 h-12 bg-slate-200 dark:bg-slate-800"></div>
                                            <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div>
                                        </div>
                                        <div className="flex-1 space-y-6">
                                            <div>
                                                <p className="text-[9px] text-slate-400 uppercase font-black">Origin Pulse</p>
                                                <p className="text-sm font-bold text-slate-800 dark:text-white uppercase">{selectedOrder.origin}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] text-slate-400 uppercase font-black">Destination Beacon</p>
                                                <p className="text-sm font-bold text-slate-800 dark:text-white uppercase">{selectedOrder.destination}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {selectedOrder.status === 'PENDING' ? (
                                    <div className="space-y-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                                        <div className="flex justify-between items-center">
                                            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2"><Zap size={14} className="text-yellow-500"/> Hall of Bids</h4>
                                            <span className="text-[9px] font-mono text-blue-500 font-black uppercase">{selectedOrder.bids.length} entries</span>
                                        </div>
                                        <div className="space-y-2">
                                            {selectedOrder.bids.map((bid, i) => (
                                                <div key={i} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 group hover:border-blue-400 transition-all">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center font-black text-[10px] text-blue-600 shadow-sm">{bid.driverName[0]}</div>
                                                        <div>
                                                            <p className="text-[10px] font-black text-slate-800 dark:text-white uppercase leading-none">{bid.driverName}</p>
                                                            <p className="text-[8px] text-slate-400 font-mono mt-1">{bid.timestamp}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono font-black text-blue-600 mr-2">${bid.amount}</span>
                                                        <button 
                                                            onClick={() => finalizeDispatch(bid)}
                                                            className="p-2 bg-emerald-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-md"
                                                            title="Assign Manifest"
                                                        >
                                                            <UserCheck size={14}/>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="pt-6 space-y-4 border-t border-slate-100 dark:border-slate-800">
                                            <div className="relative">
                                                <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
                                                <input 
                                                    type="number" 
                                                    value={bidAmount} 
                                                    onChange={(e) => setBidAmount(e.target.value)} 
                                                    placeholder="Enter Bid Amount" 
                                                    className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-black outline-none focus:border-blue-600 transition-all"
                                                />
                                            </div>
                                            <button 
                                                onClick={submitBid} 
                                                disabled={isProcessing || !bidAmount} 
                                                className="w-full py-5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-3"
                                            >
                                                {isProcessing ? <RefreshCw className="animate-spin" size={20}/> : <ShieldCheck size={20}/>} Submit Neural Bid
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="pt-6 flex flex-col items-center text-center animate-fadeIn space-y-6">
                                        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center shadow-xl border-4 border-emerald-500/20">
                                            <ShieldCheck size={40} />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">Dispatch Locked</h4>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">Unit Assigned: {selectedOrder.assignedAssetId}</p>
                                        </div>
                                        
                                        <div className="w-full space-y-3">
                                            <button 
                                                onClick={generateBOL}
                                                disabled={isGeneratingBOL}
                                                className="w-full py-4 bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-lg active:scale-95"
                                            >
                                                {isGeneratingBOL ? <RefreshCw className="animate-spin" size={16}/> : <FileText size={16}/>}
                                                {isGeneratingBOL ? 'PROCESSING BOL...' : 'Generate Digital BOL'}
                                            </button>
                                            <button className="w-full py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                                                <Share2 size={16}/> Share Manifest
                                            </button>
                                        </div>

                                        <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl w-full">
                                            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Status Pulse</p>
                                            <p className="text-sm font-bold text-blue-600 uppercase animate-pulse">Synchronizing Telemetry...</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full bg-slate-100/50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-slate-400 p-12 text-center transition-colors">
                            <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-[2rem] flex items-center justify-center shadow-lg mb-6 text-slate-300">
                                <Layers size={40} className="animate-pulse"/>
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] leading-relaxed">Select a manifest from the federation board to initiate the neural bidding hall.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DispatchHub;
