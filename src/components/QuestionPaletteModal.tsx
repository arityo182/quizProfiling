import React, { useState } from 'react';
import { Question } from '../types';

interface QuestionPaletteModalProps {
  isOpen: boolean;
  questions: Question[];
  currentQuestionId: number;
  answers: Record<number, any>;
  flaggedQuestions: Set<number>;
  onClose: () => void;
  onSelectQuestion: (questionId: number) => void;
}

export const QuestionPaletteModal: React.FC<QuestionPaletteModalProps> = ({
  isOpen,
  questions,
  currentQuestionId,
  answers,
  flaggedQuestions,
  onClose,
  onSelectQuestion
}) => {
  const [filter, setFilter] = useState<'all' | 'unanswered' | 'answered' | 'flagged' | 1 | 2 | 3 | 4>('all');

  if (!isOpen) return null;

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = questions.length - answeredCount;
  const flaggedCount = flaggedQuestions.size;

  const filteredQuestions = questions.filter(q => {
    const isAnswered = answers[q.id] !== undefined;
    const isFlagged = flaggedQuestions.has(q.id);

    if (filter === 'answered') return isAnswered;
    if (filter === 'unanswered') return !isAnswered;
    if (filter === 'flagged') return isFlagged;
    if (typeof filter === 'number') return q.section === filter;
    return true;
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <span>🔢</span>
            <span>Question Navigator (150 Questions)</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
        </div>

        {/* Filter Bar */}
        <div className="palette-filter-bar">
          <button
            className={`palette-filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All (150)
          </button>
          <button
            className={`palette-filter-btn ${filter === 'unanswered' ? 'active' : ''}`}
            onClick={() => setFilter('unanswered')}
          >
            Unanswered ({unansweredCount})
          </button>
          <button
            className={`palette-filter-btn ${filter === 'answered' ? 'active' : ''}`}
            onClick={() => setFilter('answered')}
          >
            Answered ({answeredCount})
          </button>
          <button
            className={`palette-filter-btn ${filter === 'flagged' ? 'active' : ''}`}
            onClick={() => setFilter('flagged')}
          >
            Flagged ({flaggedCount})
          </button>
          <button
            className={`palette-filter-btn ${filter === 1 ? 'active' : ''}`}
            onClick={() => setFilter(1)}
          >
            1. Likert (1-60)
          </button>
          <button
            className={`palette-filter-btn ${filter === 2 ? 'active' : ''}`}
            onClick={() => setFilter(2)}
          >
            2. Forced Choice (61-100)
          </button>
          <button
            className={`palette-filter-btn ${filter === 3 ? 'active' : ''}`}
            onClick={() => setFilter(3)}
          >
            3. SJT (101-130)
          </button>
          <button
            className={`palette-filter-btn ${filter === 4 ? 'active' : ''}`}
            onClick={() => setFilter(4)}
          >
            4. Motivation (131-150)
          </button>
        </div>

        {/* Legend */}
        <div className="palette-legend">
          <div className="legend-item">
            <div className="legend-dot" style={{ background: '#10b981' }}></div>
            <span>Answered</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: '#f8fafc', border: '1px solid #cbd5e1' }}></div>
            <span>Unanswered</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: '#fef3c7', border: '1px solid #f59e0b' }}></div>
            <span>Flagged (★)</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: '#2563eb' }}></div>
            <span>Current Active</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid-150">
          {filteredQuestions.map(q => {
            const isAnswered = answers[q.id] !== undefined;
            const isFlagged = flaggedQuestions.has(q.id);
            const isCurrent = q.id === currentQuestionId;

            let bubbleClass = 'palette-bubble';
            if (isAnswered) bubbleClass += ' answered';
            if (isFlagged) bubbleClass += ' flagged';
            if (isCurrent) bubbleClass += ' current';

            return (
              <div
                key={q.id}
                className={bubbleClass}
                title={`Question ${q.id} (${q.type})`}
                onClick={() => onSelectQuestion(q.id)}
              >
                {q.id}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
