Original name: TeamSetup.docx
Drive ID: 1jL6Hwu3105tsBdLS3PYJ8bBuGSV78LrI
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Pages/TeamSetup/
Modified: 2025-12-19T16:42:57.000Z

import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Truck, Plus } from "lucide-react";
import DriverForm from '@/components/team/DriverForm';
import TruckForm from '@/components/team/TruckForm';

export default function TeamSetup() {
  const [showDriverForm, setShowDriverForm] = useState(false);
  const [showTruckForm, setShowTruckForm] = useState(false);

  const queryClient = useQueryClient();

  const { data: drivers = [] } = useQuery({
    queryKey: ['drivers'],
    queryFn: () => base44.entities.Driver.list('-created_date')
  });

  const { data: trucks = [] } = useQuery({
    queryKey: ['trucks'],
    queryFn: () => base44.entities.Truck.list('-created_date')
  });

  const createDriverMutation = useMutation({
    mutationFn: (data) => base44.entities.Driver.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
      setShowDriverForm(false);
    }
  });

  const createTruckMutation = useMutation({
    mutationFn: (data) => base44.entities.Truck.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trucks'] });
      setShowTruckForm(false);
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <Users className="w-6 h-6 md:w-8 md:h-8" />
            Team & Equipment Setup
          </h1>
          <p className="text-gray-600 text-sm md:text-base">Add team members and equipment to your fleet</p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl md:text-4xl font-bold">{drivers.length}</p>
              <p className="text-sm text-gray-500">Team Members</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl md:text-4xl font-bold">{trucks.length}</p>
              <p className="text-sm text-gray-500">Equipment</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="drivers" className="space-y-4">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="drivers">
              <Users className="w-4 h-4 mr-2" />
              Team Members
            </TabsTrigger>
            <TabsTrigger value="trucks">
              <Truck className="w-4 h-4 mr-2" />
              Equipment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="drivers">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Team Members</CardTitle>
                  <Button onClick={() => setShowDriverForm(true)} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Driver
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {drivers.map(driver => (
                    <div key={driver.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold">{driver.full_name}</p>
                          <p className="text-sm text-gray-500">{driver.email}</p>
                          <p className="text-sm text-gray-500">CDL: {driver.cdl_class || 'None'}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{driver.platform}</p>
                          <p className="text-xs text-gray-500">License: {driver.license_state}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {drivers.length === 0 && (
                    <div className="text-center py-12">
                      <Users className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-500 mb-4">No team members yet</p>
                      <Button onClick={() => setShowDriverForm(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add First Driver
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trucks">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Equipment</CardTitle>
                  <Button onClick={() => setShowTruckForm(true)} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Equipment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {trucks.map(truck => (
                    <div key={truck.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold">{truck.unit_number}</p>
                          <p className="text-sm text-gray-600">{truck.make} {truck.model} ({truck.year})</p>
                        </div>
                        <div className="text-xs text-gray-500 capitalize">{truck.type}</div>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">VIN:</span>
                          <span className="font-mono">{truck.vin || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">License:</span>
                          <span>{truck.license_plate} ({truck.license_state})</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Max Weight:</span>
                          <span>{truck.max_weight_lbs?.toLocaleString()} lbs</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {trucks.length === 0 && (
                    <div className="col-span-2 text-center py-12">
                      <Truck className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-500 mb-4">No equipment added yet</p>
                      <Button onClick={() => setShowTruckForm(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add First Equipment
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {showDriverForm && (
        <DriverForm 
          onClose={() => setShowDriverForm(false)}
          onSubmit={(data) => createDriverMutation.mutate(data)}
        />
      )}

      {showTruckForm && (
        <TruckForm 
          onClose={() => setShowTruckForm(false)}
          onSubmit={(data) => createTruckMutation.mutate(data)}
        />
      )}
    </div>
  );
}
