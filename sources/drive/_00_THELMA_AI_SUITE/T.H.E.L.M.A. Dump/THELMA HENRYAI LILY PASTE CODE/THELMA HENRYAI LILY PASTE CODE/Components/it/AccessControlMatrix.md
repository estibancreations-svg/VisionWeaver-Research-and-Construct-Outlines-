Original name: AccessControlMatrix.docx
Drive ID: 14259nPbhU6H2woxyeY6qhRj8RoY7DXmP
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Components/it/
Modified: 2025-12-19T17:26:50.000Z

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, CheckCircle, XCircle } from "lucide-react";

export default function AccessControlMatrix() {
  const { data: userRoles = [] } = useQuery({
    queryKey: ['allUserRoles'],
    queryFn: () => base44.entities.UserRole.list()
  });

  const modules = [
    'Main Hub', 'Fleet', 'Aviation', 'Emergency', 'Insurance', 
    'Billing', 'HR', 'Agents', 'Analytics', 'IT Control'
  ];

  const roleHierarchy = {
    'architect': 5,
    'cto': 5,
    'ciso': 5,
    'ceo': 4,
    'coo': 4,
    'cfo': 4,
    'admin': 3,
    'fleet_manager': 2,
    'hr_manager': 2,
    'dispatcher': 2,
    'mechanic': 1,
    'driver': 1,
    'trainee': 0
  };

  const getClearanceLevel = (role) => {
    return roleHierarchy[role] || 0;
  };

  const getClearanceBadge = (level) => {
    const colors = {
      5: 'bg-red-500',
      4: 'bg-purple-500',
      3: 'bg-blue-500',
      2: 'bg-green-500',
      1: 'bg-yellow-500',
      0: 'bg-gray-500'
    };
    return colors[level] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/95">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Access Control Matrix
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Role</th>
                  <th className="text-left p-2">Clearance</th>
                  <th className="text-left p-2">Users</th>
                  {modules.map(module => (
                    <th key={module} className="text-center p-2 text-xs">{module}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(roleHierarchy).map(([role, level]) => {
                  const roleCount = userRoles.filter(ur => ur.role === role).length;
                  return (
                    <tr key={role} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-medium capitalize">{role.replace('_', ' ')}</td>
                      <td className="p-2">
                        <Badge className={getClearanceBadge(level)}>
                          Level {level}
                        </Badge>
                      </td>
                      <td className="p-2">{roleCount}</td>
                      {modules.map(module => {
                        const hasAccess = level >= (module === 'IT Control' ? 5 : 2);
                        return (
                          <td key={module} className="text-center p-2">
                            {hasAccess ? (
                              <CheckCircle className="w-4 h-4 text-green-500 mx-auto" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-300 mx-auto" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/95">
        <CardHeader>
          <CardTitle>Clearance Level Definitions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-3 p-3 bg-red-50 rounded">
            <Badge className="bg-red-500">Level 5</Badge>
            <span className="text-sm">Architect - Full system access, code changes, API keys, Henri AI control</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded">
            <Badge className="bg-purple-500">Level 4</Badge>
            <span className="text-sm">C-Suite - Executive access, all modules except IT Control</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded">
            <Badge className="bg-blue-500">Level 3</Badge>
            <span className="text-sm">Admin - Department-wide access, user management</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded">
            <Badge className="bg-green-500">Level 2</Badge>
            <span className="text-sm">Manager - Departmental access, operations management</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded">
            <Badge className="bg-yellow-500">Level 1</Badge>
            <span className="text-sm">Operational - Limited module access, daily operations</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
            <Badge className="bg-gray-500">Level 0</Badge>
            <span className="text-sm">Trainee - Training Hub access only, supervised usage</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
