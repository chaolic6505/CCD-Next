import "@/db/env-config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./db/schemas/*.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.POSTGRES_URL!,
    },
});
