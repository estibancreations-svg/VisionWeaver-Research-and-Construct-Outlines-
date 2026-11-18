Original name: APIKeyManager.docx
Drive ID: 1ewfG6Vi3FUrM_etFEYH244_t-nkMg4NY
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Components/it/
Modified: 2025-12-19T17:26:00.000Z

import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Key, Plus, Trash2, Eye, EyeOff, Copy, CheckCircle } from "lucide-react";

export default function APIKeyManager() {
  const [showKey, setShowKey] = useState({});
  const [copied, setCopied] = useState({});
  const [newKey, setNewKey] = useState({
    name: '',
    service: '',
    environment: 'production'
  });

  const queryClient = useQueryClient();

  const { data: apiKeys = [] } = useQuery({
    queryKey: ['apiKeys'],
    queryFn: () => base44.entities.APIKey.list('-created_date')
  });

  const createKeyMutation = useMutation({
    mutationFn: (data) => base44.entities.APIKey.create({
      ...data,
      key_value: `sk_${data.environment}_${Math.random().toString(36).substr(2, 32)}`,
      status: 'active',
      last_used: null,
      requests_count: 0
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys'] });
      setNewKey({ name: '', service: '', environment: 'production' });
    }
  });

  const revokeKeyMutation = useMutation({
    mutationFn: (id) => base44.entities.APIKey.update(id, { status: 'revoked' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['apiKeys'] })
  });

  const copyToClipboard = (keyId, value) => {
    navigator.clipboard.writeText(value);
    setCopied({ ...copied, [keyId]: true });
    setTimeout(() => setCopied({ ...copied, [keyId]: false }), 2000);
  };

  const services = [
    'Fleet Management API',
    'Aviation Control API',
    'Emergency Dispatch API',
    'Training Hub API',
    'Analytics API',
    'Document Hub API',
    'Henri AI Agent API',
    'Accounting API',
    'Third-Party Integration'
  ];

  return (
    <div className="space-y-6">
      {/* Create New Key */}
      <Card className="bg-white/95">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Generate New API Key
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Key Name</Label>
              <Input 
                placeholder="Production Fleet API"
                value={newKey.name}
                onChange={(e) => setNewKey({ ...newKey, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Service/Module</Label>
              <Select value={newKey.service} onValueChange={(val) => setNewKey({ ...newKey, service: val })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map(service => (
                    <SelectItem key={service} value={service}>{service}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Environment</Label>
              <Select value={newKey.environment} onValueChange={(val) => setNewKey({ ...newKey, environment: val })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={() => createKeyMutation.mutate(newKey)}
            disabled={!newKey.name || !newKey.service || createKeyMutation.isPending}
          >
            <Key className="w-4 h-4 mr-2" />
            Generate Encrypted API Key
          </Button>
        </CardContent>
      </Card>

      {/* Existing Keys */}
      <Card className="bg-white/95">
        <CardHeader>
          <CardTitle>Active API Keys ({apiKeys.filter(k => k.status === 'active').length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {apiKeys.map(key => (
            <Card key={key.id} className={key.status === 'revoked' ? 'opacity-50' : ''}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <Key className="w-4 h-4 text-gray-500" />
                      <span className="font-semibold">{key.name}</span>
                      <Badge className={key.status === 'active' ? 'bg-green-500' : 'bg-red-500'}>
                        {key.status}
                      </Badge>
                      <Badge variant="outline">{key.environment}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{key.service}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono">
                        {showKey[key.id] ? key.key_value : '••••••••••••••••••••••••••••••••'}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowKey({ ...showKey, [key.id]: !showKey[key.id] })}
                      >
                        {showKey[key.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(key.id, key.key_value)}
                      >
                        {copied[key.id] ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                      <span>Requests: {key.requests_count || 0}</span>
                      <span>Last Used: {key.last_used ? new Date(key.last_used).toLocaleString() : 'Never'}</span>
                      <span>Created: {new Date(key.created_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {key.status === 'active' && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => revokeKeyMutation.mutate(key.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          {apiKeys.length === 0 && (
            <p className="text-center text-gray-500 py-8">No API keys generated yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
