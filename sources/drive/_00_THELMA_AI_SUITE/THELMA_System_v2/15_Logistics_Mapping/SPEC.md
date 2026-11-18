Original name: SPEC.md
Drive ID: 1iIK46DTMoUB_tM40DL9kBRgrp-Z6ZM0b
Parent folder: _00_THELMA_AI_SUITE/THELMA_System_v2/15_Logistics_Mapping/
Modified: 2025-12-18T21:24:42.000Z

# Logistics Mapping (Land Navigation Only) — Module Spec

## Goal
Smart road routing with fuel-saving and constraint-aware options for:
- Tanker
- Big rig / tractor-trailer
- Oversized loads
- Weight-limited vehicles

## Non-Goals (Current)
- Boats/maritime routing ❌
- Aircraft/aviation routing ❌

## Vehicle Profile Inputs
- class: tanker|big_rig|oversized|weight_limited
- gvw_lbs, height_in, width_in, length_in
- hazmat (bool)
- preferences: avoid_tolls, avoid_ferries, avoid_tunnels, fuel_optimized

## Constraints
- Height clearance
- Weight limits
- Width/length restrictions
- Hazmat restrictions
- Oversize corridors/permits (when enabled)

## Outputs
- Compliant primary route + alternates
- Distance/ETA/fuel estimate
- Restriction notes + permit flags
- Partner suggestions along corridor (fuel/repair/staging)

## Future Buffer
- API key slots for maritime/aviation providers (feature-flagged; UI hidden)
