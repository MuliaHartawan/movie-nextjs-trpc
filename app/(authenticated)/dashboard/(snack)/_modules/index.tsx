"use client";
import { DataTable } from "@/components/ui/datatable";
import { ColumnDef } from "@tanstack/react-table";
import { Snack } from "../_actions/get-snacks";
import { FC } from "react";
import { TMetaResponse } from "@/types/meta";

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
      }
    },
    {
      accessorKey: "expiryDate",
      header: "Expiry Date",
      cell: (cell) => {
        return new Date(cell.row?.original?.expiryDate as Date).toLocaleString();
      },
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Snacks</h1>
      <DataTable data={data.data} meta={data.meta} columns={columns} />
    </div>
  );
};
