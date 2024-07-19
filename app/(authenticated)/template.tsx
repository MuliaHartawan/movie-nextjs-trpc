"use client";
import MainLayout from "@/components/ui/layout";
import { Sidebar } from "@/components/ui/sidebar";
import { FC, PropsWithChildren, ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const DashboardTemplate: FC<Readonly<PropsWithChildren>> = (props): ReactElement => {
  return (
    <MainLayout>
      <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
    </MainLayout>
  );
};

export default DashboardTemplate;
