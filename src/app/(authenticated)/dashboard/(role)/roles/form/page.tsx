import { PageProps } from "@/types/app";
import { DashboardCreateRolesModule } from "../../_components/form";
import { getRoleAction } from "@/server/role/actions/role.action";

const DashboardCreateRolesPage = async (props: PageProps) => {
  const roleId = props.searchParams.id?.toString() ?? "";
  const data = await getRoleAction(roleId);
  return <DashboardCreateRolesModule data={data} roleId={roleId} />;
};

export default DashboardCreateRolesPage;
