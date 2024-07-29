"use client";
import Datatable from "admiral/table/datatable/index";
import { Snack } from "../_actions/get-snacks";
import { FC } from "react";
import { TMetaResponse } from "@/types/meta";
import { Page } from "admiral";
import { Button, Flex, Modal, message } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { deleteSnackAction } from "../_actions/delete-snack";
import { useRouter } from "next/navigation";
import { ColumnType } from "antd/es/table";
import { makeSource } from "@/utils";
import { useFilter } from "@/utils/filter";

const { confirm } = Modal;
export const DashboardSnacksModule: FC<{ data: TMetaResponse<Snack[]> }> = ({ data }) => {
  const router = useRouter();
  const { implementDataTable, filter } = useFilter();

  const columns: ColumnType<Snack>[] = [
    {
      dataIndex: "name",
      key: "name",
      title: "Name",
    },
    {
      dataIndex: "cost",
      title: "Cost",
      key: "cost",
      render: (_, row) => {
        return `Rp ${row?.cost?.toLocaleString()}`;
      },
    },
    {
      dataIndex: "expiryDate",
      title: "Expiry Date",
      key: "expiryDate",
      render: (_, row) => {
        return new Date(row?.expiryDate as Date).toLocaleString();
      },
    },
    {
      dataIndex: "Action",
      title: "Action",
      key: "Action",
      render: (_, row) => {
        return (
          <Flex>
            <Button
              href={`/dashboard/snacks/${row?.id}`}
              type="link"
              icon={<EyeOutlined style={{ color: "green" }} />}
            />
            <Button
              icon={<DeleteOutlined style={{ color: "red" }} />}
              type="link"
              onClick={() => {
                confirm({
                  title: "Are you sure you want to delete this snack?",
                  okText: "Delete",
                  okType: "danger",
                  icon: <DeleteOutlined />,
                  cancelText: "Cancel",
                  onOk() {
                    deleteSnackAction(row?.id);
                    router.refresh();
                    message.success("Snack berhasil dihapus");
                  },
                });
              }}
            />
            <Button
              href={`/dashboard/snacks/form?id=${row?.id}`}
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
        <Button href="/dashboard/snacks/form" icon={<PlusCircleOutlined />}>
          Add Snack
        </Button>
      }
    >
      <Datatable
        source={makeSource(data)}
        columns={columns}
        onChange={implementDataTable}
        search={filter.search}
      />
    </Page>
  );
};
