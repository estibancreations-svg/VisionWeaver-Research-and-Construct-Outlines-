Original name: FleetDashboard.docx
Drive ID: 1dGr7KgD_4MUG11m_q6s3VR2t0pyfJgk4
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Pages/FleetDashboard/
Modified: 2025-12-19T16:36:21.000Z

import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Truck, Users, MapPin, DollarSign, TrendingUp, Wrench } from "lucide-react";
import PredictiveMaintenance from '@/components/fleet/PredictiveMaintenance';
import LiveMapView from '@/components/shared/LiveMapView';
import AlertPanel from '@/components/alerts/AlertPanel';

export default function FleetDashboard() {
  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me()
  });

  const { data: fleet } = useQuery({
    queryKey: ['myFleet', user?.email],
    queryFn: async () => {
      const fleets = await base44.entities.Fleet.filter({ owner_email: user?.email });
      return fleets[0];
    },
    enabled: !!user
  });

  const { data: trucks = [] } = useQuery({
    queryKey: ['fleetTrucks', fleet?.id],
    queryFn: () => base44.entities.Truck.filter({ fleet_id: fleet?.id }),
    enabled: !!fleet
  });

  const { data: drivers = [] } = useQuery({
    queryKey: ['fleetDrivers', fleet?.id],
    queryFn: () => base44.entities.Driver.filter({ fleet_id: fleet?.id }),
    enabled: !!fleet
  });

  const { data: loads = [] } = useQuery({
    queryKey: ['fleetLoads'],
    queryFn: () => base44.entities.Load.list('-created_date', 50),
    enabled: !!fleet
  });

  const stats = {
    totalTrucks: trucks.length,
    activeTrucks: trucks.filter(t => t.status === 'active').length,
    totalDrivers: drivers.length,
    activeDrivers: drivers.filter(d => d.status === 'active').length,
    activeLoads: loads.filter(l => ['assigned', 'in_transit'].includes(l.status)).length,
    completedLoads: loads.filter(l => l.status === 'completed').length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <Truck className="w-6 h-6 md:w-8 md:h-8" />
            Fleet Dashboard
          </h1>
          <p className="text-gray-600 text-sm md:text-base">{fleet?.fleet_name || 'Loading...'}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Card>
            <CardContent className="pt-4 md:pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Active Trucks</p>
                  <p className="text-2xl md:text-3xl font-bold">{stats.activeTrucks}</p>
                  <p className="text-xs text-gray-400">of {stats.totalTrucks}</p>
                </div>
                <Truck className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 md:pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Active Drivers</p>
                  <p className="text-2xl md:text-3xl font-bold">{stats.activeDrivers}</p>
                  <p className="text-xs text-gray-400">of {stats.totalDrivers}</p>
                </div>
                <Users className="w-8 h-8 md:w-10 md:h-10 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 md:pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Active Loads</p>
                  <p className="text-2xl md:text-3xl font-bold">{stats.activeLoads}</p>
                  <p className="text-xs text-gray-400">in progress</p>
                </div>
                <MapPin className="w-8 h-8 md:w-10 md:h-10 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 md:pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Completed</p>
                  <p className="text-2xl md:text-3xl font-bold">{stats.completedLoads}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    This month
                  </p>
                </div>
                <DollarSign className="w-8 h-8 md:w-10 md:h-10 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="trucks" className="space-y-4">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="trucks" className="text-xs md:text-sm">Trucks</TabsTrigger>
            <TabsTrigger value="drivers" className="text-xs md:text-sm">Drivers</TabsTrigger>
            <TabsTrigger value="loads" className="text-xs md:text-sm">Loads</TabsTrigger>
            <TabsTrigger value="maintenance" className="text-xs md:text-sm">
              <Wrench className="w-4 h-4 mr-1" />
              Maintenance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trucks">
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Fleet Vehicles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
                  {trucks.map(truck => (
                    <Card key={truck.id}>
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-sm md:text-base">{truck.unit_number}</p>
                            <p className="text-xs md:text-sm text-gray-500">{truck.make} {truck.model}</p>
                          </div>
                          <Badge className={truck.status === 'active' ? 'bg-green-500' : 'bg-gray-400'} className="text-xs">
                            {truck.status}
                          </Badge>
                        </div>
                        <div className="text-xs md:text-sm text-gray-600">
                          <p>Type: {truck.type}</p>
                          <p>License: {truck.license_plate}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {trucks.length === 0 && (
                  <p className="text-center text-gray-500 py-8 text-sm md:text-base">No trucks in fleet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="drivers">
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Fleet Drivers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {drivers.map(driver => (
                    <div key={driver.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm md:text-base">{driver.full_name}</p>
                        <p className="text-xs md:text-sm text-gray-500">{driver.email}</p>
                      </div>
                      <Badge className={driver.status === 'active' ? 'bg-green-500' : 'bg-gray-400'} className="text-xs">
                        {driver.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                {drivers.length === 0 && (
                  <p className="text-center text-gray-500 py-8 text-sm md:text-base">No drivers in fleet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="loads">
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Recent Loads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {loads.slice(0, 10).map(load => (
                    <div key={load.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-sm md:text-base">{load.load_number}</p>
                          <p className="text-xs md:text-sm text-gray-500">
                            {load.pickup_location?.city} → {load.delivery_location?.city}
                          </p>
                        </div>
                        <Badge className="text-xs">{load.status}</Badge>
                      </div>
                      <p className="text-sm font-semibold text-green-600">${load.total_charge}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance">
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <PredictiveMaintenance assets={trucks} assetType="truck" />
                </div>
                <AlertPanel compact />
              </div>
              <LiveMapView assets={trucks.map(t => ({ ...t, type: 'truck' }))} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
