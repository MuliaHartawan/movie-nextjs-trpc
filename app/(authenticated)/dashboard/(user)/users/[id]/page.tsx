import { getUserAction } from "../../_actions/get-user";
import DashboardDetailUserClient from "./clients";

const DashboardDetailUserModule = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const data = await getUserAction(params.id);

  //   @ts-ignore
  return <DashboardDetailUserClient data={data.success?.data} />;
};

export default DashboardDetailUserModule;
