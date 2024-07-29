"use server";
import type { ReactElement } from "react";
import { DashboardRolesModule } from "../_modules";
import { getRoles } from "../_actions/get-roles";
import { PageProps } from "@/types/app";

const DashboardRoles = async (props: PageProps): Promise<ReactElement> => {
  const data = await getRoles({
    page: Number(props.searchParams?.page || 1),
    perPage: Number(props.searchParams?.perPage || 10),
    search: String(props.searchParams?.search || ""),
  });

  return <DashboardRolesModule data={data} />;
};

export default DashboardRoles;
