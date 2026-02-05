import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";

// Make sure to call `loadStripe` outside of a component's render to avoid recreating the `Stripe` object on every render.
// Determine which Stripe publishable key to use based on environment
const isProduction = import.meta.env.MODE === 'production';
console.log(`Client (checkout) running in ${isProduction ? 'production' : 'development'} mode`);

// Use the same Stripe key for both environments
const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

const stripePromise = stripePublicKey
  ? loadStripe(stripePublicKey)
  : null;

if (!stripePromise) {
  console.warn("Stripe public key is missing. Payments won't work.");
}

const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  acceptNoRefundPolicy: z.boolean().refine((val) => val === true, {
    message: "You must accept the no-refund policy to continue"
  })
});

const CheckoutForm = ({ 
  clientSecret, 
  ticketId,
  onSuccessfulPayment
}: { 
  clientSecret: string, 
  ticketId: number,
  onSuccessfulPayment: () => void
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { paymentIntent, error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin,
        },
        redirect: "if_required"
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // Confirm the purchase in our database
        await apiRequest("POST", "/api/confirm-purchase", {
          paymentIntentId: paymentIntent.id,
          ticketId
        });
        
        toast({
          title: "Payment Successful",
          description: "Thank you for your purchase!"
        });
        
        onSuccessfulPayment();
      }
    } catch (error) {
      toast({
        title: "Error Processing Payment",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button 
        type="submit" 
        disabled={!stripe || isProcessing} 
        className="w-full bg-gradient-to-r from-[#4AE290] to-primary hover:shadow-lg hover:shadow-primary/20 transition-all"
      >
        {isProcessing ? "Processing..." : "Complete Purchase"}
      </Button>
    </form>
  );
};

export default function Checkout() {
  const { ticketType } = useParams();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [ticketInfo, setTicketInfo] = useState<any | null>(null);
  const [ticketId, setTicketId] = useState<number | null>(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [quantity, setQuantity] = useState(ticketType === "team" ? 4 : 1);

  const isTeamTicket = ticketType === "team";
  const totalPrice = ticketInfo ? ticketInfo.price * quantity : 0;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      acceptNoRefundPolicy: false
    }
  });

  const createPaymentIntent = async (values: z.infer<typeof formSchema>) => {
    if (!ticketInfo) return;
    
    try {
      const response = await apiRequest("POST", "/api/create-payment-intent", {
        ticketType,
        amount: totalPrice,
        quantity,
        name: values.name,
        email: values.email,
        policyAcceptedAt: new Date().toISOString(),
        policyVersion: "2026-02-04-no-refunds"
      });
      
      const data = await response.json();
      setClientSecret(data.clientSecret);
      setTicketId(data.ticketId);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Could not process payment request",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    const fetchTicketInfo = async () => {
      try {
        const response = await fetch("/api/tickets");
        
        if (!response.ok) {
          throw new Error("Failed to fetch tickets");
        }
        
        const tickets = await response.json();
        const ticket = tickets.find((t: any) => t.type === ticketType);
        
        if (!ticket) {
          toast({
            title: "Invalid Ticket Type",
            description: "The selected ticket type does not exist",
            variant: "destructive"
          });
          navigate("/");
          return;
        }
        
        setTicketInfo(ticket);
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not load ticket information",
          variant: "destructive"
        });
        navigate("/");
      }
    };
    
    fetchTicketInfo();
  }, [ticketType, toast, navigate]);

  const handleSuccessfulPayment = () => {
    setPaymentCompleted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-20 bg-gray-50">
        <div className="container mx-auto px-4 pt-10">
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
          
          <div className="max-w-4xl mx-auto">
            {paymentCompleted ? (
              <Card className="shadow-lg">
                <CardHeader className="text-center bg-green-50 border-b">
                  <CardTitle className="text-2xl text-green-700">Payment Successful!</CardTitle>
                  <CardDescription>Thank you for purchasing a ticket to Vibe Coding Conference 2026</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 pb-4">
                  <div className="space-y-4 text-center">
                    <p>Your ticket purchase has been confirmed. We've sent a receipt and ticket details to your email address.</p>
                    <p className="font-medium">See you in Miami Beach on May 18-22, 2026!</p>
                    
                    <div className="pt-4">
                      <Button 
                        className="bg-gradient-to-r from-[#22D1EE] to-[#FF3A8C] hover:shadow-lg hover:shadow-primary/20 transition-all"
                        onClick={() => navigate("/")}
                      >
                        Return to Homepage
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-lg">
                <CardHeader className="bg-[#231942] text-white">
                  <CardTitle>Complete Your Purchase</CardTitle>
                  <CardDescription className="text-gray-300">
                    Secure your spot at Vibe Coding Conference 2026
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {!ticketInfo ? (
                    <div className="space-y-4">
                      <Skeleton className="h-8 w-1/2" />
                      <Skeleton className="h-20 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ) : clientSecret ? (
                    <div className="space-y-6">
                      <div className="p-4 bg-gray-50 rounded-lg border">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{ticketInfo.name}</span>
                          <span className="font-bold">${(ticketInfo.price / 100).toFixed(2)} each</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{ticketInfo.description}</p>
                        {isTeamTicket && (
                          <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
                            <span>Quantity</span>
                            <span>{quantity} passes</span>
                          </div>
                        )}
                        <Separator className="my-2" />
                        <div className="flex justify-between font-bold">
                          <span>Total{isTeamTicket ? ` (${quantity} x $${(ticketInfo.price / 100).toFixed(2)})` : ""}</span>
                          <span>${(totalPrice / 100).toFixed(2)}</span>
                        </div>
                      </div>
                      
                      {stripePromise ? (
                        <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                          <CheckoutForm 
                            clientSecret={clientSecret} 
                            ticketId={ticketId!}
                            onSuccessfulPayment={handleSuccessfulPayment} 
                          />
                        </Elements>
                      ) : (
                        <div className="p-4 bg-yellow-50 text-yellow-800 rounded border border-yellow-200">
                          Stripe is not properly configured. Please set your Stripe public key.
                        </div>
                      )}
                    </div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(createPaymentIntent)} className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg border mb-4">
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">{ticketInfo.name}</span>
                            <span className="font-bold">${(ticketInfo.price / 100).toFixed(2)} each</span>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">{ticketInfo.description}</p>
                          
                          {isTeamTicket && (
                            <div className="my-3">
                              <Label className="text-sm font-medium mb-2 block">Number of Passes (minimum 4)</Label>
                              <div className="flex items-center gap-3">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setQuantity(Math.max(4, quantity - 1))}
                                  disabled={quantity <= 4}
                                >
                                  -
                                </Button>
                                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setQuantity(quantity + 1)}
                                >
                                  +
                                </Button>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                Developer Pass requires a minimum of 4 attendees from your team
                              </p>
                            </div>
                          )}
                          
                          <Separator className="my-2" />
                          <div className="flex justify-between font-bold">
                            <span>Total{isTeamTicket ? ` (${quantity} x $${(ticketInfo.price / 100).toFixed(2)})` : ""}</span>
                            <span>${(totalPrice / 100).toFixed(2)}</span>
                          </div>
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your full name" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="you@example.com" 
                                  type="email" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <FormField
                            control={form.control}
                            name="acceptNoRefundPolicy"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-sm font-semibold text-red-800">
                                    I agree to the No Refund Policy
                                  </FormLabel>
                                  <FormDescription className="text-xs text-red-700">
                                    I understand that all ticket sales are final. No refunds will be issued under any circumstances. 
                                    Ticket transfers to another attendee are available upon request. 
                                    <Link href="/pricing-details" className="underline ml-1">View full policy</Link>
                                  </FormDescription>
                                  <FormMessage />
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-to-r from-[#22D1EE] to-[#FF3A8C] hover:shadow-lg hover:shadow-primary/20 transition-all"
                        >
                          Proceed to Payment
                        </Button>
                      </form>
                    </Form>
                  )}
                </CardContent>
                <CardFooter className="flex-col space-y-2 text-xs text-gray-500 bg-gray-50 border-t">
                  <p>Your payment information is securely processed by Stripe.</p>
                  <p>All sales are final. No refunds. Ticket transfers available upon request.</p>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
