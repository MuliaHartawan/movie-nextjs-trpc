import { PageProps } from "@/types/app";
import { DashboardCreateSnacksModule } from "../../_components/form";
import { ReactElement } from "react";
import { getSnackAction } from "@/server/snack/actions/snack.action";

const DashboardCreateSnacksPage = async (props: PageProps): Promise<ReactElement> => {
  const snacksId = props.searchParams.id?.toString() ?? "";
  if (!snacksId) return <DashboardCreateSnacksModule />;
  const data = await getSnackAction(snacksId);
  return <DashboardCreateSnacksModule data={data} snackId={snacksId} />;
};

export default DashboardCreateSnacksPage;