"use server";
import type { ReactElement } from "react";
import { PageProps } from "@/types/app";
import { getUsersAction } from "@/server/user/actions/user.action";
import { DashboardUsersModule } from "./_components";

const DashboardUsers = async (props: PageProps): Promise<ReactElement> => {
  const data = await getUsersAction({
    page: Number(props.searchParams?.page || 1),
    perPage: Number(props.searchParams?.perPage || 10),
    search: String(props.searchParams?.search || ""),
  });
  return <DashboardUsersModule data={data} />;
};

export default DashboardUsers;
