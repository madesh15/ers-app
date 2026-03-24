import { useEffect } from "react";

/**
 * Scrolls window to top whenever `dependency` changes.
 * Useful for phase transitions and question navigation.
 */
export function useScrollTop(dependency) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dependency]);
}
