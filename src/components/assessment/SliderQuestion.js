import React, { useRef } from "react";

export default function SliderQuestion({ question, value, onChange }) {
  const trackRef = useRef(null);
  const selectedIdx = value ? question.options.findIndex((o) => o.value === value) : -1;
  const count = question.options.length;

  const handleTrackClick = (e) => {
    const rect = trackRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const idx = Math.round(pct * (count - 1));
    onChange(question.options[idx].value);
  };

  const fillPct = selectedIdx >= 0 ? (selectedIdx / (count - 1)) * 100 : 0;

  return (
    <div>
      {/* Labels row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${count}, 1fr)`,
        gap: 4,
        marginBottom: 14,
      }}>
        {question.options.map((opt, i) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "center",
              padding: "6px 4px",
            }}
          >
            <div style={{
              fontSize: 12,
              fontWeight: selectedIdx === i ? 700 : 400,
              color: selectedIdx === i ? "var(--accent-blue)" : "var(--text-muted)",
              transition: "all 0.2s",
              lineHeight: 1.3,
            }}>
              {opt.label}
            </div>
          </button>
        ))}
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        onClick={handleTrackClick}
        style={{
          height: 8,
          background: "var(--border)",
          borderRadius: 4,
          cursor: "pointer",
          position: "relative",
        }}
      >
        {/* Fill */}
        <div style={{
          position: "absolute",
          left: 0, top: 0, bottom: 0,
          width: `${fillPct}%`,
          background: "linear-gradient(90deg, var(--accent-blue), var(--accent-indigo))",
          borderRadius: 4,
          transition: "width 0.3s ease",
        }} />

        {/* Thumb */}
        {selectedIdx >= 0 && (
          <div style={{
            position: "absolute",
            top: "50%",
            left: `${fillPct}%`,
            transform: "translate(-50%, -50%)",
            width: 20, height: 20,
            borderRadius: "50%",
            background: "var(--accent-blue)",
            border: "3px solid #fff",
            boxShadow: "0 0 12px rgba(59,130,246,0.5)",
            transition: "left 0.3s ease",
            pointerEvents: "none",
          }} />
        )}

        {/* Step dots */}
        {question.options.map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: `${(i / (count - 1)) * 100}%`,
              transform: "translate(-50%, -50%)",
              width: 4, height: 4,
              borderRadius: "50%",
              background: i <= selectedIdx ? "transparent" : "rgba(0,0,0,0.15)",
              pointerEvents: "none",
            }}
          />
        ))}
      </div>

      {/* Worst / Best labels */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        marginTop: 8, fontSize: 11, color: "var(--text-muted)",
        fontFamily: "var(--font-mono)",
      }}>
        <span>← Worst</span>
        <span>Best →</span>
      </div>
    </div>
  );
}
