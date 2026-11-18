Original name: InsuranceStation.docx
Drive ID: 1YeyrTY6T9AxRudJLVnkwc3qWcq-Y03u0
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Pages/InsuranceStation/
Modified: 2025-12-19T16:39:31.000Z

import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Shield, Plus, Search, Building2, FileText, AlertCircle, Sparkles } from "lucide-react";
import ProviderCard from '@/components/insurance/ProviderCard';
import ClaimForm from '@/components/insurance/ClaimForm';
import AIClaimsProcessor from '@/components/insurance/AIClaimsProcessor';

export default function InsuranceStation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showClaimForm, setShowClaimForm] = useState(false);
  const [showAIProcessor, setShowAIProcessor] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const queryClient = useQueryClient();

  const { data: providers = [] } = useQuery({
    queryKey: ['insuranceProviders'],
    queryFn: () => base44.entities.InsuranceProvider.list('provider_name')
  });

  const filteredProviders = providers.filter(p =>
    p.provider_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.provider_code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: providers.length,
    active: providers.filter(p => p.status === 'active').length,
    pending: providers.filter(p => p.status === 'pending_integration').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-yellow-900 to-amber-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <Shield className="w-6 h-6 md:w-8 md:h-8" />
              Insurance Station
            </h1>
            <p className="text-amber-200 text-sm md:text-base">Provider Connections & Claims Management</p>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <Button onClick={() => setShowClaimForm(true)} className="bg-amber-600 hover:bg-amber-700">
              <Plus className="w-4 h-4 mr-2" />
              New Claim
            </Button>
            <Button onClick={() => setShowAIProcessor(true)} className="bg-blue-600 hover:bg-blue-700">
              <Sparkles className="w-4 h-4 mr-2" />
              AI Claims Processor
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <Card className="bg-white/10 border-white/20">
            <CardContent className="pt-4 text-center">
              <p className="text-2xl md:text-3xl font-bold text-white">{stats.total}</p>
              <p className="text-xs md:text-sm text-amber-200">Total Providers</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20">
            <CardContent className="pt-4 text-center">
              <p className="text-2xl md:text-3xl font-bold text-green-400">{stats.active}</p>
              <p className="text-xs md:text-sm text-amber-200">Active</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20">
            <CardContent className="pt-4 text-center">
              <p className="text-2xl md:text-3xl font-bold text-yellow-400">{stats.pending}</p>
              <p className="text-xs md:text-sm text-amber-200">Pending</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="providers" className="space-y-4">
          <TabsList className="bg-white/10 w-full grid grid-cols-3">
            <TabsTrigger value="providers" className="data-[state=active]:bg-white text-xs md:text-sm">
              <Building2 className="w-4 h-4 mr-1 md:mr-2" />
              Providers
            </TabsTrigger>
            <TabsTrigger value="claims" className="data-[state=active]:bg-white text-xs md:text-sm">
              <FileText className="w-4 h-4 mr-1 md:mr-2" />
              Claims
            </TabsTrigger>
            <TabsTrigger value="buffer" className="data-[state=active]:bg-white text-xs md:text-sm">
              <AlertCircle className="w-4 h-4 mr-1 md:mr-2" />
              Buffer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="providers">
            <Card className="bg-white/95">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <CardTitle className="text-base md:text-lg">Insurance Providers</CardTitle>
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input 
                      placeholder="Search providers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 text-sm"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
                  {filteredProviders.map(provider => (
                    <ProviderCard key={provider.id} provider={provider} />
                  ))}
                </div>
                {filteredProviders.length === 0 && (
                  <div className="text-center py-8 md:py-12">
                    <Building2 className="w-8 h-8 md:w-12 md:h-12 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 text-sm md:text-base">No providers found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="claims">
            <Card className="bg-white/95">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Recent Claims</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 md:py-12">
                  <FileText className="w-8 h-8 md:w-12 md:h-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 mb-4 text-sm md:text-base">Claims management coming soon</p>
                  <Button onClick={() => setShowClaimForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Claim
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="buffer">
            <Card className="bg-white/95">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Buffer Layer Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2 text-sm md:text-base">What is the Buffer Layer?</h3>
                    <p className="text-xs md:text-sm text-blue-700">
                      The buffer layer acts as secure middleware between MOTIVE NEXT and external insurance providers. 
                      It handles rate limiting, data translation, authentication, and ensures reliable communication with 
                      providers like Allstate, Geico, and Prudential.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium text-sm">Rate Limiting</p>
                      <p className="text-xs text-gray-600">Controls API request frequency per provider</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium text-sm">Retry Logic</p>
                      <p className="text-xs text-gray-600">Automatic retry with exponential backoff</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium text-sm">Data Translation</p>
                      <p className="text-xs text-gray-600">Converts between provider-specific formats</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium text-sm">Security</p>
                      <p className="text-xs text-gray-600">Encrypted connections and credential management</p>
                    </div>
                  </div>

                  <Badge className="bg-yellow-500 text-white">
                    Backend Integration Required
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {showClaimForm && (
        <ClaimForm 
          providers={providers}
          onClose={() => setShowClaimForm(false)}
          onSubmit={(data) => {
            console.log('Claim submitted:', data);
            setShowClaimForm(false);
          }}
        />
      )}

      {showAIProcessor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="max-w-2xl w-full">
            <AIClaimsProcessor 
              provider={selectedProvider || providers[0]}
              onComplete={() => setShowAIProcessor(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
