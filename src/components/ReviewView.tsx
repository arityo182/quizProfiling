import React, { useState, useMemo } from 'react';
import { Question, TestType, CategoryType } from '../types';
import { CATEGORY_CONFIG } from '../data/questions';
import { 
  getExplanationForQuestion, 
  isAnswerIdeal, 
  formatAnswerDisplay 
} from '../data/explanations';

interface ReviewViewProps {
  candidateName: string;
  testType: TestType;
  questions: Question[];
  answers: Record<number, any>;
  onBackToResults: () => void;
  onGoHome: () => void;
}

export const ReviewView: React.FC<ReviewViewProps> = ({
  candidateName,
  testType,
  questions,
  answers,
  onBackToResults,
  onGoHome
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'ideal' | 'needs_improvement'>('all');
  const [sectionFilter, setSectionFilter] = useState<number | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const isJava = testType === 'java';

  // Calculate overall ideal matches
  const { idealCount, totalCount, categoryStats } = useMemo(() => {
    let ideal = 0;
    const catStats: Record<CategoryType, { ideal: number; total: number }> = {
      personality: { ideal: 0, total: 0 },
      work_style: { ideal: 0, total: 0 },
      teamwork: { ideal: 0, total: 0 },
      problem_solving: { ideal: 0, total: 0 },
      motivation: { ideal: 0, total: 0 }
    };

    questions.forEach(q => {
      const exp = getExplanationForQuestion(testType, q.id);
      const userAns = answers[q.id];
      const match = exp ? isAnswerIdeal(q, exp, userAns) : false;

      if (match) {
        ideal++;
      }

      if (catStats[q.category]) {
        catStats[q.category].total++;
        if (match) {
          catStats[q.category].ideal++;
        }
      }
    });

    return {
      idealCount: ideal,
      totalCount: questions.length,
      categoryStats: catStats
    };
  }, [questions, answers, testType]);

  const idealPct = totalCount > 0 ? Math.round((idealCount / totalCount) * 100) : 0;

  // Filtered Questions List
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const exp = getExplanationForQuestion(testType, q.id);
      const userAns = answers[q.id];
      const match = exp ? isAnswerIdeal(q, exp, userAns) : false;

      // Status filter
      if (statusFilter === 'ideal' && !match) return false;
      if (statusFilter === 'needs_improvement' && match) return false;

      // Section filter
      if (sectionFilter !== 'all' && q.section !== sectionFilter) return false;

      // Category filter
      if (categoryFilter !== 'all' && q.category !== categoryFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const textToSearch = [
          `question ${q.id}`,
          `q${q.id}`,
          q.text || '',
          q.scenario || '',
          q.option_a || '',
          q.option_b || '',
          ...(q.options || [])
        ].join(' ').toLowerCase();

        if (!textToSearch.includes(query)) return false;
      }

      return true;
    });
  }, [questions, answers, testType, statusFilter, sectionFilter, categoryFilter, searchQuery]);

  // Section names
  const sectionLabels: Record<number, string> = {
    1: '1. Likert Scale (Q1-60)',
    2: '2. Forced Choice (Q61-100)',
    3: '3. Situational Judgement (Q101-130)',
    4: '4. Motivation & Values (Q131-150)'
  };

  return (
    <div className="view-container">
      <div className="review-wrapper">

        {/* Review Top Header */}
        <div className="review-hero-header">
          <div className="review-header-row">
            <div>
              <div className="review-breadcrumb">
                <button type="button" className="btn-link" onClick={onGoHome}>Home</button>
                <span>/</span>
                <button type="button" className="btn-link" onClick={onBackToResults}>Results</button>
                <span>/</span>
                <span>Answer Explanations</span>
              </div>
              <h1 className="review-main-title">
                Answer Review & Behavioral Explanations
              </h1>
              <p className="review-subtitle">
                {isJava ? 'Java Developer Competency Assessment' : 'General Professional Behavioral Assessment'} &bull; Candidate: <strong>{candidateName || (isJava ? 'Alex Morgan' : 'Jordan Taylor')}</strong>
              </p>
            </div>
            <div className="review-header-actions">
              <button 
                type="button" 
                className="btn-print" 
                onClick={() => window.print()}
              >
                <span>🖨️</span>
                <span>Print Review PDF</span>
              </button>
              <button 
                type="button" 
                className="btn-primary-action" 
                onClick={onBackToResults}
                style={{ padding: '0.65rem 1.25rem', fontSize: '0.875rem' }}
              >
                <span>← Back to Results</span>
              </button>
            </div>
          </div>

          {/* Educational Callout */}
          <div className="review-disclaimer-box">
            <span className="disclaimer-icon">💡</span>
            <div>
              <strong>Educational Note on Psychometric Profiling:</strong> In behavioral assessments, there is no absolute "wrong" answer. Profiling maps natural behavioral defaults against high-reliability organizational standards. The explanations below reflect <strong>HR and engineering leadership thinking</strong> on which behaviors drive long-term systemic excellence, psychological safety, and sustainable execution.
            </div>
          </div>

          {/* Progress & Alignment Score Banner */}
          <div className="review-stats-grid">
            <div className="review-score-card">
              <div className="review-gauge">
                <div className="gauge-number">{idealCount} <span style={{ fontSize: '1.2rem', color: '#64748b' }}>/ {totalCount}</span></div>
                <div className="gauge-label">Answers Meeting Ideal Benchmark</div>
              </div>
              <div className="review-gauge-bar-bg">
                <div className="review-gauge-bar-fill" style={{ width: `${idealPct}%` }}></div>
              </div>
              <div className="review-score-sub">
                Overall Alignment Score: <strong>{idealPct}%</strong>
              </div>
            </div>

            {/* Category Breakdown Cards */}
            <div className="review-categories-grid">
              {(Object.keys(CATEGORY_CONFIG) as CategoryType[]).map(catKey => {
                const cfg = CATEGORY_CONFIG[catKey];
                const stat = categoryStats[catKey] || { ideal: 0, total: 0 };
                const catPct = stat.total > 0 ? Math.round((stat.ideal / stat.total) * 100) : 0;
                const isSelected = categoryFilter === catKey;

                return (
                  <div 
                    key={catKey}
                    className={`review-cat-pill ${isSelected ? 'selected' : ''}`}
                    onClick={() => setCategoryFilter(isSelected ? 'all' : catKey)}
                    title={`Click to filter by ${cfg.label}`}
                  >
                    <div className="review-cat-top">
                      <span>{cfg.icon} {cfg.label.split('&')[0].trim()}</span>
                      <strong>{stat.ideal}/{stat.total}</strong>
                    </div>
                    <div className="review-mini-progress">
                      <div 
                        className="review-mini-fill" 
                        style={{ 
                          width: `${catPct}%`,
                          background: catPct >= 75 ? '#10b981' : (catPct >= 50 ? '#f59e0b' : '#ef4444')
                        }} 
                      />
                    </div>
                    <div className="review-cat-pct">{catPct}% Ideal</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filters & Search Control Bar */}
        <div className="review-controls-bar">
          <div className="filter-button-group">
            <span className="control-group-label">Status:</span>
            <button 
              type="button" 
              className={`btn-filter ${statusFilter === 'all' ? 'active' : ''}`}
              onClick={() => setStatusFilter('all')}
            >
              All ({totalCount})
            </button>
            <button 
              type="button" 
              className={`btn-filter ideal ${statusFilter === 'ideal' ? 'active' : ''}`}
              onClick={() => setStatusFilter('ideal')}
            >
              ✅ Great Answers ({idealCount})
            </button>
            <button 
              type="button" 
              className={`btn-filter improvement ${statusFilter === 'needs_improvement' ? 'active' : ''}`}
              onClick={() => setStatusFilter('needs_improvement')}
            >
              ⚠️ Needs Improvement ({totalCount - idealCount})
            </button>
          </div>

          <div className="filter-button-group">
            <span className="control-group-label">Section:</span>
            <select 
              className="review-section-select"
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value === 'all' ? 'all' : parseInt(e.target.value, 10))}
            >
              <option value="all">All Sections (1 to 4)</option>
              <option value="1">Section 1: Likert Scale (1-60)</option>
              <option value="2">Section 2: Forced Choice (61-100)</option>
              <option value="3">Section 3: Situational Judgement (101-130)</option>
              <option value="4">Section 4: Motivation & Values (131-150)</option>
            </select>
          </div>

          <div className="search-box-wrapper">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              className="review-search-input"
              placeholder="Search by question text, #ID, or scenario..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                type="button" 
                className="btn-clear-search" 
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter Summary Banner */}
        <div className="review-active-filter-summary">
          Showing <strong>{filteredQuestions.length}</strong> of {totalCount} questions
          {categoryFilter !== 'all' && (
            <span className="active-tag">
              Category: {CATEGORY_CONFIG[categoryFilter].label}
              <button type="button" onClick={() => setCategoryFilter('all')}>✕</button>
            </span>
          )}
          {sectionFilter !== 'all' && (
            <span className="active-tag">
              {sectionLabels[sectionFilter as number]}
              <button type="button" onClick={() => setSectionFilter('all')}>✕</button>
            </span>
          )}
          {statusFilter !== 'all' && (
            <span className="active-tag">
              {statusFilter === 'ideal' ? '✅ Great Answers' : '⚠️ Needs Improvement'}
              <button type="button" onClick={() => setStatusFilter('all')}>✕</button>
            </span>
          )}
        </div>

        {/* Questions List */}
        <div className="review-questions-list">
          {filteredQuestions.length === 0 ? (
            <div className="empty-results-card">
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔎</div>
              <h3>No questions match your filter criteria</h3>
              <p>Try clearing filters or search query to view all questions.</p>
              <button 
                type="button" 
                className="btn-primary-action"
                style={{ marginTop: '1rem' }}
                onClick={() => {
                  setStatusFilter('all');
                  setSectionFilter('all');
                  setCategoryFilter('all');
                  setSearchQuery('');
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredQuestions.map(q => {
              const exp = getExplanationForQuestion(testType, q.id);
              if (!exp) return null;

              const userAns = answers[q.id];
              const match = isAnswerIdeal(q, exp, userAns);
              const catCfg = CATEGORY_CONFIG[q.category] || { label: q.category, icon: '📋' };

              return (
                <div 
                  key={q.id} 
                  id={`review-q-${q.id}`}
                  className={`review-question-card ${match ? 'is-ideal-match' : 'is-improvement-needed'}`}
                >
                  {/* Card Header */}
                  <div className="review-q-header">
                    <div className="q-meta-badges">
                      <span className="q-number-pill">Question {q.id}</span>
                      <span className="q-section-pill">Sec {q.section}: {q.type.toUpperCase().replace('_', ' ')}</span>
                      <span className="q-cat-pill">{catCfg.icon} {catCfg.label}</span>
                    </div>

                    <div className={`review-match-status-badge ${match ? 'status-ideal' : 'status-improvement'}`}>
                      {match ? (
                        <span>✅ Great answer!</span>
                      ) : (
                        <span>⚠️ Here's a better approach</span>
                      )}
                    </div>
                  </div>

                  {/* Question Content / Scenario */}
                  <div className="review-q-prompt">
                    {q.scenario ? (
                      <div className="scenario-callout-box">
                        <div className="scenario-tag">🚨 Work Scenario</div>
                        <p className="scenario-text">{q.scenario}</p>
                        {q.text && <p className="scenario-prompt-text">{q.text}</p>}
                      </div>
                    ) : (
                      <div className="prompt-text-regular">
                        {q.text}
                      </div>
                    )}
                  </div>

                  {/* Comparison Row: User Answer vs Ideal Answer */}
                  <div className="answer-comparison-grid">
                    <div className={`answer-box user-answer-box ${match ? 'user-matched' : 'user-unmatched'}`}>
                      <div className="answer-box-header">
                        <span className="answer-box-role">Your Selected Answer:</span>
                        {match ? <span className="tag-ok">Aligned ✅</span> : <span className="tag-diverged">Diverged ⚠️</span>}
                      </div>
                      <div className="answer-box-content">
                        {formatAnswerDisplay(q, userAns)}
                      </div>
                    </div>

                    <div className="answer-box ideal-answer-box">
                      <div className="answer-box-header">
                        <span className="answer-box-role">Ideal / Benchmark Answer:</span>
                        <span className="tag-target">Target Standard 🎯</span>
                      </div>
                      <div className="answer-box-content">
                        {exp.idealAnswerText}
                      </div>
                    </div>
                  </div>

                  {/* EXPLANATION PANEL */}
                  <div className="explanation-panel">
                    {/* Why this is the ideal answer */}
                    <div className="why-ideal-container">
                      <div className="why-ideal-title">
                        <span>✅</span>
                        <span>Why this is the ideal answer:</span>
                      </div>
                      <p className="why-ideal-body">
                        {exp.whyIdeal}
                      </p>
                    </div>

                    {/* Option-by-Option Breakdown */}
                    <div className="critiques-container">
                      <div className="critiques-title">
                        <span>{q.type === 'likert' ? '📊 Rating Scale Analysis (1 to 5):' : (q.type === 'forced_choice' ? '⚖️ Behavioral Trade-Off Breakdown:' : '❌ Why other options are less ideal:')}</span>
                      </div>

                      <div className="critiques-grid">
                        {exp.optionCritiques.map((crit, cIdx) => {
                          const isUserChoice = 
                            (q.type === 'forced_choice' && userAns === crit.key) ||
                            (q.type === 'likert' && (
                              (crit.key === String(userAns)) ||
                              (crit.key === '1 - 2' && (userAns === 1 || userAns === 2)) ||
                              (crit.key === '1 - 3' && (userAns <= 3)) ||
                              (crit.key === '2 - 3' && (userAns === 2 || userAns === 3)) ||
                              (crit.key === '4 - 5' && (userAns >= 4))
                            )) ||
                            ((q.type === 'sjt' || q.type === 'motivation') && chrToIdx(crit.key) === userAns);

                          return (
                            <div 
                              key={cIdx} 
                              className={`critique-item-card ${crit.isIdeal ? 'critique-ideal' : 'critique-less-ideal'} ${isUserChoice ? 'is-user-selected' : ''}`}
                            >
                              <div className="critique-item-top">
                                <div className="critique-key-box">
                                  <span className="crit-key">{crit.key}</span>
                                  {isUserChoice && <span className="user-choice-tag">Your Choice</span>}
                                </div>
                                <span className={`critique-badge badge-${crit.status}`}>
                                  {crit.status === 'best' && 'Best Answer ✅'}
                                  {crit.status === 'partially_acceptable' && 'Partially Acceptable ⚠️'}
                                  {crit.status === 'less_ideal' && 'Less Ideal ❌'}
                                  {crit.status === 'risky' && 'High Risk / Trap 🚨'}
                                </span>
                              </div>
                              <div className="critique-option-label">{crit.label}</div>
                              <div className="critique-reason-text">{crit.reason}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Consistency Note if present */}
                    {exp.consistencyNote && (
                      <div className="consistency-flag-box">
                        <span className="flag-icon">🛡️</span>
                        <div>
                          <strong>{exp.consistencyNote}</strong>
                        </div>
                      </div>
                    )}

                    {/* HR Perspective */}
                    <div className="hr-insight-box">
                      <span className="hr-icon">💡</span>
                      <div>
                        <strong>HR & Leadership Perspective:</strong> {exp.hrPerspective}
                      </div>
                    </div>
                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* Bottom Educational Summary: What to Improve */}
        <div className="what-to-improve-card">
          <div className="wt-header">
            <span>📈</span>
            <h2>Actionable Takeaways & Growth Recommendations</h2>
          </div>
          <p className="wt-subtitle">
            Synthesized guidance based on questions where your responses diverged from high-reliability enterprise benchmarks.
          </p>

          <div className="wt-grid">
            <div className="wt-item">
              <div className="wt-item-icon">🔍</div>
              <div className="wt-item-title">1. Root-Cause Discipline Over Quick Band-Aids</div>
              <div className="wt-item-desc">
                When operational incidents or technical bugs emerge, prioritize diagnostic evidence (logs, traces, ledgers) before applying speculative patches or altering parameters blindly.
              </div>
            </div>

            <div className="wt-item">
              <div className="wt-item-icon">🤝</div>
              <div className="wt-item-title">2. Proactive Transparency & Escalation</div>
              <div className="wt-item-desc">
                Never troubleshoot in an isolated silo during high-stakes deadlines. Inform leads early, discuss trade-offs openly, and maintain shared visibility across affected teams.
              </div>
            </div>

            <div className="wt-item">
              <div className="wt-item-icon">⚖️</div>
              <div className="wt-item-title">3. Intellectual Humility & Consistency</div>
              <div className="wt-item-desc">
                High-performing cultures value realistic self-awareness and receptivity to peer review over claims of perfection. Consistently invite feedback to sharpen outcomes.
              </div>
            </div>

            <div className="wt-item">
              <div className="wt-item-icon">🚀</div>
              <div className="wt-item-title">4. Balancing Quality with Delivery Cadence</div>
              <div className="wt-item-desc">
                Purity in design and rapid execution are not mutually exclusive. Slice large initiatives into small, verifiable milestones so business value flows continuously without compromising standards.
              </div>
            </div>
          </div>

          <div className="wt-footer-actions">
            <button 
              type="button" 
              className="btn-primary-action"
              onClick={onBackToResults}
              style={{ minWidth: '220px' }}
            >
              <span>← Back to Results Profile</span>
            </button>
            <button 
              type="button" 
              className="btn-header"
              onClick={onGoHome}
              style={{ minWidth: '180px', background: '#334155', color: '#f8fafc', border: '1px solid #475569' }}
            >
              <span>🏠 Back to Home</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

function chrToIdx(chr: string): number {
  if (chr === 'A') return 0;
  if (chr === 'B') return 1;
  if (chr === 'C') return 2;
  if (chr === 'D') return 3;
  const num = parseInt(chr, 10);
  return isNaN(num) ? -1 : num;
}
