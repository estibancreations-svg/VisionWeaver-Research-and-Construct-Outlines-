Original name: TrainingHub.docx
Drive ID: 17TB8czIjiUXaswYWx9JlLX_e05_BGnPI
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Pages/TrainingHub/
Modified: 2025-12-19T16:43:32.000Z

import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Truck, 
  Car, 
  Plane, 
  Shield, 
  Heart, 
  DollarSign, 
  Users, 
  Radio,
  Activity,
  AlertTriangle,
  Building2,
  GraduationCap,
  PlayCircle
} from "lucide-react";

export default function TrainingHub() {
  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me()
  });

  const { data: progress = [] } = useQuery({
    queryKey: ['trainingProgress', user?.email],
    queryFn: () => base44.entities.TrainingProgress.filter({ user_email: user.email }),
    enabled: !!user
  });

  const getModuleProgress = (moduleId) => {
    const moduleProgress = progress.find(p => p.module_id === moduleId);
    return moduleProgress?.completion_percentage || 0;
  };

  const getModuleStatus = (moduleId) => {
    const moduleProgress = progress.find(p => p.module_id === moduleId);
    return moduleProgress?.status || 'not_started';
  };

  const trainingModules = [
    {
      category: "Transportation",
      items: [
        { id: "trucking-pro", name: "Trucking Pro Dispatch", icon: Truck, color: "bg-emerald-500", page: "TrainingTruckingPro" },
        { id: "driveaway", name: "Driveaway Dispatch", icon: Car, color: "bg-teal-500", page: "TrainingDriveaway" }
      ]
    },
    {
      category: "Aviation",
      items: [
        { id: "drone-ops", name: "Drone Operations", icon: Plane, color: "bg-sky-500", page: "TrainingDroneOps" },
        { id: "aircraft", name: "Aircraft Control", icon: Plane, color: "bg-indigo-600", page: "TrainingAircraft" }
      ]
    },
    {
      category: "Emergency Services",
      items: [
        { id: "ems", name: "EMS Dispatch", icon: Activity, color: "bg-rose-500", page: "TrainingEMS" },
        { id: "first-aid", name: "First Aid Protocols", icon: Heart, color: "bg-pink-600", page: "TrainingFirstAid" },
        { id: "emergency-sos", name: "Emergency S.O.S.", icon: AlertTriangle, color: "bg-orange-600", page: "TrainingEmergencySOS" }
      ]
    },
    {
      category: "Insurance & Claims",
      items: [
        { id: "insurance", name: "Insurance Desk", icon: Shield, color: "bg-amber-600", page: "TrainingInsurance" },
        { id: "claims", name: "Claims Processing", icon: Building2, color: "bg-yellow-600", page: "TrainingClaims" }
      ]
    },
    {
      category: "Administration",
      items: [
        { id: "billing", name: "Billing Center", icon: DollarSign, color: "bg-green-600", page: "TrainingBilling" },
        { id: "customer", name: "Customer Portal", icon: Users, color: "bg-violet-600", page: "TrainingCustomer" },
        { id: "fleet", name: "Fleet Management", icon: Radio, color: "bg-fuchsia-600", page: "TrainingFleet" }
      ]
    }
  ];

  const totalModules = trainingModules.reduce((acc, cat) => acc + cat.items.length, 0);
  const completedModules = progress.filter(p => p.status === 'completed').length;
  const overallProgress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <GraduationCap className="w-12 h-12 text-emerald-300" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">TRAINING HUB</h1>
          </div>
          <p className="text-xl text-emerald-200">Master the MOTIVE NEXT Platform</p>
          <p className="text-sm text-gray-400 mt-2">🇺🇸 Interactive Learning Center • Steven Henry</p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white/10 border-white/20">
            <CardContent className="pt-4 text-center">
              <p className="text-3xl font-bold text-emerald-400">{overallProgress}%</p>
              <p className="text-sm text-gray-300">Overall Progress</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20">
            <CardContent className="pt-4 text-center">
              <p className="text-3xl font-bold text-green-400">{completedModules}</p>
              <p className="text-sm text-gray-300">Completed</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20">
            <CardContent className="pt-4 text-center">
              <p className="text-3xl font-bold text-yellow-400">{progress.filter(p => p.status === 'in_progress').length}</p>
              <p className="text-sm text-gray-300">In Progress</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20">
            <CardContent className="pt-4 text-center">
              <p className="text-3xl font-bold text-blue-400">{totalModules}</p>
              <p className="text-sm text-gray-300">Total Modules</p>
            </CardContent>
          </Card>
        </div>

        {/* Training Modules */}
        {trainingModules.map((category, catIndex) => (
          <div key={catIndex}>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full" />
              {category.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map((module, index) => {
                const Icon = module.icon;
                const moduleProgress = getModuleProgress(module.id);
                const status = getModuleStatus(module.id);
                
                return (
                  <Link key={index} to={createPageUrl(module.page)}>
                    <Card className="transition-all duration-300 bg-white/10 border-white/20 hover:bg-white/20 hover:scale-105 cursor-pointer">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4 mb-3">
                          <div className={`w-12 h-12 ${module.color} rounded-xl flex items-center justify-center relative`}>
                            <Icon className="w-6 h-6 text-white" />
                            <PlayCircle className="w-4 h-4 text-white absolute -bottom-1 -right-1" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-white">{module.name}</h3>
                            <Badge className={
                              status === 'completed' ? 'bg-green-500/20 text-green-300' :
                              status === 'in_progress' ? 'bg-yellow-500/20 text-yellow-300' :
                              'bg-gray-500/20 text-gray-400'
                            }>
                              {status === 'completed' ? 'Completed' : status === 'in_progress' ? 'In Progress' : 'Not Started'}
                            </Badge>
                          </div>
                        </div>
                        {moduleProgress > 0 && (
                          <div className="space-y-1">
                            <Progress value={moduleProgress} className="h-2" />
                            <p className="text-xs text-gray-300 text-right">{moduleProgress}%</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Back to Live System */}
        <Card className="bg-blue-500/20 border-blue-400/30">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-white font-semibold mb-2">Ready to apply your knowledge?</p>
              <Link to={createPageUrl('MainHub')}>
                <Badge className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer px-4 py-2">
                  Return to Live System →
                </Badge>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
