"use client";

import { SectionDetailRole } from "./_components/section-detail-role";
import { Page } from "admiral";
import { useParams } from "next/navigation";
import { useRoleQuery } from "./_hooks/role-by-id-query";

const RolePage = () => {
  const params = useParams();
  const roleId = params.id.toString() ?? "";

  const { data, isLoading } = useRoleQuery(roleId);

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
          path: "/roles",
        },
        {
          label: data?.name as string,
          path: `/roles/${data?.id}`,
        },
      ]}
    >
      <SectionDetailRole data={data} loading={isLoading} />;
    </Page>
  );
};

export default RolePage;
