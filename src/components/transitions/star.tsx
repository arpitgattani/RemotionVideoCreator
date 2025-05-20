import type { TransitionPresentation } from "@remotion/transitions";
import type { TransitionPresentationComponentProps } from "@remotion/transitions";
import React from "react";
import { Container, Graphics } from "pixi.js";

type CustomPresentationProps = {
  width: number;
  height: number;
};

const StarPresentation: React.FC<
  TransitionPresentationComponentProps<CustomPresentationProps>
> = ({
  children,
  presentationDirection,
  presentationProgress,
  passedProps,
}) => {
  const radius = Math.sqrt(passedProps.width ** 2 + passedProps.height ** 2);
  const mask =
    presentationDirection === "exiting"
      ? null
      : (new Graphics()
          .star(
            passedProps.width / 2,
            passedProps.height / 2,
            5,
            radius * presentationProgress,
          )
          .fill("yellow") as Container);

  return (
    <pixiContainer
      mask={mask}
      setMask={(options) => {
        options.inverse = true;
      }}
    >
      {children}
    </pixiContainer>
  );
};

export const customPresentation = (
  props: CustomPresentationProps,
): TransitionPresentation<CustomPresentationProps> => {
  return { component: StarPresentation, props };
};
