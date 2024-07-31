import { PageProps } from "@/types/app";
import { DashboardDetailRolesModule } from "../../_components/detail";
import { getRoleAction } from "@/server/role/actions/get-role";

const DashboardDetailRolesPage = async (props: PageProps) => {
  const data = await getRoleAction(props.params.id);
  return <DashboardDetailRolesModule data={data?.success?.data} />;
};

export default DashboardDetailRolesPage;
