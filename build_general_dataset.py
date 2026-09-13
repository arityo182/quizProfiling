import json

questions = []

# ==============================================================================
# SECTION 1: LIKERT SCALE (60 Questions: 1 to 60)
# Personas:
# - The Strategist (planning, big picture)
# - The Analyst (detail, data-driven)
# - The Collaborator (team-first, communication)
# - The Executor (fast delivery, action-oriented)
# - The Innovator (creative, continuous learning)
# ==============================================================================
likert_items = [
    # 1-10
    (1, "work_style", "I prioritize establishing a structured project plan with clear milestones before jumping into execution.", "positive", "structured_planning", "structured_vs_flexible", -0.9, "The Strategist", None, None, None),
    (2, "problem_solving", "When faced with an unexpected operational problem, I dig into root causes and objective data before proposing solutions.", "positive", "analytical_rigor", "detail_vs_big_picture", 0.9, "The Analyst", None, None, None),
    (3, "teamwork", "I proactively seek feedback from colleagues and stakeholders to identify blind spots in my work.", "positive", "receptivity_to_feedback", "solo_vs_team", 0.8, "The Collaborator", None, None, None),
    (4, "personality", "I remain calm, focused, and constructive when dealing with high-stress deadlines or workplace emergencies.", "positive", "emotional_resilience", "structured_vs_flexible", 0.7, "The Strategist", None, None, None),
    (5, "work_style", "I ensure every deliverable undergoes rigorous quality checks and verification before sharing it with leadership.", "positive", "quality_discipline", "quality_vs_speed", 1.0, "The Analyst", 38, "opposite", None),
    (6, "motivation", "I am constantly looking for creative, non-traditional ways to solve existing workplace inefficiencies.", "positive", "innovation_mindset", "tech_vs_comm", -0.8, "The Innovator", None, None, None),
    (7, "personality", "I never make mistakes in my judgment or professional decisions under pressure.", "overconfidence_trap", "humility", None, None, None, None, None, "overconfidence"),
    (8, "teamwork", "I actively invest time in supporting teammates who are overwhelmed with heavy workloads.", "positive", "empathy_support", "solo_vs_team", 1.0, "The Collaborator", None, None, None),
    (9, "problem_solving", "I rely on quantitative metrics and empirical evidence rather than gut feelings when making major recommendations.", "positive", "data_driven", "detail_vs_big_picture", 0.9, "The Analyst", None, None, None),
    (10, "personality", "I always meet 100% of every deadline regardless of how unrealistic the initial timeline was.", "social_desirability_trap", "honesty", None, None, None, None, None, "social_desirability"),

    # 11-20
    (11, "work_style", "I maintain clear documentation and standardized processes so that any colleague can pick up where I left off.", "positive", "process_clarity", "structured_vs_flexible", -0.8, "The Strategist", None, None, None),
    (12, "teamwork", "When someone critiques my proposal or work output, I feel defensive and find it difficult to accept their feedback.", "negative", "receptivity_to_feedback", "solo_vs_team", -0.8, "The Collaborator", 49, "same", None),
    (13, "personality", "I easily adapt my work routine when company priorities or organizational strategies shift unexpectedly.", "positive", "adaptability", "structured_vs_flexible", 0.9, "The Innovator", None, None, None),
    (14, "problem_solving", "I break large, complex business problems down into measurable sub-components before formulating a strategy.", "positive", "systematic_analysis", "detail_vs_big_picture", 0.8, "The Analyst", None, None, None),
    (15, "motivation", "I actively study industry trends, new methodologies, and professional best practices in my personal time.", "positive", "continuous_learning", "tech_vs_comm", -0.9, "The Innovator", None, None, None),
    (16, "work_style", "I have a strong bias for action and prefer shipping a working solution today over waiting for perfection next month.", "positive", "bias_for_action", "quality_vs_speed", -0.9, "The Executor", None, None, None),
    (17, "teamwork", "In team meetings, I respectfully voice dissenting opinions when I foresee risks that others have overlooked.", "positive", "constructive_advocacy", "tech_vs_comm", 0.7, "The Strategist", None, None, None),
    (18, "personality", "I have never felt frustrated or annoyed when a project scope was completely changed at the last minute.", "social_desirability_trap", "emotional_honesty", None, None, None, None, None, "social_desirability"),
    (19, "problem_solving", "I focus on the overarching vision and strategic alignment of a project rather than getting lost in administrative details.", "positive", "big_picture_thinking", "detail_vs_big_picture", -0.9, "The Strategist", None, None, None),
    (20, "work_style", "I manage my daily tasks with disciplined time-blocking to ensure high-priority deliverables are finished on schedule.", "positive", "time_management", "quality_vs_speed", -0.6, "The Executor", None, None, None),

    # 21-30
    (21, "teamwork", "I am willing to compromise on my personal preferences to reach consensus and maintain team cohesion.", "positive", "team_cohesion", "solo_vs_team", 0.8, "The Collaborator", None, None, None),
    (22, "personality", "I possess such complete expertise in my domain that I never need guidance or advice from peers or managers.", "overconfidence_trap", "humility", None, None, None, None, None, "overconfidence"),
    (23, "motivation", "I derive great satisfaction from seeing concrete, measurable business results achieved ahead of schedule.", "positive", "achievement_drive", "quality_vs_speed", -0.8, "The Executor", None, None, None),
    (24, "work_style", "I leave any workplace process, spreadsheet, or workflow more organized and efficient than I found it.", "positive", "continuous_improvement", "quality_vs_speed", 0.8, "The Strategist", 58, "same", None),
    (25, "problem_solving", "Before launching an initiative, I evaluate potential risks, dependencies, and long-term organizational impact.", "positive", "risk_foresight", "detail_vs_big_picture", -0.9, "The Strategist", None, None, None),
    (26, "teamwork", "I proactively share helpful knowledge, templates, and lessons learned with colleagues across other departments.", "positive", "knowledge_sharing", "tech_vs_comm", 1.0, "The Collaborator", None, None, None),
    (27, "personality", "When a project fails or hits a setback, I bounce back quickly and analyze the experience to learn from it.", "positive", "growth_mindset", "structured_vs_flexible", 0.8, "The Innovator", None, None, None),
    (28, "work_style", "I tend to rush through deliverables at the end of the day without reviewing them for accuracy or completeness.", "negative", "quality_discipline", "quality_vs_speed", -0.8, "The Executor", None, None, None),
    (29, "motivation", "I thrive in an open workplace environment where psychological safety and honest dialogue are actively practiced.", "positive", "psychological_safety", "structured_vs_flexible", 0.8, "The Collaborator", None, None, None),
    (30, "problem_solving", "When evaluating different proposals, I verify the underlying financial calculations and data assumptions thoroughly.", "positive", "due_diligence", "detail_vs_big_picture", 0.8, "The Analyst", None, None, None),

    # 31-40
    (31, "personality", "I readily admit when I do not know an answer instead of pretending to have expertise I lack.", "positive", "intellectual_integrity", "tech_vs_comm", 0.6, "The Collaborator", None, None, None),
    (32, "work_style", "I possess high persistence and will methodically trace discrepancies until every figure reconciles accurately.", "positive", "meticulous_tenacity", "detail_vs_big_picture", 1.0, "The Analyst", None, None, None),
    (33, "teamwork", "I prefer working in complete isolation and find it burdensome when colleagues approach me with questions during the day.", "negative", "collaboration_openness", "solo_vs_team", -1.0, "The Collaborator", None, None, None),
    (34, "problem_solving", "I naturally look for patterns and correlations across seemingly unrelated operational problems.", "positive", "pattern_recognition", "detail_vs_big_picture", -0.7, "The Innovator", None, None, None),
    (35, "personality", "I have never felt stressed or overwhelmed by multiple competing deadlines at work.", "social_desirability_trap", "self_awareness", None, None, None, None, None, "social_desirability"),
    (36, "motivation", "I am energized by pioneering new ideas, testing novel concepts, and challenging status-quo assumptions.", "positive", "innovation_drive", "tech_vs_comm", -0.7, "The Innovator", None, None, None),
    (37, "work_style", "I maintain high personal accountability and consistently follow through on every commitment I make to others.", "positive", "accountability", "quality_vs_speed", -0.6, "The Executor", None, None, None),
    (38, "work_style", "I believe that double-checking details and reviewing drafts is largely a waste of time that delays fast delivery.", "negative", "quality_discipline", "quality_vs_speed", -1.0, "The Executor", 5, "opposite", None),
    (39, "teamwork", "When resolving interpersonal team friction, I focus on finding win-win outcomes rather than placing blame.", "positive", "conflict_resolution", "tech_vs_comm", 0.8, "The Collaborator", None, None, None),
    (40, "personality", "I maintain high self-motivation and deliver strong results even when operating with minimal supervisory direction.", "positive", "self_leadership", "solo_vs_team", -0.5, "The Executor", None, None, None),

    # 41-50
    (41, "problem_solving", "When designing a new workplace initiative, I outline the long-term governance structure and resource requirements.", "positive", "strategic_planning", "detail_vs_big_picture", -0.8, "The Strategist", None, None, None),
    (42, "work_style", "I systematically analyze industry benchmarks to ensure our internal standards are competitive.", "positive", "benchmarking", "solo_vs_team", -0.8, "The Analyst", None, None, None),
    (43, "personality", "I can master any completely unfamiliar business domain in just a couple of days without asking anyone for help.", "overconfidence_trap", "humility", None, None, None, None, None, "overconfidence"),
    (44, "teamwork", "I deliver constructive feedback to colleagues with empathy, clarity, and specific actionable recommendations.", "positive", "empathetic_feedback", "tech_vs_comm", 0.8, "The Collaborator", None, None, None),
    (45, "motivation", "I am motivated by driving tangible bottom-line growth and seeing projects delivered efficiently.", "positive", "results_orientation", "quality_vs_speed", -0.8, "The Executor", None, None, None),
    (46, "problem_solving", "I scrutinize reports for statistical anomalies, sample biases, and unverified assumptions before drawing conclusions.", "positive", "critical_thinking", "detail_vs_big_picture", 0.8, "The Analyst", None, None, None),
    (47, "work_style", "I maintain a well-structured filing and organizational system so information can be retrieved in seconds.", "positive", "operational_hygiene", "structured_vs_flexible", -0.7, "The Strategist", None, None, None),
    (48, "personality", "I view continuous personal and professional development as an essential lifelong commitment.", "positive", "self_development", "quality_vs_speed", 0.7, "The Innovator", None, None, None),
    (49, "teamwork", "I appreciate when colleagues challenge my proposals because debate sharpens the final outcome.", "positive", "receptivity_to_feedback", "solo_vs_team", 0.8, "The Collaborator", 12, "opposite", None),
    (50, "personality", "I have never made a single professional error that caused inconvenience to my team throughout my career.", "overconfidence_trap", "honesty", None, None, None, None, None, "overconfidence"),

    # 51-60
    (51, "problem_solving", "I actively anticipate operational bottlenecks and establish contingency protocols before issues emerge.", "positive", "contingency_planning", "detail_vs_big_picture", -0.6, "The Strategist", None, None, None),
    (52, "motivation", "I aspire to shape broad organizational strategy and guide cross-functional teams toward a unified purpose.", "positive", "leadership_vision", "detail_vs_big_picture", -1.0, "The Strategist", None, None, None),
    (53, "work_style", "I look for ways to automate repetitive administrative tasks to free up time for high-value strategic work.", "positive", "efficiency_focus", "quality_vs_speed", -0.8, "The Executor", None, None, None),
    (54, "teamwork", "I bridge communication silos between different business units to foster cross-functional synergy.", "positive", "cross_functional_alignment", "tech_vs_comm", 0.9, "The Collaborator", None, None, None),
    (55, "personality", "I show genuine patience and active listening when onboarding a new colleague into our department.", "positive", "patience_listening", "tech_vs_comm", 0.7, "The Collaborator", None, None, None),
    (56, "personality", "I always agree with every directive from executive leadership without any personal doubt or question.", "social_desirability_trap", "independent_critical_thinking", None, None, None, None, None, "social_desirability"),
    (57, "problem_solving", "I evaluate both immediate operational feasibility and 3-year strategic implications before deciding on new vendors.", "positive", "holistic_evaluation", "structured_vs_flexible", -0.8, "The Strategist", None, None, None),
    (58, "work_style", "Whenever I observe an inefficient procedure, I take personal initiative to refine and improve it.", "positive", "continuous_improvement", "quality_vs_speed", 0.9, "The Strategist", 24, "same", None),
    (59, "teamwork", "I adapt my communication style depending on whether I am speaking with executive leadership, clients, or peer teammates.", "positive", "adaptive_communication", "tech_vs_comm", 1.0, "The Collaborator", None, None, None),
    (60, "motivation", "I thrive in high-tempo environments where fast decision-making and rapid implementation are celebrated.", "positive", "velocity_drive", "quality_vs_speed", -0.9, "The Executor", None, None, None)
]

for item in likert_items:
    q = {
        "id": item[0],
        "section": 1,
        "type": "likert",
        "category": item[1],
        "text": item[2],
        "scoring": item[3],
        "trait": item[4],
        "dimension": item[5],
        "dimension_val": item[6],
        "persona": item[7],
        "consistency_pair_id": item[8],
        "consistency_relation": item[9],
        "trap_type": item[10]
    }
    questions.append(q)

print(f"GP Likert built: {len(questions)}")

# ==============================================================================
# SECTION 2: FORCED CHOICE (40 Questions: 61-100)
# Balanced across 5 Personas: The Strategist, The Analyst, The Collaborator, The Executor, The Innovator
# ==============================================================================
fc_items = [
    # 61-70
    (61, "work_style", "When starting a major organizational project, I prefer to:",
     "Formulate the overarching vision, strategic milestones, and organizational governance first",
     "Start executing immediate pilot initiatives to generate early momentum and test real-world traction",
     "detail_vs_big_picture", -1.0, 1.0, "The Strategist", "The Executor"),
    (62, "teamwork", "When solving a complex workplace challenge, I am more effective when:",
     "Collaborating in real-time brainstorms with colleagues to synthesize diverse viewpoints",
     "Conducting deep, uninterrupted solo research and quantitative analysis before presenting findings",
     "solo_vs_team", 1.0, -1.0, "The Collaborator", "The Analyst"),
    (63, "work_style", "When approaching a critical project deadline with limited time remaining:",
     "I deliver a thoroughly polished, error-free core deliverable even if secondary scope is postponed",
     "I deliver the complete requested scope on time by accepting minor cosmetic imperfections to iterate later",
     "quality_vs_speed", 1.0, -1.0, "The Analyst", "The Executor"),
    (64, "problem_solving", "When reviewing a business proposal, I tend to scrutinize:",
     "Strategic alignment with corporate objectives and long-term organizational sustainability",
     "Financial assumptions, unit economics, data accuracy, and granular risk factors",
     "detail_vs_big_picture", -1.0, 1.0, "The Strategist", "The Analyst"),
    (65, "motivation", "When considering long-term career growth, I feel more energized by:",
     "Developing deep analytical mastery and being recognized as a go-to subject matter expert",
     "Exploring emerging industry trends, business models, and innovative technological transformations",
     "tech_vs_comm", -1.0, 1.0, "The Analyst", "The Innovator"),
    (66, "work_style", "When improving an inefficient operational procedure, my approach is to:",
     "Implement immediate, practical workflow tweaks that alleviate team bottlenecks right away",
     "Redesign the entire operating model systematically with comprehensive change management",
     "structured_vs_flexible", 1.0, -1.0, "The Executor", "The Strategist"),
    (67, "teamwork", "In team retrospectives or review meetings, I am naturally inclined to:",
     "Highlight interpersonal dynamics, team morale, and communication friction points",
     "Introduce modern methodologies, creative brainstorming techniques, and novel productivity tools",
     "tech_vs_comm", 1.0, -1.0, "The Collaborator", "The Innovator"),
    (68, "personality", "When colleagues have conflicting opinions on how to handle an ambiguous issue:",
     "I facilitate an open dialogue to align everyone behind a shared compromise",
     "I gather objective performance data and run financial simulations to let the numbers guide the decision",
     "tech_vs_comm", 1.0, -1.0, "The Collaborator", "The Analyst"),
    (69, "motivation", "I find greater personal pride in:",
     "Closing a high-stakes client deal or shipping a major product release ahead of schedule",
     "Formulating a multi-year organizational transformation roadmap that sets the company's future direction",
     "detail_vs_big_picture", 1.0, -1.0, "The Executor", "The Strategist"),
    (70, "problem_solving", "When evaluating a completely new business methodology:",
     "I research academic whitepapers, case studies, and proven corporate frameworks thoroughly first",
     "I immediately run a small-scale pilot experiment to observe how it performs in our actual operations",
     "structured_vs_flexible", -1.0, 1.0, "The Innovator", "The Executor"),

    # 71-80
    (71, "work_style", "In my ideal day-to-day workflow, I prefer:",
     "Clear, unambiguous task descriptions and structured standard operating procedures",
     "Broad, open-ended problem statements where I have the autonomy to define the solution",
     "structured_vs_flexible", -1.0, 1.0, "The Executor", "The Strategist"),
    (72, "teamwork", "When a colleague delivers a presentation that could be substantially improved:",
     "I schedule a supportive coffee chat to provide constructive, encouraging peer feedback",
     "I point them to innovative presentation frameworks and visual storytelling resources they can explore",
     "solo_vs_team", 1.0, -1.0, "The Collaborator", "The Innovator"),
    (73, "problem_solving", "When troubleshooting why a business metric dropped unexpectedly:",
     "I dissect granular cohort data, conversion funnels, and operational logs with rigor",
     "I review recent changes in market conditions, competitor releases, and organizational shifts",
     "detail_vs_big_picture", 1.0, -1.0, "The Analyst", "The Executor"),
    (74, "personality", "When an unexpected crisis disrupts our planned quarterly priorities:",
     "I jump into action, energized by the challenge of resolving urgent operational fires under pressure",
     "I step back to assess the systemic breakdown and formulate a resilient preventative framework",
     "structured_vs_flexible", 1.0, -1.0, "The Executor", "The Strategist"),
    (75, "motivation", "Between these two achievements, I am prouder of:",
     "Building a strategic governance framework that streamlined operations across 5 departments",
     "Executing a rapid turnaround project that generated immediate quarterly revenue growth",
     "tech_vs_comm", -1.0, 1.0, "The Strategist", "The Executor"),
    (76, "work_style", "Regarding project planning and execution:",
     "I champion experimenting with agile frameworks and creative ideation spikes",
     "I favor pragmatic, milestone-based execution that emphasizes hitting hard deliverables",
     "structured_vs_flexible", -1.0, 1.0, "The Innovator", "The Executor"),
    (77, "teamwork", "In a cross-functional squad, my primary strength is:",
     "Fostering strong interpersonal relationships and facilitating consensus among diverse stakeholders",
     "Providing the strategic anchor that keeps the squad focused on high-level organizational goals",
     "tech_vs_comm", 1.0, -1.0, "The Collaborator", "The Strategist"),
    (78, "personality", "When senior management challenges my strategic proposal:",
     "I view their scrutiny as an exciting learning dialogue to refine and elevate the concept",
     "I defend my recommendations using structured empirical projections and rigorous risk models",
     "structured_vs_flexible", 1.0, -1.0, "The Innovator", "The Strategist"),
    (79, "problem_solving", "When deciding on a corporate software tool or platform:",
     "I favor whatever tool allows our team to start executing and shipping results immediately",
     "I favor the tool that offers granular audit logs, data transparency, and robust reporting metrics",
     "detail_vs_big_picture", -1.0, 1.0, "The Executor", "The Analyst"),
    (80, "motivation", "What keeps me most motivated in an organization long-term is:",
     "A forward-thinking culture that rewards out-of-the-box thinking and continuous innovation",
     "A high-velocity delivery culture with rapid execution, visible milestones, and strong momentum",
     "quality_vs_speed", 1.0, -1.0, "The Innovator", "The Executor"),

    # 81-90
    (81, "work_style", "When planning my work week, I prioritize:",
     "Protected blocks of deep focus for analytical modeling, document writing, or financial review",
     "Frequent collaborative checkpoints to ensure teams are synchronized and unblocked",
     "solo_vs_team", -1.0, 1.0, "The Analyst", "The Collaborator"),
    (82, "teamwork", "When a high-visibility project falls behind schedule:",
     "I rally colleagues, help reallocate workloads, and support teammates under stress",
     "I ruthlessly de-scope non-critical deliverables to ensure core outcomes ship on time",
     "tech_vs_comm", 1.0, -1.0, "The Collaborator", "The Executor"),
    (83, "personality", "When an operational deployment or event experiences an unexpected failure:",
     "My first instinct is to execute contingency rollbacks to minimize immediate stakeholder disruption",
     "My first instinct is to analyze event logs and diagnostics to isolate the exact point of breakdown",
     "structured_vs_flexible", -1.0, 1.0, "The Strategist", "The Analyst"),
    (84, "problem_solving", "When choosing between two vendor proposals for a critical company need:",
     "I choose the established, enterprise-grade vendor with proven stability and market compliance",
     "I choose the agile, modern disruptor that offers innovative features and cutting-edge flexibility",
     "structured_vs_flexible", -1.0, 1.0, "The Strategist", "The Innovator"),
    (85, "motivation", "I am more flattered when peers commend me for:",
     "My analytical precision, depth of insight, and flawless attention to detail",
     "My team spirit, emotional intelligence, and ability to bring people together constructively",
     "tech_vs_comm", -1.0, 1.0, "The Analyst", "The Collaborator"),
    (86, "work_style", "When approaching complex strategic decisions, I naturally rely on:",
     "Creative lateral thinking, analogous market examples, and non-traditional perspectives",
     "Formal decision-matrix frameworks, established corporate policies, and precedent",
     "structured_vs_flexible", 1.0, -1.0, "The Innovator", "The Strategist"),
    (87, "teamwork", "If I notice a senior leader proposing an initiative with flawed assumptions:",
     "I prepare a detailed memorandum with factual counter-data and schedule a private briefing",
     "I suggest convening an innovation workshop to explore alternative concepts collaboratively",
     "tech_vs_comm", -1.0, 1.0, "The Analyst", "The Innovator"),
    (88, "personality", "When handed an ambiguous, ill-defined corporate assignment:",
     "I thrive on the blank canvas and relish the opportunity to define the vision from scratch",
     "I prefer clarifying explicit business boundaries, success criteria, and constraints first",
     "structured_vs_flexible", 1.0, -1.0, "The Innovator", "The Strategist"),
    (89, "problem_solving", "When navigating cross-departmental alignment:",
     "I establish a long-term shared vision and strategic governance council to coordinate priorities",
     "I institute rigorous data-sharing dashboards and quantitative KPIs to track progress objectively",
     "detail_vs_big_picture", -1.0, 1.0, "The Strategist", "The Analyst"),
    (90, "motivation", "In my ideal working environment, I spend the majority of my time:",
     "Researching future industry disruptors, exploring new concepts, and designing pilot projects",
     "Optimizing existing operational processes, eliminating inefficiencies, and auditing quality",
     "detail_vs_big_picture", -1.0, 1.0, "The Innovator", "The Analyst"),

    # 91-100
    (91, "work_style", "When writing reports or presentations, my priority is:",
     "Ensuring the message is crystal clear, empathetic, and easily digestable by non-experts",
     "Ensuring the data tables, appendix citations, and analytical models are thoroughly exhaustive",
     "detail_vs_big_picture", -1.0, 1.0, "The Collaborator", "The Analyst"),
    (92, "teamwork", "When presenting project status updates to executive leadership:",
     "I highlight how the project advances our overarching 3-year strategic growth objectives",
     "I highlight how the initiative has empowered cross-functional collaboration and customer trust",
     "tech_vs_comm", -1.0, 1.0, "The Strategist", "The Collaborator"),
    (93, "personality", "When a strategic initiative I spent weeks developing is shelved due to budget cuts:",
     "I look forward with curiosity to what new creative opportunities the freed-up resources create",
     "I document the strategic insights and business cases so the assets can be leveraged in the future",
     "structured_vs_flexible", 1.0, -1.0, "The Innovator", "The Strategist"),
    (94, "problem_solving", "When investigating an operational discrepancy that appears randomly:",
     "I formulate regression models and examine longitudinal data until the mathematical root cause appears",
     "I research novel monitoring tools and AI analytics to predict when the anomaly is likely to recur",
     "detail_vs_big_picture", 1.0, -1.0, "The Analyst", "The Innovator"),
    (95, "motivation", "Which career trajectory appeals to you more?",
     "Chief Strategy Officer: architecting corporate roadmaps, enterprise expansion, and market positioning",
     "Chief People / Operations Officer: optimizing team performance, cultural cohesion, and mentorship",
     "tech_vs_comm", -1.0, 1.0, "The Strategist", "The Collaborator"),
    (96, "work_style", "Regarding project governance and management:",
     "I favor lightweight, rapid-iteration cycles that empower quick pivots based on daily feedback",
     "I favor formal stage-gate reviews with documented risk assessments and formal stakeholder sign-offs",
     "structured_vs_flexible", 1.0, -1.0, "The Executor", "The Strategist"),
    (97, "teamwork", "If a newly hired team member is struggling to understand our department's workflows:",
     "I personally take time to walk them through the processes, offer encouragement, and check in often",
     "I direct them to our training materials and challenge them to identify areas where our workflows can be modernized",
     "solo_vs_team", 1.0, -1.0, "The Collaborator", "The Innovator"),
    (98, "personality", "When market dynamics force our organization to pivot direction abruptly:",
     "I embrace the operational pivot smoothly and immediately focus on executing the new priorities",
     "I analyze how the pivot alters our long-term competitive moat and recalibrate our strategic roadmap",
     "structured_vs_flexible", 1.0, -1.0, "The Executor", "The Strategist"),
    (99, "problem_solving", "When choosing between two approaches to solve a customer challenge:",
     "I select the strategic, comprehensive solution that builds lasting organizational capability",
     "I select the pragmatic, fast-acting solution that delivers immediate customer relief today",
     "detail_vs_big_picture", -1.0, 1.0, "The Strategist", "The Executor"),
    (100, "motivation", "At the end of an annual review cycle, what brings you the greatest satisfaction?",
     "Having exceeded every quantitative execution quota and delivered on all operational promises",
     "Having pioneered a transformative initiative that established a new competitive edge for the company",
     "quality_vs_speed", -1.0, 1.0, "The Executor", "The Innovator")
]

for item in fc_items:
    q = {
        "id": item[0],
        "section": 2,
        "type": "forced_choice",
        "category": item[1],
        "text": item[2],
        "option_a": item[3],
        "option_b": item[4],
        "dimension": item[5],
        "dim_val_a": item[6],
        "dim_val_b": item[7],
        "persona_a": item[8],
        "persona_b": item[9]
    }
    questions.append(q)

print(f"Total GP after FC: {len(questions)}")

# ==============================================================================
# SECTION 3: SITUATIONAL JUDGEMENT (30 Questions: 101-130)
# 6 questions each for Strategist, Analyst, Collaborator, Executor, Innovator
# ==============================================================================
sjt_items = [
    # 101 (Analyst)
    (101, "problem_solving",
     "Scenario: A critical monthly financial report submitted to executive leadership shows a 15% revenue discrepancy compared to sales forecasts. The executive meeting is scheduled in two hours.",
     "What is your immediate and best course of action?",
     [
         "Cross-reference transactional ledger data with billing exports to identify whether the variance is driven by delayed invoicing, data ingestion errors, or actual revenue contraction, then prepare an objective variance briefing.",
         "Quickly adjust the numbers manually in the spreadsheet to align closer to expectations and avoid alarming the leadership team.",
         "Cancel the executive meeting unilaterally without explaining the mathematical discrepancies to your manager.",
         "Assume the sales forecasting team made a mistake and send an email accusing them of flawed modeling."
     ],
     0, [1.0, 0.1, 0.2, 0.0], "The Analyst"),

    # 102 (Strategist)
    (102, "work_style",
     "Scenario: Two weeks before the launch of a major corporate initiative, a key departmental dependency informs you that their deliverable will be delayed by three weeks due to resource constraints.",
     "How do you handle this strategic roadblock?",
     [
         "Assess the critical path: collaborate with stakeholders to isolate whether an MVP launch can proceed without the delayed dependency, re-sequence workflow milestones, and transparently present the updated roadmap and risk mitigation to leadership.",
         "Pressure the delayed department to work mandatory overtime weekends without evaluating if the quality can be maintained.",
         "Conceal the delay from executive sponsors, hoping that the other department will somehow catch up before anyone notices.",
         "Publicly complain about the dependency team's lack of competence during the weekly cross-departmental sync."
     ],
     0, [1.0, 0.2, 0.1, 0.0], "The Strategist"),

    # 103 (Collaborator)
    (103, "teamwork",
     "Scenario: Two key team members on your project are in an escalating disagreement over how to organize client onboarding, resulting in missed handoffs and tense meetings.",
     "What is your most constructive intervention?",
     [
         "Facilitate a structured, private mediation session where both colleagues can articulate their perspectives without interruption, map out shared operational objectives, and co-design a unified workflow protocol.",
         "Take the side of the more senior colleague to force a rapid resolution and suppress further debate.",
         "Ignore the tension and assume that adults in a workplace will eventually resolve interpersonal conflict on their own.",
         "Report both colleagues to Human Resources immediately without speaking with either of them first."
     ],
     0, [1.0, 0.2, 0.1, 0.0], "The Collaborator"),

    # 104 (Analyst)
    (104, "problem_solving",
     "Scenario: Customer satisfaction scores have dropped by 18% over the past quarter, but customer support reports indicate that ticket resolution times have actually improved.",
     "How do you diagnose the true underlying driver of this customer dissatisfaction?",
     [
         "Conduct a thorough data audit: analyze customer feedback sentiment, repeat ticket rates, first-contact resolution metrics, and customer churn data across tiers to discover what problems remain unresolved despite faster response times.",
         "Dismiss the satisfaction scores as statistical noise since support ticket response times are looking good.",
         "Send a mass email blast to all customers offering a generic 5% discount without understanding why they are unhappy.",
         "Blame the customer support agents and recommend replacing the customer service software platform immediately."
     ],
     0, [1.0, 0.1, 0.2, 0.0], "The Analyst"),

    # 105 (Strategist)
    (105, "teamwork",
     "Scenario: Your department head proposes implementing a costly enterprise software system that duplicates capabilities already provided by an existing tool your squad uses daily.",
     "How do you address this organizational inefficiency?",
     [
         "Prepare an objective cost-benefit analysis comparing licensing fees, feature overlap, user adoption friction, and integration overhead, and request a brief meeting to review the operational tradeoffs with the department head.",
         "Stay silent in planning sessions but complain bitterly to teammates in private chat channels.",
         "Blindly comply with the directive, knowing it will waste corporate budget and degrade squad efficiency.",
         "Publicly challenge and embarrass the department head in front of company leadership during an all-hands meeting."
     ],
     0, [1.0, 0.1, 0.2, 0.0], "The Strategist"),

    # 106 (Analyst)
    (106, "work_style",
     "Scenario: You discover an error in a quarterly financial projection that has already been approved and distributed to divisional leadership. The variance does not alter the bottom line substantially, but reflects an analytical flaw.",
     "What is the ethical and professional response?",
     [
         "Notify your manager immediately with a clear explanation of the mathematical oversight, provide an amended version of the document, and outline a checklist improvement to prevent similar oversights.",
         "Ignore the error because the financial bottom line is not substantially altered and nobody else noticed.",
         "Quietly replace the file on the shared drive without notifying anyone and hope nobody compares versions.",
         "Blame the junior analyst who prepared the initial data inputs if someone eventually catches the mistake."
     ],
     0, [1.0, 0.2, 0.1, 0.0], "The Analyst"),

    # 107 (Strategist)
    (107, "problem_solving",
     "Scenario: Your company is expanding into a new regional market. Your team must design the market entry operations within a tight 3-month window.",
     "How should the project roadmap be organized?",
     [
         "Establish a structured phased strategy: conduct regulatory compliance and customer research first, define clear stage-gate criteria for operational pilots, secure partner alliances, and establish quantitative KPIs for full-scale launch.",
         "Launch marketing campaigns immediately across all channels before establishing customer service or supply chain foundations.",
         "Wait until competitors enter the market first and copy their exact operations after 12 months.",
         "Assemble a 200-page operational manual without launching any market testing until the third year."
     ],
     0, [1.0, 0.2, 0.1, 0.0], "The Strategist"),

    # 108 (Collaborator)
    (108, "teamwork",
     "Scenario: A project manager assigns an urgent deadline to your team that requires significant overtime. A teammate confided in you that they are experiencing personal burnout and cannot work extra hours.",
     "How do you handle this team dynamic?",
     [
         "Support the colleague with empathy: collaborate with the project manager to rebalance task allocations across the squad, identify non-essential tasks to defer, and protect the teammate's well-being without compromising core deliverables.",
         "Tell the teammate that everyone is stressed and that they must endure the overtime like everyone else.",
         "Gossip about the colleague's personal situation to other teammates so they understand why workloads are uneven.",
         "Refuse to work on the project yourself in protest and walk out of the planning meeting."
     ],
     0, [1.0, 0.1, 0.0, 0.0], "The Collaborator"),

    # 109 (Innovator)
    (109, "personality",
     "Scenario: A creative marketing campaign you championed and spent six weeks building fails to achieve its projected engagement targets by a wide margin.",
     "How do you respond to this professional setback?",
     [
         "Lead an objective, blameless post-campaign debrief: analyze channel conversion data, pinpoint where audience interest dropped off, document the strategic insights, and apply the learnings to the next iteration.",
         "Blame the creative agency or the social media algorithms for sabotaging your campaign.",
         "Deny that the campaign failed and selectively cherry-pick vanity metrics to make the results appear successful.",
         "Become discouraged, vow never to propose creative ideas again, and retreat into routine administrative tasks."
     ],
     0, [1.0, 0.1, 0.2, 0.0], "The Innovator"),

    # 110 (Strategist)
    (110, "problem_solving",
     "Scenario: Your company is experiencing rapid growth, but internal communication between marketing, sales, and product delivery has become chaotic and siloed.",
     "What systemic solution do you propose?",
     [
         "Establish regular cross-functional sync cadences, define clear RACI matrices (Responsible, Accountable, Consulted, Informed) for shared milestones, and implement a centralized single source of truth for project updates.",
         "Send daily company-wide emails demanding that everyone communicate more effectively without providing a structured system.",
         "Isolate your own department and refuse to collaborate with other teams until they fix their own internal problems.",
         "Hire an external agency to handle all communication between internal employees."
     ],
     0, [1.0, 0.1, 0.1, 0.0], "The Strategist"),

    # 111 (Analyst)
    (111, "work_style",
     "Scenario: You inherit a massive, messy operational spreadsheet used for enterprise client billing that has broken formulas, hidden rows, and no audit trail. You must add billing for a new complex contract tier.",
     "What is the most sound operational approach?",
     [
         "Audit and map the existing workbook logic, build an isolated staging copy to test the new tier calculations, verify historical accuracy against past invoices, and document formula rules for future team maintainers.",
         "Directly patch a nested IF formula into a live cell in the production spreadsheet and hope nothing breaks.",
         "Refuse to touch the spreadsheet and demand that management purchase an enterprise billing ERP system before doing any work.",
         "Manually calculate the client's invoice on a handheld calculator each month and overwrite numbers in the spreadsheet."
     ],
     0, [1.0, 0.2, 0.1, 0.0], "The Analyst"),

    # 112 (Collaborator)
    (112, "teamwork",
     "Scenario: During a high-stakes presentation to executive leadership, your department head mistakenly takes full credit for a strategic initiative that you and your teammates spent months researching and designing.",
     "How do you address this situation professionally?",
     [
         "Speak with the department head in private after the meeting, politely express appreciation for executive buy-in, and ask how the team's contributions can be formally recognized in subsequent follow-up communications and organizational reports.",
         "Interrupt the department head loudly during the executive meeting to claim personal credit in front of everyone.",
         "Become passive-aggressive, reduce your work output, and complain about your manager to other department heads.",
         "Send a company-wide email exposing your manager's behavior and demanding an apology."
     ],
     0, [1.0, 0.0, 0.1, 0.0], "The Collaborator"),

    # 113 (Analyst)
    (113, "problem_solving",
     "Scenario: A critical vendor proposes a 30% price increase upon contract renewal, claiming that inflation and supply chain overheads justify the surge.",
     "How do you prepare for the negotiation?",
     [
         "Analyze historical contract pricing, benchmark competing market vendors, quantify your company's transaction volume growth, and present data-backed counter-proposals (e.g. multi-year commitments or tiered discounts) to mitigate the cost hike.",
         "Accept the 30% increase immediately without question because negotiating takes too much time.",
         "Threaten to cancel the contract immediately on the spot without checking whether an alternative vendor is ready to onboard.",
         "Ignore the renewal notice and let the contract lapse into legal default."
     ],
     0, [1.0, 0.2, 0.1, 0.0], "The Analyst"),

    # 114 (Executor)
    (114, "work_style",
     "Scenario: It is Friday afternoon at 4:00 PM. A critical prospective client requests an urgent proposal adjustment to include custom SLA terms before their Monday morning board review.",
     "How do you respond?",
     [
         "Quickly evaluate the requested terms against company risk guidelines, coordinate brief approval with legal/operations, deliver the updated proposal with a polite professional note, and schedule a Monday follow-up.",
         "Ignore the client's email until Monday afternoon, assuming they should not expect replies over the weekend.",
         "Promise the client impossible contract terms without checking company guidelines just to make them happy before closing your laptop.",
         "Reply rudely that business proposals are never sent outside of standard business hours."
     ],
     0, [1.0, 0.2, 0.0, 0.0], "The Executor"),

    # 115 (Strategist)
    (115, "personality",
     "Scenario: You spent three weeks preparing a detailed organizational roadmap for a proposed corporate initiative. During review, executive leadership decides to adopt an alternative strategic direction that renders your roadmap obsolete.",
     "What is your attitude and response?",
     [
         "Accept the executive decision professionally, extract reusable insights and business cases from your work for future initiatives, and align your energy behind supporting the new strategic direction.",
         "Argue heatedly with executive leaders and insist that your initiative must proceed anyway.",
         "Complain constantly to peers in the office about executive leadership having no vision.",
         "Refuse to work on the new strategic initiative and disengage from team meetings."
     ],
     0, [1.0, 0.1, 0.1, 0.0], "The Strategist"),

    # 116 (Collaborator)
    (116, "teamwork",
     "Scenario: An external partner team frequently delivers incomplete data handoffs, forcing your team to do extra cleaning work and delaying internal deadlines.",
     "How do you resolve this operational friction?",
     [
         "Schedule a collaborative working session with the partner team lead to establish mutually agreed data handoff standards, create an input validation template, and streamline the workflow for both squads.",
         "Retaliate by intentionally withholding your department's deliverables to the partner team.",
         "Complain to the executive committee about the partner team's incompetence without trying to speak with them first.",
         "Silently absorb the extra work indefinitely and let your team burn out."
     ],
     0, [1.0, 0.0, 0.1, 0.1], "The Collaborator"),

    # 117 (Analyst)
    (117, "problem_solving",
     "Scenario: A major enterprise client threatens to terminate their contract, claiming that your company's service quality has degraded over the past six months.",
     "What is your diagnostic and resolution approach?",
     [
         "Conduct a thorough service audit: review all client tickets, service uptime, deliverables history, and account communications, arrange a structured review meeting to address root causes transparently, and establish a tangible remediation plan.",
         "Offer the client a massive discount immediately without finding out what went wrong with the service.",
         "Deny that service quality dropped and blame the client's internal team for misusing the service.",
         "Avoid contacting the client in hopes that they will forget their complaint."
     ],
     0, [1.0, 0.3, 0.0, 0.0], "The Analyst"),

    # 118 (Executor)
    (118, "work_style",
     "Scenario: You are tasked with launching a new client campaign. Your direct manager is traveling internationally for three days and cannot be reached for routine approvals.",
     "How do you maintain project momentum?",
     [
         "Advance the operational foundation: draft materials, prepare vendor agreements, document open decision points clearly, and align key stakeholders so everything is ready for rapid sign-off upon your manager's return.",
         "Stop all work and take an informal three-day break until your manager returns.",
         "Make high-risk financial and legal commitments unilaterally without authority, hoping your manager approves later.",
         "Complain publicly that management is disorganized and that you cannot do your job."
     ],
     0, [1.0, 0.1, 0.2, 0.0], "The Executor"),

    # 119 (Collaborator)
    (119, "teamwork",
     "Scenario: During a departmental Q&A presentation, a junior colleague asks an intricate operational question that you do not know the answer to.",
     "How do you respond?",
     [
         "Acknowledge transparently that you do not have that specific data point on hand, thank them for raising a valuable insight, and promise to research the answer and share it with the team by the following morning.",
         "Concoct an evasive, plausible-sounding answer on the spot to protect your image as an expert.",
         "Dismiss the question as irrelevant and suggest that the colleague should not ask detailed questions in public.",
         "Change the subject abruptly and end the presentation early."
     ],
     0, [1.0, 0.1, 0.0, 0.0], "The Collaborator"),

    # 120 (Innovator)
    (120, "problem_solving",
     "Scenario: An established competitor launches a disruptive new AI-driven service feature that threatens to capture a substantial share of your company's core market.",
     "What is your strategic recommendation?",
     [
         "Organize a rapid market intelligence spike: evaluate the competitor's actual capabilities and limitations, identify unique value propositions your company can leverage, and test rapid pilot innovations to differentiate your offering.",
         "Panic and demand that your company copy the competitor's feature overnight without understanding customer needs.",
         "Dismiss the competitor's technology as a passing fad that will fade away on its own.",
         "Recommend cutting your company's pricing by 50% to retain customers through price wars."
     ],
     0, [1.0, 0.2, 0.1, 0.1], "The Innovator"),

    # 121 (Executor)
    (121, "work_style",
     "Scenario: Your team has been debating two different operational approaches for three consecutive weeks in meetings without reaching a consensus, stalling execution.",
     "How do you break the analysis paralysis?",
     [
         "Propose a time-boxed, low-risk pilot comparison: define clear 14-day success criteria for both approaches, test them with a small control group, and let empirical performance data determine the final path forward.",
         "Force a vote immediately regardless of whether key technical questions have been evaluated.",
         "Let the debate continue indefinitely until everyone agrees 100% on every minor detail.",
         "Abandon the project completely because the team cannot reach consensus."
     ],
     0, [1.0, 0.3, 0.1, 0.0], "The Executor"),

    # 122 (Collaborator)
    (122, "personality",
     "Scenario: You realize that an error in your calculation caused your team to overspend its monthly budget by 10%.",
     "How do you handle this mistake?",
     [
         "Notify your manager immediately, take full accountability, explain the root cause of the miscalculation, and propose a budget reallocation plan to balance out expenditures over the next quarter.",
         "Attempt to adjust other spreadsheet categories secretly to conceal the budget deficit.",
         "Blame external vendors for increasing prices without prior notification.",
         "Wait until the finance department discovers the discrepancy during quarterly audits and act surprised."
     ],
     0, [1.0, 0.1, 0.0, 0.0], "The Collaborator"),

    # 123 (Collaborator)
    (123, "teamwork",
     "Scenario: A team member frequently interrupts others during meetings, dominating discussions and silencing quieter colleagues.",
     "What is the best approach to balance meeting dynamics?",
     [
         "Institute structured meeting hygiene: introduce agenda rounds, actively invite input from quieter colleagues, and speak privately with the dominant colleague to share constructive feedback on facilitating collaborative team dialogue.",
         "Shout over the interrupting colleague during meetings to put them in their place.",
         "Exclude the colleague from future team meetings without explaining why.",
         "Say nothing and let the colleague continue dominating every conversation."
     ],
     0, [1.0, 0.1, 0.1, 0.0], "The Collaborator"),

    # 124 (Innovator)
    (124, "problem_solving",
     "Scenario: Your company's employee onboarding program has remained unchanged for 7 years and receives low satisfaction ratings from new hires.",
     "How do you approach modernizing it?",
     [
         "Gather feedback from recent new hires, benchmark modern interactive onboarding methodologies (peer cohorts, digital learning paths, culture buddies), and launch an updated pilot onboarding journey for the next cohort.",
         "Order new company swag and branded mugs, assuming merchandise will solve the dissatisfaction.",
         "Make the onboarding manual twice as long and mandate an exam at the end of the first week.",
         "Abolish onboarding entirely and let new hires figure out company systems on their own."
     ],
     0, [1.0, 0.2, 0.1, 0.0], "The Innovator"),

    # 125 (Executor)
    (125, "work_style",
     "Scenario: You are assigned a complex workflow that could either be designed as a simple checklist or built into a sophisticated multi-stage automated workflow software.",
     "How do you decide?",
     [
         "Evaluate expected transaction volume and complexity: start with a clear, lightweight process that can be deployed today; if operational scale and error rates justify it, invest in full software automation.",
         "Immediately invest months building the most complex software system possible before testing the underlying workflow.",
         "Never adopt software tools under any circumstances, even when volume reaches thousands of transactions a day.",
         "Delegate the decision to an intern without providing business criteria."
     ],
     0, [1.0, 0.2, 0.1, 0.0], "The Executor"),

    # 126 (Collaborator)
    (126, "teamwork",
     "Scenario: During a peer review of your strategic brief, a colleague leaves 20 detailed stylistic nitpicks on phrasing and punctuation, but ignores the core commercial proposals.",
     "How do you respond constructively?",
     [
         "Thank them for catching grammatical polish, incorporate the helpful wording edits, and politely ask for their perspective on the substantive commercial proposals and strategic assumptions.",
         "Send an angry message telling them that they missed the whole point of the document.",
         "Delete their comments and submit the document without addressing any feedback.",
         "Open their latest report and leave 40 petty spelling criticisms to get even."
     ],
     0, [1.0, 0.0, 0.1, 0.0], "The Collaborator"),

    # 127 (Innovator)
    (127, "personality",
     "Scenario: Your company is introducing a new enterprise CRM tool that will fundamentally alter how your team logs client interactions. Many colleagues are resisting the change.",
     "What attitude and role do you adopt?",
     [
         "Adopt a growth mindset: master the new tool early, discover time-saving tips, and help colleagues navigate the transition by hosting informal peer coaching sessions.",
         "Join in the complaints and refuse to use the new system until management threatens disciplinary action.",
         "Pretend to use the system while maintaining old habits secretly on personal sticky notes.",
         "Transfer to another department solely to avoid learning the new software."
     ],
     0, [1.0, 0.1, 0.1, 0.0], "The Innovator"),

    # 128 (Executor)
    (128, "problem_solving",
     "Scenario: A key client requires a custom data report within 48 hours, but your department's standard reporting queue has a 10-day backlog.",
     "How do you balance responsiveness with team standards?",
     [
         "Evaluate the priority and business value with your manager, identify if a standardized template can satisfy the client's immediate needs in 48 hours, and schedule the fully automated report for standard queue delivery.",
         "Jump the entire queue unilaterally without consulting anyone, pushing back everyone else's commitments.",
         "Flatly refuse the client's request without offering any interim summary data or alternative solutions.",
         "Work through the night secretly without logging hours or letting your team know you bypassed the queue."
     ],
     0, [1.0, 0.2, 0.1, 0.1], "The Executor"),

    # 129 (Executor)
    (129, "work_style",
     "Scenario: Your department is rolling out an updated client pricing model that will take effect next month. You need to ensure sales operations transition smoothly.",
     "How do you manage this operational transition?",
     [
         "Establish a phased transition plan: provide clear pricing calculators, run brief training sessions for account managers, prepare client FAQ sheets, and maintain a rapid-response channel during the first two weeks of rollout.",
         "Send a one-line email with the new price sheet at 5 PM on the day before it takes effect.",
         "Delay the pricing update for six months because training staff takes too much effort.",
         "Let salespeople quote whatever prices they want with zero consistency."
     ],
     0, [1.0, 0.1, 0.1, 0.0], "The Executor"),

    # 130 (Innovator)
    (130, "motivation",
     "Scenario: You are offered two project assignments: Option 1 is managing a routine monthly operational checklist that is predictable and safe; Option 2 is leading a novel market pilot testing an unproven service offering with high visibility and creative autonomy.",
     "Which assignment motivates you more and why?",
     [
         "Option 2, because the opportunity to explore uncharted territory, solve novel challenges, and build an innovative offering accelerates my professional growth.",
         "Option 1, because routine tasks require minimal thinking and zero risk of making mistakes.",
         "Neither, because both options require accountability and attending status meetings.",
         "Whichever option allows me to leave the office earliest every day."
     ],
     0, [1.0, 0.3, 0.0, 0.0], "The Innovator")
]

for item in sjt_items:
    q = {
        "id": item[0],
        "section": 3,
        "type": "sjt",
        "category": item[1],
        "scenario": item[2],
        "question": item[3],
        "options": item[4],
        "best_option": item[5],
        "scores": item[6],
        "persona_tag": item[7]
    }
    questions.append(q)

print(f"Total GP after SJT: {len(questions)}")

# ==============================================================================
# SECTION 4: MOTIVATION (20 Questions: 131-150)
# 4 options per question, balanced across 5 Personas:
# The Strategist, The Analyst, The Collaborator, The Executor, The Innovator
# ==============================================================================
mot_items = [
    # 131
    (131, "motivation", "What type of workplace accomplishment gives you the deepest sense of fulfillment?",
     [
         "Designing a long-term strategic plan that guides organizational growth over several years",
         "Uncovering an intricate data pattern or financial insight that prevents a costly business mistake",
         "Mentoring teammates and fostering an inclusive, high-trust team culture where people thrive",
         "Pioneering an innovative business model or testing a creative new service concept"
     ],
     ["The Strategist", "The Analyst", "The Collaborator", "The Innovator"]),

    # 132
    (132, "motivation", "When evaluating a new job opportunity, what factor is most critical to your workplace satisfaction?",
     [
         "Clear corporate vision, strategic organizational alignment, and thoughtful leadership",
         "High autonomy to investigate complex operational data and ensure high rigor",
         "A collaborative, supportive team culture with psychological safety and transparent feedback",
         "A fast-paced delivery environment where ideas turn into rapid commercial execution"
     ],
     ["The Strategist", "The Analyst", "The Collaborator", "The Executor"]),

    # 133
    (133, "motivation", "Which aspect of professional excellence excites you the most?",
     [
         "Strategic systems thinking: organizing complex operations into coherent, scalable frameworks",
         "Analytical depth: leveraging empirical data, metrics, and quantitative modeling for sound decisions",
         "Action velocity: cutting through bureaucracy to deliver rapid, tangible business outcomes",
         "Continuous innovation: experimenting with cutting-edge tools, paradigms, and market disruptors"
     ],
     ["The Strategist", "The Analyst", "The Executor", "The Innovator"]),

    # 134
    (134, "motivation", "What represents the pinnacle of professional recognition for your work?",
     [
         "Having your strategic roadmap adopted as the corporate standard across multiple business divisions",
         "Being sought after as the ultimate analytical troubleshooter who can dissect any complex problem",
         "Being recognized by colleagues as an inspiring mentor and an exceptional team builder",
         "Being celebrated as a visionary innovator who pioneered transformative ideas that elevated the company"
     ],
     ["The Strategist", "The Analyst", "The Collaborator", "The Innovator"]),

    # 135
    (135, "motivation", "How do you prefer to keep your professional skills sharp and competitive?",
     [
         "Reading executive strategy books, industry whitepapers, and corporate case studies",
         "Mastering advanced analytical tools, statistical methods, and quantitative modeling platforms",
         "Attending innovation conferences, design-thinking workshops, and exploring emerging trends",
         "Executing real-world projects rapidly and learning through live operational feedback"
     ],
     ["The Strategist", "The Analyst", "The Innovator", "The Executor"]),

    # 136
    (136, "motivation", "What is your primary focus when reviewing proposals or deliverables from colleagues?",
     [
         "Ensuring long-term strategic alignment with corporate objectives and organizational sustainability",
         "Checking data accuracy, financial projections, operational feasibility, and risk exposure",
         "Providing empowering, constructive encouragement that boosts the author's confidence and skills",
         "Ensuring the plan is streamlined, practical, and ready for rapid implementation without delay"
     ],
     ["The Strategist", "The Analyst", "The Collaborator", "The Executor"]),

    # 137
    (137, "motivation", "Which work environment empowers your greatest productivity?",
     [
         "An organization with well-defined strategic roadmaps, clear accountability, and structured governance",
         "Quiet, distraction-free focus blocks where I can dive deeply into analytical research and data models",
         "An energetic, collaborative workplace with frequent brainstorming and open cross-functional dialogue",
         "A learning-oriented environment that encourages creative risk-taking, experimentation, and hackathons"
     ],
     ["The Strategist", "The Analyst", "The Collaborator", "The Innovator"]),

    # 138
    (138, "motivation", "What drives you most to implement standardized operational processes?",
     [
         "Creating a resilient framework that allows the organization to scale smoothly without chaos",
         "Minimizing errors, discrepancies, and operational compliance risks through systematic checkpoints",
         "Providing clarity and psychological safety so team members can work without stress or ambiguity",
         "Automating administrative friction so the squad can move faster and ship outcomes with velocity"
     ],
     ["The Strategist", "The Analyst", "The Collaborator", "The Executor"]),

    # 139
    (139, "motivation", "When evaluating a company's workplace culture, what is your biggest red flag?",
     [
         "Lack of long-term vision, knee-jerk strategic pivots, and chaotic organizational leadership",
         "Ignoring objective data, tolerating sloppy reporting, and making decisions based on office politics",
         "Toxic interpersonal competition, blame-oriented meetings, and lack of psychological safety",
         "Resistance to change, where leadership clings stubbornly to outdated practices and fears innovation"
     ],
     ["The Strategist", "The Analyst", "The Collaborator", "The Innovator"]),

    # 140
    (140, "motivation", "How do you view operational debt and legacy procedures?",
     [
         "A strategic priority that must be systematically phased out through planned transformation roadmaps",
         "An analytical risk that must be methodically audited, quantified, and resolved with data",
         "A collective team challenge best addressed through collaborative improvement workshops",
         "A pragmatic reality that should be bypassed whenever it threatens urgent commercial execution"
     ],
     ["The Strategist", "The Analyst", "The Collaborator", "The Executor"]),

    # 141
    (141, "motivation", "What role do you naturally gravitate toward in a collaborative project?",
     [
         "The Strategic Planner: establishing the roadmap, aligning stakeholders, and setting milestones",
         "The Analytical Anchor: validating assumptions, modeling scenarios, and ensuring accuracy",
         "The Creative Spark: challenging assumptions, suggesting fresh angles, and prototyping new ideas",
         "The Execution Driver: keeping momentum high, eliminating roadblocks, and driving milestones to completion"
     ],
     ["The Strategist", "The Analyst", "The Innovator", "The Executor"]),

    # 142
    (142, "motivation", "What gives you the highest confidence before launching a major commercial initiative?",
     [
         "Comprehensive risk assessments, stakeholder sign-offs, and clear contingency plans",
         "Rigorous market validation data, audited financial projections, and empirical pilot results",
         "Full cross-functional team consensus and strong psychological buy-in from all stakeholders",
         "An agile rollout strategy where early customer feedback can be acted upon in real time"
     ],
     ["The Strategist", "The Analyst", "The Collaborator", "The Executor"]),

    # 143
    (143, "motivation", "When tasked with revitalizing an underperforming operational department:",
     [
         "Redesigning the department's operating model and strategic positioning for long-term growth",
         "Auditing operational metrics and performance data to identify the exact root causes of friction",
         "Modernizing the department's culture and tools through innovative, creative working methods",
         "Implementing quick operational wins to immediately boost morale and commercial performance"
     ],
     ["The Strategist", "The Analyst", "The Innovator", "The Executor"]),

    # 144
    (144, "motivation", "Which professional milestone brings you the strongest sense of accomplishment?",
     [
         "Successfully executing a multi-department reorganization that increased company-wide efficiency",
         "Conducting a deep analytical audit that saved the company millions of dollars in operational waste",
         "Mentoring an associate colleague from onboarding into a confident, independent team leader",
         "Pioneering a creative new service line that became a major growth driver for the organization"
     ],
     ["The Strategist", "The Analyst", "The Collaborator", "The Innovator"]),

    # 145
    (145, "motivation", "What is your primary philosophy regarding professional simplicity?",
     [
         "Simplicity means clear organizational structures, clean governance, and unambiguous strategic vision",
         "Simplicity means clean data models, transparent reporting metrics, and zero confusing jargon",
         "Simplicity means workflows that any team member can easily understand and execute without stress",
         "Simplicity means doing whatever delivers the required business outcome with the least administrative delay"
     ],
     ["The Strategist", "The Analyst", "The Collaborator", "The Executor"]),

    # 146
    (146, "motivation", "What is your perspective on adopting innovative tools and methodologies?",
     [
         "Adopt judiciously: evaluate organizational readiness, training costs, and enterprise stability first",
         "Benchmark rigorously: quantify productivity gains and ROI metrics through comparative pilots",
         "Decide collaboratively: ensure team members are consulted and comfortable with the transition",
         "Experiment eagerly: try novel tools and techniques in small spikes to maintain a competitive advantage"
     ],
     ["The Strategist", "The Analyst", "The Collaborator", "The Innovator"]),

    # 147
    (147, "motivation", "What motivates you most to write comprehensive documentation and guidelines?",
     [
         "Preserving organizational knowledge and ensuring strategic continuity as the company grows",
         "Providing an unambiguous reference manual that minimizes operational discrepancies and errors",
         "Lowering the onboarding barrier so new team members feel welcomed, empowered, and supported",
         "Documenting best practices so future innovation can build upon strong foundations"
     ],
     ["The Strategist", "The Analyst", "The Collaborator", "The Innovator"]),

    # 148
    (148, "motivation", "How do you approach work-life sustainability and high performance?",
     [
         "By enforcing proactive planning and strategic prioritization that prevents last-minute panics",
         "By maintaining disciplined scheduling, deep focus routines, and minimizing unproductive meetings",
         "By building mutual team support where colleagues look out for one another's emotional well-being",
         "By working with high focus and velocity during work hours so deliverables are closed on time"
     ],
     ["The Strategist", "The Analyst", "The Collaborator", "The Executor"]),

    # 149
    (149, "motivation", "What is your favorite type of professional conversation with colleagues?",
     [
         "Debating multi-year business strategies, market shifts, and competitive corporate positioning",
         "Analyzing empirical market research, customer behavior metrics, and financial performance data",
         "Brainstorming creative, out-of-the-box business models and innovative growth experiments",
         "Planning actionable sprint execution steps for upcoming project deliverables"
     ],
     ["The Strategist", "The Analyst", "The Innovator", "The Executor"]),

    # 150
    (150, "motivation", "Ultimately, what defines an 'Exceptional Professional' in your eyes?",
     [
         "One who builds enduring, scalable systems and guides organizations with long-term strategic wisdom",
         "One who brings rigorous analytical integrity, empirical truth, and deep critical thinking to decisions",
         "One who elevates everyone around them, fosters high trust, and champions collaborative human dignity",
         "One who consistently converts ambitious vision into delivered reality that creates lasting value"
     ],
     ["The Strategist", "The Analyst", "The Collaborator", "The Executor"])
]

for item in mot_items:
    q = {
        "id": item[0],
        "section": 4,
        "type": "motivation",
        "category": item[1],
        "text": item[2],
        "options": item[3],
        "persona_map": item[4],
        "scores": [1.0, 1.0, 1.0, 1.0]
    }
    questions.append(q)

print(f"Total GP questions: {len(questions)}")

# Validation
ids = [q["id"] for q in questions]
assert len(ids) == 150
assert ids == list(range(1, 151))

with open("general_questions_data.json", "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2)

print("Saved general_questions_data.json successfully!")
