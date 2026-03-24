import React from "react";
import { getTier } from "../../utils/scoring";

// Source: Section 1 — Key Features: "Anonymous leaderboard with comparative benchmarking"
// Source: Section 3 — Core Questions benefit: "You scored below 68% of counties"

// Simulated benchmark distribution (would come from real API in production)
const BENCHMARK = {
  mean:   54,
  median: 52,
  p25:    38,
  p75:    68,
  p90:    79,
  totalAssessments: 1247,
};

function percentileOf(score) {
  // Approximate percentile based on benchmark distribution
  if (score >= BENCHMARK.p90) return 90;
  if (score >= BENCHMARK.p75) return 75;
  if (score >= BENCHMARK.median) return 50;
  if (score >= BENCHMARK.p25) return 25;
  return 10;
}

export default function BenchmarkCard({ score }) {
  const pct    = percentileOf(score);
  const above  = score >= BENCHMARK.mean;
  const delta  = Math.abs(score - BENCHMARK.mean);
  const tier   = getTier(score);

  return (
    <div style={{
      padding: "20px 24px",
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
      }}>
        <div style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 15,
          color: "var(--text-primary)",
        }}>
          📊 How You Compare
        </div>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "var(--text-muted)",
          letterSpacing: "0.08em",
        }}>
          {BENCHMARK.totalAssessments.toLocaleString()} COUNTIES ASSESSED
        </div>
      </div>

      {/* Percentile statement */}
      <div style={{
        padding: "14px 18px",
        background: above
          ? "rgba(16,185,129,0.06)"
          : "rgba(239,68,68,0.06)",
        border: `1px solid ${above ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)"}`,
        borderRadius: "var(--radius-md)",
        fontSize: 14,
        color: above ? "#6ee7b7" : "#fca5a5",
        marginBottom: 16,
        lineHeight: 1.6,
      }}>
        {above
          ? `✓ You scored ${delta} points above the national average — better than ${pct}% of counties.`
          : `⚠️ You scored ${delta} points below the national average of ${BENCHMARK.mean}. ${100 - pct}% of counties score higher.`
        }
      </div>

      {/* Distribution bar */}
      <div style={{ marginBottom: 12 }}>
        <div style={{
          fontSize: 11,
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
          marginBottom: 8,
        }}>
          SCORE DISTRIBUTION (national)
        </div>

        {/* Bar track */}
        <div style={{
          position: "relative",
          height: 24,
          background: "rgba(255,255,255,0.04)",
          borderRadius: 12,
          overflow: "visible",
        }}>
          {/* IQR fill (p25–p75) */}
          <div style={{
            position: "absolute",
            left: `${BENCHMARK.p25}%`,
            width: `${BENCHMARK.p75 - BENCHMARK.p25}%`,
            height: "100%",
            background: "rgba(59,130,246,0.12)",
            borderRadius: 12,
          }} />

          {/* Mean marker */}
          <div style={{
            position: "absolute",
            left: `${BENCHMARK.mean}%`,
            top: -4, bottom: -4,
            width: 2,
            background: "rgba(255,255,255,0.25)",
            borderRadius: 1,
          }} />

          {/* Your score marker */}
          <div style={{
            position: "absolute",
            left: `${Math.min(96, Math.max(2, score))}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 18, height: 18,
            borderRadius: "50%",
            background: tier.color,
            border: "2px solid #fff",
            boxShadow: `0 0 10px ${tier.color}80`,
            zIndex: 2,
          }} />
        </div>

        {/* Scale labels */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 6,
          fontSize: 10,
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
        }}>
          <span>0</span>
          <span>P25: {BENCHMARK.p25}</span>
          <span>Avg: {BENCHMARK.mean}</span>
          <span>P75: {BENCHMARK.p75}</span>
          <span>100</span>
        </div>
      </div>

      {/* Your dot legend */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 12,
        color: "var(--text-muted)",
      }}>
        <div style={{
          width: 10, height: 10,
          borderRadius: "50%",
          background: tier.color,
          flexShrink: 0,
        }} />
        Your score: <strong style={{ color: tier.color }}>{score}</strong>
        &nbsp;·&nbsp; National avg: <strong style={{ color: "rgba(255,255,255,0.4)" }}>{BENCHMARK.mean}</strong>
      </div>
    </div>
  );
}
