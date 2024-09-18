"use client";

import { Page } from "admiral";
import { Col, Row } from "antd";
import dayjs from "dayjs";
import { ReactElement } from "react";
import { FormSnack } from "../../_components/form-snack";
import { useUpdateSnackMutation } from "./_hooks/use-update-snack-mutation";
import { TCreateOrUpdateSnackValidation } from "@/server/snack/validations/create-or-update-snack.validation";
import { useParams } from "next/navigation";
import { useSnackQuery } from "../_hooks/use-snack-query";

const UpdateSnackPage = (): ReactElement => {
  const params = useParams();
  const snackId = typeof params.id === "string" ? params.id : "";
  const updateSnackMutation = useUpdateSnackMutation();

  const snackQuery = useSnackQuery(snackId);

  const handleOnFinish = (data: TCreateOrUpdateSnackValidation) =>
    updateSnackMutation.mutate({ value: data, id: snackId });

  const initialValues = snackQuery.data && {
    ...snackQuery.data,
    expiryDate: dayjs(snackQuery.data.expiryDate),
  };

  const breadcrumbs = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Snacks",
      path: "/snacks",
    },
  ];

  return (
    <Page title="Update Snack" breadcrumbs={breadcrumbs}>
      <Row>
        <Col span={12} style={{ margin: "auto" }}>
          <FormSnack
            formProps={{ onFinish: handleOnFinish, initialValues, disabled: snackQuery.isLoading }}
            error={updateSnackMutation.error}
            loading={updateSnackMutation.isPending}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default UpdateSnackPage;
