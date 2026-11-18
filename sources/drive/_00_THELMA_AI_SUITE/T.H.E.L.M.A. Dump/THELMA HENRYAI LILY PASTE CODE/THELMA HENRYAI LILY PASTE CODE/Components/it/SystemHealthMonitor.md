Original name: SystemHealthMonitor.docx
Drive ID: 1wYKqfQG8hakvTWPzf8RFfFPM10yiXQCu
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Components/it/
Modified: 2025-12-22T03:45:14.000Z

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Database, Activity, Cpu, HardDrive, Zap } from "lucide-react";

export default function SystemHealthMonitor() {
  const systemMetrics = [
    { name: 'API Server', status: 'healthy', uptime: '99.98%', latency: '45ms', icon: Server },
    { name: 'Database', status: 'healthy', uptime: '99.99%', latency: '12ms', icon: Database },
    { name: 'AI Agents', status: 'healthy', uptime: '99.95%', latency: '234ms', icon: Activity },
    { name: 'Storage', status: 'healthy', usage: '67%', capacity: '2.4TB', icon: HardDrive },
    { name: 'CPU Usage', status: 'warning', usage: '78%', cores: '32', icon: Cpu },
    { name: 'Memory', status: 'healthy', usage: '54%', total: '128GB', icon: Zap }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/95">
        <CardHeader>
          <CardTitle>System Health Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemMetrics.map(metric => {
              const Icon = metric.icon;
              return (
                <Card key={metric.name} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5 text-gray-600" />
                        <span className="font-medium">{metric.name}</span>
                      </div>
                      <Badge className={getStatusColor(metric.status)}>
                        {metric.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      {metric.uptime && <p>Uptime: {metric.uptime}</p>}
                      {metric.latency && <p>Latency: {metric.latency}</p>}
                      {metric.usage && <p>Usage: {metric.usage}</p>}
                      {metric.capacity && <p>Capacity: {metric.capacity}</p>}
                      {metric.cores && <p>Cores: {metric.cores}</p>}
                      {metric.total && <p>Total: {metric.total}</p>}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/95">
        <CardHeader>
          <CardTitle>Recent System Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded">
              <Activity className="w-4 h-4 text-green-600" />
              <span className="text-sm">System backup completed successfully - 2 hours ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded">
              <Server className="w-4 h-4 text-blue-600" />
              <span className="text-sm">API server updated to v2.4.1 - 5 hours ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded">
              <Cpu className="w-4 h-4 text-yellow-600" />
              <span className="text-sm">CPU usage spike detected during peak hours - 8 hours ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded">
              <Database className="w-4 h-4 text-green-600" />
              <span className="text-sm">Database optimization completed - 12 hours ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
