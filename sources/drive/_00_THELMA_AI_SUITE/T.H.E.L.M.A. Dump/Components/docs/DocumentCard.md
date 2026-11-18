Original name: DocumentCard.docx
Drive ID: 1Ds4BIALlWPBUTAH-VKkWxxo56NcyLkLw
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Components/docs/
Modified: 2025-12-19T17:06:49.000Z

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, AlertCircle } from "lucide-react";
import { format } from 'date-fns';

export default function DocumentCard({ document }) {
  const isExpiringSoon = document.expiry_date && 
    (new Date(document.expiry_date) - new Date()) / (1000 * 60 * 60 * 24) < 30;

  const categoryColors = {
    registration: 'bg-blue-100 text-blue-800',
    insurance: 'bg-purple-100 text-purple-800',
    license: 'bg-green-100 text-green-800',
    certification: 'bg-orange-100 text-orange-800',
    maintenance_record: 'bg-yellow-100 text-yellow-800',
    invoice: 'bg-pink-100 text-pink-800',
    other: 'bg-gray-100 text-gray-800'
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-4">
        <div className="flex items-start gap-3 mb-3">
          <FileText className="w-8 h-8 text-blue-500 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{document.title}</p>
            <Badge className={`${categoryColors[document.category]} text-xs mt-1`}>
              {document.category.replace('_', ' ')}
            </Badge>
          </div>
        </div>

        {document.description && (
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{document.description}</p>
        )}

        {document.expiry_date && (
          <div className={`flex items-center gap-1 text-xs mb-2 ${isExpiringSoon ? 'text-orange-600' : 'text-gray-500'}`}>
            {isExpiringSoon && <AlertCircle className="w-3 h-3" />}
            Expires: {format(new Date(document.expiry_date), 'MMM d, yyyy')}
          </div>
        )}

        {document.entity_type !== 'none' && (
          <p className="text-xs text-gray-500 mb-3">
            Linked to: {document.entity_type} ({document.entity_id})
          </p>
        )}

        {document.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {document.tags.slice(0, 3).map((tag, i) => (
              <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1" asChild>
            <a href={document.file_url} target="_blank" rel="noopener noreferrer">
              <Eye className="w-3 h-3 mr-1" />
              View
            </a>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <a href={document.file_url} download>
              <Download className="w-3 h-3" />
            </a>
          </Button>
        </div>

        <p className="text-xs text-gray-400 mt-2">
          v{document.version} • {format(new Date(document.created_date), 'MMM d')}
        </p>
      </CardContent>
    </Card>
  );
}
