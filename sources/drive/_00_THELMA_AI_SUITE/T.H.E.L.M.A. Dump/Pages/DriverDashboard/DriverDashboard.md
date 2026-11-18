Original name: DriverDashboard.docx
Drive ID: 1O0pK3ZLZRGOJNtFqGGxXJ7iNJWyS4Qc5
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Pages/DriverDashboard/
Modified: 2025-12-19T16:23:10.000Z

import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, MapPin, Clock, Phone, Navigation } from "lucide-react";

export default function DriverDashboard() {
  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me()
  });

  const { data: loads = [] } = useQuery({
    queryKey: ['myLoads', user?.email],
    queryFn: () => base44.entities.Load.filter({ driver_email: user?.email }, '-created_date'),
    enabled: !!user
  });

  const activeLoads = loads.filter(l => ['assigned', 'in_transit'].includes(l.status));
  const completedToday = loads.filter(l => l.status === 'completed' && 
    new Date(l.completed_date).toDateString() === new Date().toDateString()
  );

  const todayEarnings = completedToday.reduce((sum, load) => sum + (load.total_charge || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Driver Dashboard</h1>
          <p className="text-blue-200">Welcome back, {user?.full_name?.split(' ')[0] || 'Driver'}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-white/10 border-white/20">
            <CardContent className="pt-4 text-center">
              <p className="text-3xl font-bold text-white">{activeLoads.length}</p>
              <p className="text-xs text-blue-200">Active Loads</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20">
            <CardContent className="pt-4 text-center">
              <p className="text-3xl font-bold text-green-400">${todayEarnings.toFixed(0)}</p>
              <p className="text-xs text-blue-200">Today's Earnings</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Loads */}
        <Card className="bg-white/95">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Active Loads
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeLoads.length === 0 ? (
              <div className="text-center py-8">
                <Truck className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">No active loads</p>
                <Button className="mt-4" size="sm">Browse Available Loads</Button>
              </div>
            ) : (
              <div className="space-y-3">
                {activeLoads.map(load => (
                  <Card key={load.id}>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold">{load.load_number}</p>
                          <Badge className={load.status === 'in_transit' ? 'bg-blue-500' : 'bg-yellow-500'}>
                            {load.status}
                          </Badge>
                        </div>
                        <p className="text-lg font-bold text-green-600">${load.total_charge}</p>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Pickup</p>
                            <p className="text-gray-600">{load.pickup_location?.city}, {load.pickup_location?.state}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Delivery</p>
                            <p className="text-gray-600">{load.delivery_location?.city}, {load.delivery_location?.state}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{load.distance_miles} miles</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <Button size="sm" variant="outline">
                          <Phone className="w-4 h-4 mr-2" />
                          Contact
                        </Button>
                        <Button size="sm" className="bg-blue-600">
                          <Navigation className="w-4 h-4 mr-2" />
                          Navigate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button className="bg-green-600 hover:bg-green-700 h-20 flex flex-col gap-1">
            <Clock className="w-6 h-6" />
            <span className="text-xs">Clock In</span>
          </Button>
          <Button className="bg-red-600 hover:bg-red-700 h-20 flex flex-col gap-1">
            <Phone className="w-6 h-6" />
            <span className="text-xs">Emergency</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
