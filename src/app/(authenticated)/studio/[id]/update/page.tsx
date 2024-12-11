"use client";
import { Page } from "admiral";
import React from "react";
import FormStudio from "../../_components/form-studio";
import { Col, message } from "antd";
import { trpc } from "@/libs/trpc";
import { useParams } from "next/navigation";
import { TCreateOrUpdateStudioValidation } from "@/server/studio/validations/create-or-update-studio.validation";
import { transformTRPCError } from "@/utils/error";
import { TCreateOrUpdateStudioForm } from "../../_types/studio-type";

const UpdateStudioPage = () => {
  const params = useParams();
  const studioId = typeof params.id === "string" ? params.id : "";
  const {
    mutate,
    isLoading: isUpdateMovieLoading,
    error,
  } = trpc.studio.updateStudio.useMutation({
    onSuccess: () => {
      message.success("Success update studio!");
    },
    onError: () => {
      message.error("Error occurs when update studio :(");
    },
  });
  const { data, isLoading: isGetStudioLoading } = trpc.studio.getStudio.useQuery(studioId);

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

  const onUpdateDataSubmit = (data: TCreateOrUpdateStudioForm) => {
    const finalData = {
      capacity: Number(data?.capacity),
      additionalFacilities: data?.additionalFacilities?.join(", "),
      name: data.name,
    } as TCreateOrUpdateStudioValidation;

    mutate({
      value: finalData,
      id: studioId,
    });
  };

  return (
    <Page title="Update Studio" breadcrumbs={breadcrumbs}>
      <Col span={12} style={{ margin: "auto" }}>
        <FormStudio
          loading={isUpdateMovieLoading}
          error={transformTRPCError(error)}
          formProps={{
            onFinish: onUpdateDataSubmit,
            disabled: isGetStudioLoading,
          }}
          initialValues={data ?? undefined}
        />
      </Col>
    </Page>
  );
};

export default UpdateStudioPage;
