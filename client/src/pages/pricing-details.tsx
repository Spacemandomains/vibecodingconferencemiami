import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function PricingDetails() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A2E] to-[#16213E]">
      <Navbar />
      
      <div className="container mx-auto px-6 py-16">
        <motion.div 
          className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm rounded-xl p-8 text-white shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8">Pricing Details and Policies</h1>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Ticket Pricing</h2>
            <p className="mb-4">
              All prices shown are in USD and are subject to change. Early bird pricing 
              offers a 25% discount off regular pricing and is available until December 31, 2025 
              or until supplies last.
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse mb-6">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4">Ticket Type</th>
                    <th className="text-left py-3 px-4">Early Bird</th>
                    <th className="text-left py-3 px-4">Regular</th>
                    <th className="text-left py-3 px-4">Late Registration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4">Founding Builder Pass</td>
                    <td className="py-3 px-4">$799</td>
                    <td className="py-3 px-4">$999</td>
                    <td className="py-3 px-4">$1,199</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4">VIP Pass</td>
                    <td className="py-3 px-4">$1,299</td>
                    <td className="py-3 px-4">$1,599</td>
                    <td className="py-3 px-4">$1,899</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4">Developer Pass (per person, 4+ required)</td>
                    <td className="py-3 px-4">$599</td>
                    <td className="py-3 px-4">$799</td>
                    <td className="py-3 px-4">$999</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-400">
              * Developer Pass pricing requires a minimum of 4 people from the same organization.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-primary">No Refund Policy</h2>
            <div className="space-y-6">
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <p className="text-lg font-semibold text-red-400 mb-2">
                  ALL SALES ARE FINAL. NO REFUNDS.
                </p>
                <p>
                  By completing your ticket purchase, you expressly acknowledge and agree that all sales are final and non-refundable. This policy is clearly disclosed at checkout and your purchase constitutes acceptance of these terms.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary">No Refunds Under Any Circumstances</h3>
                <p className="mb-2">All pass types (Founding Builder Pass, VIP Pass, Developer Pass, and promotional tickets) are non-refundable.</p>
                <p>By purchasing a ticket, you acknowledge that:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>You have read and agreed to this no-refund policy before completing your purchase.</li>
                  <li>Your acceptance of this policy (via checkbox) and timestamp are recorded with your order.</li>
                  <li>This policy and your recorded acceptance will be provided as evidence in any payment dispute.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Ticket Transfers Available</h3>
                <p className="mb-3">While we do not offer refunds, we do allow ticket transfers. If you cannot attend, you may transfer your ticket to another person.</p>
                <p className="mb-2">To request a ticket transfer, email <a href="mailto:support@vibecodingmiami.xyz" className="text-primary">support@vibecodingmiami.xyz</a> with:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Your original order confirmation number</li>
                  <li>The new attendee's full name and email address</li>
                  <li>The new attendee's phone number</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Payment Disputes</h3>
                <p>If you initiate a chargeback or payment dispute after purchasing a ticket, we will provide your bank or payment processor with evidence that:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>You agreed to our no-refund policy at checkout before completing payment.</li>
                  <li>The service was delivered as described (conference access).</li>
                  <li>A ticket transfer option was available to you as an alternative.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Event Cancellation</h3>
                <p>In the unlikely event that Vibe Coding Conference cancels the event entirely, attendees will receive credit toward a future event or be offered ticket transfer options at our discretion.</p>
              </div>
            </div>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Merchandise Pricing</h2>
            <p className="mb-4">
              All merchandise is available for pre-order and will be available for pickup at the conference.
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4">Item</th>
                    <th className="text-left py-3 px-4">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4">Vibe Conference T-Shirt</td>
                    <td className="py-3 px-4">$29.99</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4">Vibe Conference Cap</td>
                    <td className="py-3 px-4">$24.99</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Group Discounts</h2>
            <p className="mb-4">
              We offer special discounts for larger groups:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Teams of 4-9:</strong> Standard Developer Pass pricing applies ($599 per person during early bird).
              </li>
              <li>
                <strong>Teams of 10-19:</strong> Additional 10% discount off Developer Pass pricing.
              </li>
              <li>
                <strong>Teams of 20+:</strong> Additional 15% discount off Developer Pass pricing.
              </li>
            </ul>
            <p className="mt-4">
              For large group bookings of 20 or more, please contact us directly at 
              <a href="mailto:groups@vibecodingmiami.xyz" className="text-primary ml-1">groups@vibecodingmiami.xyz</a> 
              for personalized assistance.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Additional Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                All tickets include access to conference sessions as specified in the ticket description.
              </li>
              <li>
                VIP Passes include exclusive access to the VIP lounge, speaker dinner, and Houston VIP dinner cruise.
              </li>
              <li>
                Founding Builder Pass and Developer Pass include the standard conference swag box.
              </li>
              <li>
                VIP Passes include the premium conference swag box with additional exclusive items.
              </li>
              <li>
                All ticket types include lunch and refreshments during the main conference days.
              </li>
              <li>
                Workshops may require separate registration, even for VIP pass holders.
              </li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Payment Processing</h2>
            <p className="mb-4">
              All payments are processed securely through Stripe. We accept all major credit cards.
            </p>
            <p className="mb-4">
              For any questions regarding your payment, please contact 
              <a href="mailto:billing@vibecodingmiami.xyz" className="text-primary ml-1">billing@vibecodingmiami.xyz</a>.
            </p>
          </section>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}