import React from 'react';
import { Question } from '../types';

interface SubmitWarningModalProps {
  isOpen: boolean;
  unansweredQuestions: Question[];
  onClose: () => void;
  onReviewFirst: () => void;
  onJumpToQuestion: (qId: number) => void;
  onSubmitAnyway: () => void;
}

export const SubmitWarningModal: React.FC<SubmitWarningModalProps> = ({
  isOpen,
  unansweredQuestions,
  onClose,
  onReviewFirst,
  onJumpToQuestion,
  onSubmitAnyway
}) => {
  if (!isOpen) return null;

  const isAllAnswered = unansweredQuestions.length === 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '550px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <span>{isAllAnswered ? '✅' : '⚠️'}</span>
            <span>{isAllAnswered ? 'Ready to Generate Profile' : `Incomplete Assessment (${unansweredQuestions.length} Remaining)`}</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
        </div>

        <div>
          {isAllAnswered ? (
            <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.5 }}>
              You have completed all 150 questions across all 4 sections. Ready to view your detailed Java Developer Persona and Competency Breakdown?
            </p>
          ) : (
            <>
              <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.5 }}>
                You have {unansweredQuestions.length} unanswered question(s). Submitting without answering may lower your category scores. You can review them now or submit anyway:
              </p>

              <div className="unanswered-list-container">
                {unansweredQuestions.slice(0, 50).map(q => (
                  <span
                    key={q.id}
                    className="unanswered-pill"
                    onClick={() => {
                      onClose();
                      onJumpToQuestion(q.id);
                    }}
                  >
                    Q{q.id}
                  </span>
                ))}
                {unansweredQuestions.length > 50 && (
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    +{unansweredQuestions.length - 50} more
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          {isAllAnswered ? (
            <button className="nav-btn btn-finish" onClick={onSubmitAnyway}>
              Generate Profile Report
            </button>
          ) : (
            <>
              <button className="nav-btn btn-finish" onClick={onReviewFirst}>
                Review First Unanswered
              </button>
              <button className="nav-btn btn-prev" style={{ color: '#ef4444' }} onClick={onSubmitAnyway}>
                Submit Anyway
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
