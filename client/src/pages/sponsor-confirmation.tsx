import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

// Helper function to get URL parameters
function getParameterByName(name: string) {
  const url = window.location.href;
  name = name.replace(/[[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default function SponsorConfirmationPage() {
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Since we might not have Stripe configured, provide a fallback
    if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
      // For demo purposes, simulate a successful payment
      setPaymentIntent("demo_payment_intent_123456");
      setIsSuccess(true);
      return;
    }
    
    // Check for payment status from URL parameters
    // Stripe redirects back with payment_intent and payment_intent_client_secret
    const paymentIntentResult = getParameterByName("payment_intent");
    const redirectStatus = getParameterByName("redirect_status");
    
    setPaymentIntent(paymentIntentResult);
    setIsSuccess(redirectStatus === "succeeded");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            {isSuccess === true && (
              <Card className="border-green-500 border-2">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <CheckCircle2 className="h-16 w-16 text-green-500" />
                  </div>
                  <CardTitle className="text-2xl md:text-3xl">Sponsorship Confirmed!</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-lg mb-4">
                    Thank you for sponsoring the Vibe Coding Conference! Your payment has been successfully processed.
                  </p>
                  <p className="mb-6">
                    We've sent a confirmation email with details about your sponsorship and next steps.
                    Our team will be in touch shortly to coordinate your sponsorship benefits.
                  </p>
                  
                  <div className="bg-slate-50 p-4 rounded-lg text-left">
                    <h3 className="font-medium mb-2">Payment Details:</h3>
                    <p className="text-sm">Payment Reference: {paymentIntent || "N/A"}</p>
                    {!import.meta.env.VITE_STRIPE_PUBLIC_KEY && (
                      <div className="mt-4 pt-4 border-t border-gray-200 text-amber-600">
                        <p className="text-sm">
                          Note: This is a demo confirmation. In a production environment, Stripe would process real payments.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col md:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => setLocation("/")}
                    variant="outline"
                  >
                    Return to Homepage
                  </Button>
                  <Button 
                    onClick={() => setLocation("/sponsorship")}
                  >
                    View Sponsorship Options
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {isSuccess === false && (
              <Card className="border-red-500 border-2">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl md:text-3xl text-red-500">Payment Not Completed</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-lg mb-4">
                    We couldn't complete your sponsorship payment.
                  </p>
                  <p className="mb-4">
                    This could be due to an issue with the payment method or because the payment was cancelled.
                  </p>
                  <p>
                    Please try again or contact our team for assistance with alternative payment methods.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button 
                    onClick={() => setLocation("/sponsor-payment")}
                    variant="outline"
                  >
                    Try Again
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {isSuccess === null && (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
              </div>
            )}
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}