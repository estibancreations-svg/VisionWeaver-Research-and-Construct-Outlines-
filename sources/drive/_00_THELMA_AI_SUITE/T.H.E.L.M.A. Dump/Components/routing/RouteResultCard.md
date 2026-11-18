Original name: RouteResultCard.docx
Drive ID: 1jIb3yWka4o8_ljOy3F_IqSUmv3k7c8S_
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Components/routing/
Modified: 2025-12-22T03:48:00.000Z

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Clock, 
  Fuel, 
  DollarSign, 
  Route as RouteIcon, 
  ShieldCheck,
  CheckCircle
} from "lucide-react";

export default function RouteResultCard({ route, onApprove, onViewAlternatives }) {
  if (!route) return null;

  const scoreColor = route.optimization_score >= 80 ? 'text-green-600' : 
                     route.optimization_score >= 60 ? 'text-yellow-600' : 'text-red-600';

  return (
    <Card className="border-2 border-blue-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <RouteIcon className="w-5 h-5 text-blue-600" />
            Optimized Route
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Score:</span>
            <span className={`text-2xl font-bold ${scoreColor}`}>
              {route.optimization_score}
            </span>
            <span className="text-sm text-gray-500">/100</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Route Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <MapPin className="w-5 h-5 mx-auto text-gray-500 mb-1" />
            <p className="text-xl font-bold">{route.total_distance_miles?.toFixed(0)}</p>
            <p className="text-xs text-gray-500">Miles</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Clock className="w-5 h-5 mx-auto text-gray-500 mb-1" />
            <p className="text-xl font-bold">{route.estimated_duration_hours?.toFixed(1)}</p>
            <p className="text-xs text-gray-500">Hours</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Fuel className="w-5 h-5 mx-auto text-gray-500 mb-1" />
            <p className="text-xl font-bold">{route.estimated_fuel_gallons?.toFixed(0)}</p>
            <p className="text-xs text-gray-500">Gallons</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <DollarSign className="w-5 h-5 mx-auto text-gray-500 mb-1" />
            <p className="text-xl font-bold">${route.estimated_fuel_cost?.toFixed(0)}</p>
            <p className="text-xs text-gray-500">Fuel Cost</p>
          </div>
        </div>

        {/* Restrictions Avoided */}
        {route.restrictions_avoided && route.restrictions_avoided.length > 0 && (
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">Restrictions Avoided</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {route.restrictions_avoided.map((restriction, index) => (
                <Badge key={index} variant="outline" className="bg-white">
                  <CheckCircle className="w-3 h-3 mr-1 text-green-600" />
                  {restriction}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Waypoints */}
        {route.waypoints && route.waypoints.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Recommended Stops</p>
            <div className="space-y-2">
              {route.waypoints.map((waypoint, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    waypoint.type === 'fuel' ? 'bg-amber-100 text-amber-700' :
                    waypoint.type === 'rest' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{waypoint.name}</p>
                    <p className="text-xs text-gray-500">{waypoint.address}</p>
                  </div>
                  <Badge variant="outline" className="capitalize">{waypoint.type}</Badge>
                  {waypoint.stop_duration_minutes && (
                    <span className="text-xs text-gray-500">{waypoint.stop_duration_minutes} min</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button onClick={onApprove} className="flex-1 bg-green-600 hover:bg-green-700">
            <CheckCircle className="w-4 h-4 mr-2" />
            Approve Route
          </Button>
          {route.alternative_routes && route.alternative_routes.length > 0 && (
            <Button variant="outline" onClick={onViewAlternatives}>
              View {route.alternative_routes.length} Alternatives
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
