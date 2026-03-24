import React from "react";
import { useAssessment, PHASES } from "../../context/AssessmentContext";

export default function Navbar() {
  const { phase, reset } = useAssessment();

  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      padding: "0 32px",
      height: 64,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "rgba(255,255,255,0.9)",
      backdropFilter: "blur(16px)",
      borderBottom: "1px solid var(--border)",
    }}>
      {/* Logo */}
      <button
        onClick={reset}
        style={{
          background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 10,
        }}
      >
        <span style={{ fontSize: 22 }}><img src="/logo-lg.png" style={{ height: 32 }} /></span>
        <div>
          <div style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: 15,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}>

          </div>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            color: "var(--text-muted)",
            letterSpacing: "0.15em",
            lineHeight: 1,
            marginTop: 2,
          }}>

          </div>
        </div>
      </button>

      {/* Phase breadcrumb */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--text-muted)",
      }}>
        {[
          { id: PHASES.LANDING, label: "Home" },
          { id: PHASES.ASSESSMENT, label: "Assessment" },
          { id: PHASES.RESULTS, label: "Results" },
          { id: PHASES.SIMULATOR, label: "Simulator" },
        ].map((p, i, arr) => (
          <React.Fragment key={p.id}>
            <span style={{
              color: phase === p.id ? "var(--accent-blue)" : "var(--text-muted)",
              fontWeight: phase === p.id ? 700 : 400,
              transition: "color 0.2s",
            }}>
              {p.label}
            </span>
            {i < arr.length - 1 && (
              <span style={{ color: "var(--border-bright)" }}>/</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Right actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {phase !== PHASES.LANDING && (
          <button
            onClick={reset}
            className="btn btn-ghost"
            style={{ padding: "7px 16px", fontSize: 13 }}
          >
            ↩ Restart
          </button>
        )}
        <a
          href="https://ballotda.com/en/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ padding: "7px 18px", fontSize: 13, textDecoration: "none" }}
        >
          Contact Us
        </a>
      </div>
    </nav>
  );
}
