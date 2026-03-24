// ─── TIER CLASSIFICATIONS ────────────────────────────────────────────────────
// Source: Section 6 — Scoring & Analytics Logic

export const TIERS = [
  {
    id: "reactive",
    name: "Operationally Reactive",
    scoreMin: 0,
    scoreMax: 40,
    color: "#EF4444",
    colorRgb: "239,68,68",
    bgColor: "rgba(239,68,68,0.06)",
    borderColor: "rgba(239,68,68,0.25)",
    emoji: "🔴",
    description: "Crisis-driven operations with significant risk exposure",
    urgency: "Immediate action required — your jurisdiction faces compounding risks.",
    ctaLabel: "Schedule Emergency Audit",
  },
  {
    id: "transitional",
    name: "Process Transitional",
    scoreMin: 41,
    scoreMax: 60,
    color: "#F59E0B",
    colorRgb: "245,158,11",
    bgColor: "rgba(245,158,11,0.06)",
    borderColor: "rgba(245,158,11,0.25)",
    emoji: "🟡",
    description: "Mixed systems; some automation but fragmented",
    urgency: "You have a foundation — targeted upgrades will unlock major efficiency gains.",
    ctaLabel: "Book Optimization Session",
  },
  {
    id: "optimized",
    name: "Strategically Optimized",
    scoreMin: 61,
    scoreMax: 80,
    color: "#3B82F6",
    colorRgb: "59,130,246",
    bgColor: "rgba(59,130,246,0.06)",
    borderColor: "rgba(59,130,246,0.25)",
    emoji: "🔵",
    description: "Strong processes with integrated systems",
    urgency: "Solid operations — a few targeted improvements will push you to Future-Ready.",
    ctaLabel: "See Your Growth Roadmap",
  },
  {
    id: "future_ready",
    name: "Future-Ready",
    scoreMin: 81,
    scoreMax: 100,
    color: "#10B981",
    colorRgb: "16,185,129",
    bgColor: "rgba(16,185,129,0.06)",
    borderColor: "rgba(16,185,129,0.25)",
    emoji: "🟢",
    description: "Best-in-class operations with full automation",
    urgency: "Excellent! Your jurisdiction sets the standard — let's maintain your edge.",
    ctaLabel: "Explore Advanced Features",
  },
];

export const getTier = (score) =>
  TIERS.find((t) => score >= t.scoreMin && score <= t.scoreMax) || TIERS[0];

// ─── PENALTY MODIFIERS ───────────────────────────────────────────────────────
// Source: Section 6 — Penalty Modifiers
// Applied on top of question points during score calculation

export const PENALTY_RULES = [
  {
    id: "manual_process",
    description: "Manual processes detected",
    penalty: -2,
    triggerQuestionValues: [
      { qId: "Q1",  values: ["manual"] },
      { qId: "Q4",  values: ["paper"] },
      { qId: "Q21", values: ["manual"] },
    ],
  },
  {
    id: "no_visibility",
    description: "No system visibility",
    penalty: -3,
    triggerQuestionValues: [
      { qId: "Q4",  values: ["paper"] },
      { qId: "Q12", values: ["none"] },
    ],
  },
  {
    id: "legal_delay_week",
    description: "Legal response delay > 1 week",
    penalty: -4,
    triggerQuestionValues: [
      { qId: "Q8", values: ["over_week"] },
    ],
  },
  {
    id: "no_breach_plan",
    description: "No incident response plan",
    penalty: -10,
    triggerQuestionValues: [],          // No cybersecurity in v2; kept for extensibility
  },
];
