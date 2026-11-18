Original name: IncidentForm.docx
Drive ID: 1JA-Pki6yisQXZP4Rde8u4uUMe8mP9hwR
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Components/emergency/
Modified: 2025-12-19T17:21:19.000Z

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { AlertTriangle } from "lucide-react";

export default function IncidentForm({ incident, onClose, onSubmit }) {
  const [formData, setFormData] = useState(incident || {
    dispatch_id: `INC-${Date.now()}`,
    incident_type: 'medical',
    priority: 'medium',
    status: 'pending',
    dispatch_mode: 'land',
    caller_info: { name: '', phone: '', email: '' },
    location: { address: '', city: '', state: '', lat: 0, lng: 0 },
    incident_details: '',
    injuries_reported: false,
    vehicles_involved: 0,
    local_ems_notified: false
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            {incident ? 'Manage Incident' : 'Report New Incident'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Incident Type</Label>
              <Select value={formData.incident_type} onValueChange={(v) => handleChange('incident_type', v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="fire">Fire</SelectItem>
                  <SelectItem value="police">Police</SelectItem>
                  <SelectItem value="hazmat">Hazmat</SelectItem>
                  <SelectItem value="roadside">Roadside</SelectItem>
                  <SelectItem value="weather">Weather</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Priority</Label>
              <Select value={formData.priority} onValueChange={(v) => handleChange('priority', v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Dispatch Mode</Label>
              <Select value={formData.dispatch_mode} onValueChange={(v) => handleChange('dispatch_mode', v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="land">Land</SelectItem>
                  <SelectItem value="air">Air</SelectItem>
                  <SelectItem value="water">Water</SelectItem>
                  <SelectItem value="multi_modal">Multi-Modal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {incident && (
              <div>
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(v) => handleChange('status', v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="dispatched">Dispatched</SelectItem>
                    <SelectItem value="en_route">En Route</SelectItem>
                    <SelectItem value="on_scene">On Scene</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Caller Information</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input 
                placeholder="Name"
                value={formData.caller_info?.name || ''}
                onChange={(e) => handleNestedChange('caller_info', 'name', e.target.value)}
              />
              <Input 
                placeholder="Phone"
                value={formData.caller_info?.phone || ''}
                onChange={(e) => handleNestedChange('caller_info', 'phone', e.target.value)}
              />
              <Input 
                type="email"
                placeholder="Email"
                value={formData.caller_info?.email || ''}
                onChange={(e) => handleNestedChange('caller_info', 'email', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Location</Label>
            <Input 
              placeholder="Address"
              value={formData.location?.address || ''}
              onChange={(e) => handleNestedChange('location', 'address', e.target.value)}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Input 
                placeholder="City"
                value={formData.location?.city || ''}
                onChange={(e) => handleNestedChange('location', 'city', e.target.value)}
              />
              <Input 
                placeholder="State"
                value={formData.location?.state || ''}
                onChange={(e) => handleNestedChange('location', 'state', e.target.value)}
              />
              <Input 
                type="number"
                placeholder="Vehicles Involved"
                value={formData.vehicles_involved}
                onChange={(e) => handleChange('vehicles_involved', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <div>
            <Label>Incident Details</Label>
            <Textarea 
              value={formData.incident_details}
              onChange={(e) => handleChange('incident_details', e.target.value)}
              placeholder="Describe the incident..."
              rows={3}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center justify-between flex-1 p-3 bg-gray-50 rounded-lg">
              <Label>Injuries Reported</Label>
              <Switch 
                checked={formData.injuries_reported}
                onCheckedChange={(v) => handleChange('injuries_reported', v)}
              />
            </div>
            <div className="flex items-center justify-between flex-1 p-3 bg-gray-50 rounded-lg">
              <Label>EMS Notified</Label>
              <Switch 
                checked={formData.local_ems_notified}
                onCheckedChange={(v) => handleChange('local_ems_notified', v)}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700">
              {incident ? 'Update Incident' : 'Report Incident'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
