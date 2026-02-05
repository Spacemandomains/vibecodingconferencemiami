import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export const IsThisForMeSection = () => {
  const bullets = [
    "You're brand new to coding or not technical at all",
    "You have an idea but don't know where to start building it",
    "You want to learn how to build with AI, step-by-step",
    "You want a welcoming room, not gatekeeping or jargon"
  ];

  return (
    <section id="is-this-for-me" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading font-bold text-4xl mb-4">Is this for me?</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          
          <div className="text-left bg-gray-50 rounded-2xl p-8 mb-8">
            <p className="text-gray-600 mb-6 text-lg">
              This conference is perfect for you if...
            </p>
            <ul className="space-y-4">
              {bullets.map((bullet, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Check className="h-6 w-6 mr-3 text-[#4AE290] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-lg">{bullet}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <Button
            asChild
            className="bg-gradient-to-r from-[#22D1EE] to-[#FF3A8C] hover:shadow-lg hover:shadow-primary/20 transition-all"
          >
            <a href="#tickets">See Tickets</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default IsThisForMeSection;
