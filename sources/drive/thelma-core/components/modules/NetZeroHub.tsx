Original name: NetZeroHub.tsx
Drive ID: 12cqBHtWA2t3CPBE_P7o6qLmsFLiyvNMv
Parent folder: thelma-core/components/modules/
Modified: 2026-01-23T02:31:57.000Z


import React from 'react';
import { Leaf, Wind, Sun, Battery, DollarSign, Award, Trees } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const solarData = [
  { time: '6am', yield: 10 }, { time: '9am', yield: 45 }, { time: '12pm', yield: 88 }, { time: '3pm', yield: 65 }, { time: '6pm', yield: 20 }
];

const NetZeroHub: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
       <div className="bg-gradient-to-r from-emerald-800 to-green-700 rounded-xl p-8 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex items-center space-x-3 mb-2"><Leaf size={32} className="text-emerald-300" /><h1 className="text-3xl font-bold">Net Zero Carbon Governance</h1></div>
          <p className="relative z-10 text-emerald-100 max-w-2xl">Compliance Engine Active. V1.3</p>
          <Wind className="absolute right-8 bottom-[-20px] opacity-10" size={180} />
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Sun size={18} className="text-orange-500"/> Solar Yield Forecast</h3>
             <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={solarData}>
                        <Bar dataKey="yield" fill="#f97316" radius={[2, 2, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Battery size={18} className="text-green-600"/> Battery Second-Life</h3>
             <div className="flex justify-between items-center mb-2">
                 <span className="text-sm text-slate-600">Unit 104-B (Degraded)</span>
                 <span className="text-xs font-bold text-slate-500">72% Capacity</span>
             </div>
             <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4"><div className="bg-yellow-500 h-full w-[72%]"></div></div>
             <p className="text-xs text-blue-600">Repurposed for Warehouse Static Storage.</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><DollarSign size={18} className="text-slate-600"/> Carbon Tax Liability</h3>
             <p className="text-3xl font-bold text-slate-800">$12,450</p>
             <p className="text-xs text-red-500 mt-1">Est. payment due Q1 2025</p>
             <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2">
                 <Award size={16} className="text-green-500"/>
                 <span className="text-xs font-bold text-slate-600">Green Certification: PENDING</span>
             </div>
          </div>
       </div>
    </div>
  );
};

export default NetZeroHub;
