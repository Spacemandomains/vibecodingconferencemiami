import { pgTable, text, serial, integer, boolean, timestamp, varchar, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session table for express-session with connect-pg-simple
// This table will be automatically created by connect-pg-simple
// We define it here for documentation purposes
export const sessions = pgTable("session", {
  sid: varchar("sid").primaryKey(),
  sess: json("sess").notNull(),
  expire: timestamp("expire").notNull(),
});

export const waitlistRegistrations = pgTable("waitlist_registrations", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  jobTitle: text("job_title"),
  interestAreas: text("interest_areas").array(),
  subscribe: boolean("subscribe").default(true),
  createdAt: timestamp("created_at").defaultNow()
});

export const tickets = pgTable("tickets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  description: text("description").notNull(),
  features: text("features").array(),
  type: text("type").notNull(),
  stripePaymentId: text("stripe_payment_id"),
  purchaserName: text("purchaser_name"),
  purchaserEmail: text("purchaser_email"),
  purchasedAt: timestamp("purchased_at")
});

export const merchandise = pgTable("merchandise", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // 'tshirt', 'hat', etc.
  imageUrl: text("image_url"),
  sizes: text("sizes").array(),
  colors: text("colors").array(),
  stripePaymentId: text("stripe_payment_id"),
  purchaserName: text("purchaser_name"),
  purchaserEmail: text("purchaser_email"),
  quantity: integer("quantity").default(1),
  purchasedAt: timestamp("purchased_at")
});

export const insertWaitlistSchema = createInsertSchema(waitlistRegistrations).pick({
  fullName: true,
  email: true,
  jobTitle: true,
  interestAreas: true,
  subscribe: true
});

export const insertTicketSchema = createInsertSchema(tickets).pick({
  name: true,
  price: true,
  description: true,
  features: true,
  type: true,
  stripePaymentId: true,
  purchaserName: true,
  purchaserEmail: true
});

export type InsertWaitlistRegistration = z.infer<typeof insertWaitlistSchema>;
export type WaitlistRegistration = typeof waitlistRegistrations.$inferSelect;

export type InsertTicket = z.infer<typeof insertTicketSchema>;
export type Ticket = typeof tickets.$inferSelect;

export const insertMerchandiseSchema = createInsertSchema(merchandise).pick({
  name: true,
  price: true,
  description: true,
  category: true,
  imageUrl: true,
  sizes: true,
  colors: true,
  quantity: true,
  stripePaymentId: true,
  purchaserName: true,
  purchaserEmail: true
});

export type InsertMerchandise = z.infer<typeof insertMerchandiseSchema>;
export type Merchandise = typeof merchandise.$inferSelect;

export const sponsorships = pgTable("sponsorships", {
  id: serial("id").primaryKey(),
  tier: text("tier").notNull(), // platinum, gold, silver, etc.
  price: integer("price").notNull(),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  website: text("website"),
  additionalInfo: text("additional_info"),
  stripePaymentId: text("stripe_payment_id"),
  status: text("status").default("pending"), // pending, paid, cancelled
  createdAt: timestamp("created_at").defaultNow(),
  paidAt: timestamp("paid_at")
});

export const insertSponsorshipSchema = createInsertSchema(sponsorships).pick({
  tier: true,
  price: true,
  companyName: true,
  contactName: true,
  email: true,
  phone: true,
  website: true,
  additionalInfo: true,
  stripePaymentId: true,
  status: true
});

export type InsertSponsorship = z.infer<typeof insertSponsorshipSchema>;
export type Sponsorship = typeof sponsorships.$inferSelect;

export const volunteers = pgTable("volunteers", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  availability: text("availability").notNull(),
  experience: text("experience"),
  whyVolunteer: text("why_volunteer").notNull(),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow()
});

export const insertVolunteerSchema = createInsertSchema(volunteers).pick({
  fullName: true,
  email: true,
  phone: true,
  availability: true,
  experience: true,
  whyVolunteer: true
});

export type InsertVolunteer = z.infer<typeof insertVolunteerSchema>;
export type Volunteer = typeof volunteers.$inferSelect;
