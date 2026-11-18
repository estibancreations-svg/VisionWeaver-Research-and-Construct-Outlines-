Original name: Route.docx
Drive ID: 1m4LSg1dumzniiSMXuo1WkuLkkbvgIDNw
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Entities/
Modified: 2025-12-22T04:14:16.000Z

{
  "name": "Route",
  "type": "object",
  "properties": {
    "route_id": {
      "type": "string",
      "description": "Unique route identifier"
    },
    "load_id": {
      "type": "string",
      "description": "Associated load"
    },
    "driver_email": {
      "type": "string"
    },
    "truck_id": {
      "type": "string"
    },
    "status": {
      "type": "string",
      "enum": [
        "draft",
        "optimized",
        "approved",
        "in_progress",
        "completed"
      ],
      "default": "draft"
    },
    "origin": {
      "type": "object",
      "properties": {
        "address": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "zip": {
          "type": "string"
        },
        "lat": {
          "type": "number"
        },
        "lng": {
          "type": "number"
        }
      }
    },
    "destination": {
      "type": "object",
      "properties": {
        "address": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "zip": {
          "type": "string"
        },
        "lat": {
          "type": "number"
        },
        "lng": {
          "type": "number"
        }
      }
    },
    "truck_constraints": {
      "type": "object",
      "properties": {
        "weight_lbs": {
          "type": "number"
        },
        "height_inches": {
          "type": "number"
        },
        "length_feet": {
          "type": "number"
        },
        "hazmat": {
          "type": "boolean"
        },
        "hazmat_class": {
          "type": "string"
        }
      }
    },
    "total_distance_miles": {
      "type": "number"
    },
    "estimated_duration_hours": {
      "type": "number"
    },
    "estimated_fuel_gallons": {
      "type": "number"
    },
    "estimated_fuel_cost": {
      "type": "number"
    },
    "waypoints": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "address": {
            "type": "string"
          },
          "lat": {
            "type": "number"
          },
          "lng": {
            "type": "number"
          },
          "estimated_arrival": {
            "type": "string"
          },
          "stop_duration_minutes": {
            "type": "number"
          },
          "notes": {
            "type": "string"
          }
        }
      }
    },
    "restrictions_avoided": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "List of restrictions avoided (low bridges, weight limits, etc.)"
    },
    "weather_alerts": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string"
          },
          "severity": {
            "type": "string"
          },
          "location": {
            "type": "string"
          },
          "message": {
            "type": "string"
          }
        }
      }
    },
    "traffic_conditions": {
      "type": "string",
      "enum": [
        "light",
        "moderate",
        "heavy",
        "severe"
      ]
    },
    "optimization_score": {
      "type": "number",
      "description": "AI optimization score 0-100"
    },
    "alternative_routes": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "distance_miles": {
            "type": "number"
          },
          "duration_hours": {
            "type": "number"
          },
          "fuel_cost": {
            "type": "number"
          },
          "reason": {
            "type": "string"
          }
        }
      }
    }
  },
  "required": [
    "route_id",
    "origin",
    "destination"
  ],
  "rls": {
    "create": {
      "$or": [
        {
          "driver_email": "{{user.email}}"
        },
        {
          "user_condition": {
            "email": "admin"
          }
        }
      ]
    },
    "read": {
      "$or": [
        {
          "driver_email": "{{user.email}}"
        },
        {
          "created_by": "{{user.email}}"
        },
        {
          "user_condition": {
            "email": "admin"
          }
        }
      ]
    },
    "update": {
      "$or": [
        {
          "driver_email": "{{user.email}}"
        },
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
