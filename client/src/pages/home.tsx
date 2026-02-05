import { Navbar } from "@/components/Navbar";
import Hero from "@/components/Hero";
import IsThisForMeSection from "@/components/IsThisForMeSection";
import CountdownTimer from "@/components/CountdownTimer";
import WhoItsForSection from "@/components/WhoItsForSection";
import AboutSection from "@/components/AboutSection";
import VenueSection from "@/components/VenueSection";
import TicketsSection from "@/components/TicketsSection";
import FAQSection from "@/components/FAQSection";
import { MerchandiseSection } from "@/components/MerchandiseSection";
import OrganizerSection from "@/components/OrganizerSection";
import RegistrationForm from "@/components/RegistrationForm";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <Hero />
        <IsThisForMeSection />
        <CountdownTimer />
        <WhoItsForSection />
        <AboutSection />
        <VenueSection />
        <TicketsSection />
        <FAQSection />
        <MerchandiseSection />
        <OrganizerSection />
        
        {/* Registration Section */}
        <section id="register" className="py-16 bg-white relative">
          <div className="h-12 bg-[url('data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201200%20120%22%20preserveAspectRatio%3D%22none%22%3E%3Cpath%20d%3D%22M321.39%2C56.44c58-10.79%2C114.16-30.13%2C172-41.86%2C82.39-16.72%2C168.19-17.73%2C250.45-.39C823.78%2C31%2C906.67%2C72%2C985.66%2C92.83c70.05%2C18.48%2C146.53%2C26.09%2C214.34%2C3V0H0V27.35A600.21%2C600.21%2C0%2C0%2C0%2C321.39%2C56.44Z%22%20fill%3D%22%23ffffff%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E')] bg-no-repeat bg-cover bg-center rotate-180 absolute top-0 left-0 right-0"></div>
          
          <div className="container mx-auto px-6 pt-16">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading font-bold text-4xl mb-4">Join the Waitlist</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
              <p className="max-w-2xl mx-auto text-gray-600">
                Sign up to receive exclusive updates, free tickets and hotel stay, and more.
              </p>
            </motion.div>
            
            <motion.div 
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-8 lg:p-10">
                    <RegistrationForm />
                  </div>
                  <div className="hidden md:block relative overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1497215842964-222b430dc094" 
                      alt="Tech Conference" 
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-[#FF3A8C]/80 mix-blend-multiply"></div>
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="text-white text-center">
                        <h3 className="font-heading font-bold text-2xl mb-3">Secure Your Spot</h3>
                        <p className="mb-4">Limited capacity event - don't miss out on the most vibrant coding conference of 2026!</p>
                        <div className="flex flex-col space-y-3">
                          {[
                            { icon: "clock", text: "Free tickets to the conference" },
                            { icon: "dollar", text: "Complimentary hotel stay" },
                            { icon: "info", text: "Exclusive content updates" }
                          ].map((item, index) => (
                            <div key={index} className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{item.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
