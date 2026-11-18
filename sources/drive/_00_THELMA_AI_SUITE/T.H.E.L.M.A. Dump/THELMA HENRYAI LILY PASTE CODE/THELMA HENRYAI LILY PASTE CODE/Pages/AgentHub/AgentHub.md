Original name: AgentHub.docx
Drive ID: 1s7yiTPsuVXVj0KtbLHoWYXsyd96rAcFI
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Pages/AgentHub/
Modified: 2025-12-19T15:15:58.000Z

import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Sparkles, Bot, TrendingUp, Users, Truck, AlertTriangle, GraduationCap } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AgentHub() {
  const [selectedAgent, setSelectedAgent] = useState(null);

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me()
  });

  const { data: userRole } = useQuery({
    queryKey: ['userRole', user?.email],
    queryFn: () => base44.entities.UserRole.filter({ user_email: user.email }).then(res => res[0]),
    enabled: !!user
  });

  // Check if user has permission to access agents
  const hasAccess = user?.role === 'admin' || userRole?.permissions?.can_access_agents;

  const agents = [
    {
      id: 'fleet_operations_agent',
      name: 'Fleet Operations Agent',
      icon: Truck,
      color: 'bg-blue-500',
      description: 'Manages fleet operations, dispatching, and route optimization',
      capabilities: ['Fleet Management', 'Route Optimization', 'Driver Coordination', 'Real-time Monitoring']
    },
    {
      id: 'emergency_dispatch_agent',
      name: 'Emergency Dispatch Agent',
      icon: AlertTriangle,
      color: 'bg-red-500',
      description: 'Handles emergency incidents and coordinates response teams',
      capabilities: ['Incident Management', 'Emergency Response', 'First Aid Guidance', 'Resource Allocation']
    },
    {
      id: 'training_assistant_agent',
      name: 'Training Assistant (HenryAI)',
      icon: GraduationCap,
      color: 'bg-emerald-500',
      description: 'Your personal AI training guide through all system modules',
      capabilities: ['Step-by-Step Guidance', 'Q&A Support', 'Progress Tracking', 'Certificate Issuance']
    },
    {
      id: 'analytics_agent',
      name: 'Analytics & Reporting Agent',
      icon: TrendingUp,
      color: 'bg-purple-500',
      description: 'Generates insights, reports, and data-driven recommendations',
      capabilities: ['Automated Reports', 'Custom Analytics', 'Trend Forecasting', 'Performance Insights']
    },
    {
      id: 'hr_admin_agent',
      name: 'HR Administration Agent',
      icon: Users,
      color: 'bg-orange-500',
      description: 'Manages user roles, training assignments, and compliance',
      capabilities: ['Role Management', 'Training Assignment', 'Certification Tracking', 'Onboarding']
    }
  ];

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <Shield className="w-16 h-16 mx-auto text-red-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Access Restricted</h2>
            <p className="text-gray-600 mb-4">
              You do not have permission to access the Agent Hub. This area is restricted to authorized personnel only.
            </p>
            <Badge variant="destructive">High Security Zone</Badge>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Shield className="w-10 h-10 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Agent Hub</h1>
            <Lock className="w-6 h-6 text-yellow-400" />
          </div>
          <p className="text-blue-200">Secure AI Agent Command Center</p>
          <Badge className="mt-2 bg-red-600">🔐 High Security - Admin Access Only</Badge>
        </div>

        {/* Security Notice */}
        <Alert className="bg-yellow-900/50 border-yellow-600">
          <Lock className="w-4 h-4" />
          <AlertDescription className="text-yellow-200">
            <strong>Security Notice:</strong> All agent interactions are encrypted and logged. Unauthorized access attempts are monitored and reported.
          </AlertDescription>
        </Alert>

        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => {
            const Icon = agent.icon;
            return (
              <Card key={agent.id} className="bg-white/10 border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-12 h-12 ${agent.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-base">{agent.name}</CardTitle>
                      <Badge variant="outline" className="text-xs text-blue-300 border-blue-300">
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI Powered
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300 mb-3">{agent.description}</p>
                  <div className="space-y-1 mb-3">
                    <p className="text-xs font-semibold text-gray-400">Capabilities:</p>
                    {agent.capabilities.map((cap, i) => (
                      <Badge key={i} variant="secondary" className="text-xs mr-1 mb-1">
                        {cap}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    className="w-full" 
                    size="sm"
                    onClick={() => {
                      const url = base44.agents.getWhatsAppConnectURL(agent.id);
                      window.open(url, '_blank');
                    }}
                  >
                    <Bot className="w-4 h-4 mr-2" />
                    Connect via WhatsApp
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Panel */}
        <Card className="bg-white/5 border-white/10">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <Lock className="w-8 h-8 mx-auto text-blue-400 mb-2" />
                <p className="text-sm font-semibold text-white">End-to-End Encryption</p>
                <p className="text-xs text-gray-400">All communications are secured with military-grade encryption</p>
              </div>
              <div>
                <Shield className="w-8 h-8 mx-auto text-green-400 mb-2" />
                <p className="text-sm font-semibold text-white">Role-Based Access</p>
                <p className="text-xs text-gray-400">Agents only access data within their authorized scope</p>
              </div>
              <div>
                <Sparkles className="w-8 h-8 mx-auto text-purple-400 mb-2" />
                <p className="text-sm font-semibold text-white">AI-Powered Insights</p>
                <p className="text-xs text-gray-400">Intelligent automation and decision support</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
