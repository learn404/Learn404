"use server";

import prisma from "@/lib/prisma";
import Mux from "@mux/mux-node";
import { redirect } from "next/navigation";

export async function editLesson(formData: FormData, params: { slug: string }) {
  const title = formData.get("title")?.toString();
  const slug_title = formData
    .get("slug_title")
    ?.toString()
    .replace(/\s+/g, "-");
  const categoryId = formData.get("category")?.toString();
  const about = formData.get("about")?.toString() || undefined;
  const video_url = formData.get("video_url")?.toString() || undefined;
  const repository_url =
    formData.get("repository_url")?.toString() || undefined;
  const draft = formData.get("draft") === "on";
  const newLesson = formData.get("newLesson") === "on";

  const existingLesson = await prisma.lessons.findFirst({
    where: {
      slug: params.slug,
    },
  });

  let assetId: string | undefined;
  let playbackIdFromMux: string | undefined;
  let videoId: string | undefined;
  let duration: undefined | number;

  if (video_url) {
    const mux = new Mux({
      tokenId: process.env.MUX_TOKEN_ID!,
      tokenSecret: process.env.MUX_SECRET_KEY!,
    });

    const asset = await mux.video.assets.create({
      input: [{ url: video_url }],
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

  if (!existingLesson) {
    throw new Error("Le cours n'existe pas");
  }

  const updateData: { [key: string]: any } = {};
  if (title && existingLesson.title !== title) updateData.title = title;
  if (title && existingLesson.slug !== slug_title) updateData.slug = slug_title;
  if (categoryId && existingLesson.categoryId !== categoryId)
    updateData.categoryId = categoryId;
  if (about && existingLesson.description !== about)
    updateData.description = about;
  if (video_url !== "") {
    updateData.playbackId = playbackIdFromMux;
    updateData.duration = durationVideo;
    updateData.videoId = videoId;
  }
  if (repository_url && existingLesson.repository_url !== repository_url)
    updateData.repository_url = repository_url;
  if (existingLesson.draft !== draft) updateData.draft = draft;
  if (existingLesson.newLesson !== newLesson) updateData.newLesson = newLesson;

  if (Object.keys(updateData).length === 0) {
    return redirect("/admin");
  }

    await prisma.lessons.update({
    where: {
      id: existingLesson.id,
    },
    data: updateData,
  });
  redirect("/admin");
}
