import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
export * as schema from './schema';
import dotenv from 'dotenv'
dotenv.config({
  path: '.env.local'
})

const client = postgres(process.env.DATABASE_URL!);
export default drizzle(client, { schema });