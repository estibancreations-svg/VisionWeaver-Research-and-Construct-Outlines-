Original name: AviationAssetCard.docx
Drive ID: 1Db1hMPElGi9bq1SejeZZlbWMpo1LGVC9
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Components/aviation/
Modified: 2025-12-19T16:52:34.000Z

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plane, Battery, MapPin, Settings, AlertTriangle } from "lucide-react";
import { format } from "date-fns";

const typeIcons = {
  drone: "🛸",
  helicopter: "🚁",
  fixed_wing: "✈️",
  cargo_aircraft: "📦",
  medevac: "🏥"
};

const statusColors = {
  available: "bg-green-100 text-green-800",
  in_flight: "bg-blue-100 text-blue-800",
  maintenance: "bg-yellow-100 text-yellow-800",
  grounded: "bg-red-100 text-red-800",
  retired: "bg-gray-100 text-gray-500"
};

export default function AviationAssetCard({ asset, onSelect, onEdit }) {
  const needsInspection = asset.faa_compliance?.next_inspection_due && 
    new Date(asset.faa_compliance.next_inspection_due) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  return (
    <Card className={`hover:shadow-lg transition-shadow ${asset.status === 'in_flight' ? 'ring-2 ring-blue-400' : ''}`}>
      <CardContent className="pt-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{typeIcons[asset.asset_type] || "✈️"}</span>
            <div>
              <h3 className="font-semibold">{asset.make} {asset.model}</h3>
              <p className="text-sm text-gray-500">{asset.registration_number || asset.asset_id}</p>
            </div>
          </div>
          <Badge className={statusColors[asset.status]}>{asset.status}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
          <div className="flex items-center gap-1 text-gray-600">
            <Plane className="w-4 h-4" />
            <span>{asset.asset_type?.replace('_', ' ')}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Battery className="w-4 h-4" />
            <span>{asset.max_flight_time_hours || '-'}h max</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{asset.current_location?.base_name || 'Unknown'}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <span>📏</span>
            <span>{asset.max_range_miles || '-'} mi range</span>
          </div>
        </div>

        {/* Compliance Warning */}
        {needsInspection && (
          <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg mb-3">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
            <span className="text-xs text-yellow-700">
              Inspection due: {format(new Date(asset.faa_compliance.next_inspection_due), 'MMM d, yyyy')}
            </span>
          </div>
        )}

        {/* Capabilities */}
        {asset.capabilities?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {asset.capabilities.slice(0, 3).map((cap, i) => (
              <Badge key={i} variant="outline" className="text-xs">{cap}</Badge>
            ))}
            {asset.capabilities.length > 3 && (
              <Badge variant="outline" className="text-xs">+{asset.capabilities.length - 3}</Badge>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <Button size="sm" className="flex-1" onClick={() => onSelect?.(asset)}>
            {asset.status === 'available' ? 'Plan Flight' : 'View Details'}
          </Button>
          <Button size="sm" variant="outline" onClick={() => onEdit?.(asset)}>
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
