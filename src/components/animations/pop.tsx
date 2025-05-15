import React from "react";
import { useCurrentFrame, interpolate, Easing, useVideoConfig } from "remotion";
import { BaseAnimationProps } from "@/types/schema";
import { RESOLUTION_HEIGHTS } from "@/types/constants";

// Base resolution used as reference for scaling
const BASE_RESOLUTION_HEIGHT = RESOLUTION_HEIGHTS["1080p"];

// Hook to calculate scaling factor based on current video config
const useScaleFactor = () => {
  const { height } = useVideoConfig();
  return height / BASE_RESOLUTION_HEIGHT;
};

export const Pop = ({
  children,
  animationDuration,
  delay = 0,
}: BaseAnimationProps) => {
  const frame = useCurrentFrame();
  const scaleFactor = useScaleFactor();

  // Scale initial scale based on resolution
  const baseInitialScale = 0.2;
  const initialScale = baseInitialScale * scaleFactor;
  const popDuration = animationDuration * 0.3;

  const scaleValue = interpolate(
    frame,
    [
      delay,
      delay + popDuration * 0.6,
      delay + popDuration,
      delay + animationDuration,
    ],
    [initialScale, 1.05, 1, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    },
  );

  if (!children) {
    return null;
  }

  const child = React.Children.only(children);

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        transform: `scale(${scaleValue})`,
        transformOrigin: "center",
      }}
    >
      {child}
    </div>
  );
};
