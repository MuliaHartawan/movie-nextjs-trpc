import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function movieSeeder() {
  console.log("Seeding movies...");
  const dummyMovies = [
    {
      title: "Avengers: Endgame",
      releaseDate: new Date("2019-04-26"),
      duration: 181,
      description: "The Avengers face their most powerful enemy yet, Thanos.",
      rating: 8,
      posterUrl: "https://example.com/avengers-endgame.jpg",
    },
    {
      title: "The Pursuit of Happyness",
      releaseDate: new Date("2006-12-15"),
      duration: 117,
      description:
        "A struggling salesman takes custody of his son as he’s poised to begin a life-changing professional career.",
      rating: 8,
      posterUrl: "https://example.com/the-pursuit-of-happyness.jpg",
    },
    {
      title: "The Hangover",
      releaseDate: new Date("2009-06-05"),
      duration: 100,
      description:
        "Three friends wake up from a bachelor party in Las Vegas with no memory of the previous night and the bachelor missing.",
      rating: 7,
      posterUrl: "https://example.com/the-hangover.jpg",
    },
  ];

  await prisma.movie.createMany({
    data: dummyMovies,
  });

  console.log("Movies seeded!");
}
