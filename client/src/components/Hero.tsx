import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import SocialShare from "./SocialShare";
import { Check } from "lucide-react";

export const Hero = () => {
  return (
    <section className="pt-20 bg-[#231942] text-white relative overflow-hidden">
      <div className="container mx-auto px-6 pt-16 pb-24">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div 
            className="lg:w-1/2 z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
              <span className="bg-gradient-to-r from-[#22D1EE] via-[#FF3A8C] to-[#FF9244] text-transparent bg-clip-text">
                New to Vibe Coding?
              </span>
              <br />Learn to Build With AI — From Zero.
            </h1>
            <p className="text-lg md:text-xl mb-4 text-gray-200">
              Vibe Coding Conference is a beginner-friendly conference where you'll learn how to turn ideas into real apps using AI—without needing a computer science background or years of coding experience.
            </p>
            <p className="text-sm text-gray-400 mb-6">
              No experience required. Most attendees are founders, creatives, career-switchers, and first-time builders.
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-[#4AE290] flex-shrink-0 mt-0.5" />
                <span className="text-gray-200">Start from scratch: learn the vibe coding workflow (prompting, structuring, shipping)</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-[#4AE290] flex-shrink-0 mt-0.5" />
                <span className="text-gray-200">Hands-on guidance: step-by-step sessions + beginner tracks</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-[#4AE290] flex-shrink-0 mt-0.5" />
                <span className="text-gray-200">Leave with progress: a working project, a repeatable process, and a builder mindset</span>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <Button
                asChild
                className="bg-gradient-to-r from-[#22D1EE] to-[#FF3A8C] hover:from-[#22D1EE] hover:to-[#FF3A8C] hover:shadow-lg hover:shadow-primary/20 transition-all"
              >
                <a href="#tickets">Get Your Pass</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-primary text-white hover:bg-primary/10 transition-all"
              >
                <a href="#is-this-for-me">Is this for me?</a>
              </Button>
            </div>
            
            <p className="text-xs text-gray-400 mb-6">
              Beginner track included • Friendly room • No gatekeeping • Houston, TX • May 18–22, 2026
            </p>

            <div className="flex items-center gap-2">
              <SocialShare 
                buttonText="Share Event" 
                variant="ghost" 
                className="text-white hover:bg-white/10"
                showLabel={true}
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 mt-12 lg:mt-0 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative z-10 animate-[float_6s_ease-in-out_infinite]">
              <img 
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87"
                alt="Tech Conference" 
                className="rounded-lg shadow-2xl" 
              />
              <div className="absolute -bottom-4 -right-4 bg-[#FF9244] text-white font-bold py-2 px-4 rounded-lg">
                BEGINNER FRIENDLY
              </div>
            </div>
            <div className="absolute top-1/4 -left-12 w-24 h-24 rounded-full bg-[#22D1EE]/30 blur-xl"></div>
            <div className="absolute bottom-1/4 -right-12 w-32 h-32 rounded-full bg-[#FF3A8C]/30 blur-xl"></div>
          </motion.div>
        </div>
      </div>
      
      <div className="h-12 bg-[url('data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201200%20120%22%20preserveAspectRatio%3D%22none%22%3E%3Cpath%20d%3D%22M321.39%2C56.44c58-10.79%2C114.16-30.13%2C172-41.86%2C82.39-16.72%2C168.19-17.73%2C250.45-.39C823.78%2C31%2C906.67%2C72%2C985.66%2C92.83c70.05%2C18.48%2C146.53%2C26.09%2C214.34%2C3V0H0V27.35A600.21%2C600.21%2C0%2C0%2C0%2C321.39%2C56.44Z%22%20fill%3D%22%23ffffff%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E')] bg-no-repeat bg-cover bg-center"></div>
    </section>
  );
};

export default Hero;
