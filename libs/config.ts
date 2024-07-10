import { v4 as uuidv4 } from "uuid";
import * as dotenv from "dotenv";

dotenv.config();

export const config = {
    randUuidV4: uuidv4(),
    dbUrl: process.env.AUTH_DRIZZLE_URL as string || "",
}