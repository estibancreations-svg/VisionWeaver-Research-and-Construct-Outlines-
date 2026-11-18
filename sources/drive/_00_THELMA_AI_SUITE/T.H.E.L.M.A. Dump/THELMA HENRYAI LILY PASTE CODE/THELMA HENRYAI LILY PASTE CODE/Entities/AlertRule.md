Original name: AlertRule.docx
Drive ID: 1_0gCQXgIg8tVspo3-REcGF7B1NYIlwwZ
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Entities/
Modified: 2025-12-22T04:24:59.000Z

{
  "name": "AlertRule",
  "type": "object",
  "properties": {
    "rule_id": {
      "type": "string"
    },
    "rule_name": {
      "type": "string"
    },
    "enabled": {
      "type": "boolean",
      "default": true
    },
    "alert_type": {
      "type": "string",
      "enum": [
        "geofence",
        "proximity",
        "telematics",
        "maintenance",
        "emergency",
        "weather",
        "custom"
      ]
    },
    "asset_type": {
      "type": "string",
      "enum": [
        "truck",
        "aviation_asset",
        "all"
      ]
    },
    "conditions": {
      "type": "object",
      "properties": {
        "metric": {
          "type": "string"
        },
        "operator": {
          "type": "string"
        },
        "threshold": {
          "type": "number"
        },
        "geofence_coords": {
          "type": "array",
          "items": {
            "type": "object"
          }
        },
        "proximity_radius_miles": {
          "type": "number"
        }
      }
    },
    "notification_channels": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": [
          "in_app",
          "email",
          "sms"
        ]
      }
    },
    "notify_users": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "severity": {
      "type": "string",
      "enum": [
        "info",
        "warning",
        "critical",
        "emergency"
      ]
    }
  },
  "required": [
    "rule_id",
    "rule_name",
    "alert_type"
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
      "user_condition": {
        "role": "admin"
      }
    }
  }
}
