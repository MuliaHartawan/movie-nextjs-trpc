import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function movieGenreSeeder() {
  const avengersMovie = await prisma.movie.findFirst({ where: { title: "Avengers: Endgame" } });
  const pursuitMovie = await prisma.movie.findFirst({
    where: { title: "The Pursuit of Happyness" },
  });
  const hangoverMovie = await prisma.movie.findFirst({ where: { title: "The Hangover" } });

  const actionGenre = await prisma.genre.findFirst({ where: { name: "Action" } });
  const dramaGenre = await prisma.genre.findFirst({ where: { name: "Drama" } });
  const comedyGenre = await prisma.genre.findFirst({ where: { name: "Comedy" } });

  if (
    !avengersMovie ||
    !pursuitMovie ||
    !hangoverMovie ||
    !actionGenre ||
    !dramaGenre ||
    !comedyGenre
  ) {
    throw new Error("Missing required movie or genre");
  }

  console.log("Seeding movie genres...");
  const dummyMovieGenres = [
    {
      movieId: avengersMovie.id,
      genreId: actionGenre.id,
    },
    {
      movieId: avengersMovie.id,
      genreId: dramaGenre.id,
    },
    {
      movieId: pursuitMovie.id,
      genreId: dramaGenre.id,
    },
    {
      movieId: hangoverMovie.id,
      genreId: comedyGenre.id,
    },
  ];

  await prisma.movieGenres.createMany({
    data: dummyMovieGenres,
  });

  console.log("Movie genres seeded!");
}
