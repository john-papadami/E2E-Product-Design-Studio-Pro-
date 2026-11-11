import React from 'react';
import { X, BookOpen, Layers, CheckCircle2, TrendingUp, Sparkles, FileText } from 'lucide-react';
import { UxMethodology } from '../data/methodologies';

interface UxMethodologyDetailModalProps {
  methodology: UxMethodology | null;
  onClose: () => void;
}

export const UxMethodologyDetailModal: React.FC<UxMethodologyDetailModalProps> = ({
  methodology,
  onClose,
}) => {
  if (!methodology) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-zinc-900 rounded-2xl max-w-xl w-full border border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-xs shadow-emerald-400" />
              <span>UX Methodology Playbook · {methodology.storyName}</span>
            </div>
            <h3 className="text-base font-bold text-white mt-0.5 font-sans">
              {methodology.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs text-zinc-300">
          {/* Definition */}
          <div className="p-3.5 bg-zinc-950/70 rounded-xl border border-zinc-800 space-y-1">
            <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">
              Official Papadami Framework Definition
            </span>
            <p className="text-zinc-200 text-xs leading-relaxed font-medium">
              {methodology.definition}
            </p>
          </div>

          {/* Papadami's Personal Note */}
          <div className="border-l-2 border-cyan-500 pl-3 py-1 space-y-1 bg-cyan-950/20 rounded-r-xl">
            <span className="text-[10px] font-mono text-cyan-400/80 uppercase font-semibold">
              Methodology Context & Architecture Note
            </span>
            <p className="text-zinc-300 italic leading-relaxed">
              "{methodology.papadamiNote}"
            </p>
          </div>

          {/* How to Execute in Practice */}
          <div className="space-y-2">
            <span className="font-semibold text-white uppercase tracking-wider text-[11px] block">
              Step-by-Step Execution Protocol
            </span>
            <div className="space-y-1.5">
              {methodology.howToExecute.map((step, sIdx) => (
                <div key={sIdx} className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-950/80 flex items-start gap-2.5">
                  <span className="text-cyan-400 font-mono font-bold text-xs mt-0.5">0{sIdx + 1}.</span>
                  <span className="text-zinc-300 leading-snug">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Deliverables & Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">
                Produced Artifacts
              </span>
              <ul className="space-y-1 mt-1">
                {methodology.keyArtifacts.map((art, aIdx) => (
                  <li key={aIdx} className="text-zinc-300 flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{art}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">
                Quantified Metrics
              </span>
              <ul className="space-y-1 mt-1">
                {methodology.metricsProduced.map((met, mIdx) => (
                  <li key={mIdx} className="text-zinc-300 flex items-center gap-1.5 text-[11px]">
                    <TrendingUp className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>{met}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Concrete Real-World Finding */}
          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/60 text-emerald-200 space-y-0.5">
            <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">
              Concrete Output Example
            </span>
            <p className="text-[11px] leading-snug">
              {methodology.exampleOutput}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-zinc-800 flex items-center justify-end bg-zinc-950/80">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 text-xs font-semibold transition-colors border border-zinc-700"
          >
            Close Playbook
          </button>
        </div>
      </div>
    </div>
  );
};
