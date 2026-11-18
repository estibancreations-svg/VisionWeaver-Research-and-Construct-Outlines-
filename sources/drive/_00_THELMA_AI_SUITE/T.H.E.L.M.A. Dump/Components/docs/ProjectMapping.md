Original name: ProjectMapping.docx
Drive ID: 1i9DekbfH47VdhERs20NkpIzJqwtTNeYM
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Components/docs/
Modified: 2025-12-19T17:08:36.000Z

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Folder, File, Database, Layout } from "lucide-react";

export default function ProjectMapping() {
  const structure = {
    entities: [
      { name: 'Subscription', description: 'User subscription tiers and billing info', status: 'complete' },
      { name: 'Load', description: 'Trucking/Driveaway load management', status: 'complete' },
      { name: 'Invoice', description: 'Generated invoices for loads and subscriptions', status: 'complete' },
      { name: 'BillingCycle', description: 'Daily 7 PM EST billing cycle tracking', status: 'complete' },
      { name: 'Driver', description: 'Driver profiles and licensing', status: 'complete' },
      { name: 'Fleet', description: 'Fleet company management', status: 'complete' },
      { name: 'Truck', description: 'Vehicle inventory and specifications', status: 'complete' },
      { name: 'Route', description: 'AI-optimized routes with compliance', status: 'complete' },
      { name: 'WorkStation', description: 'Operator workstations for each hub section', status: 'complete' },
      { name: 'EmergencyDispatch', description: 'EMS/emergency dispatch (land, air, water)', status: 'complete' },
      { name: 'InsuranceProvider', description: 'External insurance agency connections', status: 'complete' },
      { name: 'AviationAsset', description: 'Drones and aircraft management', status: 'complete' },
      { name: 'FirstAidProtocol', description: 'Emergency first aid procedures', status: 'complete' }
    ],
    pages: [
      { name: 'MainHub', description: 'Central operations hub connecting all stations', status: 'complete' },
      { name: 'BillingDashboard', description: 'Complete billing management interface', status: 'complete' },
      { name: 'RouteOptimizer', description: 'AI-powered route planning with compliance', status: 'complete' },
      { name: 'EmergencyDispatch', description: 'EMS dispatch for land, air, water', status: 'planned' },
      { name: 'AviationControl', description: 'Drone and aircraft operations center', status: 'planned' },
      { name: 'InsuranceStation', description: 'Insurance desk with agency connections', status: 'planned' },
      { name: 'FirstAidStation', description: 'Emergency first aid protocols', status: 'planned' },
      { name: 'DriverDashboard', description: 'Driver mobile-first interface', status: 'planned' },
      { name: 'FleetDashboard', description: 'Fleet manager desktop view', status: 'planned' },
      { name: 'CustomerPortal', description: 'Customer tracking and billing', status: 'planned' }
    ],
    components: {
      billing: [
        'SubscriptionTierCard',
        'InvoiceTable',
        'BillingCycleStatus',
        'SubscriptionManager'
      ],
      routing: [
        'LocationInput',
        'TruckConstraintsForm',
        'RouteConditions',
        'RouteResultCard'
      ],
      docs: [
        'ProjectMapping',
        'ProjectHistory',
        'ProjectRoadmap'
      ]
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Entities (Data Models)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {structure.entities.map(entity => (
              <div key={entity.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <File className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="font-medium">{entity.name}</p>
                    <p className="text-sm text-gray-500">{entity.description}</p>
                  </div>
                </div>
                <Badge className={entity.status === 'complete' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                  {entity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layout className="w-5 h-5" />
            Pages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {structure.pages.map(page => (
              <div key={page.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <File className="w-4 h-4 text-purple-500" />
                  <div>
                    <p className="font-medium">{page.name}</p>
                    <p className="text-sm text-gray-500">{page.description}</p>
                  </div>
                </div>
                <Badge className={page.status === 'complete' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                  {page.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Folder className="w-5 h-5" />
            Components
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(structure.components).map(([folder, files]) => (
              <div key={folder}>
                <p className="font-medium text-sm text-gray-500 mb-2 flex items-center gap-2">
                  <Folder className="w-4 h-4" />
                  components/{folder}/
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 ml-6">
                  {files.map(file => (
                    <div key={file} className="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm">
                      <File className="w-3 h-3 text-green-500" />
                      {file}.jsx
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
