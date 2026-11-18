Original name: Message.docx
Drive ID: 1Xi-6pD8WLFsyNrOzicg1bFqVUEN2lwsJ
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Entities/
Modified: 2025-12-22T04:17:57.000Z

{
  "name": "Message",
  "type": "object",
  "properties": {
    "message_id": {
      "type": "string"
    },
    "conversation_id": {
      "type": "string",
      "description": "Groups messages by thread"
    },
    "from_email": {
      "type": "string"
    },
    "from_name": {
      "type": "string"
    },
    "to_email": {
      "type": "string"
    },
    "to_name": {
      "type": "string"
    },
    "message_type": {
      "type": "string",
      "enum": [
        "text",
        "alert",
        "emergency",
        "system"
      ],
      "default": "text"
    },
    "priority": {
      "type": "string",
      "enum": [
        "normal",
        "high",
        "critical"
      ],
      "default": "normal"
    },
    "content": {
      "type": "string"
    },
    "read": {
      "type": "boolean",
      "default": false
    },
    "read_at": {
      "type": "string",
      "format": "date-time"
    },
    "asset_id": {
      "type": "string",
      "description": "Associated truck, aircraft, or asset"
    },
    "incident_id": {
      "type": "string",
      "description": "Associated emergency incident"
    },
    "location": {
      "type": "object",
      "properties": {
        "lat": {
          "type": "number"
        },
        "lng": {
          "type": "number"
        }
      }
    }
  },
  "required": [
    "message_id",
    "from_email",
    "to_email",
    "content"
  ],
  "rls": {
    "create": {
      "$or": [
        {
          "from_email": "{{user.email}}"
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
          "from_email": "{{user.email}}"
        },
        {
          "to_email": "{{user.email}}"
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
          "to_email": "{{user.email}}"
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
          "from_email": "{{user.email}}"
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
