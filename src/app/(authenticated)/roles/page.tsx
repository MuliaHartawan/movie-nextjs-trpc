"use client";
import { PageProps } from "@/types/app";
import { DatatableRoles } from "./_components/datatable-roles";
import { Page } from "admiral";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRolesQuery } from "./_hooks/roles-query";
import Link from "next/link";

const RolesPage = (props: PageProps) => {
  const { data, isLoading } = useRolesQuery({
    page: Number(props.searchParams?.page || 1),
    perPage: Number(props.searchParams?.perPage || 10),
    search: String(props.searchParams?.search || ""),
  });

  return (
    <Page
      title="Roles"
      breadcrumbs={[
        {
          label: "Dashboard",
          path: "/dashboard",
        },
        {
          label: "Roles",
          path: "/roles",
        },
      ]}
      topActions={
        <Link href="/roles/create">
          <Button icon={<PlusCircleOutlined />}>Add Roles</Button>
        </Link>
      }
    >
      <DatatableRoles data={data} loading={isLoading} />;
    </Page>
  );
};

export default RolesPage;
