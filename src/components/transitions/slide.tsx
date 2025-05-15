import type { TransitionPresentation } from "@remotion/transitions";
import type { TransitionPresentationComponentProps } from "@remotion/transitions";
import React, { useMemo } from "react";

export type SlideDirection =
  | "from-left"
  | "from-top"
  | "from-right"
  | "from-bottom";

export type SlideProps = {
  direction?: SlideDirection;
  width: number;
  height: number;
};

const SlidePresentation: React.FC<
  TransitionPresentationComponentProps<SlideProps>
> = ({
  children,
  presentationProgress,
  presentationDirection,
  passedProps: { direction = "from-left", width, height },
}) => {
  const positionProps = useMemo(() => {
    let x = 0;
    let y = 0;

    if (presentationDirection === "exiting") {
      switch (direction) {
        case "from-left":
          x = width * presentationProgress;
          break;
        case "from-right":
          x = -width * presentationProgress;
          break;
        case "from-top":
          y = height * presentationProgress;
          break;
        case "from-bottom":
          y = -height * presentationProgress;
          break;
      }
    } else {
      // Entering
      switch (direction) {
        case "from-left":
          x = -width * (1 - presentationProgress);
          break;
        case "from-right":
          x = width * (1 - presentationProgress);
          break;
        case "from-top":
          y = -height * (1 - presentationProgress);
          break;
        case "from-bottom":
          y = height * (1 - presentationProgress);
          break;
      }
    }

    return { x, y };
  }, [presentationDirection, presentationProgress, direction, width, height]);

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        transform: `translate(${positionProps.x}px, ${positionProps.y}px)`,
      }}
    >
      {children}
    </div>
  );
};

/**
 * Implements a sliding transition for DOM elements
 * where the entering slide pushes the outgoing slide in a specified direction.
 */
export const slide = (
  props: SlideProps,
): TransitionPresentation<SlideProps> => {
  return {
    component: SlidePresentation,
    props,
  };
};
