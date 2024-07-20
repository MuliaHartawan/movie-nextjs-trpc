"use client";

import { Page, Section } from "admiral";
import { Descriptions } from "antd";
import { Role } from "../../_actions/get-roles";

const DashboardDetailRolesClient = ({ data }: { data: Role }) => {
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
          label: data?.name,
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
            {data?.permissions?.join(", ")}
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};

export default DashboardDetailRolesClient;
