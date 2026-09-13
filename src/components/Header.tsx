import React, { useState } from 'react';
import { PersonaType } from '../types';

interface HeaderProps {
  currentView: 'intro' | 'test' | 'results';
  currentSection: number;
  currentQuestionId: number;
  totalQuestions: number;
  answeredCount: number;
  secondsRemaining: number;
  onOpenPalette: () => void;
  onAutoFill: (persona: PersonaType | 'random') => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  currentSection,
  currentQuestionId,
  totalQuestions,
  answeredCount,
  secondsRemaining,
  onOpenPalette,
  onAutoFill,
  onReset
}) => {
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);

  const pct = Math.round((answeredCount / totalQuestions) * 100);

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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '320px' }}>
          <div className="brand-logo" onClick={onReset}>
            <div className="brand-icon">☕</div>
            <span>JavaDev Profiler</span>
            <span className="brand-tag">React+TS</span>
          </div>
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
          {currentView === 'test' && (
            <>
              <div className={getTimerClass(secondsRemaining)}>
                <span>⏱️</span>
                <span>{formatTimer(secondsRemaining)}</span>
              </div>

              <button className="btn-header" onClick={onOpenPalette}>
                <span>🔢</span>
                <span>{currentQuestionId}/{totalQuestions}</span>
              </button>
            </>
          )}

          {/* Demo Auto-Fill Menu */}
          <div className="demo-dropdown">
            <button className="btn-header" onClick={() => setDemoMenuOpen(!demoMenuOpen)}>
              <span>⚡ Demo Profiles</span>
              <span>▼</span>
            </button>
            {demoMenuOpen && (
              <div className="demo-menu" onClick={() => setDemoMenuOpen(false)}>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', padding: '4px 8px', fontWeight: 700, textTransform: 'uppercase' }}>
                  Simulate Candidate:
                </div>
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
                <button className="demo-item" onClick={() => onAutoFill('random')}>
                  🎲 Random Simulation
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
