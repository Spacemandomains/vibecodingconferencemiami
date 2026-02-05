# Vibe Coding Conference

## Overview

The Vibe Coding Conference is a modern, interactive waitlist and registration platform for a tech conference scheduled for May 18-22, 2026, in South Beach Miami. The platform features a comprehensive registration system for attendees, sponsors, and merchandise purchases, built with React and Express.js. The application focuses on LLM-powered and AI-first SaaS products, providing a full-featured conference management system with payment processing, waitlist management, and sponsor coordination.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with multiple pages including home, checkout, sponsorship, and legal pages
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent design
- **Styling**: Tailwind CSS with custom theme configuration and animations using Framer Motion
- **State Management**: TanStack React Query for server state management and form handling with React Hook Form
- **Payment Integration**: Stripe Elements for secure payment processing on the client side

### Backend Architecture
- **Framework**: Express.js with TypeScript for the server-side API
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Management**: Express sessions with PostgreSQL storage using connect-pg-simple
- **Database Schema**: Separate tables for waitlist registrations, tickets, merchandise, sponsorships, and sessions
- **API Design**: RESTful endpoints for registration, payment processing, and data retrieval

### Database Design
- **Waitlist Registrations**: Stores user information, interest areas, and subscription preferences
- **Tickets**: Manages different ticket types (developer, VIP, team) with pricing and features
- **Merchandise**: Handles conference merchandise with categories, sizing, and inventory
- **Sponsorships**: Tracks sponsorship tiers and company information
- **Sessions**: Manages user sessions with PostgreSQL backend storage

### Authentication & Security
- **Session-based Authentication**: Uses express-session with PostgreSQL storage for user session management
- **Environment Configuration**: Separate environment variable handling for development and production
- **Data Validation**: Zod schemas for both client and server-side validation
- **Payment Security**: Stripe integration with proper webhook handling for secure transactions

## External Dependencies

### Payment Processing
- **Stripe**: Complete payment processing solution for tickets, merchandise, and sponsorships
- **Environment Variables**: `STRIPE_SECRET_KEY` and `VITE_STRIPE_PUBLIC_KEY` for API integration
- **Payment Elements**: Stripe Elements for secure card input and payment handling

### Database Services
- **PostgreSQL**: Primary database using Neon serverless PostgreSQL
- **Connection**: `DATABASE_URL` environment variable for database connectivity
- **ORM**: Drizzle ORM with migration support for database schema management

### Third-party Integrations
- **BumpSale**: External widget integration for merchandise sales
- **Social Sharing**: Built-in social media sharing functionality for Twitter, LinkedIn, and Facebook
- **Email Services**: Integrated contact forms and newsletter subscription handling

### Development Tools
- **Vite**: Build tool with TypeScript support and hot module replacement
- **Drizzle Kit**: Database migration and schema management tools
- **ESBuild**: Production bundling for the server-side application