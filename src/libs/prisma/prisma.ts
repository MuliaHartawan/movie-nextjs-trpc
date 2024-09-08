// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { QueryEvent } from "./query-event";

const connectionString = process.env.DATABASE_URL;

const prismaClientSingleton = () => {
  const pool = new Pool({ connectionString, min: 1, max: 20 });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({
    adapter,
    log: [
      {
        emit: "event",
        level: "query",
      },
      {
        emit: "stdout",
        level: "error",
      },
      {
        emit: "stdout",
        level: "info",
      },
      {
        emit: "stdout",
        level: "warn",
      },
    ],
  });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

prisma.$on("query", (e: QueryEvent) => {
  console.log("Query: " + e.query);
  console.log("Params: " + e.params);
  console.log("Duration: " + e.duration + "ms");
});

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
