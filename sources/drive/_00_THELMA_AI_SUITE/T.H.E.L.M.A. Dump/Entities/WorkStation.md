Original name: WorkStation.docx
Drive ID: 1NvAg5JCJTh2AF0IAbSzRS9l9YCbQ1We3
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Entities/
Modified: 2025-12-22T04:17:05.000Z

{
  "name": "WorkStation",
  "type": "object",
  "properties": {
    "station_id": {
      "type": "string"
    },
    "station_name": {
      "type": "string"
    },
    "station_type": {
      "type": "string",
      "enum": [
        "trucking_dispatch",
        "driveaway_dispatch",
        "ems_dispatch",
        "aviation_control",
        "drone_operations",
        "insurance_desk",
        "customer_service",
        "billing_admin",
        "fleet_management",
        "main_hub"
      ]
    },
    "status": {
      "type": "string",
      "enum": [
        "online",
        "offline",
        "maintenance"
      ],
      "default": "online"
    },
    "operator_email": {
      "type": "string"
    },
    "connected_entities": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "List of entity types this station can access"
    },
    "external_connections": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "provider_type": {
            "type": "string"
          },
          "provider_name": {
            "type": "string"
          },
          "connection_status": {
            "type": "string"
          },
          "last_sync": {
            "type": "string",
            "format": "date-time"
          }
        }
      }
    },
    "permissions": {
      "type": "object",
      "properties": {
        "can_dispatch": {
          "type": "boolean"
        },
        "can_view_billing": {
          "type": "boolean"
        },
        "can_initiate_claims": {
          "type": "boolean"
        },
        "can_contact_ems": {
          "type": "boolean"
        },
        "can_manage_aviation": {
          "type": "boolean"
        }
      }
    },
    "activity_log": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "action": {
            "type": "string"
          },
          "timestamp": {
            "type": "string",
            "format": "date-time"
          },
          "details": {
            "type": "string"
          }
        }
      }
    }
  },
  "required": [
    "station_id",
    "station_name",
    "station_type"
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
          "operator_email": "{{user.email}}"
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
          "operator_email": "{{user.email}}"
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
