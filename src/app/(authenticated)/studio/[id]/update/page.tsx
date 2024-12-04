"use client";
import { Page } from "admiral";
import React from "react";
import FormStudio from "../../_components/form-studio";
import { Col } from "antd";

const UpdateStudioPage = () => {
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
  const onUpdateDataSubmit = () => {};
  return (
    <Page title="Update Studio" breadcrumbs={breadcrumbs}>
      <Col span={12} style={{ margin: "auto" }}>
        <FormStudio
          loading={false}
          error={null}
          formProps={{
            onFinish: onUpdateDataSubmit,
          }}
        />
      </Col>
    </Page>
  );
};

export default UpdateStudioPage;
