"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { LayoutWithHeader } from "admiral";
import { TBreadcrumbsItem } from "admiral/breadcrumb";
import Loading from "@/app/(public)/auth/(otp)/otp/loading";
import { Flex } from "antd";
import {
  DashboardOutlined,
  PieChartFilled,
  RobotOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { TheraIcon } from "@/components/svg-tsx/thera-icon";
import UserProfile from "../user-profile";

export type TMainLayoutProps = {
  title?: string;
  children: React.ReactNode;
  breadcrumbs?: TBreadcrumbsItem[];
  topActions?: React.ReactNode;
};

const NavbarMenu = [
  {
    key: "/dashboard",
    label: <Link href="/dashboard">Dashboard</Link>,
    icon: <DashboardOutlined />,
  },
  {
    key: "/dashboard/chat-ai",
    label: <Link href="/dashboard/chat-ai">Chat AI</Link>,
    icon: <RobotOutlined />,
  },
  {
    key: "/dashboard/users",
    label: <Link href="/dashboard/users">Users</Link>,
    icon: <UserOutlined />,
  },
  {
    key: "/dashboard/roles",
    label: <Link href="/dashboard/roles">Roles</Link>,
    icon: <PieChartFilled />,
  },
  {
    key: "/dashboard/snacks",
    label: <Link href="/dashboard/snacks">Snacks</Link>,
    icon: <TagOutlined />,
  },
];

const MenuHeader = () => {
  return (
    <Flex align="right" gap={30}>
      <UserOutlined />
    </Flex>
  );
};

const MainLayout: React.FC<TMainLayoutProps> = ({ children, title, breadcrumbs, topActions }) => {
  const router = usePathname();
  const session = useSession();

  const activeMenuKey = useMemo(() => {
    const pathParts = router.split("/");
    if (pathParts.length < 3) {
      return router;
    }

    const [, topLevel, subLevel] = pathParts;
    const activeMenuKey = `/${topLevel}/${subLevel}`;
    return activeMenuKey;
  }, [router]);

  const defaultOpenedKey = useMemo(() => {
    if (!NavbarMenu) return undefined;
    let commonPart = activeMenuKey.split("/");

    NavbarMenu.forEach((item) => {
      if (item && "key" in item && typeof item.key === "string" && item.key) {
        const parts = (item.key as string).split("/");
        let i = 0;
        while (i < commonPart.length && i < parts.length && commonPart[i] === parts[i]) {
          i++;
        }
        commonPart = commonPart.slice(i);
      }
    });
    return commonPart || undefined;
  }, [activeMenuKey, NavbarMenu]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <LayoutWithHeader
          header={{
            brandLogo: (
              <figure className="w-full flex justify-center items-center gap-x-3 py-6">
                <TheraIcon width={"40"} height={"40"} />
                <figcaption
                  className={`text-lg text-gray-700 tracking-wider transition-all duration-600`}
                >
                  Next Fullstack
                </figcaption>
              </figure>
            ),
            menu: <UserProfile />,
          }}
          sidebar={{
            width: 250,
            defaultSelectedKeys: [activeMenuKey],
            defaultOpenKeys: [`/${defaultOpenedKey && defaultOpenedKey[0]}`],
            menu: NavbarMenu,
            theme: "light",
          }}
        >
          {children}
        </LayoutWithHeader>
      </Suspense>
    </>
  );
};

export default MainLayout;
