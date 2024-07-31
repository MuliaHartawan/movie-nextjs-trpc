import { Snack } from "../schemas/snack.schema";
import { faker } from "@faker-js/faker";
import { snacks } from "../schema";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "../schema";

export const seedSnacks = async (db: NodePgDatabase<typeof schema>) => {
  console.log("Seeding snacks...");
  const dummySnacks: Snack[] = [];

  for (let i = 0; i < 50; i++) {
    const dummySnack: Snack = {
      name: `Snack ${i + 1}`,
      cost: faker.number.int({ min: 10000, max: 50000 }),
      expiryDate: faker.date.soon(),
    };

    dummySnacks.push(dummySnack);
  }

  try {
    await db.insert(snacks).values(dummySnacks).execute();
    console.log("Seeding snacks done!");
  } catch (error) {
    console.log("Seeding snacks failed!", error);
  }
};
