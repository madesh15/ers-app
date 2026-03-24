import React, { useState, useRef } from "react";

/**
 * Simple hover tooltip component.
 * Wraps children; shows `content` on hover.
 */
export default function Tooltip({ content, children, position = "top" }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  const posStyles = {
    top:    { bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
    bottom: { top:    "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
    left:   { right:  "calc(100% + 8px)", top: "50%",  transform: "translateY(-50%)" },
    right:  { left:   "calc(100% + 8px)", top: "50%",  transform: "translateY(-50%)" },
  };

  return (
    <div
      ref={ref}
      style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {visible && content && (
        <div style={{
          position: "absolute",
          ...posStyles[position],
          zIndex: 1000,
          padding: "7px 12px",
          background: "rgba(15,23,42,0.97)",
          border: "1px solid var(--border-bright)",
          borderRadius: 8,
          fontSize: 12,
          color: "var(--text-secondary)",
          whiteSpace: "nowrap",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          fontFamily: "var(--font-body)",
          pointerEvents: "none",
          animation: "fadeIn 0.15s ease",
        }}>
          {content}
        </div>
      )}
    </div>
  );
}
