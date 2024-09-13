import prisma from "@/libs/prisma/prisma";
import { Prisma } from "@prisma/client";

type Models = keyof typeof Prisma.ModelName;
type ArgsType<T extends Models> = Prisma.TypeMap["model"][T]["operations"]["findMany"]["args"];
type WhereType<T extends Models> = NonNullable<ArgsType<T>["where"]>;
type SelectType<T extends Models> = ArgsType<T>["select"];
type IncludeType<T extends Models> = "include" extends keyof ArgsType<T>
  ? ArgsType<T>["include"]
  : never;
type ResultType<T extends Models> = Prisma.TypeMap["model"][T]["operations"]["findMany"]["result"];

type PaginateResult<T extends Models, R> = {
  items: R[];
  count: number;
};

export async function paginate<T extends Models, R>({
  select,
  model,
  where,
  orderBy,
  take = 10,
  skip = 0,
  include,
}: {
  model: T;
  where?: WhereType<T>;
  orderBy?: Prisma.Enumerable<any>;
  take?: number;
  skip?: number;
  select?: SelectType<T>;
  include?: IncludeType<T>;
}): Promise<PaginateResult<T, R>> {
  function toCamelCase(str: string) {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  const modelClient = (prisma as any)[toCamelCase(model)]; // Dynamically access the Prisma model

  // Perform the `findMany` query
  const items = await modelClient.findMany({
    select,
    where,
    orderBy,
    take,
    skip,
    ...(include ? { include } : {}),
  });

  // Perform the `count` query
  const count = await modelClient.count({
    where,
  });

  return {
    items,
    count,
  };
}
