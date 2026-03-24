import { useEffect } from "react";

/**
 * Keyboard navigation helper for the assessment page.
 * - Enter / ArrowRight → next
 * - ArrowLeft / Backspace → back
 * - 1–4 → select option by index (for card questions)
 */
export function useKeyboardNav({ onNext, onBack, onSelectIndex, enabled = true }) {
  useEffect(() => {
    if (!enabled) return;

    const handler = (e) => {
      // Don't intercept when typing in an input
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      if (/^[1-9]$/.test(e.key)) {
        e.preventDefault();
        onSelectIndex?.(parseInt(e.key, 10) - 1);
        return;
      }

      switch (e.key) {
        case "Enter":
        case "ArrowRight":
          e.preventDefault();
          onNext?.();
          break;
        case "ArrowLeft":
        case "Backspace":
          e.preventDefault();
          onBack?.();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onNext, onBack, onSelectIndex, enabled]);
}
