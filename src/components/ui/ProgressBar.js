import React from "react";

/**
 * Reusable animated progress bar.
 * Uses CSS transition for smooth fill animation.
 */
export default function ProgressBar({
  value,          // 0–100
  color = "var(--accent-blue)",
  height = 6,
  showLabel = false,
  label = null,
  animate = true,
  style = {},
}) {
  return (
    <div style={{ width: "100%", ...style }}>
      {(showLabel || label) && (
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 6,
          fontSize: 12,
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
        }}>
          <span>{label}</span>
          <span>{Math.round(value)}%</span>
        </div>
      )}
      <div style={{
        height,
        background: "rgba(255,255,255,0.05)",
        borderRadius: height,
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: `${Math.max(0, Math.min(100, value))}%`,
          background: color,
          borderRadius: height,
          transition: animate ? "width 0.7s cubic-bezier(0.16,1,0.3,1)" : "none",
        }} />
      </div>
    </div>
  );
}
