Original name: AssetFormModal.docx
Drive ID: 1f-WsqjMVA3hmBV05c6vlLGHPdI9iGMDA
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Components/aviation/
Modified: 2025-12-19T16:51:53.000Z

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plane } from "lucide-react";

export default function AssetFormModal({ open, onClose, asset, onSave }) {
  const [formData, setFormData] = useState(asset || {
    asset_id: `AVN-${Date.now()}`,
    asset_type: 'drone',
    registration_number: '',
    make: '',
    model: '',
    status: 'available',
    capabilities: [],
    max_payload_lbs: 0,
    max_range_miles: 0,
    max_flight_time_hours: 0,
    current_location: { base_name: '', lat: 0, lng: 0 },
    pilot_email: '',
    faa_compliance: {
      part_107_certified: false,
      airworthiness_cert: false,
      last_inspection: '',
      next_inspection_due: ''
    }
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
    onSave?.(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plane className="w-5 h-5" />
            {asset ? 'Edit Aviation Asset' : 'Add Aviation Asset'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Asset Type</Label>
              <Select value={formData.asset_type} onValueChange={(v) => handleChange('asset_type', v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="drone">Drone</SelectItem>
                  <SelectItem value="helicopter">Helicopter</SelectItem>
                  <SelectItem value="fixed_wing">Fixed Wing</SelectItem>
                  <SelectItem value="cargo_aircraft">Cargo Aircraft</SelectItem>
                  <SelectItem value="medevac">Medevac</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Registration Number</Label>
              <Input 
                value={formData.registration_number}
                onChange={(e) => handleChange('registration_number', e.target.value)}
                placeholder="FAA N-number or Serial"
              />
            </div>
            <div>
              <Label>Make</Label>
              <Input 
                value={formData.make}
                onChange={(e) => handleChange('make', e.target.value)}
                placeholder="DJI, Bell, Cessna..."
              />
            </div>
            <div>
              <Label>Model</Label>
              <Input 
                value={formData.model}
                onChange={(e) => handleChange('model', e.target.value)}
                placeholder="Mavic 3, 407, 172..."
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Max Payload (lbs)</Label>
              <Input 
                type="number"
                value={formData.max_payload_lbs}
                onChange={(e) => handleChange('max_payload_lbs', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <Label>Max Range (miles)</Label>
              <Input 
                type="number"
                value={formData.max_range_miles}
                onChange={(e) => handleChange('max_range_miles', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <Label>Max Flight Time (hours)</Label>
              <Input 
                type="number"
                step="0.5"
                value={formData.max_flight_time_hours}
                onChange={(e) => handleChange('max_flight_time_hours', parseFloat(e.target.value))}
              />
            </div>
          </div>

          <div>
            <Label>Base Location</Label>
            <Input 
              value={formData.current_location?.base_name || ''}
              onChange={(e) => handleNestedChange('current_location', 'base_name', e.target.value)}
              placeholder="Home base name"
            />
          </div>

          <div>
            <Label>Assigned Pilot Email</Label>
            <Input 
              type="email"
              value={formData.pilot_email}
              onChange={(e) => handleChange('pilot_email', e.target.value)}
            />
          </div>

          {/* FAA Compliance */}
          <div className="p-4 bg-gray-50 rounded-lg space-y-3">
            <h4 className="font-medium">FAA Compliance</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label>Part 107 Certified</Label>
                <Switch 
                  checked={formData.faa_compliance?.part_107_certified}
                  onCheckedChange={(v) => handleNestedChange('faa_compliance', 'part_107_certified', v)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Airworthiness Cert</Label>
                <Switch 
                  checked={formData.faa_compliance?.airworthiness_cert}
                  onCheckedChange={(v) => handleNestedChange('faa_compliance', 'airworthiness_cert', v)}
                />
              </div>
              <div>
                <Label>Last Inspection</Label>
                <Input 
                  type="date"
                  value={formData.faa_compliance?.last_inspection || ''}
                  onChange={(e) => handleNestedChange('faa_compliance', 'last_inspection', e.target.value)}
                />
              </div>
              <div>
                <Label>Next Inspection Due</Label>
                <Input 
                  type="date"
                  value={formData.faa_compliance?.next_inspection_due || ''}
                  onChange={(e) => handleNestedChange('faa_compliance', 'next_inspection_due', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              {asset ? 'Update Asset' : 'Add Asset'}
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
