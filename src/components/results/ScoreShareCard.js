import React, { useRef } from "react";
import { getTier } from "../../utils/scoring";
import { useToast } from "../ui/Toast";

/**
 * A visually polished share card that summarises the user's score.
 * In production, this would be rendered to a canvas/PNG for download or sharing.
 */
export default function ScoreShareCard({ score, domainScores, lead }) {
  const tier = getTier(score);
  const cardRef = useRef(null);
  const toast = useToast();

  const topDomains = Object.values(domainScores)
    .filter((d) => d.maxPossible > 0)
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3);

  const weakDomains = Object.values(domainScores)
    .filter((d) => d.maxPossible > 0)
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, 2);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch(() => toast.error("Copy not supported — please copy the URL manually."));
  };

  return (
    <div>
      {/* Card */}
      <div ref={cardRef} style={{
        background: "linear-gradient(135deg, #0c1526 0%, #020817 60%, #0d0f1a 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 20,
        padding: "28px 24px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background glow */}
        <div style={{
          position: "absolute",
          top: -40, right: -40,
          width: 200, height: 200,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${tier.colorRgb},0.15) 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />

        {/* Logo row */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 22 }}><img src="/logo-lg.png" style={{ height: 32 }} /></span>
            <div>

            </div>
          </div>
          {lead?.county && (
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--text-muted)",
            }}>
              {lead.county}{lead.state ? `, ${lead.state}` : ""}
            </div>
          )}
        </div>

        {/* Score */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 16, marginBottom: 16 }}>
          <div>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: 64,
              fontWeight: 900,
              color: tier.color,
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}>
              {score}
            </div>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: 14,
              color: "rgba(255,255,255,0.3)",
              marginTop: 2,
            }}>
              / 100
            </div>
          </div>
          <div style={{ paddingBottom: 4 }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 14px",
              background: tier.bgColor,
              border: `1px solid ${tier.borderColor}`,
              borderRadius: 99,
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 13,
              color: tier.color,
              marginBottom: 6,
            }}>
              {tier.emoji} {tier.name}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.4 }}>
              {tier.description}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: 1,
          background: "rgba(255,255,255,0.05)",
          marginBottom: 16,
        }} />

        {/* Domain highlights */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
        }}>
          <div>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              color: "var(--text-muted)",
              letterSpacing: "0.1em",
              marginBottom: 8,
            }}>
              TOP DOMAINS
            </div>
            {topDomains.map((d) => (
              <div key={d.id} style={{ marginBottom: 10 }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 3
                }}>
                  <span style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.6)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                    fontFamily: "var(--font-mono)"
                  }}>
                    {d.shortName}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: d.color,
                    fontWeight: 700
                  }}>
                    {d.percentage}%
                  </span>
                </div>
                <div style={{
                  height: 4,
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: 2,
                  overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%",
                    width: `${d.percentage}%`,
                    background: d.color,
                    borderRadius: 2,
                  }} />
                </div>
              </div>
            ))}
          </div>

          <div>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              color: "var(--text-muted)",
              letterSpacing: "0.1em",
              marginBottom: 8,
            }}>
              NEEDS ATTENTION
            </div>
            {weakDomains.map((d) => (
              <div key={d.id} style={{ marginBottom: 10 }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 3
                }}>
                  <span style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.6)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                    fontFamily: "var(--font-mono)"
                  }}>
                    {d.shortName}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "#f87171",
                    fontWeight: 700
                  }}>
                    {d.percentage}%
                  </span>
                </div>
                <div style={{
                  height: 4,
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: 2,
                  overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%",
                    width: `${d.percentage}%`,
                    background: "#ef4444",
                    borderRadius: 2,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Share actions */}
      <div style={{
        display: "flex",
        gap: 8,
        marginTop: 12,
        flexWrap: "wrap",
      }}>
        <button
          onClick={handleCopyLink}
          className="btn btn-ghost"
          style={{ flex: 1, fontSize: 13, padding: "10px" }}
        >
          🔗 Copy Link
        </button>
        <button
          className="btn btn-ghost"
          style={{ flex: 1, fontSize: 13, padding: "10px" }}
          onClick={() => toast.info("PDF export — connect your PDF generation library here")}
        >
          📄 Export PDF
        </button>
        <button
          className="btn btn-ghost"
          style={{ flex: 1, fontSize: 13, padding: "10px" }}
          onClick={() => {
            const text = `I just scored ${score}/100 on the Election Readiness Scorer™ — ${tier.name}. Take your assessment at ballotda.com`;
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank");
          }}
        >
          𝕏 Share
        </button>
      </div>
    </div>
  );
}
