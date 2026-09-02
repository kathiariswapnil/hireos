/**
 * All site copy, as data. Adapted from deck/content.py so the site and the
 * investor deck make the same claims in the same words.
 *
 * `source` fields trace a claim back to the originating blueprint section.
 * Anything not in the source PDFs is marked as our own estimate.
 */

export const BRAND = {
  name: "HireOS",
  descriptor: "The Enterprise Agentic Hiring Operating System",
  tagline: "AI executes. Company policy governs. Humans decide.",
  metaDescription:
    "HireOS is the agentic orchestration and governance layer on top of your existing ATS and HRMS. AI executes the recruiting work. Your policy engine decides what is allowed. Humans keep every consequential decision.",
  /* TODO: replace before launch. Mirrors PLACEHOLDERS in deck/content.py. */
  entity: "[Entity name TBD]",
  email: "[email TBD]",
  phone: "[phone TBD]",
} as const;

export const NAV_LINKS = [
  { href: "/platform", label: "Platform" },
  { href: "/security", label: "Trust & security" },
  { href: "/investors", label: "Investors" },
] as const;

/* ------------------------------------------------------------------ *
 * Workflow state machine — Blueprint sec.4
 * Also drives the state-machine spine under the header.
 * ------------------------------------------------------------------ */

export type WorkflowState = {
  name: string;
  /** Amber states cannot advance without a recorded human decision. */
  gated: boolean;
};

export const WORKFLOW_STATES: WorkflowState[] = [
  { name: "REQUISITION_DRAFT", gated: false },
  { name: "JD_APPROVAL", gated: true },
  { name: "JOB_POSTING", gated: false },
  { name: "ACTIVE", gated: false },
  { name: "SCREENING", gated: false },
  { name: "SHORTLIST_REVIEW", gated: true },
  { name: "INTERVIEW_SCHEDULING", gated: false },
  { name: "INTERVIEW_SCHEDULED", gated: false },
  { name: "INTERVIEW_COMPLETED", gated: false },
  { name: "FEEDBACK_REVIEW", gated: true },
  { name: "NEXT_ROUND", gated: false },
  { name: "FINAL_REVIEW", gated: true },
  { name: "OFFER_APPROVAL", gated: true },
  { name: "OFFER_GENERATED", gated: false },
  { name: "OFFER_SENT", gated: false },
];

export const WORKFLOW_TERMINALS = ["HIRED", "REJECTED", "CLOSED"] as const;

export const STATE_MACHINE_NOTES = [
  {
    heading: "Durable",
    body: "Every requisition is a workflow instance with versioned state. It survives restarts, retries and failed model calls.",
  },
  {
    heading: "Evented",
    body: "Every transition emits an event, which gives you replay and a complete workflow history rather than a final status.",
  },
  {
    heading: "Gated",
    body: "Amber states cannot advance without a recorded human decision. Not a setting — a property of the state machine.",
  },
] as const;

/* ------------------------------------------------------------------ *
 * Hero — Blueprint sec.1
 * ------------------------------------------------------------------ */

export const HERO = {
  eyebrow: "Enterprise agentic hiring",
  titleLines: ["AI executes.", "Company policy governs.", "Humans decide."],
  lead: "HireOS turns a hiring request into one governed, auditable workflow across the systems you already run. The model drafts, screens and summarizes. A deterministic policy engine decides what is allowed. Your people keep every decision that matters.",
  primaryCta: { href: "/demo", label: "Request a demo" },
  secondaryCta: { href: "#console", label: "See one request become a workflow" },
  proof: [
    { value: "8", label: "MVP modules" },
    { value: "6", label: "Scoped agents" },
    { value: "0", label: "Systems replaced" },
  ],
} as const;

/* ------------------------------------------------------------------ *
 * Problem — Validation PDF sec.2
 * ------------------------------------------------------------------ */

export const PROBLEM = {
  eyebrow: "The problem",
  title: "Enterprise hiring is coordination work, not decision work",
  lead: "Recruiters and hiring managers spend their week moving information between systems that do not talk to each other. The judgment takes minutes. The logistics take weeks.",
  cards: [
    {
      heading: "Fragmented stack",
      body: "Hiring runs across ATS, HRMS, job portals, email, calendars, Slack or Teams, spreadsheets and finance approvals. No system owns the workflow end to end.",
    },
    {
      heading: "Repetitive coordination",
      body: "Drafting JDs, screening applicants, arranging interviews, chasing reminders, collecting feedback and preparing offers absorb the majority of recruiting hours.",
    },
    {
      heading: "Generic AI does not know your company",
      body: "Off-the-shelf AI has no view of your approval hierarchy, salary bands, role levels, interview standards or hiring history.",
    },
    {
      heading: "Black-box AI is unadoptable",
      body: "An AI that simply outputs hire or reject creates accountability and compliance risk no enterprise will absorb.",
    },
  ],
  source: "Validation PDF sec.2",
} as const;

/* ------------------------------------------------------------------ *
 * Why now — Blueprint sec.15
 * ------------------------------------------------------------------ */

export const WHY_NOW = {
  eyebrow: "Why now",
  title: "The capability arrived. The control layer did not.",
  lead: "Three things became true at once, and the gap between them is the opening.",
  cards: [
    {
      heading: "Models can finally do the work",
      body: "Language models now draft JDs, extract resume evidence and summarize interviews at a quality enterprises will actually put in front of a hiring manager.",
    },
    {
      heading: "Enterprises are funding agentic AI",
      body: "Budget moved from AI experiments to AI that executes real operational work. Procurement now asks about governance rather than novelty.",
    },
    {
      heading: "But AI recruiting is already table stakes",
      body: "ATS, talent-intelligence and AI-interview vendors all ship AI features. Demand is validated and differentiation on AI alone is gone. What is missing is policy-aware orchestration.",
    },
  ],
  kicker:
    "The market validates the demand. It does not yet serve the control problem.",
  source: "Blueprint sec.15",
} as const;

/* ------------------------------------------------------------------ *
 * Two-brain architecture — Blueprint sec.5
 * ------------------------------------------------------------------ */

export const THESIS = {
  eyebrow: "Our thesis",
  title: "Separate the model from the mandate",
  lead: "Every credible enterprise hiring agent needs two brains. Most products build only the first one.",
  aiLayer: {
    heading: "AI layer",
    subhead: "Language-heavy work",
    items: [
      "Understand the hiring request",
      "Generate and revise JDs",
      "Summarize resumes and interviews",
      "Extract competency evidence",
      "Generate interview questions",
      "Draft candidate communication",
    ],
  },
  policyLayer: {
    heading: "Deterministic layer",
    subhead: "Rules, states and authority",
    items: [
      "Salary bands and limits",
      "Approval hierarchy",
      "Permissions and RBAC",
      "Workflow state transitions",
      "Required interview rounds",
      "Audit logs and traceability",
    ],
  },
  gateLabel: "POLICY ENGINE",
  rule: "An LLM may recommend an action. The policy and workflow engine decides whether that action is allowed.",
  example:
    "A candidate expects INR 28 LPA against an approved L3 band of INR 18–25 LPA. The model does not get to call that acceptable. The policy engine flags the exception and routes it to the approver who owns it.",
  source: "Blueprint sec.5",
} as const;

/* ------------------------------------------------------------------ *
 * Orchestration layer — Blueprint sec.1
 * ------------------------------------------------------------------ */

export const ORCHESTRATION = {
  eyebrow: "The product",
  title: "An orchestration layer on top of the HR stack you already bought",
  lead: "We do not ask you to rip out Workday, SAP or Greenhouse. HireOS sits above your systems of record and does the human work around them.",
  hireosModules: [
    "Requisition",
    "Company Knowledge",
    "JD Agent",
    "Policy Engine",
    "Approval Center",
    "Job Distribution",
    "Candidate Intelligence",
    "Governance & Audit",
  ],
  systemsOfRecord: [
    "ATS",
    "HRMS",
    "Job boards",
    "Calendar",
    "Email / Teams / Slack",
    "Meetings",
    "Finance",
  ],
  why: [
    {
      heading: "Low adoption friction",
      body: "No migration, no rip-and-replace, no system-of-record risk.",
    },
    {
      heading: "Vendor neutral",
      body: "We integrate with whatever you run, which makes us additive rather than competitive.",
    },
    {
      heading: "Fast time to value",
      body: "Value shows up in the first workflow, not after a replatform.",
    },
  ],
  source: "Blueprint sec.1",
} as const;

/* ------------------------------------------------------------------ *
 * Agents — Blueprint sec.6
 * ------------------------------------------------------------------ */

export const AGENTS = {
  eyebrow: "Agent architecture",
  title: "Specialized agents with scoped tool permissions",
  lead: "No agent gets unrestricted authority. Each one receives only the tools its job requires — which is what turns a demo into something an enterprise security review will pass.",
  agents: [
    {
      name: "Requisition Agent",
      body: "Turns a natural-language request into structured requirements.",
      permission: "Reads role knowledge · writes draft requisition",
      phase: "MVP",
    },
    {
      name: "JD Agent",
      body: "Generates and revises JDs from approved knowledge and templates.",
      permission: "Writes JD draft · cannot publish",
      phase: "MVP",
    },
    {
      name: "Candidate Intelligence",
      body: "Extracts evidence and compares candidates to approved requirements.",
      permission: "Reads applications · writes evaluation",
      phase: "MVP",
    },
    {
      name: "Scheduling Agent",
      body: "Finds compatible slots, confirms and reschedules.",
      permission: "Calendar and comms · no hiring decisions",
      phase: "V2",
    },
    {
      name: "Interview Intelligence",
      body: "Transcribes, summarizes and maps evidence to competencies.",
      permission: "Transcript access · writes feedback draft",
      phase: "V3",
    },
    {
      name: "Offer Agent",
      body: "Prepares compensation and offer drafts within policy.",
      permission: "Writes draft · cannot send without approval",
      phase: "V3",
    },
  ],
  governance: {
    heading: "Governance Layer",
    body: "Enforces authorization, policy, auditability and human gates across every agent. No unrestricted model authority anywhere in the system.",
  },
  source: "Blueprint sec.6",
} as const;

/* ------------------------------------------------------------------ *
 * Company hiring memory — Blueprint sec.7
 * ------------------------------------------------------------------ */

export const MEMORY = {
  eyebrow: "Differentiator 01",
  title: "Company hiring memory",
  lead: "The differentiator is not that we can write a JD. It is that we can write the JD your company would have approved.",
  pipeline: [
    "Document",
    "Classify",
    "Extract",
    "Structure facts",
    "Chunk",
    "Embed",
    "Permission-aware retrieval",
    "Grounded generation",
  ],
  holds: [
    "Approved JDs and templates",
    "Salary bands and hiring policy",
    "Competency frameworks",
    "Interview structures per role and level",
    "Org roles, levels and approval hierarchy",
    "Relevant historical hiring context",
  ],
  discipline: {
    heading: "The discipline that matters",
    body: "Historical hiring decisions are not ground truth. History carries bias and inconsistency, so the product separates historical pattern from approved policy and treats the past as context, never as authority.",
  },
  source: "Blueprint sec.7",
} as const;

/* ------------------------------------------------------------------ *
 * Candidate intelligence — Blueprint sec.8
 * ------------------------------------------------------------------ */

export type Assessment = "Very strong" | "Strong" | "Gap to validate";

export const CANDIDATE_INTELLIGENCE = {
  eyebrow: "Differentiator 02",
  title: "Evidence, not a black-box score",
  lead: "A number a hiring manager cannot interrogate is a number they will not defend. So we never ship one.",
  candidateLabel: "Candidate evaluation · Data Scientist, L3",
  rows: [
    {
      competency: "Python",
      evidence: "Production development and shipped project evidence",
      assessment: "Strong" as Assessment,
    },
    {
      competency: "SQL",
      evidence: "Analytics and data-engineering work across two roles",
      assessment: "Strong" as Assessment,
    },
    {
      competency: "Machine Learning",
      evidence: "Production ML projects with measured outcomes",
      assessment: "Very strong" as Assessment,
    },
    {
      competency: "AWS",
      evidence: "Cloud deployment and infrastructure experience",
      assessment: "Strong" as Assessment,
    },
    {
      competency: "System Design",
      evidence: "No direct architecture evidence in the record",
      assessment: "Gap to validate" as Assessment,
    },
  ],
  recommendation: "Proceed to next round.",
  reason:
    "Strong evidence against four of five approved competencies. The System Design gap is flagged for interviewer validation rather than silently averaged into a score.",
  outputs: [
    {
      heading: "Matched requirements",
      body: "Which approved competencies are actually met",
    },
    {
      heading: "Supporting evidence",
      body: "The specific text the judgment came from",
    },
    { heading: "Gaps", body: "What is missing, stated plainly" },
    {
      heading: "Confidence",
      body: "How much the evidence supports the call",
    },
  ],
  source: "Blueprint sec.8",
} as const;

/* ------------------------------------------------------------------ *
 * Autonomy ladder — Blueprint sec.16
 * ------------------------------------------------------------------ */

export type AutonomyMode = "Copilot" | "Assisted" | "Autopilot";

export const AUTONOMY = {
  eyebrow: "Adoption model",
  title: "Earn autonomy one rung at a time",
  lead: "Enterprises do not buy autonomy on day one. They grant it after the system proves itself. That progression is our expansion motion, and the override data we collect is what makes the next rung defensible.",
  modes: [
    {
      name: "Copilot" as AutonomyMode,
      behavior: "AI recommends. Human executes.",
      example: "Candidate recommendation with evidence.",
      trust: "Land here",
    },
    {
      name: "Assisted" as AutonomyMode,
      behavior: "AI prepares the action. Human approves.",
      example: "JD, shortlist and offer drafts.",
      trust: "Core of the product",
    },
    {
      name: "Autopilot" as AutonomyMode,
      behavior: "AI executes low-risk actions within policy.",
      example: "Interview reminders, approved notifications.",
      trust: "Expand here",
    },
  ],
  kicker:
    "Moving a customer from Copilot to Assisted to Autopilot raises both the value we deliver and the price we can defend.",
  source: "Blueprint sec.16",
} as const;

/* ------------------------------------------------------------------ *
 * Trust — Blueprint sec.12 and sec.13
 * ------------------------------------------------------------------ */

export const TRUST = {
  eyebrow: "Enterprise readiness",
  title: "Built for the security review, not retrofitted for it",
  lead: "Enterprise HR data is among the most sensitive a company holds. The architecture assumes that from the first commit.",
  stack: [
    { layer: "Internet", note: "Untrusted" },
    { layer: "WAF / API Gateway", note: "Rate limits, request validation" },
    { layer: "Identity / SSO", note: "Enterprise SSO, MFA, SCIM" },
    { layer: "RBAC / ABAC", note: "Least privilege, tenant isolation" },
    {
      layer: "Application services",
      note: "Agents, policy engine, workflow",
    },
    {
      layer: "Postgres / Object store / Vector",
      note: "Encrypted at rest, per-tenant scoping",
    },
  ],
  injection: {
    heading: "Resumes are untrusted input",
    body: "A candidate can put instructions in a resume. Uploaded documents are never allowed to issue commands to an agent.",
    flow: [
      "Untrusted document",
      "Parser",
      "Content boundary",
      "LLM",
      "Output validator",
      "Policy engine",
      "Authorized action",
    ],
  },
  controls: [
    "Tenant isolation and least privilege",
    "Encryption in transit and at rest",
    "Configurable retention and deletion",
    "Model and prompt version traceability",
    "Full audit trail on every material action",
    "PII classification and controlled access",
    "Secrets and key management",
    "SOC 2 / ISO 27001 pathway as we mature",
  ],
  source: "Blueprint sec.12, sec.13",
} as const;

/* ------------------------------------------------------------------ *
 * Compliance — Blueprint sec.14
 * ------------------------------------------------------------------ */

export const COMPLIANCE = {
  eyebrow: "Regulatory posture",
  title: "Recruitment AI is a regulated use case. That is an advantage.",
  lead: "Hiring AI sits in high-risk categories in several jurisdictions. Competitors treat that as a headwind. For a governance-first product it is the reason to buy.",
  cards: [
    {
      heading: "Human oversight by design",
      body: "Consequential decisions — shortlist, feedback, final selection, compensation — are structurally gated on a recorded human decision. It is not a setting that can be switched off.",
    },
    {
      heading: "Explainability and traceability",
      body: "Every generated output carries its retrieved sources, model version and prompt version. Every action carries an actor and a timestamp.",
    },
    {
      heading: "Fairness testing from day one",
      body: "Bias and fairness monitoring on candidate evaluation workflows, with history treated as context rather than as approved policy.",
    },
    {
      heading: "Jurisdiction-aware",
      body: "Designed around India's digital personal-data framework, with jurisdiction-specific legal review before each international deployment.",
    },
  ],
  disclaimer:
    "Product and technical guidance, not legal advice. Enterprise deployments receive jurisdiction-specific legal and compliance review.",
  source: "Blueprint sec.14",
} as const;

/* ------------------------------------------------------------------ *
 * Modules — Blueprint sec.2
 * ------------------------------------------------------------------ */

export const MODULES = {
  eyebrow: "Product modules",
  title: "Eleven modules, shipped in a deliberate order",
  lead: "The MVP is the shortest path from a hiring request to a policy-aware, approved shortlist. Everything else waits its turn.",
  modules: [
    {
      name: "Hiring Requisition",
      purpose:
        "Capture role, level, location, experience, skills, salary and hiring process.",
      phase: "MVP",
    },
    {
      name: "Company Knowledge",
      purpose:
        "Policies, templates, approved JDs, role frameworks and historical context.",
      phase: "MVP",
    },
    {
      name: "JD Agent",
      purpose: "Generate and revise company-specific JDs.",
      phase: "MVP",
    },
    {
      name: "Policy Engine",
      purpose:
        "Deterministically validate salary, permissions, approvals and process rules.",
      phase: "MVP",
    },
    {
      name: "Approval Center",
      purpose: "Approve and comment workflows across enterprise channels.",
      phase: "MVP",
    },
    {
      name: "Job Distribution",
      purpose: "Publish through ATS, job-board and company connectors.",
      phase: "MVP",
    },
    {
      name: "Candidate Intelligence",
      purpose: "Evidence-based screening and shortlist recommendations.",
      phase: "MVP",
    },
    {
      name: "Governance & Audit",
      purpose:
        "Trace AI actions, human decisions, policies and workflow history.",
      phase: "MVP",
    },
    {
      name: "Scheduling Agent",
      purpose: "Coordinate candidate and interviewer calendars, and reschedule.",
      phase: "V2",
    },
    {
      name: "Interview Intelligence",
      purpose: "Transcription, evidence extraction and feedback drafts.",
      phase: "V3",
    },
    {
      name: "Offer Agent",
      purpose: "Compensation validation and offer generation.",
      phase: "V3",
    },
  ],
  source: "Blueprint sec.2",
} as const;

/* ------------------------------------------------------------------ *
 * Integrations — Blueprint sec.11
 * ------------------------------------------------------------------ */

export const INTEGRATIONS = {
  eyebrow: "Integration strategy",
  title: "Vendor neutral by design",
  lead: "One connector at a time, each one real engineering rather than a logo on a slide. We start where the customer already is.",
  connectors: [
    {
      name: "ATSConnector",
      detail:
        "One ATS first, then Workday, Greenhouse, Ashby and SAP where commercially appropriate.",
      phase: "MVP",
    },
    {
      name: "CalendarConnector",
      detail: "Google Calendar or Microsoft 365.",
      phase: "MVP",
    },
    {
      name: "CommunicationConnector",
      detail: "Email plus Teams or Slack first.",
      phase: "MVP",
    },
    {
      name: "JobBoardConnector",
      detail:
        "ATS or job-distribution partner, with direct job-board integrations where approved.",
      phase: "MVP",
    },
    {
      name: "MeetingConnector",
      detail: "Teams, Zoom or Google Meet depending on the customer.",
      phase: "V3",
    },
    { name: "HRMSConnector", detail: "Later phase.", phase: "V4" },
    { name: "FinanceConnector", detail: "Later phase.", phase: "V4" },
  ],
  note: "Direct LinkedIn API access is deliberately not a blocking MVP dependency. Job-posting access runs through approved partner arrangements.",
  source: "Blueprint sec.11",
} as const;

/* ------------------------------------------------------------------ *
 * API surface — Blueprint sec.10
 * ------------------------------------------------------------------ */

export const API_SURFACE = {
  eyebrow: "API surface",
  title: "Everything the workflow does is an endpoint",
  lead: "The product is an API with a UI on top, which is what makes it embeddable in a stack a customer already runs.",
  endpoints: [
    {
      method: "POST",
      path: "/v1/requisitions",
      purpose: "Create hiring request.",
    },
    {
      method: "POST",
      path: "/v1/requisitions/{id}/generate-jd",
      purpose: "Generate JD from company knowledge.",
    },
    { method: "POST", path: "/v1/jds/{id}/approve", purpose: "Approve JD." },
    {
      method: "POST",
      path: "/v1/jds/{id}/comment",
      purpose: "Send JD revision comments.",
    },
    {
      method: "POST",
      path: "/v1/jobs/{id}/publish",
      purpose: "Publish approved job through connector.",
    },
    {
      method: "GET",
      path: "/v1/jobs/{id}/candidates",
      purpose: "List applications and candidates.",
    },
    {
      method: "POST",
      path: "/v1/applications/{id}/evaluate",
      purpose: "Run candidate intelligence.",
    },
    {
      method: "POST",
      path: "/v1/applications/{id}/shortlist",
      purpose: "Record human shortlist decision.",
    },
    {
      method: "POST",
      path: "/v1/interviews/schedule",
      purpose: "Request scheduling.",
    },
    {
      method: "POST",
      path: "/v1/interviews/{id}/feedback",
      purpose: "Submit or approve feedback.",
    },
    {
      method: "POST",
      path: "/v1/offers/generate",
      purpose: "Generate offer draft.",
    },
    {
      method: "POST",
      path: "/v1/offers/{id}/approve",
      purpose: "Approve offer.",
    },
    {
      method: "GET",
      path: "/v1/audit/{entity}/{id}",
      purpose: "Retrieve audit history.",
    },
  ],
  source: "Blueprint sec.10",
} as const;

/* ------------------------------------------------------------------ *
 * North-star metrics — Blueprint sec.22
 * ------------------------------------------------------------------ */

export const METRICS = {
  eyebrow: "How we measure ourselves",
  title: "One number above all others",
  lead: "If we cannot move the north star, nothing else here matters. These are the metrics we commit to measuring in every pilot — not results we are claiming.",
  northStar: {
    label: "North star",
    metric: "Human hours saved per successful hire",
    why: "The cleanest measure of operational value — and the number a CFO can price.",
  },
  supporting: [
    {
      metric: "Time-to-hire",
      why: "The business outcome the buyer is judged on",
    },
    {
      metric: "JD turnaround time",
      why: "Proves the first workflow automation",
    },
    {
      metric: "Application to shortlist",
      why: "Proves candidate intelligence",
    },
    {
      metric: "Scheduling time saved",
      why: "Proves coordination automation",
    },
    {
      metric: "AI acceptance rate",
      why: "Proves the output is actually useful",
    },
    {
      metric: "Human override rate",
      why: "Proves trust and model quality",
    },
    {
      metric: "Policy exceptions prevented",
      why: "Proves the governance value",
    },
    {
      metric: "Actions completed automatically",
      why: "Proves the autonomy ladder is moving",
    },
  ],
  source: "Blueprint sec.22",
} as const;

/* ------------------------------------------------------------------ *
 * Design partner program — replaces invented customer proof
 * ------------------------------------------------------------------ */

export const DESIGN_PARTNERS = {
  eyebrow: "Design partner program",
  title: "Three pilot slots, and an honest deal",
  lead: "HireOS is pre-product and pre-revenue. We are not going to show you logos we have not earned. What we will do is build the first workflow with you, against your policies, and measure whether it actually saves you hours.",
  offers: [
    {
      heading: "What you get",
      items: [
        "The MVP wedge configured against your own policies and templates",
        "Direct access to the founding team, not a support queue",
        "Pilot pricing held for the first year if you continue",
        "A measured hours-saved-per-hire baseline you keep either way",
      ],
    },
    {
      heading: "What we ask",
      items: [
        "One business unit and one real hiring workflow",
        "Access to approved JDs, salary bands and approval hierarchy",
        "A named owner in recruiting or HR operations",
        "Honest feedback, including the parts that do not work",
      ],
    },
  ],
  fitCriteria: [
    "1,000+ employees",
    "Continuous hiring, not episodic",
    "An ATS already in place",
    "A written approval hierarchy",
  ],
  source: "Blueprint sec.23",
} as const;

/* ------------------------------------------------------------------ *
 * Investor page
 * ------------------------------------------------------------------ */

export const WEDGE = {
  eyebrow: "Go-to-market wedge",
  title: "Narrow the first product until it is undeniable",
  lead: "We are not building twelve agents before we have proven one workflow. V1 is the shortest path from a hiring request to a policy-aware, approved shortlist.",
  steps: [
    "Requisition",
    "JD",
    "Policy check",
    "Approval",
    "Posting",
    "Candidate intelligence",
    "Shortlist",
  ],
  build: {
    heading: "In V1",
    items: [
      "Multi-tenant org setup, users and RBAC",
      "Document upload and knowledge ingestion",
      "Hiring requisition intake",
      "JD Agent with grounded retrieval",
      "Deterministic salary and process policy engine",
      "Approval and comment workflow",
      "One ATS or job-distribution connector",
      "Resume parsing and evidence extraction",
      "Evidence-based shortlist with human approval",
      "Audit trail and baseline analytics",
    ],
  },
  defer: {
    heading: "Deliberately not in V1",
    items: [
      "Voice and WhatsApp agents",
      "Autonomous candidate rejection",
      "Full ATS replacement",
      "A custom-trained LLM",
      "Many HRMS integrations",
      "Complex finance workflows",
      "Full multi-round interview automation",
    ],
  },
  kicker:
    "This proves the core claim — a hiring request becomes an approved, policy-aware shortlist — without absorbing the complexity of the full vision.",
  source: "Blueprint sec.17, sec.25",
} as const;

export const COMPETITION = {
  eyebrow: "Competitive landscape",
  title: "We are not trying to win the ATS category",
  lead: "Crowded market, and we say so. Our position is the layer none of them own: vendor-neutral orchestration plus company-specific policy intelligence.",
  columns: ["Capability", "HireOS", "Ashby", "Eightfold", "Traditional ATS"],
  rows: [
    ["ATS replacement", "No", "Yes", "Varies", "Yes"],
    ["AI agents", "Core", "Yes", "Yes", "Increasing"],
    ["Company policy engine", "Core differentiator", "Partial", "Partial", "Varies"],
    ["Cross-system orchestration", "Core", "Strong ecosystem", "Strong", "Varies"],
    ["Candidate intelligence", "Core", "Strong", "Core", "Basic"],
    ["Scheduling", "V2", "Strong", "Strong", "Varies"],
    ["Interview intelligence", "V3", "Strong", "Strong", "Increasing"],
    ["Vendor-neutral layer", "Core strategy", "Less central", "Less central", "N/A"],
    ["Governance and audit", "Core", "Strong", "Strong", "Strong"],
  ],
  kicker:
    "The existence of these products validates the demand. It also means AI recruiting is not a differentiator — the policy and governance layer is.",
  source: "Blueprint sec.15",
} as const;

export const MOAT = {
  eyebrow: "Defensibility",
  title: "The moat is not the model",
  lead: "Anyone can call the same API we call. What compounds is everything wrapped around it.",
  layers: [
    {
      heading: "Company-specific hiring knowledge",
      body: "Every ingested policy, template and competency framework makes the next output more theirs and harder to reproduce elsewhere.",
    },
    {
      heading: "Policy engine embedded in the process",
      body: "Once approval hierarchy and salary governance run through us, we are load-bearing infrastructure rather than a tool.",
    },
    {
      heading: "Deep vendor-neutral integrations",
      body: "Each connector is real engineering and real enterprise trust. The set compounds into switching cost.",
    },
    {
      heading: "Structured hiring evidence and history",
      body: "Role to competency to interview to outcome, captured as structured data almost nobody else holds in that shape.",
    },
    {
      heading: "Governance, auditability and oversight",
      body: "The artifact enterprise procurement and legal actually sign off on.",
    },
    {
      heading: "Autonomy migration",
      body: "Override data earns the right to move a customer from Copilot to Assisted to Autopilot, which competitors cannot shortcut.",
    },
  ],
  kicker:
    "A generic LLM wrapper is not a durable moat. Enterprise workflow, policy, integration and governance are.",
  source: "Blueprint sec.21",
} as const;

export const PRICING = {
  eyebrow: "Business model",
  title: "Value-based enterprise pricing, not per-seat",
  lead: "Our value is workflow automation and orchestration, so we do not price per resume or per recruiter seat.",
  packages: [
    {
      name: "Paid Pilot",
      price: "INR 5–10 lakh",
      period: "8–12 weeks",
      includes: [
        "One business unit",
        "Limited integrations",
        "Measured ROI baseline",
      ],
      highlight: true,
      note: "Our land motion",
    },
    {
      name: "Growth Enterprise",
      price: "INR 20–40 lakh",
      period: "per year",
      includes: [
        "Core platform",
        "Multiple teams",
        "AI usage allowance",
        "Integrations and governance",
      ],
      highlight: false,
      note: "",
    },
    {
      name: "Enterprise",
      price: "INR 50L – 1.5Cr+",
      period: "per year",
      includes: [
        "Higher volume",
        "Enterprise integrations",
        "SLA",
        "Security and support",
      ],
      highlight: false,
      note: "",
    },
    {
      name: "Private / Dedicated",
      price: "Custom",
      period: "",
      includes: [
        "Dedicated environment",
        "Private cloud or VPC",
        "Custom controls",
        "Enterprise SLA",
      ],
      highlight: false,
      note: "",
    },
  ],
  assumption:
    "These are proposed validation bands from our blueprint, not observed market pricing. Final pricing reflects customer ROI, hiring volume, deployment model and integration complexity — and is one of the things the pilot phase exists to test.",
  source: "Blueprint sec.20",
} as const;

export const MARKET = {
  eyebrow: "Market",
  title: "Sized bottom-up from our own price bands",
  lead: "We are not quoting an analyst's HR-tech TAM. Here is the arithmetic from our pricing, with every input stated so you can disagree with it precisely.",
  assumptionsLabel: "Inputs (our estimates, under validation)",
  assumptions: [
    {
      label: "Target account",
      value: "Enterprise, 1,000+ employees, continuous hiring, existing ATS",
    },
    { label: "India accounts", value: "~9,000 such enterprises" },
    {
      label: "Global English-first accounts",
      value: "~65,000 such enterprises",
    },
    { label: "Blended ACV at Growth tier", value: "INR 30 lakh (~$36K)" },
    { label: "Blended ACV, global enterprise", value: "~$60K" },
  ],
  tiers: [
    {
      label: "India serviceable",
      value: "~INR 2,700 Cr",
      basis: "9,000 accounts x INR 30L ACV",
    },
    {
      label: "Global reachable",
      value: "~$3.9B",
      basis: "65,000 accounts x $60K ACV",
    },
    {
      label: "Our year-3 target",
      value: "~INR 14 Cr ARR",
      basis: "40 enterprise accounts x INR 35L blended",
    },
  ],
  realityCheck:
    "We need roughly 40 enterprise accounts to build a serious company. That is a sales problem we can plan, not a market-size problem.",
  caveat:
    "No third-party market report is cited here. Account counts and ACV are our own estimates, and refining them is part of the discovery work this raise funds.",
  source: "Derived from Blueprint sec.20 — not present in source PDFs",
} as const;

export const VALIDATION = {
  eyebrow: "Where we are",
  title: "Pre-product, pre-revenue — and disciplined about it",
  lead: "We have a blueprint and a thesis, not a customer base. We would rather show you the plan for earning conviction than manufacture traction we do not have.",
  status: [
    {
      label: "Product",
      value:
        "Blueprint complete — modules, workflow, schema, agents, APIs, security",
    },
    { label: "Revenue", value: "None" },
    {
      label: "Customers",
      value: "None signed. Design-partner pipeline being built",
    },
    {
      label: "Team",
      value: "Being assembled against a defined 5-role structure",
    },
  ],
  steps: [
    {
      n: "1",
      heading: "Interview 10–15 practitioners",
      body: "Across recruiting, hiring management, HR operations and HR leadership.",
    },
    {
      n: "2",
      heading: "Make them rank the pain",
      body: "JD creation, screening, scheduling, candidate communication, interview feedback, offer prep, policy compliance, reporting. Ranked, not rated.",
    },
    {
      n: "3",
      heading: "Test willingness to pay",
      body: "“If we automate the operational hiring workflow while keeping you in control of consequential decisions, what would you pay?”",
    },
    {
      n: "4",
      heading: "Build only the strongest wedge",
      body: "Commit engineering to the single workflow with the clearest willingness to pay.",
    },
    {
      n: "5",
      heading: "Convert 3 to paid pilots",
      body: "Prove measurable hours saved per hire before asking anyone for a seed round.",
    },
  ],
  kicker:
    "Do not begin by building twelve agents. Begin by proving one agentic workflow saves measurable time and that enterprises will pay for it.",
  source: "Blueprint sec.23",
} as const;

export const ROADMAP = {
  eyebrow: "Execution plan",
  title: "90 days to an MVP, 18 months to a seed round",
  lead: "The near-term plan is specific because the blueprint already did the hard thinking. This is a build-and-prove plan, not a research project.",
  sprints: [
    {
      days: "Days 1–15",
      goal: "Foundation",
      body: "Next.js, FastAPI, Postgres, auth, tenant model, RBAC, document upload, object storage, initial knowledge pipeline.",
    },
    {
      days: "Days 16–30",
      goal: "JD Agent",
      body: "Requisition intake, grounded retrieval, JD generation, policy checks, approval and comment loop.",
    },
    {
      days: "Days 31–45",
      goal: "Workflow",
      body: "Durable workflow states, events, retries, notifications, approval service, audit trail.",
    },
    {
      days: "Days 46–60",
      goal: "Candidate AI",
      body: "Resume parsing, profile normalization, evidence extraction, requirement matching, shortlist UI.",
    },
    {
      days: "Days 61–75",
      goal: "Integrations",
      body: "One ATS or job-posting path, calendar, email and one enterprise messaging channel.",
    },
    {
      days: "Days 76–90",
      goal: "Pilot",
      body: "Security hardening, analytics, evaluation suite, onboarding, 1–3 enterprise pilots.",
    },
  ],
  phases: [
    { v: "V1", when: "0–3 mo", what: "Requisition to policy-aware shortlist" },
    {
      v: "V2",
      when: "3–6 mo",
      what: "Scheduling, calendar, candidate comms, interviewer prep",
    },
    {
      v: "V3",
      when: "6–12 mo",
      what: "Interview intelligence, multi-round orchestration, offers",
    },
    {
      v: "V4",
      when: "12+ mo",
      what: "Voice, WhatsApp, candidate agent, deep HRMS, advanced analytics",
    },
  ],
  source: "Blueprint sec.18",
} as const;

export const TEAM = {
  eyebrow: "The team",
  title: "A 4–6 person team can ship this in 90 days",
  lead: "Deliberately small and senior. The blueprint defines the roles. This raise fills them.",
  roles: [
    {
      role: "Founder / Product",
      name: "[Founder name TBD]",
      body: "Customer discovery, workflow design, enterprise sales, roadmap.",
      status: "In seat",
    },
    {
      role: "Full-stack Engineer #1",
      name: "[TBD]",
      body: "Frontend, dashboard, approval center, candidate UI.",
      status: "Hiring",
    },
    {
      role: "Full-stack Engineer #2",
      name: "[TBD]",
      body: "Backend APIs, workflow engine, database, integrations.",
      status: "Hiring",
    },
    {
      role: "AI / ML Engineer",
      name: "[TBD]",
      body: "Retrieval, agents, evaluation, extraction, guardrails.",
      status: "Hiring",
    },
    {
      role: "Platform / Security Engineer",
      name: "[TBD]",
      body: "Cloud, identity, security, observability, integrations.",
      status: "Hiring",
    },
    {
      role: "Designer (contract)",
      name: "[TBD]",
      body: "Enterprise UX and design system.",
      status: "Contract",
    },
  ],
  note: "Bracketed placeholders are deliberate. Replace them with real names and one-line credibility markers before this page goes to an investor.",
  source: "Blueprint sec.19",
} as const;

export const ASK = {
  eyebrow: "The ask",
  raise: "$1.5M pre-seed",
  runway: "18 months",
  title: "$1.5M pre-seed for 18 months",
  lead: "Enough to assemble the team, ship the MVP wedge and convert three enterprise pilots into evidence that this works.",
  stats: [
    { value: "$1.5M", label: "Pre-seed round" },
    { value: "18 months", label: "Runway" },
    { value: "4–6", label: "Person team" },
    { value: "3", label: "Paid enterprise pilots" },
  ],
  useOfFundsLabel: "Use of funds",
  useOfFunds: [
    { label: "Engineering — 2 full-stack", pct: 34 },
    { label: "AI / ML engineering", pct: 18 },
    { label: "Platform and security", pct: 16 },
    { label: "Design, GTM and pilot delivery", pct: 14 },
    { label: "Infrastructure and model usage", pct: 10 },
    { label: "Compliance readiness and legal", pct: 8 },
  ],
  milestonesLabel: "What we will have proven",
  milestones: [
    "MVP live end to end: requisition to policy-aware shortlist",
    "3 paid enterprise pilots delivered and measured",
    "Documented human hours saved per successful hire",
    "One production ATS connector plus calendar and messaging",
    "SOC 2 readiness work underway",
    "Pricing validated against real enterprise willingness to pay",
  ],
  assumption:
    "Allocation is our current plan, not a committed budget. It will move with hiring timing and pilot scope.",
  source: "Our funding plan — not present in source PDFs",
} as const;

export const CLOSING = {
  title: "AI executes.\nCompany policy governs.\nHumans decide.",
  body: "The strongest version of this company is not an AI that hires people. It is an enterprise hiring operating layer that executes recruiting work across the systems a company already runs, enforces that company's policy, and preserves human control over consequential decisions.",
  source: "Blueprint sec.25",
} as const;
