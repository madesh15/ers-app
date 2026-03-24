import React from "react";
import { getLowScoringDomains } from "../../utils/scoring";
import { DOMAINS } from "../../data/domains";

// Source: Section 3 — User Journey: Results shows "ROI projections"
// Source: Section 5 — Impact Summary values
const DOMAIN_ROI = {
  1: { saving: "12–18 hrs/week",  risk: "Coordination failures on election day",    value: "$85K–$140K/yr"  },
  2: { saving: "8–15 hrs/week",   risk: "Equipment loss and L&A testing failures",  value: "$60K–$110K/yr"  },
  3: { saving: "6–12 hrs/week",   risk: "Legal compliance delays and penalties",    value: "$50K–$95K/yr"   },
  4: { saving: "5–10 hrs/week",   risk: "Unresolved issues causing day-of crises",  value: "$40K–$75K/yr"   },
  5: { saving: "4–8 hrs/week",    risk: "FOIA delays and public trust erosion",     value: "$30K–$55K/yr"   },
  6: { saving: "20–35 hrs/week",  risk: "Legal exposure, voter complaints, audits", value: "$150K–$280K/yr" },
};

export default function ROIProjection({ domainScores }) {
  const lowDomains = getLowScoringDomains(domainScores, 0.6);

  if (lowDomains.length === 0) {
    return (
      <div style={{
        padding: "20px 24px",
        background: "rgba(16,185,129,0.05)",
        border: "1px solid rgba(16,185,129,0.15)",
        borderRadius: "var(--radius-lg)",
        textAlign: "center",
      }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>🏆</div>
        <div style={{ fontWeight: 700, color: "#34d399", fontSize: 15 }}>
          Strong performance across all domains
        </div>
        <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6 }}>
          Your jurisdiction is operating well — focus on maintaining best practices.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 18,
        color: "var(--text-primary)",
        marginBottom: 6,
      }}>
        Efficiency Gap Analysis
      </div>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>
        Based on your scores, these domains have the highest improvement potential:
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {lowDomains.map((ds) => {
          const roi    = DOMAIN_ROI[ds.id];
          const domain = DOMAINS.find((d) => d.id === ds.id);
          if (!roi || !domain) return null;

          return (
            <div key={ds.id} style={{
              padding: "16px 20px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              gap: 16,
              alignItems: "center",
            }}>
              {/* Icon + name */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 24 }}>{domain.icon}</span>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  color: domain.color,
                  letterSpacing: "0.06em",
                  textAlign: "center",
                  lineHeight: 1.2,
                  maxWidth: 60,
                }}>
                  {domain.shortName}
                </div>
              </div>

              {/* Details */}
              <div>
                <div style={{
                  fontSize: 13,
                  color: "#fca5a5",
                  marginBottom: 4,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}>
                  <span>⚠️</span> {roi.risk}
                </div>
                <div style={{
                  fontSize: 13,
                  color: "#6ee7b7",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}>
                  <span>⏱️</span> {roi.saving} time recovered with automation
                </div>
              </div>

              {/* Value */}
              <div style={{ textAlign: "right" }}>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#60a5fa",
                  lineHeight: 1,
                }}>
                  {roi.value}
                </div>
                <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 3 }}>
                  est. annual value
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
