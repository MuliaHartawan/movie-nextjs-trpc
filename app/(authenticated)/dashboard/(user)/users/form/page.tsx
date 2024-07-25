import { PageProps } from "@/types/app";
import DashboardCreateUsersClient from "./client";
import { getUserAction } from "../../_actions/get-user";
import { getRoles } from "../../../(role)/_actions/get-roles";

const DashboardCreateUsersModule = async (props: PageProps) => {
  const userId = props.searchParams.id?.toString() ?? "";
  const data = await getUserAction(userId);
  const roles = await getRoles({
    page: Number(props.searchParams?.page || 1),
    perPage: Number(props.searchParams?.perPage || 10),
    search: String(props.searchParams?.search || ""),
  });

  return (
    // @ts-ignore
    <DashboardCreateUsersClient data={data?.success?.data} userId={userId} roles={roles.data} />
  );
};

export default DashboardCreateUsersModule;