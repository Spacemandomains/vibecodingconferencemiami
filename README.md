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