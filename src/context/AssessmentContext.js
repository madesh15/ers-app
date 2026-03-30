// ─── ASSESSMENT CONTEXT ───────────────────────────────────────────────────────
// Global state manager for the entire Election Readiness Scorer application.
// Covers: phase routing, answers, scoring, lead capture, simulation state.

import React, { createContext, useContext, useReducer, useCallback } from "react";
import { resolveActiveQuestions, calculateScore } from "../utils/scoring";
import { QUESTIONS } from "../data/questions";

// ─── Shuffle Utility ──────────────────────────────────────────────
const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const getCoreIds = () => QUESTIONS.filter(q => q.type === "core").map(q => q.id);

// ─── Phases ──────────────────────────────────────────────────────
export const PHASES = {
  LANDING:    "landing",
  ASSESSMENT: "assessment",
  RESULTS:    "results",
  SIMULATOR:  "simulator",
};

// ─── Initial state ────────────────────────────────────────────────
const initialState = {
  phase: PHASES.LANDING,

  // Assessment
  selectedDomainId: null,      // null means "all domains"
  answers: {},                 // { [questionId]: { value, toggleBonus? } }
  currentQuestionIndex: 0,
  activeQuestions: [],         // resolved dynamically as answers come in
  microCopy: null,             // contextual string shown above adaptive questions

  // Scoring (computed)
  scoreResult: null,           // { score, tier, domainScores, ... }

  // Lead capture
  lead: { name: "", email: "", county: "", state: "", title: "" },
  leadCaptured: false,

  // Simulator
  simAnswers: {},              // overrides applied in simulator
  simScoreResult: null,        // computed from answers + simAnswers
  appliedSuggestions: new Set(),  // set of suggestion IDs toggled on
  shuffledCoreIds: [],         // randomized order of core questions
};

// ─── Action types ─────────────────────────────────────────────────
const A = {
  SET_PHASE:            "SET_PHASE",
  SET_ANSWER:           "SET_ANSWER",
  SET_QUESTION_INDEX:   "SET_QUESTION_INDEX",
  SET_ACTIVE_QUESTIONS: "SET_ACTIVE_QUESTIONS",
  SET_MICRO_COPY:       "SET_MICRO_COPY",
  SET_SCORE_RESULT:     "SET_SCORE_RESULT",
  UPDATE_LEAD:          "UPDATE_LEAD",
  SET_LEAD_CAPTURED:    "SET_LEAD_CAPTURED",
  INIT_SIMULATOR:       "INIT_SIMULATOR",
  TOGGLE_SUGGESTION:    "TOGGLE_SUGGESTION",
  APPLY_TEMPLATE:       "APPLY_TEMPLATE",
  SET_DOMAIN:           "SET_DOMAIN",
  RESET:                "RESET",
};

// ─── Reducer ──────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {

    case A.SET_PHASE:
      return { ...state, phase: action.payload };

    case A.SET_ANSWER: {
      const newAnswers = { ...state.answers, [action.payload.id]: action.payload.answer };
      const activeQuestions = resolveActiveQuestions(newAnswers, state.shuffledCoreIds, state.selectedDomainId);
      const scoreResult = calculateScore(newAnswers, activeQuestions);
      return {
        ...state,
        answers: newAnswers,
        activeQuestions,
        scoreResult,
      };
    }

    case A.SET_QUESTION_INDEX:
      return { ...state, currentQuestionIndex: action.payload };

    case A.SET_ACTIVE_QUESTIONS:
      return { ...state, activeQuestions: action.payload };

    case A.SET_MICRO_COPY:
      return { ...state, microCopy: action.payload };

    case A.SET_SCORE_RESULT:
      return { ...state, scoreResult: action.payload };

    case A.UPDATE_LEAD:
      return { ...state, lead: { ...state.lead, ...action.payload } };

    case A.SET_LEAD_CAPTURED:
      return { ...state, leadCaptured: action.payload };

    case A.INIT_SIMULATOR: {
      // Clone the original answers as the starting point for simulation
      const simAnswers = { ...state.answers };
      const activeQuestions = resolveActiveQuestions(simAnswers, state.shuffledCoreIds, state.selectedDomainId);
      const simScoreResult = calculateScore(simAnswers, activeQuestions);
      return {
        ...state,
        simAnswers,
        simScoreResult,
        appliedSuggestions: new Set(),
        phase: PHASES.SIMULATOR,
      };
    }

    case A.TOGGLE_SUGGESTION: {
      const { suggestion, questions } = action.payload;
      const newApplied = new Set(state.appliedSuggestions);
      let newSimAnswers = { ...state.simAnswers };

      if (newApplied.has(suggestion.id)) {
        // Remove — revert to original answer
        newApplied.delete(suggestion.id);
        newSimAnswers[suggestion.qId] = state.answers[suggestion.qId];
      } else {
        // Apply — set new value
        newApplied.add(suggestion.id);
        newSimAnswers[suggestion.qId] = { value: suggestion.newValue };
      }

      const activeQuestions = resolveActiveQuestions(newSimAnswers, state.shuffledCoreIds, state.selectedDomainId);
      const simScoreResult = calculateScore(newSimAnswers, activeQuestions);

      return {
        ...state,
        simAnswers: newSimAnswers,
        simScoreResult,
        appliedSuggestions: newApplied,
      };
    }

    case A.APPLY_TEMPLATE: {
      const { suggestions } = action.payload;
      const newApplied = new Set(state.appliedSuggestions);
      let newSimAnswers = { ...state.simAnswers };

      for (const s of suggestions) {
        newApplied.add(s.id);
        newSimAnswers[s.qId] = { value: s.newValue };
      }

      const activeQuestions = resolveActiveQuestions(newSimAnswers, state.shuffledCoreIds, state.selectedDomainId);
      const simScoreResult = calculateScore(newSimAnswers, activeQuestions);

      return {
        ...state,
        simAnswers: newSimAnswers,
        simScoreResult,
        appliedSuggestions: newApplied,
      };
    }

    case A.SET_DOMAIN: {
      const domainId = action.payload;
      const activeQuestions = resolveActiveQuestions({}, state.shuffledCoreIds, domainId);
      return {
        ...state,
        selectedDomainId: domainId,
        activeQuestions,
        currentQuestionIndex: 0,
        phase: PHASES.ASSESSMENT,
      };
    }

    case A.RESET: {
      const shuffled = shuffleArray(getCoreIds());
      return { 
        ...initialState, 
        shuffledCoreIds: shuffled,
        activeQuestions: resolveActiveQuestions({}, shuffled, null) 
      };
    }

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────
const AssessmentContext = createContext(null);

export function AssessmentProvider({ children }) {
  const initialShuffled = shuffleArray(getCoreIds());
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    shuffledCoreIds: initialShuffled,
    activeQuestions: resolveActiveQuestions({}, initialShuffled),
  });

  // ── Action creators ──
  const setPhase = useCallback((phase) =>
    dispatch({ type: A.SET_PHASE, payload: phase }), []);

  const setAnswer = useCallback((id, answer) =>
    dispatch({ type: A.SET_ANSWER, payload: { id, answer } }), []);

  const setQuestionIndex = useCallback((idx) =>
    dispatch({ type: A.SET_QUESTION_INDEX, payload: idx }), []);

  const setMicroCopy = useCallback((copy) =>
    dispatch({ type: A.SET_MICRO_COPY, payload: copy }), []);

  const updateLead = useCallback((fields) =>
    dispatch({ type: A.UPDATE_LEAD, payload: fields }), []);

  const setLeadCaptured = useCallback((val) =>
    dispatch({ type: A.SET_LEAD_CAPTURED, payload: val }), []);

  const initSimulator = useCallback(() =>
    dispatch({ type: A.INIT_SIMULATOR }), []);

  const toggleSuggestion = useCallback((suggestion) =>
    dispatch({ type: A.TOGGLE_SUGGESTION, payload: { suggestion } }), []);

  const applyTemplate = useCallback((suggestions) =>
    dispatch({ type: A.APPLY_TEMPLATE, payload: { suggestions } }), []);

  const setDomain = useCallback((domainId) =>
    dispatch({ type: A.SET_DOMAIN, payload: domainId }), []);

  const reset = useCallback(() =>
    dispatch({ type: A.RESET }), []);

  const value = {
    ...state,
    setPhase,
    setAnswer,
    setQuestionIndex,
    setMicroCopy,
    updateLead,
    setLeadCaptured,
    initSimulator,
    toggleSuggestion,
    applyTemplate,
    setDomain,
    reset,
  };

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
}

export const useAssessment = () => {
  const ctx = useContext(AssessmentContext);
  if (!ctx) throw new Error("useAssessment must be used within AssessmentProvider");
  return ctx;
};
