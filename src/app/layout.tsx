import type { Metadata } from "next";
import type { FC, PropsWithChildren, ReactElement } from "react";
import { Montserrat } from "next/font/google";
import { AuthProvider } from "@/libs/auth/provider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryProvider } from "@/libs/action-query/provider";
import { TRPCProvider } from "@/libs/trpc/provider";

const monserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NextJS Fullstack",
  description: "NextJS Fullstack",
};

const RootLayout: FC<Readonly<PropsWithChildren>> = ({ children }): ReactElement => {
  return (
    <html lang="en">
      <body className={monserrat.className}>
        <AuthProvider>
          <QueryProvider>
            <AntdRegistry>
              <TRPCProvider>{children}</TRPCProvider>
            </AntdRegistry>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
