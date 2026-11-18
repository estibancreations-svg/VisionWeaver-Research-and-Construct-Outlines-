Original name: MessagingPanel.docx
Drive ID: 1GP_hR_qtwe3NBgxvDyO8bmt1dadaGm4z
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Components/shared/
Modified: 2025-12-22T03:49:59.000Z

import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, AlertTriangle } from "lucide-react";
import { format } from 'date-fns';

export default function MessagingPanel({ userEmail, conversationId }) {
  const [newMessage, setNewMessage] = useState('');
  const queryClient = useQueryClient();

  const { data: messages = [] } = useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => base44.entities.Message.filter({ conversation_id: conversationId }, 'created_date'),
    refetchInterval: 5000 // Poll every 5 seconds
  });

  const sendMessageMutation = useMutation({
    mutationFn: (data) => base44.entities.Message.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
      setNewMessage('');
    }
  });

  const markAsReadMutation = useMutation({
    mutationFn: ({ id }) => base44.entities.Message.update(id, { read: true, read_at: new Date().toISOString() }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
    }
  });

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    sendMessageMutation.mutate({
      message_id: `MSG-${Date.now()}`,
      conversation_id: conversationId,
      from_email: userEmail,
      to_email: 'dispatch@motivenext.com', // Default recipient
      content: newMessage,
      message_type: 'text',
      priority: 'normal'
    });
  };

  return (
    <Card className="flex flex-col h-[400px] md:h-[500px]">
      <CardHeader className="pb-3 flex-shrink-0">
        <CardTitle className="text-base md:text-lg flex items-center gap-2">
          <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
          Communications
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-3 py-4">
            {messages.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-sm">
                <MessageCircle className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-2 text-gray-300" />
                <p>No messages yet</p>
              </div>
            ) : (
              messages.map((msg) => {
                const isOwn = msg.from_email === userEmail;
                const needsRead = !msg.read && msg.to_email === userEmail;

                if (needsRead) {
                  markAsReadMutation.mutate({ id: msg.id });
                }

                return (
                  <div
                    key={msg.id}
                    className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] md:max-w-[70%] rounded-lg p-3 ${
                        isOwn ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-xs font-medium">{msg.from_name || msg.from_email}</p>
                        {msg.priority === 'critical' && (
                          <Badge className="bg-red-600 text-white text-xs">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Critical
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${isOwn ? 'text-blue-200' : 'text-gray-500'}`}>
                        {format(new Date(msg.created_date), 'h:mm a')}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>

        <div className="flex-shrink-0 border-t p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="text-sm"
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()} size="sm">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
