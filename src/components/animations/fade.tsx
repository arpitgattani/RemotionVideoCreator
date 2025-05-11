import React, { useMemo } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { BaseAnimationProps } from "@/types/schema";

export const FadeIn: React.FC<BaseAnimationProps> = ({
  children,
  animationDuration,
}) => {
  const frame = useCurrentFrame();

  const opacity = useMemo(() => {
    return interpolate(frame, [0, animationDuration], [0, 1], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    });
  }, [frame, animationDuration]);

  if (!children) {
    return null;
  }

  const child = React.Children.only(children);

  return (
    <div
      style={{ opacity, position: "absolute", width: "100%", height: "100%" }}
    >
      {child}
    </div>
  );
};
