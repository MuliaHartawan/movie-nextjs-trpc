"use client";
import React, { useState } from "react";
import { Page } from "admiral";
import FormMovie from "../_components/form-movie/form-movie";
import { TCreateOrUpdateMovieValidation } from "@/server/movie/validations/create-or-update-movie.validation";
import { trpc } from "@/libs/trpc";
import { message } from "antd";
import { TMovieCreateOrUpdateForm } from "../_types/movie-type";

const CreateMoviePage = () => {
  const [isCreateLoading, setIsCreateLoading] = useState<boolean>(false);
  const { mutate, isLoading } = trpc.movie.createMovie.useMutation({
    onSuccess: () => {
      message.success("Success create new movie!");
      setIsCreateLoading(false);
    },
    onError: () => {
      message.error("Error occurs when creating movie!");
      setIsCreateLoading(false);
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

  const handleOnCreateMovie = async (dataSubmitted: TMovieCreateOrUpdateForm) => {
    setIsCreateLoading(true);
    let imgPath = "";
    let formData = new FormData();
    formData.append("file", dataSubmitted.poster.fileList[0].originFileObj);
    try {
      const response = await fetch("/api/attachment", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      imgPath = result?.filePath;

      const finalData = {
        description: dataSubmitted.description,
        duration: Number(dataSubmitted.duration),
        genreIds: dataSubmitted.movieGenres,
        poster: imgPath || "",
        rating: Number(dataSubmitted.rating),
        releaseDate: dataSubmitted.releaseDate.format("YYYY-MM-DD"),
        title: dataSubmitted.title,
      } as TCreateOrUpdateMovieValidation;

      mutate(finalData);
    } catch (err) {
      message.error("Error occurs!");
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
