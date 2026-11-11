import React, { useState } from 'react';
import { X, Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { ProjectContext } from '../types/framework';

interface RefineStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  storyIndex: number;
  storyName: string;
  currentStoryData: any;
  productContext: ProjectContext;
  onRefined: (refinedStoryData: any) => void;
}

export const RefineStoryModal: React.FC<RefineStoryModalProps> = ({
  isOpen,
  onClose,
  storyIndex,
  storyName,
  currentStoryData,
  productContext,
  onRefined,
}) => {
  const [instruction, setInstruction] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const defaultSuggestions: Record<number, string[]> = {
    1: [
      'Add 2 additional enterprise competitors with deep IA analysis',
      'Sharpen the TAM/SAM/SOM financial breakdown with vertical segmentation',
      'Expand the Value Proposition Canvas with concrete pain relievers',
    ],
    2: [
      'Add a CISO stakeholder role with stringent SOC2 security criteria',
      'Detail a 4th critical use case focusing on incident rollback',
      'Deepen the backstage processes in the service blueprint',
    ],
    3: [
      'Recalculate Benefit-Cost Ratio (BCR) considering heavy legacy data migration',
      'Add sub-100ms latency budget constraints for WebSocket streaming',
      'Upgrade accessibility standards to full WCAG 2.1 AAA compliance',
    ],
    4: [
      'Add an entry-level Junior Support Specialist user persona',
      'Include 2 more rigorous usability testing scenarios with strict time limits',
      'Evaluate Nielsen Heuristic #5 (Error Prevention) with deeper scrutiny',
    ],
    5: [
      'Set an ambitious SUS target score of 88.0 and adjust questionnaire baselines',
      'Add explicit retention and DAU/MAU formulas to the KPI scorecard',
      'Detail corrective actions if pilot adoption stalls below 60%',
    ],
  };

  const suggestions = defaultSuggestions[storyIndex] || [];

  const handleRefineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!instruction.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/refine-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storyIndex,
          storyName,
          currentStoryData,
          userInstruction: instruction,
          productContext,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to refine story');
      }

      const resJson = await response.json();
      if (!resJson.storyData) {
        throw new Error('No updated story data returned');
      }

      onRefined(resJson.storyData);
      onClose();
    } catch (err: any) {
      console.error('Refine error:', err);
      setErrorMessage(err.message || 'Error occurred while refining story.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-zinc-900 rounded-2xl max-w-lg w-full border border-zinc-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI Story Refinement</span>
            </div>
            <h3 className="text-sm font-bold text-white mt-0.5 font-sans">
              Refine Story 0{storyIndex}: {storyName}
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

        {/* Body */}
        <form onSubmit={handleRefineSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              What would you like to refine or deepen in this story?
            </label>
            <textarea
              required
              rows={4}
              placeholder="e.g. Focus deeper on enterprise security constraints, add more competitors, or expand the usability test tasks..."
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              disabled={isLoading}
              className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-100 placeholder-zinc-500 focus:outline-hidden focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          {/* Quick Suggestions */}
          {suggestions.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-zinc-400 uppercase">Suggested Prompts:</span>
              <div className="space-y-1">
                {suggestions.map((sug, sIdx) => (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => setInstruction(sug)}
                    disabled={isLoading}
                    className="w-full text-left p-2.5 rounded-xl text-xs bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
                  >
                    ↳ {sug}
                  </button>
                ))}
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-rose-950/60 border border-rose-800/80 rounded-xl text-xs text-rose-200">
              {errorMessage}
            </div>
          )}

          <div className="pt-2 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-3.5 py-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !instruction.trim()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white text-xs font-bold transition-all disabled:opacity-50 shadow-md shadow-cyan-950/50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                  <span>Refining Story...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                  <span>Apply AI Refinement</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
