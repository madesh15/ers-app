// ─── QUESTIONS ────────────────────────────────────────────────────────────────
// Source: Section 4 — Question Framework: 6 Domains with Adaptive Intelligence
//
// Interaction types:
//   "cards"        — visual card selection (most questions)
//   "scenario"     — scenario-based card selection (behavioural)
//   "slider"       — drag/click slider with labeled stops
//   "slider_toggle"— slider + bonus toggle (Q23 only)
//
// adaptiveTrigger: { triggerValues: string[], unlocks: string[] }
//   → When answer.value is in triggerValues, the listed question IDs are appended
//
// penaltyValues: string[] → values that apply a penalty to the score
// penaltyPts:   number   → points deducted when a penalty value is selected

export const QUESTIONS = [

  // ══════════════════════════════════════════════════════════════════
  // DOMAIN 1 — Poll Worker Management  (3 Core + 0-2 Adaptive)
  // Strategic Goal: Expose coordination chaos
  // ══════════════════════════════════════════════════════════════════

  {
    id: "Q1",
    domain: 1,
    type: "core",
    points: 5,
    interaction: "cards",
    text: "How do you manage poll worker recruitment and scheduling?",
    hint: "This is where most counties face their first coordination breakdown.",
    options: [
      { value: "manual",    label: "Manual / Spreadsheets",       icon: "📋", pts: 0, desc: "Paper forms and manual tracking" },
      { value: "email",     label: "Email-based coordination",    icon: "📧", pts: 1, desc: "Email chains and shared folders" },
      { value: "generic",   label: "Generic project tools",       icon: "🛠️", pts: 3, desc: "Trello, Asana, or Google Sheets" },
      { value: "dedicated", label: "Dedicated election system",   icon: "⚙️", pts: 5, desc: "Purpose-built election platform" },
    ],
    adaptiveTrigger: {
      triggerValues: ["manual", "email"],
      unlocks: ["Q1a", "Q1b"],
      microCopy: "Got it — let's understand that setup a bit deeper",
    },
    adaptiveTriggerAlt: {
      triggerValues: ["dedicated"],
      unlocks: ["Q1c"],
      microCopy: "Great — let's understand how deeply this integrates",
    },
  },

  {
    id: "Q1a",
    domain: 1,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "How many versions of your poll worker spreadsheet currently exist across your team?",
    hint: "Version conflicts are the #1 cause of election-day coordination failures.",
    options: [
      { value: "many",    label: "5+ versions (major conflict risk)", icon: "🚨", pts: 0 },
      { value: "several", label: "3–4 versions",                     icon: "⚠️", pts: 1 },
      { value: "two",     label: "2 versions",                       icon: "📄", pts: 2 },
      { value: "one",     label: "Single master copy",               icon: "✅", pts: 4 },
    ],
  },

  {
    id: "Q1b",
    domain: 1,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "How often do coordination conflicts occur due to scheduling or data mismatches?",
    options: [
      { value: "frequent",   label: "Frequently (every election)", icon: "🔴", pts: 0 },
      { value: "occasional", label: "Occasionally",               icon: "🟡", pts: 2 },
      { value: "rare",       label: "Rarely",                     icon: "🟢", pts: 3 },
      { value: "never",      label: "Never",                      icon: "✨", pts: 4 },
    ],
  },

  {
    id: "Q1c",
    domain: 1,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "Does your dedicated system integrate with training records and payroll?",
    options: [
      { value: "no_integration", label: "No integration at all",       icon: "❌", pts: 0 },
      { value: "manual_export",  label: "Manual data export/import",   icon: "🔄", pts: 1 },
      { value: "partial",        label: "Partial integration",         icon: "⚡", pts: 2 },
      { value: "full",           label: "Full seamless integration",   icon: "🔗", pts: 4 },
    ],
  },

  {
    id: "Q2",
    domain: 1,
    type: "core",
    points: 5,
    interaction: "cards",
    text: "How do you handle real-time poll worker availability and day-of status updates?",
    options: [
      { value: "phone",     label: "Phone calls only",          icon: "📞", pts: 0 },
      { value: "texts",     label: "Text / email check-ins",    icon: "💬", pts: 2 },
      { value: "shared_doc",label: "Shared document updates",   icon: "📁", pts: 3 },
      { value: "dashboard", label: "Live system dashboard",     icon: "📡", pts: 5 },
    ],
  },

  {
    id: "Q3",
    domain: 1,
    type: "core",
    points: 5,
    interaction: "slider",
    text: "How long does it take to resolve a poll worker no-show on election day?",
    hint: "Every minute of delay compounds downstream issues across all precincts.",
    options: [
      { value: "over2hrs",  label: "> 2 hours",    pts: 0 },
      { value: "1to2hrs",   label: "1 – 2 hours",  pts: 2 },
      { value: "30to60min", label: "30 – 60 min",  pts: 3 },
      { value: "under30",   label: "< 30 min",     pts: 5 },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // DOMAIN 2 — Election Asset Management  (4 Core + 0-1 Adaptive)
  // Strategic Goal: Reveal visibility gaps
  // ══════════════════════════════════════════════════════════════════

  {
    id: "Q4",
    domain: 2,
    type: "core",
    points: 5,
    interaction: "cards",
    text: "How do you track voting equipment inventory and location?",
    options: [
      { value: "paper",      label: "Paper logs / no system",                   icon: "📝", pts: 0 },
      { value: "spreadsheet",label: "Spreadsheets",                             icon: "📊", pts: 1 },
      { value: "generic_sw", label: "Generic asset software",                  icon: "💼", pts: 3 },
      { value: "realtime",   label: "Election-specific real-time system",      icon: "📡", pts: 5 },
    ],
  },

  {
    id: "Q5",
    domain: 2,
    type: "core",
    points: 5,
    interaction: "cards",
    text: "How do you manage Logic & Accuracy (L&A) testing workflows before elections?",
    options: [
      { value: "manual_check", label: "Manual checklists",                 icon: "✍️", pts: 0 },
      { value: "email_remind", label: "Email / calendar reminders",        icon: "📅", pts: 2 },
      { value: "documented",   label: "Documented process, no automation", icon: "📋", pts: 3 },
      { value: "automated",    label: "Automated L&A tracking system",     icon: "⚙️", pts: 5 },
    ],
    adaptiveTrigger: {
      triggerValues: ["manual_check", "email_remind"],
      unlocks: ["Q5a"],
      microCopy: "L&A testing gaps are a leading cause of equipment failures — let's go deeper",
    },
  },

  {
    id: "Q5a",
    domain: 2,
    type: "adaptive",
    points: 3,
    interaction: "cards",
    text: "Has equipment ever arrived at a polling site without completing required L&A testing?",
    options: [
      { value: "yes_multiple", label: "Yes, more than once",    icon: "🚨", pts: 0 },
      { value: "yes_once",     label: "Yes, once",              icon: "⚠️", pts: 1 },
      { value: "close",        label: "No, but it's been close",icon: "😅", pts: 2 },
      { value: "never",        label: "Never",                  icon: "✅", pts: 3 },
    ],
  },

  {
    id: "Q6",
    domain: 2,
    type: "core",
    points: 5,
    interaction: "slider",
    text: "How quickly can you locate a specific piece of voting equipment during an election?",
    options: [
      { value: "hours",  label: "Hours",       pts: 0 },
      { value: "30to60", label: "30 – 60 min", pts: 2 },
      { value: "10to30", label: "10 – 30 min", pts: 3 },
      { value: "under10",label: "< 10 min",    pts: 5 },
    ],
  },

  {
    id: "Q7",
    domain: 2,
    type: "core",
    points: 5,
    interaction: "cards",
    text: "How do you manage consumables (ballots, seals, pens) across all precincts?",
    options: [
      { value: "guesses",    label: "Order based on guesses",                icon: "🎲", pts: 0 },
      { value: "historical", label: "Historical spreadsheet estimates",       icon: "📊", pts: 2 },
      { value: "centralized",label: "Centralized inventory with alerts",      icon: "🔔", pts: 4 },
      { value: "automated",  label: "Automated reorder & tracking",           icon: "⚡", pts: 5 },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // DOMAIN 3 — Policy AI / Legal Response  (2 Core + 0-1 Adaptive)
  // Strategic Goal: Show delay costs
  // ══════════════════════════════════════════════════════════════════

  {
    id: "Q8",
    domain: 3,
    type: "core",
    points: 5,
    interaction: "slider",
    text: "When a poll worker has an urgent legal/policy question during an election, how long does it take to get an accurate answer?",
    hint: "Decision paralysis during live elections carries compliance and public trust costs.",
    options: [
      { value: "over_week", label: "> 1 week",            pts: 0 },
      { value: "2to5days",  label: "2 – 5 days",          pts: 1 },
      { value: "same_day",  label: "Same day",             pts: 3 },
      { value: "under1hr",  label: "< 1 hr via AI system", pts: 5 },
    ],
    adaptiveTrigger: {
      triggerValues: ["over_week", "2to5days"],
      unlocks: ["Q8a"],
      microCopy: "This is where most counties face challenges — let's understand your escalation path",
    },
  },

  {
    id: "Q8a",
    domain: 3,
    type: "adaptive",
    points: 3,
    interaction: "cards",
    text: "When you can't get an immediate answer to a legal question, how do you handle the uncertainty?",
    options: [
      { value: "judgment_call", label: "Make a judgment call on the spot",  icon: "🤷", pts: 0 },
      { value: "delay",         label: "Delay the activity until confirmed", icon: "⏸️", pts: 1 },
      { value: "escalate",      label: "Escalate to supervisor",             icon: "📞", pts: 2 },
      { value: "documented_esc",label: "Documented escalation process",     icon: "📋", pts: 3 },
    ],
  },

  {
    id: "Q9",
    domain: 3,
    type: "core",
    points: 5,
    interaction: "cards",
    text: "How current is your election law reference library?",
    options: [
      { value: "outdated", label: "Outdated / printed binders",      icon: "📚", pts: 0 },
      { value: "manual",   label: "Shared drive, manually updated",  icon: "💾", pts: 2 },
      { value: "digital",  label: "Digital, updated per cycle",      icon: "🔄", pts: 3 },
      { value: "ai",       label: "AI-powered, real-time updates",   icon: "🤖", pts: 5 },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // DOMAIN 4 — Support IQ  (4 Core + 0-1 Adaptive)
  // Strategic Goal: Surface issue tracking failures
  // ══════════════════════════════════════════════════════════════════

  {
    id: "Q10",
    domain: 4,
    type: "core",
    points: 6,
    interaction: "cards",
    text: "How do your election teams submit and track operational issues or support requests?",
    options: [
      { value: "none",        label: "No established process",     icon: "🤷", pts: 0 },
      { value: "phone",       label: "Phone calls / verbal",       icon: "📞", pts: 1 },
      { value: "texts",       label: "Text messages",              icon: "📱", pts: 2 },
      { value: "email_chains",label: "Email chains",               icon: "📧", pts: 3 },
      { value: "spreadsheet", label: "Shared spreadsheet log",     icon: "📊", pts: 4 },
      { value: "ticketing",   label: "Dedicated ticketing system", icon: "🎫", pts: 6 },
    ],
    adaptiveTrigger: {
      triggerValues: ["phone", "email_chains", "texts", "none"],
      unlocks: ["Q10a"],
      microCopy: "Interesting — let's understand how often this leads to issues falling through the cracks",
    },
  },

  {
    id: "Q10a",
    domain: 4,
    type: "adaptive",
    points: 3,
    interaction: "cards",
    text: "How often do critical issues fall through the cracks with your current tracking method?",
    options: [
      { value: "regularly",  label: "Regularly — it's a major problem", icon: "🚨", pts: 0 },
      { value: "sometimes",  label: "Sometimes",                        icon: "⚠️", pts: 1 },
      { value: "rarely",     label: "Rarely",                           icon: "🟡", pts: 2 },
      { value: "almost_nvr", label: "Almost never",                     icon: "✅", pts: 3 },
    ],
  },

  {
    id: "Q11",
    domain: 4,
    type: "core",
    points: 6,
    interaction: "slider",
    text: "What is your average resolution time for a support issue reported by a poll worker or precinct?",
    options: [
      { value: "over48",  label: "> 48 hours",  pts: 0 },
      { value: "24to48",  label: "24 – 48 hours",pts: 1 },
      { value: "12to24",  label: "12 – 24 hours",pts: 2 },
      { value: "4to12",   label: "4 – 12 hours", pts: 3 },
      { value: "1to4",    label: "1 – 4 hours",  pts: 5 },
      { value: "under1",  label: "< 1 hour",     pts: 6 },
    ],
  },

  {
    id: "Q11a",
    domain: 4,
    type: "core",
    points: 6,
    interaction: "slider",
    text: "How much visibility does the central office have into the backlog of incoming support requests during early voting?",
    options: [
      { value: "blind",      label: "Completely blind",   pts: 0 },
      { value: "eod",        label: "End of day reports", pts: 1 },
      { value: "delayed",    label: "Delayed hourly syncs", pts: 3 },
      { value: "manager",    label: "Only manager visibility", pts: 4 },
      { value: "dashboard",  label: "Live static dashboard", pts: 5 },
      { value: "live_ai",    label: "Live AI-assisted dashboard", pts: 6 },
    ],
  },

  {
    id: "Q11b",
    domain: 4,
    type: "core",
    points: 6,
    interaction: "cards",
    text: "How do you prioritize incoming support tickets from different polling locations?",
    options: [
      { value: "fifo",         label: "First-in, First-out",               icon: "⏳", pts: 0 },
      { value: "guesswork",    label: "Manual guesswork / gut feeling",    icon: "🤷", pts: 1 },
      { value: "manual_triage",label: "Manual triage by a dispatcher",     icon: "🧑‍💻", pts: 3 },
      { value: "location",     label: "By polling location size",          icon: "🏢", pts: 4 },
      { value: "rules",        label: "Automated routing rules",           icon: "⚙️", pts: 5 },
      { value: "ai_score",     label: "AI urgency scoring & routing",      icon: "🤖", pts: 6 },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // DOMAIN 5 — Analytics & FOIA Readiness  (2 Core, no adaptive)
  // Strategic Goal: Expose transparency gaps
  // ══════════════════════════════════════════════════════════════════

  {
    id: "Q12",
    domain: 5,
    type: "core",
    points: 5,
    interaction: "cards",
    text: "How do you generate voter data analytics and election performance reports?",
    options: [
      { value: "none",       label: "No formal reporting",               icon: "❌", pts: 0 },
      { value: "manual",     label: "Manual spreadsheet compilation",    icon: "📊", pts: 2 },
      { value: "basic_bi",   label: "Basic BI / reporting tool",         icon: "📈", pts: 3 },
      { value: "integrated", label: "Integrated analytics platform",     icon: "🔭", pts: 5 },
    ],
  },

  {
    id: "Q13",
    domain: 5,
    type: "core",
    points: 5,
    interaction: "slider",
    text: "How long does it typically take to fulfill a FOIA / Open Records request?",
    hint: "Delayed FOIA responses are a growing source of public trust issues.",
    options: [
      { value: "weeks",   label: "Weeks",       pts: 0 },
      { value: "5to10",   label: "5 – 10 days", pts: 2 },
      { value: "2to4",    label: "2 – 4 days",  pts: 3 },
      { value: "under24h",label: "< 24 hours",  pts: 5 },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // DOMAIN 6 — Absentee Ballot Portal  (3 Core + 0-1 Adaptive)
  // Strategic Goal: Legal/public risk — COMPLIANCE WEDGE (HIGH PRIORITY)
  // Source: Section 4 — Domain 6 detailed spec + Q21–Q24
  // ══════════════════════════════════════════════════════════════════

  {
    id: "Q21",
    domain: 6,
    type: "core",
    points: 5,
    interaction: "cards",
    text: "How are absentee ballot requests and documents currently handled?",
    hint: "Manual intake = high friction, data entry errors, and processing delays.",
    options: [
      { value: "manual",    label: "Manual entry from paper forms",        icon: "📄", pts: 0 },
      { value: "email_dig", label: "Email + partial digitization",        icon: "📧", pts: 2 },
      { value: "semi_dig",  label: "Semi-digital with uploads",           icon: "🧑‍💻", pts: 3 },
      { value: "automated", label: "Fully automated intake + tagging",    icon: "⚙️", pts: 5 },
    ],
    adaptiveTrigger: {
      triggerValues: ["manual", "email_dig"],
      unlocks: ["Q24"],
      microCopy: "Based on your answer — this is where cure workflow gaps typically emerge",
    },
  },

  {
    id: "Q22",
    domain: 6,
    type: "core",
    points: 5,
    interaction: "scenario",
    text: "A voter submits an absentee request with ID proof. What happens next in your process?",
    hint: "This maps directly to verification + voter record integration capability.",
    options: [
      { value: "manual_verify",  label: "Manual verification + lookup in state DB",       icon: "🔍", pts: 0 },
      { value: "sep_systems",    label: "Separate systems for ID & voter records",         icon: "📁", pts: 1 },
      { value: "partial_int",    label: "Partial integration between systems",             icon: "🔗", pts: 3 },
      { value: "auto_verify",    label: "Instant auto-verification via integrated system", icon: "⚡", pts: 5 },
    ],
  },

  {
    id: "Q23",
    domain: 6,
    type: "core",
    points: 6,
    interaction: "slider_toggle",
    text: "How quickly can you generate an accurate absentee ballot status report (e.g., daily 10 AM report)?",
    hint: "This is the highest-weighted question — real-time visibility is critical.",
    options: [
      { value: "multi_days", label: "Multiple days", pts: 0 },
      { value: "next_day",   label: "Next day",      pts: 2 },
      { value: "same_day",   label: "Same day",      pts: 4 },
      { value: "realtime",   label: "Real-time",     pts: 6 },
    ],
    toggleLabel: "Report includes cure status & voter communication history",
    toggleBonus: 1,

  },

  {
    id: "Q24",
    domain: 6,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "How do you currently manage ballot curing (when voters need to correct issues)?",
    hint: "Cure workflows + voter interaction tracking is a key Ballot D.A. capability.",
    options: [
      { value: "manual_outreach", label: "Manual outreach (calls/emails)",     icon: "📞", pts: 0 },
      { value: "spreadsheet",     label: "Spreadsheet tracking",               icon: "📊", pts: 1 },
      { value: "partial_sys",     label: "Partial system support",             icon: "🔗", pts: 3 },
      { value: "full_auto",       label: "Fully tracked + automated workflow", icon: "⚡", pts: 4 },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // DOMAIN 7 — Voter AI  (2 Core, no adaptive)
  // Strategic Goal: Automate voter engagement and guidance
  // ══════════════════════════════════════════════════════════════════

  {
    id: "Q25",
    domain: 7,
    type: "core",
    points: 5,
    interaction: "cards",
    text: "How do you Disseminate Voting Procedure, Polling Location and Other Critical Details?",
    hint: "Real-time dissemination reduces call center volume and voter frustration.",
    options: [
      { value: "none",        label: "No specialized process",         icon: "❌", pts: 0 },
      { value: "manual",      label: "Phone Calls / Manual Inquiry",   icon: "📞", pts: 1 },
      { value: "static",      label: "Static Website PDFs",            icon: "📄", pts: 3 },
      { value: "realtime",    label: "Real-Time Voter Guidance",       icon: "🤖", pts: 5 },
    ],
  },

  {
    id: "Q26",
    domain: 7,
    type: "core",
    points: 5,
    interaction: "cards",
    text: "How do you handle high-volume voter inquiries during peak election cycles?",
    options: [
      { value: "no_capacity", label: "No formal capacity",             icon: "🔇", pts: 0 },
      { value: "email",       label: "Manual Email Response",          icon: "📧", pts: 1 },
      { value: "call_center", label: "Dedicated Call Center",          icon: "🧑‍💼", pts: 3 },
      { value: "ai_auto",      label: "AI-Powered Automated Response", icon: "🤖", pts: 5 },
    ],
  },
];

// ─── QUESTION LOOKUP ──────────────────────────────────────────────
export const getQuestion = (id) => QUESTIONS.find((q) => q.id === id);

// ─── CORE QUESTIONS (ordered) ─────────────────────────────────────
export const CORE_QUESTIONS = QUESTIONS.filter((q) => q.type === "core");
