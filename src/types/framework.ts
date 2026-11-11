export interface ProjectContext {
  productName: string;
  industry: string;
  problemStatement: string;
  targetAudience: string;
  strategicObjectives: string;
}

// 1. Market Story
export interface CompetitorItem {
  name: string;
  threatLevel: 'High' | 'Medium' | 'Low';
  uxStrengths: string[];
  designPatterns: string;
  informationArchitectureGaps: string[];
  pricingModel: string;
}

export interface MarketTrendItem {
  trend: string;
  trajectory: 'Gaining Momentum' | 'Declining' | 'Emerging Shift';
  whyItMatters: string;
  strategicImplication: string;
}

export interface ValuePropositionCanvas {
  customerJobs: string[];
  customerPains: string[];
  customerGains: string[];
  productsAndServices: string[];
  painRelievers: string[];
  gainCreators: string[];
}

export interface MarketStoryData {
  guidingQuestions: {
    marketCurrentState: string;
    targetSegmentAndWhy: string;
    valueProposition: string;
    transformationThesis: string;
  };
  marketPositioning: {
    currentMarketState: string;
    targetSegment: string;
    targetingRationale: string;
    valueProposition: string;
    transformationThesis: string;
    marketReadinessScore: number;
    tamSamSom: {
      tam: string;
      sam: string;
      som: string;
    };
  };
  competitiveAnalysis: CompetitorItem[];
  marketTrends: MarketTrendItem[];
  valuePropositionCanvas: ValuePropositionCanvas;
}

// 2. Customer Story
export interface StakeholderRole {
  role: string;
  category: 'Champion' | 'Decision Maker' | 'End User' | 'Blocker / Gatekeeper';
  goals: string;
  keyFriction: string;
  influenceLevel: 'High' | 'Medium' | 'Low';
}

export interface PainPointItem {
  id: string;
  title: string;
  severity: 'Critical' | 'High' | 'Moderate';
  frequency: 'Daily' | 'Weekly' | 'Occasional';
  description: string;
  currentWorkaround: string;
}

export interface BlueprintStage {
  stageName: string;
  customerActions: string[];
  frontstageTouchpoints: string[];
  backstageProcesses: string[];
  supportingSystems: string[];
}

export interface JourneyStageItem {
  stage: 'Trigger' | 'Discovery' | 'Onboarding' | 'Core Workflow' | 'Value Realization';
  customerGoal: string;
  touchpoints: string[];
  emotionalState: 'Frustrated' | 'Skeptical' | 'Neutral' | 'Engaged' | 'Delighted';
  painPoints: string[];
  opportunities: string[];
}

export interface UseCaseItem {
  id: string;
  title: string;
  trigger: string;
  actor: string;
  narrativeFlow: string;
  resolution: string;
  acceptanceCriteria: string[];
}

export interface CustomerStoryData {
  guidingQuestions: {
    targetCustomersAndGoals: string;
    organizationAndStakeholders: string;
    painPointsAndChallenges: string;
    productUseCasesOverview: string;
  };
  customerProfile: {
    segmentTier: string;
    companySize: string;
    businessGoals: string[];
    orgStructureOverview: string;
  };
  stakeholderEcosystem: StakeholderRole[];
  painPoints: PainPointItem[];
  serviceBlueprint: {
    stages: BlueprintStage[];
  };
  customerJourneyMap: JourneyStageItem[];
  useCases: UseCaseItem[];
}

// 3. Technology Story
export interface FeatureRequirementItem {
  id: string;
  feature: string;
  linkedUseCase: string;
  type: 'Frontend UI' | 'Backend Service' | 'AI Model / Logic' | 'Platform Integration';
  priority: 'Must Have' | 'Should Have' | 'Could Have';
  complexity: 'Low' | 'Medium' | 'High';
}

export interface ApiProtocolItem {
  name: string;
  type: string;
  purpose: string;
  latencyBudget: string;
  uxImpact: string;
}

export interface TechLimitationItem {
  constraint: string;
  impactOnUX: string;
  mitigation: string;
}

export interface DependencyItem {
  name: string;
  type: 'External API' | 'Internal Service' | 'Data Pipeline' | 'Hardware/SDK';
  risk: 'Low' | 'Medium' | 'High';
}

export interface TechnologyStoryData {
  guidingQuestions: {
    featureRequirementsSummary: string;
    designSystemStrategy: string;
    stackAndIntegrations: string;
    limitationsAndRestraints: string;
  };
  featureRequirements: FeatureRequirementItem[];
  designSystemSpec: {
    designSystemBase: string;
    typographyAndTokens: string;
    componentLibraryRequirements: string[];
    responsiveBreakpoints: string[];
    motionAndFeedbackGuidelines: string;
  };
  technicalArchitecture: {
    frontendStack: string;
    backendStack: string;
    apisAndProtocols: ApiProtocolItem[];
    aiIntegration: {
      modelOrService: string;
      inferencePattern: string;
      fallbackStrategy: string;
    };
    platformIntegrations: string[];
  };
  feasibilityAssessment: {
    benefitCostRatio: {
      uxBenefitScore: number; // 1-10
      techCostScore: number; // 1-10
      bcrRatio: number;
      verdict: 'High ROI - Build Now' | 'Viable - Proceed with Iteration' | 'Re-evaluate Scope';
    };
    technologicalLimitations: TechLimitationItem[];
    dependencies: DependencyItem[];
  };
  accessibilityAuditPlan: {
    wcagTarget: 'WCAG 2.1 AA' | 'WCAG 2.1 AAA';
    contrastStandards: string;
    keyboardNavigationRules: string[];
    screenReaderAccommodations: string[];
  };
}

// 4. User Story
export interface UserPersonaItem {
  id: string;
  name: string;
  role: string;
  avatarInitials: string;
  dailyTasks: string[];
  primaryGoal: string;
  frustrations: string[];
  techSavviness: 'Novice' | 'Intermediate' | 'Power User';
  quote: string;
}

export interface WorkflowStep {
  stepNumber: number;
  action: string;
  screenState: string;
  systemFeedback: string;
  frictionGuard: string;
}

export interface E2EWorkflowProposal {
  id: string;
  workflowTitle: string;
  targetUserRole: string;
  steps: WorkflowStep[];
  decisionBranches: string[];
}

export interface NielsenHeuristicAuditItem {
  heuristicNumber: number;
  name: string;
  description: string;
  evaluationNotes: string;
  status: 'Pass' | 'Needs Attention' | 'Strong Strength';
  recommendation: string;
}

export interface UsabilityTaskScenario {
  id: string;
  taskPrompt: string;
  expectedPath: string;
  successCriteria: string;
  maxAllowedTimeSeconds: number;
}

export interface UserStoryData {
  guidingQuestions: {
    targetUsersAndDailyTasks: string;
    userPersonasOverview: string;
    e2eUiWorkflowOverview: string;
    validationOfEaseAndSimplicity: string;
  };
  userPersonas: UserPersonaItem[];
  e2eWorkflowProposals: E2EWorkflowProposal[];
  nielsenHeuristicsEvaluation: NielsenHeuristicAuditItem[];
  usabilityTestPlan: {
    testObjectives: string[];
    sampleSizeAndProfile: string;
    taskScenarios: UsabilityTaskScenario[];
    proceduresAndMetrics: string;
  };
  experienceInsightsStrategy: {
    tooling: string;
    dropOffWarningSignals: string[];
    rageClickMonitors: string[];
    qualitativeFeedbackChannels: string[];
  };
}

// 5. Success Story
export interface SusQuestionItem {
  id: number;
  text: string;
  score: number; // 1-5
  isNegative: boolean;
}

export interface KpiKbiItem {
  id: string;
  metric: string;
  category: 'KPI' | 'KBI' | 'UX Metric';
  formula: string;
  targetValue: string;
  measurementCadence: string;
  rationale: string;
}

export interface ContingencyRoadmapItem {
  scenario: string;
  signalIndicator: string;
  correctiveAction: string;
  uxRefinementLeadTime: string;
}

export interface SuccessStoryData {
  guidingQuestions: {
    marketShareAndFinancials: string;
    customerEngagementMetrics: string;
    kpiKbiOverview: string;
    contingencyImprovements: string;
    susTargetsAndMethod: string;
  };
  systemUsabilityScale: {
    targetScore: number;
    ratingCategory: 'Excellent (>80.3)' | 'Good (68 - 80.3)' | 'OK (68)' | 'Poor (51 - 68)' | 'Awful (<51)';
    questions: SusQuestionItem[];
    calculatedScore: number;
    benchmarkComparison: string;
  };
  netPromoterScore: {
    targetNps: number;
    projectedPromoters: number;
    projectedPassives: number;
    projectedDetractors: number;
    advocateGrowthStrategy: string;
  };
  kpiKbiDashboard: KpiKbiItem[];
  financialAndMarketTargets: {
    marketShareTarget: string;
    revenueOrRoiTarget: string;
    customerAcquisitionCostPayback: string;
    lifetimeValueProjection: string;
  };
  contingencyRoadmap: ContingencyRoadmapItem[];
}

// Master Framework Output
export interface FullFrameworkData {
  productContext: ProjectContext;
  marketStory: MarketStoryData;
  customerStory: CustomerStoryData;
  technologyStory: TechnologyStoryData;
  userStory: UserStoryData;
  successStory: SuccessStoryData;
}
