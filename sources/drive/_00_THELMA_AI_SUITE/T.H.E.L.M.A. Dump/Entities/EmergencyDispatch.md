Original name: EmergencyDispatch.docx
Drive ID: 1TUR-oJAm8lj-SzmND_CglUzUIDcZVGKU
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Entities/
Modified: 2025-12-22T04:15:21.000Z

{
  "name": "EmergencyDispatch",
  "type": "object",
  "properties": {
    "dispatch_id": {
      "type": "string"
    },
    "incident_type": {
      "type": "string",
      "enum": [
        "medical",
        "fire",
        "police",
        "hazmat",
        "roadside",
        "weather",
        "other"
      ]
    },
    "priority": {
      "type": "string",
      "enum": [
        "critical",
        "high",
        "medium",
        "low"
      ],
      "default": "medium"
    },
    "status": {
      "type": "string",
      "enum": [
        "pending",
        "dispatched",
        "en_route",
        "on_scene",
        "resolved",
        "cancelled"
      ],
      "default": "pending"
    },
    "dispatch_mode": {
      "type": "string",
      "enum": [
        "land",
        "air",
        "water",
        "drone",
        "multi_modal"
      ]
    },
    "caller_info": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "phone": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "driver_id": {
          "type": "string"
        }
      }
    },
    "location": {
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
        "lat": {
          "type": "number"
        },
        "lng": {
          "type": "number"
        },
        "landmark": {
          "type": "string"
        }
      }
    },
    "incident_details": {
      "type": "string"
    },
    "injuries_reported": {
      "type": "boolean",
      "default": false
    },
    "vehicles_involved": {
      "type": "number"
    },
    "responders_assigned": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "unit_id": {
            "type": "string"
          },
          "unit_type": {
            "type": "string"
          },
          "eta_minutes": {
            "type": "number"
          },
          "status": {
            "type": "string"
          }
        }
      }
    },
    "local_ems_notified": {
      "type": "boolean",
      "default": false
    },
    "insurance_claim_initiated": {
      "type": "boolean",
      "default": false
    },
    "insurance_provider_id": {
      "type": "string"
    },
    "resolution_notes": {
      "type": "string"
    },
    "resolved_at": {
      "type": "string",
      "format": "date-time"
    }
  },
  "required": [
    "dispatch_id",
    "incident_type",
    "location"
  ],
  "rls": {
    "create": {
      "$or": [
        {
          "caller_info.email": "{{user.email}}"
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
          "caller_info.email": "{{user.email}}"
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
      "user_condition": {
        "role": "admin"
      }
    },
    "delete": {
      "user_condition": {
        "role": "admin"
      }
    }
  }
}
