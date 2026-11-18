Original name: ClaimReport.docx
Drive ID: 1mKmNTyYLYX3_SXabHCaOtsjxeMglPt63
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Entities/
Modified: 2025-12-22T04:18:59.000Z

{
  "name": "ClaimReport",
  "type": "object",
  "properties": {
    "claim_id": {
      "type": "string"
    },
    "incident_id": {
      "type": "string",
      "description": "Associated EmergencyDispatch incident"
    },
    "provider_id": {
      "type": "string",
      "description": "InsuranceProvider reference"
    },
    "policy_number": {
      "type": "string"
    },
    "claimant_email": {
      "type": "string"
    },
    "status": {
      "type": "string",
      "enum": [
        "draft",
        "ai_processing",
        "pending_review",
        "submitted",
        "approved",
        "denied",
        "paid"
      ],
      "default": "draft"
    },
    "incident_date": {
      "type": "string",
      "format": "date"
    },
    "incident_description": {
      "type": "string"
    },
    "incident_photos": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "URLs to uploaded photos"
    },
    "ai_analysis": {
      "type": "object",
      "properties": {
        "damage_estimate": {
          "type": "number"
        },
        "damage_description": {
          "type": "string"
        },
        "coverage_verified": {
          "type": "boolean"
        },
        "coverage_details": {
          "type": "string"
        },
        "recommended_action": {
          "type": "string"
        },
        "confidence_score": {
          "type": "number"
        }
      }
    },
    "estimated_damage_cost": {
      "type": "number"
    },
    "approved_amount": {
      "type": "number"
    },
    "filed_with_provider": {
      "type": "boolean",
      "default": false
    },
    "filed_at": {
      "type": "string",
      "format": "date-time"
    },
    "provider_claim_number": {
      "type": "string",
      "description": "Claim number from external provider"
    },
    "notes": {
      "type": "string"
    }
  },
  "required": [
    "claim_id",
    "claimant_email"
  ],
  "rls": {
    "create": {
      "$or": [
        {
          "claimant_email": "{{user.email}}"
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
          "claimant_email": "{{user.email}}"
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
          "claimant_email": "{{user.email}}"
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
