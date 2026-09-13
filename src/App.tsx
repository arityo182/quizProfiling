import { useState, useEffect, useMemo, useCallback } from 'react';
import { QUESTION_BANK } from './data/questions';
import { GENERAL_QUESTION_BANK } from './data/generalQuestions';
import { PersonaType, ProfilingResults, TestType } from './types';
import { calculateProfilingResults } from './utils/scoring';
import { Header } from './components/Header';
import { LandingPageView } from './components/LandingPageView';
import { IntroView } from './components/IntroView';
import { TestView } from './components/TestView';
import { ResultsView } from './components/ResultsView';
import { QuestionPaletteModal } from './components/QuestionPaletteModal';
import { SubmitWarningModal } from './components/SubmitWarningModal';
import './App.css';

export function App() {
  const [selectedTest, setSelectedTest] = useState<TestType | null>(null);
  const [view, setView] = useState<'landing' | 'intro' | 'test' | 'results'>('landing');
  const [candidateName, setCandidateName] = useState('Alex Morgan');
  const [durationMinutes, setDurationMinutes] = useState(90);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [secondsRemaining, setSecondsRemaining] = useState(90 * 60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isSubmitWarningOpen, setIsSubmitWarningOpen] = useState(false);
  const [results, setResults] = useState<ProfilingResults | null>(null);

  // Active question bank according to selected test track
  const activeQuestionBank = useMemo(() => {
    return selectedTest === 'general' ? GENERAL_QUESTION_BANK : QUESTION_BANK;
  }, [selectedTest]);

  // Current active question
  const currentQuestion = activeQuestionBank[currentQuestionIndex] || activeQuestionBank[0];

  // Section answered counts
  const sectionAnswersCount = useMemo(() => {
    const counts: Record<number, { answered: number; total: number }> = {
      1: { answered: 0, total: 0 },
      2: { answered: 0, total: 0 },
      3: { answered: 0, total: 0 },
      4: { answered: 0, total: 0 }
    };

    activeQuestionBank.forEach(q => {
      counts[q.section].total++;
      if (answers[q.id] !== undefined) {
        counts[q.section].answered++;
      }
    });

    return counts;
  }, [activeQuestionBank, answers]);

  // Unanswered questions
  const unansweredQuestions = useMemo(() => {
    return activeQuestionBank.filter(q => answers[q.id] === undefined);
  }, [activeQuestionBank, answers]);

  // Select Test Track from Landing Page
  const handleSelectTest = (track: TestType) => {
    setSelectedTest(track);
    setCandidateName(track === 'java' ? 'Alex Morgan' : 'Jordan Taylor');
    setAnswers({});
    setFlaggedQuestions(new Set());
    setCurrentQuestionIndex(0);
    setResults(null);
    setView('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Return to Landing Page (Home)
  const handleGoHome = () => {
    if (view === 'test') {
      if (!window.confirm("Are you sure you want to return to Home? Your current test progress will be lost.")) {
        return;
      }
    }
    setIsTimerActive(false);
    setAnswers({});
    setFlaggedQuestions(new Set());
    setCurrentQuestionIndex(0);
    setResults(null);
    setSelectedTest(null);
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start Assessment
  const handleStart = () => {
    setSecondsRemaining(durationMinutes * 60);
    setIsTimerActive(true);
    setView('test');
    setCurrentQuestionIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Timer Effect
  useEffect(() => {
    if (!isTimerActive) return;

    const interval = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsTimerActive(false);
          alert("Time has expired! The assessment will now submit your responses.");
          handleFinalize();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerActive]);

  // Select Answer
  const handleSelectAnswer = (val: any) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: val }));

    // Auto advance smoothly if not on last question
    if (currentQuestionIndex < activeQuestionBank.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 250);
    }
  };

  // Toggle Flag
  const handleToggleFlag = () => {
    setFlaggedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(currentQuestion.id)) {
        next.delete(currentQuestion.id);
      } else {
        next.add(currentQuestion.id);
      }
      return next;
    });
  };

  // Next / Prev Navigation
  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < activeQuestionBank.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsSubmitWarningOpen(true);
    }
  };

  const handleJumpToQuestion = (qId: number) => {
    const idx = activeQuestionBank.findIndex(q => q.id === qId);
    if (idx !== -1) {
      setCurrentQuestionIndex(idx);
    }
  };

  const handleJumpToSection = (sectionNum: number) => {
    const firstQ = activeQuestionBank.find(q => q.section === sectionNum);
    if (firstQ) {
      handleJumpToQuestion(firstQ.id);
    }
  };

  // Finalize Assessment
  const handleFinalize = useCallback(() => {
    setIsTimerActive(false);
    setIsSubmitWarningOpen(false);
    setIsPaletteOpen(false);
    const res = calculateProfilingResults(answers, selectedTest || 'java', activeQuestionBank);
    setResults(res);
    setView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [answers, selectedTest, activeQuestionBank]);

  // Reset Assessment for current test
  const handleReset = () => {
    if (view === 'intro' || window.confirm("Are you sure you want to reset this test? Current progress will be lost.")) {
      setIsTimerActive(false);
      setAnswers({});
      setFlaggedQuestions(new Set());
      setCurrentQuestionIndex(0);
      setResults(null);
      setView('intro');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Auto Fill Simulation
  const handleAutoFill = (profileType: PersonaType | 'random') => {
    const newAnswers: Record<number, any> = {};

    activeQuestionBank.forEach(q => {
      if (q.type === 'likert') {
        if (q.scoring === 'overconfidence_trap' || q.scoring === 'social_desirability_trap') {
          newAnswers[q.id] = (profileType === 'random') ? (Math.random() > 0.5 ? 2 : 4) : 2;
        } else if (q.scoring === 'negative') {
          newAnswers[q.id] = (profileType === 'random') ? Math.floor(Math.random() * 5) + 1 : 1;
        } else {
          // Java personas
          if (profileType === 'The Architect' && (q.trait === 'clean_architecture' || q.trait === 'system_design')) {
            newAnswers[q.id] = 5;
          } else if (profileType === 'The Debugger' && (q.category === 'problem_solving' || q.trait === 'tenacity')) {
            newAnswers[q.id] = 5;
          } else if (profileType === 'The Collaborator' && (q.category === 'teamwork' || q.trait === 'mentorship' || q.trait === 'active_listening' || q.trait === 'empathy')) {
            newAnswers[q.id] = 5;
          } else if (profileType === 'The Executor' && (q.trait === 'incremental_delivery' || q.trait === 'business_impact' || q.trait === 'execution_velocity' || q.trait === 'discipline')) {
            newAnswers[q.id] = 5;
          } else if (profileType === 'The Learner' && (q.trait === 'continuous_learning' || q.trait === 'deep_curiosity')) {
            newAnswers[q.id] = 5;
          // General personas
          } else if (profileType === 'The Strategist' && (q.trait === 'strategic_planning' || q.trait === 'big_picture' || q.trait === 'long_term_vision')) {
            newAnswers[q.id] = 5;
          } else if (profileType === 'The Analyst' && (q.trait === 'analytical_rigor' || q.trait === 'data_driven' || q.category === 'problem_solving')) {
            newAnswers[q.id] = 5;
          } else if (profileType === 'The Innovator' && (q.trait === 'adaptability' || q.trait === 'curiosity' || q.trait === 'creative_problem_solving')) {
            newAnswers[q.id] = 5;
          } else {
            newAnswers[q.id] = (profileType === 'random') ? Math.floor(Math.random() * 5) + 1 : 4;
          }
        }
      } else if (q.type === 'forced_choice') {
        if (profileType === 'random') {
          newAnswers[q.id] = Math.random() > 0.5 ? 'A' : 'B';
        } else {
          newAnswers[q.id] = (q.persona_a === profileType) ? 'A' : (q.persona_b === profileType ? 'B' : 'A');
        }
      } else if (q.type === 'sjt') {
        if (profileType === 'random') {
          newAnswers[q.id] = Math.floor(Math.random() * 4);
        } else {
          newAnswers[q.id] = q.best_option ?? 0;
        }
      } else if (q.type === 'motivation') {
        if (profileType === 'random') {
          newAnswers[q.id] = Math.floor(Math.random() * 4);
        } else if (q.persona_map) {
          const idx = q.persona_map.indexOf(profileType as PersonaType);
          newAnswers[q.id] = idx !== -1 ? idx : 0;
        }
      }
    });

    setAnswers(newAnswers);
    setIsTimerActive(false);
    setIsSubmitWarningOpen(false);
    setIsPaletteOpen(false);
    const res = calculateProfilingResults(newAnswers, selectedTest || 'java', activeQuestionBank);
    setResults(res);
    setView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard Navigation
  useEffect(() => {
    if (view !== 'test' || isPaletteOpen || isSubmitWarningOpen || !currentQuestion) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key.toLowerCase() === 'f') {
        handleToggleFlag();
      }

      // Likert 1-5
      if (currentQuestion.type === 'likert' && ['1', '2', '3', '4', '5'].includes(e.key)) {
        handleSelectAnswer(parseInt(e.key, 10));
      }

      // Forced Choice A/B
      if (currentQuestion.type === 'forced_choice') {
        if (e.key.toLowerCase() === 'a') handleSelectAnswer('A');
        if (e.key.toLowerCase() === 'b') handleSelectAnswer('B');
      }

      // SJT & Motivation A/B/C/D
      if (currentQuestion.type === 'sjt' || currentQuestion.type === 'motivation') {
        const map: Record<string, number> = { a: 0, b: 1, c: 2, d: 3 };
        if (map[e.key.toLowerCase()] !== undefined) {
          handleSelectAnswer(map[e.key.toLowerCase()]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view, isPaletteOpen, isSubmitWarningOpen, currentQuestion, currentQuestionIndex, activeQuestionBank.length]);

  return (
    <>
      <Header
        currentView={view}
        selectedTest={selectedTest}
        currentSection={currentQuestion?.section || 1}
        currentQuestionId={currentQuestion?.id || 1}
        totalQuestions={activeQuestionBank.length}
        answeredCount={Object.keys(answers).length}
        secondsRemaining={secondsRemaining}
        onOpenPalette={() => setIsPaletteOpen(true)}
        onAutoFill={handleAutoFill}
        onReset={handleReset}
        onGoHome={handleGoHome}
      />

      <main className="app-main">
        {view === 'landing' && (
          <LandingPageView onSelectTest={handleSelectTest} />
        )}

        {view === 'intro' && selectedTest && (
          <IntroView
            testType={selectedTest}
            candidateName={candidateName}
            durationMinutes={durationMinutes}
            onNameChange={setCandidateName}
            onDurationChange={setDurationMinutes}
            onStart={handleStart}
            onBackToLanding={handleGoHome}
          />
        )}

        {view === 'test' && currentQuestion && (
          <TestView
            question={currentQuestion}
            currentIndex={currentQuestionIndex}
            totalQuestions={activeQuestionBank.length}
            currentAnswer={answers[currentQuestion.id]}
            isFlagged={flaggedQuestions.has(currentQuestion.id)}
            sectionAnswersCount={sectionAnswersCount}
            onSelectAnswer={handleSelectAnswer}
            onToggleFlag={handleToggleFlag}
            onPrev={handlePrev}
            onNext={handleNext}
            onJumpToSection={handleJumpToSection}
            onOpenPalette={() => setIsPaletteOpen(true)}
          />
        )}

        {view === 'results' && results && (
          <ResultsView
            candidateName={candidateName}
            results={results}
            onRetake={handleReset}
            onGoHome={handleGoHome}
          />
        )}
      </main>

      {/* Question Palette Modal */}
      <QuestionPaletteModal
        isOpen={isPaletteOpen}
        questions={activeQuestionBank}
        currentQuestionId={currentQuestion?.id || 1}
        answers={answers}
        flaggedQuestions={flaggedQuestions}
        onClose={() => setIsPaletteOpen(false)}
        onSelectQuestion={(qId) => {
          handleJumpToQuestion(qId);
          setIsPaletteOpen(false);
        }}
      />

      {/* Submit Warning Modal */}
      <SubmitWarningModal
        isOpen={isSubmitWarningOpen}
        unansweredQuestions={unansweredQuestions}
        onClose={() => setIsSubmitWarningOpen(false)}
        onReviewFirst={() => {
          setIsSubmitWarningOpen(false);
          if (unansweredQuestions.length > 0) {
            handleJumpToQuestion(unansweredQuestions[0].id);
          }
        }}
        onJumpToQuestion={(qId) => {
          setIsSubmitWarningOpen(false);
          handleJumpToQuestion(qId);
        }}
        onSubmitAnyway={handleFinalize}
      />
    </>
  );
}

export default App;
