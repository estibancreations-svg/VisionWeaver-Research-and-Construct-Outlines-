Original name: ProtocolCard.docx
Drive ID: 19U27afc2icFdCfJbfxR3u7yKB7gbMaVd
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/THELMA HENRYAI LILY PASTE CODE/Components/emergency/
Modified: 2025-12-19T17:22:09.000Z

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ChevronDown, ChevronUp, Phone, Video } from "lucide-react";

export default function ProtocolCard({ protocol }) {
  const [expanded, setExpanded] = useState(false);

  const severityColors = {
    life_threatening: 'bg-red-600 text-white',
    serious: 'bg-orange-500 text-white',
    moderate: 'bg-yellow-500 text-white',
    minor: 'bg-blue-500 text-white'
  };

  return (
    <Card className={`${protocol.call_911_immediately ? 'border-red-500 border-2' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-base md:text-lg">{protocol.title}</CardTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge className={severityColors[protocol.severity_level]} className="text-xs">
                {protocol.severity_level?.replace('_', ' ')}
              </Badge>
              <Badge variant="outline" className="capitalize text-xs">{protocol.category}</Badge>
              {protocol.call_911_immediately && (
                <Badge className="bg-red-600 text-white flex items-center gap-1 text-xs">
                  <Phone className="w-3 h-3" />
                  Call 911
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {protocol.symptoms?.length > 0 && (
          <div>
            <p className="text-xs md:text-sm font-medium text-gray-700 mb-1">Symptoms:</p>
            <div className="flex flex-wrap gap-1">
              {protocol.symptoms.slice(0, 3).map((symptom, i) => (
                <Badge key={i} variant="secondary" className="text-xs">{symptom}</Badge>
              ))}
              {protocol.symptoms.length > 3 && !expanded && (
                <Badge variant="secondary" className="text-xs">+{protocol.symptoms.length - 3} more</Badge>
              )}
            </div>
          </div>
        )}

        {expanded && (
          <>
            {protocol.immediate_actions?.length > 0 && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-medium text-blue-800 mb-2 text-sm md:text-base">Immediate Actions:</p>
                <ol className="space-y-2">
                  {protocol.immediate_actions.map((action, i) => (
                    <li key={i} className="text-xs md:text-sm">
                      <span className="font-semibold">Step {action.step}:</span> {action.instruction}
                      {action.warning && (
                        <p className="text-red-600 mt-1 flex items-start gap-1">
                          <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
                          {action.warning}
                        </p>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {protocol.supplies_needed?.length > 0 && (
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-700 mb-1">Supplies Needed:</p>
                <div className="flex flex-wrap gap-1">
                  {protocol.supplies_needed.map((supply, i) => (
                    <Badge key={i} variant="outline" className="text-xs">{supply}</Badge>
                  ))}
                </div>
              </div>
            )}

            {protocol.do_not_do?.length > 0 && (
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="font-medium text-red-800 mb-2 text-sm md:text-base">⚠️ Do NOT:</p>
                <ul className="space-y-1">
                  {protocol.do_not_do.map((dont, i) => (
                    <li key={i} className="text-xs md:text-sm text-red-700">• {dont}</li>
                  ))}
                </ul>
              </div>
            )}

            {protocol.video_url && (
              <Button variant="outline" className="w-full text-xs md:text-sm" asChild>
                <a href={protocol.video_url} target="_blank" rel="noopener noreferrer">
                  <Video className="w-4 h-4 mr-2" />
                  Watch Instructional Video
                </a>
              </Button>
            )}
          </>
        )}

        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setExpanded(!expanded)}
          className="w-full text-xs md:text-sm"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-2" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-2" />
              Show Full Protocol
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
