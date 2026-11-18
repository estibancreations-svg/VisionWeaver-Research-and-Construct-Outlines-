Original name: BillingCycle.docx
Drive ID: 1KfNDeJCnZMvvc-2iNuAH96m8VmKfY3cN
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Entities/
Modified: 2025-12-22T04:11:58.000Z

{
  "name": "BillingCycle",
  "type": "object",
  "properties": {
    "cycle_id": {
      "type": "string",
      "description": "Unique cycle identifier (e.g., 2025-01-15)"
    },
    "cycle_date": {
      "type": "string",
      "format": "date"
    },
    "cutoff_time": {
      "type": "string",
      "description": "Daily cutoff time (7 PM EST)"
    },
    "status": {
      "type": "string",
      "enum": [
        "pending",
        "processing",
        "completed",
        "failed"
      ],
      "default": "pending"
    },
    "loads_processed": {
      "type": "number",
      "default": 0
    },
    "invoices_generated": {
      "type": "number",
      "default": 0
    },
    "subscriptions_renewed": {
      "type": "number",
      "default": 0
    },
    "total_revenue": {
      "type": "number",
      "default": 0
    },
    "processing_started": {
      "type": "string",
      "format": "date-time"
    },
    "processing_completed": {
      "type": "string",
      "format": "date-time"
    },
    "errors": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "reference_id": {
            "type": "string"
          }
        }
      }
    }
  },
  "required": [
    "cycle_id",
    "cycle_date"
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
