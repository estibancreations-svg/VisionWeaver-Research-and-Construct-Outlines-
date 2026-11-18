Original name: HRAdmin.tsx
Drive ID: 1Ni_7BbEfWOZ_SKmxKxrgIZTC1z076jkk
Parent folder: thelma-core/components/modules/
Modified: 2026-01-23T02:31:57.000Z


import React from 'react';
import { Users, Activity, TrendingUp, Award, Network } from 'lucide-react';

const HRAdmin: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Enterprise HR Command</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Activity size={18} className="text-red-500"/> Burnout Risk Gauge</h3>
              <div className="relative h-32 flex items-center justify-center">
                  <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 w-[72%]"></div>
                  </div>
                  <span className="absolute top-0 right-0 font-bold text-red-600 text-sm">High (72%)</span>
              </div>
              <p className="text-xs text-slate-500">Logistics Dept showing elevated fatigue markers.</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Users size={18} className="text-blue-500"/> Team Cohesion Score</h3>
              <div className="text-center">
                  <p className="text-4xl font-bold text-blue-600">8.4<span className="text-sm text-slate-400 font-normal">/10</span></p>
                  <p className="text-xs text-green-500 mt-1 flex items-center justify-center gap-1"><TrendingUp size={12}/> +0.2 this month</p>
              </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Network size={18} className="text-purple-500"/> Dynamic Org Chart</h3>
              <div className="h-32 bg-slate-50 rounded border border-slate-100 flex items-center justify-center text-slate-400 text-xs">
                  [Interactive Tree Visualization]
              </div>
          </div>
      </div>
    </div>
  );
};

export default HRAdmin;
