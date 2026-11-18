Original name: TrainingDataSeeder.docx
Drive ID: 1QVkt3XYfMmkFrUIOH8ZocAZnKbJ5z7oA
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Components/training/
Modified: 2025-12-22T04:03:42.000Z

import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function TrainingDataSeeder({ moduleId, entityType, count = 15 }) {
  const [status, setStatus] = useState('idle');
  const [created, setCreated] = useState(0);
  const queryClient = useQueryClient();

  const seedMutation = useMutation({
    mutationFn: async () => {
      setStatus('seeding');
      setCreated(0);

      const prompt = `Generate ${count} realistic mock ${entityType} records for training purposes in a trucking/logistics management system.

Requirements:
- Create diverse, realistic data
- Use "TRAINING-" prefix in relevant ID fields
- Vary difficulty levels (beginner, intermediate, advanced scenarios)
- Include edge cases and common scenarios
- Make each record unique but realistic

For ${entityType}, generate appropriate fields based on the entity type.

Return as JSON array.`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            records: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  // Generic structure, AI will adapt
                }
              }
            }
          }
        }
      });

      // Create records one by one to track progress
      for (let i = 0; i < response.records.length; i++) {
        await base44.entities[entityType].create(response.records[i]);
        setCreated(i + 1);
      }

      return response.records.length;
    },
    onSuccess: (count) => {
      setStatus('success');
      queryClient.invalidateQueries();
    },
    onError: () => {
      setStatus('error');
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Database className="w-4 h-4" />
          Training Data Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-gray-600">
          Generate {count} mock {entityType} records for hands-on practice
        </p>

        {status === 'idle' && (
          <Button onClick={() => seedMutation.mutate()} className="w-full">
            Generate Training Data
          </Button>
        )}

        {status === 'seeding' && (
          <div className="text-center space-y-2">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
            <p className="text-sm font-medium">Creating records...</p>
            <Badge>{created} / {count}</Badge>
          </div>
        )}

        {status === 'success' && (
          <div className="bg-green-50 border border-green-300 rounded-lg p-3 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-green-900">
              Successfully created {created} training records!
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-red-50 border border-red-300 rounded-lg p-3 text-center">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-red-900">
              Failed to generate data. Please try again.
            </p>
            <Button variant="outline" size="sm" onClick={() => setStatus('idle')} className="mt-2">
              Retry
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
