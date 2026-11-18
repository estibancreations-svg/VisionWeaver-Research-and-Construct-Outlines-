Original name: types.ts
Drive ID: 1gXLErmvX7RDPdrjXDQGcEWJMQ_eTqpku
Parent folder: My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/copy-of-t.h.e.l.m.a.-ai-for-hackathon (2)/
Modified: 2026-01-20T18:17:02.231Z


export enum UserRole {
  ARCHITECT = 'ARCHITECT',
  CEO = 'CEO',
  COO = 'COO',
  CTO = 'CTO',
  FLEET_MANAGER = 'FLEET_MANAGER',
  PILOT = 'PILOT',
  IT_SPECIALIST = 'IT_SPECIALIST',
  DISPATCHER = 'DISPATCHER',
  TRAINING_DIRECTOR = 'TRAINING_DIRECTOR'
}

export enum AgentType {
  THELMA = 'T.H.E.L.M.A.', // Orchestrator
  HENRY = 'H.E.N.R.Y.',   // Reasoning & Ops
  LILY = 'L.I.L.Y.',     // Training
  PERCY = 'P.E.R.C.Y.'    // Governance
}

export enum ModuleType {
  DASHBOARD = 'DASHBOARD',
  AI_INSIGHTS = 'AI_INSIGHTS',
  TRAINING_HUB = 'TRAINING_HUB',
  AGENT_HUB = 'AGENT_HUB',
  IT_CONTROL = 'IT_CONTROL',
  HR_ADMIN = 'HR_ADMIN',
  ANALYTICS = 'ANALYTICS',
  TEAM_SETUP = 'TEAM_SETUP',
  ROUTE_OPTIMIZER = 'ROUTE_OPTIMIZER',
  AVIATION_CONTROL = 'AVIATION_CONTROL',
  DOCUMENT_HUB = 'DOCUMENT_HUB',
  BILLING = 'BILLING',
  SETTINGS = 'SETTINGS',
  SECURITY_INFO = 'SECURITY_INFO',
  DOCUMENTATION = 'DOCUMENTATION',
  DEPLOYMENT = 'DEPLOYMENT',
  // Legacy maps
  FLEET = 'FLEET',
  AVIATION = 'AVIATION',
  AQUATIC = 'AQUATIC',
  EMERGENCY = 'EMERGENCY',
  INSURANCE = 'INSURANCE',
  HR_TRAINING = 'HR_TRAINING',
  IT_INFRA = 'IT_INFRA',
  INTEGRATIONS = 'INTEGRATIONS',
  ADAPTATION = 'ADAPTATION',
  NET_ZERO = 'NET_ZERO',
  GOVERNANCE = 'GOVERNANCE'
}

export interface User {
  email: string;
  fullName: string;
  role: UserRole;
  department: string;
  clearanceLevel: number;
  avatarUrl?: string;
}

export interface FleetVehicle {
  id: string;
  unitNumber: string;
  type: 'TRUCK' | 'VAN' | 'HEAVY';
  status: 'ACTIVE' | 'MAINTENANCE' | 'IDLE';
  driver: string;
  location: string;
  fuelLevel: number;
  vin?: string;
  assignedDriverId?: string;
  loads?: Array<{id: string, origin: string, destination: string, weight: string, date: string}>;
  maintenanceLog?: Array<{id: string, date: string, service: string, cost: string, advice: string}>;
  documents?: Array<{id: string, name: string, type: string, date: string}>;
}

export interface AviationAsset {
  id: string;
  callsign: string;
  type: 'DRONE' | 'AIR_POD' | 'HELICOPTER';
  status: 'IN_FLIGHT' | 'GROUNDED' | 'MAINTENANCE';
  altitude: string;
  batteryLevel: number;
  coordinates: string;
  flightHours: number;
  lastService: string;
  maintenanceLog?: Array<{id: string, date: string, service: string, note: string}>;
}

export interface DriverProfile {
  id: string;
  name: string;
  licenseNumber: string;
  endorsements: string[];
  lastTrainingDate: string;
  performanceScore: number;
}

export interface UnitConfiguration {
  id: string;
  name: string;
  type: UnitType;
  powerSource: PowerSource;
  dimensions: {
    length: number;
    width: number;
    height: number;
    weight: number;
  };
  hazmatCertified: boolean;
}

export type PowerSource = 'DIESEL' | 'GASOLINE' | 'ELECTRIC' | 'HYBRID';
export type UnitType = 'TRUCK' | 'AUTOMOBILE' | 'MARINE_VESSEL' | 'AIRCRAFT' | 'DRONE' | 'AIR_POD';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  agent?: AgentType;
}

export interface SecurityAuditLog {
  id: string;
  eventType: 'LOGIN' | 'CONFIG_CHANGE' | 'API_ACCESS' | 'FIREWALL';
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  sourceIp: string;
  details: string;
  timestamp: string;
  flaggedByAgent: boolean;
}

export interface SystemConfiguration {
  id: string;
  module: string;
  settingName: string;
  value: string;
  lastModified: string;
  modifiedBy: string;
}

export interface SecurityAlert {
  id: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  type: 'ANOMALY' | 'BREACH' | 'POLICY';
  message: string;
  timestamp: string;
  status: 'NEW' | 'INVESTIGATING' | 'RESOLVED';
}

export interface TrainingModule {
  id: string;
  title: string;
  category: 'Transportation' | 'Aviation' | 'Emergency Services' | 'Insurance & Claims' | 'Administration' | 'Advanced Skills';
  status: 'Not Started' | 'In Progress' | 'Completed';
  progress: number;
  iconType: 'TRUCK' | 'CAR' | 'PLANE' | 'DRONE' | 'HEART' | 'ALERT' | 'SHIELD' | 'FILE' | 'DOLLAR' | 'USERS' | 'WIFI' | 'GAS';
  colorClass: string;
}

export interface N8nWorkflow {
  id: string;
  name: string;
  status: 'ACTIVE' | 'PAUSED' | 'ERROR';
  lastRun: string;
  trigger: 'WEBHOOK' | 'SCHEDULE' | 'EVENT';
  nodes: number;
  connectorType: 'INSURANCE' | 'EMS' | 'FUEL' | 'REGULATORY';
}

export interface LegacySystem {
  id: string;
  name: string;
  type: 'ERP' | 'TELEMATICS' | 'HR' | 'FINANCE';
  connectionStatus: 'CONNECTED' | 'SYNCING' | 'ERROR' | 'DISCONNECTED';
  lastSync: string;
  dataPoints: number;
}

export interface CarbonMetric {
  id: string;
  category: 'FUEL' | 'ELECTRICITY' | 'IDLING';
  value: number;
  unit: 'MT' | 'kWh' | 'L';
  trend: number;
}

export interface MasterAccessCodeLog {
  id: string;
  codeId: string;
  accessLevel: number;
  createdBy: string;
  usageCount: number;
  timestamp: string;
  action: string;
}

export interface ApiKey {
  id: string;
  serviceName: string;
  preview: string;
  status: 'ACTIVE' | 'REVOKED';
  created: string;
}

export interface AquaticAsset {
  id: string;
  name: string;
  type: 'CARGO_SHIP' | 'PATROL_BOAT' | 'TUG';
  status: 'AT_SEA' | 'DOCKED' | 'MAINTENANCE';
  coordinates: string;
  fuelLevel?: number;
  maintenanceLog?: Array<{id: string, date: string, service: string, note: string}>;
}
