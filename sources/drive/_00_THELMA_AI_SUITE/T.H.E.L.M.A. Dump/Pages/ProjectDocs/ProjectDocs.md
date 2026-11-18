Original name: ProjectDocs.docx
Drive ID: 1YWiGHgyjIMSk73BDJTJrggUOqZNgVSxS
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Pages/ProjectDocs/
Modified: 2025-12-19T16:41:01.000Z

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, History, Milestone, Flag } from "lucide-react";
import ProjectMapping from '@/components/docs/ProjectMapping';
import ProjectHistory from '@/components/docs/ProjectHistory';
import ProjectRoadmap from '@/components/docs/ProjectRoadmap';

export default function ProjectDocs() {
  const [activeTab, setActiveTab] = useState('mapping');

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Flag className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">MOTIVE NEXT</h1>
          </div>
          <p className="text-lg text-gray-600">Project Documentation & Roadmap</p>
          <p className="text-sm text-gray-500 mt-1">Steven Henry • Proudly Made In America 🇺🇸</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="mapping" className="flex items-center gap-2">
              <Map className="w-4 h-4" />
              <span className="hidden sm:inline">Project</span> Mapping
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="w-4 h-4" />
              History
            </TabsTrigger>
            <TabsTrigger value="roadmap" className="flex items-center gap-2">
              <Milestone className="w-4 h-4" />
              Roadmap
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mapping" className="mt-6">
            <ProjectMapping />
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <ProjectHistory />
          </TabsContent>

          <TabsContent value="roadmap" className="mt-6">
            <ProjectRoadmap />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
