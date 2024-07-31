import { PageProps } from "@/types/app";
import { getRoles } from "@/server/role/actions/get-roles";
import { DashboardCreateUsersModule } from "../../_components/form";
import { getUser } from "@/server/user/actions/user.action";

const DashboardCreateUsersPage = async (props: PageProps) => {
  const userId = props.searchParams.id?.toString() ?? "";
  const data = await getUser(userId);
  const roles = await getRoles({
    page: Number(props.searchParams?.page || 1),
    perPage: Number(props.searchParams?.perPage || 10),
    search: String(props.searchParams?.search || ""),
  });
  return <DashboardCreateUsersModule data={data} userId={userId} roles={roles.data} />;
};

export default DashboardCreateUsersPage;
