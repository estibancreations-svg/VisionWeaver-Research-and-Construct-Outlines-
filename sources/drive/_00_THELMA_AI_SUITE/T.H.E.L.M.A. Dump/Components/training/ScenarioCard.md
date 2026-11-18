Original name: ScenarioCard.docx
Drive ID: 1OsXeMahbLkj95DDP5Le1bifh_iCSWwHY
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Components/training/
Modified: 2025-12-22T04:03:14.000Z

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Play, CheckCircle } from "lucide-react";

export default function ScenarioCard({ scenario, completed, onStart }) {
  return (
    <Card className={`transition-all ${completed ? 'bg-green-50 border-green-300' : 'hover:shadow-md'}`}>
      <CardContent className="pt-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-4 h-4 text-gray-500" />
              <h4 className="font-semibold text-sm">{scenario.title}</h4>
            </div>
            <p className="text-xs text-gray-600 mb-2">{scenario.description}</p>
            <Badge variant="outline" className="text-xs">
              {scenario.difficulty}
            </Badge>
          </div>
          {completed && (
            <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
          )}
        </div>

        <div className="text-xs text-gray-500 mb-3">
          <p><strong>Focus:</strong> {scenario.focus}</p>
          <p><strong>Tasks:</strong> {scenario.tasks?.length || 0}</p>
        </div>

        <Button 
          size="sm" 
          variant={completed ? 'outline' : 'default'}
          className="w-full"
          onClick={() => onStart(scenario)}
        >
          {completed ? (
            <>Review Scenario</>
          ) : (
            <>
              <Play className="w-3 h-3 mr-1" />
              Start Scenario
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
