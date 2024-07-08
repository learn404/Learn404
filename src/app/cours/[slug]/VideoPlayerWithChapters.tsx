"use client";
import { useEffect, useRef } from "react";
import MuxPlayer from "@mux/mux-player-react";

interface VideoPlayerWithChaptersProps {
  playbackId: string;
  videoId: string;
  videoTitle: string;
  chapters: any;
}

const VideoPlayerWithChapters: React.FC<VideoPlayerWithChaptersProps> = ({
  playbackId,
  videoId,
  videoTitle,
  chapters,
}) => {
  console.log(chapters, 'chapters');
  const muxPlayerRef = useRef<any>(null);

  

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

    return () => {
      muxPlayerEl?.removeEventListener("chapterchange", handleChapterChange);
    };
  }, [chapters]);

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
