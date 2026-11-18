Original name: FlightPlanForm.docx
Drive ID: 1ja4RTHfER-mcc8icK9dj93HLeAkWSw2E
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Components/aviation/
Modified: 2025-12-19T16:53:17.000Z

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plane, MapPin, AlertTriangle } from "lucide-react";

export default function FlightPlanForm({ asset, onSubmit, onCancel }) {
  const [flightPlan, setFlightPlan] = useState({
    departure_location: '',
    departure_lat: '',
    departure_lng: '',
    destination_location: '',
    destination_lat: '',
    destination_lng: '',
    altitude_feet: 400,
    mission_type: 'cargo',
    payload_lbs: 0,
    estimated_duration_hours: 1,
    departure_time: '',
    notes: ''
  });

  const handleChange = (field, value) => {
    setFlightPlan(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ ...flightPlan, asset_id: asset?.asset_id });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plane className="w-5 h-5" />
          Flight Plan - {asset?.make} {asset?.model}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Departure */}
          <div className="p-4 bg-green-50 rounded-lg space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-600" />
              Departure
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-3">
                <Label>Location Name</Label>
                <Input 
                  value={flightPlan.departure_location}
                  onChange={(e) => handleChange('departure_location', e.target.value)}
                  placeholder="Base name or address"
                />
              </div>
              <div>
                <Label>Latitude</Label>
                <Input 
                  type="number"
                  step="0.0001"
                  value={flightPlan.departure_lat}
                  onChange={(e) => handleChange('departure_lat', e.target.value)}
                />
              </div>
              <div>
                <Label>Longitude</Label>
                <Input 
                  type="number"
                  step="0.0001"
                  value={flightPlan.departure_lng}
                  onChange={(e) => handleChange('departure_lng', e.target.value)}
                />
              </div>
              <div>
                <Label>Departure Time</Label>
                <Input 
                  type="datetime-local"
                  value={flightPlan.departure_time}
                  onChange={(e) => handleChange('departure_time', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Destination */}
          <div className="p-4 bg-red-50 rounded-lg space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-600" />
              Destination
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-3">
                <Label>Location Name</Label>
                <Input 
                  value={flightPlan.destination_location}
                  onChange={(e) => handleChange('destination_location', e.target.value)}
                  placeholder="Delivery address or landing zone"
                />
              </div>
              <div>
                <Label>Latitude</Label>
                <Input 
                  type="number"
                  step="0.0001"
                  value={flightPlan.destination_lat}
                  onChange={(e) => handleChange('destination_lat', e.target.value)}
                />
              </div>
              <div>
                <Label>Longitude</Label>
                <Input 
                  type="number"
                  step="0.0001"
                  value={flightPlan.destination_lng}
                  onChange={(e) => handleChange('destination_lng', e.target.value)}
                />
              </div>
              <div>
                <Label>Est. Duration (hours)</Label>
                <Input 
                  type="number"
                  step="0.5"
                  value={flightPlan.estimated_duration_hours}
                  onChange={(e) => handleChange('estimated_duration_hours', parseFloat(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Flight Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Mission Type</Label>
              <Select value={flightPlan.mission_type} onValueChange={(v) => handleChange('mission_type', v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cargo">Cargo Delivery</SelectItem>
                  <SelectItem value="medical">Medical Transport</SelectItem>
                  <SelectItem value="surveillance">Surveillance</SelectItem>
                  <SelectItem value="inspection">Inspection</SelectItem>
                  <SelectItem value="emergency">Emergency Response</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Altitude (feet AGL)</Label>
              <Input 
                type="number"
                value={flightPlan.altitude_feet}
                onChange={(e) => handleChange('altitude_feet', parseInt(e.target.value))}
                max={400}
              />
              {flightPlan.altitude_feet > 400 && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  FAA Part 107 limit is 400ft AGL
                </p>
              )}
            </div>
            <div>
              <Label>Payload (lbs)</Label>
              <Input 
                type="number"
                value={flightPlan.payload_lbs}
                onChange={(e) => handleChange('payload_lbs', parseFloat(e.target.value))}
              />
              {asset?.max_payload_lbs && flightPlan.payload_lbs > asset.max_payload_lbs && (
                <p className="text-xs text-red-500 mt-1">Exceeds max: {asset.max_payload_lbs} lbs</p>
              )}
            </div>
          </div>

          <div>
            <Label>Flight Notes</Label>
            <Textarea 
              value={flightPlan.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Special instructions, waypoints, etc."
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Check Airspace & Submit
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
