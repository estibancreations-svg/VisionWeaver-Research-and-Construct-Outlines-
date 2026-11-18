Original name: TrainingAssignment.docx
Drive ID: 1f8fdTj1tKsbai4yXS_vRlq6_nO3iRQQn
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Entities/
Modified: 2025-12-22T04:26:37.000Z

{
  "name": "TrainingAssignment",
  "type": "object",
  "properties": {
    "user_email": {
      "type": "string"
    },
    "module_id": {
      "type": "string"
    },
    "module_name": {
      "type": "string"
    },
    "assigned_by": {
      "type": "string"
    },
    "assigned_date": {
      "type": "string",
      "format": "date-time"
    },
    "due_date": {
      "type": "string",
      "format": "date"
    },
    "priority": {
      "type": "string",
      "enum": [
        "low",
        "medium",
        "high",
        "critical"
      ],
      "default": "medium"
    },
    "status": {
      "type": "string",
      "enum": [
        "assigned",
        "in_progress",
        "completed",
        "overdue"
      ],
      "default": "assigned"
    },
    "completion_date": {
      "type": "string",
      "format": "date-time"
    },
    "score": {
      "type": "number"
    },
    "passing_score": {
      "type": "number",
      "default": 85
    },
    "certificate_issued": {
      "type": "boolean",
      "default": false
    },
    "certificate_id": {
      "type": "string"
    }
  },
  "required": [
    "user_email",
    "module_id"
  ],
  "rls": {
    "create": {
      "$or": [
        {
          "user_condition": {
            "role": "admin"
          }
        },
        {
          "assigned_by": "{{user.email}}"
        }
      ]
    },
    "read": {
      "$or": [
        {
          "user_email": "{{user.email}}"
        },
        {
          "assigned_by": "{{user.email}}"
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
          "user_condition": {
            "role": "admin"
          }
        },
        {
          "assigned_by": "{{user.email}}"
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
