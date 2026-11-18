Original name: HRTrainingHub.tsx
Drive ID: 1psbDn88sMJY2cAZd7VHxsIxBLm-uaHLt
Parent folder: My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/copy-of-t.h.e.l.m.a.-ai-for-hackathon (2)/components/modules/
Modified: 2026-01-20T18:17:17.960Z


import React, { useState } from 'react';
import { GraduationCap, PlayCircle, Truck, Car, Plane, AlertTriangle, Shield, FileText, DollarSign, Users, Wifi, Droplet, ArrowLeft, Maximize2, Columns, CheckCircle, Zap, Activity, Info } from 'lucide-react';
import { TrainingModule } from '../../types';

// Mock Data updated to reflect 15-scenario structure
const trainingModules: TrainingModule[] = [
    // Transportation (Ground)
    { id: 'TM-01', title: 'Trucking Pro Dispatch', category: 'Transportation', status: 'Not Started', progress: 0, iconType: 'TRUCK', colorClass: 'bg-emerald-500' },
    { id: 'TM-02', title: 'Driveaway Dispatch', category: 'Transportation', status: 'Not Started', progress: 0, iconType: 'CAR', colorClass: 'bg-teal-500' },
    { id: 'TM-02b', title: 'Autonomous Fleet Ops', category: 'Transportation', status: 'Not Started', progress: 0, iconType: 'WIFI', colorClass: 'bg-teal-600' },
    
    // Aviation (Air)
    { id: 'TM-03', title: 'Drone Operations', category: 'Aviation', status: 'Not Started', progress: 0, iconType: 'DRONE', colorClass: 'bg-sky-500' },
    { id: 'TM-04', title: 'Aircraft Control', category: 'Aviation', status: 'Not Started', progress: 0, iconType: 'PLANE', colorClass: 'bg-indigo-500' },
    { id: 'TM-04b', title: 'Restricted Airspace Nav', category: 'Aviation', status: 'Not Started', progress: 0, iconType: 'ALERT', colorClass: 'bg-indigo-600' },

    // Emergency Services
    { id: 'TM-05', title: 'EMS Dispatch', category: 'Emergency Services', status: 'Not Started', progress: 0, iconType: 'HEART', colorClass: 'bg-rose-500' },
    { id: 'TM-06', title: 'First Aid Protocols', category: 'Emergency Services', status: 'Not Started', progress: 0, iconType: 'HEART', colorClass: 'bg-pink-500' },
    { id: 'TM-07', title: 'Emergency S.O.S.', category: 'Emergency Services', status: 'Not Started', progress: 0, iconType: 'ALERT', colorClass: 'bg-orange-500' },

    // Insurance & Claims
    { id: 'TM-08', title: 'Insurance Desk', category: 'Insurance & Claims', status: 'Not Started', progress: 0, iconType: 'SHIELD', colorClass: 'bg-amber-500' },
    { id: 'TM-09', title: 'Claims Processing', category: 'Insurance & Claims', status: 'Not Started', progress: 0, iconType: 'FILE', colorClass: 'bg-yellow-500' },

    // Administration
    { id: 'TM-10', title: 'Billing Center', category: 'Administration', status: 'Not Started', progress: 0, iconType: 'DOLLAR', colorClass: 'bg-emerald-600' },
    { id: 'TM-11', title: 'Customer Portal', category: 'Administration', status: 'Not Started', progress: 0, iconType: 'USERS', colorClass: 'bg-purple-500' },
    { id: 'TM-12', title: 'Fleet Management', category: 'Administration', status: 'Not Started', progress: 0, iconType: 'WIFI', colorClass: 'bg-fuchsia-500' },

    // Advanced Skills
    { id: 'TM-13', title: 'Accident Investigation', category: 'Advanced Skills', status: 'Not Started', progress: 0, iconType: 'ALERT', colorClass: 'bg-red-500' },
    { id: 'TM-14', title: 'Fuel Efficiency', category: 'Advanced Skills', status: 'Not Started', progress: 0, iconType: 'GAS', colorClass: 'bg-green-600' },
    { id: 'TM-15', title: 'Hazmat Compliance', category: 'Advanced Skills', status: 'Not Started', progress: 0, iconType: 'SHIELD', colorClass: 'bg-orange-600' },
];

const renderIcon = (type: string, size: number = 24) => {
    switch (type) {
        case 'TRUCK': return <Truck size={size} />;
        case 'CAR': return <Car size={size} />;
        case 'DRONE': return <Zap size={size} />;
        case 'PLANE': return <Plane size={size} />;
        case 'HEART': return <Activity size={size} />;
        case 'ALERT': return <AlertTriangle size={size} />;
        case 'SHIELD': return <Shield size={size} />;
        case 'FILE': return <FileText size={size} />;
        case 'DOLLAR': return <DollarSign size={size} />;
        case 'USERS': return <Users size={size} />;
        case 'WIFI': return <Wifi size={size} />;
        case 'GAS': return <Droplet size={size} />;
        default: return <GraduationCap size={size} />;
    }
};

const HRTrainingHub: React.FC = () => {
    const [view, setView] = useState<'HUB' | 'MODULE'>('HUB');
    const [activeModule, setActiveModule] = useState<TrainingModule | null>(null);
    const [showWorkspace, setShowWorkspace] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const handleLaunchModule = (module: TrainingModule) => {
        setActiveModule(module);
        setView('MODULE');
    };

    const categories = Array.from(new Set(trainingModules.map(m => m.category)));

    /* --- VIEW: TRAINING HUB DASHBOARD --- */
    if (view === 'HUB') {
        return (
            <div className="min-h-screen bg-[#064e3b] text-white p-8 animate-fadeIn"> 
                
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-2">
                        <GraduationCap size={48} className="text-emerald-300" />
                    </div>
                    <h1 className="text-4xl font-bold mb-2">L.I.L.Y. AI Training Hub</h1>
                    <p className="text-emerald-200 text-lg">Interactive Learning & Simulation Center</p>
                    <p className="text-emerald-400 text-sm mt-1 flex items-center justify-center gap-2">
                        <span className="w-4 h-3 bg-red-500 inline-block rounded-sm"></span> 15 Practice Scenarios per Sector • Master Demo
                    </p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 max-w-5xl mx-auto">
                    {[
                        { label: 'Overall Progress', value: '0%', color: 'text-emerald-300' },
                        { label: 'Completed', value: '0', color: 'text-white' },
                        { label: 'In Progress', value: '0', color: 'text-yellow-400' },
                        { label: 'Total Modules', value: trainingModules.length.toString(), color: 'text-blue-300' }
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-emerald-800/50 backdrop-blur-sm border border-emerald-700/50 rounded-xl p-4 text-center">
                            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                            <p className="text-emerald-200 text-xs uppercase tracking-wider mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Modules Grid */}
                <div className="max-w-6xl mx-auto space-y-10">
                    {categories.map(category => (
                        <div key={category}>
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-emerald-100">
                                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                                {category}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {trainingModules.filter(m => m.category === category).map(module => (
                                    <div 
                                        key={module.id}
                                        onClick={() => handleLaunchModule(module)}
                                        className="bg-emerald-900/40 border border-emerald-700/30 rounded-xl p-6 hover:bg-emerald-800/60 hover:border-emerald-500 transition-all cursor-pointer group flex items-center gap-4"
                                    >
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg ${module.colorClass}`}>
                                            {renderIcon(module.iconType)}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg text-white group-hover:text-emerald-300 transition-colors">{module.title}</h3>
                                            <div className="flex items-center gap-2 mt-2">
                                                <PlayCircle size={14} className="text-emerald-400" />
                                                <span className="text-xs text-emerald-400 font-medium bg-emerald-950/50 px-2 py-0.5 rounded-full">{module.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    /* --- VIEW: MODULE DETAIL & WORKSPACE --- */
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col animate-slideUp">
            
            {/* Top Bar */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-40 shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={() => setView('HUB')} className="flex items-center gap-1 text-slate-500 hover:text-slate-800 font-medium text-sm border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                        <ArrowLeft size={16} /> Back to L.I.L.Y. Hub
                    </button>
                    <div className="h-6 w-px bg-slate-200"></div>
                    <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded text-white ${activeModule?.colorClass}`}>
                            {activeModule && renderIcon(activeModule.iconType, 16)}
                        </div>
                        <h2 className="font-bold text-slate-900">{activeModule?.title}</h2>
                    </div>
                </div>
                <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                    L.I.L.Y. AI Assisted
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-1.5">
                <div className="bg-emerald-500 h-1.5 w-[20%]"></div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar Navigation */}
                <div className="w-64 bg-white border-r border-slate-200 overflow-y-auto p-4 hidden md:block">
                    <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider">Lesson Plan</h3>
                    <div className="space-y-2">
                        {[
                            { step: 1, title: 'Introduction', time: '5 min' },
                            { step: 2, title: 'Core Concepts', time: '10 min', active: true },
                            { step: 3, title: 'Simulation Event', time: '15 min' },
                            { step: 4, title: 'Analytics Review', time: '8 min' },
                            { step: 5, title: 'Final Certification', time: '10 min' },
                        ].map((s, idx) => (
                            <div key={idx} className={`p-3 rounded-lg border flex items-start gap-3 cursor-pointer transition-colors ${s.active ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-100 hover:border-slate-300'}`}>
                                <div className={`w-1 h-8 rounded-full ${s.active ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                                <div>
                                    <h4 className={`text-sm font-bold ${s.active ? 'text-emerald-800' : 'text-slate-700'}`}>{s.title}</h4>
                                    <span className="text-xs text-slate-400">{s.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto p-8 relative">
                    
                    {/* Workspace Toggle Banner */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between mb-8 shadow-sm">
                        <div>
                            <h3 className="text-blue-800 font-bold">L.I.L.Y. Simulation Workspace</h3>
                            <p className="text-blue-600 text-sm mt-1">Engage in realistic scenario training with AI coaching.</p>
                        </div>
                        <button 
                            onClick={() => setShowWorkspace(!showWorkspace)}
                            className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${showWorkspace ? 'bg-white text-blue-600 border border-blue-200' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                        >
                            {showWorkspace ? 'Exit Simulation' : 'Launch Simulation'}
                        </button>
                    </div>

                    {/* Content View */}
                    <div className={`flex gap-6 ${showWorkspace ? 'h-[600px]' : ''}`}>
                        
                        {/* Learning Content (Left side in workspace mode) */}
                        <div className={`transition-all duration-300 ${showWorkspace ? 'w-1/2 flex flex-col' : 'w-full max-w-3xl mx-auto'}`}>
                             {/* Video Player Placeholder */}
                            <div className="bg-slate-900 rounded-xl aspect-video w-full flex items-center justify-center relative overflow-hidden group shadow-lg mb-6">
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
                                <PlayCircle size={64} className="text-white relative z-10 cursor-pointer hover:scale-110 transition-transform" />
                                <div className="absolute bottom-4 left-4 text-white z-10">
                                    <p className="font-bold text-lg">Scenario 1: Fleet Initialization</p>
                                    <p className="text-xs text-slate-300">02:14 / 10:00</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex-1">
                                <h2 className="text-2xl font-bold text-slate-800 mb-4">{activeModule?.title}</h2>
                                <div className="prose prose-slate text-sm text-slate-600">
                                    <p className="mb-4">Welcome to the L.I.L.Y. training environment. This module utilizes our 15-scenario matrix to ensure comprehensive mastery of the subject.</p>
                                    <ul className="list-disc pl-5 space-y-2 mb-4">
                                        <li>Validate operational knowledge</li>
                                        <li>Execute compliance workflows</li>
                                        <li>Handle edge-case anomalies</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Workspace (Right Side) */}
                        {showWorkspace && (
                            <div className="w-1/2 bg-slate-50 border border-slate-200 rounded-xl flex flex-col overflow-hidden animate-slideRight">
                                {/* Workspace Header */}
                                <div className="bg-white border-b border-slate-200 p-3 flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                        <span className="text-xs font-bold text-slate-700 uppercase">Live Practice Environment</span>
                                    </div>
                                    <div className="flex gap-1">
                                        <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500"><Columns size={14}/></button>
                                        <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500"><Maximize2 size={14}/></button>
                                    </div>
                                </div>

                                {/* Stepper */}
                                <div className="bg-white border-b border-slate-200 p-4">
                                    <div className="flex justify-between items-center px-4">
                                        {[1, 2, 3, 4, 5].map(step => (
                                            <div key={step} className="flex flex-col items-center z-10 cursor-pointer" onClick={() => setCurrentStep(step)}>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${step === currentStep ? 'bg-blue-600 text-white shadow-md scale-110' : step < currentStep ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                                    {step < currentStep ? <CheckCircle size={14} /> : step}
                                                </div>
                                                <span className={`text-[10px] mt-1 font-medium ${step === currentStep ? 'text-blue-600' : 'text-slate-400'}`}>Step {step}</span>
                                            </div>
                                        ))}
                                        {/* Connecting Line */}
                                        <div className="absolute top-[86px] left-[60px] right-[60px] h-0.5 bg-slate-200 -z-0"></div>
                                    </div>
                                    <div className="mt-4 text-center">
                                        <h4 className="font-bold text-slate-800 text-sm">Simulation Active</h4>
                                        <p className="text-xs text-slate-500">Inputs are being monitored by L.I.L.Y. AI</p>
                                    </div>
                                </div>

                                {/* Interactive Form Area */}
                                <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50">
                                    <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm max-w-sm mx-auto">
                                        <h5 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm"><Truck size={16} className="text-blue-500"/> New Unit Registry</h5>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Unit Number</label>
                                                <input type="text" placeholder="e.g., TRUCK-001" className="w-full text-sm border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Make</label>
                                                <input type="text" placeholder="e.g., Freightliner" className="w-full text-sm border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Model</label>
                                                <input type="text" placeholder="e.g., Cascadia" className="w-full text-sm border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1">VIN</label>
                                                <input type="text" placeholder="17-character VIN" className="w-full text-sm border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                            </div>
                                            <div className="bg-blue-50 p-3 rounded text-xs text-blue-700 border border-blue-100 flex gap-2">
                                                <Info size={16} className="shrink-0" />
                                                <p>Tip: A VIN is unique to each truck and required for registration and insurance.</p>
                                            </div>
                                            <button className="w-full bg-blue-600 text-white py-2 rounded-md font-bold text-sm hover:bg-blue-700 transition-colors">
                                                Execute Step
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HRTrainingHub;
