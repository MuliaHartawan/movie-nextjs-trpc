import { PageProps } from "@/types/app";
import { DashboardDetailSnacksModule } from "../../_modules/detail";
import { ReactElement } from "react";
import { getSnack } from "@/server/snack/actions/snack.action";

const DashboardDetailSnacksPage = async (props: PageProps): Promise<ReactElement> => {
  const data = await getSnack(props?.params?.id);
  return <DashboardDetailSnacksModule data={data} />;
};

export default DashboardDetailSnacksPage;
