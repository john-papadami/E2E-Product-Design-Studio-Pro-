import React, { useState } from 'react';
import { BookOpen, Layers, CheckCircle2, ArrowRight, ExternalLink, Search, Sparkles, Filter } from 'lucide-react';
import { UX_METHODOLOGIES, STORY_METHODOLOGIES_MAP, UxMethodology } from '../data/methodologies';
import { StoryTab } from './StoryNavigation';

interface UxMethodologiesMatrixViewProps {
  onNavigateToStory: (tab: StoryTab) => void;
  onOpenMethodologyDetail: (methodology: UxMethodology) => void;
}

export const UxMethodologiesMatrixView: React.FC<UxMethodologiesMatrixViewProps> = ({
  onNavigateToStory,
  onOpenMethodologyDetail,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStoryFilter, setSelectedStoryFilter] = useState<number | null>(null);

  const allMethodologies = Object.values(UX_METHODOLOGIES);

  const filteredMethodologies = allMethodologies.filter((m) => {
    const matchesStory = selectedStoryFilter === null || m.storyIndex === selectedStoryFilter;
    const matchesSearch =
      searchTerm === '' ||
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.keyArtifacts.some(a => a.toLowerCase().includes(searchTerm.toLowerCase())) ||
      m.metricsProduced.some(mt => mt.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStory && matchesSearch;
  });

  const storyTabMap: Record<number, StoryTab> = {
    1: 'market',
    2: 'customer',
    3: 'technology',
    4: 'user',
    5: 'success',
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
              <span>Framework Toolkit</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>17 Core Methodologies</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight font-sans">
              UX Methodologies in an E2E Story
            </h2>
            <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
              "Here is an example of some of the UX methodologies that can be used during each story of an E2E story." — John Papadami.
              Every story in the framework is powered by specialized discovery, prototyping, and validation practices.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/50 px-3 py-1.5 rounded-lg border border-emerald-800/50">
              17 Framework Methodologies
            </span>
          </div>
        </div>

        {/* Search & Story Filter */}
        <div className="mt-6 pt-5 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by methodology, artifact, or metric..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-100 placeholder-zinc-500 focus:outline-hidden focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1">
            <button
              onClick={() => setSelectedStoryFilter(null)}
              className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                selectedStoryFilter === null
                  ? 'bg-zinc-800 text-white font-semibold border border-zinc-700'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              All Stories
            </button>
            {[1, 2, 3, 4, 5].map((idx) => (
              <button
                key={idx}
                onClick={() => setSelectedStoryFilter(idx)}
                className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                  selectedStoryFilter === idx
                    ? 'bg-zinc-800 text-white font-semibold border border-zinc-700'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                Story 0{idx}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grouped by Story */}
      <div className="space-y-6">
        {[1, 2, 3, 4, 5].map((storyIdx) => {
          if (selectedStoryFilter !== null && selectedStoryFilter !== storyIdx) return null;
          const storyMethodologies = filteredMethodologies.filter(m => m.storyIndex === storyIdx);
          if (storyMethodologies.length === 0) return null;

          const storyTitle = storyMethodologies[0]?.storyName || `Story ${storyIdx}`;

          return (
            <div key={storyIdx} className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 shadow-lg space-y-4 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400">0{storyIdx}</span>
                  <h3 className="text-sm font-bold text-white">{storyTitle}</h3>
                  <span className="text-xs text-zinc-500 font-normal">
                    ({storyMethodologies.length} Methodologies)
                  </span>
                </div>

                <button
                  onClick={() => onNavigateToStory(storyTabMap[storyIdx])}
                  className="text-xs font-medium text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 hover:underline"
                >
                  <span>Open {storyTitle} Data Points</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {storyMethodologies.map((m) => (
                  <div
                    key={m.id}
                    className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/70 hover:bg-zinc-950 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-3 shadow-xs"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-xs text-white">{m.name}</h4>
                        <button
                          onClick={() => onOpenMethodologyDetail(m)}
                          className="text-[10px] font-mono text-emerald-400 hover:text-emerald-300 underline shrink-0 flex items-center gap-0.5"
                        >
                          <span>Playbook</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <p className="text-xs text-zinc-400 leading-snug">
                        {m.definition}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-zinc-800/80 space-y-1.5 text-xs">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Key Artifact</span>
                        <div className="text-zinc-200 font-medium text-[11px] mt-0.5">{m.keyArtifacts[0]}</div>
                      </div>

                      <div className="bg-zinc-900/90 p-2.5 rounded-lg border border-zinc-800 text-[11px] text-zinc-400 italic">
                        "{m.exampleOutput}"
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
