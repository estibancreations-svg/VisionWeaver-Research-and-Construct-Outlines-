Original name: SubscriptionTierCard.docx
Drive ID: 1Bkqs2vtz85LGBGNaU3kdmmHmb6HDuuc5
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Components/billing/
Modified: 2025-12-19T17:06:01.000Z

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown } from "lucide-react";

const tierConfig = {
  basic: {
    name: "Basic",
    price: 35,
    icon: Star,
    color: "bg-blue-500",
    features: [
      "Single driver account",
      "Basic route planning",
      "Load tracking",
      "Standard support",
      "Mobile app access"
    ]
  },
  professional: {
    name: "Professional",
    price: 55,
    icon: Zap,
    color: "bg-purple-500",
    popular: true,
    features: [
      "Up to 5 drivers",
      "Advanced routing with compliance",
      "Real-time GPS tracking",
      "Automated invoicing",
      "Priority support",
      "Fleet dashboard",
      "Fuel optimization"
    ]
  },
  enterprise: {
    name: "Enterprise",
    price: 75,
    icon: Crown,
    color: "bg-amber-500",
    features: [
      "Unlimited drivers",
      "AI-powered route optimization",
      "Full compliance monitoring",
      "Custom integrations",
      "Dedicated account manager",
      "Advanced analytics",
      "API access",
      "White-label options"
    ]
  }
};

export default function SubscriptionTierCard({ tier, currentTier, onSelect, billingCycle = "monthly" }) {
  const config = tierConfig[tier];
  const Icon = config.icon;
  const isCurrentTier = currentTier === tier;
  const annualPrice = Math.round(config.price * 10); // 2 months free

  return (
    <Card className={`relative flex flex-col ${config.popular ? 'border-purple-500 border-2 shadow-lg' : ''}`}>
      {config.popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500">
          Most Popular
        </Badge>
      )}
      
      <CardHeader className="text-center pb-2">
        <div className={`w-12 h-12 mx-auto rounded-full ${config.color} flex items-center justify-center mb-3`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-xl">{config.name}</CardTitle>
        <div className="mt-2">
          <span className="text-4xl font-bold">
            ${billingCycle === "monthly" ? config.price : annualPrice}
          </span>
          <span className="text-gray-500">
            /{billingCycle === "monthly" ? "mo" : "yr"}
          </span>
        </div>
        {billingCycle === "annual" && (
          <p className="text-sm text-green-600 mt-1">Save ${config.price * 2}/year</p>
        )}
      </CardHeader>

      <CardContent className="flex-1">
        <ul className="space-y-3">
          {config.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button 
          className={`w-full ${isCurrentTier ? 'bg-gray-400' : config.color}`}
          onClick={() => onSelect(tier)}
          disabled={isCurrentTier}
        >
          {isCurrentTier ? 'Current Plan' : 'Select Plan'}
        </Button>
      </CardFooter>
    </Card>
  );
}
