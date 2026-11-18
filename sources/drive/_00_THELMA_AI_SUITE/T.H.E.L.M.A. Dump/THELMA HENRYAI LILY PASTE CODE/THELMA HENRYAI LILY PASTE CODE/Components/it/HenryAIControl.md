Original name: HenryAIControl.docx
Drive ID: 1fwkqSaW2PrfoCgyNPDF8Ei40d1o0a8Es
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Components/it/
Modified: 2025-12-22T03:42:03.000Z

import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Play, Pause, RefreshCw, Settings, Activity, AlertTriangle } from "lucide-react";

export default function HenriAIControl() {
  const [systemCommand, setSystemCommand] = useState('');
  const [commandResult, setCommandResult] = useState(null);
  const queryClient = useQueryClient();

  const executeCommandMutation = useMutation({
    mutationFn: async (command) => {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `You are Henri AI, the Master Managing Agent for MOTIVE NEXT.
        
Execute this system command with Architect-level permissions:
${command}

Analyze the request and provide:
1. Action to be taken
2. Security validation
3. Impact assessment
4. Execution plan

If this is a system-altering change, confirm it requires Architect authorization.`,
        response_json_schema: {
          type: "object",
          properties: {
            action: { type: "string" },
            security_check: { type: "string" },
            impact: { type: "string" },
            requires_authorization: { type: "boolean" },
            execution_steps: { type: "array", items: { type: "string" } },
            risk_level: { type: "string", enum: ["low", "medium", "high", "critical"] }
          }
        }
      });
      return result;
    },
    onSuccess: (data) => {
      setCommandResult(data);
      setSystemCommand('');
    }
  });

  const agents = [
    { name: 'Henri AI', status: 'active', role: 'Master Managing Agent', load: 23 },
    { name: 'Fleet Operations', status: 'active', role: 'Fleet Management', load: 45 },
    { name: 'Emergency Dispatch', status: 'active', role: 'Emergency Response', load: 12 },
    { name: 'Training Assistant', status: 'active', role: 'Training & Education', load: 67 },
    { name: 'Analytics Agent', status: 'active', role: 'Data Analysis', load: 34 },
    { name: 'HR Admin Agent', status: 'active', role: 'Human Resources', load: 28 },
    { name: 'Accounting Agent', status: 'active', role: 'Financial Operations', load: 56 }
  ];

  return (
    <div className="space-y-6">
      {/* Henri AI Status */}
      <Card className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Brain className="w-6 h-6" />
            Henri AI Master Control
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-sm text-blue-200">Status</p>
              <p className="text-xl font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-400" />
                Online
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-sm text-blue-200">Uptime</p>
              <p className="text-xl font-bold text-white">99.9%</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-sm text-blue-200">Managed Agents</p>
              <p className="text-xl font-bold text-white">6</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-sm text-blue-200">Active Tasks</p>
              <p className="text-xl font-bold text-white">142</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Command Interface */}
      <Card className="bg-white/95">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Architect Command Console
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter system command for Henri AI to execute (requires Architect authorization)..."
            value={systemCommand}
            onChange={(e) => setSystemCommand(e.target.value)}
            className="min-h-32 font-mono"
          />
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700"
            onClick={() => executeCommandMutation.mutate(systemCommand)}
            disabled={!systemCommand || executeCommandMutation.isPending}
          >
            <Play className="w-4 h-4 mr-2" />
            Execute Command
          </Button>

          {commandResult && (
            <Card className={`${commandResult.risk_level === 'critical' ? 'border-red-500' : 'border-blue-500'}`}>
              <CardContent className="pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Command Analysis</h3>
                  <Badge className={
                    commandResult.risk_level === 'critical' ? 'bg-red-500' :
                    commandResult.risk_level === 'high' ? 'bg-orange-500' :
                    commandResult.risk_level === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }>
                    {commandResult.risk_level} Risk
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Action:</span>
                    <p className="text-gray-700">{commandResult.action}</p>
                  </div>
                  <div>
                    <span className="font-medium">Security Check:</span>
                    <p className="text-gray-700">{commandResult.security_check}</p>
                  </div>
                  <div>
                    <span className="font-medium">Impact Assessment:</span>
                    <p className="text-gray-700">{commandResult.impact}</p>
                  </div>
                  {commandResult.requires_authorization && (
                    <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm text-yellow-800">Architect Authorization Required</span>
                    </div>
                  )}
                  {commandResult.execution_steps && (
                    <div>
                      <span className="font-medium">Execution Steps:</span>
                      <ul className="list-disc list-inside text-gray-700 ml-2">
                        {commandResult.execution_steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Agent Fleet Status */}
      <Card className="bg-white/95">
        <CardHeader>
          <CardTitle>AI Agent Fleet Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {agents.map(agent => (
            <div key={agent.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Brain className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="font-medium">{agent.name}</p>
                  <p className="text-sm text-gray-600">{agent.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Load</p>
                  <p className="font-semibold">{agent.load}%</p>
                </div>
                <Badge className="bg-green-500">
                  {agent.status}
                </Badge>
                <Button size="sm" variant="outline">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
