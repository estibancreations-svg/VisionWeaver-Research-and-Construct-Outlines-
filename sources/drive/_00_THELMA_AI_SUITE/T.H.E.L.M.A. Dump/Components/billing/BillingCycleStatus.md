Original name: BillingCycleStatus.docx
Drive ID: 1RS0xWLvoLC2PmDzw8QopOGQpOKaUIABL
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Components/billing/
Modified: 2025-12-19T17:04:25.000Z

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";

export default function BillingCycleStatus({ cycle }) {
  const [timeUntilCutoff, setTimeUntilCutoff] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const cutoff = new Date();
      cutoff.setHours(19, 0, 0, 0); // 7 PM EST
      
      // If past 7 PM, set to tomorrow
      if (now > cutoff) {
        cutoff.setDate(cutoff.getDate() + 1);
      }

      const diff = cutoff - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeUntilCutoff(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const statusConfig = {
    pending: { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-100' },
    processing: { icon: Loader2, color: 'text-blue-500', bg: 'bg-blue-100', animate: true },
    completed: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100' },
    failed: { icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-100' }
  };

  const config = statusConfig[cycle?.status || 'pending'];
  const Icon = config.icon;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Daily Billing Cycle</CardTitle>
          <Badge className={config.bg}>
            <Icon className={`w-4 h-4 mr-1 ${config.color} ${config.animate ? 'animate-spin' : ''}`} />
            {cycle?.status || 'pending'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Countdown to 7 PM EST */}
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-500 mb-1">Next Cutoff (7 PM EST)</p>
            <p className="text-2xl font-bold text-gray-900">{timeUntilCutoff}</p>
          </div>

          {/* Cycle Stats */}
          {cycle && (
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{cycle.loads_processed || 0}</p>
                <p className="text-sm text-gray-600">Loads Processed</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{cycle.invoices_generated || 0}</p>
                <p className="text-sm text-gray-600">Invoices Generated</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{cycle.subscriptions_renewed || 0}</p>
                <p className="text-sm text-gray-600">Renewals</p>
              </div>
              <div className="text-center p-3 bg-amber-50 rounded-lg">
                <p className="text-2xl font-bold text-amber-600">${cycle.total_revenue?.toFixed(2) || '0.00'}</p>
                <p className="text-sm text-gray-600">Revenue</p>
              </div>
            </div>
          )}

          {/* Processing Progress */}
          {cycle?.status === 'processing' && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Processing...</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
