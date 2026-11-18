Original name: Certificate.docx
Drive ID: 1nMbMC4OqTSQwgGRfDJBUoFVViX0gOJLx
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Entities/
Modified: 2025-12-22T04:27:21.000Z

{
  "name": "Certificate",
  "type": "object",
  "properties": {
    "certificate_id": {
      "type": "string"
    },
    "user_email": {
      "type": "string"
    },
    "user_name": {
      "type": "string"
    },
    "module_id": {
      "type": "string"
    },
    "module_name": {
      "type": "string"
    },
    "issue_date": {
      "type": "string",
      "format": "date"
    },
    "expiry_date": {
      "type": "string",
      "format": "date"
    },
    "final_score": {
      "type": "number"
    },
    "verification_code": {
      "type": "string",
      "description": "Encrypted verification code for certificate authenticity"
    },
    "issuer_email": {
      "type": "string"
    },
    "status": {
      "type": "string",
      "enum": [
        "active",
        "expired",
        "revoked"
      ],
      "default": "active"
    }
  },
  "required": [
    "certificate_id",
    "user_email",
    "module_id"
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
          "user_email": "{{user.email}}"
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
