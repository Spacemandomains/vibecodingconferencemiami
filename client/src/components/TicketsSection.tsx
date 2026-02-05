import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface TicketOption {
  id: number;
  name: string;
  description: string;
  price: number;
  type: string;
  features: string[];
}

const TicketCard = ({ 
  ticket, 
  popular = false 
}: { 
  ticket: TicketOption; 
  popular?: boolean;
}) => {
  // Format price from cents to dollars
  const formattedPrice = `$${(ticket.price / 100).toFixed(2)}`;
  const originalPrice = `$${((ticket.price * 1.25) / 100).toFixed(2)}`;
  
  return (
    <motion.div 
      className={`bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 ${
        popular ? "transform scale-105 relative z-10" : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-[#FF3A8C] text-white text-xs font-bold px-3 py-1 uppercase">
          Most Popular
        </div>
      )}
      <div className={`p-6 ${
        ticket.type === 'developer' ? 'bg-primary/20' : 
        ticket.type === 'vip' ? 'bg-[#FF3A8C]/20' :
        'bg-[#FF9244]/20'
      }`}>
        <h3 className="font-heading font-bold text-2xl text-white">{ticket.name}</h3>
        <p className="text-gray-300">{ticket.description}</p>
      </div>
      <div className="p-6">
        <div className="mb-6">
          <span className="text-4xl font-bold text-white">{formattedPrice}</span>
          <span className="text-gray-400 line-through ml-2">{originalPrice}</span>
          <span className="block text-sm text-gray-400 mt-1">Early bird pricing</span>
        </div>
        <ul className="space-y-3 mb-8">
          {ticket.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 mr-2 text-[#4AE290]" />
              <span className="text-white">{feature}</span>
            </li>
          ))}
        </ul>
        <Button 
          asChild
          className="w-full bg-gradient-to-r from-[#4AE290] to-primary hover:shadow-lg hover:shadow-primary/20 transition-all"
        >
          <Link href={`/checkout/${ticket.type}`}>
            Pre-Purchase Now
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

export const TicketsSection = () => {
  const { toast } = useToast();
  
  const { data: tickets, isLoading, error } = useQuery<TicketOption[]>({
    queryKey: ['/api/tickets'],
    retry: 3,
    // Ensure we return an empty array if there's no data
    select: (data): TicketOption[] => data || []
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading tickets",
        description: "Please refresh the page and try again.",
        variant: "destructive"
      });
    }
  }, [error, toast]);

  return (
    <section id="tickets" className="py-16 bg-gradient-to-br from-[#231942] to-[#231942]/90 text-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading font-bold text-4xl mb-4">Secure Your Tickets Early</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-300">
            Limited early-bird tickets available at special pricing.
          </p>
        </motion.div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 p-6">
                <Skeleton className="h-8 w-3/4 bg-white/10 mb-2" />
                <Skeleton className="h-4 w-1/2 bg-white/10 mb-6" />
                <Skeleton className="h-10 w-1/3 bg-white/10 mb-6" />
                {[1, 2, 3, 4].map((j) => (
                  <Skeleton key={j} className="h-4 w-full bg-white/10 mb-2" />
                ))}
                <Skeleton className="h-12 w-full bg-white/10 mt-6" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.isArray(tickets) && tickets.length > 0 ? (
              tickets.map((ticket: TicketOption, index: number) => (
                <TicketCard 
                  key={ticket.id} 
                  ticket={ticket} 
                  popular={ticket.type === 'vip'} 
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-400">No tickets available at the moment. Check back soon!</p>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-2">All ticket sales are final. No refunds. Ticket transfers available upon request.</p>
          <Link href="/pricing-details" className="text-primary underline">View full pricing details and policies</Link>
        </div>
      </div>
    </section>
  );
};

export default TicketsSection;
