Original name: Settings.tsx
Drive ID: 11IMBlOaTKwy962kqOayiy63XFyj8znpN
Parent folder: My Drive/MAF/Google AI Studio 1/t.h.e.l.m.a.-ai-core-&-modules (2)/components/modules/
Modified: 2026-01-31T10:56:50.000Z


import React, { useState, useMemo } from 'react';
import { 
  Settings as SettingsIcon, Bell, Lock, Database, Save, RefreshCw, 
  Network, UserCircle, Monitor, Zap, ArrowLeft, Leaf, AlertTriangle, 
  Eye, Smartphone, QrCode, Sparkles, Search, Sliders, ShieldCheck, 
  Cpu, Activity, Radio, Target, Camera, Filter, CheckCircle2, Cloud, Brain, Orbit, Volume2, Truck, Gauge, Siren
} from 'lucide-react';
import { ModuleType, SystemMode } from '../../types';

interface SettingsProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  voiceSettings: { enabled: boolean; volume: number; rate: number };
  setVoiceSettings: (val: any) => void;
  onVocalize?: (text: string) => void;
  setActiveModule: (m: ModuleType) => void;
  onBack?: () => void;
  systemMode: SystemMode;
}

type SubTab = 'General' | 'Security' | 'Nexus_VR' | 'F101_Tactical' | 'Neural_Matrix' | 'Notifications' | 'System' | 'Mobile_SDK';

interface ConfigItem {
    id: string;
    category: 'CORTEX' | 'FIELD' | 'DOMAIN' | 'GUARD' | 'VAULT' | 'SENSORY' | 'F101' | 'NOTIFY';
    label: string;
    value: boolean | number | string;
    type: 'TOGGLE' | 'SLIDER' | 'SELECT';
}

const Settings: React.FC<SettingsProps> = ({ 
  darkMode, 
  setDarkMode, 
  voiceSettings, 
  setVoiceSettings, 
  onVocalize,
  onBack,
  systemMode
}) => {
  const [activeTab, setActiveTab] = useState<SubTab>('General');
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [interactiveMode, setInteractiveMode] = useState(() => localStorage.getItem('thelma-interactive-mode') !== 'false');

  const configMatrix: ConfigItem[] = useMemo(() => {
    const items: ConfigItem[] = [];
    const categories: ConfigItem['category'][] = ['CORTEX', 'FIELD', 'DOMAIN', 'GUARD', 'VAULT', 'SENSORY', 'F101', 'NOTIFY'];
    
    const labels: Record<ConfigItem['category'], string[]> = {
        CORTEX: ['HENRY_SENSITIVITY', 'LILY_SIM_DIFF', 'PERCY_BUFFER_LOCK', 'THELMA_PRIORITY', 'INFERENCE_LATENCY', 'HALLUCINATION_GUARD', 'REASONING_DEPTH', 'TOKEN_CAP_SYNC', 'MESH_HYDRATION', 'NEURAL_PULSE_RATE', 'AGENT_HANDSHAKE_TTL', 'COG_LOAD_LIMIT', 'PREDICTIVE_BIAS', 'HEURISTIC_SWEEP_FRQ', 'CORE_CLK_SYNC', 'MESH_TOPOLOGY_VIEW'],
        FIELD: ['MOBILE_BIOMETRIC_TO', 'TELEPHOTO_MAX_ZOOM', 'LOCAL_CACHE_ENC', 'OFFLINE_SYNC_INT', 'HAPTIC_FEEDBACK_INT', 'GPS_POLLING_HIGH', 'FIELD_PTT_FREQ', 'MOBILE_CORTEX_HUD', 'LOCAL_MAP_STORAGE', 'REPORT_AUTO_ESCALATE', 'BATTERY_SAVE_TRGR', 'RELAY_AUTH_STRICT', 'MOBILE_DEBUG_LOG', 'ACCEL_TELEMETRY', 'UI_GLOVES_MODE', 'VOICE_COMMAND_ACT'],
        DOMAIN: ['AERIAL_WIND_SH_LIM', 'SEA_SONAR_DEPTH', 'LAND_ROAD_HAZ_LVL', 'PAYLOAD_WT_MAX', 'ROUTE_ECO_WEIGHT', 'HAZMAT_STRICT_PLCY', 'CROSS_BORDER_HAND', 'DOCK_SCHED_BUFFER', 'WEATHER_DIVERT_SENS', 'ETA_PROBABILITY_TH', 'FUEL_STATION_AUTO', 'REPAIR_AUTH_MIN', 'HOS_REST_ENFORCER', 'ZERO_G_STABILITY', 'SWARM_COLLISION_AV'],
        GUARD: ['PROTO_ZERO_AUTO', 'VIN_VERIFY_LEVEL', 'N8N_SCRUB_STRICT', 'CAPT_RELEASE_MULTI', 'IP_GEOBLOCK_US', 'THREAT_INTEL_FRQ', 'IMMUTABLE_HASH_INT', 'SENSITIVE_PII_RED', 'AES_ENCRYPTION_ROT', 'RECOVERY_TOKEN_TTL', 'FIREWALL_LOG_DEPTH', 'MALWARE_SANDBOX', 'COMPLIANCE_LOCK_Q', 'AUDIT_TRAIL_ROLL', 'IDENTITY_PULSE_FRQ', 'KEY_ROTATION_POLICY'],
        VAULT: ['DARK_MODE_INTENSITY', 'NEURAL_ORB_GLOW', 'UI_TRANSITION_SPD', 'VOICE_PITCH_VAR', 'SOUND_FX_VOLUME', 'GLASSSMORPH_OPAC', 'GRID_SNAP_STRICT', 'ANALYTICS_VIEW_Q', 'TELEMETRY_BUFF_SZ', 'LEDGER_VIEW_DEPTH', 'FONT_WEIGHT_FED', 'UI_HUE_SHIFT', 'CHART_REFR_RATE', 'SYSTEM_CLOCK_SYNC', 'API_KEY_PREVIEW', 'THELMA_BUILD_AUTO'],
        SENSORY: ['HAPTIC_TESLA_SUIT', 'EYE_TRACK_FOVEATED', 'BONE_CONDUCTION_LVL', 'ULTRASONIC_360_AUDIO', 'SCENT_EMITTER_SYNC', 'G_FORCE_SUIT_SYNC', 'VESTIBULAR_STIM', 'THERMAL_HAPTIC_GRID'],
        F101: ['BRIDGE_HEIGHT_LIMIT', 'TPMS_18_NODE_SYNC', 'BATTERY_THERMAL_CAP', 'FIFTH_WHEEL_LOCK_VER', 'CAB_TILT_SAFETY', 'HOS_ENFORCER_LVL', 'HAZMAT_PLACARD_SCAN', 'TRACTION_LOSS_SIM'],
        NOTIFY: ['PUSH_CRITICAL_ALERTS', 'EMAIL_WEEKLY_DIGEST', 'SMS_DRIVER_OVERRIDE', 'VOICE_INTERRUPT_MODE', 'GEOFENCE_EXIT_PING', 'PAYROLL_DEPOSIT_MSG', 'SHIFT_CHANGE_ALERT', 'MAINTENANCE_DUE_PUSH', 'THREAT_DETECT_SIREN', 'WEATHER_WARN_AUDIO', 'LOW_BATTERY_HAPTIC']
    };

    categories.forEach(cat => {
        labels[cat].forEach(label => {
            items.push({
                id: `${cat}_${label}`,
                category: cat,
                label: label.replace(/_/g, ' '),
                value: Math.random() > 0.5,
                type: 'TOGGLE'
            });
        });
    });
    return items;
  }, []);

  const tabToCategoryMap: Partial<Record<SubTab, ConfigItem['category']>> = {
      'Neural_Matrix': 'CORTEX',
      'Mobile_SDK': 'FIELD',
      'System': 'VAULT',
      'Security': 'GUARD',
      'Notifications': 'NOTIFY'
  };

  const categoryHeaders: Record<string, { title: string, subtitle: string, icon: any, color: string }> = {
      CORTEX: { title: 'Neural Matrix', subtitle: 'Agent Reasoning & Cognitive Load', icon: Brain, color: 'text-purple-500' },
      FIELD: { title: 'Mobile SDK', subtitle: 'Field App & Device Telemetry', icon: Smartphone, color: 'text-emerald-500' },
      VAULT: { title: 'System Vault', subtitle: 'Core Preferences & UI Physics', icon: Database, color: 'text-blue-500' },
      GUARD: { title: 'Security Protocols', subtitle: 'Access Control & Encryption', icon: ShieldCheck, color: 'text-red-500' },
      NOTIFY: { title: 'Notification Mesh', subtitle: 'Alerts, Pushes & Haptics', icon: Bell, color: 'text-orange-500' }
  };

  const currentCategory = tabToCategoryMap[activeTab];

  const filteredMatrix = configMatrix.filter(item => {
    const matchesSearch = item.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (currentCategory) {
        return matchesSearch && item.category === currentCategory;
    }
    return matchesSearch;
  });

  const handleModeChange = (mode: SystemMode) => {
      const event = new CustomEvent('thelma-mode-change', { detail: mode });
      window.dispatchEvent(event);
      if (onVocalize) onVocalize(`System mode switched to ${mode}. Adaptive UI engaging.`);
  };

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem('thelma-interactive-mode', interactiveMode.toString());
    setTimeout(() => {
        setIsSaving(false);
        if (onVocalize) onVocalize("Global configuration Matrix synchronized. v4.0.0 settings propagated.");
    }, 1500);
  };

  const tabs: { id: SubTab; icon: any }[] = [
    { id: 'General', icon: UserCircle },
    { id: 'Nexus_VR', icon: Orbit },
    { id: 'F101_Tactical', icon: Truck },
    { id: 'Neural_Matrix', icon: Network },
    { id: 'Mobile_SDK', icon: Smartphone },
    { id: 'Security', icon: Lock },
    { id: 'Notifications', icon: Bell },
    { id: 'System', icon: Database },
  ];

  return (
    <div className="p-4 md:p-8 space-y-4 md:space-y-6 animate-fadeIn pb-20 md:pb-12 h-screen flex flex-col overflow-hidden">
      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            {onBack && (
              <button onClick={onBack} className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-blue-600 transition-all shadow-sm shrink-0">
                <ArrowLeft size={20} />
              </button>
            )}
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                <SettingsIcon size={24} className="text-blue-600" /> Federation Command Matrix
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-[10px] md:text-xs uppercase tracking-widest font-black mt-1">
                Nexus v4.0 Active • Domain 3 Secured
              </p>
            </div>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button 
                onClick={handleSave}
                disabled={isSaving}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg ${
                isSaving ? 'bg-emerald-500 text-white animate-pulse' : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                }`}
            >
                {isSaving ? <RefreshCw size={14} className="animate-spin" /> : <Cloud size={14} />}
                {isSaving ? 'Syncing...' : 'Push to Field Relay'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        <aside className="lg:w-64 shrink-0 overflow-y-auto no-scrollbar">
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-1 no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-5 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border whitespace-nowrap min-w-[140px] lg:min-w-0 ${
                  activeTab === tab.id 
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-lg scale-[1.02] z-10' 
                    : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <tab.icon size={16} />
                {tab.id.replace('_', ' ')}
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors flex flex-col">
          
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="relative w-full md:w-80">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Scour Config Matrix..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none focus:border-blue-500 transition-all"
                  />
              </div>
              <div className="flex gap-2">
                  <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800 flex items-center gap-2">
                      <Zap size={12} className="text-blue-600 dark:text-blue-400" />
                      <span className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase">Field Latency: 0.5ms</span>
                  </div>
              </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-10 no-scrollbar">
            {activeTab === 'F101_Tactical' && (
                <div className="space-y-8 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-8 bg-slate-950 rounded-[2.5rem] text-white border-2 border-amber-500/30 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#f59e0b10,transparent)]"></div>
                            <h3 className="text-xl font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                                <Truck size={24} className="text-amber-500"/> Safety Protocols
                            </h3>
                            <div className="space-y-6 relative z-10">
                                {configMatrix.filter(i => i.category === 'F101').slice(0,4).map(item => (
                                    <div key={item.id} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                                        <span className="text-[10px] font-black uppercase text-slate-300">{item.label}</span>
                                        <button className={`w-10 h-5 rounded-full relative transition-all ${item.value ? 'bg-amber-500' : 'bg-slate-700'}`}>
                                            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${item.value ? 'left-6' : 'left-1'}`}/>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] border border-slate-200 dark:border-slate-700">
                             <h3 className="text-xl font-black uppercase tracking-widest mb-6 flex items-center gap-3 text-slate-800 dark:text-white">
                                <Gauge size={24} className="text-blue-500"/> Sensor Thresholds
                             </h3>
                             <div className="space-y-6">
                                {configMatrix.filter(i => i.category === 'F101').slice(4,8).map(item => (
                                    <div key={item.id} className="flex justify-between items-center p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                                        <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400">{item.label}</span>
                                        <button className="w-10 h-5 bg-slate-300 dark:bg-slate-600 rounded-full relative"><div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full"/></button>
                                    </div>
                                ))}
                             </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'Nexus_VR' && (
                <div className="space-y-8 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-8 bg-slate-950 rounded-[2.5rem] text-white border-2 border-blue-500/30 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#3b82f610,transparent)]"></div>
                            <h3 className="text-xl font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                                <Orbit size={24} className="text-blue-500 animate-spin-slow"/> Haptic Interface
                            </h3>
                            <div className="space-y-6 relative z-10">
                                {configMatrix.filter(i => i.category === 'SENSORY').slice(0,4).map(item => (
                                    <div key={item.id} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                                        <span className="text-[10px] font-black uppercase text-slate-300">{item.label}</span>
                                        <button className="w-10 h-5 bg-emerald-500 rounded-full relative"><div className="absolute top-1 left-6 w-3 h-3 bg-white rounded-full"/></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] border border-slate-200 dark:border-slate-700">
                             <h3 className="text-xl font-black uppercase tracking-widest mb-6 flex items-center gap-3 text-slate-800 dark:text-white">
                                <Volume2 size={24} className="text-purple-500"/> Audio Mesh
                             </h3>
                             <div className="space-y-6">
                                {configMatrix.filter(i => i.category === 'SENSORY').slice(4,8).map(item => (
                                    <div key={item.id} className="flex justify-between items-center p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                                        <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400">{item.label}</span>
                                        <button className="w-10 h-5 bg-slate-300 dark:bg-slate-600 rounded-full relative"><div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full"/></button>
                                    </div>
                                ))}
                             </div>
                        </div>
                    </div>
                </div>
            )}
            
            {currentCategory && (
                <div className="space-y-6 animate-fadeIn">
                    <div className="flex items-center gap-3 mb-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                        {categoryHeaders[currentCategory] && (
                            <div className={`p-3 rounded-xl bg-white dark:bg-slate-800 shadow-sm ${categoryHeaders[currentCategory].color}`}>
                                {React.createElement(categoryHeaders[currentCategory].icon, { size: 24 })}
                            </div>
                        )}
                        <div>
                            <h2 className="text-lg font-black uppercase text-slate-800 dark:text-white tracking-tight">
                                {categoryHeaders[currentCategory]?.title || currentCategory}
                            </h2>
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                                {categoryHeaders[currentCategory]?.subtitle || 'System Configuration Node'}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredMatrix.map(item => (
                            <div key={item.id} className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-between group hover:border-blue-400 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${
                                        item.category === 'CORTEX' ? 'bg-purple-100 text-purple-600' :
                                        item.category === 'FIELD' ? 'bg-emerald-100 text-emerald-600' :
                                        item.category === 'GUARD' ? 'bg-red-100 text-red-600' :
                                        item.category === 'NOTIFY' ? 'bg-orange-100 text-orange-600' :
                                        item.category === 'SENSORY' ? 'bg-blue-100 text-blue-600' :
                                        item.category === 'F101' ? 'bg-amber-100 text-amber-600' :
                                        'bg-blue-100 text-blue-600'
                                    }`}>
                                        {item.category === 'CORTEX' ? <Brain size={14}/> : 
                                        item.category === 'FIELD' ? <Smartphone size={14}/> :
                                        item.category === 'GUARD' ? <ShieldCheck size={14}/> : 
                                        item.category === 'NOTIFY' ? <Bell size={14}/> : 
                                        item.category === 'F101' ? <Truck size={14}/> :
                                        item.category === 'SENSORY' ? <Orbit size={14}/> : <Cpu size={14}/>}
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-slate-800 dark:text-white uppercase leading-tight">{item.label}</p>
                                        <p className="text-[7px] font-mono text-slate-400 uppercase tracking-tighter mt-1">{item.category}</p>
                                    </div>
                                </div>
                                <button className={`w-10 h-5 rounded-full relative transition-all ${item.value ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`}>
                                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${item.value ? 'left-6' : 'left-1'}`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'General' && (
              <div className="space-y-8 animate-fadeIn">
                    <section className="space-y-6">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800 pb-2">Interaction Protocols</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700 space-y-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <Sparkles className="text-blue-500" size={20} />
                                        <span className="text-[10px] font-black uppercase text-slate-700 dark:text-white">Active Neural Agent</span>
                                    </div>
                                    <button 
                                        onClick={() => setInteractiveMode(!interactiveMode)}
                                        className={`w-12 h-6 rounded-full transition-all relative ${interactiveMode ? 'bg-blue-600' : 'bg-slate-300'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${interactiveMode ? 'left-7' : 'left-1'}`} />
                                    </button>
                                </div>
                                <p className="text-[9px] text-slate-500 font-medium leading-relaxed">Enables the THELMA orchestrator to autonomously trigger alerts and navigate command nodes during high-load events.</p>
                            </div>

                            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700 space-y-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <Monitor className="text-blue-500" size={20} />
                                        <span className="text-[10px] font-black uppercase text-slate-700 dark:text-white">High Contrast UI</span>
                                    </div>
                                    <button 
                                        onClick={() => setDarkMode(!darkMode)}
                                        className={`w-12 h-6 rounded-full transition-all relative ${darkMode ? 'bg-blue-600' : 'bg-slate-300'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${darkMode ? 'left-7' : 'left-1'}`} />
                                    </button>
                                </div>
                                <p className="text-[9px] text-slate-500 font-medium leading-relaxed">Adjusts the visual interface for high-glare environments (Land Ops) or pitch-black stealth conditions (Aviation Matrix).</p>
                            </div>
                        </div>

                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800 pb-2">Federation Duty Status</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { id: 'NORMAL', icon: Zap, label: 'Nominal Hub', color: 'blue' },
                                { id: 'DEFCON', icon: AlertTriangle, label: 'Threat Enforced', color: 'red' },
                                { id: 'VR_TRAINING', icon: Orbit, label: 'Nexus VR v4.0', color: 'purple' }
                            ].map(mode => (
                                <button 
                                    key={mode.id} 
                                    onClick={() => handleModeChange(mode.id as SystemMode)} 
                                    className={`p-5 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${systemMode === mode.id ? `border-${mode.color}-500 bg-${mode.color}-50 dark:bg-${mode.color}-900/20 text-${mode.color}-700 dark:text-${mode.color}-400 shadow-lg` : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                >
                                    <mode.icon size={24} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{mode.label}</span>
                                </button>
                            ))}
                        </div>
                    </section>
              </div>
            )}
          </div>

          <div className="p-6 bg-slate-900 text-white shrink-0 border-t border-slate-800">
             <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                    <QrCode size={32} className="text-blue-500" />
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.3em]">Device Pair Node</p>
                        <p className="text-xs font-bold text-slate-400 font-mono">BEE-001-FCM-SYNC</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Architect Security Hash</p>
                    <p className="text-[9px] font-mono text-blue-400">SHA256: GLOBAL_MESH_V4_FINAL</p>
                </div>
             </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
