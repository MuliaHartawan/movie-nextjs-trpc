"use client";

import { Page, Section } from "admiral";
import { Descriptions } from "antd";
import { useParams } from "next/navigation";
import { trpc } from "@/libs/trpc";

const DetailUserPage = () => {
  const params = useParams();
  const userId = typeof params.id === "string" ? params.id : "";
  const userQuery = trpc.user.getUser.useQuery(userId);

  const breadcrumbs = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "User", path: "/users" },
    { label: userQuery.data?.fullname ?? "", path: `/users/${userQuery.data?.id}` },
  ];

  return (
    <Page title="Detail User" breadcrumbs={breadcrumbs}>
      <Section loading={userQuery.isLoading} title="Detail User">
        <Descriptions bordered column={2}>
          <Descriptions.Item span={2} label="Name">
            {userQuery.data?.fullname}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Email">
            {userQuery.data?.email}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Address">
            {userQuery.data?.address}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Role">
            {userQuery.data?.role?.name}
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};

export default DetailUserPage;
