Original name: NetZeroHub.tsx
Drive ID: 17iokbOPM65GpWbaIBXDXwpw2plBA0Lzl
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/
Modified: 2026-01-12T04:35:58.000Z


import React from 'react';
import { Leaf, Wind, TrendingDown, DollarSign, FileText, PieChart as PieChartIcon, Zap, CheckCircle } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const carbonData = [
  { month: 'Jul', diesel: 4000, electric: 2400, saved: 1000 },
  { month: 'Aug', diesel: 3500, electric: 2800, saved: 1500 },
  { month: 'Sep', diesel: 3000, electric: 3200, saved: 2000 },
  { month: 'Oct', diesel: 2800, electric: 3500, saved: 2200 },
  { month: 'Nov', diesel: 2500, electric: 3800, saved: 2500 },
  { month: 'Dec', diesel: 2000, electric: 4200, saved: 3000 },
];

const NetZeroHub: React.FC = () => {
  return (
    <div className="space-y-6">
       {/* Hero Section */}
       <div className="bg-emerald-800 rounded-xl p-8 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-2">
                <Leaf size={32} className="text-emerald-300" />
                <h1 className="text-3xl font-bold">Net Zero Carbon Governance</h1>
            </div>
            <p className="text-emerald-100 max-w-2xl">
              T.H.E.L.M.A. Adaptation Engine active. Tracking emissions across Fleet, Aviation, and Aquatic sectors. 
              Generating government compliance reports and credit eligibility analysis for V1.0 (Jan 4, 2025).
            </p>
          </div>
          <Wind className="absolute right-8 bottom-[-20px] opacity-10" size={180} />
       </div>

       {/* Key Metrics */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-slate-500">Current Emissions</p>
                <Wind size={20} className="text-slate-400" />
             </div>
             <p className="text-2xl font-bold text-slate-800">4,281 MT</p>
             <p className="text-xs text-green-500 font-medium flex items-center mt-1">
                <TrendingDown size={12} className="mr-1" /> -12% vs Baseline
             </p>
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-slate-500">Fuel Consumption</p>
                <Zap size={20} className="text-yellow-500" />
             </div>
             <p className="text-2xl font-bold text-slate-800">125k Gal</p>
             <p className="text-xs text-slate-400 mt-1">
                Moving to Electric Hybrid
             </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-slate-500">Projected Credits</p>
                <DollarSign size={20} className="text-emerald-500" />
             </div>
             <p className="text-2xl font-bold text-slate-800">$485,000</p>
             <p className="text-xs text-green-500 mt-1">
                Eligible for FY2025
             </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-slate-500">Govt Compliance</p>
                <CheckCircle size={20} className="text-blue-500" />
             </div>
             <p className="text-2xl font-bold text-slate-800">98.5%</p>
             <p className="text-xs text-blue-500 mt-1">
                Ready for Audit
             </p>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Carbon Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-6">Carbon Reduction Trajectory (Transition to Net Zero)</h3>
             <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={carbonData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                        <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                        <Bar dataKey="diesel" stackId="a" fill="#94a3b8" name="Diesel Usage" />
                        <Bar dataKey="electric" stackId="a" fill="#10b981" name="Electric Usage" />
                        <Bar dataKey="saved" fill="#3b82f6" name="CO2 Saved (Est)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* Recommendations Panel */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
             <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                <PieChartIcon size={18} className="mr-2 text-slate-500" /> 
                T.H.E.L.M.A. Recommendations
             </h3>
             <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:border-emerald-400 transition-colors cursor-pointer">
                   <div className="flex justify-between items-start mb-2">
                      <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded">HIGH IMPACT</span>
                      <span className="text-xs text-slate-400">Save 400kg CO2/day</span>
                   </div>
                   <h4 className="font-semibold text-sm text-slate-800">Convert Route 4 to EV Fleet</h4>
                   <p className="text-xs text-slate-500 mt-1">Analysis shows Route 4 (Urban) is optimal for current Electric Truck range limits.</p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:border-emerald-400 transition-colors cursor-pointer">
                   <div className="flex justify-between items-start mb-2">
                      <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded">CREDIT OPPORTUNITY</span>
                      <span className="text-xs text-slate-400">Est. $15k Credit</span>
                   </div>
                   <h4 className="font-semibold text-sm text-slate-800">Submit Tier 2 Carbon Report</h4>
                   <p className="text-xs text-slate-500 mt-1">Q4 data is complete. Generate and submit to Dept of Energy portal via Adaptation Layer.</p>
                </div>

                <button className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors">
                   Generate Full Govt Report
                </button>
             </div>
          </div>
       </div>
    </div>
  );
};

export default NetZeroHub;
