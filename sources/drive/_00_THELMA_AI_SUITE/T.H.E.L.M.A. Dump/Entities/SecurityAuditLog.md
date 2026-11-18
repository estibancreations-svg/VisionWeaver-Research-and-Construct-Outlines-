Original name: SecurityAuditLog.docx
Drive ID: 1FyCCOvyAZWheMJ0E2n1eVDjSP6Jv-s-r
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Entities/
Modified: 2025-12-22T04:28:45.000Z

{
  "name": "SecurityAuditLog",
  "type": "object",
  "properties": {
    "user_email": {
      "type": "string"
    },
    "event_type": {
      "type": "string",
      "enum": [
        "login_success",
        "login_failed",
        "logout",
        "access_denied",
        "permission_change",
        "api_key_generated",
        "api_key_revoked",
        "data_access",
        "data_modification",
        "system_change",
        "security_alert"
      ]
    },
    "event_description": {
      "type": "string"
    },
    "severity": {
      "type": "string",
      "enum": [
        "low",
        "medium",
        "high",
        "critical"
      ],
      "default": "low"
    },
    "ip_address": {
      "type": "string"
    },
    "user_agent": {
      "type": "string"
    },
    "resource_accessed": {
      "type": "string"
    },
    "action_taken": {
      "type": "string"
    },
    "success": {
      "type": "boolean",
      "default": true
    },
    "additional_data": {
      "type": "object"
    }
  },
  "required": [
    "user_email",
    "event_type",
    "event_description"
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
      "user_condition": {
        "role": {
          "$in": [
            "architect",
            "cto",
            "ciso",
            "admin"
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
        "role": "architect"
      }
    }
  }
}
