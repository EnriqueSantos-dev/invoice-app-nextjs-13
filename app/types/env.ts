/* eslint-disable no-unused-vars */
import * as dotenv from "dotenv";
import * as dotenvExpand from "dotenv-expand";
import { z } from "zod";

const envObj = dotenv.config();
dotenvExpand.expand(envObj);

const envSchema = z.object({
	GITHUB_CLIENT_ID: z.string(),
	GITHUB_CLIENT_SECRET: z.string(),
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string(),
	DATABASE_URL: z.string(),
	NEXTAUTH_URL: z.optional(z.string()),
	NEXTAUTH_SECRET: z.string(),
	POSTGRES_DB: z.optional(z.string()),
	POSTGRES_PASSWORD: z.optional(z.string()),
	POSTGRES_PORT: z.optional(z.coerce.number()),
	POSTGRES_HOST: z.optional(z.string()),
	POSTGRES_USER: z.optional(z.string()),
});

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envSchema> {}
	}
}

envSchema.parse(process.env);
