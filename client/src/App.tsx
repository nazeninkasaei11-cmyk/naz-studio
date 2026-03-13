import { Switch, Route } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Studio from "@/pages/Studio";
import Services from "@/pages/Services";
import Press from "@/pages/Press";
import Contact from "@/pages/Contact";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/studio" component={Studio} />
      <Route path="/services" component={Services} />
      <Route path="/press" component={Press} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </HelmetProvider>
  );
}

export default App;
