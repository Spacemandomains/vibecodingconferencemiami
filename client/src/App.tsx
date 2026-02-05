import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Checkout from "@/pages/checkout";
import MerchandiseCheckout from "@/pages/merchandise-checkout";
import MerchandiseConfirmation from "@/pages/merchandise-confirmation";
import SponsorshipPage from "@/pages/sponsorship";
import SponsorPaymentPage from "@/pages/sponsor-payment";
import SponsorConfirmationPage from "@/pages/sponsor-confirmation";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import CodeOfConduct from "@/pages/code-of-conduct";
import PricingDetails from "@/pages/pricing-details";
import Sitemap from "./pages/sitemap";
import VolunteerPage from "@/pages/volunteer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/checkout/:ticketType" component={Checkout} />
      <Route path="/merchandise-checkout/:id" component={MerchandiseCheckout} />
      <Route path="/merchandise-confirmation" component={MerchandiseConfirmation} />
      <Route path="/sponsorship" component={SponsorshipPage} />
      <Route path="/sponsor-payment" component={SponsorPaymentPage} />
      <Route path="/sponsor-confirmation" component={SponsorConfirmationPage} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/code-of-conduct" component={CodeOfConduct} />
      <Route path="/pricing-details" component={PricingDetails} />
      <Route path="/sitemap" component={Sitemap} />
      <Route path="/volunteer" component={VolunteerPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
