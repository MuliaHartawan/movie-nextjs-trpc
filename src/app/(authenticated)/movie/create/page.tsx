"use client";
import React from "react";
import { Page } from "admiral";
import FormMovie from "../_components/form-movie/form-movie";

const CreateMoviePage = () => {
  const breadcrumbs = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Movie",
      path: "/movie",
    },
  ];

  const handleOnCreateMovie = (data: any) => {
    const submittedData = {
      ...data,
      releaseDate: data["releaseDate"].format("YYYY-MM-DD"),
    };
    console.log(submittedData);
  };

  return (
    <Page title="Movie" breadcrumbs={breadcrumbs}>
      <FormMovie
        error={null}
        loading={false}
        formProps={{
          onFinish: handleOnCreateMovie,
        }}
      />
    </Page>
  );
};

export default CreateMoviePage;
