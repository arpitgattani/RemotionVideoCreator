import { interpolate, spring } from "remotion";
// import { Color, Font } from '@/types/schema'

export const interpolateSpring = (
  spring: number,
  outputRange: readonly number[],
) =>
  interpolate(spring, [0, 1], outputRange, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

// Just a spring function with a better config and no need to pass the FPS.
const config = { damping: 13, mass: 0.6, stiffness: 65 };
export const defaultSpring = (props: {
  frame: number;
  delay?: number;
  config?: typeof config;
  durationInFrames?: number;
  from?: number;
  to?: number;
}) => spring({ fps: 30, config, ...props });

export const typedObjectKeys = <T extends object>(object: T) => {
  return Object.keys(object) as (keyof T)[];
};
