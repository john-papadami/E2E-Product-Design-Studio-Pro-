import React, { useState } from 'react';
import { X, Sparkles, Loader2, Wand2, Lightbulb } from 'lucide-react';
import { ProjectContext, FullFrameworkData } from '../types/framework';

interface NewAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerated: (data: FullFrameworkData) => void;
}

export const NewAnalysisModal: React.FC<NewAnalysisModalProps> = ({
  isOpen,
  onClose,
  onGenerated,
}) => {
  const [formData, setFormData] = useState<ProjectContext>({
    productName: '',
    industry: '',
    problemStatement: '',
    targetAudience: '',
    strategicObjectives: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [progressStep, setProgressStep] = useState<string>('');

  if (!isOpen) return null;

  const quickPrompts = [
    {
      title: 'DevOps & Cloud Observability',
      productName: 'KubePulse AI',
      industry: 'Cloud Infrastructure & SRE',
      problemStatement: 'Engineers spend 40% of on-call shifts manually correlating microservice distributed traces during Kubernetes cascading failures.',
      targetAudience: 'Site Reliability Engineers, Platform Architects, and DevOps Leads',
      strategicObjectives: 'Provide automated topological root-cause graph synthesis within 30 seconds of an incident, targeting an SUS > 84.',
    },
    {
      title: 'Legal Tech Contract Intelligence',
      productName: 'LexisAI Copilot',
      industry: 'LegalTech & Enterprise Risk',
      problemStatement: 'In-house legal teams are bogged down reviewing 50-page enterprise vendor agreements with hidden indemnity liabilities and GDPR non-compliance.',
      targetAudience: 'General Counsels, Corporate Paralegals, and Procurement Directors',
      strategicObjectives: 'Automate redline risk scoring and deviation alerts against corporate playbooks, cutting contract review cycle times by 70%.',
    },
    {
      title: 'B2B Logistics Freight Orchestration',
      productName: 'CargoFlow Realtime',
      industry: 'Supply Chain & Cold-Chain Logistics',
      problemStatement: 'Freight dispatchers lose visibility into refrigerated temperature excursions across intermodal rail and ocean transport until cargo arrives spoiled.',
      targetAudience: 'Logistics Operations Managers, Fleet Dispatchers, and Pharmaceutical Shippers',
      strategicObjectives: 'Deliver predictive cold-chain deviation alerts with automated carrier re-routing, driving an NPS > +60.',
    },
  ];

  const handleApplyPreset = (preset: typeof quickPrompts[0]) => {
    setFormData({
      productName: preset.productName,
      industry: preset.industry,
      problemStatement: preset.problemStatement,
      targetAudience: preset.targetAudience,
      strategicObjectives: preset.strategicObjectives,
    });
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productName.trim() || !formData.problemStatement.trim()) {
      setErrorMessage('Please provide at least a Product Name and Core Problem Statement.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setProgressStep('Synthesizing 01. Market Story & Positioning data points...');

    // Progress simulation for user feedback
    const stepTimer1 = setTimeout(() => {
      setProgressStep('Formulating 02. Customer Story, Blueprints & Use Cases...');
    }, 2500);

    const stepTimer2 = setTimeout(() => {
      setProgressStep('Calculating 03. Technology Feasibility (BCR) & WCAG Specs...');
    }, 5500);

    const stepTimer3 = setTimeout(() => {
      setProgressStep('Auditing 04. User Story & Nielsen 10 Heuristics...');
    }, 8500);

    const stepTimer4 = setTimeout(() => {
      setProgressStep('Computing 05. Success Story John Brooke SUS & KPI Formulas...');
    }, 11500);

    try {
      const response = await fetch('/api/generate-framework', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate framework');
      }

      const resJson = await response.json();
      if (!resJson.data) {
        throw new Error('No data received from Gemini model');
      }

      // Merge productContext
      const completeData: FullFrameworkData = {
        productContext: formData,
        marketStory: resJson.data.marketStory,
        customerStory: resJson.data.customerStory,
        technologyStory: resJson.data.technologyStory,
        userStory: resJson.data.userStory,
        successStory: resJson.data.successStory,
      };

      onGenerated(completeData);
      onClose();
    } catch (err: any) {
      console.error('Generation error:', err);
      setErrorMessage(err.message || 'An error occurred while generating the framework.');
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      clearTimeout(stepTimer4);
      setIsLoading(false);
      setProgressStep('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-zinc-900 rounded-2xl max-w-2xl w-full border border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI Generation Engine</span>
            </div>
            <h3 className="text-base font-bold text-white mt-0.5 font-sans">
              Generate E2E Product Design Framework Data Points
            </h3>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Idea Starters */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 mb-2">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Quick Preset Inspiration:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  disabled={isLoading}
                  className="text-left p-3 rounded-xl border border-zinc-800 hover:border-cyan-500/50 bg-zinc-950/80 hover:bg-zinc-950 text-xs transition-all shadow-xs"
                >
                  <div className="font-bold text-white">{p.title}</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">{p.industry}</div>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Product / Feature Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NexusFlow AI"
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  disabled={isLoading}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-100 placeholder-zinc-500 focus:outline-hidden focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Industry / Domain
                </label>
                <input
                  type="text"
                  placeholder="e.g. FinTech, HealthTech, Developer Tools"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  disabled={isLoading}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-100 placeholder-zinc-500 focus:outline-hidden focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Core Problem Statement or Trigger Need *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Describe the real-world friction, current workarounds, and user struggle..."
                value={formData.problemStatement}
                onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                disabled={isLoading}
                className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-100 placeholder-zinc-500 focus:outline-hidden focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Target Audience & Stakeholders
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tier 2 Support Engineers & VP Customer Success"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  disabled={isLoading}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-100 placeholder-zinc-500 focus:outline-hidden focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Strategic Objectives & Targets
                </label>
                <input
                  type="text"
                  placeholder="e.g. Slash MTTR by 60%, achieve SUS > 82"
                  value={formData.strategicObjectives}
                  onChange={(e) => setFormData({ ...formData, strategicObjectives: e.target.value })}
                  disabled={isLoading}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-100 placeholder-zinc-500 focus:outline-hidden focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 bg-rose-950/60 border border-rose-800/80 rounded-xl text-xs text-rose-200">
                {errorMessage}
              </div>
            )}

            {isLoading && (
              <div className="p-4 bg-zinc-950/90 border border-zinc-800 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
                  <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                  <span>Synthesizing E2E Stories via Gemini 3.8 Flash...</span>
                </div>
                <p className="text-xs font-mono text-zinc-400 pl-6">
                  {progressStep}
                </p>
              </div>
            )}

            <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white text-xs font-bold transition-all disabled:opacity-50 shadow-lg shadow-cyan-950/60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                    <span>Generating Stories...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                    <span>Generate All 5 Stories</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
