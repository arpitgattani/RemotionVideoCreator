import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { BaseAnimationProps } from "@/types/schema";

// Extend BaseAnimationProps to make children optional and add text
interface RotateInProps extends Omit<BaseAnimationProps, "children"> {
  children?: React.ReactNode;
  text?: string;
}

export const RotateIn = ({
  children,
  text: textProp,
  animationDuration,
  direction = "bottom",
  delay = 0,
}: RotateInProps) => {
  const frame = useCurrentFrame();

  // Use the explicit text prop if provided
  let text = textProp || "";

  // Calculate offsets based on direction
  let offsetX = 0;
  let offsetY = 0;
  switch (direction) {
    case "left":
      offsetX = -30;
      break;
    case "right":
      offsetX = 30;
      break;
    case "top":
      offsetY = -30;
      break;
    case "bottom":
      offsetY = 30;
      break;
  }

  // If we have text to animate, create animated spans for each character
  if (text) {
    const characters = text.split("");
    const rotatingChars = characters.map((char, index) => {
      // Stagger the animation for each character
      const charDelay =
        delay + (index * animationDuration) / Math.max(characters.length, 1);

      // Character animation duration (shorter than full animation for snappiness)
      const charDuration = animationDuration / 3;

      // Calculate animation progress for this character
      const progress = interpolate(
        frame,
        [charDelay, charDelay + charDuration],
        [0, 1],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.back(1.5)),
        },
      );

      // Apply transformations based on progress
      const rotation = interpolate(progress, [0, 1], [-45, 0]);
      const translateX = interpolate(progress, [0, 1], [offsetX, 0]);
      const translateY = interpolate(progress, [0, 1], [offsetY, 0]);
      const opacity = interpolate(progress, [0, 0.5, 1], [0, 0.5, 1]);

      return char === " " ? (
        <span
          key={index}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          &nbsp;
        </span>
      ) : (
        <span
          key={index}
          style={{
            display: "inline-block",
            transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotation}deg)`,
            opacity,
          }}
        >
          {char}
        </span>
      );
    });

    return <>{rotatingChars}</>;
  }

  // Just return the children if there's no text to animate
  return <>{children}</>;
};
