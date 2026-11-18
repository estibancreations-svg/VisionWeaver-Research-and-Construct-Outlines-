Original name: Document.docx
Drive ID: 1XbjH4QSpCYDda79wPHUxbGvHfUMDCQOQ
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Entities/
Modified: 2025-12-22T04:19:39.000Z

{
  "name": "Document",
  "type": "object",
  "properties": {
    "document_id": {
      "type": "string"
    },
    "title": {
      "type": "string"
    },
    "category": {
      "type": "string",
      "enum": [
        "registration",
        "insurance",
        "license",
        "certification",
        "maintenance_record",
        "invoice",
        "contract",
        "permit",
        "inspection",
        "other"
      ]
    },
    "file_url": {
      "type": "string"
    },
    "file_type": {
      "type": "string"
    },
    "file_size": {
      "type": "number"
    },
    "entity_type": {
      "type": "string",
      "enum": [
        "truck",
        "driver",
        "aviation_asset",
        "insurance_provider",
        "fleet",
        "load",
        "none"
      ]
    },
    "entity_id": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "expiry_date": {
      "type": "string",
      "format": "date"
    },
    "version": {
      "type": "number",
      "default": 1
    },
    "previous_version_id": {
      "type": "string"
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  },
  "required": [
    "document_id",
    "title",
    "category",
    "file_url"
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
    }
  }
}
{
  "name": "Document",
  "type": "object",
  "properties": {
    "document_id": {
      "type": "string"
    },
    "title": {
      "type": "string"
    },
    "category": {
      "type": "string",
      "enum": [
        "registration",
        "insurance",
        "license",
        "certification",
        "maintenance_record",
        "invoice",
        "contract",
        "permit",
        "inspection",
        "other"
      ]
    },
    "file_url": {
      "type": "string"
    },
    "file_type": {
      "type": "string"
    },
    "file_size": {
      "type": "number"
    },
    "entity_type": {
      "type": "string",
      "enum": [
        "truck",
        "driver",
        "aviation_asset",
        "insurance_provider",
        "fleet",
        "load",
        "none"
      ]
    },
    "entity_id": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "expiry_date": {
      "type": "string",
      "format": "date"
    },
    "version": {
      "type": "number",
      "default": 1
    },
    "previous_version_id": {
      "type": "string"
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  },
  "required": [
    "document_id",
    "title",
    "category",
    "file_url"
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
    }
  }
}
