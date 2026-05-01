import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = () => {
  const faqs = [
    {
      question: "Do I need coding experience?",
      answer: "Not at all! Vibe Coding Conference is designed for complete beginners. Most of our attendees have never written a line of code before. Our beginner track will guide you from zero to building your first app with AI assistance."
    },
    {
      question: "What should I bring?",
      answer: "Just bring a laptop and an open mind! You don't need any special software installed beforehand—we'll help you set everything up during the conference. A notebook for jotting down ideas is also helpful."
    },
    {
      question: "Will there be step-by-step sessions?",
      answer: "Absolutely! Our beginner track features hands-on, step-by-step workshops where instructors guide you through every click and keystroke. You'll never feel lost or left behind."
    },
    {
      question: "Is this too technical?",
      answer: "No way! We've specifically designed Vibe Coding Conference to be approachable for non-technical folks. We avoid jargon, explain everything in plain language, and focus on practical building over theory."
    },
    {
      question: "What will I leave with?",
      answer: "You'll leave with a working project you built yourself, a repeatable process for building with AI, connections with fellow builders, and the confidence to keep creating on your own. Many attendees ship their first app during the conference!"
    }
  ];

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading font-bold text-4xl mb-4">Frequently Asked Questions</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            Got questions? We've got answers. Here's what beginners typically want to know.
          </p>
        </motion.div>
        
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                <AccordionTrigger className="text-left font-heading font-semibold text-lg py-4 hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
