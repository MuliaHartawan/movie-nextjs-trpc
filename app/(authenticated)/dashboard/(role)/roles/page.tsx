"use server";
import type { ReactElement } from "react";
import { DashboardRolesModule } from "../_modules";
import { getRoles } from "../_actions/get-roles";
import { PageProps } from "@/types/app";
import { Role } from "@/libs/drizzle/schema";
import { TMetaResponse } from "@/types/meta";

const DashboardRoles = async (props: PageProps): Promise<ReactElement> => {
  const data = await getRoles({
    page: Number(props.searchParams?.page || 1),
    perPage: Number(props.searchParams?.perPage || 10),
    search: String(props.searchParams?.search || ""),
  });
  return <DashboardRolesModule data={data as TMetaResponse<Role[]>} />;
};

export default DashboardRoles;
