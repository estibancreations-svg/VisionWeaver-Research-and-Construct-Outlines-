Original name: Settings.tsx
Drive ID: 1jnvgwZf7tqQn2zwf25od9kbO_fZCJb8I
Parent folder: My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/
Modified: 2026-01-12T00:25:33.000Z


import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Moon, Lock, Globe, Database, ToggleLeft, ToggleRight, Save } from 'lucide-react';

const Settings: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [autoArchive, setAutoArchive] = useState(true);

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">System Settings</h1>
                    <p className="text-slate-500 text-sm">Configure global preferences and system behavior.</p>
                </div>
                <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition-colors">
                    <Save size={16} /> Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Navigation Sidebar (Visual only) */}
                <div className="space-y-2">
                    {['General', 'Notifications', 'Appearance', 'Data Retention', 'API Access', 'Regional'].map((item, idx) => (
                        <button key={item} className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${idx === 0 ? 'bg-blue-50 text-blue-700' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>
                            {item}
                        </button>
                    ))}
                </div>

                <div className="col-span-2 space-y-6">
                    {/* Appearance */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Moon size={18} className="text-slate-400"/> Interface</h3>
                        <div className="flex items-center justify-between py-3 border-b border-slate-100">
                            <div>
                                <p className="text-sm font-medium text-slate-700">Dark Mode</p>
                                <p className="text-xs text-slate-400">Switch between light and dark themes (Simulation)</p>
                            </div>
                            <button onClick={() => setDarkMode(!darkMode)} className={`transition-colors ${darkMode ? 'text-blue-600' : 'text-slate-300'}`}>
                                {darkMode ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                            </button>
                        </div>
                         <div className="flex items-center justify-between py-3">
                            <div>
                                <p className="text-sm font-medium text-slate-700">Compact View</p>
                                <p className="text-xs text-slate-400">Increase information density on dashboards</p>
                            </div>
                            <button className="text-slate-300"><ToggleLeft size={32} /></button>
                        </div>
                    </div>

                    {/* Data */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Database size={18} className="text-slate-400"/> Data Governance</h3>
                        <div className="flex items-center justify-between py-3 border-b border-slate-100">
                            <div>
                                <p className="text-sm font-medium text-slate-700">Auto-Archive Logs</p>
                                <p className="text-xs text-slate-400">Archive logs older than 90 days to cold storage</p>
                            </div>
                            <button onClick={() => setAutoArchive(!autoArchive)} className={`transition-colors ${autoArchive ? 'text-blue-600' : 'text-slate-300'}`}>
                                {autoArchive ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
