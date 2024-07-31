import { PageProps } from "@/types/app";
import { getSnackAction } from "../../_actions/get-snack";
import { DashboardDetailSnacksModule } from "../../_modules/detail";
import { ReactElement } from "react";

const DashboardDetailSnacksPage = async (props: PageProps): Promise<ReactElement> => {
  const data = await getSnackAction(props?.params?.id);
  return <DashboardDetailSnacksModule data={data.success?.data} />;
};

export default DashboardDetailSnacksPage;
