Original name: UnitSetupWizard.tsx
Drive ID: 1tZXqOh9fkL8Fi1FQ-6xEER1ZQJyp39AP
Parent folder: My Drive/MAF/Google AI Studio 1/t.h.e.l.m.a.-ai-core-&-modules (2)/components/
Modified: 2026-01-31T10:56:50.000Z


import React, { useState } from 'react';
import { Truck, Car, Ship, Plane, Zap, Droplet, Battery, Check, X, Crosshair, Radio, Brain, Network, Shield, Cpu, Camera, ScanLine, FileCheck, Key, PenTool, Layout, Gauge, Search, SlidersHorizontal, Maximize2, ZoomIn, ZoomOut } from 'lucide-react';
import { PowerSource, UnitType, UnitConfiguration } from '../types';

interface UnitSetupWizardProps {
  onComplete: (config: UnitConfiguration) => void;
  onClose: () => void;
  mode?: 'PICKUP' | 'DROPOFF' | 'REGISTRATION';
}

const UnitSetupWizard: React.FC<UnitSetupWizardProps> = ({ onComplete, onClose, mode = 'REGISTRATION' }) => {
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState('');
  const [selectedType, setSelectedType] = useState<UnitType | null>(null);
  const [selectedPower, setSelectedPower] = useState<PowerSource | null>(null);
  const [mileage, setMileage] = useState('0');
  const [fuel, setFuel] = useState('100');
  
  // Camera Simulation State
  const [zoomLevel, setZoomLevel] = useState(1); // 1 to 5
  
  // Lifecycle Documentation State
  const [docs, setDocs] = useState({
      photo4Corner: false,
      vinScan: false,
      interiorPhoto: false,
      dashPhoto: false,
      insuranceCert: false,
      pickupSignature: false,
      dropoffSignature: false
  });

  const handleComplete = () => {
    onComplete({
      id: Date.now().toString(),
      name: `${selectedPower || 'EV'} ${selectedType || 'UNIT'}`,
      type: selectedType || 'TRUCK',
      powerSource: selectedPower || 'ELECTRIC',
      dimensions: { length: 0, width: 0, height: 0, weight: 0 }, 
      hazmatCertified: false,
      mileage: parseInt(mileage),
      fuelLevel: parseInt(fuel),
      documents: docs,
      releaseCode: verificationCode
    });
  };

  const simulateDocCapture = (key: keyof typeof docs) => {
      setDocs(prev => ({ ...prev, [key]: true }));
  };

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl w-full max-w-2xl overflow-hidden animate-fadeIn border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
        
        <div className="bg-slate-900 p-6 flex justify-between items-center text-white border-b border-slate-800">
          <div>
            <h2 className="text-xl font-black uppercase tracking-widest">{mode} ENFORCEMENT</h2>
            <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mt-1">Jan 04, 2025 • L.I.L.Y. Lifecycle Protocol v4.0</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-slate-50 dark:bg-slate-950">
          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mb-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${step >= i ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-lg font-black uppercase text-slate-800 dark:text-white flex items-center gap-3">
                  <Key className="text-blue-500" /> Unit Verification Code
              </h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Enter the 6-digit release code provided via Global Link Logistics.</p>
              <input 
                type="text" 
                maxLength={6}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="######"
                className="w-full text-4xl font-black font-mono tracking-[1em] text-center p-8 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl outline-none focus:border-blue-500 transition-all"
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-fadeIn">
                <h3 className="text-lg font-black uppercase text-slate-800 dark:text-white">Domain & Energy Matrix</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2"><Truck size={14}/> Unit Classification</label>
                        <select 
                            value={selectedType || ''} 
                            onChange={(e) => setSelectedType(e.target.value as any)}
                            className="w-full p-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl font-bold appearance-none outline-none focus:border-blue-500"
                        >
                            <option value="" disabled>Select Type...</option>
                            <option value="TRUCK">Class-8 Freight (Truck)</option>
                            <option value="DRONE">Aerial Logistics (Drone)</option>
                            <option value="SHIP">Maritime Cargo (Ship)</option>
                            <option value="ANTIGRAV">Platform-Z (Antigrav)</option>
                        </select>
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2"><Zap size={14}/> Energy Configuration</label>
                        <select 
                            value={selectedPower || ''} 
                            onChange={(e) => setSelectedPower(e.target.value as any)}
                            className="w-full p-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl font-bold appearance-none outline-none focus:border-blue-500"
                        >
                            <option value="" disabled>Select Power...</option>
                            <option value="ELECTRIC">Electric Battery (BEV)</option>
                            <option value="HYDROGEN">Hydrogen Fuel Cell (FCEV)</option>
                            <option value="DIESEL">Internal Combustion (ICE)</option>
                            <option value="ZERO_POINT">Zero-Point Extraction</option>
                        </select>
                    </div>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
                    <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase leading-relaxed">
                        [L.I.L.Y.] Note: Energy selection affects neural routing and ESG tax credit yield.
                    </p>
                </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-lg font-black uppercase text-slate-800 dark:text-white">Telephoto Inspection Hub</h3>
              <div className="relative aspect-video rounded-[2rem] bg-slate-900 border-4 border-slate-800 overflow-hidden shadow-2xl">
                   {/* Camera HUD Layer */}
                   <div className="absolute inset-0 z-10 pointer-events-none opacity-40">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white rounded-full"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-64 bg-white"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-0.5 bg-white"></div>
                   </div>

                   {/* Simulated Zoom View */}
                   <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500" style={{ transform: `scale(${zoomLevel})` }}>
                        <Truck size={120} className="text-slate-700" />
                   </div>

                   {/* Zoom Controls Overlay */}
                   <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center z-20">
                        <div className="flex gap-2">
                             <button onClick={() => setZoomLevel(1)} className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-[10px] border-2 transition-all ${zoomLevel === 1 ? 'bg-blue-600 text-white border-blue-600 shadow-lg' : 'bg-black/50 text-white border-white/20'}`}>1x</button>
                             <button onClick={() => setZoomLevel(2.5)} className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-[10px] border-2 transition-all ${zoomLevel === 2.5 ? 'bg-blue-600 text-white border-blue-600 shadow-lg' : 'bg-black/50 text-white border-white/20'}`}>2.5x</button>
                             <button onClick={() => setZoomLevel(5)} className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-[10px] border-2 transition-all ${zoomLevel === 5 ? 'bg-blue-600 text-white border-blue-600 shadow-lg' : 'bg-black/50 text-white border-white/20'}`}>5x</button>
                        </div>
                        <p className="text-[10px] font-mono text-white/50 uppercase tracking-widest">TELEPHOTO_MESH_ACTIVE</p>
                   </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => simulateDocCapture('photo4Corner')} className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${docs.photo4Corner ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 'bg-white border-slate-200 text-slate-400 hover:border-blue-400'}`}>
                      <Camera size={28} />
                      <span className="text-[9px] font-black uppercase">4-Corner Capture</span>
                  </button>
                  <button onClick={() => simulateDocCapture('vinScan')} className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${docs.vinScan ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 'bg-white border-slate-200 text-slate-400 hover:border-blue-400'}`}>
                      <ScanLine size={28} />
                      <span className="text-[9px] font-black uppercase">Telephoto VIN Scan</span>
                  </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-lg font-black uppercase text-slate-800 dark:text-white">Dashboard Telemetry</h3>
              <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
                  <div className="flex items-center gap-4">
                      <button onClick={() => simulateDocCapture('dashPhoto')} className={`p-6 rounded-xl border-2 transition-all ${docs.dashPhoto ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                          <Camera size={24} />
                      </button>
                      <p className="text-[10px] font-black uppercase text-slate-500">Capture Odometer & Fuel Gauge</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Current Mileage</label>
                          <input type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-xl font-mono font-bold" />
                      </div>
                      <div>
                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Fuel/Charge Level %</label>
                          <input type="number" value={fuel} onChange={(e) => setFuel(e.target.value)} className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-xl font-mono font-bold" />
                      </div>
                  </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-lg font-black uppercase text-slate-800 dark:text-white">Validation & Signature</h3>
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 text-center space-y-6">
                  <div className="w-full h-48 bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center group cursor-crosshair" onClick={() => simulateDocCapture(mode === 'PICKUP' ? 'pickupSignature' : 'dropoffSignature')}>
                      { (mode === 'PICKUP' ? docs.pickupSignature : docs.dropoffSignature) ? (
                          <div className="animate-fadeIn text-emerald-600 font-mono font-bold uppercase italic text-2xl">STEVE HENRY [v2025-01-04]</div>
                      ) : (
                          <>
                            <PenTool size={32} className="text-slate-300 group-hover:text-blue-500 transition-colors mb-2" />
                            <span className="text-[10px] font-black text-slate-400 uppercase">Sign in this box to authorize {mode}</span>
                          </>
                      )}
                  </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6 text-center animate-fadeIn">
              <div className="w-24 h-24 bg-emerald-500 text-white rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-[0_20px_40px_rgba(16,185,129,0.3)] animate-bounce-in">
                <Check size={48} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">{mode} SECURED</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest max-w-sm mx-auto mt-4 leading-relaxed">
                C.O.R.E. has archived the documentation packet. H.E.N.R.Y. is preparing routing recommendations.
              </p>
            </div>
          )}
        </div>

        <div className="bg-slate-50 dark:bg-slate-900 p-6 flex justify-between border-t border-slate-200 dark:border-slate-800">
          {step > 1 ? (
             <button onClick={() => setStep(step - 1)} className="text-slate-500 hover:text-slate-900 dark:hover:text-white font-black text-[10px] uppercase tracking-widest px-6 py-2">Back</button>
          ) : <div /> }
          
          {step < 6 ? (
            <button 
              onClick={() => setStep(step + 1)} 
              disabled={
                (step === 1 && verificationCode.length < 6) || 
                (step === 2 && (!selectedType || !selectedPower)) ||
                (step === 3 && (!docs.photo4Corner || !docs.vinScan)) ||
                (step === 4 && (!docs.dashPhoto || !mileage)) ||
                (step === 5 && (mode === 'PICKUP' ? !docs.pickupSignature : !docs.dropoffSignature))
              }
              className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-700 disabled:opacity-50 disabled:grayscale transition-all shadow-xl active:scale-95"
            >
              Continue Lifecycle
            </button>
          ) : (
            <button 
              onClick={handleComplete}
              className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-emerald-700 transition-all shadow-xl active:scale-95"
            >
              Finalize {mode}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnitSetupWizard;
