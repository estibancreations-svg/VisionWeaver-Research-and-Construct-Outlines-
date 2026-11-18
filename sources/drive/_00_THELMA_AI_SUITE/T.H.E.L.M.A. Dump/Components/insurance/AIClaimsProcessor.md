Original name: AIClaimsProcessor.docx
Drive ID: 1Clhi1Dgy5k2ZiE7EQRF4daRiKRyvMKp3
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Components/insurance/
Modified: 2025-12-19T17:24:07.000Z

import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function AIClaimsProcessor({ provider, onComplete }) {
  const [stage, setStage] = useState('input'); // input, processing, results
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    policy_number: '',
    incident_description: '',
    estimated_damage: '',
    photos: []
  });
  const [aiAnalysis, setAiAnalysis] = useState(null);

  const queryClient = useQueryClient();

  const processClaimMutation = useMutation({
    mutationFn: async (data) => {
      setStage('processing');
      setProgress(20);

      // Step 1: Analyze incident and photos with AI
      const analysisPrompt = `Analyze this insurance claim:
      Policy: ${data.policy_number}
      Incident: ${data.incident_description}
      Estimated Damage: $${data.estimated_damage}
      
      Provide:
      1. Detailed damage assessment
      2. Coverage verification (assume standard auto/property policy)
      3. Recommended payout amount
      4. Risk factors or red flags
      5. Next steps for processing`;

      setProgress(40);

      const analysis = await base44.integrations.Core.InvokeLLM({
        prompt: analysisPrompt,
        response_json_schema: {
          type: "object",
          properties: {
            damage_estimate: { type: "number" },
            damage_description: { type: "string" },
            coverage_verified: { type: "boolean" },
            coverage_details: { type: "string" },
            recommended_action: { type: "string" },
            confidence_score: { type: "number" },
            risk_flags: { type: "array", items: { type: "string" } }
          }
        }
      });

      setProgress(70);

      // Step 2: Create ClaimReport
      const claimReport = await base44.entities.ClaimReport.create({
        claim_id: `CLM-${Date.now()}`,
        provider_id: provider?.id,
        policy_number: data.policy_number,
        claimant_email: (await base44.auth.me()).email,
        status: 'pending_review',
        incident_date: new Date().toISOString().split('T')[0],
        incident_description: data.incident_description,
        incident_photos: data.photos,
        ai_analysis: analysis,
        estimated_damage_cost: parseFloat(data.estimated_damage)
      });

      setProgress(100);

      return { analysis, claimReport };
    },
    onSuccess: (data) => {
      setAiAnalysis(data.analysis);
      setStage('results');
      queryClient.invalidateQueries({ queryKey: ['claimReports'] });
    }
  });

  const handleSubmit = () => {
    processClaimMutation.mutate(formData);
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    const uploadPromises = files.map(async (file) => {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      return file_url;
    });
    const urls = await Promise.all(uploadPromises);
    setFormData(prev => ({ ...prev, photos: [...prev.photos, ...urls] }));
  };

  if (stage === 'processing') {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <Loader2 className="w-12 h-12 md:w-16 md:h-16 mx-auto animate-spin text-blue-500" />
            <div>
              <p className="font-semibold text-base md:text-lg mb-2">AI Processing Claim</p>
              <p className="text-xs md:text-sm text-gray-500 mb-4">Analyzing incident details and verifying coverage...</p>
              <Progress value={progress} className="w-full" />
              <p className="text-xs text-gray-400 mt-2">{progress}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (stage === 'results' && aiAnalysis) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <CheckCircle className="w-5 h-5 text-green-500" />
            AI Analysis Complete
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-xs md:text-sm text-gray-600 mb-1">Estimated Damage</p>
              <p className="text-2xl md:text-3xl font-bold text-green-700">${aiAnalysis.damage_estimate?.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-xs md:text-sm text-gray-600 mb-1">Confidence Score</p>
              <p className="text-2xl md:text-3xl font-bold text-blue-700">{Math.round(aiAnalysis.confidence_score * 100)}%</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <Label className="text-xs md:text-sm">Coverage Status</Label>
              <Badge className={aiAnalysis.coverage_verified ? 'bg-green-500' : 'bg-red-500'}>
                {aiAnalysis.coverage_verified ? 'Verified' : 'Not Verified'}
              </Badge>
            </div>

            <div>
              <Label className="text-xs md:text-sm">Damage Description</Label>
              <p className="text-xs md:text-sm text-gray-700 mt-1">{aiAnalysis.damage_description}</p>
            </div>

            <div>
              <Label className="text-xs md:text-sm">Coverage Details</Label>
              <p className="text-xs md:text-sm text-gray-700 mt-1">{aiAnalysis.coverage_details}</p>
            </div>

            <div>
              <Label className="text-xs md:text-sm">Recommended Action</Label>
              <p className="text-xs md:text-sm text-gray-700 mt-1">{aiAnalysis.recommended_action}</p>
            </div>

            {aiAnalysis.risk_flags?.length > 0 && (
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                  <Label className="text-xs md:text-sm text-yellow-800">Risk Flags</Label>
                </div>
                <ul className="text-xs md:text-sm text-yellow-700 space-y-1">
                  {aiAnalysis.risk_flags.map((flag, i) => (
                    <li key={i}>• {flag}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={onComplete}>
              Approve & Submit to Provider
            </Button>
            <Button variant="outline" onClick={() => setStage('input')}>
              Revise
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
          <Sparkles className="w-5 h-5" />
          AI Claims Processor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-xs md:text-sm">Policy Number</Label>
          <Input
            value={formData.policy_number}
            onChange={(e) => setFormData(prev => ({ ...prev, policy_number: e.target.value }))}
            placeholder="Enter policy number"
            className="text-sm"
          />
        </div>

        <div>
          <Label className="text-xs md:text-sm">Incident Description</Label>
          <Textarea
            value={formData.incident_description}
            onChange={(e) => setFormData(prev => ({ ...prev, incident_description: e.target.value }))}
            placeholder="Describe what happened..."
            rows={4}
            className="text-sm"
          />
        </div>

        <div>
          <Label className="text-xs md:text-sm">Estimated Damage ($)</Label>
          <Input
            type="number"
            value={formData.estimated_damage}
            onChange={(e) => setFormData(prev => ({ ...prev, estimated_damage: e.target.value }))}
            placeholder="0"
            className="text-sm"
          />
        </div>

        <div>
          <Label className="text-xs md:text-sm">Upload Photos</Label>
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="text-sm"
          />
          {formData.photos.length > 0 && (
            <p className="text-xs text-gray-500 mt-1">{formData.photos.length} photo(s) uploaded</p>
          )}
        </div>

        <Button 
          onClick={handleSubmit} 
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={!formData.policy_number || !formData.incident_description}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Process with AI
        </Button>
      </CardContent>
    </Card>
  );
}
