Original name: PredictiveMaintenance.docx
Drive ID: 1DJJ53CYc22e1CnTNUx4qaDSDkFpgAWe8
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Components/fleet/
Modified: 2025-12-19T17:23:17.000Z

import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Loader2 } from "lucide-react";

export default function PredictiveMaintenance({ assets, assetType = 'truck' }) {
  const [analyzing, setAnalyzing] = useState(false);
  const queryClient = useQueryClient();

  const { data: workOrders = [] } = useQuery({
    queryKey: ['maintenanceWorkOrders'],
    queryFn: () => base44.entities.MaintenanceWorkOrder.list('-created_date')
  });

  const analyzeMutation = useMutation({
    mutationFn: async (asset) => {
      setAnalyzing(true);

      const telemetry = asset.telematics || {};
      const prompt = `Analyze vehicle telematics data and predict maintenance needs:
      
      Asset: ${asset.unit_number || asset.asset_id} (${asset.make} ${asset.model})
      VIN: ${asset.vin || 'N/A'}
      Type: ${assetType}
      
      Telemetry:
      - Odometer/Hours: ${telemetry.odometer_miles || telemetry.flight_hours || 0}
      - Engine/Motor Hours: ${telemetry.engine_hours || telemetry.motor_hours || 0}
      - Fault Codes: ${JSON.stringify(telemetry.fault_codes || [])}
      - Oil Life: ${telemetry.oil_life_percent || 'N/A'}%
      - Last Diagnostic: ${telemetry.last_diagnostic || 'Never'}
      
      Predict:
      1. Overall health score (0-100)
      2. Top 3 potential failures with probability and estimated days
      3. Recommended maintenance actions
      4. Urgency level (routine, preventive, urgent, critical)`;

      const analysis = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            health_score: { type: "number" },
            predicted_failures: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  component: { type: "string" },
                  probability: { type: "number" },
                  estimated_days: { type: "number" }
                }
              }
            },
            recommended_actions: { type: "array", items: { type: "string" } },
            urgency: { type: "string" }
          }
        }
      });

      // Update asset with predictions
      const updateData = {
        maintenance_score: analysis.health_score,
        predicted_failures: analysis.predicted_failures
      };

      if (assetType === 'truck') {
        await base44.entities.Truck.update(asset.id, updateData);
      } else {
        await base44.entities.AviationAsset.update(asset.id, updateData);
      }

      // Create work orders for urgent items
      for (const failure of analysis.predicted_failures) {
        if (failure.probability > 0.7 || failure.estimated_days < 30) {
          await base44.entities.MaintenanceWorkOrder.create({
            work_order_id: `WO-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            asset_type: assetType,
            asset_id: asset.id,
            vin: asset.vin,
            status: 'pending',
            priority: failure.probability > 0.8 ? 'urgent' : 'preventive',
            work_type: 'predictive_maintenance',
            predicted_failure: failure,
            description: `AI-predicted: ${failure.component} failure likely in ${failure.estimated_days} days`,
            components_affected: [failure.component],
            ai_generated: true
          });
        }
      }

      setAnalyzing(false);
      return analysis;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trucks'] });
      queryClient.invalidateQueries({ queryKey: ['aviationAssets'] });
      queryClient.invalidateQueries({ queryKey: ['maintenanceWorkOrders'] });
    }
  });

  const healthyAssets = assets.filter(a => (a.maintenance_score || 100) >= 70);
  const warningAssets = assets.filter(a => (a.maintenance_score || 100) >= 40 && (a.maintenance_score || 100) < 70);
  const criticalAssets = assets.filter(a => (a.maintenance_score || 100) < 40);

  const pendingWorkOrders = workOrders.filter(wo => ['pending', 'scheduled'].includes(wo.status));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
          <Sparkles className="w-5 h-5" />
          AI Predictive Maintenance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-2xl md:text-3xl font-bold text-green-600">{healthyAssets.length}</p>
            <p className="text-xs text-gray-600">Healthy</p>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <p className="text-2xl md:text-3xl font-bold text-yellow-600">{warningAssets.length}</p>
            <p className="text-xs text-gray-600">Warning</p>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <p className="text-2xl md:text-3xl font-bold text-red-600">{criticalAssets.length}</p>
            <p className="text-xs text-gray-600">Critical</p>
          </div>
        </div>

        <Tabs defaultValue="assets" className="space-y-3">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="assets" className="text-xs md:text-sm">Assets</TabsTrigger>
            <TabsTrigger value="workorders" className="text-xs md:text-sm">Work Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="assets">
            <div className="space-y-3">
              {assets.length === 0 && (
                <p className="text-center text-gray-500 py-8 text-sm">No assets to analyze</p>
              )}
              {assets.map(asset => {
                const score = asset.maintenance_score || 100;
                const hasFailures = asset.predicted_failures?.length > 0;

                return (
                  <Card key={asset.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-4">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-3">
                        <div className="flex-1">
                          <p className="font-semibold text-sm md:text-base">{asset.unit_number || asset.asset_id}</p>
                          <p className="text-xs md:text-sm text-gray-500">{asset.make} {asset.model}</p>
                          {asset.vin && <p className="text-xs text-gray-400">VIN: {asset.vin}</p>}
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500 mb-1">Health Score</p>
                          <p className={`text-2xl md:text-3xl font-bold ${
                            score >= 70 ? 'text-green-600' : score >= 40 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {score}
                          </p>
                        </div>
                      </div>

                      <Progress 
                        value={score} 
                        className={`h-2 ${
                          score >= 70 ? 'bg-green-100' : score >= 40 ? 'bg-yellow-100' : 'bg-red-100'
                        }`}
                      />

                      {hasFailures && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs font-medium text-gray-700">Predicted Issues:</p>
                          {asset.predicted_failures.map((failure, i) => (
                            <div key={i} className="flex items-center justify-between p-2 bg-yellow-50 rounded text-xs">
                              <div>
                                <p className="font-medium">{failure.component}</p>
                                <p className="text-gray-600">{failure.estimated_days} days</p>
                              </div>
                              <Badge className="bg-orange-500">{Math.round(failure.probability * 100)}%</Badge>
                            </div>
                          ))}
                        </div>
                      )}

                      <Button 
                        size="sm" 
                        className="w-full mt-3 text-xs md:text-sm" 
                        onClick={() => analyzeMutation.mutate(asset)}
                        disabled={analyzing}
                      >
                        {analyzing ? (
                          <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Analyzing...</>
                        ) : (
                          <><Sparkles className="w-4 h-4 mr-2" />Run AI Analysis</>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="workorders">
            <div className="space-y-3">
              {pendingWorkOrders.length === 0 ? (
                <p className="text-center text-gray-500 py-8 text-sm">No pending work orders</p>
              ) : (
                pendingWorkOrders.map(wo => (
                  <Card key={wo.id}>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-sm md:text-base">{wo.work_order_id}</p>
                          <p className="text-xs text-gray-500">{wo.description}</p>
                        </div>
                        <Badge className={
                          wo.priority === 'critical' ? 'bg-red-600' :
                          wo.priority === 'urgent' ? 'bg-orange-500' :
                          'bg-blue-500'
                        } className="text-xs">
                          {wo.priority}
                        </Badge>
                      </div>
                      {wo.ai_generated && (
                        <Badge variant="outline" className="text-xs">
                          <Sparkles className="w-3 h-3 mr-1" />
                          AI Generated
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
