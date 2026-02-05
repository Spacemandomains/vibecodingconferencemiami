import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function SponsorshipPage() {
  const [_, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Sponsorship Opportunities</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Partner with us to connect with the pioneers of AI and LLM development at 
              South Beach Miami's premier coding conference
            </p>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Sponsorship Tiers</h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
              Choose the sponsorship level that aligns with your goals and budget
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Platinum",
                  price: "$50,000",
                  description: "Maximum visibility and premium positioning",
                  features: [
                    "Prominent logo placement on stage backdrop",
                    "Premium exhibition space (20'x20')",
                    "5-min keynote opportunity",
                    "20 VIP passes",
                    "Full-page ad in conference program",
                    "Social media spotlights (6x)",
                    "Logo on all digital and print materials",
                    "Attendee list with contact information",
                    "Sponsored email blast to attendees",
                    "Workshop opportunity (90 mins)"
                  ]
                },
                {
                  title: "Gold",
                  price: "$25,000",
                  description: "High visibility for your brand",
                  features: [
                    "Logo on main stage screens",
                    "Prime exhibition space (15'x15')",
                    "12 VIP passes",
                    "Half-page ad in conference program",
                    "Social media spotlights (4x)",
                    "Logo on conference website and app",
                    "Panel participation opportunity",
                    "Attendee list with contact information"
                  ]
                },
                {
                  title: "Silver",
                  price: "$10,000",
                  description: "Excellent brand exposure",
                  features: [
                    "Standard exhibition space (10'x10')",
                    "6 VIP passes",
                    "Quarter-page ad in conference program",
                    "Social media spotlights (2x)",
                    "Logo on conference website",
                    "Mention in conference emails"
                  ]
                },
                {
                  title: "Vibe Supporter",
                  price: "$1,000",
                  description: "Perfect for startups and small teams",
                  features: [
                    "Logo on conference website",
                    "2 VIP passes",
                    "Mention in conference program",
                    "Social media acknowledgment"
                  ]
                }
              ].map((level, index) => (
                <motion.div
                  key={level.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-center">{level.title}</CardTitle>
                      <div className="text-3xl font-bold text-center text-primary">{level.price}</div>
                      <CardDescription className="text-center">
                        {level.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-2">
                        {level.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-primary mr-2">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => setLocation(`/sponsor-payment?tier=${encodeURIComponent(level.title)}&price=${parseInt(level.price.replace(/[$,]/g, ''))}`)}
                      >
                        Purchase
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-24">
              <h2 className="text-3xl font-bold text-center mb-12">Signature Sponsorships</h2>
              <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
                Make a statement with these exclusive, high-visibility sponsorship opportunities
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="h-full flex flex-col bg-gradient-to-br from-[#231942] to-[#5e548e] text-white">
                    <CardHeader>
                      <CardTitle className="text-center">Conference Title Sponsorship</CardTitle>
                      <div className="text-3xl font-bold text-center text-white">$500,000</div>
                      <CardDescription className="text-center text-gray-200">
                        Exclusive naming rights to the conference
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-white mr-2">✓</span>
                          <span>The event becomes "Vibe Coding Conference presented by [Your Brand]"</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-white mr-2">✓</span>
                          <span>Premium logo placement on all event materials</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-white mr-2">✓</span>
                          <span>Exclusive keynote opportunity (45 mins)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-white mr-2">✓</span>
                          <span>20 VIP all-access passes</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        variant="secondary"
                        onClick={() => setLocation(`/sponsor-payment?tier=${encodeURIComponent("Conference Title Sponsorship")}&price=500000`)}
                      >
                        Purchase
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-center">Afterparty Co-Sponsor</CardTitle>
                      <div className="text-3xl font-bold text-center text-primary">$250,000</div>
                      <CardDescription className="text-center">
                        Co-sponsor the official conference afterparty
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span>Branded afterparty experience at exclusive Miami venue</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span>Custom signature cocktail named after your brand</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span>Co-branded event swag for all attendees</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span>15 VIP all-access passes</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => setLocation(`/sponsor-payment?tier=${encodeURIComponent("Afterparty Co-Sponsor")}&price=250000`)}
                      >
                        Purchase
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-center">Speaker Lounge</CardTitle>
                      <div className="text-3xl font-bold text-center text-primary">$150,000</div>
                      <CardDescription className="text-center">
                        Exclusive sponsorship of the speaker lounge
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span>Branded lounge area for speakers and VIPs</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span>Exclusive networking with conference speakers</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span>Opportunity to provide premium branded gifts to speakers</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span>10 VIP all-access passes</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => setLocation(`/sponsor-payment?tier=${encodeURIComponent("Speaker Lounge")}&price=150000`)}
                      >
                        Purchase
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-center">Attendee Lanyards</CardTitle>
                      <div className="text-3xl font-bold text-center text-primary">$100,000</div>
                      <CardDescription className="text-center">
                        Your brand on every attendee
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span>Exclusive branding on all attendee lanyards and badges</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span>Premium booth location in Expo Zone</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span>Recognition during opening ceremony</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span>8 VIP all-access passes</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => setLocation(`/sponsor-payment?tier=${encodeURIComponent("Attendee Lanyards")}&price=100000`)}
                      >
                        Purchase
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-center">Swag Box</CardTitle>
                      <div className="text-3xl font-bold text-center text-primary">$25,000</div>
                      <CardDescription className="text-center">
                        Include your product in attendee swag boxes
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span>Include your branded product in all attendee swag boxes</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span>Logo recognition in conference program</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span>Social media acknowledgment</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span>2 VIP all-access passes</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => setLocation(`/sponsor-payment?tier=${encodeURIComponent("Swag Box")}&price=25000`)}
                      >
                        Purchase
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Why Sponsor the Vibe Coding Conference?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-4">AI Leadership Positioning</h3>
                <p>
                  Position your brand as a leader in the AI and LLM ecosystem by connecting with the developers
                  and companies building the future of AI-powered tools.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-4">Product Showcase</h3>
                <p>
                  Demonstrate your AI tools and services to an audience of early adopters and influencers
                  in one of the most vibrant tech scenes in Miami.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-4">Partnership Opportunities</h3>
                <p>
                  Connect with potential integration partners, customers, and talent in the growing 
                  AI-powered SaaS ecosystem in a relaxed, collaborative environment.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}