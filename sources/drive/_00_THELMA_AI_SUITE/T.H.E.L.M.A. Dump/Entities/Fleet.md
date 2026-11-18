Original name: Fleet.docx
Drive ID: 1wo_hDDISkXk3IcUwbFT7KlkbaJ0rUR2a
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Entities/
Modified: 2025-12-22T04:12:52.000Z

{
  "name": "Fleet",
  "type": "object",
  "properties": {
    "fleet_name": {
      "type": "string"
    },
    "owner_email": {
      "type": "string"
    },
    "company_name": {
      "type": "string"
    },
    "dot_number": {
      "type": "string"
    },
    "mc_number": {
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
    "status": {
      "type": "string",
      "enum": [
        "active",
        "inactive",
        "suspended"
      ],
      "default": "active"
    },
    "subscription_id": {
      "type": "string"
    },
    "billing_email": {
      "type": "string"
    },
    "address": {
      "type": "object",
      "properties": {
        "street": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "zip": {
          "type": "string"
        }
      }
    },
    "phone": {
      "type": "string"
    },
    "driver_count": {
      "type": "number",
      "default": 0
    },
    "truck_count": {
      "type": "number",
      "default": 0
    }
  },
  "required": [
    "fleet_name",
    "owner_email",
    "platform"
  ],
  "rls": {
    "create": {
      "owner_email": "{{user.email}}"
    },
    "read": {
      "$or": [
        {
          "owner_email": "{{user.email}}"
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
          "owner_email": "{{user.email}}"
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
          "owner_email": "{{user.email}}"
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
