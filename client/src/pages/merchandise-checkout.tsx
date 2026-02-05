import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { FormDescription } from "@/components/ui/form";
import { Link } from "wouter";

// Make sure to load Stripe outside of a component's render
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  console.error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
// Determine which Stripe publishable key to use based on environment
const isProduction = import.meta.env.MODE === 'production';
console.log(`Client running in ${isProduction ? 'production' : 'development'} mode`);

// Use the same Stripe key for both environments
const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

const stripePromise = stripePublicKey
  ? loadStripe(stripePublicKey)
  : null;

interface MerchandiseItem {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string | null;
  sizes: string[] | null;
  colors: string[] | null;
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  quantity: z.number().min(1).default(1),
  size: z.string().optional(),
  color: z.string().optional(),
  acceptNoRefundPolicy: z.boolean().refine((val) => val === true, {
    message: "You must accept the no-refund policy to continue"
  })
});

const CheckoutForm = ({ merchandise, customerInfo }: { 
  merchandise: MerchandiseItem,
  customerInfo: z.infer<typeof formSchema>
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + "/merchandise-confirmation",
        },
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Payment Successful",
          description: "Thank you for your purchase!",
        });
        navigate("/");
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast({
        title: "Payment Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button 
        type="submit" 
        className="w-full" 
        disabled={!stripe || isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin w-4 h-4 border-2 border-background border-t-transparent rounded-full" />
            Processing...
          </div>
        ) : (
          `Pay ${new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format((merchandise.price * customerInfo.quantity) / 100)}`
        )}
      </Button>
    </form>
  );
};

export default function MerchandiseCheckout() {
  const { id } = useParams<{ id: string }>();
  const merchandiseId = parseInt(id);
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [clientSecret, setClientSecret] = useState("");
  const [customerInfo, setCustomerInfo] = useState<z.infer<typeof formSchema> | null>(null);

  // Fetch merchandise details
  const { data: merchandise, isLoading, error } = useQuery<MerchandiseItem>({
    queryKey: ["/api/merchandise", merchandiseId],
    queryFn: async () => {
      const allMerchandise = await apiRequest("GET", "/api/merchandise")
        .then(res => res.json());
      const item = allMerchandise.find((item: MerchandiseItem) => item.id === merchandiseId);
      if (!item) {
        throw new Error("Merchandise not found");
      }
      return item;
    },
    enabled: !isNaN(merchandiseId),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      quantity: 1,
      size: merchandise?.sizes?.[0] || undefined,
      color: merchandise?.colors?.[0] || undefined,
      acceptNoRefundPolicy: false,
    },
  });

  // Update default values when merchandise data is loaded
  useEffect(() => {
    if (merchandise && merchandise.sizes && merchandise.sizes.length > 0) {
      form.setValue("size", merchandise.sizes[0]);
    }
    if (merchandise && merchandise.colors && merchandise.colors.length > 0) {
      form.setValue("color", merchandise.colors[0]);
    }
  }, [merchandise, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!merchandise) return;

    try {
      // Create payment intent
      const response = await apiRequest("POST", "/api/create-merchandise-payment", {
        merchandiseId,
        amount: merchandise.price * values.quantity,
        name: values.name,
        email: values.email,
        quantity: values.quantity,
        size: values.size,
        color: values.color,
        policyAcceptedAt: new Date().toISOString(),
        policyVersion: "2026-02-04-no-refunds"
      }).then(res => res.json());

      if (response.clientSecret) {
        setClientSecret(response.clientSecret);
        setCustomerInfo(values);
      } else {
        toast({
          title: "Error",
          description: "Could not initialize payment",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating payment intent:", error);
      toast({
        title: "Error",
        description: "Could not process payment",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  if (error || !merchandise) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center text-red-500 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>Could not find the requested merchandise. Please go back and try again.</p>
          <Button className="mt-4" onClick={() => navigate("/")}>
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/#merchandise">Merchandise</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{merchandise.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>Review your merchandise selection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="h-24 w-24 bg-slate-100 flex items-center justify-center rounded">
                  {merchandise.imageUrl ? (
                    <img
                      src={merchandise.imageUrl}
                      alt={merchandise.name}
                      className="max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-slate-400 text-xs">No image</div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold">{merchandise.name}</h3>
                  <p className="text-sm text-gray-600">{merchandise.description}</p>
                  <div className="text-lg font-bold mt-1">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(merchandise.price / 100)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          {!clientSecret ? (
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
                <CardDescription>Please enter your details to continue</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
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
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="1" 
                              {...field} 
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {merchandise.sizes && merchandise.sizes.length > 0 && (
                      <FormField
                        control={form.control}
                        name="size"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Size</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a size" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {merchandise.sizes?.map((size) => (
                                  <SelectItem key={size} value={size}>{size}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {merchandise.colors && merchandise.colors.length > 0 && (
                      <FormField
                        control={form.control}
                        name="color"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Color</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a color" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {merchandise.colors?.map((color) => (
                                  <SelectItem key={color} value={color}>{color}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
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
                                I understand that all merchandise sales are final. No refunds will be issued once shipped.
                                <Link href="/pricing-details" className="underline ml-1">View full policy</Link>
                              </FormDescription>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <CardFooter className="px-0 pt-4">
                      <Button type="submit" className="w-full">
                        Continue to Payment
                      </Button>
                    </CardFooter>
                  </form>
                </Form>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Payment</CardTitle>
                <CardDescription>Secure payment via Stripe</CardDescription>
              </CardHeader>
              <CardContent>
                {stripePromise && clientSecret && merchandise && customerInfo ? (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm
                      merchandise={merchandise}
                      customerInfo={customerInfo}
                    />
                  </Elements>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-red-500">
                      {!stripePromise ? "Stripe is not configured" : "Loading payment details..."}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}