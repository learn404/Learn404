"use server";

import prisma from "@/lib/prisma";
import { getLastSortNumber, lessonCheckExist } from "@/lib/utils";
import Mux from "@mux/mux-node";
import { redirect } from "next/navigation";
import { Lessons_level } from ".prisma/client";

export async function addLesson(nameLesson: string, slugLesson: string, category: string, descriptionLesson: string, videoLesson: string, repositoryLesson: string, draft: boolean, level: string) {
  const last_sort_number = await getLastSortNumber();

  const lessonCheckExist = await prisma.lessons.findFirst({
    where: {
      slug: slugLesson,
    },
  });

  console.log(lessonCheckExist, "lessonCheckExist");

  if (lessonCheckExist) {
    throw new Error("Lesson already exists");
  }


  const sort_number = last_sort_number?.sort_number
    ? last_sort_number?.sort_number + 1
    : 1;

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
      playback_policy: ["public"],
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
    const hours = Math.floor(duration / 3600).toString().padStart(2, "0");
    const minutes = Math.floor((duration % 3600) / 60).toString().padStart(2, "0");
    const seconds = Math.floor(duration % 60).toString().padStart(2, "0");
    durationVideo = `${hours}:${minutes}:${seconds}`;
  }

  await prisma.lessons.create({
    data: {
      title: nameLesson ?? "",
      slug: slugLesson ?? "",
      categoryId: category ?? "",
      description: descriptionLesson ?? "",
      playbackId: playbackIdFromMux ?? "",
      repository_url: repositoryLesson ?? "",
      draft: draft ?? false,
      sort_number: sort_number,
      videoId: videoId,
      duration: durationVideo as string,
      level: level as Lessons_level,
    },
  });

  redirect("/admin");
}