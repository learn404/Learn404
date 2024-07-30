"use server";

import prisma from "@/lib/prisma";
import Mux from "@mux/mux-node";
import { redirect } from "next/navigation";


export async function editLesson(
  nameLesson: string,
  slugLesson: string,
  category: string,
  descriptionLesson: string,
  videoLesson: string,
  repositoryLesson: string,
  draft: boolean,
  level: string,
  params: { slug: string },
  links: { label: string; url: string }[],
  contentLesson: string
) {
  const existingLesson = await prisma.lessons.findFirst({
    where: {
      slug: params.slug,
    },
  });

  if (!existingLesson) {
    throw new Error("Le cours n'existe pas");
  }

  let assetId: string | undefined;
  let playbackIdFromMux: string | undefined;
  let videoId: string | undefined;
  let duration: undefined | number;

  if (videoLesson) {
    const mux = new Mux({
      tokenId: process.env.MUX_TOKEN_ID!,
      tokenSecret: process.env.MUX_SECRET_KEY!,
    });

    const asset = await mux.video.assets.create({
      input: [{ url: videoLesson }],
      playback_policy: ["signed"],
      max_resolution_tier: "1080p",
      encoding_tier: "baseline",
    });
    assetId = asset.id;
    if (asset.playback_ids && asset.playback_ids.length > 0) {
      playbackIdFromMux = asset.playback_ids[0].id;
      videoId = assetId;
    } else {
      throw new Error("Failed to create playback ID");
    }

    const waitForAssetReady = async (assetId: string) => {
      while (true) {
        const asset = await mux.video.assets.retrieve(assetId);
        if (asset.status === "ready") {
          return asset;
        }
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    };
    const inputInfo = await waitForAssetReady(assetId);
    duration = inputInfo.duration;
  }

  let durationVideo: string = "00:00:00";
  if (duration) {
    const hours = Math.floor(duration / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((duration % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(duration % 60)
      .toString()
      .padStart(2, "0");
    durationVideo = `${hours}:${minutes}:${seconds}`;
  }

  const updateData: { [key: string]: any } = {};
  if (nameLesson && existingLesson.title !== nameLesson)
    updateData.title = nameLesson;
  if (nameLesson && existingLesson.slug !== slugLesson)
    updateData.slug = slugLesson;
  if (category && existingLesson.categoryId !== category)
    updateData.categoryId = category;
  if (descriptionLesson && existingLesson.description !== descriptionLesson)
    updateData.description = descriptionLesson;
  if (videoLesson !== "") {
    updateData.playbackId = playbackIdFromMux;
    updateData.duration = durationVideo;
    updateData.videoId = videoId;
  }
  if (repositoryLesson && existingLesson.repository_url !== repositoryLesson)
    updateData.repository_url = repositoryLesson;
  if (existingLesson.draft !== draft) updateData.draft = draft;
  if (level && existingLesson.level !== level) updateData.level = level;
  if (contentLesson !== "") {
    console.log("Updating contentLesson with:", contentLesson);
    updateData.contentLesson = contentLesson;
  }
  if (links && JSON.stringify(existingLesson.links) !== JSON.stringify(links))
    if (links && links[0].url !== "" && links[0].label !== "") {
      const existingLinks = existingLesson.links ? JSON.parse(existingLesson.links) : [];
      const updatedLinks = [...existingLinks, ...links];
      updateData.links = JSON.stringify(updatedLinks);
    }

  await prisma.lessons.update({
    where: {
      id: existingLesson.id,
    },
    data: updateData,
  });

  redirect("/admin");
}
