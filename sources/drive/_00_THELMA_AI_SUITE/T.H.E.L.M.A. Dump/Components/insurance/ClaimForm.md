Original name: ClaimForm.docx
Drive ID: 1-bK_8LlCuozXgiNVWE0c9w3-8dw9V8Dc
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Components/insurance/
Modified: 2025-12-19T17:24:34.000Z

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText } from "lucide-react";

export default function ClaimForm({ providers, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    provider_id: '',
    policy_number: '',
    incident_date: '',
    incident_description: '',
    estimated_damage: '',
    claimant_name: '',
    claimant_contact: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
            <FileText className="w-5 h-5" />
            New Insurance Claim
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Insurance Provider</Label>
              <Select value={formData.provider_id} onValueChange={(v) => handleChange('provider_id', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  {providers.map(p => (
                    <SelectItem key={p.id} value={p.id}>{p.provider_name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Policy Number</Label>
              <Input 
                value={formData.policy_number}
                onChange={(e) => handleChange('policy_number', e.target.value)}
                placeholder="Enter policy number"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Claimant Name</Label>
              <Input 
                value={formData.claimant_name}
                onChange={(e) => handleChange('claimant_name', e.target.value)}
              />
            </div>
            <div>
              <Label>Contact</Label>
              <Input 
                value={formData.claimant_contact}
                onChange={(e) => handleChange('claimant_contact', e.target.value)}
                placeholder="Phone or email"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Incident Date</Label>
              <Input 
                type="date"
                value={formData.incident_date}
                onChange={(e) => handleChange('incident_date', e.target.value)}
              />
            </div>
            <div>
              <Label>Estimated Damage ($)</Label>
              <Input 
                type="number"
                value={formData.estimated_damage}
                onChange={(e) => handleChange('estimated_damage', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Incident Description</Label>
            <Textarea 
              value={formData.incident_description}
              onChange={(e) => handleChange('incident_description', e.target.value)}
              placeholder="Describe what happened..."
              rows={4}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-amber-600 hover:bg-amber-700">
              Submit Claim
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
