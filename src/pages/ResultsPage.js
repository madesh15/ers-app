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
import { useToast } from "../components/ui/Toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ResultsPage() {
  const { scoreResult, initSimulator, setPhase } = useAssessment();
  const toast = useToast();
  const reportRef = React.useRef(null);
  const [downloading, setDownloading] = React.useState(false);

  const handleDownload = async () => {
    if (downloading || !reportRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        onclone: (clonedDoc) => {
          const style = clonedDoc.createElement("style");
          style.innerHTML = `
            * { -webkit-print-color-adjust: exact !important; }
            #pdf-capture { padding: 32px !important; background: #ffffff !important; border: none !important; }
            h1, h2, h3 { color: #0f172a !important; }
            p { color: #334155 !important; }
          `;
          clonedDoc.head.appendChild(style);
          const allEl = clonedDoc.getElementsByTagName("*");
          for (let i = 0; i < allEl.length; i++) {
            const el = allEl[i];
            const text = (el.innerText || "").toLowerCase();
            if (text.includes("tier classifications")) {
              el.style.setProperty("color", "#475569", "important");
              el.style.setProperty("font-weight", "700", "important");
              el.style.setProperty("opacity", "1", "important");
            }
            if (el.style.color === "var(--text-muted)" || el.style.color === "rgb(148, 163, 184)") {
              el.style.setProperty("color", "#64748b", "important");
            }
            if (text === "absentee ballot risk alert") {
              el.style.setProperty("color", "#dc2626", "important");
              el.style.setProperty("font-weight", "800", "important");
            }
            if (text.includes("high manual dependency detected")) {
              el.style.setProperty("color", "#991b1b", "important");
              el.style.setProperty("opacity", "1", "important");
            }
            const riskKeywords = ["dissatisfaction", "backlog", "compliance", "media scrutiny", "scrutiny"];
            if (riskKeywords.some((k) => text.includes(k))) {
              el.style.setProperty("color", "#7f1d1d", "important");
              el.style.setProperty("font-weight", "600", "important");
              el.style.setProperty("opacity", "1", "important");
            }
          }
        },
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`BallotDA_Election_Readiness_Report_${new Date().toLocaleDateString().replace(/\//g, "_")}.pdf`);
      toast.success("Report downloaded successfully!");
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Download failed — please try again.");
    } finally {
      setDownloading(false);
    }
  };

  if (!scoreResult) {
    return (
      <PageWrapper>
        <p style={{ color: "var(--accent-blue)", textAlign: "center", marginTop: 80 }}>
          No results yet.{" "}
          <button onClick={() => setPhase(PHASES.LANDING)} className="btn btn-ghost" style={{ padding: "6px 14px", fontSize: 13 }}>
            Start Assessment
          </button>
        </p>
      </PageWrapper>
    );
  }

  const { score, tier, domainScores } = scoreResult;
  const absenteeRisk = isAbsenteeHighRisk(domainScores);

  return (
    <>
      <PageWrapper maxWidth={860}>

        {/* ── PDF CAPTURE ZONE — only this goes into the PDF ── */}
        <div id="pdf-capture" ref={reportRef} className="results-pdf-box" style={{ background: "#ffffff", padding: "28px", borderRadius: "var(--radius-xl)", marginBottom: 24 }}>

          {/* 1. Header */}
          <div className="fade-up" style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ marginBottom: 12 }}>
              <img src="/logo-lg.png" alt="Ballot DA" style={{ height: 38, width: "auto" }} />
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent-blue)", letterSpacing: "0.15em", marginBottom: 8 }}>
              ELECTION READINESS SCORER™
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 3.5vw, 34px)", fontWeight: 700, color: "var(--accent-blue)", letterSpacing: "-0.02em" }}>
              Your Results Report
            </h1>
          </div>

          {/* 2. Score hero */}
          <div className="fade-up-1 results-score-hero" style={{ padding: "40px 32px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", textAlign: "center", marginBottom: 20 }}>
            <div className="score-gauge-wrapper">
              <ScoreGauge score={score} size={220} animate />
            </div>
            <div style={{ marginTop: 24, marginBottom: 14 }}>
              <TierBadge tier={tier} size="xl" />
            </div>
            <p style={{ fontSize: 15, color: "var(--text-secondary)", maxWidth: 440, margin: "0 auto 8px", lineHeight: 1.6 }}>
              {tier.description}
            </p>
            <p style={{ fontSize: 13, color: tier.color, fontStyle: "italic", fontWeight: 600 }}>
              {tier.urgency}
            </p>
          </div>

          {/* 3. Tier grid */}
          <div className="fade-up-2" style={{ marginBottom: absenteeRisk ? 20 : 0 }}>
            <TierGrid currentTier={tier} />
          </div>

          {/* 4. Absentee Risk Alert — only if Domain 6 < 50% */}
          {absenteeRisk && (
            <div className="fade-up-2" style={{ marginTop: 4 }}>
              <AbsenteeRiskAlert
                onDemoClick={() => toast.info("Absentee Demo request received — a consultant will contact you shortly")}
                onAuditClick={() => toast.success("Audit request submitted — we'll be in touch within 24 hours")}
              />
            </div>
          )}

        </div>
        {/* ── END PDF CAPTURE ZONE ── */}

        {/* ── SCREEN ONLY — not in PDF ── */}

        <div className="fade-up-2" style={{ marginBottom: 28 }}>
          <DomainBreakdown domainScores={domainScores} />
        </div>

        <div className="fade-up-3" style={{ marginBottom: 28 }}>
          <LeadCaptureForm />
        </div>

        <div className="fade-up-3 results-cta-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: 28, width: "100%" }}>

          <button onClick={initSimulator} className="btn" style={{ background: "var(--accent-blue)", color: "#fff", padding: "16px", fontSize: 14, flexDirection: "column", gap: 4, height: "auto", borderRadius: "var(--radius-lg)", width: "100%" }}>
            <span style={{ fontSize: 20 }}>🧪</span>
            <span style={{ fontWeight: 700 }}>Simulate a Better Setup</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, opacity: 0.8, fontWeight: 400 }}>See potential score improvement →</span>
          </button>

          <button onClick={handleDownload} disabled={downloading} className="btn" style={{ background: downloading ? "#f1f5f9" : "white", color: downloading ? "#94a3b8" : "var(--accent-blue)", border: `1px solid ${downloading ? "#e2e8f0" : "var(--accent-blue)"}`, padding: "16px", fontSize: 14, flexDirection: "column", gap: 4, height: "auto", borderRadius: "var(--radius-lg)", width: "100%", cursor: downloading ? "not-allowed" : "pointer", transition: "all 0.2s" }}>
            <span style={{ fontSize: 20 }}>{downloading ? "⏳" : "📥"}</span>
            <span style={{ fontWeight: 700 }}>{downloading ? "Generating PDF..." : "Download My Report"}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, opacity: 0.8, fontWeight: 400 }}>{downloading ? "Please wait" : "Get a PDF copy of your results"}</span>
          </button>

        </div>

      </PageWrapper>
    </>
  );
}
