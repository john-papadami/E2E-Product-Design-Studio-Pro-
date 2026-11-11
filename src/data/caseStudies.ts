import { FullFrameworkData } from '../types/framework';

export const standardBrookeQuestions = [
  { id: 1, text: 'I think that I would like to use this system frequently.', score: 4, isNegative: false },
  { id: 2, text: 'I found the system unnecessarily complex.', score: 2, isNegative: true },
  { id: 3, text: 'I thought the system was easy to use.', score: 5, isNegative: false },
  { id: 4, text: 'I think that I would need the support of a technical person to be able to use this system.', score: 1, isNegative: true },
  { id: 5, text: 'I found the various functions in this system were well integrated.', score: 4, isNegative: false },
  { id: 6, text: 'I thought there was too much inconsistency in this system.', score: 1, isNegative: true },
  { id: 7, text: 'I would imagine that most people would learn to use this system very quickly.', score: 4, isNegative: false },
  { id: 8, text: 'I found the system very cumbersome to use.', score: 1, isNegative: true },
  { id: 9, text: 'I felt very confident using the system.', score: 5, isNegative: false },
  { id: 10, text: 'I needed to learn a lot of things before I could get going with this system.', score: 2, isNegative: true },
];

export function calculateSusScore(questions: { id: number; score: number; isNegative: boolean }[]): {
  score: number;
  grade: 'Excellent (>80.3)' | 'Good (68 - 80.3)' | 'OK (68)' | 'Poor (51 - 68)' | 'Awful (<51)';
} {
  let oddSum = 0; // positive items: score - 1
  let evenSum = 0; // negative items: 5 - score

  questions.forEach((q) => {
    if (q.isNegative) {
      evenSum += (5 - q.score);
    } else {
      oddSum += (q.score - 1);
    }
  });

  const rawScore = (oddSum + evenSum) * 2.5;
  const score = Math.round(rawScore * 10) / 10;

  let grade: 'Excellent (>80.3)' | 'Good (68 - 80.3)' | 'OK (68)' | 'Poor (51 - 68)' | 'Awful (<51)' = 'Good (68 - 80.3)';
  if (score > 80.3) grade = 'Excellent (>80.3)';
  else if (score >= 68.1) grade = 'Good (68 - 80.3)';
  else if (score === 68) grade = 'OK (68)';
  else if (score >= 51) grade = 'Poor (51 - 68)';
  else grade = 'Awful (<51)';

  return { score, grade };
}

export const initialCaseStudy: FullFrameworkData = {
  productContext: {
    productName: 'OmniDesk AI',
    industry: 'Enterprise SaaS & Support Operations',
    problemStatement: 'Enterprise support engineers spend 42% of their shift toggling between 7 fragmented legacy consoles to diagnose multi-tier incidents, resulting in sluggish resolution times (MTTR > 4.8 hrs) and severe cognitive fatigue.',
    targetAudience: 'Tier 2/3 Enterprise Support Engineers, Incident Commanders, and VP of Customer Experience',
    strategicObjectives: 'Unify triaging into an autonomous contextual workspace, slashing MTTR by 60% while maintaining an SUS rating above 82.',
  },
  marketStory: {
    guidingQuestions: {
      marketCurrentState: 'The enterprise customer service landscape is dominated by siloed ticketing portals and retrofitted chatbot wrappers that lack deep cross-stack context.',
      targetSegmentAndWhy: 'Mid-to-Large B2B SaaS companies (500–5,000 employees) handling complex technical support tiers where SLA breaches carry heavy contractual penalties.',
      valueProposition: 'An AI-native collaborative support workspace that aggregates telemetry, suggests verified remediation steps in-line, and automates 75% of diagnostic busywork.',
      transformationThesis: 'Transforms high-stress escalations from manual archeology into guided, verified 1-click incident resolutions.',
    },
    marketPositioning: {
      currentMarketState: 'Fragmented legacy helpdesks (Zendesk, ServiceNow) paired with disjointed observability tools (Datadog, Jira).',
      targetSegment: 'B2B Enterprise SaaS & Cloud Infrastructure Platforms',
      targetingRationale: 'High willingness to pay, severe burnout among support engineers, and quantifiable ROI tied to contractual SLA penalties.',
      valueProposition: 'Context-aware autonomous resolution workspace with integrated human-in-the-loop oversight.',
      transformationThesis: 'Reduces cognitive load by 50% and slashes Tier-2 escalation cycle time from hours to minutes.',
      marketReadinessScore: 88,
      tamSamSom: {
        tam: '$18.4B Global Customer Service Software Market',
        sam: '$4.2B Complex Technical Support Tier Solutions',
        som: '$620M Mid-market Cloud SaaS Support Teams',
      },
    },
    competitiveAnalysis: [
      {
        name: 'Zendesk Enterprise',
        threatLevel: 'High',
        uxStrengths: ['Familiar ticket queues', 'Broad third-party app marketplace', 'Mature reporting dashboards'],
        designPatterns: 'Tabbed document interface with dense table views and classical email-thread metaphor.',
        informationArchitectureGaps: ['Deep technical telemetry is hidden behind nested iframes', 'No contextual AI co-pilot beside ticket history', 'Cluttered sidebar navigation causing visual noise'],
        pricingModel: '$115 / agent / month',
      },
      {
        name: 'ServiceNow ITSM',
        threatLevel: 'Medium',
        uxStrengths: ['Enterprise governance', 'Rigid ITIL workflow compliance', 'Audit trail permanence'],
        designPatterns: 'Form-heavy enterprise portal with multi-step approval gates.',
        informationArchitectureGaps: ['Overwhelming form fatigue with 30+ mandatory fields', 'Poor mobile and keyboard-first accessibility', 'Steep learning curve requiring 3-week onboarding'],
        pricingModel: 'Custom enterprise contracts ($150k+ minimum)',
      },
      {
        name: 'Decagon / Sierra AI',
        threatLevel: 'Medium',
        uxStrengths: ['Conversational AI focus', 'Autonomous bot deflection for Tier 1 tickets'],
        designPatterns: 'Chat-centric interface designed for end-users rather than internal engineers.',
        informationArchitectureGaps: ['Lacks deep debugger integration for human engineers when bots fail', 'Opaque black-box suggestions without explainable evidence traces'],
        pricingModel: 'Consumption / per-resolution model ($2-$4/resolved session)',
      },
    ],
    marketTrends: [
      {
        trend: 'Agentic Workflow Automation',
        trajectory: 'Gaining Momentum',
        whyItMatters: 'Teams demand autonomous agents that can execute safe multi-step actions, not just draft chat replies.',
        strategicImplication: 'OmniDesk must provide safe dry-run previews and reversible human verification controls.',
      },
      {
        trend: 'Monolithic Form Desks',
        trajectory: 'Declining',
        whyItMatters: 'Engineers refuse to fill out 20 manual dropdowns per ticket; friction leads to dirty operational data.',
        strategicImplication: 'Automate ticket tagging and classification via real-time inference on customer logs.',
      },
      {
        trend: 'Keyboard-First Command Palettes (CMD+K)',
        trajectory: 'Gaining Momentum',
        whyItMatters: 'Power users expect Superhuman/Linear style speed without touching a mouse.',
        strategicImplication: 'Design universal keyboard shortcuts for every triage action and macro dispatch.',
      },
    ],
    valuePropositionCanvas: {
      customerJobs: [
        'Diagnose complex customer bugs rapidly under active SLA countdowns',
        'Communicate transparent status updates to enterprise clients',
        'Cross-reference server logs, git commits, and past resolved cases',
      ],
      customerPains: [
        'Context switching across 7 browser tabs to piece together an incident timeline',
        'Fear of running incorrect database scripts or unauthorized production fixes',
        'Customer frustration when repeated explanations are required across handoffs',
      ],
      customerGains: [
        'Instant root cause hypothesis backed by clickable source log citations',
        'One-click verified patch execution with full rollback guarantee',
        'Automated executive post-mortem summaries generated in 30 seconds',
      ],
      productsAndServices: [
        'OmniDesk AI Context Hub',
        'Live Telemetry Triage Inspector',
        'Safe Action Execution Sandbox',
      ],
      painRelievers: [
        'Single pane of glass unifying tickets, logs, and customer health metrics',
        'Guardrailed execution engine with dry-run diffs before database actions',
        'Zero manual handoff notes through automatic session synthesis',
      ],
      gainCreators: [
        '65% reduction in Mean Time to Detect (MTTD) and Resolve (MTTR)',
        'Zero SLA breach penalties for Tier-1 enterprise accounts',
        'Support engineers feel like strategic problem solvers rather than clerical typists',
      ],
    },
  },
  customerStory: {
    guidingQuestions: {
      targetCustomersAndGoals: 'Series B to Enterprise B2B tech organizations with dedicated customer engineering teams aiming to cut support overhead while raising customer retention.',
      organizationAndStakeholders: 'Clear divide between Executive buyers (VP Support, CIO looking for cost efficiency) and Frontline users (Tier 2/3 engineers wanting speed and low friction).',
      painPointsAndChallenges: 'Fragmented tooling, tribal knowledge silos, slow customer escalation loops, and constant context-switching.',
      productUseCasesOverview: 'Real-time incident ingestion, AI-guided root cause hypothesis generation, and safe remediation execution.',
    },
    customerProfile: {
      segmentTier: 'Enterprise B2B Cloud & SaaS',
      companySize: '250 to 5,000 Employees',
      businessGoals: [
        'Reduce Mean Time to Resolution (MTTR) from 4.8 hours to under 90 minutes',
        'Decrease Tier 2 agent attrition rate from 34% to under 12% annually',
        'Achieve 99.5% SLA adherence across Tier 1 priority contracts',
      ],
      orgStructureOverview: 'Hierarchical customer support reporting into VP of Customer Experience, closely integrated with Site Reliability Engineering (SRE) and Product Management.',
    },
    stakeholderEcosystem: [
      {
        role: 'VP of Customer Experience / Support',
        category: 'Decision Maker',
        goals: 'Reduce operating expenses, prevent high-value churn, and report clean executive operational KPIs.',
        keyFriction: 'Skeptical of AI hallucinations causing embarrassing customer communication.',
        influenceLevel: 'High',
      },
      {
        role: 'Tier 2 / Technical Support Lead',
        category: 'Champion',
        goals: 'Streamline team shift rotations, eliminate repetitive query escalations, and unblock junior engineers.',
        keyFriction: 'Tired of new software rollouts that add more documentation overhead than actual value.',
        influenceLevel: 'High',
      },
      {
        role: 'Tier 1 Support Specialist',
        category: 'End User',
        goals: 'Quickly find correct troubleshooting answers without having to bug senior developers.',
        keyFriction: 'Overwhelmed by deep technical logs and unclear error codes.',
        influenceLevel: 'Medium',
      },
      {
        role: 'Chief Information Security Officer (CISO)',
        category: 'Blocker / Gatekeeper',
        goals: 'Ensure zero PII/PHI leakage to third-party LLMs and full audit trail compliance (SOC2 Type II, GDPR).',
        keyFriction: 'Blocks any solution lacking enterprise data isolation and granular role-based access control.',
        influenceLevel: 'High',
      },
    ],
    painPoints: [
      {
        id: 'pp-1',
        title: '7-Tab Cognitive Swapping Nightmare',
        severity: 'Critical',
        frequency: 'Daily',
        description: 'Engineers constantly flip between Zendesk, Grafana, Datadog, GitHub, AWS Console, and internal admin tools to trace a single transaction.',
        currentWorkaround: 'Dozens of browser bookmarks, copy-pasting JSON snippets into Slack, and manual scratchpad notes.',
      },
      {
        id: 'pp-2',
        title: 'Tribal Knowledge & Unindexed Resolutions',
        severity: 'High',
        frequency: 'Daily',
        description: 'Past solutions exist only in private DM threads or in the heads of senior architects who leave the company.',
        currentWorkaround: 'Searching messy Slack channels or waiting hours for a senior developer to wake up in another timezone.',
      },
      {
        id: 'pp-3',
        title: 'Anxiety Over Production Action Rollouts',
        severity: 'High',
        frequency: 'Weekly',
        description: 'Resetting a customer auth token or rerunning a billing webhook carries risk of unintended cascading errors.',
        currentWorkaround: 'Dual-engineer peer review calls on Zoom before triggering critical admin buttons.',
      },
    ],
    serviceBlueprint: {
      stages: [
        {
          stageName: '1. Incident Trigger',
          customerActions: ['Customer submits urgent ticket via portal with error screenshot'],
          frontstageTouchpoints: ['OmniDesk Webhook Ingestion API', 'Real-time alert banner in engineer workspace'],
          backstageProcesses: ['Parse stack traces', 'Query tenant log stream', 'Fetch account entitlement tier'],
          supportingSystems: ['Kafka Event Bus', 'Customer Metadata Vault', 'SOC2 Redaction Gateway'],
        },
        {
          stageName: '2. Autonomous Triage',
          customerActions: ['Customer receives immediate acknowledgment with estimated resolution SLA'],
          frontstageTouchpoints: ['Contextual Insight Drawer opens beside ticket view', 'AI Root Cause Hypothesis Card'],
          backstageProcesses: ['Semantic search on past resolved incidents', 'Correlate recent git releases with error timestamps'],
          supportingSystems: ['Vector Database (Pinecone)', 'GitHub Commit Webhook sync', 'LLM Diagnostic Engine'],
        },
        {
          stageName: '3. Human-Verified Remediation',
          customerActions: ['Customer observes progress indicator on customer portal status banner'],
          frontstageTouchpoints: ['Dry-run script preview modal', 'One-click "Execute Verified Fix" with rollback toggle'],
          backstageProcesses: ['Run sandboxed script in customer tenant container', 'Verify HTTP 200 health response'],
          supportingSystems: ['Kubernetes Job Runner', 'Audit Log Ledger', 'Rollback Snapshot Service'],
        },
        {
          stageName: '4. Resolution & Knowledge Capture',
          customerActions: ['Customer verifies fix, rates session, and receives post-incident brief'],
          frontstageTouchpoints: ['Automated polished resolution email draft', '1-Click "Add to Runbook" card'],
          backstageProcesses: ['Update knowledge base embeddings', 'Recalculate team MTTR metrics'],
          supportingSystems: ['Knowledge Base CMS', 'Executive Analytics Data Warehouse'],
        },
      ],
    },
    customerJourneyMap: [
      {
        stage: 'Trigger',
        customerGoal: 'Get immediate confirmation that their critical outage is being investigated.',
        touchpoints: ['Support Widget', 'Email Confirmation', 'Slack Connect Channel'],
        emotionalState: 'Frustrated',
        painPoints: ['Generic automated boilerplate replies', 'No visibility into whether a human is reading'],
        opportunities: ['Provide instant intelligent initial diagnostic assessment on ticket submission'],
      },
      {
        stage: 'Discovery',
        customerGoal: 'Understand why the error occurred and who is working on it.',
        touchpoints: ['Status Portal', 'Engineer Assignment Alert'],
        emotionalState: 'Skeptical',
        painPoints: ['Radio silence during deep log investigations'],
        opportunities: ['Live milestone progress tracker showing diagnostic steps in real time'],
      },
      {
        stage: 'Onboarding',
        customerGoal: 'Provide logs and permissions without security friction.',
        touchpoints: ['Secure File Drop', 'Temporary Access Grant'],
        emotionalState: 'Neutral',
        painPoints: ['Complex token generation procedures'],
        opportunities: ['Ephemeral time-bound access delegation via SSO'],
      },
      {
        stage: 'Core Workflow',
        customerGoal: 'Review proposed resolution and test in staging.',
        touchpoints: ['Engineer Interactive Diff Preview', 'Staging Test Verification'],
        emotionalState: 'Engaged',
        painPoints: ['Unexpected side effects breaking other integrations'],
        opportunities: ['Simulated sandbox verification before touching production data'],
      },
      {
        stage: 'Value Realization',
        customerGoal: 'Resume normal business operations with full root-cause report.',
        touchpoints: ['Executive Summary PDF', 'Root Cause Post-Mortem', 'CSAT Survey'],
        emotionalState: 'Delighted',
        painPoints: ['Having to write manual incident summaries for their own executives'],
        opportunities: ['Auto-generate executive-ready Root Cause Analysis (RCA) report with 1 click'],
      },
    ],
    useCases: [
      {
        id: 'uc-1',
        title: 'Autonomous Root Cause Hypothesis for API Timeout Outage',
        trigger: 'Enterprise client triggers 50 consecutive HTTP 504 gateway errors within 3 minutes.',
        actor: 'Tier 2 Support Engineer',
        narrativeFlow: 'OmniDesk ingests the error burst, redacts sensitive customer tokens, compares the payload against known bug patterns, and presents the engineer with a 3-point diagnostic hypothesis highlighting a misconfigured rate limit policy.',
        resolution: 'Engineer clicks "Inspect Rate Limit Policy", verifies discrepancy in 12 seconds, and applies correction.',
        acceptanceCriteria: [
          'Hypothesis rendered in under 4 seconds from ticket assignment',
          'Confidence score displayed alongside log evidence snippets',
          'All PII redacted before rendering on client UI',
        ],
      },
      {
        id: 'uc-2',
        title: 'One-Click Safe Script Execution with Dry-Run Diff',
        trigger: 'Customer stuck in inconsistent subscription state due to stripe webhook failure.',
        actor: 'Support Operations Engineer',
        narrativeFlow: 'OmniDesk synthesizes the missing event, displays a visual JSON diff of the proposed database mutation, and prompts the engineer for biometric or 2FA confirmation.',
        resolution: 'Script executes in isolated container, verifies state consistency, and posts success confirmation to audit log.',
        acceptanceCriteria: [
          'Visual diff highlighting additions in emerald and removals in rose',
          'Mandatory dry-run simulation output displayed prior to execute action',
          'Automatic rollback snapshot created before write operation',
        ],
      },
      {
        id: 'uc-3',
        title: 'Instant Post-Mortem Synthesis & Knowledge Graph Ingestion',
        trigger: 'Ticket is marked as resolved by engineer.',
        actor: 'Incident Commander',
        narrativeFlow: 'OmniDesk synthesizes all Slack discussions, telemetry logs, and engineer comments into a structured 1-page incident brief and updates the internal vector embeddings.',
        resolution: 'Future matching incidents can be resolved in under 60 seconds with 95% accuracy.',
        acceptanceCriteria: [
          'Summary generated in under 10 seconds',
          'Includes timeline, root cause, action items, and affected customer impact',
          'Engineer can edit inline before publishing to team knowledge base',
        ],
      },
    ],
  },
  technologyStory: {
    guidingQuestions: {
      featureRequirementsSummary: 'High-speed reactive workspace with sub-100ms keyboard navigation, streaming AI telemetry, and zero-trust security architecture.',
      designSystemStrategy: 'Built on Tailwind CSS design tokens with a strict accessibility-first component library, high-contrast dark/light modes, and minimal aesthetic noise.',
      stackAndIntegrations: 'React 19 SPA, TypeScript, Express backend, Gemini 3.8 Flash inference engine, WebSocket event streaming, and OAuth 2.0 / SAML enterprise SSO.',
      limitationsAndRestraints: 'Strict 200ms latency budget for search queries, zero PII retention, and offline queue fallback for field engineers.',
    },
    featureRequirements: [
      {
        id: 'fr-1',
        feature: 'Universal CMD+K Command & Telemetry Palette',
        linkedUseCase: 'uc-1',
        type: 'Frontend UI',
        priority: 'Must Have',
        complexity: 'Medium',
      },
      {
        id: 'fr-2',
        feature: 'Streaming Diagnostic Co-Pilot Engine',
        linkedUseCase: 'uc-1',
        type: 'AI Model / Logic',
        priority: 'Must Have',
        complexity: 'High',
      },
      {
        id: 'fr-3',
        feature: 'Sandboxed Dry-Run Execution Microservice',
        linkedUseCase: 'uc-2',
        type: 'Backend Service',
        priority: 'Must Have',
        complexity: 'High',
      },
      {
        id: 'fr-4',
        feature: 'Bidirectional Zendesk & Jira Cloud Sync Adapter',
        linkedUseCase: 'uc-3',
        type: 'Platform Integration',
        priority: 'Should Have',
        complexity: 'Medium',
      },
    ],
    designSystemSpec: {
      designSystemBase: 'Custom Tailwind Token Architecture with Radix-inspired headless accessibility primitives',
      typographyAndTokens: 'Inter / JetBrains Mono pairing. 14px body baseline, 1.5 line height, 4px spatial baseline grid.',
      componentLibraryRequirements: [
        'Accessible Data Grid with keyboard navigation (Arrows, Tab, Space, Enter)',
        'Diff Viewer with side-by-side and unified syntax-highlighted modes',
        'Command Palette with fuzzy search and recent item caching',
        'Streaming Markdown renderer with inline citation popovers',
      ],
      responsiveBreakpoints: ['Sm (640px)', 'Md (768px)', 'Lg (1024px)', 'Xl (1280px)', '2Xl (1536px)'],
      motionAndFeedbackGuidelines: 'Motion-reduced preference respected. Micro-interactions capped at 180ms ease-out.',
    },
    technicalArchitecture: {
      frontendStack: 'React 19, TypeScript, Tailwind CSS, Lucide Icons, Vite',
      backendStack: 'Node.js, Express, tsx, Redis cache, PostgreSQL metadata store',
      apisAndProtocols: [
        {
          name: 'Telemetry Ingest Pipeline',
          type: 'gRPC / HTTP2 Stream',
          purpose: 'Stream real-time tenant logs without browser UI lag',
          latencyBudget: '< 45ms',
          uxImpact: 'Keeps live incident views synced without manual refresh buttons',
        },
        {
          name: 'Gemini 3.8 Flash Diagnostic Stream',
          type: 'Server-Sent Events (SSE)',
          purpose: 'Stream AI hypotheses and code fixes progressively',
          latencyBudget: '< 300ms first token',
          uxImpact: 'Eliminates perceived wait times; user reads thoughts immediately',
        },
        {
          name: 'Zendesk REST / Webhook Sync',
          type: 'REST + Webhook',
          purpose: 'Two-way sync of ticket metadata, tags, and status transitions',
          latencyBudget: '< 800ms',
          uxImpact: 'Prevents discrepancies between legacy helpdesk and OmniDesk',
        },
      ],
      aiIntegration: {
        modelOrService: 'Gemini 3.8 Flash with structured JSON and streaming modes',
        inferencePattern: 'Server-side orchestration with prompt grounding in tenant runbooks and log traces',
        fallbackStrategy: 'Deterministic rule-based heuristics if model latency exceeds 4.5 seconds',
      },
      platformIntegrations: ['Zendesk', 'Jira Cloud', 'Datadog', 'GitHub Enterprise', 'Slack Enterprise Grid'],
    },
    feasibilityAssessment: {
      benefitCostRatio: {
        uxBenefitScore: 9.2,
        techCostScore: 4.1,
        bcrRatio: 2.24,
        verdict: 'High ROI - Build Now',
      },
      technologicalLimitations: [
        {
          constraint: 'Tenant log volume can spike to 100k events/sec during incidents',
          impactOnUX: 'Could freeze client browser table rendering',
          mitigation: 'Virtual windowing (TanStack Virtual) and server-side log bucketing.',
        },
        {
          constraint: 'Third-party API rate limits on Zendesk REST endpoints',
          impactOnUX: 'Delayed ticket status updates',
          mitigation: 'Local optimistic UI updates with background reconciliation queue.',
        },
      ],
      dependencies: [
        { name: 'Gemini 3.8 Flash API', type: 'External API', risk: 'Low' },
        { name: 'Enterprise Identity Provider (Okta/Azure AD)', type: 'Internal Service', risk: 'Low' },
        { name: 'Customer Telemetry Gateway', type: 'Data Pipeline', risk: 'Medium' },
      ],
    },
    accessibilityAuditPlan: {
      wcagTarget: 'WCAG 2.1 AA',
      contrastStandards: 'Minimum 4.5:1 text contrast on light/dark surfaces; 3:1 for interactive borders and graphical controls.',
      keyboardNavigationRules: [
        'Complete tab-order cycle without keyboard traps in modals or drawers',
        'Visible 2px focus ring with high-contrast offset on all interactive buttons',
        'Global shortcut "Esc" dismisses open layers without losing form drafts',
      ],
      screenReaderAccommodations: [
        'Live announcements (aria-live="polite") when background diagnoses complete',
        'Descriptive aria-labels on icon-only buttons',
        'Semantic HTML table structure with valid headers and row scopes',
      ],
    },
  },
  userStory: {
    guidingQuestions: {
      targetUsersAndDailyTasks: 'Tier 2 technical support specialists, on-call developers, and escalation managers working high-velocity queues.',
      userPersonasOverview: 'Alex Rivera (Senior Support Engineer) and Priya Sharma (Customer Operations Lead).',
      e2eUiWorkflowOverview: 'Rapid triage workflow proposal moving from alert notification to verified fix in under 4 steps.',
      validationOfEaseAndSimplicity: 'Validated against Nielsen’s 10 Heuristics and structured usability tasks with time-on-task thresholds.',
    },
    userPersonas: [
      {
        id: 'persona-1',
        name: 'Alex Rivera',
        role: 'Senior Technical Support Engineer (Tier 2)',
        avatarInitials: 'AR',
        dailyTasks: [
          'Investigating customer bug reports and API timeout escalations',
          'Reviewing server error logs and matching with git commit hashes',
          'Drafting customer-facing technical explanations and workarounds',
        ],
        primaryGoal: 'Resolve issues fast without causing secondary regressions or getting bogged down in repetitive questions.',
        frustrations: [
          'Spending 20 minutes just searching for the right log stream in Datadog',
          'Lack of past context when a customer reopens an old issue',
          'Clunky UI software with slow page transitions',
        ],
        techSavviness: 'Power User',
        quote: 'Give me the raw logs, tell me what changed in the last release, and let me execute a verified fix without opening 8 tabs.',
      },
      {
        id: 'persona-2',
        name: 'Priya Sharma',
        role: 'Customer Support Lead & Escalation Manager',
        avatarInitials: 'PS',
        dailyTasks: [
          'Monitoring team queue health and SLA breach countdowns',
          'Assigning tickets to engineers based on specialty',
          'Communicating incident post-mortems to key account managers',
        ],
        primaryGoal: 'Prevent SLA breaches, maintain team morale, and ensure high customer satisfaction (CSAT > 95%).',
        frustrations: [
          'Inconsistent triage quality between junior and senior engineers',
          'Manual spreadsheet reporting for executive leadership',
        ],
        techSavviness: 'Intermediate',
        quote: 'I need real-time clarity on which tickets are at risk before the SLA alarm fires.',
      },
    ],
    e2eWorkflowProposals: [
      {
        id: 'wf-1',
        workflowTitle: 'Rapid Triage to Verified Resolution',
        targetUserRole: 'Tier 2 Support Engineer',
        steps: [
          {
            stepNumber: 1,
            action: 'Select ticket from Priority Queue via keyboard arrow keys + Enter',
            screenState: 'Split-view triage console displays ticket description, customer tier badge, and live telemetry preview.',
            systemFeedback: 'Diagnostic engine initiates parallel background trace analysis in 400ms.',
            frictionGuard: 'Auto-saves engineer read receipt so other teammates know the ticket is actively being addressed.',
          },
          {
            stepNumber: 2,
            action: 'Review AI Root Cause Hypothesis Card and expand cited log trace snippet',
            screenState: 'Inline drawer slides open showing correlated log lines with highlighted error tokens.',
            systemFeedback: 'Visual diff displays proposed configuration change.',
            frictionGuard: 'Displays source confidence score (e.g. 96%) with link to 2 past identical resolutions.',
          },
          {
            stepNumber: 3,
            action: 'Click "Run Sandbox Simulation" or press Shift+Enter',
            screenState: 'Dry-run preview shows simulated API response (200 OK) in isolated container.',
            systemFeedback: 'Green checkmark indicators confirm zero breaking changes on connected webhooks.',
            frictionGuard: 'Requires explicit confirmation before applying mutation to live production.',
          },
          {
            stepNumber: 4,
            action: 'Dispatch Resolution & Notify Customer',
            screenState: 'Ticket marks as "Resolved - Pending Customer Verification" and drafts polite technical recap.',
            systemFeedback: 'Confetti micro-animation, queue counter decrements, focus moves seamlessly to next priority item.',
            frictionGuard: 'Includes "Undo (10s)" snackbar in case the engineer closed the ticket accidentally.',
          },
        ],
        decisionBranches: [
          'If AI confidence is < 70%, system flags for Senior Architect review instead of automated script offer.',
          'If tenant has custom on-premise constraints, route to dedicated VPN gateway proxy.',
        ],
      },
    ],
    nielsenHeuristicsEvaluation: [
      {
        heuristicNumber: 1,
        name: 'Visibility of System Status',
        description: 'Keep users informed about what is going on through appropriate feedback within reasonable time.',
        evaluationNotes: 'OmniDesk displays clear streaming indicators, background query spinners, and live SLA countdown badges.',
        status: 'Strong Strength',
        recommendation: 'Provide explicit progress percentage for log index searches over 3 seconds.',
      },
      {
        heuristicNumber: 2,
        name: 'Match Between System and the Real World',
        description: 'Speak the users language with words, phrases, and concepts familiar to the user rather than system-oriented terms.',
        evaluationNotes: 'Uses standard support terminology (SLA, MTTR, Root Cause, Runbook, Patch) instead of obscure database codes.',
        status: 'Pass',
        recommendation: 'Ensure error codes link to plain-English explanations for Tier 1 agents.',
      },
      {
        heuristicNumber: 3,
        name: 'User Control and Freedom',
        description: 'Provide an emergency exit to leave unwanted states without an extended dialogue.',
        evaluationNotes: 'Every action provides an immediate 10-second Undo toast. Sandbox changes are isolated until final commit.',
        status: 'Strong Strength',
        recommendation: 'Add keyboard shortcut (Ctrl+Z) mapped directly to ticket state reversals.',
      },
      {
        heuristicNumber: 4,
        name: 'Consistency and Standards',
        description: 'Users should not have to wonder whether different words, situations, or actions mean the same thing.',
        evaluationNotes: 'Strict adherence to design tokens and standard command palette shortcuts across all screens.',
        status: 'Pass',
        recommendation: 'Harmonize button verbs across ticket views and modal dialogs.',
      },
      {
        heuristicNumber: 5,
        name: 'Error Prevention',
        description: 'Design to prevent problems from occurring in the first place, or check for them and present confirmation options.',
        evaluationNotes: 'Destructive database mutations require visual diff preview and explicit 2-step verification.',
        status: 'Strong Strength',
        recommendation: 'Prevent multiple engineers from writing conflicting replies on the same ticket via active presence lock.',
      },
      {
        heuristicNumber: 6,
        name: 'Recognition Rather Than Recall',
        description: 'Minimize the users memory load by making elements, actions, and options visible.',
        evaluationNotes: 'Relevant customer contract terms, past incidents, and error logs are surface-visible without tab switching.',
        status: 'Strong Strength',
        recommendation: 'Store recent search queries in quick-access dropdown.',
      },
      {
        heuristicNumber: 7,
        name: 'Flexibility and Efficiency of Use',
        description: 'Accelerators unseen by the novice user may often speed up the interaction for the expert user.',
        evaluationNotes: 'Complete keyboard navigation (CMD+K, J/K queue scrolling, number keys for status change).',
        status: 'Strong Strength',
        recommendation: 'Include interactive shortcut cheat-sheet accessible with "?" key.',
      },
      {
        heuristicNumber: 8,
        name: 'Aesthetic and Minimalist Design',
        description: 'Dialogues should not contain information that is irrelevant or rarely needed.',
        evaluationNotes: 'Zero visual clutter, no decorative capsule pills, clean typographic hierarchy with subtle borders.',
        status: 'Pass',
        recommendation: 'Allow engineers to collapse the customer history rail to focus purely on code traces.',
      },
      {
        heuristicNumber: 9,
        name: 'Help Users Recognize, Diagnose, and Recover from Errors',
        description: 'Expressed in plain language (no codes), precisely indicate the problem, and constructively suggest a solution.',
        evaluationNotes: 'API sync errors display exact payload discrepancies and a 1-click "Retry with exponential backoff" action.',
        status: 'Pass',
        recommendation: 'Highlight exactly which parameter failed in red within the payload inspector.',
      },
      {
        heuristicNumber: 10,
        name: 'Help and Documentation',
        description: 'Provide documentation that is easy to search, focused on user tasks, and lists concrete steps.',
        evaluationNotes: 'Contextual tooltips, integrated runbooks, and inline parameter explanations.',
        status: 'Pass',
        recommendation: 'Embed direct links to official cloud documentation (AWS/GCP) inside stack trace viewers.',
      },
    ],
    usabilityTestPlan: {
      testObjectives: [
        'Measure task completion rate for diagnosing an unfamiliar API timeout',
        'Evaluate time-on-task for executing a verified sandbox fix',
        'Record subjective cognitive load and frustration ratings during queue shifts',
      ],
      sampleSizeAndProfile: '8 Enterprise Support Engineers (4 Senior Tier 2/3, 4 Junior Tier 1) across 3 SaaS companies.',
      taskScenarios: [
        {
          id: 'task-1',
          taskPrompt: 'You have just been assigned an urgent P1 ticket regarding payment webhook timeouts. Identify the root cause using OmniDesk.',
          expectedPath: 'Open ticket -> inspect AI Diagnostic Card -> click cited log snippet -> confirm webhook signature mismatch.',
          successCriteria: 'Root cause identified correctly in under 90 seconds without leaving OmniDesk workspace.',
          maxAllowedTimeSeconds: 120,
        },
        {
          id: 'task-2',
          taskPrompt: 'Test and execute the suggested rate-limit patch in sandbox mode, verify output, and mark ticket as resolved.',
          expectedPath: 'Click Sandbox Preview -> inspect JSON diff -> confirm execute -> dispatch resolution email.',
          successCriteria: 'Successful sandbox run and resolution dispatch with zero errors.',
          maxAllowedTimeSeconds: 90,
        },
      ],
      proceduresAndMetrics: 'Think-aloud protocol, screen recording, post-task Single Ease Question (SEQ 1-7), and full 10-item System Usability Scale (SUS) questionnaire administered at session conclusion.',
    },
    experienceInsightsStrategy: {
      tooling: 'PostHog / FullStory Enterprise with strict PII masking',
      dropOffWarningSignals: [
        'Abandoning AI suggestion drawer without clicking execute or copy',
        'Reverting to manual copy-paste into external browser tabs',
        'Ticket idle time exceeding 15 minutes after assignment',
      ],
      rageClickMonitors: [
        'Repeated clicks on disabled execute buttons',
        'Rapid clicks on unscrollable log codeblocks',
      ],
      qualitativeFeedbackChannels: [
        'In-app 2-click feedback on AI suggestion accuracy (Thumbs up / Thumbs down + Reason)',
        'Monthly UX advisory council with power users',
      ],
    },
  },
  successStory: {
    guidingQuestions: {
      marketShareAndFinancials: 'Achieve 15% penetration within target cloud SaaS accounts and generate $3.2M ARR in Year 1.',
      customerEngagementMetrics: 'Daily Active Users / Monthly Active Users (DAU/MAU) > 78%, Average session length 4.2 hours.',
      kpiKbiOverview: 'Continuous monitoring of Conversion, Retention, Resolution Velocity, and System Usability Scale (SUS).',
      contingencyImprovements: 'Pre-planned UX iterations if SUS falls below 75 or if adoption of AI suggestions is under 60%.',
      susTargetsAndMethod: 'Administer John Brooke’s 10-item questionnaire post-trial; target score > 82 (Excellent tier).',
    },
    systemUsabilityScale: {
      targetScore: 84.5,
      ratingCategory: 'Excellent (>80.3)',
      questions: standardBrookeQuestions,
      calculatedScore: 85.0,
      benchmarkComparison: 'Exceeds the industry average SUS of 68.0 by 17.0 points; ranks in the 95th percentile of enterprise tools.',
    },
    netPromoterScore: {
      targetNps: 58,
      projectedPromoters: 68,
      projectedPassives: 22,
      projectedDetractors: 10,
      advocateGrowthStrategy: 'Empower high-satisfaction Tier 2 engineers to become internal enterprise champions through certification and community recognition.',
    },
    kpiKbiDashboard: [
      {
        id: 'kpi-1',
        metric: 'Mean Time to Resolution (MTTR)',
        category: 'KPI',
        formula: 'Total time to resolve / Total resolved incidents',
        targetValue: '< 65 minutes (Baseline: 288 min)',
        measurementCadence: 'Weekly rolling average',
        rationale: 'Primary driver of customer satisfaction and SLA compliance savings.',
      },
      {
        id: 'kpi-2',
        metric: 'AI Suggestion Acceptance Rate',
        category: 'KBI',
        formula: 'Accepted AI recommendations / Total presented recommendations',
        targetValue: '> 74%',
        measurementCadence: 'Daily telemetry',
        rationale: 'Measures genuine perceived value and trust in automated root-cause guidance.',
      },
      {
        id: 'kpi-3',
        metric: 'System Usability Scale (SUS)',
        category: 'UX Metric',
        formula: 'Sum of Brooke 10-item adjusted score x 2.5',
        targetValue: '> 82.0 (Excellent)',
        measurementCadence: 'Quarterly user benchmark',
        rationale: 'Direct validation of John Papadami E2E design ease and simplicity.',
      },
      {
        id: 'kpi-4',
        metric: 'Engineer Retention / Burnout Index',
        category: 'KBI',
        formula: 'Annual voluntary turnover among Tier 2/3 staff',
        targetValue: '< 10% (Industry avg: 32%)',
        measurementCadence: 'Biannual HR survey',
        rationale: 'Proves reduction in cognitive fatigue and workplace stress.',
      },
      {
        id: 'kpi-5',
        metric: 'Net Promoter Score (NPS)',
        category: 'KPI',
        formula: '% Promoters - % Detractors',
        targetValue: '+58',
        measurementCadence: 'Quarterly post-support survey',
        rationale: 'Measures organic customer advocacy and expansion likelihood.',
      },
    ],
    financialAndMarketTargets: {
      marketShareTarget: 'Capture 14% of mid-market cloud infrastructure support teams within 24 months.',
      revenueOrRoiTarget: '$3.4M Annual Recurring Revenue (ARR) with 3.8x ROI delivered to enterprise customers.',
      customerAcquisitionCostPayback: '5.2 Months',
      lifetimeValueProjection: '$180,000 Average ACV across 3-year enterprise contracts',
    },
    contingencyRoadmap: [
      {
        scenario: 'SUS score dips below 70 during pilot testing',
        signalIndicator: 'Engineers report feeling overwhelmed by telemetry drawers or unfamiliar keyboard shortcuts',
        correctiveAction: 'Deploy progressive disclosure mode: simplify initial triage view to 3 core cards with an "Expert Mode" toggle.',
        uxRefinementLeadTime: '2 sprints (4 weeks)',
      },
      {
        scenario: 'AI suggestion acceptance rate stalls below 50%',
        signalIndicator: 'Engineers reject suggested fixes citing missing log confidence details',
        correctiveAction: 'Embed expandable citation links directly to raw line numbers and add explicit "Why this was suggested" drawer.',
        uxRefinementLeadTime: '1 sprint (2 weeks)',
      },
      {
        scenario: 'Keyboard command palette adoption is under 25%',
        signalIndicator: 'Analytics show 80% mouse usage on toolbar icons',
        correctiveAction: 'Introduce subtle in-context shortcut hints on hover and an interactive 3-minute onboarding tutorial.',
        uxRefinementLeadTime: '1 sprint (2 weeks)',
      },
    ],
  },
};
