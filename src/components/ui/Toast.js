import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

// ─── Context ─────────────────────────────────────────────────────
const ToastContext = createContext(null);

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration = 3500) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    info:    (msg) => addToast(msg, "info"),
    success: (msg) => addToast(msg, "success"),
    warn:    (msg) => addToast(msg, "warn"),
    error:   (msg) => addToast(msg, "error"),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}

// ─── Toast Container ─────────────────────────────────────────────
function ToastContainer({ toasts, onRemove }) {
  if (!toasts.length) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: 24,
      right: 24,
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      gap: 8,
      pointerEvents: "none",
    }}>
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onRemove={onRemove} />
      ))}
    </div>
  );
}

// ─── Toast Item ──────────────────────────────────────────────────
const TOAST_STYLES = {
  info:    { bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.3)",  icon: "ℹ️",  color: "var(--accent-blue)" },
  success: { bg: "rgba(16,185,129,0.12)",  border: "rgba(16,185,129,0.3)",  icon: "✅", color: "var(--accent-green)" },
  warn:    { bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.3)",  icon: "⚠️", color: "var(--accent-amber)" },
  error:   { bg: "rgba(239,68,68,0.12)",   border: "rgba(239,68,68,0.3)",   icon: "❌", color: "var(--accent-red)" },
};

function ToastItem({ toast, onRemove }) {
  const [visible, setVisible] = useState(false);
  const s = TOAST_STYLES[toast.type] || TOAST_STYLES.info;

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  return (
    <div
      onClick={() => onRemove(toast.id)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 16px",
        background: s.bg,
        border: `1px solid ${s.border}`,
        borderRadius: 10,
        minWidth: 260,
        maxWidth: 340,
        pointerEvents: "all",
        cursor: "pointer",
        backdropFilter: "blur(12px)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(20px)",
        transition: "opacity 0.25s ease, transform 0.25s ease",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <span style={{ fontSize: 16, flexShrink: 0 }}>{s.icon}</span>
      <span style={{ fontSize: 13, color: s.color, flex: 1, lineHeight: 1.4 }}>
        {toast.message}
      </span>
      <span style={{ fontSize: 16, color: "var(--text-muted)", flexShrink: 0 }}>×</span>
    </div>
  );
}
