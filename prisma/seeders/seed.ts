import { PrismaClient } from "@prisma/client";
import { userSeeder } from "./user.seeder";
import { roleSeeder } from "./role.seeder";
import { permissionSeeder } from "./permission.seeder";

const prisma = new PrismaClient();

async function main() {
  await roleSeeder();
  await userSeeder();
  await permissionSeeder();
}
main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seeding done!");
  })
  .catch(async (e) => {
    console.error("Seeding failed " + e);
    await prisma.$disconnect();
    process.exit(1);
  });
