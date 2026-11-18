Original name: FirstAidProtocol.docx
Drive ID: 1tF9YNui4FC083HNvskY9Nvj2cRxkBKfS
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Entities/
Modified: 2025-12-22T04:17:28.000Z

{
  "name": "FirstAidProtocol",
  "type": "object",
  "properties": {
    "protocol_id": {
      "type": "string"
    },
    "title": {
      "type": "string"
    },
    "category": {
      "type": "string",
      "enum": [
        "cardiac",
        "trauma",
        "burns",
        "poisoning",
        "breathing",
        "bleeding",
        "fractures",
        "shock",
        "environmental",
        "general"
      ]
    },
    "severity_level": {
      "type": "string",
      "enum": [
        "life_threatening",
        "serious",
        "moderate",
        "minor"
      ]
    },
    "symptoms": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "immediate_actions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "step": {
            "type": "number"
          },
          "instruction": {
            "type": "string"
          },
          "warning": {
            "type": "string"
          }
        }
      }
    },
    "call_911_immediately": {
      "type": "boolean",
      "default": false
    },
    "supplies_needed": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "do_not_do": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "video_url": {
      "type": "string"
    },
    "last_updated": {
      "type": "string",
      "format": "date"
    }
  },
  "required": [
    "protocol_id",
    "title",
    "category"
  ]
}
