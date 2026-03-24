import React from "react";
import { getDomain } from "../../data/domains";

export default function SuggestionToggle({ suggestion, isApplied, isRelevant, onToggle }) {
  const domain = getDomain(suggestion.domain);

  return (
    <div style={{
      background: "var(--bg-card)",
      border: isApplied
        ? `1px solid rgba(${domain.colorRgb},0.4)`
        : "1px solid var(--border)",
      borderRadius: "var(--radius-md)",
      padding: "16px 18px",
      opacity: isRelevant ? 1 : 0.42,
      transition: "all 0.2s",
      background: isApplied
        ? `rgba(${domain.colorRgb},0.05)`
        : "var(--bg-card)",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}>
        {/* Left content */}
        <div style={{ flex: 1 }}>
          {/* Domain + product tag */}
          <div style={{
            display: "flex", alignItems: "center", gap: 6, marginBottom: 6,
          }}>
            <span style={{ fontSize: 14 }}>{domain.icon}</span>
            <span style={{
              fontSize: 11, fontWeight: 600, color: domain.color,
              fontFamily: "var(--font-mono)",
            }}>
              {domain.shortName}
            </span>
            <span style={{
              fontSize: 10,
              color: "var(--text-muted)",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 4,
              padding: "1px 6px",
              fontFamily: "var(--font-mono)",
            }}>
              {suggestion.product}
            </span>
            {!isRelevant && (
              <span style={{
                fontSize: 10, color: "var(--text-muted)",
                border: "1px solid var(--border)",
                borderRadius: 4, padding: "1px 6px",
                fontFamily: "var(--font-mono)",
              }}>
                Not applicable
              </span>
            )}
          </div>

          {/* Suggestion label */}
          <div style={{
            fontWeight: 600, fontSize: 14,
            color: "var(--text-primary)",
            marginBottom: 5,
          }}>
            What if: {suggestion.suggestionLabel}
          </div>

          {/* Impact row */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 700, fontSize: 13,
              color: "#10b981",
            }}>
              {suggestion.impactPts}
            </span>
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
              {suggestion.impactDetail}
            </span>
          </div>
        </div>

        {/* Toggle switch */}
        <button
          onClick={() => isRelevant && onToggle(suggestion)}
          disabled={!isRelevant}
          style={{
            width: 52, height: 28,
            borderRadius: 14,
            background: isApplied ? domain.color : "rgba(255,255,255,0.08)",
            border: "none",
            cursor: isRelevant ? "pointer" : "not-allowed",
            position: "relative",
            transition: "background 0.22s",
            flexShrink: 0,
          }}
        >
          <div style={{
            position: "absolute",
            top: 3,
            left: isApplied ? 26 : 3,
            width: 22, height: 22,
            borderRadius: "50%",
            background: "#fff",
            transition: "left 0.22s",
            boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
          }} />
        </button>
      </div>
    </div>
  );
}
