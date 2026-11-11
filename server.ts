import express from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini initialization per guidelines
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// System prompt grounding strictly in John Papadami's E2E Product Design Framework
const E2E_FRAMEWORK_SYSTEM_PROMPT = `You are the lead Principal Product Designer and Design Systems Architect executing John Papadami's "E2E Product Design Framework".
The framework organizes the entire product lifecycle into 5 foundational stories backed by a 5-step User-Centered Design (UCD) engine (Analysis -> Define Requirements -> E2E Designs -> Validation -> Success Results).

The 5 Stories are:
1. Market Story:
   - Where are we in the market today?
   - What segment are we addressing / targeting and why?
   - What is our value proposition? How will it make change?
   - UX Methodologies: Competitive analysis (UX strengths, IA gaps, design patterns), Market trend analysis (momentum vs declining), Value proposition mapping.

2. Customer Story:
   - Target customers, size, business segment, goals.
   - Organization & stakeholders (Champions, Decision Makers, End Users, Blockers).
   - Customer pain points & challenges.
   - Primary product use cases (trigger to resolution).
   - UX Methodologies: Customer/stakeholder interviews, Service blueprinting (Customer actions, Frontstage, Backstage, Supporting systems), Customer journey mapping.

3. Technology Story:
   - Feature requirements based on use cases.
   - Design System to be leveraged, tokens, components, responsive grid.
   - Front-end & back-end use cases, APIs, AI integration, Platform integration.
   - Technological dependencies, restraints, limitations, Benefit Cost Ratio (BCR / BCO), WCAG 2.1 AA accessibility audit.
   - UX Methodologies: Feasibility assessment (BCR), API capability review, Accessibility audit, Platform capability analysis.

4. User Story:
   - Target users and daily tasks, rich user personas.
   - E2E design UI workflow proposals (step-by-step screen states, feedback, friction guards).
   - Validate use cases, user satisfaction, ease of use, simplicity.
   - UX Methodologies: Focus groups & user interviews, Usability test plan & testing, Jakob Nielsen's 10 Usability Heuristics evaluation, Experience insights (drop-offs, rage clicks).

5. Success Story:
   - Target market share & financial results.
   - Customer engagement and satisfaction metrics.
   - KPI & KBI tracking (Conversion rate = conversions / total visitors, Retention = returning / total, NPS = % promoters - % detractors).
   - System Usability Scale (SUS) results (>80.3 = Excellent, 68-80.3 = Good, 68 = OK, 51-68 = Poor, <51 = Awful) with John Brooke's 10-item questionnaire.
   - Corrective roadmap if goals are missed.

Generate thorough, actionable, realistic, high-fidelity data points for each story. Never use placeholder text like "Lorem ipsum" or "TBD". Use concrete design metrics, technical endpoints, user friction patterns, and realistic business metrics.`;

app.post('/api/generate-framework', async (req, res) => {
  try {
    const { productName, industry, problemStatement, targetAudience, strategicObjectives } = req.body;

    if (!productName || !problemStatement) {
      return res.status(400).json({ error: 'productName and problemStatement are required' });
    }

    const prompt = `Generate a complete, highly detailed E2E Product Design Framework data point dataset for:
Product Name: ${productName}
Industry / Domain: ${industry || 'Technology'}
Core Problem / Trigger: ${problemStatement}
Target Audience: ${targetAudience || 'Target professionals & enterprise users'}
Strategic Objectives: ${strategicObjectives || 'Drive market adoption, maximize ease of use, achieve high SUS score'}

Provide comprehensive data points across all 5 stories:
1. Market Story (positioning, TAM/SAM/SOM, competitive analysis of 3 realistic competitors with UX strengths and IA gaps, market trends, Value Prop Canvas).
2. Customer Story (customer profile, stakeholder ecosystem with 4 distinct roles, ranked pain points with current workarounds, 4-stage service blueprint, customer journey map, and 3 detailed use cases).
3. Technology Story (feature requirements linked to use cases, design system spec, tech architecture with APIs/AI/Frontend/Backend, feasibility assessment with BCR ratio, WCAG 2.1 accessibility plan).
4. User Story (2 distinct user personas with daily tasks and frustrations, 2 E2E UI workflow proposals with step-by-step actions and screen states, Jakob Nielsen's 10 Heuristics audit scorecard, usability test plan with task scenarios).
5. Success Story (System Usability Scale target & John Brooke's 10 questions with calculated score, NPS projection, KPI/KBI scorecard with exact formulas, financial targets, and contingency roadmap).

Return strictly a valid JSON object matching the requested schema.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: E2E_FRAMEWORK_SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const jsonText = response.text?.trim() || '{}';
    let data;
    try {
      data = JSON.parse(jsonText);
    } catch {
      // fallback regex extraction if wrapped in code fence
      const match = jsonText.match(/\{[\s\S]*\}/);
      if (match) {
        data = JSON.parse(match[0]);
      } else {
        throw new Error('Failed to parse model JSON output');
      }
    }

    res.json({ success: true, data });
  } catch (error: any) {
    console.error('Error generating framework:', error);
    res.status(500).json({ error: error.message || 'Internal server error while generating framework data points' });
  }
});

app.post('/api/refine-story', async (req, res) => {
  try {
    const { storyIndex, storyName, currentStoryData, userInstruction, productContext } = req.body;

    const prompt = `Refine and improve Story ${storyIndex}: "${storyName}" within John Papadami's E2E Product Design Framework.
Product Context: ${JSON.stringify(productContext || {})}
Current Story Data: ${JSON.stringify(currentStoryData)}
User Instruction / Refinement Goal: ${userInstruction}

Maintain the exact data structure of Story ${storyIndex}, incorporating the user's specific guidance to make data points sharper, more actionable, and aligned with UX methodologies.
Return strictly valid JSON for this story.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: E2E_FRAMEWORK_SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const jsonText = response.text?.trim() || '{}';
    let refinedData;
    try {
      refinedData = JSON.parse(jsonText);
    } catch {
      const match = jsonText.match(/\{[\s\S]*\}/);
      if (match) refinedData = JSON.parse(match[0]);
      else throw new Error('Failed to parse model JSON output');
    }

    res.json({ success: true, storyData: refinedData });
  } catch (error: any) {
    console.error('Error refining story:', error);
    res.status(500).json({ error: error.message || 'Failed to refine story' });
  }
});

// Dedicated AI Agent Execution for Each Story
app.post('/api/agent-action', async (req, res) => {
  try {
    const {
      agentId,
      agentName,
      agentTitle,
      storyIndex,
      storyName,
      actionType,
      prompt,
      currentStoryData,
      productContext,
    } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const agentSystemInstruction = `You are ${agentName}, ${agentTitle}, acting as the autonomous lead agent for Story ${storyIndex}: "${storyName}" within John Papadami's "E2E Product Design Framework".
Your mission:
- Execute your specialized role rigorously using John Papadami's defined UX methodologies.
- Produce deep, professional, mathematically grounded, and actionable insights.
- Critique or expand upon the existing story data points.
- Respond with high clarity, citing specific heuristics, formulas (e.g., SUS calculation, BCR ratio = Benefit / Cost, NPS = % Promoters - % Detractors), and concrete design patterns.

You must respond in valid JSON format with this exact structure:
{
  "text": "Detailed, formatted analysis and response in clean Markdown. Include headings, bullet points, and concrete recommendations.",
  "insights": ["Key insight 1", "Key insight 2", "Key insight 3"],
  "recommendedActions": ["Immediate next action 1", "Next action 2"],
  "suggestedStoryUpdates": null or an updated object of the story data if you are proposing concrete data point replacements or additions
}`;

    const agentPrompt = `Product Context:
${JSON.stringify(productContext || {})}

Current Story Data (${storyName}):
${JSON.stringify(currentStoryData || {})}

Action Type: ${actionType || 'consult'}
User Directive / Question:
${prompt}

Provide a deep-dive, professional evaluation and response. If proposing concrete enhancements to the data points, include the updated story data in "suggestedStoryUpdates", else set it to null.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: agentPrompt,
      config: {
        systemInstruction: agentSystemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const jsonText = response.text?.trim() || '{}';
    let result;
    try {
      result = JSON.parse(jsonText);
    } catch {
      const match = jsonText.match(/\{[\s\S]*\}/);
      if (match) result = JSON.parse(match[0]);
      else throw new Error('Failed to parse agent JSON output');
    }

    res.json({ success: true, result });
  } catch (error: any) {
    console.error('Error executing agent action:', error);
    res.status(500).json({ error: error.message || 'Failed to execute agent action' });
  }
});

// All-Agents Council Review: Cross-Story Synergy & Health Audit
app.post('/api/council-review', async (req, res) => {
  try {
    const { frameworkData } = req.body;

    if (!frameworkData) {
      return res.status(400).json({ error: 'frameworkData is required' });
    }

    const councilPrompt = `Perform a comprehensive Multi-Agent Council Review of this entire product design across all 5 stories in John Papadami's E2E Product Design Framework.

Product Name: ${frameworkData.productContext?.productName}
Industry: ${frameworkData.productContext?.industry}
Core Problem: ${frameworkData.productContext?.problemStatement}

Full Framework Data:
${JSON.stringify(frameworkData)}

Assemble critiques from all 5 specialized agents:
1. Vance Thorne (Market Strategist - Market Story)
2. Dr. Elena Rostova (Service Designer - Customer Story)
3. Marcus Chen (Systems Architect - Technology Story)
4. Aria Morales (UX Researcher - User Story)
5. David Sterling (Analytics Scientist - Success Story)

Evaluate overall framework health score (0-100), individual agent grades, key strengths, critical gaps, and cross-story alignment tensions (e.g., does the technology feasibility match customer pain points? Do user personas align with market segment?).

Return strictly a JSON object with this schema:
{
  "overallHealthScore": number,
  "executiveSummary": "string summary of the council review",
  "agentCritiques": [
    {
      "agentId": "agent-market",
      "agentName": "Vance Thorne",
      "storyName": "Market Story",
      "score": number (0-100),
      "verdict": "Strong" | "Needs Refinement" | "Critical Gap",
      "keyStrengths": ["string", "string"],
      "criticalGaps": ["string"],
      "immediateActionItem": "string"
    },
    ... (all 5 agents)
  ],
  "crossStorySynergies": [
    {
      "storyPair": "Market Story <-> Technology Story",
      "alignmentStatus": "Aligned" | "Tension Detected" | "Misaligned",
      "note": "string explaining alignment or tension"
    },
    {
      "storyPair": "Customer Story <-> User Story",
      "alignmentStatus": "Aligned" | "Tension Detected" | "Misaligned",
      "note": "string explaining alignment or tension"
    },
    {
      "storyPair": "Technology Story <-> Success Story",
      "alignmentStatus": "Aligned" | "Tension Detected" | "Misaligned",
      "note": "string explaining alignment or tension"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: councilPrompt,
      config: {
        systemInstruction: E2E_FRAMEWORK_SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        temperature: 0.6,
      },
    });

    const jsonText = response.text?.trim() || '{}';
    let reviewResult;
    try {
      reviewResult = JSON.parse(jsonText);
    } catch {
      const match = jsonText.match(/\{[\s\S]*\}/);
      if (match) reviewResult = JSON.parse(match[0]);
      else throw new Error('Failed to parse council review JSON');
    }

    res.json({ success: true, review: reviewResult });
  } catch (error: any) {
    console.error('Error conducting council review:', error);
    res.status(500).json({ error: error.message || 'Failed to conduct council review' });
  }
});

// Vite middleware integration for full-stack dev server
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`E2E Product Design Framework server listening on http://localhost:${port}`);
  });
}

startServer();
