Original name: Load.docx
Drive ID: 1zzpAUMa88wSw1yYMS7BusclXg0Wu-eve
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Entities/
Modified: 2025-12-22T04:11:01.000Z

{
  "name": "Load",
  "type": "object",
  "properties": {
    "load_number": {
      "type": "string",
      "description": "Unique load identifier"
    },
    "platform": {
      "type": "string",
      "enum": [
        "trucking_pro",
        "driveaway"
      ]
    },
    "driver_email": {
      "type": "string"
    },
    "dispatcher_email": {
      "type": "string"
    },
    "customer_email": {
      "type": "string"
    },
    "status": {
      "type": "string",
      "enum": [
        "pending",
        "assigned",
        "in_transit",
        "delivered",
        "completed",
        "cancelled"
      ],
      "default": "pending"
    },
    "pickup_location": {
      "type": "object",
      "properties": {
        "address": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "zip": {
          "type": "string"
        },
        "lat": {
          "type": "number"
        },
        "lng": {
          "type": "number"
        }
      }
    },
    "delivery_location": {
      "type": "object",
      "properties": {
        "address": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "zip": {
          "type": "string"
        },
        "lat": {
          "type": "number"
        },
        "lng": {
          "type": "number"
        }
      }
    },
    "cargo_type": {
      "type": "string"
    },
    "weight_lbs": {
      "type": "number"
    },
    "distance_miles": {
      "type": "number"
    },
    "rate_per_mile": {
      "type": "number"
    },
    "total_charge": {
      "type": "number"
    },
    "pickup_date": {
      "type": "string",
      "format": "date-time"
    },
    "delivery_date": {
      "type": "string",
      "format": "date-time"
    },
    "completed_date": {
      "type": "string",
      "format": "date-time"
    },
    "driver_confirmed": {
      "type": "boolean",
      "default": false
    },
    "customer_confirmed": {
      "type": "boolean",
      "default": false
    },
    "gps_confirmed": {
      "type": "boolean",
      "default": false
    },
    "invoiced": {
      "type": "boolean",
      "default": false
    },
    "invoice_id": {
      "type": "string"
    },
    "vin_numbers": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "VIN numbers for Driveaway loads"
    },
    "special_instructions": {
      "type": "string"
    }
  },
  "required": [
    "load_number",
    "platform",
    "driver_email"
  ],
  "rls": {
    "create": {
      "$or": [
        {
          "dispatcher_email": "{{user.email}}"
        },
        {
          "customer_email": "{{user.email}}"
        },
        {
          "user_condition": {
            "role": "admin"
          }
        }
      ]
    },
    "read": {
      "$or": [
        {
          "driver_email": "{{user.email}}"
        },
        {
          "dispatcher_email": "{{user.email}}"
        },
        {
          "customer_email": "{{user.email}}"
        },
        {
          "user_condition": {
            "role": "admin"
          }
        }
      ]
    },
    "update": {
      "$or": [
        {
          "driver_email": "{{user.email}}"
        },
        {
          "dispatcher_email": "{{user.email}}"
        },
        {
          "customer_email": "{{user.email}}"
        },
        {
          "user_condition": {
            "role": "admin"
          }
        }
      ]
    },
    "delete": {
      "$or": [
        {
          "dispatcher_email": "{{user.email}}"
        },
        {
          "user_condition": {
            "role": "admin"
          }
        }
      ]
    }
  }
}
