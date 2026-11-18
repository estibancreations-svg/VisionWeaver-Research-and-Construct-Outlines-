Original name: Subscription.docx
Drive ID: 1_QTcYbjVc2hQOO6CC8LY0g0HIDj8dz5R
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Entities/
Modified: 2025-12-22T04:10:36.000Z

{
  "name": "Subscription",
  "type": "object",
  "properties": {
    "user_email": {
      "type": "string",
      "description": "Email of the subscriber"
    },
    "user_type": {
      "type": "string",
      "enum": [
        "driver",
        "fleet_manager",
        "customer"
      ],
      "description": "Type of user"
    },
    "platform": {
      "type": "string",
      "enum": [
        "trucking_pro",
        "driveaway"
      ],
      "description": "Platform subscription"
    },
    "tier": {
      "type": "string",
      "enum": [
        "basic",
        "professional",
        "enterprise"
      ],
      "description": "Subscription tier"
    },
    "monthly_rate": {
      "type": "number",
      "description": "Monthly subscription cost"
    },
    "status": {
      "type": "string",
      "enum": [
        "active",
        "pending",
        "expired",
        "cancelled",
        "grace_period"
      ],
      "default": "pending"
    },
    "billing_cycle": {
      "type": "string",
      "enum": [
        "monthly",
        "annual"
      ],
      "default": "monthly"
    },
    "start_date": {
      "type": "string",
      "format": "date"
    },
    "next_renewal_date": {
      "type": "string",
      "format": "date"
    },
    "auto_renew": {
      "type": "boolean",
      "default": true
    },
    "payment_method_id": {
      "type": "string",
      "description": "Reference to stored payment method"
    },
    "grace_period_end": {
      "type": "string",
      "format": "date",
      "description": "End date for grace period after failed payment"
    },
    "features_enabled": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "List of enabled features for this tier"
    }
  },
  "required": [
    "user_email",
    "tier",
    "platform"
  ],
  "rls": {
    "create": {
      "user_email": "{{user.email}}"
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
    "delete": {
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
    }
  }
}
