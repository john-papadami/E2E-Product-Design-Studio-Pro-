import React, { useState } from 'react';
import { Compass, TrendingUp, ShieldAlert, Sparkles, HelpCircle, Layers, ArrowUpRight, ArrowDownRight, Edit3, Bookmark, Info } from 'lucide-react';
import { MarketStoryData } from '../types/framework';
import { EmbeddedUxMethodologiesBanner } from './EmbeddedUxMethodologiesBanner';
import { StoryAgentPanel } from './StoryAgentPanel';
import { UX_METHODOLOGIES, UxMethodology } from '../data/methodologies';

interface Story1MarketProps {
  data: MarketStoryData;
  productContext?: any;
  onRefineStory: () => void;
  onUpdateData: (updated: MarketStoryData) => void;
  onOpenMethodologyDetail?: (methodology: UxMethodology) => void;
}

export const Story1Market: React.FC<Story1MarketProps> = ({
  data,
  productContext,
  onRefineStory,
  onUpdateData,
  onOpenMethodologyDetail,
}) => {
  const [activeSection, setActiveSection] = useState<'all' | 'positioning' | 'competitors' | 'trends' | 'valueprop'>('all');
  const [methodologyFilter, setMethodologyFilter] = useState<string | null>(null);

  // If a methodology filter is active, adjust visible sections
  const showPositioning = (!methodologyFilter || methodologyFilter === 'value-proposition-mapping') && (activeSection === 'all' || activeSection === 'positioning');
  const showCompetitors = (!methodologyFilter || methodologyFilter === 'competitive-analysis') && (activeSection === 'all' || activeSection === 'competitors');
  const showTrends = (!methodologyFilter || methodologyFilter === 'market-trend-analysis') && (activeSection === 'all' || activeSection === 'trends');
  const showValueProp = (!methodologyFilter || methodologyFilter === 'value-proposition-mapping') && (activeSection === 'all' || activeSection === 'valueprop');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Story Banner & Context Header */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
              <span>01. Strategic Context</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>E2E Framework</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight font-sans">
              Market Story
            </h2>
            <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
              Determine where we stand in the market today, the addressable segment, and why our value proposition drives meaningful behavioral change.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onRefineStory}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-700 bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Refine Market Story</span>
            </button>
          </div>
        </div>

        {/* Guiding Questions (Directly from John Papadami's framework) */}
        <div className="mt-6 pt-5 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800/80 shadow-inner">
            <div className="text-[10px] font-mono text-amber-400/80 uppercase font-semibold">Question 1</div>
            <div className="text-xs font-semibold text-zinc-100 mt-1">Where are we in the market today?</div>
            <p className="text-xs text-zinc-400 mt-1.5 line-clamp-3 leading-relaxed">
              {data.guidingQuestions.marketCurrentState}
            </p>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800/80 shadow-inner">
            <div className="text-[10px] font-mono text-amber-400/80 uppercase font-semibold">Question 2</div>
            <div className="text-xs font-semibold text-zinc-100 mt-1">What segment are we addressing & why?</div>
            <p className="text-xs text-zinc-400 mt-1.5 line-clamp-3 leading-relaxed">
              {data.guidingQuestions.targetSegmentAndWhy}
            </p>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800/80 shadow-inner">
            <div className="text-[10px] font-mono text-amber-400/80 uppercase font-semibold">Question 3</div>
            <div className="text-xs font-semibold text-zinc-100 mt-1">What is our value proposition?</div>
            <p className="text-xs text-zinc-400 mt-1.5 line-clamp-3 leading-relaxed">
              {data.guidingQuestions.valueProposition}
            </p>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800/80 shadow-inner">
            <div className="text-[10px] font-mono text-amber-400/80 uppercase font-semibold">Question 4</div>
            <div className="text-xs font-semibold text-zinc-100 mt-1">How will it make change?</div>
            <p className="text-xs text-zinc-400 mt-1.5 line-clamp-3 leading-relaxed">
              {data.guidingQuestions.transformationThesis}
            </p>
          </div>
        </div>
      </div>

      {/* Embedded UX Methodologies Banner */}
      <EmbeddedUxMethodologiesBanner
        storyIndex={1}
        storyName="Market Story"
        activeMethodologyFilter={methodologyFilter}
        onSelectMethodologyFilter={setMethodologyFilter}
        onOpenMethodologyDetail={onOpenMethodologyDetail}
      />

      {/* Story 01 Dedicated AI Agent Co-Pilot (Vance Thorne) */}
      <StoryAgentPanel
        storyIndex={1}
        currentStoryData={data}
        productContext={productContext}
        onApplyStoryUpdates={(updated) => onUpdateData(updated)}
      />

      {/* Section Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 bg-zinc-900/80 rounded-xl border border-zinc-800 w-fit backdrop-blur-sm">
        {[
          { id: 'all', label: 'All Data Points' },
          { id: 'positioning', label: 'Positioning & Sizing' },
          { id: 'competitors', label: 'Competitive Analysis' },
          { id: 'trends', label: 'Market Trends' },
          { id: 'valueprop', label: 'Value Prop Canvas' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeSection === tab.id
                ? 'bg-zinc-800 text-white font-semibold border border-zinc-700 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Section 1: Positioning & Market Sizing */}
      {showPositioning && (
        <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-3 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                  Market Positioning & Sizing Data Points
                </h3>
                <span className="text-[10px] font-mono bg-zinc-950 text-cyan-400 px-2 py-0.5 rounded-full border border-zinc-800">
                  UX Method: Market Framing
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Quantified market boundaries and transformational thesis
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-zinc-500">Market Readiness Score:</span>
              <span className="ml-1.5 text-sm font-mono font-bold text-amber-400">
                {data.marketPositioning.marketReadinessScore}/100
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 shadow-inner">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Target Addressable Market (TAM)</span>
              <div className="text-lg font-bold font-mono text-white mt-1">
                {data.marketPositioning.tamSamSom.tam}
              </div>
              <p className="text-xs text-zinc-400 mt-1">Total global revenue opportunity across all verticals</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 shadow-inner">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Serviceable Addressable (SAM)</span>
              <div className="text-lg font-bold font-mono text-white mt-1">
                {data.marketPositioning.tamSamSom.sam}
              </div>
              <p className="text-xs text-zinc-400 mt-1">Directly targeted functional segments</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 shadow-inner">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Serviceable Obtainable (SOM)</span>
              <div className="text-lg font-bold font-mono text-white mt-1">
                {data.marketPositioning.tamSamSom.som}
              </div>
              <p className="text-xs text-zinc-400 mt-1">Target realistic 18-month capture share</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-zinc-950/50 border border-zinc-800/80">
              <span className="font-semibold text-zinc-200 block mb-1">Target Segment Rationale</span>
              <p className="text-zinc-400 leading-relaxed">
                {data.marketPositioning.targetingRationale}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/50 border border-zinc-800/80">
              <span className="font-semibold text-zinc-200 block mb-1">Transformation Thesis</span>
              <p className="text-zinc-400 leading-relaxed">
                {data.marketPositioning.transformationThesis}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Section 2: Competitive Analysis Grid */}
      {showCompetitors && (
        <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-3 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                  Competitive Analysis: UX Patterns, IA & Strengths
                </h3>
                <button
                  onClick={() => onOpenMethodologyDetail && onOpenMethodologyDetail(UX_METHODOLOGIES['competitive-analysis'])}
                  className="text-[10px] font-mono bg-emerald-950/50 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800/50 hover:bg-emerald-900/50 transition-colors flex items-center gap-1 font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>UX Method: Competitive Analysis</span>
                  <Info className="w-2.5 h-2.5" />
                </button>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Focuses on how competing products solve similar user problems by examining their UX, design patterns, features, IA, strengths, and gaps.
              </p>
            </div>
            <span className="text-xs text-zinc-400 font-mono">
              {data.competitiveAnalysis.length} Competitors Analyzed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {data.competitiveAnalysis.map((comp, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-zinc-800 p-4 bg-zinc-950/80 flex flex-col justify-between hover:border-zinc-700 transition-colors shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm text-white">{comp.name}</h4>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-medium ${
                        comp.threatLevel === 'High'
                          ? 'bg-rose-950/60 text-rose-400 border border-rose-800/60'
                          : comp.threatLevel === 'Medium'
                          ? 'bg-amber-950/60 text-amber-400 border border-amber-800/60'
                          : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                      }`}
                    >
                      {comp.threatLevel} Threat
                    </span>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Design Patterns</div>
                    <p className="text-xs text-zinc-300 mt-0.5 leading-snug">{comp.designPatterns}</p>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">UX Strengths</div>
                    <ul className="mt-1 space-y-1">
                      {comp.uxStrengths.map((str, sIdx) => (
                        <li key={sIdx} className="text-xs text-zinc-400 flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">IA Gaps & Friction</div>
                    <ul className="mt-1 space-y-1">
                      {comp.informationArchitectureGaps.map((gap, gIdx) => (
                        <li key={gIdx} className="text-xs text-zinc-400 flex items-start gap-1.5">
                          <span className="text-rose-400 font-bold">✕</span>
                          <span>{gap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                  <span>Pricing Model:</span>
                  <span className="font-mono text-zinc-200">{comp.pricingModel}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 3: Market Trend Analysis */}
      {showTrends && (
        <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-5">
          <div className="border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                Market Trend Analysis: Momentum & Strategic Shifts
              </h3>
              <button
                onClick={() => onOpenMethodologyDetail && onOpenMethodologyDetail(UX_METHODOLOGIES['market-trend-analysis'])}
                className="text-[10px] font-mono bg-emerald-950/50 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800/50 hover:bg-emerald-900/50 transition-colors flex items-center gap-1 font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>UX Method: Market Trend Analysis</span>
                <Info className="w-2.5 h-2.5" />
              </button>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Identify from the market what is gaining momentum, what is declining, and why those shifts matter for customer needs, competitive dynamics, and strategic decision‑making.
            </p>
          </div>

          <div className="divide-y divide-zinc-800">
            {data.marketTrends.map((trend, idx) => (
              <div key={idx} className="py-3.5 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-white">{trend.trend}</span>
                    <span className="text-zinc-600">·</span>
                    <span
                      className={`text-[11px] font-mono font-medium flex items-center gap-0.5 ${
                        trend.trajectory === 'Gaining Momentum'
                          ? 'text-emerald-400'
                          : trend.trajectory === 'Declining'
                          ? 'text-rose-400'
                          : 'text-cyan-400'
                      }`}
                    >
                      {trend.trajectory === 'Gaining Momentum' ? (
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      ) : (
                        <ArrowDownRight className="w-3.5 h-3.5" />
                      )}
                      <span>{trend.trajectory}</span>
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{trend.whyItMatters}</p>
                </div>

                <div className="md:w-80 shrink-0 bg-zinc-950/70 p-3 rounded-xl border border-zinc-800 text-xs shadow-inner">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">Strategic Implication</div>
                  <p className="text-zinc-300 mt-0.5">{trend.strategicImplication}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 4: Value Proposition Mapping */}
      {showValueProp && (
        <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-5">
          <div className="border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                Value Proposition Mapping
              </h3>
              <button
                onClick={() => onOpenMethodologyDetail && onOpenMethodologyDetail(UX_METHODOLOGIES['value-proposition-mapping'])}
                className="text-[10px] font-mono bg-emerald-950/50 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800/50 hover:bg-emerald-900/50 transition-colors flex items-center gap-1 font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>UX Method: Value Proposition Mapping</span>
                <Info className="w-2.5 h-2.5" />
              </button>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Why a customer chooses your product over alternatives and ensures the product is solving meaningful problems in a compelling way.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Profile Side */}
            <div className="p-5 rounded-xl bg-zinc-950/70 border border-zinc-800 space-y-4 shadow-inner">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold font-mono uppercase text-amber-400">
                  Customer Profile (Needs & Pains)
                </h4>
                <span className="text-[11px] font-mono text-zinc-500">Demand Side</span>
              </div>

              <div>
                <div className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Customer Jobs to be Done
                </div>
                <div className="space-y-1">
                  {data.valuePropositionCanvas.customerJobs.map((job, jIdx) => (
                    <div key={jIdx} className="text-xs text-zinc-300 bg-zinc-900 p-2.5 rounded-lg border border-zinc-800">
                      {job}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-semibold text-rose-300 uppercase tracking-wider mb-1.5">
                  Customer Pains & Friction
                </div>
                <div className="space-y-1">
                  {data.valuePropositionCanvas.customerPains.map((pain, pIdx) => (
                    <div key={pIdx} className="text-xs text-rose-200 bg-rose-950/40 p-2.5 rounded-lg border border-rose-900/60">
                      {pain}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider mb-1.5">
                  Expected Customer Gains
                </div>
                <div className="space-y-1">
                  {data.valuePropositionCanvas.customerGains.map((gain, gIdx) => (
                    <div key={gIdx} className="text-xs text-emerald-200 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-900/60">
                      {gain}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Value Map Side */}
            <div className="p-5 rounded-xl bg-zinc-950/70 border border-zinc-800 space-y-4 shadow-inner">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold font-mono uppercase text-cyan-400">
                  Product Value Map (Our Solution)
                </h4>
                <span className="text-[11px] font-mono text-zinc-500">Supply Side</span>
              </div>

              <div>
                <div className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Products & Capabilities
                </div>
                <div className="space-y-1">
                  {data.valuePropositionCanvas.productsAndServices.map((prod, prIdx) => (
                    <div key={prIdx} className="text-xs text-zinc-300 bg-zinc-900 p-2.5 rounded-lg border border-zinc-800">
                      {prod}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider mb-1.5">
                  Pain Relievers
                </div>
                <div className="space-y-1">
                  {data.valuePropositionCanvas.painRelievers.map((rel, rIdx) => (
                    <div key={rIdx} className="text-xs text-emerald-200 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-900/60">
                      {rel}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-semibold text-cyan-300 uppercase tracking-wider mb-1.5">
                  Gain Creators
                </div>
                <div className="space-y-1">
                  {data.valuePropositionCanvas.gainCreators.map((gc, gcIdx) => (
                    <div key={gcIdx} className="text-xs text-cyan-200 bg-cyan-950/40 p-2.5 rounded-lg border border-cyan-900/60">
                      {gc}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
