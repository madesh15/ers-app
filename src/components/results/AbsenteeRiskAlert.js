import React from "react";

// Source: Section 4 — Absentee-Specific Results Output
// Triggered when Domain 6 (Absentee Ballot) scores below 50%
export default function AbsenteeRiskAlert({ onDemoClick, onAuditClick }) {
  return (
    <div className="fade-up-2" style={{
      marginBottom: 24,
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      border: "2px solid rgba(239,68,68,0.28)",
    }}>
      {/* Header */}
      <div style={{
        padding: "18px 24px",
        background: "rgba(239,68,68,0.1)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        borderBottom: "1px solid rgba(239,68,68,0.18)",
      }}>
        <span style={{ fontSize: 22 }}>🚨</span>
        <div>
          <div style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 16,
            color: "#f87171",
          }}>
            Absentee Ballot Risk Alert
          </div>
          <div style={{ fontSize: 12, color: "rgba(248,113,113,0.7)", marginTop: 2 }}>
            High manual dependency detected — compliance exposure identified
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "20px 24px", background: "rgba(239,68,68,0.04)" }}>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 16 }}>
          Your absentee ballot process shows high manual dependency and delayed reporting,
          which may increase:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
          {[
            "Voter dissatisfaction and complaints",
            "Compliance exposure during audits",
            "Election-day backlog risks",
            "Media scrutiny during close races",
          ].map((risk) => (
            <div key={risk} style={{
              display: "flex", alignItems: "flex-start", gap: 8,
              padding: "10px 12px",
              background: "rgba(239,68,68,0.06)",
              borderRadius: "var(--radius-sm)",
              fontSize: 13,
              color: "#fca5a5",
            }}>
              <span style={{ color: "#ef4444", flexShrink: 0 }}>•</span>
              {risk}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
