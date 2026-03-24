import React from "react";
import { useAssessment } from "../../context/AssessmentContext";
import { useToast } from "../ui/Toast";

export default function LeadCaptureForm({ onSubmit }) {
  const { lead, updateLead, leadCaptured, setLeadCaptured } = useAssessment();
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!lead.email || !lead.name) return;
    setLeadCaptured(true);
    toast.success(`Report sent to ${lead.email}! We'll follow up within 24 hours.`);
    if (onSubmit) onSubmit(lead);
  };

  if (leadCaptured) {
    return (
      <div className="fade-up" style={{
        padding: "28px 24px",
        background: "rgba(16,185,129,0.06)",
        border: "1px solid rgba(16,185,129,0.22)",
        borderRadius: "var(--radius-lg)",
        textAlign: "center",
      }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>✅</div>
        <div style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 18,
          color: "var(--accent-green)",
          marginBottom: 6,
        }}>
          Report sent to {lead.email}
        </div>

      </div>
    );
  }
}
