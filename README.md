<div align="center">
  <img src="https://img.shields.io/badge/Status-Live-success?style=for-the-badge" alt="Status" />
  
  # PromptCraft ✦
  ### AI-Powered Prompt Engineering Studio

  **[✨ View the Live Application Here](https://Piyush-Patole.github.io/PromptCrafter.AI/)**

  <p align="center">
    Transform any raw, vague, or broken prompt into a precision-engineered instruction using 12 research-backed techniques — entirely in the browser, with zero backend required.
  </p>

  [![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages-181717?logo=github)](https://pages.github.com/)
  [![Groq](https://img.shields.io/badge/AI-Groq%20%C2%B7%20Llama%203.3%2070B-FF6B35)](https://console.groq.com)
  [![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://react.dev)
  [![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?logo=vite)](https://vitejs.dev)
  [![Zustand](https://img.shields.io/badge/State-Zustand-orange)](https://github.com/pmndrs/zustand)
  [![License](https://img.shields.io/badge/License-MIT-22C55E)](LICENSE)
</div>

---

## Table of Contents

1. [The Problem This Solves](#1-the-problem-this-solves)
2. [What PromptCraft Does](#2-what-promptcraft-does)
3. [Research Foundation](#3-research-foundation)
4. [Architecture](#4-architecture)
5. [Project Structure](#5-project-structure)
6. [Tech Stack](#6-tech-stack)
7. [The 12 Prompt Engineering Techniques](#7-the-12-prompt-engineering-techniques)
8. [Common Prompt Mistakes Detected and Fixed](#8-common-prompt-mistakes-detected-and-fixed)
9. [Application Pages — Detailed Walkthrough](#9-application-pages--detailed-walkthrough)
10. [Groq API Integration](#10-groq-api-integration)
11. [Prompt Builders — The 6 Constructors](#11-prompt-builders--the-6-constructors)
12. [State Management](#12-state-management)
13. [Design System](#13-design-system)
14. [Getting Started — Local Development](#14-getting-started--local-development)
15. [Deploying to GitHub Pages](#15-deploying-to-github-pages)
16. [GitHub Actions CI/CD](#16-github-actions-cicd)
17. [Environment Variables](#17-environment-variables)
18. [Groq Free Tier — Usage Estimates](#18-groq-free-tier--usage-estimates)
19. [Data Privacy](#19-data-privacy)
20. [Scaling to Production — Backend Integration Summary](#20-scaling-to-production--backend-integration-summary)
21. [Roadmap](#21-roadmap)
22. [Research References](#22-research-references)

---

## 1. The Problem This Solves

Most people write prompts the way they write a text message — casual, vague, and full of unstated assumptions. The result is generic AI output that requires constant back-and-forth iteration.

The research is unambiguous: **the quality of a prompt determines the quality of output far more than the choice of AI model.** Prompt engineering is a rigorous discipline with 58 documented techniques (Schulhoff et al., The Prompt Report, 2024), grounded in how transformer attention mechanisms actually work at the mathematical level.

The problem is that teaching every person this discipline is not scalable. Practitioners spend significant time debugging vague prompts, and most users have no idea why their outputs keep missing the mark.

**PromptCraft bridges that gap.** It takes any raw, messy prompt, runs it through a Groq-powered AI analysis layer, applies your chosen engineering techniques, and delivers a production-ready prompt back — along with a full diagnostic report covering what was wrong and exactly how it was fixed. Users do not need to learn prompt engineering. They just need PromptCraft.

---

## 2. What PromptCraft Does

**Core workflow:**

```
Paste raw prompt → Select techniques → Get engineered prompt → Compare quality → Export document
```

### Five-Step Application Flow

| Step | Page | What Happens |
|------|------|--------------|
| 1 | **Input** | User pastes any raw, messy, or vague prompt. Five example prompts are provided for quick demo starts. Live character count shown. |
| 2 | **Techniques** | User selects from 12 technique cards grouped by category. Hovering any card shows the full academic explanation, significance, effect, trade-off, and research source in a rich tooltip. |
| 3 | **Result** | Groq AI (Llama 3.3 70B) analyzes the original prompt, identifies every engineering failure with severity level (high / medium / low), and returns the fully crafted prompt plus a breakdown of which techniques were applied and how. |
| 4 | **Compare** | Animated quality score bars show before vs. after across three metrics: clarity, specificity, structure. Side-by-side text diff. Token efficiency gain. Key improvements listed in numbered order. |
| 5 | **Output Doc** | User selects a document type (README, video script, SOP, email, blog post) and PromptCraft generates a complete professional document using the crafted prompt topic. Copy or download instantly. |

### What the AI Returns for Every Prompt

```json
{
  "original_issues": [
    {
      "issue": "No task boundary defined",
      "explanation": "Without scope, the model activates broad token distributions...",
      "severity": "high"
    }
  ],
  "crafted_prompt": "The complete, ready-to-use engineered prompt...",
  "techniques_applied": [
    {
      "technique": "XML Delimiters",
      "how_applied": "Wrapped instructions in <task> and data in <context> tags...",
      "impact": "Eliminates instruction-to-data confusion"
    }
  ],
  "comparison": {
    "clarity_before": 18,
    "clarity_after": 87,
    "specificity_before": 12,
    "specificity_after": 91,
    "structure_before": 5,
    "structure_after": 88,
    "token_efficiency_gain_pct": 34,
    "key_improvements": [
      "Added explicit role persona with domain and experience level",
      "Defined output schema with exact field names and types",
      "Anchored critical rules at prompt start and end"
    ]
  },
  "use_case_tag": "Code Generation"
}
```

---

## 3. Research Foundation

PromptCraft is built directly on peer-reviewed research. Every design decision traces back to a specific academic finding.

### The Lost-in-the-Middle Effect (Liu et al., 2024)

Transformer models exhibit a documented **U-shaped attention curve**. Retrieval accuracy is highest at the absolute beginning and end of a context window, and drops significantly in the middle due to three mechanisms:

1. **Causal Attention Masking** — Tokens at the beginning are visible to every subsequent token in the sequence. A token placed in the middle is only visible to the tokens that follow it, reducing its mathematical influence on final hidden states.
2. **Attention Sinks** — During pretraining, initial sequence boundary tokens absorb a disproportionate share of attention weight across multiple layers regardless of semantic content.
3. **Recency Bias** — Causal generation naturally prioritizes local context immediately preceding the generation trigger.

**What this means for your prompts:** Any rule, constraint, or format instruction you bury in the middle of a long prompt is competing at a mathematical disadvantage for the model's attention. The Position Anchoring technique restructures every crafted prompt to place critical instructions at start and end.

### Softmax Attention Bottleneck

Transformer attention uses:

```
Attention(Q, K, V) = Softmax(QK^T / sqrt(d_k)) * V
```

When a prompt is padded with irrelevant details ("context stuffing"), the Softmax function must distribute weights across a larger token count. This **mathematically reduces** the weight assigned to critical instructions — increasing hallucination risk and causing instruction omissions. Context Compression strips this noise before the prompt reaches the model.

### Chain of Draft Token Efficiency (Xu et al., Zoom Research, 2025)

Traditional Chain-of-Thought prompting achieves high reasoning accuracy but generates 13× more intermediate tokens than necessary. Chain of Draft caps reasoning steps at approximately 5 words each, achieving:

- **Equivalent accuracy** to verbose CoT
- Only **7.6% of the token overhead**
- Substantially lower API cost and latency

### Negative Constraint Priming

Autoregressive models predict the next most probable token. Writing "do not use passive voice" activates passive-voice tokens in the model's latent space — making them statistically **more likely** to appear. Positive Framing rewrites every negative constraint as a positive prescription before the prompt is crafted.

### Least-to-Most Decomposition (Zhou et al., 2022)

On the SCAN compositional generalization benchmark, Least-to-Most prompting improved execution accuracy from **16% to over 99%**. Complex tasks fail not because the model lacks capability, but because it cannot hold all sub-problems in working attention simultaneously. Decomposition resolves this.

### Schema-First Production Standard (2025)

By late 2025, **73% of production LLM applications** use schema-first structured outputs (up from 31% in early 2024). The Output Contract technique injects a precise format specification into every crafted prompt. Groq's `response_format: { type: "json_object" }` enforces this at the API level.

---

## 4. Architecture

PromptCraft is entirely **browser-based with zero backend**. All AI processing goes directly from the user's browser to the Groq API over HTTPS.

```
┌─────────────────────────────────────────────────────┐
│              Browser (React SPA)                     │
│                                                       │
│  ┌──────────┐  ┌────────────┐  ┌─────────────────┐  │
│  │  Input   │  │ Techniques │  │  Result/Compare  │  │
│  │  Page    │  │  Selector  │  │  /Output Pages   │  │
│  └────┬─────┘  └─────┬──────┘  └────────┬────────┘  │
│       └───────────────┴──────────────────┘            │
│                        │                              │
│              Zustand Global Store                     │
│                        │                              │
│         groqClient.js (fetch + retry logic)           │
└────────────────────────┼────────────────────────────┘
                         │ HTTPS
                         ▼
              ┌──────────────────────┐
              │   Groq Cloud API     │
              │  Llama 3.3 70B       │
              │  response_format:    │
              │  { type: "json_object" } │
              └──────────────────────┘
```

### Why This Architecture for the Demo

- **Zero DevOps** — No server to deploy, configure, or maintain
- **Zero cost** — GitHub Pages hosting is free; Groq free tier covers all demo usage
- **Instant shareability** — Push to `main`, GitHub Actions deploys automatically
- **Privacy by default** — No data reaches any server other than Groq's API

### Production Architecture (When Scaling)

A thin FastAPI or Express.js backend is inserted between the browser and Groq, moving the API key out of the browser bundle and adding rate limiting, caching, and user accounts. See [Section 20](#20-scaling-to-production--backend-integration-summary) and `BACKEND_INTEGRATION.docx` for the full migration guide.

---

## 5. Project Structure

```
promptcraft/
│
├── index.html                         ← Vite HTML entry. Loads Inter + JetBrains Mono
│                                        from Google Fonts. Sets dark bg + scrollbar style.
│
├── vite.config.js                     ← base: '/PromptCrafter.AI/' for GitHub Pages sub-path.
│                                        Output to /dist. sourcemap: false.
│
├── package.json                       ← Dependencies: react, react-dom, zustand, xlsx, uuid.
│                                        Scripts: dev, build, preview, deploy (gh-pages).
│
├── .env.example                       ← Documents VITE_GROQ_API_KEY, VITE_GROQ_MODEL,
│                                        VITE_API_BASE_URL.
│
├── .github/
│   └── workflows/
│       └── deploy.yml                 ← Triggers on push to main. Runs:
│                                        checkout → node 24 → npm ci → build → deploy Pages.
│
└── src/
    ├── main.jsx                       ← ReactDOM.createRoot entry. StrictMode.
    │
    ├── App.jsx                        ← Root shell. Contains: STEPS array (5 nav steps),
    │                                    ProgressStepper, Navbar, PageRouter, Footer.
    │                                    Global <style> tag with keyframes + resets.
    │
    ├── api/
    │   ├── groqClient.js              ← GROQ_CONFIG (API_KEY, MODEL, retries, delay).
    │   │                                callGroq() with retry, 429 handling, backoff.
    │   │
    │   └── promptBuilders.js          ← 6 prompt constructors + DOC_PROMPT_MAP dispatcher.
    │
    ├── data/
    │   └── techniques.js             ← TECHNIQUES array (12 objects with full research data).
    │                                    TECHNIQUE_CATEGORIES. getTechniqueById().
    │
    ├── store/
    │   └── useAppStore.js            ← Zustand store. All session state. reset() action.
    │
    └── components/
        ├── ui/
        │   ├── tokens.js             ← Design tokens: colors, font, card, label,
        │   │                           textarea, codeBlock, btn variants, badge(), tag().
        │   │
        │   └── Tooltip.jsx           ← Rich hover tooltip. Smart position (above/below).
        │                               120ms delay. fadeIn animation.
        │
        └── pages/
            ├── InputPage.jsx         ← Hero, textarea, examples, how-it-works grid.
            ├── TechniquesPage.jsx    ← 12-card selector, grouped by category, Groq trigger.
            ├── ResultPage.jsx        ← Issues list, crafted prompt, techniques applied.
            ├── ComparePage.jsx       ← Animated score bars, side-by-side diff.
            └── OutputPage.jsx        ← Doc type selector, generator, copy + download.
```

---

## 6. Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| UI Framework | React | 18.3.1 | Component model, hooks |
| Build Tool | Vite | 5.3.1 | HMR dev server, static build |
| State Management | Zustand | 4.5.4 | Minimal global state |
| AI Provider | Groq API | — | Llama 3.3 70B inference |
| Styling | Inline styles | — | Zero CSS dependencies |
| Export | xlsx | 0.18.5 | XLSX export capability |
| ID Generation | uuid | 10.0.0 | Unique session IDs |
| Fonts | Inter + JetBrains Mono | — | Google Fonts CDN in index.html |
| Hosting | GitHub Pages | — | Free static hosting |
| CI/CD | GitHub Actions | — | Auto-deploy on push to main |
| Deploy Tool | gh-pages | 6.1.1 | Manual deploy script |

### Why Inline Styles Instead of a CSS Framework

Every style in PromptCraft is a plain JavaScript object passed to the `style` prop. This means zero class name collisions, no build-time CSS processing, styles co-located with their components, and full design-token support via `tokens.js`. The app works identically on any deployment environment with no configuration.

### Why Groq Over OpenAI / Anthropic for the Demo

- **Speed** — Groq's LPU hardware delivers ~500 tokens/second, making the demo feel instant
- **Free tier** — 1 million tokens/day on Llama 3.3 70B at no cost, no credit card required
- **JSON mode** — Native `response_format: { type: "json_object" }` support, critical for all prompt builders
- **Model quality** — Llama 3.3 70B matches GPT-4-class instruction-following for structured output tasks

---

## 7. The 12 Prompt Engineering Techniques

All technique data lives in `src/data/techniques.js`. Each object has: `id, name, icon, color, badge, category, shortDesc, fullDesc, significance, effect, tradeoff, mistakeFixed, researchSource`. The full content of every field is shown on hover in the application.

---

### ⚡ 1. Zero-Shot
**Category:** Basic | **Badge:** Foundation | **Color:** `#6366F1`

**What it does:** Sends the task with no examples, relying purely on model pretraining. Establishes a clean task intent and acts as the quality baseline before applying richer techniques.

**Significance:** Without a clear zero-shot framing, no other technique can compensate for an ambiguous task definition. Articulating exactly what you want is the single most impactful prompt action.

**Effect:** Sets clean task intent. Fast, moderate reliability.

**Trade-off:** High variance on complex or domain-specific tasks.

**Research:** Brown et al., GPT-3 (2020)

---

### 🎯 2. Few-Shot
**Category:** Learning | **Badge:** High Impact | **Color:** `#8B5CF6`

**What it does:** Prepends 1–5 high-quality input-output examples before the target query. The model infers the underlying pattern and applies it to new inputs. Example quality matters more than quantity — research shows optimal count is 3–5; beyond that, accuracy degrades due to over-prompting. Example order matters too: placing the most relevant example last can improve performance by up to 40%.

**Significance:** The single most reliable way to teach a model your specific format, tone, or domain convention without fine-tuning. Non-negotiable when you need consistent output shape.

**Effect:** Dramatically improves output format consistency and task accuracy.

**Trade-off:** Uses more tokens. Optimal count is 3–5; more can hurt.

**Research:** Brown et al. (2020); In-Context Learning survey (2023)

---

### 🔗 3. Chain-of-Thought
**Category:** Reasoning | **Badge:** Reasoning Booster | **Color:** `#EC4899`

**What it does:** Instructs the model to generate intermediate reasoning steps before the final answer. Introduced by Wei et al. (Google, 2022) using a 540B parameter model, CoT surpassed fine-tuned baselines on GSM8K with only 8 in-context examples. The mechanism: externalizing reasoning forces the model to allocate attention to logical steps rather than jumping directly to token completion.

**Significance:** Transforms a model from a pattern-matcher into a logical reasoner. On complex tasks, CoT can be the difference between 35% and 95% accuracy. The most well-studied technique in academic literature.

**Effect:** Reduces logical errors. State-of-the-art on math and logic benchmarks.

**Trade-off:** Increases output length and token cost. Counterproductive on simple tasks. Do NOT use on native reasoning models (o1, R1) — they reason silently already.

**Research:** Wei et al., Google Research (2022)

---

### ✏️ 4. Chain-of-Draft
**Category:** Efficiency | **Badge:** Token Saver | **Color:** `#F59E0B`

**What it does:** Instructs the model to generate highly compressed intermediate reasoning steps capped at approximately 5 words per step. Developed by Zoom Communications researchers (2025). Matches CoT accuracy while using only 7.6% of its tokens — a 13× reduction in reasoning overhead.

**Significance:** Makes structured reasoning economically viable at scale. The go-to technique when you need reasoning quality but cannot afford CoT's token overhead in production.

**Effect:** Equivalent accuracy to CoT using ~7.6% of the reasoning tokens.

**Trade-off:** May lose nuance on extremely complex, multi-layered problems.

**Research:** Xu et al., Zoom Research (2025)

---

### 🏷️ 5. XML Delimiters
**Category:** Structure | **Badge:** Structure | **Color:** `#10B981`

**What it does:** Wraps distinct semantic blocks in XML tags (`<task>`, `<context>`, `<query>`, `<output_format>`). Without these boundaries, transformer attention heads struggle to isolate instructions from source data — causing "instruction-to-data confusion" where the model accidentally treats a reference document sentence as a command to execute.

**Significance:** Critical for any prompt with more than one semantic section. LLMs are pretrained heavily on structured markup (HTML, XML, code), making tag-based parsing a natural strength. This is Anthropic's officially recommended structural technique as of 2025.

**Effect:** Eliminates instruction-to-data confusion. Dramatically improves rule-following in complex prompts.

**Trade-off:** Adds a few tokens, but delivers large reliability gains for any prompt with mixed content.

**Research:** Anthropic Prompt Engineering Docs (2025)

---

### 🎭 6. Role & Persona
**Category:** Context | **Badge:** Tone Control | **Color:** `#3B82F6`

**What it does:** Narrows the model's active training distribution toward professional data spaces. Broad personas like "You are an expert" activate wide semantic regions and produce generic outputs. The effective formula is **Domain + Experience Signal + Behavioral Note**: *"You are a senior backend engineer with 10 years of Python experience who writes concise, production-ready code without explanatory comments."*

**Significance:** Without a persona, the model defaults to a helpful-but-generic assistant register. A well-crafted three-part persona shifts the entire output distribution toward expert-level, domain-appropriate language.

**Effect:** Anchors domain vocabulary, tone, and expertise level across the entire response.

**Trade-off:** Does not expand factual knowledge — provide context documents for facts, not just a persona.

**Research:** Prompt Report taxonomy; Anthropic docs (2025)

---

### 📋 7. Output Contract
**Category:** Structure | **Badge:** Reliability | **Color:** `#06B6D4`

**What it does:** Defines the exact schema, format, and constraints the model must produce. Instead of "be concise", write "respond in exactly 3 sentences". Instead of "return JSON", define the full schema with field names and types. Binary, measurable constraints give the model's attention mechanism clear mathematical evaluation triggers.

**Significance:** The difference between a prompt you can run in production and one you cannot. Without an output contract, every response is a guessing game. With it, you get a parseable, predictable artifact every single time. By 2025, 73% of production LLM apps use this pattern.

**Effect:** Guarantees parseable, consistent output format. Enables downstream automation.

**Trade-off:** Requires upfront schema design. Overly rigid schemas can constrain content quality.

**Research:** Systemic Schemas era (2025–2026); OpenAI JSON mode documentation

---

### 📍 8. Position Anchoring
**Category:** Structure | **Badge:** Anti-Pattern Fix | **Color:** `#EF4444`

**What it does:** Restructures the prompt so critical rules are at the absolute start and end — never buried in the middle. Fixes the "Lost-in-the-Middle" phenomenon documented by Liu et al. (2024). Because of causal attention masking and attention sinks, instructions placed in the middle of long prompts are mathematically less competitive for the model's attention budget.

**Significance:** One of the most impactful and least-known structural fixes. If your prompt has rules being ignored, the most likely cause is that they are buried in the middle. Restructuring alone — without changing any content — can dramatically improve instruction-following.

**Effect:** Prevents rules from being ignored in long prompts.

**Trade-off:** Requires restructuring existing prompts. One-time effort with permanent benefit.

**Research:** Liu et al., "Lost in the Middle" (2024); Attention sink research (2025)

---

### ✅ 9. Positive Framing
**Category:** Language | **Badge:** Cognitive Fix | **Color:** `#84CC16`

**What it does:** Rewrites every negative constraint as a positive prescription. "Do not use passive voice" becomes "Write strictly in the active voice". "Don't add unnecessary filler" becomes "Every sentence must carry new information". The reason: mentioning a concept — even negatively — activates those tokens in the model's latent space, making them statistically more likely to appear.

**Significance:** Counter-intuitive but mathematically grounded. The act of saying what you don't want makes it more likely to appear. Rewriting negatives as positives is one of the fastest prompt improvements with zero token cost increase.

**Effect:** Removes accidental token priming. Improves adherence to style and format constraints.

**Trade-off:** Requires rephrasing. Small effort, high and consistent impact.

**Research:** Token priming research; OpenAI and Anthropic best practices documentation

---

### 🪜 10. Least-to-Most
**Category:** Reasoning | **Badge:** Decomposition | **Color:** `#F97316`

**What it does:** First asks the model to decompose a complex problem into simpler sub-problems, then solves them in order, appending each solution as context for the next step. Introduced by Zhou et al. (2022). On the SCAN compositional generalization benchmark, improved execution accuracy from 16% to over 99%.

**Significance:** The go-to technique for tasks that require multi-step reasoning chains. Complex tasks fail not because the model lacks capability, but because it cannot hold all sub-problems in working attention simultaneously. Decomposition resolves this.

**Effect:** Near-perfect accuracy on structured reasoning. Handles complexity that defeats single-pass prompting.

**Trade-off:** Requires multiple logical steps in the prompt. Best for high-stakes or complex tasks.

**Research:** Zhou et al., "Least-to-Most Prompting" (2022); OpenReview ICLR 2023

---

### 🗜️ 11. Context Compression
**Category:** Efficiency | **Badge:** Efficiency | **Color:** `#A855F7`

**What it does:** Strips irrelevant context from the prompt before it reaches the model. The Softmax attention function must distribute weights across every token. Each irrelevant token added to the prompt mathematically reduces the weight on critical instructions — a phenomenon called the Softmax attention bottleneck. Aggressive compression keeps signal-to-noise ratio high.

**Significance:** More context is not always better. Every filler token dilutes the attention weight on tokens that actually matter. Context trimming is often the fastest fix for prompts that are "mostly working" but produce occasional hallucinations.

**Effect:** Higher attention weight on critical instructions. Lower hallucination rate.

**Trade-off:** Requires review of what context is truly necessary vs. filler.

**Research:** Softmax attention bottleneck analysis; Prompt Engineering Evolution (2025)

---

### 🔍 12. Self-Verification
**Category:** Reasoning | **Badge:** Quality Guard | **Color:** `#14B8A6`

**What it does:** Adds a self-evaluation loop to the prompt: (1) analyze constraints, (2) generate draft, (3) evaluate draft for errors and violations, (4) correct and finalize, (5) assign confidence score. Based on Metacognitive Prompting (Wang et al., 2023). Even a single sentence — "Review your response against the requirements above before outputting" — dramatically improves compliance.

**Significance:** The simplest quality gate you can add to any prompt. For critical outputs, self-verification catches the majority of format violations and logical errors before they reach the user — without requiring a second API call.

**Effect:** Catches format violations and logic errors before final output.

**Trade-off:** Adds one extra reasoning pass worth of tokens. Worthwhile for critical or complex outputs.

**Research:** Wang et al., Metacognitive Prompting (2023); MASC (2024)

---

## 8. Common Prompt Mistakes Detected and Fixed

| Mistake | Architectural Root Cause | Consequence | PromptCraft Fix |
|---------|--------------------------|-------------|-----------------|
| **Vague directive** ("be professional") | Missing mathematical evaluation triggers | Model guesses boundaries, produces average text | Binary, measurable constraints |
| **Lost-in-the-Middle placement** | Causal attention masking + attention sinks | Critical rules buried mid-prompt get ignored | Position Anchoring restructure |
| **Delimiter omission** | Unstructured sequence processing | Data text executed as instructions | XML tags around every semantic block |
| **Multi-task cramming** | Attention dilution across objectives | Downstream tasks get dropped | Least-to-Most decomposition |
| **Negative constraints** ("don't use X") | Negative priming activates forbidden tokens | The forbidden pattern appears more | Positive Framing rewrite |
| **Weak persona** ("You are an expert") | Wide semantic activation in latent space | Generic, formulaic output | Domain + Experience + Behavioral Note |
| **No output format** | No schema-first constraint | Format varies per run, hard to parse | Output Contract with explicit schema |
| **Context stuffing** | Softmax SNR drop | Hallucinations; instructions missed | Context Compression |
| **Over-prompting reasoning models** | Manual CoT on models with native reasoning | 20–80% accuracy degradation | Detected and simplified automatically |

---

## 9. Application Pages — Detailed Walkthrough

### Page 1: Input (`InputPage.jsx`)

- **Hero section** with gradient headline, subtitle, and three research-stat badges: "12 Techniques", "7.6% Token Overhead (CoD)", "99% Accuracy on SCAN (LtM)"
- **Large textarea** with dark background and indigo focus border. Placeholder shows example prompts.
- **Live character count** below textarea. Amber warning shown if under 20 characters.
- **Five example prompt chips**: "Write something about productivity", "Help me code a login page", "Make a social media post about our new product", "Summarize this article for me", "Explain machine learning to me" — clicking any chip populates the textarea.
- **"Next: Choose Techniques →"** button validates textarea is non-empty before advancing.
- **"How PromptCraft Works"** five-step grid at the bottom: 01 Paste → 02 Select → 03 Craft → 04 Compare → 05 Export.

---

### Page 2: Techniques (`TechniquesPage.jsx`)

- **Header** with selected count badge and hover reminder.
- **"Select All (12)"** and **"Clear"** buttons.
- **12 technique cards** grouped by category: Basic, Learning, Reasoning, Efficiency, Structure, Context, Language.
- Each card shows: icon (22px), badge, checkbox circle, name, short description, "HOVER FOR RESEARCH DETAILS" micro-label.
- **Selected state**: border glows in technique color, background tinted, checkbox filled.
- **Rich tooltip on hover** shows: name + badge header, full academic description, then SIGNIFICANCE, EFFECT, TRADE-OFF, FIXES, and research citation in styled rows.
- **Bottom action bar** shows the prompt preview (55-char truncate), selected count, Back, and "🚀 Craft My Prompt" buttons.
- **On analyze**: calls `buildCraftPrompt(rawPrompt, selectedTechs)` → `callGroq(messages, 0.1, 4096)` → stores result in Zustand → navigates to Result page.
- Loading message updates during API call: "Applying N technique(s) via Groq..."

---

### Page 3: Result (`ResultPage.jsx`)

- **Header row**: `use_case_tag` badge in green, shortcut buttons to Compare and Output Doc pages.
- **Issues Found panel**: lists every flaw detected in the original prompt. Each issue shows the label, explanation of why it fails at the attention-mechanics level, and a severity badge (HIGH in red / MEDIUM in amber / LOW in green).
- **Crafted Prompt panel**: full monospace code block. Copy button with 2-second "✓ Copied!" feedback. Character count and estimated token count shown below.
- **Techniques Applied grid**: for each technique used, shows name in purple, `how_applied` description, and `impact` tag in green.
- **Quick Preview panel**: side-by-side comparison — original prompt (red text, red border) vs. first 300 chars of crafted prompt (green text, green border) with ellipsis truncation.

---

### Page 4: Compare (`ComparePage.jsx`)

- **Three summary stat cards**: Overall Quality (before → after → delta), Token Efficiency Gain %, Issues Fixed count.
- **Score bars** for Clarity, Specificity, and Structure:
  - Animated using `useEffect` with staggered `setTimeout`: red "before" bar fills at 100ms, indigo gradient "after" bar extends at 450ms.
  - CSS transition uses `cubic-bezier(0.4,0,0.2,1)` for a professional easing feel.
  - Delta badge shows `+N` or `-N` in green or red with matching background tint.
- **Side-by-side text diff**: original prompt in red text with red border, full crafted prompt in green text with green border (scrollable, max-height 260px).
- **Key Improvements list**: numbered, from the AI's `key_improvements` array.
- **"Why These Metrics Matter"** educational panel explaining how each metric connects to attention mechanics.

---

### Page 5: Output Doc (`OutputPage.jsx`)

- **Crafted prompt preview** at top with a gradient fade mask.
- **Document type selector**: five button cards — README.md, Video Script, SOP Document, Email, Blog Post — each with icon, label, description, and dynamic context hint.
- **Context textarea** with hint that changes per doc type:
  - README: "Add: project name, tech stack, target audience"
  - Script: "Add: channel name, target length, tone"
  - SOP: "Add: department, tool names, compliance requirements"
  - Email: "Add: recipient role, relationship, desired outcome"
  - Blog: "Add: target reader, publication, SEO keyword"
- **Generate button** calls `DOC_PROMPT_MAP[docType](craftedPrompt, docContext)` → `callGroq(messages, 0.4, 3000)`.
- **Generated document** displayed in a scrollable monospace block with character count and token estimate.
- **Copy button**: copies raw text to clipboard.
- **Download button**: creates a `Blob`, triggers `<a>` download click, revokes the object URL. Filename auto-generated from `docOutput.title` + extension (`.md` for readme/blog, `.txt` for others).
- **"Start New Prompt"** button calls `useAppStore.getState().reset()` to wipe all state.

---

## 10. Groq API Integration

**File:** `src/api/groqClient.js`

### Configuration

```js
export const GROQ_CONFIG = {
  API_KEY: 'YOUR_GROQ_API_KEY_HERE',  // ← Replace with your key from console.groq.com
  MODEL: 'llama-3.3-70b-versatile',
  MAX_RETRIES: 3,
  BASE_DELAY_MS: 1000,
}
```

### The `callGroq` Function

```js
export async function callGroq(messages, temperature = 0.1, maxTokens = 4096)
```

| Parameter | Default | Used For |
|-----------|---------|----------|
| `messages` | required | OpenAI-format `[{ role, content }]` array |
| `temperature` | `0.1` | Structured outputs (craft, analysis) |
| `temperature` | `0.4` | Creative documents (script, blog, email) |
| `maxTokens` | `4096` | Prompt crafting |
| `maxTokens` | `3000` | Document generation |

**Retry logic:**
- Loops up to `MAX_RETRIES` (3) attempts
- HTTP 429 (rate limit): reads `retry-after` header, waits `(retryAfter + attempt) * 1000ms`
- Other errors: exponential backoff `BASE_DELAY_MS * 2^attempt` + random jitter (0–500ms)
- After all retries: throws the last captured error with a descriptive message

**Response handling:**
- Always sends `response_format: { type: 'json_object' }` — forces valid JSON every time
- Parses `data.choices[0].message.content` as JSON
- Throws with descriptive message if response is empty or JSON parse fails

---

## 11. Prompt Builders — The 6 Constructors

**File:** `src/api/promptBuilders.js`

All 6 builders follow the **Standardized Context Architecture**:

```
[System Rules + Role] → [Task Instructions] → [Context (XML)] → [Query (XML)] → [Output Contract]
```

Design principles applied in every builder:
1. Position Anchoring — critical instructions at START and END of system message
2. XML Delimiters — every data block in `<tags>`
3. Positive Framing — zero negative constraints
4. Output Contract — exact JSON schema with all field names in system message
5. `response_format: json_object` enforced at API level

### `buildCraftPrompt(rawPrompt, selectedTechniques)`

System role: world-class prompt engineering expert. Full 7-field JSON output schema in system message. User message uses `<task>`, `<raw_prompt>`, `<techniques_to_apply>`, `<output_requirements>` blocks.

**Returns:**
```json
{
  "original_issues": [{ "issue", "explanation", "severity" }],
  "crafted_prompt": "complete ready-to-use prompt string",
  "techniques_applied": [{ "technique", "how_applied", "impact" }],
  "comparison": { "clarity_before/after", "specificity_before/after", "structure_before/after", "token_efficiency_gain_pct", "key_improvements" },
  "use_case_tag": "string"
}
```

### `buildReadmePrompt(craftedPrompt, context)`
Role: senior technical writer. Output: Title, Overview, Features, Installation, Usage with code examples, Configuration, Contributing, License.

### `buildScriptPrompt(craftedPrompt, context)`
Role: professional video creator. Output: Hook (0–30s), Introduction, 3–5 content sections with talking points and transitions, CTA, Outro.

### `buildSOPPrompt(craftedPrompt, context)`
Role: business process analyst. Output: Purpose, Scope, Roles, Prerequisites, numbered Procedure, Quality Checks, Troubleshooting, Document Control.

### `buildEmailPrompt(craftedPrompt, context)`
Role: executive communication specialist. Output: Subject line, greeting, 2–3 body paragraphs, CTA, professional signature.

### `buildBlogPrompt(craftedPrompt, context)`
Role: professional content writer. Output: SEO headline, hook intro, 4–5 sections with subheadings, practical takeaways, CTA conclusion.

### `DOC_PROMPT_MAP`

```js
export const DOC_PROMPT_MAP = {
  readme: buildReadmePrompt,
  script: buildScriptPrompt,
  sop:    buildSOPPrompt,
  email:  buildEmailPrompt,
  blog:   buildBlogPrompt,
}
```

All doc builders return: `{ "title": "string", "content": "string with \n for newlines" }`

---

## 12. State Management

**File:** `src/store/useAppStore.js`

Zustand store — single source of truth for the entire session. All state is ephemeral: page refresh clears everything.

### State Shape

```js
{
  // Navigation
  page: 'input',           // 'input' | 'techniques' | 'result' | 'compare' | 'output'

  // Input
  rawPrompt: '',

  // Technique selection
  selectedIds: [],          // array of technique id strings

  // AI result
  result: null,             // full parsed JSON from buildCraftPrompt call

  // Processing
  loading: false,
  loadingMsg: '',

  // Error
  error: '',

  // Output document
  docType: 'readme',        // 'readme' | 'script' | 'sop' | 'email' | 'blog'
  docContext: '',
  docOutput: null,          // { title, content } from doc builder call
  docLoading: false,
}
```

### Actions

| Action | Signature | Effect |
|--------|-----------|--------|
| `setPage` | `(page)` | Navigate to a page |
| `setRawPrompt` | `(text)` | Update textarea value |
| `toggleTechnique` | `(id)` | Add or remove from selectedIds |
| `selectAll` | `(allIds)` | Set selectedIds to every technique |
| `clearSelection` | `()` | Empty selectedIds |
| `setResult` | `(result)` | Store crafted prompt AI response |
| `setLoading` | `(bool, msg?)` | Toggle loading state with optional message |
| `setError` | `(msg)` | Set error message |
| `clearError` | `()` | Clear error |
| `setDocType` | `(type)` | Change selected document type |
| `setDocContext` | `(text)` | Update context field |
| `setDocOutput` | `(output)` | Store generated document |
| `setDocLoading` | `(bool)` | Toggle document generation loading |
| `reset` | `()` | Wipe entire store back to initial state |

---

## 13. Design System

**File:** `src/components/ui/tokens.js`

No external CSS framework. All visual styling uses a consistent token system of plain JavaScript objects.

### Color Palette

```js
colors = {
  bg:          'var(--color-bg)',
  surface:     'var(--color-surface)',
  surfaceAlt:  'var(--color-surface-alt)',
  border:      'var(--color-border)',
  borderHover: 'var(--color-border-hover)',
  primary:     'var(--color-primary)',
  primaryLight:'var(--color-primary-light)',
  text:        'var(--color-text)',
  textMuted:   'var(--color-text-muted)',
  textFaint:   'var(--color-text-faint)',
  green:       'var(--color-green)',
  red:         'var(--color-red)',
  amber:       'var(--color-amber)',
  cyan:        'var(--color-cyan)',
}
```

### Typography

```js
font = {
  sans: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", "Inter", sans-serif',
  mono: '"SF Mono", ui-monospace, "JetBrains Mono", monospace',
}
```

### Reusable Style Objects

| Token | Purpose |
|-------|---------|
| `card` | Surface bg, indigo border, 16px radius, 24px padding |
| `label` | 11px, uppercase, 700 weight, 0.1em letter-spacing |
| `textarea` | Dark bg, indigo border with focus transition |
| `codeBlock` | Dark bg, mono font, cyan text, pre-wrap |
| `btn.primary` | Indigo-to-purple gradient, white text |
| `btn.ghost` | Transparent + indigo border, light purple text |
| `btn.secondary` | surfaceAlt background, muted text |
| `btn.sm` | Compact ghost style for inline actions |

### Helper Functions

- `badge(color)` — returns inline-block style with color-tinted background, border, uppercase text
- `tag(color)` — returns flex pill style with color-tinted background for status tags

### Tooltip Component (`Tooltip.jsx`)

Props: `children`, `content` (any React node), `width` (default 280px)

- 120ms show delay via `setTimeout` — prevents accidental triggers on quick mouse-overs
- Smart positioning: checks `getBoundingClientRect().top` on show — if element is within 260px of the viewport top, tooltip renders below instead of above
- Arrow pointer direction flips to match position
- `fadeIn` CSS keyframe animation (0.12s ease)
- Background `#0B1220`, border `rgba(99,102,241,0.25)`, box shadow `0 12px 40px rgba(0,0,0,0.5)`

---

## 14. Getting Started — Local Development

### Prerequisites

- **Node.js 20+** — [nodejs.org](https://nodejs.org)
- **Groq API Key** — Free from [console.groq.com](https://console.groq.com) (no credit card required)

### Step 1: Clone and Install

```bash
git clone https://github.com/Piyush-Patole/PromptCrafter.AI.git
cd PromptCrafter.AI
npm install
```

### Step 2: Add Your Groq API Key

Open `.env` in the root folder and add your key:

```env
VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Step 3: Start the Dev Server

```bash
npm run dev
# Open: http://localhost:5173/PromptCrafter.AI/
```

### Step 4: Build for Production

```bash
npm run build
# Output goes to /dist
```

### Step 5: Preview Production Build Locally

```bash
npm run preview
# Opens: http://localhost:4173/PromptCrafter.AI/
```

---

## 15. Deploying to GitHub Pages

### One-Time Setup

1. Push the repo to GitHub
2. Go to **Settings → Pages**
3. Under **Source**, select **GitHub Actions**
4. Save

### Automatic Deploy (Recommended)

Every push to `main` triggers the GitHub Actions workflow which builds and deploys automatically. Your live URL will be:

```
https://Piyush-Patole.github.io/PromptCrafter.AI/
```

### Critical: Vite Base Path

`vite.config.js` sets `base: '/PromptCrafter.AI/'` to match the GitHub repository sub-path. If your repository is named differently, update this value:

```js
export default defineConfig({
  base: '/your-repo-name/',  // ← Must match your GitHub repo name exactly
  ...
})
```

---

## 16. GitHub Actions CI/CD

**File:** `.github/workflows/deploy.yml`

```yaml
name: Deploy static content to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Create Env file
        run: |
          echo "VITE_GROQ_API_KEY=${{ secrets.VITE_GROQ_API_KEY }}" > .env

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4
        with:
          enablement: true

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 17. Environment Variables

**File:** `.env`

```bash
# Groq API Key — free from https://console.groq.com (no credit card required)
VITE_GROQ_API_KEY=your_groq_api_key_here
```

> **GitHub Pages note:** Vite env vars prefixed with `VITE_` are embedded at build time into the JS bundle. For production with a secret API key, add `VITE_GROQ_API_KEY` as a GitHub Actions repository secret so it is never committed to the repo.

---

## 18. Groq Free Tier — Usage Estimates

| Action | Input Tokens | Output Tokens | Total |
|--------|-------------|--------------|-------|
| Craft a prompt (3 techniques) | ~400 | ~800 | ~1,200 |
| Craft a prompt (all 12 techniques) | ~600 | ~1,200 | ~1,800 |
| Generate README | ~300 | ~700 | ~1,000 |
| Generate video script | ~300 | ~900 | ~1,200 |
| Generate SOP / email / blog | ~300 | ~600–900 | ~900–1,200 |
| **Full demo session (10 prompts + 5 docs)** | ~6,000 | ~12,000 | **~18,000** |

**Groq free tier limits (Llama 3.3 70B):**
- 30 requests/minute
- 6,000 tokens/minute
- 1,000,000 tokens/day

A full demo session uses approximately 18,000 tokens — less than 2% of the daily free tier. The retry logic in `groqClient.js` handles the 30 requests/minute limit automatically with exponential backoff if it is ever hit.

---

## 19. Data Privacy

PromptCraft is designed with privacy as a default at every level:

- **No server receives your prompts** — The only external service that receives prompt data is Groq's API over HTTPS
- **No logging** — PromptCraft has no analytics, telemetry, error tracking, or logging infrastructure whatsoever
- **No persistence** — All data lives in React state (Zustand store). Refreshing the page destroys everything permanently
- **No cookies** — No tracking cookies, no session cookies, no localStorage writes
- **API key handling** — The Groq key is stored as a JavaScript constant for the demo. It is never sent to any server other than Groq's API. For production, move it to a backend
- **Session isolation** — Each browser tab/session is completely independent

Users should be aware that prompts submitted are processed by Groq's API and are subject to [Groq's privacy policy](https://groq.com/privacy-policy/).

---

## 20. Scaling to Production — Backend Integration Summary

The demo architecture works well for client presentations but has three limitations at scale: the API key is visible in the browser bundle, there is no rate limiting or cost control per user, and there is no prompt history or sharing functionality.

### What Changes

A thin Express.js or FastAPI backend is inserted between the browser and Groq:

```
Browser  →  Your Backend  →  Groq API
```

The only frontend code change is **one line** in `src/api/groqClient.js`:

```js
// Demo (direct call):
const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
  headers: { Authorization: `Bearer ${GROQ_CONFIG.API_KEY}` }, ...
})

// Production (via backend):
const res = await fetch(`/api/craft`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(groqPayload)
})
```

The `GROQ_API_KEY` constant is removed from the frontend and moved to the backend environment variables.

---

## 21. Roadmap

- **Authentication & History:** Enable users to log in, save their engineered prompts, and share them via unique links.
- **Custom Templates:** Allow users to define their own output schemas for document generation.
- **Model Agnostic Switcher:** Support Anthropic Claude 3.5 Sonnet and OpenAI GPT-4o configurations.
- **Enterprise Team Spaces:** Shared prompt libraries for enterprise engineering teams.

---

## 22. Research References

- Anthropic. (2025). *Prompt Engineering Interactive Tutorial*.
- Brown, T., et al. (2020). *Language Models are Few-Shot Learners*. NeurIPS.
- Liu, N. F., et al. (2024). *Lost in the Middle: How Language Models Use Long Contexts*. TACL.
- Schulhoff, S., et al. (2024). *The Prompt Report: A Systematic Survey of Prompting Techniques*.
- Wang, X., et al. (2023). *Self-Consistency Improves Chain of Thought Reasoning in Language Models*. ICLR.
- Wei, J., et al. (2022). *Chain-of-Thought Prompting Elicits Reasoning in Large Language Models*. NeurIPS.
- Xu, Z., et al. (2025). *Chain-of-Draft: Thinking Faster by Writing Less*. arXiv:2502.12226.
- Zhou, D., et al. (2022). *Least-to-Most Prompting Enables Complex Reasoning in Large Language Models*. ICLR.

---

> Crafted with ❤️ by [Piyush Patole](https://www.linkedin.com/in/piyushpatole7/)
