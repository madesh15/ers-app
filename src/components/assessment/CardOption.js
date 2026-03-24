import React from "react";

export default function CardOption({ option, selected, onSelect, variant = "default" }) {
  const isScenario = variant === "scenario";

  return (
    <button
      onClick={() => onSelect(option.value)}
      style={{
        width: "100%",
        background: selected
          ? "rgba(59,130,246,0.12)"
          : "var(--bg-card)",
        border: selected
          ? "2px solid var(--accent-blue)"
          : "2px solid var(--border)",
        borderRadius: "var(--radius-md)",
        padding: isScenario ? "18px 20px" : "15px 18px",
        cursor: "pointer",
        textAlign: "left",
        color: selected ? "var(--accent-blue)" : "var(--text-secondary)",
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
        transition: "all 0.18s",
        transform: selected ? "scale(1.01)" : "scale(1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Selected glow */}
      {selected && (
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 0% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
      )}

      <span style={{ fontSize: isScenario ? 24 : 20, lineHeight: 1, flexShrink: 0, marginTop: 1 }}>
        {option.icon}
      </span>

      <div style={{ flex: 1 }}>
        <div style={{
          fontWeight: 600,
          fontSize: 14,
          lineHeight: 1.4,
          color: selected ? "var(--accent-blue)" : "var(--text-primary)",
        }}>
          {option.label}
        </div>
        {option.desc && (
          <div style={{
            fontSize: 12,
            color: "var(--text-muted)",
            marginTop: 3,
            lineHeight: 1.4,
          }}>
            {option.desc}
          </div>
        )}
      </div>

      {/* Checkmark */}
      <div style={{
        width: 22, height: 22,
        borderRadius: "50%",
        background: selected ? "var(--accent-blue)" : "transparent",
        border: selected ? "none" : "2px solid var(--border)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
        transition: "all 0.2s",
        marginTop: 1,
      }}>
        {selected && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
    </button>
  );
}
