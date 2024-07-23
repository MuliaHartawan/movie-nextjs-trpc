"use server";
import type { ReactElement } from "react";
import { DashboardUsersModule } from "../_modules";
import { getUsers } from "../_actions/get-users";

const DashboardUsers = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}): Promise<ReactElement> => {
  const data = await getUsers({
    page: Number(searchParams?.page || 1),
    perPage: Number(searchParams?.perPage || 10),
    search: String(searchParams?.search || ""),
  });
  return <DashboardUsersModule data={data} />;
};

export default DashboardUsers;
