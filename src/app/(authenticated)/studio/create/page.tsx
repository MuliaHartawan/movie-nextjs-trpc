"use client";
import { Page } from "admiral";
import { Col, message, Row } from "antd";
import React from "react";
import FormStudio from "../_components/form-studio";
import { trpc } from "@/libs/trpc";
import { TCreateOrUpdateStudioValidation } from "@/server/studio/validations/create-or-update-studio.validation";
import { transformTRPCError } from "@/utils/error";
import { TCreateOrUpdateStudioForm } from "../_types/studio-type";

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

  const handleOnFinish = (data: TCreateOrUpdateStudioForm) => {
    const finalData = {
      capacity: Number(data?.capacity),
      additionalFacilities: data?.additionalFacilities?.join(", "),
      name: data.name,
    } as TCreateOrUpdateStudioValidation;

    mutate(finalData);
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
