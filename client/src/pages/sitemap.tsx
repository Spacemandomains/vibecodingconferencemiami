import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Sitemap() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h1 className="font-heading font-bold text-4xl mb-4">Vibe Coding Conference 2026 | Complete Sitemap</h1>
            <div className="w-24 h-1 bg-primary mb-6"></div>
            <p className="text-gray-600">
              Navigate through the Vibe Coding Conference website - Houston, TX's premier tech and coding event of 2026. This sitemap helps you discover all our content, from registration to merchandise.
            </p>
            <p className="text-gray-600 mt-2">
              This comprehensive guide to the Replit-powered Vibe Coding Conference connects you with all sections of our Houston tech event website.
            </p>
            <p className="text-gray-600 mt-2">
              You are currently viewing our HTML sitemap at <a href="https://vibecodingmiami.xyz/sitemap" className="text-primary hover:underline">https://vibecodingmiami.xyz/sitemap</a>
            </p>
            <p className="text-gray-600 mt-2">
              <strong>For search engines:</strong> Please use our <a href="https://vibecodingmiami.xyz/sitemap.xml" className="text-primary hover:underline font-medium">XML Sitemap</a> at <code className="bg-gray-100 px-2 py-1 rounded text-sm">https://vibecodingmiami.xyz/sitemap.xml</code>
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            {/* Main Pages */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-primary/10 border-l-4 border-primary p-4">
                <h2 className="font-heading font-bold text-xl">Main Pages</h2>
              </div>
              <ul className="p-4 space-y-2">
                <li><a href="https://vibecodingmiami.xyz/" className="text-gray-700 hover:text-primary">Home</a></li>
                <li><a href="https://vibecodingmiami.xyz/sponsorship" className="text-gray-700 hover:text-primary">Sponsorship</a></li>
                <li><a href="https://vibecodingmiami.xyz/terms-of-service" className="text-gray-700 hover:text-primary">Terms of Service</a></li>
                <li><a href="https://vibecodingmiami.xyz/privacy-policy" className="text-gray-700 hover:text-primary">Privacy Policy</a></li>
                <li><a href="https://vibecodingmiami.xyz/code-of-conduct" className="text-gray-700 hover:text-primary">Code of Conduct</a></li>
              </ul>
            </div>

            {/* Homepage Sections */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-primary/10 border-l-4 border-primary p-4">
                <h2 className="font-heading font-bold text-xl">Homepage Sections</h2>
              </div>
              <ul className="p-4 space-y-2">
                <li><a href="https://vibecodingmiami.xyz/#about" className="text-gray-700 hover:text-primary">About</a></li>
                <li><a href="https://vibecodingmiami.xyz/#venue" className="text-gray-700 hover:text-primary">Venue</a></li>
                <li><a href="https://vibecodingmiami.xyz/#tickets" className="text-gray-700 hover:text-primary">Tickets</a></li>
                <li><a href="https://vibecodingmiami.xyz/#merchandise" className="text-gray-700 hover:text-primary">Merchandise</a></li>
                <li><a href="https://vibecodingmiami.xyz/#register" className="text-gray-700 hover:text-primary">Register</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-medium text-lg mb-3">Need help finding something?</h3>
            <p className="text-gray-600 mb-4">
              If you can't find what you're looking for, please feel free to contact our support team.
            </p>
            <a href="https://vibecodingmiami.xyz/#register" className="inline-block py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}