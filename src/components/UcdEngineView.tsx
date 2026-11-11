import React from 'react';
import { Workflow, CheckCircle, ArrowRight, Layers, FileText, Activity } from 'lucide-react';
import { FullFrameworkData } from '../types/framework';

interface UcdEngineViewProps {
  frameworkData: FullFrameworkData;
}

export const UcdEngineView: React.FC<UcdEngineViewProps> = ({ frameworkData }) => {
  const ucdSteps = [
    {
      step: '01',
      title: 'Analysis',
      subtitle: 'User and business specific',
      description: 'Focuses on understanding the core problem by analyzing specific user needs. Aligns user research directly with overarching business goals to ensure strategic fit.',
      outputs: [
        'Problem statements & user triggers',
        'Competitive IA & pattern benchmark',
        'Stakeholder mapping & alignment',
      ],
      mappedStories: ['Story 1: Market Story', 'Story 2: Customer Story'],
    },
    {
      step: '02',
      title: 'Define Requirements',
      subtitle: 'User and business specific',
      description: 'Translates the initial analysis into concrete, actionable project guidelines. Establishes clear criteria that satisfy both end-user expectations and technical/business constraints.',
      outputs: [
        'Product use case specifications',
        'Benefit-Cost Ratio (BCR) assessment',
        'Acceptance criteria & tech constraints',
      ],
      mappedStories: ['Story 2: Customer Story', 'Story 3: Technology Story'],
    },
    {
      step: '03',
      title: 'E2E Designs',
      subtitle: 'Workflows, prototyping, iterations, reviews',
      description: 'Maps out the complete user journey using detailed workflow diagrams. Brings concepts to life through interactive prototyping. Relies on continuous design iterations and cross-functional design reviews to refine the solution.',
      outputs: [
        'E2E UI workflow proposals & screen states',
        'Design system tokens & components',
        'Friction-guard micro-interactions',
      ],
      mappedStories: ['Story 3: Technology Story', 'Story 4: User Story'],
    },
    {
      step: '04',
      title: 'Validation',
      subtitle: 'Usability test plan, usability testing, user feedback',
      description: 'Establishes a structured usability test plan to evaluate the design’s effectiveness. Conducts direct usability testing with target users. Gathers qualitative and quantitative user feedback to identify friction points.',
      outputs: [
        'Structured usability test plan & scenarios',
        'Jakob Nielsen’s 10 Heuristics evaluation',
        'Think-aloud protocol observations',
      ],
      mappedStories: ['Story 4: User Story'],
    },
    {
      step: '05',
      title: 'Success Results',
      subtitle: 'Usability test results, System Usability Scale (SUS), UX/UI refinement',
      description: 'Evaluates the overall performance using concrete data, such as usability test results. Measures user satisfaction using standardized metrics like the System Usability Scale (SUS). Applies findings to make final UX/UI refinements to the product.',
      outputs: [
        'System Usability Scale (SUS) John Brooke audit',
        'Net Promoter Score (NPS) advocate forecast',
        'Conversion & retention KPI scorecard',
      ],
      mappedStories: ['Story 5: Success Story'],
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <span>Practical Engine</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>John Papadami Methodology</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight font-sans">
            User-Centered Design (UCD) Engine
          </h2>
          <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
            The User-Centered Design (UCD) process acts as the practical engine within the broader E2E framework, ensuring that product decisions are continuously driven by real user needs. By moving iteratively from initial research to final evaluation, this process aligns business objectives with actionable, user-focused design deliverables.
          </p>
        </div>
      </div>

      {/* 5-Step Linear Engine Progression */}
      <div className="space-y-4">
        <div className="border-b border-zinc-800 pb-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            The 5 Iterative UCD Engine Phases
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {ucdSteps.map((step, idx) => (
            <div
              key={step.step}
              className="p-4 rounded-xl border border-zinc-800/90 bg-zinc-900/70 backdrop-blur-sm flex flex-col justify-between space-y-4 hover:border-zinc-700 transition-colors shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400">Phase {step.step}</span>
                  {idx < 4 && <ArrowRight className="w-3.5 h-3.5 text-zinc-600 hidden md:block" />}
                </div>

                <h4 className="text-sm font-bold text-white">{step.title}</h4>
                <div className="text-[11px] font-mono text-zinc-400">{step.subtitle}</div>
                <p className="text-xs text-zinc-400 leading-snug">{step.description}</p>
              </div>

              <div className="space-y-2 pt-3 border-t border-zinc-800/80 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">Core Deliverables</span>
                  <ul className="mt-1 space-y-1">
                    {step.outputs.map((out, oIdx) => (
                      <li key={oIdx} className="text-[11px] text-zinc-300 leading-tight">✓ {out}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">Powers</span>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {step.mappedStories.map((ms, msIdx) => (
                      <span key={msIdx} className="text-[10px] font-mono text-cyan-300 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">
                        {ms}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cross-Matrix: 5 Stories x 5 UCD Phases */}
      <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-5">
        <div className="border-b border-zinc-800 pb-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            E2E Framework Alignment Matrix (5 Stories &times; 5 UCD Phases)
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            How the 5 corporate stories synthesize with the User-Centered Design practical engine
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-zinc-800 rounded-xl overflow-hidden">
            <thead className="bg-zinc-950 font-mono text-zinc-400 uppercase text-[10px] border-b border-zinc-800">
              <tr>
                <th className="py-3 px-3">E2E Story</th>
                <th className="py-3 px-3">1. Analysis</th>
                <th className="py-3 px-3">2. Define Requirements</th>
                <th className="py-3 px-3">3. E2E Designs</th>
                <th className="py-3 px-3">4. Validation</th>
                <th className="py-3 px-3">5. Success Results</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              <tr className="hover:bg-zinc-800/40">
                <td className="py-3 px-3 font-semibold text-white">01. Market Story</td>
                <td className="py-3 px-3 text-zinc-300">Competitive IA & Market Trends</td>
                <td className="py-3 px-3 text-zinc-300">Value Proposition Mapping</td>
                <td className="py-3 px-3 text-zinc-600 font-mono text-[11px]">—</td>
                <td className="py-3 px-3 text-zinc-600 font-mono text-[11px]">—</td>
                <td className="py-3 px-3 text-zinc-300">Market Share Goals</td>
              </tr>
              <tr className="hover:bg-zinc-800/40">
                <td className="py-3 px-3 font-semibold text-white">02. Customer Story</td>
                <td className="py-3 px-3 text-zinc-300">Customer & Stakeholder Interviews</td>
                <td className="py-3 px-3 text-zinc-300">Use Cases & Blueprinting</td>
                <td className="py-3 px-3 text-zinc-300">Journey Mapping & Touchpoints</td>
                <td className="py-3 px-3 text-zinc-300">Customer Feedback Loops</td>
                <td className="py-3 px-3 text-zinc-600 font-mono text-[11px]">—</td>
              </tr>
              <tr className="hover:bg-zinc-800/40">
                <td className="py-3 px-3 font-semibold text-white">03. Technology Story</td>
                <td className="py-3 px-3 text-zinc-300">Platform Limits & Feasibility</td>
                <td className="py-3 px-3 text-zinc-300">BCR Scoring & API Specs</td>
                <td className="py-3 px-3 text-zinc-300">Design System & WCAG Standards</td>
                <td className="py-3 px-3 text-zinc-300">Latency & Accessibility Testing</td>
                <td className="py-3 px-3 text-zinc-600 font-mono text-[11px]">—</td>
              </tr>
              <tr className="hover:bg-zinc-800/40">
                <td className="py-3 px-3 font-semibold text-white">04. User Story</td>
                <td className="py-3 px-3 text-zinc-300">Focus Groups & Persona Definition</td>
                <td className="py-3 px-3 text-zinc-300">Task Flows & Job-to-be-Done</td>
                <td className="py-3 px-3 text-zinc-300">E2E UI Workflows & Prototypes</td>
                <td className="py-3 px-3 text-zinc-300">Nielsen 10 Heuristics & Usability Plan</td>
                <td className="py-3 px-3 text-zinc-300">Task Completion & Drop-offs</td>
              </tr>
              <tr className="hover:bg-zinc-800/40">
                <td className="py-3 px-3 font-semibold text-white">05. Success Story</td>
                <td className="py-3 px-3 text-zinc-600 font-mono text-[11px]">—</td>
                <td className="py-3 px-3 text-zinc-300">KPI & KBI Target Baselines</td>
                <td className="py-3 px-3 text-zinc-600 font-mono text-[11px]">—</td>
                <td className="py-3 px-3 text-zinc-300">John Brooke 10-Item Usability Scale</td>
                <td className="py-3 px-3 text-emerald-400 font-semibold font-mono">SUS Score &gt;80.3 & NPS Roadmap</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
