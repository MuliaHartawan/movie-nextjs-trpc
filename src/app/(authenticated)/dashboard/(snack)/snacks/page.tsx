"use server";
import type { ReactElement } from "react";
import { DashboardSnacksModule } from "../_modules";
import { getSnacks } from "@/server/snack/actions/snack.action";

const DashboardSnacks = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}): Promise<ReactElement> => {
  const data = await getSnacks({
    page: Number(searchParams?.page || 1),
    perPage: Number(searchParams?.perPage || 10),
    search: String(searchParams?.search || ""),
  });

  return <DashboardSnacksModule data={data} />;
};

export default DashboardSnacks;
