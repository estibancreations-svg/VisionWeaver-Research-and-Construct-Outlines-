Original name: Communications.tsx
Drive ID: 1wwBgwqVwtXqXjPvEy-AXLppfs_rifIon
Parent folder: My Drive/MAF/t.h.e.l.m.a.-ai-core-&-modules (2)/components/modules/
Modified: 2026-01-31T10:56:50.000Z


import React, { useState, useEffect, useRef } from 'react';
import { Radio, Mic, Phone, MessageSquare, Users, Volume2, VolumeX, AlertTriangle, Activity, ArrowLeft, SignalHigh, Wifi, Sliders, Zap, Smartphone, RadioTower, X, SlidersHorizontal, Settings, ShieldAlert, Ear } from 'lucide-react';

interface CommunicationsProps {
  onBack?: () => void;
}

const mockChannels = [
    { id: 'GLOBAL_DISPATCH', name: 'Global Dispatch', users: 142, active: true, type: 'VOICE', freq: '462.5625 MHz' },
    { id: 'TACTICAL_MESH', name: 'Tactical Team Mesh', users: 12, active: true, type: 'ENCRYPTED', freq: '902.1500 MHz' },
    { id: 'THELMA_RELAY', name: 'T.H.E.L.M.A. PTT Relay', users: 24, active: true, type: 'CHIRP', freq: 'SAT-L-BAND' },
    { id: 'DIRECT_WHISPER', name: 'Direct Whisper (L10)', users: 2, active: true, type: 'PRIVATE', freq: 'NULL_HOP' },
];

const Communications: React.FC<CommunicationsProps> = ({ onBack }) => {
    const [selectedChannel, setSelectedChannel] = useState(mockChannels[0]);
    const [isTransmitting, setIsTransmitting] = useState(false);
    const [chirpActive, setChirpActive] = useState(false);
    const [waveform, setWaveform] = useState<number[]>(Array.from({ length: 30 }, () => 4));
    const [squelch, setSquelch] = useState(25);
    const [manualFreq, setManualFreq] = useState(462.5);
    
    const triggerChirp = () => {
        setChirpActive(true);
        setTimeout(() => setChirpActive(false), 800);
    };

    useEffect(() => {
        if (isTransmitting) {
            const interval = setInterval(() => {
                setWaveform(prev => prev.map(() => Math.random() * 50 + 5));
            }, 100);
            return () => clearInterval(interval);
        } else {
            setWaveform(Array.from({ length: 30 }, () => 4));
        }
    }, [isTransmitting]);

    return (
        <div className="p-4 md:p-8 space-y-6 animate-fadeIn h-full flex flex-col pb-12 relative bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden">
            {chirpActive && (
                <div className="fixed inset-0 z-[600] flex items-center justify-center pointer-events-none">
                    <div className="w-96 h-96 bg-yellow-500/20 rounded-full animate-ping flex items-center justify-center">
                        <div className="w-64 h-64 bg-yellow-500/40 rounded-full animate-ping"></div>
                    </div>
                    <div className="bg-yellow-500 text-black px-12 py-6 rounded-[3rem] font-black text-4xl animate-bounce shadow-[0_20px_100px_rgba(234,179,8,0.4)] border-4 border-black/10">
                        CHIRP!
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <button onClick={onBack} className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-blue-600 shadow-sm transition-all"><ArrowLeft size={20} /></button>
                    )}
                    <div>
                        <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">T.H.E.L.M.A. Comms Matrix</h1>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                            <RadioTower size={12} className="text-blue-500"/> Direct Link • Hybrid Sat/Radio Active
                        </p>
                    </div>
                </div>
                <div className="bg-slate-900 dark:bg-slate-800 p-4 rounded-2xl border border-slate-700 flex items-center gap-8">
                     <div>
                        <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Manual Frequency Tuning</p>
                        <div className="flex items-center gap-3">
                            <input 
                                type="range" min="400" max="999" step="0.1" 
                                value={manualFreq} onChange={(e) => setManualFreq(parseFloat(e.target.value))}
                                className="w-32 h-1.5 bg-slate-700 rounded-full appearance-none accent-blue-500" 
                            />
                            <span className="text-sm font-mono font-black text-blue-400">{manualFreq.toFixed(4)} <span className="text-[8px]">MHz</span></span>
                        </div>
                     </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0 overflow-hidden">
                {/* Channel Sidebar */}
                <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden transition-colors">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex justify-between items-center">
                        <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-widest">RF Channel Roster</h3>
                        <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div><span className="text-[8px] font-black text-slate-400">ONLINE</span></div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
                        {mockChannels.map(channel => (
                            <button 
                                key={channel.id} 
                                onClick={() => setSelectedChannel(channel)} 
                                className={`w-full p-5 rounded-[2rem] flex flex-col transition-all group ${selectedChannel.id === channel.id ? 'bg-blue-600 text-white shadow-xl scale-[1.02]' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                            >
                                <div className="flex items-center gap-4 w-full">
                                    <div className={`p-3 rounded-2xl shrink-0 ${selectedChannel.id === channel.id ? 'bg-blue-500' : 'bg-white dark:bg-slate-900 text-slate-400 group-hover:text-blue-500'} transition-colors`}>
                                        {channel.type === 'CHIRP' ? <Zap size={18}/> : channel.type === 'PRIVATE' ? <ShieldAlert size={18}/> : <Radio size={18}/>}
                                    </div>
                                    <div className="text-left leading-none flex-1">
                                        <p className="text-xs font-black uppercase tracking-tight mb-1">{channel.name}</p>
                                        <p className={`text-[9px] font-bold ${selectedChannel.id === channel.id ? 'text-blue-100' : 'text-slate-400'}`}>{channel.users} Online • {channel.freq}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main PTT Console */}
                <div className="lg:col-span-3 bg-slate-950 rounded-[4rem] border border-slate-800 shadow-2xl flex flex-col overflow-hidden relative transition-all group">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                    
                    <div className="p-10 bg-slate-900/80 backdrop-blur-2xl border-b border-slate-800 flex justify-between items-center z-10">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-[1.5rem] bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                                <RadioTower size={32}/>
                            </div>
                            <div>
                                <h2 className="text-white font-black uppercase text-2xl tracking-tighter mb-1">{selectedChannel.name}</h2>
                                <div className="flex items-center gap-3">
                                    <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div> Link Established</span>
                                    <span className="text-slate-600 text-[9px] font-mono">ENCRYPTION: AES-256-X</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Digital Squelch</p>
                                <input 
                                    type="range" value={squelch} onChange={(e) => setSquelch(parseInt(e.target.value))}
                                    className="w-24 h-1 bg-slate-800 rounded-full appearance-none accent-blue-500" 
                                />
                            </div>
                            <div className="flex items-end gap-1.5 h-14 px-6 bg-black/40 rounded-3xl border border-white/5">
                                {waveform.map((h, i) => (
                                    <div key={i} className="w-1 bg-blue-500 rounded-full transition-all duration-75" style={{ height: `${h}%` }}></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 p-12 flex flex-col items-center justify-center space-y-12 z-10">
                        <div className="flex flex-col items-center gap-10">
                            <div className="relative">
                                {isTransmitting && <div className="absolute inset-0 bg-red-600/20 blur-3xl animate-pulse rounded-full scale-150"></div>}
                                <button 
                                    onMouseDown={() => { setIsTransmitting(true); triggerChirp(); }}
                                    onMouseUp={() => setIsTransmitting(false)}
                                    onTouchStart={() => { setIsTransmitting(true); triggerChirp(); }}
                                    onTouchEnd={() => setIsTransmitting(false)}
                                    className={`w-56 h-56 rounded-full border-[16px] flex items-center justify-center transition-all duration-300 shadow-[0_20px_100px_rgba(0,0,0,0.8)] relative z-10 ${isTransmitting ? 'bg-red-600 border-red-900 scale-90 shadow-red-500/60' : 'bg-slate-800 border-slate-700 hover:border-slate-500 active:scale-95'}`}
                                >
                                    <Mic size={80} className={`text-white transition-all ${isTransmitting ? 'scale-110' : ''}`} />
                                </button>
                            </div>
                            <div className="text-center">
                                <p className={`text-sm font-black uppercase tracking-[0.5em] transition-colors duration-300 ${isTransmitting ? 'text-red-500 animate-pulse' : 'text-slate-500'}`}>
                                    {isTransmitting ? 'TRANSMITTING TO MESH' : 'PRESS & HOLD TO SPEAK'}
                                </p>
                                <p className="text-[10px] text-slate-700 font-bold uppercase mt-3 tracking-widest">Architect Signature: VERIFIED L10</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-6 w-full max-w-2xl">
                            <button onClick={triggerChirp} className="p-6 bg-yellow-500 hover:bg-yellow-400 text-black rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-xl transition-all active:scale-95 flex flex-col items-center gap-3">
                                <Zap size={24} /> Chirp
                            </button>
                            <button className="p-6 bg-slate-800 hover:bg-slate-700 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-xl transition-all active:scale-95 flex flex-col items-center gap-3 border border-slate-700">
                                <Ear size={24} className="text-blue-400" /> Listen
                            </button>
                            <button className="p-6 bg-red-900/40 hover:bg-red-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-xl transition-all active:scale-95 flex flex-col items-center gap-3 border border-red-900/50">
                                <ShieldAlert size={24} className="text-red-500" /> SOS
                            </button>
                            <button className="p-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-xl transition-all active:scale-95 flex flex-col items-center gap-3 border border-blue-500">
                                <Wifi size={24} /> Sat
                            </button>
                        </div>
                    </div>

                    <div className="p-8 bg-slate-900 border-t border-slate-800 text-center z-10">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center justify-center gap-4">
                            <span>FREQUENCY: {selectedChannel.freq}</span>
                            <span className="w-1.5 h-1.5 bg-slate-700 rounded-full"></span>
                            <span>T.H.E.L.M.A. v4.0.0 SECURE MESH</span>
                            <span className="w-1.5 h-1.5 bg-slate-700 rounded-full"></span>
                            <span>PEER_SYNC_OK</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Communications;
