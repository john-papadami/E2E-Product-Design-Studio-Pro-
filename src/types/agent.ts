export interface AgentCapability {
  id: string;
  label: string;
  description: string;
  actionType: 'audit' | 'simulate' | 'expand' | 'remediate' | 'calculate';
  promptTemplate: string;
  iconName: string;
}

export interface StoryAgent {
  id: string;
  name: string;
  title: string;
  role: string;
  storyIndex: 1 | 2 | 3 | 4 | 5;
  storyName: 'Market Story' | 'Customer Story' | 'Technology Story' | 'User Story' | 'Success Story';
  avatarInitials: string;
  themeColor: string;
  badgeColor: string;
  bio: string;
  methodologyFocus: string[];
  capabilities: AgentCapability[];
  sampleQuestions: string[];
}

export interface AgentChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  timestamp: string;
  text: string;
  status?: 'thinking' | 'done' | 'error';
  suggestedUpdates?: any;
  insights?: string[];
  recommendedActions?: string[];
}

export interface CouncilReviewResult {
  overallHealthScore: number;
  executiveSummary: string;
  agentCritiques: {
    agentId: string;
    agentName: string;
    storyName: string;
    score: number;
    verdict: 'Strong' | 'Needs Refinement' | 'Critical Gap';
    keyStrengths: string[];
    criticalGaps: string[];
    immediateActionItem: string;
  }[];
  crossStorySynergies: {
    storyPair: string;
    alignmentStatus: 'Aligned' | 'Tension Detected' | 'Misaligned';
    note: string;
  }[];
}
