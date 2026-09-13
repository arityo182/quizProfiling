import { 
  CategoryType, 
  PersonaType, 
  ProfilingResults, 
  ConsistencyAudit,
  TestType,
  Question
} from '../types';
import { QUESTION_BANK, CATEGORY_CONFIG } from '../data/questions';

export function calculateProfilingResults(
  answers: Record<number, any>,
  testType: TestType = 'java',
  questionBank: Question[] = QUESTION_BANK
): ProfilingResults {
  // 1. Category Score Accumulators
  const catPoints: Record<CategoryType, { earned: number; max: number }> = {
    personality: { earned: 0, max: 0 },
    work_style: { earned: 0, max: 0 },
    teamwork: { earned: 0, max: 0 },
    problem_solving: { earned: 0, max: 0 },
    motivation: { earned: 0, max: 0 }
  };

  // 2. Persona Accumulators (Dynamic by Test Type)
  const personaPoints: Record<string, number> = testType === 'general'
    ? {
        "The Strategist": 0,
        "The Analyst": 0,
        "The Collaborator": 0,
        "The Executor": 0,
        "The Innovator": 0
      }
    : {
        "The Architect": 0,
        "The Debugger": 0,
        "The Collaborator": 0,
        "The Executor": 0,
        "The Learner": 0
      };

  // 3. Work Style Dimension Accumulators (-1.0 to 1.0)
  const dimensions: Record<string, { sum: number; count: number }> = {
    solo_vs_team: { sum: 0, count: 0 },
    detail_vs_big_picture: { sum: 0, count: 0 },
    quality_vs_speed: { sum: 0, count: 0 },
    structured_vs_flexible: { sum: 0, count: 0 },
    tech_vs_comm: { sum: 0, count: 0 }
  };

  // 4. Traps & Consistency Tracking
  let overconfidenceTriggers = 0;
  let socialDesirabilityTriggers = 0;
  let consistencyDiscrepancies = 0;

  // Iterate through all 150 questions of the active bank
  questionBank.forEach(q => {
    const val = answers[q.id];
    const category = q.category || 'work_style';

    // SECTION 1: LIKERT SCALE (Q1 to Q60)
    if (q.type === 'likert') {
      catPoints[category].max += 100;

      if (val !== undefined) {
        let itemScore = 50;

        // Handle Traps
        if (q.scoring === 'overconfidence_trap') {
          if (val === 5) {
            overconfidenceTriggers++;
            itemScore = 0;
          } else if (val === 4) {
            itemScore = 25;
          } else if (val === 3) {
            itemScore = 70;
          } else {
            itemScore = 100;
          }
        } else if (q.scoring === 'social_desirability_trap') {
          if (val === 5) {
            socialDesirabilityTriggers++;
            itemScore = 0;
          } else if (val === 4) {
            itemScore = 30;
          } else if (val === 3) {
            itemScore = 75;
          } else {
            itemScore = 100;
          }
        } else if (q.scoring === 'negative') {
          itemScore = 120 - (val * 20);
        } else {
          itemScore = val * 20;
        }

        catPoints[category].earned += itemScore;

        // Dimensions contribution
        if (q.dimension && q.dimension_val !== undefined && q.dimension_val !== null && dimensions[q.dimension]) {
          const scaledVal = (val - 3) / 2; // -1.0 to 1.0
          dimensions[q.dimension].sum += (scaledVal * q.dimension_val);
          dimensions[q.dimension].count++;
        }

        // Persona attribution based on traits
        if (q.persona && personaPoints[q.persona] !== undefined) {
          personaPoints[q.persona] += (val * 1.5);
        }
      }
    }

    // SECTION 2: FORCED CHOICE (Q61 to Q100)
    else if (q.type === 'forced_choice') {
      catPoints[category].max += 100;

      if (val !== undefined) {
        catPoints[category].earned += 90;

        if (val === 'A' && q.persona_a && personaPoints[q.persona_a] !== undefined) {
          personaPoints[q.persona_a] += 4;
          if (q.dimension && dimensions[q.dimension] && q.dim_val_a !== undefined && q.dim_val_a !== null) {
            dimensions[q.dimension].sum += q.dim_val_a;
            dimensions[q.dimension].count++;
          }
        } else if (val === 'B' && q.persona_b && personaPoints[q.persona_b] !== undefined) {
          personaPoints[q.persona_b] += 4;
          if (q.dimension && dimensions[q.dimension] && q.dim_val_b !== undefined && q.dim_val_b !== null) {
            dimensions[q.dimension].sum += q.dim_val_b;
            dimensions[q.dimension].count++;
          }
        }
      }
    }

    // SECTION 3: SITUATIONAL JUDGEMENT (Q101 to Q130)
    else if (q.type === 'sjt') {
      catPoints[category].max += 100;

      if (val !== undefined && q.scores) {
        const scoreMultiplier = q.scores[val] || 0.0;
        catPoints[category].earned += (scoreMultiplier * 100);

        if (scoreMultiplier >= 0.75 && q.persona_tag && personaPoints[q.persona_tag] !== undefined) {
          personaPoints[q.persona_tag] += 5;
        }
      }
    }

    // SECTION 4: MOTIVATION (Q131 to Q150)
    else if (q.type === 'motivation') {
      catPoints[category].max += 100;

      if (val !== undefined && q.persona_map) {
        catPoints[category].earned += 100;
        const chosenPersona = q.persona_map[val];
        if (chosenPersona && personaPoints[chosenPersona] !== undefined) {
          personaPoints[chosenPersona] += 6;
        }
      }
    }
  });

  // 5. Paraphrased/Consistency Pairs Check (identical indices across both test banks)
  if (answers[5] !== undefined && answers[38] !== undefined) {
    if ((answers[5] >= 4 && answers[38] >= 4) || (answers[5] <= 2 && answers[38] <= 2)) {
      consistencyDiscrepancies++;
    }
  }

  if (answers[12] !== undefined && answers[49] !== undefined) {
    if (answers[12] >= 4 && answers[49] >= 4) {
      consistencyDiscrepancies++;
    }
  }

  if (answers[24] !== undefined && answers[58] !== undefined) {
    if (Math.abs(answers[24] - answers[58]) >= 3) {
      consistencyDiscrepancies++;
    }
  }

  // 6. Category Percentages Calculation
  const categoryScores: Record<CategoryType, number> = {
    personality: 0,
    work_style: 0,
    teamwork: 0,
    problem_solving: 0,
    motivation: 0
  };

  let weightedTotalScore = 0;
  let totalWeightSum = 0;

  for (const catKey in catPoints) {
    const key = catKey as CategoryType;
    const { earned, max } = catPoints[key];
    const pct = max > 0 ? Math.min(100, Math.round((earned / max) * 100)) : 70;
    categoryScores[key] = pct;

    const config = CATEGORY_CONFIG[key];
    const effectiveWeight = config.weight * config.targetShare;
    weightedTotalScore += (pct * effectiveWeight);
    totalWeightSum += effectiveWeight;
  }

  let finalScore = totalWeightSum > 0 ? (weightedTotalScore / totalWeightSum) : 70;

  // Consistency Penalty
  let consistencyScoreLabel: 'High' | 'Medium' | 'Low' = 'High';
  let consistencyPenalty = 0;
  const totalInconsistencies = overconfidenceTriggers + socialDesirabilityTriggers + consistencyDiscrepancies;

  if (totalInconsistencies >= 4) {
    consistencyScoreLabel = 'Low';
    consistencyPenalty = 5.0;
  } else if (totalInconsistencies >= 2) {
    consistencyScoreLabel = 'Medium';
    consistencyPenalty = 2.5;
  } else {
    consistencyScoreLabel = 'High';
    consistencyPenalty = 0;
  }

  finalScore = Math.max(25, Math.min(100, finalScore - consistencyPenalty));
  finalScore = Math.round(finalScore * 10) / 10;

  // 7. Persona Assignment
  const sortedPersonas = (Object.entries(personaPoints) as [PersonaType, number][])
    .sort((a, b) => b[1] - a[1]);

  const primaryPersona = sortedPersonas[0][0];
  const secondaryPersona = sortedPersonas[1][0];

  // 8. Work Style Dimensions normalization (-1.0 to 1.0 -> 0% to 100%)
  const sliderPercentages: Record<string, number> = {};
  for (const dim in dimensions) {
    const { sum, count } = dimensions[dim];
    const avg = count > 0 ? (sum / count) : 0;
    const pct = Math.round(((avg + 1.0) / 2.0) * 100);
    sliderPercentages[dim] = Math.max(10, Math.min(90, pct));
  }

  const consistencyAudit: ConsistencyAudit = {
    label: consistencyScoreLabel,
    overconfidenceTriggers,
    socialDesirabilityTriggers,
    consistencyDiscrepancies,
    penalty: consistencyPenalty
  };

  return {
    testType,
    finalScore,
    categoryScores,
    primaryPersona,
    secondaryPersona,
    sortedPersonas,
    sliderPercentages,
    consistency: consistencyAudit
  };
}

export const PERSONA_DETAILS: Record<PersonaType, { icon: string; tagline: string; desc: string }> = {
  // Java Personas
  "The Architect": {
    icon: "🏗️",
    tagline: "System Design & Modularity Visionary",
    desc: "You thrive at the intersection of enterprise software design, bounded contexts, and scalable cloud topologies. You naturally foresee technical debt bottlenecks, champion clean domain architecture, and guide engineering squads toward robust, sustainable patterns."
  },
  "The Debugger": {
    icon: "🐛",
    tagline: "Root-Cause Analyst & Performance Purist",
    desc: "You possess a meticulous investigative tenacity for tracking down elusive concurrency race conditions, JVM memory leaks, and GC latency spikes. You refuse shallow band-aids, insisting on empirical data and deterministic proof for every fix."
  },
  "The Collaborator": {
    icon: "🤝",
    tagline: "Team Catalyst & Mentorship Champion",
    desc: "You firmly believe that sustained excellence is a collective endeavor. You excel at constructive dialogues, empathetic onboarding, cross-team alignment, and maintaining psychological safety and mutual trust within collaborative environments."
  },
  "The Executor": {
    icon: "🚀",
    tagline: "High-Velocity Finisher & Pragmatic Deliverer",
    desc: "You have a relentless bias for action and tangible business delivery. You adeptly navigate trade-offs, slicing complex initiatives into clear milestones and moving stakeholder value forward rapidly without getting bogged down in dogma."
  },
  "The Learner": {
    icon: "📚",
    tagline: "Growth Mindset & Continuous Modernizer",
    desc: "You are driven by deep technical curiosity and enthusiasm for cutting-edge Java evolution. You continuously explore modern language features (Virtual Threads, Records, Pattern Matching) and inspire peers to modernize legacy stacks through hands-on experimentation."
  },
  // General Professional Personas
  "The Strategist": {
    icon: "🏗️",
    tagline: "Big-Picture Planner & Goal-Oriented Visionary",
    desc: "You excel at identifying macro market opportunities, anticipating organizational bottlenecks, and orchestrating cross-functional teams toward long-term strategic objectives. You turn strategic ambiguity into clear, actionable, high-impact roadmaps."
  },
  "The Analyst": {
    icon: "🔍",
    tagline: "Detail-Oriented & Data-Driven Thinker",
    desc: "You bring rigorous analytical precision and evidence-based decision making to complex challenges. You dive deep into qualitative and quantitative indicators, uncover root causes, and ensure execution is grounded in sound empirical facts."
  },
  "The Innovator": {
    icon: "💡",
    tagline: "Creative Catalyst & Adaptable Problem Solver",
    desc: "You thrive on challenging the status quo and introducing forward-thinking, creative solutions. Highly adaptable to changing conditions, you champion iterative experimentation and inspire colleagues to break through conventional boundaries."
  }
};
