Original name: SubscriptionManager.docx
Drive ID: 1p6dl19v1Op8txXwqRcsYJ8gi7QJGJXH3
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Components/billing/
Modified: 2025-12-19T17:05:30.000Z

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { CreditCard, Calendar, RefreshCw, XCircle } from "lucide-react";
import { format, addMonths } from "date-fns";

export default function SubscriptionManager({ subscription, onUpdate, onCancel }) {
  const [autoRenew, setAutoRenew] = useState(subscription?.auto_renew ?? true);

  const handleAutoRenewChange = (checked) => {
    setAutoRenew(checked);
    onUpdate?.({ ...subscription, auto_renew: checked });
  };

  const tierLabels = {
    basic: { label: 'Basic', price: 35, color: 'bg-blue-500' },
    professional: { label: 'Professional', price: 55, color: 'bg-purple-500' },
    enterprise: { label: 'Enterprise', price: 75, color: 'bg-amber-500' }
  };

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    expired: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-500',
    grace_period: 'bg-orange-100 text-orange-800'
  };

  const tier = tierLabels[subscription?.tier] || tierLabels.basic;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Subscription Details</CardTitle>
          <Badge className={statusColors[subscription?.status] || statusColors.pending}>
            {subscription?.status || 'pending'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Plan */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-500">Current Plan</p>
            <p className="text-xl font-bold">{tier.label}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">${subscription?.monthly_rate || tier.price}</p>
            <p className="text-sm text-gray-500">per month</p>
          </div>
        </div>

        {/* Billing Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Next Billing Date</p>
              <p className="font-medium">
                {subscription?.next_renewal_date 
                  ? format(new Date(subscription.next_renewal_date), 'MMMM d, yyyy')
                  : format(addMonths(new Date(), 1), 'MMMM d, yyyy')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="font-medium">
                {subscription?.payment_method_id ? '•••• •••• •••• 4242' : 'No payment method'}
              </p>
            </div>
          </div>
        </div>

        {/* Auto-Renew Toggle */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-gray-400" />
            <div>
              <Label htmlFor="auto-renew" className="font-medium">Auto-Renewal</Label>
              <p className="text-sm text-gray-500">Automatically renew subscription</p>
            </div>
          </div>
          <Switch 
            id="auto-renew" 
            checked={autoRenew} 
            onCheckedChange={handleAutoRenewChange}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            Change Plan
          </Button>
          <Button variant="outline" className="flex-1">
            Update Payment
          </Button>
        </div>

        {/* Cancel Subscription */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
              <XCircle className="w-4 h-4 mr-2" />
              Cancel Subscription
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel Subscription?</AlertDialogTitle>
              <AlertDialogDescription>
                Your subscription will remain active until the end of your current billing period. 
                You can reactivate at any time.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => onCancel?.(subscription)}
                className="bg-red-600 hover:bg-red-700"
              >
                Cancel Subscription
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
