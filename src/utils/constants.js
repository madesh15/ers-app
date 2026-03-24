/**
 * Application-wide constants.
 * Single source of truth for thresholds, copy strings, and config.
 */

// ─── Scoring thresholds ───────────────────────────────────────────
export const ABSENTEE_RISK_THRESHOLD   = 0.5;   // Domain 6 pct < 50% → alert
export const LOW_DOMAIN_THRESHOLD      = 0.5;   // Any domain pct < 50% → flag
export const HIGH_DOMAIN_THRESHOLD     = 0.75;  // Any domain pct > 75% → strong

// ─── Assessment config ────────────────────────────────────────────
export const MIN_CORE_QUESTIONS   = 12;
export const MAX_CORE_QUESTIONS   = 15;
export const MIN_ADAPTIVE_QUESTIONS = 5;
export const MAX_ADAPTIVE_QUESTIONS = 8;
export const ESTIMATED_MINUTES   = "5–7";

// ─── Micro-copy bank ─────────────────────────────────────────────
// Source: Section 3 — Perceived Intelligence Through Micro-Copy
export const MICRO_COPY = {
  generic:         "Based on your answer — let's dig a bit deeper",
  deeper:          "Let's dig deeper into that",
  common_challenge:"This is where most counties face challenges",
  less_common:     "Interesting — that's less common. Tell us more",
  understanding:   "Got it — let's understand that setup a bit deeper",
  legal_depth:     "This is where compliance exposure typically starts — let's go deeper",
  asset_depth:     "L&A testing gaps are a leading cause of equipment failures — let's explore",
  support_depth:   "Let's understand how often this leads to issues falling through the cracks",
};

// ─── KPI targets ─────────────────────────────────────────────────
// Source: Section 9 — Success Metrics & KPIs
export const KPI_TARGETS = {
  assessmentCompletionRate: 0.75,   // 75%+
  emailCaptureRate:         0.65,   // 65%+
  simulatorEngagementRate:  0.50,   // 45–55%
  postSimulationConversion: 0.30,   // 25–35%
  leadToOpportunity:        0.30,   // 30%+
};

// ─── Impact estimates ─────────────────────────────────────────────
// Source: Section 5 — Impact Summary
export const IMPACT = {
  hoursSavedPerSuggestion: { min: 6, max: 10 },
  annualValuePerSuggestion: { min: 60000, max: 120000 },
  absenteeProcessingReduction: "40–70%",
  cureCycleReduction: "50%",
};

// ─── Product portfolio ────────────────────────────────────────────
// Source: Section 2 — Current Product Portfolio
export const PRODUCTS = [
  { id: "poll_worker",  name: "Poll Worker Management",   domain: 1 },
  { id: "asset_mgmt",  name: "Election Asset Management", domain: 2 },
  { id: "policy_ai",   name: "Policy AI",                 domain: 3 },
  { id: "support_iq",  name: "Support IQ",                domain: 4 },
  { id: "analytics",   name: "Analytics Hub",             domain: 5 },
  { id: "absentee",    name: "Absentee Ballot Portal",    domain: 6 },
];
