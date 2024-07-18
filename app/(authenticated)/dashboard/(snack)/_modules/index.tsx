"use client";
import { DataTable } from "@/components/ui/datatable";
import { ColumnDef } from "@tanstack/react-table";
import { Snack } from "../_actions/get-snacks";
import { FC } from "react";
import { TMetaResponse } from "@/types/meta";
import { Page } from "admiral";
import { Button, Flex, message } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { deleteSnackAction } from "../_actions/delete-snack";
import { useRouter } from "next/navigation";

export const DashboardSnacksModule: FC<{ data: TMetaResponse<Snack[]> }> = ({ data }) => {
  const router = useRouter();
  const columns: ColumnDef<Snack>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "cost",
      header: "Cost",
      cell: (cell) => {
        return `Rp ${cell.row?.original?.cost?.toLocaleString()}`;
      },
    },
    {
      accessorKey: "expiryDate",
      header: "Expiry Date",
      cell: (cell) => {
        return new Date(cell.row?.original?.expiryDate as Date).toLocaleString();
      },
    },
    {
      accessorKey: "Action",
      header: "Action",
      cell: (cell) => {
        return (
          <Flex>
            <Button
              href={`/dashboard/snacks/${cell.row?.original?.id}`}
              type="link"
              icon={<EyeOutlined style={{ color: "green" }} />}
            />
            <Button
              icon={<DeleteOutlined style={{ color: "red" }} />}
              type="link"
              onClick={() => {
                deleteSnackAction(cell.row?.original?.id as string);
                router.refresh();
                message.success("Snack berhasil dihapus");
              }}
            />
            <Button
              href={`/dashboard/snacks/form?id=${cell.row?.original?.id}`}
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
      title="Snacks"
      breadcrumbs={[
        {
          label: "Dashboard",
          path: "/dashboard",
        },
        {
          label: "Snacks",
          path: "/dashboard/snacks",
        },
      ]}
      topActions={
        <>
          <Button href="/dashboard/snacks/form" icon={<PlusCircleOutlined />}>
            Add Snack
          </Button>
        </>
      }
    >
      <DataTable data={data.data} meta={data.meta} columns={columns} />
    </Page>
  );
};
