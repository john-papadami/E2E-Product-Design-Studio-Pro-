import React, { useState } from 'react';
import { Sparkles, Download, Layers, BookOpen, PlusCircle, Check, Copy, Bot } from 'lucide-react';
import { FullFrameworkData } from '../types/framework';

interface HeaderProps {
  frameworkData: FullFrameworkData;
  onOpenNewModal: () => void;
  onToggleUcdModal: () => void;
  onToggleMethodologies?: () => void;
  onToggleAgents?: () => void;
  onSelectSample: (type: 'omnidesk' | 'pulsecare' | 'finflow') => void;
}

export const Header: React.FC<HeaderProps> = ({
  frameworkData,
  onOpenNewModal,
  onToggleUcdModal,
  onToggleMethodologies,
  onToggleAgents,
  onSelectSample,
}) => {
  const [copied, setCopied] = useState(false);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);

  const handleCopyMarkdown = () => {
    const md = generateMarkdown(frameworkData);
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const jsonStr = JSON.stringify(frameworkData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${frameworkData.productContext.productName.toLowerCase().replace(/\s+/g, '-')}-e2e-framework.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExportMenuOpen(false);
  };

  const handleDownloadMarkdown = () => {
    const md = generateMarkdown(frameworkData);
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${frameworkData.productContext.productName.toLowerCase().replace(/\s+/g, '-')}-e2e-specification.md`;
    a.click();
    URL.revokeObjectURL(url);
    setExportMenuOpen(false);
  };

  const handlePrint = () => {
    window.print();
    setExportMenuOpen(false);
  };

  return (
    <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Brand & Framework Title */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-indigo-500/20 to-purple-500/20 border border-cyan-500/40 text-cyan-300 flex items-center justify-center font-bold tracking-tight shrink-0 shadow-lg shadow-cyan-950/40">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-tight text-white font-sans">
                  E2E Product Design Studio
                </h1>
                <span className="text-zinc-600 font-normal">/</span>
                <span className="text-xs font-mono text-cyan-300 font-medium bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/60">
                  {frameworkData.productContext.productName}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                <span className="text-zinc-300">John Papadami Framework</span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span>5 Core Stories</span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span className="text-cyan-400">Autonomous Agents & UCD Engine</span>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Quick Sample Selector */}
            <div className="flex items-center text-xs text-zinc-300 bg-zinc-900/90 rounded-lg p-0.5 border border-zinc-800">
              <span className="px-2 py-1 text-zinc-500 font-medium hidden sm:inline">Presets:</span>
              <button
                onClick={() => onSelectSample('omnidesk')}
                className="px-2.5 py-1 rounded text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                title="Enterprise Support & Incident AI"
              >
                OmniDesk
              </button>
              <button
                onClick={() => onSelectSample('pulsecare')}
                className="px-2.5 py-1 rounded text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                title="Remote Chronic Care HealthTech"
              >
                PulseCare
              </button>
              <button
                onClick={() => onSelectSample('finflow')}
                className="px-2.5 py-1 rounded text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                title="Autonomous Wealth & Portfolio AI"
              >
                FinFlow
              </button>
            </div>

            {/* AI Agents Council Button */}
            {onToggleAgents && (
              <button
                onClick={onToggleAgents}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 text-cyan-300 bg-cyan-950/30 hover:bg-cyan-950/60 hover:border-cyan-400 text-xs font-medium transition-colors shadow-sm"
                title="Convene the 5-Agent Council Review & Cross-Story Swarm"
              >
                <Bot className="w-3.5 h-3.5 text-cyan-400" />
                <span>AI Agents</span>
              </button>
            )}

            {/* UX Methodologies Matrix Button */}
            {onToggleMethodologies && (
              <button
                onClick={onToggleMethodologies}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/30 text-emerald-300 bg-emerald-950/30 hover:bg-emerald-950/60 hover:border-emerald-400 text-xs font-medium transition-colors shadow-sm"
                title="View all 17 embedded UX methodologies across the 5 stories"
              >
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>UX Playbook</span>
              </button>
            )}

            {/* Framework Engine Explainer Button */}
            <button
              onClick={onToggleUcdModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700 text-zinc-300 bg-zinc-900/90 hover:bg-zinc-800 hover:text-white text-xs font-medium transition-colors shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
              <span>UCD Engine</span>
            </button>

            {/* Export Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setExportMenuOpen(!exportMenuOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700 text-zinc-300 bg-zinc-900/90 hover:bg-zinc-800 hover:text-white text-xs font-medium transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-zinc-400" />
                <span>Export</span>
              </button>
              {exportMenuOpen && (
                <div className="absolute right-0 mt-1.5 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl py-1 z-40 text-xs backdrop-blur-md divide-y divide-zinc-800">
                  <div className="py-1">
                    <button
                      onClick={handleCopyMarkdown}
                      className="w-full text-left px-3 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white flex items-center justify-between"
                    >
                      <span>{copied ? 'Copied to Clipboard!' : 'Copy as Markdown'}</span>
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                    </button>
                    <button
                      onClick={handleDownloadMarkdown}
                      className="w-full text-left px-3 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    >
                      Download Markdown (.md)
                    </button>
                    <button
                      onClick={handleDownloadJson}
                      className="w-full text-left px-3 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    >
                      Download JSON Data (.json)
                    </button>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={handlePrint}
                      className="w-full text-left px-3 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    >
                      Print / Save as PDF
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Generate New Analysis */}
            <button
              onClick={onOpenNewModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white text-xs font-semibold transition-all shadow-md shadow-cyan-950/50 hover:shadow-cyan-900/60"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              <span>Generate AI Framework</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

function generateMarkdown(data: FullFrameworkData): string {
  const p = data.productContext;
  return `# E2E Product Design Specification: ${p.productName}
**Framework**: John Papadami E2E Product Design Framework
**Industry**: ${p.industry}
**Core Problem**: ${p.problemStatement}
**Target Audience**: ${p.targetAudience}
**Strategic Objectives**: ${p.strategicObjectives}

---

## 01. Market Story
**Assigned AI Agent**: Vance Thorne (Principal Market Strategist & Competitive Intel Agent)
- **Current Market State**: ${data.marketStory.marketPositioning.currentMarketState}
- **Target Segment**: ${data.marketStory.marketPositioning.targetSegment}
- **Targeting Rationale**: ${data.marketStory.marketPositioning.targetingRationale}
- **Value Proposition**: ${data.marketStory.marketPositioning.valueProposition}
- **Transformation Thesis**: ${data.marketStory.marketPositioning.transformationThesis}
- **Market Sizing**: TAM: ${data.marketStory.marketPositioning.tamSamSom.tam} | SAM: ${data.marketStory.marketPositioning.tamSamSom.sam} | SOM: ${data.marketStory.marketPositioning.tamSamSom.som}

### Competitive Analysis
${data.marketStory.competitiveAnalysis.map(c => `### ${c.name} (Threat: ${c.threatLevel})
- **UX Strengths**: ${c.uxStrengths.join(', ')}
- **Design Patterns**: ${c.designPatterns}
- **IA Gaps**: ${c.informationArchitectureGaps.join(', ')}
- **Pricing**: ${c.pricingModel}
`).join('\n')}

---

## 02. Customer Story
**Assigned AI Agent**: Dr. Elena Rostova (Staff Service Designer & Ethnographer Agent)
- **Customer Segment**: ${data.customerStory.customerProfile.segmentTier} (${data.customerStory.customerProfile.companySize})
- **Business Goals**: ${data.customerStory.customerProfile.businessGoals.join('; ')}

### Stakeholders
${data.customerStory.stakeholderEcosystem.map(s => `- **${s.role}** (${s.category}, Influence: ${s.influenceLevel}): ${s.goals}. Friction: ${s.keyFriction}`).join('\n')}

### Core Pain Points
${data.customerStory.painPoints.map(pp => `- **${pp.title}** [Severity: ${pp.severity}, Frequency: ${pp.frequency}]: ${pp.description} (Workaround: ${pp.currentWorkaround})`).join('\n')}

---

## 03. Technology Story
**Assigned AI Agent**: Marcus Chen (Principal Systems Architect & Feasibility Agent)
- **Design System**: ${data.technologyStory.designSystemSpec.designSystemBase}
- **Benefit-Cost Ratio (BCR)**: ${data.technologyStory.feasibilityAssessment.benefitCostRatio.bcrRatio} (Verdict: ${data.technologyStory.feasibilityAssessment.benefitCostRatio.verdict})
- **WCAG Target**: ${data.technologyStory.accessibilityAuditPlan.wcagTarget}

### Tech Architecture
- **Frontend**: ${data.technologyStory.technicalArchitecture.frontendStack}
- **Backend**: ${data.technologyStory.technicalArchitecture.backendStack}
- **AI Integration**: ${data.technologyStory.technicalArchitecture.aiIntegration.modelOrService}

---

## 04. User Story
**Assigned AI Agent**: Aria Morales (Staff UX Researcher & Interaction Architect Agent)
### User Personas
${data.userStory.userPersonas.map(u => `### ${u.name} - ${u.role} (${u.techSavviness})
- **Primary Goal**: ${u.primaryGoal}
- **Daily Tasks**: ${u.dailyTasks.join(', ')}
- **Frustrations**: ${u.frustrations.join(', ')}
- **Quote**: "${u.quote}"
`).join('\n')}

### Jakob Nielsen's 10 Heuristics Evaluation
${data.userStory.nielsenHeuristicsEvaluation.map(h => `- **${h.heuristicNumber}. ${h.name}** [Status: ${h.status}]: ${h.evaluationNotes} -> Recommendation: ${h.recommendation}`).join('\n')}

---

## 05. Success Story
**Assigned AI Agent**: David Sterling (Principal Product Analytics & Usability Scientist Agent)
- **System Usability Scale (SUS) Score**: ${data.successStory.systemUsabilityScale.calculatedScore} / 100 (${data.successStory.systemUsabilityScale.ratingCategory})
- **Net Promoter Score (NPS) Target**: +${data.successStory.netPromoterScore.targetNps}
- **Key Financial Target**: ${data.successStory.financialAndMarketTargets.revenueOrRoiTarget}

### Key Performance Indicators (KPIs & KBIs)
${data.successStory.kpiKbiDashboard.map(k => `- **${k.metric}** (${k.category}): Target: ${k.targetValue} (Formula: ${k.formula}) - ${k.rationale}`).join('\n')}
`;
}
