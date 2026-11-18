Original name: AirspaceCompliance.docx
Drive ID: 11pXNoQtKZa0DSfil5SUa4bFBU80N-pSQ
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Components/aviation/
Modified: 2025-12-19T16:51:23.000Z

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle, Shield, FileText } from "lucide-react";

export default function AirspaceCompliance({ complianceData, asset }) {
  const defaultCompliance = {
    airspace_clear: true,
    tfr_active: false,
    airport_proximity: null,
    weather_suitable: true,
    pilot_certified: asset?.faa_compliance?.part_107_certified ?? false,
    aircraft_airworthy: asset?.faa_compliance?.airworthiness_cert ?? false,
    restrictions: [],
    warnings: []
  };

  const compliance = complianceData || defaultCompliance;

  const checks = [
    { 
      label: 'Airspace Clear', 
      passed: compliance.airspace_clear, 
      description: 'No restricted airspace in flight path'
    },
    { 
      label: 'No Active TFRs', 
      passed: !compliance.tfr_active, 
      description: 'Temporary Flight Restrictions'
    },
    { 
      label: 'Weather Suitable', 
      passed: compliance.weather_suitable, 
      description: 'VFR conditions met'
    },
    { 
      label: 'Part 107 Certified', 
      passed: compliance.pilot_certified, 
      description: 'Pilot certification valid'
    },
    { 
      label: 'Aircraft Airworthy', 
      passed: compliance.aircraft_airworthy, 
      description: 'Airworthiness certificate current'
    }
  ];

  const allPassed = checks.every(c => c.passed);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            FAA Compliance Check
          </span>
          <Badge className={allPassed ? 'bg-green-500' : 'bg-red-500'}>
            {allPassed ? 'CLEARED' : 'REVIEW REQUIRED'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {checks.map((check, i) => (
          <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              {check.passed ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              <div>
                <p className="font-medium text-sm">{check.label}</p>
                <p className="text-xs text-gray-500">{check.description}</p>
              </div>
            </div>
            <Badge variant="outline" className={check.passed ? 'text-green-600' : 'text-red-600'}>
              {check.passed ? 'Pass' : 'Fail'}
            </Badge>
          </div>
        ))}

        {/* Airport Proximity Warning */}
        {compliance.airport_proximity && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0" />
              <div>
                <p className="font-medium text-yellow-800">Airport Proximity Alert</p>
                <p className="text-sm text-yellow-700">
                  Within {compliance.airport_proximity.distance_miles} miles of {compliance.airport_proximity.name}. 
                  LAANC authorization may be required.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Restrictions */}
        {compliance.restrictions?.length > 0 && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="font-medium text-red-800 mb-2">Active Restrictions:</p>
            <ul className="text-sm text-red-700 space-y-1">
              {compliance.restrictions.map((r, i) => (
                <li key={i} className="flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Regulations Reference */}
        <div className="pt-2 border-t">
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <FileText className="w-3 h-3" />
            Per 14 CFR Part 107 - Small Unmanned Aircraft Systems
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
