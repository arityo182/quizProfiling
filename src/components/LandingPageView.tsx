import React from 'react';
import { TestType } from '../types';

interface LandingPageViewProps {
  onSelectTest: (test: TestType) => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({ onSelectTest }) => {
  return (
    <div className="view-container">
      <div className="landing-card">
        <div className="landing-header">
          <div className="hero-badge">Psychometric & Behavioral Profiling System</div>
          <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
            Person Profiling Test
          </h1>
          <p className="hero-subtitle" style={{ maxWidth: '780px', margin: '0 auto 1.5rem' }}>
            A rigorous, multi-dimensional assessment platform evaluating cognitive work styles, 
            behavioral tendencies, problem-solving methodologies, and team dynamics.
          </p>
        </div>

        <div className="landing-selection-box">
          <div className="selection-box-header">
            <span className="selection-box-label">Choose your test track:</span>
          </div>

          <div className="test-tracks-grid">
            {/* Track 1: Java Developer */}
            <div 
              className="track-card java-track"
              onClick={() => onSelectTest('java')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectTest('java'); }}
            >
              <div className="track-badge tech-badge">💻 Engineering Track</div>
              <div className="track-icon-wrapper">
                <span className="track-icon">🖥️</span>
              </div>
              <h2 className="track-title">Java Developer Test</h2>
              <p className="track-tagline">Specifically for software developers & tech leads</p>
              
              <div className="track-description">
                Tailored for backend engineers and software craftsmen. Evaluates enterprise design principles, 
                JVM concurrency tenacity, sprint delivery velocity, code review empathy, and technical debt stewardship.
              </div>

              <div className="track-meta-list">
                <div className="track-meta-item">
                  <span className="meta-dot">●</span>
                  <strong>150 Questions:</strong> Likert, Forced Choice, SJT & Motivation
                </div>
                <div className="track-meta-item">
                  <span className="meta-dot">●</span>
                  <strong>5 Developer Personas:</strong> Architect, Debugger, Collaborator, Executor, Learner
                </div>
                <div className="track-meta-item">
                  <span className="meta-dot">●</span>
                  <strong>Domain Scenarios:</strong> TDD, PR friction, GC latency, microservices
                </div>
              </div>

              <button 
                type="button" 
                className="btn-track-select btn-java"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectTest('java');
                }}
              >
                <span>Launch Java Developer Test</span>
                <span>→</span>
              </button>
            </div>

            {/* Track 2: General Professional */}
            <div 
              className="track-card general-track"
              onClick={() => onSelectTest('general')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectTest('general'); }}
            >
              <div className="track-badge general-badge">👔 Professional Track</div>
              <div className="track-icon-wrapper">
                <span className="track-icon">👔</span>
              </div>
              <h2 className="track-title">General Professional Test</h2>
              <p className="track-tagline">Suitable for any job position & business role</p>
              
              <div className="track-description">
                Designed for versatile workplace talent across operations, management, marketing, product, and finance. 
                Evaluates strategic planning, data-driven analysis, collaboration, execution discipline, and innovation agility.
              </div>

              <div className="track-meta-list">
                <div className="track-meta-item">
                  <span className="meta-dot">●</span>
                  <strong>150 Questions:</strong> Likert, Forced Choice, SJT & Motivation
                </div>
                <div className="track-meta-item">
                  <span className="meta-dot">●</span>
                  <strong>5 Professional Personas:</strong> Strategist, Analyst, Collaborator, Executor, Innovator
                </div>
                <div className="track-meta-item">
                  <span className="meta-dot">●</span>
                  <strong>Workplace Scenarios:</strong> Cross-functional alignment, shifting goals, crisis communication
                </div>
              </div>

              <button 
                type="button" 
                className="btn-track-select btn-general"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectTest('general');
                }}
              >
                <span>Launch General Professional Test</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Global Assessment Highlights */}
        <div className="landing-specs-grid">
          <div className="spec-card">
            <div className="spec-icon">⏱️</div>
            <div className="spec-title">90 – 120 Minutes</div>
            <div className="spec-desc">Structured countdown timer with flexible pacing for deep reflection.</div>
          </div>
          <div className="spec-card">
            <div className="spec-icon">📊</div>
            <div className="spec-title">4 Question Types</div>
            <div className="spec-desc">Likert (60), Forced Choice (40), Situational Judgement (30), Motivation (20).</div>
          </div>
          <div className="spec-card">
            <div className="spec-icon">🛡️</div>
            <div className="spec-title">Trap & Honesty Audit</div>
            <div className="spec-desc">Overconfidence probes, social desirability traps, and consistency cross-checks.</div>
          </div>
          <div className="spec-card">
            <div className="spec-icon">📈</div>
            <div className="spec-title">Comprehensive Report</div>
            <div className="spec-desc">Radar charts, category scores, persona mapping, and exportable PDF print format.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
