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
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  candidateName,
  results,
  onRetake
}) => {
  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

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
          backgroundColor: 'rgba(16, 185, 129, 0.25)',
          borderColor: '#10b981',
          borderWidth: 2.5,
          pointBackgroundColor: '#0f172a',
          pointBorderColor: '#10b981',
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
  }, [results]);

  const score = results.finalScore;

  // Compatibility Verdict
  let verdictClass = 'verdict-badge highly-recommended';
  let verdictText = 'HIGHLY RECOMMENDED';
  let verdictIcon = '✅';
  let verdictBorderColor = 'var(--accent-green)';
  let verdictExpl = `The candidate exemplifies the top tier of Senior Java Engineering talent. Demonstrating mature command over modern Java standards, proactive technical debt mitigation, resilient distributed system design, and constructive collaboration patterns, ${candidateName} is strongly primed to lead architecture and accelerate production velocity within high-impact software engineering teams.`;

  if (score >= 85) {
    verdictClass = 'verdict-badge highly-recommended';
    verdictText = 'HIGHLY RECOMMENDED';
    verdictIcon = '✅';
    verdictBorderColor = 'var(--accent-green)';
  } else if (score >= 70) {
    verdictClass = 'verdict-badge recommended';
    verdictText = 'RECOMMENDED';
    verdictIcon = '✅';
    verdictBorderColor = '#0284c7';
    verdictExpl = `The candidate displays solid, dependable competency in Java development, clean architecture practices, and sprint execution. They possess the required problem-solving mindset and team communication habits to succeed seamlessly in standard enterprise environments, with clear upside potential for advancement into senior technical ownership.`;
  } else if (score >= 50) {
    verdictClass = 'verdict-badge needs-development';
    verdictText = 'NEEDS DEVELOPMENT';
    verdictIcon = '⚠️';
    verdictBorderColor = 'var(--accent-amber)';
    verdictExpl = `The candidate exhibits baseline familiarity with core Java concepts but shows inconsistencies across testing discipline, architectural boundaries, or collaborative feedback dynamics. With targeted technical mentoring and focused coaching on root-cause profiling and agile communication, the candidate can close remaining gaps.`;
  } else {
    verdictClass = 'verdict-badge not-recommended';
    verdictText = 'NOT RECOMMENDED';
    verdictIcon = '❌';
    verdictBorderColor = 'var(--accent-red)';
    verdictExpl = `The assessment indicates significant divergences from senior engineering expectations, particularly concerning clean code standards, incident debugging methodology, or team alignment. Substantial remediation across enterprise design principles and testing discipline is recommended before role readiness.`;
  }

  // Persona
  const pData = PERSONA_DETAILS[results.primaryPersona];
  const totalPersonaPts = results.sortedPersonas.reduce((acc, curr) => acc + curr[1], 0) || 1;
  const personaColors: Record<string, string> = {
    "The Architect": "#2563eb",
    "The Debugger": "#059669",
    "The Collaborator": "#10b981",
    "The Executor": "#f59e0b",
    "The Learner": "#8b5cf6"
  };

  // Category interpretations
  const interpretations: Record<CategoryType, Record<string, string>> = {
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
  };

  // Traits
  const traitsPool = [
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

  let selectedTraits = [traitsPool[0], traitsPool[1], traitsPool[4]];
  if (results.primaryPersona === "The Architect") {
    selectedTraits = [traitsPool[0], traitsPool[1], traitsPool[4]];
  } else if (results.primaryPersona === "The Debugger") {
    selectedTraits = [traitsPool[1], traitsPool[0], traitsPool[4]];
  } else if (results.primaryPersona === "The Collaborator") {
    selectedTraits = [traitsPool[2], traitsPool[0], traitsPool[3]];
  } else if (results.primaryPersona === "The Executor") {
    selectedTraits = [traitsPool[3], traitsPool[1], traitsPool[2]];
  } else if (results.primaryPersona === "The Learner") {
    selectedTraits = [traitsPool[4], traitsPool[0], traitsPool[2]];
  }

  // Work style preference definitions
  const sliderDefs = [
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
              <div className="cand-name">{candidateName || "Alex Morgan"}</div>
              <div className="cand-meta">Senior Java Developer Profiling Report &bull; Assessment Completed on {dateStr}</div>
            </div>
            <div className="results-action-btns">
              <button className="btn-print" onClick={() => window.print()}>
                <span>📄</span>
                <span>Download / Print PDF</span>
              </button>
              <button className="btn-retake" onClick={onRetake}>
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

        {/* 2. DEVELOPER PERSONA CARD */}
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
            <div className="chart-card-title">
              <span>🎯</span>
              <span>Competency Radar Analysis</span>
            </div>
            <div className="chart-container-box">
              <canvas ref={chartCanvasRef}></canvas>
            </div>
            <div style={{ fontSize: '0.725rem', color: '#94a3b8', textAlign: 'center', marginTop: '0.5rem' }}>
              Normalized across all 150 test questions & category weights
            </div>
          </div>

          {/* 4. Category Breakdown Cards */}
          <div className="category-cards-col">
            {(Object.keys(CATEGORY_CONFIG) as CategoryType[]).map(catKey => {
              const config = CATEGORY_CONFIG[catKey];
              const catScore = results.categoryScores[catKey] || 70;

              let levelClass = 'cat-level-strong';
              let levelLabel = 'Strong';
              let barColor = '#10b981';
              let interpKey = 'strong';

              if (catScore >= 85) {
                levelClass = 'cat-level-exceptional';
                levelLabel = 'Exceptional';
                barColor = '#059669';
                interpKey = 'exceptional';
              } else if (catScore >= 70) {
                levelClass = 'cat-level-strong';
                levelLabel = 'Strong';
                barColor = '#0284c7';
                interpKey = 'strong';
              } else if (catScore >= 50) {
                levelClass = 'cat-level-moderate';
                levelLabel = 'Moderate';
                barColor = '#f59e0b';
                interpKey = 'moderate';
              } else {
                levelClass = 'cat-level-needs-work';
                levelLabel = 'Needs Work';
                barColor = '#ef4444';
                interpKey = 'needs_work';
              }

              const interpText = interpretations[catKey][interpKey];

              return (
                <div key={catKey} className="category-metric-card">
                  <div className="cat-card-header">
                    <div className="cat-name-box">
                      <span>{config.icon}</span>
                      <span>{config.label}</span>
                      <span className="cat-weight-pill">
                        Weight: {config.weight.toFixed(1)} &bull; {(config.targetShare * 100)}%
                      </span>
                    </div>
                    <div>
                      <span className="cat-score-val">{catScore}%</span>
                      <span className={`cat-level-badge ${levelClass}`}>{levelLabel}</span>
                    </div>
                  </div>
                  <div className="cat-progress-track">
                    <div className="cat-progress-bar" style={{ width: `${catScore}%`, background: barColor }} />
                  </div>
                  <div className="cat-desc-text">{interpText}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. PERSONALITY TRAITS SUMMARY */}
        <div className="traits-section-card">
          <div className="section-heading-row">
            <div className="section-heading-title">
              <span>🧠</span>
              <span>Dominant Engineering Personality Traits</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Top 3 Detected Traits</span>
          </div>

          <div className="traits-grid">
            {selectedTraits.map(item => (
              <div key={item.tag} className="trait-badge-card">
                <span className="trait-pill-tag">{item.tag}</span>
                <div className="trait-headline">{item.headline}</div>
                <div className="trait-explanation">{item.explanation}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. WORK STYLE PREFERENCES (5 DUAL-SPECTRUM SLIDERS) */}
        <div className="sliders-section-card">
          <div className="section-heading-row">
            <div className="section-heading-title">
              <span>⚖️</span>
              <span>Work Style & Operational Preferences</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Dual-Spectrum Continuum</span>
          </div>

          <div className="sliders-stack">
            {sliderDefs.map(item => {
              const pct = results.sliderPercentages[item.key] !== undefined ? results.sliderPercentages[item.key] : 50;

              let leaningNote = "Equally balanced between both poles";
              if (pct >= 65) {
                leaningNote = `Strongly leans toward ${item.right} (${pct}%)`;
              } else if (pct > 50) {
                leaningNote = `Moderately leans toward ${item.right} (${pct}%)`;
              } else if (pct <= 35) {
                leaningNote = `Strongly leans toward ${item.left} (${100 - pct}%)`;
              } else if (pct < 50) {
                leaningNote = `Moderately leans toward ${item.left} (${100 - pct}%)`;
              }

              return (
                <div key={item.key} className="slider-item-box">
                  <div className="slider-labels-row">
                    <span>{item.left}</span>
                    <span style={{ color: 'var(--navy-accent)' }}>{leaningNote}</span>
                    <span>{item.right}</span>
                  </div>
                  <div className="slider-track">
                    <div className="slider-thumb-marker" style={{ left: `${pct}%` }} />
                  </div>
                  <div className="slider-verdict-note">
                    <span>{item.descLeft}</span>
                    <span>{item.descRight}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 7. STRENGTHS & DEVELOPMENT AREAS */}
        <div className="strengths-weaknesses-grid">
          {/* Top 3 Strengths */}
          <div className="sw-col">
            <div className="sw-col-header" style={{ color: '#047857' }}>
              <span>✅</span>
              <span>Top 3 Core Strengths</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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
            </div>
          </div>

          {/* Top 2 Areas to Improve */}
          <div className="sw-col">
            <div className="sw-col-header" style={{ color: '#b45309' }}>
              <span>⚠️</span>
              <span>Top 2 Development Opportunities</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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
                "Exceptional psychometric consistency detected across all 4 assessment sections. Responses to inverted pairs, overconfidence probes, and social desirability traps demonstrated high self-awareness and authentic engineering honesty. No penalty applied."
              )}
              {results.consistency.label === "Medium" && (
                `Minor response variations detected across similar scenarios (${results.consistency.overconfidenceTriggers + results.consistency.socialDesirabilityTriggers + results.consistency.consistencyDiscrepancies} minor inconsistencies detected). A modest score adjustment (-${results.consistency.penalty}%) was applied.`
              )}
              {results.consistency.label === "Low" && (
                `Noticeable contradictions observed between self-reported habits and situational responses (${results.consistency.overconfidenceTriggers + results.consistency.socialDesirabilityTriggers + results.consistency.consistencyDiscrepancies} variance flags). A calibration deduction (-${results.consistency.penalty}%) was applied to maintain profiling integrity.`
              )}
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
            Audit: 4 Trap Probes &bull; 4 Paraphrase Pairs
          </div>
        </div>

      </div>
    </div>
  );
};
