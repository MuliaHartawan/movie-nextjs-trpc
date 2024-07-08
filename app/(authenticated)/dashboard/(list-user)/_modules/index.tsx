"use client";
import { DataTable } from "@/components/ui/datatable";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "../actions/get-users";
import { FC } from "react";
import { TMetaResponse } from "@/types/meta";

export const DashboardUsersModule: FC<{ data: TMetaResponse<User[]> }> = ({ data }) => {
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
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <DataTable data={data.data} meta={data.meta} columns={columns} />
    </div>
  );
};
