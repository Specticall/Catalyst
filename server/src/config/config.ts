import { PrismaClient } from "@prisma/client";

/**
 * Prisma client instance
 */
export const prisma = new PrismaClient();
export const JWT_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 Hours
