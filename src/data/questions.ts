import { Question, CategoryMetadata, CategoryType } from "../types";

export const CATEGORY_CONFIG: Record<CategoryType, CategoryMetadata> = {
  personality: {
    label: "Personality & Character",
    weight: 1.0,
    targetShare: 0.25,
    icon: "🧠"
  },
  work_style: {
    label: "Work Style & Productivity",
    weight: 1.0,
    targetShare: 0.25,
    icon: "⚡"
  },
  teamwork: {
    label: "Teamwork & Communication",
    weight: 0.9,
    targetShare: 0.20,
    icon: "🤝"
  },
  problem_solving: {
    label: "Problem Solving & Analytical Thinking",
    weight: 1.2,
    targetShare: 0.15,
    icon: "🔬"
  },
  motivation: {
    label: "Motivation & Work Values",
    weight: 0.9,
    targetShare: 0.15,
    icon: "🎯"
  }
};

export const QUESTION_BANK: Question[] = [
  {
    "id": 1,
    "section": 1,
    "type": "likert",
    "category": "work_style",
    "text": "I prioritize writing clean, maintainable code over taking quick shortcuts, even when sprint deadlines are tight.",
    "scoring": "positive",
    "trait": "code_quality",
    "dimension": "quality_vs_speed",
    "dimension_val": 1.0,
    "persona": "The Architect",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 2,
    "section": 1,
    "type": "likert",
    "category": "problem_solving",
    "text": "When investigating an elusive JVM OutOfMemoryError, I methodically analyze heap dumps and GC logs before altering JVM memory flags.",
    "scoring": "positive",
    "trait": "analytical_rigor",
    "dimension": "detail_vs_big_picture",
    "dimension_val": 1.0,
    "persona": "The Debugger",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 3,
    "section": 1,
    "type": "likert",
    "category": "teamwork",
    "text": "I view peer code reviews as valuable learning dialogues rather than critical judgments of my technical competence.",
    "scoring": "positive",
    "trait": "receptivity_to_feedback",
    "dimension": "solo_vs_team",
    "dimension_val": 0.8,
    "persona": "The Collaborator",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 4,
    "section": 1,
    "type": "likert",
    "category": "personality",
    "text": "I remain calm and emotionally composed when critical production microservices experience downtime during peak traffic.",
    "scoring": "positive",
    "trait": "emotional_resilience",
    "dimension": "structured_vs_flexible",
    "dimension_val": 0.7,
    "persona": "The Architect",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 5,
    "section": 1,
    "type": "likert",
    "category": "work_style",
    "text": "I insist on writing comprehensive unit and integration tests (e.g., JUnit, Mockito, Testcontainers) before opening a pull request.",
    "scoring": "positive",
    "trait": "test_discipline",
    "dimension": "quality_vs_speed",
    "dimension_val": 1.0,
    "persona": "The Debugger",
    "consistency_pair_id": 38,
    "consistency_relation": "opposite",
    "trap_type": null
  },
  {
    "id": 6,
    "section": 1,
    "type": "likert",
    "category": "motivation",
    "text": "I am intrinsically driven to explore modern Java features (Virtual Threads, Pattern Matching, Records) through hands-on pet projects.",
    "scoring": "positive",
    "trait": "continuous_learning",
    "dimension": "tech_vs_comm",
    "dimension_val": -0.8,
    "persona": "The Learner",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 7,
    "section": 1,
    "type": "likert",
    "category": "personality",
    "text": "I never make mistakes or write bugs when implementing multi-threaded concurrent code in Java.",
    "scoring": "overconfidence_trap",
    "trait": "humility",
    "dimension": null,
    "dimension_val": null,
    "persona": null,
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": "overconfidence"
  },
  {
    "id": 8,
    "section": 1,
    "type": "likert",
    "category": "teamwork",
    "text": "I actively pair program with junior developers to help them untangle complex business logic and build confidence.",
    "scoring": "positive",
    "trait": "mentorship",
    "dimension": "solo_vs_team",
    "dimension_val": 1.0,
    "persona": "The Collaborator",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 9,
    "section": 1,
    "type": "likert",
    "category": "problem_solving",
    "text": "When resolving a high-priority bug, I prefer discovering the true root cause rather than applying a quick patch that suppresses symptoms.",
    "scoring": "positive",
    "trait": "root_cause_analysis",
    "dimension": "detail_vs_big_picture",
    "dimension_val": 0.9,
    "persona": "The Debugger",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 10,
    "section": 1,
    "type": "likert",
    "category": "personality",
    "text": "I always complete 100% of my sprint commitments exactly on time without ever asking for scope adjustments.",
    "scoring": "social_desirability_trap",
    "trait": "honesty",
    "dimension": null,
    "dimension_val": null,
    "persona": null,
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": "social_desirability"
  },
  {
    "id": 11,
    "section": 1,
    "type": "likert",
    "category": "work_style",
    "text": "I systematically document architectural decisions (e.g., ADRs) and API contracts (e.g., OpenAPI/Swagger) for the benefit of future maintainers.",
    "scoring": "positive",
    "trait": "documentation_rigor",
    "dimension": "structured_vs_flexible",
    "dimension_val": -0.9,
    "persona": "The Architect",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 12,
    "section": 1,
    "type": "likert",
    "category": "teamwork",
    "text": "When a colleague leaves extensive suggestions on my pull request, I feel defensive and believe they are slowing down my progress.",
    "scoring": "negative",
    "trait": "receptivity_to_feedback",
    "dimension": "solo_vs_team",
    "dimension_val": -0.8,
    "persona": "The Collaborator",
    "consistency_pair_id": 49,
    "consistency_relation": "same",
    "trap_type": null
  },
  {
    "id": 13,
    "section": 1,
    "type": "likert",
    "category": "personality",
    "text": "I am comfortable working with ambiguous or evolving user requirements, adapting our domain model iteratively as clarity emerges.",
    "scoring": "positive",
    "trait": "adaptability",
    "dimension": "structured_vs_flexible",
    "dimension_val": 0.9,
    "persona": "The Executor",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 14,
    "section": 1,
    "type": "likert",
    "category": "problem_solving",
    "text": "I regularly evaluate algorithmic time and space complexity before choosing data structures (e.g., ConcurrentHashMap vs TreeMap).",
    "scoring": "positive",
    "trait": "algorithmic_thinking",
    "dimension": "detail_vs_big_picture",
    "dimension_val": 0.8,
    "persona": "The Debugger",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 15,
    "section": 1,
    "type": "likert",
    "category": "motivation",
    "text": "I read technical RFCs, JVM specification updates, and release notes to continuously upgrade my engineering mental models.",
    "scoring": "positive",
    "trait": "continuous_learning",
    "dimension": "tech_vs_comm",
    "dimension_val": -0.9,
    "persona": "The Learner",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 16,
    "section": 1,
    "type": "likert",
    "category": "work_style",
    "text": "I slice large, complex user stories into small, deployable increments that deliver rapid business value to stakeholders.",
    "scoring": "positive",
    "trait": "incremental_delivery",
    "dimension": "quality_vs_speed",
    "dimension_val": -0.6,
    "persona": "The Executor",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 17,
    "section": 1,
    "type": "likert",
    "category": "teamwork",
    "text": "In sprint planning, I voice concerns respectfully when I believe an epic has unaddressed technical debt or security risks.",
    "scoring": "positive",
    "trait": "constructive_advocacy",
    "dimension": "tech_vs_comm",
    "dimension_val": 0.7,
    "persona": "The Collaborator",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 18,
    "section": 1,
    "type": "likert",
    "category": "personality",
    "text": "I never feel frustrated or annoyed when legacy code lacks documentation and unit tests.",
    "scoring": "social_desirability_trap",
    "trait": "emotional_honesty",
    "dimension": null,
    "dimension_val": null,
    "persona": null,
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": "social_desirability"
  },
  {
    "id": 19,
    "section": 1,
    "type": "likert",
    "category": "problem_solving",
    "text": "When designing distributed microservices, I proactively establish clear bounded contexts and anti-corruption layers.",
    "scoring": "positive",
    "trait": "system_design",
    "dimension": "detail_vs_big_picture",
    "dimension_val": -0.9,
    "persona": "The Architect",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 20,
    "section": 1,
    "type": "likert",
    "category": "work_style",
    "text": "I am energized by rapid prototyping and shipping minimum viable products to test business hypotheses in production.",
    "scoring": "positive",
    "trait": "bias_for_action",
    "dimension": "quality_vs_speed",
    "dimension_val": -0.9,
    "persona": "The Executor",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 21,
    "section": 1,
    "type": "likert",
    "category": "teamwork",
    "text": "I am willing to compromise on my preferred design pattern if the team reaches a consensus on an alternative convention.",
    "scoring": "positive",
    "trait": "team_cohesion",
    "dimension": "solo_vs_team",
    "dimension_val": 0.8,
    "persona": "The Collaborator",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 22,
    "section": 1,
    "type": "likert",
    "category": "personality",
    "text": "I have sufficient mastery of software architecture that I never need to consult senior colleagues or external documentation.",
    "scoring": "overconfidence_trap",
    "trait": "humility",
    "dimension": null,
    "dimension_val": null,
    "persona": null,
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": "overconfidence"
  },
  {
    "id": 23,
    "section": 1,
    "type": "likert",
    "category": "motivation",
    "text": "I love diving into the internal bytecode or assembly generated by the JVM JIT compiler to see how optimizations work.",
    "scoring": "positive",
    "trait": "deep_curiosity",
    "dimension": "tech_vs_comm",
    "dimension_val": -0.8,
    "persona": "The Debugger",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 24,
    "section": 1,
    "type": "likert",
    "category": "work_style",
    "text": "I follow the 'Boy Scout Rule': leaving any Java class or method cleaner than when I first opened it.",
    "scoring": "positive",
    "trait": "continuous_refactoring",
    "dimension": "quality_vs_speed",
    "dimension_val": 0.9,
    "persona": "The Architect",
    "consistency_pair_id": 58,
    "consistency_relation": "same",
    "trap_type": null
  },
  {
    "id": 25,
    "section": 1,
    "type": "likert",
    "category": "problem_solving",
    "text": "Before starting to code a complex subsystem, I create architectural diagrams or write lightweight design RFCs for peer review.",
    "scoring": "positive",
    "trait": "system_design",
    "dimension": "detail_vs_big_picture",
    "dimension_val": -0.9,
    "persona": "The Architect",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 26,
    "section": 1,
    "type": "likert",
    "category": "teamwork",
    "text": "I proactively share technical discoveries and new framework findings with the engineering guild via lunch-and-learns.",
    "scoring": "positive",
    "trait": "knowledge_sharing",
    "dimension": "tech_vs_comm",
    "dimension_val": 1.0,
    "persona": "The Learner",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 27,
    "section": 1,
    "type": "likert",
    "category": "personality",
    "text": "I quickly bounce back from failed pull requests or architecture reviews that get rejected, seeing them as opportunities to improve.",
    "scoring": "positive",
    "trait": "growth_mindset",
    "dimension": "structured_vs_flexible",
    "dimension_val": 0.8,
    "persona": "The Learner",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 28,
    "section": 1,
    "type": "likert",
    "category": "work_style",
    "text": "I tend to push uncommitted code directly at the end of the day without verifying if local regression test suites pass.",
    "scoring": "negative",
    "trait": "engineering_discipline",
    "dimension": "quality_vs_speed",
    "dimension_val": -0.8,
    "persona": "The Executor",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 29,
    "section": 1,
    "type": "likert",
    "category": "motivation",
    "text": "I value working in an engineering culture that encourages experimentation and blameless post-mortems over rigid risk-aversion.",
    "scoring": "positive",
    "trait": "psychological_safety",
    "dimension": "structured_vs_flexible",
    "dimension_val": 0.8,
    "persona": "The Collaborator",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 30,
    "section": 1,
    "type": "likert",
    "category": "problem_solving",
    "text": "When optimizing a slow SQL query in a Spring Data JPA service, I check execution plans and indexing before blindly adding caching layers.",
    "scoring": "positive",
    "trait": "database_optimization",
    "dimension": "detail_vs_big_picture",
    "dimension_val": 0.8,
    "persona": "The Debugger",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 31,
    "section": 1,
    "type": "likert",
    "category": "personality",
    "text": "I readily admit when I don't know the answer to a technical question instead of pretending to have expertise.",
    "scoring": "positive",
    "trait": "intellectual_integrity",
    "dimension": "tech_vs_comm",
    "dimension_val": 0.6,
    "persona": "The Collaborator",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 32,
    "section": 1,
    "type": "likert",
    "category": "work_style",
    "text": "I track down subtle memory leaks and thread contention issues with high persistence, even if it requires days of profiling with JProfiler/VisualVM.",
    "scoring": "positive",
    "trait": "tenacity",
    "dimension": "detail_vs_big_picture",
    "dimension_val": 1.0,
    "persona": "The Debugger",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 33,
    "section": 1,
    "type": "likert",
    "category": "teamwork",
    "text": "I prefer working in total isolation and get frustrated when teammates ask me for code explanations during the day.",
    "scoring": "negative",
    "trait": "collaboration_openness",
    "dimension": "solo_vs_team",
    "dimension_val": -1.0,
    "persona": "The Collaborator",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 34,
    "section": 1,
    "type": "likert",
    "category": "problem_solving",
    "text": "I design domain models with strict encapsulation and separation of concerns rather than creating anemic models with public getters and setters.",
    "scoring": "positive",
    "trait": "clean_architecture",
    "dimension": "detail_vs_big_picture",
    "dimension_val": -0.7,
    "persona": "The Architect",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 35,
    "section": 1,
    "type": "likert",
    "category": "personality",
    "text": "I have never felt overwhelmed or fatigued by continuous deployments and rapid context switches in agile sprints.",
    "scoring": "social_desirability_trap",
    "trait": "self_awareness",
    "dimension": null,
    "dimension_val": null,
    "persona": null,
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": "social_desirability"
  },
  {
    "id": 36,
    "section": 1,
    "type": "likert",
    "category": "motivation",
    "text": "Experimenting with cutting-edge technologies like GraalVM native images, Quarkus, or AI code integrations excites me.",
    "scoring": "positive",
    "trait": "innovation_drive",
    "dimension": "tech_vs_comm",
    "dimension_val": -0.7,
    "persona": "The Learner",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 37,
    "section": 1,
    "type": "likert",
    "category": "work_style",
    "text": "I focus on delivering working features to production quickly so our team can gather live user feedback and metrics.",
    "scoring": "positive",
    "trait": "shipping_mindset",
    "dimension": "quality_vs_speed",
    "dimension_val": -0.8,
    "persona": "The Executor",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 38,
    "section": 1,
    "type": "likert",
    "category": "work_style",
    "text": "I feel that writing unit tests for edge cases is mostly a waste of time that delays shipping features to business stakeholders.",
    "scoring": "negative",
    "trait": "test_discipline",
    "dimension": "quality_vs_speed",
    "dimension_val": -1.0,
    "persona": "The Executor",
    "consistency_pair_id": 5,
    "consistency_relation": "opposite",
    "trap_type": null
  },
  {
    "id": 39,
    "section": 1,
    "type": "likert",
    "category": "teamwork",
    "text": "When reviewing code, I focus exclusively on catching architectural flaws and critical bugs while leaving nitpicks to automated linters.",
    "scoring": "positive",
    "trait": "pragmatic_review",
    "dimension": "tech_vs_comm",
    "dimension_val": 0.6,
    "persona": "The Collaborator",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 40,
    "section": 1,
    "type": "likert",
    "category": "personality",
    "text": "I am self-disciplined enough to stay productive when working remotely without direct supervisory oversight.",
    "scoring": "positive",
    "trait": "self_management",
    "dimension": "solo_vs_team",
    "dimension_val": -0.5,
    "persona": "The Executor",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 41,
    "section": 1,
    "type": "likert",
    "category": "problem_solving",
    "text": "When integrating asynchronous messaging (e.g., Kafka, RabbitMQ), I carefully design idempotency keys to safeguard against message duplication.",
    "scoring": "positive",
    "trait": "distributed_design",
    "dimension": "detail_vs_big_picture",
    "dimension_val": 0.7,
    "persona": "The Architect",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 42,
    "section": 1,
    "type": "likert",
    "category": "work_style",
    "text": "I spend deliberate time reading open-source Java libraries on GitHub to learn how top engineers structure their code.",
    "scoring": "positive",
    "trait": "continuous_learning",
    "dimension": "solo_vs_team",
    "dimension_val": -0.8,
    "persona": "The Learner",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 43,
    "section": 1,
    "type": "likert",
    "category": "personality",
    "text": "I can understand any enterprise codebase of hundreds of thousands of lines within just one or two days without asking any questions.",
    "scoring": "overconfidence_trap",
    "trait": "humility",
    "dimension": null,
    "dimension_val": null,
    "persona": null,
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": "overconfidence"
  },
  {
    "id": 44,
    "section": 1,
    "type": "likert",
    "category": "teamwork",
    "text": "I provide clear, empathetic, and constructive feedback on pull requests, offering code snippets or documentation links.",
    "scoring": "positive",
    "trait": "constructive_feedback",
    "dimension": "tech_vs_comm",
    "dimension_val": 0.8,
    "persona": "The Collaborator",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 45,
    "section": 1,
    "type": "likert",
    "category": "motivation",
    "text": "I am motivated by solving difficult business problems that deliver tangible value to end users, even if the underlying tech stack is standard Java.",
    "scoring": "positive",
    "trait": "business_impact",
    "dimension": "quality_vs_speed",
    "dimension_val": -0.5,
    "persona": "The Executor",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 46,
    "section": 1,
    "type": "likert",
    "category": "problem_solving",
    "text": "I consider concurrency risks (e.g., race conditions, deadlocks, visibility issues) whenever state is shared across Java threads.",
    "scoring": "positive",
    "trait": "concurrency_awareness",
    "dimension": "detail_vs_big_picture",
    "dimension_val": 0.8,
    "persona": "The Debugger",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 47,
    "section": 1,
    "type": "likert",
    "category": "work_style",
    "text": "I maintain a well-structured Git commit history with descriptive commit messages following the Conventional Commits specification.",
    "scoring": "positive",
    "trait": "git_hygiene",
    "dimension": "structured_vs_flexible",
    "dimension_val": -0.7,
    "persona": "The Architect",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 48,
    "section": 1,
    "type": "likert",
    "category": "personality",
    "text": "I view refactoring and paying down technical debt as an ongoing engineering responsibility rather than something only done when things break.",
    "scoring": "positive",
    "trait": "proactive_ownership",
    "dimension": "quality_vs_speed",
    "dimension_val": 0.9,
    "persona": "The Architect",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 49,
    "section": 1,
    "type": "likert",
    "category": "teamwork",
    "text": "I find detailed code review discussions intellectually stimulating and appreciate when teammates challenge my implementation decisions.",
    "scoring": "positive",
    "trait": "receptivity_to_feedback",
    "dimension": "solo_vs_team",
    "dimension_val": 0.8,
    "persona": "The Collaborator",
    "consistency_pair_id": 12,
    "consistency_relation": "opposite",
    "trap_type": null
  },
  {
    "id": 50,
    "section": 1,
    "type": "likert",
    "category": "personality",
    "text": "I have never introduced a single regression into production throughout my entire software development career.",
    "scoring": "overconfidence_trap",
    "trait": "honesty",
    "dimension": null,
    "dimension_val": null,
    "persona": null,
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": "overconfidence"
  },
  {
    "id": 51,
    "section": 1,
    "type": "likert",
    "category": "problem_solving",
    "text": "When designing REST microservices, I prioritize idempotency, proper HTTP status codes, and resilient circuit-breaking mechanisms (e.g., Resilience4j).",
    "scoring": "positive",
    "trait": "resilience_design",
    "dimension": "detail_vs_big_picture",
    "dimension_val": -0.6,
    "persona": "The Architect",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 52,
    "section": 1,
    "type": "likert",
    "category": "motivation",
    "text": "I am intrinsically driven to explore alternative paradigms like Reactive Programming, Event-Sourcing, or Rust to expand my problem-solving toolkit.",
    "scoring": "positive",
    "trait": "growth_mindset",
    "dimension": "detail_vs_big_picture",
    "dimension_val": -1.0,
    "persona": "The Learner",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 53,
    "section": 1,
    "type": "likert",
    "category": "work_style",
    "text": "I prefer removing operational friction and automating manual deployment steps so our squad can ship multiple times a day.",
    "scoring": "positive",
    "trait": "delivery_enablement",
    "dimension": "quality_vs_speed",
    "dimension_val": -0.8,
    "persona": "The Executor",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 54,
    "section": 1,
    "type": "likert",
    "category": "teamwork",
    "text": "I step up to resolve cross-team integration blockers when multiple engineering squads have conflicting dependency roadmaps.",
    "scoring": "positive",
    "trait": "cross_team_collaboration",
    "dimension": "tech_vs_comm",
    "dimension_val": 0.9,
    "persona": "The Collaborator",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 55,
    "section": 1,
    "type": "likert",
    "category": "personality",
    "text": "I am patient and methodical when onboarding a junior developer into an intricate enterprise codebase.",
    "scoring": "positive",
    "trait": "patience",
    "dimension": "tech_vs_comm",
    "dimension_val": 0.7,
    "persona": "The Collaborator",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 56,
    "section": 1,
    "type": "likert",
    "category": "personality",
    "text": "I always agree with every architectural decision proposed by my team lead without any internal reservations.",
    "scoring": "social_desirability_trap",
    "trait": "independent_critical_thinking",
    "dimension": null,
    "dimension_val": null,
    "persona": null,
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": "social_desirability"
  },
  {
    "id": 57,
    "section": 1,
    "type": "likert",
    "category": "problem_solving",
    "text": "When assessing third-party Java libraries, I inspect maintenance activity, CVE security history, and licensing before adding them to pom.xml.",
    "scoring": "positive",
    "trait": "dependency_governance",
    "dimension": "structured_vs_flexible",
    "dimension_val": -0.8,
    "persona": "The Architect",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 58,
    "section": 1,
    "type": "likert",
    "category": "work_style",
    "text": "Whenever I encounter messy or obsolete code, I refactor it as part of my normal feature PR rather than ignoring it.",
    "scoring": "positive",
    "trait": "continuous_refactoring",
    "dimension": "quality_vs_speed",
    "dimension_val": 0.9,
    "persona": "The Architect",
    "consistency_pair_id": 24,
    "consistency_relation": "same",
    "trap_type": null
  },
  {
    "id": 59,
    "section": 1,
    "type": "likert",
    "category": "teamwork",
    "text": "I respect non-technical stakeholders and explain complex technical tradeoffs in plain, business-oriented terminology.",
    "scoring": "positive",
    "trait": "stakeholder_empathy",
    "dimension": "tech_vs_comm",
    "dimension_val": 1.0,
    "persona": "The Collaborator",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 60,
    "section": 1,
    "type": "likert",
    "category": "motivation",
    "text": "I thrive in high-momentum engineering squads where code moves swiftly from local branch to production deployment.",
    "scoring": "positive",
    "trait": "execution_passion",
    "dimension": "quality_vs_speed",
    "dimension_val": -0.9,
    "persona": "The Executor",
    "consistency_pair_id": null,
    "consistency_relation": null,
    "trap_type": null
  },
  {
    "id": 61,
    "section": 2,
    "type": "forced_choice",
    "category": "work_style",
    "text": "When approaching a new backend service requirement, I prefer:",
    "option_a": "Drafting the high-level API schema and architectural boundaries before writing business logic",
    "option_b": "Jumping straight into implementing the core business logic in Java and iterating on the design as I go",
    "dimension": "detail_vs_big_picture",
    "dim_val_a": -1.0,
    "dim_val_b": 1.0,
    "persona_a": "The Architect",
    "persona_b": "The Executor"
  },
  {
    "id": 62,
    "section": 2,
    "type": "forced_choice",
    "category": "teamwork",
    "text": "When solving a complex bug in production, I am more effective when:",
    "option_a": "Pair programming synchronously with a colleague to bounce hypotheses off each other",
    "option_b": "Working in quiet isolation with uninterrupted focus, logs, and a local debugger",
    "dimension": "solo_vs_team",
    "dim_val_a": 1.0,
    "dim_val_b": -1.0,
    "persona_a": "The Collaborator",
    "persona_b": "The Debugger"
  },
  {
    "id": 63,
    "section": 2,
    "type": "forced_choice",
    "category": "work_style",
    "text": "When approaching sprint delivery deadlines with pending tasks, I naturally lean towards:",
    "option_a": "Shipping a working subset of features with full test coverage and clean architecture",
    "option_b": "Shipping the complete requested scope on time by accepting minor temporary technical debt",
    "dimension": "quality_vs_speed",
    "dim_val_a": 1.0,
    "dim_val_b": -1.0,
    "persona_a": "The Debugger",
    "persona_b": "The Executor"
  },
  {
    "id": 64,
    "section": 2,
    "type": "forced_choice",
    "category": "problem_solving",
    "text": "In code review discussions, I prioritize:",
    "option_a": "Overall system extensibility, clean domain boundaries, and adherence to SOLID design principles",
    "option_b": "Edge case resilience, null safety, exception handling, and runtime execution efficiency",
    "dimension": "detail_vs_big_picture",
    "dim_val_a": -1.0,
    "dim_val_b": 1.0,
    "persona_a": "The Architect",
    "persona_b": "The Debugger"
  },
  {
    "id": 65,
    "section": 2,
    "type": "forced_choice",
    "category": "motivation",
    "text": "When evaluating career growth opportunities, I feel more energized by:",
    "option_a": "Deepening my expertise in advanced JVM internals, memory management, and high-throughput systems",
    "option_b": "Exploring emerging languages, reactive paradigms, and modern cloud-native frameworks",
    "dimension": "tech_vs_comm",
    "dim_val_a": -1.0,
    "dim_val_b": 1.0,
    "persona_a": "The Debugger",
    "persona_b": "The Learner"
  },
  {
    "id": 66,
    "section": 2,
    "type": "forced_choice",
    "category": "work_style",
    "text": "When refactoring legacy Java services, my typical strategy is:",
    "option_a": "Making targeted, incremental improvements strictly around the methods I touch (Boy Scout Rule)",
    "option_b": "Scheduling dedicated refactoring spikes to re-architect entire modules systematically",
    "dimension": "structured_vs_flexible",
    "dim_val_a": 1.0,
    "dim_val_b": -1.0,
    "persona_a": "The Executor",
    "persona_b": "The Architect"
  },
  {
    "id": 67,
    "section": 2,
    "type": "forced_choice",
    "category": "teamwork",
    "text": "During sprint retrospective meetings, I am more inclined to:",
    "option_a": "Raise process bottlenecks and team collaboration dynamics that affected our velocity",
    "option_b": "Encourage the squad to experiment with new developer tools, linters, or libraries",
    "dimension": "tech_vs_comm",
    "dim_val_a": 1.0,
    "dim_val_b": -1.0,
    "persona_a": "The Collaborator",
    "persona_b": "The Learner"
  },
  {
    "id": 68,
    "section": 2,
    "type": "forced_choice",
    "category": "personality",
    "text": "When confronted with conflicting technical opinions within the squad:",
    "option_a": "I facilitate an open discussion with whiteboard diagrams to guide the team toward unanimous consensus",
    "option_b": "I build a quick proof-of-concept benchmark in code to let objective performance metrics decide",
    "dimension": "tech_vs_comm",
    "dim_val_a": 1.0,
    "dim_val_b": -1.0,
    "persona_a": "The Collaborator",
    "persona_b": "The Debugger"
  },
  {
    "id": 69,
    "section": 2,
    "type": "forced_choice",
    "category": "motivation",
    "text": "I find more genuine satisfaction in:",
    "option_a": "Shipping a user-visible feature that solves an immediate customer pain point this week",
    "option_b": "Eliminating a fragile distributed architectural bottleneck that had caused intermittent outages",
    "dimension": "detail_vs_big_picture",
    "dim_val_a": 1.0,
    "dim_val_b": -1.0,
    "persona_a": "The Executor",
    "persona_b": "The Architect"
  },
  {
    "id": 70,
    "section": 2,
    "type": "forced_choice",
    "category": "problem_solving",
    "text": "When learning a new technology or framework (e.g., Quarkus, Virtual Threads):",
    "option_a": "I read the official specifications, architectural design documents, and release notes thoroughly first",
    "option_b": "I immediately spin up a sample repository and experiment through trial, error, and code execution",
    "dimension": "structured_vs_flexible",
    "dim_val_a": -1.0,
    "dim_val_b": 1.0,
    "persona_a": "The Learner",
    "persona_b": "The Executor"
  },
  {
    "id": 71,
    "section": 2,
    "type": "forced_choice",
    "category": "work_style",
    "text": "In daily engineering cadence, I work best with:",
    "option_a": "Clearly structured sprint tickets with explicit acceptance criteria and wireframes upfront",
    "option_b": "High-level problem statements that give me the autonomy to research and define the technical solution",
    "dimension": "structured_vs_flexible",
    "dim_val_a": -1.0,
    "dim_val_b": 1.0,
    "persona_a": "The Executor",
    "persona_b": "The Architect"
  },
  {
    "id": 72,
    "section": 2,
    "type": "forced_choice",
    "category": "teamwork",
    "text": "When a teammate submits a pull request with an approach I find suboptimal:",
    "option_a": "I jump on a quick huddle or call to walk through alternative patterns collaboratively in real time",
    "option_b": "I point them to relevant technical articles, documentation, or new JDK 21 idioms to broaden their toolkit",
    "dimension": "solo_vs_team",
    "dim_val_a": 1.0,
    "dim_val_b": -1.0,
    "persona_a": "The Collaborator",
    "persona_b": "The Learner"
  },
  {
    "id": 73,
    "section": 2,
    "type": "forced_choice",
    "category": "problem_solving",
    "text": "When troubleshooting performance degradation in a Spring Boot application:",
    "option_a": "I inspect CPU flame graphs, memory allocations, and database query latency profiles systematically",
    "option_b": "I review recent commits, deployments, and dependency version bumps to isolate what changed",
    "dimension": "detail_vs_big_picture",
    "dim_val_a": 1.0,
    "dim_val_b": -1.0,
    "persona_a": "The Debugger",
    "persona_b": "The Executor"
  },
  {
    "id": 74,
    "section": 2,
    "type": "forced_choice",
    "category": "personality",
    "text": "When unexpected urgent production bugs interrupt my scheduled sprint work:",
    "option_a": "I readily pivot my focus to the incident, energized by the investigative challenge under pressure",
    "option_b": "I prefer conducting a systematic post-incident review to modernize the system against future regressions",
    "dimension": "structured_vs_flexible",
    "dim_val_a": 1.0,
    "dim_val_b": -1.0,
    "persona_a": "The Debugger",
    "persona_b": "The Learner"
  },
  {
    "id": 75,
    "section": 2,
    "type": "forced_choice",
    "category": "motivation",
    "text": "Between these two achievements, I am prouder of:",
    "option_a": "Authoring a foundational internal shared Java starter/library adopted across 10+ squad microservices",
    "option_b": "Rapidly delivering an MVP feature ahead of schedule that won our company a major client contract",
    "dimension": "tech_vs_comm",
    "dim_val_a": -1.0,
    "dim_val_b": 1.0,
    "persona_a": "The Architect",
    "persona_b": "The Executor"
  },
  {
    "id": 76,
    "section": 2,
    "type": "forced_choice",
    "category": "work_style",
    "text": "Regarding automated testing conventions, I strongly believe in:",
    "option_a": "Exploring modern testing tools (e.g., ArchUnit, Testcontainers, mutation testing) to elevate standards",
    "option_b": "Pragmatic test-after verification: writing comprehensive unit and integration tests once code stabilizes",
    "dimension": "structured_vs_flexible",
    "dim_val_a": -1.0,
    "dim_val_b": 1.0,
    "persona_a": "The Learner",
    "persona_b": "The Executor"
  },
  {
    "id": 77,
    "section": 2,
    "type": "forced_choice",
    "category": "teamwork",
    "text": "In an agile development team, I prefer my primary contribution to be:",
    "option_a": "Bridging technical discussions with product management and keeping everyone aligned",
    "option_b": "Delivering the most architecturally challenging, mission-critical backend components",
    "dimension": "tech_vs_comm",
    "dim_val_a": 1.0,
    "dim_val_b": -1.0,
    "persona_a": "The Collaborator",
    "persona_b": "The Architect"
  },
  {
    "id": 78,
    "section": 2,
    "type": "forced_choice",
    "category": "personality",
    "text": "When handling critical feedback on my architectural proposal from senior peers:",
    "option_a": "I welcome the scrutiny openly as a valuable learning opportunity to expand my technical perspective",
    "option_b": "I robustly defend my original design with empirical data, benchmarking, and architectural theory",
    "dimension": "structured_vs_flexible",
    "dim_val_a": 1.0,
    "dim_val_b": -1.0,
    "persona_a": "The Learner",
    "persona_b": "The Architect"
  },
  {
    "id": 79,
    "section": 2,
    "type": "forced_choice",
    "category": "problem_solving",
    "text": "When designing data access layers in Java microservices:",
    "option_a": "I favor Spring Data JPA and Hibernate for rapid developer productivity and ORM mapping convenience",
    "option_b": "I favor lightweight SQL wrappers (like jOOQ or JdbcClient) for full explicit control over database queries",
    "dimension": "detail_vs_big_picture",
    "dim_val_a": -1.0,
    "dim_val_b": 1.0,
    "persona_a": "The Executor",
    "persona_b": "The Debugger"
  },
  {
    "id": 80,
    "section": 2,
    "type": "forced_choice",
    "category": "motivation",
    "text": "What keeps me most engaged in a company long-term is:",
    "option_a": "A culture that invests in continuous learning, hackathons, and technical upskilling",
    "option_b": "A fast-paced environment with high commercial impact, rapid customer feedback, and quick releases",
    "dimension": "quality_vs_speed",
    "dim_val_a": 1.0,
    "dim_val_b": -1.0,
    "persona_a": "The Learner",
    "persona_b": "The Executor"
  },
  {
    "id": 81,
    "section": 2,
    "type": "forced_choice",
    "category": "work_style",
    "text": "When organizing my workday, I prioritize:",
    "option_a": "Unbroken 3-4 hour calendar blocks dedicated exclusively to deep Java programming",
    "option_b": "Frequent syncs and agile touchpoints to ensure quick feedback and continuous peer unblocking",
    "dimension": "solo_vs_team",
    "dim_val_a": -1.0,
    "dim_val_b": 1.0,
    "persona_a": "The Debugger",
    "persona_b": "The Collaborator"
  },
  {
    "id": 82,
    "section": 2,
    "type": "forced_choice",
    "category": "teamwork",
    "text": "When a project falls behind schedule due to unexpected complexity:",
    "option_a": "I offer to pick up extra tickets and help teammates complete their blocking dependencies",
    "option_b": "I suggest trimming non-essential feature scope to ensure the core deliverables ship reliably",
    "dimension": "tech_vs_comm",
    "dim_val_a": 1.0,
    "dim_val_b": -1.0,
    "persona_a": "The Collaborator",
    "persona_b": "The Executor"
  },
  {
    "id": 83,
    "section": 2,
    "type": "forced_choice",
    "category": "personality",
    "text": "When a production deployment breaks unexpectedly after hours:",
    "option_a": "My first instinct is to roll back immediately to restore service, investigating root cause in normal hours",
    "option_b": "My first instinct is to analyze the runtime stack traces and patch the root cause forward right away",
    "dimension": "structured_vs_flexible",
    "dim_val_a": -1.0,
    "dim_val_b": 1.0,
    "persona_a": "The Architect",
    "persona_b": "The Debugger"
  },
  {
    "id": 84,
    "section": 2,
    "type": "forced_choice",
    "category": "problem_solving",
    "text": "When choosing between two third-party Java libraries for an essential feature:",
    "option_a": "I choose the battle-tested, mature industry standard even if it has a heavier footprint",
    "option_b": "I choose the modern, lightweight, highly optimized library that leverages newer JDK paradigms",
    "dimension": "structured_vs_flexible",
    "dim_val_a": -1.0,
    "dim_val_b": 1.0,
    "persona_a": "The Architect",
    "persona_b": "The Learner"
  },
  {
    "id": 85,
    "section": 2,
    "type": "forced_choice",
    "category": "motivation",
    "text": "I am more excited to receive recognition for:",
    "option_a": "My technical craftsmanship, code elegance, and deep mastery of Java ecosystems",
    "option_b": "My reliability, collaborative spirit, and positive influence on team culture",
    "dimension": "tech_vs_comm",
    "dim_val_a": -1.0,
    "dim_val_b": 1.0,
    "persona_a": "The Debugger",
    "persona_b": "The Collaborator"
  },
  {
    "id": 86,
    "section": 2,
    "type": "forced_choice",
    "category": "work_style",
    "text": "When writing Java code, I prefer:",
    "option_a": "Functional programming paradigms: immutability, pure functions, Java Streams, and Optional",
    "option_b": "Classic object-oriented paradigms: encapsulation, explicit domain classes, and proven design patterns",
    "dimension": "structured_vs_flexible",
    "dim_val_a": 1.0,
    "dim_val_b": -1.0,
    "persona_a": "The Learner",
    "persona_b": "The Architect"
  },
  {
    "id": 87,
    "section": 2,
    "type": "forced_choice",
    "category": "teamwork",
    "text": "If I notice a senior engineer writing code that violates our clean architecture guidelines:",
    "option_a": "I tactfully point it out during the pull request review with a polite question and suggestion",
    "option_b": "I bring it up in the next team architecture guild meeting as an opportunity for collective learning",
    "dimension": "tech_vs_comm",
    "dim_val_a": -1.0,
    "dim_val_b": 1.0,
    "persona_a": "The Debugger",
    "persona_b": "The Learner"
  },
  {
    "id": 88,
    "section": 2,
    "type": "forced_choice",
    "category": "personality",
    "text": "When faced with an ambiguous, open-ended technical objective:",
    "option_a": "I thrive on the creative freedom to research, explore, and prototype novel solutions",
    "option_b": "I prefer establishing firm technical constraints and boundary conditions before committing to work",
    "dimension": "structured_vs_flexible",
    "dim_val_a": 1.0,
    "dim_val_b": -1.0,
    "persona_a": "The Learner",
    "persona_b": "The Architect"
  },
  {
    "id": 89,
    "section": 2,
    "type": "forced_choice",
    "category": "problem_solving",
    "text": "When dealing with distributed data consistency across microservices:",
    "option_a": "I advocate for eventual consistency using asynchronous event-driven sagas (Kafka/Outbox pattern)",
    "option_b": "I advocate for synchronous transactional guarantees or orchestrator services to minimize data drift",
    "dimension": "detail_vs_big_picture",
    "dim_val_a": -1.0,
    "dim_val_b": 1.0,
    "persona_a": "The Architect",
    "persona_b": "The Debugger"
  },
  {
    "id": 90,
    "section": 2,
    "type": "forced_choice",
    "category": "motivation",
    "text": "In my ideal sprint, I spend the majority of my time:",
    "option_a": "Building greenfield features, exploring new APIs, and writing new microservices",
    "option_b": "Hardening existing systems, optimizing performance bottlenecks, and eliminating tech debt",
    "dimension": "detail_vs_big_picture",
    "dim_val_a": -1.0,
    "dim_val_b": 1.0,
    "persona_a": "The Learner",
    "persona_b": "The Debugger"
  },
  {
    "id": 91,
    "section": 2,
    "type": "forced_choice",
    "category": "work_style",
    "text": "When writing Java methods, I tend to focus more on:",
    "option_a": "Making every method concise, self-documenting, and readable by any junior developer",
    "option_b": "Ensuring optimal execution performance, low garbage collection overhead, and zero allocations",
    "dimension": "detail_vs_big_picture",
    "dim_val_a": -1.0,
    "dim_val_b": 1.0,
    "persona_a": "The Collaborator",
    "persona_b": "The Debugger"
  },
  {
    "id": 92,
    "section": 2,
    "type": "forced_choice",
    "category": "teamwork",
    "text": "When leading a technical demo to non-developer stakeholders:",
    "option_a": "I focus on the business user journey, ROI, and how the solution addresses their operational workflows",
    "option_b": "I demonstrate how our modular microservice architecture enables rapid future feature delivery",
    "dimension": "tech_vs_comm",
    "dim_val_a": 1.0,
    "dim_val_b": -1.0,
    "persona_a": "The Collaborator",
    "persona_b": "The Architect"
  },
  {
    "id": 93,
    "section": 2,
    "type": "forced_choice",
    "category": "personality",
    "text": "When an architectural design I spent days preparing is superseded by a simpler alternative:",
    "option_a": "I feel relieved that a simpler path was found and champion the new direction wholeheartedly",
    "option_b": "I view it as an insightful case study and dissect what technical assumptions I can learn from",
    "dimension": "structured_vs_flexible",
    "dim_val_a": 1.0,
    "dim_val_b": -1.0,
    "persona_a": "The Collaborator",
    "persona_b": "The Learner"
  },
  {
    "id": 94,
    "section": 2,
    "type": "forced_choice",
    "category": "problem_solving",
    "text": "When faced with an intermittent, non-reproducible concurrency bug:",
    "option_a": "I spend hours adding stress tests, thread dump dumps, and race-condition simulations until it breaks locally",
    "option_b": "I research recent open-source bug reports and JVM concurrency issue trackers for known edge cases",
    "dimension": "detail_vs_big_picture",
    "dim_val_a": 1.0,
    "dim_val_b": -1.0,
    "persona_a": "The Debugger",
    "persona_b": "The Learner"
  },
  {
    "id": 95,
    "section": 2,
    "type": "forced_choice",
    "category": "motivation",
    "text": "Which role resonates more with your long-term career ambition?",
    "option_a": "Principal Software Architect: setting cross-squad technical visions, standards, and cloud topologies",
    "option_b": "Staff Software Engineer / Tech Lead: actively coding alongside squads while coaching engineers",
    "dimension": "tech_vs_comm",
    "dim_val_a": -1.0,
    "dim_val_b": 1.0,
    "persona_a": "The Architect",
    "persona_b": "The Collaborator"
  },
  {
    "id": 96,
    "section": 2,
    "type": "forced_choice",
    "category": "work_style",
    "text": "Regarding Git branching workflows, I prefer:",
    "option_a": "Short-lived feature branches merged frequently into main using trunk-based development",
    "option_b": "Well-defined Gitflow branches (feature, develop, release) with formal stage-gated signoffs",
    "dimension": "structured_vs_flexible",
    "dim_val_a": 1.0,
    "dim_val_b": -1.0,
    "persona_a": "The Executor",
    "persona_b": "The Architect"
  },
  {
    "id": 97,
    "section": 2,
    "type": "forced_choice",
    "category": "teamwork",
    "text": "If a new team member is struggling to understand our Spring Security configuration:",
    "option_a": "I set up an interactive 1-on-1 screen-sharing session to debug and explain each filter chain together",
    "option_b": "I walk them through how the security filter chain evolved across Spring versions so they understand the fundamentals",
    "dimension": "solo_vs_team",
    "dim_val_a": 1.0,
    "dim_val_b": -1.0,
    "persona_a": "The Collaborator",
    "persona_b": "The Learner"
  },
  {
    "id": 98,
    "section": 2,
    "type": "forced_choice",
    "category": "personality",
    "text": "When project requirements change drastically in the middle of a sprint:",
    "option_a": "I embrace the change dynamically as an agile reality and adjust sprint backlog items smoothly",
    "option_b": "I re-evaluate how the changes impact the core domain model and adjust architecture accordingly",
    "dimension": "structured_vs_flexible",
    "dim_val_a": 1.0,
    "dim_val_b": -1.0,
    "persona_a": "The Executor",
    "persona_b": "The Architect"
  },
  {
    "id": 99,
    "section": 2,
    "type": "forced_choice",
    "category": "problem_solving",
    "text": "When choosing between synchronous REST vs asynchronous Kafka events:",
    "option_a": "I lean towards asynchronous events to decouple microservices and maximize fault tolerance",
    "option_b": "I lean towards synchronous REST/gRPC for simpler debugging, immediate consistency, and lower ops complexity",
    "dimension": "detail_vs_big_picture",
    "dim_val_a": -1.0,
    "dim_val_b": 1.0,
    "persona_a": "The Architect",
    "persona_b": "The Executor"
  },
  {
    "id": 100,
    "section": 2,
    "type": "forced_choice",
    "category": "motivation",
    "text": "At the end of an engineering quarter, what gives you the greatest sense of pride?",
    "option_a": "Having delivered every promised epic on time with clean burn-down velocity",
    "option_b": "Having mastered an advanced technical domain that elevated the team's engineering capability",
    "dimension": "quality_vs_speed",
    "dim_val_a": -1.0,
    "dim_val_b": 1.0,
    "persona_a": "The Executor",
    "persona_b": "The Learner"
  },
  {
    "id": 101,
    "section": 3,
    "type": "sjt",
    "category": "problem_solving",
    "scenario": "Scenario: During a peak sales campaign, your team's core Spring Boot payment service begins throwing java.lang.OutOfMemoryError: Java heap space. Pods are restarting continuously, leading to failed customer transactions.",
    "question": "What is your immediate and best course of action?",
    "options": [
      "Capture an automated heap dump via -XX:+HeapDumpOnOutOfMemoryError, scale out replicas temporarily to absorb traffic, and then immediately analyze the dump in Eclipse MAT or JProfiler to locate the leaking object references.",
      "Quickly modify the JVM memory parameters (-Xmx) to triple the heap size in Kubernetes deployment configs without checking heap dumps, hoping it solves the issue permanently.",
      "Immediately restart all payment pods manually one by one and wait until after the peak sales campaign has ended before investigating any logs.",
      "Assume the issue is caused by recent code from another squad and page their on-call engineer without verifying memory metrics."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.4,
      0.2,
      0.0
    ],
    "persona_tag": "The Debugger"
  },
  {
    "id": 102,
    "section": 3,
    "type": "sjt",
    "category": "work_style",
    "scenario": "Scenario: Two days before a major release, your Product Manager asks you to bypass unit testing and skip SonarQube quality gate checks for a newly added feature in order to hit the promised delivery deadline.",
    "question": "How do you handle this request?",
    "options": [
      "Transparently explain the severe risks of unverified regressions and production downtime, negotiate a reduced scope that can be properly tested, or offer to release the feature behind a disabled feature flag until tests pass.",
      "Comply immediately and disable the SonarQube quality gates in Jenkins/GitHub Actions, assuming that if bugs occur, the team will fix them in a post-release patch.",
      "Refuse aggressively and complain to the VP of Engineering about the Product Manager trying to compromise engineering standards.",
      "Secretly write hasty minimal tests with zero assertions just to make the test runner and coverage gate pass superficially."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.1,
      0.3,
      0.0
    ],
    "persona_tag": "The Architect"
  },
  {
    "id": 103,
    "section": 3,
    "type": "sjt",
    "category": "teamwork",
    "scenario": "Scenario: In a pull request review, a junior developer has implemented a new business requirement using a single 800-line controller method filled with nested if-else blocks, raw JDBC queries, and hardcoded secrets.",
    "question": "What is your most effective and constructive response?",
    "options": [
      "Schedule a 30-minute pair-programming session with them to explain layered architecture (Controller-Service-Repository), recommend extracting domain logic into services, demonstrate external configuration for secrets, and provide clear code examples.",
      "Reject the pull request outright with a blunt comment: 'This code violates all clean architecture principles. Rewrite it completely from scratch.'",
      "Approve the pull request to avoid hurting their feelings, thinking you will quietly refactor it yourself next sprint.",
      "Take their branch, rewrite the entire code yourself late at night, push over their commit, and merge it without explaining anything to them."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.2,
      0.1,
      0.0
    ],
    "persona_tag": "The Collaborator"
  },
  {
    "id": 104,
    "section": 3,
    "type": "sjt",
    "category": "problem_solving",
    "scenario": "Scenario: Your Java backend application experiences periodic latency spikes where p99 response times jump from 50ms to 4,000ms. CPU usage is modest, but garbage collection logs show frequent Stop-The-World pauses.",
    "question": "How do you diagnose and resolve this performance bottleneck?",
    "options": [
      "Enable detailed GC logging (-Xlog:gc*), analyze GC pause times and allocation rates using tools like GCeasy or JFR, inspect high-churn object allocations, and tune GC collector settings (e.g. evaluating G1GC or ZGC) while optimizing short-lived object lifecycles in the code.",
      "Switch immediately to ZGC without examining allocation profiles, hoping the new garbage collector will magically fix all latency issues without code changes.",
      "Add a distributed Redis cache in front of every endpoint regardless of whether the latency is related to database queries or internal object allocation.",
      "Advise the operations team to restart the JVM instances every 3 hours via a cron job to keep memory fresh."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.5,
      0.3,
      0.0
    ],
    "persona_tag": "The Debugger"
  },
  {
    "id": 105,
    "section": 3,
    "type": "sjt",
    "category": "teamwork",
    "scenario": "Scenario: A senior software architect mandates using a complex event-driven CQRS and Event Sourcing architecture for an internal CRUD application with low traffic and simple business workflows. You believe this will cause severe over-engineering.",
    "question": "How do you address this technical disagreement?",
    "options": [
      "Prepare an objective architectural tradeoff document comparing the simple domain model with CQRS, illustrating increased operational complexity, eventual consistency overhead, and timeline risks, then discuss it collaboratively in the architectural review guild.",
      "Stay silent in meetings but complain bitterly to other developers during coffee breaks about the architect's unrealistic choices.",
      "Blindly accept the architect's proposal without question because they have higher seniority in the company hierarchy.",
      "Intentionally ignore the architect's guidelines and build a simple REST CRUD service secretly, presenting it only right before release."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.1,
      0.3,
      0.0
    ],
    "persona_tag": "The Collaborator"
  },
  {
    "id": 106,
    "section": 3,
    "type": "sjt",
    "category": "work_style",
    "scenario": "Scenario: You discover that a flaky integration test fails intermittently (about 1 out of every 10 CI runs) due to an asynchronous timing race condition in a Testcontainers PostgreSQL container, delaying squad merges.",
    "question": "What is the best course of action?",
    "options": [
      "Investigate the race condition using tools like Awaitility to properly await expected state transitions rather than using fragile Thread.sleep(), ensuring tests are deterministic and resilient.",
      "Mark the test with @Disabled or @Ignore in JUnit so the CI pipeline turns green and builds are no longer blocked.",
      "Configure the CI runner to automatically retry failed tests up to 5 times so that merges eventually pass without fixing the code.",
      "Increase Thread.sleep(10000) to 30 seconds across all integration tests, slowing down the overall CI pipeline significantly."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.2,
      0.3,
      0.1
    ],
    "persona_tag": "The Debugger"
  },
  {
    "id": 107,
    "section": 3,
    "type": "sjt",
    "category": "problem_solving",
    "scenario": "Scenario: A critical production service running on Spring Boot 2.7 with Java 8 needs to be upgraded to Spring Boot 3.2 and Java 21 to patch critical CVEs and take advantage of Virtual Threads.",
    "question": "How should the upgrade be planned and executed?",
    "options": [
      "Audit third-party dependencies for Jakarta EE namespace compatibility (javax.* to jakarta.*), establish baseline automated test suites, upgrade Java and dependencies incrementally in a dedicated branch, test thoroughly in staging, and verify observability metrics under load.",
      "Change the pom.xml dependencies and Java version directly in the main branch and deploy straight to staging, fixing compiler and runtime errors as they blow up.",
      "Delay the upgrade indefinitely because touching legacy Java 8 services is too risky and might disrupt current sprint velocity.",
      "Propose rewriting the entire service from scratch in a completely new language (e.g., Go or Rust) rather than upgrading the existing Java codebase."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.2,
      0.1,
      0.0
    ],
    "persona_tag": "The Architect"
  },
  {
    "id": 108,
    "section": 3,
    "type": "sjt",
    "category": "teamwork",
    "scenario": "Scenario: During sprint planning, your squad estimates a high-priority customer feature at 13 story points. The Product Owner states that only 5 points of developer capacity remain in the upcoming 2-week sprint.",
    "question": "What is the most professional way to handle this expectation gap?",
    "options": [
      "Collaborate with the Product Owner to slice the user story into smaller incremental deliverables, identifying a viable MVP subset that fits into the 5 points while scheduling the remainder for the next sprint.",
      "Agree to deliver the entire 13-point story within the 5-point capacity, planning to work unpaid overtime nights and weekends to finish it.",
      "Tell the Product Owner that 13 points cannot be done, and refuse to discuss any alternatives or partial deliveries.",
      "Artificially lower your technical estimate to 5 points without changing any requirements, hoping that you will magically finish faster."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.2,
      0.2,
      0.0
    ],
    "persona_tag": "The Collaborator"
  },
  {
    "id": 109,
    "section": 3,
    "type": "sjt",
    "category": "personality",
    "scenario": "Scenario: You pushed a hotfix to production that you were confident would resolve a bug, but it inadvertently introduced a regression that prevented users from checking out their shopping carts for 20 minutes.",
    "question": "How do you react to this mistake?",
    "options": [
      "Own the mistake immediately, assist in rolling back the release, lead a blameless post-mortem analysis to identify testing gaps, and add automated regression test cases to prevent recurrence.",
      "Blame the QA engineer who signed off on the release or the reviewer who approved your pull request.",
      "Downplay the incident to management, claiming that very few users were impacted and that production hiccups are inevitable.",
      "Feel completely demotivated, avoid speaking up in meetings for the rest of the week, and hesitate to take on any future deployment tasks."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.0,
      0.2,
      0.1
    ],
    "persona_tag": "The Architect"
  },
  {
    "id": 110,
    "section": 3,
    "type": "sjt",
    "category": "problem_solving",
    "scenario": "Scenario: Your Java microservice consumes financial transactions from a Kafka topic. Due to network retries, duplicate messages occasionally arrive, causing double-billing reports from customers.",
    "question": "How do you fix this architectural defect?",
    "options": [
      "Implement an idempotent consumer pattern using a unique transaction ID and distributed lock/database unique constraint, storing processed transaction IDs within the same atomic database transaction as the business update.",
      "Change Kafka consumer configuration to enable at-most-once delivery, accepting that some legitimate transactions will be lost during consumer crashes.",
      "Increase Kafka message retention time and increase consumer poll intervals, hoping duplicate messages will disappear automatically.",
      "Add an in-memory Java HashSet to track processed IDs, ignoring that restarting the pod will erase the cache and allow duplicate billing again."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.1,
      0.2,
      0.2
    ],
    "persona_tag": "The Architect"
  },
  {
    "id": 111,
    "section": 3,
    "type": "sjt",
    "category": "work_style",
    "scenario": "Scenario: You inherit a 10-year-old monolithic Java enterprise application where a critical OrderService class has 4,500 lines of code, heavy mutable state, and zero unit tests. You are assigned to add a new shipping discount rule.",
    "question": "What is the best engineering approach?",
    "options": [
      "Write automated end-to-end integration tests around the existing order flow to create a regression safety net, then extract the discount calculation logic into a clean, isolated, and unit-tested strategy class before adding the new rule.",
      "Directly add an additional nested if-else condition inside the 4,500-line method, taking care not to touch anything else to avoid breaking untested code.",
      "Stop all feature development and spend the next two months rewriting the entire 4,500-line service without consulting management.",
      "Decline the ticket and ask the manager to assign it to another developer who has been at the company longer."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.4,
      0.2,
      0.0
    ],
    "persona_tag": "The Debugger"
  },
  {
    "id": 112,
    "section": 3,
    "type": "sjt",
    "category": "teamwork",
    "scenario": "Scenario: Two experienced engineers on your squad are in a deadlock over whether to use Spring Cloud OpenFeign or Spring 6 HTTP Interfaces (RestClient) for inter-service communication, causing pull requests to stall.",
    "question": "How do you facilitate progress?",
    "options": [
      "Propose a structured, time-boxed spike (e.g. 1 day) evaluating both options against objective criteria (performance, declarative readability, Spring Boot 3 roadmaps, maintenance overhead), and have the squad review findings to make a collective decision.",
      "Take sides with whichever engineer is more senior to avoid prolonged debate.",
      "Let both engineers implement their own favorite approach in different microservices, resulting in inconsistent conventions across the organization.",
      "Avoid getting involved and wait for the Engineering Manager to step in and dictate the tool."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.2,
      0.3,
      0.1
    ],
    "persona_tag": "The Collaborator"
  },
  {
    "id": 113,
    "section": 3,
    "type": "sjt",
    "category": "problem_solving",
    "scenario": "Scenario: A batch processing Java service that processes 50,000 database records every night is taking 7 hours to complete. Profiling reveals that Spring Data JPA is issuing individual SELECT queries for each associated entity inside a loop.",
    "question": "What is the optimal solution?",
    "options": [
      "Resolve the JPA N+1 query problem by using JOIN FETCH in JPQL, @EntityGraph, or batch fetching (@BatchSize), and process database updates in batches using JDBC batching or Spring Batch.",
      "Increase the database server CPU and RAM by 4x to handle the 50,000 separate queries faster without modifying the Java code.",
      "Split the batch job across 10 concurrent threads using an unbounded thread pool without changing the N+1 query pattern.",
      "Cache all 50,000 records in a local static Java List in memory before starting the job."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.3,
      0.3,
      0.1
    ],
    "persona_tag": "The Debugger"
  },
  {
    "id": 114,
    "section": 3,
    "type": "sjt",
    "category": "work_style",
    "scenario": "Scenario: On a Friday afternoon at 4:30 PM, a team member finishes their pull request for a moderately complex database schema migration and asks you to approve it so they can deploy to production before the weekend.",
    "question": "What should you do?",
    "options": [
      "Politely explain that deploying schema migrations late on Friday violates deployment safety best practices and risks weekend customer disruption; suggest reviewing the PR now and scheduling deployment for Monday morning during normal monitoring hours.",
      "Quickly approve and merge the PR without thorough review so the teammate doesn't have to carry work over the weekend.",
      "Ignore the teammate's message on Slack completely until Monday morning arrives.",
      "Approve the PR but tell the teammate that if anything breaks over the weekend, they alone must fix it."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.1,
      0.2,
      0.2
    ],
    "persona_tag": "The Architect"
  },
  {
    "id": 115,
    "section": 3,
    "type": "sjt",
    "category": "personality",
    "scenario": "Scenario: You have spent three weeks designing and prototyping a high-performance caching layer in Java using Caffeine and Redis. During an architecture review, an enterprise architect informs you that caching will be handled upstream at the API Gateway layer, rendering your prototype unnecessary.",
    "question": "What is your attitude and response?",
    "options": [
      "Acknowledge the architectural benefits of consolidating caching at the gateway, document the learnings and benchmarking data from your prototype, and pivot gracefully to supporting the gateway integration.",
      "Argue angrily that your three weeks of work have been wasted and insist that the application-level cache must be deployed anyway.",
      "Become passive-aggressive in meetings and refuse to participate in any future architecture discussions.",
      "Secretly enable your caching code anyway in your microservice without telling the architect."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.1,
      0.1,
      0.0
    ],
    "persona_tag": "The Architect"
  },
  {
    "id": 116,
    "section": 3,
    "type": "sjt",
    "category": "teamwork",
    "scenario": "Scenario: A developer from an upstream squad frequently breaks API contracts that your Java service depends on, causing your automated contract tests in staging to fail repeatedly.",
    "question": "How do you resolve this cross-squad friction?",
    "options": [
      "Reach out to the upstream team lead to establish Consumer-Driven Contract Testing (e.g., using Spring Cloud Contract or Pact) integrated into their CI pipeline, preventing contract-breaking commits from merging.",
      "Retaliate by intentionally breaking the contracts your team exposes to other squads so they feel the same pain.",
      "Disable the failing contract tests in your staging environment so your team's pipeline stays green.",
      "Send a mass email to company executives blaming the upstream squad for incompetence."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.0,
      0.1,
      0.0
    ],
    "persona_tag": "The Collaborator"
  },
  {
    "id": 117,
    "section": 3,
    "type": "sjt",
    "category": "problem_solving",
    "scenario": "Scenario: You notice in production thread dumps that multiple Java worker threads are in a BLOCKED state, waiting on monitors held by other threads, resulting in a classic distributed deadlock and thread pool exhaustion.",
    "question": "How do you resolve this deadlock?",
    "options": [
      "Analyze the thread dump stack traces to identify the exact lock acquisition ordering, refactor the code to ensure all threads acquire locks in a consistent, deterministic global order (or replace synchronized blocks with java.util.concurrent non-blocking locks with timeouts).",
      "Simply increase the Tomcat max-threads limit from 200 to 2,000 so there are always free threads available.",
      "Surround the locked code with a try-catch block catching Throwable and ignore any caught exceptions.",
      "Replace all multithreading with a single-threaded queue, ignoring the severe throughput collapse that results."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.2,
      0.0,
      0.2
    ],
    "persona_tag": "The Debugger"
  },
  {
    "id": 118,
    "section": 3,
    "type": "sjt",
    "category": "work_style",
    "scenario": "Scenario: You are assigned to implement a new feature with an ambiguous user story. The Product Owner is on vacation for the next three days, and nobody else has business domain authority.",
    "question": "What is the best way to proceed without wasting time?",
    "options": [
      "Review existing domain code, formulate reasonable architectural assumptions, document the open questions clearly, implement the technical foundations (e.g., schemas, repository interfaces) that are unambiguous, and validate assumptions upon the PO's return.",
      "Sit idle and do no work for three days until the Product Owner returns to give instructions.",
      "Guess the most complex version of the business logic and build it completely, refusing to change it if the PO had different requirements.",
      "Pick random tickets from other squads' backlogs and work on those instead without telling your team lead."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.1,
      0.2,
      0.1
    ],
    "persona_tag": "The Executor"
  },
  {
    "id": 119,
    "section": 3,
    "type": "sjt",
    "category": "teamwork",
    "scenario": "Scenario: You are leading a technical presentation on migrating your squad's Java microservices to Java 21 Virtual Threads. During Q&A, an engineer raises an edge-case question regarding ThreadLocal memory leaks that you do not know the answer to.",
    "question": "How do you respond?",
    "options": [
      "Acknowledge honestly that you haven't researched that specific ThreadLocal scenario yet, thank them for raising a critical consideration, and promise to investigate the JDK 21 ScopedValue alternative and share findings by the next day.",
      "Make up a plausible-sounding technical explanation on the spot to avoid looking like you don't know the answer.",
      "Dismiss the question as irrelevant and suggest that Virtual Threads are too advanced for them to understand.",
      "Defensively change the topic and conclude the presentation abruptly."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.1,
      0.0,
      0.0
    ],
    "persona_tag": "The Learner"
  },
  {
    "id": 120,
    "section": 3,
    "type": "sjt",
    "category": "problem_solving",
    "scenario": "Scenario: A critical zero-day vulnerability (similar to Log4Shell) is published affecting a logging dependency used across your company's Java microservices.",
    "question": "What is your systematic response?",
    "options": [
      "Audit all squad repositories using dependency scanning tools (OWASP Dependency-Check / Snyk), assess exploitability paths, update the dependency to the patched version (or apply the recommended JVM flag mitigation immediately), run automated regression suites, and deploy an emergency security patch.",
      "Wait until the next scheduled sprint planning meeting in two weeks to prioritize the security ticket.",
      "Immediately delete the logging library from production containers without testing if the services can boot without it.",
      "Assume your microservices are safe because they run behind an internal VPN and take no action."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.1,
      0.1,
      0.0
    ],
    "persona_tag": "The Learner"
  },
  {
    "id": 121,
    "section": 3,
    "type": "sjt",
    "category": "work_style",
    "scenario": "Scenario: You are writing a mission-critical financial calculation engine in Java. You need to choose between floating-point types (float/double) and BigDecimal.",
    "question": "What is the correct architectural choice?",
    "options": [
      "Use BigDecimal with explicit rounding modes (e.g., RoundingMode.HALF_EVEN) to prevent binary floating-point representation rounding errors inherent in double/float calculations.",
      "Use double for maximum speed and simplicity, assuming rounding discrepancies of fractions of a cent are negligible.",
      "Use String representations for all monetary numbers and parse them using regular expressions during each arithmetic operation.",
      "Store all currency values as unscaled integers representing dollars and ignore decimal cents completely."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.2,
      0.0,
      0.0
    ],
    "persona_tag": "The Executor"
  },
  {
    "id": 122,
    "section": 3,
    "type": "sjt",
    "category": "personality",
    "scenario": "Scenario: You receive a production bug report claiming that a feature you developed is generating incorrect reports. After spending an hour debugging, you realize the bug was caused by a subtle misunderstanding you had of the business logic.",
    "question": "How do you communicate this?",
    "options": [
      "Immediately post an update on the bug ticket stating that you identified the root cause in your logic, explain the exact misinterpretation, outline the proposed fix, and add a test case to prevent recurrence.",
      "Blame the business analyst for writing ambiguous user acceptance criteria in the original Jira ticket.",
      "Silently push a fix without explaining what caused the bug or acknowledging that it was a logic error.",
      "Claim that the issue was an intermittent infrastructure glitch that resolved itself."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.1,
      0.3,
      0.0
    ],
    "persona_tag": "The Collaborator"
  },
  {
    "id": 123,
    "section": 3,
    "type": "sjt",
    "category": "teamwork",
    "scenario": "Scenario: A teammate consistently misses daily standups or arrives unprepared, causing standups to drag on and leaving other developers blocked on dependent tasks.",
    "question": "What is the best team-oriented approach?",
    "options": [
      "Have a private, empathetic conversation with the teammate to understand if they are facing personal or workload difficulties, explain how the delays affect the squad, and brainstorm practical adjustments together.",
      "Call out and criticize the teammate publicly in the squad's general Slack channel to pressure them into punctuality.",
      "Complain directly to Human Resources without ever speaking to the teammate or Scrum Master first.",
      "Stop attending standup meetings yourself in protest until someone else resolves the issue."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.1,
      0.1,
      0.0
    ],
    "persona_tag": "The Collaborator"
  },
  {
    "id": 124,
    "section": 3,
    "type": "sjt",
    "category": "problem_solving",
    "scenario": "Scenario: Your team needs to integrate with a legacy SOAP service that frequently times out or returns 500 errors during high volume periods, causing cascading failures in your modern Spring Boot app.",
    "question": "What resilience pattern should you implement?",
    "options": [
      "Implement a Circuit Breaker pattern (Resilience4j) with configurable timeouts, retries with exponential backoff, and a fallback mechanism to return cached data or a graceful degradation message.",
      "Increase the HTTP connection timeout to 120 seconds and retry failed requests infinitely in a while-true loop.",
      "Completely bypass the legacy service and hardcode fake responses for all production users.",
      "Send alerts to the on-call engineer's mobile phone every time the legacy service returns an error."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.1,
      0.0,
      0.2
    ],
    "persona_tag": "The Learner"
  },
  {
    "id": 125,
    "section": 3,
    "type": "sjt",
    "category": "work_style",
    "scenario": "Scenario: You are tasked with implementing a business workflow that could either be written as straightforward procedural code or structured using multiple design patterns (Factory, Strategy, Observer).",
    "question": "How do you decide?",
    "options": [
      "Evaluate anticipated volatility and complexity: apply patterns where domain rules are actively expected to vary independently; otherwise favor clean, straightforward code without premature over-engineering.",
      "Always use as many design patterns as humanly possible to prove high-level architectural knowledge, regardless of simplicity.",
      "Never use design patterns under any circumstances because object-oriented patterns make code harder to read than procedural scripts.",
      "Randomly pick a design pattern from the Gang of Four book without considering the business domain."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.1,
      0.1,
      0.0
    ],
    "persona_tag": "The Executor"
  },
  {
    "id": 126,
    "section": 3,
    "type": "sjt",
    "category": "teamwork",
    "scenario": "Scenario: During a code review of your pull request, a peer reviewer leaves 25 comments on code formatting, variable naming, and indentation preferences, but ignores substantive architecture or logic.",
    "question": "How do you handle this review constructively?",
    "options": [
      "Thank them for the review, address the reasonable suggestions, and propose adopting an automated code formatter (Spotless / Google Java Format) in the CI pipeline so future reviews can focus strictly on logic and architecture.",
      "Reject every comment angrily and close the pull request in frustration.",
      "Retaliate by opening their latest pull request and leaving 50 nitpick comments on trivial styling details.",
      "Merge your pull request without addressing any comments or replying to the reviewer."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.0,
      0.0,
      0.1
    ],
    "persona_tag": "The Collaborator"
  },
  {
    "id": 127,
    "section": 3,
    "type": "sjt",
    "category": "personality",
    "scenario": "Scenario: Your company is considering migrating from traditional JVM microservices to GraalVM Native Image compilation or Quarkus to reduce startup time from 15s to 50ms and minimize memory consumption in Kubernetes.",
    "question": "What is your approach to this proposal?",
    "options": [
      "Set up a proof-of-concept spike repository, benchmark build times versus runtime performance, identify reflection/serialization boundaries required by Substrate VM, and share an empirical feasibility report with the team.",
      "Reject the idea immediately because standard Spring Boot on HotSpot JVM has always worked in the past.",
      "Immediately rewrite all 20 production microservices directly in Quarkus without testing native image compatibility.",
      "Wait for other companies to write blog posts about it and avoid touching it for 3 years."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.1,
      0.1,
      0.0
    ],
    "persona_tag": "The Learner"
  },
  {
    "id": 128,
    "section": 3,
    "type": "sjt",
    "category": "problem_solving",
    "scenario": "Scenario: You discover that a third-party Java dependency used in your payment service has an unpatched security flaw, but the maintainer has abandoned the repository.",
    "question": "What is the most sound engineering solution?",
    "options": [
      "Assess the feasibility of migrating to an actively maintained alternative library; if immediate migration is too costly, fork the library to patch the vulnerability internally, or apply a defensive validation proxy layer to sanitize inputs before reaching the vulnerable library.",
      "Continue using the vulnerable dependency and hope attackers do not discover that your application uses it.",
      "Remove the library and disable all payment processing features permanently until an external maintainer updates it.",
      "Write an angry public review on the open-source repository demanding that the volunteer maintainer fix it immediately."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.1,
      0.0,
      0.0
    ],
    "persona_tag": "The Executor"
  },
  {
    "id": 129,
    "section": 3,
    "type": "sjt",
    "category": "work_style",
    "scenario": "Scenario: Your engineering team is adopting Continuous Delivery, meaning every commit merged to the main branch automatically deploys to production. You are writing a high-risk database migration.",
    "question": "How do you manage this deployment safely?",
    "options": [
      "Use the Expand-and-Contract (Parallel Change) migration pattern: add new columns/tables first, deploy code that writes to both old and new schemas, backfill data, switch reads to new schema, and finally drop old columns in a subsequent release.",
      "Run a destructive ALTER TABLE script directly during peak hours that renames columns instantly, ignoring temporary downtime.",
      "Disable the CI/CD pipeline permanently and revert to manual midnight deployments on weekends.",
      "Skip database migrations and store all relational data as unstructured JSON strings in a single text column."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.1,
      0.1,
      0.0
    ],
    "persona_tag": "The Executor"
  },
  {
    "id": 130,
    "section": 3,
    "type": "sjt",
    "category": "motivation",
    "scenario": "Scenario: You are offered two prospective assignments for the next quarter: Option 1 is building a routine marketing landing page service with standard CRUD logic; Option 2 is redesigning the internal distributed event bus using Java 21 Virtual Threads and Kafka to support high-throughput financial settlements.",
    "question": "Which assignment motivates you more and why?",
    "options": [
      "Option 2, because exploring cutting-edge Java 21 concurrency, distributed systems resilience, and high-throughput tuning pushes my technical depth and engineering growth.",
      "Option 1, because marketing pages are easy to finish quickly with minimal mental effort and zero stress.",
      "Neither, because both options require writing code and attending sprint meetings.",
      "Whichever option requires the absolute least amount of communication with other human beings."
    ],
    "best_option": 0,
    "scores": [
      1.0,
      0.3,
      0.0,
      0.0
    ],
    "persona_tag": "The Learner"
  },
  {
    "id": 131,
    "section": 4,
    "type": "motivation",
    "category": "motivation",
    "text": "What type of engineering challenge gives you the deepest sense of fulfillment?",
    "options": [
      "Architecting scalable, fault-tolerant microservice systems with clean domain boundaries",
      "Dissecting complex JVM memory leaks, thread contention, and profiling high-latency bottlenecks",
      "Fostering an inclusive engineering culture, pair-programming, and mentoring fellow developers",
      "Exploring modern Java features like Virtual Threads and GraalVM to pioneer new architecture"
    ],
    "persona_map": [
      "The Architect",
      "The Debugger",
      "The Collaborator",
      "The Learner"
    ],
    "scores": [
      1.0,
      1.0,
      1.0,
      1.0
    ]
  },
  {
    "id": 132,
    "section": 4,
    "type": "motivation",
    "category": "motivation",
    "text": "When starting at a new engineering company, what factor is most critical to your job satisfaction?",
    "options": [
      "Sound technical leadership, clear architectural guidelines, and modular codebases",
      "High autonomy to investigate complex systems deeply and eliminate latent defects",
      "A collaborative, empathetic team with high psychological safety and transparent feedback",
      "A fast-paced delivery environment where code ships rapidly to real users"
    ],
    "persona_map": [
      "The Architect",
      "The Debugger",
      "The Collaborator",
      "The Executor"
    ],
    "scores": [
      1.0,
      1.0,
      1.0,
      1.0
    ]
  },
  {
    "id": 133,
    "section": 4,
    "type": "motivation",
    "category": "motivation",
    "text": "Which aspect of modern Java development excites you the most?",
    "options": [
      "Leveraging modularity, Spring 6 / Spring Boot 3 cloud-native patterns, and Clean Architecture",
      "Deep JVM innovations like Project Loom, Garbage Collectors (ZGC/Shenandoah), and JFR",
      "Delivering business features rapidly using high-productivity frameworks and automated CI/CD",
      "Modern productivity features like pattern matching, record classes, and rapid test frameworks"
    ],
    "persona_map": [
      "The Architect",
      "The Debugger",
      "The Executor",
      "The Learner"
    ],
    "scores": [
      1.0,
      1.0,
      1.0,
      1.0
    ]
  },
  {
    "id": 134,
    "section": 4,
    "type": "motivation",
    "category": "motivation",
    "text": "What represents the pinnacle of professional recognition for your engineering work?",
    "options": [
      "Having your architectural design cited as the company-wide blueprint for next-generation platforms",
      "Being sought after as the ultimate technical troubleshooter who can solve any impossible bug",
      "Being celebrated by teammates as an inspiring mentor and an exceptional team player",
      "Being recognized as an engineering innovator who introduced modern technologies that elevated squad velocity"
    ],
    "persona_map": [
      "The Architect",
      "The Debugger",
      "The Collaborator",
      "The Learner"
    ],
    "scores": [
      1.0,
      1.0,
      1.0,
      1.0
    ]
  },
  {
    "id": 135,
    "section": 4,
    "type": "motivation",
    "category": "motivation",
    "text": "How do you prefer to keep your Java and backend engineering skills sharp?",
    "options": [
      "Studying enterprise architecture books, distributed systems whitepapers, and RFC standards",
      "Reading JVM internals specifications, analyzing flame graphs, and tuning open-source libraries",
      "Building hands-on pet projects with emerging frameworks like Quarkus, Micronaut, and GraalVM",
      "Shipping real production features rapidly and learning through real-world user metrics"
    ],
    "persona_map": [
      "The Architect",
      "The Debugger",
      "The Learner",
      "The Executor"
    ],
    "scores": [
      1.0,
      1.0,
      1.0,
      1.0
    ]
  },
  {
    "id": 136,
    "section": 4,
    "type": "motivation",
    "category": "motivation",
    "text": "What is your primary motivation when performing code reviews?",
    "options": [
      "Ensuring architectural consistency, adherence to domain boundaries, and long-term maintainability",
      "Catching subtle edge cases, concurrency hazards, null safety issues, and resource leaks",
      "Empowering the author with positive encouragement, clear explanations, and learning tips",
      "Keeping reviews focused and swift to maintain high sprint velocity and avoid blocking merges"
    ],
    "persona_map": [
      "The Architect",
      "The Debugger",
      "The Collaborator",
      "The Executor"
    ],
    "scores": [
      1.0,
      1.0,
      1.0,
      1.0
    ]
  },
  {
    "id": 137,
    "section": 4,
    "type": "motivation",
    "category": "motivation",
    "text": "Which work environment empowers your greatest productivity?",
    "options": [
      "An organization with well-defined design standards, clear API contracts, and structured RFC reviews",
      "Quiet, distraction-free focus blocks where I can dive deep into complex code and logs",
      "An open, energetic team environment with frequent pair programming and active collaboration",
      "A learning-driven environment that provides dedicated time for tech spikes, conferences, and courses"
    ],
    "persona_map": [
      "The Architect",
      "The Debugger",
      "The Collaborator",
      "The Learner"
    ],
    "scores": [
      1.0,
      1.0,
      1.0,
      1.0
    ]
  },
  {
    "id": 138,
    "section": 4,
    "type": "motivation",
    "category": "motivation",
    "text": "What drives you most to write automated unit and integration tests?",
    "options": [
      "Creating a living architectural specification of the business domain that enforces system integrity",
      "Proving mathematically that edge cases, boundary conditions, and race conditions behave safely",
      "Providing psychological safety so that any teammate can refactor code without fear of breaking things",
      "Automating verification so our CI/CD pipeline can deploy fast without human manual QA bottlenecks"
    ],
    "persona_map": [
      "The Architect",
      "The Debugger",
      "The Collaborator",
      "The Executor"
    ],
    "scores": [
      1.0,
      1.0,
      1.0,
      1.0
    ]
  },
  {
    "id": 139,
    "section": 4,
    "type": "motivation",
    "category": "motivation",
    "text": "When evaluating a company's engineering culture, what is your biggest red flag?",
    "options": [
      "Disorganized spaghetti architecture, lack of modularity, and no long-term technical vision",
      "Ignoring critical production errors, tolerating flaky tests, and masking bugs with band-aids",
      "Blame-oriented retrospectives, toxic competition among peers, and lack of psychological safety",
      "Technological stagnation, where the team refuses to upgrade past Java 8 and fears modern tools"
    ],
    "persona_map": [
      "The Architect",
      "The Debugger",
      "The Collaborator",
      "The Learner"
    ],
    "scores": [
      1.0,
      1.0,
      1.0,
      1.0
    ]
  },
  {
    "id": 140,
    "section": 4,
    "type": "motivation",
    "category": "motivation",
    "text": "How do you view technical debt in software development?",
    "options": [
      "A strategic debt that must be systematically managed with architectural roadmaps and bounded contexts",
      "A serious operational risk that must be methodically profiled, isolated, and refactored",
      "A shared team challenge best tackled through cooperative refactoring sprints and shared ownership",
      "A necessary pragmatic tradeoff taken to capture urgent market opportunities and ship fast"
    ],
    "persona_map": [
      "The Architect",
      "The Debugger",
      "The Collaborator",
      "The Executor"
    ],
    "scores": [
      1.0,
      1.0,
      1.0,
      1.0
    ]
  },
  {
    "id": 141,
    "section": 4,
    "type": "motivation",
    "category": "motivation",
    "text": "What kind of team role do you naturally gravitate toward in an agile squad?",
    "options": [
      "The System Strategist: defining technical blueprints, evaluating tech stacks, and ensuring modularity",
      "The Deep Specialist: tackling the toughest algorithmic bottlenecks, memory leaks, and concurrency",
      "The Innovation Pioneer: researching and prototyping modern frameworks to keep the tech stack fresh",
      "The Delivery Engine: driving sprint commitments, maintaining momentum, and unblocking deployments"
    ],
    "persona_map": [
      "The Architect",
      "The Debugger",
      "The Learner",
      "The Executor"
    ],
    "scores": [
      1.0,
      1.0,
      1.0,
      1.0
    ]
  },
  {
    "id": 142,
    "section": 4,
    "type": "motivation",
    "category": "motivation",
    "text": "What gives you the highest confidence in a production deployment?",
    "options": [
      "Comprehensive architectural contract tests, canary deployments, and automated rollback triggers",
      "Exhaustive test coverage including stress testing, chaos engineering, and zero memory leaks in staging",
      "Full squad consensus, thorough peer review signoffs, and a collaborative release war-room",
      "Rapid blue/green or feature-flag rollouts where new code can be enabled incrementally in minutes"
    ],
    "persona_map": [
      "The Architect",
      "The Debugger",
      "The Collaborator",
      "The Executor"
    ],
    "scores": [
      1.0,
      1.0,
      1.0,
      1.0
    ]
  },
  {
    "id": 143,
    "section": 4,
    "type": "motivation",
    "category": "motivation",
    "text": "When working with legacy Java code, what mindset motivates you?",
    "options": [
      "Designing an elegant strangler-fig migration plan to modernize the legacy system safely over time",
      "Uncovering the historical context, finding the root cause of latent bugs, and making methods robust",
      "Modernizing the legacy codebase using newer Java language features and cleaner idioms",
      "Extracting the essential business value quickly so we can deliver modern customer features"
    ],
    "persona_map": [
      "The Architect",
      "The Debugger",
      "The Learner",
      "The Executor"
    ],
    "scores": [
      1.0,
      1.0,
      1.0,
      1.0
    ]
  },
  {
    "id": 144,
    "section": 4,
    "type": "motivation",
    "category": "motivation",
    "text": "Which technical milestone provides you with the strongest sense of accomplishment?",
    "options": [
      "Decommissioning an obsolete monolithic service after successfully migrating to modular microservices",
      "Reducing p99 response time from 800ms to 25ms through meticulous JVM and query optimization",
      "Guiding an associate engineer from novice to confident independent contributor",
      "Successfully introducing a modern framework (like Quarkus or Kafka Streams) that revolutionized team throughput"
    ],
    "persona_map": [
      "The Architect",
      "The Debugger",
      "The Collaborator",
      "The Learner"
    ],
    "scores": [
      1.0,
      1.0,
      1.0,
      1.0
    ]
  },
  {
    "id": 145,
    "section": 4,
    "type": "motivation",
    "category": "motivation",
    "text": "What is your primary philosophy regarding software simplicity?",
    "options": [
      "Simplicity means clean domain models, loose coupling, and high cohesion across service boundaries",
      "Simplicity means zero extraneous object allocations, minimal dependencies, and clear call stacks",
      "Simplicity means code that any engineer on the team can read, understand, and modify in 5 minutes",
      "Simplicity means building the simplest thing that solves the customer's problem today without overthinking"
    ],
    "persona_map": [
      "The Architect",
      "The Debugger",
      "The Collaborator",
      "The Executor"
    ],
    "scores": [
      1.0,
      1.0,
      1.0,
      1.0
    ]
  },
  {
    "id": 146,
    "section": 4,
    "type": "motivation",
    "category": "motivation",
    "text": "What is your perspective on adopting bleeding-edge Java libraries and tools?",
    "options": [
      "Adopt judiciously: evaluate stability, LTS support, security posture, and enterprise viability first",
      "Benchmark rigorously: profile performance, memory footprint, and GC overhead before adoption",
      "Decide democratically: host a team discussion to ensure everyone is excited and comfortable with it",
      "Experiment eagerly: try the newest libraries right away in spikes to keep the tech stack modern and competitive"
    ],
    "persona_map": [
      "The Architect",
      "The Debugger",
      "The Collaborator",
      "The Learner"
    ],
    "scores": [
      1.0,
      1.0,
      1.0,
      1.0
    ]
  },
  {
    "id": 147,
    "section": 4,
    "type": "motivation",
    "category": "motivation",
    "text": "What motivates you most to write comprehensive technical documentation?",
    "options": [
      "Creating enduring Architecture Decision Records (ADRs) that explain the 'why' behind system choices",
      "Documenting tricky edge cases, troubleshooting playbooks, and root cause post-mortems",
      "Lowering the barrier to entry so new team members can onboard smoothly and independently",
      "Documenting cutting-edge best practices and coding standards to level up team technical maturity"
    ],
    "persona_map": [
      "The Architect",
      "The Debugger",
      "The Collaborator",
      "The Learner"
    ],
    "scores": [
      1.0,
      1.0,
      1.0,
      1.0
    ]
  },
  {
    "id": 148,
    "section": 4,
    "type": "motivation",
    "category": "motivation",
    "text": "How do you approach work-life balance and sprint sustainability?",
    "options": [
      "By enforcing sound architectural foundations that prevent emergency fires and weekend outages",
      "By automating repetitive tasks, building robust tests, and preventing regression stress",
      "By fostering mutual team support so colleagues can cover for one another without burnout",
      "By maintaining disciplined sprint scoping and prioritizing high-value outcomes over busywork"
    ],
    "persona_map": [
      "The Architect",
      "The Debugger",
      "The Collaborator",
      "The Executor"
    ],
    "scores": [
      1.0,
      1.0,
      1.0,
      1.0
    ]
  },
  {
    "id": 149,
    "section": 4,
    "type": "motivation",
    "category": "motivation",
    "text": "What is your favorite type of technical conversation with engineering colleagues?",
    "options": [
      "Debating high-level architectural trade-offs, scalability bottlenecks, and distributed data models",
      "Deep-diving into concurrency bugs, bytecode analysis, and memory profiling traces",
      "Discussing emerging Java proposals, Project Loom developments, and new JVM compiler features",
      "Brainstorming rapid prototype solutions for upcoming user features and product concepts"
    ],
    "persona_map": [
      "The Architect",
      "The Debugger",
      "The Learner",
      "The Executor"
    ],
    "scores": [
      1.0,
      1.0,
      1.0,
      1.0
    ]
  },
  {
    "id": 150,
    "section": 4,
    "type": "motivation",
    "category": "motivation",
    "text": "Ultimately, what defines a 'Great Java Developer' in your eyes?",
    "options": [
      "One who designs resilient, scalable systems that gracefully stand the test of time and organizational growth",
      "One who possesses relentless technical curiosity, debugging mastery, and deep knowledge of JVM internals",
      "One who elevates everyone around them, fosters psychological safety, and builds great engineering teams",
      "One who consistently turns complex requirements into delivered software that creates real user value"
    ],
    "persona_map": [
      "The Architect",
      "The Debugger",
      "The Collaborator",
      "The Executor"
    ],
    "scores": [
      1.0,
      1.0,
      1.0,
      1.0
    ]
  }
];
