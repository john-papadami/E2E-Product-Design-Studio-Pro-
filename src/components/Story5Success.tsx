import React, { useState } from 'react';
import { Award, Sparkles, TrendingUp, Users, Target, ShieldAlert, Check, RefreshCw, Info } from 'lucide-react';
import { SuccessStoryData, SusQuestionItem } from '../types/framework';
import { calculateSusScore } from '../data/caseStudies';
import { EmbeddedUxMethodologiesBanner } from './EmbeddedUxMethodologiesBanner';
import { StoryAgentPanel } from './StoryAgentPanel';
import { UX_METHODOLOGIES, UxMethodology } from '../data/methodologies';

interface Story5SuccessProps {
  data: SuccessStoryData;
  productContext?: any;
  onRefineStory: () => void;
  onUpdateData: (updated: SuccessStoryData) => void;
  onOpenMethodologyDetail?: (methodology: UxMethodology) => void;
}

export const Story5Success: React.FC<Story5SuccessProps> = ({
  data,
  productContext,
  onRefineStory,
  onUpdateData,
  onOpenMethodologyDetail,
}) => {
  const [activeSection, setActiveSection] = useState<'all' | 'sus' | 'nps' | 'kpis' | 'financials' | 'contingency'>('all');
  const [methodologyFilter, setMethodologyFilter] = useState<string | null>(null);

  const sus = data.systemUsabilityScale;

  // Handle live rating change on John Brooke 10 questions
  const handleSusRatingChange = (questionId: number, newScore: number) => {
    const updatedQuestions = sus.questions.map((q) =>
      q.id === questionId ? { ...q, score: newScore } : q
    );
    const { score, grade } = calculateSusScore(updatedQuestions);

    onUpdateData({
      ...data,
      systemUsabilityScale: {
        ...sus,
        questions: updatedQuestions,
        calculatedScore: score,
        ratingCategory: grade,
      },
    });
  };

  const resetDefaultSus = () => {
    const defaultQuestions = sus.questions.map((q) => ({
      ...q,
      score: q.isNegative ? 2 : 4,
    }));
    const { score, grade } = calculateSusScore(defaultQuestions);
    onUpdateData({
      ...data,
      systemUsabilityScale: {
        ...sus,
        questions: defaultQuestions,
        calculatedScore: score,
        ratingCategory: grade,
      },
    });
  };

  const showSus = (!methodologyFilter || methodologyFilter === 'system-usability-scale') && (activeSection === 'all' || activeSection === 'sus');
  const showNps = (!methodologyFilter || methodologyFilter === 'net-promoter-score') && (activeSection === 'all' || activeSection === 'nps');
  const showKpis = (!methodologyFilter || methodologyFilter === 'kpi-kbi-results') && (activeSection === 'all' || activeSection === 'kpis');
  const showFinancials = (!methodologyFilter || methodologyFilter === 'kpi-kbi-results') && (activeSection === 'all' || activeSection === 'financials');
  const showContingency = (!methodologyFilter || methodologyFilter === 'system-usability-scale' || methodologyFilter === 'kpi-kbi-results') && (activeSection === 'all' || activeSection === 'contingency');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Context Banner */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>05. Measurement & Usability Scale</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-400">E2E Framework</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">
              Success Story
            </h2>
            <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
              John Brooke’s System Usability Scale (SUS), Net Promoter Score (NPS), conversion/retention KPI & KBI formulas, and contingency roadmaps.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onRefineStory}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-700 bg-zinc-800/90 text-zinc-200 hover:text-white hover:bg-zinc-700 hover:border-zinc-600 text-xs font-medium transition-all shadow-sm group"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>Refine Success Story</span>
            </button>
          </div>
        </div>

        {/* Guiding Questions */}
        <div className="mt-8 pt-6 border-t border-zinc-800/80 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/80 hover:border-zinc-700 transition-colors">
            <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">Question 1</div>
            <div className="text-xs font-semibold text-zinc-200 mt-1">Market Share & Financials</div>
            <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
              {data.guidingQuestions.marketShareAndFinancials}
            </p>
          </div>

          <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/80 hover:border-zinc-700 transition-colors">
            <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">Question 2</div>
            <div className="text-xs font-semibold text-zinc-200 mt-1">Customer Engagement & NPS</div>
            <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
              {data.guidingQuestions.customerEngagementMetrics}
            </p>
          </div>

          <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/80 hover:border-zinc-700 transition-colors">
            <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">Question 3</div>
            <div className="text-xs font-semibold text-zinc-200 mt-1">KPI & KBI Formulas</div>
            <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
              {data.guidingQuestions.kpiKbiOverview}
            </p>
          </div>

          <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/80 hover:border-zinc-700 transition-colors">
            <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">Question 4</div>
            <div className="text-xs font-semibold text-zinc-200 mt-1">SUS Usability & Contingencies</div>
            <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
              {data.guidingQuestions.contingencyImprovements}
            </p>
          </div>
        </div>
      </div>

      {/* Embedded UX Methodologies Banner */}
      <EmbeddedUxMethodologiesBanner
        storyIndex={5}
        storyName="Success Story"
        activeMethodologyFilter={methodologyFilter}
        onSelectMethodologyFilter={setMethodologyFilter}
        onOpenMethodologyDetail={onOpenMethodologyDetail}
      />

      {/* Story 05 Dedicated AI Agent Co-Pilot (David Sterling) */}
      <StoryAgentPanel
        storyIndex={5}
        currentStoryData={data}
        productContext={productContext}
        onApplyStoryUpdates={(updated) => onUpdateData(updated)}
      />

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 bg-zinc-900/80 rounded-xl border border-zinc-800 w-fit overflow-x-auto max-w-full backdrop-blur-sm">
        {[
          { id: 'all', label: 'All Data Points' },
          { id: 'sus', label: 'SUS Usability Scale' },
          { id: 'nps', label: 'Net Promoter Score (NPS)' },
          { id: 'kpis', label: 'KPI & KBI Dashboard' },
          { id: 'financials', label: 'Financial Targets' },
          { id: 'contingency', label: 'Contingency Roadmap' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all shrink-0 ${
              activeSection === tab.id
                ? 'bg-zinc-800 text-amber-400 shadow-sm border border-zinc-700/80'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Section 1: System Usability Scale (SUS) Interactive Tool */}
      {showSus && (
        <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-4 gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold text-zinc-100 uppercase tracking-wider">
                  System Usability Scale (SUS) Interactive Calculator
                </h3>
                <button
                  onClick={() => onOpenMethodologyDetail && onOpenMethodologyDetail(UX_METHODOLOGIES['system-usability-scale'])}
                  className="text-[10px] font-mono bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30 hover:bg-amber-500/20 transition-colors flex items-center gap-1 font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>UX Method: System Usability Scale</span>
                  <Info className="w-2.5 h-2.5" />
                </button>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Administer John Brooke's 10-item questionnaire to measure perceived usability. &gt;80.3 = Excellent, 68-80.3 = Good, 68 = OK, 51-68 = Poor, &lt;51 = Awful.
              </p>
            </div>
            <button
              onClick={resetDefaultSus}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors self-start sm:self-auto px-2.5 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700/80 hover:bg-zinc-700/80"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Questions</span>
            </button>
          </div>

          {/* SUS Score Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-xl bg-zinc-950/70 border border-zinc-800">
            <div className="text-center md:text-left flex flex-col justify-center">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Calculated SUS Score</span>
              <div className="text-4xl sm:text-5xl font-mono font-bold text-zinc-100 mt-2">
                {sus.calculatedScore} <span className="text-sm font-normal text-zinc-500">/ 100</span>
              </div>
              <div className="text-xs text-zinc-400 mt-1.5">Target Threshold: <span className="text-amber-400 font-mono font-bold">{sus.targetScore}</span></div>
            </div>

            <div className="flex flex-col justify-center p-4 bg-zinc-900 rounded-xl border border-zinc-800">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Papadami Rating Tier</span>
              <div
                className={`text-base font-bold mt-1.5 ${
                  sus.ratingCategory.includes('Excellent')
                    ? 'text-emerald-400'
                    : sus.ratingCategory.includes('Good')
                    ? 'text-cyan-400'
                    : sus.ratingCategory.includes('OK')
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}
              >
                {sus.ratingCategory}
              </div>
              <div className="text-[11px] text-zinc-400 mt-1">
                {sus.benchmarkComparison}
              </div>
            </div>

            {/* Reference Grade Chart */}
            <div className="text-xs text-zinc-400 flex flex-col justify-center space-y-1.5 p-4 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
              <span className="font-semibold text-zinc-200 text-[11px] uppercase tracking-wider mb-0.5">
                Framework SUS Scale Reference:
              </span>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-emerald-400 font-medium">&gt; 80.3</span>
                <span>Excellent</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-cyan-400 font-medium">68 – 80.3</span>
                <span>Good</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-amber-400 font-medium">68.0</span>
                <span>OK (Industry Benchmark)</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-rose-400 font-medium">51 – 68.0</span>
                <span>Poor</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-rose-500 font-medium">&lt; 51.0</span>
                <span>Awful</span>
              </div>
            </div>
          </div>

          {/* 10-Question Interactive Questionnaire */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
              10-Item Questionnaire (Adjust responses 1 = Strongly Disagree to 5 = Strongly Agree)
            </span>
            <div className="divide-y divide-zinc-800 border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950/60">
              {sus.questions.map((q) => (
                <div
                  key={q.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-zinc-900/50 transition-colors"
                >
                  <div className="flex items-start gap-3 max-w-xl">
                    <span className="font-mono text-xs font-bold text-amber-400/80 shrink-0 mt-0.5">
                      {q.id < 10 ? `0${q.id}` : q.id}.
                    </span>
                    <div>
                      <p className="text-xs text-zinc-200 leading-snug">{q.text}</p>
                      <span className="text-[10px] font-mono text-zinc-500">
                        {q.isNegative ? 'Negative phrasing (inverts calculation)' : 'Positive phrasing'}
                      </span>
                    </div>
                  </div>

                  {/* 1-5 Radio Buttons */}
                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                    <span className="text-[10px] text-zinc-500 mr-1 hidden md:inline">Disagree</span>
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        onClick={() => handleSusRatingChange(q.id, val)}
                        className={`w-7 h-7 rounded text-xs font-mono font-medium transition-all ${
                          q.score === val
                            ? 'bg-amber-400 text-zinc-950 shadow-md font-bold'
                            : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                    <span className="text-[10px] text-zinc-500 ml-1 hidden md:inline">Agree</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 2: Net Promoter Score (NPS) */}
      {showNps && (
        <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-5">
          <div className="border-b border-zinc-800 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-zinc-100 uppercase tracking-wider">
                Net Promoter Score (NPS) Advocacy Analysis
              </h3>
              <button
                onClick={() => onOpenMethodologyDetail && onOpenMethodologyDetail(UX_METHODOLOGIES['net-promoter-score'])}
                className="text-[10px] font-mono bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors flex items-center gap-1 font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>UX Method: Net Promoter Score (NPS)</span>
                <Info className="w-2.5 h-2.5" />
              </button>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              How loyal and satisfied are your customers and how strongly they advocate for your product. Formula: NPS = % Promoters – % Detractors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 rounded-xl bg-zinc-950/70 border border-zinc-800 text-center">
            <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Target NPS</span>
              <div className="text-3xl font-mono font-bold text-zinc-100 mt-1.5">
                +{data.netPromoterScore.targetNps}
              </div>
              <div className="text-[11px] text-zinc-400 mt-1">Top-tier loyalty</div>
            </div>

            <div className="p-4 bg-emerald-950/30 rounded-xl border border-emerald-800/40">
              <span className="text-[11px] font-mono text-emerald-400 uppercase font-semibold tracking-wider">Promoters (9-10)</span>
              <div className="text-3xl font-mono font-bold text-emerald-300 mt-1.5">
                {data.netPromoterScore.projectedPromoters}%
              </div>
              <div className="text-[11px] text-emerald-400/80 mt-1">Organic advocates</div>
            </div>

            <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Passives (7-8)</span>
              <div className="text-3xl font-mono font-bold text-zinc-200 mt-1.5">
                {data.netPromoterScore.projectedPassives}%
              </div>
              <div className="text-[11px] text-zinc-400 mt-1">Neutral / satisfied</div>
            </div>

            <div className="p-4 bg-rose-950/30 rounded-xl border border-rose-800/40">
              <span className="text-[11px] font-mono text-rose-400 uppercase font-semibold tracking-wider">Detractors (0-6)</span>
              <div className="text-3xl font-mono font-bold text-rose-300 mt-1.5">
                {data.netPromoterScore.projectedDetractors}%
              </div>
              <div className="text-[11px] text-rose-400/80 mt-1">Churn risk</div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/60 text-xs">
            <span className="font-semibold text-zinc-200 uppercase tracking-wider block mb-1">
              Advocate Growth & Community Strategy
            </span>
            <p className="text-zinc-300 leading-relaxed">
              {data.netPromoterScore.advocateGrowthStrategy}
            </p>
          </div>
        </section>
      )}

      {/* Section 3: KPI & KBI Scorecard with Exact Formulas */}
      {showKpis && (
        <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-5">
          <div className="border-b border-zinc-800 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-zinc-100 uppercase tracking-wider">
                Key Performance & Business Indicator (KPI / KBI) Scorecard
              </h3>
              <button
                onClick={() => onOpenMethodologyDetail && onOpenMethodologyDetail(UX_METHODOLOGIES['kpi-kbi-results'])}
                className="text-[10px] font-mono bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors flex items-center gap-1 font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>UX Method: KPI & KBI Results</span>
                <Info className="w-2.5 h-2.5" />
              </button>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Measure how well a product is performing against its goals. Exact formulas: Conversion rate = conversions ÷ total visitors, Retention = returning ÷ total users, NPS = % promoters – % detractors.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-zinc-800 font-mono text-zinc-400 uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-3">Metric Name</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Exact Formula</th>
                  <th className="py-3 px-3">Target Value</th>
                  <th className="py-3 px-3">Cadence</th>
                  <th className="py-3 px-3">Strategic Rationale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80">
                {data.kpiKbiDashboard.map((kpi, kIdx) => (
                  <tr key={kpi.id || kIdx} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3 px-3 font-semibold text-zinc-100">{kpi.metric}</td>
                    <td className="py-3 px-3">
                      <span className="font-mono text-[11px] text-zinc-400">{kpi.category}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-mono text-xs text-amber-300 bg-zinc-950/80 px-2.5 py-1 rounded-lg border border-zinc-800 inline-block">
                        {kpi.formula}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-zinc-100">{kpi.targetValue}</td>
                    <td className="py-3 px-3 text-zinc-400 font-mono text-[11px]">{kpi.measurementCadence}</td>
                    <td className="py-3 px-3 text-zinc-300 max-w-xs">{kpi.rationale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Section 4: Financial & Market Targets */}
      {showFinancials && (
        <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-5">
          <div className="border-b border-zinc-800 pb-4">
            <h3 className="text-sm font-semibold text-zinc-100 uppercase tracking-wider">
              Financial Targets & Market Share Goals
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Sales results, revenue trajectories, and capital efficiency milestones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/60 space-y-1.5">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Target Market Share</span>
              <p className="font-semibold text-zinc-100 text-sm mt-1">{data.financialAndMarketTargets.marketShareTarget}</p>
            </div>

            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/60 space-y-1.5">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Revenue / ROI Delivered</span>
              <p className="font-semibold text-zinc-100 text-sm mt-1">{data.financialAndMarketTargets.revenueOrRoiTarget}</p>
            </div>

            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/60 space-y-1.5">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">CAC Payback Time</span>
              <p className="font-semibold text-zinc-100 text-sm mt-1">{data.financialAndMarketTargets.customerAcquisitionCostPayback}</p>
            </div>

            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/60 space-y-1.5">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Customer Lifetime Value (LTV)</span>
              <p className="font-semibold text-zinc-100 text-sm mt-1">{data.financialAndMarketTargets.lifetimeValueProjection}</p>
            </div>
          </div>
        </section>
      )}

      {/* Section 5: Contingency Roadmap */}
      {showContingency && (
        <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-5">
          <div className="border-b border-zinc-800 pb-4">
            <h3 className="text-sm font-semibold text-zinc-100 uppercase tracking-wider">
              Contingency & Corrective Action Roadmap
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Pre-planned UX/UI and architectural improvements triggered if key performance targets are missed
            </p>
          </div>

          <div className="space-y-3">
            {data.contingencyRoadmap.map((cr, cIdx) => (
              <div
                key={cIdx}
                className="p-5 rounded-xl border border-zinc-800 bg-zinc-950/60 flex flex-col md:flex-row md:items-start justify-between gap-4 text-xs hover:border-zinc-700 transition-colors"
              >
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-zinc-100">Scenario:</span>
                    <span className="text-amber-300 font-medium">{cr.scenario}</span>
                  </div>
                  <p className="text-rose-300 bg-rose-950/40 p-2.5 rounded-lg border border-rose-800/40">
                    <span className="font-semibold text-rose-200">Warning Indicator:</span> {cr.signalIndicator}
                  </p>
                  <p className="text-emerald-300 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800/40">
                    <span className="font-semibold text-emerald-200">Corrective UX Action:</span> {cr.correctiveAction}
                  </p>
                </div>

                <div className="shrink-0 bg-zinc-900 p-3 rounded-xl border border-zinc-800 text-right">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase block tracking-wider">Refinement Lead Time</span>
                  <span className="font-mono font-bold text-zinc-100 text-xs mt-1 block">{cr.uxRefinementLeadTime}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
