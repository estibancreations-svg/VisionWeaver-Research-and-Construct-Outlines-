Original name: RouteConditions.docx
Drive ID: 1E6lHGYw2lDk95CWpoHkC2rmWlJrg1X8j
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Components/routing/
Modified: 2025-12-22T03:47:35.000Z

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, CloudRain, Wind, Sun, Snowflake, AlertTriangle, Car } from "lucide-react";

export default function RouteConditions({ weather, traffic }) {
  const weatherIcons = {
    clear: Sun,
    cloudy: Cloud,
    rain: CloudRain,
    snow: Snowflake,
    wind: Wind
  };

  const trafficColors = {
    light: 'bg-green-100 text-green-800',
    moderate: 'bg-yellow-100 text-yellow-800',
    heavy: 'bg-orange-100 text-orange-800',
    severe: 'bg-red-100 text-red-800'
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Current Conditions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Traffic */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-gray-600" />
            <span className="font-medium">Traffic</span>
          </div>
          <Badge className={trafficColors[traffic || 'light']}>
            {traffic || 'Light'}
          </Badge>
        </div>

        {/* Weather Alerts */}
        {weather?.alerts && weather.alerts.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Weather Alerts</p>
            {weather.alerts.map((alert, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg flex items-start gap-2 ${
                  alert.severity === 'severe' ? 'bg-red-50 border border-red-200' :
                  alert.severity === 'moderate' ? 'bg-yellow-50 border border-yellow-200' :
                  'bg-blue-50 border border-blue-200'
                }`}
              >
                <AlertTriangle className={`w-5 h-5 shrink-0 ${
                  alert.severity === 'severe' ? 'text-red-500' :
                  alert.severity === 'moderate' ? 'text-yellow-500' :
                  'text-blue-500'
                }`} />
                <div>
                  <p className="font-medium text-sm">{alert.type}</p>
                  <p className="text-sm text-gray-600">{alert.location}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {(!weather?.alerts || weather.alerts.length === 0) && (
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
            <Sun className="w-5 h-5 text-green-600" />
            <span className="text-green-800">No weather alerts on route</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
