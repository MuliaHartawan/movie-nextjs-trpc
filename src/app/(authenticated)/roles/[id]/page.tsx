import { PageProps } from "@/types/app";
import { DashboardDetailRolesModule } from "./_components";
import { getRoleAction } from "@/server/role/actions/role.action";

const DashboardDetailRolesPage = async (props: PageProps) => {
  const data = await getRoleAction(props.params.id);
  return <DashboardDetailRolesModule data={data} />;
};

export default DashboardDetailRolesPage;
