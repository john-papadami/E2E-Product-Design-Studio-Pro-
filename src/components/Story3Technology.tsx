import React, { useState } from 'react';
import { Cpu, CheckCircle2, AlertOctagon, Sparkles, Sliders, ShieldCheck, Code, Layers, Info } from 'lucide-react';
import { TechnologyStoryData } from '../types/framework';
import { EmbeddedUxMethodologiesBanner } from './EmbeddedUxMethodologiesBanner';
import { StoryAgentPanel } from './StoryAgentPanel';
import { UX_METHODOLOGIES, UxMethodology } from '../data/methodologies';

interface Story3TechnologyProps {
  data: TechnologyStoryData;
  productContext?: any;
  onRefineStory: () => void;
  onUpdateData: (updated: TechnologyStoryData) => void;
  onOpenMethodologyDetail?: (methodology: UxMethodology) => void;
}

export const Story3Technology: React.FC<Story3TechnologyProps> = ({
  data,
  productContext,
  onRefineStory,
  onUpdateData,
  onOpenMethodologyDetail,
}) => {
  const [activeSection, setActiveSection] = useState<'all' | 'bcr' | 'features' | 'architecture' | 'designsystem' | 'accessibility'>('all');
  const [methodologyFilter, setMethodologyFilter] = useState<string | null>(null);

  // Interactive Benefit Cost Ratio adjustment
  const handleBcrChange = (benefit: number, cost: number) => {
    const ratio = Math.round((benefit / (cost || 1)) * 100) / 100;
    let verdict: 'High ROI - Build Now' | 'Viable - Proceed with Iteration' | 'Re-evaluate Scope' = 'Viable - Proceed with Iteration';
    if (ratio >= 2.0) verdict = 'High ROI - Build Now';
    else if (ratio >= 1.2) verdict = 'Viable - Proceed with Iteration';
    else verdict = 'Re-evaluate Scope';

    onUpdateData({
      ...data,
      feasibilityAssessment: {
        ...data.feasibilityAssessment,
        benefitCostRatio: {
          uxBenefitScore: benefit,
          techCostScore: cost,
          bcrRatio: ratio,
          verdict,
        },
      },
    });
  };

  const bcr = data.feasibilityAssessment.benefitCostRatio;

  const showBcr = (!methodologyFilter || methodologyFilter === 'feasibility-assessment') && (activeSection === 'all' || activeSection === 'bcr');
  const showFeatures = (!methodologyFilter || methodologyFilter === 'feasibility-assessment' || methodologyFilter === 'platform-capability-analysis') && (activeSection === 'all' || activeSection === 'features');
  const showArchitecture = (!methodologyFilter || methodologyFilter === 'api-capability-review' || methodologyFilter === 'platform-capability-analysis') && (activeSection === 'all' || activeSection === 'architecture');
  const showDesignSystem = (!methodologyFilter || methodologyFilter === 'accessibility-audit') && (activeSection === 'all' || activeSection === 'designsystem');
  const showAccessibility = (!methodologyFilter || methodologyFilter === 'accessibility-audit') && (activeSection === 'all' || activeSection === 'accessibility');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Context Banner */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-wider">
              <span>03. Feasibility & Architecture</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>E2E Framework</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight font-sans">
              Technology Story
            </h2>
            <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
              Evaluating technical feasibility via Benefit Cost Ratio (BCR), Design System specs, API integration contracts, and WCAG accessibility standards.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onRefineStory}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-700 bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Refine Technology Story</span>
            </button>
          </div>
        </div>

        {/* Guiding Questions */}
        <div className="mt-6 pt-5 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800/80 shadow-inner">
            <div className="text-[10px] font-mono text-purple-400/80 uppercase font-semibold">Question 1</div>
            <div className="text-xs font-semibold text-zinc-100 mt-1">Feature Requirements</div>
            <p className="text-xs text-zinc-400 mt-1.5 line-clamp-3 leading-relaxed">
              {data.guidingQuestions.featureRequirementsSummary}
            </p>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800/80 shadow-inner">
            <div className="text-[10px] font-mono text-purple-400/80 uppercase font-semibold">Question 2</div>
            <div className="text-xs font-semibold text-zinc-100 mt-1">Design System Leveraged</div>
            <p className="text-xs text-zinc-400 mt-1.5 line-clamp-3 leading-relaxed">
              {data.guidingQuestions.designSystemStrategy}
            </p>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800/80 shadow-inner">
            <div className="text-[10px] font-mono text-purple-400/80 uppercase font-semibold">Question 3</div>
            <div className="text-xs font-semibold text-zinc-100 mt-1">APIs, AI & Platform Stack</div>
            <p className="text-xs text-zinc-400 mt-1.5 line-clamp-3 leading-relaxed">
              {data.guidingQuestions.stackAndIntegrations}
            </p>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800/80 shadow-inner">
            <div className="text-[10px] font-mono text-purple-400/80 uppercase font-semibold">Question 4</div>
            <div className="text-xs font-semibold text-zinc-100 mt-1">Restraints & Limitations</div>
            <p className="text-xs text-zinc-400 mt-1.5 line-clamp-3 leading-relaxed">
              {data.guidingQuestions.limitationsAndRestraints}
            </p>
          </div>
        </div>
      </div>

      {/* Embedded UX Methodologies Banner */}
      <EmbeddedUxMethodologiesBanner
        storyIndex={3}
        storyName="Technology Story"
        activeMethodologyFilter={methodologyFilter}
        onSelectMethodologyFilter={setMethodologyFilter}
        onOpenMethodologyDetail={onOpenMethodologyDetail}
      />

      {/* Story 03 Dedicated AI Agent Co-Pilot (Marcus Chen) */}
      <StoryAgentPanel
        storyIndex={3}
        currentStoryData={data}
        productContext={productContext}
        onApplyStoryUpdates={(updated) => onUpdateData(updated)}
      />

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 bg-zinc-900/80 rounded-xl border border-zinc-800 w-fit overflow-x-auto max-w-full backdrop-blur-sm">
        {[
          { id: 'all', label: 'All Data Points' },
          { id: 'bcr', label: 'Benefit Cost Ratio (BCR)' },
          { id: 'features', label: 'Feature Requirements' },
          { id: 'architecture', label: 'APIs & AI Architecture' },
          { id: 'designsystem', label: 'Design System Spec' },
          { id: 'accessibility', label: 'WCAG Accessibility' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all shrink-0 ${
              activeSection === tab.id
                ? 'bg-zinc-800 text-white font-semibold border border-zinc-700 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Section 1: Feasibility Assessment & Benefit Cost Ratio (BCR / BCO) */}
      {showBcr && (
        <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-3 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                  Feasibility Assessment: Benefit Cost Ratio (BCR / BCO)
                </h3>
                <button
                  onClick={() => onOpenMethodologyDetail && onOpenMethodologyDetail(UX_METHODOLOGIES['feasibility-assessment'])}
                  className="text-[10px] font-mono bg-emerald-950/50 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800/50 hover:bg-emerald-900/50 transition-colors flex items-center gap-1 font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>UX Method: Feasibility Assessment (BCR)</span>
                  <Info className="w-2.5 h-2.5" />
                </button>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Evaluating whether a proposed product or feature can realistically be built given available technology, resources, time, and technological limitations. In short, a Benefit Cost Ratio (BCR).
              </p>
            </div>
            <span
              className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-full border self-start sm:self-auto ${
                bcr.verdict.includes('High ROI')
                  ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60'
                  : bcr.verdict.includes('Viable')
                  ? 'bg-blue-950/60 text-blue-400 border-blue-800/60'
                  : 'bg-rose-950/60 text-rose-400 border-rose-800/60'
              }`}
            >
              {bcr.verdict}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800 shadow-inner">
            {/* Interactive Sliders */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-zinc-200">UX & Business Benefit Score:</span>
                  <span className="font-mono font-bold text-cyan-400">{bcr.uxBenefitScore} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.1"
                  value={bcr.uxBenefitScore}
                  onChange={(e) => handleBcrChange(parseFloat(e.target.value), bcr.techCostScore)}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-zinc-200">Tech Cost / Complexity Score:</span>
                  <span className="font-mono font-bold text-purple-400">{bcr.techCostScore} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.1"
                  value={bcr.techCostScore}
                  onChange={(e) => handleBcrChange(bcr.uxBenefitScore, parseFloat(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Calculated Ratio */}
            <div className="flex flex-col items-center justify-center p-4 bg-zinc-900 rounded-xl border border-zinc-800 text-center shadow-md">
              <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">Benefit-Cost Ratio (BCR)</span>
              <div className="text-3xl font-mono font-bold text-cyan-400 mt-1">
                {bcr.bcrRatio}x
              </div>
              <span className="text-xs text-zinc-500 mt-1 font-mono">
                {bcr.uxBenefitScore} benefit ÷ {bcr.techCostScore} cost
              </span>
            </div>

            {/* Decision Thresholds */}
            <div className="space-y-1.5 text-xs text-zinc-400 justify-center flex flex-col font-mono">
              <span className="font-semibold text-zinc-200 mb-1 font-sans text-xs">Framework Scoring Rules:</span>
              <div className="flex items-center justify-between">
                <span>&gt; 2.0x</span>
                <span className="text-emerald-400 font-medium">High ROI - Greenlight immediately</span>
              </div>
              <div className="flex items-center justify-between">
                <span>1.2x – 1.9x</span>
                <span className="text-blue-400 font-medium">Viable - Proceed with phased iteration</span>
              </div>
              <div className="flex items-center justify-between">
                <span>&lt; 1.2x</span>
                <span className="text-rose-400 font-medium">Negative - Rescope UX or simplify tech</span>
              </div>
            </div>
          </div>

          {/* Technological Limitations & Dependencies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-950/70 space-y-3 shadow-inner">
              <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block font-mono">
                Technical Constraints & UX Mitigations
              </span>
              <div className="space-y-2">
                {data.feasibilityAssessment.technologicalLimitations.map((lim, lIdx) => (
                  <div key={lIdx} className="text-xs bg-zinc-900 p-3 rounded-lg border border-zinc-800 space-y-1">
                    <div className="font-semibold text-white">{lim.constraint}</div>
                    <div className="text-zinc-400">
                      <span className="text-zinc-500 font-mono">Impact:</span> {lim.impactOnUX}
                    </div>
                    <div className="text-emerald-400">
                      <span className="text-zinc-500 font-mono">Mitigation:</span> {lim.mitigation}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-950/70 space-y-3 shadow-inner">
              <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block font-mono">
                Critical Architectural Dependencies
              </span>
              <div className="space-y-2">
                {data.feasibilityAssessment.dependencies.map((dep, dIdx) => (
                  <div key={dIdx} className="text-xs bg-zinc-900 p-3 rounded-lg border border-zinc-800 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">{dep.name}</div>
                      <div className="text-zinc-500 font-mono text-[11px]">{dep.type}</div>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        dep.risk === 'High' ? 'bg-rose-950/60 text-rose-400 border border-rose-800/60' : dep.risk === 'Medium' ? 'bg-amber-950/60 text-amber-400 border border-amber-800/60' : 'bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      {dep.risk} Risk
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section 2: Feature Requirements */}
      {showFeatures && (
        <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-5">
          <div className="border-b border-zinc-800 pb-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
              Product Feature Requirements (Linked to Use Cases)
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Strict engineering specifications categorized by layer, priority, and implementation complexity
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-zinc-800 font-mono text-zinc-400 uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Feature Name</th>
                  <th className="py-2.5 px-3">Linked Use Case</th>
                  <th className="py-2.5 px-3">Architecture Layer</th>
                  <th className="py-2.5 px-3">Priority</th>
                  <th className="py-2.5 px-3">Complexity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {data.featureRequirements.map((fr, idx) => (
                  <tr key={fr.id || idx} className="hover:bg-zinc-800/40">
                    <td className="py-2.5 px-3 font-semibold text-white">{fr.feature}</td>
                    <td className="py-2.5 px-3 font-mono text-cyan-400/80">{fr.linkedUseCase}</td>
                    <td className="py-2.5 px-3 text-zinc-300">{fr.type}</td>
                    <td className="py-2.5 px-3 font-mono">
                      <span className={fr.priority === 'Must Have' ? 'text-white font-bold' : 'text-zinc-500'}>
                        {fr.priority}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-zinc-400">{fr.complexity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Section 3: Architecture, APIs & AI */}
      {showArchitecture && (
        <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-5">
          <div className="border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                API Capability Review & Platform Analysis
              </h3>
              <button
                onClick={() => onOpenMethodologyDetail && onOpenMethodologyDetail(UX_METHODOLOGIES['api-capability-review'])}
                className="text-[10px] font-mono bg-emerald-950/50 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800/50 hover:bg-emerald-900/50 transition-colors flex items-center gap-1 font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>UX Method: API Capability Review</span>
                <Info className="w-2.5 h-2.5" />
              </button>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Assess the functionality, limitations, and performance of an API to determine whether it can support the UX requirements.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 shadow-inner">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Frontend Architecture Stack</span>
                <p className="text-zinc-200 font-medium mt-1">{data.technicalArchitecture.frontendStack}</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 shadow-inner">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Backend Architecture Stack</span>
                <p className="text-zinc-200 font-medium mt-1">{data.technicalArchitecture.backendStack}</p>
              </div>
            </div>

            {/* AI Integration Pattern */}
            <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-950/70 space-y-2 text-xs shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                  AI Model & Inference Strategy
                </span>
                <span className="text-xs font-mono text-purple-400 font-bold bg-purple-950/60 px-2.5 py-0.5 rounded-full border border-purple-800/60">
                  {data.technicalArchitecture.aiIntegration.modelOrService}
                </span>
              </div>
              <p className="text-zinc-300 leading-relaxed">
                <span className="font-semibold text-white">Inference Pattern:</span> {data.technicalArchitecture.aiIntegration.inferencePattern}
              </p>
              <p className="text-zinc-300 leading-relaxed">
                <span className="font-semibold text-rose-400">Fallback Strategy:</span> {data.technicalArchitecture.aiIntegration.fallbackStrategy}
              </p>
            </div>

            {/* API Endpoints & Latency Budgets */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block font-mono">
                API Protocol & Latency Review
              </span>
              <div className="space-y-2">
                {data.technicalArchitecture.apisAndProtocols.map((api, aIdx) => (
                  <div key={aIdx} className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-950/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{api.name}</span>
                        <span className="text-zinc-600">·</span>
                        <span className="text-[10px] font-mono text-cyan-400">{api.type}</span>
                      </div>
                      <p className="text-zinc-400 mt-0.5">{api.purpose}</p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 text-right">
                      <div>
                        <div className="text-[10px] font-mono text-zinc-500 uppercase">Latency Budget</div>
                        <div className="font-mono font-bold text-cyan-300">{api.latencyBudget}</div>
                      </div>
                      <div className="max-w-[200px] text-left">
                        <div className="text-[10px] font-mono text-zinc-500 uppercase">UX Impact</div>
                        <div className="text-[11px] text-zinc-300 leading-tight">{api.uxImpact}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section 4: Design System Spec */}
      {showDesignSystem && (
        <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-5">
          <div className="border-b border-zinc-800 pb-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
              Design System Specification & Foundations
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Tokens, typography, component library requirements, and responsive grid standards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-950/70 space-y-2 shadow-inner">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Design System Base</span>
              <p className="text-white font-semibold">{data.designSystemSpec.designSystemBase}</p>
              <div className="mt-2 text-zinc-400 leading-relaxed">{data.designSystemSpec.typographyAndTokens}</div>
            </div>

            <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-950/70 space-y-2 shadow-inner">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Motion & Micro-interactions</span>
              <p className="text-zinc-300 leading-relaxed">{data.designSystemSpec.motionAndFeedbackGuidelines}</p>
              <div className="text-cyan-400 font-mono text-[11px] mt-2">
                Responsive Breakpoints: {data.designSystemSpec.responsiveBreakpoints.join(' · ')}
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-950/70 space-y-2 shadow-inner">
            <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block font-mono">
              Required Component Primitives
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {data.designSystemSpec.componentLibraryRequirements.map((comp, cIdx) => (
                <div key={cIdx} className="bg-zinc-900 p-2.5 rounded-lg border border-zinc-800 text-zinc-300 flex items-center gap-2">
                  <span className="text-cyan-400 font-mono text-[11px]">0{cIdx + 1}.</span>
                  <span>{comp}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 5: WCAG Accessibility Audit Plan */}
      {showAccessibility && (
        <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-3 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                  Accessibility Audit & Compliance Plan
                </h3>
                <button
                  onClick={() => onOpenMethodologyDetail && onOpenMethodologyDetail(UX_METHODOLOGIES['accessibility-audit'])}
                  className="text-[10px] font-mono bg-emerald-950/50 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800/50 hover:bg-emerald-900/50 transition-colors flex items-center gap-1 font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>UX Method: Accessibility Audit</span>
                  <Info className="w-2.5 h-2.5" />
                </button>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Evaluate how well a UI and Design System supports people with disabilities and whether it meets established accessibility WCAG standards.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-full self-start sm:self-auto">
              {data.accessibilityAuditPlan.wcagTarget} Target
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/70 space-y-1.5 shadow-inner">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Contrast Standards</span>
              <p className="text-zinc-300 leading-relaxed">{data.accessibilityAuditPlan.contrastStandards}</p>
            </div>

            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/70 space-y-1.5 shadow-inner">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Keyboard Navigation Rules</span>
              <ul className="space-y-1">
                {data.accessibilityAuditPlan.keyboardNavigationRules.map((kn, knIdx) => (
                  <li key={knIdx} className="text-zinc-300 text-[11px] leading-snug">· {kn}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/70 space-y-1.5 shadow-inner">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Screen Reader Parity</span>
              <ul className="space-y-1">
                {data.accessibilityAuditPlan.screenReaderAccommodations.map((sr, srIdx) => (
                  <li key={srIdx} className="text-zinc-300 text-[11px] leading-snug">· {sr}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
