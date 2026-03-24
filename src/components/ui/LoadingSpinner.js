import React from "react";

export default function LoadingSpinner({ size = 40, label = "Loading…" }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 14,
      padding: "48px",
    }}>
      <div style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: "3px solid rgba(255,255,255,0.06)",
        borderTopColor: "var(--accent-blue)",
        animation: "spin 0.8s linear infinite",
      }} />
      {label && (
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--text-muted)",
          letterSpacing: "0.08em",
        }}>
          {label}
        </span>
      )}
    </div>
  );
}
