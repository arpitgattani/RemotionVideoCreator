import type { TransitionPresentation } from "@remotion/transitions";
import type { TransitionPresentationComponentProps } from "@remotion/transitions";
import React, { useMemo } from "react";

export type WipeDirection =
  | "from-left"
  | "from-top-left"
  | "from-top"
  | "from-top-right"
  | "from-right"
  | "from-bottom-right"
  | "from-bottom"
  | "from-bottom-left";

export type WipeProps = {
  direction?: WipeDirection;
  width: number;
  height: number;
};

const WipePresentation: React.FC<
  TransitionPresentationComponentProps<WipeProps>
> = ({
  children,
  presentationProgress,
  presentationDirection,
  passedProps: { direction = "from-left" },
}) => {
  const progressInDirection =
    presentationDirection === "entering"
      ? presentationProgress
      : 1 - presentationProgress;

  // Create the clip-path for CSS
  const clipPath = useMemo(() => {
    // Generate clip-path polygon values based on direction and progress
    switch (direction) {
      case "from-left":
        if (presentationDirection === "entering") {
          return `polygon(0% 0%, ${progressInDirection * 100}% 0%, ${
            progressInDirection * 100
          }% 100%, 0% 100%)`;
        } else {
          return `polygon(${
            (1 - progressInDirection) * 100
          }% 0%, 100% 0%, 100% 100%, ${(1 - progressInDirection) * 100}% 100%)`;
        }

      case "from-top-left":
        if (presentationDirection === "entering") {
          return `polygon(0% 0%, ${progressInDirection * 200}% 0%, 0% ${
            progressInDirection * 200
          }%)`;
        } else {
          return `polygon(100% 100%, ${
            100 - progressInDirection * 200
          }% 100%, 100% ${100 - progressInDirection * 200}%)`;
        }

      case "from-top":
        if (presentationDirection === "entering") {
          return `polygon(0% 0%, 100% 0%, 100% ${
            progressInDirection * 100
          }%, 0% ${progressInDirection * 100}%)`;
        } else {
          return `polygon(0% ${(1 - progressInDirection) * 100}%, 100% ${
            (1 - progressInDirection) * 100
          }%, 100% 100%, 0% 100%)`;
        }

      case "from-top-right":
        if (presentationDirection === "entering") {
          return `polygon(100% 0%, ${100 - progressInDirection * 200}% 0%, 100% ${
            progressInDirection * 200
          }%)`;
        } else {
          return `polygon(0% 100%, ${
            progressInDirection * 200
          }% 100%, 0% ${100 - progressInDirection * 200}%)`;
        }

      case "from-right":
        if (presentationDirection === "entering") {
          return `polygon(${
            (1 - progressInDirection) * 100
          }% 0%, 100% 0%, 100% 100%, ${(1 - progressInDirection) * 100}% 100%)`;
        } else {
          return `polygon(0% 0%, ${progressInDirection * 100}% 0%, ${
            progressInDirection * 100
          }% 100%, 0% 100%)`;
        }

      case "from-bottom-right":
        if (presentationDirection === "entering") {
          return `polygon(100% 100%, ${
            100 - progressInDirection * 200
          }% 100%, 100% ${100 - progressInDirection * 200}%)`;
        } else {
          return `polygon(0% 0%, ${progressInDirection * 200}% 0%, 0% ${
            progressInDirection * 200
          }%)`;
        }

      case "from-bottom":
        if (presentationDirection === "entering") {
          return `polygon(0% ${(1 - progressInDirection) * 100}%, 100% ${
            (1 - progressInDirection) * 100
          }%, 100% 100%, 0% 100%)`;
        } else {
          return `polygon(0% 0%, 100% 0%, 100% ${
            progressInDirection * 100
          }%, 0% ${progressInDirection * 100}%)`;
        }

      case "from-bottom-left":
        if (presentationDirection === "entering") {
          return `polygon(0% 100%, 0% ${
            100 - progressInDirection * 200
          }%, ${progressInDirection * 200}% 100%)`;
        } else {
          return `polygon(100% 0%, ${
            100 - progressInDirection * 200
          }% 0%, 100% ${progressInDirection * 200}%)`;
        }

      default:
        return "";
    }
  }, [presentationDirection, progressInDirection, direction]);

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        clipPath: clipPath,
      }}
    >
      {children}
    </div>
  );
};

/**
 * A presentation where the entering slide is revealed with a wipe effect.
 */
export const wipe = (props: WipeProps): TransitionPresentation<WipeProps> => {
  return {
    component: WipePresentation,
    props,
  };
};
