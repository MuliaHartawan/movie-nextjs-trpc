"use client";
import { DataTable } from "@/components/ui/datatable";
import { ColumnDef } from "@tanstack/react-table";
import { Snack } from "../_actions/get-snacks";
import { FC } from "react";
import { TMetaResponse } from "@/types/meta";
import { Page } from "admiral";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

export const DashboardSnacksModule: FC<{ data: TMetaResponse<Snack[]> }> = ({ data }) => {
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
          <Button href="/dashboard/snacks/add" icon={<PlusCircleOutlined />}>
            Add Snack
          </Button>
        </>
      }
    >
      <DataTable data={data.data} meta={data.meta} columns={columns} />
    </Page>
  );
};
