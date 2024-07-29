import { PageProps } from "@/types/app";
import { getSnackAction } from "../../_actions/get-snack";
import { DashboardCreateSnacksModule } from "../../_modules/form";
import { ReactElement } from "react";

const DashboardCreateSnacksPage = async (props: PageProps): Promise<ReactElement> => {
  const snacksId = props.searchParams.id?.toString() ?? "";
  const data = await getSnackAction(snacksId);
  return <DashboardCreateSnacksModule data={data?.success?.data} snackId={snacksId} />;
};

export default DashboardCreateSnacksPage;
