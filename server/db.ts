// server/db.ts
import { PrismaClient } from '@prisma/client'

// Initialize the Prisma Client
const prisma = new PrismaClient()

export { prisma }
