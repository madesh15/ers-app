import React, { useEffect, useState } from "react";
import { getDomain } from "../../data/domains";

/**
 * Shows a brief animated banner whenever the user enters a new domain.
 * Disappears after 1.8 seconds.
 */
export default function DomainTransition({ domainId, previousDomainId }) {
  const [visible, setVisible] = useState(false);
  const domain = getDomain(domainId);

  useEffect(() => {
    if (previousDomainId === null || domainId === previousDomainId) return;

    setVisible(true);
    const t = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(t);
  }, [domainId, previousDomainId]);

  if (!visible || !domain) return null;

  return (
    <div style={{
      position: "fixed",
      top: 80,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 500,
      padding: "10px 22px",
      background: `rgba(${domain.colorRgb}, 0.12)`,
      border: `1px solid rgba(${domain.colorRgb}, 0.35)`,
      borderRadius: 99,
      display: "flex",
      alignItems: "center",
      gap: 8,
      backdropFilter: "blur(12px)",
      boxShadow: `0 4px 24px rgba(${domain.colorRgb}, 0.2)`,
      animation: "fadeUp 0.3s ease both",
      pointerEvents: "none",
      whiteSpace: "nowrap",
    }}>
      <span style={{ fontSize: 18 }}>{domain.icon}</span>
      <span style={{
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 13,
        color: domain.color,
      }}>
        Now: {domain.name}
      </span>
      {domain.premium && (
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          color: "#fb923c",
          background: "rgba(249,115,22,0.15)",
          border: "1px solid rgba(249,115,22,0.3)",
          borderRadius: 4,
          padding: "1px 6px",
          letterSpacing: "0.1em",
        }}>
          PREMIUM
        </span>
      )}
    </div>
  );
}
