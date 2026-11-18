Original name: AITrainingAssistant.docx
Drive ID: 1Tj80x2fymH4ZpjJAnK6CkoorT9i0xl5_
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Components/training/
Modified: 2025-12-22T04:01:58.000Z

import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Send, Loader2, User, Bot } from "lucide-react";

export default function AITrainingAssistant({ moduleId, moduleName }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `👋 Hi! I'm your AI Training Assistant for ${moduleName}. I know this system inside and out! Ask me anything about how to use this module, or I can guide you step-by-step through any task. How can I help you today?`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are an expert training assistant for the MOTIVE NEXT platform, specifically for the ${moduleName} module.

Your role is to:
- Guide users step-by-step through tasks
- Explain features clearly and concisely
- Provide hands-on instructions
- Answer questions about the system
- Encourage and motivate learners
- Reference specific UI elements and buttons

Current module: ${moduleId}

User question: ${userMessage}

Provide a helpful, encouraging, and specific response. If they're asking how to do something, give clear step-by-step instructions. Keep it conversational and friendly.`,
        response_json_schema: {
          type: "object",
          properties: {
            response: { type: "string" },
            next_steps: { 
              type: "array", 
              items: { type: "string" },
              description: "Optional list of 2-3 suggested next steps"
            }
          }
        }
      });

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.response,
        nextSteps: response.next_steps 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble connecting right now. Please try again!" 
      }]);
    }
    
    setLoading(false);
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="p-4 border-b bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="flex items-center gap-2 text-white">
          <Sparkles className="w-5 h-5" />
          <div>
            <p className="font-semibold">AI Training Assistant</p>
            <p className="text-xs opacity-90">Your personal guide through {moduleName}</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-first' : ''}`}>
                <div className={`p-3 rounded-lg ${
                  msg.role === 'user' 
                    ? 'bg-blue-500 text-white ml-auto' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
                {msg.nextSteps && msg.nextSteps.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <p className="text-xs font-semibold text-gray-600">Suggested next steps:</p>
                    {msg.nextSteps.map((step, i) => (
                      <Badge key={i} variant="outline" className="mr-1 text-xs">
                        {i + 1}. {step}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Ask me anything about this module..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            disabled={loading}
          />
          <Button onClick={sendMessage} disabled={loading || !input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">💡 Try: "Walk me through adding my first truck"</p>
      </div>
    </Card>
  );
}
