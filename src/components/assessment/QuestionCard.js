import React from "react";
import { getDomain } from "../../data/domains";
import CardOption from "./CardOption";
import SliderQuestion from "./SliderQuestion";
import SliderToggleQuestion from "./SliderToggleQuestion";
import ProgressiveMicroCopy from "./ProgressiveMicroCopy";
import QuestionHint from "./QuestionHint";

export default function QuestionCard({ question, answer, onAnswer, microCopy, questionNumber, totalQuestions }) {
  const domain = getDomain(question.domain);

  const handleCardSelect = (value) => onAnswer(question.id, { value });
  const handleSliderChange = (value) => onAnswer(question.id, { value });
  const handleSliderToggleChange = (answerObj) => onAnswer(question.id, answerObj);

  return (
    <div className="fade-up" key={question.id}>
      {/* Domain badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "4px 12px",
          background: `rgba(${domain.colorRgb},0.1)`,
          border: `1px solid rgba(${domain.colorRgb},0.22)`,
          borderRadius: 99,
          fontSize: 12, fontWeight: 600,
          color: domain.color,
        }}>
          <span>{domain.icon}</span>
          <span>{domain.name}</span>
          {domain.premium && (
            <span style={{
              fontSize: 9, letterSpacing: 1,
              color: "#fb923c",
              fontFamily: "var(--font-mono)",
            }}>PREMIUM</span>
          )}
        </div>

        <span className={`badge ${question.type === "adaptive" ? "badge-adaptive" : "badge-core"}`}>
          {question.type === "adaptive" ? "ADAPTIVE" : "CORE"}
        </span>

        <span style={{
          marginLeft: "auto",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--text-muted)",
        }}>
          {question.points}{question.toggleBonus ? `+${question.toggleBonus}` : ""} pts
        </span>
      </div>

      {/* Micro-copy for adaptive questions */}
      {microCopy && <ProgressiveMicroCopy copy={microCopy} />}

      {/* Question text */}
      <h2 style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(18px, 3vw, 24px)",
        fontWeight: 700,
        lineHeight: 1.3,
        color: "var(--text-primary)",
        marginBottom: question.hint ? 8 : 26,
        letterSpacing: "-0.02em",
      }}>
        {question.text}
      </h2>

      {/* Optional hint — collapsible */}


      {/* ── Render interaction type ── */}
      {(question.interaction === "cards" || question.interaction === "scenario") && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {question.options.map((opt) => (
            <CardOption
              key={opt.value}
              option={opt}
              selected={answer?.value === opt.value}
              onSelect={handleCardSelect}
              variant={question.interaction === "scenario" ? "scenario" : "default"}
            />
          ))}
        </div>
      )}

      {question.interaction === "slider" && (
        <SliderQuestion
          question={question}
          value={answer?.value}
          onChange={handleSliderChange}
        />
      )}

      {question.interaction === "slider_toggle" && (
        <SliderToggleQuestion
          question={question}
          answer={answer}
          onChange={handleSliderToggleChange}
        />
      )}
    </div>
  );
}
