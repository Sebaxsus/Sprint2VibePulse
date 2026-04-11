import { PrismaClient } from '@prisma/client';

declare global {
  var __vibePulsePrisma: PrismaClient | undefined;
}

const prisma = global.__vibePulsePrisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.__vibePulsePrisma = prisma;
}

export default prisma;
