import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

interface PaymentDetails {
  merchandiseId: number;
  paymentIntentId: string;
  name: string;
  email: string;
}

export default function MerchandiseConfirmation() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    async function confirmPurchase() {
      try {
        // Get payment intent ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const paymentIntentId = urlParams.get('payment_intent');
        const paymentIntentClientSecret = urlParams.get('payment_intent_client_secret');
        
        if (!paymentIntentId || !paymentIntentClientSecret) {
          setStatus('error');
          setErrorMessage('Missing payment information in URL');
          return;
        }
        
        // Get payment details from Stripe
        const paymentDetails = await apiRequest("GET", `/api/get-payment-details?paymentIntentId=${paymentIntentId}`)
          .then(res => {
            if (!res.ok) {
              throw new Error('Payment verification failed');
            }
            return res.json();
          });
        
        if (!paymentDetails || !paymentDetails.merchandiseId) {
          throw new Error('Invalid payment details');
        }

        // Confirm the purchase
        await apiRequest("POST", "/api/confirm-merchandise-purchase", {
          paymentIntentId,
          merchandiseId: paymentDetails.merchandiseId,
          name: paymentDetails.name || "Unknown",
          email: paymentDetails.email || "unknown@example.com"
        }).then(res => {
          if (!res.ok) {
            throw new Error('Failed to confirm purchase');
          }
          return res.json();
        });

        setStatus('success');
        toast({
          title: "Purchase Confirmed",
          description: "Your merchandise order has been confirmed!",
        });
      } catch (error) {
        console.error('Confirmation error:', error);
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
        toast({
          title: "Confirmation Failed",
          description: "We couldn't confirm your purchase. Please contact support.",
          variant: "destructive",
        });
      }
    }

    confirmPurchase();
  }, [toast]);

  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[50vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Processing Your Order</CardTitle>
            <CardDescription>Please wait while we confirm your purchase</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-10">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[50vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <XCircle className="h-16 w-16 text-red-500" />
            </div>
            <CardTitle>Order Confirmation Failed</CardTitle>
            <CardDescription>{errorMessage || "We couldn't process your order"}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p>
              Don't worry, if your payment was processed, you'll receive a confirmation email shortly.
              If you have any concerns, please contact our support team.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => navigate("/")}>
              Return to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[50vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle>Order Confirmed!</CardTitle>
          <CardDescription>Your merchandise purchase was successful</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            Thank you for your purchase! We've sent a confirmation email with your order details.
          </p>
          <p>
            Your merchandise will be available for pickup at the conference in South Beach, Miami (May 18-22, 2026).
            Don't forget to bring your confirmation email or ID.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => navigate("/")}>
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}