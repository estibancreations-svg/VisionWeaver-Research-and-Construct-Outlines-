Original name: ProjectRoadmap.docx
Drive ID: 1dXmmKIzItggT-7B-GRclrGdzm13janT-
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Components/docs/
Modified: 2025-12-19T17:08:58.000Z

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, Rocket, Zap, Globe, Shield, TrendingUp } from "lucide-react";

export default function ProjectRoadmap() {
  const milestones = [
    {
      quarter: 'Q1 2025',
      title: 'Foundation & Core Systems',
      icon: Target,
      progress: 60,
      goals: [
        { name: 'Entity schema design', status: 'complete' },
        { name: 'Billing system implementation', status: 'complete' },
        { name: 'Subscription management', status: 'complete' },
        { name: 'Domain & hosting setup', status: 'in_progress' },
        { name: 'Driver dashboard', status: 'pending' },
        { name: 'Authentication system', status: 'pending' }
      ]
    },
    {
      quarter: 'Q2 2025',
      title: 'Driver & Fleet Experience',
      icon: Rocket,
      progress: 0,
      goals: [
        { name: 'Mobile-responsive driver app', status: 'pending' },
        { name: 'GPS tracking integration', status: 'pending' },
        { name: 'Emergency S.O.S. system', status: 'pending' },
        { name: 'Fleet manager dashboard', status: 'pending' },
        { name: 'Real-time dispatch system', status: 'pending' },
        { name: 'Load board marketplace', status: 'pending' }
      ]
    },
    {
      quarter: 'Q3 2025',
      title: 'AI & Intelligence Layer',
      icon: Zap,
      progress: 0,
      goals: [
        { name: 'AI route optimization', status: 'pending' },
        { name: 'Legal compliance routing', status: 'pending' },
        { name: 'Fuel efficiency optimization', status: 'pending' },
        { name: 'Predictive maintenance alerts', status: 'pending' },
        { name: 'Weather & traffic integration', status: 'pending' },
        { name: 'VIN-based vehicle intelligence', status: 'pending' }
      ]
    },
    {
      quarter: 'Q4 2025',
      title: 'Scale & Enterprise',
      icon: Globe,
      progress: 0,
      goals: [
        { name: 'Customer tracking portal', status: 'pending' },
        { name: 'Enterprise fleet tools', status: 'pending' },
        { name: 'API for third-party integrations', status: 'pending' },
        { name: 'Advanced analytics dashboard', status: 'pending' },
        { name: 'White-label options', status: 'pending' },
        { name: 'Multi-language support', status: 'pending' }
      ]
    }
  ];

  const revenueProjections = {
    year1: { users: 500, revenue: '$210,000' },
    year2: { users: 2500, revenue: '$1,650,000' },
    year3: { users: 10000, revenue: '$32,700,000' }
  };

  return (
    <div className="space-y-6">
      {/* Quarterly Milestones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {milestones.map((milestone, index) => {
          const Icon = milestone.icon;
          return (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <Badge variant="outline">{milestone.quarter}</Badge>
                      <CardTitle className="text-lg mt-1">{milestone.title}</CardTitle>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{milestone.progress}%</span>
                  </div>
                  <Progress value={milestone.progress} className="h-2" />
                </div>
                <ul className="space-y-2">
                  {milestone.goals.map((goal, i) => (
                    <li key={i} className="flex items-center justify-between text-sm">
                      <span className={goal.status === 'complete' ? 'text-gray-900' : 'text-gray-500'}>
                        {goal.name}
                      </span>
                      <Badge className={
                        goal.status === 'complete' ? 'bg-green-100 text-green-800' :
                        goal.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-600'
                      }>
                        {goal.status.replace('_', ' ')}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Revenue Projections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Revenue Projections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Year 1</p>
              <p className="text-3xl font-bold text-blue-600">{revenueProjections.year1.revenue}</p>
              <p className="text-sm text-gray-500 mt-1">{revenueProjections.year1.users} users</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Year 2</p>
              <p className="text-3xl font-bold text-purple-600">{revenueProjections.year2.revenue}</p>
              <p className="text-sm text-gray-500 mt-1">{revenueProjections.year2.users} users</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Year 3</p>
              <p className="text-3xl font-bold text-green-600">{revenueProjections.year3.revenue}</p>
              <p className="text-sm text-gray-500 mt-1">{revenueProjections.year3.users} users</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Features Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            MOTIVE NEXT Core Differentiators
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Legal compliance routing (weight, height, hazmat)',
              'VIN-based intelligent vehicle management',
              'Emergency S.O.S. with GPS sharing',
              '7 PM EST automated billing cutoff',
              'Dual platform (Trucking Pro + Driveaway)',
              'AI-powered route optimization',
              'Real-time weather & traffic',
              'Fleet-wide analytics dashboard',
              '"Proudly Made In America" branding'
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
