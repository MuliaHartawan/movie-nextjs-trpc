"use client";
import { Page } from "admiral";
import React, { useState } from "react";
import FormMovie from "../../_components/form-movie/form-movie";
import { trpc } from "@/libs/trpc";
import { useParams } from "next/navigation";
import { message } from "antd";
import { transformTRPCError } from "@/utils/error";

const MovieUpdatePage = () => {
  const params = useParams();
  const movieId = typeof params.id === "string" ? params.id : "";
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
  const { mutate, isLoading, error } = trpc.movie.updateMovie.useMutation({
    onSuccess: () => {
      message.success("Success update the movie!");
      setIsLoadingUpdate(false);
    },
    onError: () => {
      message.error("Error occurs when update the data!");
      setIsLoadingUpdate(false);
    },
  });
  const { data, isLoading: isGetMovieLoading } = trpc.movie.getMovie.useQuery(movieId, {
    refetchOnWindowFocus: false,
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
      label: "Update Movie / " + movieId,
      path: "/movie/" + movieId + "/update",
    },
  ];

  const handleOnUpdateMovie = async (dataSubmitted: any) => {
    let imgPath = data?.poster;
    let formData = new FormData();
    setIsLoadingUpdate(true);
    if (dataSubmitted.poster !== undefined) {
      formData.append("file", dataSubmitted.poster.fileList[0].originFileObj);
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
  };

  return (
    <Page title="Movie" breadcrumbs={breadcrumbs}>
      <FormMovie
        error={transformTRPCError(error)}
        loading={isLoadingUpdate}
        formProps={{
          onFinish: handleOnUpdateMovie,
          disabled: isGetMovieLoading,
        }}
        initValues={data}
      />
    </Page>
  );
};

export default MovieUpdatePage;
