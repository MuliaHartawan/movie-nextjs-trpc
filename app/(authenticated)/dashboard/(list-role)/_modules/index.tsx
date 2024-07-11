"use client";
import { DataTable } from "@/components/ui/datatable";
import { ColumnDef } from "@tanstack/react-table";
import { FC } from "react";
import { TMetaResponse } from "@/types/meta";
import { Role } from "../actions/get-roles";

export const DashboardRolesModule: FC<{ data: TMetaResponse<Role[]> }> = ({ data }) => {
  const columns: ColumnDef<Role>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "permissions",
      header: "Permissions",
      cell: (cell) => {
        return cell.row?.original?.permissions?.join(", ");
      },
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Roles</h1>
      <DataTable data={data.data} meta={data.meta} columns={columns} />
    </div>
  );
};
