import React, { useState } from 'react';
import { PersonaType, TestType } from '../types';

interface HeaderProps {
  currentView: 'landing' | 'intro' | 'test' | 'results' | 'review';
  selectedTest: TestType | null;
  currentSection: number;
  currentQuestionId: number;
  totalQuestions: number;
  answeredCount: number;
  secondsRemaining: number;
  onOpenPalette: () => void;
  onAutoFill: (persona: PersonaType | 'random') => void;
  onReset: () => void;
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  selectedTest,
  currentSection,
  currentQuestionId,
  totalQuestions,
  answeredCount,
  secondsRemaining,
  onOpenPalette,
  onAutoFill,
  onReset,
  onGoHome
}) => {
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);

  const pct = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  const formatTimer = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (hours > 0) {
      return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const getTimerClass = (secs: number) => {
    if (secs <= 300) return 'timer-pill danger';
    if (secs <= 900) return 'timer-pill warning';
    return 'timer-pill';
  };

  const secNames: Record<number, string> = {
    1: "Section 1: Likert Scale (1-60)",
    2: "Section 2: Forced Choice (61-100)",
    3: "Section 3: Situational Judgement (101-130)",
    4: "Section 4: Motivation & Values (131-150)"
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div 
            className="brand-logo" 
            onClick={onGoHome}
            title="Return to Assessment Landing Page"
            style={{ cursor: 'pointer' }}
          >
            <div className="brand-icon">
              {selectedTest === 'general' ? '👔' : '☕'}
            </div>
            <span>
              {selectedTest === 'general' ? 'ProProfiler' : 'JavaDev Profiler'}
            </span>
          </div>

          {selectedTest && (
            <span 
              className="test-type-badge"
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                background: selectedTest === 'java' ? 'rgba(37, 99, 235, 0.25)' : 'rgba(16, 185, 129, 0.25)',
                color: selectedTest === 'java' ? '#93c5fd' : '#6ee7b7',
                border: `1px solid ${selectedTest === 'java' ? '#3b82f6' : '#10b981'}`,
                padding: '2px 8px',
                borderRadius: '999px',
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap'
              }}
            >
              {selectedTest === 'java' ? 'Java Developer' : 'General Professional'}
            </span>
          )}
        </div>

        {currentView === 'test' && (
          <div className="header-center">
            <div className="progress-summary">
              <div className="progress-label-row">
                <span>{secNames[currentSection] || "Assessment"}</span>
                <span>{answeredCount}/{totalQuestions} ({pct}%)</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${pct}%` }}></div>
              </div>
            </div>
          </div>
        )}

        <div className="header-actions">
          {/* Back to Home Button */}
          <button 
            type="button" 
            className="btn-header" 
            onClick={onGoHome}
            title="Back to Landing Page"
          >
            <span>🏠</span>
            <span>Home</span>
          </button>

          {currentView === 'test' && (
            <>
              <div className={getTimerClass(secondsRemaining)}>
                <span>⏱️</span>
                <span>{formatTimer(secondsRemaining)}</span>
              </div>

              <button type="button" className="btn-header" onClick={onOpenPalette}>
                <span>🔢</span>
                <span>{currentQuestionId}/{totalQuestions}</span>
              </button>
            </>
          )}

          {/* Demo Auto-Fill Menu */}
          {selectedTest && (
            <div className="demo-dropdown">
              <button 
                type="button" 
                className="btn-header" 
                onClick={() => setDemoMenuOpen(!demoMenuOpen)}
              >
                <span>⚡ Demo Profiles</span>
                <span>▼</span>
              </button>
              {demoMenuOpen && (
                <div className="demo-menu" onClick={() => setDemoMenuOpen(false)}>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', padding: '4px 8px', fontWeight: 700, textTransform: 'uppercase' }}>
                    Simulate Candidate:
                  </div>

                  {selectedTest === 'java' ? (
                    <>
                      <button className="demo-item" onClick={() => onAutoFill('The Architect')}>
                        🏗️ The Architect (Design/Scale)
                      </button>
                      <button className="demo-item" onClick={() => onAutoFill('The Debugger')}>
                        🐛 The Debugger (Root Cause)
                      </button>
                      <button className="demo-item" onClick={() => onAutoFill('The Collaborator')}>
                        🤝 The Collaborator (Team/Sync)
                      </button>
                      <button className="demo-item" onClick={() => onAutoFill('The Executor')}>
                        🚀 The Executor (Delivery/Speed)
                      </button>
                      <button className="demo-item" onClick={() => onAutoFill('The Learner')}>
                        📚 The Learner (Curiosity/Growth)
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="demo-item" onClick={() => onAutoFill('The Strategist')}>
                        🏗️ The Strategist (Vision/Roadmap)
                      </button>
                      <button className="demo-item" onClick={() => onAutoFill('The Analyst')}>
                        🔍 The Analyst (Data/Thoroughness)
                      </button>
                      <button className="demo-item" onClick={() => onAutoFill('The Collaborator')}>
                        🤝 The Collaborator (Empathy/Team)
                      </button>
                      <button className="demo-item" onClick={() => onAutoFill('The Executor')}>
                        🚀 The Executor (Action/Pace)
                      </button>
                      <button className="demo-item" onClick={() => onAutoFill('The Innovator')}>
                        💡 The Innovator (Ideas/Agility)
                      </button>
                    </>
                  )}

                  <button className="demo-item" onClick={() => onAutoFill('random')}>
                    🎲 Random Simulation
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
