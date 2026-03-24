import React, { useEffect, useState } from "react";

export default function ScoreGauge({ score, size = 200, animate = true }) {
  const [displayed, setDisplayed] = useState(animate ? 0 : score);

  useEffect(() => {
    if (!animate) { setDisplayed(score); return; }
    let start = null;
    const duration = 900;
    const from = 0;
    const to = score;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(from + (to - from) * ease));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [score, animate]);

  const radius = size / 2 - 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (displayed / 100) * circumference;

  // Colour based on score
  const color =
    score >= 81 ? "#10B981" :
    score >= 61 ? "#3B82F6" :
    score >= 41 ? "#F59E0B" :
                  "#EF4444";

  return (
    <div style={{ position: "relative", width: size, height: size, margin: "0 auto" }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {/* Track */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={14}
        />
        {/* Progress */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={color}
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={`${strokeDash} ${circumference}`}
          style={{ transition: "stroke-dasharray 0.05s linear, stroke 0.5s" }}
        />
      </svg>

      {/* Centre label */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: size * 0.22,
          fontWeight: 700,
          color,
          lineHeight: 1,
          transition: "color 0.5s",
        }}>
          {displayed}
        </div>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: size * 0.075,
          color: "var(--text-muted)",
          marginTop: 2,
        }}>
          / 100
        </div>
      </div>
    </div>
  );
}
