import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import BrandGuide from "./pages/BrandGuide";
import MacArthurMemorialPark from "./pages/MacArthurMemorialPark";

// Service pages
import FuneralServices from "./pages/services/FuneralServices";
import CatholicFunerals from "./pages/services/CatholicFunerals";
import Cremation from "./pages/services/Cremation";
import Burial from "./pages/services/Burial";
import CelebrationOfLife from "./pages/services/CelebrationOfLife";
import PreArrangedFunerals from "./pages/services/PreArrangedFunerals";
import GravesideServices from "./pages/services/GravesideServices";
import Repatriation from "./pages/services/Repatriation";

function Router() {
  return (
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
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
