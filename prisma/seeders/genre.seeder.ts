import { GENRE_DUMMY } from "@/common/enums/genre-dummy.enum";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function genreSeeder() {
  console.log("Seeding genres...");
  const dummyGenres = [
    {
      name: GENRE_DUMMY.ACTION,
    },
    {
      name: GENRE_DUMMY.COMEDY,
    },
    {
      name: GENRE_DUMMY.DRAMA,
    },
  ];

  await prisma.genre.createMany({
    data: dummyGenres,
  });

  console.log("Genres seeded!");
}
