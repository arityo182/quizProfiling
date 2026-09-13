export type TestType = 'java' | 'general';

export type CategoryType = 
  | 'personality'
  | 'work_style'
  | 'teamwork'
  | 'problem_solving'
  | 'motivation';

export type JavaPersonaType = 
  | 'The Architect'
  | 'The Debugger'
  | 'The Collaborator'
  | 'The Executor'
  | 'The Learner';

export type GeneralPersonaType = 
  | 'The Strategist'
  | 'The Analyst'
  | 'The Collaborator'
  | 'The Executor'
  | 'The Innovator';

export type PersonaType = 
  | 'The Architect'
  | 'The Debugger'
  | 'The Collaborator'
  | 'The Executor'
  | 'The Learner'
  | 'The Strategist'
  | 'The Analyst'
  | 'The Innovator';

export type QuestionType = 
  | 'likert'
  | 'forced_choice'
  | 'sjt'
  | 'motivation';

export interface Question {
  id: number;
  section: 1 | 2 | 3 | 4;
  type: QuestionType;
  category: CategoryType;
  text?: string;
  scoring?: 'positive' | 'negative' | 'overconfidence_trap' | 'social_desirability_trap';
  trait?: string;
  dimension?: string | null;
  dimension_val?: number | null;
  persona?: PersonaType | null;
  consistency_pair_id?: number | null;
  consistency_relation?: 'same' | 'opposite' | null;
  trap_type?: 'overconfidence' | 'social_desirability' | null;
  // Forced choice fields
  option_a?: string;
  option_b?: string;
  dim_val_a?: number | null;
  dim_val_b?: number | null;
  persona_a?: PersonaType | null;
  persona_b?: PersonaType | null;
  // SJT fields
  scenario?: string;
  question?: string;
  options?: string[];
  best_option?: number;
  scores?: number[];
  persona_tag?: PersonaType | null;
  // Motivation fields
  persona_map?: PersonaType[];
}

export interface CandidateProfile {
  name: string;
  durationMinutes: number;
  startTime: Date | null;
  endTime: Date | null;
  testType: TestType;
}

export interface ConsistencyAudit {
  label: 'High' | 'Medium' | 'Low';
  overconfidenceTriggers: number;
  socialDesirabilityTriggers: number;
  consistencyDiscrepancies: number;
  penalty: number;
}

export interface ProfilingResults {
  testType: TestType;
  finalScore: number;
  categoryScores: Record<CategoryType, number>;
  primaryPersona: PersonaType;
  secondaryPersona: PersonaType;
  sortedPersonas: [PersonaType, number][];
  sliderPercentages: Record<string, number>;
  consistency: ConsistencyAudit;
}

export interface CategoryMetadata {
  label: string;
  weight: number;
  targetShare: number;
  icon: string;
}
