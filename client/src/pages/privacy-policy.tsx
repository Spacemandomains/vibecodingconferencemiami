import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-heading font-bold text-4xl mb-8">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="lead">
                Last Updated: March 29, 2025
              </p>
              
              <h2>1. Introduction</h2>
              <p>
                Vibe Coding Conference ("we," "us," or "our") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you visit our website or register for our conference.
              </p>
              
              <h2>2. Information We Collect</h2>
              <p>We may collect information about you in a variety of ways, including:</p>
              
              <h3>2.1 Personal Data</h3>
              <p>
                When you register for our conference or waitlist, we collect personal information such as:
              </p>
              <ul>
                <li>Name</li>
                <li>Email address</li>
                <li>Contact information</li>
                <li>Payment information (when purchasing tickets or merchandise)</li>
                <li>Professional information (company, job title)</li>
              </ul>
              
              <h3>2.2 Automatically Collected Information</h3>
              <p>
                When you visit our website, our servers may automatically log the standard data provided by your web browser. This may include:
              </p>
              <ul>
                <li>Your computer's IP address</li>
                <li>Your browser type and version</li>
                <li>The pages you visit</li>
                <li>The time and date of your visit</li>
                <li>The time spent on each page</li>
              </ul>
              
              <h2>3. How We Use Your Information</h2>
              <p>We may use the information we collect for various purposes, including to:</p>
              <ul>
                <li>Process your registration and payments</li>
                <li>Communicate with you about the conference and related events</li>
                <li>Personalize your experience</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
              
              <h2>4. Disclosure of Your Information</h2>
              <p>We may share your information with:</p>
              <ul>
                <li>Service providers who assist us in operating our website and conducting our business</li>
                <li>Conference sponsors, with your explicit consent</li>
                <li>Legal authorities when required by law</li>
              </ul>
              
              <h2>5. Security of Your Information</h2>
              <p>
                We use administrative, technical, and physical security measures to help protect your personal information. 
                While we have taken reasonable steps to secure the information you provide to us, please be aware that 
                no security measures are perfect or impenetrable, and we cannot guarantee the security of your information.
              </p>
              
              <h2>6. Your Rights</h2>
              <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
              <ul>
                <li>The right to access personal information we hold about you</li>
                <li>The right to request correction of your personal information</li>
                <li>The right to request deletion of your personal information</li>
                <li>The right to withdraw consent</li>
              </ul>
              
              <h2>7. Cookies</h2>
              <p>
                We use cookies to collect information about your browsing activities. You can set your browser to refuse all 
                or some browser cookies, or to alert you when websites set or access cookies.
              </p>
              
              <h2>8. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The updated version will be indicated by an updated 
                "Last Updated" date and the updated version will be effective as soon as it is accessible.
              </p>
              
              <h2>9. Contact Us</h2>
              <p>
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              <p>
                Email: privacy@vibecodingconf.com
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}