import { motion } from "framer-motion";
import { MapPin, Check } from "lucide-react";

export const VenueSection = () => {
  return (
    <section id="venue" className="py-16 bg-white relative">
      <div className="h-12 bg-[url('data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201200%20120%22%20preserveAspectRatio%3D%22none%22%3E%3Cpath%20d%3D%22M321.39%2C56.44c58-10.79%2C114.16-30.13%2C172-41.86%2C82.39-16.72%2C168.19-17.73%2C250.45-.39C823.78%2C31%2C906.67%2C72%2C985.66%2C92.83c70.05%2C18.48%2C146.53%2C26.09%2C214.34%2C3V0H0V27.35A600.21%2C600.21%2C0%2C0%2C0%2C321.39%2C56.44Z%22%20fill%3D%22%23ffffff%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E')] bg-no-repeat bg-cover bg-center rotate-180 absolute top-0 left-0 right-0"></div>
      
      <div className="container mx-auto px-6 pt-16">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading font-bold text-4xl mb-4">Houston, TX Venue</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            Join us in the heart of Jersey Village, Houston for five days of coding, learning, and connection.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-heading font-bold text-3xl mb-4">Jersey Village, Houston, TX</h3>
            <p className="text-gray-600 mb-6">
              9934 Jones Rd Suite 14, Houston, TX — come build, learn, and connect with fellow builders in the energy capital of the world.
            </p>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md mb-6"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="font-heading font-bold text-xl mb-3 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                Location Benefits
              </h4>
              <ul className="space-y-2 text-gray-600">
                {[
                  "Easy access from Beltway 8 and Hwy 290",
                  "Dozens of restaurants and hotels nearby",
                  "30 minutes from George Bush Intercontinental Airport",
                  "Great May weather: 75-85°F (24-29°C)"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-[#4AE290]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,h_800,q_85,w_1200/v1/clients/houston/Avenida_Houston_night_13509974-f410-42c8-9fbc-46c14e3e177f.jpg" 
              alt="Avenida Houston at Night" 
              className="rounded-lg shadow-xl w-full object-cover" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VenueSection;
