Original name: MasterDeploymentGuide.docx
Drive ID: 1UYRDa8o8O0ob_-aJBple1u2A-weSUgGE
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Components/docs/
Modified: 2025-12-19T17:07:45.000Z

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Server, Database, Shield, Cloud } from "lucide-react";

export default function MasterDeploymentGuide() {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const masterPrompt = `# MOTIVE NEXT - Complete System Deployment Prompt

## SYSTEM OVERVIEW
Deploy a comprehensive enterprise management platform integrating Fleet Management, Aviation Control, Emergency Dispatch, Insurance Processing, HR/Training, Analytics, and IT Infrastructure Management.

## CORE ARCHITECTURE

### 1. DATABASE ENTITIES
Create the following entities with Row-Level Security (RLS):

**User Management:**
- User (built-in): email, full_name, role, department, clearance_level
- UserRole: user_email, role, permissions (object), assigned_training_modules, status, department, c_suite_level
- AuthenticationLog: user_email, login_method, timestamp, ip_address, device_info, success

**Fleet Operations:**
- Fleet: fleet_name, owner_email, company_name, platform, subscription_id
- Truck: unit_number, fleet_id, driver_email, type, make, model, VIN, telematics, maintenance_score
- Driver: email, full_name, cdl_class, license_number, endorsements, status
- Load: load_number, platform, driver_email, status, pickup/delivery locations, cargo details
- Route: route_id, origin, destination, truck_constraints, waypoints, optimization_score

**Aviation:**
- AviationAsset: asset_id, asset_type, registration_number, capabilities, FAA_compliance, telematics
- FlightPlan: plan_id, asset_id, departure, destination, altitude, mission_type

**Emergency Services:**
- EmergencyDispatch: dispatch_id, incident_type, priority, location, status, assigned_responders
- FirstAidProtocol: protocol_id, incident_type, steps, equipment_needed

**Insurance & Billing:**
- InsuranceProvider: provider_id, name, policy_types, contact_info
- ClaimReport: claim_id, incident_id, status, AI_analysis, approved_amount
- Invoice: invoice_number, customer_email, line_items, total_amount, status
- Subscription: user_email, tier, platform, monthly_rate, status, features_enabled
- BillingCycle: cycle_id, cycle_date, status, loads_processed, total_revenue

**Training & HR:**
- TrainingProgress: user_email, module_id, status, completion_percentage, quiz_score, certification_earned
- TrainingAssignment: user_email, module_id, assigned_by, due_date, priority, status
- Certificate: certificate_id, user_email, module_id, verification_code (encrypted), status

**Operations:**
- MaintenanceWorkOrder: work_order_id, asset_type, asset_id, status, priority, predicted_failure, AI_generated
- Document: document_id, title, category, file_url, entity_type, entity_id, version
- Message: message_id, conversation_id, from_email, to_email, message_type, priority, content
- Alert: alert_id, alert_type, severity, status, title, message, asset_info
- AlertRule: rule_id, rule_name, alert_type, conditions, notification_channels

**Analytics & Reporting:**
- AnalyticsReport: report_id, report_name, report_type, period, filters, data, charts, generated_by
- WorkStation: station_id, station_name, station_type, operator_email, permissions, external_connections

**IT Infrastructure (NEW):**
- APIKey: key_id, service_name, key_value (encrypted), created_by, expires_at, permissions, status
- SystemConfiguration: config_id, module_name, settings (object), updated_by, requires_2fa
- SecurityAudit: audit_id, action_type, performed_by, target_entity, timestamp, clearance_verified
- MasterAccessCode: code_id, access_level, encrypted_code, valid_until, created_by, usage_count

### 2. AI AGENTS (Create in agents/ folder)
- fleet_operations_agent.json: Fleet coordination, route optimization, maintenance scheduling
- emergency_dispatch_agent.json: Emergency response coordination, resource allocation
- training_assistant_agent.json (HenryAI): Interactive training guidance, progress tracking
- analytics_agent.json: Report generation, data insights, forecasting
- hr_admin_agent.json: Training assignments, role management, onboarding
- accounting_agent.json: Financial operations, billing, invoicing (Reports to COO)
- henri_ai_managing_agent.json: Master system coordinator with Architect permissions
- it_infrastructure_agent.json (NEW): API management, security monitoring, system configuration

### 3. FRONTEND PAGES & COMPONENTS

**Main Navigation:**
- MainHub: Central dashboard with role-based module access
- Layout: Sidebar navigation with secure routing

**Fleet Suite:**
- FleetDashboard: Vehicle/driver management, load tracking
- RouteOptimizer: AI-powered route planning with constraints
- Components: PredictiveMaintenance, TruckForm, DriverForm

**Aviation Suite:**
- AviationControl: Drone/aircraft management, flight planning
- Components: AviationAssetCard, FlightPlanForm, AirspaceCompliance, WeatherPanel

**Emergency Suite:**
- EmergencyDispatch: Incident management, responder coordination
- FirstAidStation: Protocol library, emergency procedures
- Components: IncidentForm, ResponderAssignment, ProtocolCard

**Insurance Suite:**
- InsuranceStation: Provider management, claims processing
- Components: ProviderCard, ClaimForm, AIClaimsProcessor

**Training Suite:**
- TrainingHub: Module library, progress tracking, certification
- Components: AITrainingAssistant, HandsOnExercise, ScenarioCard, TrainingDataSeeder

**HR Suite:**
- HRAdmin: User management, training assignments, role configuration
- TeamSetup: Driver/mechanic onboarding

**IT Suite (NEW):**
- ITControlCenter: API management, system configuration, security monitoring
- Components: APIKeyManager, SecurityDashboard, SystemConfigPanel, HenriAIConsole

**Shared Components:**
- LiveMapView: Real-time asset tracking with Leaflet
- AlertPanel: System-wide alert management
- MessagingPanel: Internal communication
- DocumentHub: Entity-linked document management

### 4. AUTHENTICATION & SECURITY

**OAuth Integration:**
- Google OAuth (Gmail accounts - primary)
- Apple Sign-In (iCloud accounts - secondary)
- Implement base44.auth.me(), redirectToLogin(), logout()

**Multi-Factor Authentication:**
- Require 2FA for C-Suite and IT Suite access
- Encrypted master access codes for system-critical changes
- Clearance level verification: Standard < Manager < Director < VP < C-Suite < Architect

**API Security:**
- All API keys stored encrypted in APIKey entity
- Rate limiting and IP whitelisting
- Service-to-service authentication via JWT tokens
- Audit logging for all API key usage

### 5. ROLE-BASED ACCESS CONTROL (RBAC)

**C-Suite Roles:**
- CEO: Full system access, strategic oversight
- COO: Operations, accounting, fleet management
- CFO: Financial systems, billing, analytics
- CTO: IT infrastructure, system architecture, Henri AI access
- CMO: Customer portals, analytics, messaging
- CHRO: HR admin, training assignments, employee management

**Director Level:**
- Director of Fleet Operations
- Director of Aviation Services  
- Director of Emergency Services
- Director of IT Infrastructure
- Director of Training & Development
- Director of Finance & Accounting

**Manager Level:**
- Fleet Manager: Fleet dashboard, driver/truck management
- Operations Manager: Load assignment, route optimization
- Training Manager: Training hub, assignments, progress review
- IT Manager: API keys, system configs (read-only critical)
- Billing Manager: Invoicing, subscriptions

**Specialist Roles:**
- Dispatcher: Load assignment, messaging
- Mechanic: Maintenance work orders, truck diagnostics
- Pilot: Aviation assets, flight planning
- EMS Dispatcher: Emergency incidents only
- Insurance Adjuster: Claims processing
- Trainee: Training modules only (read-only most features)
- IT Specialist: System monitoring, basic configs

**Bot Agents (Accounting Department):**
- Accounting Bot 1: Invoice generation, payment processing
- Accounting Bot 2: Financial reporting, reconciliation

### 6. API INTEGRATION STRUCTURE

**Pod Architecture:**
Each module can deploy independently with API connectivity:

\`\`\`
MOTIVE_NEXT_API_BASE=https://api.motivenext.com
FLEET_POD_API_KEY=encrypted_key_here
AVIATION_POD_API_KEY=encrypted_key_here
EMERGENCY_POD_API_KEY=encrypted_key_here
INSURANCE_POD_API_KEY=encrypted_key_here
TRAINING_POD_API_KEY=encrypted_key_here
IT_POD_API_KEY=encrypted_key_here (highest clearance)
HENRI_AI_MASTER_KEY=encrypted_key_here (Architect only)
\`\`\`

**Cross-Pod Communication:**
- All pods expose REST APIs on standard ports
- WebSocket connections for real-time updates
- Message queue (RabbitMQ/Kafka) for async operations
- Shared authentication service (OAuth2)

### 7. DEPLOYMENT STEPS

**Infrastructure:**
1. Provision database (PostgreSQL with RLS enabled)
2. Set up authentication service (Auth0, Supabase, or custom OAuth)
3. Configure cloud storage (AWS S3, Google Cloud Storage)
4. Set up API gateway with rate limiting
5. Deploy message queue service
6. Configure CDN for frontend assets

**Backend:**
1. Deploy Base44 backend with all entities
2. Set up AI agent integration endpoints
3. Configure LLM provider (OpenAI, Anthropic)
4. Enable real-time subscriptions
5. Set up cron jobs for billing cycles, report generation

**Frontend:**
1. Build React app with all pages/components
2. Configure environment variables
3. Deploy to hosting (Vercel, Netlify, AWS Amplify)
4. Set up custom domain with SSL
5. Configure OAuth redirect URLs

**Security:**
1. Enable 2FA for elevated roles
2. Generate initial master access codes
3. Set up audit logging
4. Configure IP whitelisting for IT Suite
5. Encrypt all API keys in database
6. Set up security monitoring alerts

**Testing:**
1. Create test accounts for all role types
2. Verify RBAC restrictions
3. Test cross-pod API communication
4. Load test with 1000+ concurrent users
5. Security penetration testing
6. Compliance audit (SOC 2, HIPAA if handling medical data)

### 8. POST-DEPLOYMENT

**Initial Configuration:**
- Create C-Suite accounts with clearance verification
- Generate department-specific API keys
- Assign Henri AI to IT Suite with master permissions
- Configure alert rules and notification channels
- Set up automated billing cycles
- Import initial training modules

**Monitoring:**
- Set up Datadog, New Relic, or similar APM
- Configure error tracking (Sentry)
- Set up uptime monitoring (Pingdom, StatusCake)
- Enable real-time log aggregation
- Configure automated backups (daily database dumps)

**Scaling:**
- Horizontal pod autoscaling (Kubernetes recommended)
- Database read replicas for analytics
- CDN caching for static assets
- Load balancer configuration
- Multi-region deployment for HA

## TECHNOLOGY STACK

**Frontend:**
- React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- React Query for state management
- React Router for navigation
- Leaflet for mapping
- Framer Motion for animations

**Backend:**
- Base44 backend-as-a-service
- PostgreSQL with Row-Level Security
- AI integrations (OpenAI, Anthropic)
- WebSocket for real-time
- REST API with OpenAPI spec

**Infrastructure:**
- Docker containers
- Kubernetes orchestration
- CI/CD with GitHub Actions
- Monitoring: Datadog/Prometheus
- Logging: ELK Stack

**Security:**
- OAuth 2.0 (Google, Apple)
- JWT tokens
- AES-256 encryption at rest
- TLS 1.3 in transit
- OWASP Top 10 compliance

## SUCCESS METRICS

**Performance:**
- API response time <200ms (p95)
- Page load time <2s
- 99.9% uptime SLA
- Support 10,000+ concurrent users

**Security:**
- Zero data breaches
- 100% audit log coverage
- <1 hour security patch deployment
- 90%+ 2FA adoption

**Business:**
- <5% monthly churn
- 40%+ gross margin
- LTV/CAC >3:1
- NPS score >50

## SUPPORT & MAINTENANCE

**Documentation:**
- API documentation (OpenAPI/Swagger)
- User guides per role type
- Admin configuration manual
- Troubleshooting runbooks

**Support Tiers:**
- Standard: Email support, 24hr response
- Professional: Phone + email, 8hr response
- Enterprise: 24/7 support, 1hr response, dedicated account manager

This prompt provides complete system specifications. Deploy modules as independent pods with API connectivity for maximum scalability and resilience.`;

  const podPrompts = {
    fleet: `# Fleet Operations Pod Deployment

## Overview
Deploy independent Fleet Management system with truck tracking, driver management, route optimization, and predictive maintenance.

## Required Entities
- Fleet, Truck, Driver, Load, Route, MaintenanceWorkOrder

## API Endpoints
POST /api/fleet/trucks - Create truck
GET /api/fleet/trucks/:id - Get truck details
PUT /api/fleet/trucks/:id/location - Update GPS
POST /api/fleet/routes/optimize - AI route optimization
GET /api/fleet/maintenance/predict - Predictive maintenance

## Agent Integration
- fleet_operations_agent with access to Fleet, Truck, Driver, Load entities

## Authentication
- Requires FLEET_POD_API_KEY
- OAuth for user login (Google/Apple)
- Roles: Fleet Manager, Dispatcher, Driver, Mechanic

## Pages/Components
- FleetDashboard, RouteOptimizer, PredictiveMaintenance, TruckForm, DriverForm

## External Integrations
- GPS telematics providers
- Fuel card services
- DOT compliance systems`,

    aviation: `# Aviation Control Pod Deployment

## Overview
Deploy independent Aviation/Drone management with flight planning, FAA compliance, and airspace monitoring.

## Required Entities
- AviationAsset, FlightPlan

## API Endpoints
POST /api/aviation/assets - Create aircraft/drone
POST /api/aviation/flight-plan - Submit flight plan
GET /api/aviation/airspace-check - FAA compliance check
POST /api/aviation/launch - Initiate flight

## Agent Integration
- Shared access to fleet_operations_agent for multi-modal coordination

## Authentication
- Requires AVIATION_POD_API_KEY
- Roles: Pilot, Aviation Manager, Operations Manager

## Pages/Components
- AviationControl, AviationAssetCard, FlightPlanForm, AirspaceCompliance, WeatherPanel

## External Integrations
- FAA LAANC authorization
- Weather APIs (NOAA, OpenWeather)
- Drone manufacturer APIs (DJI, Autel)`,

    emergency: `# Emergency Dispatch Pod Deployment

## Overview
Deploy CAD-style emergency dispatch with incident management, responder coordination, and protocol library.

## Required Entities
- EmergencyDispatch, FirstAidProtocol, Alert, Message

## API Endpoints
POST /api/emergency/incident - Create incident
PUT /api/emergency/incident/:id/assign - Assign responders
POST /api/emergency/alert - Broadcast alert
GET /api/emergency/protocols/:type - Get protocols

## Agent Integration
- emergency_dispatch_agent with access to EmergencyDispatch, Alert entities

## Authentication
- Requires EMERGENCY_POD_API_KEY
- Roles: EMS Dispatcher, Emergency Coordinator

## Pages/Components
- EmergencyDispatch, FirstAidStation, IncidentForm, ResponderAssignment, ProtocolCard

## External Integrations
- E911 systems
- Hospital bed availability APIs
- Weather warning systems`,

    training: `# Training Hub Pod Deployment

## Overview
Deploy LMS with AI assistant (HenryAI), interactive exercises, scenario-based learning, and certification.

## Required Entities
- TrainingProgress, TrainingAssignment, Certificate

## API Endpoints
POST /api/training/progress - Update progress
POST /api/training/quiz/submit - Submit quiz
POST /api/training/certify - Issue certificate
GET /api/training/ai-assist - HenryAI interaction

## Agent Integration
- training_assistant_agent (HenryAI) with access to TrainingProgress, TrainingAssignment

## Authentication
- Requires TRAINING_POD_API_KEY
- Roles: Trainee, Training Manager, HR Manager

## Pages/Components
- TrainingHub, AITrainingAssistant, HandsOnExercise, ScenarioCard, TrainingDataSeeder

## External Integrations
- Video hosting (YouTube, Vimeo)
- Document libraries
- Quiz/assessment platforms`,

    it: `# IT Infrastructure Pod Deployment (HIGH SECURITY)

## Overview
Deploy IT control center housing Henri AI master agent, API key management, system configuration, and security monitoring.

## Required Entities
- APIKey, SystemConfiguration, SecurityAudit, MasterAccessCode, WorkStation

## API Endpoints (ALL REQUIRE ARCHITECT CLEARANCE)
POST /api/it/api-keys - Generate API key
PUT /api/it/api-keys/:id/rotate - Rotate key
POST /api/it/system-config - Update config
GET /api/it/security-audit - Audit logs
POST /api/it/master-code/generate - Generate access code
POST /api/henri-ai/command - Execute Henri AI command

## Agent Integration
- henri_ai_managing_agent (Master Agent)
- it_infrastructure_agent

## Authentication (HIGHEST SECURITY)
- Requires IT_POD_API_KEY + HENRI_AI_MASTER_KEY
- 2FA mandatory (Google Authenticator + SMS)
- Biometric verification for master code changes
- IP whitelisting enforced
- Roles: CTO, IT Director, IT Manager (read-only), Architect (full access)

## Pages/Components
- ITControlCenter, APIKeyManager, SecurityDashboard, SystemConfigPanel, HenriAIConsole

## Security Features
- AES-256 encryption for all keys
- Key rotation every 90 days
- Audit log retention: 7 years
- Real-time intrusion detection
- Automated security patching`,

    billing: `# Billing & Accounting Pod Deployment

## Overview
Deploy financial operations with invoicing, subscription management, and automated billing cycles.

## Required Entities
- Invoice, Subscription, BillingCycle

## API Endpoints
POST /api/billing/invoice - Create invoice
POST /api/billing/subscription - Create subscription
GET /api/billing/cycle/:id - Billing cycle status
POST /api/billing/payment - Process payment

## Agent Integration
- accounting_agent (reports to COO)

## Authentication
- Requires BILLING_POD_API_KEY
- Roles: CFO, Billing Manager, Accountant, Accounting Bots

## Pages/Components
- BillingDashboard, InvoiceTable, SubscriptionManager, BillingCycleStatus

## External Integrations
- Payment processors (Stripe, PayPal)
- Accounting software (QuickBooks, Xero)
- Tax calculation services`
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Server className="w-6 h-6" />
            MOTIVE NEXT - Master Deployment Documentation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="master">
            <TabsList className="grid grid-cols-3 lg:grid-cols-7 w-full">
              <TabsTrigger value="master">Master</TabsTrigger>
              <TabsTrigger value="fleet">Fleet Pod</TabsTrigger>
              <TabsTrigger value="aviation">Aviation Pod</TabsTrigger>
              <TabsTrigger value="emergency">Emergency Pod</TabsTrigger>
              <TabsTrigger value="training">Training Pod</TabsTrigger>
              <TabsTrigger value="it">IT Pod</TabsTrigger>
              <TabsTrigger value="billing">Billing Pod</TabsTrigger>
            </TabsList>

            <TabsContent value="master">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-600">Complete System Deployment</Badge>
                  <button
                    onClick={() => copyToClipboard(masterPrompt)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    <Copy className="w-4 h-4" />
                    Copy Master Prompt
                  </button>
                </div>
                <ScrollArea className="h-[600px] border rounded p-4 bg-gray-50">
                  <pre className="text-xs whitespace-pre-wrap">{masterPrompt}</pre>
                </ScrollArea>
              </div>
            </TabsContent>

            {Object.entries(podPrompts).map(([key, prompt]) => (
              <TabsContent key={key} value={key}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge>{key.toUpperCase()} Pod - Independent Deployment</Badge>
                    <button
                      onClick={() => copyToClipboard(prompt)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
                    >
                      <Copy className="w-4 h-4" />
                      Copy Pod Prompt
                    </button>
                  </div>
                  <ScrollArea className="h-[600px] border rounded p-4 bg-gray-50">
                    <pre className="text-xs whitespace-pre-wrap">{prompt}</pre>
                  </ScrollArea>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
