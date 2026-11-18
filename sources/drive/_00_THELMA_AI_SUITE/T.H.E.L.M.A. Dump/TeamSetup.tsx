Original name: TeamSetup.tsx
Drive ID: 1jCYc1m1DnahKO1DGXatV52IIqXqsOmAU
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/
Modified: 2026-01-12T00:25:37.000Z

import React from 'react';
import { Users, UserPlus, Shield, Mail, Briefcase, MoreHorizontal } from 'lucide-react';
import { UserRole } from '../../types';

const teamMembers = [
    { id: 1, name: 'Steve Henry', role: UserRole.ARCHITECT, email: 'steve@thelma.ai', clearance: 'L10 - Omni', status: 'Active', assignment: 'System Wide' },
    { id: 2, name: 'Marcus Cole', role: UserRole.FLEET_MANAGER, email: 'm.cole@thelma.ai', clearance: 'L4 - Operational', status: 'Active', assignment: 'NorthEast Fleet' },
    { id: 3, name: 'Sarah Connor', role: UserRole.TRAINING_DIRECTOR, email: 's.connor@thelma.ai', clearance: 'L5 - Education', status: 'Active', assignment: 'Training Hub' },
    { id: 4, name: 'James T. Kirk', role: UserRole.PILOT, email: 'j.kirk@thelma.ai', clearance: 'L3 - Flight', status: 'In Flight', assignment: 'Aviation Sector 7' },
    { id: 5, name: 'Ellen Ripley', role: UserRole.COO, email: 'e.ripley@thelma.ai', clearance: 'L6 - Executive', status: 'Away', assignment: 'Logistics Command' }
];

const TeamSetup: React.FC = () => {
    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Team Organization & Roles</h1>
                    <p className="text-slate-500 text-sm">Manage access, clearance levels, and operational assignments.</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">
                    <UserPlus size={16} /> Add Member
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-medium">
                        <tr>
                            <th className="px-6 py-4">Member Name</th>
                            <th className="px-6 py-4">Role / Department</th>
                            <th className="px-6 py-4">Contact</th>
                            <th className="px-6 py-4">Clearance</th>
                            <th className="px-6 py-4">Current Assignment</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {teamMembers.map((member) => (
                            <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs">
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <span className="font-bold text-slate-800">{member.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Briefcase size={14} className="text-slate-400"/>
                                        <span>{member.role}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-slate-500 text-xs">
                                            <Mail size={12} /> {member.email}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-mono border border-slate-200 flex items-center gap-1 w-fit">
                                        <Shield size={10} /> {member.clearance}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-600">
                                    {member.assignment}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit ${
                                        member.status === 'Active' ? 'bg-green-100 text-green-700' : 
                                        member.status === 'In Flight' ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-500'
                                    }`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${member.status === 'Active' ? 'bg-green-600' : member.status === 'In Flight' ? 'bg-blue-600' : 'bg-slate-400'}`}></div>
                                        {member.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeamSetup;