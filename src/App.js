import React from "react";
import { AssessmentProvider, useAssessment, PHASES } from "./context/AssessmentContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import LandingPage from "./pages/LandingPage";
import AssessmentPage from "./pages/AssessmentPage";
import ResultsPage from "./pages/ResultsPage";
import SimulatorPage from "./pages/SimulatorPage";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import { ToastProvider } from "./components/ui/Toast";
import { useScrollTop } from "./hooks/useScrollTop";
import "./styles/globals.css";
import "./styles/mobile.css";

// ─── Phase router ─────────────────────────────────────────────────
function PhaseRouter() {
  const { phase } = useAssessment();
  useScrollTop(phase);

  const showFooter = phase !== PHASES.ASSESSMENT;

  return (
    <>
      <Navbar />
      <main>
        {phase === PHASES.LANDING    && <LandingPage />}
        {phase === PHASES.ASSESSMENT && <AssessmentPage />}
        {phase === PHASES.RESULTS    && <ResultsPage />}
        {phase === PHASES.SIMULATOR  && <SimulatorPage />}
      </main>
      {showFooter && <Footer />}
    </>
  );
}

// ─── Root ─────────────────────────────────────────────────────────
export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AssessmentProvider>
          <PhaseRouter />
        </AssessmentProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}
