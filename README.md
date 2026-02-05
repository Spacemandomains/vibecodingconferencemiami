# Vibe Coding Conference

A modern, interactive waitlist platform for the Vibe Coding Conference featuring advanced technological integrations and user engagement tools.

## Features

- Modern React frontend with interactive design
- Stripe payment processing for tickets, merchandise, and sponsorships
- Responsive sponsor and attendee registration workflows
- Dynamic user interaction features
- Enhanced UI/UX with animated elements
- PostgreSQL database integration for data persistence

## Conference Details

- Dates: May 18-22, 2026
- Location: South Beach Miami
- Focus: LLM-powered and AI-first SaaS products

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database
- Stripe account for payment processing

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Database connection
DATABASE_URL=postgres://your_username:your_password@localhost:5432/your_db_name

# Stripe API Keys
STRIPE_SECRET_KEY=sk_test_your_secret_key
VITE_STRIPE_PUBLIC_KEY=pk_test_your_publishable_key
```

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Push the database schema: `npm run db:push`
4. Start the development server: `npm run dev`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run db:push` - Push database schema changes
- `npm run build` - Build the application for production
- `npm run start` - Start the production server

## Technologies Used

- React with TypeScript
- Tailwind CSS for styling
- Shadcn UI components
- Framer Motion for animations
- Stripe for payment processing
- Drizzle ORM for database operations
- Express.js for the backend API
- PostgreSQL for data storage

## Project Structure

- `client/` - Frontend React application
  - `src/components/` - Reusable UI components
  - `src/pages/` - Page components
  - `src/lib/` - Utility functions and hooks
- `server/` - Backend Express application
  - `routes.ts` - API endpoints
  - `storage.ts` - Data storage interface
- `shared/` - Shared code between frontend and backend
  - `schema.ts` - Database schema definitions

## Deployment

The application is configured for easy deployment on Replit. Make sure to set the required environment variables in your deployment environment.

# Vibe Coding Miami — Official Conference Site

This repository contains the official website and ticketing platform for **Vibe Coding Miami**, a 5-day developer conference for the AI era.

📍 South Beach, Miami  
🗓️ May 18–22, 2026  
🎟️ 1,000+ Builders  

---

## 🚀 About The Conference

Vibe Coding Miami is where AI-native developers, indie hackers, and solopreneurs gather to:

- Ship real products
- Learn AI-assisted workflows
- Deploy faster
- Build in public
- Connect with serious builders

This is not a theory conference.

This is a shipping conference.

---

## 🎯 Mission

Empower developers to:

Code.  
Deploy.  
Repeat.

Vibe Coding represents a new way of building — AI-assisted, founder-led, and execution-focused.

---

## 💳 What This Site Does

This platform:

- Sells conference passes
- Processes ticket payments
- Displays speaker announcements
- Hosts schedule and agenda
- Manages sponsor information
- Provides event updates

---

## 🧠 Founder

Vibe Coding Miami was founded by:

Wilfred Lee  
AI Solopreneur & Builder in Public  

Official Portfolio:  
https://wilfredleeai.netlify.app/

---

## 🏗️ Site Architecture

Planned structure:


---

## 💰 Ticket Strategy

Ticket tiers include:

- Early Builder Pass
- Founder Pass
- VIP Access Pass
- Sponsor Packages

All payments processed securely through Stripe.

---

## 🛠 Tech Stack

- Frontend: (React / Next / Static — specify yours)
- Hosting: Netlify
- Payments: Stripe
- Analytics: (optional)
- Email: (optional — ConvertKit, Resend, etc.)

---

## 📈 Long-Term Vision

Vibe Coding Miami is more than a conference.

It is a movement toward:

- AI-native development
- Solopreneur empowerment
- Faster product cycles
- Ownership-first building

This event is designed to grow annually and expand into additional cities.

---

## 🔗 Official Links

Website: https://vibecodingmiami.xyz/  
Founder: https://wilfredleeai.netlify.app/  
LinkedIn: https://www.linkedin.com/in/wilfredleejr/  
X: https://x.com/FounderWilfred  

---

## 📣 Sponsors & Partners

Interested in sponsoring?

Contact via the official site or LinkedIn.

---

© 2026 Vibe Coding Miami
