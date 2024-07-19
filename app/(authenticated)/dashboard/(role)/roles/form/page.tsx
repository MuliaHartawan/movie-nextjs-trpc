import { PageProps } from "@/types/app";
import { getRoleAction } from "../../_actions/get-role";
import DashboardCreateRolesClient from "./client";

const DashboardCreateRolesModule = async (props: PageProps) => {
  const roleId = props.searchParams.id?.toString() ?? "";
  const data = await getRoleAction(roleId);

  // @ts-ignore
  return <DashboardCreateRolesClient data={data?.success?.data} roleId={roleId} />;
};

export default DashboardCreateRolesModule;
