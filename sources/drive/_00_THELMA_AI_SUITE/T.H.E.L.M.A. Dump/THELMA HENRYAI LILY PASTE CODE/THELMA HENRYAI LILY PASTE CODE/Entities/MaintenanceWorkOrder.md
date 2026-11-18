Original name: MaintenanceWorkOrder.docx
Drive ID: 1lgllV3QNDVjbS8q_64MUJyOjT5KvcjHJ
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Entities/
Modified: 2025-12-22T04:18:37.000Z

{
  "name": "MaintenanceWorkOrder",
  "type": "object",
  "properties": {
    "work_order_id": {
      "type": "string"
    },
    "asset_type": {
      "type": "string",
      "enum": [
        "truck",
        "aviation",
        "other"
      ]
    },
    "asset_id": {
      "type": "string",
      "description": "Reference to Truck or AviationAsset"
    },
    "vin": {
      "type": "string"
    },
    "status": {
      "type": "string",
      "enum": [
        "pending",
        "scheduled",
        "in_progress",
        "completed",
        "cancelled"
      ],
      "default": "pending"
    },
    "priority": {
      "type": "string",
      "enum": [
        "routine",
        "preventive",
        "urgent",
        "critical"
      ],
      "default": "routine"
    },
    "work_type": {
      "type": "string",
      "enum": [
        "scheduled_maintenance",
        "predictive_maintenance",
        "repair",
        "inspection"
      ]
    },
    "predicted_failure": {
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
    },
    "description": {
      "type": "string"
    },
    "components_affected": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "scheduled_date": {
      "type": "string",
      "format": "date"
    },
    "completed_date": {
      "type": "string",
      "format": "date-time"
    },
    "technician_email": {
      "type": "string"
    },
    "estimated_cost": {
      "type": "number"
    },
    "actual_cost": {
      "type": "number"
    },
    "parts_needed": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "part_name": {
            "type": "string"
          },
          "part_number": {
            "type": "string"
          },
          "quantity": {
            "type": "number"
          },
          "cost": {
            "type": "number"
          }
        }
      }
    },
    "notes": {
      "type": "string"
    },
    "ai_generated": {
      "type": "boolean",
      "default": false,
      "description": "True if created by predictive AI"
    }
  },
  "required": [
    "work_order_id",
    "asset_type",
    "asset_id"
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
