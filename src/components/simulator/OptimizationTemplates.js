import React from "react";
import { OPTIMIZATION_TEMPLATES, SIMULATOR_SUGGESTIONS } from "../../data/simulator";

export default function OptimizationTemplates({ answers, onApplyTemplate }) {
  const handleApply = (template) => {
    const suggestions = template.suggestionIds
      .map((id) => SIMULATOR_SUGGESTIONS.find((s) => s.id === id))
      .filter(Boolean);
    onApplyTemplate(suggestions);
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--accent-blue)",
        letterSpacing: "0.1em",
        marginBottom: 10,
      }}>
        ⚡ QUICK OPTIMIZATION TEMPLATES
      </div>
      <div className="template-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {OPTIMIZATION_TEMPLATES.map((tmpl) => (
          <button
            key={tmpl.id}
            onClick={() => handleApply(tmpl)}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "14px 14px",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.18s",
              color: "var(--text-primary)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent-blue)";
              e.currentTarget.style.background = "rgba(59,130,246,0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.background = "var(--bg-card)";
            }}
          >
            <div style={{
              fontWeight: 700,
              fontSize: 13,
              marginBottom: 4,
              color: "var(--text-primary)",
            }}>
              {tmpl.label}
            </div>
            <div style={{
              fontSize: 11,
              color: "var(--text-muted)",
              marginBottom: 8,
              lineHeight: 1.4,
            }}>
              {tmpl.description}
            </div>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              fontWeight: 700,
              color: "#10b981",
            }}>
              {tmpl.estimatedGain}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
