# Java Developer Person Profiling Test (Vite + React + TypeScript)

An interactive psychometric and competency assessment web application built with **React 18**, **TypeScript**, **Vite**, and **Chart.js**.

---

## 🚀 Quick Start

### 1. Development Mode
Run the local Vite development server:
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 2. Build for Production
Type-check with TypeScript and build the optimized production bundle:
```bash
npm run build
```
Output will be generated in the `dist/` directory.

### 3. Preview Production Build
Serve the production build locally:
```bash
npm run preview
```

---

## 📋 Assessment Specifications

- **Total Questions**: **150 questions** across 4 distinct sections:
  1. **Likert Scale (60 questions)**: Scale 1–5 (*Strongly Disagree* to *Strongly Agree*), with keyboard shortcuts `1`–`5`.
  2. **Forced Choice (40 questions)**: A/B dilemma tradeoffs, with keyboard shortcuts `A` / `B`.
  3. **Situational Judgement (30 questions)**: Real-world Java engineering scenarios (JVM memory leaks, deadlocks, CI/CD flakiness, JPA N+1 queries, Log4Shell zero-day response), with keyboard shortcuts `A`–`D`.
  4. **Motivation & Values (20 questions)**: Engineering values, culture fit, and career driver choices, with keyboard shortcuts `A`–`D`.

- **Duration**: Timed countdown with candidate selection:
  - **90 Minutes** (Standard Pace)
  - **120 Minutes** (Comprehensive Pace)

- **Category Weights**:
  - **Personality & Character** (25% share &bull; weight: `1.0`)
  - **Work Style & Productivity** (25% share &bull; weight: `1.0`)
  - **Teamwork & Communication** (20% share &bull; weight: `0.9`)
  - **Problem Solving & Analytical Thinking** (15% share &bull; weight: `1.2`)
  - **Motivation & Work Values** (15% share &bull; weight: `0.9`)

- **Integrity Safeguards**:
  - **Overconfidence Traps**: Penalizes extreme claims (e.g., *"I never make mistakes in Java concurrency"*).
  - **Social Desirability Traps**: Penalizes fake perfectionism (e.g., *"I always complete 100% of sprint commitments on time without scope changes"*).
  - **Paraphrase Consistency Pairs**: Flags contradictions across sections and applies calibration adjustments.

- **Developer Personas**:
  - 🏗️ **"The Architect"**: System design, modularity, DDD, clean architecture
  - 🐛 **"The Debugger"**: Root-cause analysis, JVM internals, memory leaks, thread dumps
  - 🤝 **"The Collaborator"**: Team-first player, code review mentorship, agile psychological safety
  - 🚀 **"The Executor"**: High velocity, pragmatic tradeoffs, action-oriented shipping
  - 📚 **"The Learner"**: Continuous upskilling, Virtual Threads, modern JDK evolution

- **Results Visualizations**:
  - Compatibility Verdict (*Highly Recommended*, *Recommended*, *Needs Development*, *Not Recommended*)
  - 5-axis Radar Chart rendered via Chart.js
  - Category Breakdown bars with level badges (*Exceptional*, *Strong*, *Moderate*, *Needs Work*)
  - Top 3 Dominant Personality Traits
  - 5 Work Style Dual-Spectrum Sliders
  - Top 3 Strengths & Top 2 Areas to Improve
  - Consistency & Integrity Score
  - Print / Save as PDF export (`@media print` styled)

---

## 📁 Project Structure

```
.
├── index.html                       # Vite HTML entry point
├── package.json                     # Dependencies & scripts
├── tsconfig.json                    # TypeScript compiler configuration
├── tsconfig.node.json               # TypeScript config for Vite
├── vite.config.ts                   # Vite configuration
├── src/
│   ├── main.tsx                     # React DOM root entry
│   ├── App.tsx                      # Main application state machine & routing
│   ├── App.css                      # Global design system, animations & print styles
│   ├── types.ts                     # TypeScript interfaces & types
│   ├── data/
│   │   └── questions.ts             # 150 typed questions dataset
│   ├── utils/
│   │   └── scoring.ts               # Scoring engine, trap checks & persona mapping
│   └── components/
│       ├── Header.tsx               # Header with timer, progress & demo auto-fill
│       ├── IntroView.tsx            # Setup, duration selector & start screen
│       ├── TestView.tsx             # Interactive question card & question controls
│       ├── ResultsView.tsx          # Results report, Chart.js radar chart & breakdown
│       ├── QuestionPaletteModal.tsx # 150-question navigation grid
│       └── SubmitWarningModal.tsx   # Unanswered warning modal
```
