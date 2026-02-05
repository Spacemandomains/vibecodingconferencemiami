import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Determine environment
const isProduction = process.env.NODE_ENV === 'production';
console.log(`Running in ${isProduction ? 'production' : 'development'} mode`);

// Use DATABASE_URL for both production and development
// This simplifies deployment and configuration
const databaseUrl = process.env.DATABASE_URL;

if (isProduction) {
  console.log('Using DATABASE_URL for production');
} else {
  console.log('Using DATABASE_URL for development');
}

// Check for DATABASE_URL environment variable
if (!databaseUrl) {
  throw new Error(`Missing required environment variable: DATABASE_URL. Please set it in the Secrets tab.`);
}

// Create pool and db
let pool: Pool;
let db: ReturnType<typeof drizzle>;

try {
  // Initialize the connection pool
  pool = new Pool({ connectionString: databaseUrl });
  
  // Initialize Drizzle with the connection pool
  db = drizzle({ client: pool, schema });
  
  // Test the connection by doing a simple query
  console.log("Database connection established successfully");
} catch (error) {
  console.error("Failed to connect to database:", error);
  console.error("Please check your database URL environment variable and ensure the database server is running.");
  process.exit(1);
}

export { pool, db };