Original name: types.ts
Drive ID: 14i-HsrCcmXsgh65HVuJGzsE_HNqsNS-G
Parent folder: My Drive/MAF/t.h.e.l.m.a.-ai-core-&-modules (2)/
Modified: 2026-01-31T10:56:50.000Z


export enum DeploymentMode {
  CLOUD = 'CLOUD',
  HYBRID = 'HYBRID',
  ON_PREMISE = 'ON_PREMISE',
}

export enum UserRole {
  ARCHITECT = 'ARCHITECT',
  CEO = 'CEO',
  COO = 'COO',
  CTO = 'CTO',
  CFO = 'CFO',
  FLEET_MANAGER = 'FLEET_MANAGER',
  PILOT = 'PILOT',
  IT_SPECIALIST = 'IT_SPECIALIST',
  DISPATCHER = 'DISPATCHER',
  TRAINING_DIRECTOR = 'TRAINING_DIRECTOR',
  OPS_MANAGER = 'OPS_MANAGER',
  FIELD_OPERATOR = 'FIELD_OPERATOR',
  AUDITOR = 'AUDITOR',
  DOT_INSPECTOR = 'DOT_INSPECTOR',
  HR_ADMIN = 'HR_ADMIN',
  PORTER = 'PORTER',
  DRIVER = 'DRIVER'
}

export enum AgentType {
  THELMA = 'T.H.E.L.M.A.',
  MINIMI = 'M.I.N.I.M.I.',
  HENRY = 'H.E.N.R.Y.',
  LILY = 'L.I.L.Y.',
  PERCY = 'P.E.R.C.Y.',
  CORE = 'C.O.R.E.',
  SENTINEL = 'S.E.N.T.I.N.E.L.'
}

export type AlertLevel = 'IDLE' | 'THINKING' | 'WARNING' | 'CRITICAL' | 'COPILOT_ADVISORY' | 'HAPTIC_PULSE';
export type PersonalitySignature = 'ADVOCATE' | 'LOGICIAN' | 'ARCHITECT' | 'COMMANDER';

export interface LoadTicket {
  id: string;
  unitNumber: string;
  origin: string;
  destination: string;
  status: 'PENDING' | 'HANDSHAKE' | 'ENROUTE' | 'COMPLETE';
  hazards: {
    weather: string;
    lowBridge: string;
    migration: string;
  };
}

export interface Bid {
  id: string;
  driverName: string;
  driverId: string;
  amount: number;
  timestamp: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

export interface DispatchOrder {
    id: string;
    client: string;
    origin: string;
    destination: string;
    priority: 'STANDARD' | 'EXPEDITED' | 'CRITICAL';
    domain: 'LAND' | 'AIR' | 'SEA';
    status: 'PENDING' | 'ASSIGNED' | 'IN_TRANSIT' | 'DELIVERED';
    payload: string;
    assignedAssetId?: string;
    value: number;
    eta?: string;
    bids: Bid[];
}

export interface SystemAlert {
  id: string;
  type: 'TELEMETRY' | 'SECURITY' | 'COMPLIANCE' | 'ACCIDENT' | 'MIGRATION' | 'SENSORY_FAULT';
  severity: AlertLevel;
  message: string;
  module: ModuleType;
  timestamp: string;
}

export interface CortexAction {
  id: string;
  type: 'NAVIGATE' | 'REPORT' | 'SECURITY' | 'CONFIRM_LOAD' | 'RE_ROUTE' | 'HAPTIC_SYNC';
  message: string;
  destination?: ModuleType;
  loadTicket?: LoadTicket;
  timestamp: string;
}

export enum DutyStatus {
  STANDBY = 'STANDBY',
  FUELING = 'FUELING',
  ENROUTE = 'ENROUTE',
  STOPPED = 'STOPPED',
  SLEEPER = 'SLEEPER',
  OFF_DUTY = 'OFF_DUTY'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  agent?: AgentType;
  systemTimestamp: string;
  actionCard?: CortexAction;
}

export enum ModuleType {
  DASHBOARD = 'DASHBOARD',
  DISPATCH = 'DISPATCH',
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
  GOVERNANCE = 'GOVERNANCE',
  EDGE_CONTROL = 'EDGE_CONTROL',
  PAYROLL = 'PAYROLL',
  COMMUNICATIONS = 'COMMUNICATIONS',
  MAINTENANCE = 'MAINTENANCE',
  FIELD_RELAY = 'FIELD_RELAY'
}

export type SystemMode = 'NORMAL' | 'DEFCON' | 'ECO' | 'QUANTUM' | 'VR_TRAINING';

export interface User {
  email: string;
  fullName: string;
  role: UserRole;
  department: string;
  clearanceLevel: number;
  compliance?: {
    licenseValid: boolean;
    licenseExpiry: string;
    freezeActive: boolean;
  };
}

export interface PersonnelProfile {
    id: string;
    fullName: string;
    role: UserRole;
    email: string;
    phone: string;
    status: 'ACTIVE' | 'ONBOARDING' | 'SUSPENDED' | 'TERMINATED';
    identity: {
        ssn_ein: string;
        type: 'W2_EMPLOYEE' | '1099_CONTRACTOR';
        dob: string;
        licenseNumber: string;
        licenseExpiry: string;
        licenseClass: string;
        licenseImageUploaded: boolean;
    };
    financial: {
        payrollActivated: boolean;
        cardType?: string;
        cardLastFour?: string;
        payoutFrequency: 'INSTANT' | 'WEEKLY';
    };
    dotCompliance: {
        lastReset: string;
        totalDriveTimeToday: number;
        totalDutyTimeToday: number;
        logs: any[];
    };
    insurance: {
        provider: string;
        policyNumber: string;
        coverageType: string;
        expiry: string;
        status: string;
    };
    ledgerId: string;
    systemTimestamp: string;
}

export interface AquaticAsset {
  id: string;
  name: string;
  type: string;
  status: string;
  coordinates: string;
  fuelLevel: number;
  description: string;
  specs: Record<string, string>;
  systemTimestamp: string;
}

export interface AviationAsset {
  id: string;
  callsign: string;
  type: string;
  status: string;
  altitude: string;
  batteryLevel: number;
  coordinates: string;
  flightHours: number;
  lastService: string;
  maintenanceLog: any[];
  description: string;
  specs: Record<string, string>;
  systemTimestamp: string;
}

export interface PayrollEntry {
  id: string;
  recipientId: string;
  name: string;
  type: 'SALARY' | 'LOAD_COMMISSION' | 'BONUS' | 'REIMBURSEMENT';
  amount: number;
  status: 'PROCESSED' | 'PENDING' | 'HELD';
  date: string;
  notes?: string;
  systemTimestamp: string;
}

export interface FleetVehicle {
  id: string;
  name: string;
  type: string;
  status: string;
  fuelLevel: number;
  mileage: number;
  lastService: string;
  driver?: string;
  location?: string;
  specs?: Record<string, string>;
}

export interface DOTLogEntry {
  id: string;
  timestamp: string;
  status: DutyStatus;
  location: string;
  notes: string;
}

export interface Receipt {
  id: string;
  date: string;
  vendor: string;
  amount: number;
  category: string;
  status: string;
}

export interface ApiKey {
  id: string;
  serviceName: string;
  preview: string;
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
  created: string;
}

export type PowerSource = 'ELECTRIC' | 'HYDROGEN' | 'DIESEL' | 'ZERO_POINT';
export type UnitType = 'TRUCK' | 'DRONE' | 'SHIP' | 'ANTIGRAV';

export interface UnitConfiguration {
  id: string;
  name: string;
  type: UnitType;
  powerSource: PowerSource;
  dimensions: { length: number; width: number; height: number; weight: number };
  hazmatCertified: boolean;
  mileage: number;
  fuelLevel: number;
  documents: Record<string, boolean>;
  releaseCode: string;
}

export interface N8nWorkflow {
  id: string;
  name: string;
  status: 'ACTIVE' | 'PAUSED' | 'ERROR';
  lastRun: string;
  trigger: string;
  nodes: number;
  connectorType: string;
  successRate: number;
  latency: number;
}

export interface IntegrationRequestLog {
  id: string;
  timestamp: string;
  source: string;
  method: 'POST' | 'GET' | 'WEBHOOK';
  payload_size: string;
  status: 'ALLOWED' | 'BLOCKED' | 'QUARANTINED';
  risk_score: number;
}

export enum AuditResult {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  WARNING = 'WARNING'
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user_id: string;
  role: UserRole;
  action: string;
  module: string;
  evidence: string[];
  result: AuditResult;
  metadata: Record<string, any>;
  systemTimestamp: string;
}

export interface LegacySystem {
  id: string;
  name: string;
  type: string;
  connectionStatus: 'CONNECTED' | 'SYNCING' | 'ERROR';
  lastSync: string;
  dataPoints: number;
}

export interface MaintenanceRecord {
  id: string;
  unitId: string;
  date: string;
  type: string;
  description: string;
  cost: number;
  technician: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'SCHEDULED';
}

export interface SystemLog {
  id: string;
  text: string;
  type: 'SUCCESS' | 'INFO' | 'WARN' | 'ERROR';
  timestamp: string;
}
