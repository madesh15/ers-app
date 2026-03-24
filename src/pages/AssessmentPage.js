import React, { useState, useCallback, useRef } from "react";
import { useAssessment, PHASES } from "../context/AssessmentContext";
import { getMicroCopy } from "../utils/scoring";
import { getDomain } from "../data/domains";
import QuestionCard from "../components/assessment/QuestionCard";
import DomainTransition from "../components/assessment/DomainTransition";
import { useKeyboardNav } from "../hooks/useKeyboardNav";
import { useScrollTop } from "../hooks/useScrollTop";

export default function AssessmentPage() {
  const {
    answers,
    activeQuestions,
    currentQuestionIndex,
    setAnswer,
    setQuestionIndex,
    setPhase,
    reset,
  } = useAssessment();

  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("forward");
  const prevDomainRef = useRef(null);

  const currentQ = activeQuestions[currentQuestionIndex];
  const currentAnswer = currentQ ? answers[currentQ.id] : null;
  const canProceed = !!currentAnswer;
  const isLastQuestion = currentQuestionIndex === activeQuestions.length - 1;
  const progress = activeQuestions.length > 0
    ? (Object.keys(answers).length / activeQuestions.length) * 100
    : 0;

  const domain = currentQ ? getDomain(currentQ.domain) : null;
  const microCopy = currentQ ? getMicroCopy(currentQ, answers) : null;

  useScrollTop(currentQuestionIndex);

  const navigate = (newIndex, instant = false) => {
    if (animating) return;
    if (activeQuestions[newIndex]) prevDomainRef.current = currentQ?.domain ?? null;
    
    if (instant) {
      setQuestionIndex(newIndex);
    } else {
      setAnimating(true);
      setTimeout(() => {
        setQuestionIndex(newIndex);
        setAnimating(false);
      }, 160);
    }
  };

  const handleNext = () => {
    if (!canProceed) return;
    if (isLastQuestion) {
      setPhase(PHASES.RESULTS);
    } else {
      setDirection("forward");
      navigate(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex === 0) {
      reset();
      setPhase(PHASES.LANDING);
    } else {
      setDirection("back");
      navigate(currentQuestionIndex - 1, true);
    }
  };

  const handleSelectIndex = useCallback((idx) => {
    if (!currentQ) return;
    const opt = currentQ.options?.[idx];
    if (opt) setAnswer(currentQ.id, { value: opt.value });
  }, [currentQ, setAnswer]);

  useKeyboardNav({
    onNext: canProceed ? handleNext : undefined,
    onBack: handleBack,
    onSelectIndex: handleSelectIndex,
    enabled: true,
  });

  if (!currentQ) return null;

  return (
    <div style={{
      minHeight: "calc(100vh - 64px)",
      display: "flex",
      flexDirection: "column",
      maxWidth: 680,
      margin: "0 auto",
      width: "100%",
      padding: "0 20px",
    }}>


      {/* Top: counter + progress */}
      <div style={{ paddingTop: 28, paddingBottom: 8 }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}>
          <span style={{
            fontSize: 13,
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
          }}>
            {currentQuestionIndex + 1} / {activeQuestions.length}
          </span>

          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "3px 10px",
            background: domain ? `rgba(${domain.colorRgb}, 0.1)` : "transparent",
            border: domain ? `1px solid rgba(${domain.colorRgb}, 0.2)` : "none",
            borderRadius: 99,
            fontSize: 12,
            color: domain?.color || "var(--text-muted)",
            fontWeight: 600,
          }}>
            <span>{domain?.icon}</span>
            <span>{domain?.shortName}</span>
            {currentQ.type === "adaptive" && (
              <span style={{
                fontSize: 10,
                color: "#a78bfa",
                fontFamily: "var(--font-mono)",
                marginLeft: 2,
              }}>
                ADAPTIVE
              </span>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          height: 4,
          background: "var(--border)",
          borderRadius: 2,
          overflow: "hidden",
        }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: domain ? domain.color : "var(--accent-blue)",
            borderRadius: 2,
            transition: "width 0.4s ease",
          }} />
        </div>
      </div>

      {/* Question area */}
      <div style={{
        flex: 1,
        paddingTop: 28,
        paddingBottom: 12,
        opacity: animating ? 0 : 1,
        transform: animating
          ? direction === "forward" ? "translateY(10px)" : "translateY(-10px)"
          : "translateY(0)",
        transition: "opacity 0.16s ease, transform 0.16s ease",
      }}>
        <QuestionCard
          question={currentQ}
          answer={currentAnswer}
          onAnswer={setAnswer}
          microCopy={microCopy}
        />
      </div>

      {/* Navigation */}
      <div style={{ paddingBottom: 32, display: "flex", gap: 10 }}>
        <button
          onClick={handleBack}
          style={{
            flex: 1,
            padding: "13px",
            background: "var(--bg-card-hover)",
            border: "1px solid var(--border)",
            borderRadius: 10,
            color: "var(--text-secondary)",
            fontSize: 14,
            fontFamily: "var(--font-body)",
            cursor: "pointer",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--border)"}
          onMouseLeave={e => e.currentTarget.style.background = "var(--bg-card-hover)"}
        >
          ← {currentQuestionIndex === 0 ? "Exit" : "Back"}
        </button>

        <button
          onClick={handleNext}
          disabled={!canProceed}
          style={{
            flex: 2,
            padding: "13px",
            background: canProceed
              ? "var(--accent-blue)"
              : "var(--bg-card-hover)",
            border: "1px solid var(--border)",
            borderRadius: 10,
            color: canProceed ? "#fff" : "var(--text-muted)",
            fontSize: 15,
            fontWeight: 700,
            fontFamily: "var(--font-display)",
            cursor: canProceed ? "pointer" : "not-allowed",
            letterSpacing: "-0.01em",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={e => { if (canProceed) e.currentTarget.style.opacity = "0.85"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
        >
          {isLastQuestion ? "View My Results →" : "Continue →"}
        </button>
      </div>

      {/* Keyboard shortcut hint */}
      <div style={{
        textAlign: "center",
        paddingBottom: 24,
        fontSize: 11,
        color: "var(--text-muted)",
        fontFamily: "var(--font-mono)",
        opacity: 0.55,
      }}>
        <kbd style={{ padding: "1px 5px", border: "1px solid var(--border)", borderRadius: 4, marginRight: 4 }}>Enter</kbd>
        to continue
        {(currentQ.interaction === "cards" || currentQ.interaction === "scenario") && (
          <>
            {" "}·{" "}
            <kbd style={{ padding: "1px 5px", border: "1px solid var(--border)", borderRadius: 4, margin: "0 4px" }}>
              1–{currentQ.options?.length || 4}
            </kbd>
            to select option
          </>
        )}
      </div>
    </div>
  );
}
