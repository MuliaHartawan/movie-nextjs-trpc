import { PageProps } from "@/types/app";
import { DashboardCreateSnacksModule } from "../../_modules/form";
import { ReactElement } from "react";
import { getSnackAction } from "@/server/snack/actions/snack.action";

const DashboardCreateSnacksPage = async (props: PageProps): Promise<ReactElement> => {
  const snacksId = props.searchParams.id?.toString() ?? "";
  if (!snacksId) return <DashboardCreateSnacksModule />;
  const data = await getSnackAction(snacksId);
  return <DashboardCreateSnacksModule data={data?.success?.data} snackId={snacksId} />;
};

export default DashboardCreateSnacksPage;
