"use client";

import Link from "next/link";
import { Suspense, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { LayoutWithHeader } from "admiral";
import { TBreadcrumbsItem } from "admiral/breadcrumb";
import { DashboardOutlined, PieChartFilled, TagOutlined, UserOutlined } from "@ant-design/icons";
import { PERMISSIONS } from "@/common/enums/permissions.enum";
import { hasCommonElements } from "@/utils/index";
import { UserProfile } from "../user-profile";

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
    key: "/users",
    label: <Link href="/users">Users</Link>,
    icon: <UserOutlined />,
    permissions: [PERMISSIONS.USER_READ],
  },
  {
    key: "/roles",
    label: <Link href="/roles">Roles</Link>,
    icon: <PieChartFilled />,
    permissions: [PERMISSIONS.ROLE_READ],
  },
  {
    key: "/snacks",
    label: <Link href="/snacks">Snacks</Link>,
    icon: <TagOutlined />,
    permissions: [PERMISSIONS.SNACK_READ],
  },
];

export const MainLayout: React.FC<TMainLayoutProps> = ({ children }) => {
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
    <Suspense fallback={"Loading..."}>
      <LayoutWithHeader
        header={{
          brandLogo: <span>NextJS Fullstack</span>,
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
  );
};
