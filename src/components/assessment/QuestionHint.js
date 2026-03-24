import React, { useState } from "react";

/**
 * Collapsible hint shown below question text.
 * Auto-expands for adaptive questions.
 */
export default function QuestionHint({ hint, autoOpen = false }) {
  const [open, setOpen] = useState(autoOpen);

  if (!hint) return null;

  return (
    <div style={{ marginBottom: 16 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "4px 0",
          color: "var(--text-muted)",
          fontSize: 12,
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.04em",
        }}
      >
        <span style={{
          display: "inline-block",
          transform: open ? "rotate(90deg)" : "rotate(0deg)",
          transition: "transform 0.2s",
          fontSize: 10,
        }}>
          ▶
        </span>
        {open ? "Hide hint" : "💡 Show insight"}
      </button>

      {open && (
        <div
          className="fade-in"
          style={{
            marginTop: 8,
            padding: "10px 14px",
            background: "rgba(245,158,11,0.05)",
            border: "1px solid rgba(245,158,11,0.15)",
            borderRadius: "var(--radius-sm)",
            fontSize: 13,
            color: "#fcd34d",
            lineHeight: 1.6,
            fontStyle: "italic",
          }}
        >
          {hint}
        </div>
      )}
    </div>
  );
}
