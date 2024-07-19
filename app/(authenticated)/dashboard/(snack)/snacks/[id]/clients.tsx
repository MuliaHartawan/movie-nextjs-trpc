"use client";

import { Page, Section } from "admiral";
import { Snack } from "../../_actions/get-snacks";
import { Descriptions } from "antd";

const DashboardDetailSnacksClient = ({ data }: { data: Snack }) => {
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
          path: "/dashboard/snacks",
        },
        {
          label: data?.name,
          path: `/dashboard/snacks/${data?.id}`,
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

export default DashboardDetailSnacksClient;
