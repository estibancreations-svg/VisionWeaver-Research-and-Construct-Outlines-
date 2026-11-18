Original name: ITControlCenter.docx
Drive ID: 1Hy0sHfazp5-Alcgx6Z8IpIwlOfwFTnpA
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Pages/ITControlCenter/
Modified: 2025-12-19T16:38:45.000Z

import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Key, 
  Lock, 
  Server, 
  AlertTriangle,
  CheckCircle,
  Brain,
  Database,
  Activity,
  Users,
  Settings,
  RefreshCw
} from "lucide-react";

import APIKeyManager from '@/components/it/APIKeyManager';
import HenriAIControl from '@/components/it/HenriAIControl';
import SecurityAuditLog from '@/components/it/SecurityAuditLog';
import SystemHealthMonitor from '@/components/it/SystemHealthMonitor';
import AccessControlMatrix from '@/components/it/AccessControlMatrix';

export default function ITControlCenter() {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me()
  });

  const { data: userRole } = useQuery({
    queryKey: ['userRole', user?.email],
    queryFn: () => base44.entities.UserRole.filter({ user_email: user?.email }),
    enabled: !!user
  });

  // Check if user has IT access
  const hasITAccess = userRole?.[0]?.security_clearance === 'level_5' || 
                      userRole?.[0]?.role === 'cto' || 
                      userRole?.[0]?.role === 'ciso' ||
                      userRole?.[0]?.role === 'architect';

  if (!hasITAccess) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <Card className="max-w-md border-red-500 border-2">
          <CardContent className="pt-6 text-center">
            <Shield className="w-16 h-16 mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-4">
              Level 5 Security Clearance Required
            </p>
            <Badge variant="destructive">Unauthorized Access Attempt Logged</Badge>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-400" />
              IT Control Center
            </h1>
            <p className="text-blue-200">Level 5 Security Clearance - System Administration</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-500 text-white">
              <Activity className="w-3 h-3 mr-1" />
              System Online
            </Badge>
            <Badge className="bg-blue-500 text-white">
              Clearance: Level 5
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white/10 border-white/20">
            <CardContent className="pt-4 text-center">
              <Brain className="w-8 h-8 mx-auto text-purple-400 mb-2" />
              <p className="text-2xl font-bold text-white">7</p>
              <p className="text-sm text-blue-200">Active AI Agents</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20">
            <CardContent className="pt-4 text-center">
              <Key className="w-8 h-8 mx-auto text-yellow-400 mb-2" />
              <p className="text-2xl font-bold text-white">12</p>
              <p className="text-sm text-blue-200">API Endpoints</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20">
            <CardContent className="pt-4 text-center">
              <Users className="w-8 h-8 mx-auto text-green-400 mb-2" />
              <p className="text-2xl font-bold text-white">24</p>
              <p className="text-sm text-blue-200">Active Users</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20">
            <CardContent className="pt-4 text-center">
              <Server className="w-8 h-8 mx-auto text-blue-400 mb-2" />
              <p className="text-2xl font-bold text-white">99.9%</p>
              <p className="text-sm text-blue-200">Uptime</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Control Panel */}
        <Tabs defaultValue="api-keys" className="space-y-4">
          <TabsList className="bg-white/10 grid grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="api-keys" className="data-[state=active]:bg-white">
              <Key className="w-4 h-4 mr-2" />
              API Keys
            </TabsTrigger>
            <TabsTrigger value="henri-ai" className="data-[state=active]:bg-white">
              <Brain className="w-4 h-4 mr-2" />
              Henri AI
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-white">
              <Lock className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="system" className="data-[state=active]:bg-white">
              <Server className="w-4 h-4 mr-2" />
              System Health
            </TabsTrigger>
            <TabsTrigger value="access" className="data-[state=active]:bg-white">
              <Users className="w-4 h-4 mr-2" />
              Access Control
            </TabsTrigger>
          </TabsList>

          <TabsContent value="api-keys">
            <APIKeyManager />
          </TabsContent>

          <TabsContent value="henri-ai">
            <HenriAIControl />
          </TabsContent>

          <TabsContent value="security">
            <SecurityAuditLog />
          </TabsContent>

          <TabsContent value="system">
            <SystemHealthMonitor />
          </TabsContent>

          <TabsContent value="access">
            <AccessControlMatrix />
          </TabsContent>
        </Tabs>

        {/* Emergency Controls */}
        <Card className="bg-red-900/20 border-red-500">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Emergency System Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="destructive" className="w-full">
              <Lock className="w-4 h-4 mr-2" />
              Lock All Systems
            </Button>
            <Button variant="destructive" className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Force Logout All
            </Button>
            <Button variant="destructive" className="w-full">
              <Key className="w-4 h-4 mr-2" />
              Revoke All Keys
            </Button>
            <Button variant="destructive" className="w-full">
              <AlertTriangle className="w-4 h-4 mr-2" />
              System Lockdown
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
