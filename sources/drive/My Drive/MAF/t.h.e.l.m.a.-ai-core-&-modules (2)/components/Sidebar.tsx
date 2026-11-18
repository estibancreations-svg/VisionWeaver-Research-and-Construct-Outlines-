Original name: Sidebar.tsx
Drive ID: 1PwGuQ_WPlcs7uhUrESw-ljhDr1Q3wsHV
Parent folder: My Drive/MAF/t.h.e.l.m.a.-ai-core-&-modules (2)/components/
Modified: 2026-01-31T10:56:50.000Z


import React from 'react';
import { 
  LayoutDashboard, Brain, GraduationCap, Flag, Server, Users, BarChart2, Truck, Plane, FolderOpen, DollarSign, Settings, Shield, FileText, Zap, X, Wrench, Radio, Lock, Anchor, Layers, CreditCard, Smartphone, Cpu
} from 'lucide-react';
import { ModuleType, User } from '../types';

interface SidebarProps {
  activeModule: ModuleType;
  setActiveModule: (m: ModuleType) => void;
  currentUser: User;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule, currentUser, onClose }) => {
  const navItems = [
    { id: ModuleType.DASHBOARD, label: 'Neural Hub', icon: LayoutDashboard, clearance: 1 },
    { id: ModuleType.FIELD_RELAY, label: 'Field Relay', icon: Smartphone, badge: 'LIVE', clearance: 1 },
    { id: ModuleType.DISPATCH, label: 'Load Board', icon: Layers, badge: 'BIDS', clearance: 1 },
    { id: ModuleType.COMMUNICATIONS, label: 'PTT Comms', icon: Radio, badge: 'PTT', clearance: 1 },
    { id: ModuleType.FLEET, label: 'Fleet Matrix', icon: Truck, clearance: 1 },
    { id: ModuleType.MAINTENANCE, label: 'Maintenance', icon: Wrench, badge: 'CAM', clearance: 2 },
    { id: ModuleType.PAYROLL, label: 'Bids & Payroll', icon: DollarSign, clearance: 5 },
    { id: ModuleType.HR_ADMIN, label: 'HR Personnel', icon: Users, clearance: 6 },
    { id: ModuleType.AI_INSIGHTS, label: 'Neural Matrix', icon: Brain, clearance: 8 },
    { id: ModuleType.IT_CONTROL, label: 'IT Infra', icon: Server, badge: 'L10', clearance: 7 },
    { id: ModuleType.ANALYTICS, label: 'Fleet Yield', icon: BarChart2, clearance: 4 },
    { id: ModuleType.SETTINGS, label: 'Preferences', icon: Settings, clearance: 1 },
    { id: ModuleType.DOCUMENTATION, label: 'Archive', icon: FileText, clearance: 1 }
  ];

  return (
    <div className="w-64 lg:w-full min-w-[240px] max-w-[280px] lg:max-w-none bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 h-screen flex flex-col relative z-50 shadow-2xl lg:shadow-xl border-r border-slate-200 dark:border-slate-800 transition-colors overflow-hidden">
      <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-600 rounded-[1.2rem] flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
             <Cpu size={24} />
          </div>
          <div>
            <h1 className="font-black text-xl text-slate-900 dark:text-white tracking-tighter leading-none uppercase">T.H.E.L.M.A.</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-black mt-1">AI Federation</p>
          </div>
        </div>
        <button onClick={onClose} className="lg:hidden p-2 text-slate-400 hover:text-red-500 rounded-lg"><X size={24} /></button>
      </div>

      <div className="flex-1 py-6 space-y-1 overflow-y-auto no-scrollbar">
        {navItems.map((item) => {
          const hasClearance = currentUser.clearanceLevel >= item.clearance;
          return (
            <button
              key={item.id}
              disabled={!hasClearance}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center justify-between px-8 py-3.5 text-sm transition-all duration-200 group relative ${
                activeModule === item.id 
                  ? 'bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 font-bold' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-white'
              } ${!hasClearance ? 'opacity-40 grayscale cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center space-x-4">
                  <item.icon size={20} className={activeModule === item.id ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'} />
                  <span className="uppercase font-black text-[10px] tracking-widest">{item.label}</span>
              </div>
              {item.badge && hasClearance && (
                  <span className={`text-[8px] font-black px-2 py-0.5 rounded-lg border ${item.badge === 'LIVE' ? 'bg-emerald-500 text-white border-emerald-400' : item.badge === 'BIDS' ? 'bg-blue-600 text-white border-blue-500 shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}>
                      {item.badge}
                  </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
        <div className="flex items-center space-x-4 mb-3 px-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black text-xs border-2 border-slate-700 shadow-xl">
             SH
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-black text-slate-800 dark:text-white truncate uppercase tracking-tight">{currentUser.fullName}</p>
            <p className="text-[10px] text-emerald-500 truncate uppercase font-bold tracking-widest">TIER 0 (ARCHITECT)</p>
          </div>
        </div>
        <div className="mt-4 text-[9px] text-slate-300 dark:text-slate-600 text-center font-black uppercase tracking-[0.4em]">
            <p>© 2025 T.H.E.L.M.A. v4.0.0 FINAL</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
