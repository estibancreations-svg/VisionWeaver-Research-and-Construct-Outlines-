Original name: ITControlCenter.tsx
Drive ID: 1eQ4-VS8z8QWGOFXT5Xc8oUtXrS4V2FOh
Parent folder: My Drive/MAF/Google AI Studio 1/t.h.e.l.m.a.-ai-core-&-modules (2)/components/modules/
Modified: 2026-01-31T10:56:50.000Z


import React, { useState, useEffect } from 'react';
import { Globe, Power, ShieldAlert, Cpu, ArrowLeft, Fingerprint, Scan, CheckCircle2, Key, Plus, Save, Workflow, RefreshCw, Zap, Network, Share2, Radio, Server, Shield, Activity, X, Trash2, Calendar, User, Clock, AlertTriangle, Eye, EyeOff, Film, PlayCircle } from 'lucide-react';
import { ApiKey } from '../../types';
import IntegrationsBuffer from './IntegrationsBuffer';
import QuantumEdgeCenter from './QuantumEdgeCenter';
import { generateTrainingVideo } from '../../services/geminiService';

interface ITControlCenterProps {
  onBack?: () => void;
  onVocalize?: (text: string) => void;
}

interface ExtendedApiKey extends ApiKey {
    createdBy: string;
    expirationDate: string; // ISO String
    fullKey: string;
    endpointType: string;
}

const initialKeys: ExtendedApiKey[] = [
    { id: 'k_1', serviceName: 'Fleet Pod API', preview: 'sk_live...8x92', fullKey: '[secret value withheld]', status: 'ACTIVE', created: '2024-01-02', createdBy: 'Steve Henry', expirationDate: '2026-01-02', endpointType: 'REST API Key' },
    { id: 'k_n8n', serviceName: 'N8N Automation Cloud', preview: 'sk_...f77e', fullKey: '[secret value withheld]', status: 'ACTIVE', created: '2025-01-20', createdBy: 'P.E.R.C.Y. Auto-Gen', expirationDate: '2025-02-01', endpointType: 'Webhook Receiver' }, // Expiring soon (approx 5-10 days from "now")
    { id: 'k_gh', serviceName: 'GitHub: Antigravity Repo', preview: 'ghp_0T19...8k7j', fullKey: '[secret value withheld]', status: 'ACTIVE', created: '2025-01-20', createdBy: 'Steve Henry', expirationDate: '2025-01-25', endpointType: 'REST API Key' }, // Expiring very soon (1-5 days)
    { id: 'k_jules', serviceName: 'Google Jules (Veo/Flow)', preview: 'AQ.Ab...v7Hg', fullKey: '[secret value withheld]', status: 'ACTIVE', created: '2025-01-20', createdBy: 'System Admin', expirationDate: '2025-06-20', endpointType: 'GraphQL Token' }
];

const ITControlCenter: React.FC<ITControlCenterProps> = ({ onBack, onVocalize }) => {
  const [activeTab, setActiveTab] = useState<'CONTROL' | 'EDGE' | 'PIPELINE'>('CONTROL');
  const [killSwitchArmed, setKillSwitchArmed] = useState(false);
  const [showBiometricAuth, setShowBiometricAuth] = useState(false);
  const [authStep, setAuthStep] = useState(0); 
  const [showAddKey, setShowAddKey] = useState(false);
  
  // Key Management State - Persisted
  const [keys, setKeys] = useState<ExtendedApiKey[]>(() => {
      const saved = localStorage.getItem('thelma-api-keys');
      return saved ? JSON.parse(saved) : initialKeys;
  });
  const [selectedKey, setSelectedKey] = useState<ExtendedApiKey | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
      serviceName: '',
      endpointType: 'REST API Key',
      keySecret: ''
  });
  const [isEditingExisting, setIsEditingExisting] = useState(false);

  // Video Gen State
  const [videoPrompt, setVideoPrompt] = useState('');
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);

  useEffect(() => {
      localStorage.setItem('thelma-api-keys', JSON.stringify(keys));
  }, [keys]);

  // Expiration Logic
  const getDaysUntilExpiration = (dateStr: string) => {
      const today = new Date();
      const exp = new Date(dateStr);
      const diffTime = exp.getTime() - today.getTime();
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  };

  const getActiveDuration = (dateStr: string) => {
      const today = new Date();
      const start = new Date(dateStr);
      const diffTime = today.getTime() - start.getTime();
      return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  // Check for duplicate service name while typing
  useEffect(() => {
      const existing = keys.find(k => k.serviceName.toLowerCase() === formData.serviceName.toLowerCase());
      if (existing) {
          setIsEditingExisting(true);
      } else {
          setIsEditingExisting(false);
      }
  }, [formData.serviceName, keys]);

  const handleDeployCredential = () => {
      if (!formData.serviceName || !formData.keySecret) return;

      if (isEditingExisting) {
          setKeys(prev => prev.map(k => {
              if (k.serviceName.toLowerCase() === formData.serviceName.toLowerCase()) {
                  return {
                      ...k,
                      fullKey: formData.keySecret,
                      preview: `${formData.keySecret.substring(0, 4)}...${formData.keySecret.substring(formData.keySecret.length - 4)}`,
                      endpointType: formData.endpointType,
                      status: 'ACTIVE' // Reactivate if it was revoked
                  };
              }
              return k;
          }));
      } else {
          const newKey: ExtendedApiKey = {
              id: `k_${Date.now()}`,
              serviceName: formData.serviceName,
              fullKey: formData.keySecret,
              preview: `${formData.keySecret.substring(0, 4)}...${formData.keySecret.substring(formData.keySecret.length - 4)}`,
              endpointType: formData.endpointType,
              status: 'ACTIVE',
              created: new Date().toISOString().split('T')[0],
              createdBy: 'Steve Henry', // Default to current user
              expirationDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // Default 90 days
          };
          setKeys(prev => [...prev, newKey]);
      }
      setShowAddKey(false);
      setFormData({ serviceName: '', endpointType: 'REST API Key', keySecret: '' });
      if(onVocalize) onVocalize("Credential deployed to secure vault.");
  };

  const handleDeactivate = (id: string) => {
      setKeys(prev => prev.map(k => k.id === id ? { ...k, status: 'REVOKED' } : k));
      if (selectedKey?.id === id) {
          setSelectedKey(prev => prev ? { ...prev, status: 'REVOKED' } : null);
      }
  };

  const handleGenerateVideo = () => {
      if(!videoPrompt) return;
      setIsGeneratingVideo(true);
      if(onVocalize) onVocalize("Initiating Veo 3 render for IT Training asset.");
      setTimeout(() => {
          setIsGeneratingVideo(false);
          setVideoPrompt('');
          // In a real app, this would add to a media library
      }, 3000);
  }

  const initiateKillSwitch = () => {
    if (killSwitchArmed) {
        setKillSwitchArmed(false);
        return;
    }
    setShowBiometricAuth(true);
    setAuthStep(0);
  };

  const processBiometrics = () => {
    setAuthStep(1);
    setTimeout(() => {
        setAuthStep(2);
        setTimeout(() => {
            setKillSwitchArmed(true);
            setShowBiometricAuth(false);
            if(onVocalize) onVocalize("Protocol Zero Armed. Awaiting execution command.");
        }, 1500);
    }, 2000);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 animate-fadeIn pb-12 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            {onBack && (
              <button 
                onClick={onBack}
                className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-violet-600 transition-all shadow-sm shrink-0"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <div>
                <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">IT Infrastructure Command</h1>
                <p className="text-slate-500 dark:text-slate-400 text-[10px] md:text-sm flex items-center gap-2 font-medium">
                    <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></span>
                    v4.0.0 Infrastructure • Architect Access Only
                </p>
            </div>
          </div>
          <div className="flex gap-2 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm w-full md:w-auto">
              <button onClick={() => setActiveTab('CONTROL')} className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'CONTROL' ? 'bg-violet-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Access & Keys</button>
              <button onClick={() => setActiveTab('EDGE')} className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'EDGE' ? 'bg-violet-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Quantum Edge</button>
              <button onClick={() => setActiveTab('PIPELINE')} className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'PIPELINE' ? 'bg-violet-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Integrations</button>
          </div>
      </div>

      {activeTab === 'EDGE' && <QuantumEdgeCenter />}
      {activeTab === 'PIPELINE' && <IntegrationsBuffer />}

      {activeTab === 'CONTROL' && (
          <>
            {/* Alerts Section for Expirations */}
            <div className="space-y-2">
                {keys.filter(k => k.status === 'ACTIVE' && getDaysUntilExpiration(k.expirationDate) <= 15).map(k => {
                    const days = getDaysUntilExpiration(k.expirationDate);
                    return (
                        <div key={k.id} className={`p-3 rounded-xl border flex items-center justify-between ${
                            days <= 1 ? 'bg-red-500/10 border-red-500/50 text-red-500' :
                            days <= 5 ? 'bg-orange-500/10 border-orange-500/50 text-orange-500' :
                            'bg-yellow-500/10 border-yellow-500/50 text-yellow-500'
                        }`}>
                            <div className="flex items-center gap-3">
                                <AlertTriangle size={16} className="animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest">
                                    Credential Expiration Warning: {k.serviceName}
                                </span>
                            </div>
                            <span className="text-xs font-bold">{days <= 0 ? 'EXPIRED' : `${days} DAYS REMAINING`}</span>
                        </div>
                    );
                })}
            </div>

            {/* Biometric Modal */}
            {showBiometricAuth && (
                <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
                    <div className="w-full max-w-md bg-slate-900 border border-red-500/30 rounded-3xl p-6 md:p-8 text-center relative overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.2)] max-h-[90vh] flex flex-col">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"></div>
                        
                        <div className="mb-6 md:mb-8 shrink-0">
                            <ShieldAlert size={48} className="mx-auto text-red-500 mb-4" />
                            <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-widest">Protocol Zero Authorization</h3>
                            <p className="text-[10px] md:text-xs text-red-400 font-mono mt-2">MULTI-FACTOR QUANTUM HANDSHAKE REQUIRED</p>
                        </div>

                        <div className="relative h-40 md:h-48 flex items-center justify-center mb-6 md:mb-8 bg-slate-950 rounded-2xl border border-slate-800 shrink-0">
                            {authStep === 0 && (
                                <div className="cursor-pointer group" onClick={processBiometrics}>
                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-slate-700 flex items-center justify-center group-hover:border-red-500 transition-colors mx-auto">
                                        <Fingerprint size={40} className="text-slate-500 group-hover:text-red-500 transition-colors md:w-12 md:h-12" />
                                    </div>
                                    <p className="text-[10px] font-black uppercase text-slate-500 mt-4 tracking-widest group-hover:text-red-400">Tap to Verify Biometrics</p>
                                </div>
                            )}
                            {authStep === 1 && (
                                <div className="relative">
                                    <Scan size={64} className="text-red-500 animate-pulse" />
                                    <div className="absolute top-0 left-0 w-full h-full border-t-2 border-red-400 animate-spin"></div>
                                    <p className="text-[10px] font-black uppercase text-red-500 mt-8 tracking-widest animate-pulse">Analyzing Retinal Mesh...</p>
                                </div>
                            )}
                            {authStep === 2 && (
                                <div>
                                    <CheckCircle2 size={64} className="text-emerald-500 mx-auto mb-4" />
                                    <p className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">Identity Confirmed: L10 Architect</p>
                                </div>
                            )}
                        </div>

                        <button onClick={() => setShowBiometricAuth(false)} className="text-slate-500 hover:text-white text-xs uppercase font-bold tracking-widest py-2">Cancel Sequence</button>
                    </div>
                </div>
            )}

            {/* Key Detail Modal */}
            {selectedKey && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
                    <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl">
                        <div className="p-6 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-widest text-sm flex items-center gap-2">
                                <Key size={16} className="text-violet-500"/> Credential Details
                            </h3>
                            <button onClick={() => setSelectedKey(null)} className="text-slate-400 hover:text-red-500 transition-colors"><X size={20}/></button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div>
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Service Endpoint</p>
                                <p className="text-xl font-black text-slate-900 dark:text-white">{selectedKey.serviceName}</p>
                                <p className="text-xs text-violet-500 font-bold mt-1">{selectedKey.endpointType}</p>
                            </div>

                            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-600 dark:text-slate-300 break-all relative group">
                                {selectedKey.fullKey}
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1 bg-white dark:bg-slate-700 rounded shadow text-slate-500 hover:text-violet-500"><Scan size={14}/></button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl">
                                    <p className="text-[9px] font-black uppercase text-slate-400 flex items-center gap-1 mb-1"><User size={10}/> Created By</p>
                                    <p className="text-xs font-bold text-slate-800 dark:text-white">{selectedKey.createdBy}</p>
                                </div>
                                <div className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl">
                                    <p className="text-[9px] font-black uppercase text-slate-400 flex items-center gap-1 mb-1"><Calendar size={10}/> Created On</p>
                                    <p className="text-xs font-bold text-slate-800 dark:text-white">{selectedKey.created}</p>
                                </div>
                                <div className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl">
                                    <p className="text-[9px] font-black uppercase text-slate-400 flex items-center gap-1 mb-1"><Clock size={10}/> Active Duration</p>
                                    <p className="text-xs font-bold text-slate-800 dark:text-white">{getActiveDuration(selectedKey.created)} Days</p>
                                </div>
                                <div className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl">
                                    <p className="text-[9px] font-black uppercase text-slate-400 flex items-center gap-1 mb-1"><AlertTriangle size={10}/> Expires</p>
                                    <p className={`text-xs font-bold ${getDaysUntilExpiration(selectedKey.expirationDate) < 5 ? 'text-red-500' : 'text-slate-800 dark:text-white'}`}>
                                        {selectedKey.expirationDate}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <button 
                                    onClick={() => handleDeactivate(selectedKey.id)}
                                    disabled={selectedKey.status === 'REVOKED'}
                                    className="flex-1 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Trash2 size={14}/> {selectedKey.status === 'REVOKED' ? 'Revoked' : 'Deactivate'}
                                </button>
                                <button 
                                    onClick={() => {
                                        setFormData({
                                            serviceName: selectedKey.serviceName,
                                            endpointType: selectedKey.endpointType,
                                            keySecret: selectedKey.fullKey
                                        });
                                        setShowAddKey(true);
                                        setSelectedKey(null);
                                    }}
                                    className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all"
                                >
                                    Edit Credential
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Header Panel */}
            <div className="bg-slate-900 text-white p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-xl relative overflow-hidden flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 border border-slate-800">
                <div className="relative z-10 w-full lg:w-auto">
                    <h2 className="text-xl md:text-3xl font-black tracking-tight mb-2 uppercase">IT Security Core</h2>
                    <div className="flex items-center space-x-4 mt-4 md:mt-6 text-blue-400">
                        <div className="relative">
                        <Globe size={40} className="md:size-48 animate-spin-slow opacity-30 shrink-0" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <ShieldAlert size={16} className="text-blue-500 animate-pulse" />
                        </div>
                        </div>
                        <div>
                        <span className="text-xs md:text-sm font-black uppercase tracking-widest block">Global Threat Monitor</span>
                        <span className="text-[9px] md:text-[10px] text-slate-500 font-mono">STATUS: SCANNING SECTOR 7...</span>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-row items-center justify-between gap-6 w-full lg:w-auto z-10 bg-slate-950/30 p-4 rounded-2xl lg:bg-transparent lg:p-0">
                    <div className="text-left lg:text-right">
                        <p className="text-[8px] md:text-[10px] text-slate-400 uppercase tracking-widest font-black">Quantum Decryption Est.</p>
                        <p className="text-lg md:text-2xl font-black font-mono text-emerald-500 uppercase tracking-tighter">4y 212d 14h</p>
                    </div>
                    <button 
                        onClick={initiateKillSwitch}
                        className={`p-5 md:p-8 rounded-2xl md:rounded-3xl border-4 transition-all shadow-2xl shrink-0 relative group ${killSwitchArmed ? 'bg-red-700 border-red-900 animate-pulse scale-110' : 'bg-slate-800 border-slate-700 hover:border-red-600 active:scale-95'}`}
                        title="EMERGENCY KILL SWITCH"
                    >
                        <Power size={24} className="text-white relative z-10 md:w-7 md:h-7"/>
                        {killSwitchArmed && (
                            <div className="absolute inset-0 bg-red-600 blur-xl opacity-50 animate-pulse"></div>
                        )}
                    </button>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                {/* Add Key / Webhook Interface */}
                {showAddKey ? (
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 animate-fadeIn">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-widest text-xs">
                                {isEditingExisting ? 'Update Existing Credential' : 'Provision New Endpoint'}
                            </h3>
                            <button onClick={() => { setShowAddKey(false); setFormData({serviceName: '', endpointType: 'REST API Key', keySecret: ''}); }} className="text-slate-400 hover:text-red-500 transition-colors"><Zap size={16} className="rotate-45"/></button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Service Name</label>
                                    <input 
                                        type="text" 
                                        value={formData.serviceName}
                                        onChange={(e) => setFormData({...formData, serviceName: e.target.value})}
                                        placeholder="e.g., Fleet Tracker V2" 
                                        className={`w-full bg-slate-50 dark:bg-slate-950 border rounded-xl px-4 py-3 text-xs font-bold text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-colors ${isEditingExisting ? 'border-orange-400 dark:border-orange-500' : 'border-slate-200 dark:border-slate-800'}`}
                                    />
                                    {isEditingExisting && <p className="text-[9px] text-orange-500 font-bold mt-1 uppercase">Warning: Updating Existing Service Key</p>}
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Endpoint Type</label>
                                    <select 
                                        value={formData.endpointType}
                                        onChange={(e) => setFormData({...formData, endpointType: e.target.value})}
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 dark:text-white focus:border-blue-500 outline-none appearance-none"
                                    >
                                        <option>REST API Key</option>
                                        <option>Webhook Receiver</option>
                                        <option>GraphQL Token</option>
                                        <option>OAuth 2.0 Client Secret</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Key / Secret (Manual Entry)</label>
                                    <input 
                                        type="text" 
                                        value={formData.keySecret}
                                        onChange={(e) => setFormData({...formData, keySecret: e.target.value})}
                                        placeholder="Paste or type secure key..."
                                        className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs font-mono text-slate-700 dark:text-slate-300 focus:border-violet-500 outline-none"
                                    />
                                </div>
                                <button 
                                    onClick={handleDeployCredential}
                                    className={`w-full py-3 text-white rounded-xl text-[10px] font-black uppercase tracking-widest mt-6 shadow-lg transition-all active:scale-95 ${isEditingExisting ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-500'}`}
                                >
                                    {isEditingExisting ? 'Update & Rotate Key' : 'Deploy Credential'}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                        <button 
                            onClick={() => setShowAddKey(true)}
                            className="w-full py-4 bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2 group"
                        >
                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                                <Plus size={16} />
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest">Add API Key or Webhook</span>
                        </button>
                )}

                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
                    <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-4">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Active API Registry</h3>
                    </div>

                    <div className="p-0 overflow-x-auto">
                        <table className="w-full text-xs text-left min-w-[500px]">
                            <thead className="bg-slate-50 dark:bg-slate-900/30 text-slate-500 font-black uppercase tracking-widest text-[9px] border-b border-slate-100 dark:border-slate-800">
                                <tr><th className="px-6 py-4">Service</th><th className="px-6 py-4">Preview</th><th className="px-6 py-4">Status</th></tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {keys.map((k) => ( 
                                    <tr 
                                        key={k.id} 
                                        onClick={() => setSelectedKey(k)}
                                        className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                                    >
                                        <td className="px-6 py-4 font-black text-slate-800 dark:text-slate-200 uppercase tracking-tighter flex items-center gap-2">
                                            <Key size={12} className="text-blue-500" />
                                            {k.serviceName}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-slate-400 tracking-tighter text-[10px] group-hover:text-blue-500 transition-colors">{k.preview}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 rounded-full font-black uppercase tracking-widest text-[8px] border ${
                                                k.status === 'ACTIVE' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30' : 'bg-red-50 dark:bg-red-900/20 text-red-600 border-red-200'
                                            }`}>
                                                {k.status}
                                            </span>
                                        </td>
                                    </tr> 
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[60px] rounded-full"></div>
                        <h3 className="text-xl font-black uppercase tracking-tighter mb-4 flex items-center gap-3">
                            <Film size={24} className="text-blue-500" /> Veo Simulation Gen
                        </h3>
                        <p className="text-slate-400 text-xs font-medium leading-relaxed mb-6">
                            Create new IT security training scenarios using the Veo 3 Neural Engine. Assets are rendered in 1080p and submitted to the academy.
                        </p>
                        <div className="space-y-4 relative z-10">
                            <input 
                                type="text"
                                value={videoPrompt}
                                onChange={(e) => setVideoPrompt(e.target.value)}
                                placeholder="Describe security scenario (e.g. Phishing attempt in open office)"
                                className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-bold text-white placeholder-slate-600 focus:border-blue-500 outline-none"
                            />
                            <button 
                                onClick={handleGenerateVideo}
                                disabled={isGeneratingVideo || !videoPrompt}
                                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                            >
                                {isGeneratingVideo ? <RefreshCw className="animate-spin" size={14}/> : <PlayCircle size={14}/>}
                                {isGeneratingVideo ? 'Rendering...' : 'Generate Scenario'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
          </>
      )}
    </div>
  );
};

export default ITControlCenter;
