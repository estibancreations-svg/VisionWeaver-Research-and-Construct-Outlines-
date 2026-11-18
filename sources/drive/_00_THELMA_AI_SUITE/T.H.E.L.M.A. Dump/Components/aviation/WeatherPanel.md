Original name: WeatherPanel.docx
Drive ID: 1la2R9bf73GBGPu_D-iiN3j1GCStejRqy
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Components/aviation/
Modified: 2025-12-19T17:03:40.000Z

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Wind, Eye, Droplets, Sun, CloudRain, CloudSnow } from "lucide-react";

export default function WeatherPanel({ weatherData }) {
  const defaultWeather = {
    condition: 'clear',
    temperature_f: 72,
    wind_speed_mph: 8,
    wind_direction: 'NW',
    visibility_miles: 10,
    humidity_percent: 45,
    ceiling_feet: null,
    flight_category: 'VFR',
    alerts: []
  };

  const weather = weatherData || defaultWeather;

  const conditionIcons = {
    clear: <Sun className="w-8 h-8 text-yellow-500" />,
    cloudy: <Cloud className="w-8 h-8 text-gray-500" />,
    rain: <CloudRain className="w-8 h-8 text-blue-500" />,
    snow: <CloudSnow className="w-8 h-8 text-blue-300" />
  };

  const categoryColors = {
    VFR: 'bg-green-500',
    MVFR: 'bg-blue-500',
    IFR: 'bg-red-500',
    LIFR: 'bg-purple-500'
  };

  const isGoodForFlight = weather.flight_category === 'VFR' && 
    weather.wind_speed_mph < 20 && 
    weather.visibility_miles >= 3;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <Cloud className="w-5 h-5" />
            Weather Conditions
          </span>
          <Badge className={categoryColors[weather.flight_category] || categoryColors.VFR}>
            {weather.flight_category}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          {conditionIcons[weather.condition] || conditionIcons.clear}
          <div>
            <p className="text-3xl font-bold">{weather.temperature_f}°F</p>
            <p className="text-sm text-gray-500 capitalize">{weather.condition}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Wind className="w-4 h-4" />
              <span className="text-sm">Wind</span>
            </div>
            <p className="font-semibold">{weather.wind_speed_mph} mph {weather.wind_direction}</p>
            {weather.wind_speed_mph > 15 && (
              <p className="text-xs text-yellow-600">Caution: Gusty</p>
            )}
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Eye className="w-4 h-4" />
              <span className="text-sm">Visibility</span>
            </div>
            <p className="font-semibold">{weather.visibility_miles} miles</p>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Droplets className="w-4 h-4" />
              <span className="text-sm">Humidity</span>
            </div>
            <p className="font-semibold">{weather.humidity_percent}%</p>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Cloud className="w-4 h-4" />
              <span className="text-sm">Ceiling</span>
            </div>
            <p className="font-semibold">{weather.ceiling_feet ? `${weather.ceiling_feet} ft` : 'Clear'}</p>
          </div>
        </div>

        {/* Flight Recommendation */}
        <div className={`mt-4 p-3 rounded-lg ${isGoodForFlight ? 'bg-green-50' : 'bg-yellow-50'}`}>
          <p className={`font-medium ${isGoodForFlight ? 'text-green-800' : 'text-yellow-800'}`}>
            {isGoodForFlight ? '✓ Conditions favorable for flight' : '⚠ Review conditions before flight'}
          </p>
        </div>

        {/* Alerts */}
        {weather.alerts?.length > 0 && (
          <div className="mt-3 space-y-2">
            {weather.alerts.map((alert, i) => (
              <div key={i} className="p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                {alert}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
