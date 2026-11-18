Original name: master_build_prompt.md
Drive ID: 1dk2Hk9PrIFjp2OFOAy6vigVz0XbAysgC
Parent folder: My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/PROMPTING /
Modified: 2025-11-06T19:20:05.000Z

# MASTER BUILD PROMPT: MOTIVE NEXT Transportation Management Platform

## 🎯 EXECUTIVE SUMMARY

Build a complete, enterprise-grade Transportation Management System (TMS) for trucking and driveaway services. This is a full-stack SaaS platform targeting 3.5M truck drivers in the USA, competing with KeepTruckin/Motive ($150M revenue) and Samsara ($700M revenue) at 60% lower cost.

**Platform Name:** MOTIVE NEXT  
**Owner:** Steven Henry  
**Target Users:** Truck drivers, owner-operators, fleet managers, driveaway drivers  
**Business Model:** SaaS subscriptions ($35-85/month)  
**Technology Stack:** Netlify (hosting), Supabase (database), Serverless functions, React-style frontend  
**Version:** 2.1.0  
**Code Value:** $450,000  
**Market Opportunity:** $5-10 billion

---

## 🏗️ ARCHITECTURE REQUIREMENTS

### **1. HOSTING & INFRASTRUCTURE**

**Primary Platform:** Netlify
- Serverless functions (Node.js)
- Automatic HTTPS/SSL
- CDN for global delivery
- Edge functions for performance
- Identity authentication built-in

**Database:** Supabase (PostgreSQL)
- 20 tables (full schema provided below)
- Row Level Security (RLS) enabled
- Real-time subscriptions
- PostGIS for geolocation
- Automatic backups

**Frontend:** Single-Page Application
- Responsive design (mobile-first)
- Tailwind CSS for styling
- Vanilla JavaScript (no framework dependencies for v1)
- Progressive Web App (PWA) capable
- Offline-first architecture

**File Storage:** AWS S3 or Cloudinary
- Receipt images
- Video recordings
- Inspection photos
- Signature captures
- PDF reports

---

## 📋 COMPLETE FEATURE SPECIFICATIONS

### **CORE FEATURE #1: USER AUTHENTICATION & ROLES**

**Implementation:** Netlify Identity
- Email/password authentication
- OAuth providers (Google, Facebook)
- Multi-factor authentication (MFA)
- Password reset flow
- Email verification

**User Types:**
1. **Driver** - Primary user, operates vehicle
2. **Dispatcher** - Assigns loads, manages drivers
3. **Fleet Manager** - Oversees multiple drivers/vehicles
4. **C-Suite** - Executive dashboard, analytics
5. **Admin** - System administration

**User Profile Fields:**
```javascript
{
  id: UUID,
  email: STRING (unique),
  fullName: STRING,
  phone: STRING,
  userType: ENUM['driver', 'dispatcher', 'fleet_manager', 'c_suite'],
  application: ENUM['trucking', 'driveaway'],
  subscriptionPlan: ENUM['basic', 'professional', 'enterprise'],
  subscriptionStatus: ENUM['active', 'cancelled', 'past_due'],
  stripeCustomerId: STRING,
  cdlNumber: STRING,
  cdlExpiry: DATE,
  medicalCertExpiry: DATE,
  createdAt: TIMESTAMP,
  updatedAt: TIMESTAMP
}
```

**Dashboard Views:**
- Landing page (unauthenticated)
- Driver dashboard (authenticated)
- Fleet manager portal (enterprise)
- Admin panel (system)

---

### **CORE FEATURE #2: HOURS OF SERVICE (HOS) / ELD COMPLIANCE**

**Regulatory Compliance:** FMCSA regulations
- 11-hour driving limit
- 14-hour on-duty limit
- 70-hour/8-day cycle
- 30-minute break requirement after 8 hours
- 10-hour off-duty requirement

**Implementation Requirements:**

**Real-time Status Tracking:**
```javascript
Status Options:
- OFF_DUTY (not working)
- SLEEPER_BERTH (resting in sleeper)
- DRIVING (actively driving)
- ON_DUTY_NOT_DRIVING (working but not driving)
```

**Automatic Violation Detection:**
- Alert at 10 hours driving (1 hour warning)
- Alert at 13 hours on-duty (1 hour warning)
- Alert at 65 hours in cycle (5-hour warning)
- Block driving when limits reached (if safety mode enabled)

**Data Collection:**
- GPS coordinates every 60 seconds while driving
- Odometer readings at status changes
- Location address (reverse geocoding)
- Automatic status detection (if OBD-II connected)

**Reporting:**
- Daily logs (PDF export)
- 7-day history view
- Monthly summaries
- DOT audit format
- Driver signature certification
- Violation history

**UI Components:**
- Current status indicator (large, color-coded)
- Time remaining displays (hours:minutes)
- Status change buttons (tap to change)
- Timeline view of day
- Calendar view of week/month

---

### **CORE FEATURE #3: EMERGENCY SOS SYSTEM**

**Activation Methods:**
- Big red button on dashboard (always visible)
- Hardware panic button (optional integration)
- Voice command: "Emergency" or "SOS"
- Automatic crash detection (if accelerometer available)

**Automatic Actions on Activation:**
1. Capture GPS location (high precision)
2. Take photos from all cameras (if available)
3. Record 30-second audio clip
4. Send SMS to pre-configured contacts (up to 5)
5. Send email with location map
6. Call 911 (if Twilio configured)
7. Alert company dispatch
8. Notify insurance provider
9. Start video recording
10. Create incident report in database

**Emergency Contact Configuration:**
```javascript
{
  contact1: { name: STRING, phone: STRING, relationship: STRING },
  contact2: { name: STRING, phone: STRING, relationship: STRING },
  contact3: { name: STRING, phone: STRING, relationship: STRING },
  dispatchPhone: STRING,
  insuranceHotline: STRING,
  emergencyServices: '911'
}
```

**Incident Tracking:**
- Unique incident ID
- Timestamp of activation
- GPS coordinates
- Photo/video evidence
- Response status (pending, responding, resolved)
- Resolution notes
- Timeline of events

**False Alarm Handling:**
- 10-second countdown before activation
- Cancel button during countdown
- Mark as false alarm (requires reason)
- Log false alarms (for pattern analysis)

---

### **CORE FEATURE #4: DOT INSPECTION SYSTEM (Levels 1-6)**

**Mobile Camera Interface:**
- Native camera access (prefer rear camera)
- High-resolution capture (minimum 1920x1080)
- Flash control
- Grid overlay for alignment
- Photo preview before capture
- Retake option

**Level 1 Inspection (North American Standard - 37 steps):**

**Driver Document Checks:**
1. Commercial Driver's License (CDL)
   - Scan license with OCR
   - Extract: Name, License #, Expiry, Endorsements
   - Verify not expired
   - Cross-check with FMCSA database

2. Medical Examiner Certificate
   - Scan certificate
   - Extract expiry date
   - Alert if expiring within 30 days

3. Skill Performance Evaluation (if applicable)
4. Hours of Service logs (auto-pulled from system)
5. Record of Duty Status (RODS)
6. Alcohol/drug screening consent

**Vehicle Component Checks (with AI analysis):**

**Brake System:**
1. Service brake function test
2. Parking brake function test
3. Brake adjustment (air brake systems)
4. Brake drums/rotors (visual inspection)
   - AI detects: cracks, excessive wear, warping
5. Brake lines and hoses
   - AI detects: leaks, damage, improper routing

**Tires:**
6. Tread depth measurement (minimum 4/32")
   - AI measures tread depth from photo
7. Tire condition (cuts, bulges, exposed cords)
   - AI flags damage
8. Tire pressure (if sensor available)
9. Wheel fasteners (all present and tight)
10. Rim condition (no cracks or bends)

**Lighting Systems:**
11. Headlights (low and high beam)
    - AI confirms illumination
12. Turn signals (front and rear)
13. Brake lights
14. Tail lights
15. Clearance lights
16. License plate light
17. Hazard lights

**Steering System:**
18. Steering wheel free play test
19. Power steering function
20. Steering linkage
21. Tie rods and ball joints

**Suspension:**
22. Springs (no breaks or cracks)
23. Shock absorbers
24. U-bolts
25. Torque arms

**Electrical System:**
26. Battery condition
27. Wiring (no exposed wires)
28. Connections secure

**Fuel System:**
29. Fuel tank integrity (no leaks)
30. Fuel cap secure
31. Fuel lines (no leaks or damage)

**Exhaust System:**
32. Exhaust pipes (no leaks)
33. Muffler (secure and functional)
34. Exhaust routing (not near fuel tank)

**Other:**
35. Windshield (no cracks in driver's view)
36. Windshield wipers (functional)
37. Seat belts (all functional)

**AI Analysis Features:**
- VIN recognition from photo
- Component identification (brake, tire, light)
- Damage detection (cracks, wear, leaks)
- Text extraction (license, certificate dates)
- Confidence scoring (0-100%)
- Pass/fail determination
- Issue flagging with severity

**Level 2 Inspection (Walk-Around):**
- Same as Level 1 but excludes under-vehicle inspection
- Focus on exterior components only
- Faster completion (10-15 minutes vs 30-45)

**Level 3 Inspection (Driver/Credential Only):**
- No vehicle inspection
- Focus on driver documentation
- CDL verification
- Medical certificate
- HOS logs
- RODS
- Seat belt check (visual)
- Alcohol/drug screening

**Inspection Report Generation:**
- PDF with all photos
- Pass/fail status for each item
- Overall pass/fail determination
- Inspector signature (digital)
- Timestamp and GPS location
- VIN and vehicle details
- Driver information
- Submit to DOT (if configured)
- Email to insurance
- Store in database permanently

---

### **CORE FEATURE #5: INSURANCE MONITORING**

**Allstate Telematics Integration:**

API Endpoint: `https://api.allstate.com/v1/telematics/status`

**Data Collected:**
- Driving score (0-100)
- Hard braking events
- Rapid acceleration events
- Speeding incidents
- Night driving hours
- Total miles driven
- High-risk locations
- Collision alerts

**Response Format:**
```json
{
  "drivingScore": 85,
  "period": "last_30_days",
  "events": {
    "hardBraking": 3,
    "rapidAcceleration": 2,
    "speeding": 5
  },
  "discount": 12,
  "lastSync": "2025-11-06T10:00:00Z"
}
```

**Progressive Snapshot Integration:**

API Endpoint: `https://api.progressive.com/snapshot/v2/status`

**Data Collected:**
- Safe driving score
- Time of day patterns
- Mileage tracking
- Hard braking frequency
- Discount eligibility
- Device status

**Insurance Dashboard Display:**
```
┌─────────────────────────────┐
│  🛡️ Insurance Monitoring    │
├─────────────────────────────┤
│                             │
│  Allstate:                  │
│  ✅ Active - Score: 85      │
│  💰 Discount: 12%           │
│                             │
│  Progressive:               │
│  ✅ Active - Score: Good    │
│  💰 Savings: $1,200/year    │
│                             │
│  [Refresh Data]             │
│                             │
└─────────────────────────────┘
```

**Automatic Alerts:**
- Score drops below 80
- Discount reduction
- Policy expiration (30-day warning)
- Claim filed
- Rate increase notification

---

### **CORE FEATURE #6: CB RADIO / PUSH-TO-TALK (PTT) SYSTEM**

**Technology:** Twilio Voice API + WebRTC

**User Experience:**
```
┌─────────────────────────────┐
│  📻 CB Radio                │
├─────────────────────────────┤
│                             │
│      [  🎤  ]               │
│   Hold to Talk              │
│                             │
│  Connected: ✅ Ready        │
│                             │
│  Contact: [Dispatch ▼]      │
│  Options:                   │
│    • Dispatch Center        │
│    • Emergency Line         │
│    • Fleet Manager          │
│    • Driver Group 1         │
│                             │
└─────────────────────────────┘
```

**Implementation Details:**

**Button Behavior:**
- Press and hold = transmit (mic active)
- Release = listen (mic muted)
- Visual feedback: button turns red when active
- Audio feedback: "beep" on press/release
- Haptic feedback on mobile devices

**Contact Directory Structure:**
```javascript
{
  dispatch: {
    name: "Dispatch Center",
    email: "dispatch@motivenext.online",
    phone: "+18005551234",
    sipEndpoint: "sip:dispatch@motivenext.online",
    priority: "high",
    autoAnswer: true,
    recordCalls: true
  },
  emergency: {
    name: "Emergency Services",
    phone: "911",
    priority: "critical",
    autoRecord: true,
    alertOnCall: true,
    cannotDecline: true
  },
  fleet: {
    name: "Fleet Manager",
    email: "fleet@company.com",
    phone: "+18005555678",
    priority: "normal",
    workingHours: { start: "06:00", end: "18:00" }
  }
}
```

**Call Features:**
- One-to-one communication
- Group channels (multiple drivers)
- Call recording (with consent)
- Call history/logs
- Missed call notifications
- Do Not Disturb mode
- Scheduled availability

**Audio Quality:**
- Noise cancellation
- Echo cancellation
- Automatic gain control
- Codec: Opus (preferred) or G.711

**Session Logging:**
```javascript
{
  sessionId: "PTT_12345",
  initiator: "user_abc",
  recipient: "dispatch",
  startTime: "2025-11-06T10:30:00Z",
  endTime: "2025-11-06T10:32:15Z",
  duration: 135, // seconds
  recordingUrl: "https://recordings.com/ptt_12345.mp3",
  callQuality: "excellent"
}
```

---

### **CORE FEATURE #7: DRIVER COACHING AI**

**Real-Time Event Detection:**

**Harsh Braking:**
- Deceleration > 8 mph/second
- Instant voice alert: "Harsh braking detected"
- Record: timestamp, location, speed before/after
- Score impact: -5 points

**Harsh Acceleration:**
- Acceleration > 8 mph/second
- Voice alert: "Smooth acceleration saves fuel"
- Score impact: -3 points

**Harsh Cornering:**
- Lateral G-force > 0.5g
- Voice alert: "Take turns smoothly"
- Score impact: -4 points

**Speeding:**
- Speed > posted limit + 10 mph
- Voice alert: "You are speeding, slow down"
- Score impact: -10 points
- Log: speed, limit, location, duration

**Excessive Idling:**
- Engine running while stopped > 5 minutes
- Alert: "Consider shutting off engine"
- Score impact: -2 points
- Fuel waste calculation

**Phone Use While Driving:**
- Detected via camera or phone sensors
- Critical alert: "Put phone down"
- Score impact: -15 points
- Potential DOT violation flag

**Driver Score Calculation:**
```javascript
baseScore = 100;

events.forEach(event => {
  if (event.type === 'harsh_braking') baseScore -= 5;
  if (event.type === 'harsh_acceleration') baseScore -= 3;
  if (event.type === 'harsh_cornering') baseScore -= 4;
  if (event.type === 'speeding') baseScore -= 10;
  if (event.type === 'phone_use') baseScore -= 15;
  if (event.type === 'idling') baseScore -= 2;
});

// Bonus for safe miles
safeMiles = totalMiles - eventMiles;
bonus = Math.min(safeMiles / 100, 20); // Up to +20 points

finalScore = Math.max(baseScore + bonus, 0);
```

**Weekly Report:**
```
═══════════════════════════════════
   WEEKLY DRIVING REPORT
   Driver: John Smith
   Week: Nov 1-7, 2025
═══════════════════════════════════

Overall Score: 87 (+5 from last week) ⭐

Miles Driven: 2,450
Harsh Braking: 3 events
Speeding: 5 events
Idling: 8 events (42 minutes)

═══════════════════════════════════
   INSURANCE IMPACT
═══════════════════════════════════

Current Discount: 12%
Potential Savings: $1,200/year

To reach 15% discount:
- Reduce harsh braking by 2 events/week
- Keep speed within 5 mph of limit

═══════════════════════════════════
   COACHING TIPS
═══════════════════════════════════

1. Anticipate stops earlier - coast to reduce brake wear
2. Maintain consistent speed - saves 10-15% on fuel
3. Reduce idle time - can save $3,000/year

═══════════════════════════════════
   RANKING
═══════════════════════════════════

You rank in the TOP 15% of drivers! 🏆

Keep up the great work!
```

**Gamification Elements:**
- Badges: Safe Driver, Fuel Saver, Elite Driver
- Leaderboards: Company ranking, national ranking
- Challenges: "Complete 1,000 miles with no harsh events"
- Rewards: Gift cards, bonus pay, recognition

---

### **CORE FEATURE #8: FUEL CARD INTEGRATION**

**Supported Cards:**
- Comdata
- EFS (Electronic Funds Source)
- WEX (Wright Express)
- Fleet One
- Pilot Flying J
- Love's

**Automatic Transaction Sync:**

**API Integration Process:**
1. User links fuel card (enter card number + PIN)
2. System authenticates with card provider
3. Pull last 30 days of transactions
4. Parse transaction data
5. Create expense entries automatically
6. Calculate IFTA tax allocations
7. Update running totals

**Transaction Data Structure:**
```javascript
{
  transactionId: "TXN_001",
  cardNumber: "****1234",
  cardType: "Comdata",
  merchantName: "Pilot Travel Center #042",
  address: "123 Highway Rd, Las Vegas, NV 89101",
  state: "NV",
  product: "Diesel",
  gallons: 110.5,
  pricePerGallon: 3.87,
  totalAmount: 427.64,
  odometer: 155234,
  timestamp: "2025-11-04T14:30:00Z",
  driverName: "John Smith",
  vehicleNumber: "TRUCK-001",
  iftaState: "NV"
}
```

**Fuel Station Finder:**

**API:** GasBuddy or Gas Guru

**Search Parameters:**
- Current GPS location
- Radius (10, 25, 50, 100 miles)
- Fuel type (diesel, gasoline, DEF)
- Accepted cards filter
- Amenities (showers, parking, food)

**Display Format:**
```
═══════════════════════════════════
   NEARBY FUEL STATIONS
   Current Location: Las Vegas, NV
═══════════════════════════════════

1. Love's Travel Stop
   2.3 miles away
   💰 Diesel: $3.89/gal
   💳 Accepts: Comdata, EFS, WEX
   ⭐ Amenities: Showers, Restaurant, Parking
   💵 Savings: $0.15/gal vs. average
   
2. Pilot Flying J
   4.7 miles away
   💰 Diesel: $3.94/gal
   💳 Accepts: Fleet One, EFS
   ⭐ Amenities: Showers, WiFi
   
[Get Directions] [Call Station]
```

**IFTA Auto-Calculation:**
- Track gallons purchased per state
- Calculate miles driven per state
- Compute MPG by state
- Calculate tax owed by state
- Quarterly report generation
- PDF export for accountant

**Fraud Detection:**
- Compare transaction location to driver GPS
- Alert if > 100 miles apart
- Flag unusual transaction amounts
- Monitor for duplicate charges
- Track card usage patterns

---

### **CORE FEATURE #9: DISPATCH COMMUNICATION HUB**

**Two-Way Messaging:**

**Interface Design:**
```
┌─────────────────────────────────┐
│  📡 Dispatch Messages (3 new)   │
├─────────────────────────────────┤
│                                 │
│  👨‍💼 Dispatch - 10:30 AM        │
│  "Pick up moved to 8 AM"        │
│                                 │
│  👨‍💼 Dispatch - 9:15 AM         │
│  "Deliver to Bay 3"             │
│                                 │
│  👨 You - 9:20 AM                │
│  "Got it, thanks"               │
│                                 │
├─────────────────────────────────┤
│  [Type message...]         [📤] │
└─────────────────────────────────┘
```

**Message Features:**
- Real-time delivery (WebSocket or Server-Sent Events)
- Read receipts
- Typing indicators
- Message history (last 30 days)
- Search functionality
- Attach photos/documents
- Voice messages
- Quick replies (pre-configured responses)

**Load Assignment System:**

**Assignment Notification:**
```
═══════════════════════════════════
   🚛 NEW LOAD AVAILABLE
═══════════════════════════════════

Load ID: LD-45678
Rate: $1,850
Miles: 375

Pickup:
📍 Los Angeles, CA
📅 Nov 8, 2025 @ 8:00 AM
📦 Electronics - 15,000 lbs

Delivery:
📍 Phoenix, AZ
📅 Nov 8, 2025 @ 6:00 PM

───────────────────────────────────
   ⏱️ Expires in: 14:32
───────────────────────────────────

[✅ ACCEPT LOAD]  [❌ DECLINE]
```

**Accept/Decline Logic:**
- 15-minute acceptance window
- After 15 min, offer to next driver
- Cannot accept if HOS hours insufficient
- Auto-decline if driver offline
- Penalty for frequent declines

**ETA Updates:**

**Automatic Calculation:**
- Current location (GPS)
- Destination coordinates
- Real-time traffic data (Google Maps)
- Driver's average speed
- Scheduled breaks (HOS)
- Weather delays

**Update Triggers:**
- Every 30 minutes automatically
- On significant delay (>15 min change)
- Manual driver update
- Arrival within 30 minutes

**Notification Sent To:**
- Dispatcher
- Customer (if configured)
- Fleet manager
- Other drivers (if team delivery)

**Format:**
```
ETA Update: LOAD-45678

Driver: John Smith
Current Location: Flagstaff, AZ
Destination: Phoenix, AZ

Original ETA: 6:00 PM
Updated ETA: 6:25 PM (+25 min)
Reason: Traffic delay on I-17

Distance Remaining: 85 miles
```

---

### **CORE FEATURE #10: ELECTRONIC PROOF OF DELIVERY (ePOD)**

**Signature Capture:**

**Canvas Implementation:**
- HTML5 Canvas element
- Touch-enabled for mobile
- Stylus support
- Smoothing algorithm for clean signatures
- Clear/retry button
- Zoom to verify signature
- Landscape orientation recommended

**UI Layout:**
```
┌───────────────────────────────────┐
│   📦 PROOF OF DELIVERY            │
├───────────────────────────────────┤
│                                   │
│  Load: LD-45678                   │
│  Delivered to: Phoenix, AZ        │
│  Date: Nov 8, 2025 6:15 PM        │
│                                   │
├───────────────────────────────────┤
│  Customer Name:                   │
│  [________________]               │
│                                   │
│  Condition:                       │
│  ⚪ Excellent  ⚪ Good             │
│  ⚪ Fair  ⚪ Damaged                │
│                                   │
│  Notes:                           │
│  [____________________________]   │
│  [____________________________]   │
│                                   │
├───────────────────────────────────┤
│  📷 Photos (0/4)                  │
│  [+] Add Photo                    │
│                                   │
├───────────────────────────────────┤
│  ✍️ Customer Signature:           │
│  ┌─────────────────────────────┐ │
│  │                             │ │
│  │   [Sign here]               │ │
│  │                             │ │
│  └─────────────────────────────┘ │
│  [Clear] [Accept]                 │
│                                   │
├───────────────────────────────────┤
│  [🔙 Cancel]  [✅ COMPLETE]       │
└───────────────────────────────────┘
```

**Photo Documentation:**
- Minimum 1 photo required
- Maximum 10 photos
- Photos can show: vehicle condition, cargo, delivery location, recipient
- Auto-compress for storage
- Timestamp and GPS embedded in metadata

**PDF Receipt Generation:**

**Template:**
```
═══════════════════════════════════════════
   DELIVERY CONFIRMATION RECEIPT
   MOTIVE NEXT Transportation
═══════════════════════════════════════════

Load ID: LD-45678
Delivered: November 8, 2025 @ 6:15 PM

PICKUP DETAILS:
Company: ABC Electronics
Address: 123 Main St, Los Angeles, CA 90001
Loaded: Nov 8, 2025 @ 8:00 AM

DELIVERY DETAILS:
Company: XYZ Warehouse
Address: 456 Industrial Pkwy, Phoenix, AZ 85001
Delivered: Nov 8, 2025 @ 6:15 PM
GPS: 33.4484° N, 112.0740° W

CARGO DETAILS:
Description: Electronics
Weight: 15,000 lbs
BOL: BOL-12345

CONDITION: Good
NOTES: Delivered to Bay 3 as requested

RECEIVED BY:
Name: Jane Doe
Signature: [Digital Signature Image]

DRIVER:
Name: John Smith
CDL: CA-1234567
Truck: TRUCK-001

PHOTOS: [4 photos attached]

───────────────────────────────────────────
This is an official delivery confirmation.
For questions, contact: support@motivenext.online
═══════════════════════════════════════════
```

**Automatic Actions on Completion:**
1. Generate PDF receipt
2. Email PDF to customer
3. Email PDF to dispatcher
4. SMS confirmation to customer phone
5. Update trip status to "DELIVERED"
6. Trigger payment processing (if COD)
7. Calculate driver pay
8. Update driver HOS (end trip)
9. Archive in database
10. Update customer portal

**Payment Trigger:**
- For factoring clients: immediate invoice creation
- For direct clients: net-30 invoice
- Auto-email invoice to billing contact
- Track payment status
- Send reminder if unpaid after 15 days

---

### **CORE FEATURE #11: VIN VERIFICATION**

**NHTSA VIN Decoder (Free Government API):**

API: `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/{VIN}?format=json`

**Camera Recognition:**
- OCR from VIN plate photo
- Barcode scanning (if VIN has barcode)
- Manual entry as fallback
- Validation: 17 characters, check digit algorithm

**Data Extracted:**
```javascript
{
  vin: "1HGBH41JXMN109186",
  make: "Honda",
  model: "Accord",
  year: 2021,
  bodyClass: "Sedan",
  vehicleType: "Passenger Car",
  manufacturer: "Honda Motor Company",
  plantCountry: "United States",
  engineCylinders: 4,
  engineHP: 192,
  fuelType: "Gasoline",
  transmission: "Automatic",
  driveType: "FWD",
  doors: 4,
  gvwr: "4,001 - 5,000 lb",
  errorCode: "0 - VIN decoded clean",
  possibleValues: "",
  additionalErrorText: ""
}
```

**Carfax Integration (Paid):**

API: `https://api.carfax.com/v1/vehicle/{VIN}`

**Data Extracted:**
```javascript
{
  vin: "1HGBH41JXMN109186",
  accidents: 0,
  owners: 1,
  title: "Clean",
  odometer: 45234,
  lastReportedOdometer: "2024-10-15",
  recalls: [],
  serviceRecords: 8,
  lastServiceDate: "2024-09-20",
  estimatedValue: 18500,
  historyUrl: "https://carfax.com/report/ABC123"
}
```

**Use Cases:**
1. **Driveaway Service:** Verify vehicle before transport
2. **Pre-Trip Inspection:** Link VIN to inspection report
3. **Insurance:** Verify vehicle specs for coverage
4. **Maintenance:** Track service by VIN
5. **Fleet Management:** Asset tracking
6. **Fraud Prevention:** Verify VIN matches paperwork

---

### **CORE FEATURE #12: ROUTE OPTIMIZATION**

**Google Maps Directions API:**

API: `https://maps.googleapis.com/maps/api/directions/json`

**Parameters:**
```javascript
{
  origin: "Los Angeles, CA",
  destination: "Phoenix, AZ",
  waypoints: ["Barstow, CA", "Needles, CA"], // optional stops
  mode: "driving",
  alternatives: true, // get multiple route options
  departure_time: "now", // or future timestamp
  traffic_model: "best_guess", // or pessimistic/optimistic
  avoid: ["tolls", "highways", "ferries"] // optional
}
```

**Multiple Route Analysis:**

For each route option:
1. **Calculate Fuel Cost:**
   ```javascript
   fuelCost = (distanceMiles / vehicleMPG) * fuelPrice
   ```

2. **Get Weather Along Route:**
   - Check weather at 50-mile intervals
   - Flag hazards: snow, heavy rain, high winds
   - Calculate delay time for weather

3. **Calculate Toll Costs:**
   - Use TollGuru API or manual toll data
   - Sum all tolls along route

4. **Risk Score:**
   ```javascript
   riskScore = 0;
   if