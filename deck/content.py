"""All deck copy, as data.

Layout code lives in components.py and diagrams.py; nothing here draws
anything. Edit this file to change what the deck says, then rebuild.

Each slide is a dict with a "kind" that build.py dispatches on. The "source"
key traces the claim back to the originating blueprint section so the deck
stays auditable against the PDFs.

Two slides deliberately go beyond the source PDFs -- MARKET and ASK -- because
the blueprint contains no market sizing or funding plan. Both carry visible
assumption framing rather than presenting estimates as researched fact.
"""

from __future__ import annotations

# --------------------------------------------------------------------------
# Deck-level metadata
# --------------------------------------------------------------------------

DECK_TITLE = "HireOS - Pre-Seed Investor Deck"
DECK_SUBJECT = "Enterprise Agentic Hiring Operating System"
DECK_AUTHOR = "[Founder name TBD]"

RAISE_HEADLINE = "$1.5M pre-seed"
RAISE_RUNWAY = "18 months"

# Fill these in before sending the deck out.
PLACEHOLDERS = {
    "founder": "[Founder name TBD]",
    "entity": "[Entity name TBD]",
    "contact": "[email / phone TBD]",
}


# --------------------------------------------------------------------------
# 1. Cover
# --------------------------------------------------------------------------

COVER = {
    "kind": "cover",
    "eyebrow": "Pre-seed - Enterprise AI x HR Tech",
    "title": "HireOS",
    "descriptor": "The Enterprise Agentic Hiring Operating System",
    "tagline": "AI executes. Company policy governs. Humans decide.",
    "footnote": f"{PLACEHOLDERS['entity']}  -  {PLACEHOLDERS['contact']}",
}


# --------------------------------------------------------------------------
# 2. Problem
# --------------------------------------------------------------------------

PROBLEM = {
    "kind": "cards",
    "eyebrow": "The problem",
    "title": "Enterprise hiring is coordination work, not decision work",
    "lead": "Recruiters and hiring managers spend their week moving information between "
            "systems that do not talk to each other. The judgment takes minutes; the "
            "logistics take weeks.",
    "cards": [
        {
            "heading": "Fragmented stack",
            "body": "Hiring runs across ATS, HRMS, job portals, email, calendars, "
                    "Slack/Teams, spreadsheets and finance approvals. No system owns "
                    "the workflow end to end.",
        },
        {
            "heading": "Repetitive coordination",
            "body": "Drafting JDs, screening applicants, arranging interviews, chasing "
                    "reminders, collecting feedback and preparing offers absorb the "
                    "majority of recruiting hours.",
        },
        {
            "heading": "Generic AI does not know your company",
            "body": "Off-the-shelf AI has no view of your approval hierarchy, salary "
                    "bands, role levels, interview standards or hiring history.",
        },
        {
            "heading": "Black-box AI is unadoptable",
            "body": "An AI that simply outputs hire or reject creates accountability "
                    "and compliance risk no enterprise will absorb.",
        },
    ],
    "source": "Validation PDF sec.2",
}


# --------------------------------------------------------------------------
# 3. Why now
# --------------------------------------------------------------------------

WHY_NOW = {
    "kind": "cards",
    "eyebrow": "Why now",
    "title": "The capability arrived. The control layer did not.",
    "lead": "Three things became true at once, and the gap between them is the opening.",
    "cards": [
        {
            "heading": "Models can finally do the work",
            "body": "Language models are now good enough to draft JDs, extract resume "
                    "evidence and summarize interviews at a quality enterprises will "
                    "actually put in front of a hiring manager.",
        },
        {
            "heading": "Enterprises are funding agentic AI",
            "body": "Budget has moved from AI experiments to AI that executes real "
                    "operational work, with procurement now asking about governance "
                    "rather than novelty.",
        },
        {
            "heading": "But 'AI recruiting' is already table stakes",
            "body": "ATS, talent-intelligence and AI-interview vendors all ship AI "
                    "features. Demand is validated and differentiation on AI alone is "
                    "gone. What is missing is policy-aware orchestration.",
        },
    ],
    "kicker": "The market validates the demand. It does not yet serve the control problem.",
    "source": "Blueprint sec.15",
}


# --------------------------------------------------------------------------
# 4. Thesis - two-brain architecture
# --------------------------------------------------------------------------

THESIS = {
    "kind": "diagram_two_brain",
    "eyebrow": "Our thesis",
    "title": "Separate the model from the mandate",
    "lead": "Every credible enterprise hiring agent needs two brains. Most products "
            "build only the first one.",
    "ai_layer": {
        "heading": "AI layer",
        "subhead": "Language-heavy work",
        "items": [
            "Understand the hiring request",
            "Generate and revise JDs",
            "Summarize resumes and interviews",
            "Extract competency evidence",
            "Generate interview questions",
            "Draft candidate communication",
        ],
    },
    "policy_layer": {
        "heading": "Deterministic layer",
        "subhead": "Rules, states and authority",
        "items": [
            "Salary bands and limits",
            "Approval hierarchy",
            "Permissions and RBAC",
            "Workflow state transitions",
            "Required interview rounds",
            "Audit logs and traceability",
        ],
    },
    "gate_label": "POLICY ENGINE",
    "rule": "An LLM may recommend an action. The policy and workflow engine decides "
            "whether that action is allowed.",
    "example": "A candidate expects INR 28 LPA against an approved L3 band of INR 18-25 LPA. "
               "The model does not get to call that acceptable. The policy engine flags the "
               "exception and routes it to the approver who owns it.",
    "source": "Blueprint sec.5, Validation PDF sec.6",
}


# --------------------------------------------------------------------------
# 5. Product / positioning
# --------------------------------------------------------------------------

PRODUCT = {
    "kind": "diagram_layer",
    "eyebrow": "The product",
    "title": "An orchestration layer on top of the HR stack you already bought",
    "lead": "We do not ask an enterprise to rip out Workday, SAP or Greenhouse. "
            "HireOS sits above the systems of record and does the human work around them.",
    "hireos_layer": {
        "heading": "HireOS",
        "subhead": "Orchestration & governance",
        "modules": [
            "Requisition", "Company Knowledge", "JD Agent", "Policy Engine",
            "Approval Center", "Job Distribution", "Candidate Intelligence",
            "Governance & Audit",
        ],
    },
    "systems_layer": {
        "heading": "Your existing systems of record",
        "systems": [
            "ATS", "HRMS", "Job boards", "Calendar",
            "Email / Teams / Slack", "Meetings", "Finance",
        ],
    },
    "why": [
        ("Low adoption friction", "No migration, no rip-and-replace, no system-of-record risk."),
        ("Vendor neutral", "We integrate with whatever they run, which makes us additive rather than competitive."),
        ("Fast time to value", "Value shows up in the first workflow, not after a replatform."),
    ],
    "source": "Blueprint sec.1, Validation PDF sec.16",
}


# --------------------------------------------------------------------------
# 6. One request, one workflow
# --------------------------------------------------------------------------

WORKFLOW_STORY = {
    "kind": "workflow_story",
    "eyebrow": "How it works",
    "title": "One hiring request becomes one orchestrated workflow",
    "request": "Hire a Data Scientist, 4+ years, Python / SQL / ML / AWS, Bengaluru, "
               "approved band INR 20-26 LPA.",
    "request_label": "Hiring manager types this, in plain language",
    "steps": [
        ("Understand", "Requisition Agent structures role, level, location, experience, stack and band.", False),
        ("Retrieve", "Company knowledge returns approved JDs, policies, templates and role frameworks.", False),
        ("Draft", "JD Agent generates a company-specific JD grounded in that knowledge.", False),
        ("Validate", "Policy engine checks band, permissions, required process and approvals.", False),
        ("Approve", "Manager gets Approve / Comment in Teams, Slack or email.", True),
        ("Revise", "A comment triggers automatic revision and a fresh approval request.", True),
        ("Publish", "Approved role is distributed through the ATS or job-board connector.", False),
        ("Evaluate", "Candidate Intelligence extracts evidence per approved competency.", False),
        ("Shortlist", "Manager selects candidates from evidence, not from a score.", True),
        ("Schedule", "Scheduling Agent finds compatible candidate and interviewer slots.", False),
        ("Structure", "Interview Intelligence turns the transcript into structured feedback.", False),
        ("Decide", "Manager approves progression. Compensation is policy-checked.", True),
        ("Offer", "Offer draft generated, routed for HR and finance approval, then sent.", True),
    ],
    "legend_ai": "AI executes",
    "legend_human": "Human decides",
    "kicker": "The demo that wins is this single continuous story - not a tour of "
              "disconnected AI features.",
    "source": "Blueprint sec.3 and sec.24",
}


# --------------------------------------------------------------------------
# 7. Workflow state machine
# --------------------------------------------------------------------------

STATE_MACHINE = {
    "kind": "diagram_state_machine",
    "eyebrow": "Architecture",
    "title": "A durable state machine, not one giant autonomous prompt",
    "lead": "Every requisition is a workflow instance with versioned state, replayable "
            "events and retries. This is what makes the system auditable and what makes "
            "it survive a failed model call.",
    "states": [
        ("REQUISITION_DRAFT", False),
        ("JD_APPROVAL", True),
        ("JOB_POSTING", False),
        ("ACTIVE", False),
        ("SCREENING", False),
        ("SHORTLIST_REVIEW", True),
        ("INTERVIEW_SCHEDULING", False),
        ("INTERVIEW_SCHEDULED", False),
        ("INTERVIEW_COMPLETED", False),
        ("FEEDBACK_REVIEW", True),
        ("NEXT_ROUND", False),
        ("FINAL_REVIEW", True),
        ("OFFER_APPROVAL", True),
        ("OFFER_GENERATED", False),
        ("OFFER_SENT", False),
    ],
    "terminals": ["HIRED", "REJECTED", "CLOSED"],
    "notes": [
        ("Durable", "Temporal-class workflow engine; state survives restarts and model failures."),
        ("Evented", "Every transition emits an event, giving replay and full workflow history."),
        ("Gated", "Amber states cannot advance without a recorded human decision."),
    ],
    "source": "Blueprint sec.4, Validation PDF sec.7",
}


# --------------------------------------------------------------------------
# 8. Agent architecture
# --------------------------------------------------------------------------

AGENTS = {
    "kind": "diagram_agents",
    "eyebrow": "Architecture",
    "title": "Specialized agents with scoped tool permissions",
    "lead": "No agent gets unrestricted authority. Each one receives only the tools its "
            "job requires, which is what turns a demo into something an enterprise "
            "security review will pass.",
    "agents": [
        ("Requisition Agent", "Turns a natural-language request into structured requirements.",
         "Reads role knowledge - writes draft requisition"),
        ("JD Agent", "Generates and revises JDs from approved knowledge and templates.",
         "Writes JD draft - cannot publish"),
        ("Candidate Intelligence", "Extracts evidence and compares candidates to approved requirements.",
         "Reads applications - writes evaluation"),
        ("Scheduling Agent", "Finds compatible slots, confirms and reschedules.",
         "Calendar and comms - no hiring decisions"),
        ("Interview Intelligence", "Transcribes, summarizes and maps evidence to competencies.",
         "Transcript access - writes feedback draft"),
        ("Offer Agent", "Prepares compensation and offer drafts within policy.",
         "Writes draft - cannot send without approval"),
    ],
    "governance": {
        "heading": "Governance Layer",
        "body": "Enforces authorization, policy, auditability and human gates across every "
                "agent. No unrestricted model authority anywhere in the system.",
    },
    "source": "Blueprint sec.6",
}


# --------------------------------------------------------------------------
# 9. Company hiring memory
# --------------------------------------------------------------------------

MEMORY = {
    "kind": "diagram_pipeline",
    "eyebrow": "Differentiator 1",
    "title": "Company hiring memory",
    "lead": "The differentiator is not that we can write a JD. It is that we can write "
            "the JD your company would have approved.",
    "art": "memory",
    "pipeline": [
        "Document", "Classify", "Extract", "Structure facts",
        "Chunk", "Embed", "Permission-aware retrieval", "Grounded generation",
    ],
    "knows": {
        "heading": "What the memory holds",
        "items": [
            "Approved JDs and templates",
            "Salary bands and hiring policy",
            "Competency frameworks",
            "Interview structures per role and level",
            "Org roles, levels and approval hierarchy",
            "Relevant historical hiring context",
        ],
    },
    "discipline": {
        "heading": "The discipline that matters",
        "body": "Historical hiring decisions are not ground truth. History carries bias and "
                "inconsistency, so the product separates historical pattern from approved "
                "policy and treats the past as context, never as authority.",
    },
    "source": "Blueprint sec.7, Validation PDF sec.9",
}


# --------------------------------------------------------------------------
# 10. Candidate intelligence
# --------------------------------------------------------------------------

CANDIDATE_INTELLIGENCE = {
    "kind": "evidence",
    "eyebrow": "Differentiator 2",
    "title": "Evidence, not a black-box score",
    "lead": "A number a hiring manager cannot interrogate is a number they will not "
            "defend. So we never ship one.",
    "candidate_label": "Candidate evaluation - Data Scientist, L3",
    "columns": ["Competency", "Evidence found", "Assessment"],
    "rows": [
        ("Python", "Production development and shipped project evidence", "Strong"),
        ("SQL", "Analytics and data-engineering work across two roles", "Strong"),
        ("Machine Learning", "Production ML projects with measured outcomes", "Very strong"),
        ("AWS", "Cloud deployment and infrastructure experience", "Strong"),
        ("System Design", "No direct architecture evidence in the record", "Gap to validate"),
    ],
    "recommendation_label": "Recommendation",
    "recommendation": "Proceed to next round.",
    "reason": "Strong evidence against four of five approved competencies. The System Design "
              "gap is flagged for interviewer validation rather than silently averaged into "
              "a score.",
    "outputs": [
        ("Matched requirements", "Which approved competencies are actually met"),
        ("Supporting evidence", "The specific text the judgment came from"),
        ("Gaps", "What is missing, stated plainly"),
        ("Confidence", "How much the evidence supports the call"),
    ],
    "source": "Blueprint sec.8, Validation PDF sec.10",
}


# --------------------------------------------------------------------------
# 11. Autonomy ladder
# --------------------------------------------------------------------------

AUTONOMY = {
    "kind": "autonomy",
    "eyebrow": "Adoption model",
    "title": "Earn autonomy one rung at a time",
    "lead": "Enterprises do not buy autonomy on day one; they grant it after the system "
            "proves itself. That progression is our expansion motion, and the override "
            "data we collect is what makes the next rung defensible.",
    "modes": [
        {
            "name": "Copilot",
            "behavior": "AI recommends. Human executes.",
            "example": "Candidate recommendation with evidence.",
            "trust": "Land here",
        },
        {
            "name": "Assisted",
            "behavior": "AI prepares the action. Human approves.",
            "example": "JD, shortlist and offer drafts.",
            "trust": "Core of the product",
        },
        {
            "name": "Autopilot",
            "behavior": "AI executes low-risk actions within policy.",
            "example": "Interview reminders, approved notifications.",
            "trust": "Expand here",
        },
    ],
    "kicker": "Moving a customer from Copilot to Assisted to Autopilot raises both the "
              "value we deliver and the price we can defend.",
    "source": "Blueprint sec.16",
}


# --------------------------------------------------------------------------
# 12. Trust architecture
# --------------------------------------------------------------------------

TRUST = {
    "kind": "diagram_security",
    "eyebrow": "Enterprise readiness",
    "title": "Built for the security review, not retrofitted for it",
    "lead": "Enterprise HR data is among the most sensitive a company holds. The "
            "architecture assumes that from the first commit.",
    "stack": [
        ("Internet", "Untrusted"),
        ("WAF / API Gateway", "Rate limits, request validation"),
        ("Identity / SSO", "Enterprise SSO, MFA, SCIM"),
        ("RBAC / ABAC", "Least privilege, tenant isolation"),
        ("Application services", "Agents, policy engine, workflow"),
        ("Postgres / Object store / Vector", "Encrypted at rest, per-tenant scoping"),
    ],
    "injection": {
        "heading": "Resumes are untrusted input",
        "body": "A candidate can put instructions in a resume. Uploaded documents are never "
                "allowed to issue commands to an agent.",
        "flow": ["Untrusted document", "Parser", "Content boundary", "LLM",
                 "Output validator", "Policy engine", "Authorized action"],
    },
    "controls": [
        "Tenant isolation and least privilege",
        "Encryption in transit and at rest",
        "Configurable retention and deletion",
        "Model and prompt version traceability",
        "Full audit trail on every material action",
        "PII classification and controlled access",
        "Secrets and key management",
        "SOC 2 / ISO 27001 pathway as we mature",
    ],
    "source": "Blueprint sec.12 and sec.13",
}


# --------------------------------------------------------------------------
# 13. Compliance and responsible AI
# --------------------------------------------------------------------------

COMPLIANCE = {
    "kind": "cards",
    "eyebrow": "Regulatory posture",
    "title": "Recruitment AI is a regulated use case. That is an advantage.",
    "lead": "Hiring AI sits in high-risk categories in several jurisdictions. Competitors "
            "treat that as a headwind. For a governance-first product it is the reason to buy.",
    "cards": [
        {
            "heading": "Human oversight by design",
            "body": "Consequential decisions - shortlist, feedback, final selection, "
                    "compensation - are structurally gated on a recorded human decision. "
                    "It is not a setting that can be switched off.",
        },
        {
            "heading": "Explainability and traceability",
            "body": "Every generated output carries its retrieved sources, model version and "
                    "prompt version. Every action carries an actor and a timestamp.",
        },
        {
            "heading": "Fairness testing from day one",
            "body": "Bias and fairness monitoring on candidate evaluation workflows, with "
                    "history treated as context rather than as approved policy.",
        },
        {
            "heading": "Jurisdiction-aware",
            "body": "Designed around India's digital personal-data framework, with "
                    "jurisdiction-specific legal review before each international deployment.",
        },
    ],
    "disclaimer": "Product and technical guidance, not legal advice. Enterprise deployments "
                  "receive jurisdiction-specific legal and compliance review.",
    "source": "Blueprint sec.14, Validation PDF sec.14",
}


# --------------------------------------------------------------------------
# 14. Wedge and MVP
# --------------------------------------------------------------------------

WEDGE = {
    "kind": "wedge",
    "eyebrow": "Go-to-market wedge",
    "title": "Narrow the first product until it is undeniable",
    "lead": "We are not building twelve agents before we have proven one workflow. V1 is "
            "the shortest path from a hiring request to a policy-aware, approved shortlist.",
    "wedge_label": "MVP scope",
    "wedge_steps": [
        "Requisition", "JD", "Policy check", "Approval",
        "Posting", "Candidate intelligence", "Shortlist",
    ],
    "build": {
        "heading": "In V1",
        "items": [
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
    "defer": {
        "heading": "Deliberately not in V1",
        "items": [
            "Voice and WhatsApp agents",
            "Autonomous candidate rejection",
            "Full ATS replacement",
            "A custom-trained LLM",
            "Many HRMS integrations",
            "Complex finance workflows",
            "Full multi-round interview automation",
        ],
    },
    "kicker": "This proves the core claim - a hiring request becomes an approved, "
              "policy-aware shortlist - without absorbing the complexity of the full vision.",
    "source": "Blueprint sec.17 and sec.25",
}


# --------------------------------------------------------------------------
# 15. Competition
# --------------------------------------------------------------------------

COMPETITION = {
    "kind": "matrix",
    "eyebrow": "Competitive landscape",
    "title": "We are not trying to win the ATS category",
    "lead": "Crowded market, and we say so. Our position is the layer none of them own: "
            "vendor-neutral orchestration plus company-specific policy intelligence.",
    "columns": ["Capability", "HireOS", "Ashby", "Eightfold", "Traditional ATS"],
    "rows": [
        ("ATS replacement", "No", "Yes", "Varies", "Yes"),
        ("AI agents", "Core", "Yes", "Yes", "Increasing"),
        ("Company policy engine", "Core differentiator", "Partial", "Partial", "Varies"),
        ("Cross-system orchestration", "Core", "Strong ecosystem", "Strong", "Varies"),
        ("Candidate intelligence", "Core", "Strong", "Core", "Basic"),
        ("Scheduling", "V2", "Strong", "Strong", "Varies"),
        ("Interview intelligence", "V3", "Strong", "Strong", "Increasing"),
        ("Vendor-neutral layer", "Core strategy", "Less central", "Less central", "N/A"),
        ("Governance and audit", "Core", "Strong", "Strong", "Strong"),
    ],
    "highlight_column": 1,
    "kicker": "The existence of these products validates the demand. It also means "
              "'AI recruiting' is not a differentiator - the policy and governance layer is.",
    "source": "Blueprint sec.15",
}


# --------------------------------------------------------------------------
# 16. Moat
# --------------------------------------------------------------------------

MOAT = {
    "kind": "moat",
    "eyebrow": "Defensibility",
    "title": "The moat is not the model",
    "lead": "Anyone can call the same API we call. What compounds is everything wrapped "
            "around it.",
    "layers": [
        ("Company-specific hiring knowledge",
         "Every ingested policy, template and competency framework makes the next output "
         "more theirs and harder to reproduce elsewhere."),
        ("Policy engine embedded in the process",
         "Once approval hierarchy and salary governance run through us, we are load-bearing "
         "infrastructure rather than a tool."),
        ("Deep vendor-neutral integrations",
         "Each connector is real engineering and real enterprise trust. The set compounds "
         "into switching cost."),
        ("Structured hiring evidence and history",
         "Role to competency to interview to outcome, captured as structured data almost "
         "nobody else holds in that shape."),
        ("Governance, auditability and oversight",
         "The artifact enterprise procurement and legal actually sign off on."),
        ("Autonomy migration",
         "Override data earns the right to move a customer from Copilot to Assisted to "
         "Autopilot, which competitors cannot shortcut."),
    ],
    "kicker": "A generic LLM wrapper is not a durable moat. Enterprise workflow, policy, "
              "integration and governance are.",
    "source": "Blueprint sec.21, Validation PDF sec.20",
}


# --------------------------------------------------------------------------
# 17. Business model
# --------------------------------------------------------------------------

BUSINESS_MODEL = {
    "kind": "pricing",
    "eyebrow": "Business model",
    "title": "Value-based enterprise pricing, not per-seat",
    "lead": "Our value is workflow automation and orchestration, so we do not price per "
            "resume or per recruiter seat.",
    "packages": [
        {
            "name": "Paid Pilot",
            "price": "INR 5-10 lakh",
            "period": "8-12 weeks",
            "includes": ["One business unit", "Limited integrations", "Measured ROI baseline"],
            "highlight": True,
            "note": "Our land motion",
        },
        {
            "name": "Growth Enterprise",
            "price": "INR 20-40 lakh",
            "period": "per year",
            "includes": ["Core platform", "Multiple teams", "AI usage allowance",
                         "Integrations and governance"],
            "highlight": False,
            "note": "",
        },
        {
            "name": "Enterprise",
            "price": "INR 50L - 1.5Cr+",
            "period": "per year",
            "includes": ["Higher volume", "Enterprise integrations", "SLA",
                         "Security and support"],
            "highlight": False,
            "note": "",
        },
        {
            "name": "Private / Dedicated",
            "price": "Custom",
            "period": "",
            "includes": ["Dedicated environment", "Private cloud or VPC",
                         "Custom controls", "Enterprise SLA"],
            "highlight": False,
            "note": "",
        },
    ],
    "assumption": "These are proposed validation bands from our blueprint, not observed "
                  "market pricing. Final pricing reflects customer ROI, hiring volume, "
                  "deployment model and integration complexity - and is one of the things "
                  "the pilot phase exists to test.",
    "source": "Blueprint sec.20",
}


# --------------------------------------------------------------------------
# 18. Market
# --------------------------------------------------------------------------

MARKET = {
    "kind": "market",
    "eyebrow": "Market",
    "title": "Sized bottom-up from our own price bands",
    "lead": "We are not quoting an analyst's HR-tech TAM. Here is the arithmetic from our "
            "pricing, with every input stated so you can disagree with it precisely.",
    "assumptions_label": "Inputs (our estimates, under validation)",
    "assumptions": [
        ("Target account", "Enterprise, 1,000+ employees, continuous hiring, existing ATS"),
        ("India accounts", "~9,000 such enterprises"),
        ("Global English-first accounts", "~65,000 such enterprises"),
        ("Blended ACV at Growth tier", "INR 30 lakh (~$36K)"),
        ("Blended ACV, global enterprise", "~$60K"),
    ],
    "tiers": [
        ("India serviceable", "~INR 2,700 Cr", "9,000 accounts x INR 30L ACV"),
        ("Global reachable", "~$3.9B", "65,000 accounts x $60K ACV"),
        ("Our year-3 target", "~INR 14 Cr ARR", "40 enterprise accounts x INR 35L blended"),
    ],
    "reality_check": "We need roughly 40 enterprise accounts to build a serious company. "
                     "That is a sales problem we can plan, not a market-size problem.",
    "caveat": "No third-party market report is being cited on this slide. Account counts and "
              "ACV are our own estimates, and refining them is part of the discovery work "
              "this raise funds.",
    "source": "Derived from Blueprint sec.20 - not present in source PDFs",
}


# --------------------------------------------------------------------------
# 19. Validation plan (pre-product credibility)
# --------------------------------------------------------------------------

VALIDATION = {
    "kind": "validation",
    "eyebrow": "Where we are",
    "title": "Pre-product, pre-revenue - and disciplined about it",
    "lead": "We have a blueprint and a thesis, not a customer base. We would rather show "
            "you the plan for earning conviction than manufacture traction we do not have.",
    "status": [
        ("Product", "Blueprint complete - modules, workflow, schema, agents, APIs, security"),
        ("Revenue", "None"),
        ("Customers", "None signed. Design-partner pipeline being built"),
        ("Team", "Being assembled against a defined 5-role structure"),
    ],
    "steps": [
        ("1", "Interview 10-15 practitioners",
         "Across recruiting, hiring management, HR operations and HR leadership."),
        ("2", "Make them rank the pain",
         "JD creation, screening, scheduling, candidate communication, interview feedback, "
         "offer prep, policy compliance, reporting. Ranked, not rated."),
        ("3", "Test willingness to pay",
         "\"If we automate the operational hiring workflow while keeping you in control of "
         "consequential decisions, what would you pay?\""),
        ("4", "Build only the strongest wedge",
         "Commit engineering to the single workflow with the clearest willingness to pay."),
        ("5", "Convert 3 to paid pilots",
         "Prove measurable hours saved per hire before asking anyone for a seed round."),
    ],
    "kicker": "Do not begin by building twelve agents. Begin by proving one agentic workflow "
              "saves measurable time and that enterprises will pay for it.",
    "source": "Blueprint sec.23, Validation PDF sec.25",
}


# --------------------------------------------------------------------------
# 20. North-star metrics
# --------------------------------------------------------------------------

METRICS = {
    "kind": "metrics",
    "eyebrow": "How we measure ourselves",
    "title": "One number above all others",
    "lead": "If we cannot move the north star, nothing else on this slide matters.",
    "north_star": {
        "label": "North star",
        "metric": "Human hours saved per successful hire",
        "why": "The cleanest measure of operational value - and the number a CFO can price.",
    },
    "supporting": [
        ("Time-to-hire", "The business outcome the buyer is judged on"),
        ("JD turnaround time", "Proves the first workflow automation"),
        ("Application to shortlist", "Proves candidate intelligence"),
        ("Scheduling time saved", "Proves coordination automation"),
        ("AI acceptance rate", "Proves the output is actually useful"),
        ("Human override rate", "Proves trust and model quality"),
        ("Policy exceptions prevented", "Proves the governance value"),
        ("Actions completed automatically", "Proves the autonomy ladder is moving"),
    ],
    "source": "Blueprint sec.22, Validation PDF sec.22",
}


# --------------------------------------------------------------------------
# 21. Roadmap and team
# --------------------------------------------------------------------------

ROADMAP = {
    "kind": "roadmap",
    "eyebrow": "Execution plan",
    "title": "90 days to an MVP, 18 months to a seed round",
    "lead": "The near-term plan is specific because the blueprint already did the hard "
            "thinking. This is a build-and-prove plan, not a research project.",
    "sprints": [
        ("Days 1-15", "Foundation",
         "Next.js, FastAPI, Postgres, auth, tenant model, RBAC, document upload, object "
         "storage, initial knowledge pipeline."),
        ("Days 16-30", "JD Agent",
         "Requisition intake, grounded retrieval, JD generation, policy checks, "
         "approval and comment loop."),
        ("Days 31-45", "Workflow",
         "Durable workflow states, events, retries, notifications, approval service, "
         "audit trail."),
        ("Days 46-60", "Candidate AI",
         "Resume parsing, profile normalization, evidence extraction, requirement "
         "matching, shortlist UI."),
        ("Days 61-75", "Integrations",
         "One ATS or job-posting path, calendar, email and one enterprise messaging channel."),
        ("Days 76-90", "Pilot",
         "Security hardening, analytics, evaluation suite, onboarding, 1-3 enterprise pilots."),
    ],
    "phases": [
        ("V1", "0-3 mo", "Requisition to policy-aware shortlist"),
        ("V2", "3-6 mo", "Scheduling, calendar, candidate comms, interviewer prep"),
        ("V3", "6-12 mo", "Interview intelligence, multi-round orchestration, offers"),
        ("V4", "12+ mo", "Voice, WhatsApp, candidate agent, deep HRMS, advanced analytics"),
    ],
    "source": "Blueprint sec.18, Validation PDF sec.18",
}

TEAM = {
    "kind": "team",
    "eyebrow": "The team",
    "title": "A 4-6 person team can ship this in 90 days",
    "lead": "Deliberately small and senior. The blueprint defines the roles; this raise "
            "fills them.",
    "roles": [
        ("Founder / Product", PLACEHOLDERS["founder"],
         "Customer discovery, workflow design, enterprise sales, roadmap.", "In seat"),
        ("Full-stack Engineer #1", "[TBD]",
         "Frontend, dashboard, approval center, candidate UI.", "Hiring"),
        ("Full-stack Engineer #2", "[TBD]",
         "Backend APIs, workflow engine, database, integrations.", "Hiring"),
        ("AI / ML Engineer", "[TBD]",
         "Retrieval, agents, evaluation, extraction, guardrails.", "Hiring"),
        ("Platform / Security Engineer", "[TBD]",
         "Cloud, identity, security, observability, integrations.", "Hiring"),
        ("Designer (contract)", "[TBD]",
         "Enterprise UX and design system.", "Contract"),
    ],
    "note": "Replace the bracketed placeholders with real names and one-line credibility "
            "markers before this deck goes to an investor. The team slide is usually the "
            "second thing they read.",
    "source": "Blueprint sec.19",
}


# --------------------------------------------------------------------------
# 22. The ask
# --------------------------------------------------------------------------

ASK = {
    "kind": "ask",
    "eyebrow": "The ask",
    "title": f"{RAISE_HEADLINE} for {RAISE_RUNWAY}",
    "lead": "Enough to assemble the team, ship the MVP wedge and convert three enterprise "
            "pilots into evidence that this works.",
    "headline_stats": [
        ("$1.5M", "Pre-seed round"),
        ("18 months", "Runway"),
        ("4-6", "Person team"),
        ("3", "Paid enterprise pilots"),
    ],
    "use_of_funds_label": "Use of funds",
    "use_of_funds": [
        ("Engineering - 2 full-stack", 34),
        ("AI / ML engineering", 18),
        ("Platform and security", 16),
        ("Design, GTM and pilot delivery", 14),
        ("Infrastructure and model usage", 10),
        ("Compliance readiness and legal", 8),
    ],
    "milestones_label": "What we will have proven",
    "milestones": [
        "MVP live end to end: requisition to policy-aware shortlist",
        "3 paid enterprise pilots delivered and measured",
        "Documented human hours saved per successful hire",
        "One production ATS connector plus calendar and messaging",
        "SOC 2 readiness work underway",
        "Pricing validated against real enterprise willingness to pay",
    ],
    "assumption": "Allocation is our current plan, not a committed budget. It will move with "
                  "hiring timing and pilot scope.",
    "source": "Not present in source PDFs - our funding plan",
}


# --------------------------------------------------------------------------
# 23. Closing
# --------------------------------------------------------------------------

CLOSING = {
    "kind": "closing",
    "eyebrow": "",
    "title": "AI executes.\nCompany policy governs.\nHumans decide.",
    "body": "The strongest version of this company is not an AI that hires people. It is an "
            "enterprise hiring operating layer that executes recruiting work across the "
            "systems a company already runs, enforces that company's policy, and preserves "
            "human control over consequential decisions.",
    "cta": f"{RAISE_HEADLINE} - {PLACEHOLDERS['entity']} - {PLACEHOLDERS['contact']}",
}


# --------------------------------------------------------------------------
# Section dividers
# --------------------------------------------------------------------------

DIVIDER_PRODUCT = {
    "kind": "divider",
    "number": "01",
    "title": "The product",
    "subtitle": "One request. One orchestrated, governed workflow.",
    "art": "orchestration",
}

DIVIDER_TRUST = {
    "kind": "divider",
    "number": "02",
    "title": "Trust and governance",
    "subtitle": "The part that decides whether an enterprise can actually deploy this.",
    "art": "governance",
}

DIVIDER_BUSINESS = {
    "kind": "divider",
    "number": "03",
    "title": "The business",
    "subtitle": "Wedge, competition, moat, model and the ask.",
    "art": "decision",
}


# --------------------------------------------------------------------------
# Deck order
# --------------------------------------------------------------------------

SLIDES = [
    COVER,
    PROBLEM,
    WHY_NOW,
    THESIS,
    DIVIDER_PRODUCT,
    PRODUCT,
    WORKFLOW_STORY,
    STATE_MACHINE,
    AGENTS,
    MEMORY,
    CANDIDATE_INTELLIGENCE,
    AUTONOMY,
    DIVIDER_TRUST,
    TRUST,
    COMPLIANCE,
    DIVIDER_BUSINESS,
    WEDGE,
    COMPETITION,
    MOAT,
    BUSINESS_MODEL,
    MARKET,
    VALIDATION,
    METRICS,
    ROADMAP,
    TEAM,
    ASK,
    CLOSING,
]
