import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Load Stripe outside of component render cycle for performance
import { loadStripe } from "@stripe/stripe-js";

// Pre-load Stripe for better performance when a user clicks on checkout
if (import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  void loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
}

createRoot(document.getElementById("root")!).render(<App />);
