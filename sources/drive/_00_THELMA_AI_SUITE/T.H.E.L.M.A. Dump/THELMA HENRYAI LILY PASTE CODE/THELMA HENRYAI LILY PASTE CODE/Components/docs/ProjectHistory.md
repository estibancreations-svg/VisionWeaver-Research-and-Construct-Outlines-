Original name: ProjectHistory.docx
Drive ID: 1WjZpjm_aODFhgYZKIZ9aHCursGpMcqnP
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Components/docs/
Modified: 2025-12-19T17:08:09.000Z

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function ProjectHistory() {
  const timeline = [
    {
      date: '2025-01-XX',
      phase: 'Phase 1: Strategy & Planning',
      status: 'completed',
      items: [
        'Defined MOTIVE NEXT ecosystem vision',
        'Identified dual-platform approach (Trucking Pro + Driveaway)',
        'Established subscription tiers ($35, $55, $75)',
        'Planned n8n backend automation',
        'Configured Netlify deployment',
        'Domain setup initiated (motivenext.online via Hostinger)'
      ]
    },
    {
      date: '2025-01-XX',
      phase: 'Phase 2: Core Infrastructure',
      status: 'completed',
      items: [
        'Created Subscription entity with tier management',
        'Created Load entity for job tracking',
        'Created Invoice entity for billing',
        'Created BillingCycle entity for 7 PM EST cutoff',
        'Created Driver entity with licensing',
        'Created Fleet entity for company management',
        'Created Truck entity for vehicle inventory'
      ]
    },
    {
      date: '2025-01-XX',
      phase: 'Phase 3: Billing System',
      status: 'completed',
      items: [
        'Built SubscriptionTierCard component',
        'Built InvoiceTable component',
        'Built BillingCycleStatus component with countdown',
        'Built SubscriptionManager component',
        'Created BillingDashboard page',
        'Implemented automated billing cycle processing',
        'Added subscription renewal logic'
      ]
    },
    {
      date: 'Upcoming',
      phase: 'Phase 4: Driver Experience',
      status: 'planned',
      items: [
        'Driver mobile-first dashboard',
        'Load acceptance workflow',
        'GPS tracking integration',
        'Emergency S.O.S. system',
        'Route optimization with compliance'
      ]
    },
    {
      date: 'Upcoming',
      phase: 'Phase 5: Fleet Management',
      status: 'planned',
      items: [
        'Fleet manager dashboard',
        'Multi-driver management',
        'Vehicle tracking map',
        'Dispatch system',
        'Performance analytics'
      ]
    },
    {
      date: 'Upcoming',
      phase: 'Phase 6: Customer Portal',
      status: 'planned',
      items: [
        'Customer tracking portal',
        'Real-time shipment updates',
        'Invoice history and payments',
        'Support ticket system'
      ]
    }
  ];

  const statusConfig = {
    completed: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100 text-green-800' },
    in_progress: { icon: Clock, color: 'text-blue-500', bg: 'bg-blue-100 text-blue-800' },
    planned: { icon: AlertCircle, color: 'text-gray-400', bg: 'bg-gray-100 text-gray-600' }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project History & Milestones</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
          
          <div className="space-y-8">
            {timeline.map((phase, index) => {
              const config = statusConfig[phase.status];
              const Icon = config.icon;
              
              return (
                <div key={index} className="relative pl-12">
                  {/* Timeline dot */}
                  <div className={`absolute left-2 w-5 h-5 rounded-full bg-white border-2 flex items-center justify-center ${
                    phase.status === 'completed' ? 'border-green-500' : 
                    phase.status === 'in_progress' ? 'border-blue-500' : 'border-gray-300'
                  }`}>
                    <Icon className={`w-3 h-3 ${config.color}`} />
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{phase.phase}</h3>
                      <Badge className={config.bg}>{phase.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{phase.date}</p>
                    <ul className="space-y-1">
                      {phase.items.map((item, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className={phase.status === 'completed' ? 'text-green-500' : 'text-gray-400'}>
                            {phase.status === 'completed' ? '✓' : '○'}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
