Original name: HandsOnExercise.docx
Drive ID: 1RlvEBQKMSOKqAEB8-IstKbMuaMDMkCyH
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Components/training/
Modified: 2025-12-22T04:02:44.000Z

import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Target, TrendingUp, Award } from "lucide-react";

export default function HandsOnExercise({ 
  moduleId, 
  exerciseTitle, 
  instructions, 
  requiredItems,
  entityType,
  onComplete 
}) {
  const [itemsCreated, setItemsCreated] = useState(0);
  const [completed, setCompleted] = useState(false);
  const queryClient = useQueryClient();

  const updateProgressMutation = useMutation({
    mutationFn: async (data) => {
      const progress = await base44.entities.TrainingProgress.filter({
        module_id: moduleId,
        user_email: (await base44.auth.me()).email
      });

      if (progress[0]) {
        return base44.entities.TrainingProgress.update(progress[0].id, {
          items_created: itemsCreated,
          hands_on_completed: itemsCreated >= requiredItems,
          completion_percentage: Math.min(100, Math.round((itemsCreated / requiredItems) * 100))
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainingProgress'] });
    }
  });

  useEffect(() => {
    // Check created items periodically
    const checkProgress = async () => {
      try {
        const user = await base44.auth.me();
        const entities = await base44.entities[entityType].filter({ 
          created_by: user.email 
        });
        
        // Count items created in training mode (with TRAINING- prefix)
        const trainingItems = entities.filter(e => 
          e.unit_number?.includes('TRAINING-') || 
          e.full_name?.includes('TRAINING') ||
          e.email?.includes('training')
        );
        
        setItemsCreated(trainingItems.length);
        
        if (trainingItems.length >= requiredItems && !completed) {
          setCompleted(true);
          updateProgressMutation.mutate();
          onComplete?.();
        }
      } catch (error) {
        console.error('Error checking progress:', error);
      }
    };

    checkProgress();
    const interval = setInterval(checkProgress, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, [entityType, requiredItems, completed]);

  const progressPercentage = Math.min(100, Math.round((itemsCreated / requiredItems) * 100));

  return (
    <Card className="border-2 border-orange-300 bg-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-900">
          <Target className="w-5 h-5" />
          Hands-On Exercise
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">{exerciseTitle}</h4>
          <div className="prose prose-sm">
            {instructions}
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Your Progress</p>
            <Badge className={completed ? 'bg-green-500' : 'bg-orange-500'}>
              {itemsCreated} / {requiredItems}
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-3 mb-2" />
          <p className="text-xs text-gray-600">{progressPercentage}% Complete</p>
        </div>

        {completed ? (
          <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 text-center">
            <Award className="w-12 h-12 mx-auto text-green-600 mb-2" />
            <p className="font-bold text-green-900">Exercise Complete! 🎉</p>
            <p className="text-sm text-green-700">
              You've successfully created {itemsCreated} items (required: {requiredItems})
            </p>
          </div>
        ) : (
          <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
            <TrendingUp className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-800">
              Keep going! Create {requiredItems - itemsCreated} more {entityType.toLowerCase()}(s) to complete this exercise.
              Make sure to use "TRAINING-" prefix in names/unit numbers.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
