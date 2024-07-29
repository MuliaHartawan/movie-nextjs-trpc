"use client";

import { Page, Section } from "admiral";
import { Descriptions } from "antd";
import { User } from "../_actions/get-users";
import { FC, ReactElement } from "react";

export const DashboardDetailUserModule: FC<{ data?: User }> = ({ data }): ReactElement => {
  return (
    <Page
      title="Detail User"
      breadcrumbs={[
        {
          label: "Dashboard",
          path: "/dashboard",
        },
        {
          label: "User",
          path: "/dashboard/users",
        },
        {
          label: data?.fullname ?? "",
          path: `/dashboard/users/${data?.id}`,
        },
      ]}
    >
      <Section title="Detail User">
        <Descriptions bordered column={2}>
          <Descriptions.Item span={2} label="Name">
            {data?.fullname}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Email">
            {data?.email}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Address">
            {data?.address}
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};