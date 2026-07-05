import { getTechniqueById } from '../data/techniques';

export function buildCraftPrompt(rawPrompt, selectedTechniquesIds) {
  const techniquesText = selectedTechniquesIds
    .map(id => getTechniqueById(id))
    .filter(Boolean)
    .map(t => `- ${t.name}: ${t.fullDesc}`)
    .join('\n');

  const systemMessage = `
You are a world-class prompt engineering expert. Your task is to analyze a raw, poorly structured user prompt and transform it into a highly effective, production-ready prompt using specific advanced techniques.

<output_requirements>
You must respond ONLY with a valid JSON object adhering to this schema:
{
  "original_issues": [
    {
      "issue": "Brief name of the problem (e.g. No task boundary defined)",
      "explanation": "Why this fails at the attention/mechanics level",
      "severity": "high" | "medium" | "low"
    }
  ],
  "crafted_prompt": "The complete, ready-to-use engineered prompt as a string. Include XML tags, roles, formatting exactly as it should be pasted to an LLM.",
  "techniques_applied": [
    {
      "technique": "Name of technique",
      "how_applied": "How exactly you applied it here",
      "impact": "The concrete benefit"
    }
  ],
  "comparison": {
    "clarity_before": number (0-100),
    "clarity_after": number (0-100),
    "specificity_before": number (0-100),
    "specificity_after": number (0-100),
    "structure_before": number (0-100),
    "structure_after": number (0-100),
    "token_efficiency_gain_pct": number,
    "key_improvements": ["improvement 1", "improvement 2"]
  },
  "use_case_tag": "Short tag like 'Code Generation' or 'Creative Writing'"
}
</output_requirements>

Critical Rules (Apply Position Anchoring):
1. The crafted_prompt must incorporate the user's intent entirely.
2. If techniques are provided, you MUST apply them in the crafted prompt.
3. Return ONLY valid JSON, no markdown wrapping outside the JSON structure.
`;

  const userMessage = `
<task>
Analyze the following raw prompt, identify its flaws, and rewrite it applying the requested techniques.
</task>

<raw_prompt>
${rawPrompt}
</raw_prompt>

<techniques_to_apply>
${techniquesText || "Apply best practices (Zero-Shot, Position Anchoring, Output Contract) if none specified."}
</techniques_to_apply>
`;

  return [
    { role: 'system', content: systemMessage.trim() },
    { role: 'user', content: userMessage.trim() }
  ];
}

const buildGenericDocPrompt = (role, outputSchema, craftedPrompt, context) => {
  const systemMessage = `
You are a ${role}. Your task is to use the provided engineered prompt and context to generate a professional document.

<output_requirements>
You must respond ONLY with a valid JSON object adhering to this schema:
{
  "title": "A short, descriptive title for the document",
  "content": "The full text of the document. Use \\n for newlines. Format using markdown where appropriate."
}
</output_requirements>

Output Rules:
- Incorporate all elements requested in the <context>.
- Strictly follow the structure requested in the <engineered_prompt>.
- Output ONLY valid JSON.
`;

  const userMessage = `
<engineered_prompt>
${craftedPrompt}
</engineered_prompt>

<context>
${context || 'No additional context provided. Synthesize based on the engineered prompt.'}
</context>
`;

  return [
    { role: 'system', content: systemMessage.trim() },
    { role: 'user', content: userMessage.trim() }
  ];
};

export const buildReadmePrompt = (craftedPrompt, context) => 
  buildGenericDocPrompt('senior technical writer', '', craftedPrompt, context);

export const buildScriptPrompt = (craftedPrompt, context) => 
  buildGenericDocPrompt('professional video creator', '', craftedPrompt, context);

export const buildSOPPrompt = (craftedPrompt, context) => 
  buildGenericDocPrompt('business process analyst', '', craftedPrompt, context);

export const buildEmailPrompt = (craftedPrompt, context) => 
  buildGenericDocPrompt('executive communication specialist', '', craftedPrompt, context);

export const buildBlogPrompt = (craftedPrompt, context) => 
  buildGenericDocPrompt('professional content writer', '', craftedPrompt, context);

export const DOC_PROMPT_MAP = {
  readme: buildReadmePrompt,
  script: buildScriptPrompt,
  sop: buildSOPPrompt,
  email: buildEmailPrompt,
  blog: buildBlogPrompt,
};
