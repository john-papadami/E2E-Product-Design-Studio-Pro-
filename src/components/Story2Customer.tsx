import React, { useState } from 'react';
import { Users, AlertTriangle, Workflow, MapPin, Sparkles, CheckCircle2, ChevronRight, Layers, Info } from 'lucide-react';
import { CustomerStoryData, BlueprintStage } from '../types/framework';
import { EmbeddedUxMethodologiesBanner } from './EmbeddedUxMethodologiesBanner';
import { StoryAgentPanel } from './StoryAgentPanel';
import { UX_METHODOLOGIES, UxMethodology } from '../data/methodologies';

interface Story2CustomerProps {
  data: CustomerStoryData;
  productContext?: any;
  onRefineStory: () => void;
  onUpdateData: (updated: CustomerStoryData) => void;
  onOpenMethodologyDetail?: (methodology: UxMethodology) => void;
}

export const Story2Customer: React.FC<Story2CustomerProps> = ({
  data,
  productContext,
  onRefineStory,
  onUpdateData,
  onOpenMethodologyDetail,
}) => {
  const [activeSection, setActiveSection] = useState<'all' | 'stakeholders' | 'painpoints' | 'blueprint' | 'journey' | 'usecases'>('all');
  const [methodologyFilter, setMethodologyFilter] = useState<string | null>(null);
  const [selectedUseCaseId, setSelectedUseCaseId] = useState<string>(data.useCases[0]?.id || '');

  const selectedUseCase = data.useCases.find(uc => uc.id === selectedUseCaseId) || data.useCases[0];

  const showStakeholders = (!methodologyFilter || methodologyFilter === 'customer-interviews') && (activeSection === 'all' || activeSection === 'stakeholders');
  const showPainPoints = (!methodologyFilter || methodologyFilter === 'customer-interviews') && (activeSection === 'all' || activeSection === 'painpoints');
  const showBlueprint = (!methodologyFilter || methodologyFilter === 'service-blueprinting') && (activeSection === 'all' || activeSection === 'blueprint');
  const showJourney = (!methodologyFilter || methodologyFilter === 'customer-journey-mapping') && (activeSection === 'all' || activeSection === 'journey');
  const showUseCases = (!methodologyFilter || methodologyFilter === 'customer-interviews' || methodologyFilter === 'service-blueprinting') && (activeSection === 'all' || activeSection === 'usecases');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Context Banner */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-wider">
              <span>02. Customer & Organization</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>E2E Framework</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight font-sans">
              Customer Story
            </h2>
            <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
              Who are our customers, their organizational stakeholders, real pain points, service blueprint dynamics, and concrete end-to-end use cases.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onRefineStory}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-700 bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Refine Customer Story</span>
            </button>
          </div>
        </div>

        {/* Guiding Questions */}
        <div className="mt-6 pt-5 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800/80 shadow-inner">
            <div className="text-[10px] font-mono text-blue-400/80 uppercase font-semibold">Question 1</div>
            <div className="text-xs font-semibold text-zinc-100 mt-1">Target Customers & Goals</div>
            <p className="text-xs text-zinc-400 mt-1.5 line-clamp-3 leading-relaxed">
              {data.guidingQuestions.targetCustomersAndGoals}
            </p>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800/80 shadow-inner">
            <div className="text-[10px] font-mono text-blue-400/80 uppercase font-semibold">Question 2</div>
            <div className="text-xs font-semibold text-zinc-100 mt-1">Organization & Stakeholders</div>
            <p className="text-xs text-zinc-400 mt-1.5 line-clamp-3 leading-relaxed">
              {data.guidingQuestions.organizationAndStakeholders}
            </p>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800/80 shadow-inner">
            <div className="text-[10px] font-mono text-blue-400/80 uppercase font-semibold">Question 3</div>
            <div className="text-xs font-semibold text-zinc-100 mt-1">Pain Points & Challenges</div>
            <p className="text-xs text-zinc-400 mt-1.5 line-clamp-3 leading-relaxed">
              {data.guidingQuestions.painPointsAndChallenges}
            </p>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800/80 shadow-inner">
            <div className="text-[10px] font-mono text-blue-400/80 uppercase font-semibold">Question 4</div>
            <div className="text-xs font-semibold text-zinc-100 mt-1">Product Use Cases</div>
            <p className="text-xs text-zinc-400 mt-1.5 line-clamp-3 leading-relaxed">
              {data.guidingQuestions.productUseCasesOverview}
            </p>
          </div>
        </div>
      </div>

      {/* Embedded UX Methodologies Banner */}
      <EmbeddedUxMethodologiesBanner
        storyIndex={2}
        storyName="Customer Story"
        activeMethodologyFilter={methodologyFilter}
        onSelectMethodologyFilter={setMethodologyFilter}
        onOpenMethodologyDetail={onOpenMethodologyDetail}
      />

      {/* Story 02 Dedicated AI Agent Co-Pilot (Dr. Elena Rostova) */}
      <StoryAgentPanel
        storyIndex={2}
        currentStoryData={data}
        productContext={productContext}
        onApplyStoryUpdates={(updated) => onUpdateData(updated)}
      />

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 bg-zinc-900/80 rounded-xl border border-zinc-800 w-fit overflow-x-auto max-w-full backdrop-blur-sm">
        {[
          { id: 'all', label: 'All Data Points' },
          { id: 'stakeholders', label: 'Stakeholder Ecosystem' },
          { id: 'painpoints', label: 'Ranked Pain Points' },
          { id: 'blueprint', label: 'Service Blueprint' },
          { id: 'journey', label: 'Customer Journey Map' },
          { id: 'usecases', label: 'Use Cases & Specs' },
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

      {/* Section 1: Stakeholder Ecosystem */}
      {showStakeholders && (
        <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-3 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                  Stakeholder Ecosystem & Organizational Dynamics
                </h3>
                <button
                  onClick={() => onOpenMethodologyDetail && onOpenMethodologyDetail(UX_METHODOLOGIES['customer-interviews'])}
                  className="text-[10px] font-mono bg-emerald-950/50 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800/50 hover:bg-emerald-900/50 transition-colors flex items-center gap-1 font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>UX Method: Customer & Stakeholder Interviews</span>
                  <Info className="w-2.5 h-2.5" />
                </button>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Understand and uncover real-world problems, validate assumptions, and learn how customers currently solve goals.
              </p>
            </div>
            <span className="text-xs text-zinc-400 font-mono">
              {data.customerProfile.segmentTier} · {data.customerProfile.companySize}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.stakeholderEcosystem.map((st, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/70 flex flex-col justify-between shadow-inner"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">{st.category}</span>
                    <span className="text-[10px] font-mono text-blue-400 font-semibold">{st.influenceLevel} Influence</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{st.role}</h4>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Primary Goal</span>
                    <p className="text-xs text-zinc-300 mt-0.5 leading-snug">{st.goals}</p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-zinc-800">
                  <span className="text-[10px] font-mono text-rose-400 uppercase">Key Friction</span>
                  <p className="text-xs text-zinc-400 mt-0.5 leading-snug">{st.keyFriction}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Org & Business Goals */}
          <div className="mt-4 p-5 rounded-xl bg-zinc-950/70 border border-zinc-800 shadow-inner">
            <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block mb-2 font-mono">
              Customer Business Goals to be Achieved
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {data.customerProfile.businessGoals.map((bg, bIdx) => (
                <div key={bIdx} className="text-xs text-zinc-300 bg-zinc-900 p-3 rounded-lg border border-zinc-800 flex items-start gap-2">
                  <span className="text-blue-400 font-mono font-bold">{bIdx + 1}.</span>
                  <span>{bg}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 2: Ranked Pain Points */}
      {showPainPoints && (
        <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-5">
          <div className="border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                Ranked Pain Points & Workaround Reality
              </h3>
              <button
                onClick={() => onOpenMethodologyDetail && onOpenMethodologyDetail(UX_METHODOLOGIES['customer-interviews'])}
                className="text-[10px] font-mono bg-emerald-950/50 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800/50 hover:bg-emerald-900/50 transition-colors flex items-center gap-1 font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>UX Method: Field Discovery</span>
                <Info className="w-2.5 h-2.5" />
              </button>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Uncovering real-world friction and what customers currently do to cope with fragmented tooling
            </p>
          </div>

          <div className="space-y-3">
            {data.painPoints.map((pp, idx) => (
              <div
                key={pp.id || idx}
                className="p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors bg-zinc-950/80 flex flex-col md:flex-row md:items-start justify-between gap-4 shadow-sm"
              >
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{pp.title}</span>
                    <span className="text-zinc-600">·</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-medium ${
                        pp.severity === 'Critical'
                          ? 'bg-rose-950/60 text-rose-400 border border-rose-800/60'
                          : pp.severity === 'High'
                          ? 'bg-amber-950/60 text-amber-400 border border-amber-800/60'
                          : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                      }`}
                    >
                      {pp.severity} Severity
                    </span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-[10px] font-mono text-zinc-500">{pp.frequency} Frequency</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{pp.description}</p>
                </div>

                <div className="md:w-80 shrink-0 bg-zinc-900 p-3 rounded-lg border border-zinc-800 text-xs">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Current Workaround</span>
                  <p className="text-zinc-300 mt-0.5">{pp.currentWorkaround}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 3: Service Blueprint */}
      {showBlueprint && (
        <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-5">
          <div className="border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                Service Blueprinting (Frontstage & Backstage Reality)
              </h3>
              <button
                onClick={() => onOpenMethodologyDetail && onOpenMethodologyDetail(UX_METHODOLOGIES['service-blueprinting'])}
                className="text-[10px] font-mono bg-emerald-950/50 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800/50 hover:bg-emerald-900/50 transition-colors flex items-center gap-1 font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>UX Method: Service Blueprinting</span>
                <Info className="w-2.5 h-2.5" />
              </button>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Shows how a service actually works, not just how it appears to users—bridging customer actions with backstage processes and supporting infrastructure.
            </p>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="min-w-[760px] grid grid-cols-4 gap-4">
              {data.serviceBlueprint.stages.map((stg, sIdx) => (
                <div key={sIdx} className="space-y-3">
                  <div className="bg-zinc-950 text-zinc-200 border border-zinc-800 py-1.5 px-3 rounded-lg text-xs font-mono font-semibold tracking-tight text-center">
                    {stg.stageName}
                  </div>

                  {/* Customer Actions */}
                  <div className="bg-amber-950/30 border border-amber-800/40 rounded-xl p-3 text-xs min-h-[90px]">
                    <div className="text-[10px] font-mono text-amber-400 uppercase font-semibold">Customer Actions</div>
                    <ul className="mt-1 space-y-1">
                      {stg.customerActions.map((ca, caIdx) => (
                        <li key={caIdx} className="text-amber-200 text-[11px] leading-snug">{ca}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Line of Interaction */}
                  <div className="border-t border-dashed border-zinc-700 text-center relative my-1">
                    <span className="text-[9px] font-mono text-zinc-500 bg-zinc-900 px-1 relative -top-2">
                      Line of Interaction
                    </span>
                  </div>

                  {/* Frontstage */}
                  <div className="bg-blue-950/30 border border-blue-800/40 rounded-xl p-3 text-xs min-h-[90px]">
                    <div className="text-[10px] font-mono text-blue-400 uppercase font-semibold">Frontstage Touchpoints</div>
                    <ul className="mt-1 space-y-1">
                      {stg.frontstageTouchpoints.map((ft, ftIdx) => (
                        <li key={ftIdx} className="text-blue-200 text-[11px] leading-snug">{ft}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Line of Visibility */}
                  <div className="border-t border-dashed border-zinc-700 text-center relative my-1">
                    <span className="text-[9px] font-mono text-zinc-500 bg-zinc-900 px-1 relative -top-2">
                      Line of Visibility
                    </span>
                  </div>

                  {/* Backstage */}
                  <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-3 text-xs min-h-[90px]">
                    <div className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">Backstage Processes</div>
                    <ul className="mt-1 space-y-1">
                      {stg.backstageProcesses.map((bp, bpIdx) => (
                        <li key={bpIdx} className="text-zinc-300 text-[11px] leading-snug">{bp}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Support Systems */}
                  <div className="bg-zinc-950/90 border border-zinc-800 rounded-xl p-3 text-xs min-h-[75px]">
                    <div className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">Supporting Systems</div>
                    <ul className="mt-1 space-y-1">
                      {stg.supportingSystems.map((ss, ssIdx) => (
                        <li key={ssIdx} className="text-zinc-300 text-[11px] font-mono leading-snug">{ss}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 4: Customer Journey Map */}
      {showJourney && (
        <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-5">
          <div className="border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                Customer Journey Mapping (Timeline & Experience)
              </h3>
              <button
                onClick={() => onOpenMethodologyDetail && onOpenMethodologyDetail(UX_METHODOLOGIES['customer-journey-mapping'])}
                className="text-[10px] font-mono bg-emerald-950/50 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800/50 hover:bg-emerald-900/50 transition-colors flex items-center gap-1 font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>UX Method: Customer Journey Mapping</span>
                <Info className="w-2.5 h-2.5" />
              </button>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Visually depict what the customer’s experience is from their perspective across time, channels, and interactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {data.customerJourneyMap.map((jm, jIdx) => (
              <div key={jIdx} className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/70 flex flex-col justify-between space-y-3 shadow-inner">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{jm.stage}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-medium ${
                        jm.emotionalState === 'Delighted' || jm.emotionalState === 'Engaged'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                          : jm.emotionalState === 'Frustrated'
                          ? 'bg-rose-950/60 text-rose-400 border border-rose-800/60'
                          : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                      }`}
                    >
                      {jm.emotionalState}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-300 mt-1 font-medium leading-snug">{jm.customerGoal}</p>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Touchpoints</span>
                    <div className="flex flex-wrap gap-1 mt-0.5 text-[11px] text-zinc-400">
                      {jm.touchpoints.map((tp, tpIdx) => (
                        <span key={tpIdx} className="text-zinc-300">
                          {tp}{tpIdx < jm.touchpoints.length - 1 ? ' · ' : ''}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-rose-400 uppercase">Friction Points</span>
                    <ul className="mt-0.5 space-y-0.5">
                      {jm.painPoints.map((fp, fpIdx) => (
                        <li key={fpIdx} className="text-[11px] text-rose-300 leading-tight">✕ {fp}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase">Design Opportunity</span>
                    <ul className="mt-0.5 space-y-0.5">
                      {jm.opportunities.map((op, opIdx) => (
                        <li key={opIdx} className="text-[11px] text-emerald-300 leading-tight">★ {op}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 5: Core Use Cases */}
      {showUseCases && (
        <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-5">
          <div className="border-b border-zinc-800 pb-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
              Product Use Cases (Trigger to Resolution Specs)
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Concrete functional narratives with precise acceptance criteria for engineering and design
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Use Case List */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block mb-2">
                Available Use Cases
              </span>
              {data.useCases.map((uc) => (
                <button
                  key={uc.id}
                  onClick={() => setSelectedUseCaseId(uc.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                    selectedUseCase.id === uc.id
                      ? 'border-blue-500/60 bg-blue-950/40 text-blue-200 shadow-md ring-1 ring-blue-500/30'
                      : 'border-zinc-800 bg-zinc-950/70 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <div className="font-semibold text-xs leading-snug">{uc.title}</div>
                  <div className={`text-[11px] mt-1 ${selectedUseCase.id === uc.id ? 'text-blue-300' : 'text-zinc-500'}`}>
                    Actor: {uc.actor}
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Use Case Specification Details */}
            <div className="lg:col-span-2 p-6 rounded-2xl border border-zinc-800 bg-zinc-950/70 space-y-4 shadow-inner">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-blue-400 uppercase font-semibold">Use Case Specification</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">{selectedUseCase.title}</h4>
                </div>
                <span className="text-xs font-mono text-blue-300 bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-800/60">
                  Actor: {selectedUseCase.actor}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Initial Trigger / Need</span>
                <p className="text-xs text-zinc-200 mt-1 leading-relaxed bg-zinc-900/90 p-3 rounded-xl border border-zinc-800">
                  {selectedUseCase.trigger}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Narrative Workflow</span>
                <p className="text-xs text-zinc-200 mt-1 leading-relaxed bg-zinc-900/90 p-3 rounded-xl border border-zinc-800">
                  {selectedUseCase.narrativeFlow}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Final Outcome / Resolution</span>
                <p className="text-xs text-zinc-200 mt-1 leading-relaxed bg-zinc-900/90 p-3 rounded-xl border border-zinc-800">
                  {selectedUseCase.resolution}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Acceptance Criteria</span>
                <div className="mt-1 space-y-1.5">
                  {selectedUseCase.acceptanceCriteria.map((ac, acIdx) => (
                    <div key={acIdx} className="text-xs text-zinc-300 flex items-start gap-2 bg-zinc-900/90 p-2.5 rounded-xl border border-zinc-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{ac}</span>
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
