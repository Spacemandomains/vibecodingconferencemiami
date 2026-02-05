import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function TermsOfService() {
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
            <h1 className="font-heading font-bold text-4xl mb-8">Terms of Service</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="lead">
                Last Updated: March 29, 2025
              </p>
              
              <h2>1. Agreement to Terms</h2>
              <p>
                By accessing or using the Vibe Coding Conference website, registering for the conference, 
                purchasing tickets, or engaging with any of our services, you agree to be bound by these 
                Terms of Service. If you do not agree to these terms, you must not use our website or services.
              </p>
              
              <h2>2. Registration and Tickets</h2>
              <p>
                When registering for the Vibe Coding Conference or purchasing tickets, you agree to provide 
                accurate, current, and complete information. You are responsible for maintaining the 
                confidentiality of your registration information.
              </p>
              
              <h3>2.1 Ticket Policies</h3>
              <ul>
                <li>All ticket sales are final. No refunds will be issued under any circumstances.</li>
                <li>Tickets may be transferred to another person with prior written consent from Vibe Coding Conference.</li>
                <li>We reserve the right to refuse entry to anyone who violates these terms or the Code of Conduct.</li>
              </ul>
              
              <h2>3. No Refund Policy</h2>
              <p>
                <strong>ALL SALES ARE FINAL. NO REFUNDS.</strong> By completing your purchase, you expressly acknowledge and agree to the following:
              </p>
              <ul>
                <li>All conference ticket purchases are non-refundable. No exceptions.</li>
                <li>You acknowledge that you have read and accepted this no-refund policy at checkout before completing your purchase.</li>
                <li>This policy and your acceptance timestamp are recorded and will be provided as evidence in any payment dispute.</li>
                <li>Ticket transfers to another attendee are permitted. Contact <a href="mailto:support@vibecodingmiami.xyz">support@vibecodingmiami.xyz</a> to request a transfer.</li>
                <li>Merchandise purchases are non-refundable once shipped.</li>
              </ul>
              <p>
                This no-refund policy was clearly displayed and you confirmed your acceptance via checkbox at checkout before proceeding with payment.
              </p>
              
              <h2>4. Intellectual Property</h2>
              <p>
                All content on our website, including text, graphics, logos, images, and software, is the 
                property of Vibe Coding Conference or our content suppliers and is protected by copyright 
                and intellectual property laws.
              </p>
              
              <h3>4.1 Conference Content</h3>
              <p>
                Presentations, materials, and recordings from the conference are the intellectual property 
                of their respective creators. Recording or redistributing conference content without explicit 
                permission is prohibited.
              </p>
              
              <h2>5. Limitation of Liability</h2>
              <p>
                In no event shall Vibe Coding Conference, its organizers, sponsors, or affiliates be liable 
                for any indirect, consequential, exemplary, incidental, special, or punitive damages, including 
                lost profit, lost revenue, lost data, or other damages arising from your use of the website or 
                attendance at the conference.
              </p>
              
              <h2>6. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless Vibe Coding Conference, its organizers, 
                sponsors, and affiliates from and against any claims, liabilities, damages, losses, and expenses, 
                including, without limitation, reasonable legal and accounting fees, arising out of or in any way 
                connected with your access to or use of the website or attendance at the conference.
              </p>
              
              <h2>7. Event Cancellation or Modification</h2>
              <p>
                We reserve the right to change the conference program, speakers, date, or venue, or to cancel 
                the event due to circumstances beyond our control. In case of complete event cancellation by Vibe Coding Conference, 
                registrants will receive a credit for a future event or ticket transfer options at our discretion.
              </p>
              
              <h2>8. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of Florida, 
                without regard to its conflict of law provisions.
              </p>
              
              <h2>9. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. The updated version will be effective as 
                soon as it is posted on our website. You are responsible for regularly reviewing these Terms.
              </p>
              
              <h2>10. Contact Information</h2>
              <p>
                For questions about these Terms, please contact us at:
              </p>
              <p>
                Email: legal@vibecodingconf.com
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}