Original name: Billing copy.tsx
Drive ID: 1wjcvydciQ_8oUHLb4KQmzZ8wdDO1_C-p
Parent folder: My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/
Modified: 2026-01-12T00:24:41.000Z

import React from 'react';
import { CreditCard, DollarSign, Download, PieChart, Check } from 'lucide-react';

const Billing: React.FC = () => {
    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Billing & Usage</h1>
                    <p className="text-slate-500 text-sm">Manage your Enterprise subscription and payment methods.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50">View Usage Details</button>
                    <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800">Update Payment Method</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
                    <p className="text-slate-400 text-sm uppercase font-bold mb-4">Current Plan</p>
                    <h2 className="text-3xl font-bold mb-2">T.H.E.L.M.A. Enterprise</h2>
                    <p className="text-2xl text-slate-300 mb-6">$12,000 <span className="text-sm font-normal">/ month</span></p>
                    <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-green-400"/> Unlimited Agents</div>
                        <div className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-green-400"/> Full Fleet Telemetry</div>
                        <div className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-green-400"/> 24/7 Priority Support</div>
                    </div>
                    <button className="w-full py-2 bg-blue-600 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors">Manage Plan</button>
                </div>

                <div className="col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-6">Usage Breakdown (Dec 2024)</h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-500">AI Token Consumption (H.E.N.R.Y.)</span>
                                <span className="font-bold text-slate-700">8.2M / 10M</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full w-[82%]"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-500">Storage (Logs & Telemetry)</span>
                                <span className="font-bold text-slate-700">450 GB / 1 TB</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-purple-500 h-full w-[45%]"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-500">Map API Requests</span>
                                <span className="font-bold text-slate-700">125,402 / Unlimited</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-green-500 h-full w-[12%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100">
                    <h3 className="font-bold text-slate-800">Invoice History</h3>
                </div>
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-medium">
                        <tr>
                            <th className="px-6 py-4">Invoice ID</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Download</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {[
                            { id: 'INV-2024-12', date: 'Dec 01, 2024', amount: '$12,000.00', status: 'Paid' },
                            { id: 'INV-2024-11', date: 'Nov 01, 2024', amount: '$12,000.00', status: 'Paid' },
                            { id: 'INV-2024-10', date: 'Oct 01, 2024', amount: '$11,500.00', status: 'Paid' }
                        ].map((inv) => (
                            <tr key={inv.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-mono text-slate-600">{inv.id}</td>
                                <td className="px-6 py-4 text-slate-600">{inv.date}</td>
                                <td className="px-6 py-4 font-bold text-slate-800">{inv.amount}</td>
                                <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Paid</span></td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-blue-600"><Download size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Billing;