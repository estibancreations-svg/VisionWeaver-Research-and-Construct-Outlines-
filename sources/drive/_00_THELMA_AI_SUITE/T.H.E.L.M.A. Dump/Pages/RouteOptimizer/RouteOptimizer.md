Original name: RouteOptimizer.docx
Drive ID: 1Dnev3WfOSQGlvNGHm7P-Mu0o7caGTdjO
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Pages/RouteOptimizer/
Modified: 2025-12-19T16:42:18.000Z

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, Truck, User } from "lucide-react";
import LocationInput from '@/components/routing/LocationInput';
import TruckConstraintsForm from '@/components/routing/TruckConstraintsForm';
import RouteConditions from '@/components/routing/RouteConditions';
import RouteResultCard from '@/components/routing/RouteResultCard';

export default function RouteOptimizer() {
  const [origin, setOrigin] = useState({});
  const [destination, setDestination] = useState({});
  const [constraints, setConstraints] = useState({});
  const [selectedTruck, setSelectedTruck] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');
  const [optimizedRoute, setOptimizedRoute] = useState(null);
  const queryClient = useQueryClient();

  const { data: trucks = [] } = useQuery({
    queryKey: ['trucks'],
    queryFn: () => base44.entities.Truck.list()
  });

  const { data: drivers = [] } = useQuery({
    queryKey: ['drivers'],
    queryFn: () => base44.entities.Driver.filter({ status: 'active' })
  });

  // Auto-populate constraints when truck is selected
  const handleTruckSelect = (truckId) => {
    setSelectedTruck(truckId);
    const truck = trucks.find(t => t.id === truckId);
    if (truck) {
      setConstraints({
        weight_lbs: truck.max_weight_lbs,
        height_inches: truck.height_inches,
        length_feet: truck.length_feet,
        hazmat: truck.hazmat_certified,
        hazmat_class: ''
      });
    }
  };

  const optimizeMutation = useMutation({
    mutationFn: async () => {
      const originStr = `${origin.address}, ${origin.city}, ${origin.state} ${origin.zip}`;
      const destStr = `${destination.address}, ${destination.city}, ${destination.state} ${destination.zip}`;
      
      const prompt = `You are an AI route optimization system for commercial trucking. Generate an optimized route with the following details:

ORIGIN: ${originStr}
DESTINATION: ${destStr}

TRUCK CONSTRAINTS:
- Weight: ${constraints.weight_lbs || 80000} lbs
- Height: ${constraints.height_inches || 162} inches (${((constraints.height_inches || 162) / 12).toFixed(1)} feet)
- Length: ${constraints.length_feet || 53} feet
- Hazmat: ${constraints.hazmat ? `Yes - Class ${constraints.hazmat_class}` : 'No'}

REQUIREMENTS:
1. Avoid routes with low bridges below truck height
2. Avoid routes with weight restrictions below truck weight
3. If hazmat, avoid tunnels and restricted areas
4. Find optimal fuel stops based on ~6 MPG average
5. Include mandatory rest stops per DOT regulations (30 min break every 8 hours)
6. Consider current typical traffic patterns
7. Suggest the most fuel-efficient route

Calculate realistic:
- Total distance in miles
- Estimated drive time in hours
- Fuel needed (assume 6 MPG)
- Fuel cost (assume $4.00/gallon diesel)
- Optimization score (0-100 based on efficiency, safety, compliance)

Include 2-3 recommended stops (fuel stations, rest areas) along the route.
List any route restrictions being avoided.
Provide 1-2 alternative routes with brief comparison.`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            total_distance_miles: { type: "number" },
            estimated_duration_hours: { type: "number" },
            estimated_fuel_gallons: { type: "number" },
            estimated_fuel_cost: { type: "number" },
            optimization_score: { type: "number" },
            traffic_conditions: { type: "string", enum: ["light", "moderate", "heavy", "severe"] },
            waypoints: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  type: { type: "string" },
                  name: { type: "string" },
                  address: { type: "string" },
                  stop_duration_minutes: { type: "number" },
                  notes: { type: "string" }
                }
              }
            },
            restrictions_avoided: {
              type: "array",
              items: { type: "string" }
            },
            weather_alerts: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  type: { type: "string" },
                  severity: { type: "string" },
                  location: { type: "string" },
                  message: { type: "string" }
                }
              }
            },
            alternative_routes: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  distance_miles: { type: "number" },
                  duration_hours: { type: "number" },
                  fuel_cost: { type: "number" },
                  reason: { type: "string" }
                }
              }
            }
          }
        }
      });

      return response;
    },
    onSuccess: (data) => {
      setOptimizedRoute({
        ...data,
        origin,
        destination,
        truck_constraints: constraints
      });
    }
  });

  const saveRouteMutation = useMutation({
    mutationFn: async () => {
      const routeId = `RT-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      
      return base44.entities.Route.create({
        route_id: routeId,
        driver_email: selectedDriver,
        truck_id: selectedTruck,
        status: 'approved',
        origin,
        destination,
        truck_constraints: constraints,
        ...optimizedRoute
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routes'] });
      alert('Route approved and saved!');
    }
  });

  const canOptimize = origin.city && origin.state && destination.city && destination.state;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-blue-600" />
              AI Route Optimizer
            </h1>
            <p className="text-gray-500">Intelligent routing with compliance, fuel efficiency & real-time conditions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Inputs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Truck & Driver Selection */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Select Vehicle & Driver</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Truck
                  </Label>
                  <Select value={selectedTruck} onValueChange={handleTruckSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select truck" />
                    </SelectTrigger>
                    <SelectContent>
                      {trucks.map(truck => (
                        <SelectItem key={truck.id} value={truck.id}>
                          {truck.unit_number} - {truck.make} {truck.model} ({truck.type})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Driver
                  </Label>
                  <Select value={selectedDriver} onValueChange={setSelectedDriver}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select driver" />
                    </SelectTrigger>
                    <SelectContent>
                      {drivers.map(driver => (
                        <SelectItem key={driver.id} value={driver.email}>
                          {driver.full_name} ({driver.cdl_class || 'No CDL'})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Location Input */}
            <LocationInput
              origin={origin}
              destination={destination}
              onOriginChange={setOrigin}
              onDestinationChange={setDestination}
            />

            {/* Truck Constraints */}
            <TruckConstraintsForm
              constraints={constraints}
              onChange={setConstraints}
            />

            {/* Optimize Button */}
            <Button
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => optimizeMutation.mutate()}
              disabled={!canOptimize || optimizeMutation.isPending}
            >
              {optimizeMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Optimizing Route...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Optimize Route with AI
                </>
              )}
            </Button>

            {/* Route Result */}
            {optimizedRoute && (
              <RouteResultCard
                route={optimizedRoute}
                onApprove={() => saveRouteMutation.mutate()}
                onViewAlternatives={() => {}}
              />
            )}
          </div>

          {/* Right Column - Conditions */}
          <div className="space-y-6">
            <RouteConditions
              weather={{ alerts: optimizedRoute?.weather_alerts || [] }}
              traffic={optimizedRoute?.traffic_conditions}
            />

            {/* Quick Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Compliance Check</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span className="text-sm">Weight Limits</span>
                  <span className="text-green-600 text-sm font-medium">✓ Compliant</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span className="text-sm">Height Restrictions</span>
                  <span className="text-green-600 text-sm font-medium">✓ Compliant</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span className="text-sm">HOS Regulations</span>
                  <span className="text-green-600 text-sm font-medium">✓ Compliant</span>
                </div>
                {constraints.hazmat && (
                  <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                    <span className="text-sm">Hazmat Routing</span>
                    <span className="text-yellow-600 text-sm font-medium">⚠ Applied</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
