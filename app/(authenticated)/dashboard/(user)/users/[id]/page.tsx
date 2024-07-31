import { PageProps } from "@/types/app";
import { ReactElement } from "react";
import { DashboardDetailUserModule } from "../../_modules/detail";
import { getUserAction } from "../../_server-actions/user.action";

const DashboardDetailUserPage = async (props: PageProps): Promise<ReactElement> => {
  const data = await getUserAction(props?.params?.id);
  return <DashboardDetailUserModule data={data.success?.data} />;
};

export default DashboardDetailUserPage;
