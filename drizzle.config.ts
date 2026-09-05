import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL;

const config = {
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  dialect: "mysql" as const,
};

export default defineConfig(
  databaseUrl
    ? {
        ...config,
        dbCredentials: {
          url: databaseUrl,
        },
      }
    : config,
);
