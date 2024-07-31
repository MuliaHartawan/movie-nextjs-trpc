import { v4 as uuidv4 } from "uuid";
import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  randUuidV4: uuidv4(),
  database: {
    host: (process.env.DB_HOST as string) || "",
    port: +(process.env.DB_PORT as string) || 5432,
    user: (process.env.DB_USER as string) || "",
    password: (process.env.DB_PASSWORD as string) || "",
    name: (process.env.DB_NAME as string) || "",
    ssl: (process.env.DB_SSL as string) === "true" || false,
  },
};
