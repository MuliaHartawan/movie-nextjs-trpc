"use client";
import React from "react";
import { Page, Section } from "admiral";
import { Descriptions } from "antd";
import { useParams } from "next/navigation";

const MovieDetailPage = () => {
  const params = useParams();
  const movieId = typeof params.id === "string" ? params.id : "";
  //const userQuery = trpc.user.getUser.useQuery(userId);

  const breadcrumbs = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Movie", path: "/movie" },
    /* { label: userQuery.data?.fullname ?? "", path: `/users/${userQuery.data?.id}` }, */
  ];
  return (
    <Page>
      <Section loading={false} title="Detail Movie">
        <Descriptions bordered column={2}>
          <Descriptions.Item span={2} label="Title">
            {/* {userQuery.data?.fullname} */} Judul Film
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Description">
            {/* {userQuery.data?.fullname} */} Deskripsi
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Release Date">
            {/* {userQuery.data?.email} */} Tanggal Rilis
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Duration">
            {/* {userQuery.data?.address} */} Durasi
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Genre">
            {/* {userQuery.data?.role?.name} */} Genre
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Create At">
            {/* {userQuery.data?.role?.name} */} tanggal dibuat
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Updated At">
            {/* {userQuery.data?.role?.name} */} tanggal diupdate
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Poster">
            {/* {userQuery.data?.role?.name} */} Poster
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};

export default MovieDetailPage;
