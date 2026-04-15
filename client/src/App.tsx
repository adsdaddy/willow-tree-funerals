import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import MobileCtaBar from "./components/MobileCtaBar";

// ── Lazy-loaded pages (code splitting — OptiCheck Playbook) ──
// Home is NOT lazy — it is the LCP page and must load immediately
import Home from "./pages/Home";

const About = lazy(() => import("./pages/About"));
const Pricing = lazy(() => import("./pages/Pricing"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const BrandGuide = lazy(() => import("./pages/BrandGuide"));
const MacArthurMemorialPark = lazy(() => import("./pages/MacArthurMemorialPark"));

// Service pages — all lazy
const FuneralServices = lazy(() => import("./pages/services/FuneralServices"));
const CatholicFunerals = lazy(() => import("./pages/services/CatholicFunerals"));
const Cremation = lazy(() => import("./pages/services/Cremation"));
const Burial = lazy(() => import("./pages/services/Burial"));
const CelebrationOfLife = lazy(() => import("./pages/services/CelebrationOfLife"));
const PreArrangedFunerals = lazy(() => import("./pages/services/PreArrangedFunerals"));
const GravesideServices = lazy(() => import("./pages/services/GravesideServices"));
const Repatriation = lazy(() => import("./pages/services/Repatriation"));

// Minimal page-transition fallback — no spinner flash for fast connections
function PageFallback() {
  return <div className="min-h-screen bg-brand-ivory" aria-hidden="true" />;
}

function Router() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Switch>
        {/* Core pages */}
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/faq" component={FAQ} />
        <Route path="/contact" component={Contact} />

        {/* Service pages */}
        <Route path="/services/funeral-services" component={FuneralServices} />
        <Route path="/services/catholic-funerals" component={CatholicFunerals} />
        <Route path="/services/cremation" component={Cremation} />
        <Route path="/services/burial" component={Burial} />
        <Route path="/services/celebration-of-life" component={CelebrationOfLife} />
        <Route path="/services/pre-arranged-funerals" component={PreArrangedFunerals} />
        <Route path="/services/graveside-services" component={GravesideServices} />
        <Route path="/services/repatriation" component={Repatriation} />

        {/* Location / SEO pages */}
        <Route path="/macarthur-memorial-park" component={MacArthurMemorialPark} />

        {/* Brand guide (preserved) */}
        <Route path="/brand-guide" component={BrandGuide} />

        {/* Legal */}
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />

        {/* 404 */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          {/* Skip to content — WCAG AA (OptiCheck Playbook) */}
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>

          <Toaster />

          {/* ARIA main landmark wraps all page content */}
          <main id="main-content" role="main">
            <Router />
          </main>

          {/* Sticky mobile CTA bar — CRO pattern */}
          <MobileCtaBar />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
