Original name: MainHub.docx
Drive ID: 1pownd_ylrStJI1zrlHFXImFLtKnxqOna
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Pages/MainHub/
Modified: 2025-12-19T16:40:06.000Z

import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, 
  Car, 
  Plane, 
  Shield, 
  Heart, 
  DollarSign, 
  Users, 
  Radio,
  Anchor,
  Activity,
  AlertTriangle,
  Building2
} from "lucide-react";

export default function MainHub() {
  const stations = [
    {
      category: "Transportation",
      items: [
        { name: "Trucking Pro Dispatch", icon: Truck, color: "bg-blue-500", page: "RouteOptimizer", status: "online" },
        { name: "Driveaway Dispatch", icon: Car, color: "bg-purple-500", page: "RouteOptimizer", status: "online" }
      ]
    },
    {
      category: "Aviation",
      items: [
        { name: "Drone Operations", icon: Plane, color: "bg-cyan-500", page: "AviationControl", status: "online" },
        { name: "Aircraft Control", icon: Plane, color: "bg-indigo-500", page: "AviationControl", status: "online" }
      ]
    },
    {
      category: "Emergency Services",
      items: [
        { name: "EMS Dispatch", icon: Activity, color: "bg-red-500", page: "EmergencyDispatch", status: "online" },
        { name: "First Aid Protocols", icon: Heart, color: "bg-pink-500", page: "FirstAidStation", status: "online" },
        { name: "Emergency S.O.S.", icon: AlertTriangle, color: "bg-orange-500", page: "EmergencyDispatch", status: "online" }
      ]
    },
    {
      category: "Multi-Modal Dispatch",
      items: [
        { name: "Land Services", icon: Truck, color: "bg-green-500", page: "RouteOptimizer", status: "online" },
        { name: "Air Services", icon: Plane, color: "bg-sky-500", page: "AviationControl", status: "online" },
        { name: "Water Services", icon: Anchor, color: "bg-teal-500", page: "WaterDispatch", status: "planned" }
      ]
    },
    {
      category: "Insurance & Claims",
      items: [
        { name: "Insurance Desk", icon: Shield, color: "bg-amber-500", page: "InsuranceStation", status: "online" },
        { name: "Claims Processing", icon: Building2, color: "bg-yellow-500", page: "InsuranceStation", status: "online" }
      ]
    },
    {
      category: "Administration",
      items: [
        { name: "Billing Center", icon: DollarSign, color: "bg-emerald-500", page: "BillingDashboard", status: "online" },
        { name: "Customer Portal", icon: Users, color: "bg-violet-500", page: "CustomerPortal", status: "online" },
        { name: "Fleet Management", icon: Radio, color: "bg-rose-500", page: "FleetDashboard", status: "online" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">MOTIVE NEXT</h1>
          <p className="text-xl text-blue-200">Central Operations Hub</p>
          <p className="text-sm text-gray-400 mt-2">🇺🇸 Proudly Made In America • Steven Henry</p>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white/10 border-white/20">
            <CardContent className="pt-4 text-center">
              <p className="text-3xl font-bold text-green-400">10</p>
              <p className="text-sm text-gray-300">Stations Online</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20">
            <CardContent className="pt-4 text-center">
              <p className="text-3xl font-bold text-yellow-400">2</p>
              <p className="text-sm text-gray-300">In Development</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20">
            <CardContent className="pt-4 text-center">
              <p className="text-3xl font-bold text-blue-400">6</p>
              <p className="text-sm text-gray-300">Categories</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20">
            <CardContent className="pt-4 text-center">
              <p className="text-3xl font-bold text-purple-400">∞</p>
              <p className="text-sm text-gray-300">Connections</p>
            </CardContent>
          </Card>
        </div>

        {/* Station Categories */}
        {stations.map((category, catIndex) => (
          <div key={catIndex}>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              {category.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map((station, index) => {
                const Icon = station.icon;
                const isOnline = station.status === 'online';
                
                return (
                  <Link 
                    key={index} 
                    to={isOnline ? createPageUrl(station.page) : '#'}
                    className={!isOnline ? 'cursor-not-allowed' : ''}
                  >
                    <Card className={`
                      transition-all duration-300 
                      ${isOnline 
                        ? 'bg-white/10 border-white/20 hover:bg-white/20 hover:scale-105 cursor-pointer' 
                        : 'bg-white/5 border-white/10 opacity-60'}
                    `}>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 ${station.color} rounded-xl flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-white">{station.name}</h3>
                            <Badge className={isOnline ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-400'}>
                              {station.status}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* External Connections Info */}
        <Card className="bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-white">External Agency Connections (Buffer Layer)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Allstate', 'Geico', 'Prudential', 'Local EMS'].map((provider, i) => (
                <div key={i} className="p-3 bg-white/5 rounded-lg text-center">
                  <p className="text-white font-medium">{provider}</p>
                  <Badge className="bg-yellow-500/20 text-yellow-300 mt-1">Pending Integration</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
