"use client";

import { Page, Section } from "admiral";
import { Descriptions } from "antd";
import { useSnackQuery } from "./_hooks/use-snack-query";
import { useParams } from "next/navigation";

const SnackPage = () => {
  const params = useParams();
  const snackId = typeof params.id === "string" ? params.id : "";
  const snackQuery = useSnackQuery(snackId);
  const breadcrumbs = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Snacks",
      path: "/snacks",
    },
    {
      label: snackQuery.data?.name as string,
      path: `/snacks/${snackQuery.data?.id}`,
    },
  ];

  return (
    <Page title="Detail Snacks" breadcrumbs={breadcrumbs}>
      <Section loading={snackQuery.isLoading} title="Detail Snacks">
        <Descriptions bordered>
          <Descriptions.Item span={2} label="Name">
            {snackQuery.data?.name}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Cost">
            {snackQuery.data?.cost}
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};

export default SnackPage;
