Original name: AnalyticsReport.docx
Drive ID: 1KBpaCKElKmR8uiceUnJ4wsG6PKQJjMiG
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Entities/
Modified: 2025-12-22T04:27:53.000Z

{
  "name": "AnalyticsReport",
  "type": "object",
  "properties": {
    "report_id": {
      "type": "string"
    },
    "report_name": {
      "type": "string"
    },
    "report_type": {
      "type": "string",
      "enum": [
        "fleet_summary",
        "emergency_summary",
        "maintenance_analysis",
        "billing_summary",
        "training_performance",
        "custom"
      ]
    },
    "period": {
      "type": "string",
      "enum": [
        "daily",
        "weekly",
        "monthly",
        "quarterly",
        "custom"
      ]
    },
    "start_date": {
      "type": "string",
      "format": "date"
    },
    "end_date": {
      "type": "string",
      "format": "date"
    },
    "filters": {
      "type": "object"
    },
    "data": {
      "type": "object"
    },
    "charts": {
      "type": "array",
      "items": {
        "type": "object"
      }
    },
    "generated_by": {
      "type": "string"
    },
    "generated_at": {
      "type": "string",
      "format": "date-time"
    },
    "is_automated": {
      "type": "boolean",
      "default": false
    }
  },
  "required": [
    "report_id",
    "report_name",
    "report_type"
  ],
  "rls": {
    "create": {
      "user_condition": {
        "role": "admin"
      }
    },
    "read": {
      "user_condition": {
        "role": "admin"
      }
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
