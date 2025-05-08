// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  let prismaClient: PrismaClient | undefined;
}

const getGlobal = globalThis as typeof globalThis & {
  prismaClient?: PrismaClient
};

export const prisma =
  getGlobal.prismaClient ??
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV === 'development') {
  // preserve the client across module reloads
  getGlobal.prismaClient = prisma;
}

export default prisma;
