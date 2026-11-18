Original name: alerts.docx
Drive ID: 1vtPUZyVI9qttQvTvSJs_STOoK1TCbMgU
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Components/alerts/
Modified: 2025-12-19T16:49:33.000Z

import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, AlertTriangle, CheckCircle, X } from "lucide-react";
import { format } from 'date-fns';

export default function AlertPanel({ compact = false }) {
  const queryClient = useQueryClient();

  const { data: alerts = [] } = useQuery({
    queryKey: ['alerts'],
    queryFn: () => base44.entities.Alert.filter({ status: 'active' }, '-created_date'),
    refetchInterval: 10000
  });

  const acknowledgeMutation = useMutation({
    mutationFn: async ({ id, email }) => 
      base44.entities.Alert.update(id, {
        status: 'acknowledged',
        acknowledged_by: email,
        acknowledged_at: new Date().toISOString()
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['alerts'] })
  });

  const dismissMutation = useMutation({
    mutationFn: ({ id }) => base44.entities.Alert.update(id, { status: 'dismissed' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['alerts'] })
  });

  const severityColors = {
    info: 'bg-blue-100 text-blue-800',
    warning: 'bg-yellow-100 text-yellow-800',
    critical: 'bg-orange-100 text-orange-800',
    emergency: 'bg-red-600 text-white'
  };

  const severityIcons = {
    info: <Bell className="w-4 h-4" />,
    warning: <AlertTriangle className="w-4 h-4" />,
    critical: <AlertTriangle className="w-4 h-4" />,
    emergency: <AlertTriangle className="w-4 h-4" />
  };

  if (compact) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Active Alerts ({alerts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64">
            <div className="space-y-2">
              {alerts.slice(0, 5).map(alert => (
                <div key={alert.id} className="p-2 bg-gray-50 rounded text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <Badge className={severityColors[alert.severity]}>{alert.severity}</Badge>
                    <p className="flex-1 font-medium">{alert.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          System Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map(alert => (
            <Card key={alert.id} className={alert.severity === 'emergency' ? 'border-red-500 border-2' : ''}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    {severityIcons[alert.severity]}
                    <Badge className={severityColors[alert.severity]}>{alert.severity}</Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={async () => {
                        const user = await base44.auth.me();
                        acknowledgeMutation.mutate({ id: alert.id, email: user.email });
                      }}
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      ACK
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => dismissMutation.mutate({ id: alert.id })}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <p className="font-semibold text-sm">{alert.title}</p>
                <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                {alert.asset_id && (
                  <p className="text-xs text-gray-500 mt-2">Asset: {alert.asset_type} ({alert.asset_id})</p>
                )}
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-400">{format(new Date(alert.created_date), 'h:mm a')}</p>
                  {alert.notification_channels?.length > 0 && (
                    <div className="flex gap-1">
                      {alert.notification_channels.map(ch => (
                        <Badge key={ch} variant="outline" className="text-xs">{ch}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          {alerts.length === 0 && (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-2" />
              <p className="text-gray-500">All clear - no active alerts</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
