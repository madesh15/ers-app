import React from "react";
import { useAssessment, PHASES } from "../context/AssessmentContext";
import { DOMAINS } from "../data/domains";

const STATS = [
  { value: "20", label: "Adaptive Questions" },
  { value: "7", label: "Operational Domains" },
  { value: "100pt", label: "Weighted Score" },
  { value: "4", label: "Readiness Tiers" },
];


export default function LandingPage() {
  const { setPhase, reset } = useAssessment();

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>


      {/* ── Hero ── */}
      <div style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "80px 24px 60px",
        textAlign: "center",
        position: "relative",
      }}>
        {/* Badge */}
        <div className="fade-up" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          padding: "5px 16px",
          background: "rgba(59,130,246,0.09)",
          border: "1px solid rgba(59,130,246,0.22)",
          borderRadius: 99,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--accent-blue)",
          letterSpacing: "0.08em",
          marginBottom: 28,
        }}>
          ✦ INTELLIGENT DIAGNOSTIC & LEAD GENERATION PLATFORM
        </div>

        {/* Headline */}
        <h1 className="fade-up-1 display" style={{
          fontSize: "clamp(32px, 5vw, 64px)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "var(--text-primary)",
          marginBottom: 22,
        }}>
          Election Readiness <span style={{ color: "var(--accent-blue)" }}>Scorer™</span>
        </h1>

        {/* Sub */}
        <p className="fade-up-2" style={{
          fontSize: "clamp(15px, 2vw, 19px)",
          color: "var(--text-muted)",
          maxWidth: 580,
          margin: "0 auto 48px",
          lineHeight: 1.7,
        }}>

        </p>

        {/* CTA */}
        <div className="fade-up-3" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => {
              reset();
              setPhase(PHASES.ASSESSMENT);
            }}
            className="btn btn-primary"
            style={{ fontSize: 17, padding: "16px 44px", letterSpacing: "-0.01em" }}
          >
            🚀 Start Your Assessment
          </button>

        </div>

        <p className="fade-up-4" style={{
          marginTop: 16, fontSize: 12, color: "var(--text-muted)",
        }}>

        </p>
      </div>

      {/* ── Stats row ── */}
      <div className="fade-up-3" style={{
        maxWidth: 720,
        margin: "0 auto 64px",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 1,
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
      }}>
        {STATS.map((s, i) => (
          <div key={s.label} style={{
            padding: "22px 16px",
            background: "var(--bg-card)",
            textAlign: "center",
            borderRight: i < STATS.length - 1 ? "1px solid var(--border)" : "none",
          }}>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: 26,
              fontWeight: 700,
              color: "var(--accent-blue)",
              lineHeight: 1,
              marginBottom: 6,
            }}>
              {s.value}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Domain cards ── */}
      <div style={{ maxWidth: 960, margin: "0 auto 64px", padding: "0 24px" }}>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--text-muted)",
          letterSpacing: "0.1em",
          textAlign: "center",
          marginBottom: 20,
        }}>
          7 OPERATIONAL DOMAINS ASSESSED
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
        }}>
          {DOMAINS.map((d, i) => (
            <div
              key={d.id}
              className="fade-up card"
              style={{
                animationDelay: `${i * 0.06}s`,
                padding: "18px 20px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{
                position: "absolute",
                top: 0, right: 0,
                width: 80, height: 80,
                background: `radial-gradient(circle at top right, rgba(${d.colorRgb},0.1) 0%, transparent 70%)`,
              }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 22 }}>{d.icon}</span>
                {d.premium && (
                  <span className="badge badge-premium">PREMIUM</span>
                )}
              </div>
              <div style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 14,
                color: "var(--text-primary)",
                marginBottom: 5,
                lineHeight: 1.3,
              }}>
                {d.name}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5 }}>
                {d.description}
              </div>
              <div style={{
                marginTop: 12,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: d.color,
              }}>
                {d.coreQCount} core · {d.adaptiveQRange} adaptive
              </div>
            </div>
          ))}
        </div>
      </div>




    </div>
  );
}
