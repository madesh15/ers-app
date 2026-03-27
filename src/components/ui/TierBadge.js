import React from "react";

export default function TierBadge({ tier, size = "md" }) {
  const sizes = {
    sm:  { font: 11, padding: "3px 10px", emoji: 14 },
    md:  { font: 13, padding: "5px 14px", emoji: 16 },
    lg:  { font: 16, padding: "8px 20px", emoji: 20 },
    xl:  { font: 18, padding: "10px 24px", emoji: 24 },
  };
  const s = sizes[size] || sizes.md;

  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      padding: s.padding,
      borderRadius: 99,
      background: tier.bgColor,
      border: `1px solid ${tier.borderColor}`,
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: s.font,
      color: tier.color,
      letterSpacing: "-0.01em",
      whiteSpace: "nowrap",
      maxWidth: "100%",
      boxSizing: "border-box",
    }}>
      <span style={{ fontSize: s.emoji, flexShrink: 0 }}>{tier.emoji}</span>
      <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{tier.name}</span>
    </span>
  );
}
