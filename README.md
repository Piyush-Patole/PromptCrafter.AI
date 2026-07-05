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
  
</div>

---

## 📖 The Problem This Solves

Most people write prompts the way they write a text message — casual, vague, and full of unstated assumptions. The result is generic AI output that requires constant back-and-forth iteration.

The research is unambiguous: **the quality of a prompt determines the quality of output far more than the choice of AI model.** Prompt engineering is a rigorous discipline grounded in how transformer attention mechanisms actually work at the mathematical level.

**PromptCraft bridges the gap.** It takes any raw, messy prompt, runs it through a high-speed AI analysis layer, applies your chosen academic engineering techniques, and delivers a production-ready prompt back — along with a full diagnostic report covering what was wrong and exactly how it was fixed. Users do not need to learn prompt engineering. They just need PromptCraft.

---

## ✨ Core Features & Application Flow

1. **Input Phase:** Users paste any raw, vague prompt.
2. **Technique Selection:** Users select from 12 research-backed technique cards (like *Chain-of-Thought*, *System 2 Attention*, or *Meta-Prompting*). Hovering over any card reveals the academic theory, significance, and trade-offs of the technique.
3. **AI Diagnostics & Engineering:** The application analyzes the original prompt, identifies engineering failures (with severity levels), and generates a fully crafted prompt. It provides a breakdown of which techniques were applied and how they fixed the underlying attention mechanics.
4. **Compare & Contrast (Diff View):** Animated quality score bars show before vs. after metrics across Clarity, Specificity, and Structure. A side-by-side text diff reveals the exact structural improvements.
5. **Output Generation:** Users can instantly generate a final document (README, video script, SOP, email, or blog post) using their newly engineered prompt.

---

## 🧠 Research Foundation

PromptCraft is built directly on peer-reviewed research. Every design decision traces back to a specific academic finding:

- **The Lost-in-the-Middle Effect (Liu et al., 2024):** Transformer models exhibit a U-shaped attention curve, often ignoring instructions buried in the middle of a prompt due to causal attention masking. PromptCraft utilizes *Position Anchoring* to restructure prompts, placing critical rules at the absolute start and end.
- **Softmax Attention Bottleneck:** "Context stuffing" mathematically reduces the weight assigned to critical instructions, increasing hallucination risk. PromptCraft uses *Context Compression* to strip noise and maintain a high signal-to-noise ratio.
- **Negative Constraint Priming:** Telling a model "what not to do" activates forbidden tokens in its latent space. PromptCraft utilizes *Positive Framing* to rewrite negative constraints into positive prescriptions.
- **Least-to-Most Decomposition (Zhou et al., 2022):** Complex tasks often fail because models cannot hold all sub-problems in working memory simultaneously. PromptCraft injects decomposition frameworks to break complex queries into sequential steps.

---

## 🏗️ Technical Architecture & Design Decisions

PromptCraft is designed as a highly optimized, **serverless Single Page Application (SPA)**. All AI processing goes directly from the user's browser to the Groq API over HTTPS, ensuring maximum privacy and zero DevOps overhead for the demo.

### High-Level Flow
- **Frontend Layer:** React 18 and Vite provide a lightning-fast, modular interface.
- **State Management:** Zustand is used as a lightweight, centralized store for all session state, keeping component logic decoupled and clean.
- **Inference Engine:** The application communicates securely with the Groq API (powered by Llama 3.3 70B), utilizing structured JSON outputs (`response_format: { type: "json_object" }`) to guarantee parseable, consistent data structures for the diagnostic reports.
- **Resilience:** The API integration features exponential backoff, rate-limit handling (HTTP 429), and retry logic to ensure a seamless user experience even under heavy load.

### UI/UX Engineering
- **Zero CSS Frameworks:** Built entirely using native inline CSS objects and CSS variables. This ensures zero class-name collisions and eliminates bloated build-time CSS processors.
- **Design Tokens:** A custom `tokens.js` design system manages colors, typography, and component states, ensuring absolute visual consistency across the app.
- **Aesthetic Focus:** Inspired by premium IDEs, the interface uses an ambient off-white background, pristine white cards, soft drop shadows, and a live-animated "muted-pop" RGB gradient to command attention. It utilizes Apple's native SF Pro font stack with WebKit antialiasing for a crisp reading experience.

---

## 🚀 The 12 Prompt Engineering Techniques Included

1. **Zero-Shot:** Establishes a clean task intent without examples.
2. **Few-Shot:** Prepends high-quality input-output examples to teach domain conventions.
3. **Chain-of-Thought (CoT):** Forces the model to generate intermediate reasoning steps, transforming it from a pattern-matcher into a logical reasoner.
4. **Chain-of-Draft:** Matches CoT accuracy while using only 7.6% of its tokens — a 13× reduction in reasoning overhead.
5. **XML Delimiters:** Wraps distinct semantic blocks in tags to eliminate instruction-to-data confusion.
6. **Role & Persona:** Narrows the model's active training distribution toward professional data spaces (Domain + Experience Signal + Behavioral Note).
7. **Output Contract:** Defines the exact schema, format, and constraints the model must produce.
8. **Position Anchoring:** Restructures the prompt so critical rules are at the absolute start and end.
9. **Positive Framing:** Rewrites negative constraints as positive prescriptions to remove accidental token priming.
10. **Least-to-Most:** Decomposes complex problems into simpler sub-problems solved in sequential order.
11. **Context Compression:** Strips irrelevant context to overcome the Softmax attention bottleneck.
12. **Self-Verification:** Adds a metacognitive evaluation loop to catch format violations and logic errors before final output.

---

## 🌐 CI/CD & Deployment

This project features a fully automated **GitHub Actions** CI/CD pipeline. Every push to the `main` branch triggers a workflow that:
1. Provisions an Ubuntu runner and sets up Node.js.
2. Performs a clean install of dependencies.
3. Injects environment variables securely using GitHub Secrets.
4. Compiles the Vite React application into static, optimized assets.
5. Deploys the bundle directly to **GitHub Pages**.

---

## 💻 Getting Started (Local Development)

If you'd like to run this project locally to explore the architecture:

1. **Clone the repository**
   ```bash
   git clone https://github.com/Piyush-Patole/PromptCrafter.AI.git
   cd PromptCrafter.AI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory and add your free Groq API key:
   ```env
   VITE_GROQ_API_KEY=gsk_your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

---

> Designed & Engineered by [Piyush Patole](https://www.linkedin.com/in/piyushpatole7/)
