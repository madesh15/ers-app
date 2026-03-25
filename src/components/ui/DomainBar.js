import React, { useEffect, useRef } from "react";

export default function DomainBar({ domain, animate = true, compact = false }) {
  const barRef = useRef(null);

  useEffect(() => {
    if (!barRef.current) return;
    const el = barRef.current;
    if (animate) {
      el.style.width = "0%";
      requestAnimationFrame(() => {
        setTimeout(() => {
          el.style.transition = "width 0.9s cubic-bezier(0.16, 1, 0.3, 1)";
          el.style.width = domain.percentage + "%";
        }, 80);
      });
    } else {
      el.style.width = domain.percentage + "%";
    }
  }, [domain.percentage, animate]);

  const statusColor =
    domain.percentage >= 70 ? "#10B981" :
    domain.percentage >= 45 ? "#F59E0B" :
                               "#EF4444";

  return (
    <div style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)",
      padding: compact ? "12px 16px" : "18px 20px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: compact ? 16 : 20 }}>{domain.icon}</span>
          <span style={{
            fontWeight: 600,
            fontSize: compact ? 13 : 14,
            color: "var(--accent-blue)",
          }}>{domain.name}</span>
          {domain.premium && (
            <span className="badge badge-premium">PREMIUM</span>
          )}
        </div>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          fontSize: compact ? 14 : 16,
          color: statusColor,
        }}>
          {domain.percentage}%
        </div>
      </div>

      {/* Bar track */}
      <div style={{
        height: 6,
        background: "rgba(255,255,255,0.05)",
        borderRadius: 3,
        overflow: "hidden",
      }}>
        <div
          ref={barRef}
          style={{
            height: "100%",
            background: `linear-gradient(90deg, ${domain.color}, ${domain.color}99)`,
            borderRadius: 3,
            width: "0%",
          }}
        />
      </div>

      {!compact && (
        <div style={{
          display: "flex", justifyContent: "space-between",
          marginTop: 6, fontSize: 12, color: "var(--accent-blue)",
          fontFamily: "var(--font-mono)",
        }}>
          <span>{domain.earned} earned</span>
          <span>max {domain.maxPossible}</span>
        </div>
      )}
    </div>
  );
}
