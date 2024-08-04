"use client";

import { Role } from "@/libs/drizzle/schemas/role.schema";
import { Page, Section } from "admiral";
import { Descriptions } from "antd";
import { FC, ReactElement } from "react";

export const DashboardDetailRolesModule: FC<{ data?: Role }> = ({ data }): ReactElement => {
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
          path: "/dashboard/roles",
        },
        {
          label: data?.name as string,
          path: `/dashboard/roles/${data?.id}`,
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
