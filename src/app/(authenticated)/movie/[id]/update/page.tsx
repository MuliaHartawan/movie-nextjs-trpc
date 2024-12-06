"use client";
import { Page } from "admiral";
import React, { useEffect, useState } from "react";
import FormMovie from "../../_components/form-movie/form-movie";
import { trpc } from "@/libs/trpc";
import { useParams } from "next/navigation";
import { message } from "antd";
import dayjs from "dayjs";
import { TCreateOrUpdateMovieValidation } from "@/server/movie/validations/create-or-update-movie.validation";

const MovieUpdatePage = () => {
  const params = useParams();
  const movieId = typeof params.id === "string" ? params.id : "";
  const { mutate, isLoading } = trpc.movie.updateMovie.useMutation({
    onSuccess: () => {
      message.success("Success update the movie!");
    },
    onError: () => {
      message.error("Error occurs when update the data!");
    },
  });
  const { data, isLoading: isGetMovieLoading } = trpc.movie.getMovie.useQuery(movieId);
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

  const handleOnCreateMovie = async (dataSubmitted: any) => {
    let imgPath = data?.poster;

    let formData = new FormData();
    if (file) {
      formData.append("file", file);
      try {
        const response = await fetch("/api/attachment", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        imgPath = result?.filePath;
      } catch (err) {
        console.log(err);
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

      mutate({
        value: finalData,
        id: movieId,
      });
    }
  };
  return (
    <Page title="Movie" breadcrumbs={breadcrumbs}>
      <FormMovie
        error={null}
        loading={isLoading}
        formProps={{
          onFinish: handleOnCreateMovie,
          disabled: isGetMovieLoading,
        }}
        onFileChange={handleFileChange}
        initValues={data}
      />
    </Page>
  );
};

export default MovieUpdatePage;
