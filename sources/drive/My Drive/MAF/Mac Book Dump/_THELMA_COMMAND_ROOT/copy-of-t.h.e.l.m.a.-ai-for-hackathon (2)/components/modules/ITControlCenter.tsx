Original name: ITControlCenter.tsx
Drive ID: 1KvvatKk-brzWp39HzKANtzMEBLsoiSBI
Parent folder: My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/copy-of-t.h.e.l.m.a.-ai-for-hackathon (2)/components/modules/
Modified: 2026-01-20T18:17:28.319Z

import React, { useState, useEffect } from 'react';
import { Shield, Key, Lock, Eye, CheckCircle, AlertTriangle, Cpu, Terminal, RefreshCw, FileCode, Search } from 'lucide-react';
import { ApiKey, MasterAccessCodeLog, SecurityAlert, ModuleType, SystemConfiguration, SecurityAuditLog } from '../../types';
import { sendMessageToGemini } from '../../services/geminiService';

// Mock Data for the Agent to Monitor
const mockKeys: ApiKey[] = [
  { id: 'k_1', serviceName: 'Fleet Pod API', preview: 'sk_live...8x92', status: 'ACTIVE', created: '2024-01-02' },
  { id: 'k_2', serviceName: 'Aviation Telemetry', preview: 'sk_live...p92k', status: 'ACTIVE', created: '2024-01-03' },
  { id: 'k_3', serviceName: 'Legacy Insurance Gateway', preview: 'sk_test...11x0', status: 'REVOKED', created: '2023-11-15' },
];

const mockConfigs: SystemConfiguration[] = [
    { id: 'CFG-101', module: 'NET_ZERO', settingName: 'EmissionThreshold', value: '4500 MT', lastModified: '2025-01-03 14:00', modifiedBy: 'Steve Henry' },
    { id: 'CFG-102', module: 'FLEET', settingName: 'MaxRouteDeviation', value: '5.5 miles', lastModified: '2025-01-02 09:30', modifiedBy: 'Marcus Cole' },
    { id: 'CFG-103', module: 'IT_INFRA', settingName: 'FirewallRule_Inbound', value: 'ALLOW 443', lastModified: '2025-01-04 02:45', modifiedBy: 'UNKNOWN_USER' }, // Anomaly: Odd time, unknown user
];

const mockSecurityLogs: SecurityAuditLog[] = [
    { id: 'SEC-001', eventType: 'LOGIN', severity: 'INFO', sourceIp: '192.168.1.105', details: 'User Login: Steve Henry', timestamp: '2025-01-04 08:00:00', flaggedByAgent: false },
    { id: 'SEC-002', eventType: 'API_ACCESS', severity: 'INFO', sourceIp: '10.0.0.55', details: 'Fleet Pod Sync', timestamp: '2025-01-04 08:05:00', flaggedByAgent: false },
    { id: 'SEC-003', eventType: 'API_ACCESS', severity: 'WARNING', sourceIp: '185.22.1.40', details: 'Adaptation Layer Access Attempt', timestamp: '2025-01-04 08:15:00', flaggedByAgent: true }, // Anomaly: External IP
];

const ITControlCenter: React.FC = () => {
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'KEYS' | 'CONFIGS' | 'LOGS'>('KEYS');

  // Simulate Agent Boot-up Scan
  useEffect(() => {
      const bootUpScan = async () => {
          // Add an initial "All clear" or specific alert on load
          setScanResult("System Boot Sequence... IT Agent Initialized. Monitoring active on 3 channels.");
      };
      bootUpScan();
  }, []);

  const runAnomalyDetection = async () => {
    setIsScanning(true);
    setScanResult('Initializing Neural Scan of Configs and Logs...');
    
    // Construct the payload for the AI Agent
    const analysisPayload = {
        configurations: mockConfigs,
        recentLogs: mockSecurityLogs.filter(l => l.severity !== 'INFO' || l.flaggedByAgent) // Send interesting logs
    };

    const prompt = `
        Acting as the IT Anomaly Detection Agent, analyze the following system state:
        ${JSON.stringify(analysisPayload)}
        
        Task:
        1. Identify any configuration changes made at suspicious times (outside 0800-1800).
        2. Identify any API or Login events from non-internal IPs (Internal starts with 192.168 or 10.0).
        3. Generate a concise status report.
    `;

    try {
      const result = await sendMessageToGemini(prompt, [], ModuleType.IT_INFRA);
      setScanResult(result);
      
      // Simple heuristic: If the AI mentions "suspicious" or "anomaly", trigger a UI alert
      if (result.toLowerCase().includes("suspicious") || result.toLowerCase().includes("anomaly") || result.toLowerCase().includes("unauthorized")) {
        const newAlert: SecurityAlert = {
          id: Date.now().toString(),
          severity: 'HIGH',
          type: 'ANOMALY',
          message: 'Agent flagged configuration deviation or unauthorized IP access. See console output.',
          timestamp: new Date().toLocaleString(),
          status: 'NEW'
        };
        setAlerts(prev => [newAlert, ...prev]);
      }
    } catch (e) {
      setScanResult('Error connecting to Anomaly Detection Agent.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Status Bar */}
      <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex justify-between items-start">
            <div>
                <h2 className="text-2xl font-bold mb-1">IT Infrastructure Control</h2>
                <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2 text-green-400">
                        <Shield size={18} />
                        <span className="text-sm font-medium">Agent Active</span>
                    </div>
                    <div className="flex items-center space-x-2 text-blue-400">
                        <Eye size={18} />
                        <span className="text-sm font-medium">Monitoring Logs & Configs</span>
                    </div>
                </div>
            </div>
            <div className="text-right">
                <p className="text-slate-400 text-xs uppercase tracking-wider">Security Level</p>
                <p className="text-3xl font-bold">DEFCON 4</p>
            </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10">
            <Cpu size={160} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Data Tables */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
               {/* Tab Navigation */}
               <div className="flex border-b border-slate-200">
                   <button 
                    onClick={() => setActiveTab('KEYS')}
                    className={`px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'KEYS' ? 'bg-slate-50 text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                   >
                       API Keys
                   </button>
                   <button 
                    onClick={() => setActiveTab('CONFIGS')}
                    className={`px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'CONFIGS' ? 'bg-slate-50 text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                   >
                       System Configs
                   </button>
                   <button 
                    onClick={() => setActiveTab('LOGS')}
                    className={`px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'LOGS' ? 'bg-slate-50 text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                   >
                       Audit Logs
                   </button>
               </div>

               {/* Content */}
               <div className="p-0">
                   {activeTab === 'KEYS' && (
                        <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-medium">
                            <tr>
                                <th className="px-5 py-3">Service Name</th>
                                <th className="px-5 py-3">Key Preview</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockKeys.map((k) => (
                                <tr key={k.id}>
                                    <td className="px-5 py-3 font-medium text-slate-700">{k.serviceName}</td>
                                    <td className="px-5 py-3 font-mono text-slate-500 text-xs">{k.preview}</td>
                                    <td className="px-5 py-3">
                                        <span className={`flex items-center space-x-1 text-xs font-bold ${k.status === 'ACTIVE' ? 'text-green-600' : 'text-red-500'}`}>
                                            {k.status === 'ACTIVE' ? <CheckCircle size={12}/> : <Lock size={12}/>}
                                            <span>{k.status}</span>
                                        </span>
                                    </td>
                                    <td className="px-5 py-3">
                                        <button className="text-slate-400 hover:text-red-600">Revoke</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                   )}

                   {activeTab === 'CONFIGS' && (
                        <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-medium">
                            <tr>
                                <th className="px-5 py-3">Module</th>
                                <th className="px-5 py-3">Setting</th>
                                <th className="px-5 py-3">Value</th>
                                <th className="px-5 py-3">Last Modified</th>
                                <th className="px-5 py-3">User</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockConfigs.map((c) => (
                                <tr key={c.id} className={c.modifiedBy === 'UNKNOWN_USER' ? 'bg-red-50' : ''}>
                                    <td className="px-5 py-3 font-medium text-slate-700"><span className="bg-slate-100 px-2 py-1 rounded text-xs">{c.module}</span></td>
                                    <td className="px-5 py-3 text-slate-700">{c.settingName}</td>
                                    <td className="px-5 py-3 font-mono text-xs text-slate-600">{c.value}</td>
                                    <td className="px-5 py-3 text-slate-500 text-xs">{c.lastModified}</td>
                                    <td className="px-5 py-3 font-medium text-slate-700">{c.modifiedBy}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                   )}

                   {activeTab === 'LOGS' && (
                        <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-medium">
                            <tr>
                                <th className="px-5 py-3">Time</th>
                                <th className="px-5 py-3">Event</th>
                                <th className="px-5 py-3">Source IP</th>
                                <th className="px-5 py-3">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockSecurityLogs.map((l) => (
                                <tr key={l.id} className={l.severity === 'WARNING' ? 'bg-orange-50' : ''}>
                                    <td className="px-5 py-3 font-mono text-slate-500 text-xs">{l.timestamp.split(' ')[1]}</td>
                                    <td className="px-5 py-3 font-medium text-slate-700">{l.eventType}</td>
                                    <td className="px-5 py-3 font-mono text-xs text-slate-600">{l.sourceIp}</td>
                                    <td className="px-5 py-3 text-slate-500 text-xs">{l.details}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                   )}
               </div>
           </div>
        </div>

        {/* Right Column: AI Agent & Alerts */}
        <div className="space-y-6">
            {/* AI Anomaly Agent */}
            <div className="bg-slate-800 text-white rounded-xl shadow-lg border border-slate-700 p-5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <Cpu className="text-blue-400 animate-pulse" size={24} />
                        <div>
                            <h3 className="font-bold">IT Anomaly Agent</h3>
                            <p className="text-xs text-slate-400">Monitoring Active</p>
                        </div>
                    </div>
                    <button 
                        onClick={runAnomalyDetection}
                        disabled={isScanning}
                        className={`text-xs px-3 py-1 rounded border transition-colors flex items-center space-x-1 ${
                            isScanning 
                            ? 'bg-slate-700 border-slate-600 text-slate-500 cursor-wait' 
                            : 'bg-blue-600 border-blue-500 text-white hover:bg-blue-500'
                        }`}
                    >
                        <RefreshCw size={12} className={isScanning ? 'animate-spin' : ''} />
                        <span>{isScanning ? 'Scanning...' : 'Force System Scan'}</span>
                    </button>
                </div>
                
                <div className="bg-black/50 rounded-lg p-4 font-mono text-xs text-green-400 h-64 overflow-y-auto border border-slate-700/50">
                    <div className="flex items-center space-x-2 mb-2 pb-2 border-b border-slate-700">
                        <Terminal size={12} />
                        <span>Agent Output Stream</span>
                    </div>
                    {scanResult ? (
                        <p className="whitespace-pre-wrap">{scanResult}</p>
                    ) : (
                        <p className="text-slate-500 italic">System Idle. Waiting for trigger...</p>
                    )}
                </div>
            </div>

            {/* Active Alerts */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-800">Security Alerts</h3>
                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-bold">{alerts.length} New</span>
                </div>
                <div className="space-y-3">
                    {alerts.length === 0 ? (
                        <p className="text-sm text-slate-400 text-center py-4">No active alerts.</p>
                    ) : (
                        alerts.map(alert => (
                            <div key={alert.id} className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r-md">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-bold text-red-700 uppercase">{alert.type}</span>
                                    <span className="text-[10px] text-red-400">{alert.timestamp}</span>
                                </div>
                                <p className="text-sm text-slate-700">{alert.message}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ITControlCenter;