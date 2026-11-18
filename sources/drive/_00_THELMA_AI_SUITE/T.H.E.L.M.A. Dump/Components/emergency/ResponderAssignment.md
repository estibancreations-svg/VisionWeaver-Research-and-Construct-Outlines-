Original name: ResponderAssignment.docx
Drive ID: 1Jo4PIeISNbCwRrnqxP4xeJUsBDnvp6if
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Components/emergency/
Modified: 2025-12-19T17:22:32.000Z

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";

export default function ResponderAssignment({ incidents }) {
  const activeIncidents = incidents.filter(i => 
    ['dispatched', 'en_route', 'on_scene'].includes(i.status)
  );

  return (
    <Card className="bg-white/95">
      <CardHeader>
        <CardTitle>Active Responders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeIncidents.map(incident => (
            <div key={incident.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold">{incident.dispatch_id}</p>
                  <p className="text-sm text-gray-500">{incident.incident_type}</p>
                </div>
                <Badge className="bg-blue-500">
                  {incident.dispatch_mode}
                </Badge>
              </div>
              
              {incident.responders_assigned?.length > 0 ? (
                <div className="space-y-2">
                  {incident.responders_assigned.map((responder, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-white rounded">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium">{responder.unit_id}</p>
                          <p className="text-xs text-gray-500">{responder.unit_type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{responder.eta_minutes} min</p>
                        <p className="text-xs text-gray-500">{responder.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">No responders assigned yet</p>
              )}
            </div>
          ))}
          
          {activeIncidents.length === 0 && (
            <div className="text-center py-8">
              <Activity className="w-12 h-12 mx-auto text-gray-300 mb-2" />
              <p className="text-gray-500">No active responders</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
