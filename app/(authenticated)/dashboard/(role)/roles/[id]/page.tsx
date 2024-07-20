import { getRoleAction } from "../../_actions/get-role";
import DashboardDetailRolesClient from "./clients";

const DashboardDetailRolesModule = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const data = await getRoleAction(params.id);

  //   @ts-ignore
  return <DashboardDetailRolesClient data={data.success?.data} />;
};

export default DashboardDetailRolesModule;
