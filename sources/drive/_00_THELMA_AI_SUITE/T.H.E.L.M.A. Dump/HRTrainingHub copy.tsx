Original name: HRTrainingHub copy.tsx
Drive ID: 10klzq6jDP9rcnA2qKHw2okOaaQ162wNo
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/
Modified: 2026-01-12T00:25:13.000Z

import React, { useState } from 'react';
import { GraduationCap, PlayCircle, ArrowLeft, CheckCircle, Circle, Activity, Eye, ChevronRight, FileText } from 'lucide-react';

const lessonPlan = [
  { id: 'step-1', title: '1. Core Foundations', description: 'Understanding the T.H.E.L.M.A. command hierarchy and federated agent roles.', type: 'LECTURE' },
  { id: 'step-2', title: '2. Tactical Awareness', description: 'Reading operational heatmaps and identifying high-risk anomalies.', type: 'LECTURE' },
  { id: 'step-3', title: '3. Anomaly Response', description: 'Coordinating between H.E.N.R.Y. and P.E.R.C.Y. during a Tier-1 event.', type: 'SIMULATION' },
  { id: 'step-4', title: '4. Forensic Review', description: 'Reviewing session telemetry and eye-tracking stress markers.', type: 'SIMULATION' },
  { id: 'step-5', title: '5. Master Certification', description: 'Final assessment of orchestrator capabilities.', type: 'QUIZ' }
];

const HRTrainingHub: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState('step-1');
  const currentStep = lessonPlan.find(s => s.id === activeStepId) || lessonPlan[0];

  return (
    <div className="h-full flex flex-col animate-fadeIn">
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shrink-0">
        <div>
          <h2 className="font-bold text-slate-800 text-lg flex items-center gap-2"><GraduationCap size={20} className="text-emerald-600" /> L.I.L.Y. Training Hub</h2>
          <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">Curriculum v1.2.1 • Architect: Steve Henry</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-100 text-slate-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">Resources</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors shadow-lg">Save Progress</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-80 border-r border-slate-200 bg-white overflow-y-auto shrink-0">
          <div className="p-6">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Learning Path</h3>
            <div className="space-y-2">
              {lessonPlan.map((step, idx) => {
                const isActive = activeStepId === step.id;
                const activeIndex = lessonPlan.findIndex(s => s.id === activeStepId);
                const isCompleted = activeIndex > idx;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStepId(step.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all flex items-start gap-4 border ${isActive ? 'bg-emerald-50 border-emerald-500 shadow-sm' : 'border-transparent hover:bg-slate-50'}`}
                  >
                    <div className="mt-1">
                      {isCompleted ? <CheckCircle size={16} className="text-emerald-500" /> : <Circle size={16} className={isActive ? 'text-emerald-500' : 'text-slate-300'} />}
                    </div>
                    <div>
                      <p className={`text-sm font-bold leading-tight ${isActive ? 'text-emerald-900' : 'text-slate-700'}`}>{step.title}</p>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tighter">{step.type}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <main className="flex-1 bg-slate-50 overflow-y-auto p-12">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 opacity-50"></div>
              
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase mb-6 inline-block tracking-widest">{currentStep.type} Phase</span>
              <h1 className="text-4xl font-bold text-slate-900 mb-6">{currentStep.title.split('. ')[1]}</h1>
              <p className="text-slate-600 text-lg leading-relaxed mb-10 max-w-2xl">{currentStep.description}</p>

              {currentStep.type === 'SIMULATION' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-slate-900 rounded-3xl p-6 aspect-video relative overflow-hidden shadow-2xl group border border-slate-800">
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-white text-[10px] font-bold bg-black/60 backdrop-blur px-3 py-1.5 rounded-full border border-white/10 uppercase tracking-widest">
                      <Eye size={12} className="text-emerald-400"/> Eye Tracking: Calibrating
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-indigo-900 opacity-60"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-16 h-16 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full text-white flex items-center justify-center transition-all hover:scale-110 shadow-2xl">
                        <PlayCircle size={32} />
                      </button>
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2"><Activity size={14} className="text-blue-500"/> Biometric Review</h4>
                    <div className="flex-1 flex items-end gap-1.5 h-32">
                      {[40, 60, 45, 80, 75, 40, 30, 90, 85, 40, 50, 60].map((h, i) => (
                        <div key={i} className={`flex-1 rounded-t-full transition-all duration-1000 ${h > 80 ? 'bg-red-400' : 'bg-blue-400 opacity-50'}`} style={{ height: `${h}%` }}></div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-6 leading-relaxed italic border-t border-slate-200 pt-4">"Stress levels spiked during Anomaly phase. Recommended deep-breathing intervention v2."</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-4 p-5 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-slate-200 group bg-white shadow-sm">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                        <FileText size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800 text-base">Foundation Directive 0{i}</h4>
                        <p className="text-sm text-slate-500 mt-1">Mission-critical logic for decentralized command.</p>
                      </div>
                      <ChevronRight size={20} className="text-slate-300 self-center" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center py-10">
              <button className="text-slate-400 font-bold text-sm flex items-center gap-2 hover:text-slate-800 transition-colors uppercase tracking-widest">
                <ArrowLeft size={16} /> Previous
              </button>
              <button onClick={() => {
                const nextIndex = lessonPlan.indexOf(currentStep) + 1;
                if (nextIndex < lessonPlan.length) setActiveStepId(lessonPlan[nextIndex].id);
              }} className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center gap-3 shadow-xl">
                Continue Module <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HRTrainingHub;