import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CodeOfConduct() {
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
            <h1 className="font-heading font-bold text-4xl mb-8">Code of Conduct</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="lead">
                Last Updated: March 29, 2025
              </p>
              
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-6">
                <div className="flex items-start">
                  <AlertTriangle className="h-6 w-6 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-amber-700 m-0">
                    If you are being harassed, notice that someone else is being harassed, or have any other concerns, 
                    please contact a member of conference staff immediately. Conference staff can be identified by 
                    their "STAFF" badges and shirts.
                  </p>
                </div>
              </div>
              
              <h2>Purpose</h2>
              <p>
                The Vibe Coding Conference is dedicated to providing a harassment-free conference experience for everyone, 
                regardless of gender, gender identity and expression, age, sexual orientation, disability, physical appearance, 
                body size, race, ethnicity, religion (or lack thereof), or technology choices. We do not tolerate harassment of 
                conference participants in any form. Conference participants violating these rules may be sanctioned or expelled 
                from the conference without a refund at the discretion of the conference organizers.
              </p>
              
              <h2>Expected Behavior</h2>
              <p>All attendees, speakers, sponsors, and volunteers at our conference are expected to:</p>
              <ul>
                <li>Be considerate, respectful, and collaborative.</li>
                <li>Refrain from demeaning, discriminatory, or harassing behavior and speech.</li>
                <li>Be mindful of your surroundings and of your fellow participants.</li>
                <li>Alert conference officials if you notice a dangerous situation, someone in distress, or violations of this Code of Conduct.</li>
                <li>Participate in an authentic and active way.</li>
              </ul>
              
              <h2>Unacceptable Behavior</h2>
              <p>The following behaviors are considered harassment and are unacceptable:</p>
              <ul>
                <li>Violence, threats of violence, or violent language directed against another person.</li>
                <li>Sexist, racist, homophobic, transphobic, ableist, or otherwise discriminatory jokes and language.</li>
                <li>Posting or displaying sexually explicit or violent material.</li>
                <li>Posting or threatening to post other people's personally identifying information ("doxxing").</li>
                <li>Personal insults, particularly those related to gender, sexual orientation, race, religion, or disability.</li>
                <li>Inappropriate photography or recording.</li>
                <li>Inappropriate physical contact or unwelcome sexual attention.</li>
                <li>Deliberate intimidation, stalking, or following.</li>
                <li>Sustained disruption of talks or other events.</li>
                <li>Advocating for, or encouraging, any of the above behavior.</li>
              </ul>
              
              <h2>Consequences of Unacceptable Behavior</h2>
              <p>
                Unacceptable behavior by any community member will not be tolerated. Anyone asked to stop unacceptable 
                behavior is expected to comply immediately. If a community member engages in unacceptable behavior, we 
                may take any action deemed appropriate, including a temporary ban or permanent expulsion from the 
                conference without warning or refund.
              </p>
              
              <h2>Reporting Guidelines</h2>
              <p>
                If you are subject to or witness unacceptable behavior, or have any other concerns, please notify us as soon as possible:
              </p>
              <ul>
                <li>Email: conduct@vibecodingconf.com</li>
                <li>Phone: (305) 555-4321 (Conference Hotline)</li>
                <li>In person: Find any staff member with a "STAFF" badge</li>
              </ul>
              
              <h2>Scope</h2>
              <p>
                We expect all conference participants (contributors, paid or otherwise; sponsors; and other guests) to abide by 
                this Code of Conduct in all conference venues, including online venues and conference-related social events.
              </p>
              
              <h2>Contact Information</h2>
              <p>
                Email: conduct@vibecodingconf.com<br />
                Emergency Phone: (305) 555-4321
              </p>
              
              <div className="mt-8">
                <Button className="bg-primary hover:bg-primary/90">
                  Report an Incident
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}