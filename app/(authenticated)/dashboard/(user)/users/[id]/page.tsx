import { PageProps } from "@/types/app";
import { getUserAction } from "../../_actions/get-user";
import { ReactElement } from "react";
import { DashboardDetailUserModule } from "../../_modules/detail";

const DashboardDetailUserPage = async (props: PageProps): Promise<ReactElement> => {
  const data = await getUserAction(props?.params?.id);
  return <DashboardDetailUserModule data={data.success?.data} />;
};

export default DashboardDetailUserPage;
