import React, { useMemo } from "react";
import { TextProps } from "@/types/schema";
import { SlideIn } from "./animations/slide";
import { Bounce } from "./animations/bounce";
import { Pulse } from "./animations/pulse";
import { Flash } from "./animations/flash";
import { Pop } from "./animations/pop";
import { Typewriter } from "./animations/typewriter";
import { FadeIn } from "./animations/fade";
import { useVideoConfig } from "remotion";
import { RESOLUTION_HEIGHTS } from "@/types/constants";
import type { CSSProperties } from "react";

const BASE_RESOLUTION_HEIGHT = RESOLUTION_HEIGHTS["1080p"];

const useScaleFactor = () => {
  const { height } = useVideoConfig();
  return height / BASE_RESOLUTION_HEIGHT;
};

interface TextStyle extends CSSProperties {
  textShadow?: string;
}

const TextComponent: React.FC<TextProps> = ({
  text,
  fontSize,
  fontFamily,
  fontWeight,
  fontColor,
  fontStyle,
  fontVariant,
  textAlign,
  animationConfig,
  layout,
  x = 0,
  y = 0,
  dropShadow,
  stroke,
  backgroundConfig,
}) => {
  const { width } = useVideoConfig();

  const scaleFactor = useScaleFactor();

  const scaledFontSize = fontSize * scaleFactor;

  const scaledX = x * scaleFactor;
  const scaledY = y * scaleFactor;

  const animationDuration = animationConfig?.duration || 30;

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

  const convertHexColor = (hexColor: string) => {
    if (hexColor.startsWith("0x")) {
      return `#${hexColor.substring(2)}`;
    }
    return hexColor;
  };

  const textStyle: TextStyle = {
    fontFamily,
    fontSize: `${scaledFontSize}px`,
    fontWeight,
    color: convertHexColor(fontColor),
    fontStyle,
    fontVariant,
    textAlign: textAlign as "left" | "center" | "right" | "justify",
    lineHeight: 1.2,
    margin: 0,
    padding: 0,
    width: "100%",
    display: "block",
  };

  if (dropShadow?.enabled) {
    const shadowColor = convertHexColor(dropShadow.color);
    const shadowAlpha = Math.round(dropShadow.alpha * 255)
      .toString(16)
      .padStart(2, "0");
    const shadowColorWithAlpha = `${shadowColor}${shadowAlpha}`;

    const scaledDistance = dropShadow.distance * scaleFactor;
    const scaledBlur = dropShadow.blur * scaleFactor;

    textStyle.textShadow = `${Math.cos(dropShadow.angle) * scaledDistance}px ${Math.sin(dropShadow.angle) * scaledDistance}px ${scaledBlur}px ${shadowColorWithAlpha}`;
  }

  if (stroke?.enabled) {
    const strokeColor = convertHexColor(stroke.color);
    const scaledStrokeWidth = stroke.width * scaleFactor;

    const shadows = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      shadows.push(
        `${Math.cos(angle) * scaledStrokeWidth}px ${Math.sin(angle) * scaledStrokeWidth}px 0 ${strokeColor}`,
      );
    }

    textStyle.textShadow =
      shadows.join(", ") +
      (textStyle.textShadow ? `, ${textStyle.textShadow}` : "");
  }

  const { calculatedX, textAlign: alignStyle } = useMemo(() => {
    if (!layout) {
      return { calculatedX: scaledX, textAlign: "left" as const };
    }

    switch (layout) {
      case "left":
        return { calculatedX: 20 * scaleFactor, textAlign: "left" as const };
      case "center":
        return { calculatedX: width / 2, textAlign: "center" as const };
      case "right":
        return {
          calculatedX: width - 20 * scaleFactor,
          textAlign: "right" as const,
        };
      default:
        return { calculatedX: scaledX, textAlign: "left" as const };
    }
  }, [layout, scaledX, width, scaleFactor]);

  // Container style that positions the wrapper
  const containerStyle: CSSProperties = {
    position: "absolute",
    left: layout === "center" ? "50%" : `${calculatedX}px`,
    top: `${scaledY}px`,
    transform: layout === "center" ? "translateX(-50%)" : "none",
    // This ensures proper alignment
    textAlign: alignStyle,
  };

  // Calculate padding for the background
  const scaledPaddingX = backgroundConfig?.enabled
    ? backgroundConfig.paddingX * scaleFactor
    : 0;

  const scaledPaddingY = backgroundConfig?.enabled
    ? backgroundConfig.paddingY * scaleFactor
    : 0;

  // Wrapper style that contains the background and text
  const wrapperStyle: CSSProperties = {
    position: "relative",
    display: "inline-block", // This makes it size to content
    padding: backgroundConfig?.enabled
      ? `${scaledPaddingY}px ${scaledPaddingX}px`
      : 0,
    backgroundColor: backgroundConfig?.enabled
      ? convertHexColor(backgroundConfig.color)
      : "transparent",
    opacity: backgroundConfig?.enabled ? backgroundConfig.alpha : 1,
    borderRadius: backgroundConfig?.enabled
      ? `${backgroundConfig.cornerRadius * scaleFactor}px`
      : 0,
  };

  const formattedText = text.split("\n").map((line, i) => (
    <React.Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </React.Fragment>
  ));

  // Create the text element with background
  const textElement = (
    <div style={containerStyle}>
      <div style={wrapperStyle}>
        <div style={textStyle}>{formattedText}</div>
      </div>
    </div>
  );

  const animationType = animationConfig?.type;

  switch (animationType) {
    case "fade":
      return (
        <FadeIn animationDuration={animationDuration}>{textElement}</FadeIn>
      );
    case "slide":
      return (
        <SlideIn animationDuration={animationDuration} direction={direction}>
          {textElement}
        </SlideIn>
      );
    case "flash":
      return <Flash animationDuration={animationDuration}>{textElement}</Flash>;
    case "pop":
      return <Pop animationDuration={animationDuration}>{textElement}</Pop>;
    case "pulse":
      return <Pulse animationDuration={animationDuration}>{textElement}</Pulse>;
    case "bounce":
      return (
        <Bounce animationDuration={animationDuration} direction={direction}>
          {textElement}
        </Bounce>
      );
    case "typewriter":
    default:
      return (
        <Typewriter animationDuration={animationDuration}>
          {textElement}
        </Typewriter>
      );
  }
};

export default TextComponent;
