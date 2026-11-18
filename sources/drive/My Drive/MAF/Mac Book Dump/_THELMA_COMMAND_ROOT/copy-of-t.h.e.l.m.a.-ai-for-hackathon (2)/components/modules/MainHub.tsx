Original name: MainHub.tsx
Drive ID: 1Z4WPyBGO6wK9-7aMTAXdna74Towdbwor
Parent folder: My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/copy-of-t.h.e.l.m.a.-ai-for-hackathon (2)/components/modules/
Modified: 2026-01-20T18:17:22.241Z


import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Users, DollarSign, Activity, ShieldCheck, Cpu, Download, RefreshCw, GraduationCap } from 'lucide-react';

const data = [
  { name: 'Mon', revenue: 4000, loads: 240 },
  { name: 'Tue', revenue: 3000, loads: 139 },
  { name: 'Wed', revenue: 2000, loads: 980 },
  { name: 'Thu', revenue: 2780, loads: 390 },
  { name: 'Fri', revenue: 1890, loads: 480 },
  { name: 'Sat', revenue: 2390, loads: 380 },
  { name: 'Sun', revenue: 3490, loads: 430 },
];

interface MainHubProps {
  onViewManual?: () => void;
}

const MainHub: React.FC<MainHubProps> = ({ onViewManual }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
        setIsGenerating(false);
        const link = document.createElement('a');
        link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent('T.H.E.L.M.A. AI SYSTEM STATUS REPORT\n================================\nDate: Jan 5 2025\nArchitect: Steve Henry\nBlueprint: v1.1 Master Demo\n\n- HEALTH: 99.98%\n- FLEET: 142 Active Units\n- SECURITY: Defcon 4\n- CARBON: 12% Reduction vs Baseline\n\nAUTHORIZED SIGNATURE: Steve Henry (CTO)');
        link.setAttribute('download', 'THELMA_v1.1_StatusReport.txt');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome / Context Header */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
            <h1 className="text-2xl font-bold text-slate-900">T.H.E.L.M.A. Operations Command</h1>
            <p className="text-slate-500 text-sm">Unified Intelligence Core • H.E.N.R.Y. Active</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
             <button 
                onClick={onViewManual}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm"
             >
                <GraduationCap size={16} /> Open L.I.L.Y. Training
             </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
           <div className="flex justify-between items-start">
              <div><p className="text-sm font-medium text-slate-500">Total Revenue</p><h3 className="text-2xl font-bold text-slate-800 mt-1">$124,592</h3></div>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><DollarSign size={20} /></div>
           </div>
           <p className="text-xs text-green-500 font-medium mt-4 flex items-center"><TrendingUp size={12} className="mr-1" /> +12.5% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
           <div className="flex justify-between items-start">
              <div><p className="text-sm font-medium text-slate-500">Active Loads</p><h3 className="text-2xl font-bold text-slate-800 mt-1">1,493</h3></div>
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Activity size={20} /></div>
           </div>
           <p className="text-xs text-green-500 font-medium mt-4 flex items-center"><TrendingUp size={12} className="mr-1" /> +4.3% this week</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
           <div className="flex justify-between items-start">
              <div><p className="text-sm font-medium text-slate-500">Personnel</p><h3 className="text-2xl font-bold text-slate-800 mt-1">856</h3></div>
              <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Users size={20} /></div>
           </div>
           <p className="text-xs text-slate-400 font-medium mt-4">98% Active Status</p>
        </div>
        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-sm border border-slate-800">
           <div className="flex justify-between items-start">
              <div><p className="text-sm font-medium text-slate-400">System Health</p><h3 className="text-2xl font-bold mt-1">99.98%</h3></div>
              <div className="p-2 bg-slate-800 text-green-400 rounded-lg"><Activity size={20} /></div>
           </div>
           <p className="text-xs text-slate-400 font-medium mt-4 uppercase tracking-widest">Blueprint Active</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600"><Cpu size={24} /></div>
            <div><h3 className="font-bold text-slate-800 uppercase tracking-tight">Daily Security & Anomaly Briefing</h3><p className="text-sm text-slate-500 font-medium">P.E.R.C.Y. Agent Status: Active Monitoring</p></div>
          </div>
          <div className="flex items-center space-x-6">
              <div className="text-right"><p className="text-xs text-slate-400">Scan Status</p><p className="text-sm font-bold text-green-600 flex items-center gap-1"><ShieldCheck size={14} /> Clean</p></div>
              <div className="text-right hidden sm:block"><p className="text-xs text-slate-400">Last Check</p><p className="text-sm font-medium text-slate-700">Today, 08:00 AM</p></div>
              <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
              <div className="flex items-center gap-4">
                  <button 
                    onClick={generateReport}
                    disabled={isGenerating}
                    className={`text-sm font-bold flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        isGenerating ? 'bg-slate-100 text-slate-400' : 'bg-slate-800 text-white hover:bg-slate-900'
                    }`}
                  >
                    {isGenerating ? <RefreshCw className="animate-spin" size={14} /> : <Download size={14}/>}
                    {isGenerating ? 'Generating...' : 'Full System Report'}
                  </button>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-[400px]">
          <h3 className="text-lg font-bold text-slate-800 mb-6 uppercase tracking-tight">Revenue Performance Blueprint</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-[400px]">
          <h3 className="text-lg font-bold text-slate-800 mb-6 uppercase tracking-tight">Unit Utilization Trends</h3>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Line type="monotone" dataKey="loads" stroke="#8b5cf6" strokeWidth={3} dot={{r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff'}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MainHub;
