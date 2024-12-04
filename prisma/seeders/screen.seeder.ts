import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function screeenSeeder() {
  console.log("Seeding screeens...");

  const movie = await prisma.movie.findFirst({ where: { title: "Avengers: Endgame" } });
  const studio = await prisma.studio.findFirst({ where: { name: "Studio 1" } });

  if (!movie || !studio) {
    throw new Error("Missing required movie or studio");
  }

  const dummyScreeens = [
    {
      screeningTime: new Date("2024-12-05T19:00:00"),
      price: 100000,
      studioId: studio.id,
      movieId: movie.id,
    },
  ];

  await prisma.screeningSchedule.createMany({
    data: dummyScreeens,
  });

  console.log("Genres seeded!");
}
