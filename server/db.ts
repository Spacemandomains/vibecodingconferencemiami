import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

const { Pool } = pg;

const isProduction = process.env.NODE_ENV === 'production';
console.log(`Running in ${isProduction ? 'production' : 'development'} mode`);

let databaseUrl = process.env.DATABASE_URL;

if (process.env.PGHOST && process.env.PGUSER && process.env.PGDATABASE) {
  const pgUrl = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD || ''}@${process.env.PGHOST}:${process.env.PGPORT || '5432'}/${process.env.PGDATABASE}`;
  if (!databaseUrl || databaseUrl.includes('neon.tech')) {
    databaseUrl = pgUrl;
    console.log('Using constructed DATABASE_URL from PG environment variables');
  }
}

if (isProduction) {
  console.log('Using DATABASE_URL for production');
} else {
  console.log('Using DATABASE_URL for development');
}

if (!databaseUrl) {
  throw new Error(`Missing required environment variable: DATABASE_URL. Please set it in the Secrets tab.`);
}

let pool: InstanceType<typeof Pool>;
let db: ReturnType<typeof drizzle>;

try {
  const poolConfig: ConstructorParameters<typeof Pool>[0] = {
    connectionString: databaseUrl,
  };
  if (isProduction) {
    poolConfig.ssl = { rejectUnauthorized: false };
  }
  pool = new Pool(poolConfig);
  db = drizzle({ client: pool, schema });
  console.log("Database connection established successfully");
} catch (error) {
  console.error("Failed to connect to database:", error);
  console.error("Please check your database URL environment variable and ensure the database server is running.");
  process.exit(1);
}

export { pool, db };
