"use client";

import { Player } from "@remotion/player";
import type { NextPage } from "next";
import { VIDEO_FPS } from "../types/constants";
import CanvasComponent, {
  FRAME_DURATION_IN_FRAMES,
} from "@/components/canvas/canvas-component";
import Sidebar from "@/components/sidebar";
import { useAtomValue } from "jotai";
import { appAtom, aspectRatioLookupAtom } from "@/stores/app.store";
import { useMemo } from "react";

const Home: NextPage = () => {
  const aspectRatio = useAtomValue(aspectRatioLookupAtom);
  const isLandscape = aspectRatio.width > aspectRatio.height;
  const inputProps = useAtomValue(appAtom);

  const durationInFrames = useMemo(() => {
    const items = inputProps.items;
    if (!items || items.length === 0) return 0;

    let totalDuration = items[0].duration || FRAME_DURATION_IN_FRAMES;

    for (let i = 1; i < items.length; i++) {
      const prevFrame = items[i - 1];
      const currentFrame = items[i];
      const transitionDuration = prevFrame.media.transitionConfig
        ? prevFrame.media.transitionConfig.duration || 0
        : 0;

      // For each frame: add its duration but subtract the transition overlap
      const frameDuration = currentFrame.duration || FRAME_DURATION_IN_FRAMES;
      totalDuration += frameDuration - transitionDuration;
    }

    return totalDuration;
  }, [inputProps.items]);

  console.log(aspectRatio, "ASPECT RATIO");

  return (
    <div className="flex flex-1 flex-row bg-gray-50 ">
      <div className="flex flex-1 flex-col h-full items-center justify-center p-12">
        <Player
          component={CanvasComponent}
          inputProps={inputProps}
          durationInFrames={durationInFrames}
          fps={VIDEO_FPS}
          compositionHeight={aspectRatio.height}
          compositionWidth={aspectRatio.width}
          style={{
            aspectRatio: `${aspectRatio.width / aspectRatio.height}`,
            ...(isLandscape
              ? {
                  width: "100%",
                }
              : {
                  height: "100%",
                }),
          }}
          controls
          autoPlay
          loop
        />
      </div>
      <Sidebar />
    </div>
  );
};

export default Home;
