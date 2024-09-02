"use client";
import { FC, PropsWithChildren, ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainLayout } from "@/components/ui/layout";

const queryClient = new QueryClient();
const AuthenticatedTemplate: FC<Readonly<PropsWithChildren>> = (props): ReactElement => {
  return (
    <MainLayout>
      <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
    </MainLayout>
  );
};

export default AuthenticatedTemplate;
