# PromptCraft ✦
### AI-Powered Prompt Engineering Studio

> Transform any raw, vague, or broken prompt into a precision-engineered instruction using 12 research-backed techniques — entirely in the browser, zero backend required.

[![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages-181717?logo=github)](https://pages.github.com/)
[![Groq](https://img.shields.io/badge/AI-Groq%20%C2%B7%20Llama%203.3%2070B-FF6B35)](https://console.groq.com)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?logo=vite)](https://vitejs.dev)
[![Zustand](https://img.shields.io/badge/State-Zustand-orange)](https://github.com/pmndrs/zustand)
[![License](https://img.shields.io/badge/License-MIT-22C55E)](LICENSE)

---

## 📖 The Problem This Solves

Writing great AI prompts is hard. Most users rely on vague, zero-shot instructions and hope for the best, leading to hallucinations, lazy outputs, and inconsistent formatting.

Researchers have published dozens of papers proving that specific framing techniques (like Chain of Thought, Few-Shot, and System 2 Attention) mathematically force Large Language Models into higher accuracy states. **PromptCraft** takes those academic papers and turns them into a one-click studio.

## ✨ Features

- **12 Research-Backed Techniques**: Apply academically proven framing methods to your prompts.
- **Zero Backend**: All state is managed locally via Zustand. API calls run securely through the Groq SDK directly in your browser.
- **Native iOS Typography**: Uses Apple's native SF Pro fonts with beautiful antialiasing and glassmorphism.
- **Aesthetic Muted-Pop Gradients**: Ambient, vibrant themes that command attention.
- **Instant Comparisons**: See side-by-side token counts and score improvements of your engineered prompt versus your original raw prompt.

## 🛠️ The Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **State Management**: Zustand
- **AI Inference Engine**: Groq API (Llama 3.3 70B Versatile)
- **Styling**: Native CSS Variables & Inline Objects (Zero CSS Frameworks)

## 🚀 Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/Piyush-Patole/PromptCrafter.AI.git
   cd PromptCrafter.AI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your Environment Variables**
   Create a `.env` file in the root directory and add your Groq API Key:
   ```env
   VITE_GROQ_API_KEY=gsk_your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🌐 Deploying to GitHub Pages

This project is configured to deploy automatically to GitHub pages via GitHub Actions.
To ensure the automated deployment succeeds, you must securely add your Groq API key to GitHub Secrets.

1. Go to your repository on GitHub.
2. Navigate to **Settings** > **Secrets and variables** > **Actions**.
3. Click **New repository secret**.
4. Set the name to `VITE_GROQ_API_KEY` and paste your Groq API key as the value.
5. Push to the `main` branch to trigger the deployment.

---

> Crafted with ❤️ by [Piyush Patole](https://www.linkedin.com/in/piyushpatole7/)
