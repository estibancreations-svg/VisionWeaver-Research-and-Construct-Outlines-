Original name: TrainingTruckingPro.docx
Drive ID: 11z8AtXxgrRXlK6xBh0SdI6ETWgeyJHL5
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Pages/TrainingTruckingPro/
Modified: 2025-12-19T16:44:19.000Z

import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, CheckCircle, FileText, ArrowLeft, Truck, Sparkles } from "lucide-react";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AITrainingAssistant from '@/components/training/AITrainingAssistant';
import HandsOnExercise from '@/components/training/HandsOnExercise';
import ScenarioCard from '@/components/training/ScenarioCard';
import TrainingDataSeeder from '@/components/training/TrainingDataSeeder';

export default function TrainingTruckingPro() {
  const [currentSection, setCurrentSection] = useState(0);
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me()
  });

  const { data: progress } = useQuery({
    queryKey: ['moduleProgress', 'trucking-pro'],
    queryFn: () => base44.entities.TrainingProgress.filter({ 
      user_email: user.email, 
      module_id: 'trucking-pro' 
    }).then(res => res[0]),
    enabled: !!user
  });

  const updateProgressMutation = useMutation({
    mutationFn: async (updates) => {
      if (progress?.id) {
        return base44.entities.TrainingProgress.update(progress.id, updates);
      } else {
        return base44.entities.TrainingProgress.create({
          user_email: user.email,
          module_id: 'trucking-pro',
          module_name: 'Trucking Pro Dispatch',
          ...updates
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moduleProgress'] });
      queryClient.invalidateQueries({ queryKey: ['trainingProgress'] });
    }
  });

  const [activeScenario, setActiveScenario] = useState(null);
  const [showAI, setShowAI] = useState(false);

  const scenarios = [
    { id: 'basic-truck', title: 'Add Your First Truck', description: 'Learn to register a new truck in the fleet', difficulty: 'Beginner', focus: 'Equipment management', tasks: ['Create truck record', 'Add specifications', 'Assign to fleet'] },
    { id: 'driver-assign', title: 'Assign Driver to Load', description: 'Match drivers with available loads', difficulty: 'Beginner', focus: 'Load assignment', tasks: ['Select load', 'Choose driver', 'Confirm assignment'] },
    { id: 'route-opt', title: 'Optimize Complex Route', description: 'Use AI to plan multi-stop route', difficulty: 'Intermediate', focus: 'Route planning', tasks: ['Input waypoints', 'Run optimization', 'Review alternatives'] },
    { id: 'hazmat', title: 'Hazmat Load Routing', description: 'Plan compliant route for hazmat shipment', difficulty: 'Advanced', focus: 'Compliance', tasks: ['Set hazmat flags', 'Verify certifications', 'Approve route'] },
    { id: 'emergency', title: 'Handle Emergency Incident', description: 'Respond to driver emergency on route', difficulty: 'Advanced', focus: 'Crisis management', tasks: ['Report incident', 'Dispatch support', 'Update customer'] }
  ];

  const sections = [
    {
      title: "Introduction to Trucking Pro",
      duration: "5 min",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      hasExercise: false,
      content: `
        <h3>Welcome to Trucking Pro Dispatch Training</h3>
        <p>This module will teach you how to:</p>
        <ul>
          <li>Set up your fleet and add trucks</li>
          <li>Assign drivers to loads</li>
          <li>Track shipments in real-time</li>
          <li>Optimize routes with AI</li>
          <li>Manage billing and invoicing</li>
        </ul>
        <p><strong>What You'll Practice:</strong> Create and manage 15 trucks and 15 drivers through realistic scenarios.</p>
      `
    },
    {
      title: "Adding Your First Truck",
      duration: "10 min",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      hasExercise: true,
      exerciseTitle: "Create 8 Training Trucks",
      exerciseEntity: "Truck",
      exerciseRequired: 8,
      exerciseInstructions: (
        <div>
          <h4 className="font-semibold mb-2">Step-by-Step Instructions:</h4>
          <ol className="list-decimal ml-5 space-y-1 text-sm">
            <li>Click the <strong>Team Setup</strong> link in the navigation</li>
            <li>Select the <strong>Equipment</strong> tab</li>
            <li>Click <strong>Add Equipment</strong> button</li>
            <li>Fill in the form with truck details</li>
            <li>Use <strong>"TRAINING-"</strong> prefix in Unit Number (e.g., TRAINING-001)</li>
            <li>Add specifications (weight, height, fuel type, VIN)</li>
            <li>Click <strong>Add Equipment</strong> to save</li>
            <li>Repeat for 8 different trucks with varying specs</li>
          </ol>
          <div className="mt-3 p-2 bg-blue-50 rounded text-xs">
            💡 <strong>Tip:</strong> Try different truck types (Semi, Box Truck, Flatbed, Reefer) and vary the specifications to practice different scenarios.
          </div>
        </div>
      ),
      content: `
        <h3>Equipment Management Fundamentals</h3>
        <p>Learn how to properly register and configure trucks in the system.</p>
        <h4>Key Fields Explained:</h4>
        <ul>
          <li><strong>Unit Number:</strong> Unique identifier for your truck (use TRAINING- prefix for practice)</li>
          <li><strong>VIN:</strong> Vehicle Identification Number (17 characters)</li>
          <li><strong>Type:</strong> Semi, Box Truck, Flatbed, Reefer, etc.</li>
          <li><strong>Max Weight:</strong> Maximum loaded weight in pounds</li>
          <li><strong>Height:</strong> Overall height in inches (important for bridge clearances)</li>
          <li><strong>Fuel Type:</strong> Diesel, Gasoline, Electric, Hybrid</li>
        </ul>
      `
    },
    {
      title: "Route Optimization",
      duration: "15 min",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      hasExercise: true,
      exerciseTitle: "Plan 5 Optimized Routes",
      exerciseEntity: "Route",
      exerciseRequired: 5,
      exerciseInstructions: (
        <div>
          <h4 className="font-semibold mb-2">Practice Route Planning:</h4>
          <ol className="list-decimal ml-5 space-y-1 text-sm">
            <li>Go to <strong>Route Optimizer</strong> page</li>
            <li>Enter origin and destination addresses</li>
            <li>Select a truck from the dropdown</li>
            <li>Click <strong>AI Optimize</strong> tab</li>
            <li>Review the AI-generated route options</li>
            <li>Compare fuel costs, time, and safety scores</li>
            <li>Select and save the optimal route</li>
            <li>Create 5 different routes with varying complexity</li>
          </ol>
        </div>
      ),
      content: `
        <h3>AI-Powered Route Planning</h3>
        <p>Learn how to use the Route Optimizer to:</p>
        <ul>
          <li>Input origin and destination</li>
          <li>Select your truck (constraints auto-populate)</li>
          <li>Run AI optimization considering traffic, weather, and fuel costs</li>
          <li>Review multiple route options</li>
          <li>Save and approve the optimal route</li>
        </ul>
        <p><strong>Key Features:</strong></p>
        <ul>
          <li>Real-time traffic analysis</li>
          <li>Weather alerts along the route</li>
          <li>Fuel cost calculations</li>
          <li>Maintenance risk assessment</li>
          <li>DOT compliance checking</li>
        </ul>
      `
    },
    {
      title: "Live Tracking & Communication",
      duration: "8 min",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      hasExercise: false,
      content: `
        <h3>Monitor Your Fleet in Real-Time</h3>
        <p>The Fleet Dashboard provides:</p>
        <ul>
          <li>Live GPS tracking on interactive map</li>
          <li>Two-way messaging with drivers</li>
          <li>Automated alerts for critical events</li>
          <li>Telematics data (fuel, diagnostics, etc.)</li>
        </ul>
        <p><strong>Communication Tools:</strong></p>
        <ul>
          <li>In-app messaging panel</li>
          <li>Emergency alert system</li>
          <li>Status updates and notifications</li>
        </ul>
      `
    },
    {
      title: "Final Assessment",
      duration: "10 min",
      videoUrl: null,
      hasExercise: false,
      content: `
        <h3>Test Your Knowledge</h3>
        <p>Complete the following tasks to finish the module:</p>
        <ol>
          <li>Add a new truck to your fleet</li>
          <li>Create a route from Los Angeles, CA to Phoenix, AZ</li>
          <li>Optimize the route using AI</li>
          <li>Review the route details and approve it</li>
        </ol>
        <p>Once completed, you'll earn your Trucking Pro certification!</p>
      `
    }
  ];

  const completedSections = currentSection + 1;
  const progressPercentage = Math.round((completedSections / sections.length) * 100);

  const markSectionComplete = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      updateProgressMutation.mutate({
        status: 'in_progress',
        completion_percentage: progressPercentage
      });
    } else {
      updateProgressMutation.mutate({
        status: 'completed',
        completion_percentage: 100,
        completed_at: new Date().toISOString()
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to={createPageUrl('TrainingHub')}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Training Hub
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                <Truck className="w-8 h-8 text-emerald-600" />
                Trucking Pro Training
              </h1>
            </div>
          </div>
          <Badge className="bg-emerald-500">{progressPercentage}% Complete</Badge>
        </div>

        {/* Progress Bar */}
        <Card>
          <CardContent className="pt-6">
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-sm text-gray-500 mt-2">
              Section {completedSections} of {sections.length}
            </p>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Section List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Sections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sections.map((section, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSection(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentSection === index 
                        ? 'bg-emerald-100 border-2 border-emerald-500' 
                        : index < currentSection
                        ? 'bg-green-50'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {index < currentSection ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                      )}
                      <p className="font-medium text-sm">{section.title}</p>
                    </div>
                    <p className="text-xs text-gray-500 ml-6">{section.duration}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-4">
            {/* Video Player */}
            {sections[currentSection].videoUrl && (
              <Card>
                <CardContent className="pt-6">
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={sections[currentSection].videoUrl}
                      title={sections[currentSection].title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Text Content */}
            <Card>
              <CardHeader>
                <CardTitle>{sections[currentSection].title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: sections[currentSection].content }}
                />
              </CardContent>
            </Card>

            {/* Hands-On Exercise */}
            {sections[currentSection].hasExercise && (
              <HandsOnExercise
                moduleId="trucking-pro"
                exerciseTitle={sections[currentSection].exerciseTitle}
                instructions={sections[currentSection].exerciseInstructions}
                requiredItems={sections[currentSection].exerciseRequired}
                entityType={sections[currentSection].exerciseEntity}
                onComplete={() => markSectionComplete()}
              />
            )}

            {/* Scenarios Section */}
            {currentSection === 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Practice Scenarios</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {scenarios.map(scenario => (
                      <ScenarioCard
                        key={scenario.id}
                        scenario={scenario}
                        completed={progress?.scenarios_completed?.includes(scenario.id)}
                        onStart={setActiveScenario}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                disabled={currentSection === 0}
              >
                Previous
              </Button>
              <Button
                onClick={markSectionComplete}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {currentSection < sections.length - 1 ? 'Next Section' : 'Complete Module'}
                {currentSection < sections.length - 1 && '→'}
              </Button>
            </div>
          </div>

          {/* Right Sidebar - AI Assistant */}
          <div className="lg:col-span-1 space-y-4">
            <Button 
              variant={showAI ? 'default' : 'outline'} 
              className="w-full"
              onClick={() => setShowAI(!showAI)}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {showAI ? 'Hide' : 'Show'} AI Assistant
            </Button>

            {showAI && (
              <div className="sticky top-6">
                <AITrainingAssistant 
                  moduleId="trucking-pro"
                  moduleName="Trucking Pro Dispatch"
                />
              </div>
            )}

            {currentSection === 1 && (
              <TrainingDataSeeder 
                moduleId="trucking-pro"
                entityType="Truck"
                count={15}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
