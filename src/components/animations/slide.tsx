import React from "react";
import { useVideoConfig, useCurrentFrame, interpolate, Easing } from "remotion";
import { BaseAnimationProps } from "@/types/schema";

export const SlideIn = ({
  children,
  animationDuration,
  direction = "bottom",
  delay = 0,
}: BaseAnimationProps) => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  // Calculate positions based on direction
  let x = 0;
  let y = 0;

  if (direction === "left") {
    x = -width / 2;
  } else if (direction === "right") {
    x = width / 2;
  } else if (direction === "top") {
    y = -height / 2;
  } else if (direction === "bottom") {
    y = height / 2;
  }

  const xPosition = interpolate(
    frame,
    [delay, delay + animationDuration],
    [x, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.circle),
    },
  );

  const yPosition = interpolate(
    frame,
    [delay, delay + animationDuration],
    [y, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.circle),
    },
  );

  const opacity = interpolate(
    frame,
    [delay + animationDuration / 2, delay + animationDuration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.circle),
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
        transform: `translate(${xPosition}px, ${yPosition}px)`,
        opacity,
      }}
    >
      {child}
    </div>
  );
};
