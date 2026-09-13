import React from 'react';
import { Question } from '../types';
import { CATEGORY_CONFIG } from '../data/questions';

interface TestViewProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  currentAnswer: any;
  isFlagged: boolean;
  sectionAnswersCount: Record<number, { answered: number; total: number }>;
  onSelectAnswer: (val: any) => void;
  onToggleFlag: () => void;
  onPrev: () => void;
  onNext: () => void;
  onJumpToSection: (section: number) => void;
  onOpenPalette: () => void;
}

export const TestView: React.FC<TestViewProps> = ({
  question,
  currentIndex,
  totalQuestions,
  currentAnswer,
  isFlagged,
  sectionAnswersCount,
  onSelectAnswer,
  onToggleFlag,
  onPrev,
  onNext,
  onJumpToSection,
  onOpenPalette
}) => {
  const catConfig = CATEGORY_CONFIG[question.category] || { label: question.category, weight: 1.0 };
  const isLastQuestion = currentIndex === totalQuestions - 1;

  return (
    <div className="view-container">
      {/* Section Navigation Tab Bar */}
      <div className="section-tabs-bar">
        {[1, 2, 3, 4].map(s => {
          const names: Record<number, string> = {
            1: "1. Likert Scale",
            2: "2. Forced Choice",
            3: "3. Situational Judgement",
            4: "4. Motivation & Values"
          };
          const count = sectionAnswersCount[s] || { answered: 0, total: 0 };
          const isComplete = count.answered === count.total && count.total > 0;

          return (
            <button
              key={s}
              className={`section-tab-btn ${question.section === s ? 'active' : ''} ${isComplete ? 'completed' : ''}`}
              onClick={() => onJumpToSection(s)}
            >
              <span>{names[s]}</span>
              <span className="tab-counter">{count.answered}/{count.total} answered</span>
            </button>
          );
        })}
      </div>

      {/* Question Card Container */}
      <div className="question-card-wrapper">
        {/* Meta Header */}
        <div className="question-meta-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <div className="q-number-badge">Question {question.id} of {totalQuestions}</div>
            <div className="q-category-tag">
              <span>🏷️</span>
              <span>{catConfig.label}</span>
            </div>
            <div className="q-category-tag" style={{ background: '#e0f2fe', color: '#0369a1' }}>
              <span>⚖️</span>
              <span>Weight: {catConfig.weight.toFixed(1)}</span>
            </div>
          </div>
          {isFlagged && (
            <div className="q-flag-indicator">
              <span>🔖 Flagged for review</span>
            </div>
          )}
        </div>

        {/* Dynamic Question Body */}
        <div className="question-body">
          {/* 1. LIKERT SCALE */}
          {question.type === 'likert' && (
            <div>
              <div className="question-prompt-text">{question.text}</div>
              <div className="likert-container">
                {[
                  { val: 1, label: "Strongly Disagree", key: "1" },
                  { val: 2, label: "Disagree", key: "2" },
                  { val: 3, label: "Neutral", key: "3" },
                  { val: 4, label: "Agree", key: "4" },
                  { val: 5, label: "Strongly Agree", key: "5" }
                ].map(opt => (
                  <button
                    key={opt.val}
                    type="button"
                    className={`likert-btn ${currentAnswer === opt.val ? 'selected' : ''}`}
                    onClick={() => onSelectAnswer(opt.val)}
                  >
                    <span className="likert-shortcut">{opt.key}</span>
                    <div className="likert-circle">{opt.val}</div>
                    <span className="likert-label">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. FORCED CHOICE */}
          {question.type === 'forced_choice' && (
            <div>
              <div className="question-prompt-text">{question.text}</div>
              <div className="forced-choice-grid">
                {[
                  { val: 'A', text: question.option_a, key: 'A', badge: 'OPTION A' },
                  { val: 'B', text: question.option_b, key: 'B', badge: 'OPTION B' }
                ].map(opt => (
                  <div
                    key={opt.val}
                    className={`forced-choice-card ${currentAnswer === opt.val ? 'selected' : ''}`}
                    onClick={() => onSelectAnswer(opt.val)}
                  >
                    <div className="fc-header">
                      <span className="fc-badge">{opt.badge}</span>
                      <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 700, background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px' }}>
                        KEY [{opt.key}]
                      </span>
                    </div>
                    <div className="fc-text">{opt.text}</div>
                    <div className="fc-radio-indicator">
                      <div className="radio-dot"></div>
                      <span>{currentAnswer === opt.val ? 'Selected' : 'Click to choose'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. SITUATIONAL JUDGEMENT (SJT) */}
          {question.type === 'sjt' && (
            <div>
              <div className="scenario-box">
                <div className="scenario-tag">
                  <span>🚨</span>
                  <span>Real-World Java Engineering Scenario</span>
                </div>
                <div>{question.scenario}</div>
              </div>

              <div className="question-prompt-text" style={{ fontSize: '1.05rem', marginBottom: '1rem' }}>
                {question.question}
              </div>

              <div className="options-stack">
                {question.options?.map((optText, optIdx) => {
                  const letters = ['A', 'B', 'C', 'D'];
                  const letter = letters[optIdx];
                  return (
                    <div
                      key={optIdx}
                      className={`option-card-sjt ${currentAnswer === optIdx ? 'selected' : ''}`}
                      onClick={() => onSelectAnswer(optIdx)}
                    >
                      <div className="opt-letter">{letter}</div>
                      <div className="opt-text">{optText}</div>
                      <span className="opt-shortcut">[{letter}]</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. MOTIVATION */}
          {question.type === 'motivation' && (
            <div>
              <div className="question-prompt-text">
                <span>🎯</span> {question.text}
              </div>

              <div className="options-stack">
                {question.options?.map((optText, optIdx) => {
                  const letters = ['A', 'B', 'C', 'D'];
                  const letter = letters[optIdx];
                  return (
                    <div
                      key={optIdx}
                      className={`motivation-option-card ${currentAnswer === optIdx ? 'selected' : ''}`}
                      onClick={() => onSelectAnswer(optIdx)}
                    >
                      <div className="opt-letter">{letter}</div>
                      <div className="opt-text">{optText}</div>
                      <span className="opt-shortcut">[{letter}]</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Controls */}
        <div className="question-footer-controls">
          <div className="footer-left-actions">
            <button
              className="nav-btn btn-prev"
              onClick={onPrev}
              disabled={currentIndex === 0}
            >
              <span>←</span>
              <span>Previous</span>
            </button>
            <button
              className={`btn-flag ${isFlagged ? 'flagged' : ''}`}
              onClick={onToggleFlag}
            >
              <span>🔖</span>
              <span>{isFlagged ? 'Flagged' : 'Flag'}</span>
            </button>
            <button className="btn-palette-toggle" onClick={onOpenPalette}>
              <span>🔢 All Questions</span>
            </button>
          </div>

          <div className="footer-right-actions">
            <button
              className={`nav-btn ${isLastQuestion ? 'btn-finish' : 'btn-next'}`}
              onClick={onNext}
            >
              <span>{isLastQuestion ? 'Submit Assessment' : 'Next'}</span>
              <span>{isLastQuestion ? '✓' : '→'}</span>
            </button>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.75rem', color: '#94a3b8' }}>
        Keyboard shortcuts: <strong>1-5</strong> or <strong>A-D</strong> to select &bull; <strong>← / →</strong> for Prev / Next &bull; <strong>F</strong> to Flag
      </div>
    </div>
  );
};
