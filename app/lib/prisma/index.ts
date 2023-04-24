import { PrismaClient } from "@prisma/client";
declare global {
	// eslint-disable-next-line no-unused-vars
	var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (typeof window === "undefined") {
	if (process.env.NODE_ENV === "production") {
		prisma = new PrismaClient();
	} else {
		if (!global.prisma) {
			global.prisma = new PrismaClient();
		}

		prisma = global.prisma;
	}
}
//@ts-ignore
export { prisma };
