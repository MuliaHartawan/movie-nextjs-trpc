import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "../config";

const pool = postgres(config.dbUrl, { max: 1 });

export const db = drizzle(pool);
