Original name: AIRouteOptimizer.docx
Drive ID: 12pUCkhyp8ZbZzQTz8Ma5QRQIayRBWX7W
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Components/routing/
Modified: 2025-12-22T03:46:27.000Z

import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Loader2, TrendingUp, AlertTriangle, Fuel, Clock } from "lucide-react";

export default function AIRouteOptimizer({ origin, destination, truck, onRoutesGenerated }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [routes, setRoutes] = useState(null);

  const optimizeRoute = async () => {
    setAnalyzing(true);
    setProgress(20);

    const prompt = `Analyze and optimize trucking route with AI:

Origin: ${origin.address}, ${origin.city}, ${origin.state}
Destination: ${destination.address}, ${destination.city}, ${destination.state}

Truck Details:
- Type: ${truck.type}
- Weight: ${truck.max_weight_lbs} lbs
- Height: ${truck.height_inches} inches
- Fuel Type: ${truck.fuel_type}
- MPG: ${truck.mpg_average}
- VIN: ${truck.vin}
${truck.hazmat_certified ? '- Hazmat Certified' : ''}
${truck.maintenance_score ? `- Maintenance Score: ${truck.maintenance_score}/100` : ''}

Consider:
1. Real-time traffic patterns (simulate based on typical conditions)
2. Weather conditions along route
3. Fuel costs (current diesel ~$3.80/gal)
4. Truck restrictions (weight limits, height clearances, hazmat routes)
5. Maintenance risk (predict potential issues based on maintenance score)
6. Optimal stops (fuel, rest, maintenance)

Provide 3 route options:
1. Fastest route
2. Most fuel-efficient route
3. Safest route (considering maintenance)

For each route include:
- Estimated duration (hours)
- Distance (miles)
- Fuel consumption (gallons)
- Fuel cost ($)
- Maintenance risk score (0-100, lower is better)
- Key waypoints/stops
- Traffic/weather alerts
- Restrictions avoided`;

    setProgress(50);

    const analysis = await base44.integrations.Core.InvokeLLM({
      prompt,
      add_context_from_internet: true,
      response_json_schema: {
        type: "object",
        properties: {
          routes: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                duration_hours: { type: "number" },
                distance_miles: { type: "number" },
                fuel_gallons: { type: "number" },
                fuel_cost: { type: "number" },
                maintenance_risk: { type: "number" },
                recommended: { type: "boolean" },
                waypoints: { type: "array", items: { type: "string" } },
                alerts: { type: "array", items: { type: "string" } },
                restrictions_avoided: { type: "array", items: { type: "string" } }
              }
            }
          },
          overall_recommendation: { type: "string" }
        }
      }
    });

    setProgress(100);
    setRoutes(analysis);
    setAnalyzing(false);
    onRoutesGenerated?.(analysis);
  };

  if (analyzing) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <Loader2 className="w-16 h-16 mx-auto animate-spin text-blue-500" />
            <div>
              <p className="font-semibold text-lg mb-2">AI Optimizing Route</p>
              <p className="text-sm text-gray-500 mb-4">Analyzing traffic, weather, fuel costs, and maintenance risks...</p>
              <Progress value={progress} className="w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (routes) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            AI-Optimized Routes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium text-blue-900">Recommendation:</p>
            <p className="text-sm text-blue-700">{routes.overall_recommendation}</p>
          </div>

          <div className="space-y-3">
            {routes.routes.map((route, i) => (
              <Card key={i} className={route.recommended ? 'border-2 border-green-500' : ''}>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold">{route.name}</p>
                      {route.recommended && (
                        <Badge className="bg-green-500 mt-1">Recommended</Badge>
                      )}
                    </div>
                    <Badge variant={route.maintenance_risk < 30 ? 'default' : route.maintenance_risk < 60 ? 'secondary' : 'destructive'}>
                      Risk: {route.maintenance_risk}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <Clock className="w-4 h-4 mx-auto mb-1 text-gray-600" />
                      <p className="text-sm font-semibold">{route.duration_hours}h</p>
                      <p className="text-xs text-gray-500">Duration</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <TrendingUp className="w-4 h-4 mx-auto mb-1 text-gray-600" />
                      <p className="text-sm font-semibold">{route.distance_miles} mi</p>
                      <p className="text-xs text-gray-500">Distance</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <Fuel className="w-4 h-4 mx-auto mb-1 text-gray-600" />
                      <p className="text-sm font-semibold">{route.fuel_gallons} gal</p>
                      <p className="text-xs text-gray-500">Fuel</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <p className="text-sm font-semibold">${route.fuel_cost}</p>
                      <p className="text-xs text-gray-500">Fuel Cost</p>
                    </div>
                  </div>

                  {route.alerts?.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-medium mb-1">Alerts:</p>
                      {route.alerts.map((alert, j) => (
                        <div key={j} className="flex items-start gap-1 text-xs text-orange-600 mb-1">
                          <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
                          {alert}
                        </div>
                      ))}
                    </div>
                  )}

                  {route.waypoints?.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-medium mb-1">Key Stops:</p>
                      <div className="flex flex-wrap gap-1">
                        {route.waypoints.slice(0, 4).map((wp, j) => (
                          <Badge key={j} variant="outline" className="text-xs">{wp}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button size="sm" className="w-full" variant={route.recommended ? 'default' : 'outline'}>
                    Select This Route
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button variant="outline" className="w-full" onClick={() => setRoutes(null)}>
            Generate New Analysis
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <Sparkles className="w-16 h-16 mx-auto text-blue-500" />
          <div>
            <p className="font-semibold text-lg mb-2">AI Route Optimization</p>
            <p className="text-sm text-gray-500 mb-4">
              Get intelligent route suggestions based on traffic, weather, fuel costs, and maintenance risks
            </p>
            <Button onClick={optimizeRoute} className="bg-blue-600 hover:bg-blue-700">
              <Sparkles className="w-4 h-4 mr-2" />
              Optimize with AI
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
