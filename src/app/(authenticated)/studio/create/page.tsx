"use client";
import { Page } from "admiral";
import { Col, message, Row } from "antd";
import React from "react";
import FormStudio from "../_components/form-studio";
import { trpc } from "@/libs/trpc";
import { TCreateOrUpdateStudioValidation } from "@/server/studio/validations/create-or-update-studio.validation";
import { transformTRPCError } from "@/utils/error";

const CreateStudioPage = () => {
  const { mutate, error, isLoading } = trpc.studio.createStudio.useMutation({
    onSuccess: () => {
      message.success("Success add new studio!");
    },
    onError: () => {
      message.error("Error occurs when creating studio :(");
    },
  });

  const breadcrumbs = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "studio",
      path: "/studio",
    },
  ];

  // use any becase type additionalFacilities from formData is array
  const handleOnFinish = (data: any) => {
    data = {
      capacity: Number(data?.capacity),
      additionalFacilities: data.additionalFacilities.join(", "),
      name: data.name,
    };
    mutate(data);
  };

  return (
    <Page title="Add Studio" breadcrumbs={breadcrumbs}>
      <Col span={12} style={{ margin: "auto" }}>
        <FormStudio
          formProps={{ onFinish: handleOnFinish }}
          error={transformTRPCError(error)}
          loading={isLoading}
        />
      </Col>
    </Page>
  );
};

export default CreateStudioPage;
