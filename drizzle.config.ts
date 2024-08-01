import { defineConfig } from "drizzle-kit";
import { config } from "./src/libs/config";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/libs/drizzle/schema.ts",
  out: "./src/libs/drizzle/migrations",
  dbCredentials: {
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.name,
    ssl: config.database.ssl,
  },
});
