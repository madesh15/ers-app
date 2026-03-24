import React from "react";
import { TIERS } from "../../data/tiers";

export default function TierGrid({ currentTier }) {
  return (
    <div>
      <div style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--text-muted)",
        letterSpacing: "0.1em",
        marginBottom: 10,
      }}>
        TIER CLASSIFICATIONS
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 6,
      }}>
        {TIERS.map((t) => {
          const isActive = t.id === currentTier.id;
          return (
            <div
              key={t.id}
              style={{
                padding: "10px 8px",
                borderRadius: "var(--radius-sm)",
                background: isActive ? t.bgColor : "var(--bg-card)",
                border: isActive
                  ? `2px solid ${t.borderColor}`
                  : "2px solid transparent",
                textAlign: "center",
                transition: "all 0.3s",
              }}
            >
              <div style={{ fontSize: 18, marginBottom: 4 }}>{t.emoji}</div>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: 10,
                fontWeight: 700,
                color: isActive ? t.color : "var(--text-muted)",
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
              }}>
                {t.name}
              </div>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "var(--text-muted)",
                marginTop: 3,
              }}>
                {t.scoreMin}–{t.scoreMax}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
