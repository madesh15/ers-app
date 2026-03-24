// ─── SCORING ENGINE ───────────────────────────────────────────────────────────
// Source: Section 6 — Scoring & Analytics Logic
// Handles: adaptive question resolution, weighted scoring, penalty modifiers,
//          domain breakdown, and tier assignment.

import { QUESTIONS, getQuestion } from "../data/questions";
import { DOMAINS } from "../data/domains";
import { TIERS, PENALTY_RULES, getTier } from "../data/tiers";

// ─── Resolve active question list ────────────────────────────────
// Starts from core questions and appends adaptive questions based on answers.
// Returns ordered array of question objects that the user should see.
export function resolveActiveQuestions(answers = {}, shuffledIds = null) {
  const core = QUESTIONS.filter((q) => q.type === "core");
  
  if (shuffledIds && shuffledIds.length > 0) {
    // Map the shuffled IDs back to question objects
    return shuffledIds
      .map(id => core.find(q => q.id === id))
      .filter(Boolean);
  }
  
  return core;
}

// ─── Micro-copy resolver ─────────────────────────────────────────
// Returns the micro-copy string to show when entering an adaptive question
export function getMicroCopy(question, answers) {
  if (question.type !== "adaptive") return null;

  // Find the parent that triggered this adaptive question
  for (const q of QUESTIONS) {
    const answer = answers[q.id];
    if (!answer) continue;

    const checkTrigger = (trigger) => {
      if (!trigger) return null;
      const { triggerValues, unlocks, microCopy } = trigger;
      if (triggerValues.includes(answer.value) && unlocks.includes(question.id)) {
        return microCopy || "Based on your answer — let's dig deeper";
      }
      return null;
    };

    const copy =
      checkTrigger(q.adaptiveTrigger) || checkTrigger(q.adaptiveTriggerAlt);
    if (copy) return copy;
  }

  return "Based on your previous answer — let's go deeper here";
}

// ─── Calculate raw score for a single question answer ─────────────
function questionRawScore(question, answer) {
  if (!answer || !answer.value) return 0;
  const opt = question.options.find((o) => o.value === answer.value);
  if (!opt) return 0;
  let pts = opt.pts;
  if (answer.toggleBonus) pts += answer.toggleBonus;
  return pts;
}

// ─── Apply penalty modifiers ──────────────────────────────────────
function calcPenalties(answers) {
  let totalPenalty = 0;
  for (const rule of PENALTY_RULES) {
    for (const trigger of rule.triggerQuestionValues) {
      const ans = answers[trigger.qId];
      if (ans && trigger.values.includes(ans.value)) {
        totalPenalty += rule.penalty;
        break; // only apply each rule once
      }
    }
  }
  return totalPenalty;
}

// ─── Per-domain score breakdown ───────────────────────────────────
function calcDomainScores(answers, activeQuestions) {
  const map = {};

  for (const domain of DOMAINS) {
    map[domain.id] = {
      id: domain.id,
      name: domain.name,
      shortName: domain.shortName,
      icon: domain.icon,
      color: domain.color,
      colorRgb: domain.colorRgb,
      premium: domain.premium || false,
      earned: 0,
      maxPossible: 0,
      percentage: 0,
      questions: [],
    };
  }

  for (const q of activeQuestions) {
    const ds = map[q.domain];
    if (!ds) continue;

    const ans = answers[q.id];
    const maxForQ = q.points + (q.toggleBonus || 0);
    const earnedForQ = ans ? Math.max(0, questionRawScore(q, ans)) : 0;

    ds.maxPossible += maxForQ;
    ds.earned += earnedForQ;
    ds.questions.push({
      id: q.id,
      text: q.text,
      type: q.type,
      maxPts: maxForQ,
      earnedPts: earnedForQ,
      answered: !!ans,
    });
  }

  for (const ds of Object.values(map)) {
    ds.percentage =
      ds.maxPossible > 0 ? Math.round((ds.earned / ds.maxPossible) * 100) : 0;
  }

  return map;
}

// ─── MAIN SCORING FUNCTION ────────────────────────────────────────
export function calculateScore(answers = {}, activeQuestions = null) {
  const questions =
    activeQuestions || resolveActiveQuestions(answers);

  let rawTotal = 0;
  let maxPossible = 0;

  for (const q of questions) {
    const ans = answers[q.id];
    const maxForQ = q.points + (q.toggleBonus || 0);
    maxPossible += maxForQ;
    if (ans) rawTotal += questionRawScore(q, ans);
  }

  const penalties = calcPenalties(answers);
  const adjustedRaw = rawTotal + penalties; // penalties are negative

  // Normalize to 0–100
  const normalizedScore =
    maxPossible > 0
      ? Math.max(0, Math.min(100, Math.round((adjustedRaw / maxPossible) * 100)))
      : 0;

  const tier = getTier(normalizedScore);
  const domainScores = calcDomainScores(answers, questions);

  return {
    score: normalizedScore,
    rawTotal,
    penalties,
    adjustedRaw,
    maxPossible,
    tier,
    domainScores,
    questionsAnswered: questions.filter((q) => !!answers[q.id]).length,
    totalQuestions: questions.length,
  };
}

// ─── Low-scoring domain detection ────────────────────────────────
// Returns domains where the user scored < threshold (default 50%)
export function getLowScoringDomains(domainScores, threshold = 0.5) {
  return Object.values(domainScores).filter(
    (ds) => ds.maxPossible > 0 && ds.earned / ds.maxPossible < threshold
  );
}

// ─── Absentee risk check ─────────────────────────────────────────
export function isAbsenteeHighRisk(domainScores) {
  const d6 = domainScores[6];
  return d6 && d6.maxPossible > 0 && d6.earned / d6.maxPossible < 0.5;
}

// ─── Score comparison delta ───────────────────────────────────────
export function scoreDelta(original, simulated) {
  return simulated.score - original.score;
}

export { getTier, TIERS };
