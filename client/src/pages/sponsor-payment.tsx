import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormDescription } from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Link } from "wouter";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render.

// Determine which Stripe publishable key to use based on environment
const isProduction = import.meta.env.MODE === 'production';
console.log(`Client (sponsor payment) running in ${isProduction ? 'production' : 'development'} mode`);

// Use the same Stripe key for both environments
const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

// Initialize Stripe if key exists
const stripePromise = stripePublicKey
  ? loadStripe(stripePublicKey)
  : null;

// Warning message for missing Stripe keys
if (!stripePublicKey) {
  console.warn("Stripe public key is missing. Payments won't work.");
}

// Define the sponsorship tier options
const sponsorshipOptions = [
  // Standard Tiers
  { value: "platinum", label: "Platinum Sponsor - $25,000", amount: 2500000 },
  { value: "gold", label: "Gold Sponsor - $10,000", amount: 1000000 },
  { value: "silver", label: "Silver Sponsor - $5,000", amount: 500000 },
  { value: "workshop", label: "Workshop Sponsor - $3,000", amount: 300000 },
  { value: "supporter", label: "Vibe Supporter - $1,000", amount: 100000 },
  
  // Signature Tiers
  { value: "title", label: "Conference Title Sponsorship - $500,000", amount: 50000000 },
  { value: "afterparty", label: "Afterparty Co-Sponsor - $250,000", amount: 25000000 },
  { value: "speakerLounge", label: "Speaker Lounge - $150,000", amount: 15000000 },
  { value: "lanyards", label: "Attendee Lanyards - $100,000", amount: 10000000 },
  { value: "swagBox", label: "Swag Box - $25,000", amount: 2500000 },
];

// Form validation schema
const formSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  contactName: z.string().min(2, "Contact name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(5, "Phone number is required"),
  sponsorshipTier: z.string().min(1, "Please select a sponsorship tier"),
  website: z.string().url("Please enter a valid URL").or(z.string().length(0)),
  additionalInfo: z.string().optional(),
  acceptNoRefundPolicy: z.boolean().refine((val) => val === true, {
    message: "You must accept the no-refund policy to continue"
  })
});

// Payment form component
const PaymentForm = ({ sponsorshipDetails }: { sponsorshipDetails: any }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + "/sponsor-confirmation",
          payment_method_data: {
            billing_details: {
              name: sponsorshipDetails.contactName,
              email: sponsorshipDetails.email,
            }
          },
        },
      });

      if (error) {
        setErrorMessage(error.message || "An error occurred with your payment");
        toast({
          title: "Payment Failed",
          description: error.message || "An error occurred with your payment",
          variant: "destructive",
        });
      }
    } catch (e: any) {
      setErrorMessage(e.message || "An unexpected error occurred");
      toast({
        title: "Error",
        description: e.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      {errorMessage && (
        <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
      )}
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isLoading || !stripe || !elements}
      >
        {isLoading ? "Processing..." : "Complete Sponsorship Payment"}
      </Button>
    </form>
  );
};

export default function SponsorPaymentPage() {
  const [clientSecret, setClientSecret] = useState<string>("");
  const [sponsorshipDetails, setSponsorshipDetails] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      sponsorshipTier: "",
      website: "",
      additionalInfo: "",
      acceptNoRefundPolicy: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Find the selected sponsorship option to get the amount
      const selectedOption = sponsorshipOptions.find(
        option => option.value === values.sponsorshipTier
      );
      
      if (!selectedOption) {
        throw new Error("Invalid sponsorship tier selected");
      }
      
      // Create a payment intent on the server
      const response = await apiRequest("POST", "/api/create-sponsorship-payment", {
        tier: values.sponsorshipTier,
        price: selectedOption.amount,
        companyName: values.companyName,
        contactName: values.contactName,
        email: values.email,
        phone: values.phone,
        website: values.website || "",
        additionalInfo: values.additionalInfo || "",
        policyAcceptedAt: new Date().toISOString(),
        policyVersion: "2026-02-04-no-refunds"
      });
      
      const data = await response.json();
      
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        setSponsorshipDetails(values);
        
        toast({
          title: "Ready for Payment",
          description: "Please complete your payment details below.",
        });
      } else {
        throw new Error("Failed to initialize payment");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Sponsor Payment</h1>
          
          <div className="max-w-3xl mx-auto">
            {!stripePublicKey ? (
              <Card className="border-amber-500 border-2">
                <CardHeader>
                  <CardTitle className="text-center">Payment System Unavailable</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <p className="mb-4">Our payment system is currently unavailable.</p>
                    <p className="mb-4">Please contact us directly to arrange your sponsorship at:</p>
                    <p className="font-semibold text-lg">sponsors@vibecodingconference.com</p>
                  </div>
                  <div className="text-sm text-gray-500 bg-amber-50 p-4 rounded-md">
                    <p>Note: This is a demo message. In a production environment, Stripe API keys would be configured.</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button 
                    onClick={() => setLocation("/sponsorship")}
                    variant="outline"
                  >
                    Return to Sponsorship Information
                  </Button>
                </CardFooter>
              </Card>
            ) : !clientSecret ? (
              <Card>
                <CardHeader>
                  <CardTitle>Sponsorship Information</CardTitle>
                  <CardDescription>
                    Please provide your company details and select a sponsorship tier.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your Company, Inc." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="contactName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Full Name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="contact@company.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="+1 (555) 123-4567" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Website</FormLabel>
                            <FormControl>
                              <Input placeholder="https://www.yourcompany.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="sponsorshipTier"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sponsorship Tier</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a sponsorship tier" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="standard-header" disabled>Standard Sponsorship Tiers</SelectItem>
                                {sponsorshipOptions.slice(0, 5).map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                                
                                <SelectItem value="signature-header" disabled>Signature Sponsorship Tiers</SelectItem>
                                {sponsorshipOptions.slice(5).map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="additionalInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Information</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Any specific requirements or questions about your sponsorship?"
                                className="min-h-[120px]"
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
                                  I understand that all sponsorship sales are final. No refunds will be issued.
                                  <Link href="/pricing-details" className="underline ml-1">View full policy</Link>
                                </FormDescription>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Processing..." : "Proceed to Payment"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Complete Your Sponsorship Payment</CardTitle>
                  <CardDescription>
                    Please provide your payment details to secure your sponsorship.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <PaymentForm sponsorshipDetails={sponsorshipDetails} />
                  </Elements>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}