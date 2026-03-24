import React from "react";

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: "#0d1424", // Very dark navy
      color: "#94a3b8",
      padding: "20px 40px",
      marginTop: "auto",
      fontFamily: "var(--font-sans, system-ui, sans-serif)",
      borderTop: "1px solid rgba(255, 255, 255, 0.05)",
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 30,
      }}>
        {/* Logo */}
        <div style={{
          background: "#ffffff",
          borderRadius: 8,
          padding: "10px 18px",
          display: "inline-flex",
          alignItems: "center",
        }}>
          <img src="/logo-lg.png" alt="BallotDA" style={{ height: 28 }} />
        </div>

        {/* Text Section */}
        <div style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
          fontSize: 13,
          color: "#6b7280",
        }}>
          <span>© 2026 PolicyAI. All rights reserved.</span>
          <span style={{ opacity: 0.5 }}>|</span>
          <span>
            PolicyAI (BallotDA) is a product of{" "}
            <a href="https://sonline.us" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: 500 }}>
              Sonline.us
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
