"use client";
import React from "react";
import { Page, Section } from "admiral";
import { Descriptions } from "antd";
import { useParams } from "next/navigation";
import { trpc } from "@/libs/trpc";
import { transformMinutesToHours } from "../_utils/transform-minute";
import Image from "next/image";

const MovieDetailPage = () => {
  const params = useParams();
  const movieId = typeof params.id === "string" ? params.id : "";
  const { data } = trpc.movie.getMovie.useQuery(movieId);

  const breadcrumbs = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Movie", path: "/movie" },
    { label: data?.id ?? "", path: `/users/${data?.id}` },
  ];
  return (
    <Page title="Movie Details" breadcrumbs={breadcrumbs}>
      <Section loading={false} title="Detail Movie">
        <Descriptions bordered column={2}>
          <Descriptions.Item span={2} label="Poster">
            <Image
              src={data?.poster ?? ""}
              alt="gambar poster"
              width={300}
              height={300}
              style={{
                objectFit: "cover",
              }}
            />
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Title">
            {data?.title}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Description">
            {data?.description}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Release Date">
            {data?.releaseDate?.toDateString()}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Duration">
            {data?.duration} minute || {transformMinutesToHours(data?.duration ?? 0)}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Rating">
            {data?.rating}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Create At">
            {data?.createdAt.toDateString()}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Updated At">
            {data?.updatedAt.toDateString()}
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};

export default MovieDetailPage;
