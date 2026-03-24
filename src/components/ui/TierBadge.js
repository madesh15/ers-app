import React from "react";

export default function TierBadge({ tier, size = "md" }) {
  const sizes = {
    sm:  { font: 11, padding: "3px 10px", emoji: 14 },
    md:  { font: 13, padding: "5px 14px", emoji: 16 },
    lg:  { font: 16, padding: "8px 20px", emoji: 20 },
    xl:  { font: 20, padding: "12px 28px", emoji: 26 },
  };
  const s = sizes[size] || sizes.md;

  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
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
    }}>
      <span style={{ fontSize: s.emoji }}>{tier.emoji}</span>
      {tier.name}
    </span>
  );
}
