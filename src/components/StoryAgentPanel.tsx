import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  Loader2,
  ChevronDown,
  ChevronUp,
  X,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  Zap,
  MessageSquare
} from 'lucide-react';
import { StoryAgent, AgentChatMessage } from '../types/agent';
import { STORY_AGENTS } from '../data/agents';

interface StoryAgentPanelProps {
  storyIndex: 1 | 2 | 3 | 4 | 5;
  currentStoryData: any;
  productContext: any;
  onApplyStoryUpdates?: (updatedData: any) => void;
}

export const StoryAgentPanel: React.FC<StoryAgentPanelProps> = ({
  storyIndex,
  currentStoryData,
  productContext,
  onApplyStoryUpdates,
}) => {
  const agent = STORY_AGENTS[storyIndex];
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [appliedUpdateId, setAppliedUpdateId] = useState<string | null>(null);

  // Initial greeting message from the agent
  const [messages, setMessages] = useState<AgentChatMessage[]>([
    {
      id: 'welcome',
      sender: 'agent',
      timestamp: 'Just now',
      text: `Hello! I am **${agent.name}**, your dedicated **${agent.title}** for ${agent.storyName}. I am primed with John Papadami's E2E Product Design Framework and ready to audit, stress-test, or expand our data points using specialized UX methodologies. What would you like to explore?`,
      insights: [
        `Grounded in ${agent.methodologyFocus[0]}`,
        `Specialized in ${agent.role}`,
      ],
      recommendedActions: [
        'Run an automated capability audit using the quick actions below',
        'Ask me to refine or challenge any specific data point in this story',
      ],
    },
  ]);

  const handleSendMessage = async (textToSend?: string, actionType: string = 'consult') => {
    const promptText = textToSend || inputMessage;
    if (!promptText.trim() || loading) return;

    const userMsg: AgentChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: promptText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/agent-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId: agent.id,
          agentName: agent.name,
          agentTitle: agent.title,
          storyIndex: agent.storyIndex,
          storyName: agent.storyName,
          actionType,
          prompt: promptText,
          currentStoryData,
          productContext,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to reach agent');
      }

      const agentMsg: AgentChatMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: data.result.text || 'Analysis completed.',
        insights: data.result.insights || [],
        recommendedActions: data.result.recommendedActions || [],
        suggestedUpdates: data.result.suggestedStoryUpdates || null,
        status: 'done',
      };

      setMessages((prev) => [...prev, agentMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          sender: 'system',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `⚠️ **Agent Communication Error**: ${err.message || 'Unable to complete request. Please ensure GEMINI_API_KEY is configured.'}`,
          status: 'error',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyUpdates = (msgId: string, updates: any) => {
    if (!updates || !onApplyStoryUpdates) return;
    onApplyStoryUpdates(updates);
    setAppliedUpdateId(msgId);
    setTimeout(() => setAppliedUpdateId(null), 3000);
  };

  return (
    <div className="bg-zinc-900/80 border border-zinc-800/90 rounded-xl shadow-lg backdrop-blur-md overflow-hidden transition-all duration-200">
      {/* Agent Bar Header */}
      <div className="p-4 bg-gradient-to-r from-zinc-900 via-zinc-900/95 to-zinc-950 border-b border-zinc-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${agent.themeColor} text-white flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-white/10 shrink-0`}>
            {agent.avatarInitials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">{agent.name}</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-cyan-500/40 bg-cyan-950/40 text-cyan-300">
                Story 0{agent.storyIndex} Agent
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Co-Pilot
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-tight mt-0.5">
              {agent.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 text-xs font-medium text-zinc-200 transition-colors shadow-sm"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isOpen ? 'Minimize Agent' : `Consult ${agent.name}`}</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-zinc-400" /> : <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />}
          </button>
        </div>
      </div>

      {/* Collapsed Preview Teaser when closed */}
      {!isOpen && (
        <div className="px-4 py-2.5 bg-zinc-950/60 flex flex-wrap items-center justify-between gap-2 text-xs border-t border-zinc-800/60">
          <div className="flex items-center gap-2 text-zinc-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-medium text-zinc-300">Specialized Autonomous Capabilities:</span>
            <div className="hidden sm:flex items-center gap-1.5">
              {agent.capabilities.slice(0, 3).map((cap) => (
                <button
                  key={cap.id}
                  onClick={() => {
                    setIsOpen(true);
                    handleSendMessage(cap.promptTemplate, cap.actionType);
                  }}
                  className="px-2.5 py-0.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-cyan-500/50 hover:text-white transition-colors text-[11px]"
                >
                  {cap.label}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="text-cyan-400 hover:text-cyan-300 font-medium text-xs flex items-center gap-1 transition-colors"
          >
            <span>Open Co-Pilot Console</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Expanded Interactive Agent Console */}
      {isOpen && (
        <div className="p-4 space-y-4 bg-zinc-950/70">
          {/* Agent Bio & Methodologies */}
          <div className="p-3 bg-zinc-900/90 rounded-xl border border-zinc-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="font-semibold text-zinc-200">Agent Persona & Focus:</span>
              <p className="text-zinc-400">{agent.bio}</p>
            </div>
            <div className="shrink-0 flex flex-wrap gap-1">
              {agent.methodologyFocus.map((m, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded-md bg-zinc-950 text-zinc-400 border border-zinc-800 text-[10px]">
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* One-Click Autonomous Capabilities */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 uppercase tracking-wider text-[11px]">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>One-Click Autonomous Agent Actions</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {agent.capabilities.map((cap) => (
                <button
                  key={cap.id}
                  disabled={loading}
                  onClick={() => handleSendMessage(cap.promptTemplate, cap.actionType)}
                  className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800/80 hover:border-cyan-500/50 text-left transition-all disabled:opacity-50 group shadow-sm"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-zinc-200 group-hover:text-cyan-300 transition-colors">
                      {cap.label}
                    </span>
                    <Sparkles className="w-3 h-3 text-cyan-400 opacity-60 group-hover:opacity-100" />
                  </div>
                  <p className="text-[11px] text-zinc-400 line-clamp-2 leading-snug">
                    {cap.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Conversation Stream */}
          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-950/50 to-indigo-950/50 text-zinc-100 border-cyan-800/60 ml-8'
                    : msg.sender === 'system'
                    ? 'bg-amber-950/40 text-amber-200 border-amber-800/60'
                    : 'bg-zinc-900/90 text-zinc-200 border-zinc-800 mr-4 shadow-sm'
                }`}
              >
                {/* Message Header */}
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-zinc-800 text-[10px]">
                  <span className={`font-semibold ${msg.sender === 'user' ? 'text-cyan-300' : 'text-zinc-300'}`}>
                    {msg.sender === 'user' ? 'You' : `${agent.name} (${agent.title})`}
                  </span>
                  <span className="text-zinc-500 font-mono">
                    {msg.timestamp}
                  </span>
                </div>

                {/* Message Body */}
                <div className="space-y-2 max-w-none">
                  <div className="whitespace-pre-wrap text-zinc-300">{msg.text}</div>

                  {/* Key Insights Chips */}
                  {msg.insights && msg.insights.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-zinc-800 space-y-1">
                      <span className="text-[10px] font-mono uppercase font-bold text-zinc-400 block">
                        Synthesized Insights:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.insights.map((ins, iIdx) => (
                          <div
                            key={iIdx}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-300 text-[11px]"
                          >
                            <Lightbulb className="w-3 h-3 text-amber-400 shrink-0" />
                            <span>{ins}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommended Next Actions */}
                  {msg.recommendedActions && msg.recommendedActions.length > 0 && (
                    <div className="mt-2 space-y-1">
                      <span className="text-[10px] font-mono uppercase font-bold text-zinc-400 block">
                        Prescribed Actions:
                      </span>
                      <ul className="space-y-1 pl-1">
                        {msg.recommendedActions.map((act, aIdx) => (
                          <li key={aIdx} className="flex items-center gap-1.5 text-[11px] text-zinc-300">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 1-Click Update Story Data Button */}
                  {msg.suggestedUpdates && onApplyStoryUpdates && (
                    <div className="mt-3 pt-2 border-t border-zinc-800 flex items-center justify-between bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-800/60">
                      <div className="space-y-0.5">
                        <span className="text-xs font-semibold text-emerald-300 block">
                          Concrete Story Updates Available
                        </span>
                        <p className="text-[11px] text-emerald-200/80">
                          {agent.name} has generated ready-to-commit modifications for this story.
                        </p>
                      </div>
                      <button
                        onClick={() => handleApplyUpdates(msg.id, msg.suggestedUpdates)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        {appliedUpdateId === msg.id ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Applied to Story!</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                            <span>Apply to Canvas</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/90 text-xs flex items-center gap-3 animate-pulse">
                <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                <span className="text-zinc-300">
                  {agent.name} is reasoning through UX methodologies & data points...
                </span>
              </div>
            )}
          </div>

          {/* Quick Prompt Questions */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Suggested Prompts:</span>
            {agent.sampleQuestions.map((q, qIdx) => (
              <button
                key={qIdx}
                disabled={loading}
                onClick={() => handleSendMessage(q, 'consult')}
                className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white text-[11px] transition-colors"
              >
                "{q}"
              </button>
            ))}
          </div>

          {/* Prompt Input Form */}
          <div className="flex gap-2 pt-1">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder={`Instruct ${agent.name} (e.g., "Critique our current data points" or "Rewrite this for enterprise buyers")...`}
              disabled={loading}
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-zinc-800 focus:outline-hidden focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 bg-zinc-950 text-zinc-100 placeholder-zinc-500 shadow-sm"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !inputMessage.trim()}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-cyan-950/50"
            >
              {loading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
              <span>Send</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
