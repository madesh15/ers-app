import React from "react";
import SliderQuestion from "./SliderQuestion";

export default function SliderToggleQuestion({ question, answer, onChange }) {
  const value = answer?.value || null;
  const toggleBonus = answer?.toggleBonus || 0;

  const handleSliderChange = (newValue) => {
    onChange({ value: newValue, toggleBonus });
  };

  const handleToggle = () => {
    onChange({ value, toggleBonus: toggleBonus ? 0 : question.toggleBonus });
  };

  return (
    <div>
      <SliderQuestion
        question={question}
        value={value}
        onChange={handleSliderChange}
      />

      {/* Toggle row */}
      <div style={{
        marginTop: 20,
        padding: "14px 18px",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        display: "flex",
        alignItems: "center",
        gap: 12,
        cursor: "pointer",
      }} onClick={handleToggle}>
        {/* Toggle switch */}
        <div style={{
          width: 44, height: 24,
          borderRadius: 12,
          background: toggleBonus ? "var(--accent-blue)" : "var(--border-bright)",
          position: "relative",
          transition: "background 0.2s",
          flexShrink: 0,
        }}>
          <div style={{
            position: "absolute",
            top: 3,
            left: toggleBonus ? 22 : 3,
            width: 18, height: 18,
            borderRadius: "50%",
            background: "#fff",
            transition: "left 0.2s",
            boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
          }} />
        </div>

        <div>
          <div style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 500 }}>
            ☑ {question.toggleLabel}
          </div>
          <div style={{ fontSize: 11, color: "var(--accent-blue)", marginTop: 2, fontFamily: "var(--font-mono)" }}>
            +{question.toggleBonus} bonus point if enabled
          </div>
        </div>
      </div>
    </div>
  );
}
