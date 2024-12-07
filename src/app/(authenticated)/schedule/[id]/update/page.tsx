"use client";
import React from "react";
import FormSchedule from "../../_components/form-schedule";
import { trpc } from "@/libs/trpc";
import { useParams } from "next/navigation";
import { Page } from "admiral";
import { transformTRPCError } from "@/utils/error";
import { message } from "antd";

const UpdateSchedulePage = () => {
  const params = useParams();
  const scheduleId = typeof params.id === "string" ? params.id : "";
  const { mutate, isLoading, error } = trpc.screenSchedule.updateScreenSchedule.useMutation({
    onSuccess() {
      message.success("Success create movies schedule!");
    },
    onError() {
      message.error("Error occurs when creating movie schedule, please try again!");
    },
  });
  const { data, isLoading: isGetOldDataLoading } = trpc.screenSchedule.getScreenSchedule.useQuery(
    scheduleId,
    {
      refetchOnWindowFocus: false,
    },
  );

  // tidak bisa menggunakan type dari backend, karena data yang diminta dengan data dari form berbeda dan harus diconvert
  const onUpdateSchedule = (data: any) => {
    data = {
      ...data,
      screeningTime: data?.screeningTime.format("YYYY-MM-DD"),
      price: Number(data?.price),
    };
    mutate({
      value: data,
      id: scheduleId,
    });
  };

  const breadcrumbs = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Schedule", path: "/schedule" },
    { label: data?.id ?? "", path: `/schedule/${data?.id}/update` },
  ];

  return (
    <Page title="Update Schedule" breadcrumbs={breadcrumbs}>
      <FormSchedule
        formProps={{
          onFinish: onUpdateSchedule,
        }}
        loading={isLoading}
        error={transformTRPCError(error)}
        initialValue={data}
      />
    </Page>
  );
};

export default UpdateSchedulePage;
