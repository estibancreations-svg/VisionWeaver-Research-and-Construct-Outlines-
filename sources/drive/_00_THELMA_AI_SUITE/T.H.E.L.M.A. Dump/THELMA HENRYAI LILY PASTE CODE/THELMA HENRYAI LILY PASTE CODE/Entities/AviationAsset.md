Original name: AviationAsset.docx
Drive ID: 1wXtRRQtytBR5c3CuKjrpeFYe0Aw-M-Dm
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Entities/
Modified: 2025-12-22T04:16:15.000Z

{
  "name": "AviationAsset",
  "type": "object",
  "properties": {
    "asset_id": {
      "type": "string"
    },
    "asset_type": {
      "type": "string",
      "enum": [
        "drone",
        "helicopter",
        "fixed_wing",
        "cargo_aircraft",
        "medevac"
      ]
    },
    "registration_number": {
      "type": "string",
      "description": "FAA registration or drone serial"
    },
    "vin": {
      "type": "string",
      "description": "Serial number for identification and tracking"
    },
    "make": {
      "type": "string"
    },
    "model": {
      "type": "string"
    },
    "status": {
      "type": "string",
      "enum": [
        "available",
        "in_flight",
        "maintenance",
        "grounded",
        "retired"
      ],
      "default": "available"
    },
    "capabilities": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "cargo, medical, surveillance, inspection, etc."
    },
    "max_payload_lbs": {
      "type": "number"
    },
    "max_range_miles": {
      "type": "number"
    },
    "max_flight_time_hours": {
      "type": "number"
    },
    "height_feet": {
      "type": "number",
      "description": "Physical height for clearance planning"
    },
    "weight_lbs": {
      "type": "number",
      "description": "Empty weight for fuel calculations"
    },
    "current_location": {
      "type": "object",
      "properties": {
        "base_name": {
          "type": "string"
        },
        "lat": {
          "type": "number"
        },
        "lng": {
          "type": "number"
        },
        "altitude_feet": {
          "type": "number"
        },
        "updated_at": {
          "type": "string",
          "format": "date-time"
        }
      }
    },
    "pilot_email": {
      "type": "string"
    },
    "faa_compliance": {
      "type": "object",
      "properties": {
        "part_107_certified": {
          "type": "boolean"
        },
        "airworthiness_cert": {
          "type": "boolean"
        },
        "last_inspection": {
          "type": "string",
          "format": "date"
        },
        "next_inspection_due": {
          "type": "string",
          "format": "date"
        }
      }
    },
    "insurance_policy_id": {
      "type": "string"
    },
    "telematics": {
      "type": "object",
      "properties": {
        "flight_hours": {
          "type": "number"
        },
        "battery_cycles": {
          "type": "number"
        },
        "motor_hours": {
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
    "asset_id",
    "asset_type"
  ],
  "rls": {
    "create": {
      "user_condition": {
        "role": "admin"
      }
    },
    "read": {
      "$or": [
        {
          "pilot_email": "{{user.email}}"
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
          "pilot_email": "{{user.email}}"
        },
        {
          "user_condition": {
            "role": "admin"
          }
        }
      ]
    },
    "delete": {
      "user_condition": {
        "role": "admin"
      }
    }
  }
}
