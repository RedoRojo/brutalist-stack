import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prismaInstance: PrismaClient;

if (typeof window === "undefined") {
  let connectionString = process.env.DATABASE_URL;

  if (connectionString) {
    const isLocal =
      connectionString.includes("localhost") || connectionString.includes("127.0.0.1");

    // Prevent pg-connection-string v3 security warning by explicitly enabling libpq compatibility
    if (
      !isLocal &&
      /sslmode=(prefer|require|verify-ca)/.test(connectionString) &&
      !connectionString.includes("uselibpqcompat=")
    ) {
      const separator = connectionString.includes("?") ? "&" : "?";
      connectionString = `${connectionString}${separator}uselibpqcompat=true`;
    }

    // Create a pg connection pool.
    const pool = new Pool({
      connectionString,
      ssl: isLocal ? undefined : { rejectUnauthorized: false },
    });
    
    const adapter = new PrismaPg(pool);

    if (process.env.NODE_ENV === "production") {
      prismaInstance = new PrismaClient({ adapter });
    } else {
      if (!globalForPrisma.prisma) {
        globalForPrisma.prisma = new PrismaClient({ adapter });
      }
      prismaInstance = globalForPrisma.prisma;
    }
  } else {
    // Fallback proxy to prevent build-time crashes if DATABASE_URL is not set yet.
    // Will throw a descriptive error only when a database query is actually executed.
    const throwDbMissing = () => {
      throw new Error(
        "DATABASE_URL is missing. Please configure your PostgreSQL connection string in environment variables."
      );
    };
    prismaInstance = new Proxy({} as PrismaClient, {
      get() {
        return new Proxy(throwDbMissing, {
          get() {
            return throwDbMissing;
          },
        });
      },
    });
  }
} else {
  // Prevent issues on client-side imports
  prismaInstance = null as unknown as PrismaClient;
}

export const prisma = prismaInstance;
export default prisma;
