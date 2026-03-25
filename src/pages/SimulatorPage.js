import React from "react";
import { useAssessment, PHASES } from "../context/AssessmentContext";
import { SIMULATOR_SUGGESTIONS } from "../data/simulator";
import PageWrapper from "../components/layout/PageWrapper";
import ScoreComparison from "../components/simulator/ScoreComparison";
import SuggestionToggle from "../components/simulator/SuggestionToggle";
import OptimizationTemplates from "../components/simulator/OptimizationTemplates";
import ImpactSummary from "../components/simulator/ImpactSummary";
import Footer from "../components/layout/Footer";
import { useToast } from "../components/ui/Toast";

export default function SimulatorPage() {
  const {
    answers,
    simAnswers,
    scoreResult,
    simScoreResult,
    appliedSuggestions,
    toggleSuggestion,
    applyTemplate,
    setPhase,
  } = useAssessment();

  const toast = useToast();

  if (!scoreResult || !simScoreResult) {
    return (
      <PageWrapper>
        <p style={{ color: "var(--text-muted)", textAlign: "center", marginTop: 80 }}>
          Complete the assessment first.{" "}
          <button onClick={() => setPhase(PHASES.LANDING)} className="btn btn-ghost" style={{ padding: "6px 14px", fontSize: 13 }}>
            Start Assessment
          </button>
        </p>
      </PageWrapper>
    );
  }

  const delta = simScoreResult.score - scoreResult.score;

  return (
    <>
      <PageWrapper maxWidth={860}>
        {/* ── Header ── */}
        <div className="fade-up" style={{ textAlign: "center", marginBottom: 12 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 14px",
            background: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.2)",
            borderRadius: 99,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "#f90b0bff",
            letterSpacing: "0.08em",
            marginBottom: 18,
          }}>
            🧪 WHAT IF IMPROVEMENT SIMULATOR
          </div>

          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(24px, 3.5vw, 36px)",
            fontWeight: 700,
            color: "var(--accent-blue)",
            letterSpacing: "-0.02em",
            marginBottom: 10,
          }}>
            Explore Your Potential Score
          </h1>

          <p style={{ fontSize: 14, color: "var(--text-muted)", maxWidth: 480, margin: "0 auto" }}>
            Toggle improvements below to see real-time score impact.
            Watch your tier change as you optimise each domain.
          </p>
        </div>

        {/* ── Navigation back ── */}
        <button
          onClick={() => setPhase(PHASES.RESULTS)}
          style={{
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
            fontSize: 13,
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          ← Back to Results
        </button>

        {/* ── Score comparison ── */}
        <div className="fade-up-1" style={{ marginBottom: 28 }}>
          <ScoreComparison
            originalResult={scoreResult}
            simResult={simScoreResult}
          />
        </div>

        {/* ── Impact summary (shows only when improvements applied) ── */}
        {appliedSuggestions.size > 0 && (
          <div style={{ marginBottom: 24 }}>
            <ImpactSummary
              originalScore={scoreResult.score}
              simScore={simScoreResult.score}
              appliedCount={appliedSuggestions.size}
            />
          </div>
        )}

        {/* ── Quick templates ── */}
        <div className="fade-up-2" style={{ marginBottom: 24 }}>
          <OptimizationTemplates
            answers={answers}
            onApplyTemplate={applyTemplate}
          />
        </div>

        {/* ── Suggestion toggles ── */}
        <div className="fade-up-2" style={{ marginBottom: 32 }}>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--accent-blue)",
            letterSpacing: "0.1em",
            marginBottom: 12,
          }}>
            AVAILABLE IMPROVEMENTS ({SIMULATOR_SUGGESTIONS.length} total)
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {SIMULATOR_SUGGESTIONS.map((s) => {
              const originalAnswer = answers[s.qId];
              const isRelevant = originalAnswer && s.triggerValues.includes(originalAnswer.value);
              const isApplied = appliedSuggestions.has(s.id);

              return (
                <SuggestionToggle
                  key={s.id}
                  suggestion={s}
                  isApplied={isApplied}
                  isRelevant={!!isRelevant}
                  onToggle={toggleSuggestion}
                />
              );
            })}
          </div>
        </div>



        {/* ── Reset ── */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => setPhase(PHASES.RESULTS)}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            ← Return to full results
          </button>
        </div>
      </PageWrapper>
    </>
  );
}
