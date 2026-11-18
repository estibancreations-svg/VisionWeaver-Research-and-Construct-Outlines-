Original name: NetZeroHub.tsx
Drive ID: 1hmlKT1bMxetZg4vw2SD5s_tI7gsK6xav
Parent folder: My Drive/MAF/Google AI Studio 1/t.h.e.l.m.a.-ai-core-&-modules (2)/components/modules/
Modified: 2026-01-31T10:56:50.000Z


import React, { useState, useEffect } from 'react';
import { Leaf, Wind, Sun, Battery, DollarSign, Award, Database, Zap, TrendingUp, Cpu, X, RefreshCw, Lock, ArrowRight, CheckCircle2, AlertTriangle, ArrowLeft, ArrowUpRight, ArrowDownRight, ShieldCheck, Orbit } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface NetZeroHubProps {
  onBack?: () => void;
}

const solarData = [
  { time: '6am', yield: 10, forecast: 12 }, { time: '9am', yield: 45, forecast: 48 }, { time: '12pm', yield: 88, forecast: 95 }, { time: '3pm', yield: 65, forecast: 62 }, { time: '6pm', yield: 20, forecast: 18 }
];

const batteryData = [
    { id: 'BAT-01', health: 92, temp: 24, cycles: 410 },
    { id: 'BAT-02', health: 88, temp: 26, cycles: 850 },
    { id: 'BAT-03', health: 95, temp: 23, cycles: 120 },
    { id: 'BAT-04', health: 78, temp: 28, cycles: 1240 },
];

const NetZeroHub: React.FC<NetZeroHubProps> = ({ onBack }) => {
  // Feature 1: Live Emission Integration (H.E.N.R.Y. Link)
  const [liveEmissions, setLiveEmissions] = useState(14520.45);
  const [emissionRate, setEmissionRate] = useState(0.05);

  // Feature 2: Interactive Marketplace
  const [credits, setCredits] = useState(4822);
  const [balance, setBalance] = useState(1250000); // 1.25M Budget
  const [showMarket, setShowMarket] = useState(false);
  const [creditPrice, setCreditPrice] = useState(145.50);
  const [tradeAmount, setTradeAmount] = useState(100);
  const [transactionLog, setTransactionLog] = useState([
    { id: 'TX-8821', type: 'PURCHASE', amt: '+400', partner: 'SolarFarm_X', status: 'VERIFIED' },
    { id: 'TX-8819', type: 'RETIRING', amt: '-120', partner: 'Fleet_Emission_Q1', status: 'LOCKED' },
    { id: 'TX-8812', type: 'TRANSFER', amt: '+200', partner: 'Wind_Mesh_09', status: 'VERIFIED' }
  ]);
  
  // Feature 3: Predictive Modeling
  const [isForecasting, setIsForecasting] = useState(false);
  
  // Feature 4: Hardware/IoT Interaction
  const [selectedHardware, setSelectedHardware] = useState<string | null>(null);
  const [diagnosticsState, setDiagnosticsState] = useState<'IDLE'|'RUNNING'|'COMPLETE'>('IDLE');
  
  // Feature 5: Smart Contract Verification
  const [auditHash, setAuditHash] = useState<string | null>(null);
  const [isGeneratingAudit, setIsGeneratingAudit] = useState(false);

  // Project Z integration
  const [projectZOffset, setProjectZOffset] = useState(0);

  // 1. Live Emission Ticker
  useEffect(() => {
    const interval = setInterval(() => {
        // Simulating live fleet data coming from H.E.N.R.Y.
        const fluctuation = Math.random() * 0.02;
        // Project Z passive offset (Antigravity has 0 emissions)
        const zOffset = 0.01; 
        
        setLiveEmissions(prev => prev + emissionRate + fluctuation - zOffset);
        setProjectZOffset(prev => prev + zOffset);
        
        // Randomly update credit price
        setCreditPrice(prev => Math.max(50, prev + (Math.random() - 0.5) * 2));
    }, 1000);
    return () => clearInterval(interval);
  }, [emissionRate]);

  // 2. Marketplace Logic
  const executeTrade = (type: 'BUY' | 'SELL') => {
      const cost = tradeAmount * creditPrice;
      if (type === 'BUY') {
          if (balance >= cost) {
              setBalance(prev => prev - cost);
              setCredits(prev => prev + tradeAmount);
              setTransactionLog(prev => [{ id: `TX-${Math.floor(Math.random()*9000)}`, type: 'PURCHASE', amt: `+${tradeAmount}`, partner: 'Market_Spot', status: 'VERIFIED' }, ...prev]);
          }
      } else {
          if (credits >= tradeAmount) {
              setBalance(prev => prev + cost);
              setCredits(prev => prev - tradeAmount);
              setTransactionLog(prev => [{ id: `TX-${Math.floor(Math.random()*9000)}`, type: 'SELL', amt: `-${tradeAmount}`, partner: 'Market_Spot', status: 'VERIFIED' }, ...prev]);
          }
      }
  };

  // 4. IoT Diagnostics Logic
  const runDiagnostics = () => {
      setDiagnosticsState('RUNNING');
      setTimeout(() => {
          setDiagnosticsState('COMPLETE');
      }, 2500);
  };

  // 5. Smart Contract Logic
  const generateSmartContract = () => {
      setIsGeneratingAudit(true);
      setTimeout(() => {
          const mockHash = "0x" + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');
          setAuditHash(mockHash);
          setIsGeneratingAudit(false);
      }, 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12 relative">
       {/* Feature 2: Marketplace Modal */}
       {showMarket && (
           <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center animate-fadeIn p-4">
               <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                   <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                       <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-widest flex items-center gap-2">
                           <Database size={18} className="text-blue-500"/> Carbon Exchange
                       </h3>
                       <button onClick={() => setShowMarket(false)} className="text-slate-400 hover:text-red-500 transition-colors"><X size={20}/></button>
                   </div>
                   <div className="p-8 space-y-8">
                       <div className="flex justify-between items-end">
                           <div>
                               <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Spot Price (1 Ton CO2)</p>
                               <p className="text-3xl font-black font-mono text-slate-900 dark:text-white">${creditPrice.toFixed(2)}</p>
                           </div>
                           <div className={`flex items-center gap-1 text-xs font-bold ${creditPrice > 145 ? 'text-green-500' : 'text-red-500'}`}>
                               {creditPrice > 145 ? <ArrowUpRight size={16}/> : <ArrowDownRight size={16}/>}
                               {Math.abs(creditPrice - 145).toFixed(2)}%
                           </div>
                       </div>
                       
                       <div className="space-y-4">
                           <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
                               <span>Available Budget: ${balance.toLocaleString()}</span>
                               <span>Holdings: {credits.toLocaleString()} Credits</span>
                           </div>
                           <input 
                               type="range" 
                               min="10" 
                               max="1000" 
                               step="10"
                               value={tradeAmount}
                               onChange={(e) => setTradeAmount(parseInt(e.target.value))}
                               className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                           />
                           <div className="text-center font-mono font-bold text-xl text-slate-800 dark:text-white">
                               {tradeAmount} Credits
                           </div>
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                           <button 
                                onClick={() => executeTrade('BUY')}
                                className="py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black uppercase tracking-widest text-xs shadow-lg transition-all active:scale-95"
                           >
                               Buy (${(tradeAmount * creditPrice).toLocaleString()})
                           </button>
                           <button 
                                onClick={() => executeTrade('SELL')}
                                className="py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl font-black uppercase tracking-widest text-xs shadow-lg transition-all active:scale-95"
                           >
                               Sell (${(tradeAmount * creditPrice).toLocaleString()})
                           </button>
                       </div>
                   </div>
               </div>
           </div>
       )}

       {/* Feature 4: IoT Diagnostics Modal */}
       {selectedHardware && (
           <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center animate-fadeIn p-4">
               <div className="bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-700 overflow-hidden text-white relative">
                   <div className="p-8 relative z-10">
                       <div className="flex justify-between items-start mb-8">
                           <div>
                               <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Hardware Diagnostics</h3>
                               <p className="text-sm text-slate-400 font-mono">ASSET_ID: {selectedHardware}</p>
                           </div>
                           <button onClick={() => { setSelectedHardware(null); setDiagnosticsState('IDLE'); }} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={24}/></button>
                       </div>

                       {diagnosticsState === 'IDLE' && (
                           <div className="text-center py-12">
                               <Cpu size={64} className="mx-auto text-slate-600 mb-6" />
                               <p className="text-slate-400 mb-8 max-w-md mx-auto">Initiate deep-layer packet inspection and cell-level voltage analysis on this asset.</p>
                               <button 
                                   onClick={runDiagnostics}
                                   className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all hover:scale-105"
                               >
                                   Initialize Scan sequence
                               </button>
                           </div>
                       )}

                       {diagnosticsState === 'RUNNING' && (
                           <div className="text-center py-12">
                               <RefreshCw size={64} className="mx-auto text-blue-500 animate-spin mb-6" />
                               <p className="text-blue-400 font-black uppercase tracking-widest animate-pulse">Running Diagnostic Mesh...</p>
                               <div className="mt-8 max-w-md mx-auto space-y-2">
                                   <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                                       <div className="h-full bg-blue-500 w-2/3 animate-[progress_2s_ease-in-out_infinite]"></div>
                                   </div>
                                   <div className="flex justify-between text-[10px] font-mono text-slate-500">
                                       <span>CHECKING_FIRMWARE</span>
                                       <span>OK</span>
                                   </div>
                               </div>
                           </div>
                       )}

                       {diagnosticsState === 'COMPLETE' && (
                           <div className="grid grid-cols-2 gap-6 animate-fadeIn">
                               <div className="p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-xl">
                                   <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Health Score</p>
                                   <p className="text-3xl font-black">98.4%</p>
                               </div>
                               <div className="p-4 bg-slate-800 border border-slate-700 rounded-xl">
                                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Temp Delta</p>
                                   <p className="text-3xl font-black">+2.1°C</p>
                               </div>
                               <div className="col-span-2 p-4 bg-slate-800 border border-slate-700 rounded-xl">
                                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Logs</p>
                                   <div className="font-mono text-[10px] text-slate-300 space-y-1">
                                       <p>> [INFO] Cell balancing nominal.</p>
                                       <p>> [INFO] Inverter efficiency at 96%.</p>
                                       <p className="text-emerald-400">> [SUCCESS] No critical faults found.</p>
                                   </div>
                               </div>
                           </div>
                       )}
                   </div>
                   <div className="absolute inset-0 bg-blue-600/5 pointer-events-none"></div>
               </div>
           </div>
       )}

       {/* Hero Section with Feature 1: Live Emissions */}
       <div className="bg-emerald-900 rounded-3xl p-6 md:p-10 text-white shadow-xl relative overflow-hidden border border-emerald-800 transition-all">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
             <div className="flex items-center gap-4">
                 {onBack && (
                    <button 
                        onClick={onBack}
                        className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all shadow-sm shrink-0 backdrop-blur-md border border-white/10"
                    >
                        <ArrowLeft size={20} />
                    </button>
                 )}
                 <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Leaf size={32} className="text-emerald-400" />
                        <h1 className="text-xl md:text-3xl font-black uppercase tracking-tight">Net Zero Command • v4.0.0</h1>
                    </div>
                    <p className="text-emerald-200 text-xs md:text-sm font-medium">
                        ESG Core • H.E.N.R.Y. Telemetry Link: <span className="text-white font-bold animate-pulse">ACTIVE</span>
                    </p>
                 </div>
             </div>
             
             <div className="flex gap-4">
                 <div className="bg-black/20 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-white/10 text-center min-w-[140px]">
                    <p className="text-[10px] font-black text-emerald-300 uppercase tracking-widest mb-1">Live Carbon Output</p>
                    <p className="text-xl md:text-3xl font-black font-mono text-white">{liveEmissions.toFixed(2)} <span className="text-xs text-emerald-400">t/CO2</span></p>
                 </div>
                 <div className="bg-purple-900/30 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-purple-500/30 text-center min-w-[140px]">
                    <p className="text-[10px] font-black text-purple-300 uppercase tracking-widest mb-1 flex items-center justify-center gap-1"><Orbit size={10}/> Project Z Offset</p>
                    <p className="text-xl md:text-3xl font-black font-mono text-white">{projectZOffset.toFixed(3)}</p>
                 </div>
             </div>
          </div>
          <Wind className="absolute right-[-20px] bottom-[-40px] opacity-10" size={200} />
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Feature 3: Predictive Forecasting */}
                  <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors relative overflow-hidden group">
                     <div className="flex justify-between items-start mb-6">
                         <h3 className="font-black text-slate-800 dark:text-white flex items-center gap-3 uppercase text-[10px] tracking-widest">
                            <Sun size={18} className="text-orange-500"/> Solar Matrix
                         </h3>
                         <button 
                            onClick={() => setIsForecasting(!isForecasting)} 
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all border ${isForecasting ? 'bg-violet-600 text-white border-violet-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'}`}
                         >
                            <TrendingUp size={12} /> {isForecasting ? 'Forecast On' : 'Forecast Off'}
                         </button>
                     </div>
                     <div className="h-44 relative z-10" onClick={() => setSelectedHardware('SOLAR_ARRAY_MAIN')}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={solarData}>
                                <defs>
                                    <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" opacity={0.1} />
                                <XAxis dataKey="time" hide />
                                <YAxis hide domain={[0, 120]} />
                                <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '12px', border: 'none' }} />
                                <Area type="monotone" dataKey="yield" stroke="#f97316" strokeWidth={3} fill="url(#colorYield)" />
                                {isForecasting && (
                                    <Area type="monotone" dataKey="forecast" stroke="#8b5cf6" strokeWidth={3} strokeDasharray="5 5" fill="url(#colorForecast)" />
                                )}
                            </AreaChart>
                        </ResponsiveContainer>
                     </div>
                     {isForecasting && <div className="absolute bottom-4 right-4 text-[9px] font-black text-violet-500 bg-violet-50 dark:bg-violet-900/20 px-2 py-1 rounded border border-violet-200 dark:border-violet-800 uppercase animate-pulse">AI Prediction Active</div>}
                  </div>

                  {/* Feature 4: Interactive Hardware */}
                  <div 
                    onClick={() => setSelectedHardware('BATTERY_CLUSTER_ALPHA')}
                    className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:border-emerald-500 cursor-pointer group relative overflow-hidden"
                  >
                     <h3 className="font-black text-slate-800 dark:text-white mb-6 flex items-center gap-3 uppercase text-[10px] tracking-widest relative z-10">
                        <Battery size={18} className="text-emerald-600"/> Energy Storage
                     </h3>
                     <div className="space-y-4 relative z-10">
                        {batteryData.map((bat, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="text-[9px] font-mono text-slate-400 w-12">{bat.id}</span>
                                <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                    <div className="bg-emerald-500 h-full transition-all group-hover:bg-emerald-400" style={{ width: `${bat.health}%` }}></div>
                                </div>
                                <span className="text-[9px] font-black text-slate-700 dark:text-white">{bat.health}%</span>
                            </div>
                        ))}
                     </div>
                     <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors"></div>
                     <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-[9px] font-black text-emerald-600 uppercase flex items-center gap-1">
                        Run Diagnostics <ArrowRight size={12} />
                     </div>
                  </div>
              </div>

              {/* Transaction Ledger */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                  <div className="flex justify-between items-center mb-8">
                      <h3 className="font-black text-slate-800 dark:text-white uppercase text-[12px] tracking-[0.2em] flex items-center gap-3">
                        <Database size={20} className="text-blue-500"/> Carbon Offset Ledger
                      </h3>
                      <button 
                        onClick={() => setShowMarket(true)}
                        className="flex items-center gap-2 bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-md hover:scale-105 transition-transform active:scale-95"
                      >
                        <Zap size={14} /> Trade Credits
                      </button>
                  </div>
                  <div className="space-y-3">
                      {transactionLog.map(tx => (
                        <div key={tx.id} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-between transition-all hover:border-blue-400 animate-slideInRight">
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-lg ${tx.amt.startsWith('+') ? 'bg-emerald-100 text-emerald-600' : tx.type === 'SELL' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>
                                    <DollarSign size={16} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-800 dark:text-white uppercase tracking-tight">{tx.type} • {tx.id}</p>
                                    <p className="text-[9px] text-slate-400 font-mono">{tx.partner}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`text-sm font-black font-mono ${tx.amt.startsWith('+') ? 'text-emerald-500' : tx.type === 'SELL' ? 'text-blue-500' : 'text-red-500'}`}>{tx.amt}</p>
                                <p className="text-[8px] font-black text-slate-500 uppercase flex items-center gap-1 justify-end">
                                    <ShieldCheck size={10}/> {tx.status}
                                </p>
                            </div>
                        </div>
                      ))}
                  </div>
              </div>
          </div>

          <div className="space-y-6">
              {/* Feature 5: Smart Contract Audit */}
              <div className="bg-slate-900 text-white p-8 rounded-[40px] border border-slate-800 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[80px] rounded-full"></div>
                  <h3 className="font-black text-[10px] uppercase tracking-widest mb-10 flex items-center gap-3 text-emerald-400">
                    <Award size={20} className="animate-pulse" /> Compliance Core
                  </h3>
                  <div className="space-y-8 relative z-10">
                      <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Carbon Tax Liability</p>
                          <p className="text-3xl font-black font-mono leading-none">${(12450 - (credits * 0.5)).toLocaleString()}</p>
                          <p className="text-xs font-bold text-red-400 mt-2 uppercase tracking-tighter">Est. payment due Q1 2026</p>
                      </div>
                      
                      {auditHash ? (
                          <div className="p-4 bg-emerald-900/30 border border-emerald-500/30 rounded-2xl animate-fadeIn">
                              <div className="flex items-center gap-2 mb-2">
                                  <CheckCircle2 size={16} className="text-emerald-500"/>
                                  <span className="text-[10px] font-black uppercase text-emerald-500">Audit Committed</span>
                              </div>
                              <p className="font-mono text-[8px] text-slate-400 break-all">{auditHash}</p>
                          </div>
                      ) : (
                        <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                            <div className="flex items-center gap-3 mb-3">
                                <Lock size={20} className="text-emerald-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Smart Contract</span>
                            </div>
                            <p className="text-[9px] text-slate-400 leading-relaxed italic">
                                Ready to hash current credit holdings and emissions data to the T.H.E.L.M.A. permissioned ledger.
                            </p>
                        </div>
                      )}
                  </div>
                  <button 
                    onClick={generateSmartContract}
                    disabled={isGeneratingAudit || !!auditHash}
                    className="w-full mt-10 py-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-emerald-900/40 flex items-center justify-center gap-2"
                  >
                      {isGeneratingAudit ? <RefreshCw className="animate-spin" size={14}/> : <ShieldCheck size={14}/>}
                      {isGeneratingAudit ? 'Hashing...' : auditHash ? 'Secured' : 'Generate ESG Audit'}
                  </button>
              </div>

              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                  <h3 className="font-black text-slate-800 dark:text-white text-[10px] uppercase tracking-widest mb-6 flex items-center gap-2">
                    <ShieldCheck size={18} className="text-blue-500" /> Mesh Policy
                  </h3>
                  <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/10 rounded-xl">
                          <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
                          <p className="text-[9px] text-slate-600 dark:text-slate-400 leading-relaxed font-bold uppercase">
                              [P.E.R.C.Y.] Warning: 14 Tons of unverified offsets detected in legacy systems. Not included in ledger.
                          </p>
                      </div>
                      <p className="text-[9px] text-slate-500 leading-relaxed font-bold uppercase">
                          All credit transactions are locked to the T.H.E.L.M.A. blockchain.
                      </p>
                  </div>
              </div>
          </div>
       </div>
    </div>
  );
};

export default NetZeroHub;
