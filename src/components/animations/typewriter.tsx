import React from "react";
import { useCurrentFrame } from "remotion";
import { BaseAnimationProps } from "@/types/schema";

export const Typewriter = ({
  children,
  animationDuration,
  delay = 0,
}: BaseAnimationProps) => {
  const frame = useCurrentFrame();

  if (!children) {
    return null;
  }

  const child = React.Children.only(children) as React.ReactElement;
  const childProps = child.props as Record<string, unknown>;

  let text = "";
  if (childProps.text) {
    text = String(childProps.text);
  } else if (
    child.type === "div" ||
    child.type === "span" ||
    child.type === "p"
  ) {
    // Get text from DOM elements
    text = String(childProps.children || "");
  } else {
    for (const key in childProps) {
      const prop = childProps[key];
      if (prop && typeof prop === "object" && "text" in prop) {
        text = String((prop as { text: unknown }).text);
        break;
      }
    }
  }

  const totalChars = text.length;

  const animationProgress = Math.min(1, (frame - delay) / animationDuration);
  const charsToShow = Math.floor(totalChars * animationProgress);
  const partialText = text.substring(0, charsToShow);

  console.log(charsToShow, "CHARS TO SHOW");

  const newProps = {
    ...childProps,
    text: partialText,
  };

  return React.cloneElement(child, newProps);
};
