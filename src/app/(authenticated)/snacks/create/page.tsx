"use client";

import { Page } from "admiral";
import { Col, Row } from "antd";
import { ReactElement } from "react";
import { FormSnack } from "../_components/form-snack";
import { TCreateOrUpdateSnackValidation } from "@/server/snack/validations/create-or-update-snack.validation";
import { useCreateSnackMutation } from "./_hooks/use-create-snack-mutation";

const CreateSnackPage = (): ReactElement => {
  const updateSnackMutation = useCreateSnackMutation();

  const handleOnFinish = (data: TCreateOrUpdateSnackValidation) => updateSnackMutation.mutate(data);

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
    <Page title="Add Snack" breadcrumbs={breadcrumbs}>
      <Row>
        <Col span={12} style={{ margin: "auto" }}>
          <FormSnack
            formProps={{ onFinish: handleOnFinish }}
            error={updateSnackMutation.error}
            loading={updateSnackMutation.isPending}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default CreateSnackPage;
