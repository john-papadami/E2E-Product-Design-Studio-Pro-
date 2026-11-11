import React from 'react';
import { Compass, Users, Cpu, Smile, Award, Workflow, BookOpen, Bot } from 'lucide-react';

export type StoryTab = 'market' | 'customer' | 'technology' | 'user' | 'success' | 'methodologies' | 'ucd' | 'agents';

interface StoryNavigationProps {
  activeTab: StoryTab;
  onSelectTab: (tab: StoryTab) => void;
}

export const StoryNavigation: React.FC<StoryNavigationProps> = ({ activeTab, onSelectTab }) => {
  const tabs = [
    {
      id: 'market' as StoryTab,
      number: '01',
      label: 'Market Story',
      sublabel: 'Positioning · Trends · Value Prop',
      icon: Compass,
    },
    {
      id: 'customer' as StoryTab,
      number: '02',
      label: 'Customer Story',
      sublabel: 'Stakeholders · Blueprints · Use Cases',
      icon: Users,
    },
    {
      id: 'technology' as StoryTab,
      number: '03',
      label: 'Technology Story',
      sublabel: 'Feasibility BCR · Stack · WCAG',
      icon: Cpu,
    },
    {
      id: 'user' as StoryTab,
      number: '04',
      label: 'User Story',
      sublabel: 'Personas · Workflows · Heuristics',
      icon: Smile,
    },
    {
      id: 'success' as StoryTab,
      number: '05',
      label: 'Success Story',
      sublabel: 'SUS Score · NPS · KPIs · Roadmap',
      icon: Award,
    },
    {
      id: 'agents' as StoryTab,
      number: 'Co-Pilots',
      label: 'AI Agents Council',
      sublabel: '5 Story Specialists & Review Swarm',
      icon: Bot,
    },
    {
      id: 'methodologies' as StoryTab,
      number: 'Toolkit',
      label: 'UX Methodologies',
      sublabel: '17 Framework Methods & Playbooks',
      icon: BookOpen,
    },
    {
      id: 'ucd' as StoryTab,
      number: 'Engine',
      label: 'UCD Engine',
      sublabel: '5-Step Practical Methodology Matrix',
      icon: Workflow,
    },
  ];

  return (
    <nav className="border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-md sticky top-[69px] z-20" aria-label="E2E Framework Stories Navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 sm:space-x-1.5 overflow-x-auto py-2.5 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all shrink-0 border ${
                  isActive
                    ? 'bg-zinc-900/95 text-white border-zinc-700 shadow-lg shadow-black/40 ring-1 ring-cyan-500/40'
                    : 'bg-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50 border-transparent'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isActive
                      ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[11px] font-mono font-semibold ${
                        isActive ? 'text-cyan-400' : 'text-zinc-500'
                      }`}
                    >
                      {tab.number}
                    </span>
                    <span className="text-xs font-semibold tracking-tight">
                      {tab.label}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] truncate max-w-[130px] hidden md:block ${
                      isActive ? 'text-zinc-300' : 'text-zinc-500'
                    }`}
                  >
                    {tab.sublabel}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
