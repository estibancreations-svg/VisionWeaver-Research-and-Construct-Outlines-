Original name: Driver.docx
Drive ID: 1ax7PDYwa3EUwMl0MfIiZ065AVLxNkCBE
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Entities/
Modified: 2025-12-22T04:12:18.000Z

{
  "name": "Driver",
  "type": "object",
  "properties": {
    "email": {
      "type": "string"
    },
    "full_name": {
      "type": "string"
    },
    "phone": {
      "type": "string"
    },
    "platform": {
      "type": "string",
      "enum": [
        "trucking_pro",
        "driveaway",
        "both"
      ]
    },
    "license_number": {
      "type": "string"
    },
    "license_state": {
      "type": "string"
    },
    "license_expiry": {
      "type": "string",
      "format": "date"
    },
    "cdl_class": {
      "type": "string",
      "enum": [
        "A",
        "B",
        "C",
        "none"
      ]
    },
    "endorsements": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "status": {
      "type": "string",
      "enum": [
        "active",
        "inactive",
        "suspended",
        "pending_verification"
      ],
      "default": "pending_verification"
    },
    "fleet_id": {
      "type": "string"
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
    "emergency_contact": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "phone": {
          "type": "string"
        },
        "relationship": {
          "type": "string"
        }
      }
    },
    "subscription_id": {
      "type": "string"
    },
    "loads_completed": {
      "type": "number",
      "default": 0
    },
    "rating": {
      "type": "number"
    }
  },
  "required": [
    "email",
    "full_name",
    "platform"
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
          "email": "{{user.email}}"
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
          "email": "{{user.email}}"
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
      "user_condition": {
        "role": "admin"
      }
    }
  }
}
