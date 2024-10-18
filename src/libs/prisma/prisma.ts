// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

import { pagination } from "prisma-extension-pagination";
import { QueryEvent } from "./query-event";
import { PrismaClient } from "@prisma/client";
import { createSoftDeleteExtension } from "prisma-extension-soft-delete";

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: [
      {
        emit: "event",
        level: "query",
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

export default prisma
  .$extends(
    pagination({
      pages: {
        includePageCount: true,
      },
    }),
  )
  .$extends(
    createSoftDeleteExtension({
      models: {
        User: true,
      },
      defaultConfig: {
        field: "deletedAt",
        createValue: (deleted) => {
          console.log("deleted", deleted);
          if (deleted) return new Date();
          return null;
        },
      },
    }),
  );

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
