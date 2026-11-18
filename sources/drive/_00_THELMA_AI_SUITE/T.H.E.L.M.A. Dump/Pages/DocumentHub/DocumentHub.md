Original name: DocumentHub.docx
Drive ID: 1-RVfW70SsANVB09xeW5EUQtApy2F09dl
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Pages/DocumentHub/
Modified: 2025-12-19T15:23:42.000Z

import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, Search } from "lucide-react";
import DocumentUpload from '@/components/docs/DocumentUpload';
import DocumentCard from '@/components/docs/DocumentCard';

export default function DocumentHub() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showUpload, setShowUpload] = useState(false);

  const queryClient = useQueryClient();

  const { data: documents = [] } = useQuery({
    queryKey: ['documents'],
    queryFn: () => base44.entities.Document.list('-created_date')
  });

  const uploadMutation = useMutation({
    mutationFn: async (data) => {
      const { file_url } = await base44.integrations.Core.UploadFile({ file: data.file });
      return base44.entities.Document.create({
        ...data,
        document_id: `DOC-${Date.now()}`,
        file_url,
        file_type: data.file.type,
        file_size: data.file.size
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      setShowUpload(false);
    }
  });

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categoryCounts = documents.reduce((acc, doc) => {
    acc[doc.category] = (acc[doc.category] || 0) + 1;
    return acc;
  }, {});

  const expiringDocs = documents.filter(doc => {
    if (!doc.expiry_date) return false;
    const daysUntilExpiry = (new Date(doc.expiry_date) - new Date()) / (1000 * 60 * 60 * 24);
    return daysUntilExpiry < 30 && daysUntilExpiry > 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <FileText className="w-8 h-8" />
              Document Hub
            </h1>
            <p className="text-gray-600">Central repository for all fleet documents</p>
          </div>
          <Button onClick={() => setShowUpload(true)}>
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-4xl font-bold">{documents.length}</p>
              <p className="text-sm text-gray-500">Total Documents</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-4xl font-bold text-orange-600">{expiringDocs.length}</p>
              <p className="text-sm text-gray-500">Expiring Soon</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-4xl font-bold text-blue-600">{categoryCounts.insurance || 0}</p>
              <p className="text-sm text-gray-500">Insurance Docs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-4xl font-bold text-green-600">{categoryCounts.certification || 0}</p>
              <p className="text-sm text-gray-500">Certifications</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {['all', 'registration', 'insurance', 'license', 'certification', 'maintenance_record'].map(cat => (
                  <Button
                    key={cat}
                    size="sm"
                    variant={categoryFilter === cat ? 'default' : 'outline'}
                    onClick={() => setCategoryFilter(cat)}
                    className="whitespace-nowrap"
                  >
                    {cat === 'all' ? 'All' : cat.replace('_', ' ')}
                    {cat !== 'all' && categoryCounts[cat] > 0 && (
                      <Badge className="ml-2" variant="secondary">{categoryCounts[cat]}</Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocs.map(doc => (
                <DocumentCard key={doc.id} document={doc} />
              ))}
              {filteredDocs.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <FileText className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">No documents found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {showUpload && (
        <DocumentUpload
          onClose={() => setShowUpload(false)}
          onSubmit={(data) => uploadMutation.mutate(data)}
        />
      )}
    </div>
  );
}
