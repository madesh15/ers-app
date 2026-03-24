import React from "react";
import ScoreGauge from "../ui/ScoreGauge";
import TierBadge from "../ui/TierBadge";

// Source: Section 5 — Step 4: Real-Time Score Update (47 → 78 etc.)
export default function ScoreComparison({ originalResult, simResult }) {
  const delta = simResult.score - originalResult.score;
  const deltaColor = delta > 0 ? "#10b981" : delta < 0 ? "#ef4444" : "var(--text-muted)";

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr auto 1fr",
      gap: 16,
      alignItems: "center",
    }}>
      {/* Original */}
      <div style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "28px 20px",
        textAlign: "center",
      }}>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "var(--text-muted)",
          letterSpacing: "0.12em",
          marginBottom: 16,
        }}>
          CURRENT SCORE
        </div>
        <ScoreGauge score={originalResult.score} size={130} animate={false} />
        <div style={{ marginTop: 14 }}>
          <TierBadge tier={originalResult.tier} size="sm" />
        </div>
      </div>

      {/* Delta */}
      <div style={{ textAlign: "center" }}>
        <div
          className="count-anim"
          key={delta}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 30,
            fontWeight: 900,
            color: deltaColor,
            lineHeight: 1,
          }}
        >
          {delta > 0 ? `+${delta}` : delta === 0 ? "—" : delta}
        </div>
        <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 4, fontFamily: "var(--font-mono)" }}>
          pts
        </div>
        <div style={{ fontSize: 22, marginTop: 10, color: "var(--text-muted)" }}>→</div>
      </div>

      {/* Simulated */}
      <div style={{
        background: delta > 0
          ? `rgba(${simResult.tier.colorRgb},0.06)`
          : "var(--bg-card)",
        border: delta > 0
          ? `1px solid rgba(${simResult.tier.colorRgb},0.25)`
          : "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "28px 20px",
        textAlign: "center",
        transition: "all 0.35s",
      }}>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "var(--text-muted)",
          letterSpacing: "0.12em",
          marginBottom: 16,
        }}>
          SIMULATED SCORE
        </div>
        <ScoreGauge score={simResult.score} size={130} animate />
        <div style={{ marginTop: 14 }}>
          <TierBadge tier={simResult.tier} size="sm" />
        </div>
      </div>
    </div>
  );
}
