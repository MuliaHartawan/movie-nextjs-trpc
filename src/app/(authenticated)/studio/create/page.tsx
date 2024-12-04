"use client";
import { Page } from "admiral";
import { Col, Row } from "antd";
import React from "react";
import FormStudio from "../_components/form-studio";

const CreateStudioPage = () => {
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

  const handleOnFinish = (data: any) => {
    console.log(data);
  };
  return (
    <Page title="Add Studio" breadcrumbs={breadcrumbs}>
      <Col span={12} style={{ margin: "auto" }}>
        <FormStudio formProps={{ onFinish: handleOnFinish }} error={null} loading={false} />
      </Col>
    </Page>
  );
};

export default CreateStudioPage;
