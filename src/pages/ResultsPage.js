import React from "react";
import { useAssessment, PHASES } from "../context/AssessmentContext";
import { isAbsenteeHighRisk } from "../utils/scoring";
import PageWrapper from "../components/layout/PageWrapper";
import ScoreGauge from "../components/ui/ScoreGauge";
import TierBadge from "../components/ui/TierBadge";
import TierGrid from "../components/results/TierGrid";
import DomainBreakdown from "../components/results/DomainBreakdown";
import AbsenteeRiskAlert from "../components/results/AbsenteeRiskAlert";
import LeadCaptureForm from "../components/results/LeadCaptureForm";
import Footer from "../components/layout/Footer";
import { useToast } from "../components/ui/Toast";

export default function ResultsPage() {
  const {
    scoreResult,
    lead,
    initSimulator,
    setPhase,
    reset,
  } = useAssessment();

  const toast = useToast();

  if (!scoreResult) {
    return (
      <PageWrapper>
        <p style={{ color: "var(--text-muted)", textAlign: "center", marginTop: 80 }}>
          No results yet. <button onClick={() => setPhase(PHASES.LANDING)} className="btn btn-ghost" style={{ padding: "6px 14px", fontSize: 13 }}>Start Assessment</button>
        </p>
      </PageWrapper>
    );
  }

  const { score, tier, domainScores, penalties } = scoreResult;
  const absenteeRisk = isAbsenteeHighRisk(domainScores);

  return (
    <>
      <PageWrapper maxWidth={860}>
        {/* ── Page header ── */}
        <div className="fade-up" style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--text-muted)",
            letterSpacing: "0.15em",
            marginBottom: 10,
          }}>
            BALLOT D.A · ELECTION READINESS SCORER™
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(24px, 3.5vw, 36px)",
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
          }}>
            Your Results Report
          </h1>
        </div>

        {/* ── Score hero card ── */}
        <div className="fade-up-1" style={{
          padding: "44px 32px",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          marginBottom: 24,
        }}>


          <ScoreGauge score={score} size={220} animate />

          <div style={{ marginTop: 24, marginBottom: 16 }}>
            <TierBadge tier={tier} size="xl" />
          </div>

          <p style={{
            fontSize: 15,
            color: "var(--text-secondary)",
            maxWidth: 440,
            margin: "0 auto 10px",
            lineHeight: 1.6,
          }}>
            {tier.description}
          </p>

          <p style={{
            fontSize: 13,
            color: tier.color,
            fontStyle: "italic",
            opacity: 0.85,
          }}>
            {tier.urgency}
          </p>
        </div>

        {/* ── Tier grid ── */}
        <div className="fade-up-2" style={{ marginBottom: 24 }}>
          <TierGrid currentTier={tier} />
        </div>

        {/* ── Absentee risk alert (conditional) ── */}
        {absenteeRisk && (
          <AbsenteeRiskAlert
            onDemoClick={() => toast.info("Absentee Demo request received — a consultant will contact you shortly")}
            onAuditClick={() => toast.success("Audit request submitted — we'll be in touch within 24 hours")}
          />
        )}

        {/* ── Domain breakdown ── */}
        <div className="fade-up-2" style={{ marginBottom: 28 }}>
          <DomainBreakdown domainScores={domainScores} />
        </div>







        {/* ── Lead capture ── */}
        <div className="fade-up-3" style={{ marginBottom: 28 }}>
          <LeadCaptureForm />
        </div>

        {/* ── Primary CTA ── */}
        <div className="fade-up-3" style={{ marginBottom: 28 }}>
          <button
            onClick={initSimulator}
            className="btn"
            style={{
              background: "var(--accent-blue)",
              color: "#fff",
              padding: "24px",
              fontSize: 16,
              flexDirection: "column",
              gap: 6,
              height: "auto",
              width: "100%",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <span style={{ fontSize: 26 }}>🧪</span>
            <span style={{ fontWeight: 700 }}>Simulate a Better Setup</span>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              opacity: 0.8,
              fontWeight: 400,
            }}>
              See your potential score by adding automation →
            </span>
          </button>
        </div>




      </PageWrapper>
    </>
  );
}
