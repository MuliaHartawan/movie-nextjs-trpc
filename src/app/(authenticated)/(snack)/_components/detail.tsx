"use client";

import { Snack } from "@/libs/drizzle/schemas/snack.schema";
import { Page, Section } from "admiral";
import { Descriptions } from "antd";
import { FC, ReactElement } from "react";

export const DashboardDetailSnacksModule: FC<{ data?: Snack }> = ({ data }): ReactElement => {
  return (
    <Page
      title="Detail Snacks"
      breadcrumbs={[
        {
          label: "Dashboard",
          path: "/dashboard",
        },
        {
          label: "Snacks",
          path: "/snacks",
        },
        {
          label: data?.name as string,
          path: `/snacks/${data?.id}`,
        },
      ]}
    >
      <Section title="Detail Snacks">
        <Descriptions bordered>
          <Descriptions.Item span={2} label="Name">
            {data?.name}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Cost">
            {data?.cost}
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};