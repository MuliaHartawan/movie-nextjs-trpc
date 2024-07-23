"use server";
import type { ReactElement } from "react";
import { DashboardRolesModule } from "../_modules";
import { getRoles } from "../_actions/get-roles";

const DashboardRoles = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}): Promise<ReactElement> => {
  const data = await getRoles({
    page: Number(searchParams?.page || 1),
    perPage: Number(searchParams?.perPage || 10),
    search: String(searchParams?.search || ""),
  });

  return <DashboardRolesModule data={data} />;
};

export default DashboardRoles;
