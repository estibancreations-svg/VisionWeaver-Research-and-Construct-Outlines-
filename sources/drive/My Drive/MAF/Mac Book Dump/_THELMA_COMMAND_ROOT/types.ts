Original name: types.ts
Drive ID: 1Aft7wXA5Orfhs3wds0tqJOSKWxa7qFUD
Parent folder: My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/
Modified: 2026-01-20T18:03:32.201Z


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
  THELMA = 'T.H.E.L.M.A.',
  HENRY = 'H.E.N.R.Y.',
  LILY = 'L.I.L.Y.',
  PERCY = 'P.E.R.C.Y.'
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

export interface MaintenanceRecord {
  id: string;
  date: string;
  service: string;
  note: string;
  recommendedAction?: string;
  technician?: string;
  cost?: number;
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
  maintenanceLog?: MaintenanceRecord[];
}

export interface FleetVehicle {
  id: string;
  unitNumber: string;
  type: 'TRUCK' | 'VAN' | 'HEAVY';
  status: 'ACTIVE' | 'MAINTENANCE' | 'IDLE';
  driver: string;
  location: string;
  fuelLevel: number;
  tpms?: {
    l1: number;
    l2: number;
    r1: number;
    r2: number;
  };
  fatigueLevel?: number;
}

export interface TrainingRecord {
  id: string;
  userId: string;
  moduleId: string;
  score: number;
  status: 'PASSED' | 'FAILED' | 'IN_PROGRESS';
  timestamp: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  target: string;
  severity: 'INFO' | 'WARN' | 'CRITICAL';
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

export interface UnitConfiguration {
  id: string;
  name: string;
  type: string;
  powerSource: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
    weight: number;
  };
  hazmatCertified: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  agent?: AgentType;
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
  category: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  progress: number;
  iconType: string;
  colorClass: string;
}

// Fixed missing exports for infrastructure and asset modules

export interface ApiKey {
  id: string;
  serviceName: string;
  preview: string;
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
  created: string;
}

export interface AquaticAsset {
  id: string;
  name: string;
  type: 'CARGO_SHIP' | 'PATROL_BOAT' | 'TUG';
  status: 'AT_SEA' | 'DOCKED' | 'MAINTENANCE';
  coordinates: string;
  fuelLevel: number;
}

export type UnitType = 'TRUCK' | 'AUTOMOBILE' | 'MARINE_VESSEL' | 'AIRCRAFT' | 'DRONE' | 'AIR_POD';

export type PowerSource = 'DIESEL' | 'GASOLINE' | 'ELECTRIC' | 'HYBRID';

export interface N8nWorkflow {
  id: string;
  name: string;
  status: 'ACTIVE' | 'PAUSED' | 'ERROR';
  lastRun: string;
  trigger: string;
  nodes: number;
  connectorType: 'INSURANCE' | 'EMS' | 'FUEL' | 'REGULATORY';
}

export interface LegacySystem {
  id: string;
  name: string;
  type: 'ERP' | 'TELEMATICS' | 'HR';
  connectionStatus: 'CONNECTED' | 'SYNCING' | 'ERROR';
  lastSync: string;
  dataPoints: number;
}
