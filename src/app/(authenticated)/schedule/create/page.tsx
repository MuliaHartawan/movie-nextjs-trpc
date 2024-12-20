"use client";
import { Page } from "admiral";
import { Col, Form, Input, message, Row } from "antd";
import React from "react";
import FormSchedule from "../_components/form-schedule";
import { trpc } from "@/libs/trpc";
import { transformTRPCError } from "@/utils/error";
import { TScheduleCreateOrUpdateForm } from "../_types/schedule-types";
import { TCreateOrUpdateScreenScheduleValidation } from "@/server/screen-schedule/validations/create-or-update-screen-schedule.validation";

const CreateSchedulePage = () => {
  const { mutate, isLoading, error } = trpc.screenSchedule.createScreenSchedule.useMutation({
    onSuccess() {
      message.success("Success create movies schedule!");
    },
    onError() {
      message.error("Error occurs when creating movie schedule, please try again!");
    },
  });
  const breadcrumbs = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Schedule",
      path: "/schedule",
    },
    {
      label: "Create Schedule",
      path: "/schedule/create",
    },
  ];

  const onCreateSchedule = (data: TScheduleCreateOrUpdateForm) => {
    const finalData = {
      screeningTime: data?.screeningTime.format("YYYY-MM-DD"),
      price: Number(data?.price),
      studioId: data?.studioId,
      movieId: data?.movieId,
    } as TCreateOrUpdateScreenScheduleValidation;
    mutate(finalData);
  };
  return (
    <Page title="Create Schedule" breadcrumbs={breadcrumbs}>
      <Row>
        <Col span={12} style={{ margin: "auto" }}>
          <FormSchedule
            loading={isLoading}
            error={transformTRPCError(error)}
            formProps={{
              onFinish: onCreateSchedule,
            }}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default CreateSchedulePage;
