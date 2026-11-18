Original name: InsuranceProvider.docx
Drive ID: 1dReMbJOs2nR2YFUPNg2L-ygn7XwGDD4n
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Entities/
Modified: 2025-12-22T04:14:39.000Z

{
  "name": "InsuranceProvider",
  "type": "object",
  "properties": {
    "provider_name": {
      "type": "string",
      "description": "Insurance company name (Allstate, Geico, Prudential, etc.)"
    },
    "provider_code": {
      "type": "string",
      "description": "Unique provider identifier"
    },
    "status": {
      "type": "string",
      "enum": [
        "active",
        "inactive",
        "pending_integration"
      ],
      "default": "pending_integration"
    },
    "integration_type": {
      "type": "string",
      "enum": [
        "api",
        "portal",
        "manual",
        "hybrid"
      ]
    },
    "api_endpoint": {
      "type": "string"
    },
    "supported_services": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Policy lookup, claims, verification, etc."
    },
    "contact_info": {
      "type": "object",
      "properties": {
        "claims_phone": {
          "type": "string"
        },
        "agent_phone": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "portal_url": {
          "type": "string"
        }
      }
    },
    "buffer_config": {
      "type": "object",
      "properties": {
        "rate_limit": {
          "type": "number"
        },
        "timeout_seconds": {
          "type": "number"
        },
        "retry_attempts": {
          "type": "number"
        }
      }
    }
  },
  "required": [
    "provider_name",
    "provider_code"
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
