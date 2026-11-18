Original name: DocumentUpload.docx
Drive ID: 1mBLFGPtwVNlVK1V67neUxU-mJSSDAC0i
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Components/docs/
Modified: 2025-12-19T17:07:15.000Z

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";

export default function DocumentUpload({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'other',
    entity_type: 'none',
    entity_id: '',
    description: '',
    expiry_date: '',
    tags: '',
    file: null
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, file, title: prev.title || file.name }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    };
    onSubmit?.(submitData);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Document
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>File *</Label>
            <Input 
              type="file"
              onChange={handleFileChange}
              required
            />
          </div>

          <div>
            <Label>Title *</Label>
            <Input 
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Category *</Label>
              <Select value={formData.category} onValueChange={(v) => setFormData(prev => ({ ...prev, category: v }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="registration">Registration</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                  <SelectItem value="license">License</SelectItem>
                  <SelectItem value="certification">Certification</SelectItem>
                  <SelectItem value="maintenance_record">Maintenance Record</SelectItem>
                  <SelectItem value="invoice">Invoice</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="permit">Permit</SelectItem>
                  <SelectItem value="inspection">Inspection</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Expiry Date</Label>
              <Input 
                type="date"
                value={formData.expiry_date}
                onChange={(e) => setFormData(prev => ({ ...prev, expiry_date: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Associate with</Label>
              <Select value={formData.entity_type} onValueChange={(v) => setFormData(prev => ({ ...prev, entity_type: v }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="truck">Truck</SelectItem>
                  <SelectItem value="driver">Driver</SelectItem>
                  <SelectItem value="aviation_asset">Aviation Asset</SelectItem>
                  <SelectItem value="insurance_provider">Insurance Provider</SelectItem>
                  <SelectItem value="fleet">Fleet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.entity_type !== 'none' && (
              <div>
                <Label>{formData.entity_type} ID</Label>
                <Input 
                  value={formData.entity_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, entity_id: e.target.value }))}
                  placeholder="Enter ID"
                />
              </div>
            )}
          </div>

          <div>
            <Label>Description</Label>
            <Textarea 
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div>
            <Label>Tags (comma separated)</Label>
            <Input 
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="important, urgent, annual"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Upload Document
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
