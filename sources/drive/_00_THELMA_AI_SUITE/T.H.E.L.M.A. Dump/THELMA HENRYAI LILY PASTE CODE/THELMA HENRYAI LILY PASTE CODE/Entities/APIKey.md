Original name: APIKey.docx
Drive ID: 1_kuigIjMrOOIiKM8xX8vn_NU2d7dDeRh
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Entities/
Modified: 2025-12-22T04:28:21.000Z

{
  "name": "APIKey",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Friendly name for the API key"
    },
    "key_value": {
      "type": "string",
      "description": "Encrypted API key value"
    },
    "service": {
      "type": "string",
      "description": "Service or module this key is for"
    },
    "environment": {
      "type": "string",
      "enum": [
        "production",
        "staging",
        "development"
      ],
      "default": "production"
    },
    "status": {
      "type": "string",
      "enum": [
        "active",
        "revoked",
        "expired"
      ],
      "default": "active"
    },
    "last_used": {
      "type": "string",
      "format": "date-time"
    },
    "requests_count": {
      "type": "number",
      "default": 0
    },
    "rate_limit": {
      "type": "number",
      "description": "Requests per minute allowed"
    },
    "allowed_ips": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "IP whitelist for this key"
    },
    "expiry_date": {
      "type": "string",
      "format": "date"
    }
  },
  "required": [
    "name",
    "key_value",
    "service"
  ],
  "rls": {
    "create": {
      "user_condition": {
        "role": {
          "$in": [
            "architect",
            "cto",
            "ciso"
          ]
        }
      }
    },
    "read": {
      "user_condition": {
        "role": {
          "$in": [
            "architect",
            "cto",
            "ciso"
          ]
        }
      }
    },
    "update": {
      "user_condition": {
        "role": {
          "$in": [
            "architect",
            "cto",
            "ciso"
          ]
        }
      }
    },
    "delete": {
      "user_condition": {
        "role": {
          "$in": [
            "architect",
            "cto",
            "ciso"
          ]
        }
      }
    }
  }
}
