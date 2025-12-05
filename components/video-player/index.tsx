import React from "react";

import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

type VideoPlayerProps = {
  videoUrl: string;
  className?: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, className, ...rest }) => {
  if (!videoUrl) return null;

  return (
    <div
      className={cn(
        "h-[16rem] min-h-[16rem] md:h-[20rem] md:min-h-[20rem] lg:h-[24rem] lg:min-h-[24rem] flex-1 flex flex-col rounded-xl overflow-hidden",
        className
      )}
    >
      <ReactPlayer
        width="100%"
        height="100%"
        className="w-full h-full flex-1"
        src={videoUrl}
        controls={true}
        playing={false}
        muted={false}
        loop={false}
        playbackRate={1}
        light={false}
        pip={true}
        {...rest}
      />
    </div>
  );
};

export default VideoPlayer;

