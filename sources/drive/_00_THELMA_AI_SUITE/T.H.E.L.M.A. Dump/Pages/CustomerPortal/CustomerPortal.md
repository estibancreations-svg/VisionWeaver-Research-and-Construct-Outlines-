Original name: CustomerPortal.docx
Drive ID: 1-6uRDqrk9EE6FgTadAJScZiA1KqwshEg
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Pages/CustomerPortal/
Modified: 2025-12-19T15:21:58.000Z

import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, MapPin, FileText, Clock } from "lucide-react";
import { format } from 'date-fns';

export default function CustomerPortal() {
  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me()
  });

  const { data: loads = [] } = useQuery({
    queryKey: ['customerLoads', user?.email],
    queryFn: () => base44.entities.Load.filter({ customer_email: user?.email }, '-created_date'),
    enabled: !!user
  });

  const { data: invoices = [] } = useQuery({
    queryKey: ['customerInvoices', user?.email],
    queryFn: () => base44.entities.Invoice.filter({ customer_email: user?.email }, '-created_date'),
    enabled: !!user
  });

  const activeShipments = loads.filter(l => ['assigned', 'in_transit'].includes(l.status));
  const totalSpent = invoices
    .filter(i => i.status === 'paid')
    .reduce((sum, inv) => sum + (inv.total_amount || 0), 0);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    assigned: 'bg-blue-100 text-blue-800',
    in_transit: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-600'
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <Package className="w-6 h-6 md:w-8 md:h-8" />
            Customer Portal
          </h1>
          <p className="text-gray-600 text-sm md:text-base">Welcome back, {user?.full_name || 'Customer'}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Card>
            <CardContent className="pt-4 md:pt-6 text-center">
              <p className="text-2xl md:text-3xl font-bold">{activeShipments.length}</p>
              <p className="text-xs md:text-sm text-gray-500">Active Shipments</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 md:pt-6 text-center">
              <p className="text-2xl md:text-3xl font-bold">{loads.length}</p>
              <p className="text-xs md:text-sm text-gray-500">Total Shipments</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 md:pt-6 text-center">
              <p className="text-2xl md:text-3xl font-bold">${totalSpent.toFixed(0)}</p>
              <p className="text-xs md:text-sm text-gray-500">Total Spent</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 md:pt-6 text-center">
              <p className="text-2xl md:text-3xl font-bold">{invoices.filter(i => i.status === 'pending').length}</p>
              <p className="text-xs md:text-sm text-gray-500">Pending Invoices</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="shipments" className="space-y-4">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="shipments" className="text-xs md:text-sm">
              <Package className="w-4 h-4 mr-2" />
              Shipments
            </TabsTrigger>
            <TabsTrigger value="invoices" className="text-xs md:text-sm">
              <FileText className="w-4 h-4 mr-2" />
              Invoices
            </TabsTrigger>
          </TabsList>

          <TabsContent value="shipments">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <CardTitle className="text-base md:text-lg">Your Shipments</CardTitle>
                  <Button size="sm">Request New Shipment</Button>
                </div>
              </CardHeader>
              <CardContent>
                {loads.length === 0 ? (
                  <div className="text-center py-8 md:py-12">
                    <Package className="w-8 h-8 md:w-12 md:h-12 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 mb-4 text-sm md:text-base">No shipments yet</p>
                    <Button>Create Your First Shipment</Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {loads.map(load => (
                      <Card key={load.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-4">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-3">
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <p className="font-semibold text-sm md:text-base">{load.load_number}</p>
                                <Badge className={statusColors[load.status]} className="text-xs">
                                  {load.status}
                                </Badge>
                              </div>
                              <div className="space-y-2 text-xs md:text-sm">
                                <div className="flex items-start gap-2">
                                  <MapPin className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                  <div>
                                    <p className="font-medium">From</p>
                                    <p className="text-gray-600">{load.pickup_location?.city}, {load.pickup_location?.state}</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-2">
                                  <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                  <div>
                                    <p className="font-medium">To</p>
                                    <p className="text-gray-600">{load.delivery_location?.city}, {load.delivery_location?.state}</p>
                                  </div>
                                </div>
                                {load.delivery_date && (
                                  <div className="flex items-center gap-2 text-gray-600">
                                    <Clock className="w-4 h-4" />
                                    <span>Est. Delivery: {format(new Date(load.delivery_date), 'MMM d, yyyy')}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg md:text-xl font-bold text-green-600">${load.total_charge}</p>
                              <Button size="sm" variant="outline" className="mt-2 w-full md:w-auto">
                                Track Shipment
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices">
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Your Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                {invoices.length === 0 ? (
                  <div className="text-center py-8 md:py-12">
                    <FileText className="w-8 h-8 md:w-12 md:h-12 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 text-sm md:text-base">No invoices yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {invoices.map(invoice => (
                      <div key={invoice.id} className="flex flex-col md:flex-row md:items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg gap-3">
                        <div className="flex-1">
                          <p className="font-semibold text-sm md:text-base">{invoice.invoice_number}</p>
                          <p className="text-xs md:text-sm text-gray-500">
                            {invoice.billing_date ? format(new Date(invoice.billing_date), 'MMM d, yyyy') : 'N/A'}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-base md:text-lg font-bold">${invoice.total_amount?.toFixed(2)}</p>
                            <Badge className={invoice.status === 'paid' ? 'bg-green-500' : 'bg-yellow-500'} className="text-xs">
                              {invoice.status}
                            </Badge>
                          </div>
                          <Button size="sm" variant="outline">View</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
