Original name: HenryAiConsole.docx
Drive ID: 17UHsESCDrqe41LYO5XqjGdzX4RpQZvD0
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Components/it/
Modified: 2025-12-19T17:28:30.000Z

import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, Terminal, CheckCircle, XCircle } from "lucide-react";

export default function HenriAIConsole({ user }) {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', message: 'Henri AI Managing Agent Console v2.0 - Ready', timestamp: new Date() },
    { type: 'system', message: `Authenticated as: ${user?.email}`, timestamp: new Date() },
    { type: 'system', message: 'Clearance Level: ARCHITECT', timestamp: new Date() }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const executeCommand = async () => {
    if (!command.trim()) return;

    const userCommand = { type: 'user', message: command, timestamp: new Date() };
    setHistory([...history, userCommand]);
    setIsProcessing(true);

    try {
      // Simulate Henri AI processing
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are Henri AI, the master managing agent for MOTIVE NEXT system. 
        The user (${user?.email}) with ARCHITECT clearance has issued this command:
        "${command}"
        
        Respond as Henri AI would - acknowledging the command, explaining what actions will be taken,
        and requesting any necessary confirmations for system-critical operations.`,
        response_json_schema: {
          type: "object",
          properties: {
            response: { type: "string" },
            requires_confirmation: { type: "boolean" },
            risk_level: { type: "string", enum: ["low", "medium", "high", "critical"] },
            actions: { type: "array", items: { type: "string" } }
          }
        }
      });

      const aiResponse = {
        type: 'ai',
        message: response.response,
        requires_confirmation: response.requires_confirmation,
        risk_level: response.risk_level,
        actions: response.actions,
        timestamp: new Date()
      };

      setHistory(prev => [...prev, aiResponse]);

      // Log security audit
      await base44.entities.SecurityAudit.create({
        audit_id: `AUDIT-${Date.now()}`,
        action_type: 'henri_ai_command',
        performed_by: user.email,
        target_entity: 'henri_ai_managing_agent',
        action_details: { command, response: response.response },
        ip_address: 'N/A',
        success: true,
        risk_level: response.risk_level,
        clearance_level_verified: 'ARCHITECT'
      });

    } catch (error) {
      setHistory(prev => [...prev, {
        type: 'error',
        message: `Error: ${error.message}`,
        timestamp: new Date()
      }]);
    }

    setCommand('');
    setIsProcessing(false);
  };

  return (
    <Card className="bg-gray-800/50 border-purple-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Bot className="w-5 h-5 text-purple-400" />
          Henri AI - Master Managing Agent Console
          <Badge className="bg-purple-600 ml-2">ONLINE</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Console Output */}
          <ScrollArea className="h-96 bg-gray-900 rounded p-4 font-mono text-sm">
            <div className="space-y-2">
              {history.map((entry, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-gray-500 text-xs">
                    {entry.timestamp.toLocaleTimeString()}
                  </span>
                  {entry.type === 'system' && (
                    <p className="text-blue-400">[SYSTEM] {entry.message}</p>
                  )}
                  {entry.type === 'user' && (
                    <p className="text-green-400">[USER] {entry.message}</p>
                  )}
                  {entry.type === 'ai' && (
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-purple-400">[HENRI AI]</p>
                        {entry.requires_confirmation && (
                          <Badge className="bg-yellow-600">REQUIRES CONFIRMATION</Badge>
                        )}
                        <Badge className={
                          entry.risk_level === 'critical' ? 'bg-red-600' :
                          entry.risk_level === 'high' ? 'bg-orange-600' :
                          entry.risk_level === 'medium' ? 'bg-yellow-600' :
                          'bg-green-600'
                        }>
                          {entry.risk_level?.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-gray-300 ml-4">{entry.message}</p>
                      {entry.actions && entry.actions.length > 0 && (
                        <div className="ml-4 mt-2">
                          <p className="text-gray-400 text-xs">Actions:</p>
                          <ul className="list-disc list-inside text-gray-400 text-xs">
                            {entry.actions.map((action, i) => (
                              <li key={i}>{action}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  {entry.type === 'error' && (
                    <p className="text-red-400">[ERROR] {entry.message}</p>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Command Input */}
          <div className="flex gap-2">
            <Terminal className="w-5 h-5 text-gray-400 mt-2" />
            <Textarea
              placeholder="Enter Henri AI command (e.g., 'Generate weekly fleet report', 'Rotate all API keys', 'Check system health')..."
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  executeCommand();
                }
              }}
              className="flex-1 bg-gray-900 border-gray-700 text-white font-mono"
              rows={2}
            />
            <Button
              onClick={executeCommand}
              disabled={isProcessing || !command.trim()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isProcessing ? (
                <>Processing...</>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Execute
                </>
              )}
            </Button>
          </div>

          {/* Quick Commands */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCommand('Check system health status')}
              className="border-gray-600 text-gray-300"
            >
              System Health
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCommand('Generate fleet operations summary')}
              className="border-gray-600 text-gray-300"
            >
              Fleet Summary
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCommand('List pending security alerts')}
              className="border-gray-600 text-gray-300"
            >
              Security Alerts
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCommand('Check training completion rates')}
              className="border-gray-600 text-gray-300"
            >
              Training Stats
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
