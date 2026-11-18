Original name: SecurityAuditLog.docx
Drive ID: 1UErBD_Hoj-hDB7Ddx1WmE4MiwC49O8ZH
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Components/it/
Modified: 2025-12-22T03:43:36.000Z

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, CheckCircle, XCircle, Eye } from "lucide-react";
import { format } from 'date-fns';

export default function SecurityAuditLog() {
  const { data: auditLogs = [] } = useQuery({
    queryKey: ['securityAudit'],
    queryFn: () => base44.entities.SecurityAuditLog.list('-created_date', 50)
  });

  const getEventIcon = (type) => {
    switch (type) {
      case 'login_success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'login_failed': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'access_denied': return <Shield className="w-4 h-4 text-red-500" />;
      case 'api_key_generated': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'api_key_revoked': return <XCircle className="w-4 h-4 text-orange-500" />;
      case 'permission_change': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'data_access': return <Eye className="w-4 h-4 text-gray-500" />;
      default: return <Shield className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/95">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security Audit Log (Last 50 Events)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {auditLogs.map(log => (
              <Card key={log.id} className="hover:bg-gray-50 transition-colors">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      {getEventIcon(log.event_type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{log.event_description}</span>
                          <Badge className={getSeverityColor(log.severity)}>
                            {log.severity}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>User: {log.user_email}</p>
                          {log.ip_address && <p>IP: {log.ip_address}</p>}
                          {log.resource_accessed && <p>Resource: {log.resource_accessed}</p>}
                          {log.additional_data && (
                            <p className="font-mono text-xs bg-gray-100 p-2 rounded">
                              {JSON.stringify(log.additional_data)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p>{format(new Date(log.created_date), 'MMM d, yyyy')}</p>
                      <p>{format(new Date(log.created_date), 'h:mm:ss a')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {auditLogs.length === 0 && (
              <p className="text-center text-gray-500 py-8">No audit logs found</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
