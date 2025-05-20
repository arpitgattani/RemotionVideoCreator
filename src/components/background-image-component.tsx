import { Gif } from "@remotion/gif";
import { useRef } from "react";
import { AbsoluteFill, Img, useVideoConfig } from "remotion";

type Props = {
  url: string;
};

const BackgroundImageComponent = ({ url }: Props) => {
  if (!url) return null;

  const { width, height } = useVideoConfig();
  const ref = useRef<HTMLCanvasElement>(null);
  return (
    <AbsoluteFill>
      {url.includes(".gif") ? (
        <Gif ref={ref} src={url} width={width} height={height} fit="cover" />
      ) : (
        <Img
          src={url}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      )}
    </AbsoluteFill>
  );
};

export default BackgroundImageComponent;
