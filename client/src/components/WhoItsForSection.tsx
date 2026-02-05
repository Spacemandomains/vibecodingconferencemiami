import { motion } from "framer-motion";
import { Lightbulb, Palette, Briefcase, GraduationCap, Rocket } from "lucide-react";

const PersonaCard = ({ 
  icon, 
  title, 
  description,
  delay 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  delay: number;
}) => (
  <motion.div 
    className="bg-white rounded-xl shadow-lg p-6 text-center transition-all hover:shadow-xl"
    whileHover={{ y: -5 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#22D1EE]/20 to-[#FF3A8C]/20 flex items-center justify-center mx-auto mb-4">
      {icon}
    </div>
    <h3 className="font-heading font-bold text-lg mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </motion.div>
);

export const WhoItsForSection = () => {
  const personas = [
    {
      icon: <Lightbulb className="h-7 w-7 text-[#22D1EE]" />,
      title: "Absolute Beginners",
      description: "Never written a line of code? Perfect. You'll learn alongside others just like you."
    },
    {
      icon: <Rocket className="h-7 w-7 text-[#FF3A8C]" />,
      title: "Non-Technical Founders",
      description: "Have a startup idea but can't build it yet? Learn to prototype with AI."
    },
    {
      icon: <Palette className="h-7 w-7 text-[#FF9244]" />,
      title: "Designers & Creators",
      description: "Want to bring your creative visions to life? Build real products, not just mockups."
    },
    {
      icon: <Briefcase className="h-7 w-7 text-[#4AE290]" />,
      title: "Career Switchers",
      description: "Looking to break into tech? Vibe coding is your fastest path to building."
    },
    {
      icon: <GraduationCap className="h-7 w-7 text-primary" />,
      title: "Students & Curious Builders",
      description: "Curious about AI and building? Start your journey in a supportive environment."
    }
  ];

  return (
    <section id="who-its-for" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading font-bold text-4xl mb-4">Who It's For</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            Vibe Coding Miami welcomes everyone—no matter your background or experience level.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {personas.map((persona, index) => (
            <PersonaCard 
              key={index}
              icon={persona.icon}
              title={persona.title}
              description={persona.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoItsForSection;
