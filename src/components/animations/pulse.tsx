import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { BaseAnimationProps } from "@/types/schema";

export const Pulse = ({
  children,
  animationDuration,
  delay = 0,
}: BaseAnimationProps) => {
  const frame = useCurrentFrame();

  const pulseProgress = interpolate(
    frame,
    [delay, delay + animationDuration * 0.5, delay + animationDuration],
    [1, 1.1, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.4, 0, 0.6, 1),
    },
  );

  const opacity = interpolate(
    frame,
    [delay, delay + animationDuration * 0.2],
    [0.7, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
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
        transform: `scale(${pulseProgress})`,
        transformOrigin: "center",
        opacity,
      }}
    >
      {child}
    </div>
  );
};
