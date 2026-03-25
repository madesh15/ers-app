import React from "react";
import { IMPACT } from "../../utils/constants";
import { fmtDelta, fmtScore, pluralise } from "../../utils/formatters";

// Source: Section 5 — Step 5: Impact Summary
export default function ImpactSummary({ originalScore, simScore, appliedCount }) {
  const delta = simScore - originalScore;
  if (delta <= 0 || appliedCount === 0) return null;

  const { min: hMin, max: hMax } = IMPACT.hoursSavedPerSuggestion;
  const { min: vMin, max: vMax } = IMPACT.annualValuePerSuggestion;

  const hoursMin  = Math.round(appliedCount * hMin);
  const hoursMax  = Math.round(appliedCount * hMax);
  const gapsElim  = Math.min(appliedCount * 2, 12);
  const valueMin  = Math.round((appliedCount * vMin) / 1000);
  const valueMax  = Math.round((appliedCount * vMax) / 1000);

  const metrics = [
    { label: "New Readiness Score", value: `${simScore}/100`, color: "#10b981", icon: "🎯" },
    { label: "Score Improvement",   value: `+${delta} pts`,   color: "#6366f1", icon: "📈" },
    { label: "Compliance Gaps Closed", value: `${gapsElim} gaps`, color: "#ef4444", icon: "🛡️" },
    { label: "Improvements Applied", value: `${appliedCount} changes`, color: "#8b5cf6", icon: "✅" },
  ];

  return (
    <div className="fade-up" style={{
      padding: "24px",
      background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(16,185,129,0.04))",
      border: "1px solid rgba(99,102,241,0.2)",
      borderRadius: "var(--radius-lg)",
    }}>
      <div style={{
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 16,
        color: "#a5b4fc",
        marginBottom: 18,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}>
        📊 Impact Summary
      </div>

      <div className="impact-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 10,
      }}>
        {metrics.map((m) => (
          <div
            key={m.label}
            className="count-anim"
            style={{
              padding: "14px 12px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 6 }}>{m.icon}</div>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: 17,
              color: m.color,
              lineHeight: 1,
              marginBottom: 5,
            }}>
              {m.value}
            </div>
            <div style={{
              fontSize: 11,
              color: "var(--text-muted)",
              lineHeight: 1.3,
            }}>
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
