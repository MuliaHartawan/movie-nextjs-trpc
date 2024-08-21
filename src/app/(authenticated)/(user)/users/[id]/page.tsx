import { PageProps } from "@/types/app";
import { ReactElement } from "react";
import { DashboardDetailUserModule } from "../../_components/detail";
import { getUser } from "@/server/user/actions/user.action";

const DashboardDetailUserPage = async (props: PageProps): Promise<ReactElement> => {
  const data = await getUser(props?.params?.id);
  return <DashboardDetailUserModule data={data} />;
};

export default DashboardDetailUserPage;
