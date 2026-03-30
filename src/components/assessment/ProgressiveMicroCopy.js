import React, { useEffect, useState } from "react";

// Source: Section 3 — Perceived Intelligence Through Micro-Copy
// Displays contextual message when entering an adaptive question.
export default function ProgressiveMicroCopy({ copy }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!copy) { setVisible(false); return; }
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [copy]);

  if (!copy) return null;

  return (
    <div style={{
      marginBottom: 20,
      padding: "12px 18px",
      background: "rgba(99,102,241,0.07)",
      border: "1px solid rgba(99,102,241,0.2)",
      borderRadius: "var(--radius-md)",
      fontSize: 13,
      color: "#6366f1",
      fontStyle: "italic",
      display: "flex",
      alignItems: "flex-start",
      gap: 10,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(-6px)",
      transition: "opacity 0.35s ease, transform 0.35s ease",
    }}>
      <span style={{ fontSize: 16, flexShrink: 0 }}>💬</span>
      <span>{copy}</span>
    </div>
  );
}
