Original name: BillingDashboard.docx
Drive ID: 1ofeutT3Uad4LBSfjDXzQei8R6K3ErWNn
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Pages/BillingDashboard/
Modified: 2025-12-19T16:29:41.000Z

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, FileText, Users, TrendingUp, Search, Filter, Play } from "lucide-react";
import SubscriptionTierCard from '@/components/billing/SubscriptionTierCard';
import InvoiceTable from '@/components/billing/InvoiceTable';
import BillingCycleStatus from '@/components/billing/BillingCycleStatus';
import SubscriptionManager from '@/components/billing/SubscriptionManager';
import { format } from 'date-fns';

export default function BillingDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const queryClient = useQueryClient();

  // Fetch data
  const { data: invoices = [] } = useQuery({
    queryKey: ['invoices'],
    queryFn: () => base44.entities.Invoice.list('-created_date', 100)
  });

  const { data: subscriptions = [] } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: () => base44.entities.Subscription.list('-created_date', 100)
  });

  const { data: loads = [] } = useQuery({
    queryKey: ['loads'],
    queryFn: () => base44.entities.Load.list('-created_date', 100)
  });

  const { data: billingCycles = [] } = useQuery({
    queryKey: ['billing-cycles'],
    queryFn: () => base44.entities.BillingCycle.list('-cycle_date', 30)
  });

  // Process billing cycle mutation
  const processBillingMutation = useMutation({
    mutationFn: async () => {
      const today = format(new Date(), 'yyyy-MM-dd');
      const cycleId = `CYCLE-${today}`;
      
      // Get completed loads not yet invoiced
      const completedLoads = loads.filter(l => l.status === 'completed' && !l.invoiced);
      
      // Create billing cycle
      const cycle = await base44.entities.BillingCycle.create({
        cycle_id: cycleId,
        cycle_date: today,
        cutoff_time: '19:00 EST',
        status: 'processing',
        processing_started: new Date().toISOString()
      });

      // Generate invoices for completed loads
      let invoicesGenerated = 0;
      let totalRevenue = 0;

      for (const load of completedLoads) {
        const invoiceNumber = `INV-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
        
        await base44.entities.Invoice.create({
          invoice_number: invoiceNumber,
          invoice_type: 'load',
          customer_email: load.customer_email,
          billing_date: today,
          due_date: format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
          status: 'pending',
          load_ids: [load.id],
          line_items: [{
            description: `Load ${load.load_number} - ${load.pickup_location?.city || 'Pickup'} to ${load.delivery_location?.city || 'Delivery'}`,
            quantity: 1,
            unit_price: load.total_charge || 0,
            total: load.total_charge || 0
          }],
          subtotal: load.total_charge || 0,
          tax_rate: 0,
          tax_amount: 0,
          total_amount: load.total_charge || 0,
          billing_cycle_id: cycle.id
        });

        // Mark load as invoiced
        await base44.entities.Load.update(load.id, { invoiced: true });
        
        invoicesGenerated++;
        totalRevenue += load.total_charge || 0;
      }

      // Process subscription renewals
      const dueSubscriptions = subscriptions.filter(s => 
        s.status === 'active' && 
        s.auto_renew && 
        s.next_renewal_date === today
      );

      let subscriptionsRenewed = 0;
      for (const sub of dueSubscriptions) {
        const invoiceNumber = `INV-SUB-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
        
        await base44.entities.Invoice.create({
          invoice_number: invoiceNumber,
          invoice_type: 'subscription',
          customer_email: sub.user_email,
          billing_date: today,
          due_date: today,
          status: 'pending',
          subscription_id: sub.id,
          line_items: [{
            description: `${sub.tier.charAt(0).toUpperCase() + sub.tier.slice(1)} Subscription - ${sub.platform}`,
            quantity: 1,
            unit_price: sub.monthly_rate,
            total: sub.monthly_rate
          }],
          subtotal: sub.monthly_rate,
          total_amount: sub.monthly_rate,
          billing_cycle_id: cycle.id
        });

        // Update subscription renewal date
        const nextRenewal = format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
        await base44.entities.Subscription.update(sub.id, { next_renewal_date: nextRenewal });
        
        subscriptionsRenewed++;
        totalRevenue += sub.monthly_rate;
      }

      // Update cycle as completed
      await base44.entities.BillingCycle.update(cycle.id, {
        status: 'completed',
        loads_processed: completedLoads.length,
        invoices_generated: invoicesGenerated,
        subscriptions_renewed: subscriptionsRenewed,
        total_revenue: totalRevenue,
        processing_completed: new Date().toISOString()
      });

      return { invoicesGenerated, subscriptionsRenewed, totalRevenue };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['billing-cycles'] });
      queryClient.invalidateQueries({ queryKey: ['loads'] });
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    }
  });

  // Calculate stats
  const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.total_amount || 0), 0);
  const activeSubscriptions = subscriptions.filter(s => s.status === 'active').length;
  const pendingInvoices = invoices.filter(i => i.status === 'pending').length;
  const completedLoads = loads.filter(l => l.status === 'completed').length;

  // Filter invoices
  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = !searchTerm || 
      inv.invoice_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.customer_email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const currentCycle = billingCycles[0];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Billing Dashboard</h1>
            <p className="text-gray-500">Manage invoices, subscriptions, and billing cycles</p>
          </div>
          <Button 
            onClick={() => processBillingMutation.mutate()}
            disabled={processBillingMutation.isPending}
            className="bg-green-600 hover:bg-green-700"
          >
            <Play className="w-4 h-4 mr-2" />
            {processBillingMutation.isPending ? 'Processing...' : 'Run Billing Cycle'}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Subscriptions</p>
                  <p className="text-2xl font-bold">{activeSubscriptions}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pending Invoices</p>
                  <p className="text-2xl font-bold">{pendingInvoices}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Completed Loads</p>
                  <p className="text-2xl font-bold">{completedLoads}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Invoices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <InvoiceTable invoices={invoices.slice(0, 5)} />
                  </CardContent>
                </Card>
              </div>
              <div>
                <BillingCycleStatus cycle={currentCycle} />
              </div>
            </div>
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle>All Invoices</CardTitle>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input 
                        placeholder="Search invoices..." 
                        className="pl-9 w-full sm:w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-40">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="sent">Sent</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <InvoiceTable invoices={filteredInvoices} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {subscriptions.length > 0 ? (
                subscriptions.map(sub => (
                  <SubscriptionManager 
                    key={sub.id} 
                    subscription={sub}
                    onUpdate={(data) => base44.entities.Subscription.update(sub.id, data)}
                    onCancel={(sub) => base44.entities.Subscription.update(sub.id, { status: 'cancelled' })}
                  />
                ))
              ) : (
                <Card className="col-span-full">
                  <CardContent className="py-12 text-center">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No subscriptions yet</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing">
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="bg-gray-100 p-1 rounded-lg inline-flex">
                  <Button 
                    variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
                    onClick={() => setBillingCycle('monthly')}
                    size="sm"
                  >
                    Monthly
                  </Button>
                  <Button 
                    variant={billingCycle === 'annual' ? 'default' : 'ghost'}
                    onClick={() => setBillingCycle('annual')}
                    size="sm"
                  >
                    Annual (Save 17%)
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SubscriptionTierCard 
                  tier="basic" 
                  billingCycle={billingCycle}
                  onSelect={(tier) => console.log('Selected:', tier)}
                />
                <SubscriptionTierCard 
                  tier="professional" 
                  billingCycle={billingCycle}
                  onSelect={(tier) => console.log('Selected:', tier)}
                />
                <SubscriptionTierCard 
                  tier="enterprise" 
                  billingCycle={billingCycle}
                  onSelect={(tier) => console.log('Selected:', tier)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
