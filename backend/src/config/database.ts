import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { env } from './env';

// Créer un pool de connexions PostgreSQL
const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

// Créer l'adaptateur Prisma pour PostgreSQL
const adapter = new PrismaPg(pool);

// Instance singleton de Prisma Client avec adaptateur
const prisma = new PrismaClient({
  adapter,
  log: ['error', 'warn'],
});

export default prisma;
