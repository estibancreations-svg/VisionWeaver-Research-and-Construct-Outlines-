Original name: MasterCodeManager.docx
Drive ID: 1Qpomu0CHgDPOsv3lV93sYCT_NZj0vhxp
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Components/it/
Modified: 2025-12-22T03:43:04.000Z

import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lock, Plus, AlertTriangle, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function MasterCodeManager({ user }) {
  const [showNewCodeDialog, setShowNewCodeDialog] = useState(false);
  const queryClient = useQueryClient();

  const [newCode, setNewCode] = useState({
    access_level: 'system_critical',
    code_type: 'one_time',
    valid_until: '',
    purpose: '',
    requires_biometric: true,
    requires_2fa: true
  });

  const { data: masterCodes = [] } = useQuery({
    queryKey: ['masterCodes'],
    queryFn: () => base44.entities.MasterAccessCode.list('-created_date')
  });

  const createCodeMutation = useMutation({
    mutationFn: async (data) => {
      const encryptedCode = `MAC-${Date.now()}-${Math.random().toString(36).substr(2, 16).toUpperCase()}`;
      return base44.entities.MasterAccessCode.create({
        code_id: `CODE-${Date.now()}`,
        encrypted_code: encryptedCode,
        authorized_users: [user.email],
        ...data
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['masterCodes'] });
      setShowNewCodeDialog(false);
      setNewCode({
        access_level: 'system_critical',
        code_type: 'one_time',
        valid_until: '',
        purpose: '',
        requires_biometric: true,
        requires_2fa: true
      });
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'used': return 'bg-gray-500';
      case 'expired': return 'bg-yellow-500';
      case 'revoked': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800/50 border-yellow-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-yellow-400" />
              Master Access Code Management
            </CardTitle>
            <Dialog open={showNewCodeDialog} onOpenChange={setShowNewCodeDialog}>
              <DialogTrigger asChild>
                <Button className="bg-yellow-600 hover:bg-yellow-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Generate Master Code
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 text-white border-gray-700">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    Generate Master Access Code
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="p-3 bg-red-900/20 border border-red-500 rounded">
                    <p className="text-sm text-red-400">
                      ⚠️ Master codes grant system-critical access. Only generate when absolutely necessary.
                    </p>
                  </div>
                  <div>
                    <Label>Access Level</Label>
                    <Select value={newCode.access_level} onValueChange={(v) => setNewCode({...newCode, access_level: v})}>
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="system_critical">System Critical</SelectItem>
                        <SelectItem value="henri_ai_control">Henri AI Control</SelectItem>
                        <SelectItem value="api_master_key">API Master Key</SelectItem>
                        <SelectItem value="database_admin">Database Admin</SelectItem>
                        <SelectItem value="security_override">Security Override</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Code Type</Label>
                    <Select value={newCode.code_type} onValueChange={(v) => setNewCode({...newCode, code_type: v})}>
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="one_time">One-Time Use</SelectItem>
                        <SelectItem value="temporary">Temporary (expires)</SelectItem>
                        <SelectItem value="permanent">Permanent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Valid Until</Label>
                    <Input
                      type="datetime-local"
                      value={newCode.valid_until}
                      onChange={(e) => setNewCode({...newCode, valid_until: e.target.value})}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  <div>
                    <Label>Purpose</Label>
                    <Input
                      placeholder="Why is this code needed?"
                      value={newCode.purpose}
                      onChange={(e) => setNewCode({...newCode, purpose: e.target.value})}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={newCode.requires_biometric}
                        onChange={(e) => setNewCode({...newCode, requires_biometric: e.target.checked})}
                      />
                      Require Biometric Verification
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={newCode.requires_2fa}
                        onChange={(e) => setNewCode({...newCode, requires_2fa: e.target.checked})}
                      />
                      Require 2FA Verification
                    </label>
                  </div>
                  <Button
                    className="w-full bg-yellow-600 hover:bg-yellow-700"
                    onClick={() => createCodeMutation.mutate(newCode)}
                    disabled={!newCode.purpose}
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Generate Master Code
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {masterCodes.map(code => (
              <Card key={code.id} className="bg-gray-900/50 border-gray-700">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getStatusColor(code.status)}>{code.status}</Badge>
                        <Badge variant="outline">{code.access_level.replace(/_/g, ' ').toUpperCase()}</Badge>
                        <Badge>{code.code_type}</Badge>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{code.purpose}</p>
                      <div className="flex gap-4 text-xs text-gray-500">
                        <span>Uses: {code.usage_count}/{code.max_uses}</span>
                        {code.valid_until && (
                          <span>Expires: {new Date(code.valid_until).toLocaleString()}</span>
                        )}
                      </div>
                      <div className="flex gap-2 mt-2">
                        {code.requires_biometric && <Badge className="bg-purple-600 text-xs">Biometric</Badge>}
                        {code.requires_2fa && <Badge className="bg-blue-600 text-xs">2FA</Badge>}
                      </div>
                    </div>
                    {code.status === 'active' ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : (
                      <Lock className="w-6 h-6 text-gray-500" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            {masterCodes.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Lock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No master access codes generated</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
