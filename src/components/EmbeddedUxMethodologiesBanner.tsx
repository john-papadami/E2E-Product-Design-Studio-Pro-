import React, { useState } from 'react';
import { Sparkles, Layers, BookOpen, CheckCircle, ChevronDown, ChevronUp, ExternalLink, ArrowRight } from 'lucide-react';
import { UX_METHODOLOGIES, STORY_METHODOLOGIES_MAP, UxMethodology } from '../data/methodologies';

interface EmbeddedUxMethodologiesBannerProps {
  storyIndex: 1 | 2 | 3 | 4 | 5;
  storyName: string;
  activeMethodologyFilter?: string | null;
  onSelectMethodologyFilter?: (methodologyId: string | null) => void;
  onOpenMethodologyDetail?: (methodology: UxMethodology) => void;
}

export const EmbeddedUxMethodologiesBanner: React.FC<EmbeddedUxMethodologiesBannerProps> = ({
  storyIndex,
  storyName,
  activeMethodologyFilter,
  onSelectMethodologyFilter,
  onOpenMethodologyDetail,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const methodologyIds = STORY_METHODOLOGIES_MAP[storyIndex] || [];
  const methodologies = methodologyIds.map(id => UX_METHODOLOGIES[id]).filter(Boolean);

  return (
    <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4 shadow-sm backdrop-blur-md transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-sm">
            UX
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                Embedded UX Methodologies
              </span>
              <span className="text-[10px] font-mono bg-emerald-950/50 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800/50 font-medium">
                {methodologies.length} Active in {storyName}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              John Papadami framework methodologies executed to generate the data points below
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-white font-medium px-2.5 py-1 rounded-lg hover:bg-zinc-800/60 border border-transparent hover:border-zinc-700 transition-colors"
          >
            <span>{isExpanded ? 'Collapse Methodologies' : 'Explore Methodologies'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Methodology Chips / Quick Filter */}
      <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-zinc-800/80">
        <span className="text-[11px] font-mono text-zinc-500 mr-1 hidden sm:inline">Filter by UX Method:</span>
        <button
          onClick={() => onSelectMethodologyFilter && onSelectMethodologyFilter(null)}
          className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
            !activeMethodologyFilter
              ? 'bg-zinc-800 text-white font-medium border border-zinc-700 shadow-sm'
              : 'bg-zinc-950/70 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
          }`}
        >
          All Methods ({methodologies.length})
        </button>

        {methodologies.map((m) => {
          const isActive = activeMethodologyFilter === m.id;
          return (
            <div key={m.id} className="inline-flex items-center">
              <button
                onClick={() => onSelectMethodologyFilter && onSelectMethodologyFilter(isActive ? null : m.id)}
                className={`px-2.5 py-1 rounded-lg text-xs transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 font-semibold border border-emerald-500/50 shadow-sm shadow-emerald-950/50'
                    : 'bg-zinc-950/70 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
                }`}
                title={`Filter story data generated via ${m.name}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-xs shadow-emerald-400" />
                <span>{m.name}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Expanded Methodology Playbook Cards */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 pt-3 border-t border-zinc-800">
          {methodologies.map((m) => (
            <div
              key={m.id}
              className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 flex flex-col justify-between space-y-2 text-xs hover:border-zinc-700 transition-colors shadow-sm"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{m.name}</span>
                  <button
                    onClick={() => onOpenMethodologyDetail && onOpenMethodologyDetail(m)}
                    className="text-[10px] font-mono text-emerald-400 hover:text-emerald-300 underline flex items-center gap-0.5"
                  >
                    <span>Playbook</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </button>
                </div>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  {m.definition}
                </p>
              </div>

              <div className="pt-2 border-t border-zinc-800/80 space-y-1 text-[11px]">
                <div className="text-zinc-400">
                  <span className="font-semibold text-zinc-300">Key Artifact:</span> {m.keyArtifacts[0]}
                </div>
                <div className="text-zinc-400">
                  <span className="font-semibold text-zinc-300">Metric:</span> {m.metricsProduced[0]}
                </div>
                <div className="mt-1 text-[10px] text-zinc-500 italic">
                  "{m.exampleOutput}"
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
