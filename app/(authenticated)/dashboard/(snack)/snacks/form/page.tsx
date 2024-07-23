import { PageProps } from "@/types/app";
import DashboardCreateSnacksClient from "./client";
import { getSnackAction } from "../../_actions/get-snack";

const DashboardCreateSnacksModule = async (props: PageProps) => {
  const snacksId = props.searchParams.id?.toString() ?? "";
  const data = await getSnackAction(snacksId);

  // @ts-ignore
  return <DashboardCreateSnacksClient data={data?.success?.data} snackId={snacksId} />;
};

export default DashboardCreateSnacksModule;
