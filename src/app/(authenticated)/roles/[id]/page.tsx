"use client";

import { Page, Section } from "admiral";
import { useParams } from "next/navigation";
import { useRoleQuery } from "./_hooks/use-role-query";
import { Descriptions } from "antd";

const RolePage = () => {
  const params = useParams();
  const roleId = params.id.toString() ?? "";

  const roleQuery = useRoleQuery(roleId);

  const breadcrumbs = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Roles",
      path: "/roles",
    },
    {
      label: roleQuery.data?.name as string,
      path: `/roles/${roleQuery.data?.id}`,
    },
  ];

  return (
    <Page title="Detail Roles" breadcrumbs={breadcrumbs}>
      <Section loading={roleQuery.isLoading} title="Detail Roles">
        <Descriptions bordered column={2}>
          <Descriptions.Item span={2} label="Name">
            {roleQuery.data?.name}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Permission">
            {roleQuery.data?.rolePermissions?.map((rolePermission) => (
              <div key={rolePermission.permission?.id}>{rolePermission.permission?.name}</div>
            ))}
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};

export default RolePage;
