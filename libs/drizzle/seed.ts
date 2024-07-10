import { config } from "../config";
import { seedUsers } from "./seeders/dummy-user";
import { db } from "./connection"

// Seed the database
const main = async () => {
    try {
        await seedUsers(db);
        console.log('Seed done!');
    } catch (error) {
        console.log('Seed failed!', error);
    } finally {
        // Stop process
        process.exit(0);
    }
}

// Run the main function
main();