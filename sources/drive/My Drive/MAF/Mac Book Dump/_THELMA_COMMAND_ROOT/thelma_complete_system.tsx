Original name: thelma_complete_system.tsx
Drive ID: 1pgQj7IdXVeeILW0S375irn0mjaMtcggu
Parent folder: My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/
Modified: 2026-01-20T18:03:26.810Z

import React, { useState, useEffect } from 'react';
import { Shield, Users, Package, Camera, MapPin, Zap, FileCheck, Download, Radio, TrendingUp, DollarSign, Globe, AlertCircle, Settings, Lock, Home, Truck, Plane, Ship, AlertTriangle, CheckCircle, BookOpen, BarChart3, Database, Menu, X, Search, Bell, ChevronRight } from 'lucide-react';

// Complete System State
const ThelmaSystem = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');
  const [activeDomain, setActiveDomain] = useState('LAND');
  const [userRole, setUserRole] = useState('OPS_MANAGER');
  const [selectedModule, setSelectedModule] = useState(null);
  const [aiResponse, setAiResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // System State
  const [systemState] = useState({
    version: '5.0.0-ULTRA',
    deployment_mode: 'CLOUD',
    instance_id: 'THELMA-' + Date.now()
  });

  // Certifications
  const [certifications] = useState({
    domains: ['LAND', 'SEA'],
    modules: [1, 2, 3, 6, 7, 8],
    training_completed: ['MOD-01-SC-01', 'MOD-02-SC-01', 'MOD-03-SC-01'],
    training_progress: 18
  });

  // 15 Core Modules
  const modules = [
    { id: 1, name: 'User & Role Access', icon: Lock, certified: true, scenarios: 15, color: 'blue', desc: 'Authentication and permissions' },
    { id: 2, name: 'Unit Registry', icon: Package, certified: true, scenarios: 15, color: 'green', desc: 'Asset and vehicle management' },
    { id: 3, name: 'Scan Enforcement', icon: Camera, certified: true, scenarios: 15, color: 'purple', desc: 'Barcode and verification' },
    { id: 4, name: 'Media Capture', icon: Camera, certified: false, scenarios: 15, color: 'pink', desc: 'Photo and video evidence' },
    { id: 5, name: 'Location Verification', icon: MapPin, certified: false, scenarios: 15, color: 'cyan', desc: 'GPS and geofencing' },
    { id: 6, name: 'Workflow Engine', icon: Zap, certified: true, scenarios: 15, color: 'yellow', desc: 'Process automation' },
    { id: 7, name: 'Audit Trails', icon: FileCheck, certified: true, scenarios: 15, color: 'indigo', desc: 'Immutable logging' },
    { id: 8, name: 'Reporting & Export', icon: Download, certified: true, scenarios: 15, color: 'teal', desc: 'Data export and analytics' },
    { id: 9, name: 'Logistics News', icon: Radio, certified: false, scenarios: 15, color: 'orange', desc: 'Operational updates' },
    { id: 10, name: 'VACUUM Analytics', icon: TrendingUp, certified: false, scenarios: 15, color: 'violet', desc: 'Pattern detection' },
    { id: 11, name: 'Tax & Regulatory', icon: DollarSign, certified: false, scenarios: 15, color: 'red', desc: 'Compliance tracking' },
    { id: 12, name: 'Hub Oversight', icon: Globe, certified: false, scenarios: 15, color: 'emerald', desc: 'Multi-site management' },
    { id: 13, name: 'Exception Handling', icon: AlertCircle, certified: false, scenarios: 15, color: 'amber', desc: 'Error management' },
    { id: 14, name: 'Security & Compliance', icon: Shield, certified: false, scenarios: 15, color: 'rose', desc: 'Security protocols' },
    { id: 15, name: 'System Admin', icon: Settings, certified: false, scenarios: 15, color: 'slate', desc: 'System configuration' }
  ];

  // Audit Logs
  const [logs] = useState([
    { 
      id: 1, 
      timestamp: new Date().toISOString(), 
      user: 'USER-047', 
      role: 'OPS_MANAGER', 
      action: 'Deploy Execute', 
      module: 'MOD-06', 
      evidence: ['scan_001', 'gps_001'], 
      result: 'success', 
      metadata: { domain: 'LAND' } 
    },
    { 
      id: 2, 
      timestamp: new Date(Date.now() - 120000).toISOString(), 
      user: 'USER-047', 
      role: 'OPS_MANAGER', 
      action: 'Scan Capture', 
      module: 'MOD-03', 
      evidence: ['scan_002'], 
      result: 'success', 
      metadata: { domain: 'LAND' } 
    },
    { 
      id: 3, 
      timestamp: new Date(Date.now() - 240000).toISOString(), 
      user: 'USER-032', 
      role: 'FIELD_OPERATOR', 
      action: 'Cert Check', 
      module: 'MOD-01', 
      evidence: [], 
      result: 'fail', 
      metadata: { domain: 'AIR', reason: 'missing_certification' } 
    }
  ]);

  // Unit Config
  const [unitConfig] = useState({
    unit_id: 'UNIT-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    vehicleClass: 'Class 8 Tractor',
    payloadWeight: '42000',
    scans_completed: ['BOL', 'VIN'],
    scans_required: ['BOL', 'VIN', 'LICENSE_PLATE'],
    media_captured: ['unit_photo_001.jpg'],
    gps_lock: { lat: 27.9506, lng: -82.4572, accuracy: 10 }
  });

  // Deployment
  const [deployment] = useState({
    origin: { address: 'Tampa Distribution Center', gps: { lat: 27.9506, lng: -82.4572 } },
    destination: { address: 'Miami Port Terminal', gps: { lat: 25.7617, lng: -80.1918 } }
  });

  // Execute Deployment
  const executeDeployment = async () => {
    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 1200));
    let response = '🔍 **Strategic Analysis (HENRY)**\n\n';
    response += `Route Distance: 280 miles\n`;
    response += `Estimated Time: 4 hours 37 minutes\n`;
    response += `Weather: Clear conditions\n`;
    response += `Checkpoints: 3 identified\n\n`;
    setAiResponse(response);
    
    await new Promise(resolve => setTimeout(resolve, 1200));
    const domainCertified = certifications.domains.includes(activeDomain);
    const moduleCertified = certifications.modules.includes(6);
    
    if (!domainCertified) {
      response += '⚠️ **Certification Alert (LILY)**\n\n';
      response += `Operator missing ${activeDomain} domain certification.\n`;
      response += `Required Training: MOD-07-SC-03\n\n`;
    } else {
      response += '✅ **Certification Verified (LILY)**\n\n';
      response += `Domain: ${activeDomain} - Certified\n`;
      response += `Training Status: ${certifications.training_progress}/225 scenarios completed\n\n`;
    }
    setAiResponse(response);
    
    await new Promise(resolve => setTimeout(resolve, 1200));
    const scansComplete = unitConfig.scans_completed.length >= 2;
    const hasEvidence = unitConfig.media_captured.length > 0 && unitConfig.gps_lock;
    const authorized = domainCertified && moduleCertified && scansComplete && hasEvidence;
    
    if (authorized) {
      response += '✅ **Authorization Granted (PERCY)**\n\n';
      response += `All enforcement gates passed:\n`;
      response += `✓ Certification verified\n`;
      response += `✓ Scans complete (${unitConfig.scans_completed.length}/${unitConfig.scans_required.length})\n`;
      response += `✓ Evidence attached\n\n`;
      response += `Audit ID: AUD-${systemState.instance_id}-${logs.length + 1}\n`;
    } else {
      response += '❌ **Authorization Denied (PERCY)**\n\n';
      response += `Enforcement gates failed:\n`;
      if (!domainCertified) response += `✗ Missing ${activeDomain} certification\n`;
      if (!scansComplete) response += `✗ Insufficient scans\n`;
    }
    setAiResponse(response);
    setIsProcessing(false);
  };

  // Stats
  const stats = [
    { label: 'Active Units', value: '247', change: '+12%', icon: Truck, color: 'blue' },
    { label: 'Module Certifications', value: `${certifications.modules.length}/15`, change: '40%', icon: Shield, color: 'green' },
    { label: 'Compliance Score', value: '98.7%', change: '+2.3%', icon: CheckCircle, color: 'emerald' },
    { label: 'Training Progress', value: `${certifications.training_progress}/225`, change: '8%', icon: BookOpen, color: 'purple' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-slate-100 rounded-lg">
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="text-white" size={24} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">T.H.E.L.M.A. AI</h1>
                  <p className="text-xs text-slate-500">v{systemState.version} • {systemState.deployment_mode}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg">
                <Search size={16} className="text-slate-400" />
                <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm w-48" />
              </div>

              <div className="flex items-center gap-2">
                {['LAND', 'SEA', 'AIR'].map(domain => (
                  <button
                    key={domain}
                    onClick={() => setActiveDomain(domain)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      activeDomain === domain 
                        ? 'bg-blue-500 text-white shadow-md' 
                        : certifications.domains.includes(domain)
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}
                  >
                    {domain}
                  </button>
                ))}
              </div>

              <button className="relative p-2 hover:bg-slate-100 rounded-lg">
                <Bell size={20} className="text-slate-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-slate-900">{userRole.replace('_', ' ')}</p>
                  <p className="text-xs text-slate-500">{certifications.modules.length} modules certified</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {userRole.split('_').map(w => w[0]).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-0 lg:w-20'} bg-white border-r border-slate-200 transition-all duration-300 overflow-hidden`}>
          <nav className="p-4 space-y-2">
            {[
              { id: 'dashboard', icon: Home, label: 'Dashboard' },
              { id: 'deployment', icon: Truck, label: 'Deployment' },
              { id: 'modules', icon: Database, label: 'Modules' },
              { id: 'training', icon: BookOpen, label: 'Training' },
              { id: 'governance', icon: FileCheck, label: 'Governance' },
              { id: 'analytics', icon: BarChart3, label: 'Analytics' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeView === item.id
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <item.icon size={20} />
                <span className={sidebarOpen ? 'block' : 'hidden lg:block'}>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-73px)]">
          {activeView === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Operations Dashboard</h2>
                <p className="text-slate-600">System overview and key metrics</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                        <stat.icon className={`text-${stat.color}-600`} size={24} />
                      </div>
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {logs.slice(0, 5).map(log => (
                      <div key={log.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className={`w-2 h-2 rounded-full ${
                            log.result === 'success' ? 'bg-green-500' : 'bg-red-500'
                          }`} />
                          <div>
                            <p className="text-sm font-medium text-slate-900">{log.action}</p>
                            <p className="text-xs text-slate-500">{log.module} • {new Date(log.timestamp).toLocaleTimeString()}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          log.result === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {log.result}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">System Status</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Instance ID</span>
                      <span className="text-sm font-mono text-slate-900">{systemState.instance_id.substring(0, 20)}...</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Deployment Mode</span>
                      <span className="text-sm font-semibold text-blue-600">{systemState.deployment_mode}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Active Domain</span>
                      <span className="text-sm font-semibold text-slate-900">{activeDomain}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Audit Logs</span>
                      <span className="text-sm font-semibold text-slate-900">{logs.length} entries</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'modules' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Core Modules</h2>
                <p className="text-slate-600">15 operational modules • 225 training scenarios total</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {modules.map(module => (
                  <button
                    key={module.id}
                    onClick={() => setSelectedModule(module)}
                    className={`text-left bg-white rounded-xl p-5 shadow-sm border-2 transition-all hover:shadow-md ${
                      module.certified ? 'border-green-200' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-lg bg-${module.color}-100 flex items-center justify-center`}>
                        <module.icon className={`text-${module.color}-600`} size={24} />
                      </div>
                      {module.certified && <CheckCircle className="text-green-500" size={20} />}
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">MOD-{module.id.toString().padStart(2, '0')}</h3>
                    <p className="text-sm text-slate-600 mb-2">{module.name}</p>
                    <p className="text-xs text-slate-500 mb-3">{module.desc}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">{module.scenarios} scenarios</span>
                      <span className={`px-2 py-1 rounded-full font-medium ${
                        module.certified ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {module.certified ? 'Certified' : 'Training Required'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {selectedModule && (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{selectedModule.name}</h3>
                      <p className="text-sm text-slate-600 mb-2">Module {selectedModule.id} • {selectedModule.scenarios} training scenarios</p>
                      <p className="text-sm text-slate-700">{selectedModule.desc}</p>
                    </div>
                    <button onClick={() => setSelectedModule(null)} className="text-slate-400 hover:text-slate-600">
                      <X size={20} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-700">
                      <strong>Status:</strong> {selectedModule.certified ? 'Certified ✓' : 'Training Required'}
                    </p>
                    <p className="text-sm text-slate-700">
                      <strong>Enforcement:</strong> {selectedModule.certified ? 'Access Granted' : 'Access Restricted'}
                    </p>
                    {!selectedModule.certified && (
                      <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        Start Training
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeView === 'training' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Training & Certification</h2>
                <p className="text-slate-600">Complete scenarios to unlock modules and domains</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Overall Progress</h3>
                    <p className="text-sm text-slate-500">{certifications.training_progress} of 225 scenarios completed</p>
                  </div>
                  <div className="text-3xl font-bold text-blue-600">
                    {Math.round((certifications.training_progress / 225) * 100)}%
                  </div>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all"
                    style={{ width: `${(certifications.training_progress / 225) * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Available Training</h3>
                <div className="space-y-3">
                  {[
                    { module: 'MOD-04', scenario: 'SC-01', title: 'Basic Photo Capture', required: true },
                    { module: 'MOD-04', scenario: 'SC-02', title: 'Damage Documentation', required: true },
                    { module: 'MOD-05', scenario: 'SC-01', title: 'GPS Verification', required: true }
                  ].map((training, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <BookOpen className="text-blue-500" size={20} />
                        <div>
                          <p className="text-sm font-medium text-slate-900">{training.title}</p>
                          <p className="text-xs text-slate-500">{training.module} • {training.scenario}</p>
                        </div>
                      </div>
                      <button className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">
                        Start
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeView === 'deployment' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Deployment Operations</h2>
                <p className="text-slate-600">Execute logistics deployments with AI assistance</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Unit Configuration</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Unit ID</label>
                      <input value={unitConfig.unit_id} readOnly className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Vehicle Class</label>
                      <input value={unitConfig.vehicleClass} readOnly className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50" />
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">Scan Progress</span>
                        <span className="text-sm font-bold text-blue-600">
                          {unitConfig.scans_completed.length}/{unitConfig.scans_required.length}
                        </span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${(unitConfig.scans_completed.length / unitConfig.scans_required.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Route Planning</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Origin</label>
                      <input value={deployment.origin.address} readOnly className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Destination</label>
                      <input value={deployment.destination.address} readOnly className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50" />
                    </div>
                    <button
                      onClick={executeDeployment}
                      disabled={isProcessing}
                      className={`w-full py-3 rounded-lg font-semibold transition-all ${
                        isProcessing
                          ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg'
                      }`}
                    >
                      {isProcessing ? 'Processing...' : 'Execute Deployment'}
                    </button>
                  </div>
                </div>
              </div>

              {aiResponse && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">AI Analysis</h3>
                  <div