import React from "react";
import { useCurrentFrame } from "remotion";
import { BaseAnimationProps } from "@/types/schema";

export const Flash = ({
  children,
  animationDuration,
  delay = 0,
}: BaseAnimationProps) => {
  const frame = useCurrentFrame();

  const minOpacity = 0.3;
  const maxOpacity = 1;
  const flashCount = 5;

  const flashFrequency = (Math.PI * flashCount) / (animationDuration + delay);
  const flashPhase = Math.sin(frame * flashFrequency);

  const normalizedPhase = (flashPhase + 1) / 2;

  const opacity = minOpacity + normalizedPhase * (maxOpacity - minOpacity);

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
