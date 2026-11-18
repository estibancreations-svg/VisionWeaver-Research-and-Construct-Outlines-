Original name: UnitSetupWizard.tsx
Drive ID: 1CjJo846CRwTfZkTYtrK7rPKg91U3sbv_
Parent folder: thelma-core/components/
Modified: 2026-01-23T02:31:57.000Z

import React, { useState } from 'react';
import { Truck, Car, Ship, Plane, Zap, Droplet, Battery, Check, X, Crosshair, Radio } from 'lucide-react';
import { PowerSource, UnitType, UnitConfiguration } from '../types';

interface UnitSetupWizardProps {
  onComplete: (config: UnitConfiguration) => void;
  onClose: () => void;
}

const UnitSetupWizard: React.FC<UnitSetupWizardProps> = ({ onComplete, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<UnitType | null>(null);
  const [selectedPower, setSelectedPower] = useState<PowerSource | null>(null);

  const handleComplete = () => {
    if (selectedType && selectedPower) {
      onComplete({
        id: Date.now().toString(),
        name: `${selectedPower} ${selectedType} Configuration`,
        type: selectedType,
        powerSource: selectedPower,
        dimensions: { length: 0, width: 0, height: 0, weight: 0 }, // Defaults for demo
        hazmatCertified: false
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
          <div>
            <h2 className="text-xl font-bold">Unit Definition Engine</h2>
            <p className="text-slate-400 text-xs uppercase tracking-wider">Phase 2: Asset Initialization</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X /></button>
        </div>

        <div className="p-8">
          {/* Progress Bar */}
          <div className="flex items-center mb-8">
            <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
            <div className={`h-1 flex-1 rounded-full ml-2 ${step >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
            <div className={`h-1 flex-1 rounded-full ml-2 ${step >= 3 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800">Select Unit Type</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { id: 'TRUCK', icon: Truck, label: 'Commercial Truck' },
                  { id: 'AUTOMOBILE', icon: Car, label: 'Fleet Vehicle' },
                  { id: 'MARINE_VESSEL', icon: Ship, label: 'Marine Vessel' },
                  { id: 'AIRCRAFT', icon: Plane, label: 'Aircraft' },
                  { id: 'DRONE', icon: Crosshair, label: 'Autonomous Drone' },
                  { id: 'AIR_POD', icon: Radio, label: 'Air Pod (VTOL)' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedType(item.id as UnitType)}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center space-y-2 transition-all ${
                      selectedType === item.id 
                        ? 'border-blue-600 bg-blue-50 text-blue-700' 
                        : 'border-slate-200 hover:border-slate-300 text-slate-500'
                    }`}
                  >
                    <item.icon size={28} />
                    <span className="font-medium text-sm text-center">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800">Select Power Source</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'DIESEL', icon: Droplet, label: 'Diesel', color: 'text-orange-600' },
                  { id: 'GASOLINE', icon: Droplet, label: 'Gasoline', color: 'text-yellow-600' },
                  { id: 'ELECTRIC', icon: Zap, label: 'Electric (BEV)', color: 'text-green-600' },
                  { id: 'HYBRID', icon: Battery, label: 'Hybrid', color: 'text-blue-600' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedPower(item.id as PowerSource)}
                    className={`p-6 rounded-xl border-2 flex flex-col items-center justify-center space-y-3 transition-all ${
                      selectedPower === item.id 
                        ? 'border-blue-600 bg-blue-50 text-blue-700' 
                        : 'border-slate-200 hover:border-slate-300 text-slate-500'
                    }`}
                  >
                    <item.icon size={32} className={item.color} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Configuration Ready</h3>
              <p className="text-slate-500">
                T.H.E.L.M.A. will optimize routing and maintenance logic for:
              </p>
              <div className="inline-block bg-slate-100 px-6 py-3 rounded-lg font-mono text-sm text-slate-700 border border-slate-200">
                {selectedPower} • {selectedType}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                HazMat restrictions active. EV range logic {selectedPower === 'ELECTRIC' ? 'enabled' : 'disabled'}.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-6 flex justify-between border-t border-slate-200">
          {step > 1 ? (
             <button onClick={() => setStep(step - 1)} className="text-slate-500 font-medium px-4">Back</button>
          ) : (
            <div></div>
          )}
          
          {step < 3 ? (
            <button 
              onClick={() => setStep(step + 1)} 
              disabled={step === 1 ? !selectedType : !selectedPower}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Continue
            </button>
          ) : (
            <button 
              onClick={handleComplete}
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Initialize Unit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnitSetupWizard;