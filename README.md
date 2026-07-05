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

## 📖 The Problem This Solves

Writing great AI prompts is difficult and time-consuming. Most users rely on vague, zero-shot instructions and simply "hope for the best," which frequently leads to AI hallucinations, lazy outputs, missed constraints, and inconsistent formatting. 

Over the last few years, AI researchers have published dozens of academic papers proving that specific framing techniques (like **Chain of Thought**, **Few-Shot Prompting**, and **System 2 Attention**) mathematically force Large Language Models into higher accuracy states, reducing errors by up to 99% in complex reasoning tasks. 

**PromptCraft** takes those dense academic papers and turns them into a beautiful, one-click studio. You provide the raw idea, select a technique, and the studio engineers a mathematically optimal prompt for you.

## ✨ Core Features & Functionality

- **12 Research-Backed Techniques**: Apply academically proven framing methods to your prompts instantly. Supported techniques include:
  - *Chain of Thought (CoT)*
  - *Few-Shot Prompting*
  - *System 2 Attention (S2A)*
  - *Role Prompting*
  - *Meta-Prompting*
  - *Zero-Shot CoT*
  - ...and more.
- **Zero Backend Architecture**: The entire application runs natively in your browser. All state is managed locally via **Zustand**, and AI inference calls are made directly to the **Groq API** SDK securely from the client side.
- **Instant Comparisons (Diff View)**: View your original prompt side-by-side with the engineered prompt. PromptCraft provides token overhead estimations and predicted accuracy improvements (e.g., *+7.6% Token Overhead*, *99% Accuracy on SCAN*).
- **Premium UI / UX**: 
  - **Zero CSS Frameworks**: Built entirely using native inline CSS objects and CSS variables.
  - **Native iOS Typography**: Utilizes Apple's native SF Pro font stack with WebKit antialiasing for an incredibly sharp, crisp reading experience.
  - **Aesthetic Design**: Inspired by premium IDEs, featuring ambient off-white backgrounds, pristine white cards, soft drop shadows, and a unique, live-animated "muted-pop" RGB gradient that commands attention.

## 🛠️ The Technology Stack

- **Frontend Framework**: React 18
- **Build Tool / Bundler**: Vite
- **Global State Management**: Zustand
- **AI Inference Engine**: Groq API (Powered by `llama-3.3-70b-versatile`)
- **Styling**: Native CSS Variables & React Inline Objects
- **CI/CD & Hosting**: GitHub Actions & GitHub Pages

---

## 🚀 Local Development Setup

If you'd like to run this project locally on your machine, follow these steps:

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
   Create a `.env` file in the root directory. You will need a free API key from Groq.
   ```env
   VITE_GROQ_API_KEY=gsk_your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173/PromptCrafter.AI/`.

---

## 🌐 Deployment & CI/CD Pipeline

This project is configured with a fully automated **GitHub Actions** CI/CD pipeline. Every push to the `main` branch triggers a workflow that:
1. Installs Node dependencies.
2. Injects the Groq API Key dynamically during the build process using GitHub Secrets.
3. Compiles the Vite React application into static assets.
4. Deploys the optimized bundle directly to **GitHub Pages**.

### Setting up the Deployment Secrets
If you fork this repository, you must add your own Groq API key to GitHub Secrets for the automated deployment to succeed:
1. Go to your repository on GitHub.
2. Navigate to **Settings** > **Secrets and variables** > **Actions**.
3. Click **New repository secret**.
4. Set the name exactly to `VITE_GROQ_API_KEY` and paste your Groq API key as the value.
5. Push to the `main` branch (or run the workflow manually) to trigger the deployment.

---

> Crafted with ❤️ by [Piyush Patole](https://www.linkedin.com/in/piyushpatole7/)
