"use client";
import { DataTable } from "@/components/ui/datatable";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "../_actions/get-users";
import { FC } from "react";
import { TMetaResponse } from "@/types/meta";
import { Page } from "admiral";
import { Button, Flex, message } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { deleteUserAction } from "../_actions/delete-user";
import { useRouter } from "next/navigation";

export const DashboardUsersModule: FC<{ data: TMetaResponse<User[]> }> = ({ data }) => {
  const router = useRouter();
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "fullname",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: (cell) => {
        return new Date(cell.row.original.createdAt as Date).toLocaleString();
      },
    },
    {
      accessorKey: "Action",
      header: "Action",
      cell: (cell) => {
        return (
          <Flex>
            <Button
              href={`/dashboard/users/${cell.row?.original?.id}`}
              type="link"
              icon={<EyeOutlined style={{ color: "green" }} />}
            />
            <Button
              icon={<DeleteOutlined style={{ color: "red" }} />}
              type="link"
              onClick={() => {
                deleteUserAction(cell.row?.original?.id as string);
                router.refresh();
                message.success("User berhasil dihapus");
              }}
            />
            <Button
              href={`/dashboard/users/form?id=${cell.row?.original?.id}`}
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
      title="Users"
      breadcrumbs={[
        {
          label: "Dashboard",
          path: "/dashboard",
        },
        {
          label: "Users",
          path: "/dashboard/users",
        },
      ]}
      topActions={
        <>
          <Button href="/dashboard/users/form" icon={<PlusCircleOutlined />}>
            Add Users
          </Button>
        </>
      }
    >
      <DataTable data={data.data} meta={data.meta} columns={columns} />
    </Page>
  );
};
