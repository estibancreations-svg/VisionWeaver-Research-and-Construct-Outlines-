Original name: LiveMapView.docx
Drive ID: 138F-kMqdmRjWUzOYJRkQj9HjxWlrEiUN
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Components/shared/
Modified: 2025-12-22T03:49:24.000Z

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function LiveMapView({ assets, incidents, center = [39.8283, -98.5795], zoom = 4 }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card className="h-96">
        <CardContent className="pt-6 flex items-center justify-center h-full">
          <p className="text-gray-500">Loading map...</p>
        </CardContent>
      </Card>
    );
  }

  const getAssetIcon = (type) => {
    switch (type) {
      case 'truck':
      case 'land':
        return '🚛';
      case 'aviation':
      case 'air':
      case 'drone':
        return '✈️';
      case 'water':
        return '🚢';
      default:
        return '📍';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
      case 'available':
        return '#10b981';
      case 'in_transit':
      case 'in_flight':
      case 'en_route':
        return '#3b82f6';
      case 'maintenance':
        return '#f59e0b';
      case 'emergency':
      case 'critical':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="h-96 md:h-[500px] relative">
          <MapContainer
            center={center}
            zoom={zoom}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Assets */}
            {assets?.map((asset, index) => {
              if (!asset.current_location?.lat || !asset.current_location?.lng) return null;
              
              const position = [asset.current_location.lat, asset.current_location.lng];
              
              return (
                <React.Fragment key={`asset-${index}`}>
                  <Marker position={position}>
                    <Popup>
                      <div className="p-2">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{getAssetIcon(asset.type || asset.asset_type)}</span>
                          <div>
                            <p className="font-semibold text-sm">
                              {asset.unit_number || asset.make + ' ' + asset.model}
                            </p>
                            <Badge className="text-xs" style={{ backgroundColor: getStatusColor(asset.status) }}>
                              {asset.status}
                            </Badge>
                          </div>
                        </div>
                        {asset.driver_email && (
                          <p className="text-xs text-gray-600">Driver: {asset.driver_email}</p>
                        )}
                        {asset.pilot_email && (
                          <p className="text-xs text-gray-600">Pilot: {asset.pilot_email}</p>
                        )}
                        {asset.vin && (
                          <p className="text-xs text-gray-500">VIN: {asset.vin}</p>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                  {/* Status circle around asset */}
                  <Circle
                    center={position}
                    radius={5000}
                    pathOptions={{
                      color: getStatusColor(asset.status),
                      fillColor: getStatusColor(asset.status),
                      fillOpacity: 0.1
                    }}
                  />
                </React.Fragment>
              );
            })}

            {/* Incidents */}
            {incidents?.map((incident, index) => {
              if (!incident.location?.lat || !incident.location?.lng) return null;
              
              const position = [incident.location.lat, incident.location.lng];
              
              return (
                <React.Fragment key={`incident-${index}`}>
                  <Marker position={position}>
                    <Popup>
                      <div className="p-2">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">🚨</span>
                          <div>
                            <p className="font-semibold text-sm">{incident.dispatch_id}</p>
                            <Badge className="bg-red-600 text-white text-xs">{incident.priority}</Badge>
                          </div>
                        </div>
                        <p className="text-xs text-gray-700 mb-1">{incident.incident_type}</p>
                        <p className="text-xs text-gray-600">
                          {incident.location.city}, {incident.location.state}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                  {/* Emergency radius */}
                  <Circle
                    center={position}
                    radius={10000}
                    pathOptions={{
                      color: '#ef4444',
                      fillColor: '#ef4444',
                      fillOpacity: 0.15
                    }}
                  />
                </React.Fragment>
              );
            })}
          </MapContainer>

          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 z-[1000] max-w-xs">
            <p className="text-xs font-semibold mb-2">Legend</p>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>In Transit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Emergency</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
