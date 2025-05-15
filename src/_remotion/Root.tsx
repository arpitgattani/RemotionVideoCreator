import { Composition } from "remotion";
import {
  calculateDimensions,
  COMPOSITION_ID,
  DEFAULT_APP_STATE,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../types/constants";
import CanvasComponent, {
  FRAME_DURATION_IN_FRAMES,
} from "@/components/canvas/canvas-component";
import { AppStateSchema } from "@/types/schema";
import { TRAVEL_TEMPLATE } from "@/templates/travel";
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id={COMPOSITION_ID}
        component={CanvasComponent}
        calculateMetadata={async ({ props }) => {
          const items = props.items;
          if (!items || items.length === 0) return { durationInFrames: 0 };

          let totalDuration = items[0].duration || FRAME_DURATION_IN_FRAMES;

          for (let i = 1; i < items.length; i++) {
            const prevFrame = items[i - 1];
            const currentFrame = items[i];
            const transitionDuration = prevFrame.media.transitionConfig
              ? prevFrame.media.transitionConfig.duration || 0
              : 0;

            // For each frame: add its duration but subtract the transition overlap
            const frameDuration =
              currentFrame.duration || FRAME_DURATION_IN_FRAMES;
            totalDuration += frameDuration - transitionDuration;
          }

          // Use the new calculateDimensions function to get dimensions based on both aspectRatio and resolution
          const dimensions = calculateDimensions(
            props.aspectRatio,
            props.resolution,
          );

          return {
            durationInFrames: totalDuration,
            width: dimensions.width,
            height: dimensions.height,
          };
        }}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={DEFAULT_APP_STATE}
        schema={AppStateSchema}
      />

      <Composition
        id={"template1"}
        component={CanvasComponent}
        calculateMetadata={async ({ props }) => {
          const items = props.items;
          if (!items || items.length === 0) return { durationInFrames: 0 };

          let totalDuration = items[0].duration || FRAME_DURATION_IN_FRAMES;

          for (let i = 1; i < items.length; i++) {
            const prevFrame = items[i - 1];
            const currentFrame = items[i];
            const transitionDuration = prevFrame.media.transitionConfig
              ? prevFrame.media.transitionConfig.duration || 0
              : 0;

            // For each frame: add its duration but subtract the transition overlap
            const frameDuration =
              currentFrame.duration || FRAME_DURATION_IN_FRAMES;
            totalDuration += frameDuration - transitionDuration;
          }

          // Use the new calculateDimensions function to get dimensions based on both aspectRatio and resolution
          const dimensions = calculateDimensions(
            props.aspectRatio,
            props.resolution,
          );

          return {
            durationInFrames: totalDuration,
            width: dimensions.width,
            height: dimensions.height,
          };
        }}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={TRAVEL_TEMPLATE}
        schema={AppStateSchema}
      />
    </>
  );
};
