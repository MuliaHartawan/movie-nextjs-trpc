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
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (uploadedFile: File | null) => {
    setFile(uploadedFile);
  };

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

  const handleOnCreateMovie = async (data: any) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await fetch("/api/attachment", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        mutate({
          poster: result.filePath,
          duration: Number(data.duration),
          rating: Number(data.rating),
          genreIds: data.movieGenre,
          releaseDate: data.releaseDate.format("YYYY-MM-DD"),
          title: data.title,
          description: data.description,
        });
      } catch (err) {
        console.log(err);
      }
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
        onFileChange={handleFileChange}
      />
    </Page>
  );
};

export default CreateMoviePage;
