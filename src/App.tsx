/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { StoryNavigation, StoryTab } from './components/StoryNavigation';
import { Story1Market } from './components/Story1Market';
import { Story2Customer } from './components/Story2Customer';
import { Story3Technology } from './components/Story3Technology';
import { Story4User } from './components/Story4User';
import { Story5Success } from './components/Story5Success';
import { UcdEngineView } from './components/UcdEngineView';
import { UxMethodologiesMatrixView } from './components/UxMethodologiesMatrixView';
import { UxMethodologyDetailModal } from './components/UxMethodologyDetailModal';
import { AgentCouncilView } from './components/AgentCouncilView';
import { NewAnalysisModal } from './components/NewAnalysisModal';
import { RefineStoryModal } from './components/RefineStoryModal';
import { FullFrameworkData } from './types/framework';
import { UxMethodology } from './data/methodologies';
import { initialCaseStudy } from './data/caseStudies';
import { pulsecareSample, finflowSample } from './data/samples';
import { ExternalLink, Layers, Sparkles } from 'lucide-react';

export default function App() {
  const [frameworkData, setFrameworkData] = useState<FullFrameworkData>(initialCaseStudy);
  const [activeTab, setActiveTab] = useState<StoryTab>('market');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [selectedMethodology, setSelectedMethodology] = useState<UxMethodology | null>(null);
  const [refineModalConfig, setRefineModalConfig] = useState<{
    isOpen: boolean;
    storyIndex: number;
    storyName: string;
  }>({
    isOpen: false,
    storyIndex: 1,
    storyName: 'Market Story',
  });

  const handleSelectSample = (type: 'omnidesk' | 'pulsecare' | 'finflow') => {
    if (type === 'omnidesk') setFrameworkData(initialCaseStudy);
    else if (type === 'pulsecare') setFrameworkData(pulsecareSample);
    else if (type === 'finflow') setFrameworkData(finflowSample);
  };

  const handleOpenRefine = (index: number, name: string) => {
    setRefineModalConfig({
      isOpen: true,
      storyIndex: index,
      storyName: name,
    });
  };

  const getCurrentStoryDataForRefine = () => {
    switch (refineModalConfig.storyIndex) {
      case 1:
        return frameworkData.marketStory;
      case 2:
        return frameworkData.customerStory;
      case 3:
        return frameworkData.technologyStory;
      case 4:
        return frameworkData.userStory;
      case 5:
        return frameworkData.successStory;
      default:
        return {};
    }
  };

  const handleStoryRefined = (refinedStoryData: any) => {
    switch (refineModalConfig.storyIndex) {
      case 1:
        setFrameworkData({ ...frameworkData, marketStory: refinedStoryData });
        break;
      case 2:
        setFrameworkData({ ...frameworkData, customerStory: refinedStoryData });
        break;
      case 3:
        setFrameworkData({ ...frameworkData, technologyStory: refinedStoryData });
        break;
      case 4:
        setFrameworkData({ ...frameworkData, userStory: refinedStoryData });
        break;
      case 5:
        setFrameworkData({ ...frameworkData, successStory: refinedStoryData });
        break;
    }
  };

  return (
    <div className="min-h-screen ai-mesh-bg text-zinc-100 font-sans antialiased flex flex-col selection:bg-cyan-500 selection:text-black relative">
      {/* Subtle ambient grid overlay */}
      <div className="fixed inset-0 ai-grid-pattern pointer-events-none opacity-40 z-0" />

      {/* Global Header */}
      <Header
        frameworkData={frameworkData}
        onOpenNewModal={() => setIsNewModalOpen(true)}
        onToggleUcdModal={() => setActiveTab('ucd')}
        onToggleMethodologies={() => setActiveTab('methodologies')}
        onToggleAgents={() => setActiveTab('agents')}
        onSelectSample={handleSelectSample}
      />

      {/* Story Navigation Bar */}
      <StoryNavigation activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        {/* Story 01: Market */}
        {activeTab === 'market' && (
          <Story1Market
            data={frameworkData.marketStory}
            productContext={frameworkData.productContext}
            onRefineStory={() => handleOpenRefine(1, 'Market Story')}
            onUpdateData={(updated) =>
              setFrameworkData({ ...frameworkData, marketStory: updated })
            }
            onOpenMethodologyDetail={(m) => setSelectedMethodology(m)}
          />
        )}

        {/* Story 02: Customer */}
        {activeTab === 'customer' && (
          <Story2Customer
            data={frameworkData.customerStory}
            productContext={frameworkData.productContext}
            onRefineStory={() => handleOpenRefine(2, 'Customer Story')}
            onUpdateData={(updated) =>
              setFrameworkData({ ...frameworkData, customerStory: updated })
            }
            onOpenMethodologyDetail={(m) => setSelectedMethodology(m)}
          />
        )}

        {/* Story 03: Technology */}
        {activeTab === 'technology' && (
          <Story3Technology
            data={frameworkData.technologyStory}
            productContext={frameworkData.productContext}
            onRefineStory={() => handleOpenRefine(3, 'Technology Story')}
            onUpdateData={(updated) =>
              setFrameworkData({ ...frameworkData, technologyStory: updated })
            }
            onOpenMethodologyDetail={(m) => setSelectedMethodology(m)}
          />
        )}

        {/* Story 04: User */}
        {activeTab === 'user' && (
          <Story4User
            data={frameworkData.userStory}
            productContext={frameworkData.productContext}
            onRefineStory={() => handleOpenRefine(4, 'User Story')}
            onUpdateData={(updated) =>
              setFrameworkData({ ...frameworkData, userStory: updated })
            }
            onOpenMethodologyDetail={(m) => setSelectedMethodology(m)}
          />
        )}

        {/* Story 05: Success */}
        {activeTab === 'success' && (
          <Story5Success
            data={frameworkData.successStory}
            productContext={frameworkData.productContext}
            onRefineStory={() => handleOpenRefine(5, 'Success Story')}
            onUpdateData={(updated) =>
              setFrameworkData({ ...frameworkData, successStory: updated })
            }
            onOpenMethodologyDetail={(m) => setSelectedMethodology(m)}
          />
        )}

        {/* Multi-Agent Council & Swarm View */}
        {activeTab === 'agents' && (
          <AgentCouncilView
            frameworkData={frameworkData}
            onNavigateToStory={(tab) => setActiveTab(tab)}
          />
        )}

        {/* 17 UX Methodologies Matrix View */}
        {activeTab === 'methodologies' && (
          <UxMethodologiesMatrixView
            onNavigateToStory={(tab) => setActiveTab(tab)}
            onOpenMethodologyDetail={(m) => setSelectedMethodology(m)}
          />
        )}

        {/* UCD Practical Engine Overview */}
        {activeTab === 'ucd' && <UcdEngineView frameworkData={frameworkData} />}
      </main>

      {/* Grounding & Methodology Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md py-6 mt-12 text-xs text-zinc-400 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-200">E2E Product Design Framework</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>Created by John Papadami</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <a
              href="https://jpapadami.wixsite.com/home/e2e-product-design-framework"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
            >
              <span>Original Framework Specification</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px] text-zinc-500">
            <span>5 Stories (Market · Customer · Tech · User · Success)</span>
            <span aria-hidden="true">/</span>
            <span className="text-cyan-400/80">Neural Co-Pilots Active</span>
            <span aria-hidden="true">/</span>
            <span>UCD Practical Engine</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <UxMethodologyDetailModal
        methodology={selectedMethodology}
        onClose={() => setSelectedMethodology(null)}
      />

      <NewAnalysisModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onGenerated={(newData) => {
          setFrameworkData(newData);
          setActiveTab('market');
        }}
      />

      <RefineStoryModal
        isOpen={refineModalConfig.isOpen}
        onClose={() =>
          setRefineModalConfig({ ...refineModalConfig, isOpen: false })
        }
        storyIndex={refineModalConfig.storyIndex}
        storyName={refineModalConfig.storyName}
        currentStoryData={getCurrentStoryDataForRefine()}
        productContext={frameworkData.productContext}
        onRefined={handleStoryRefined}
      />
    </div>
  );
}
