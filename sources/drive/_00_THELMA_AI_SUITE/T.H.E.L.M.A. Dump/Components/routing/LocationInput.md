Original name: LocationInput.docx
Drive ID: 1_6IZmOyHI-FewXg82PAJ91aov88gOaj2
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Components/routing/
Modified: 2025-12-22T03:47:03.000Z

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Navigation } from "lucide-react";

export default function LocationInput({ origin, destination, onOriginChange, onDestinationChange }) {
  const handleOriginChange = (field, value) => {
    onOriginChange({ ...origin, [field]: value });
  };

  const handleDestinationChange = (field, value) => {
    onDestinationChange({ ...destination, [field]: value });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Navigation className="w-5 h-5" />
          Route Points
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Origin */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-green-700">
            <MapPin className="w-4 h-4" />
            Origin (Pickup)
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              placeholder="Street Address"
              value={origin?.address || ''}
              onChange={(e) => handleOriginChange('address', e.target.value)}
            />
            <Input
              placeholder="City"
              value={origin?.city || ''}
              onChange={(e) => handleOriginChange('city', e.target.value)}
            />
            <Input
              placeholder="State"
              value={origin?.state || ''}
              onChange={(e) => handleOriginChange('state', e.target.value)}
            />
            <Input
              placeholder="ZIP Code"
              value={origin?.zip || ''}
              onChange={(e) => handleOriginChange('zip', e.target.value)}
            />
          </div>
        </div>

        {/* Destination */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-red-700">
            <MapPin className="w-4 h-4" />
            Destination (Delivery)
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              placeholder="Street Address"
              value={destination?.address || ''}
              onChange={(e) => handleDestinationChange('address', e.target.value)}
            />
            <Input
              placeholder="City"
              value={destination?.city || ''}
              onChange={(e) => handleDestinationChange('city', e.target.value)}
            />
            <Input
              placeholder="State"
              value={destination?.state || ''}
              onChange={(e) => handleDestinationChange('state', e.target.value)}
            />
            <Input
              placeholder="ZIP Code"
              value={destination?.zip || ''}
              onChange={(e) => handleDestinationChange('zip', e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
