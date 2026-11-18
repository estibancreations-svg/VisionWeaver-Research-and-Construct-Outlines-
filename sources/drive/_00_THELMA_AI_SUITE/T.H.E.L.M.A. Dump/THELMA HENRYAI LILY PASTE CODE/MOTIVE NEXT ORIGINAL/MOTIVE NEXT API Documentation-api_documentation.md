Original name: MOTIVE NEXT API Documentation-api_documentation.md
Drive ID: 1PyMj0hS7l7XSyYsauYM6NmU9bWCkoUbu
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/MOTIVE NEXT ORIGINAL/
Modified: 2025-11-06T00:01:21.000Z

# MOTIVE NEXT API Documentation

## Base URL
```
Production: https://motivenext.online/.netlify/functions
Development: http://localhost:8888/.netlify/functions
```

## Authentication
All authenticated endpoints require Bearer token in header:
```
Authorization: Bearer <netlify_identity_token>
```

---

## 🚨 Emergency Services

### POST /emergency-activate
Activate emergency SOS with GPS location.

**Request:**
```json
{
  "location": {
    "latitude": 34.0522,
    "longitude": -118.2437
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "emergencyId": "EMG_1705315800000",
  "location": { "latitude": 34.0522, "longitude": -118.2437 },
  "contactsNotified": ["dispatch", "emergency", "fleet"],
  "responseStatus": "active",
  "estimatedResponseTime": "12 minutes"
}
```

---

## 🛡️ Insurance Monitoring

### GET /insurance-status
Get real-time insurance monitoring data from Allstate and Progressive.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "allstate": "✅ Active - Score: 85",
  "progressive": "✅ Active - Discount: 12%",
  "telemetry": {
    "allstate": { "drivingScore": 85, "lastSync": "2025-01-15T10:00:00Z" },
    "progressive": { "discount": 12, "safetyRating": "Good" }
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

---

## 📻 CB Radio / Push-to-Talk

### POST /ptt-start
Start PTT communication session.

**Request:**
```json
{
  "contact": "dispatch",
  "userId": "user_123"
}
```

**Response:**
```json
{
  "success": true,
  "sessionId": "call_sid_abc123",
  "contact": "dispatch",
  "status": "PTT Active",
  "recipient": "dispatch@motivenext.online",
  "phone": "+18005551235"
}
```

### POST /ptt-end
End PTT session.

**Request:**
```json
{
  "userId": "user_123",
  "sessionId": "call_sid_abc123"
}
```

---

## ⏱️ Hours of Service (HOS)

### POST /hos-update
Update HOS tracking data.

**Request:**
```json
{
  "timestamp": "2025-01-15T10:30:00Z",
  "status": "driving",
  "location": {
    "latitude": 34.0522,
    "longitude": -118.2437
  }
}
```

**Response:**
```json
{
  "driveTime": "8:45",
  "onDutyTime": "10:30",
  "cycleTime": "52:15",
  "remainingDrive": "2:15",
  "remainingOnDuty": "3:30",
  "violations": [],
  "eldCompliant": true
}
```

### GET /hos-update
Get current HOS status.

---

## 🚗 VIN Verification

### POST /vin-verify
Verify vehicle VIN and retrieve vehicle information.

**Request:**
```json
{
  "vin": "1HGBH41JXMN109186"
}
```

**Response:**
```json
{
  "vin": "1HGBH41JXMN109186",
  "verified": true,
  "vehicle": {
    "make": "Honda",
    "model": "Accord",
    "year": "2021",
    "type": "Passenger Car",
    "bodyClass": "Sedan",
    "manufacturer": "Honda Motor Company",
    "engineCylinders": "4",
    "fuelType": "Gasoline"
  },
  "history": {
    "available": true,
    "accidents": 0,
    "owners": 1
  },
  "dataSource": "NHTSA VPIC Database"
}
```

---

## 💳 Payment Processing

### POST /payment-process
Process subscription or invoice payment.

**Request (Subscription):**
```json
{
  "action": "create-subscription",
  "plan": "professional",
  "userId": "user_123",
  "paymentMethodId": "pm_card_visa"
}
```

**Request (Daily Billing):**
```json
{
  "action": "create-invoice",
  "userId": "user_123",
  "amount": 7500
}
```

**Response:**
```json
{
  "success": true,
  "subscriptionId": "sub_abc123",
  "status": "active",
  "currentPeriodEnd": 1737849600
}
```

---

## 🌤️ Weather Monitoring

### POST /weather-monitor
Get real-time weather conditions and hazards.

**Request:**
```json
{
  "latitude": 34.0522,
  "longitude": -118.2437
}
```

**Response:**
```json
{
  "location": { "latitude": 34.0522, "longitude": -118.2437 },
  "current": {
    "temperature": 72,
    "conditions": "Clear",
    "humidity": 65,
    "wind_speed": 8,
    "visibility": 10000
  },
  "hazards": [],
  "alerts": [],
  "recommendation": "SAFE_TO_PROCEED"
}
```

---

## 💰 Expense Tracking

### POST /expense-add
Add new expense with optional receipt upload.

**Request:**
```json
{
  "expenseType": "fuel",
  "amount": 125.50,
  "vendor": "Shell Station",
  "date": "2025-01-15",
  "notes": "Fuel stop in Nevada",
  "receiptImage": "data:image/jpeg;base64,..."
}
```

**Response:**
```json
{
  "success": true,
  "expense": {
    "id": "EXP_1705315800000",
    "expenseType": "fuel",
    "amountCents": 12550,
    "taxCategory": "Vehicle Operating Costs",
    "receiptUrl": "https://cloudinary.com/receipt_123.jpg",
    "irsDeductible": true
  }
}
```

---

## 🚛 Load Board Search

### POST /load-board-search
Search DAT and Truckstop load boards.

**Request:**
```json
{
  "origin": "Los Angeles, CA",
  "destination": "Phoenix, AZ",
  "equipmentType": "Van",
  "radius": 100,
  "minRate": 2.50
}
```

**Response:**
```json
{
  "success": true,
  "count": 15,
  "loads": [
    {
      "routeId": "LOAD_001",
      "source": "DAT",
      "ratePerMile": 2.85,
      "distance": "375 miles",
      "pickupDate": "2025-01-16",
      "commodity": "Electronics"
    }
  ]
}
```

---

## 📊 IFTA Reporting

### POST /ifta-report
Generate quarterly IFTA fuel tax report.

**Request:**
```json
{
  "quarter": 1,
  "year": 2025,
  "userId": "user_123"
}
```

**Response:**
```json
{
  "success": true,
  "report": {
    "reportId": "IFTA_1_2025_1705315800000",
    "quarter": 1,
    "year": 2025,
    "totalMiles": 15420,
    "totalGallons": 2570,
    "jurisdictions": {
      "CA": { "miles": 4500, "taxOwed": "1245.50" },
      "NV": { "miles": 2200, "taxOwed": "412.30" }
    },
    "totalTaxOwed": "3847.80",
    "dueDate": "2025-04-30",
    "pdfUrl": "https://motivenext.online/ifta/report.pdf"
  }
}
```

---

## 🗺️ Route Optimization

### POST /route-optimize
Get AI-optimized routes with weather, traffic, and cost analysis.

**Request:**
```json
{
  "origin": "Los Angeles, CA",
  "destination": "Phoenix, AZ",
  "vehicleType": "semi",
  "preferences": {
    "avoidTolls": false,
    "preferHighways": true
  }
}
```

**Response:**
```json
{
  "success": true,
  "routesFound": 3,
  "bestRoute": {
    "routeId": "ROUTE_1",
    "distance": "375 miles",
    "duration": "5 hours 45 min",
    "fuelCost": 375.50,
    "tollCost": 0,
    "totalCost": 375.50,
    "riskScore": 1,
    "recommendation": "RECOMMENDED"
  }
}
```

---

## 🔧 Predictive Maintenance

### GET /maintenance-predict
Get predictive maintenance alerts based on vehicle data.

**Query Params:**
- `vehicleId`: Vehicle identifier
- `currentOdometer`: Current odometer reading

**Response:**
```json
{
  "success": true,
  "vehicleId": "VEH_123",
  "currentOdometer": 155000,
  "maintenanceSchedule": {
    "oilChange": {
      "nextDue": 160000,
      "dueIn": 5000,
      "status": "OK"
    },
    "brakeInspection": {
      "nextDue": 155000,
      "dueIn": 0,
      "status": "DUE_SOON"
    }
  },
  "alerts": [
    {
      "type": "brakeInspection",
      "severity": "WARNING",
      "message": "Brake inspection due now"
    }
  ],
  "estimatedCost": 150
}
```

---

## Error Responses

All endpoints return standard error format:

```json
{
  "error": "Description of error",
  "code": "ERROR_CODE",
  "timestamp": "2025-01-15T10:30:00Z"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request (invalid parameters)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `405` - Method Not Allowed
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

---

## Rate Limits

Free Tier: 100 requests/hour per IP
Paid Tier: 1000 requests/hour per user

## Support

Email: support@motivenext.online
Owner: Steven Henry
Documentation: https://motivenext.online/docs