Original name: Invoice.docx
Drive ID: 13tzDPbgEHK2qaY6yb5rj7mmL-jTEGb_v
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Entities/
Modified: 2025-12-22T04:11:32.000Z

{
  "name": "Invoice",
  "type": "object",
  "properties": {
    "invoice_number": {
      "type": "string",
      "description": "Unique invoice identifier"
    },
    "invoice_type": {
      "type": "string",
      "enum": [
        "load",
        "subscription",
        "combined"
      ],
      "description": "Type of invoice"
    },
    "customer_email": {
      "type": "string"
    },
    "customer_name": {
      "type": "string"
    },
    "billing_date": {
      "type": "string",
      "format": "date"
    },
    "due_date": {
      "type": "string",
      "format": "date"
    },
    "status": {
      "type": "string",
      "enum": [
        "draft",
        "pending",
        "sent",
        "paid",
        "overdue",
        "cancelled"
      ],
      "default": "draft"
    },
    "subscription_id": {
      "type": "string"
    },
    "load_ids": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Associated load IDs"
    },
    "line_items": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "description": {
            "type": "string"
          },
          "quantity": {
            "type": "number"
          },
          "unit_price": {
            "type": "number"
          },
          "total": {
            "type": "number"
          }
        }
      }
    },
    "subtotal": {
      "type": "number"
    },
    "tax_rate": {
      "type": "number"
    },
    "tax_amount": {
      "type": "number"
    },
    "total_amount": {
      "type": "number"
    },
    "payment_method": {
      "type": "string"
    },
    "payment_date": {
      "type": "string",
      "format": "date-time"
    },
    "payment_reference": {
      "type": "string"
    },
    "notes": {
      "type": "string"
    },
    "billing_cycle_id": {
      "type": "string"
    }
  },
  "required": [
    "invoice_number",
    "invoice_type",
    "customer_email"
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
          "customer_email": "{{user.email}}"
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
