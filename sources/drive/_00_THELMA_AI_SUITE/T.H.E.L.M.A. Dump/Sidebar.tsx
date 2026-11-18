Original name: Sidebar.tsx
Drive ID: 1r6834KSGe_qiOTmMGfnGjSss1oR0ifWF
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/
Modified: 2026-01-12T04:35:58.000Z


import React from 'react';
import { 
  LayoutDashboard, 
  Brain, 
  GraduationCap, 
  Flag, 
  Server, 
  Users, 
  BarChart2, 
  UserPlus, 
  Truck, 
  Plane, 
  FolderOpen, 
  DollarSign, 
  Settings, 
  Shield, 
  FileText, 
  UploadCloud,
  LogOut,
  Cpu
} from 'lucide-react';
import { ModuleType, User } from '../types';

interface SidebarProps {
  activeModule: ModuleType;
  setActiveModule: (m: ModuleType) => void;
  currentUser: User;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule, currentUser }) => {
  
  const navItems = [
    { id: ModuleType.DASHBOARD, label: 'Main Hub', icon: LayoutDashboard },
    { id: ModuleType.AI_INSIGHTS, label: 'AI Insights', icon: Brain },
    { id: ModuleType.TRAINING_HUB, label: 'Training Hub', icon: GraduationCap },
    { id: ModuleType.AGENT_HUB, label: 'Agent Hub', icon: Flag },
    { id: ModuleType.IT_CONTROL, label: 'IT Control Center', icon: Server, badge: 'L5' },
    { id: ModuleType.HR_ADMIN, label: 'HR Admin', icon: Users },
    { id: ModuleType.ANALYTICS, label: 'Analytics', icon: BarChart2 },
    { id: ModuleType.TEAM_SETUP, label: 'Team Setup', icon: UserPlus },
    { id: ModuleType.ROUTE_OPTIMIZER, label: 'Route Optimizer', icon: Truck },
    { id: ModuleType.AVIATION_CONTROL, label: 'Aviation Control', icon: Plane },
    { id: ModuleType.DOCUMENT_HUB, label: 'Document Hub', icon: FolderOpen },
    { id: ModuleType.BILLING, label: 'Billing', icon: DollarSign },
    { id: ModuleType.SETTINGS, label: 'Settings', icon: Settings },
    { id: ModuleType.SECURITY_INFO, label: 'Security Info', icon: Shield },
    { id: ModuleType.DOCUMENTATION, label: 'Documentation', icon: FileText },
    { id: ModuleType.DEPLOYMENT, label: 'Deployment', icon: UploadCloud },
  ];

  return (
    <div className="w-64 bg-white text-slate-600 h-screen flex flex-col fixed left-0 top-0 z-50 shadow-xl border-r border-slate-200">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex items-center space-x-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
           <Cpu size={20} />
        </div>
        <div>
          <h1 className="font-bold text-lg text-slate-900 tracking-tight leading-none">T.H.E.L.M.A. AI</h1>
          <p className="text-[10px] text-slate-400">Enterprise Logistics</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveModule(item.id)}
            className={`w-full flex items-center justify-between px-6 py-3 text-sm transition-all duration-200 group relative ${
              activeModule === item.id 
                ? 'bg-emerald-50 text-emerald-600 font-medium' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
            }`}
          >
            <div className="flex items-center space-x-3">
                <item.icon size={18} className={activeModule === item.id ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-600'} />
                <span>{item.label}</span>
            </div>
            
            {item.badge && (
                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200 flex items-center gap-1">
                    <Shield size={8} className="text-red-500" fill="currentColor"/> {item.badge}
                </span>
            )}
            
            {/* Active Indicator Bar */}
            {activeModule === item.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
            )}
          </button>
        ))}
      </div>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <div className="flex items-center space-x-3 mb-2 px-2">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold border border-slate-300">
             {currentUser.fullName.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-slate-800 truncate">{currentUser.fullName}</p>
            <p className="text-[10px] text-slate-500 truncate uppercase">{currentUser.role}</p>
          </div>
        </div>
        <div className="px-2">
            <button className="flex items-center space-x-2 text-xs text-red-500 hover:text-red-700 font-medium transition-colors">
                <LogOut size={12} />
                <span>Sign Out</span>
            </button>
        </div>
        <div className="mt-4 text-[10px] text-slate-300 text-center font-mono space-y-1">
            <p>© 2025 T.H.E.L.M.A. AI</p>
            <p>Made in America • Steve Henry</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
