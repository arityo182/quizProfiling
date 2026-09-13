# 🧠 Person Profiling Test — Multi-Track Assessment System

[![Live on Vercel](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://quizprofil.vercel.app/)
[![VPS Portal](https://img.shields.io/badge/VPS%20Portal-100.54.37.153-blue?style=for-the-badge&logo=nginx)](http://100.54.37.153/)
[![Built with React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

A modern, psychometric and workplace behavioral profiling web application built with **React 18**, **TypeScript**, **Vite**, and **Chart.js**. Features **300 calibrated questions** across two specialized assessment tracks, multi-dimensional scoring, radar chart visualizations, built-in honesty/trap audits, and an interactive **Answer Explanation & Review** system.

---

## 🌐 Live Access

| Deployment | URL | Description |
|---|---|---|
| **Vercel Production** | [https://quizprofil.vercel.app/](https://quizprofil.vercel.app/) | Primary cloud production deployment |
| **VPS Gateway** | [http://100.54.37.153/](http://100.54.37.153/) | Listed as App #4 on Private VPS Portal |

---

## 🎯 Assessment Tracks

The application features a selection **Landing Page** allowing candidates or evaluators to choose their track:

```
┌─────────────────────────────────────────────────────────────┐
│                 Person Profiling Test                       │
│                                                             │
│  Choose your test track:                                    │
│                                                             │
│  [🖥️ Java Developer Test]                                   │
│  Specifically for software developers & tech leads          │
│                                                             │
│  [👔 General Professional Test]                             │
│  Suitable for any job position & business role              │
└─────────────────────────────────────────────────────────────┘
```

### 1. 🖥️ Java Developer Test (`150 Questions`)
Designed specifically for backend engineers, software craftsmen, and technical leads.
- **Context**: Clean architecture, TDD, JVM memory leaks & concurrency, PR review etiquette, technical debt stewardship, and distributed systems.
- **5 Developer Personas**:
  - 🏗️ **"The Architect"**: System design, modularity, clean architecture, enterprise domain boundaries.
  - 🐛 **"The Debugger"**: Root-cause analysis, JVM internals, memory profiling, heap & thread dump diagnostics.
  - 🤝 **"The Collaborator"**: Team-first culture, empathetic code review mentorship, agile psychological safety.
  - 🚀 **"The Executor"**: High velocity, pragmatic tradeoffs, action-oriented milestone delivery.
  - 📚 **"The Learner"**: Continuous upskilling, Virtual Threads, modern JDK language evolution.

### 2. 👔 General Professional Test (`150 Questions`)
Designed for versatile talent across operations, project management, marketing, product, finance, and leadership.
- **Context**: Cross-functional alignment, shifting priorities, empathetic conflict resolution, ethical decisions, and change management.
- **5 Professional Personas**:
  - 🏗️ **"The Strategist"**: Big-picture planner, goal-oriented visionary, cross-departmental roadmap alignment.
  - 🔍 **"The Analyst"**: Detail-oriented, evidence-based thinker, data integrity, and quantitative problem solving.
  - 🤝 **"The Collaborator"**: Relationship builder, active listener, inclusive team catalyst, and mediator.
  - 🚀 **"The Executor"**: Action-oriented discipline, operational reliability, deadline execution on time.
  - 💡 **"The Innovator"**: Creative problem solver, adaptable to change, curious, and champion of iterative experiments.

---

## 📊 Test Structure & Methodology

Each test contains **150 structured questions** divided into 4 calibrated sections:

| Section | Questions | Format | Description & Shortcuts |
|---|---|---|---|
| **1. Likert Scale** | 60 | Scale 1 to 5 | Evaluates philosophy, self-awareness, and work habits (`Keys 1–5`) |
| **2. Forced Choice** | 40 | A / B Tradeoffs | Resolves real-world dilemmas (Quality vs Speed, Solo vs Team, etc.) (`Keys A/B`) |
| **3. Situational Judgement (SJT)** | 30 | 4 Scenario Options | Navigates high-stakes workplace incidents and conflict (`Keys A–D`) |
| **4. Motivation & Values** | 20 | 4 Career Drivers | Uncovers intrinsic career motivations and leadership style (`Keys A–D`) |

### Category Weights
- **Personality & Character** (25% share &bull; weight: `1.0`)
- **Work Style & Productivity** (25% share &bull; weight: `1.0`)
- **Teamwork & Communication** (20% share &bull; weight: `0.9`)
- **Problem Solving & Analytical Thinking** (15% share &bull; weight: `1.2`)
- **Motivation & Work Values** (15% share &bull; weight: `0.9`)

### 🛡️ Psychometric Integrity & Traps
- **Overconfidence Traps**: Identifies extreme infallibility claims (e.g. *"I never make mistakes"*).
- **Social Desirability Traps**: Identifies artificial perfectionism (e.g. *"I never feel stressed or frustrated"*).
- **Paraphrase Consistency Pairs**: Cross-calibrated statement pairs that detect contradictory answering patterns.
- **Honesty & Consistency Audit**: Computes calibration adjustments for transparent scoring.

---

## 📖 Answer Explanation & Review System

After viewing the profiling report, users can click **[📖 Review My Answers & Explanations]** to access a complete breakdown of all 150 questions:

- 🔵 **User's Selected Answer**: Clear indicator of what the candidate chose.
- 🟢 **Ideal Benchmark Answer**: The preferred response aligned with high-performance organizational standards.
- **Match Status**: `✅ Great answer!` vs `⚠️ Here's a better approach`.
- **Explanation Panel**:
  - **✅ Why this is the ideal answer**: 2–3 sentence explanation from HR and leadership perspectives.
  - **❌ Scale & Option Analysis**: Detailed workplace consequences of each choice (A, B, C, D or 1–5 ratings).
  - **💡 HR & Leadership Insight**: Strategic reasoning behind the evaluation.
- **Interactive Controls**:
  - Filter by status: `[All]`, `[Great Answers]`, `[Needs Improvement]`.
  - Filter by section (1 to 4) and category pills.
  - Instant search bar (searches questions, options, scenarios, and IDs).
  - Progress summary: *"You answered X/150 ideally (XX%)"*.
  - Actionable takeaways and growth recommendations.
  - Print / Save Review as PDF.

---

## 💻 Tech Stack & Architecture

- **Frontend Framework**: React 18 (Functional Components, Hooks, Context-free reactive state)
- **Language**: TypeScript 5 (Strict Mode, 100% typed question banks & scoring models)
- **Bundler & Dev Server**: Vite 6 (HMR in milliseconds, optimized production chunks)
- **Data Visualizations**: Chart.js (Interactive 5-axis Radar Chart, progress bars)
- **Styling**: Pure CSS3 with modern CSS Variables, dark/light contrast, fluid responsiveness, and `@media print` print styling

---

## 📁 Project Structure

```
TestProfiling/
├── index.html                       # Vite HTML entry point
├── package.json                     # Dependencies & scripts
├── tsconfig.json                    # TypeScript compiler configuration
├── tsconfig.node.json               # TypeScript config for Vite
├── vite.config.ts                   # Vite configuration
├── README.md                        # Documentation
├── src/
│   ├── main.tsx                     # React DOM entry point
│   ├── App.tsx                      # Root state machine (Landing -> Intro -> Test -> Results -> Review)
│   ├── App.css                      # Master design system & component styles
│   ├── types.ts                     # TypeScript data contracts & interfaces
│   ├── data/
│   │   ├── questions.ts             # 150 Java Developer questions dataset
│   │   ├── generalQuestions.ts      # 150 General Professional questions dataset
│   │   └── explanations.ts          # 300 complete question explanations dataset
│   ├── utils/
│   │   └── scoring.ts               # Scoring algorithm, consistency checks & persona calculation
│   └── components/
│       ├── Header.tsx               # Sticky header with timer, test badges & demo menu
│       ├── LandingPageView.tsx      # Initial track selection screen (Java vs General)
│       ├── IntroView.tsx            # Test setup, timer selection (90/120m) & instructions
│       ├── TestView.tsx             # Interactive question card with keyboard shortcuts
│       ├── ResultsView.tsx          # Verdict, radar chart, sliders & persona report
│       ├── ReviewView.tsx           # Full 150-question explanation & answer review
│       ├── QuestionPaletteModal.tsx # Jump-to-question navigation grid
│       └── SubmitWarningModal.tsx   # Unanswered questions confirmation dialog
```

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- **Node.js** (v18 or higher, tested on Node v24)
- **npm** (v9 or higher)

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/arie/TestProfiling.git
cd TestProfiling
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or the port indicated in terminal).

### 4. Build for Production
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` directory ready to be served by Vercel, Nginx, or Netlify.

### 5. Preview Production Build
```bash
npm run preview
```

---

## ⚡ Keyboard Shortcuts in Test Mode

| Key | Action |
|---|---|
| `1` – `5` | Select Likert scale option (1: Strongly Disagree &rarr; 5: Strongly Agree) |
| `A` / `B` | Select option A or B in Forced Choice |
| `A` / `B` / `C` / `D` | Select option in SJT and Motivation questions |
| `←` (Arrow Left) | Previous Question |
| `→` (Arrow Right) | Next Question |
| `F` | Toggle Flag for review |

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
