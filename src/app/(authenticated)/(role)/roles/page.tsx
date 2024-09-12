"use server";
import type { ReactElement } from "react";
import { PageProps } from "@/types/app";
import { TPaginationResponse } from "@/types/meta";
import { DashboardRolesModule } from "../_components";
import { getRolesAction } from "@/server/role/actions/role.action";
import { Role } from "@prisma/client";

const DashboardRoles = async (props: PageProps): Promise<ReactElement> => {
  const data = await getRolesAction({
    page: Number(props.searchParams?.page || 1),
    perPage: Number(props.searchParams?.perPage || 10),
    search: String(props.searchParams?.search || ""),
  });
  return <DashboardRolesModule data={data as TPaginationResponse<Role[]>} />;
};

export default DashboardRoles;
