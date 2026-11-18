Original name: ROUTE_POLICY_ENGINE.md
Drive ID: 17TC7poe1jpenwCrGfu0OTfGoGNxW8MDa
Parent folder: _00_THELMA_AI_SUITE/THELMA_System_v2/15_Logistics_Mapping/
Modified: 2025-12-18T21:24:42.000Z

# Route Policy Engine — Decision Logic (High Level)

1) Get candidate routes from Provider Adapter.
2) Reject routes with hard constraint violations (height/weight/hazmat prohibitions).
3) Score remaining routes for fuel optimization and policy preferences.
4) Enrich with partner stops along corridor.
5) If none compliant: return NO_COMPLIANT_ROUTE + reasons + human override path.
