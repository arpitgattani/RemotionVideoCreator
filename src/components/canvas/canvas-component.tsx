"use client";
import React, { useState, useEffect } from "react";
import { AppState } from "@/types/schema";
import BackgroundImageComponent from "../../components/background-image-component";
import FreeImageComponent from "../../components/free-image-component";
import {
  Audio,
  continueRender,
  delayRender,
  prefetch,
  useVideoConfig,
  getRemotionEnvironment,
} from "remotion";
import TextComponent from "../text-component";
import VideoComponent from "../video-component";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { wipe } from "../transitions/wipe";
import { fade } from "../transitions/fade";
import { slide } from "../transitions/slide";
import { SlideDirection, WipeDirection } from "@/types/schema";
import { LoadFonts } from "@/contexts/load-fonts";

export const FRAME_DURATION_IN_FRAMES = 100;
export const DEFAULT_TRANSITION_DURATION_IN_FRAMES = 30;

const CanvasComponent: React.FC<AppState> = ({
  items,
  musicUrl,
  musicStartFrame,
  musicEndFrame,
}) => {
  const { width, height } = useVideoConfig();
  const [handle] = useState(() => delayRender());

  // Collect all unique URLs from items that we'll need to prefetch
  useEffect(() => {
    const freePromises: (() => void)[] = [];

    const prefetchAllMedia = async () => {
      const waitUntilDones: Promise<string>[] = [];

      // Prefetch background media
      items.forEach((item) => {
        if (!item.media.url) return;
        const { waitUntilDone, free } = prefetch(item.media.url, {
          contentType: item.media.type === "video" ? "video/mp4" : "image/jpeg",
          credentials: "include",
        });
        waitUntilDones.push(waitUntilDone());
        freePromises.push(free);

        // Prefetch free images
        item.nodes.forEach((node) => {
          if (node.type === "image" && node.url) {
            const { waitUntilDone, free } = prefetch(node.url, {
              contentType: "image/jpeg",
              credentials: "include",
            });
            waitUntilDones.push(waitUntilDone());
            freePromises.push(free);
          }
        });
      });

      // Wait for all prefetch and texture loading to complete
      await Promise.all([Promise.all(waitUntilDones)]);

      continueRender(handle);
      console.log("Prefetched all media and loaded all textures");
    };

    if (getRemotionEnvironment().isRendering) {
      prefetchAllMedia();
    }

    return () => {
      freePromises.forEach((free) => free());
      // Clean up textures
    };
  }, [handle, items]);

  const getTransition = (transitionType: string, index: number) => {
    const currentFrame = items[index];

    const transitionConfig = currentFrame.media.transitionConfig;

    switch (transitionType) {
      case "wipe": {
        const direction = (
          transitionConfig?.type === "wipe"
            ? transitionConfig.direction
            : "from-left"
        ) as WipeDirection;

        return wipe({
          direction,
          width,
          height,
        });
      }
      case "slide": {
        const direction = (
          transitionConfig?.type === "slide"
            ? transitionConfig.direction
            : "from-left"
        ) as SlideDirection;

        return slide({
          direction,
          width,
          height,
        });
      }
      case "fade":
      default:
        return fade();
    }
  };

  return (
    <LoadFonts>
      <div className="flex flex-1 flex-row items-center justify-center h-full w-full bg-green-400">
        <TransitionSeries layout="none">
          {items.map((frame, frameIndex) => {
            return (
              <React.Fragment key={frame.id}>
                <TransitionSeries.Sequence
                  key={frame.id}
                  durationInFrames={frame.duration || FRAME_DURATION_IN_FRAMES}
                  layout="none"
                >
                  {frame.media.type === "image" ? (
                    <BackgroundImageComponent url={frame.media.url} />
                  ) : (
                    <VideoComponent
                      url={frame.media.url}
                      volume={frame.media.volume}
                      muted={frame.media.muted}
                      startFrame={
                        frame.media.type === "video"
                          ? frame.media.startFrame
                          : undefined
                      }
                      endFrame={
                        frame.media.type === "video"
                          ? frame.media.endFrame
                          : undefined
                      }
                    />
                  )}

                  {/* Render nodes (text and image elements) */}
                  {frame.nodes.map((node) =>
                    node.type === "text" ? (
                      <TextComponent key={node.id} {...node} />
                    ) : node.type === "image" ? (
                      <FreeImageComponent key={node.id} {...node} />
                    ) : null,
                  )}
                </TransitionSeries.Sequence>
                {frameIndex !== items.length - 1 &&
                  frame.media.transitionConfig && (
                    <TransitionSeries.Transition
                      timing={linearTiming({
                        durationInFrames:
                          frame.media.transitionConfig?.duration ||
                          DEFAULT_TRANSITION_DURATION_IN_FRAMES,
                      })}
                      // @ts-expect-error - TransitionSeries.Transition accepts different transition types
                      presentation={getTransition(
                        frame.media.transitionConfig?.type || "fade",
                        frameIndex,
                      )}
                    />
                  )}
              </React.Fragment>
            );
          })}
        </TransitionSeries>
        <div className="absolute inset-0 opacity-0 pointer-events-none">
          {musicUrl && (
            <Audio
              src={musicUrl}
              startFrom={musicStartFrame}
              endAt={musicEndFrame}
            />
          )}
        </div>
      </div>
    </LoadFonts>
  );
};

export default CanvasComponent;
