Original name: SystemConfigPanel.docx
Drive ID: 15izaxyCEoBOAgImBsfewt-1Bxrk1dckq
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Components/it/
Modified: 2025-12-22T03:44:43.000Z

import React from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Settings, Power, Lock, AlertTriangle } from "lucide-react";

export default function SystemConfigPanel({ configs }) {
  const queryClient = useQueryClient();

  const updateConfigMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.SystemConfiguration.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['systemConfigs'] })
  });

  const toggleMaintenanceMode = (config) => {
    updateConfigMutation.mutate({
      id: config.id,
      data: { maintenance_mode: !config.maintenance_mode }
    });
  };

  const toggleActiveStatus = (config) => {
    updateConfigMutation.mutate({
      id: config.id,
      data: { is_active: !config.is_active }
    });
  };

  const getModuleColor = (module) => {
    switch (module) {
      case 'fleet': return 'bg-blue-500';
      case 'aviation': return 'bg-sky-500';
      case 'emergency': return 'bg-red-500';
      case 'training': return 'bg-green-500';
      case 'it_infrastructure': return 'bg-purple-500';
      case 'master_system': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Settings className="w-5 h-5" />
          System Configuration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {configs.map(config => (
            <Card key={config.id} className="bg-gray-900/50 border-gray-700">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getModuleColor(config.module_name)}>
                        {config.module_name.toUpperCase()}
                      </Badge>
                      <Badge variant="outline">{config.environment}</Badge>
                      {config.requires_2fa && (
                        <Badge className="bg-yellow-600">
                          <Lock className="w-3 h-3 mr-1" />
                          2FA Required
                        </Badge>
                      )}
                      {config.requires_architect_approval && (
                        <Badge className="bg-red-600">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Architect Approval
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">Version: {config.version || 'N/A'}</p>
                    {config.last_deployed && (
                      <p className="text-xs text-gray-500">
                        Last deployed: {new Date(config.last_deployed).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Power className={`w-4 h-4 ${config.is_active ? 'text-green-400' : 'text-gray-500'}`} />
                      <Switch
                        checked={config.is_active}
                        onCheckedChange={() => toggleActiveStatus(config)}
                      />
                      <span className="text-sm text-gray-400">Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`w-4 h-4 ${config.maintenance_mode ? 'text-yellow-400' : 'text-gray-500'}`} />
                      <Switch
                        checked={config.maintenance_mode}
                        onCheckedChange={() => toggleMaintenanceMode(config)}
                      />
                      <span className="text-sm text-gray-400">Maintenance</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {configs.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No system configurations found</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
