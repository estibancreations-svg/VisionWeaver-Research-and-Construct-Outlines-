Original name: HRAdmin.docx
Drive ID: 1GN9MVjaJVd7luo6fjVFkHZ05YiyJpkn3
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Pages/HRAdmin/
Modified: 2025-12-19T16:37:09.000Z

import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, GraduationCap, Award, UserPlus, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function HRAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const queryClient = useQueryClient();

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: () => base44.entities.User.list()
  });

  const { data: userRoles = [] } = useQuery({
    queryKey: ['userRoles'],
    queryFn: () => base44.entities.UserRole.list()
  });

  const { data: trainingAssignments = [] } = useQuery({
    queryKey: ['trainingAssignments'],
    queryFn: () => base44.entities.TrainingAssignment.list()
  });

  const { data: certificates = [] } = useQuery({
    queryKey: ['certificates'],
    queryFn: () => base44.entities.Certificate.list()
  });

  const assignRoleMutation = useMutation({
    mutationFn: (data) => base44.entities.UserRole.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userRoles'] })
  });

  const assignTrainingMutation = useMutation({
    mutationFn: (data) => base44.entities.TrainingAssignment.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainingAssignments'] });
      setShowAssignModal(false);
    }
  });

  const rolePermissions = {
    dispatcher: ['can_access_fleet', 'can_access_main_hub', 'can_view_reports'],
    fleet_manager: ['can_access_fleet', 'can_access_main_hub', 'can_access_analytics', 'can_view_reports', 'can_create_reports'],
    mechanic: ['can_access_fleet', 'can_access_main_hub'],
    driver: ['can_access_main_hub'],
    pilot: ['can_access_aviation', 'can_access_main_hub'],
    ems_dispatcher: ['can_access_emergency', 'can_access_main_hub'],
    insurance_adjuster: ['can_access_insurance', 'can_access_main_hub'],
    hr_manager: ['can_access_hr', 'can_assign_training', 'can_view_reports', 'can_access_main_hub'],
    trainee: ['can_access_main_hub']
  };

  const trainingModules = [
    { id: 'trucking-pro', name: 'Trucking Pro Dispatch', roles: ['dispatcher', 'fleet_manager', 'driver'] },
    { id: 'driveaway', name: 'Driveaway Dispatch', roles: ['dispatcher', 'fleet_manager', 'driver'] },
    { id: 'drone-ops', name: 'Drone Operations', roles: ['pilot'] },
    { id: 'aircraft', name: 'Aircraft Control', roles: ['pilot'] },
    { id: 'ems', name: 'EMS Dispatch', roles: ['ems_dispatcher'] },
    { id: 'first-aid', name: 'First Aid Protocols', roles: ['ems_dispatcher', 'driver'] },
    { id: 'insurance', name: 'Insurance Desk', roles: ['insurance_adjuster'] },
    { id: 'claims', name: 'Claims Processing', roles: ['insurance_adjuster'] },
    { id: 'billing', name: 'Billing Center', roles: ['billing_admin'] },
    { id: 'fleet', name: 'Fleet Management', roles: ['fleet_manager', 'mechanic'] }
  ];

  const filteredUsers = users.filter(u => 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              HR Administration
            </h1>
            <p className="text-gray-600">Manage users, roles, and training assignments</p>
          </div>
        </div>

        <Tabs defaultValue="users">
          <TabsList>
            <TabsTrigger value="users">Users & Roles</TabsTrigger>
            <TabsTrigger value="training">Training Assignments</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>User Management</CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredUsers.map(user => {
                    const role = userRoles.find(r => r.user_email === user.email);
                    const assignments = trainingAssignments.filter(a => a.user_email === user.email);
                    const userCerts = certificates.filter(c => c.user_email === user.email);

                    return (
                      <Card key={user.email} className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">{user.full_name || user.email}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                            <div className="flex gap-2 mt-2">
                              {role ? (
                                <Badge>{role.role}</Badge>
                              ) : (
                                <Badge variant="outline">No Role Assigned</Badge>
                              )}
                              <Badge variant="secondary">{assignments.length} Training Modules</Badge>
                              <Badge className="bg-green-500">{userCerts.length} Certificates</Badge>
                            </div>
                          </div>
                          <Button size="sm" onClick={() => { setSelectedUser(user); setShowAssignModal(true); }}>
                            <GraduationCap className="w-4 h-4 mr-2" />
                            Assign Training
                          </Button>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training">
            <Card>
              <CardHeader>
                <CardTitle>Training Assignments Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trainingAssignments.map(assignment => (
                    <Card key={assignment.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{assignment.module_name}</p>
                          <p className="text-sm text-gray-500">{assignment.user_email}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge className={
                              assignment.status === 'completed' ? 'bg-green-500' :
                              assignment.status === 'in_progress' ? 'bg-blue-500' :
                              assignment.status === 'overdue' ? 'bg-red-500' :
                              'bg-gray-500'
                            }>
                              {assignment.status}
                            </Badge>
                            {assignment.score && <Badge variant="outline">Score: {assignment.score}%</Badge>}
                            {assignment.certificate_issued && <Award className="w-4 h-4 text-yellow-500" />}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates">
            <Card>
              <CardHeader>
                <CardTitle>Issued Certificates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {certificates.map(cert => (
                    <Card key={cert.id} className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50">
                      <Award className="w-8 h-8 text-yellow-600 mb-2" />
                      <p className="font-semibold">{cert.module_name}</p>
                      <p className="text-sm text-gray-600">{cert.user_name}</p>
                      <div className="mt-2">
                        <Badge>Score: {cert.final_score}%</Badge>
                        <p className="text-xs text-gray-500 mt-1">Issued: {new Date(cert.issue_date).toLocaleDateString()}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Assignment Modal */}
      {showAssignModal && selectedUser && (
        <Dialog open={showAssignModal} onOpenChange={setShowAssignModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Training to {selectedUser.full_name || selectedUser.email}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Select Training Module</Label>
                <Select onValueChange={(moduleId) => {
                  const module = trainingModules.find(m => m.id === moduleId);
                  assignTrainingMutation.mutate({
                    user_email: selectedUser.email,
                    module_id: moduleId,
                    module_name: module.name,
                    assigned_by: 'admin',
                    assigned_date: new Date().toISOString(),
                    status: 'assigned'
                  });
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose module" />
                  </SelectTrigger>
                  <SelectContent>
                    {trainingModules.map(mod => (
                      <SelectItem key={mod.id} value={mod.id}>{mod.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
