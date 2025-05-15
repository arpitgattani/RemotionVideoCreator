import React from "react";
import { useVideoConfig, useCurrentFrame, interpolate, Easing } from "remotion";
import { BaseAnimationProps } from "@/types/schema";

export const Bounce = ({
  children,
  animationDuration,
  direction = "bottom",
  delay = 0,
}: BaseAnimationProps) => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  // Calculate starting positions based on direction
  let startX = 0;
  let startY = 0;

  if (direction === "left") {
    startX = -width * 0.7;
  } else if (direction === "right") {
    startX = width * 0.7;
  } else if (direction === "top") {
    startY = -height * 0.7;
  } else if (direction === "bottom") {
    startY = height * 0.7;
  }

  // Create a bounce animation
  const progress = interpolate(
    frame,
    [delay, delay + animationDuration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bounce,
    },
  );

  // Apply the effect: start from position and move toward 0 with bounce
  const xPosition = startX * (1 - progress);
  const yPosition = startY * (1 - progress);

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
        transform: `translate(${xPosition}px, ${yPosition}px)`,
      }}
    >
      {child}
    </div>
  );
};
