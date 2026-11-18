Original name: Truck.docx
Drive ID: 1lRUwRDbpO-nFsxhgeOh0x1RV6y6kwvtY
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Entities/
Modified: 2025-12-22T04:13:28.000Z

{
  "name": "Truck",
  "type": "object",
  "properties": {
    "unit_number": {
      "type": "string"
    },
    "fleet_id": {
      "type": "string"
    },
    "driver_email": {
      "type": "string"
    },
    "type": {
      "type": "string",
      "enum": [
        "semi",
        "box_truck",
        "flatbed",
        "tanker",
        "reefer",
        "car_hauler",
        "personal_vehicle"
      ]
    },
    "make": {
      "type": "string"
    },
    "model": {
      "type": "string"
    },
    "year": {
      "type": "number"
    },
    "vin": {
      "type": "string",
      "description": "Vehicle Identification Number"
    },
    "license_plate": {
      "type": "string"
    },
    "license_state": {
      "type": "string"
    },
    "status": {
      "type": "string",
      "enum": [
        "active",
        "maintenance",
        "out_of_service",
        "retired"
      ],
      "default": "active"
    },
    "max_weight_lbs": {
      "type": "number"
    },
    "height_inches": {
      "type": "number"
    },
    "length_feet": {
      "type": "number"
    },
    "hazmat_certified": {
      "type": "boolean",
      "default": false
    },
    "current_location": {
      "type": "object",
      "properties": {
        "lat": {
          "type": "number"
        },
        "lng": {
          "type": "number"
        },
        "updated_at": {
          "type": "string",
          "format": "date-time"
        }
      }
    },
    "fuel_type": {
      "type": "string",
      "enum": [
        "diesel",
        "gasoline",
        "electric",
        "hybrid"
      ]
    },
    "mpg_average": {
      "type": "number"
    },
    "last_inspection_date": {
      "type": "string",
      "format": "date"
    },
    "next_inspection_due": {
      "type": "string",
      "format": "date"
    },
    "telematics": {
      "type": "object",
      "properties": {
        "odometer_miles": {
          "type": "number"
        },
        "engine_hours": {
          "type": "number"
        },
        "fault_codes": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "last_diagnostic": {
          "type": "string",
          "format": "date-time"
        },
        "oil_life_percent": {
          "type": "number"
        },
        "tire_pressure_psi": {
          "type": "array",
          "items": {
            "type": "number"
          }
        },
        "battery_voltage": {
          "type": "number"
        }
      }
    },
    "maintenance_score": {
      "type": "number",
      "description": "AI-predicted health score 0-100"
    },
    "predicted_failures": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "component": {
            "type": "string"
          },
          "probability": {
            "type": "number"
          },
          "estimated_days": {
            "type": "number"
          }
        }
      }
    }
  },
  "required": [
    "unit_number",
    "type"
  ],
  "rls": {
    "create": {
      "$or": [
        {
          "created_by": "{{user.email}}"
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
          "created_by": "{{user.email}}"
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
          "created_by": "{{user.email}}"
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
          "created_by": "{{user.email}}"
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
