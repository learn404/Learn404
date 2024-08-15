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
  token: string;
}

const VideoPlayerWithChapters: React.FC<VideoPlayerWithChaptersProps> = ({
  playbackId,
  videoId,
  videoTitle,
  chapters,
  userId,
  lessonId,
  lessonProgress,
  token,
}) => {
  const muxPlayerRef = useRef<any>(null);
  const [watchedTime, setWatchedTime] = useState(0);
  const [hasWatchedOneMinute, setHasWatchedOneMinute] = useState(
    lessonProgress ? true : false
  );

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
        setWatchedTime(
          (prevTime) => prevTime + muxPlayerEl.currentTime - prevTime
        );
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
    <div className="mx-auto max-w-7xl py-2 lg:px-6 lg:py-4">
      <div className="relative aspect-video">
        <div className="group absolute z-20 flex h-full w-full items-center justify-center">
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
          tokens={{playback: token}}
        />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerWithChapters;
