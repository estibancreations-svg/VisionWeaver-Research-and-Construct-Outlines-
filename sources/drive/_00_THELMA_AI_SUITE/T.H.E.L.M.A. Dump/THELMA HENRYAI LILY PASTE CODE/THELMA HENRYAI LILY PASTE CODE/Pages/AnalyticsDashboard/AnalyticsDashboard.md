Original name: AnalyticsDashboard.docx
Drive ID: 12CqJ0Yi7h68SAN1Ty9zOgDe-vO7AqZmB
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Pages/AnalyticsDashboard/
Modified: 2025-12-19T15:17:50.000Z

import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, BarChart3, Download, Sparkles, Loader2 } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AnalyticsDashboard() {
  const [reportType, setReportType] = useState('fleet_summary');
  const [period, setPeriod] = useState('weekly');
  const [generating, setGenerating] = useState(false);
  const queryClient = useQueryClient();

  const { data: reports = [] } = useQuery({
    queryKey: ['analyticsReports'],
    queryFn: () => base44.entities.AnalyticsReport.list('-created_date', 20)
  });

  const generateReportMutation = useMutation({
    mutationFn: async ({ type, period }) => {
      setGenerating(true);
      
      const prompt = `Generate a comprehensive ${period} ${type.replace('_', ' ')} report for MOTIVE NEXT platform.

Report Type: ${type}
Period: ${period}

Analyze and provide:
1. Key metrics and KPIs
2. Trends and patterns
3. Anomalies or issues requiring attention
4. Recommendations for improvement
5. Comparative analysis (if applicable)

Format the response with data suitable for charts and visualizations.`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            summary: { type: "string" },
            metrics: {
              type: "object",
              properties: {
                total_assets: { type: "number" },
                active_assets: { type: "number" },
                maintenance_issues: { type: "number" },
                avg_efficiency: { type: "number" }
              }
            },
            trends: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  date: { type: "string" },
                  value: { type: "number" }
                }
              }
            },
            recommendations: {
              type: "array",
              items: { type: "string" }
            }
          }
        }
      });

      const report = await base44.entities.AnalyticsReport.create({
        report_id: `RPT-${Date.now()}`,
        report_name: `${type.replace('_', ' ')} - ${period}`,
        report_type: type,
        period,
        start_date: new Date().toISOString(),
        data: response,
        generated_by: (await base44.auth.me()).email,
        generated_at: new Date().toISOString()
      });

      setGenerating(false);
      return report;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analyticsReports'] });
    }
  });

  const latestReport = reports[0];
  const mockChartData = [
    { name: 'Mon', value: 4000 },
    { name: 'Tue', value: 3000 },
    { name: 'Wed', value: 5000 },
    { name: 'Thu', value: 2780 },
    { name: 'Fri', value: 1890 },
    { name: 'Sat', value: 2390 },
    { name: 'Sun', value: 3490 }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              Analytics Dashboard
            </h1>
            <p className="text-gray-600">AI-Powered Insights and Reporting</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-blue-600">247</p>
              <p className="text-sm text-gray-500">Total Assets</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-green-600">89%</p>
              <p className="text-sm text-gray-500">Fleet Efficiency</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-orange-600">12</p>
              <p className="text-sm text-gray-500">Maintenance Alerts</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-purple-600">{reports.length}</p>
              <p className="text-sm text-gray-500">Generated Reports</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Generate AI Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fleet_summary">Fleet Summary</SelectItem>
                  <SelectItem value="emergency_summary">Emergency Summary</SelectItem>
                  <SelectItem value="maintenance_analysis">Maintenance Analysis</SelectItem>
                  <SelectItem value="billing_summary">Billing Summary</SelectItem>
                  <SelectItem value="training_performance">Training Performance</SelectItem>
                </SelectContent>
              </Select>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={() => generateReportMutation.mutate({ type: reportType, period })}
                disabled={generating}
              >
                {generating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Fleet Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Asset Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Active', value: 180 },
                      { name: 'Maintenance', value: 45 },
                      { name: 'Available', value: 22 }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mockChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reports.slice(0, 5).map(report => (
                <Card key={report.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{report.report_name}</p>
                      <p className="text-sm text-gray-500">
                        Generated {new Date(report.created_date).toLocaleDateString()}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
