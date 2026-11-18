Original name: Alert.docx
Drive ID: 17dwzQeIJ8b45MWs43Uhz_JwrtDeUc_Q_
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Entities/
Modified: 2025-12-22T04:19:57.000Z

{
  "name": "Alert",
  "type": "object",
  "properties": {
    "alert_id": {
      "type": "string"
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
    "severity": {
      "type": "string",
      "enum": [
        "info",
        "warning",
        "critical",
        "emergency"
      ],
      "default": "info"
    },
    "status": {
      "type": "string",
      "enum": [
        "active",
        "acknowledged",
        "resolved",
        "dismissed"
      ],
      "default": "active"
    },
    "title": {
      "type": "string"
    },
    "message": {
      "type": "string"
    },
    "asset_type": {
      "type": "string"
    },
    "asset_id": {
      "type": "string"
    },
    "location": {
      "type": "object",
      "properties": {
        "lat": {
          "type": "number"
        },
        "lng": {
          "type": "number"
        }
      }
    },
    "trigger_data": {
      "type": "object",
      "properties": {
        "threshold": {
          "type": "number"
        },
        "actual_value": {
          "type": "number"
        },
        "metric": {
          "type": "string"
        }
      }
    },
    "notification_channels": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "default": [
        "in_app"
      ]
    },
    "notified_users": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "acknowledged_by": {
      "type": "string"
    },
    "acknowledged_at": {
      "type": "string",
      "format": "date-time"
    },
    "resolved_at": {
      "type": "string",
      "format": "date-time"
    }
  },
  "required": [
    "alert_id",
    "alert_type",
    "severity",
    "title",
    "message"
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
