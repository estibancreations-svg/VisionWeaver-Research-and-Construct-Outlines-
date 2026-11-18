Original name: FirstAidStation.docx
Drive ID: 1UgE2jr2BbL35x45N6Yy5fQTk5kowiDdO
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Pages/FirstAidStation/
Modified: 2025-12-19T16:35:27.000Z

import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  AlertTriangle, 
  Plus, 
  Search, 
  Activity,
  Phone,
  MapPin,
  Truck,
  Plane,
  Anchor
} from "lucide-react";

import IncidentForm from '@/components/emergency/IncidentForm';
import ResponderAssignment from '@/components/emergency/ResponderAssignment';
import LiveMapView from '@/components/shared/LiveMapView';
import MessagingPanel from '@/components/shared/MessagingPanel';
import AlertPanel from '@/components/alerts/AlertPanel';

export default function EmergencyDispatch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showIncidentForm, setShowIncidentForm] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);

  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me()
  });

  const { data: incidents = [] } = useQuery({
    queryKey: ['emergencyDispatch'],
    queryFn: () => base44.entities.EmergencyDispatch.list('-created_date')
  });

  const createIncidentMutation = useMutation({
    mutationFn: (data) => base44.entities.EmergencyDispatch.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emergencyDispatch'] });
      setShowIncidentForm(false);
    }
  });

  const updateIncidentMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.EmergencyDispatch.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emergencyDispatch'] });
    }
  });

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    dispatched: 'bg-blue-100 text-blue-800',
    en_route: 'bg-purple-100 text-purple-800',
    on_scene: 'bg-orange-100 text-orange-800',
    resolved: 'bg-green-100 text-green-800',
    cancelled: 'bg-gray-100 text-gray-500'
  };

  const priorityColors = {
    critical: 'bg-red-600 text-white',
    high: 'bg-orange-500 text-white',
    medium: 'bg-yellow-500 text-white',
    low: 'bg-blue-500 text-white'
  };

  const modeIcons = {
    land: <Truck className="w-4 h-4" />,
    air: <Plane className="w-4 h-4" />,
    water: <Anchor className="w-4 h-4" />,
    multi_modal: <Activity className="w-4 h-4" />
  };

  const filteredIncidents = incidents.filter(inc =>
    inc.dispatch_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inc.incident_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inc.location?.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: incidents.length,
    critical: incidents.filter(i => i.priority === 'critical').length,
    active: incidents.filter(i => ['dispatched', 'en_route', 'on_scene'].includes(i.status)).length,
    resolved: incidents.filter(i => i.status === 'resolved').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 md:w-8 md:h-8" />
              Emergency Dispatch
            </h1>
            <p className="text-red-200 text-sm md:text-base">Multi-Modal Emergency Response Center</p>
          </div>
          <Button onClick={() => setShowIncidentForm(true)} className="bg-red-600 hover:bg-red-700 w-full md:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Report Incident
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Card className="bg-white/10 border-white/20">
            <CardContent className="pt-4 text-center">
              <p className="text-2xl md:text-3xl font-bold text-white">{stats.total}</p>
              <p className="text-xs md:text-sm text-red-200">Total Incidents</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20">
            <CardContent className="pt-4 text-center">
              <p className="text-2xl md:text-3xl font-bold text-red-400">{stats.critical}</p>
              <p className="text-xs md:text-sm text-red-200">Critical</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20">
            <CardContent className="pt-4 text-center">
              <p className="text-2xl md:text-3xl font-bold text-orange-400">{stats.active}</p>
              <p className="text-xs md:text-sm text-red-200">Active</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20">
            <CardContent className="pt-4 text-center">
              <p className="text-2xl md:text-3xl font-bold text-green-400">{stats.resolved}</p>
              <p className="text-xs md:text-sm text-red-200">Resolved</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active" className="space-y-4">
          <TabsList className="bg-white/10 w-full grid grid-cols-3">
            <TabsTrigger value="active" className="data-[state=active]:bg-white text-xs md:text-sm">
              Active
            </TabsTrigger>
            <TabsTrigger value="all" className="data-[state=active]:bg-white text-xs md:text-sm">
              All Incidents
            </TabsTrigger>
            <TabsTrigger value="responders" className="data-[state=active]:bg-white text-xs md:text-sm">
              Responders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <Card className="bg-white/95">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <CardTitle className="text-base md:text-lg">Active Incidents</CardTitle>
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input 
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 text-sm"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredIncidents
                    .filter(i => ['pending', 'dispatched', 'en_route', 'on_scene'].includes(i.status))
                    .map(incident => (
                      <Card key={incident.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="pt-4">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                            <div className="flex-1 space-y-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <Badge className={priorityColors[incident.priority]}>
                                  {incident.priority}
                                </Badge>
                                <Badge className={statusColors[incident.status]}>
                                  {incident.status}
                                </Badge>
                                <Badge variant="outline" className="flex items-center gap-1">
                                  {modeIcons[incident.dispatch_mode]}
                                  {incident.dispatch_mode}
                                </Badge>
                              </div>
                              <div>
                                <p className="font-semibold text-sm md:text-base">{incident.incident_type} - {incident.dispatch_id}</p>
                                <p className="text-xs md:text-sm text-gray-600">{incident.incident_details}</p>
                              </div>
                              <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                                  {incident.location?.city}, {incident.location?.state}
                                </span>
                                {incident.caller_info?.phone && (
                                  <span className="flex items-center gap-1">
                                    <Phone className="w-3 h-3 md:w-4 md:h-4" />
                                    {incident.caller_info.phone}
                                  </span>
                                )}
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              onClick={() => setSelectedIncident(incident)}
                              className="w-full md:w-auto"
                            >
                              Manage
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  {filteredIncidents.filter(i => ['pending', 'dispatched', 'en_route', 'on_scene'].includes(i.status)).length === 0 && (
                    <div className="text-center py-8 md:py-12">
                      <Activity className="w-8 h-8 md:w-12 md:h-12 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500 text-sm md:text-base">No active incidents</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all">
            <Card className="bg-white/95">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">All Incidents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredIncidents.map(incident => (
                    <div key={incident.id} className="p-3 md:p-4 bg-gray-50 rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div className="flex-1">
                          <p className="font-medium text-sm md:text-base">{incident.dispatch_id}</p>
                          <p className="text-xs md:text-sm text-gray-500">{incident.incident_type} • {incident.location?.city}</p>
                        </div>
                        <Badge className={statusColors[incident.status]} className="text-xs">
                          {incident.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="responders">
            <ResponderAssignment incidents={incidents} />
          </TabsContent>
        </Tabs>

        {/* Live Map & Communications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <LiveMapView 
            incidents={filteredIncidents.filter(i => ['pending', 'dispatched', 'en_route', 'on_scene'].includes(i.status))}
            center={[39.8283, -98.5795]}
            zoom={5}
          />
          <div className="space-y-4">
            <MessagingPanel 
              userEmail={user?.email}
              conversationId="ems-dispatch-main"
            />
            <AlertPanel compact />
          </div>
        </div>
      </div>

      {showIncidentForm && (
        <IncidentForm 
          onClose={() => setShowIncidentForm(false)}
          onSubmit={(data) => createIncidentMutation.mutate(data)}
        />
      )}

      {selectedIncident && (
        <IncidentForm 
          incident={selectedIncident}
          onClose={() => setSelectedIncident(null)}
          onSubmit={(data) => updateIncidentMutation.mutate({ id: selectedIncident.id, data })}
        />
      )}
    </div>
  );
}
