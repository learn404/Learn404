"use client";
import { useEffect, useRef, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";

interface VideoPlayerWithChaptersProps {
  playbackId: string;
  videoId: string;
  videoTitle: string;
  userId: string;
  lessonId: string;
  lessonProgress: any;
  chapters: any;
}

const VideoPlayerWithChapters: React.FC<VideoPlayerWithChaptersProps> = ({
  playbackId,
  videoId,
  videoTitle,
  chapters,
  userId,
  lessonId,
  lessonProgress,

}) => {
  const muxPlayerRef = useRef<any>(null);
  const [watchedTime, setWatchedTime] = useState(0);
  const [hasWatchedOneMinute, setHasWatchedOneMinute] = useState(
    lessonProgress ? true : false);


  useEffect(() => {
    const muxPlayerEl = muxPlayerRef.current;

    const addChaptersToPlayer = () => {
      if (muxPlayerEl && chapters) {
        const formattedChapters = chapters.map((chapter: any) => ({
          startTime: chapter.start,
          value: chapter.name,
        }));
        muxPlayerEl.addChapters(formattedChapters);
      }
    };

    if (muxPlayerEl?.readyState >= 1) {
      addChaptersToPlayer();
    } else {
      muxPlayerEl?.addEventListener("loadedmetadata", addChaptersToPlayer, {
        once: true,
      });
    }

    const handleChapterChange = () => {
      console.log(muxPlayerEl?.activeChapter);
      console.log(muxPlayerEl?.chapters);
    };

    muxPlayerEl?.addEventListener("chapterchange", handleChapterChange);

    const handleTimeUpdate = () => {
      if (muxPlayerEl) {
        setWatchedTime((prevTime) => prevTime + muxPlayerEl.currentTime - prevTime);
      }
    };

    muxPlayerEl?.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      muxPlayerEl?.removeEventListener("chapterchange", handleChapterChange);
      muxPlayerEl?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [chapters]);

  useEffect(() => {
    if (watchedTime >= 60 && !hasWatchedOneMinute) {
      setHasWatchedOneMinute(true);
      const updateProgress = async () => {
        const response = await fetch("/api/user/progress-lesson", {
          method: "POST",
        body: JSON.stringify({
          userId: userId,
          lessonId: lessonId,
          hasWatchedOneMinute: true,
        }),
        });
        console.log("User has watched at least one minute of video.");
        const data = await response.json();
        console.log(data);
      };
      updateProgress();
    }
  }, [watchedTime, hasWatchedOneMinute]);

  return (
    <MuxPlayer
      ref={muxPlayerRef}
      stream-type="on-demand"
      autoPlay={false}
      max-resolution="1080p"
      preload="false"
      playbackId={playbackId}
      accentColor="#fefefe"
      metadata={{
        video_id: videoId,
        video_title: videoTitle,
      }}
    />
  );
};

export default VideoPlayerWithChapters;