import { seedUsers } from "./seeders/dummy-user.js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.AUTH_DRIZZLE_URL || "";
const pool = postgres(connectionString, { max: 1 });

const db = drizzle(pool);

// Seed the database
const main = async () => {
    try {;
        await seedUsers(db);
    } catch (error) {
        console.log('Seed failed!', error);
    }
}

// Run the main function
main();