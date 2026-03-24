/**
 * Utility formatting helpers used across components.
 */

/** Format a score number as a percentage string */
export const fmtPct = (n) => `${n}%`;

/** Format pts delta with sign */
export const fmtDelta = (n) => (n > 0 ? `+${n}` : `${n}`);

/** Format a score out of 100 */
export const fmtScore = (n) => `${n}/100`;

/** Format dollar values (K suffix) */
export const fmtDollars = (n) => `$${n}K`;

/**
 * Returns a short urgency label for a domain percentage.
 * Used in domain bars and results tooltips.
 */
export function domainStatus(pct) {
  if (pct >= 75) return { label: "Strong",   color: "#10b981" };
  if (pct >= 50) return { label: "Moderate", color: "#f59e0b" };
  if (pct >= 25) return { label: "Weak",     color: "#f97316" };
  return           { label: "Critical",  color: "#ef4444" };
}

/**
 * Truncate a string to maxLen characters, appending "…" if needed.
 */
export const truncate = (str, maxLen = 80) =>
  str.length > maxLen ? str.slice(0, maxLen - 1) + "…" : str;

/**
 * Pluralise a word based on count.
 * pluralise(1, "gap")  → "1 gap"
 * pluralise(3, "gap")  → "3 gaps"
 */
export const pluralise = (count, word, plural) =>
  `${count} ${count === 1 ? word : (plural || word + "s")}`;
