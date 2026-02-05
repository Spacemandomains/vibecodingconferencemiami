import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import organizerPhoto from "@/assets/wilfred-lee.jpg";

export const OrganizerSection = () => {
  return (
    <section id="organizer" className="py-16 bg-gradient-to-br from-[#1A1A2E] to-[#16213E] text-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading font-bold text-4xl mb-4">Meet the Organizer</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={organizerPhoto} 
              alt="Wilfred Lee Jr." 
              className="rounded-2xl shadow-2xl w-80 h-80 object-cover object-center"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-heading font-bold text-3xl mb-4">Wilfred Lee Jr.</h3>
            <p className="text-primary font-semibold mb-2">Event Organizer & Founder</p>
            <p className="text-[#22D1EE] font-medium mb-4">Hosted by AI Solopreneur Wilfred Lee</p>
            
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Wilfred Lee Jr. is a builder, founder, and independent creator focused on making technology more accessible to people who don't come from traditional technical backgrounds.
              </p>
              <p>
                Through building in public across SaaS, e-commerce, and creator platforms, Wilfred began using AI as a practical tool to move faster, experiment freely, and turn ideas into working products without gatekeeping. That approach evolved into what he calls vibe coding: building software by focusing on intent, clarity, and iteration rather than credentials or complexity.
              </p>
              <p>
                Wilfred created Vibe Coding Miami to give newcomers a clear, welcoming entry point into building with AI—before the space becomes crowded, rigid, and closed off.
              </p>
              <p className="text-primary font-bold text-lg pt-2">
                Code. Learn. Build. Repeat.
              </p>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <Users className="h-12 w-12 text-primary" />
            </div>
            <h3 className="font-heading font-bold text-2xl mb-4">We're Looking for 20 Volunteers!</h3>
            <p className="text-gray-300 mb-6">
              Want to be part of something special? We're looking for 20 passionate volunteers to help make Vibe Coding Miami 2026 an unforgettable experience. Help with registration, guide attendees, assist speakers, and be at the heart of the action.
            </p>
            <Link href="/volunteer">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-[#22D1EE] to-[#FF3A8C] hover:shadow-lg hover:shadow-primary/20 transition-all"
              >
                Apply to Volunteer
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OrganizerSection;
