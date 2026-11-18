Original name: Layout.js.docx
Drive ID: 1hzzyrwrlDqOHdVN4lBGLMpfmgPymZhiV
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/
Modified: 2025-12-22T04:29:39.000Z

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Button } from "@/components/ui/button";
import { 
        LayoutDashboard, 
        DollarSign, 
        FileText, 
        Truck, 
        Users, 
        Menu, 
        X,
        Flag,
        ChevronRight,
        FolderOpen,
        GraduationCap
      } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Main Hub', page: 'MainHub', icon: LayoutDashboard },
    { name: 'Training Hub', page: 'TrainingHub', icon: GraduationCap, highlight: true },
    { name: 'Agent Hub', page: 'AgentHub', icon: Flag, secure: true },
    { name: 'IT Control Center', page: 'ITControlCenter', icon: Flag, secure: true, level5: true },
    { name: 'HR Admin', page: 'HRAdmin', icon: Users, secure: true },
    { name: 'Analytics', page: 'AnalyticsDashboard', icon: LayoutDashboard },
    { name: 'Team Setup', page: 'TeamSetup', icon: Users },
    { name: 'Route Optimizer', page: 'RouteOptimizer', icon: Truck },
    { name: 'Aviation Control', page: 'AviationControl', icon: Flag },
    { name: 'Document Hub', page: 'DocumentHub', icon: FolderOpen },
    { name: 'Billing', page: 'BillingDashboard', icon: DollarSign },
    { name: 'Documentation', page: 'ProjectDocs', icon: FileText },
    { name: 'Deployment', page: 'DeploymentDocs', icon: FileText }
    ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Flag className="w-6 h-6 text-blue-600" />
          <span className="font-bold text-lg">MOTIVE NEXT</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out
          lg:relative lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          {/* Logo */}
          <div className="hidden lg:flex items-center gap-3 p-6 border-b">
            <Flag className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="font-bold text-xl">MOTIVE NEXT</h1>
              <p className="text-xs text-gray-500">Trucking Management</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentPageName === item.page;
              
              return (
                <Link
                  key={item.name}
                  to={createPageUrl(item.page)}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive 
                      ? item.highlight ? 'bg-emerald-50 text-emerald-600 font-medium' : item.level5 ? 'bg-purple-50 text-purple-600 font-medium' : item.secure ? 'bg-red-50 text-red-600 font-medium' : 'bg-blue-50 text-blue-600 font-medium'
                      : item.highlight ? 'text-emerald-600 hover:bg-emerald-50 font-medium' : item.level5 ? 'text-purple-600 hover:bg-purple-50 font-medium' : item.secure ? 'text-red-600 hover:bg-red-50 font-medium' : 'text-gray-600 hover:bg-gray-100'}
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                  {item.level5 && <span className="text-xs">🛡️L5</span>}
                  {item.secure && !item.level5 && <span className="text-xs">🔒</span>}
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
            <p className="text-xs text-center text-gray-500">
              🇺🇸 Proudly Made In America
            </p>
            <p className="text-xs text-center text-gray-400 mt-1">
              © 2025 Steven Henry
            </p>
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
