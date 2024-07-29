"use server";
import type { ReactElement } from "react";
import { DashboardUsersModule } from "../_modules";
import { getUsers } from "../_actions/get-users";
import { PageProps } from "@/types/app";

const DashboardUsers = async (props: PageProps): Promise<ReactElement> => {
  const data = await getUsers({
    page: Number(props.searchParams?.page || 1),
    perPage: Number(props.searchParams?.perPage || 10),
    search: String(props.searchParams?.search || ""),
  });
  return <DashboardUsersModule data={data} />;
};

export default DashboardUsers;
