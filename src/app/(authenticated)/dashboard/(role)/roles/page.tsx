"use server";
import type { ReactElement } from "react";
import { PageProps } from "@/types/app";
import { Role } from "@/libs/drizzle/schema";
import { TMetaResponse } from "@/types/meta";
import { getRoles } from "@/server/role/actions/get-roles";
import { DashboardRolesModule } from "../_components";

const DashboardRoles = async (props: PageProps): Promise<ReactElement> => {
  const data = await getRoles({
    page: Number(props.searchParams?.page || 1),
    perPage: Number(props.searchParams?.perPage || 10),
    search: String(props.searchParams?.search || ""),
  });
  return <DashboardRolesModule data={data as TMetaResponse<Role[]>} />;
};

export default DashboardRoles;
