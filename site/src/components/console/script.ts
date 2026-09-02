/**
 * The scripted walkthrough behind the workflow console.
 *
 * This is a canned demonstration, not a live product. Nothing here calls a
 * model or an API -- it plays the exact story from Blueprint sec.24, where one
 * natural-language hiring request becomes one governed workflow.
 */

import type { Assessment, AutonomyMode } from "@/content/site";

export type Actor = "human" | "ai" | "policy" | "system";

export type Payload =
  | { kind: "request"; text: string }
  | { kind: "structured"; fields: { label: string; value: string }[] }
  | { kind: "knowledge"; docs: { name: string; meta: string }[] }
  | { kind: "jd"; heading: string; lines: string[]; restriction: string }
  | {
      kind: "policy";
      checks: { rule: string; result: "pass" | "block"; detail: string }[];
    }
  | { kind: "revision"; comment: string; changes: string[] }
  | { kind: "posting"; channels: { name: string; ref: string }[] }
  | { kind: "screening"; stats: { value: string; label: string }[] }
  | {
      kind: "evidence";
      rows: {
        competency: string;
        evidence: string;
        assessment: Assessment;
      }[];
      recommendation: string;
      reason: string;
    }
  | { kind: "complete"; stats: { value: string; label: string }[] };

export type Beat = {
  id: string;
  /** Workflow state this beat runs inside. */
  state: string;
  actor: Actor;
  /** Who or what is acting, shown as the beat's byline. */
  by: string;
  title: string;
  detail: string;
  payload?: Payload;
  /**
   * A consequential decision. The workflow stops here until a human acts --
   * in every autonomy mode, including Autopilot.
   */
  gate?: {
    prompt: string;
    approveLabel: string;
    /** Offering a comment triggers the revision beat instead of advancing. */
    commentLabel?: string;
  };
  audit: { action: string; actor: string };
};

export const REQUEST_TEXT =
  "Hire a Data Scientist, 4+ years, Python / SQL / ML / AWS, Bengaluru, approved band INR 20-26 LPA.";

/**
 * The revision beat is held outside the main sequence: it only plays when the
 * approver sends a comment back, then returns to the approval gate.
 */
export const REVISION_BEAT: Beat = {
  id: "revise",
  state: "JD_APPROVAL",
  actor: "ai",
  by: "JD Agent",
  title: "Comment received. JD revised.",
  detail:
    "The comment is applied against approved knowledge, a new version is written, and the approval request is reissued. The agent still cannot publish.",
  payload: {
    kind: "revision",
    comment:
      "Add the internal L3 competency framework and drop the years-of-experience line.",
    changes: [
      "v2: competency framework for L3 Data Scientist inserted",
      "v2: fixed-tenure requirement removed",
      "v2: approval request reissued to the same approver",
    ],
  },
  audit: { action: "JD revised to v2 from approver comment", actor: "JD Agent" },
};

export const BEATS: Beat[] = [
  {
    id: "request",
    state: "REQUISITION_DRAFT",
    actor: "human",
    by: "Hiring manager",
    title: "A hiring request, in plain language",
    detail:
      "No form with thirty fields. The manager writes what they need the way they would say it to a recruiter.",
    payload: { kind: "request", text: REQUEST_TEXT },
    audit: { action: "Requisition request submitted", actor: "Hiring manager" },
  },
  {
    id: "structure",
    state: "REQUISITION_DRAFT",
    actor: "ai",
    by: "Requisition Agent",
    title: "Understood and structured",
    detail:
      "The request becomes structured requirements the rest of the system can reason about deterministically.",
    payload: {
      kind: "structured",
      fields: [
        { label: "Role", value: "Data Scientist" },
        { label: "Level", value: "L3" },
        { label: "Location", value: "Bengaluru" },
        { label: "Experience", value: "4+ years" },
        { label: "Competencies", value: "Python · SQL · ML · AWS" },
        { label: "Band requested", value: "INR 20–26 LPA" },
      ],
    },
    audit: {
      action: "Requisition structured into 6 fields",
      actor: "Requisition Agent",
    },
  },
  {
    id: "retrieve",
    state: "REQUISITION_DRAFT",
    actor: "system",
    by: "Company hiring memory",
    title: "Your company's knowledge, retrieved",
    detail:
      "Permission-aware retrieval returns only what this manager is allowed to see. This is the difference between a generic JD and the JD your company would have approved.",
    payload: {
      kind: "knowledge",
      docs: [
        {
          name: "Approved JD template — Data Science",
          meta: "v4 · approved 11 Mar · owner: Talent Ops",
        },
        {
          name: "L3 competency framework",
          meta: "v2 · approved 02 Feb · owner: Engineering",
        },
        {
          name: "Compensation policy — India, FY26",
          meta: "v7 · approved 01 Apr · owner: Total Rewards",
        },
      ],
    },
    audit: {
      action: "3 approved documents retrieved (permission-scoped)",
      actor: "Retrieval service",
    },
  },
  {
    id: "draft",
    state: "REQUISITION_DRAFT",
    actor: "ai",
    by: "JD Agent",
    title: "JD drafted — and it cannot publish itself",
    detail:
      "The draft is grounded in retrieved company knowledge. The agent holds write access to a draft and nothing else.",
    payload: {
      kind: "jd",
      heading: "Data Scientist, L3 — Bengaluru",
      lines: [
        "Own model development for the pricing and recommendations surface.",
        "Ship production ML with measured business outcomes.",
        "Partner with data engineering on pipeline and feature quality.",
        "Competencies assessed: Python, SQL, Machine Learning, AWS, System Design.",
      ],
      restriction: "Tool permission: write JD draft · cannot publish",
    },
    audit: {
      action: "JD draft v1 generated · model + prompt version recorded",
      actor: "JD Agent",
    },
  },
  {
    id: "policy",
    state: "JD_APPROVAL",
    actor: "policy",
    by: "Policy engine",
    title: "Deterministic validation, before any human is asked",
    detail:
      "Not a model judgement. Rules, evaluated the same way every time, with the offending rule cited by name.",
    payload: {
      kind: "policy",
      checks: [
        {
          rule: "COMP-014 · Band within approved range for level",
          result: "block",
          detail:
            "Requested INR 20–26 LPA exceeds the approved L3 ceiling of INR 25 LPA. Upper bound clamped to 25; exception routed to Total Rewards.",
        },
        {
          rule: "PROC-002 · Required interview rounds defined",
          result: "pass",
          detail: "4 rounds configured for L3 Data Science.",
        },
        {
          rule: "AUTH-007 · Requester may open this requisition",
          result: "pass",
          detail: "Manager holds hiring authority for this cost centre.",
        },
        {
          rule: "JD-003 · JD grounded in approved template",
          result: "pass",
          detail: "Derived from Data Science template v4.",
        },
      ],
    },
    audit: {
      action: "4 policy rules evaluated · 1 exception prevented (COMP-014)",
      actor: "Policy engine",
    },
  },
  {
    id: "approve-jd",
    state: "JD_APPROVAL",
    actor: "human",
    by: "Hiring manager",
    title: "The first gate belongs to a person",
    detail:
      "Approve or comment, in Teams, Slack or email. The workflow cannot leave this state without a recorded human decision.",
    gate: {
      prompt: "JD v1 and the clamped band are ready for your decision.",
      approveLabel: "Approve JD",
      commentLabel: "Send a comment",
    },
    audit: { action: "JD approved by hiring manager", actor: "Hiring manager" },
  },
  {
    id: "publish",
    state: "JOB_POSTING",
    actor: "system",
    by: "Job Distribution",
    title: "Published through the systems you already run",
    detail:
      "The connector writes to your ATS, which stays the system of record. We orchestrate; we do not replace.",
    payload: {
      kind: "posting",
      channels: [
        { name: "ATS — requisition created", ref: "REQ-4471" },
        { name: "Careers site", ref: "live" },
        { name: "Job board partner", ref: "queued" },
      ],
    },
    audit: {
      action: "Job published to ATS REQ-4471 + 2 channels",
      actor: "Job Distribution",
    },
  },
  {
    id: "screen",
    state: "SCREENING",
    actor: "ai",
    by: "Candidate Intelligence",
    title: "Every application read, against the approved competencies",
    detail:
      "Coverage no recruiter has hours for. Extraction runs behind a content boundary, because a resume is untrusted input and never gets to instruct the agent.",
    payload: {
      kind: "screening",
      stats: [
        { value: "254", label: "Applications" },
        { value: "254", label: "Evidence-extracted" },
        { value: "9", label: "Meet approved bar" },
        { value: "0", label: "Auto-rejected" },
      ],
    },
    audit: {
      action: "254 applications evaluated · 0 auto-rejected",
      actor: "Candidate Intelligence",
    },
  },
  {
    id: "shortlist",
    state: "SHORTLIST_REVIEW",
    actor: "human",
    by: "Hiring manager",
    title: "Evidence, not a score",
    detail:
      "The gap is surfaced for an interviewer to validate rather than averaged away into a number nobody can defend.",
    payload: {
      kind: "evidence",
      rows: [
        {
          competency: "Python",
          evidence: "Production development and shipped project evidence",
          assessment: "Strong",
        },
        {
          competency: "SQL",
          evidence: "Analytics and data-engineering work across two roles",
          assessment: "Strong",
        },
        {
          competency: "Machine Learning",
          evidence: "Production ML projects with measured outcomes",
          assessment: "Very strong",
        },
        {
          competency: "AWS",
          evidence: "Cloud deployment and infrastructure experience",
          assessment: "Strong",
        },
        {
          competency: "System Design",
          evidence: "No direct architecture evidence in the record",
          assessment: "Gap to validate",
        },
      ],
      recommendation: "Proceed to next round",
      reason:
        "Strong evidence against four of five approved competencies. The System Design gap is flagged for interviewer validation.",
    },
    gate: {
      prompt: "Candidate 3 of 9 · recommendation is advisory, the call is yours.",
      approveLabel: "Shortlist candidate",
    },
    audit: {
      action: "Candidate shortlisted by hiring manager",
      actor: "Hiring manager",
    },
  },
  {
    id: "complete",
    state: "INTERVIEW_SCHEDULING",
    actor: "system",
    by: "HireOS",
    title: "One request. One governed workflow.",
    detail:
      "Requisition to approved shortlist, with every AI action and every human decision recorded. V2 picks this up at scheduling.",
    payload: {
      kind: "complete",
      stats: [
        { value: "2", label: "Human decisions" },
        { value: "9", label: "Recorded AI actions" },
        { value: "1", label: "Policy exception prevented" },
        { value: "0", label: "Black-box scores" },
      ],
    },
    audit: {
      action: "Workflow advanced to INTERVIEW_SCHEDULING",
      actor: "Workflow engine",
    },
  },
];

/** How fast non-gated beats advance, per autonomy mode. */
export const MODE_TIMING: Record<AutonomyMode, number> = {
  Copilot: 0, // 0 means never auto-advance: the human executes every step.
  Assisted: 2600,
  Autopilot: 1500,
};

export const MODE_NOTE: Record<AutonomyMode, string> = {
  Copilot:
    "AI recommends, you execute. Nothing moves without your click — including the steps a policy rule would happily allow.",
  Assisted:
    "AI prepares each action and advances the low-risk ones. Consequential decisions wait for you. This is where the product lives.",
  Autopilot:
    "AI executes low-risk actions inside policy, faster. The consequential gates still stop — autonomy is granted per action, never over a hiring decision.",
};
