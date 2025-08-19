import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import ws from "ws";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Function to create Prisma client with Neon adapter
function createPrismaClient() {
	if (!process.env.DATABASE_URL) {
		throw new Error("DATABASE_URL environment variable is not set");
	}

	// Sets up WebSocket connections, which enables Neon to use WebSocket communication.
	neonConfig.webSocketConstructor = ws;

	// Instantiates the Prisma adapter using the Neon connection pool to handle the connection between Prisma and Neon.
	const adapter = new PrismaNeon(
		new Pool({ connectionString: process.env.DATABASE_URL }) as any
	);

	return new PrismaClient().$extends({
		result: {
			product: {
				price: {
					compute(product) {
						return product.price.toString();
					},
				},
				rating: {
					compute(product) {
						return product.rating.toString();
					},
				},
			},
		},
	});
}

// Extends the PrismaClient with a custom result transformer to convert the price and rating fields to strings.
export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
