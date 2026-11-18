Original name: ProviderCard.docx
Drive ID: 1F7HA20jVEiFxFE8K8ttiQpj11q0uk-3N
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Components/insurance/
Modified: 2025-12-19T17:24:58.000Z

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Phone, Mail, Globe, Settings } from "lucide-react";

export default function ProviderCard({ provider }) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-600',
    pending_integration: 'bg-yellow-100 text-yellow-800'
  };

  const integrationIcons = {
    api: '🔌 API',
    portal: '🌐 Portal',
    manual: '✍️ Manual',
    hybrid: '🔄 Hybrid'
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-sm md:text-base">{provider.provider_name}</h3>
              <p className="text-xs md:text-sm text-gray-500">{provider.provider_code}</p>
            </div>
          </div>
          <Badge className={statusColors[provider.status]} className="text-xs">
            {provider.status}
          </Badge>
        </div>

        <div className="space-y-2 mb-3 text-xs md:text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <span className="font-medium">Type:</span>
            <span>{integrationIcons[provider.integration_type] || provider.integration_type}</span>
          </div>

          {provider.contact_info?.claims_phone && (
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-3 h-3 md:w-4 md:h-4" />
              <span>{provider.contact_info.claims_phone}</span>
            </div>
          )}

          {provider.contact_info?.email && (
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-3 h-3 md:w-4 md:h-4" />
              <span className="truncate">{provider.contact_info.email}</span>
            </div>
          )}

          {provider.contact_info?.portal_url && (
            <div className="flex items-center gap-2 text-gray-600">
              <Globe className="w-3 h-3 md:w-4 md:h-4" />
              <a 
                href={provider.contact_info.portal_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline truncate"
              >
                Provider Portal
              </a>
            </div>
          )}
        </div>

        {provider.supported_services?.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-medium text-gray-700 mb-1">Services:</p>
            <div className="flex flex-wrap gap-1">
              {provider.supported_services.slice(0, 3).map((service, i) => (
                <Badge key={i} variant="outline" className="text-xs">{service}</Badge>
              ))}
              {provider.supported_services.length > 3 && (
                <Badge variant="outline" className="text-xs">+{provider.supported_services.length - 3}</Badge>
              )}
            </div>
          </div>
        )}

        <Button size="sm" variant="outline" className="w-full text-xs md:text-sm">
          <Settings className="w-3 h-3 md:w-4 md:h-4 mr-2" />
          Configure
        </Button>
      </CardContent>
    </Card>
  );
}
