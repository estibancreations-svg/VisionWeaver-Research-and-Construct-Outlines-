Original name: TruckForm.docx
Drive ID: 1FXJ7zpEvF7KNFidYAZdHKINNgwt7ep_c
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Components/team/
Modified: 2025-12-22T03:51:09.000Z

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Truck } from "lucide-react";

export default function TruckForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    unit_number: '',
    type: 'semi',
    make: '',
    model: '',
    year: new Date().getFullYear(),
    vin: '',
    license_plate: '',
    license_state: '',
    status: 'active',
    max_weight_lbs: '',
    height_inches: '',
    length_feet: '',
    hazmat_certified: false,
    fuel_type: 'diesel',
    mpg_average: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      max_weight_lbs: parseFloat(formData.max_weight_lbs) || 0,
      height_inches: parseFloat(formData.height_inches) || 0,
      length_feet: parseFloat(formData.length_feet) || 0,
      mpg_average: parseFloat(formData.mpg_average) || 0,
      year: parseInt(formData.year) || new Date().getFullYear()
    };
    
    onSubmit?.(submitData);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5" />
            Add Equipment
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Unit Number *</Label>
              <Input 
                value={formData.unit_number}
                onChange={(e) => handleChange('unit_number', e.target.value)}
                placeholder="TRUCK-001"
                required
              />
            </div>
            <div>
              <Label>Type *</Label>
              <Select value={formData.type} onValueChange={(v) => handleChange('type', v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semi">Semi Truck</SelectItem>
                  <SelectItem value="box_truck">Box Truck</SelectItem>
                  <SelectItem value="flatbed">Flatbed</SelectItem>
                  <SelectItem value="tanker">Tanker</SelectItem>
                  <SelectItem value="reefer">Reefer</SelectItem>
                  <SelectItem value="car_hauler">Car Hauler</SelectItem>
                  <SelectItem value="personal_vehicle">Personal Vehicle</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Make</Label>
              <Input 
                value={formData.make}
                onChange={(e) => handleChange('make', e.target.value)}
                placeholder="Freightliner"
              />
            </div>
            <div>
              <Label>Model</Label>
              <Input 
                value={formData.model}
                onChange={(e) => handleChange('model', e.target.value)}
                placeholder="Cascadia"
              />
            </div>
            <div>
              <Label>Year</Label>
              <Input 
                type="number"
                value={formData.year}
                onChange={(e) => handleChange('year', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>VIN (Vehicle Identification Number) *</Label>
            <Input 
              value={formData.vin}
              onChange={(e) => handleChange('vin', e.target.value)}
              placeholder="1HGBH41JXMN109186"
              maxLength={17}
              required
            />
            <p className="text-xs text-gray-500 mt-1">17-character VIN for tracking and identification</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>License Plate</Label>
              <Input 
                value={formData.license_plate}
                onChange={(e) => handleChange('license_plate', e.target.value)}
              />
            </div>
            <div>
              <Label>License State</Label>
              <Input 
                value={formData.license_state}
                onChange={(e) => handleChange('license_state', e.target.value)}
                placeholder="CA"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Max Weight (lbs)</Label>
              <Input 
                type="number"
                value={formData.max_weight_lbs}
                onChange={(e) => handleChange('max_weight_lbs', e.target.value)}
                placeholder="80000"
              />
            </div>
            <div>
              <Label>Height (inches)</Label>
              <Input 
                type="number"
                value={formData.height_inches}
                onChange={(e) => handleChange('height_inches', e.target.value)}
                placeholder="162"
              />
            </div>
            <div>
              <Label>Length (feet)</Label>
              <Input 
                type="number"
                value={formData.length_feet}
                onChange={(e) => handleChange('length_feet', e.target.value)}
                placeholder="53"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Fuel Type</Label>
              <Select value={formData.fuel_type} onValueChange={(v) => handleChange('fuel_type', v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="gasoline">Gasoline</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Average MPG</Label>
              <Input 
                type="number"
                step="0.1"
                value={formData.mpg_average}
                onChange={(e) => handleChange('mpg_average', e.target.value)}
                placeholder="6.5"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <Label>Hazmat Certified</Label>
              <p className="text-xs text-gray-500">Can transport hazardous materials</p>
            </div>
            <Switch 
              checked={formData.hazmat_certified}
              onCheckedChange={(v) => handleChange('hazmat_certified', v)}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Add Equipment
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
