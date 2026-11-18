Original name: AviationControl.docx
Drive ID: 16__tLtF3dDQGk8wGYNcoI3zdDJeqxuo1
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Pages/AviationControl/
Modified: 2025-12-19T16:28:11.000Z

import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Plane, 
  Plus, 
  Search, 
  Radio, 
  Shield,
  AlertTriangle,
  CheckCircle,
  Loader2
} from "lucide-react";

import AviationAssetCard from '@/components/aviation/AviationAssetCard';
import FlightPlanForm from '@/components/aviation/FlightPlanForm';
import AirspaceCompliance from '@/components/aviation/AirspaceCompliance';
import WeatherPanel from '@/components/aviation/WeatherPanel';
import AssetFormModal from '@/components/aviation/AssetFormModal';

export default function AviationControl() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showFlightPlan, setShowFlightPlan] = useState(false);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [complianceResult, setComplianceResult] = useState(null);
  const [isCheckingCompliance, setIsCheckingCompliance] = useState(false);

  const queryClient = useQueryClient();

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ['aviationAssets'],
    queryFn: () => base44.entities.AviationAsset.list('-created_date')
  });

  const createAssetMutation = useMutation({
    mutationFn: (data) => base44.entities.AviationAsset.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aviationAssets'] });
      setShowAssetModal(false);
      setEditingAsset(null);
    }
  });

  const updateAssetMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.AviationAsset.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aviationAssets'] });
      setShowAssetModal(false);
      setEditingAsset(null);
    }
  });

  const handleSaveAsset = (data) => {
    if (editingAsset) {
      updateAssetMutation.mutate({ id: editingAsset.id, data });
    } else {
      createAssetMutation.mutate(data);
    }
  };

  const handleFlightPlanSubmit = async (flightPlan) => {
    setIsCheckingCompliance(true);
    
    // Simulate airspace compliance check via AI
    const prompt = `Perform an FAA airspace compliance check for this flight plan:
    - Departure: ${flightPlan.departure_location} (${flightPlan.departure_lat}, ${flightPlan.departure_lng})
    - Destination: ${flightPlan.destination_location} (${flightPlan.destination_lat}, ${flightPlan.destination_lng})
    - Altitude: ${flightPlan.altitude_feet} feet AGL
    - Mission: ${flightPlan.mission_type}
    - Aircraft is ${selectedAsset?.faa_compliance?.part_107_certified ? 'Part 107 certified' : 'not Part 107 certified'}
    
    Check for: restricted airspace, TFRs, airport proximity, weather suitability.`;

    const result = await base44.integrations.Core.InvokeLLM({
      prompt,
      add_context_from_internet: true,
      response_json_schema: {
        type: "object",
        properties: {
          airspace_clear: { type: "boolean" },
          tfr_active: { type: "boolean" },
          airport_proximity: { 
            type: "object",
            properties: {
              name: { type: "string" },
              distance_miles: { type: "number" }
            }
          },
          weather_suitable: { type: "boolean" },
          restrictions: { type: "array", items: { type: "string" } },
          warnings: { type: "array", items: { type: "string" } },
          recommendation: { type: "string" }
        }
      }
    });

    setComplianceResult({
      ...result,
      pilot_certified: selectedAsset?.faa_compliance?.part_107_certified ?? false,
      aircraft_airworthy: selectedAsset?.faa_compliance?.airworthiness_cert ?? false
    });
    setIsCheckingCompliance(false);
  };

  const filteredAssets = assets.filter(asset =>
    asset.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.registration_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.asset_type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: assets.length,
    available: assets.filter(a => a.status === 'available').length,
    inFlight: assets.filter(a => a.status === 'in_flight').length,
    maintenance: assets.filter(a => a.status === 'maintenance').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-900 via-blue-900 to-indigo-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Plane className="w-8 h-8" />
              Aviation Control
            </h1>
            <p className="text-blue-200">Drone & Aircraft Operations Center</p>
          </div>
          <Button onClick={() => { setEditingAsset(null); setShowAssetModal(true); }} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Aircraft
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white/10 border-white/20">
            <CardContent className="pt-4 text-center">
              <p className="text-3xl font-bold text-white">{stats.total}</p>
              <p className="text-sm text-blue-200">Total Fleet</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20">
            <CardContent className="pt-4 text-center">
              <p className="text-3xl font-bold text-green-400">{stats.available}</p>
              <p className="text-sm text-blue-200">Available</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20">
            <CardContent className="pt-4 text-center">
              <p className="text-3xl font-bold text-blue-400">{stats.inFlight}</p>
              <p className="text-sm text-blue-200">In Flight</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20">
            <CardContent className="pt-4 text-center">
              <p className="text-3xl font-bold text-yellow-400">{stats.maintenance}</p>
              <p className="text-sm text-blue-200">Maintenance</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="fleet" className="space-y-4">
          <TabsList className="bg-white/10">
            <TabsTrigger value="fleet" className="data-[state=active]:bg-white">
              <Radio className="w-4 h-4 mr-2" />
              Fleet
            </TabsTrigger>
            <TabsTrigger value="flight-plan" className="data-[state=active]:bg-white">
              <Plane className="w-4 h-4 mr-2" />
              Flight Planning
            </TabsTrigger>
            <TabsTrigger value="compliance" className="data-[state=active]:bg-white">
              <Shield className="w-4 h-4 mr-2" />
              Compliance
            </TabsTrigger>
          </TabsList>

          {/* Fleet Tab */}
          <TabsContent value="fleet">
            <Card className="bg-white/95">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <CardTitle>Aviation Assets</CardTitle>
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input 
                      placeholder="Search aircraft..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
                  </div>
                ) : filteredAssets.length === 0 ? (
                  <div className="text-center py-12">
                    <Plane className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">No aviation assets found</p>
                    <Button 
                      className="mt-4" 
                      onClick={() => { setEditingAsset(null); setShowAssetModal(true); }}
                    >
                      Add Your First Aircraft
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredAssets.map(asset => (
                      <AviationAssetCard 
                        key={asset.id}
                        asset={asset}
                        onSelect={(a) => {
                          setSelectedAsset(a);
                          setShowFlightPlan(true);
                        }}
                        onEdit={(a) => {
                          setEditingAsset(a);
                          setShowAssetModal(true);
                        }}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Flight Planning Tab */}
          <TabsContent value="flight-plan">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {selectedAsset ? (
                  <FlightPlanForm 
                    asset={selectedAsset}
                    onSubmit={handleFlightPlanSubmit}
                    onCancel={() => {
                      setSelectedAsset(null);
                      setComplianceResult(null);
                    }}
                  />
                ) : (
                  <Card className="bg-white/95">
                    <CardContent className="py-12 text-center">
                      <Plane className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500 mb-4">Select an aircraft to plan a flight</p>
                      <Button variant="outline" onClick={() => {}}>
                        Go to Fleet
                      </Button>
    </CardContent>
                  </Card>
                )}

                {isCheckingCompliance && (
                  <Card className="mt-4 bg-blue-50">
                    <CardContent className="py-6 text-center">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500 mb-2" />
                      <p className="text-blue-700">Checking airspace compliance...</p>
                    </CardContent>
                  </Card>
                )}

                {complianceResult && !isCheckingCompliance && (
                  <div className="mt-4">
                    <AirspaceCompliance complianceData={complianceResult} asset={selectedAsset} />
                  </div>
                )}
              </div>
              <div>
                <WeatherPanel />
              </div>
            </div>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/95">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Fleet Compliance Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {assets.map(asset => {
                    const isCompliant = asset.faa_compliance?.part_107_certified && 
                      asset.faa_compliance?.airworthiness_cert;
                    return (
                      <div key={asset.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{asset.make} {asset.model}</p>
                          <p className="text-sm text-gray-500">{asset.registration_number}</p>
                        </div>
                        <Badge className={isCompliant ? 'bg-green-500' : 'bg-red-500'}>
                          {isCompliant ? (
                            <><CheckCircle className="w-3 h-3 mr-1" /> Compliant</>
                          ) : (
                            <><AlertTriangle className="w-3 h-3 mr-1" /> Review</>
                          )}
                        </Badge>
                      </div>
                    );
                  })}
                  {assets.length === 0 && (
                    <p className="text-center text-gray-500 py-4">No assets to review</p>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white/95">
                <CardHeader>
                  <CardTitle>FAA Regulations Reference</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-800">14 CFR Part 107</p>
                    <p className="text-sm text-blue-600">Small UAS operations under 55 lbs</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">Key Requirements:</p>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Max altitude: 400 ft AGL</li>
                      <li>• Daylight operations (civil twilight with lights)</li>
                      <li>• Visual line of sight required</li>
                      <li>• Yield right of way to manned aircraft</li>
                      <li>• No operations over people without waiver</li>
                      <li>• Remote pilot certificate required</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="font-medium text-yellow-800">LAANC Authorization</p>
                    <p className="text-sm text-yellow-700">Required for controlled airspace operations</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <AssetFormModal 
        open={showAssetModal}
        onClose={() => { setShowAssetModal(false); setEditingAsset(null); }}
        asset={editingAsset}
        onSave={handleSaveAsset}
      />
    </div>
  );
}
