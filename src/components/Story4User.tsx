import React, { useState } from 'react';
import { Smile, Sparkles, User, CheckCircle2, AlertCircle, ArrowRight, Clock, HelpCircle, Activity, Info } from 'lucide-react';
import { UserStoryData } from '../types/framework';
import { EmbeddedUxMethodologiesBanner } from './EmbeddedUxMethodologiesBanner';
import { StoryAgentPanel } from './StoryAgentPanel';
import { UX_METHODOLOGIES, UxMethodology } from '../data/methodologies';

interface Story4UserProps {
  data: UserStoryData;
  productContext?: any;
  onRefineStory: () => void;
  onUpdateData: (updated: UserStoryData) => void;
  onOpenMethodologyDetail?: (methodology: UxMethodology) => void;
}

export const Story4User: React.FC<Story4UserProps> = ({
  data,
  productContext,
  onRefineStory,
  onUpdateData,
  onOpenMethodologyDetail,
}) => {
  const [activeSection, setActiveSection] = useState<'all' | 'personas' | 'workflows' | 'heuristics' | 'usability' | 'insights'>('all');
  const [methodologyFilter, setMethodologyFilter] = useState<string | null>(null);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>(data.e2eWorkflowProposals[0]?.id || '');

  const selectedWorkflow = data.e2eWorkflowProposals.find(wf => wf.id === selectedWorkflowId) || data.e2eWorkflowProposals[0];

  const showPersonas = (!methodologyFilter || methodologyFilter === 'focus-groups-user-interviews') && (activeSection === 'all' || activeSection === 'personas');
  const showWorkflows = (!methodologyFilter || methodologyFilter === 'usability-test-plan') && (activeSection === 'all' || activeSection === 'workflows');
  const showHeuristics = (!methodologyFilter || methodologyFilter === 'heuristic-evaluation') && (activeSection === 'all' || activeSection === 'heuristics');
  const showUsability = (!methodologyFilter || methodologyFilter === 'usability-test-plan') && (activeSection === 'all' || activeSection === 'usability');
  const showInsights = (!methodologyFilter || methodologyFilter === 'experience-insights') && (activeSection === 'all' || activeSection === 'insights');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Context Banner */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
              <span>04. Experience & Workflows</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>E2E Framework</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight font-sans">
              User Story
            </h2>
            <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
              Target users, rich personas, end-to-end UI workflow proposals, Jakob Nielsen’s 10 Heuristics audit, and structured usability testing plans.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onRefineStory}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-700 bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Refine User Story</span>
            </button>
          </div>
        </div>

        {/* Guiding Questions */}
        <div className="mt-6 pt-5 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800/80 shadow-inner">
            <div className="text-[10px] font-mono text-emerald-400/80 uppercase font-semibold">Question 1</div>
            <div className="text-xs font-semibold text-zinc-100 mt-1">Users & Daily Tasks</div>
            <p className="text-xs text-zinc-400 mt-1.5 line-clamp-3 leading-relaxed">
              {data.guidingQuestions.targetUsersAndDailyTasks}
            </p>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800/80 shadow-inner">
            <div className="text-[10px] font-mono text-emerald-400/80 uppercase font-semibold">Question 2</div>
            <div className="text-xs font-semibold text-zinc-100 mt-1">User Personas Defined</div>
            <p className="text-xs text-zinc-400 mt-1.5 line-clamp-3 leading-relaxed">
              {data.guidingQuestions.userPersonasOverview}
            </p>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800/80 shadow-inner">
            <div className="text-[10px] font-mono text-emerald-400/80 uppercase font-semibold">Question 3</div>
            <div className="text-xs font-semibold text-zinc-100 mt-1">E2E UI Workflow Proposals</div>
            <p className="text-xs text-zinc-400 mt-1.5 line-clamp-3 leading-relaxed">
              {data.guidingQuestions.e2eUiWorkflowOverview}
            </p>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800/80 shadow-inner">
            <div className="text-[10px] font-mono text-emerald-400/80 uppercase font-semibold">Question 4</div>
            <div className="text-xs font-semibold text-zinc-100 mt-1">Ease & Simplicity Validation</div>
            <p className="text-xs text-zinc-400 mt-1.5 line-clamp-3 leading-relaxed">
              {data.guidingQuestions.validationOfEaseAndSimplicity}
            </p>
          </div>
        </div>
      </div>

      {/* Embedded UX Methodologies Banner */}
      <EmbeddedUxMethodologiesBanner
        storyIndex={4}
        storyName="User Story"
        activeMethodologyFilter={methodologyFilter}
        onSelectMethodologyFilter={setMethodologyFilter}
        onOpenMethodologyDetail={onOpenMethodologyDetail}
      />

      {/* Story 04 Dedicated AI Agent Co-Pilot (Aria Morales) */}
      <StoryAgentPanel
        storyIndex={4}
        currentStoryData={data}
        productContext={productContext}
        onApplyStoryUpdates={(updated) => onUpdateData(updated)}
      />

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 bg-zinc-900/80 rounded-xl border border-zinc-800 w-fit overflow-x-auto max-w-full backdrop-blur-sm">
        {[
          { id: 'all', label: 'All Data Points' },
          { id: 'personas', label: 'User Personas' },
          { id: 'workflows', label: 'E2E UI Workflows' },
          { id: 'heuristics', label: 'Nielsen 10 Heuristics' },
          { id: 'usability', label: 'Usability Test Plan' },
          { id: 'insights', label: 'Experience Insights' },
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

      {/* Section 1: User Personas */}
      {showPersonas && (
        <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-5">
          <div className="border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                User Personas & Mental Models
              </h3>
              <button
                onClick={() => onOpenMethodologyDetail && onOpenMethodologyDetail(UX_METHODOLOGIES['focus-groups-user-interviews'])}
                className="text-[10px] font-mono bg-emerald-950/50 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800/50 hover:bg-emerald-900/50 transition-colors flex items-center gap-1 font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>UX Method: Focus Groups & User Interviews</span>
                <Info className="w-2.5 h-2.5" />
              </button>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Explore and uncover attitudes, perceptions, motivations, and reactions to a product, concept, or problem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.userPersonas.map((persona) => (
              <div
                key={persona.id}
                className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/70 flex flex-col justify-between space-y-4 hover:border-zinc-700 transition-colors shadow-inner"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-mono font-bold text-sm shrink-0 shadow-sm">
                        {persona.avatarInitials}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white">{persona.name}</h4>
                        <div className="text-xs text-zinc-400">{persona.role}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 bg-zinc-900 px-2.5 py-0.5 rounded-full border border-zinc-800">
                      {persona.techSavviness}
                    </span>
                  </div>

                  {/* Persona Quote */}
                  <blockquote className="text-xs italic text-zinc-300 bg-zinc-900/90 p-3 rounded-xl border border-zinc-800">
                    "{persona.quote}"
                  </blockquote>

                  {/* Primary Goal */}
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Primary Goal</span>
                    <p className="text-xs text-zinc-200 mt-0.5 font-medium">{persona.primaryGoal}</p>
                  </div>

                  {/* Daily Tasks */}
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Daily Tasks</span>
                    <ul className="mt-1 space-y-1">
                      {persona.dailyTasks.map((task, tIdx) => (
                        <li key={tIdx} className="text-xs text-zinc-300 flex items-start gap-1.5">
                          <span className="text-emerald-400">·</span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800">
                  <span className="text-[10px] font-mono text-rose-400 uppercase font-semibold">Frustrations & Pain</span>
                  <ul className="mt-1 space-y-1">
                    {persona.frustrations.map((fr, fIdx) => (
                      <li key={fIdx} className="text-xs text-rose-200 flex items-start gap-1.5">
                        <span className="text-rose-400 font-bold">✕</span>
                        <span>{fr}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 2: E2E UI Workflow Proposals */}
      {showWorkflows && (
        <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-5">
          <div className="border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                End-to-End Design UI Workflow Proposals
              </h3>
              <span className="text-[10px] font-mono bg-zinc-950 text-cyan-400 px-2 py-0.5 rounded-full border border-zinc-800">
                UX Method: E2E Design Proposals
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Step-by-step visual workflow proposals depicting how users will achieve their goals with zero friction
            </p>
          </div>

          <div className="space-y-4">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-zinc-950/70 rounded-xl border border-zinc-800 text-xs gap-2 shadow-inner">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Workflow Title:</span>
                <span className="ml-2 font-bold text-white">{selectedWorkflow.workflowTitle}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Target Actor:</span>
                <span className="ml-2 font-mono text-cyan-300">{selectedWorkflow.targetUserRole}</span>
              </div>
            </div>

            {/* Step-by-Step Flow Cards */}
            <div className="space-y-3">
              {selectedWorkflow.steps.map((st) => (
                <div
                  key={st.stepNumber}
                  className="p-5 rounded-2xl border border-zinc-800 bg-zinc-950/80 flex flex-col md:flex-row md:items-start gap-4 hover:border-zinc-700 transition-colors shadow-sm"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-sm">
                    {st.stepNumber}
                  </div>

                  <div className="space-y-2 flex-1 text-xs">
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">User Action</span>
                      <h5 className="font-bold text-white text-sm mt-0.5">{st.action}</h5>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">Screen State</span>
                        <p className="text-zinc-300 mt-0.5 leading-snug">{st.screenState}</p>
                      </div>

                      <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">System Feedback</span>
                        <p className="text-zinc-300 mt-0.5 leading-snug">{st.systemFeedback}</p>
                      </div>
                    </div>

                    <div className="bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-800/60 text-emerald-200 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>
                        <strong className="font-semibold text-emerald-300">Friction Guard:</strong> {st.frictionGuard}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Decision Branches */}
            {selectedWorkflow.decisionBranches?.length > 0 && (
              <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 text-xs shadow-inner">
                <span className="font-semibold text-zinc-300 uppercase tracking-wider block mb-1.5 font-mono text-[11px]">
                  Decision Branches & Exceptions
                </span>
                <ul className="space-y-1 text-zinc-400">
                  {selectedWorkflow.decisionBranches.map((br, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-mono">↳</span>
                      <span>{br}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Section 3: Jakob Nielsen's 10 Heuristics Evaluation */}
      {showHeuristics && (
        <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-3 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                  Jakob Nielsen's 10 Usability Heuristics Audit
                </h3>
                <button
                  onClick={() => onOpenMethodologyDetail && onOpenMethodologyDetail(UX_METHODOLOGIES['heuristic-evaluation'])}
                  className="text-[10px] font-mono bg-emerald-950/50 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800/50 hover:bg-emerald-900/50 transition-colors flex items-center gap-1 font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>UX Method: Heuristic Evaluation</span>
                  <Info className="w-2.5 h-2.5" />
                </button>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Evaluate whether a UI design has gaps and issues by using Jakob Nielsen's 10 Usability Heuristics.
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-zinc-950 px-2.5 py-1 rounded-full border border-zinc-800 self-start sm:self-auto">
              10/10 Audited
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.nielsenHeuristicsEvaluation.map((nh) => (
              <div
                key={nh.heuristicNumber}
                className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/70 flex flex-col justify-between space-y-3 shadow-inner"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-cyan-400">
                        #{nh.heuristicNumber}
                      </span>
                      <h4 className="text-xs font-bold text-white">{nh.name}</h4>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                        nh.status === 'Strong Strength'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                          : nh.status === 'Pass'
                          ? 'bg-blue-950/60 text-blue-400 border border-blue-800/60'
                          : 'bg-amber-950/60 text-amber-400 border border-amber-800/60'
                      }`}
                    >
                      {nh.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1 italic">{nh.description}</p>
                  <p className="text-xs text-zinc-300 mt-2 bg-zinc-900/90 p-3 rounded-lg border border-zinc-800 leading-relaxed">
                    {nh.evaluationNotes}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-800 text-xs text-zinc-400">
                  <span className="font-semibold text-emerald-300 font-mono text-[10px] uppercase">Recommendation: </span>
                  <span>{nh.recommendation}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 4: Usability Test Plan */}
      {showUsability && (
        <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-5">
          <div className="border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                Usability Test Plan & Structured Scenarios
              </h3>
              <button
                onClick={() => onOpenMethodologyDetail && onOpenMethodologyDetail(UX_METHODOLOGIES['usability-test-plan'])}
                className="text-[10px] font-mono bg-emerald-950/50 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800/50 hover:bg-emerald-900/50 transition-colors flex items-center gap-1 font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>UX Method: Usability Test Plan & Testing</span>
                <Info className="w-2.5 h-2.5" />
              </button>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Create a plan that outlines how a usability test will be conducted. It defines objectives, goals, personas, tasks, and procedures.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 shadow-inner">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Participant Sample Size & Profile</span>
                <p className="text-zinc-200 font-medium mt-1">{data.usabilityTestPlan.sampleSizeAndProfile}</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 shadow-inner">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Procedures & Rating Scales</span>
                <p className="text-zinc-200 font-medium mt-1">{data.usabilityTestPlan.proceduresAndMetrics}</p>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block font-mono">
                Target Task Scenarios
              </span>
              {data.usabilityTestPlan.taskScenarios.map((task, tIdx) => (
                <div key={task.id || tIdx} className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/80 space-y-2 text-xs shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Task Scenario #{tIdx + 1}</span>
                    <span className="text-cyan-400 font-mono text-[11px] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      Target: &le; {task.maxAllowedTimeSeconds} seconds
                    </span>
                  </div>

                  <p className="text-zinc-300 bg-zinc-900/90 p-3 rounded-xl border border-zinc-800 italic leading-relaxed">
                    Prompt: "{task.taskPrompt}"
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">Expected Path</span>
                      <p className="text-zinc-300 text-[11px] mt-0.5">{task.expectedPath}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-emerald-400 uppercase">Success Criteria</span>
                      <p className="text-emerald-200 text-[11px] mt-0.5">{task.successCriteria}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 5: Experience Insights Strategy */}
      {showInsights && (
        <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-3 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                  Experience Insights Strategy (Telemetry & Digital Experience Platforms)
                </h3>
                <button
                  onClick={() => onOpenMethodologyDetail && onOpenMethodologyDetail(UX_METHODOLOGIES['experience-insights'])}
                  className="text-[10px] font-mono bg-emerald-950/50 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800/50 hover:bg-emerald-900/50 transition-colors flex items-center gap-1 font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>UX Method: Experience Insights</span>
                  <Info className="w-2.5 h-2.5" />
                </button>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Why users behave the way they do and highlight opportunities to improve overall experience by collecting data using Fullstory, Hotjar, and digital platforms.
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-800/60 self-start sm:self-auto">
              {data.experienceInsightsStrategy.tooling}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/70 space-y-1.5 shadow-inner">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Drop-Off Warning Signals</span>
              <ul className="space-y-1">
                {data.experienceInsightsStrategy.dropOffWarningSignals.map((sig, sIdx) => (
                  <li key={sIdx} className="text-zinc-300 text-[11px] leading-snug">· {sig}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/70 space-y-1.5 shadow-inner">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Rage Click & Frustration Monitors</span>
              <ul className="space-y-1">
                {data.experienceInsightsStrategy.rageClickMonitors.map((rg, rIdx) => (
                  <li key={rIdx} className="text-zinc-300 text-[11px] leading-snug">· {rg}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/70 space-y-1.5 shadow-inner">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Qualitative Feedback Loops</span>
              <ul className="space-y-1">
                {data.experienceInsightsStrategy.qualitativeFeedbackChannels.map((qf, qfIdx) => (
                  <li key={qfIdx} className="text-zinc-300 text-[11px] leading-snug">· {qf}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
