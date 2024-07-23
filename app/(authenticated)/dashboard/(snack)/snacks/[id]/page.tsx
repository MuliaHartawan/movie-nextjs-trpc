import { getSnackAction } from "../../_actions/get-snack";
import DashboardDetailSnacksClient from "./clients";

const DashboardDetailSnacksModule = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const data = await getSnackAction(params.id);

  //   @ts-ignore
  return <DashboardDetailSnacksClient data={data.success?.data} />;
};

export default DashboardDetailSnacksModule;
