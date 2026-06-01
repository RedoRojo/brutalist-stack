import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prismaInstance: PrismaClient;

if (typeof window === "undefined") {
  const dbPath = path.join(process.cwd(), "dev.db");
  const dbUrl = `file:${dbPath}`;

  if (process.env.NODE_ENV === "production") {
    const adapter = new PrismaBetterSqlite3({ url: dbUrl });
    prismaInstance = new PrismaClient({ adapter });
  } else {
    if (!globalForPrisma.prisma) {
      const adapter = new PrismaBetterSqlite3({ url: dbUrl });
      globalForPrisma.prisma = new PrismaClient({ adapter });
    }
    prismaInstance = globalForPrisma.prisma;
  }
} else {
  // Prevent issues on client-side imports
  prismaInstance = null as unknown as PrismaClient;
}

export const prisma = prismaInstance;
export default prisma;
