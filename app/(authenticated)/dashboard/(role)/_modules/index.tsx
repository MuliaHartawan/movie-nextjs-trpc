"use client";
import { DataTable } from "@/components/ui/datatable";
import { ColumnDef } from "@tanstack/react-table";
import { FC } from "react";
import { TMetaResponse } from "@/types/meta";
import { Page } from "admiral";
import { Button, Flex, message } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { deleteRoleAction } from "../_actions/delete-role";
import { useRouter } from "next/navigation";
import { Role } from "@/libs/drizzle/schema";

export const DashboardRolesModule: FC<{ data: TMetaResponse<Role[]> }> = ({ data }) => {
  const router = useRouter();
  const columns: ColumnDef<Role>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "Action",
      header: "Action",
      cell: (cell) => {
        return (
          <Flex>
            <Button
              href={`/dashboard/roles/${cell.row?.original?.id}`}
              type="link"
              icon={<EyeOutlined style={{ color: "green" }} />}
            />
            <Button
              icon={<DeleteOutlined style={{ color: "red" }} />}
              type="link"
              onClick={() => {
                deleteRoleAction(cell.row?.original?.id as string);
                router.refresh();
                message.success("Role berhasil dihapus");
              }}
            />
            <Button
              href={`/dashboard/roles/form?id=${cell.row?.original?.id}`}
              type="link"
              icon={<EditOutlined />}
            />
          </Flex>
        );
      },
    },
  ];

  return (
    <Page
      title="roles"
      breadcrumbs={[
        {
          label: "Dashboard",
          path: "/dashboard",
        },
        {
          label: "Roles",
          path: "/dashboard/roles",
        },
      ]}
      topActions={
        <>
          <Button href="/dashboard/roles/form" icon={<PlusCircleOutlined />}>
            Add Roles
          </Button>
        </>
      }
    >
      <DataTable data={data.data} meta={data.meta} columns={columns} />
    </Page>
  );
};
