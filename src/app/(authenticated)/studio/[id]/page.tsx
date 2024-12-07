"use client";
import { trpc } from "@/libs/trpc";
import { Page, Section } from "admiral";
import { Descriptions } from "antd";
import { useParams } from "next/navigation";
import React from "react";

const DetailStudioPage = () => {
  const params = useParams();
  const studioId = typeof params.id === "string" ? params.id : "";
  const { data, isLoading } = trpc.studio.getStudio.useQuery(studioId);
  const breadcrumbs = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Studio", path: "/studio" },
    { label: data?.id ?? "", path: `/studio/${data?.id}` },
  ];

  return (
    <Page title="Detail Studio" breadcrumbs={breadcrumbs}>
      <Section title="Detail Studio" loading={isLoading}>
        <Descriptions bordered column={2}>
          <Descriptions.Item span={2} label="Name">
            {data?.name}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Capacity">
            {data?.capacity}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Additional Facilities">
            {data?.additionalFacilities}
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};

export default DetailStudioPage;
