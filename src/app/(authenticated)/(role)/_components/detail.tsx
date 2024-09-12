"use client";

import { RoleWithPermission } from "@/libs/prisma/types/role-with-permission";
import { Page, Section } from "admiral";
import { Descriptions } from "antd";
import { FC, ReactElement } from "react";

export const DashboardDetailRolesModule: FC<{ data?: RoleWithPermission }> = ({
  data,
}): ReactElement => {
  return (
    <Page
      title="Detail Roles"
      breadcrumbs={[
        {
          label: "Dashboard",
          path: "/dashboard",
        },
        {
          label: "Roles",
          path: "/roles",
        },
        {
          label: data?.name as string,
          path: `/roles/${data?.id}`,
        },
      ]}
    >
      <Section title="Detail Roles">
        <Descriptions bordered column={2}>
          <Descriptions.Item span={2} label="Name">
            {data?.name}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Permission">
            {data?.rolePermissions?.map((rolePermission) => (
              <div key={rolePermission.permission?.id}>{rolePermission.permission?.name}</div>
            ))}
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};
