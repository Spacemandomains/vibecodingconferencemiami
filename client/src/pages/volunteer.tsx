import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Users, CheckCircle } from "lucide-react";

const volunteerSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  availability: z.string().min(1, "Please select your availability"),
  experience: z.string().optional(),
  whyVolunteer: z.string().min(20, "Please tell us a bit more about why you want to volunteer (at least 20 characters)")
});

type VolunteerFormData = z.infer<typeof volunteerSchema>;

export default function VolunteerPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      availability: "",
      experience: "",
      whyVolunteer: ""
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: VolunteerFormData) => {
      const response = await apiRequest("POST", "/api/register-volunteer", data);
      return response.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "Thank you for applying to volunteer. We'll be in touch soon!"
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: VolunteerFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-20 bg-gradient-to-br from-[#1A1A2E] to-[#16213E]">
        <div className="container mx-auto px-4 pt-10">
          <Button 
            variant="ghost" 
            className="mb-6 text-white hover:text-primary" 
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
          
          <div className="max-w-2xl mx-auto">
            {submitted ? (
              <Card className="shadow-lg">
                <CardHeader className="text-center bg-green-50 border-b">
                  <div className="flex justify-center mb-4">
                    <CheckCircle className="h-16 w-16 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl text-green-700">Application Submitted!</CardTitle>
                  <CardDescription>Thank you for your interest in volunteering at Vibe Coding Conference 2026</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 pb-4">
                  <div className="space-y-4 text-center">
                    <p>We've received your volunteer application and will review it shortly.</p>
                    <p className="font-medium">We'll contact you via email with next steps. See you in Houston!</p>
                    
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
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="h-8 w-8 text-primary" />
                    <CardTitle className="text-2xl">Volunteer Application</CardTitle>
                  </div>
                  <CardDescription className="text-gray-300">
                    Join our team of 20 volunteers for Vibe Coding Conference 2026!
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} />
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
                              <Input type="email" placeholder="you@example.com" {...field} />
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
                              <Input type="tel" placeholder="(555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="availability"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Availability During Conference (May 18-22, 2026)</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your availability" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="all-days">All 5 days (May 18-22)</SelectItem>
                                <SelectItem value="weekdays">Weekdays only (May 18-20)</SelectItem>
                                <SelectItem value="weekend">Weekend only (May 21-22)</SelectItem>
                                <SelectItem value="partial">Partial availability (specify below)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Previous Volunteer Experience (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about any previous volunteer or event experience..."
                                className="min-h-[80px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              No experience required! We welcome first-time volunteers.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="whyVolunteer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Why do you want to volunteer?</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us why you're excited to be part of Vibe Coding Conference 2026..."
                                className="min-h-[100px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        disabled={mutation.isPending}
                        className="w-full bg-gradient-to-r from-[#22D1EE] to-[#FF3A8C] hover:shadow-lg hover:shadow-primary/20 transition-all"
                      >
                        {mutation.isPending ? "Submitting..." : "Submit Application"}
                      </Button>
                    </form>
                  </Form>
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
