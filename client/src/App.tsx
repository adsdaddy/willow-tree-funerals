import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import MobileCtaBar from "./components/MobileCtaBar";
import WhatsAppButton from "./components/WhatsAppButton";
import { trackPageView } from "@/lib/analytics";

// ── Lazy-loaded pages (code splitting  -  OptiCheck Playbook) ──
// Home is NOT lazy  -  it is the LCP page and must load immediately
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

// Service pages  -  all lazy
const FuneralServices = lazy(() => import("./pages/services/FuneralServices"));
const CatholicFunerals = lazy(() => import("./pages/services/CatholicFunerals"));
const Cremation = lazy(() => import("./pages/services/Cremation"));
const Burial = lazy(() => import("./pages/services/Burial"));
const CelebrationOfLife = lazy(() => import("./pages/services/CelebrationOfLife"));
const PreArrangedFunerals = lazy(() => import("./pages/services/PreArrangedFunerals"));
const GravesideServices = lazy(() => import("./pages/services/GravesideServices"));
const Repatriation = lazy(() => import("./pages/services/Repatriation"));

// Suburb SEO pages  -  all lazy
const SuburbKogarah = lazy(() => import("./pages/suburbs/Kogarah"));
const SuburbSutherland = lazy(() => import("./pages/suburbs/Sutherland"));
const SuburbCampbelltown = lazy(() => import("./pages/suburbs/Campbelltown"));
const SuburbWollongong = lazy(() => import("./pages/suburbs/Wollongong"));
const SuburbCamden = lazy(() => import("./pages/suburbs/Camden"));
const SuburbCentralCoast = lazy(() => import("./pages/suburbs/CentralCoast"));
const SuburbHornsby = lazy(() => import("./pages/suburbs/Hornsby"));
const SuburbChatswood = lazy(() => import("./pages/suburbs/Chatswood"));
const SuburbNorthSydney = lazy(() => import("./pages/suburbs/NorthSydney"));
const SuburbMosman = lazy(() => import("./pages/suburbs/Mosman"));
const SuburbManly = lazy(() => import("./pages/suburbs/Manly"));
const SuburbStrathfield = lazy(() => import("./pages/suburbs/Strathfield"));
const SuburbLeichhardt = lazy(() => import("./pages/suburbs/Leichhardt"));
const SuburbMarrickville = lazy(() => import("./pages/suburbs/Marrickville"));
const SuburbPenrith = lazy(() => import("./pages/suburbs/Penrith"));
const SuburbParramatta = lazy(() => import("./pages/suburbs/Parramatta"));
const SuburbBlacktown = lazy(() => import("./pages/suburbs/Blacktown"));
const SuburbKatoomba = lazy(() => import("./pages/suburbs/Katoomba"));

// Blog pages  -  all lazy
const BlogIndex = lazy(() => import("./pages/blog/BlogIndex"));
const BlogWhatToDo = lazy(() => import("./pages/blog/WhatToDoWhenSomeonePasses"));
const BlogCatholicFuneral = lazy(() => import("./pages/blog/HowToPlanCatholicFuneral"));
const BlogFuneralCosts = lazy(() => import("./pages/blog/UnderstandingFuneralCosts"));
const BlogMacArthurPark = lazy(() => import("./pages/blog/MacArthurMemorialParkGuide"));
const BlogArticle = lazy(() => import("./pages/blog/BlogArticle"));

// Pre-arrangement flow
const PreArrange = lazy(() => import("./pages/PreArrange"));

// New pages
const CommunityEvents = lazy(() => import("./pages/CommunityEvents"));
const OrderFlowers = lazy(() => import("./pages/OrderFlowers"));
const Obituaries = lazy(() => import("./pages/Obituaries"));

// Minimal page-transition fallback  -  no spinner flash for fast connections
function PageFallback() {
  return <div className="min-h-screen bg-brand-ivory" aria-hidden="true" />;
}
function RouteTracker() {
  const [location] = useLocation();
  useEffect(() => {
    trackPageView(location);
  }, [location]);
  return null;
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Suspense fallback={<PageFallback />}>
      <RouteTracker />
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

        {/* Suburb SEO pages */}
        <Route path="/funeral-director-kogarah" component={SuburbKogarah} />
        <Route path="/funeral-director-sutherland" component={SuburbSutherland} />
        <Route path="/funeral-director-campbelltown" component={SuburbCampbelltown} />
        <Route path="/funeral-director-wollongong" component={SuburbWollongong} />
        <Route path="/funeral-director-camden" component={SuburbCamden} />
        <Route path="/funeral-director-central-coast" component={SuburbCentralCoast} />
        <Route path="/funeral-director-hornsby" component={SuburbHornsby} />
        <Route path="/funeral-director-chatswood" component={SuburbChatswood} />
        <Route path="/funeral-director-north-sydney" component={SuburbNorthSydney} />
        <Route path="/funeral-director-mosman" component={SuburbMosman} />
        <Route path="/funeral-director-manly" component={SuburbManly} />
        <Route path="/funeral-director-strathfield" component={SuburbStrathfield} />
        <Route path="/funeral-director-leichhardt" component={SuburbLeichhardt} />
        <Route path="/funeral-director-marrickville" component={SuburbMarrickville} />
        <Route path="/funeral-director-penrith" component={SuburbPenrith} />
        <Route path="/funeral-director-parramatta" component={SuburbParramatta} />
        <Route path="/funeral-director-blacktown" component={SuburbBlacktown} />
        <Route path="/funeral-director-katoomba" component={SuburbKatoomba} />

        {/* Blog */}
        <Route path="/blog" component={BlogIndex} />
        <Route path="/blog/what-to-do-when-someone-passes-away-nsw" component={BlogWhatToDo} />
        <Route path="/blog/how-to-plan-catholic-funeral-sydney" component={BlogCatholicFuneral} />
        <Route path="/blog/understanding-funeral-costs-sydney" component={BlogFuneralCosts} />
        <Route path="/blog/macarthur-memorial-park-guide" component={BlogMacArthurPark} />
        {/* Dynamic AI-generated article pages from babylovegrowth.ai */}
        <Route path="/blog/article/:slug" component={BlogArticle} />

        {/* Pre-arrangement flow */}
        <Route path="/pre-arrange" component={PreArrange} />

        {/* Community & memorial pages */}
        <Route path="/community-events" component={CommunityEvents} />
        <Route path="/order-flowers" component={OrderFlowers} />
        <Route path="/obituaries" component={Obituaries} />

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
          {/* Skip to content  -  WCAG AA (OptiCheck Playbook) */}
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>

          <Toaster />

          {/* ARIA main landmark wraps all page content */}
          <main id="main-content" role="main">
            <Router />
          </main>

          {/* Sticky mobile CTA bar  -  CRO pattern */}
          <MobileCtaBar />

          {/* WhatsApp floating button */}
          <WhatsAppButton />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
