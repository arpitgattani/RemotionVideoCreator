import type { TransitionPresentation } from "@remotion/transitions";
import type { TransitionPresentationComponentProps } from "@remotion/transitions";
import React, { useMemo } from "react";
import { Easing, interpolate } from "remotion";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type FadeProps = {};

const FadePresentation: React.FC<
  TransitionPresentationComponentProps<FadeProps>
> = ({ children, presentationProgress, presentationDirection }) => {
  const alpha = useMemo(() => {
    const easedProgress = interpolate(presentationProgress, [0, 1], [0, 1], {
      easing: Easing.inOut(Easing.cubic),
    });

    return presentationDirection === "entering"
      ? easedProgress
      : 1 - easedProgress;
  }, [presentationProgress, presentationDirection]);

  return (
    <div
      style={{
        opacity: alpha,
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
};

export const fade = (): TransitionPresentation<FadeProps> => {
  return {
    component: FadePresentation,
    props: {},
  };
};
