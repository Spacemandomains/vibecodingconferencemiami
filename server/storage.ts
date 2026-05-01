import { 
  waitlistRegistrations, 
  tickets,
  merchandise,
  sponsorships,
  volunteers,
  type WaitlistRegistration, 
  type InsertWaitlistRegistration,
  type Ticket,
  type InsertTicket,
  type Merchandise,
  type InsertMerchandise,
  type Sponsorship,
  type InsertSponsorship,
  type Volunteer,
  type InsertVolunteer
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createWaitlistRegistration(registration: InsertWaitlistRegistration): Promise<WaitlistRegistration>;
  getAllWaitlistRegistrations(): Promise<WaitlistRegistration[]>;
  getWaitlistRegistrationByEmail(email: string): Promise<WaitlistRegistration | undefined>;
  
  createTicket(ticket: InsertTicket): Promise<Ticket>;
  getTicketById(id: number): Promise<Ticket | undefined>;
  updateTicketPayment(id: number, stripePaymentId: string): Promise<Ticket>;
  getAllTickets(): Promise<Ticket[]>;
  getTicketsByType(type: string): Promise<Ticket[]>;
  
  createMerchandise(item: InsertMerchandise): Promise<Merchandise>;
  getMerchandiseById(id: number): Promise<Merchandise | undefined>;
  updateMerchandisePayment(id: number, stripePaymentId: string, purchaserInfo: { name: string, email: string }): Promise<Merchandise>;
  getAllMerchandise(): Promise<Merchandise[]>;
  getMerchandiseByCategory(category: string): Promise<Merchandise[]>;
  
  createSponsorship(sponsorship: InsertSponsorship): Promise<Sponsorship>;
  getSponsorshipById(id: number): Promise<Sponsorship | undefined>;
  updateSponsorshipPayment(id: number, stripePaymentId: string): Promise<Sponsorship>;
  getAllSponsorships(): Promise<Sponsorship[]>;
  getSponsorshipsByTier(tier: string): Promise<Sponsorship[]>;
  
  createVolunteer(volunteer: InsertVolunteer): Promise<Volunteer>;
  getAllVolunteers(): Promise<Volunteer[]>;
  getVolunteerByEmail(email: string): Promise<Volunteer | undefined>;
}

// For reference only - we'll be using DatabaseStorage
export class MemStorage {
  private waitlistRegistrations: Map<number, WaitlistRegistration>;
  private tickets: Map<number, Ticket>;
  private merchandise: Map<number, Merchandise>;
  private waitlistCurrentId: number;
  private ticketsCurrentId: number;
  private merchandiseCurrentId: number;

  constructor() {
    this.waitlistRegistrations = new Map();
    this.tickets = new Map();
    this.merchandise = new Map();
    this.waitlistCurrentId = 1;
    this.ticketsCurrentId = 1;
    this.merchandiseCurrentId = 1;
    
    // Initialize with ticket types and merchandise
    this.initializeTickets();
    this.initializeMerchandise();
  }

  private initializeTickets() {
    const developerTicket: InsertTicket = {
      name: "Founding Builder Pass",
      price: 79900, // $799.00 in cents
      description: "Full conference access",
      features: ["All talks and workshops", "Conference swag box", "Lunch and refreshments", "Opening night party"],
      type: "developer"
    };
    
    const vipTicket: InsertTicket = {
      name: "VIP Pass",
      price: 129900, // $1,299.00 in cents
      description: "Premium experience",
      features: ["All Founding Builder Pass benefits", "VIP lounge access", "Exclusive speaker dinner", "Houston VIP dinner cruise", "Premium swag box"],
      type: "vip"
    };
    
    const teamTicket: InsertTicket = {
      name: "Developer Pass",
      price: 59900, // $599.00 in cents
      description: "Group discount (4+ people)",
      features: ["All Founding Builder Pass benefits", "Private team meeting room (2 hours)", "Team photo opportunity", "Group activities discount"],
      type: "team"
    };
    
    this.createTicket(developerTicket);
    this.createTicket(vipTicket);
    this.createTicket(teamTicket);
  }

  async createWaitlistRegistration(registration: InsertWaitlistRegistration): Promise<WaitlistRegistration> {
    const id = this.waitlistCurrentId++;
    const timestamp = new Date();
    
    const newRegistration: WaitlistRegistration = { 
      ...registration, 
      id,
      createdAt: timestamp,
      fullName: registration.fullName,
      email: registration.email,
      jobTitle: registration.jobTitle || null,
      interestAreas: registration.interestAreas || null,
      subscribe: registration.subscribe ?? null
    };
    
    this.waitlistRegistrations.set(id, newRegistration);
    return newRegistration;
  }

  async getAllWaitlistRegistrations(): Promise<WaitlistRegistration[]> {
    return Array.from(this.waitlistRegistrations.values());
  }

  async getWaitlistRegistrationByEmail(email: string): Promise<WaitlistRegistration | undefined> {
    return Array.from(this.waitlistRegistrations.values()).find(
      (registration) => registration.email === email
    );
  }

  async createTicket(ticket: InsertTicket): Promise<Ticket> {
    const id = this.ticketsCurrentId++;
    const newTicket: Ticket = { 
      ...ticket, 
      id,
      stripePaymentId: null,
      purchaserName: null,
      purchaserEmail: null,
      purchasedAt: null,
      features: ticket.features || null
    };
    this.tickets.set(id, newTicket);
    return newTicket;
  }

  async getTicketById(id: number): Promise<Ticket | undefined> {
    return this.tickets.get(id);
  }

  async updateTicketPayment(id: number, stripePaymentId: string): Promise<Ticket> {
    const ticket = this.tickets.get(id);
    if (!ticket) {
      throw new Error(`Ticket with id ${id} not found`);
    }
    
    const updatedTicket: Ticket = { 
      ...ticket, 
      stripePaymentId,
      purchasedAt: new Date()
    };
    
    this.tickets.set(id, updatedTicket);
    return updatedTicket;
  }

  async getAllTickets(): Promise<Ticket[]> {
    return Array.from(this.tickets.values());
  }

  async getTicketsByType(type: string): Promise<Ticket[]> {
    return Array.from(this.tickets.values()).filter(
      (ticket) => ticket.type === type
    );
  }
  
  private initializeMerchandise() {
    const tshirt: InsertMerchandise = {
      name: "Vibe Conference T-Shirt",
      price: 2999, // $29.99 in cents
      description: "Premium quality cotton t-shirt with the official Vibe Conference logo",
      category: "tshirt",
      imageUrl: "/assets/tshirt.svg",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "White", "Navy"],
      quantity: 1
    };
    
    const hat: InsertMerchandise = {
      name: "Vibe Conference Cap",
      price: 2499, // $24.99 in cents
      description: "Stylish adjustable cap with embroidered Vibe Conference logo",
      category: "hat",
      imageUrl: "/assets/cap.svg",
      sizes: ["One Size"],
      colors: ["Black", "White", "Gray"],
      quantity: 1
    };
    
    this.createMerchandise(tshirt);
    this.createMerchandise(hat);
  }
  
  async createMerchandise(item: InsertMerchandise): Promise<Merchandise> {
    const id = this.merchandiseCurrentId++;
    const newItem: Merchandise = {
      ...item,
      id,
      stripePaymentId: null,
      purchaserName: null,
      purchaserEmail: null,
      purchasedAt: null,
      imageUrl: item.imageUrl || null,
      sizes: item.sizes || null,
      colors: item.colors || null,
      quantity: item.quantity || 1
    };
    this.merchandise.set(id, newItem);
    return newItem;
  }
  
  async getMerchandiseById(id: number): Promise<Merchandise | undefined> {
    return this.merchandise.get(id);
  }
  
  async updateMerchandisePayment(id: number, stripePaymentId: string, purchaserInfo: { name: string, email: string }): Promise<Merchandise> {
    const item = this.merchandise.get(id);
    if (!item) {
      throw new Error(`Merchandise with id ${id} not found`);
    }
    
    const updatedItem: Merchandise = {
      ...item,
      stripePaymentId,
      purchaserName: purchaserInfo.name,
      purchaserEmail: purchaserInfo.email,
      purchasedAt: new Date()
    };
    
    this.merchandise.set(id, updatedItem);
    return updatedItem;
  }
  
  async getAllMerchandise(): Promise<Merchandise[]> {
    return Array.from(this.merchandise.values());
  }
  
  async getMerchandiseByCategory(category: string): Promise<Merchandise[]> {
    return Array.from(this.merchandise.values()).filter(
      (item) => item.category === category
    );
  }
}

export class DatabaseStorage implements IStorage {
  async createWaitlistRegistration(registration: InsertWaitlistRegistration): Promise<WaitlistRegistration> {
    const [result] = await db
      .insert(waitlistRegistrations)
      .values(registration)
      .returning();
    return result;
  }

  async getAllWaitlistRegistrations(): Promise<WaitlistRegistration[]> {
    return db.select().from(waitlistRegistrations);
  }

  async getWaitlistRegistrationByEmail(email: string): Promise<WaitlistRegistration | undefined> {
    const [result] = await db
      .select()
      .from(waitlistRegistrations)
      .where(eq(waitlistRegistrations.email, email));
    return result;
  }

  async createTicket(ticket: InsertTicket): Promise<Ticket> {
    const [result] = await db
      .insert(tickets)
      .values(ticket)
      .returning();
    return result;
  }

  async getTicketById(id: number): Promise<Ticket | undefined> {
    const [result] = await db
      .select()
      .from(tickets)
      .where(eq(tickets.id, id));
    return result;
  }

  async updateTicketPayment(id: number, stripePaymentId: string): Promise<Ticket> {
    const [result] = await db
      .update(tickets)
      .set({ 
        stripePaymentId, 
        purchasedAt: new Date() 
      })
      .where(eq(tickets.id, id))
      .returning();
    
    if (!result) {
      throw new Error(`Ticket with id ${id} not found`);
    }
    
    return result;
  }

  async getAllTickets(): Promise<Ticket[]> {
    return db.select().from(tickets);
  }

  async getTicketsByType(type: string): Promise<Ticket[]> {
    return db
      .select()
      .from(tickets)
      .where(eq(tickets.type, type));
  }

  async createMerchandise(item: InsertMerchandise): Promise<Merchandise> {
    const [result] = await db
      .insert(merchandise)
      .values(item)
      .returning();
    return result;
  }

  async getMerchandiseById(id: number): Promise<Merchandise | undefined> {
    const [result] = await db
      .select()
      .from(merchandise)
      .where(eq(merchandise.id, id));
    return result;
  }

  async updateMerchandisePayment(id: number, stripePaymentId: string, purchaserInfo: { name: string, email: string }): Promise<Merchandise> {
    const [result] = await db
      .update(merchandise)
      .set({ 
        stripePaymentId, 
        purchaserName: purchaserInfo.name,
        purchaserEmail: purchaserInfo.email,
        purchasedAt: new Date() 
      })
      .where(eq(merchandise.id, id))
      .returning();
    
    if (!result) {
      throw new Error(`Merchandise with id ${id} not found`);
    }
    
    return result;
  }

  async getAllMerchandise(): Promise<Merchandise[]> {
    return db.select().from(merchandise);
  }

  async getMerchandiseByCategory(category: string): Promise<Merchandise[]> {
    return db
      .select()
      .from(merchandise)
      .where(eq(merchandise.category, category));
  }
  
  async createSponsorship(sponsorship: InsertSponsorship): Promise<Sponsorship> {
    const [result] = await db
      .insert(sponsorships)
      .values(sponsorship)
      .returning();
    return result;
  }
  
  async getSponsorshipById(id: number): Promise<Sponsorship | undefined> {
    const [result] = await db
      .select()
      .from(sponsorships)
      .where(eq(sponsorships.id, id));
    return result;
  }
  
  async updateSponsorshipPayment(id: number, stripePaymentId: string): Promise<Sponsorship> {
    const [result] = await db
      .update(sponsorships)
      .set({ 
        stripePaymentId, 
        status: "paid",
        paidAt: new Date() 
      })
      .where(eq(sponsorships.id, id))
      .returning();
    
    if (!result) {
      throw new Error(`Sponsorship with id ${id} not found`);
    }
    
    return result;
  }
  
  async getAllSponsorships(): Promise<Sponsorship[]> {
    return db.select().from(sponsorships);
  }
  
  async getSponsorshipsByTier(tier: string): Promise<Sponsorship[]> {
    return db
      .select()
      .from(sponsorships)
      .where(eq(sponsorships.tier, tier));
  }
  
  async createVolunteer(volunteer: InsertVolunteer): Promise<Volunteer> {
    const [result] = await db
      .insert(volunteers)
      .values(volunteer)
      .returning();
    return result;
  }
  
  async getAllVolunteers(): Promise<Volunteer[]> {
    return db.select().from(volunteers);
  }
  
  async getVolunteerByEmail(email: string): Promise<Volunteer | undefined> {
    const [result] = await db
      .select()
      .from(volunteers)
      .where(eq(volunteers.email, email));
    return result;
  }
}

// Initialize the database with default ticket and merchandise data
async function initializeDatabase() {
  // Check if we already have tickets
  const existingTickets = await db.select().from(tickets);
  if (existingTickets.length === 0) {
    // Add default tickets
    await db.insert(tickets).values([
      {
        name: "Founding Builder Pass",
        price: 79900, // $799.00 in cents
        description: "Full conference access",
        features: ["All talks and workshops", "Conference swag box", "Lunch and refreshments", "Opening night party"],
        type: "developer"
      },
      {
        name: "VIP Pass",
        price: 129900, // $1,299.00 in cents
        description: "Premium experience",
        features: ["All Founding Builder Pass benefits", "VIP lounge access", "Exclusive speaker dinner", "Houston VIP dinner cruise", "Premium swag box"],
        type: "vip"
      },
      {
        name: "Developer Pass",
        price: 59900, // $599.00 in cents
        description: "Group discount (4+ people)",
        features: ["All Founding Builder Pass benefits", "Private team meeting room (2 hours)", "Team photo opportunity", "Group activities discount"],
        type: "team"
      }
    ]);
  }

  // Check if we already have merchandise
  const existingMerchandise = await db.select().from(merchandise);
  if (existingMerchandise.length === 0) {
    // Add default merchandise
    await db.insert(merchandise).values([
      {
        name: "Vibe Conference T-Shirt",
        price: 2999, // $29.99 in cents
        description: "Premium quality cotton t-shirt with the official Vibe Conference logo",
        category: "tshirt",
        imageUrl: "/assets/tshirt.svg",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "White", "Navy"],
        quantity: 1
      },
      {
        name: "Vibe Conference Cap",
        price: 2499, // $24.99 in cents
        description: "Stylish adjustable cap with embroidered Vibe Conference logo",
        category: "hat",
        imageUrl: "/assets/cap.svg",
        sizes: ["One Size"],
        colors: ["Black", "White", "Gray"],
        quantity: 1
      }
    ]);
  }
}

// Initialize the database and export storage
initializeDatabase().catch(console.error);
export const storage = new DatabaseStorage();
