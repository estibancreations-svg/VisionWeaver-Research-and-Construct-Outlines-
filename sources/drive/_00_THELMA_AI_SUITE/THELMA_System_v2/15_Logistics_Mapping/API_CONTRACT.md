Original name: API_CONTRACT.md
Drive ID: 1GtMTpM1KkbXKUMkvfmkH_8vDacC_2sk_
Parent folder: _00_THELMA_AI_SUITE/THELMA_System_v2/15_Logistics_Mapping/
Modified: 2025-12-18T21:24:42.000Z

# Logistics Mapping — API Contract (v0)

POST /api/routes/plan

Request:
- origin, destination
- vehicle profile (class, dimensions, weight, hazmat)
- preferences

Response:
- status: OK | NO_COMPLIANT_ROUTE
- routes[] with compliance notes + partner stop suggestions
- audit: provider + scoring_version
