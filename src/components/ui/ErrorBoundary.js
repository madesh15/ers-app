import React from "react";

/**
 * ErrorBoundary wraps the entire app.
 * Catches JS runtime errors and renders a recovery screen
 * instead of a blank white page.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // In production, pipe this to your error tracking (Sentry, etc.)
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div style={{
        minHeight: "100vh",
        background: "#020817",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "'Inter', sans-serif",
      }}>
        <div style={{
          maxWidth: 520,
          width: "100%",
          textAlign: "center",
          padding: "48px 32px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(239,68,68,0.2)",
          borderRadius: 20,
        }}>
          <div style={{ fontSize: 52, marginBottom: 20 }}>⚠️</div>

          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 26,
            color: "#f1f5f9",
            marginBottom: 12,
            letterSpacing: "-0.02em",
          }}>
            Something went wrong
          </h1>

          <p style={{
            fontSize: 14,
            color: "#64748b",
            lineHeight: 1.7,
            marginBottom: 28,
          }}>
            The assessment encountered an unexpected error.
            Your progress may not be saved. Please reload to start again.
          </p>

          {this.state.error && (
            <pre style={{
              background: "rgba(239,68,68,0.06)",
              border: "1px solid rgba(239,68,68,0.15)",
              borderRadius: 10,
              padding: "12px 16px",
              fontSize: 11,
              color: "#fca5a5",
              textAlign: "left",
              overflowX: "auto",
              marginBottom: 24,
              fontFamily: "'JetBrains Mono', monospace",
              whiteSpace: "pre-wrap",
            }}>
              {this.state.error.message}
            </pre>
          )}

          <button
            onClick={this.handleReset}
            style={{
              background: "linear-gradient(135deg, #3B82F6, #6366F1)",
              border: "none",
              borderRadius: 10,
              color: "#fff",
              padding: "12px 32px",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'Syne', sans-serif",
            }}
          >
            ↩ Reload Application
          </button>
        </div>
      </div>
    );
  }
}
