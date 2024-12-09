import { PrismaClient } from "@prisma/client";
import { userSeeder } from "./user.seeder";
import { roleSeeder } from "./role.seeder";
import { permissionSeeder } from "./permission.seeder";
import { rolePermissionSeeder } from "./role-permission.seeder";
import { genreSeeder } from "./genre.seeder";
import { movieSeeder } from "./movie.seeder";
import { movieGenreSeeder } from "./movie-genre.seeder";
import { studioSeeder } from "./studio.seeder";
import { screeenSeeder } from "./screen.seeder";

const prisma = new PrismaClient();

async function main() {
  await roleSeeder();
  await userSeeder();
  await permissionSeeder();
  await rolePermissionSeeder();
  await genreSeeder();
  await movieSeeder();
  await movieGenreSeeder();
  await studioSeeder();
  await screeenSeeder();
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
