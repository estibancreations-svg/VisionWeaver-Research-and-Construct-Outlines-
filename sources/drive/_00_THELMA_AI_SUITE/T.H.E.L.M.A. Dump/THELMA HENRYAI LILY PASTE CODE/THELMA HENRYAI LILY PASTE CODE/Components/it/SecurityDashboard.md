Original name: SecurityDashboard.docx
Drive ID: 1w-a38dmhkmKbQSP_0Rnk19TlBWeqT9BF
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Components/it/
Modified: 2025-12-22T03:44:14.000Z

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { format } from 'date-fns';

export default function SecurityDashboard({ audits }) {
  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getActionIcon = (action) => {
    if (action.includes('failed') || action.includes('failure')) return <XCircle className="w-4 h-4 text-red-400" />;
    if (action.includes('success')) return <CheckCircle className="w-4 h-4 text-green-400" />;
    return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Security Audit Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <div className="space-y-3">
            {audits.map(audit => (
              <Card key={audit.id} className="bg-gray-900/50 border-gray-700">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getActionIcon(audit.action_type)}
                        <h4 className="text-white font-semibold">{audit.action_type.replace(/_/g, ' ').toUpperCase()}</h4>
                        <Badge className={getRiskColor(audit.risk_level)}>{audit.risk_level}</Badge>
                        {audit.requires_review && <Badge className="bg-red-600">REVIEW REQUIRED</Badge>}
                      </div>
                      <div className="text-sm text-gray-400 space-y-1">
                        <p><strong>Performed by:</strong> {audit.performed_by}</p>
                        <p><strong>Target:</strong> {audit.target_entity} {audit.target_id && `(${audit.target_id})`}</p>
                        <p><strong>IP Address:</strong> {audit.ip_address}</p>
                        {audit.location && <p><strong>Location:</strong> {audit.location}</p>}
                        {audit.clearance_level_verified && (
                          <p><strong>Clearance:</strong> {audit.clearance_level_verified}</p>
                        )}
                        {!audit.success && audit.failure_reason && (
                          <p className="text-red-400"><strong>Failure Reason:</strong> {audit.failure_reason}</p>
                        )}
                        <p className="text-xs text-gray-500">
                          {format(new Date(audit.created_date), 'PPpp')}
                        </p>
                      </div>
                    </div>
                    {audit.success ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-400" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            {audits.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No security audits requiring review</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
