import React from 'react';
import { TestType } from '../types';

interface IntroViewProps {
  testType: TestType;
  candidateName: string;
  durationMinutes: number;
  onNameChange: (name: string) => void;
  onDurationChange: (duration: number) => void;
  onStart: () => void;
  onBackToLanding: () => void;
}

export const IntroView: React.FC<IntroViewProps> = ({
  testType,
  candidateName,
  durationMinutes,
  onNameChange,
  onDurationChange,
  onStart,
  onBackToLanding
}) => {
  const isJava = testType === 'java';

  return (
    <div className="view-container">
      <div className="hero-card">
        <div style={{ marginBottom: '1rem' }}>
          <button 
            type="button" 
            className="btn-back-nav" 
            onClick={onBackToLanding}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'none',
              border: 'none',
              color: '#3b82f6',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
              padding: '0.25rem 0'
            }}
          >
            ← Back to Test Selection
          </button>
        </div>

        <div className="hero-header">
          <div className="hero-badge">
            {isJava ? '🖥️ Java Engineering Competency Assessment' : '👔 Workplace Behavioral & Competency Assessment'}
          </div>
          <h1 className="hero-title">
            {isJava ? 'Java Developer Person Profiling Test' : 'General Professional Person Profiling Test'}
          </h1>
          <p className="hero-subtitle">
            {isJava
              ? 'A comprehensive, psychometric and behavioral profiling instrument designed to evaluate technical mindset, architectural vision, engineering discipline, problem-solving tenacity, and teamwork dynamics for Senior and Lead Java Engineers.'
              : 'A comprehensive psychometric and workplace behavioral profiling instrument designed to evaluate strategic vision, data-driven analysis, collaboration dynamics, operational execution, and innovative agility for any professional role.'}
          </p>
        </div>

        {/* Structure Grid */}
        <div className="assessment-structure-grid">
          <div className="structure-item">
            <div className="structure-icon">📊</div>
            <div className="structure-title">1. Likert Scale</div>
            <div className="structure-desc">
              {isJava
                ? 'Evaluate engineering philosophy, quality habits, and self-awareness across a 1-5 scale.'
                : 'Evaluate workplace ethics, feedback receptivity, communication norms, and self-awareness on a 1-5 scale.'}
            </div>
            <div className="structure-badge">60 Questions</div>
          </div>
          <div className="structure-item">
            <div className="structure-icon">⚖️</div>
            <div className="structure-title">2. Forced Choice</div>
            <div className="structure-desc">
              {isJava
                ? 'Resolve trade-off dilemmas between Speed vs Quality, Solo vs Team, and Detail vs Big Picture.'
                : 'Resolve real-world dilemmas between Speed vs Quality, Solo vs Team, and Detail vs Big Picture.'}
            </div>
            <div className="structure-badge">40 Questions</div>
          </div>
          <div className="structure-item">
            <div className="structure-icon">🚨</div>
            <div className="structure-title">3. Situational Judgement</div>
            <div className="structure-desc">
              {isJava
                ? 'Navigate realistic production incidents, deadlocks, code reviews, and architectural disputes.'
                : 'Navigate realistic workplace challenges, sudden scope changes, stakeholder friction, and priority conflicts.'}
            </div>
            <div className="structure-badge">30 Scenarios</div>
          </div>
          <div className="structure-item">
            <div className="structure-icon">🎯</div>
            <div className="structure-title">4. Motivation & Values</div>
            <div className="structure-desc">
              {isJava
                ? 'Identify underlying career motivators, leadership styles, and engineering culture fit.'
                : 'Identify intrinsic career drivers, leadership philosophy, and organizational culture compatibility.'}
            </div>
            <div className="structure-badge">20 Questions</div>
          </div>
        </div>

        {/* Setup Form */}
        <div className="setup-form-card">
          <div className="form-group">
            <label className="form-label" htmlFor="candidateName">Candidate Full Name / Identifier</label>
            <input
              type="text"
              id="candidateName"
              className="form-input"
              placeholder={isJava ? 'e.g. Alex Morgan (Senior Java Engineer)' : 'e.g. Jordan Taylor (Operations Manager / Analyst)'}
              value={candidateName}
              onChange={(e) => onNameChange(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Test Duration (Timed Countdown)</label>
            <div className="duration-options">
              <div
                className={`duration-radio-card ${durationMinutes === 90 ? 'selected' : ''}`}
                onClick={() => onDurationChange(90)}
              >
                <div className="duration-title">
                  <span>⏱️ 90 Minutes</span>
                  <span style={{ color: durationMinutes === 90 ? 'var(--accent-green)' : '#cbd5e1' }}>●</span>
                </div>
                <div className="duration-sub">Standard Pace (~36 sec / question)</div>
              </div>
              <div
                className={`duration-radio-card ${durationMinutes === 120 ? 'selected' : ''}`}
                onClick={() => onDurationChange(120)}
              >
                <div className="duration-title">
                  <span>⏱️ 120 Minutes</span>
                  <span style={{ color: durationMinutes === 120 ? 'var(--accent-green)' : '#cbd5e1' }}>●</span>
                </div>
                <div className="duration-sub">Comprehensive Pace (~48 sec / question)</div>
              </div>
            </div>
          </div>

          <div style={{ background: '#e2e8f0', borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem', fontSize: '0.775rem', color: '#475569', marginTop: '1rem', lineHeight: 1.45 }}>
            🔒 <strong>Evaluation Safeguards:</strong> This assessment contains built-in consistency checks, overconfidence probes, and social-desirability traps. Authentic and balanced responses produce the highest accuracy profile.
          </div>

          <div className="cta-button-container">
            <button className="btn-primary-action" onClick={onStart}>
              <span>Start Assessment Now</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
