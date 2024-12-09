import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function studioSeeder() {
  console.log("Seeding studios...");

  const dummystudios = [
    {
      name: "Studio 1",
      capacity: 150,
      additionalFacilities: "Dolby Surround, Wide Screen",
    },
  ];

  await prisma.studio.createMany({
    data: dummystudios,
  });

  console.log("Studios seeded!");
}
