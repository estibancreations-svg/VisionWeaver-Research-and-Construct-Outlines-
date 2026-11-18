Original name: UserRole.docx
Drive ID: 16ccxFSQC4UeKArFhDk5w__1VPff8lhsU
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Entities/
Modified: 2025-12-22T04:26:02.000Z

{
  "name": "UserRole",
  "type": "object",
  "properties": {
    "user_email": {
      "type": "string"
    },
    "role": {
      "type": "string",
      "enum": [
        "architect",
        "ceo",
        "coo",
        "cfo",
        "cto",
        "ciso",
        "cmo",
        "admin",
        "vp_operations",
        "vp_sales",
        "vp_hr",
        "dispatcher",
        "fleet_manager",
        "mechanic",
        "driver",
        "pilot",
        "ems_dispatcher",
        "insurance_adjuster",
        "customer_service",
        "trainee",
        "hr_manager",
        "billing_admin",
        "it_admin",
        "security_analyst",
        "data_analyst",
        "account_manager"
      ]
    },
    "security_clearance": {
      "type": "string",
      "enum": [
        "level_0",
        "level_1",
        "level_2",
        "level_3",
        "level_4",
        "level_5"
      ],
      "description": "Level 5: Architect, Level 4: C-Suite, Level 3: Admin, Level 2: Manager, Level 1: Ops, Level 0: Trainee"
    },
    "department": {
      "type": "string",
      "enum": [
        "executive",
        "operations",
        "fleet_management",
        "aviation",
        "emergency_services",
        "it",
        "human_resources",
        "finance",
        "sales",
        "marketing",
        "customer_service",
        "insurance"
      ]
    },
    "permissions": {
      "type": "object",
      "properties": {
        "can_access_main_hub": {
          "type": "boolean",
          "default": true
        },
        "can_access_fleet": {
          "type": "boolean",
          "default": false
        },
        "can_access_aviation": {
          "type": "boolean",
          "default": false
        },
        "can_access_emergency": {
          "type": "boolean",
          "default": false
        },
        "can_access_insurance": {
          "type": "boolean",
          "default": false
        },
        "can_access_billing": {
          "type": "boolean",
          "default": false
        },
        "can_access_hr": {
          "type": "boolean",
          "default": false
        },
        "can_access_agents": {
          "type": "boolean",
          "default": false
        },
        "can_access_analytics": {
          "type": "boolean",
          "default": false
        },
        "can_access_it_control": {
          "type": "boolean",
          "default": false
        },
        "can_create_users": {
          "type": "boolean",
          "default": false
        },
        "can_edit_users": {
          "type": "boolean",
          "default": false
        },
        "can_delete_users": {
          "type": "boolean",
          "default": false
        },
        "can_assign_training": {
          "type": "boolean",
          "default": false
        },
        "can_view_reports": {
          "type": "boolean",
          "default": false
        },
        "can_create_reports": {
          "type": "boolean",
          "default": false
        },
        "can_manage_api_keys": {
          "type": "boolean",
          "default": false
        },
        "can_control_henri_ai": {
          "type": "boolean",
          "default": false
        },
        "can_modify_system": {
          "type": "boolean",
          "default": false
        }
      }
    },
    "assigned_training_modules": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "default": []
    },
    "status": {
      "type": "string",
      "enum": [
        "active",
        "inactive",
        "suspended"
      ],
      "default": "active"
    },
    "authentication_method": {
      "type": "string",
      "enum": [
        "google",
        "apple",
        "microsoft",
        "email"
      ],
      "description": "Primary authentication provider"
    },
    "mfa_enabled": {
      "type": "boolean",
      "default": false
    },
    "last_login": {
      "type": "string",
      "format": "date-time"
    }
  },
  "required": [
    "user_email",
    "role"
  ],
  "rls": {
    "create": {
      "user_condition": {
        "role": {
          "$in": [
            "architect",
            "ceo",
            "coo",
            "cto",
            "admin"
          ]
        }
      }
    },
    "read": {
      "$or": [
        {
          "user_email": "{{user.email}}"
        },
        {
          "user_condition": {
            "role": {
              "$in": [
                "architect",
                "ceo",
                "coo",
                "cto",
                "ciso",
                "admin",
                "hr_manager"
              ]
            }
          }
        }
      ]
    },
    "update": {
      "user_condition": {
        "role": {
          "$in": [
            "architect",
            "ceo",
            "coo",
            "cto",
            "admin"
          ]
        }
      }
    },
    "delete": {
      "user_condition": {
        "role": {
          "$in": [
            "architect",
            "ceo"
          ]
        }
      }
    }
  }
}
