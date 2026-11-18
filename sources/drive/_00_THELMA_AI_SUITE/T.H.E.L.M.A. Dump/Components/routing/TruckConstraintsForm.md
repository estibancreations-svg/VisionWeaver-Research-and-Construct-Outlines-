Original name: TruckConstraintsForm.docx
Drive ID: 19LxDlhvPQ_nNWMq_RP1y8VvPjz4ieMmw
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Components/routing/
Modified: 2025-12-22T03:48:40.000Z

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck, Scale, Ruler, AlertTriangle } from "lucide-react";

export default function TruckConstraintsForm({ constraints, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...constraints, [field]: value });
  };

  const hazmatClasses = [
    { value: '1', label: 'Class 1 - Explosives' },
    { value: '2', label: 'Class 2 - Gases' },
    { value: '3', label: 'Class 3 - Flammable Liquids' },
    { value: '4', label: 'Class 4 - Flammable Solids' },
    { value: '5', label: 'Class 5 - Oxidizers' },
    { value: '6', label: 'Class 6 - Toxic/Infectious' },
    { value: '7', label: 'Class 7 - Radioactive' },
    { value: '8', label: 'Class 8 - Corrosives' },
    { value: '9', label: 'Class 9 - Miscellaneous' }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Truck className="w-5 h-5" />
          Truck Constraints
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Scale className="w-4 h-4" />
              Weight (lbs)
            </Label>
            <Input
              type="number"
              placeholder="80,000"
              value={constraints?.weight_lbs || ''}
              onChange={(e) => handleChange('weight_lbs', Number(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Ruler className="w-4 h-4" />
              Height (inches)
            </Label>
            <Input
              type="number"
              placeholder="162"
              value={constraints?.height_inches || ''}
              onChange={(e) => handleChange('height_inches', Number(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Ruler className="w-4 h-4" />
              Length (feet)
            </Label>
            <Input
              type="number"
              placeholder="53"
              value={constraints?.length_feet || ''}
              onChange={(e) => handleChange('length_feet', Number(e.target.value))}
            />
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <Label htmlFor="hazmat" className="font-medium">Hazardous Materials</Label>
            </div>
            <Switch
              id="hazmat"
              checked={constraints?.hazmat || false}
              onCheckedChange={(checked) => handleChange('hazmat', checked)}
            />
          </div>
          
          {constraints?.hazmat && (
            <Select
              value={constraints?.hazmat_class || ''}
              onValueChange={(value) => handleChange('hazmat_class', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select hazmat class" />
              </SelectTrigger>
              <SelectContent>
                {hazmatClasses.map((cls) => (
                  <SelectItem key={cls.value} value={cls.value}>
                    {cls.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
