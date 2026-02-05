import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { insertWaitlistSchema, insertTicketSchema, insertSponsorshipSchema, insertVolunteerSchema } from "@shared/schema";
import { z } from "zod";

// Determine environment
const isProduction = process.env.NODE_ENV === 'production';
console.log(`Routes initializing in ${isProduction ? 'production' : 'development'} mode`);

// Use STRIPE_SECRET_KEY for both production and development
// This simplifies deployment and configuration
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (isProduction) {
  console.log('Using STRIPE_SECRET_KEY for production');
} else {
  console.log('Using STRIPE_SECRET_KEY for development');
}

if (!stripeSecretKey) {
  console.warn('Missing required environment variable: STRIPE_SECRET_KEY. Stripe payments will not work.');
}

// Initialize Stripe with the API key
const stripe = stripeSecretKey 
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16" as any, // Using the latest stable API version
    })
  : null;

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve sitemap.xml directly from the server
  app.get("/sitemap.xml", (_req, res) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://vibecodingmiami.xyz/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://vibecodingmiami.xyz/sponsorship</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vibecodingmiami.xyz/pricing-details</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://vibecodingmiami.xyz/checkout</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://vibecodingmiami.xyz/merchandise-checkout</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://vibecodingmiami.xyz/sponsor-payment</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://vibecodingmiami.xyz/privacy-policy</loc>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://vibecodingmiami.xyz/terms-of-service</loc>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://vibecodingmiami.xyz/code-of-conduct</loc>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://vibecodingmiami.xyz/sitemap.xml</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  });
  // Get available ticket types
  app.get("/api/tickets", async (_req, res) => {
    try {
      const tickets = await storage.getAllTickets();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ message: "Error fetching tickets" });
    }
  });

  // Register for waitlist
  app.post("/api/register-waitlist", async (req, res) => {
    try {
      const data = insertWaitlistSchema.parse(req.body);
      
      // Check if email already exists
      const existingRegistration = await storage.getWaitlistRegistrationByEmail(data.email);
      if (existingRegistration) {
        return res.status(400).json({ 
          message: "This email is already registered on the waitlist" 
        });
      }
      
      const registration = await storage.createWaitlistRegistration(data);
      res.status(201).json(registration);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.format() });
      }
      res.status(500).json({ message: "Error registering for waitlist" });
    }
  });

  // Register as volunteer
  app.post("/api/register-volunteer", async (req, res) => {
    try {
      const data = insertVolunteerSchema.parse(req.body);
      
      // Check if email already exists
      const existingVolunteer = await storage.getVolunteerByEmail(data.email);
      if (existingVolunteer) {
        return res.status(400).json({ 
          message: "This email has already submitted a volunteer application" 
        });
      }
      
      const volunteer = await storage.createVolunteer(data);
      res.status(201).json(volunteer);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.format() });
      }
      res.status(500).json({ message: "Error submitting volunteer application" });
    }
  });

  // Create Stripe payment intent for ticket purchase
  app.post("/api/create-payment-intent", async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ message: "Stripe is not configured" });
    }
    
    try {
      const schema = z.object({
        ticketType: z.string(),
        amount: z.number(),
        quantity: z.number().min(1).default(1),
        name: z.string(),
        email: z.string().email(),
        policyAcceptedAt: z.string().optional(),
        policyVersion: z.string().optional()
      });
      
      const { ticketType, amount, quantity, name, email, policyAcceptedAt, policyVersion } = schema.parse(req.body);
      
      // Get specific ticket type
      const ticketsByType = await storage.getTicketsByType(ticketType);
      if (!ticketsByType.length) {
        return res.status(404).json({ message: "Ticket type not found" });
      }
      
      const ticket = ticketsByType[0];
      
      // For team tickets, require minimum 4 and validate total amount
      if (ticketType === "team" && quantity < 4) {
        return res.status(400).json({ 
          message: "Developer Pass requires a minimum of 4 attendees"
        });
      }
      
      // Validate amount matches ticket price * quantity
      const expectedAmount = ticket.price * quantity;
      if (expectedAmount !== amount) {
        return res.status(400).json({ 
          message: "Amount does not match expected total",
          expectedAmount
        });
      }
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        metadata: {
          ticketType,
          quantity: quantity.toString(),
          pricePerTicket: (ticket.price / 100).toFixed(2),
          name,
          email,
          noRefundPolicyAccepted: "true",
          policyAcceptedAt: policyAcceptedAt || new Date().toISOString(),
          policyVersion: policyVersion || "2026-02-04-no-refunds",
          policyText: "All sales final. No refunds. Transfers available."
        }
      });
      
      res.json({ 
        clientSecret: paymentIntent.client_secret,
        ticketId: ticket.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.format() });
      }
      
      res.status(500).json({ 
        message: "Error creating payment intent",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Confirm ticket purchase after Stripe payment
  app.post("/api/confirm-purchase", async (req, res) => {
    try {
      const schema = z.object({
        paymentIntentId: z.string(),
        ticketId: z.number()
      });
      
      const { paymentIntentId, ticketId } = schema.parse(req.body);
      
      // Verify payment intent exists and is successful if Stripe is configured
      if (stripe) {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        
        if (paymentIntent.status !== "succeeded") {
          return res.status(400).json({ message: "Payment not successful" });
        }
        
        // Update ticket with purchase information
        const updatedTicket = await storage.updateTicketPayment(
          ticketId,
          paymentIntentId
        );
        
        return res.json(updatedTicket);
      } else {
        // For development without Stripe, just update the ticket
        const updatedTicket = await storage.updateTicketPayment(
          ticketId,
          paymentIntentId
        );
        
        return res.json(updatedTicket);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.format() });
      }
      
      res.status(500).json({ 
        message: "Error confirming purchase",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Get available merchandise
  app.get("/api/merchandise", async (_req, res) => {
    try {
      const merchandise = await storage.getAllMerchandise();
      res.json(merchandise);
    } catch (error) {
      res.status(500).json({ message: "Error fetching merchandise" });
    }
  });

  // Get merchandise by category
  app.get("/api/merchandise/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const merchandise = await storage.getMerchandiseByCategory(category);
      res.json(merchandise);
    } catch (error) {
      res.status(500).json({ message: "Error fetching merchandise by category" });
    }
  });
  
  // Get payment details from Stripe
  app.get("/api/get-payment-details", async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ message: "Stripe is not configured" });
    }
    
    try {
      const { paymentIntentId } = req.query;
      
      if (!paymentIntentId || typeof paymentIntentId !== 'string') {
        return res.status(400).json({ message: "Missing or invalid payment intent ID" });
      }
      
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      // Extract details from metadata
      const metadata = paymentIntent.metadata || {};
      let responseData: Record<string, any> = {};
      
      if (metadata.merchandiseId) {
        // It's a merchandise purchase
        responseData = {
          merchandiseId: parseInt(metadata.merchandiseId),
          name: metadata.name,
          email: metadata.email,
          quantity: metadata.quantity ? parseInt(metadata.quantity) : 1,
          color: metadata.color,
          size: metadata.size
        };
      } else if (metadata.ticketType) {
        // It's a ticket purchase
        const tickets = await storage.getTicketsByType(metadata.ticketType);
        responseData = {
          ticketId: tickets.length > 0 ? tickets[0].id : null,
          name: metadata.name,
          email: metadata.email,
          ticketType: metadata.ticketType
        };
      } else if (metadata.sponsorshipId) {
        // It's a sponsorship purchase
        responseData = {
          sponsorshipId: parseInt(metadata.sponsorshipId),
          companyName: metadata.companyName,
          contactName: metadata.contactName,
          email: metadata.email,
          tier: metadata.tier
        };
      }
      
      res.json(responseData);
    } catch (error) {
      res.status(500).json({ 
        message: "Error retrieving payment details",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Create Stripe payment intent for merchandise purchase
  app.post("/api/create-merchandise-payment", async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ message: "Stripe is not configured" });
    }
    
    try {
      const schema = z.object({
        merchandiseId: z.number(),
        amount: z.number(),
        name: z.string(),
        email: z.string().email(),
        quantity: z.number().optional().default(1),
        color: z.string().optional(),
        size: z.string().optional(),
        policyAcceptedAt: z.string().optional(),
        policyVersion: z.string().optional()
      });
      
      const { merchandiseId, amount, name, email, quantity, color, size, policyAcceptedAt, policyVersion } = schema.parse(req.body);
      
      // Get specific merchandise item
      const item = await storage.getMerchandiseById(merchandiseId);
      if (!item) {
        return res.status(404).json({ message: "Merchandise item not found" });
      }
      
      // Validate amount matches merchandise price * quantity
      const expectedAmount = item.price * (quantity || 1);
      if (expectedAmount !== amount) {
        return res.status(400).json({ 
          message: "Amount does not match merchandise price",
          expectedAmount
        });
      }
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        metadata: {
          merchandiseId: merchandiseId.toString(),
          name,
          email,
          quantity: quantity?.toString() || "1",
          color: color || "",
          size: size || "",
          noRefundPolicyAccepted: "true",
          policyAcceptedAt: policyAcceptedAt || new Date().toISOString(),
          policyVersion: policyVersion || "2026-02-04-no-refunds",
          policyText: "All sales final. No refunds. Transfers available."
        }
      });
      
      res.json({ 
        clientSecret: paymentIntent.client_secret,
        merchandiseId: item.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.format() });
      }
      
      res.status(500).json({ 
        message: "Error creating payment intent",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Confirm merchandise purchase after Stripe payment
  app.post("/api/confirm-merchandise-purchase", async (req, res) => {
    try {
      const schema = z.object({
        paymentIntentId: z.string(),
        merchandiseId: z.number(),
        name: z.string(),
        email: z.string().email()
      });
      
      const { paymentIntentId, merchandiseId, name, email } = schema.parse(req.body);
      
      // Verify payment intent exists and is successful if Stripe is configured
      if (stripe) {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        
        if (paymentIntent.status !== "succeeded") {
          return res.status(400).json({ message: "Payment not successful" });
        }
        
        // Update merchandise with purchase information
        const updatedItem = await storage.updateMerchandisePayment(
          merchandiseId,
          paymentIntentId,
          { name, email }
        );
        
        return res.json(updatedItem);
      } else {
        // For development without Stripe, just update the merchandise
        const updatedItem = await storage.updateMerchandisePayment(
          merchandiseId,
          paymentIntentId,
          { name, email }
        );
        
        return res.json(updatedItem);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.format() });
      }
      
      res.status(500).json({ 
        message: "Error confirming purchase",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Create a sponsorship
  app.post("/api/create-sponsorship", async (req, res) => {
    try {
      const data = insertSponsorshipSchema.parse(req.body);
      const sponsorship = await storage.createSponsorship(data);
      res.status(201).json(sponsorship);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.format() });
      }
      res.status(500).json({ message: "Error creating sponsorship" });
    }
  });

  // Get all sponsorships
  app.get("/api/sponsorships", async (_req, res) => {
    try {
      const sponsorships = await storage.getAllSponsorships();
      res.json(sponsorships);
    } catch (error) {
      res.status(500).json({ message: "Error fetching sponsorships" });
    }
  });

  // Get sponsorships by tier
  app.get("/api/sponsorships/tier/:tier", async (req, res) => {
    try {
      const { tier } = req.params;
      const sponsorships = await storage.getSponsorshipsByTier(tier);
      res.json(sponsorships);
    } catch (error) {
      res.status(500).json({ message: "Error fetching sponsorships by tier" });
    }
  });

  // Create Stripe payment intent for sponsorship
  app.post("/api/create-sponsorship-payment", async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ message: "Stripe is not configured" });
    }
    
    try {
      const schema = z.object({
        tier: z.string(),
        price: z.number(),
        companyName: z.string(),
        contactName: z.string(),
        email: z.string().email(),
        phone: z.string(),
        website: z.string().optional(),
        additionalInfo: z.string().optional(),
        policyAcceptedAt: z.string().optional(),
        policyVersion: z.string().optional()
      });
      
      const data = schema.parse(req.body);
      
      // Create sponsorship in database first
      const sponsorship = await storage.createSponsorship({
        ...data,
        status: "pending",
        stripePaymentId: null
      });
      
      // Then create payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: data.price,
        currency: "usd",
        metadata: {
          sponsorshipId: sponsorship.id.toString(),
          tier: data.tier,
          companyName: data.companyName,
          contactName: data.contactName,
          email: data.email,
          noRefundPolicyAccepted: "true",
          policyAcceptedAt: data.policyAcceptedAt || new Date().toISOString(),
          policyVersion: data.policyVersion || "2026-02-04-no-refunds",
          policyText: "All sales final. No refunds. Transfers available."
        }
      });
      
      res.json({ 
        clientSecret: paymentIntent.client_secret,
        sponsorshipId: sponsorship.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.format() });
      }
      
      res.status(500).json({ 
        message: "Error creating sponsorship payment intent",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Confirm sponsorship payment after Stripe payment
  app.post("/api/confirm-sponsorship-payment", async (req, res) => {
    try {
      const schema = z.object({
        paymentIntentId: z.string(),
        sponsorshipId: z.number()
      });
      
      const { paymentIntentId, sponsorshipId } = schema.parse(req.body);
      
      // Verify payment intent exists and is successful if Stripe is configured
      if (stripe) {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        
        if (paymentIntent.status !== "succeeded") {
          return res.status(400).json({ message: "Payment not successful" });
        }
        
        // Update sponsorship status
        const updatedSponsorship = await storage.updateSponsorshipPayment(
          sponsorshipId,
          paymentIntentId
        );
        
        return res.json(updatedSponsorship);
      } else {
        // For development without Stripe, just update the sponsorship
        const updatedSponsorship = await storage.updateSponsorshipPayment(
          sponsorshipId,
          paymentIntentId
        );
        
        return res.json(updatedSponsorship);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.format() });
      }
      
      res.status(500).json({ 
        message: "Error confirming sponsorship payment",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
