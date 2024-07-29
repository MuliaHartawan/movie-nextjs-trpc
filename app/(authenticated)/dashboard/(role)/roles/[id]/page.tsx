import { PageProps } from "@/types/app";
import { getRoleAction } from "../../_actions/get-role";
import { DashboardDetailRolesModule } from "../../_modules/detail";

const DashboardDetailRolesPage = async (props: PageProps) => {
  const data = await getRoleAction(props.params.id);
  return <DashboardDetailRolesModule data={data?.success?.data} />;
};

export default DashboardDetailRolesPage;
