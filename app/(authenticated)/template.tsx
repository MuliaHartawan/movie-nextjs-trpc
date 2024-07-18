import MainLayout from "@/components/ui/layout";
import { Sidebar } from "@/components/ui/sidebar";
import { FC, PropsWithChildren, ReactElement } from "react";

const DashboardTemplate: FC<Readonly<PropsWithChildren>> = (props): ReactElement => {
  return <MainLayout>{props.children}</MainLayout>;
};

export default DashboardTemplate;
