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
    adaptiveTrigger: {
      triggerValues: ["phone", "texts"],
      unlocks: ["Q2a"],
      microCopy: "Manual tracking usually hides coordination gaps — let's look closer",
    },
  },

  {
    id: "Q2a",
    domain: 1,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "How much administrative time is spent per week manually verifying availability?",
    options: [
      { value: "excessive", label: "20+ hours (major drain)", icon: "⏳", pts: 0 },
      { value: "moderate",  label: "10–20 hours",            icon: "🕒", pts: 1 },
      { value: "low",       label: "5–10 hours",             icon: "⏱️", pts: 2 },
      { value: "minimal",   label: "< 5 hours",              icon: "✅", pts: 4 },
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
    adaptiveTrigger: {
      triggerValues: ["over2hrs", "1to2hrs"],
      unlocks: ["Q3a"],
      microCopy: "Delays in resolution often signal a lack of reserve capacity",
    },
  },

  {
    id: "Q3a",
    domain: 1,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "What is the primary cause of delay in resolving no-shows?",
    options: [
      { value: "comms",     label: "Communication breakdown", icon: "📵", pts: 0 },
      { value: "no_reserve",label: "Lack of standby reserves",icon: "🪑", pts: 1 },
      { value: "transport", label: "Transportation/logistics",icon: "🚗", pts: 2 },
      { value: "auth",      label: "Approval/Authorization",  icon: "🔑", pts: 3 },
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
    adaptiveTrigger: {
      triggerValues: ["paper", "spreadsheet"],
      unlocks: ["Q4a"],
      microCopy: "Manual tracking often leads to 'ghost equipment' — let's verify visibility",
    },
  },

  {
    id: "Q4a",
    domain: 2,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "Have you ever 'lost' a piece of equipment during an election due to paper-based tracking?",
    options: [
      { value: "yes_major",  label: "Yes, major items (scanners, etc.)", icon: "🚨", pts: 0 },
      { value: "yes_minor",  label: "Yes, minor items (seals, cases)",   icon: "⚠️", pts: 1 },
      { value: "close",      label: "No, but audits were difficult",     icon: "🧐", pts: 2 },
      { value: "never",      label: "Never — perfect tracking",          icon: "✅", pts: 4 },
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
    adaptiveTrigger: {
      triggerValues: ["hours", "30to60"],
      unlocks: ["Q6a"],
      microCopy: "Search delays can paralyze a polling site — let's impact test this",
    },
  },

  {
    id: "Q6a",
    domain: 2,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "Does the delay in locating equipment typically impact the start of voting?",
    options: [
      { value: "yes_often", label: "Yes, multiple precincts delayed", icon: "🛑", pts: 0 },
      { value: "yes_once",  label: "Yes, at least one precinct",      icon: "⚠️", pts: 1 },
      { value: "near_miss", label: "No, but it's been a near miss",   icon: "🏃", pts: 2 },
      { value: "no_impact", label: "No impact at all",               icon: "✨", pts: 4 },
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
    adaptiveTrigger: {
      triggerValues: ["guesses", "historical"],
      unlocks: ["Q7a"],
      microCopy: "Estimation gaps can lead to Election Day shortages",
    },
  },

  {
    id: "Q7a",
    domain: 2,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "How often do you run out of critical consumables on Election Day?",
    options: [
      { value: "frequent",   label: "Frequently (every cycle)", icon: "🔴", pts: 0 },
      { value: "occasional", label: "Occasionally",           icon: "🟡", pts: 1 },
      { value: "rare",       label: "Rarely",                 icon: "🟢", pts: 3 },
      { value: "never",      label: "Never",                  icon: "✨", pts: 4 },
    ],
    adaptiveTrigger: {
      triggerValues: ["frequent", "occasional"],
      unlocks: ["Q7b"],
      microCopy: "Supply chain failure during an election is high risk",
    },
  },

  {
    id: "Q7b",
    domain: 2,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "What is the emergency protocol for resupplying a precinct?",
    options: [
      { value: "no_plan",    label: "No formal protocol",          icon: "🤷", pts: 0 },
      { value: "manual_run", label: "Staff manually drives supplies",icon: "🚗", pts: 1 },
      { value: "deputy",     label: "Sheriff / Deputy delivery",    icon: "🚔", pts: 3 },
      { value: "automated",  label: "Automated courier dispatch",   icon: "📡", pts: 4 },
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
      triggerValues: ["over_week", "2to5days", "same_day"],
      unlocks: ["Q8a"],
      microCopy: "This is where most counties face challenges — let's understand your escalation path",
    },
    adaptiveTriggerAlt: {
      triggerValues: ["over_week", "2to5days"],
      unlocks: ["Q8b"],
      microCopy: "Longer delays often imply higher litigation risks",
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
    id: "Q8b",
    domain: 3,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "What is the estimated financial cost or risk of these legal delays?",
    options: [
      { value: "high",     label: "High (potential litigation/re-votes)", icon: "⚖️", pts: 0 },
      { value: "moderate", label: "Significant (extended poll hours)",    icon: "🕒", pts: 1 },
      { value: "minor",    label: "Minor (individual voter complaints)",  icon: "💬", pts: 3 },
      { value: "none",     label: "Minimal risk",                        icon: "🛡️", pts: 4 },
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
    adaptiveTrigger: {
      triggerValues: ["outdated", "manual"],
      unlocks: ["Q9a"],
      microCopy: "Updating staff on law changes is a critical compliance step",
    },
  },

  {
    id: "Q9a",
    domain: 3,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "How do you ensure poll workers have read the most recent legal updates?",
    options: [
      { value: "hope",      label: "Assumed read (no tracking)",     icon: "🤞", pts: 0 },
      { value: "verbal",    label: "Verbal confirmation at check-in", icon: "🗣️", pts: 1 },
      { value: "sign_off",  label: "Manual paper sign-off sheets",    icon: "✍️", pts: 2 },
      { value: "digital",   label: "Digital read-receipts/tracking",  icon: "📱", pts: 4 },
    ],
    adaptiveTrigger: {
      triggerValues: ["verbal", "sign_off", "digital"],
      unlocks: ["Q9b"],
      microCopy: "Auditability is key — let's look at documentation",
    },
  },

  {
    id: "Q9b",
    domain: 3,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "How do you document specific legal advice given to a poll worker?",
    options: [
      { value: "not_doc",    label: "Rarely documented (verbal only)", icon: "💨", pts: 0 },
      { value: "notebook",   label: "Handwritten notebooks",           icon: "📝", pts: 1 },
      { value: "log",        label: "Digital support log",             icon: "💻", pts: 3 },
      { value: "integrated", label: "Integrated case management system", icon: "⚙️", pts: 4 },
    ],
    adaptiveTrigger: {
      triggerValues: ["notebook", "log"],
      unlocks: ["Q9c"],
      microCopy: "Searchability can save hours during an audit",
    },
  },

  {
    id: "Q9c",
    domain: 3,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "Is this documentation easily searchable during a post-election challenge?",
    options: [
      { value: "no",       label: "No — requires manual paging",   icon: "📖", pts: 0 },
      { value: "partial",  label: "Partially — simple text search", icon: "🔍", pts: 2 },
      { value: "high",     label: "Highly searchable / indexed",    icon: "📂", pts: 4 },
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
    adaptiveTrigger: {
      triggerValues: ["over48", "24to48", "12to24"],
      unlocks: ["Q11c"],
      microCopy: "Extended resolution times often point to staffing or tool limitations",
    },
  },

  {
    id: "Q11c",
    domain: 4,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "Do these delays lead to negative press or social media complaints from voters?",
    options: [
      { value: "often",   label: "Often — major PR risk", icon: "🗞️", pts: 0 },
      { value: "sometimes",label: "Sometimes",             icon: "🗣️", pts: 1 },
      { value: "rarely",   label: "Rarely",                icon: "🟡", pts: 3 },
      { value: "never",    label: "Never",                 icon: "✨", pts: 4 },
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
    adaptiveTrigger: {
      triggerValues: ["fifo", "guesswork"],
      unlocks: ["Q11d"],
      microCopy: "Static prioritization often ignores the urgency of critical technical failures",
    },
  },

  {
    id: "Q11d",
    domain: 4,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "How do you ensure high-priority precincts aren't stuck behind minor requests?",
    options: [
      { value: "manual",    label: "Manual override by lead tech", icon: "⌨️", pts: 1 },
      { value: "yell",      label: "Whoever yells the loudest",    icon: "📣", pts: 0 },
      { value: "rules",     label: "Strict urgency-based rules",   icon: "📏", pts: 3 },
      { value: "ai",        label: "AI-priority auto-escalation",  icon: "🤖", pts: 4 },
    ],
    adaptiveTrigger: {
      triggerValues: ["manual", "yell"],
      unlocks: ["Q11e"],
      microCopy: "Subjective prioritization is difficult to scale during high-turnout elections",
    },
  },

  {
    id: "Q11e",
    domain: 4,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "Can you identify which precincts are reporting the most technical issues in real-time?",
    options: [
      { value: "no",       label: "No — only found out after EOD", icon: "🌑", pts: 0 },
      { value: "limited",  label: "Limited (manual spreadsheet logs)", icon: "📊", pts: 1 },
      { value: "heat_map", label: "Yes — live ticketing heat map",  icon: "🗺️", pts: 3 },
      { value: "ai_trend", label: "Yes — AI trend prediction",      icon: "📈", pts: 4 },
    ],
    adaptiveTrigger: {
      triggerValues: ["limited", "heat_map"],
      unlocks: ["Q11f"],
      microCopy: "Predictive analytics can help you re-allocate techs before they are needed",
    },
  },

  {
    id: "Q11f",
    domain: 4,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "Do you use this data to preemptively send technicians to high-risk areas?",
    options: [
      { value: "reactive",  label: "Stay reactive (calls only)",  icon: "📱", pts: 0 },
      { value: "manual",    label: "Manual proactive dispatch",    icon: "🏎️", pts: 2 },
      { value: "automated", label: "Automated route optimization",icon: "📡", pts: 4 },
    ],
  },

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
    adaptiveTrigger: {
      triggerValues: ["none", "manual"],
      unlocks: ["Q12a"],
      microCopy: "Manual reporting is prone to human error — let's look at the time cost",
    },
  },

  {
    id: "Q12a",
    domain: 5,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "How many person-hours are spent compiling data for a single post-election report?",
    options: [
      { value: "excessive", label: "40+ hours (full week)",   icon: "😩", pts: 0 },
      { value: "moderate",  label: "16–40 hours",            icon: "🕒", pts: 1 },
      { value: "low",       label: "4–16 hours",             icon: "⏱️", pts: 2 },
      { value: "automated", label: "Under 4 hours (automated)", icon: "⚡", pts: 4 },
    ],
    adaptiveTrigger: {
      triggerValues: ["excessive", "moderate"],
      unlocks: ["Q12b"],
      microCopy: "High manual effort often correlates with low data validation",
    },
  },

  {
    id: "Q12b",
    domain: 5,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "Is this data typically validated by a second party for accuracy?",
    options: [
      { value: "no",       label: "No — trust the single source",    icon: "🤞", pts: 0 },
      { value: "spot",     label: "Spot checks only",                icon: "🔍", pts: 1 },
      { value: "formal",   label: "Formal multi-person sign-off",   icon: "✍️", pts: 3 },
      { value: "system",   label: "Automated system validation",    icon: "⚙️", pts: 4 },
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
    adaptiveTrigger: {
      triggerValues: ["weeks", "5to10"],
      unlocks: ["Q13a"],
      microCopy: "FOIA delays can often be traced to manual redaction or lookups",
    },
  },

  {
    id: "Q13a",
    domain: 5,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "What is the primary bottleneck in your FOIA fulfillment process?",
    options: [
      { value: "gathering", label: "Data gathering (multiple files)", icon: "📂", pts: 1 },
      { value: "redaction", label: "Manual redaction of PII",         icon: "🖍️", pts: 0 },
      { value: "legal",     label: "Legal / Supervisor review",       icon: "⚖️", pts: 1 },
      { value: "delivery",  label: "Manual delivery/mailing",        icon: "✉️", pts: 2 },
    ],
    adaptiveTrigger: {
      triggerValues: ["redaction"],
      unlocks: ["Q13b"],
      microCopy: "PII redaction is the #1 cause of legal errors in FOIA",
    },
  },

  {
    id: "Q13b",
    domain: 5,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "Do you have automated tools for redacting sensitive voter information?",
    options: [
      { value: "no",       label: "No — literal 'black marker'",     icon: "🖋️", pts: 0 },
      { value: "pdf_tool", label: "Standard PDF editor only",        icon: "📄", pts: 1 },
      { value: "batch",    label: "Batch processing software",       icon: "📦", pts: 3 },
      { value: "ai_redact",label: "AI-powered auto-redaction",       icon: "🤖", pts: 4 },
    ],
  },

  {
    id: "Q13c",
    domain: 5,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "Do you have a way to track FOIA trend data across multiple election cycles?",
    options: [
      { value: "no",       label: "No — handled transactionally",    icon: "💨", pts: 0 },
      { value: "spreadsheet", label: "Manual spreadsheet log",       icon: "📊", pts: 1 },
      { value: "dedicated", label: "Dedicated FOIA tracking system", icon: "📋", pts: 3 },
      { value: "transparency", label: "Public Transparency Portal", icon: "🌐", pts: 4 },
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
      unlocks: ["Q21a", "Q24"],
      microCopy: "Based on your answer — this is where cure workflow gaps typically emerge",
    },
  },

  {
    id: "Q21a",
    domain: 6,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "What is your estimated error rate for manual data entry of absentee requests?",
    options: [
      { value: "high",     label: "High (> 5% error risk)",          icon: "🚨", pts: 0 },
      { value: "moderate", label: "Moderate (2–5%)",                 icon: "🟡", pts: 1 },
      { value: "low",      label: "Low (< 2%)",                      icon: "🟢", pts: 2 },
      { value: "verified", label: "Verified via double-entry",       icon: "✅", pts: 4 },
    ],
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
    adaptiveTrigger: {
      triggerValues: ["manual_verify", "sep_systems"],
      unlocks: ["Q22a"],
      microCopy: "Manual verification is the primary cause of certification delays",
    },
  },

  {
    id: "Q22a",
    domain: 6,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "How many voters are typically delayed due to signature mismatches or manual verification?",
    options: [
      { value: "many",    label: "Many (significant voter complaints)", icon: "🗣️", pts: 0 },
      { value: "some",    label: "Some (handled via phone)",           icon: "📞", pts: 1 },
      { value: "few",     label: "Few (streamlined process)",          icon: "👌", pts: 3 },
      { value: "none",    label: "None — automated resolution",         icon: "✨", pts: 4 },
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
    adaptiveTrigger: {
      triggerValues: ["multi_days", "next_day"],
      unlocks: ["Q23a"],
      microCopy: "Reporting delays often hide significant operational bottlenecks",
    },
  },

  {
    id: "Q23a",
    domain: 6,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "Does the delay in status reporting lead to increased call volume from anxious voters?",
    options: [
      { value: "overwhelming", label: "Yes — paralyzes the phone lines", icon: "🆘", pts: 0 },
      { value: "significant",  label: "Yes — significant burden",        icon: "📞", pts: 1 },
      { value: "minor",        label: "Minor — mostly online check-ins",  icon: "💬", pts: 3 },
      { value: "none",         label: "None — they trust the system",    icon: "🛡️", pts: 4 },
    ],
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
    adaptiveTrigger: {
      triggerValues: ["manual_outreach", "spreadsheet"],
      unlocks: ["Q24a"],
      microCopy: "Without automated tracking, curing is often inconsistent",
    },
  },

  {
    id: "Q24a",
    domain: 6,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "How do you verify that a voter has received and understood their curing instructions?",
    options: [
      { value: "none",      label: "No verification (just send/call)", icon: "🤷", pts: 0 },
      { value: "callbacks", label: "Voter must call back to confirm", icon: "📞", pts: 1 },
      { value: "track",     label: "Tracking link in email/text",     icon: "🔗", pts: 3 },
      { value: "integrated",label: "Integrated confirmation portal",  icon: "🌐", pts: 4 },
    ],
    adaptiveTrigger: {
      triggerValues: ["none", "callbacks"],
      unlocks: ["Q24b"],
      microCopy: "Low confirmation rates significantly increase rejection risks",
    },
  },

  {
    id: "Q24b",
    domain: 6,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "What percentage of 'cured' ballots are still rejected due to late return?",
    options: [
      { value: "high",    label: "High (> 20%)",           icon: "🚨", pts: 0 },
      { value: "moderate",label: "Moderate (10–20%)",      icon: "🟡", pts: 1 },
      { value: "low",     label: "Low (< 10%)",            icon: "🟢", pts: 3 },
      { value: "none",    label: "Virtually zero",         icon: "✨", pts: 4 },
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
    adaptiveTrigger: {
      triggerValues: ["none", "manual", "static"],
      unlocks: ["Q25a"],
      microCopy: "Outdated dissemination methods lead to voter confusion on Election Day",
    },
  },

  {
    id: "Q25a",
    domain: 7,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "How do you handle voters who arrive at the wrong polling location?",
    options: [
      { value: "manual_map", label: "Poll worker looks at paper map", icon: "🗺️", pts: 0 },
      { value: "call_hq",    label: "Call HQ for verification",       icon: "📞", pts: 1 },
      { value: "tablet_lkp", label: "Tablet-based address lookup",    icon: "📱", pts: 3 },
      { value: "ai_qr",      label: "Voter scans QR for AI directions", icon: "🤖", pts: 4 },
    ],
    adaptiveTrigger: {
      triggerValues: ["manual_map", "call_hq"],
      unlocks: ["Q25b"],
      microCopy: "Search delays at the polls increase line wait times for everyone",
    },
  },

  {
    id: "Q25b",
    domain: 7,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "Does your current system provide real-time directions to the correct location?",
    options: [
      { value: "no",       label: "No — static address only",      icon: "🏠", pts: 0 },
      { value: "link",     label: "Link to Google/Apple Maps",      icon: "📍", pts: 2 },
      { value: "live_ai",  label: "Live AI-guided navigation",      icon: "🤖", pts: 4 },
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
    adaptiveTrigger: {
      triggerValues: ["email", "call_center"],
      unlocks: ["Q26a"],
      microCopy: "Human-only response systems struggle to scale during peak volume",
    },
  },

  {
    id: "Q26a",
    domain: 7,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "What is the average wait time for a voter calling your inquiry line during peak hours?",
    options: [
      { value: "over30",  label: "> 30 minutes (major friction)", icon: "🚨", pts: 0 },
      { value: "10to30",  label: "10 – 30 minutes",              icon: "🕒", pts: 1 },
      { value: "under10", label: "Under 10 minutes",             icon: "⏱️", pts: 3 },
      { value: "instant", label: "Instant (AI automated)",       icon: "🤖", pts: 4 },
    ],
    adaptiveTrigger: {
      triggerValues: ["over30", "10to30"],
      unlocks: ["Q26b"],
      microCopy: "Frustrated voters are more likely to abandon the voting process",
    },
  },

  {
    id: "Q26b",
    domain: 7,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "Do you have a way to track common voter questions to proactively update your FAQ?",
    options: [
      { value: "no",       label: "No — anecdotal feedback only", icon: "👂", pts: 0 },
      { value: "manual",   label: "Manual categorization of emails", icon: "📊", pts: 1 },
      { value: "dashboard", label: "Live inquiry analytics dashboard", icon: "📈", pts: 3 },
      { value: "ai_kb",     label: "AI auto-updating Knowledge Base", icon: "🤖", pts: 4 },
    ],
    adaptiveTrigger: {
      triggerValues: ["no", "manual"],
      unlocks: ["Q26c"],
      microCopy: "Multi-lingual voters face the highest barriers to accurate info",
    },
  },

  {
    id: "Q26c",
    domain: 7,
    type: "adaptive",
    points: 4,
    interaction: "cards",
    text: "Can your system handle inquiries in multiple languages?",
    options: [
      { value: "english",  label: "English only",                 icon: "🇺🇸", pts: 0 },
      { value: "bilingual",label: "English + Spanish",            icon: "🇲🇽", pts: 2 },
      { value: "multi",    label: "Multi-lingual (5+ languages)", icon: "🌍", pts: 3 },
      { value: "ai_poly",  label: "AI Neural multi-lingual (any)", icon: "🤖", pts: 4 },
    ],
  },
];

// ─── QUESTION LOOKUP ──────────────────────────────────────────────
export const getQuestion = (id) => QUESTIONS.find((q) => q.id === id);

// ─── CORE QUESTIONS (ordered) ─────────────────────────────────────
export const CORE_QUESTIONS = QUESTIONS.filter((q) => q.type === "core");
