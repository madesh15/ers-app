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
import jsPDF from "jspdf";

import { getDomain } from "../data/domains";

export default function ResultsPage() {
  const { scoreResult, initSimulator, setPhase, selectedDomainId } = useAssessment();
  const selectedDomain = selectedDomainId ? getDomain(selectedDomainId) : null;
  const toast = useToast();
  const reportRef = React.useRef(null);
  const [downloading, setDownloading] = React.useState(false);

  // ─── MAIN APPROACH: Clone the live DOM node, resolve all CSS variables,
  //     replace SVG/canvas with images, then html2canvas that cleaned clone ───
  const handleDownload = async () => {
    if (downloading || !reportRef.current) return;
    setDownloading(true);

    try {
      const liveEl = reportRef.current;

      // Step 1: Wait for all images to fully load
      await Promise.all(
        Array.from(liveEl.querySelectorAll("img")).map(
          (img) =>
            new Promise((res) => {
              if (img.complete && img.naturalWidth > 0) return res();
              img.onload = res;
              img.onerror = res;
            })
        )
      );

      // Step 2: Pause all animations so gauge/charts are in a stable state
      const allLiveEls = Array.from(liveEl.querySelectorAll("*"));
      allLiveEls.forEach((el) => {
        el.style.animationPlayState = "paused";
        el.style.transition = "none 0s";
        el.style.animation = "none";
      });
      liveEl.style.animationPlayState = "paused";
      liveEl.style.animation = "none";

      // Step 3: Let the browser repaint with animations frozen
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      await new Promise((r) => setTimeout(r, 150));

      // Step 4: Snapshot every <canvas> to a data URL BEFORE cloning
      //         (cloneNode copies an empty canvas)
      const canvasSnapshots = new Map();
      liveEl.querySelectorAll("canvas").forEach((c, i) => {
        try {
          canvasSnapshots.set(i, c.toDataURL("image/png"));
        } catch (_) { }
      });

      // Step 5: Snapshot every <svg> to a PNG data URL BEFORE cloning
      const svgSnapshots = new Map();
      const liveSVGs = Array.from(liveEl.querySelectorAll("svg"));
      await Promise.all(
        liveSVGs.map((svg, i) => {
          return new Promise((resolve) => {
            try {
              const rect = svg.getBoundingClientRect();
              const w = Math.round(rect.width) || 300;
              const h = Math.round(rect.height) || 300;

              // Serialize SVG with all inline styles resolved
              const clone = svg.cloneNode(true);
              clone.setAttribute("width", w);
              clone.setAttribute("height", h);

              // Copy computed styles for every SVG child
              const resolveEl = (el, orig) => {
                const cs = window.getComputedStyle(orig);
                ["fill", "stroke", "color", "opacity", "font-size", "font-family", "font-weight"].forEach((p) => {
                  const v = cs.getPropertyValue(p);
                  if (v && v !== "initial") el.style[p] = v;
                });
                Array.from(el.children).forEach((child, ci) => {
                  resolveEl(child, orig.children[ci]);
                });
              };
              resolveEl(clone, svg);

              const svgStr = new XMLSerializer().serializeToString(clone);
              const blob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
              const url = URL.createObjectURL(blob);
              const img = new Image();
              img.onload = () => {
                const c = document.createElement("canvas");
                c.width = w * 2;
                c.height = h * 2;
                const ctx = c.getContext("2d");
                ctx.scale(2, 2);
                ctx.clearRect(0, 0, w, h);
                ctx.drawImage(img, 0, 0, w, h);
                URL.revokeObjectURL(url);
                svgSnapshots.set(i, { dataURL: c.toDataURL("image/png"), w, h });
                resolve();
              };
              img.onerror = () => { URL.revokeObjectURL(url); resolve(); };
              img.src = url;
            } catch (_) { resolve(); }
          });
        })
      );

      // Step 6: Deep-clone the element into a detached off-screen container
      const container = document.createElement("div");
      container.style.cssText = `
        position: fixed;
        top: 0;
        left: -9999px;
        width: ${liveEl.offsetWidth}px;
        background: #ffffff;
        z-index: -1;
      `;
      document.body.appendChild(container);

      const cloned = liveEl.cloneNode(true);
      cloned.style.cssText = `
        background: #ffffff !important;
        padding: 28px !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        width: 100% !important;
      `;
      container.appendChild(cloned);

      // Step 7: Inline ALL computed styles on every element in the clone
      const resolveAllStyles = (clonedEl, liveOriginal) => {
        if (!clonedEl || !liveOriginal) return;

        const cs = window.getComputedStyle(liveOriginal);
        const important = [
          "color", "background-color", "background",
          "border", "border-color", "border-radius",
          "font-size", "font-weight", "font-family", "font-style",
          "line-height", "letter-spacing", "text-align",
          "padding", "padding-top", "padding-right", "padding-bottom", "padding-left",
          "margin", "margin-top", "margin-right", "margin-bottom", "margin-left",
          "width", "height", "min-width", "min-height", "max-width",
          "display", "flex-direction", "align-items", "justify-content",
          "gap", "grid-template-columns",
          "opacity", "box-shadow", "overflow",
          "position", "top", "left", "right", "bottom",
          "white-space", "word-break",
        ];
        important.forEach((prop) => {
          try {
            const val = cs.getPropertyValue(prop);
            if (val && val !== "" && !val.includes("var(")) {
              clonedEl.style.setProperty(prop, val, "important");
            }
          } catch (_) { }
        });

        // Freeze animations in clone too
        clonedEl.style.setProperty("animation", "none", "important");
        clonedEl.style.setProperty("transition", "none", "important");
        clonedEl.style.setProperty("animation-play-state", "paused", "important");

        const clonedChildren = Array.from(clonedEl.children);
        const liveChildren = Array.from(liveOriginal.children);
        clonedChildren.forEach((child, i) => {
          if (liveChildren[i]) resolveAllStyles(child, liveChildren[i]);
        });
      };
      resolveAllStyles(cloned, liveEl);

      // Step 8: Replace cloned <canvas> elements with pre-captured images
      const clonedCanvases = Array.from(cloned.querySelectorAll("canvas"));
      clonedCanvases.forEach((c, i) => {
        const dataURL = canvasSnapshots.get(i);
        if (!dataURL) return;
        const img = document.createElement("img");
        img.src = dataURL;
        img.style.cssText = `
          width: ${c.offsetWidth || c.width}px !important;
          height: ${c.offsetHeight || c.height}px !important;
          display: block !important;
        `;
        c.replaceWith(img);
      });

      // Step 9: Replace cloned <svg> elements with pre-captured images
      const clonedSVGs = Array.from(cloned.querySelectorAll("svg"));
      clonedSVGs.forEach((svg, i) => {
        const snap = svgSnapshots.get(i);
        if (!snap) return;
        const img = document.createElement("img");
        img.src = snap.dataURL;
        img.style.cssText = `
          width: ${snap.w}px !important;
          height: ${snap.h}px !important;
          display: block !important;
          margin: 0 auto !important;
        `;
        svg.replaceWith(img);
      });

      // Step 10: Wait for all the newly inserted img srcs to load
      await Promise.all(
        Array.from(container.querySelectorAll("img")).map(
          (img) =>
            new Promise((res) => {
              if (img.complete && img.naturalWidth > 0) return res();
              img.onload = res;
              img.onerror = res;
            })
        )
      );

      // Step 11: One more paint frame to ensure layout is stable
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      await new Promise((r) => setTimeout(r, 100));

      // Step 12: Now html2canvas on the fully-resolved, static clone
      const { default: html2canvas } = await import("html2canvas");

      const canvas = await html2canvas(cloned, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: "#ffffff",
        width: cloned.scrollWidth,
        height: cloned.scrollHeight,
        windowWidth: cloned.scrollWidth,
        windowHeight: cloned.scrollHeight,
        ignoreElements: (el) => {
          // Skip any element that is purely decorative / animation overlay
          return el.classList?.contains("toast-container");
        },
      });

      // Step 13: Clean up the off-screen container
      document.body.removeChild(container);

      // Step 14: Restore live animations
      allLiveEls.forEach((el) => {
        el.style.animationPlayState = "";
        el.style.transition = "";
        el.style.animation = "";
      });
      liveEl.style.animationPlayState = "";
      liveEl.style.animation = "";

      // Step 15: Build the PDF with proper multi-page support
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfW = pdf.internal.pageSize.getWidth();   // 210mm
      const pdfH = pdf.internal.pageSize.getHeight();  // 297mm

      const imgData = canvas.toDataURL("image/png");
      const imgAspect = canvas.height / canvas.width;
      const fullImgH = pdfW * imgAspect;

      if (fullImgH <= pdfH) {
        // Single page
        pdf.addImage(imgData, "PNG", 0, 0, pdfW, fullImgH);
      } else {
        // Multi-page: slice canvas into A4-height strips
        const pageHeightPx = Math.floor((canvas.width * pdfH) / pdfW);
        let yOffset = 0;
        let pageNum = 0;

        while (yOffset < canvas.height) {
          const sliceH = Math.min(pageHeightPx, canvas.height - yOffset);
          const pageCanvas = document.createElement("canvas");
          pageCanvas.width = canvas.width;
          pageCanvas.height = sliceH;
          const ctx = pageCanvas.getContext("2d");
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, sliceH);
          ctx.drawImage(
            canvas,
            0, yOffset, canvas.width, sliceH,
            0, 0, canvas.width, sliceH
          );
          if (pageNum > 0) pdf.addPage();
          pdf.addImage(
            pageCanvas.toDataURL("image/png"),
            "PNG",
            0, 0,
            pdfW,
            (sliceH * pdfW) / canvas.width
          );
          yOffset += sliceH;
          pageNum++;
        }
      }

      pdf.save(
        `BallotDA_Election_Readiness_Report_${new Date()
          .toLocaleDateString()
          .replace(/\//g, "_")}.pdf`
      );
      toast.success("Report downloaded successfully!");

    } catch (error) {
      console.error("PDF generation failed:", error);
      toast.error("Download failed — please try again.");

      // Safety: restore animations even on error
      try {
        reportRef.current?.querySelectorAll("*").forEach((el) => {
          el.style.animationPlayState = "";
          el.style.transition = "";
          el.style.animation = "";
        });
      } catch (_) { }

      // Safety: remove orphaned container if it exists
      const orphan = document.querySelector("[data-pdf-container]");
      if (orphan) document.body.removeChild(orphan);

    } finally {
      setDownloading(false);
    }
  };

  // ── Guard ──────────────────────────────────────────────────────────────────
  if (!scoreResult) {
    return (
      <PageWrapper>
        <p style={{ color: "var(--accent-blue)", textAlign: "center", marginTop: 80 }}>
          No results yet.{" "}
          <button
            onClick={() => setPhase(PHASES.LANDING)}
            className="btn btn-ghost"
            style={{ padding: "6px 14px", fontSize: 13 }}
          >
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

        {/* ── PDF CAPTURE ZONE ─────────────────────────────────────────────── */}
        <div
          id="pdf-capture"
          ref={reportRef}
          className="results-pdf-box"
          style={{
            background: "#ffffff",
            padding: "28px",
            borderRadius: "var(--radius-xl)",
            marginBottom: 24,
          }}
        >
          {/* 1. Header */}
          <div className="fade-up" style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ marginBottom: 12 }}>
              <img
                src="/logo-lg.png"
                alt="Ballot DA"
                crossOrigin="anonymous"
                style={{ height: 38, width: "auto" }}
              />
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--accent-blue)",
                letterSpacing: "0.15em",
                marginBottom: 8,
              }}
            >
              ELECTION READINESS SCORER™
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(22px, 3.5vw, 34px)",
                fontWeight: 700,
                color: "var(--accent-blue)",
                letterSpacing: "-0.02em",
              }}
            >
              {selectedDomain 
                ? `${selectedDomain.shortName} Readiness Report`
                : "Your Readiness Report"}
            </h1>
          </div>

          {/* 2. Score hero */}
          <div
            className="fade-up-1 results-score-hero"
            style={{
              padding: "40px 32px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-xl)",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            <div className="score-gauge-wrapper" style={{ display: "inline-block" }}>
              <ScoreGauge score={score} size={220} animate />
            </div>
            <div style={{ marginTop: 24, marginBottom: 14 }}>
              <TierBadge tier={tier} size="xl" />
            </div>
            <p
              style={{
                fontSize: 15,
                color: "var(--text-secondary)",
                maxWidth: 440,
                margin: "0 auto 8px",
                lineHeight: 1.6,
              }}
            >
              {tier.description}
            </p>
            <p
              style={{
                fontSize: 13,
                color: tier.color,
                fontStyle: "italic",
                fontWeight: 600,
              }}
            >
              {tier.urgency}
            </p>
          </div>

          {/* 3. Tier grid */}
          <div className="fade-up-2" style={{ marginBottom: absenteeRisk ? 20 : 0 }}>
            <TierGrid currentTier={tier} />
          </div>

          {/* 4. Absentee Risk Alert */}
          {absenteeRisk && (
            <div className="fade-up-2" style={{ marginTop: 4 }}>
              <AbsenteeRiskAlert
                onDemoClick={() =>
                  toast.info("Absentee Demo request received — a consultant will contact you shortly")
                }
                onAuditClick={() =>
                  toast.success("Audit request submitted — we'll be in touch within 24 hours")
                }
              />
            </div>
          )}
        </div>
        {/* ── END PDF CAPTURE ZONE ─────────────────────────────────────────── */}

        {/* ── SCREEN ONLY ───────────────────────────────────────────────────── */}
        <div className="fade-up-2" style={{ marginBottom: 28 }}>
          <DomainBreakdown domainScores={domainScores} />
        </div>

        <div className="fade-up-3" style={{ marginBottom: 28 }}>
          <LeadCaptureForm />
        </div>

        <div
          className="fade-up-3 results-cta-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginBottom: 28,
            width: "100%",
          }}
        >
          <button
            onClick={initSimulator}
            className="btn"
            style={{
              background: "var(--accent-blue)",
              color: "#fff",
              padding: "16px",
              fontSize: 14,
              flexDirection: "column",
              gap: 4,
              height: "auto",
              borderRadius: "var(--radius-lg)",
              width: "100%",
            }}
          >
            <span style={{ fontSize: 20 }}>🧪</span>
            <span style={{ fontWeight: 700 }}>Simulate a Better Setup</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, opacity: 0.8, fontWeight: 400 }}>
              See potential score improvement →
            </span>
          </button>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="btn"
            style={{
              background: downloading ? "#f1f5f9" : "white",
              color: downloading ? "#94a3b8" : "var(--accent-blue)",
              border: `1px solid ${downloading ? "#e2e8f0" : "var(--accent-blue)"}`,
              padding: "16px",
              fontSize: 14,
              flexDirection: "column",
              gap: 4,
              height: "auto",
              borderRadius: "var(--radius-lg)",
              width: "100%",
              cursor: downloading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
          >
            <span style={{ fontSize: 20 }}>{downloading ? "⏳" : "📥"}</span>
            <span style={{ fontWeight: 700 }}>
              {downloading ? "Generating PDF..." : "Download My Report"}
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, opacity: 0.8, fontWeight: 400 }}>
              {downloading ? "Please wait" : "Get a PDF copy of your results"}
            </span>
          </button>
        </div>

      </PageWrapper>
    </>
  );
}