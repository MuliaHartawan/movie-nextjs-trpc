"use client";
import React, { useState } from "react";
import { Page } from "admiral";
import FormMovie from "../_components/form-movie/form-movie";
import { TCreateOrUpdateMovieValidation } from "@/server/movie/validations/create-or-update-movie.validation";
import { trpc } from "@/libs/trpc";
import { message } from "antd";

const CreateMoviePage = () => {
  const { mutate, isLoading } = trpc.movie.createMovie.useMutation({
    onSuccess: () => {
      message.success("Success create new movie!");
    },
    onError: () => {
      message.error("Error occurs when creating movie!");
    },
  });

  const breadcrumbs = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Movie",
      path: "/movie",
    },
    {
      label: "Create Movie",
      path: "/movie/create",
    },
  ];

  const handleOnCreateMovie = async (dataSubmitted: any) => {
    let imgPath = "";
    let formData = new FormData();

    if (dataSubmitted.poster?.fileList?.length !== 0) {
      formData.append("file", dataSubmitted.poster.file);
      try {
        const response = await fetch("/api/attachment", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        imgPath = result?.filePath;
      } catch (err) {
        message.error("Error occurs!");
      }

      const finalData = {
        description: dataSubmitted.description,
        duration: Number(dataSubmitted.duration),
        genreIds: dataSubmitted.movieGenres,
        poster: imgPath || "",
        rating: Number(dataSubmitted.rating),
        releaseDate: dataSubmitted.releaseDate.format("YYYY-MM-DD"),
        title: dataSubmitted.title,
      };
      mutate(finalData);
    }
  };

  return (
    <Page title="Movie" breadcrumbs={breadcrumbs}>
      <FormMovie
        error={null}
        loading={isLoading}
        formProps={{
          onFinish: handleOnCreateMovie,
        }}
      />
    </Page>
  );
};

export default CreateMoviePage;
