import { PageProps } from "@/types/app";
import { DashboardDetailRolesModule } from "../../_components/detail";
import { getRole } from "@/server/role/actions/role.action";

const DashboardDetailRolesPage = async (props: PageProps) => {
  const data = await getRole(props.params.id);
  return <DashboardDetailRolesModule data={data} />;
};

export default DashboardDetailRolesPage;
