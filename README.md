# Election Readiness Scorer™ — Ballot D.A.

> Intelligent Diagnostic & Lead Generation Platform  
> Built from the Executive Report specification (updated 6-domain version)

---

## Project Structure

```
src/
├── data/
│   ├── domains.js          — 6 operational domains definition
│   ├── questions.js        — All 20–23 questions with adaptive trigger logic
│   ├── tiers.js            — 4 score tiers + penalty modifier rules
│   └── simulator.js        — What-If suggestions + 3 optimization templates
│
├── utils/
│   └── scoring.js          — Scoring engine: adaptive resolver, penalties,
│                             domain breakdown, normalization, tier assignment
│
├── context/
│   └── AssessmentContext.js — Global state (useReducer): phase routing,
│                              answers, scoring, lead capture, simulation
│
├── components/
│   ├── ui/
│   │   ├── ScoreGauge.js   — Animated circular gauge (SVG)
│   │   ├── DomainBar.js    — Animated domain progress bar
│   │   └── TierBadge.js    — Tier pill badge
│   │
│   ├── assessment/
│   │   ├── QuestionCard.js         — Master question renderer (all types)
│   │   ├── CardOption.js           — Visual card selector with checkmark
│   │   ├── SliderQuestion.js       — Click/drag slider with step dots
│   │   ├── SliderToggleQuestion.js — Slider + bonus toggle + BacklogVisualizer
│   │   └── ProgressiveMicroCopy.js — Animated adaptive question context copy
│   │
│   ├── results/
│   │   ├── AbsenteeRiskAlert.js    — Compliance wedge alert (Domain 6)
│   │   ├── LeadCaptureForm.js      — Lead form with confirmation state
│   │   ├── DomainBreakdown.js      — All domain bars stacked
│   │   └── TierGrid.js             — 4-tier classification grid
│   │
│   ├── simulator/
│   │   ├── ScoreComparison.js      — Side-by-side original vs simulated gauges
│   │   ├── SuggestionToggle.js     — Individual improvement toggle card
│   │   ├── ImpactSummary.js        — 6-metric post-simulation summary
│   │   └── OptimizationTemplates.js— 3 quick-apply improvement bundles
│   │
│   └── layout/
│       ├── Navbar.js               — Sticky nav with phase breadcrumb
│       └── PageWrapper.js          — Max-width content wrapper
│
├── pages/
│   ├── LandingPage.js      — Hero, domain cards, feature grid, stats
│   ├── AssessmentPage.js   — Adaptive assessment engine with live score
│   ├── ResultsPage.js      — Full results: score, tiers, domains, CTAs
│   └── SimulatorPage.js    — What-If simulator with toggles & impact
│
├── styles/
│   └── globals.css         — CSS variables, keyframes, utility classes
│
├── App.js                  — Phase router + provider root
└── index.js                — React entry point
```

---

## Getting Started

```bash
npm install
npm start
```

Runs at `http://localhost:3000`

---

## Key Workflows (from Executive Report)

### 1. User Journey (Section 3)
| Stage | Phase |
|-------|-------|
| Entry — land on assessment | `LANDING` |
| Answer core + adaptive questions | `ASSESSMENT` |
| Review score, tier, domain breakdown | `RESULTS` |
| Explore "What If" improvements | `SIMULATOR` |
| Book consultation / download report | Conversion CTAs |

### 2. Adaptive Question Logic (Section 4)
Questions trigger follow-up adaptive questions based on the user's answer:
- Q1 `manual/email` → unlocks Q1a (version conflicts) + Q1b (coordination delays)
- Q1 `dedicated` → unlocks Q1c (integration depth)
- Q5 `manual/email` → unlocks Q5a (L&A testing failures)
- Q8 `over_week/2to5days` → unlocks Q8a (escalation path)
- Q10 `phone/email` → unlocks Q10a (issues falling through cracks)
- Q21 `manual/email_dig` → unlocks Q24 (ballot curing workflow)

### 3. Scoring System (Section 6)
- Core questions: 0–5 pts standard weight
- Q23 (Absentee Reporting): 6 pts + 1 toggle bonus (highest single weight)
- Absentee domain total: 11–20 pts (PREMIUM weight)
- Penalty modifiers: manual processes (–2), no visibility (–3), legal delay >1wk (–4)
- Score normalised to 0–100

### 4. Tier Classifications (Section 6)
| Range | Tier |
|-------|------|
| 0–40 | Operationally Reactive |
| 41–60 | Process Transitional |
| 61–80 | Strategically Optimised |
| 81–100 | Future-Ready |

### 5. "What If" Simulator (Section 5)
- Original answers cloned into `simAnswers`
- Each suggestion toggle overrides a single question's answer
- Score recalculates in real-time via `calculateScore()`
- 3 quick-apply templates: Absentee Priority, Operations Boost, Full Overhaul
- Impact summary shows: score delta, hours saved, compliance gaps closed, est. value

---

## Domain Reference (updated 6-domain spec)

| # | Domain | Weight | Points |
|---|--------|--------|--------|
| 1 | Poll Worker Management | Standard | 12–20 |
| 2 | Election Asset Management | Standard | 15–25 |
| 3 | Policy AI / Legal Response | Standard | 8–15 |
| 4 | Support IQ | Standard | 8–15 |
| 5 | Analytics & FOIA Readiness | Standard | 6–10 |
| 6 | Absentee Ballot Portal | **PREMIUM** | 11–20 |

> Note: Cybersecurity domain was removed in the updated spec. Domain 6 is now Absentee Ballot Portal.

---

## Extending the App

### Add a new question
Edit `src/data/questions.js` — add a question object following the existing schema.

### Add a new simulator suggestion
Edit `src/data/simulator.js` — add to `SIMULATOR_SUGGESTIONS` array.

### Connect lead form to CRM
In `src/components/results/LeadCaptureForm.js`, replace the `setLeadCaptured(true)` call with your API endpoint.

### Connect booking CTAs
Search for `alert(` in `ResultsPage.js` and `SimulatorPage.js` and replace with your calendar/CRM integration.
