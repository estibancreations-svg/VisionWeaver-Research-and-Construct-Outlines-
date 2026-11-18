Original name: TrainingProgress.docx
Drive ID: 1BXnaNnascxG5OIGMo1fOI5eSmstamN8y
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Entities/
Modified: 2025-12-22T04:25:27.000Z

{
  "name": "TrainingProgress",
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
    "status": {
      "type": "string",
      "enum": [
        "not_started",
        "in_progress",
        "completed"
      ],
      "default": "not_started"
    },
    "completion_percentage": {
      "type": "number",
      "default": 0
    },
    "video_watched": {
      "type": "boolean",
      "default": false
    },
    "hands_on_completed": {
      "type": "boolean",
      "default": false
    },
    "items_created": {
      "type": "number",
      "default": 0
    },
    "items_required": {
      "type": "number",
      "default": 15
    },
    "scenarios_completed": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "default": []
    },
    "quiz_score": {
      "type": "number"
    },
    "quiz_attempts": {
      "type": "number",
      "default": 0
    },
    "real_world_score": {
      "type": "number",
      "description": "Score on real-world application assessment"
    },
    "completed_at": {
      "type": "string",
      "format": "date-time"
    },
    "time_spent_minutes": {
      "type": "number",
      "default": 0
    },
    "ai_assist_used": {
      "type": "boolean",
      "default": false
    },
    "certification_earned": {
      "type": "boolean",
      "default": false
    }
  },
  "required": [
    "user_email",
    "module_id"
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
      "user_condition": {
        "role": "admin"
      }
    }
  }
}
