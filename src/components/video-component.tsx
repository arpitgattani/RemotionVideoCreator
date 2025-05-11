import React from "react";
import { AbsoluteFill, Video } from "remotion";

type VideoComponentProps = {
  url: string;
  volume?: number;
  muted?: boolean;
  startFrame?: number;
  endFrame?: number;
};

const VideoComponent = ({
  url,
  volume,
  muted,
  startFrame,
  endFrame,
}: VideoComponentProps) => {
  if (!url) return null;
  return (
    <AbsoluteFill>
      <Video
        src={url}
        startFrom={startFrame}
        endAt={endFrame}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
        }}
        volume={volume}
        muted={muted}
      />
    </AbsoluteFill>
  );
};

export default VideoComponent;
