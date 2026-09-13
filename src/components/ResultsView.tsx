import React, { useEffect, useRef } from 'react';
import { Chart, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, RadarController } from 'chart.js';
import { ProfilingResults, CategoryType } from '../types';
import { CATEGORY_CONFIG } from '../data/questions';
import { PERSONA_DETAILS } from '../utils/scoring';

// Register Chart.js components
Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, RadarController);

interface ResultsViewProps {
  candidateName: string;
  results: ProfilingResults;
  onRetake: () => void;
  onGoHome: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  candidateName,
  results,
  onRetake,
  onGoHome
}) => {
  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const isJava = results.testType === 'java';

  useEffect(() => {
    if (!chartCanvasRef.current) return;

    const ctx = chartCanvasRef.current.getContext('2d');
    if (!ctx) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const labels = [
      `Personality (${results.categoryScores.personality}%)`,
      `Work Style (${results.categoryScores.work_style}%)`,
      `Teamwork (${results.categoryScores.teamwork}%)`,
      `Problem Solving (${results.categoryScores.problem_solving}%)`,
      `Motivation (${results.categoryScores.motivation}%)`
    ];

    const dataVals = [
      results.categoryScores.personality,
      results.categoryScores.work_style,
      results.categoryScores.teamwork,
      results.categoryScores.problem_solving,
      results.categoryScores.motivation
    ];

    chartInstanceRef.current = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Competency Profile (%)',
          data: dataVals,
          backgroundColor: isJava ? 'rgba(37, 99, 235, 0.22)' : 'rgba(16, 185, 129, 0.22)',
          borderColor: isJava ? '#2563eb' : '#10b981',
          borderWidth: 2.5,
          pointBackgroundColor: '#0f172a',
          pointBorderColor: isJava ? '#2563eb' : '#10b981',
          pointBorderWidth: 2,
          pointRadius: 4.5,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          r: {
            angleLines: { color: '#e2e8f0' },
            grid: { color: '#e2e8f0' },
            pointLabels: {
              font: { family: 'Inter', size: 11, weight: 600 },
              color: '#1e293b'
            },
            suggestedMin: 30,
            suggestedMax: 100,
            ticks: { stepSize: 20, font: { size: 9 }, backdropColor: 'transparent' }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [results, isJava]);

  const score = results.finalScore;

  // Compatibility Verdict
  let verdictClass = 'verdict-badge highly-recommended';
  let verdictText = 'HIGHLY RECOMMENDED';
  let verdictIcon = '✅';
  let verdictBorderColor = 'var(--accent-green)';
  let verdictExpl = '';

  if (score >= 85) {
    verdictClass = 'verdict-badge highly-recommended';
    verdictText = 'HIGHLY RECOMMENDED';
    verdictIcon = '✅';
    verdictBorderColor = 'var(--accent-green)';
    verdictExpl = isJava
      ? `The candidate exemplifies the top tier of Senior Java Engineering talent. Demonstrating mature command over modern Java standards, proactive technical debt mitigation, resilient distributed system design, and constructive collaboration patterns, ${candidateName || 'The candidate'} is strongly primed to lead architecture and accelerate production velocity within high-impact software engineering squads.`
      : `The candidate exemplifies the highest benchmark of workplace professional excellence. Demonstrating visionary strategic alignment, rigorous analytical problem solving, empathetic cross-functional teamwork, and dependable execution velocity, ${candidateName || 'The candidate'} is exceptionally equipped to drive organizational initiatives and deliver superior business outcomes.`;
  } else if (score >= 70) {
    verdictClass = 'verdict-badge recommended';
    verdictText = 'RECOMMENDED';
    verdictIcon = '✅';
    verdictBorderColor = '#0284c7';
    verdictExpl = isJava
      ? `The candidate displays solid, dependable competency in Java development, clean architecture practices, and sprint execution. They possess the required problem-solving mindset and team communication habits to succeed seamlessly in standard enterprise environments, with clear upside potential for advancement into senior technical ownership.`
      : `The candidate displays solid, dependable competencies across workplace execution, analytical problem solving, and collaborative communication. They exhibit strong accountability and adaptability to organizational demands, with clear upside potential for stepping into expanded leadership roles.`;
  } else if (score >= 50) {
    verdictClass = 'verdict-badge needs-development';
    verdictText = 'NEEDS DEVELOPMENT';
    verdictIcon = '⚠️';
    verdictBorderColor = 'var(--accent-amber)';
    verdictExpl = isJava
      ? `The candidate exhibits baseline familiarity with core Java concepts but shows inconsistencies across testing discipline, architectural boundaries, or collaborative feedback dynamics. With targeted technical mentoring and focused coaching on root-cause profiling and agile communication, the candidate can close remaining gaps.`
      : `The candidate possesses foundational professional capabilities but displays inconsistencies in prioritization, feedback receptivity, or cross-functional alignment. With targeted professional development and mentorship in strategic planning and stakeholder management, performance can be strengthened.`;
  } else {
    verdictClass = 'verdict-badge not-recommended';
    verdictText = 'NOT RECOMMENDED';
    verdictIcon = '❌';
    verdictBorderColor = 'var(--accent-red)';
    verdictExpl = isJava
      ? `The assessment indicates significant divergences from senior engineering expectations, particularly concerning clean code standards, incident debugging methodology, or team alignment. Substantial remediation across enterprise design principles and testing discipline is recommended before role readiness.`
      : `The assessment reveals notable divergences from expected professional competencies, particularly concerning collaborative alignment, situational judgment, or operational consistency. Structured coaching on professional communication and conflict resolution is advised before placement in high-autonomy roles.`;
  }

  // Persona Details
  const pData = PERSONA_DETAILS[results.primaryPersona] || {
    icon: isJava ? "💻" : "👔",
    tagline: "Professional Profile",
    desc: "A balanced professional contributor with versatile capabilities across multiple operational areas."
  };
  const totalPersonaPts = results.sortedPersonas.reduce((acc, curr) => acc + curr[1], 0) || 1;

  const personaColors: Record<string, string> = {
    // Java Personas
    "The Architect": "#2563eb",
    "The Debugger": "#059669",
    "The Collaborator": "#10b981",
    "The Executor": "#f59e0b",
    "The Learner": "#8b5cf6",
    // General Personas
    "The Strategist": "#2563eb",
    "The Analyst": "#059669",
    "The Innovator": "#8b5cf6"
  };

  // Category interpretations
  const interpretations: Record<CategoryType, Record<string, string>> = isJava ? {
    personality: {
      exceptional: "Demonstrates unflinching emotional composure during high-severity production incidents. Handles critical peer feedback with intellectual maturity.",
      strong: "Maintains balanced self-awareness and handles sprint pressure with resilience. Receptive to architectural direction.",
      moderate: "Generally reliable under routine conditions, but may experience stress during ambiguous scope shifts or urgent outages.",
      needs_work: "Susceptible to defensive reactions during code reviews or production friction. Needs coaching on psychological composure."
    },
    work_style: {
      exceptional: "Exemplifies strict test automation (TDD, Testcontainers) and continuous refactoring (Boy Scout rule). Commits clean, deployable code consistently.",
      strong: "Maintains disciplined testing habits, clean Git hygiene, and thorough documentation for microservice contracts.",
      moderate: "Completes assigned tickets reliably but occasionally bypasses edge-case unit testing when release deadlines approach.",
      needs_work: "Displays tendency to accumulate technical debt and defer automated testing, creating downstream regression hazards."
    },
    teamwork: {
      exceptional: "Champions psychological safety, pair-programming mentorship, and highly constructive, empathetic pull request reviews.",
      strong: "Proactively communicates blockers, aligns smoothly with cross-functional stakeholders, and compromises on design consensus.",
      moderate: "Cooperates well within immediate squad ceremonies, but may hesitate to step up during cross-team architectural conflicts.",
      needs_work: "Prefers solitary execution; occasionally struggles with synchronous pair debugging or open design critique."
    },
    problem_solving: {
      exceptional: "Demonstrates deep mastery of JVM internals, thread dumps, memory profiling, and resilient distributed microservice patterns.",
      strong: "Methodically investigates root causes rather than applying surface patches. Designs scalable REST and Kafka flows.",
      moderate: "Solves standard business domain challenges adequately, but requires guidance with high-concurrency race conditions.",
      needs_work: "Relies on trial-and-error patching without analyzing execution plans or diagnostic traces. Needs analytical coaching."
    },
    motivation: {
      exceptional: "Intrinsically energized by solving complex architectural challenges and elevating team-wide engineering capabilities.",
      strong: "Driven by business impact, modern Java evolution, and writing software that withstands production scale.",
      moderate: "Satisfied with routine feature implementation; moderately motivated to explore bleeding-edge frameworks.",
      needs_work: "Shows limited intrinsic passion for software craftsmanship or proactive knowledge sharing beyond mandatory tasks."
    }
  } : {
    personality: {
      exceptional: "Maintains exemplary emotional composure during high-stakes corporate challenges. Embraces constructive critique with poise and mature self-awareness.",
      strong: "Demonstrates balanced self-regulation and copes effectively with shifting workplace deadlines. Receptive to managerial feedback.",
      moderate: "Generally steady under standard operational conditions, but may feel strained during sudden organizational pivots.",
      needs_work: "Displays vulnerability to defensive reactions during performance discussions or workplace stress. Benefits from coaching in emotional intelligence."
    },
    work_style: {
      exceptional: "Exemplifies meticulous organization, strict deadline discipline, and continuous process optimization. Delivers high-quality outputs consistently.",
      strong: "Maintains disciplined task management, proactive communication on deliverables, and structured documentation.",
      moderate: "Delivers assigned responsibilities adequately, but occasionally overlooks quality refinements when deadlines press.",
      needs_work: "Tends to deprioritize follow-through and organization, risking operational bottlenecks and delayed project milestones."
    },
    teamwork: {
      exceptional: "Inspires mutual trust, champions inclusive cross-functional collaboration, and acts as an empathetic bridge across diverse stakeholders.",
      strong: "Proactively communicates progress, fosters harmonious peer relationships, and readily aligns with team consensus.",
      moderate: "Works productively within their immediate team, but may hesitate to engage in cross-departmental coordination.",
      needs_work: "Prefers solitary workflows; occasionally finds collaborative negotiations or team consensus building challenging."
    },
    problem_solving: {
      exceptional: "Applies sophisticated analytical frameworks and empirical data to untangle complex ambiguous business problems.",
      strong: "Methodically investigates root causes and designs practical, evidence-based solutions rather than superficial fixes.",
      moderate: "Resolves standard day-to-day challenges competently, but needs guidance when navigating novel, unstructured crises.",
      needs_work: "Relies on intuitive guesswork without verifying factual metrics or evaluating second-order consequences."
    },
    motivation: {
      exceptional: "Intrinsically energized by organizational impact, purpose-driven leadership, and elevating collective enterprise success.",
      strong: "Motivated by professional achievement, tangible business milestones, and continuous skill refinement.",
      moderate: "Sustains steady motivation for routine job duties; moderately inclined toward exploring optional stretch opportunities.",
      needs_work: "Exhibits limited intrinsic engagement beyond baseline requirements; requires ongoing external incentive structures."
    }
  };

  // Persona-specific traits
  const javaTraitsPool = [
    {
      tag: "Code Quality Purist",
      headline: "Prioritizes Clean Code & Test Discipline Over Shortcuts",
      explanation: "You consistently advocate for automated testing, clean architectural boundaries, and boy-scout refactoring, protecting the codebase against long-term technical debt."
    },
    {
      tag: "Empirical Troubleshooter",
      headline: "Methodical Root-Cause Analysis Under Pressure",
      explanation: "When production anomalies occur, you analyze heap dumps, thread stacks, and execution plans with calm precision rather than guessing or restarting blindly."
    },
    {
      tag: "Collaborative Mentor",
      headline: "Elevates Team Culture & Welcomes Code Review Dialogue",
      explanation: "You view code reviews as empathetic learning conversations and proactively pair with junior engineers to untangle complex business logic."
    },
    {
      tag: "Pragmatic Shipper",
      headline: "Balances Architectural Purity With Sprint Delivery Velocity",
      explanation: "You understand how to slice large user stories into deliverable milestones, ensuring business stakeholders receive incremental customer value without stalls."
    },
    {
      tag: "Continuous Modernizer",
      headline: "Voracious Curiosity for Modern Java & Cloud Frameworks",
      explanation: "You actively experiment with modern language advancements (Virtual Threads, Records, Pattern Matching) to continuously enhance squad productivity."
    }
  ];

  const generalTraitsPool = [
    {
      tag: "Strategic Visionary",
      headline: "Anticipates Long-Term Horizons & Structural Synergies",
      explanation: "You naturally formulate strategic roadmaps, identify emerging organizational opportunities, and align cross-functional initiatives into cohesive business momentum."
    },
    {
      tag: "Evidence-Based Analyst",
      headline: "Rigorous Analytical Precision & Data Integrity",
      explanation: "You ground recommendations in empirical data, scrutinizing assumptions and identifying high-impact levers through thorough quantitative and qualitative inquiry."
    },
    {
      tag: "Empathetic Relationship Builder",
      headline: "Fosters Cross-Functional Trust & Active Listening",
      explanation: "You excel at building rapport across teams, facilitating open dialogue, and mediating conflicting priorities with empathy, emotional intelligence, and diplomatic tact."
    },
    {
      tag: "High-Velocity Finisher",
      headline: "Action-Oriented Discipline & Dependable Milestone Delivery",
      explanation: "You excel at cutting through ambiguity, prioritizing critical paths, and executing tasks on time with relentless accountability and operational drive."
    },
    {
      tag: "Adaptive Innovation Catalyst",
      headline: "Embraces Change & Drives Creative Breakthroughs",
      explanation: "You thrive when exploring novel methodologies, questioning conventional norms, and piloting creative experiments that propel the organization forward."
    }
  ];

  let selectedTraits = isJava 
    ? [javaTraitsPool[0], javaTraitsPool[1], javaTraitsPool[4]]
    : [generalTraitsPool[0], generalTraitsPool[1], generalTraitsPool[4]];

  if (isJava) {
    if (results.primaryPersona === "The Architect") {
      selectedTraits = [javaTraitsPool[0], javaTraitsPool[1], javaTraitsPool[4]];
    } else if (results.primaryPersona === "The Debugger") {
      selectedTraits = [javaTraitsPool[1], javaTraitsPool[0], javaTraitsPool[4]];
    } else if (results.primaryPersona === "The Collaborator") {
      selectedTraits = [javaTraitsPool[2], javaTraitsPool[0], javaTraitsPool[3]];
    } else if (results.primaryPersona === "The Executor") {
      selectedTraits = [javaTraitsPool[3], javaTraitsPool[1], javaTraitsPool[2]];
    } else if (results.primaryPersona === "The Learner") {
      selectedTraits = [javaTraitsPool[4], javaTraitsPool[0], javaTraitsPool[2]];
    }
  } else {
    if (results.primaryPersona === "The Strategist") {
      selectedTraits = [generalTraitsPool[0], generalTraitsPool[1], generalTraitsPool[3]];
    } else if (results.primaryPersona === "The Analyst") {
      selectedTraits = [generalTraitsPool[1], generalTraitsPool[0], generalTraitsPool[3]];
    } else if (results.primaryPersona === "The Collaborator") {
      selectedTraits = [generalTraitsPool[2], generalTraitsPool[0], generalTraitsPool[4]];
    } else if (results.primaryPersona === "The Executor") {
      selectedTraits = [generalTraitsPool[3], generalTraitsPool[1], generalTraitsPool[2]];
    } else if (results.primaryPersona === "The Innovator") {
      selectedTraits = [generalTraitsPool[4], generalTraitsPool[0], generalTraitsPool[2]];
    }
  }

  // Work style preference definitions
  const sliderDefs = isJava ? [
    {
      key: "solo_vs_team",
      left: "Solo Deep Work",
      right: "Team Collaboration",
      descLeft: "Prefers uninterrupted solo blocks",
      descRight: "Thrives in pair-programming & mob syncs"
    },
    {
      key: "detail_vs_big_picture",
      left: "Big Picture Architecture",
      right: "Detail & Low-Level Craft",
      descLeft: "Focuses on bounded contexts & services",
      descRight: "Focuses on profiling, threads, and memory"
    },
    {
      key: "quality_vs_speed",
      left: "Fast Delivery (Action-Oriented)",
      right: "High Quality (Perfectionist)",
      descLeft: "Ships fast MVPs & iterates in production",
      descRight: "Demands comprehensive tests & zero debt"
    },
    {
      key: "structured_vs_flexible",
      left: "Structured Processes & ADRs",
      right: "Flexible & Agile Exploration",
      descLeft: "Enforces strict schemas & stage gates",
      descRight: "Adapts dynamically to changing scopes"
    },
    {
      key: "tech_vs_comm",
      left: "Deep Technical Specialization",
      right: "Communication & Facilitation",
      descLeft: "Dives deep into JVM internals & bytecode",
      descRight: "Bridges engineering with stakeholders"
    }
  ] : [
    {
      key: "solo_vs_team",
      left: "Independent Focus",
      right: "Collaborative Teamwork",
      descLeft: "Prefers autonomous concentration",
      descRight: "Thrives in collaborative brainstorming"
    },
    {
      key: "detail_vs_big_picture",
      left: "Strategic Vision",
      right: "Operational Precision",
      descLeft: "Focuses on broad objectives & roadmaps",
      descRight: "Focuses on exact execution & thoroughness"
    },
    {
      key: "quality_vs_speed",
      left: "Rapid Execution",
      right: "Thorough Excellence",
      descLeft: "Prioritizes prompt delivery & quick iteration",
      descRight: "Demands meticulous quality & zero errors"
    },
    {
      key: "structured_vs_flexible",
      left: "Standard Procedures",
      right: "Adaptive Flexibility",
      descLeft: "Relies on established workflows & rigor",
      descRight: "Pivots dynamically with emerging needs"
    },
    {
      key: "tech_vs_comm",
      left: "Analytical Specialization",
      right: "Stakeholder Engagement",
      descLeft: "Dives deep into data & specialized tools",
      descRight: "Bridges cross-functional departments"
    }
  ];

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="view-container">
      <div className="results-wrapper">

        {/* Executive Header */}
        <div className="results-hero-header">
          <div className="candidate-info-bar">
            <div>
              <div className="cand-name">{candidateName || (isJava ? "Alex Morgan" : "Jordan Taylor")}</div>
              <div className="cand-meta">
                {isJava ? 'Senior Java Developer Profiling Report' : 'General Professional Profiling Report'} &bull; Completed on {dateStr}
              </div>
            </div>
            <div className="results-action-btns">
              <button 
                type="button" 
                className="btn-header" 
                onClick={onGoHome}
                style={{ background: '#334155', color: '#f8fafc', border: '1px solid #475569' }}
              >
                <span>🏠</span>
                <span>Back to Home</span>
              </button>
              <button 
                type="button" 
                className="btn-print" 
                onClick={() => window.print()}
              >
                <span>📄</span>
                <span>Download / Print PDF</span>
              </button>
              <button 
                type="button" 
                className="btn-retake" 
                onClick={onRetake}
              >
                <span>🔄 Retake</span>
              </button>
            </div>
          </div>

          {/* 1. COMPATIBILITY VERDICT BANNER */}
          <div className="verdict-banner-container">
            <div className="verdict-gauge-card">
              <div className="gauge-circle" style={{ borderColor: verdictBorderColor }}>
                <div className="gauge-val">{score.toFixed(1)}%</div>
              </div>
              <div className="gauge-label">Weighted Fit Score</div>
            </div>

            <div className="verdict-details">
              <div className={verdictClass}>
                <span>{verdictIcon}</span>
                <span>{verdictText}</span>
              </div>
              <p className="verdict-explanation">
                {verdictExpl}
              </p>
            </div>
          </div>
        </div>

        {/* 2. PERSONA CARD */}
        <div className="persona-card">
          <div className="persona-avatar-box">
            <div className="persona-icon-large">{pData.icon}</div>
          </div>

          <div>
            <div className="persona-title-row">
              <h2 className="persona-name">{results.primaryPersona}</h2>
              <span className="persona-tagline">{pData.tagline}</span>
            </div>
            <p className="persona-desc">
              {pData.desc}
            </p>

            {/* Persona Affinity Distribution */}
            <div className="persona-breakdown-bar">
              <div className="persona-bar-header">
                <span>Persona Affinity Breakdown</span>
                <span>Secondary: {results.secondaryPersona}</span>
              </div>
              <div className="persona-mini-bars">
                {results.sortedPersonas.map(([pName, pts]) => {
                  const segWidth = Math.max(5, Math.round((pts / totalPersonaPts) * 100));
                  return (
                    <div
                      key={pName}
                      className="persona-mini-segment"
                      style={{
                        width: `${segWidth}%`,
                        background: personaColors[pName] || '#3b82f6'
                      }}
                      title={`${pName}: ${segWidth}%`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 3 & 4. RADAR CHART & CATEGORY BREAKDOWN */}
        <div className="radar-breakdown-grid">
          {/* 3. Radar Chart Card */}
          <div className="chart-card">
            <div className="chart-card-header">
              <span>📊 Multi-Dimensional Competency Radar</span>
            </div>
            <div className="chart-wrapper">
              <canvas ref={chartCanvasRef} />
            </div>
            <div className="chart-footer-note">
              Normalized competency score across the 5 evaluated core dimensions (30-100% scale).
            </div>
          </div>

          {/* 4. Detailed Category Breakdown */}
          <div className="categories-card">
            <div className="chart-card-header">
              <span>📋 Weighted Category Breakdown</span>
            </div>
            <div className="categories-list">
              {(Object.keys(CATEGORY_CONFIG) as CategoryType[]).map(catKey => {
                const config = CATEGORY_CONFIG[catKey];
                const catScore = results.categoryScores[catKey] || 0;
                const catInterpObj = interpretations[catKey];
                let interpStr = catInterpObj.moderate;
                if (catScore >= 85) interpStr = catInterpObj.exceptional;
                else if (catScore >= 70) interpStr = catInterpObj.strong;
                else if (catScore < 50) interpStr = catInterpObj.needs_work;

                let scoreColor = 'var(--accent-green)';
                if (catScore < 50) scoreColor = 'var(--accent-red)';
                else if (catScore < 70) scoreColor = 'var(--accent-amber)';

                return (
                  <div key={catKey} className="category-item-row">
                    <div className="category-item-top">
                      <div className="category-name-block">
                        <span className="category-icon">{config.icon}</span>
                        <span className="category-label">{config.label}</span>
                        <span className="category-weight-badge">Weight: {config.weight.toFixed(1)}x</span>
                      </div>
                      <div className="category-score-val" style={{ color: scoreColor }}>
                        {catScore}%
                      </div>
                    </div>
                    <div className="cat-progress-bg">
                      <div
                        className="cat-progress-fill"
                        style={{
                          width: `${catScore}%`,
                          backgroundColor: scoreColor
                        }}
                      />
                    </div>
                    <div className="category-interpretation">
                      {interpStr}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 5. WORK STYLE DIMENSION SLIDERS */}
        <div className="sliders-section-card">
          <div className="section-header-box">
            <h3 className="section-title">⚖️ Work Style & Behavioral Preferences</h3>
            <p className="section-sub">
              Empirical continuum representing candidate inclination across core workplace dynamics.
            </p>
          </div>

          <div className="sliders-list">
            {sliderDefs.map(def => {
              const pct = results.sliderPercentages[def.key] ?? 50;
              return (
                <div key={def.key} className="slider-row-item">
                  <div className="slider-pole-labels">
                    <span className="slider-pole-left">{def.left}</span>
                    <span className="slider-center-val">{pct}% Right</span>
                    <span className="slider-pole-right">{def.right}</span>
                  </div>
                  <div className="slider-track-container">
                    <div className="slider-track-bar">
                      <div
                        className="slider-pin-indicator"
                        style={{ left: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <div className="slider-pole-descs">
                    <span>{def.descLeft}</span>
                    <span>{def.descRight}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. KEY CHARACTERISTICS & STRENGTHS */}
        <div className="traits-section-card">
          <div className="section-header-box">
            <h3 className="section-title">🌟 Distinctive Professional Signatures</h3>
            <p className="section-sub">
              Observed behavioral patterns synthesized from candidate situational decision paths.
            </p>
          </div>

          <div className="traits-grid">
            {selectedTraits.map((t, idx) => (
              <div key={idx} className="trait-card">
                <div className="trait-badge">{t.tag}</div>
                <div className="trait-headline">{t.headline}</div>
                <div className="trait-desc">{t.explanation}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. STRENGTHS & DEVELOPMENT AREAS */}
        <div className="strengths-weaknesses-grid">
          {/* Top 3 Strengths */}
          <div className="sw-col">
            <div className="sw-col-header" style={{ color: '#059669' }}>
              <span>⭐</span>
              <span>Top 3 Core Strengths</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {isJava ? (
                <>
                  <div className="sw-card strength">
                    <div className="sw-icon">🟢</div>
                    <div>
                      <div className="sw-title">Rigorous Testing & Defect Prevention</div>
                      <div className="sw-desc">Consistently integrates comprehensive unit and integration tests (JUnit 5, Mockito, Testcontainers), safeguarding production against regressions.</div>
                    </div>
                  </div>
                  <div className="sw-card strength">
                    <div className="sw-icon">🟢</div>
                    <div>
                      <div className="sw-title">Systematic Incident Resolution</div>
                      <div className="sw-desc">Methodical approach to root-cause diagnosis using heap dumps, thread traces, and GC telemetry rather than applying quick temporary patches.</div>
                    </div>
                  </div>
                  <div className="sw-card strength">
                    <div className="sw-icon">🟢</div>
                    <div>
                      <div className="sw-title">Constructive Code Review Culture</div>
                      <div className="sw-desc">Fosters empathetic and actionable pull request dialogues, elevating code quality while maintaining high squad morale.</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="sw-card strength">
                    <div className="sw-icon">🟢</div>
                    <div>
                      <div className="sw-title">Disciplined Execution & Milestone Integrity</div>
                      <div className="sw-desc">Consistently prioritizes mission-critical deliverables, organizes timelines, and maintains reliable accountability under tight deadlines.</div>
                    </div>
                  </div>
                  <div className="sw-card strength">
                    <div className="sw-icon">🟢</div>
                    <div>
                      <div className="sw-title">Empirical Root-Cause Analysis</div>
                      <div className="sw-desc">Employs structured data analysis and objective facts rather than intuitive assumptions to resolve workplace bottlenecks and operational friction.</div>
                    </div>
                  </div>
                  <div className="sw-card strength">
                    <div className="sw-icon">🟢</div>
                    <div>
                      <div className="sw-title">Inclusive Collaboration & Active Listening</div>
                      <div className="sw-desc">Fosters cross-functional trust, bridges departmental silos, and navigates conflicting viewpoints with diplomatic poise and empathy.</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Top 2 Areas to Improve */}
          <div className="sw-col">
            <div className="sw-col-header" style={{ color: '#b45309' }}>
              <span>⚠️</span>
              <span>Top 2 Development Opportunities</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {isJava ? (
                <>
                  <div className="sw-card improvement">
                    <div className="sw-icon">🟡</div>
                    <div>
                      <div className="sw-title">Balancing Refactoring with Sprint Velocity</div>
                      <div className="sw-desc">Ensure ongoing refactoring efforts are pragmatically scoped so that high-priority commercial deadlines remain uncompromised.</div>
                    </div>
                  </div>
                  <div className="sw-card improvement">
                    <div className="sw-icon">🟡</div>
                    <div>
                      <div className="sw-title">Cross-Functional Stakeholder Storytelling</div>
                      <div className="sw-desc">Continue refining the ability to translate complex low-level JVM architectural decisions into clear business ROI for non-technical leadership.</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="sw-card improvement">
                    <div className="sw-icon">🟡</div>
                    <div>
                      <div className="sw-title">Balancing Thorough Analysis with Action Speed</div>
                      <div className="sw-desc">Ensure deep analytical inquiries do not delay operational decisions when rapid, decisive action is critical to capture immediate opportunities.</div>
                    </div>
                  </div>
                  <div className="sw-card improvement">
                    <div className="sw-icon">🟡</div>
                    <div>
                      <div className="sw-title">Managing Work Boundaries Under Prolonged Pressure</div>
                      <div className="sw-desc">Maintain healthy delegation habits and stress-management techniques to prevent cognitive exhaustion during high-stakes organizational initiatives.</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 8. CONSISTENCY & INTEGRITY SCORE */}
        <div className="consistency-card">
          <div className="consistency-info-box">
            <div className={`consistency-badge consistency-${results.consistency.label.toLowerCase()}`}>
              <span>🛡️</span>
              <span>Consistency: {results.consistency.label}</span>
            </div>
            <div className="consistency-text-details">
              {results.consistency.label === "High" && (
                "Exceptional psychometric consistency detected across all 4 assessment sections. Responses to inverted pairs, overconfidence probes, and social desirability traps demonstrated high self-awareness and authentic honesty. No calibration penalty applied."
              )}
              {results.consistency.label === "Medium" && (
                `Minor response variations detected across similar scenarios (${results.consistency.overconfidenceTriggers + results.consistency.socialDesirabilityTriggers + results.consistency.consistencyDiscrepancies} minor variances detected). A modest calibration adjustment (-${results.consistency.penalty}%) was applied.`
              )}
              {results.consistency.label === "Low" && (
                `Noticeable contradictions observed between self-reported habits and situational responses (${results.consistency.overconfidenceTriggers + results.consistency.socialDesirabilityTriggers + results.consistency.consistencyDiscrepancies} variance flags). A calibration deduction (-${results.consistency.penalty}%) was applied to maintain profiling integrity.`
              )}
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
            Audit: 4 Trap Probes &bull; 4 Paraphrase Consistency Pairs
          </div>
        </div>

        {/* Bottom Actions */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
          <button 
            type="button"
            className="btn-primary-action" 
            onClick={onGoHome}
            style={{ minWidth: '220px', background: '#334155' }}
          >
            <span>🏠 Back to Home Selection</span>
          </button>
          <button 
            type="button"
            className="btn-primary-action" 
            onClick={onRetake}
            style={{ minWidth: '200px' }}
          >
            <span>🔄 Retake This Test</span>
          </button>
        </div>

      </div>
    </div>
  );
};
