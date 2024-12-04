"use client";
import { Page, Section } from "admiral";
import { Descriptions } from "antd";
import React from "react";

const DetailStudioPage = () => {
  const breadcrumbs = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Studio", path: "/studio" },
    /* { label: userQuery.data?.fullname ?? "", path: `/users/${userQuery.data?.id}` }, */
  ];
  return (
    <Page title="Detail Studio" breadcrumbs={breadcrumbs}>
      <Section title="Detail Studio">
        <Descriptions bordered column={2}>
          <Descriptions.Item span={2} label="Name">
            Studio Name
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Capacity">
            Studio Capacity
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Additional Facilities">
            {/* looping data */}
            Additional Facilities
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};

export default DetailStudioPage;
