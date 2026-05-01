import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <motion.div 
    className="bg-white rounded-xl shadow-lg p-8 transition-all hover:shadow-xl"
    whileHover={{ y: -5 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="font-heading font-bold text-xl mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

export const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading font-bold text-4xl mb-4">About the Vibe Coding Conference</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-600">
            Experience the premier tech and coding conference in Houston, TX for 2026, powered by Replit. Join industry leaders for five days of cutting-edge technology, innovative workshops, and high-energy networking at Houston's most anticipated coding event.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>}
            title="Innovative Coding Workshops"
            description="Hands-on coding sessions led by Replit developers and industry pioneers. Dive deep into AI, web development, and cutting-edge technologies."
          />
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF3A8C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>}
            title="Tech Networking Opportunities"
            description="Connect with 1000+ developers, founders, and tech leaders at Houston's premier coding conference. Build relationships within the tech community."
          />
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF9244]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>}
            title="Houston Tech Event Atmosphere"
            description="Experience Houston's premier coding event. Evening networking events, morning meetups, and exclusive Houston tech experiences complement the conference program."
          />
        </div>

        <motion.div 
          className="mt-20 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="bg-[#231942] rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12 flex items-center">
                <div>
                  <h3 className="font-heading font-bold text-3xl text-white mb-6">
                    What to Expect at Vibe Coding Conference 2026
                  </h3>
                  <ul className="space-y-4 text-gray-300">
                    {[
                      "50+ world-class speakers from Replit and leading tech companies",
                      "100+ coding workshops covering web development, AI, cloud computing, and emerging technologies",
                      "Houston's largest tech hackathon with $50,000 in prizes",
                      "Houston networking events connecting the tech community",
                      "Tech conference job fair with top companies actively recruiting"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-6 w-6 mr-2 text-[#4AE290] flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button
                      asChild
                      className="bg-gradient-to-r from-[#22D1EE] to-[#FF3A8C] hover:shadow-lg hover:shadow-primary/20 transition-all"
                    >
                      <a href="#register">Secure Your Spot</a>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <img 
                  src="https://images.unsplash.com/photo-1515187029135-18ee286d815b" 
                  alt="Vibe Coding Conference 2026 in Houston TX - Tech and Coding Event" 
                  className="h-full w-full object-cover" 
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
