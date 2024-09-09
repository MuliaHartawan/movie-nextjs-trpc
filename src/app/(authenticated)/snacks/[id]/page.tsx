import { PageProps } from "@/types/app";
import { DashboardDetailSnacksModule } from "./_components";
import { ReactElement } from "react";
import { getSnackAction } from "@/server/snack/actions/snack.action";

const DashboardDetailSnacksPage = async (props: PageProps): Promise<ReactElement> => {
  const data = await getSnackAction(props?.params?.id);
  return <DashboardDetailSnacksModule data={data} />;
};

export default DashboardDetailSnacksPage;
