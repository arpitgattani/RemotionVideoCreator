import React, { useMemo } from "react";
import { Img, useVideoConfig } from "remotion";
import { FreeImageProps } from "@/types/schema";
import { SlideIn } from "./animations/slide";
import { Bounce } from "./animations/bounce";
import { Pulse } from "./animations/pulse";
import { Flash } from "./animations/flash";
import { Pop } from "./animations/pop";
import { FadeIn } from "./animations/fade";
import { RESOLUTION_HEIGHTS } from "@/types/constants";
import { Gif, GifFillMode } from "@remotion/gif";

const BASE_RESOLUTION_HEIGHT = RESOLUTION_HEIGHTS["1080p"];

const useScaleFactor = () => {
  const { height } = useVideoConfig();
  return height / BASE_RESOLUTION_HEIGHT;
};

const FreeImageComponent: React.FC<FreeImageProps> = ({
  url,
  x = 0,
  y = 0,
  width,
  height,
  opacity = 1,
  rotation = 0,
  scale = 1,
  objectFit = "cover",
  cornerRadius = 0,
  animationConfig,
  dropShadow,
  border,
}) => {
  const scaleFactor = useScaleFactor();

  // Scale coordinates and dimensions based on the video resolution
  const scaledX = x * scaleFactor;
  const scaledY = y * scaleFactor;
  const scaledWidth = width ? width * scaleFactor : undefined;
  const scaledHeight = height ? height * scaleFactor : undefined;
  const scaledCornerRadius = cornerRadius * scaleFactor;

  // Compute shadow style if enabled
  const shadowStyle = useMemo(() => {
    if (!dropShadow?.enabled) return "";

    const shadowColor = dropShadow.color.startsWith("0x")
      ? `#${dropShadow.color.substring(2)}`
      : dropShadow.color;

    const shadowAlpha = Math.round(dropShadow.alpha * 255)
      .toString(16)
      .padStart(2, "0");

    const shadowColorWithAlpha = `${shadowColor}${shadowAlpha}`;
    const scaledDistance = dropShadow.distance * scaleFactor;
    const scaledBlur = dropShadow.blur * scaleFactor;

    return `${Math.cos(dropShadow.angle) * scaledDistance}px ${
      Math.sin(dropShadow.angle) * scaledDistance
    }px ${scaledBlur}px ${shadowColorWithAlpha}`;
  }, [dropShadow, scaleFactor]);

  // Compute border style if enabled
  const borderStyle = useMemo(() => {
    if (!border?.enabled) return "";

    const borderColor = border.color.startsWith("0x")
      ? `#${border.color.substring(2)}`
      : border.color;

    return `${border.width * scaleFactor}px ${border.style} ${borderColor}`;
  }, [border, scaleFactor]);

  // Compute animation duration
  const animationDuration = animationConfig?.duration || 30;

  // Determine animation direction if applicable
  const direction = (() => {
    if (
      animationConfig?.type === "slide" &&
      "animationDirection" in animationConfig
    ) {
      return animationConfig.animationDirection;
    }
    if (
      animationConfig?.type === "bounce" &&
      "animationDirection" in animationConfig
    ) {
      return animationConfig.animationDirection;
    }
    return undefined;
  })();

  // Create image element with appropriate styling
  const imageElement = (
    <div
      style={{
        position: "absolute",
        left: scaledX,
        top: scaledY,
        width: scaledWidth,
        height: scaledHeight,
        opacity,
        transform: `rotate(${rotation}deg) scale(${scale})`,
        transformOrigin: "center",
        borderRadius: scaledCornerRadius,
        overflow: "hidden",
        boxShadow: shadowStyle || undefined,
        border: borderStyle || undefined,
      }}
    >
      {url.includes(".gif") ? (
        <Gif
          src={url}
          width={width}
          height={height}
          fit={objectFit as GifFillMode}
        />
      ) : (
        <Img
          src={url}
          style={{
            width: "100%",
            height: "100%",
            objectFit,
          }}
        />
      )}
    </div>
  );

  // Apply animation if specified
  if (!animationConfig) {
    return imageElement;
  }

  switch (animationConfig.type) {
    case "fade":
      return (
        <FadeIn animationDuration={animationDuration}>{imageElement}</FadeIn>
      );
    case "slide":
      return (
        <SlideIn animationDuration={animationDuration} direction={direction}>
          {imageElement}
        </SlideIn>
      );
    case "flash":
      return (
        <Flash animationDuration={animationDuration}>{imageElement}</Flash>
      );
    case "pop":
      return <Pop animationDuration={animationDuration}>{imageElement}</Pop>;
    case "pulse":
      return (
        <Pulse animationDuration={animationDuration}>{imageElement}</Pulse>
      );
    case "bounce":
      return (
        <Bounce animationDuration={animationDuration} direction={direction}>
          {imageElement}
        </Bounce>
      );
    default:
      return imageElement;
  }
};

export default FreeImageComponent;
