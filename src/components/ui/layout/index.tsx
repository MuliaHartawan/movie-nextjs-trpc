"use client";

import React, { Suspense, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { LayoutWithHeader } from "admiral";
import { TBreadcrumbsItem } from "admiral/breadcrumb";
import Loading from "@/app/(public)/auth/(otp)/otp/loading";
import { DashboardOutlined, PieChartFilled, TagOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { TheraIcon } from "@/components/svg-tsx/thera-icon";
import UserProfile from "../user-profile";
import { PERMISSIONS } from "@/common/enums/permissions.enum";
import { hasCommonElements } from "@/utils";

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
    permissions: [PERMISSIONS.DASHBOARD],
  },
  {
    key: "/dashboard/users",
    label: <Link href="/dashboard/users">Users</Link>,
    icon: <UserOutlined />,
    permissions: [PERMISSIONS.USER_READ],
  },
  {
    key: "/dashboard/roles",
    label: <Link href="/dashboard/roles">Roles</Link>,
    icon: <PieChartFilled />,
    permissions: [PERMISSIONS.ROLE_READ],
  },
  {
    key: "/dashboard/snacks",
    label: <Link href="/dashboard/snacks">Snacks</Link>,
    icon: <TagOutlined />,
    permissions: [PERMISSIONS.SNACK_READ],
  },
];

const MainLayout: React.FC<TMainLayoutProps> = ({ children }) => {
  const router = usePathname();
  const { data: session } = useSession();

  const userPermissions = useMemo(
    () => session?.user?.role?.permissions || [],
    [session?.user?.role?.permissions],
  );

  const filteredNavbarMenu = useMemo(() => {
    return NavbarMenu.filter((item) => hasCommonElements(item.permissions, userPermissions));
  }, [userPermissions]);

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
    if (!filteredNavbarMenu) return undefined;
    let commonPart = activeMenuKey.split("/");

    filteredNavbarMenu.forEach((item) => {
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
  }, [activeMenuKey, filteredNavbarMenu]);

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
            menu: filteredNavbarMenu,
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
