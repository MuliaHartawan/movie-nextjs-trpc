"use client";
import { trpc } from "@/libs/trpc";
import { Page, Section } from "admiral";
import { Descriptions } from "antd";
import { useParams } from "next/navigation";
import React from "react";

const DetailSchedulePage = () => {
  const params = useParams();
  const scheduleId = typeof params.id === "string" ? params.id : "";
  const { data, isLoading } = trpc.screenSchedule.getScreenSchedule.useQuery(scheduleId);

  const breadcrumbs = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Schedule", path: "/schedule" },
    { label: data?.id ?? "", path: `/schedule/${data?.id}` },
  ];

  return (
    <Page title="Detail Schedule" breadcrumbs={breadcrumbs}>
      <Section loading={isLoading} title="Detail Schedule">
        <Descriptions bordered column={2}>
          <Descriptions.Item span={2} label="Movie ID">
            {data?.movieId}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Studio ID">
            {data?.studioId}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Date">
            {data?.screeningTime.toLocaleString("en-GB")}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Price">
            {data?.price}
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};

export default DetailSchedulePage;
