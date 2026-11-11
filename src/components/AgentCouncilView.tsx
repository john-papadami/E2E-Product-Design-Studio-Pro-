import React, { useState } from 'react';
import {
  Users,
  Sparkles,
  Bot,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Workflow,
  Cpu,
  Smile,
  Award,
  Compass,
  Loader2,
  Scale
} from 'lucide-react';
import { STORY_AGENTS } from '../data/agents';
import { CouncilReviewResult } from '../types/agent';
import { FullFrameworkData } from '../types/framework';
import { StoryTab } from './StoryNavigation';

interface AgentCouncilViewProps {
  frameworkData: FullFrameworkData;
  onNavigateToStory: (tab: StoryTab) => void;
}

export const AgentCouncilView: React.FC<AgentCouncilViewProps> = ({
  frameworkData,
  onNavigateToStory,
}) => {
  const [loading, setLoading] = useState(false);
  const [reviewResult, setReviewResult] = useState<CouncilReviewResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const agentsList = Object.values(STORY_AGENTS);

  const storyTabMap: Record<number, StoryTab> = {
    1: 'market',
    2: 'customer',
    3: 'technology',
    4: 'user',
    5: 'success',
  };

  const storyIcons: Record<number, React.ReactNode> = {
    1: <Compass className="w-4 h-4 text-amber-600" />,
    2: <Users className="w-4 h-4 text-blue-600" />,
    3: <Cpu className="w-4 h-4 text-purple-600" />,
    4: <Smile className="w-4 h-4 text-emerald-600" />,
    5: <Award className="w-4 h-4 text-rose-600" />,
  };

  const handleRunCouncilReview = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/council-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ frameworkData }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to convene council review');
      }

      setReviewResult(data.review);
    } catch (err: any) {
      setError(err.message || 'Error convening council review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
              <Bot className="w-3.5 h-3.5" />
              <span>Multi-Agent Swarm Orchestrator</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>5 Story Specialists</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight font-sans">
              E2E AI Agents Council
            </h2>
            <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
              Each of the 5 stories in John Papadami's framework is assigned a dedicated autonomous agent specialized in distinct UX methodologies and quantitative models. Convene the council to execute cross-story tension checks, detect blind spots, and align multidisciplinary personas.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleRunCouncilReview}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-cyan-950/60 transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Convening 5-Agent Council...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  <span>Convene All-Agents Council Review</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Error alert */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-200 text-xs flex items-center gap-2 backdrop-blur-md">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Council Review Results Display */}
      {reviewResult && (
        <div className="bg-zinc-950 text-zinc-100 rounded-2xl p-6 sm:p-8 space-y-8 shadow-2xl border border-zinc-800/90 animate-fadeIn">
          {/* Executive Score & Summary */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Multi-Agent Consensus Report</span>
              </div>
              <h3 className="text-xl font-bold text-white font-sans">
                Council Executive Evaluation
              </h3>
              <p className="text-zinc-300 text-xs max-w-2xl leading-relaxed">
                {reviewResult.executiveSummary}
              </p>
            </div>

            <div className="flex items-center gap-4 bg-zinc-900/90 p-4 rounded-xl border border-zinc-800 shrink-0 shadow-inner">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 font-mono tabular-nums">
                  {reviewResult.overallHealthScore}
                  <span className="text-sm font-normal text-zinc-500">/100</span>
                </div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase mt-0.5">
                  Framework Health
                </div>
              </div>
              <div className="w-px h-10 bg-zinc-800" />
              <div className="text-xs text-zinc-300 space-y-0.5">
                <div className="font-semibold text-white">
                  {reviewResult.overallHealthScore >= 80 ? 'High Alignment' : reviewResult.overallHealthScore >= 65 ? 'Moderate Tension' : 'Critical Gaps'}
                </div>
                <div className="text-[11px] text-zinc-400">
                  5 of 5 Agents reporting
                </div>
              </div>
            </div>
          </div>

          {/* Individual Agent Report Cards */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Domain Critiques & Scorecards
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviewResult.agentCritiques.map((critique) => (
                <div
                  key={critique.agentId}
                  className="bg-zinc-900/80 rounded-xl p-4 border border-zinc-800 space-y-3 flex flex-col justify-between hover:border-zinc-700 transition-colors shadow-sm"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-xs font-bold text-white">
                          {critique.agentName}
                        </div>
                        <div className="text-[10px] font-mono text-cyan-400/80">
                          {critique.storyName}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-cyan-300 font-mono">
                          {critique.score}%
                        </span>
                        <span className={`block text-[9px] font-mono px-1.5 py-0.2 rounded mt-0.5 ${
                          critique.verdict === 'Strong'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : critique.verdict === 'Needs Refinement'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}>
                          {critique.verdict}
                        </span>
                      </div>
                    </div>

                    {/* Strengths */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-zinc-400">
                        Observed Strengths:
                      </span>
                      <ul className="space-y-0.5">
                        {critique.keyStrengths.map((str, sIdx) => (
                          <li key={sIdx} className="text-[11px] text-zinc-300 flex items-start gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{str}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Gaps */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-zinc-400">
                        Critical Gaps:
                      </span>
                      <ul className="space-y-0.5">
                        {critique.criticalGaps.map((gap, gIdx) => (
                          <li key={gIdx} className="text-[11px] text-rose-300 flex items-start gap-1.5">
                            <AlertTriangle className="w-3 h-3 text-rose-400 shrink-0 mt-0.5" />
                            <span>{gap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Immediate Action Item */}
                  <div className="pt-2 border-t border-zinc-800 text-[11px] text-cyan-200/90 bg-zinc-950/70 p-2.5 rounded-lg border border-zinc-800">
                    <span className="font-semibold text-cyan-300 block text-[10px] uppercase font-mono">
                      Action Item:
                    </span>
                    {critique.immediateActionItem}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cross-Story Synergies Matrix */}
          {reviewResult.crossStorySynergies && reviewResult.crossStorySynergies.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <Scale className="w-3.5 h-3.5 text-cyan-400" />
                <span>Cross-Story Synergies & Alignment Tensions</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {reviewResult.crossStorySynergies.map((syn, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-200">
                        {syn.storyPair}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        syn.alignmentStatus === 'Aligned'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : syn.alignmentStatus === 'Tension Detected'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-rose-950 text-rose-300 border border-rose-800'
                      }`}>
                        {syn.alignmentStatus}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {syn.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* The 5 Story Agents Roster Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white font-sans">
            Assigned Story Agents Roster
          </h3>
          <span className="text-xs font-mono text-zinc-400">
            5 Active Specialists Grounded in John Papadami's Framework
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {agentsList.map((agent) => (
            <div
              key={agent.id}
              className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 shadow-lg space-y-4 flex flex-col justify-between hover:border-zinc-700 transition-all backdrop-blur-md"
            >
              <div className="space-y-3">
                {/* Agent Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.themeColor} text-white flex items-center justify-center font-bold text-base shadow-md ring-2 ring-white/10 shrink-0`}>
                      {agent.avatarInitials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-white font-sans">
                          {agent.name}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-cyan-500/40 bg-cyan-950/40 text-cyan-300">
                          0{agent.storyIndex} · {agent.storyName}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 font-medium leading-tight mt-0.5">
                        {agent.title}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                    {storyIcons[agent.storyIndex]}
                  </div>
                </div>

                {/* Role Description */}
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {agent.bio}
                </p>

                {/* UX Methodology Arsenal */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">
                    Core UX Methodologies Governed:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {agent.methodologyFocus.map((m, mIdx) => (
                      <span
                        key={mIdx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-950 text-zinc-300 border border-zinc-800"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Autonomous Capabilities */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">
                    Autonomous Capabilities:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {agent.capabilities.map((c) => (
                      <div
                        key={c.id}
                        className="p-2 rounded-xl bg-zinc-950/80 border border-zinc-800 text-[11px] text-zinc-300"
                      >
                        <span className="font-bold text-white block">
                          {c.label}
                        </span>
                        <span className="text-zinc-400 text-[10px] line-clamp-1">
                          {c.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Jump to Co-Pilot Button */}
              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500 font-mono">
                  Embedded in Story 0{agent.storyIndex}
                </span>
                <button
                  onClick={() => onNavigateToStory(storyTabMap[agent.storyIndex])}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 text-cyan-300 hover:bg-zinc-700 hover:text-white text-xs font-semibold transition-colors border border-zinc-700"
                >
                  <span>Consult {agent.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
