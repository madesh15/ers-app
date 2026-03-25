import React from "react";
import DomainBar from "../ui/DomainBar";
import { DOMAINS } from "../../data/domains";

export default function DomainBreakdown({ domainScores }) {
  const sorted = DOMAINS
    .map((d) => domainScores[d.id])
    .filter(Boolean)
    .filter((ds) => ds.maxPossible > 0);

  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: 16,
      }}>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: 18,
          fontWeight: 700,
          color: "var(--accent-blue)",
        }}>
          Domain Breakdown
        </h2>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--accent-blue)",
        }}>
          {sorted.length} domains assessed
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {sorted.map((ds, i) => (
          <div
            key={ds.id}
            className="fade-up"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <DomainBar domain={ds} animate />
          </div>
        ))}
      </div>
    </div>
  );
}
